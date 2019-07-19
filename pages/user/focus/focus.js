// pages/user/focus/focus.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isFocused:false,
    focusTip: '+ 关注'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var type = options.type
    console.log(type)
    if (type == 'focus') {
      wx.setNavigationBarTitle({
        title: '我关注的'

      })
      this.setData({
        isFocused: true,
        focusTip: '已关注'
      })
    }
    if (type == 'fans') {
      wx.setNavigationBarTitle({
        title: '我的粉丝'
      })

    }
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

  toFocus:function() {
    console.log("关注它")
  },
  /**
 * 跳转到他人详情页
 */
  toOtherPageIndex: function () {
    wx.navigateTo({
      url: '/pages/user/detail/detail',
      success: function () { }        //成功后的回调；
    })
  },
})