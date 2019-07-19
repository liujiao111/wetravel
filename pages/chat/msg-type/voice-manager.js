import {isVoiceRecordUseLatestVersion} from "../../../modules/chat-input/chat-input";
import IMOperator from "../im-operator";
import FileManager from "./base/file-manager";

export default class VoiceManager extends FileManager{
    constructor(page) {
        super(page);
        this.isLatestVersion = isVoiceRecordUseLatestVersion();
        //判断是否需要使用高版本语音播放接口
        if (this.isLatestVersion) {
            this.innerAudioContext = wx.createInnerAudioContext();
        }
        //在该类被初始化时，绑定语音点击播放事件
        this._page.chatVoiceItemClickEvent = (e) => {
            let dataset = e.currentTarget.dataset;
            console.log('语音Item', dataset);
            this._playVoice({dataset})
        }
    }

    /**
     * 停止播放所有语音
     */
    stopAllVoicePlay() {
        let that = this._page;
        if (this._page.data.isVoicePlaying) {
            this._stopVoice();
            that.data.chatItems.forEach(item => {
                if (IMOperator.VoiceType === item.type) {
                    item.isPlaying = false
                }
            });
            that.setData({
                chatItems: that.data.chatItems,
                isVoicePlaying: false
            })
        }
    }

    /**
     * 停止播放 兼容低版本语音播放
     * @private
     */
    _stopVoice() {
        if (this.isLatestVersion) {
            this.innerAudioContext.stop();
        } else {
            wx.stopVoice();
        }
    }

    _playVoice({dataset}) {
        let that = this._page;
        if (dataset.voicePath === that.data.latestPlayVoicePath && that.data.chatItems[dataset.index].isPlaying) {
            this.stopAllVoicePlay();
        } else {
            this._startPlayVoice(dataset);
            let localPath = dataset.voicePath;//优先读取本地路径，可能不存在此文件

            this._myPlayVoice(localPath, dataset, function () {
                console.log('成功读取了本地语音');
            }, () => {
                console.log('读取本地语音文件失败，一般情况下是本地没有该文件，需要从服务器下载');
                wx.downloadFile({
                    url: dataset.voicePath,
                    success: res => {
                        console.log('下载语音成功', res);
                        this.__playVoice({
                            filePath: res.tempFilePath,
                            success: () => {
                                this.stopAllVoicePlay();
                            },
                            fail: (res) => {
                                console.log('播放失败了', res);
                            }
                        });
                    }
                });
            });
        }
    }

    /**
     * 播放语音 兼容低版本语音播放
     * @param filePath
     * @param success
     * @param fail
     * @private
     */
    __playVoice({filePath, success, fail}) {
        if (this.isLatestVersion) {
            this.innerAudioContext.src = filePath;
            this.innerAudioContext.startTime = 0;
            this.innerAudioContext.play();
            this.innerAudioContext.onError((error) => {
                this.innerAudioContext.offError();
                fail && fail(error);
            });
            this.innerAudioContext.onEnded(() => {
                this.innerAudioContext.offEnded();
                success && success();
            });
        } else {
            wx.playVoice({filePath, success, fail});
        }
    }

    _myPlayVoice(filePath, dataset, cbOk, cbError) {
        let that = this._page;
        if (dataset.isMy || that.data.isAndroid) {
            this.__playVoice({
                filePath: filePath,
                success: () => {
                    this.stopAllVoicePlay();
                    typeof cbOk === "function" && cbOk();
                },
                fail: (res) => {
                    console.log('播放失败了1', res);
                    typeof cbError === "function" && cbError(res);
                }
            });
        } else {
            wx.downloadFile({
                url: dataset.voicePath,
                success: res => {
                    console.log('下载语音成功', res);
                    this.__playVoice({
                        filePath: res.tempFilePath,
                        success: () => {
                            this.stopAllVoicePlay();
                            typeof cbOk === "function" && cbOk();
                        },
                        fail: (res) => {
                            console.log('播放失败了', res);
                            typeof cbError === "function" && cbError(res);
                        }
                    });
                }
            });
        }

    }

    _startPlayVoice(dataset) {
        let that = this._page;
        let chatItems = that.data.chatItems;
        chatItems[dataset.index].isPlaying = true;
        if (that.data.latestPlayVoicePath && that.data.latestPlayVoicePath !== chatItems[dataset.index].content) {//如果重复点击同一个，则不将该isPlaying置为false
            for (let i = 0, len = chatItems.length; i < len; i++) {
                if ('voice' === chatItems[i].type && that.data.latestPlayVoicePath === chatItems[i].content) {
                    chatItems[i].isPlaying = false;
                    break;
                }
            }
        }
        that.setData({
            chatItems: chatItems,
            isVoicePlaying: true
        });
        that.data.latestPlayVoicePath = dataset.voicePath;
    }

}