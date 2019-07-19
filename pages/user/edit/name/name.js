const isTel = (value) => !/^1[34578]\d{9}$/.test(value)

Page({

  /**
   * 页面的初始数据
   */
  data: {
    editType : ''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var type = options.type
    console.log(type)
    if (type == 'name') {
      console.log('name')
      this.setData({ editType: "昵称" })
      wx.setNavigationBarTitle({
        title: '修改昵称'

      })
    }
    if (type == 'sign') {
      console.log('name')
      this.setData({ editType: "签名" })
      wx.setNavigationBarTitle({
        title: '修改签名'
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

/**
 * 保存修改
 */
  submitEditVal:function(){
      console.log('保存修改')
  }
})