//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    localUserInfo: {},
    haslocalUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getlocalUserInfo'),
    oneChecked : false,
        tags : [
            {
                name : '标签一',
                checked : false,
                color : 'default'
            },
            {
                name : '标签二',
                checked : false,
                color: 'default'
            },
            {
                name : '标签三',
                checked : true,
                color: 'default'
            },
            {
                name : '标签4️',
                checked : true,
                color: 'default'
            },
            {
              name : "二逼青年",
              checked: false,
              color:"default"
            }
        ]
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '/pages/user/detail/detail'
    })
  },
  onLoad: function () {
    if (app.globalData.localUserInfo) {
      console.log(1)
      this.setData({
        localUserInfo: app.globalData.localUserInfo,
        haslocalUserInfo: true
      })
    } else if (this.data.canIUse) {
      console.log(2)
      // 由于 getlocalUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.localUserInfoReadyCallback = res => {
        this.setData({
          localUserInfo: res.localUserInfo,
          haslocalUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getlocalUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.localUserInfo = res.localUserInfo
          console.log('user ===' + res.userInfo)
          this.setData({
            localUserInfo: res.localUserInfo,
            haslocalUserInfo: true
          })
        }
      })
    }
  },
  getlocalUserInfo: function (e) {
    console.log(e)
    app.globalData.localUserInfo = e.detail.localUserInfo
    this.setData({
      localUserInfo: e.detail.localUserInfo,
      haslocalUserInfo: true
    })
  },
  toEditView:function(){
    wx.navigateTo({
      url: '/pages/user/edit/edit',
      success: function () { }        //成功后的回调；
    })
  },

  toOtherPageIndex:function(){
    wx.navigateTo({
      url: '/pages/user/detail/detail',
      success: function () { }        //成功后的回调；
    })
  },

  toMySend: function () {
    wx.navigateTo({
      url: '/pages/user/publish/publish?type=send',
      success: function () { }        //成功后的回调；
    })
  },
  toMyCollect: function () {
    wx.navigateTo({
      url: '/pages/user/publish/publish?type=collect',
      success: function () { }        //成功后的回调；
    })
  },
  toMyFocus: function () {
    wx.navigateTo({
      url: '/pages/user/focus/focus?type=focus',
      success: function () { }        //成功后的回调；
    })
  },
  toMyFans: function () {
    wx.navigateTo({
      url: '/pages/user/focus/focus?type=fans',
      success: function () { }        //成功后的回调；
    })
  },
})
