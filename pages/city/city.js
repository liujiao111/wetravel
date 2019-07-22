// pages/demo/demo.js
let City = require('../../utils/allcity.js');

Page({

  data: {
    city: [],
    config: {
      horizontal: true, // 第一个选项是否横排显示（一般第一个数据选项为 热门城市，常用城市之类 ，开启看需求）
      animation: true, // 过渡动画是否开启
      search: true, // 是否开启搜索
      searchHeight: 45, // 搜索条高度
      suctionTop: true, // 是否开启标题吸顶
      
    },
    pageType: "local", //页面类型，local是出发地，target是到达目的地
  },
  onLoad(options) {
    this.setData({
      pageType: options.type
    })
    console.log(this.data.pageType)
    // wx.showLoading({
    //   title: '加载数据中...',
    // })
    // // 模拟服务器请求异步加载数据
    // setTimeout(()=>{
    this.setData({
      city: City
    })
    //   wx.hideLoading()
    // },2000)

  },
  bindtap(e) {
    var city = JSON.stringify(e.detail)
    console.log('选择了城市' + city)
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];
    if (this.data.pageType == "local") {
      prevPage.setData({
        startCity: e.detail.name,
      })
    } else{
      prevPage.setData({
        targetCity: e.detail.name,
      })
    }
    
    wx.navigateBack({
      delta: 1,
    })
  },

})