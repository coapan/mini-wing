export default {
  attachInfo() {
    // 获取手机系统信息
    let res = wx.getSystemInfoSync()

    wx.WIN_HEIGHT = res.screenHeight
    wx.WIN_WIDTH = res.screenWidth
    wx.StatusBar = res.statusBarHeight
    wx.CustomBar = res.platform == 'android' ? res.statusBarHeight + 50 : res.statusBarHeight + 45;

    // 微信发起网络请求
    wx.requestData = (url, data = {}, method = "POST") => {
        let token = wx.getStorageSync('token')
        return new Promise(function(resolve, reject) {
          wx.request({
            url: url,
            data: data,
            header: {
              'token': token,
              'content-type': 'application/json'
            },
            method: method,
            success: res => {
              console.log(res.data)
              if (res.statusCode === 200) {
                resolve(res.data)
              } else if (res.statusCode === 401) {
                wx.showSuccessToast('请先登录！')
              } else if (res.statusCode === 500) {
                wx.showSuccessToast('服务器错误！')
              } else {
                reject(res.errMsg)
              }
            },
            fail: err => {
              reject(err)
            }
          })
        })
      },

      // 成功Toast提示
      wx.showSuccessToast = (msg) => {
        wx.showToast({
          title: msg,
          icon: 'none',
          duration: 3000
        })
      },

      // 失败Toast提示
      wx.showErrorToast = (msg) => {
        wx.showToast({
          title: msg,
          // image: '/images/icon_error.png'
          duration: 3000
        })
      }
  }
}