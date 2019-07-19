//app.js
import AppIMDelegate from "./delegate/app-im-delegate";

App({
    globalData: {
        userInfo: {},
        localUserInfo: {},
    },
    getIMHandler() {
        return this.appIMDelegate.getIMHandlerDelegate();
    },
    onLaunch(options) {
        this.appIMDelegate = new AppIMDelegate(this);
        this.appIMDelegate.onLaunch(options);

      //调用API从本地缓存中获取数据
      var logs = wx.getStorageSync('logs') || []
      logs.unshift(Date.now())
      wx.setStorageSync('logs', logs)
    },
    onHide() {
        this.appIMDelegate.onHide();
    },
    onShow(options) {
        this.appIMDelegate.onShow(options);
    },

  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.localUserInfo) {
      typeof cb == "function" && cb(this.globalData.localUserInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.localUserInfo = res.userInfo
              console.log("========" + res.userInfo)
              typeof cb == "function" && cb(that.globalData.localUserInfo)
            }
          })
        }
      })
    }
  }
});