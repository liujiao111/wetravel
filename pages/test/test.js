Page({

  /**
   * 页面的初始数据
   */
  data: {
    isCard: true,
    commentList: [
      {
        "content": "哈哈哈",
        "createTime": "2019-07-27 09:43:12",
        "deleteTime": "2019-07-27 09:43:12",
        "id": "2c04fd2f6f87475192cc9a97644d96ba",
        "parentId": "",
        "replyName": "",
        "status": 0,
        "talkingId": "da18041d39c64c9f815e11fdf62cb6e4",
        "updateTime": "2019-07-27 09:43:12",
        "user": {
          "age": 28,
          "birthday": "2019-07-23 20:45:26",
          "gender": 1,
          "id": "38c309d4a34d440182f060e2c895736a",
          "img": "ddd",
          "realName": "李四",
          "status": 0,
          "wechatId": "qqqq"
        },
        "userId": "38c309d4a34d440182f060e2c895736a"
      },
      {
        "content": "你啥时候去啊",
        "createTime": "2019-07-27 09:57:07",
        "deleteTime": "2019-07-27 09:57:07",
        "id": "bfhhttyr",
        "status": 0,
        "talkingId": "da18041d39c64c9f815e11fdf62cb6e4",
        "updateTime": "2019-07-27 09:57:07",
        "user": {
          "birthday": "2019-06-26 15:33:55",
          "id": "qqqqqqqqq",
          "img": "gggg",
          "realName": "vbv",
          "wechatId": "bvb",
          "wechatName": "cvcv"
        },
        "userId": "qqqqqqqqq"
      }
    ],
    replyList: [
      {
        "content": "你笑什么",
        "createTime": "2019-07-27 09:40:18",
        "deleteTime": "2019-07-27 09:40:18",
        "id": "465655gggg34433",
        "parentId": "2c04fd2f6f87475192cc9a97644d96ba",
        "replyId": "2c04fd2f6f87475192cc9a97644d96ba",
        "replyName": "李四",
        "status": 0,
        "talkingId": "da18041d39c64c9f815e11fdf62cb6e4",
        "updateTime": "2019-07-27 09:40:18",
        "user": {
          "address": "中德",
          "age": 24,
          "birthday": "2019-06-25 13:56:02",
          "city": "成都市",
          "constellation": "白牛座",
          "gender": 1,
          "id": "fgffg",
          "img": "jdjg",
          "label": "被保洁",
          "phone": "1342",
          "province": "四川省",
          "realName": "刘皎",
          "sign": "我的就是我的",
          "status": 1,
          "wechatId": "ll917961909",
          "wechatName": "iilldlgfk"
        },
        "userId": "fgffg"
      },
      {
        "content": "我笑你这个王八蛋",
        "createTime": "2019-07-27 09:40:38",
        "deleteTime": "2019-07-27 09:40:38",
        "id": "dfbvjg6865t4t",
        "parentId": "2c04fd2f6f87475192cc9a97644d96ba",
        "replyId": "465655gggg34433",
        "replyName": "刘皎",
        "status": 0,
        "talkingId": "da18041d39c64c9f815e11fdf62cb6e4",
        "updateTime": "2019-07-27 09:40:38",
        "user": {
          "birthday": "2019-06-26 15:33:55",
          "id": "qqqqqqqqq",
          "img": "gggg",
          "realName": "vbv",
          "wechatId": "bvb",
          "wechatName": "cvcv"
        },
        "userId": "qqqqqqqqq"
      },
      {
        "content": "我明天去呀",
        "createTime": "2019-07-27 09:59:05",
        "deleteTime": "2019-07-27 09:59:05",
        "id": "fhty547575",
        "parentId": "bfhhttyr",
        "replyId": "bfhhttyr",
        "replyName": "陈芊蓉",
        "status": 0,
        "talkingId": "da18041d39c64c9f815e11fdf62cb6e4",
        "updateTime": "2019-07-27 09:59:05",
        "user": {
          "age": 28,
          "birthday": "2019-07-23 20:45:26",
          "gender": 1,
          "id": "38c309d4a34d440182f060e2c895736a",
          "img": "ddd",
          "realName": "李四",
          "status": 0,
          "wechatId": "qqqq"
        },
        "userId": "38c309d4a34d440182f060e2c895736a"
      }
    ],
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

  replyComment: function (e) {
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
      now_reply_type: type,
      now_parent_id: parent_id,
      focus: true,
      placeholder: '回复' + name + ":"
    })
  },
})