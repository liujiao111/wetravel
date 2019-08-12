//获取应用实例
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    likeUsers:[], //点赞人列表
    talkingId : '',
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    var userId = app.globalData.openid
    var talkingId = options.id
    var that = this
    that.setData({
      talkingId: talkingId

    })
    var that = this
    //获取点赞人列表
    wx.request({
      url: app.globalData.dataurl + '/talking/like/' + talkingId,
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/json'
      },// 设置请求的 header
      data: {
        userId: userId,
        size: 10
      },
      success: function (res) {
        var likeUsers = res.data.data
        console.log(likeUsers)
        that.setData({
          likeUsers: likeUsers

        })
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

/**
 * 添加关注
 */
  addUserFocus:function(e) {
    var soucreUserId = app.globalData.openid
    var targetUserId = e.currentTarget.dataset.uid
    var talkingId = this.data.talkingId
    console.log('source:' + soucreUserId)
    console.log('target:' + targetUserId)
    var that = this
    wx.request({
      url :app.globalData.dataurl + '/user/addfocus',
      data:{
        sourceUserId: soucreUserId,
        targetUserId: targetUserId
      },
      success:function(e) {
        
        //获取点赞人列表
        wx.request({
          url: app.globalData.dataurl + '/talking/like/' + talkingId,
          method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          header: {
            'content-type': 'application/json'
          },// 设置请求的 header
          data: {
            userId: soucreUserId,
            size: 10
          },
          success: function (res) {
            var likeUsers = res.data.data
            console.log(likeUsers)
            that.setData({
              likeUsers: likeUsers
            })
          }
        })
      }
    })


  },
})