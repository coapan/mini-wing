//index.js
//获取应用实例
const app = getApp()
import api from '../../config/api.js'
import user from '../../utils/user.js'

Page({
  data: {
    StatusBar: wx.StatusBar,
    CustomBar: wx.CustomBar,
    mottoImg: '',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function() {
    wx.requestData(api.index).then(res => {
      if (res.code === 1) {
        this.setData({
          mottoImg: res.data.mottoImg
        })
      }
    })
  },
  onShow() {},
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})