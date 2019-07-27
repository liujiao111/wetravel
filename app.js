//app.js
import AppIMDelegate from "./delegate/app-im-delegate";

App({
    globalData: {
        userInfo: {},
        localUserInfo: {},
        sessionKey:'',
        dataurl: "http://localhost:8088",
        openid: "",
        
    },
    getIMHandler() {
        return this.appIMDelegate.getIMHandlerDelegate();
    },
    onLaunch(options) {
      console.log('startdfdfd--dfdg')
      console.log('start')
        this.appIMDelegate = new AppIMDelegate(this);
        this.appIMDelegate.onLaunch(options);

      //调用API从本地缓存中获取数据
      var logs = wx.getStorageSync('logs') || []
      logs.unshift(Date.now())
      wx.setStorageSync('logs', logs)

      this.getUserInfo();
    },
    onHide() {
        this.appIMDelegate.onHide();
    },
    onShow(options) {
        this.appIMDelegate.onShow(options);
    },

  getUserInfo: function (cb) {
    console.log('获取用户信息')
    var that = this
    
      console.log('调用登录接口')
      //调用登录接口
      wx.login({
        success: function (res) {

          console.log('登录后返回的code:' + res.code)

          //获取用户openID等信息
          wx.request({
            url: that.globalData.dataurl + '/wx/auth?code=' + res.code,
            success:function(e) {
              console.log(e.data);
              that.globalData.openid=e.data.data.openid
              that.globalData.sessionKey = e.data.data.session_key
            }
          })
 
          wx.getUserInfo({
            success: function (res) {
              console.log('调用登录接口成功')
              var userInfo = res.userInfo
              var nickName = userInfo.nickName
              var avatarUrl = userInfo.avatarUrl
              var gender = userInfo.gender //性别 0：未知、1：男、2：女
              var province = userInfo.province
              var city = userInfo.city
              var country = userInfo.country

              console.log("调用登录接口成功，返回昵称：" + nickName)
              that.globalData.localUserInfo = res.userInfo
              console.log("========" + res.userInfo)
              typeof cb == "function" && cb(that.globalData.localUserInfo)
            }
          })
        }
      })
    }
});