import { $wuxCalendar } from '../../../dist-wux/index'
import data from '../data'


Page({

  /**
   * 页面的初始数据
   */
  data: {
    vvisible2: false,
    headImage: "/image/person2.png",
    fileList: [{
      uid: 0,
      status: 'uploading',
      url: 'https://wux.cdn.cloverstd.com/qrcode.jpg',
    },
    {
      uid: 1,
      status: 'done',
      url: 'https://wux.cdn.cloverstd.com/qrcode.jpg',
    },
    {
      uid: 2,
      status: 'error',
      url: 'https://wux.cdn.cloverstd.com/qrcode.jpg',
    }
    ],
    startTime: [],
    options1: data,
    value1: [],
    area: '广东省-广州市-天河区',

    selectValue1: '',
    selectDisplayValue1: '男',
    selectOptions1: ['男', '女'],

    image1: "/image/talking0.png",
    image2: "/image/test.png",
    image3: "/image/talking2.png",
    image4: "/image/talking3.png",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
   * 头像
   */
  openChooseImage:function(){
    var that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths[0])
        that.setData({
          headImage: tempFilePaths[0],
        })
      }
    })
  },

/**
 * 朋友圈图片
 */
  openChooseMultiImage:function(){
    var that = this
    wx.chooseImage({
      count: 4,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        
        for (var i = 0; i < tempFilePaths.length; i ++) {
          console.log(tempFilePaths[i])
          var key = i + 1
          that.setData({
            [`image${key}`]: tempFilePaths[i],
          })
        }
      }
    })
  },


  openCalendar() {
    $wuxCalendar().open({
      value: this.data.startTime,
      onChange: (values, displayValues) => {
        console.log('onChange', values, displayValues)
        this.setData({
          startTime: displayValues,
        })
      },
    })
  },

  close2() {
    this.setData({
      visible2: false,
    })
  },
  onClose2() {
    this.onClose('visible2')
  },

  /**
   * 打开性别选择面板
   */
  openChooseGender : function() {
    console.log('选择性别')
    this.setData({
      vvisible2: true,
    })
  },

/**
 * 打开修改昵称
 */
  openChooseNikeName:function(){
    wx.navigateTo({
      url: '/pages/user/edit/name/name?type=name',
      success: function () { }        //成功后的回调；
    })
  },


 /**
 * 打开修改签名
 */
  openChooseSign: function() {
    wx.navigateTo({
      url: '/pages/user/edit/name/name?type=sign',
      success: function () { }        //成功后的回调；
    })
  },

/**
 * 打开修改标签面板
 */
  openChooseTag:function(){
    wx.navigateTo({
      url: '/pages/user/edit/tag/tag',
      success: function () { }        //成功后的回调；
    })
  },

  openChooseArea() {
    this.setData({ visible1: true })
  },
  onClose1() {
    this.setData({ visible1: false })
  },
  onChange1(e) {
    this.setData({ area: e.detail.options.map((n) => n.label).join('-') })
    console.log('onChange1', e.detail)
  },

  setValue(values, key) {
    this.setData({
      [`value${key}`]: values.value,
      [`selectDisplayValue1`]: values.label,
    })
  },
  selectOnConfirm(e) {
    const { index } = e.currentTarget.dataset
    this.setValue(e.detail, index)
    console.log(`onConfirm${index}`, e.detail)
  },
  selectOnValueChange(e) {
    const { index } = e.currentTarget.dataset
    console.log(`onValueChange${index}`, e.detail)
  },
})