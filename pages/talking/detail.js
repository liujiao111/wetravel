// pages/talking/detail.js

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
    comment_text: null,
    reply_id: 0,
    placeholder: '就不说一句吗？',
    reply_id: 0,
    now_reply_name: null,
    type: 0,
    now_parent_id: 0,
    now_reply: 0


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('appid:' + app.globalData.openid)
    var id = options.id;
    this.setData({
      talkingId: id
    })
    var that = this

    //获取动态详情
    wx.request({
      url: app.globalData.dataurl + '/talking/' + id,
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

/**
 * 发布评论
 */
  sendComment: function() {
    //console.log("当前登录人：" + app.globalData.localUserInfo.)
    console.log("发布评论")
    this.setData({
      visible2: false,
    });

    var params = {
      talkingId: this.data.talkingId,

    
    }

    wx.request({
      url: app.globalData.dataurl + '/comment',
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"

      },
      data: params,
      success:function(res) {

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
    var id = e.currentTarget.dataset.cid
    console.log("回复的ID：" + id)
    var name = e.currentTarget.dataset.name

    console.log('回复者姓名：' + name)
    var type = e.currentTarget.dataset.type
    var parent_id = e.currentTarget.dataset.pid
    console.log("回复所属的PID：" + parent_id)

    console.log('当前登录用户openId：' + app.globalData.openid)

    this.setData({
      now_reply: id,
      now_reply_name: name,
      now_parent_id: parent_id,
      focus: true,
      placeholder: '回复' + name + ":",
      visible2: true,
    })

    //TODO 增加评论

    
  },
})