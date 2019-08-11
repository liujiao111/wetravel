// pages/talking/detail.js
import { $wuxToast } from '../../dist-wux/index'

//获取应用实例
const app = getApp();


Page({

  /**
   * 页面的初始数据
   */
  data: {
    visible2: false,
    talking : {},
    talkingId: '',
    commentList: [], //评论集合
    replyList: [], //评论回复集合
    comment_text: '',
    reply_id: '',
    placeholder: '就不说一句吗？',
    reply_id: '',
    now_reply_name: '',
    type: 0,
    now_parent_id: '',
    now_reply: '',
    showUserNoLoginTab: false,
    commentInput:"",
    userId: "",
    likedColor: "#808080",
    collectedColor: "#808080",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('appid:' + app.globalData.openid)
    var userId = app.globalData.openid
    var id = options.id;
    this.setData({
      talkingId: id,
      userId: userId
    })
    var that = this

    //获取动态详情
    wx.request({
      url: app.globalData.dataurl + '/talking/' + id,
      data:{
        userId: userId
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/json'
      },// 设置请求的 header
      success: function (res) {
        if (res.statusCode == 200) {
          var code = res.data.code
          var data = res.data.data
          console.log(data)
          if (code) {
            that.setData({
              talking: data

            })
            if(data.liked == true) {
              that.setData({
                likedColor: 'green'
              })
            }

            if (data.collected == true) {
              that.setData({
                collectedColor: 'green'
              })
            }


          }
        } else {
          console.log("index.js wx.request CheckCallUser statusCode" + res.statusCode);
        }
        console.log('数据刷新成功')
      },
      fail: function () {
        console.log("index.js wx.request CheckCallUser fail");
      },
      complete: function () {
        console.log('complete')
      }
    });

    //获取动态评论
    wx.request({
      url: app.globalData.dataurl + '/talking/comment?talkingId=' + id,
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/json'
      },// 设置请求的 header
      success: function (res) {
        if (res.statusCode == 200) {
          var code = res.data.code
          var data = res.data.data
          var commentList = data.commentList;
          var replyList = data.replyList;
          that.setData({
            commentList: commentList,
            replyList: replyList
          })

        }
      }
      
    })

  },

  getCommentsByTalkingId : function (id) {
    var that = this
    //获取动态评论
    wx.request({
      url: app.globalData.dataurl + '/talking/comment?talkingId=' + id,
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/json'
      },// 设置请求的 header
      success: function (res) {
        if (res.statusCode == 200) {
          var code = res.data.code
          var data = res.data.data
          var commentList = data.commentList;
          var replyList = data.replyList;
          that.setData({
            commentList: commentList,
            replyList: replyList
          })

        }
      }

    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  onCommentFocus : function() {
    this.setData({
      visible2: true,
    })
  },
  onClose2 : function() {
    this.setData({
      visible2: false,
    })
  },

  getCommentInput:function(e){
    console.log('输入：' + e.detail.value)
      this.setData({
        commentInput: e.detail.value
      })
  },

/**
 * 发布评论
 */
  sendComment: function() {
    var that = this
    var userid = app.globalData.openid;
    var talkingId = this.data.talkingId;
    var now_reply = this.data.now_reply;
    var now_reply_name = this.data.now_reply_name;
    var now_parent_id = this.data.now_parent_id;

    var content = this.data.commentInput
    console.log('评论内容：' + content)

    //TODO 增加评论

    this.setData({
      visible2: false,
    });

    var params = {
      talkingId: talkingId,
      userId: userid,
      parentId: now_parent_id,
      replyId:now_reply,
      replyName: now_reply_name,
      content: content
    
    }

    console.log(params)

    wx.request({
      url: app.globalData.dataurl + '/comment',
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"

      },
      data: params,
      success:function(res) {
        //加载最新的评论
        that.getCommentsByTalkingId(talkingId)
      },
    })
  },

  toLikeListView:function(){
    wx.navigateTo({
      url: '/pages/talking/like',
      success: function () { }        //成功后的回调；
    })
  },

/**
 * 回复评论
 */
  replyComment : function(e) {

    var userid = app.globalData.openid;
    console.log('当前登录用户openId：' + userid)
    if (userid == null || userid == '') {
      this.setData({
        showUserNoLoginTab: true
      })
      return;
    }

    var id = e.currentTarget.dataset.cid
    console.log("回复的ID：" + id)
    var name = e.currentTarget.dataset.name

    console.log('回复者姓名：' + name)
    var type = e.currentTarget.dataset.type
    var parent_id = e.currentTarget.dataset.pid
    console.log("回复所属的PID：" + parent_id)

    

    this.setData({
      now_reply: id,
      now_reply_name: name,
      now_parent_id: parent_id,
      focus: true,
      placeholder: '回复' + name + ":",
      visible2: true,
    })

    
    
  },

  closeNoLoginTab:function(){
    this.setData({
      showUserNoLoginTab: false
    })
  },
  onCloseNoLoginTab: function () {
    console.log('点击确认，关闭')
  },


/**
 * 收藏动态
 */
  collectTalking : function() {
    console.log('收藏：' + this.data.talkingId)
    var that = this
    var collectedColor = that.data.collectedColor
    if (collectedColor == "#808080") {
      that.setData({
        collectedColor: "green"
      })
    } else {
      that.setData({
        collectedColor: "#808080"
      })
    }

    wx.request({
      url: app.globalData.dataurl + '/talking/collect',
      data: {
        userId: that.data.userId,
        talkingId:that.data.talkingId
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/json'
      },// 设置请求的 header
      success: function (res) {
        
      }
    })

  },

/**
 * 点赞动态
 */
  likeTalking:function() {
    console.log('点赞：' + this.data.talkingId)
    /**
     * likedColor: "#808080",
    collectedColor: "#808080",
     */
    var that = this
    var likeColor = that.data.likedColor
    if (likeColor == "#808080") {
      that.setData({
        likedColor:"green"
      })
    } else{
      that.setData({
        likedColor: "#808080"
      })
    }

    wx.request({
      url: app.globalData.dataurl + '/talking/like',
      data: {
        userId: that.data.userId,
        talkingId: that.data.talkingId
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/json'
      },// 设置请求的 header
      success: function (res) {
        
      }
    })
    
  },

})