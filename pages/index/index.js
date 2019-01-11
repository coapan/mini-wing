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
  },
  onShow() {
    wx.requestData(api.index).then(res => {
      if (res.code === 1) {
        this.setData({
          mottoImg: res.data.mottoImg
        })
      }
    })
  },
  bindmottotap(){
    wx.switchTab({
      url: '/pages/home/home',
    })
  }
})