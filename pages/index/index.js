import { $wuxCalendar } from '../../dist-wux/index'


Page({
  /* 页面的初始数据*/
  data: {
    value2: [],
    // 获取设备高度
    appHeight: '',
    visible2: false,
    value1: '',
    displayValue1: '最新',
    options1: ['最新发表', '最近出发', '热门结伴', '附近结伴'],
    startTime:'开始时间',
    endTime:'结束时间',
    startCity:'出发',
    targetCity:'到达',
    talkingList:[],
    searchInput: '',

  },

/**
 * 选择城市
 */
  openChooseCity:function(e){
    var eventId = e.currentTarget.id
    var startCityType = this.startCity
    if (this.startCity == '出发') {
      startCityType = ''
    }
      wx.navigateTo({
        url: '../city/city?type=' + eventId + '&startCity=' + startCityType,
        success:function(e){

        }
      })
  },

  setValue(values, key) {
    this.setData({
      [`value${key}`]: values.value,
      [`displayValue${key}`]: values.label,
    })
  },
  onConfirm(e) {
    const { index } = e.currentTarget.dataset
    this.setValue(e.detail, index)
    var keyword = e.detail.value
    console.log('确认搜索')

    var params = {
      content: keyword
    }
    this.searchTalkingByParams(params)
  },
  /**
   * 获取页面上的所有搜索请求参数
   */
  getSearchParams() {

  },
  onValueChange(e) {
    const { index } = e.currentTarget.dataset
    console.log(`onValueChange${index}`, e.detail)
  },
  onVisibleChange(e) {
    this.setData({ visible: e.detail.visible })
  },
  onClick() {
    this.setData({ visible: true })
  },
  onLoad: function (options) {
    // 获取设备高度
    var res = wx.getSystemInfoSync();
    this.setData({
      appHeight: res.windowHeight
    });

    console.log(this.data.appHeight)
  },


  // 区域列表事件
  rowClick: function (e) {
    // 限制第一个 '不限' 不能点击
    if (e.currentTarget.dataset.hi != 0) {
      // 获取wxml  data-hi="{{ index }}" 传过来的索引
      var rowNum = e.currentTarget.dataset.hi;
      // 同筛选导航栏事件，因第一个为不限不可点击， 所以减一
      var rowSrc = "rowShow[" + (rowNum - 1) + "].isShows";
      // 隐藏所有的三级菜单
      for (var m = 0; m < this.data.rowShow.length; m++) {
        var rowSrcs = "rowShow[" + m + "].isShows";
        this.setData({
          [rowSrcs]: true
        });
      };
      // 同上
      this.setData({
        rigShow: false,
        [rowSrc]: !this.data.rowShow[e.currentTarget.dataset.hi].isShows
      });
    };
  },

/**
 * 日期选择
 */
  openCalendar2(e) {
    var eventId=e.currentTarget.id
    $wuxCalendar().open({
      value: this.data.value2,
      onChange: (values, displayValues) => {
        console.log('onChange', eventId, values, displayValues)
        if (displayValues == null || displayValues == "") {
          return
        }
        if (eventId == "start") {
          if (displayValues == null || displayValues == "") {
            return
          }
            this.setData({
              value2: displayValues,
              startTime: displayValues
            })
        }
        if (eventId == "end") {
          console.log(displayValues)
          this.setData({
            value2: displayValues,
            endTime: displayValues
          })
        }
        
      },
    })
  },

  itemClick:function(){
    console.log('应该关闭')
  },


  close2() {
    this.setData({
      visible2: false,
    })
  },
  onClose(key) {
    console.log('onClose')
    this.setData({
      [key]: false,
    })
  },
  onClose2() {
    this.onClose('visible2')
  },

  toSendTalking:function(){
    wx.navigateTo({
      url: '../talking/talking',
    })
  },

/**
 * 页面初始化，加载动态数据
 */
  onLoad:function(params) {
    console.log(params)
    this.searchTalkingByParams(params)
  },

/**
 * 根据条件查询动态
 */
searchTalkingByParams : function(params) {
  console.log(params)
  var that = this
  wx.request({
    url: 'http://localhost:8088/talking/page',
    data: params,
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
          var items = data.items
          that.setData({
            talkingList: items
          })
        }
      } else {
        console.log("index.js wx.request CheckCallUser statusCode" + res.statusCode);
      }
    },
    fail: function () {
      console.log("index.js wx.request CheckCallUser fail");
    },
    complete: function () {
      console.log('complete')
    }
  })

},


/**
 * 搜索框输入清空
 */
  onCancel : function() {
    console.log("删除")
    this.setData({
      searchInput: ''
    })
  },



})