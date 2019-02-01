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
                wx.showErrorToast('请先登录！')
                wx.removeStorageSync('userInfo')
                wx.removeStorageSync('token')
              } else if (res.statusCode === 500) {
                wx.showErrorToast('服务器错误！')
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

      // 微信小程序授权登录
      wx.loginByWeixin = (userInfo) => {
        let code = null
        return new Promise(function(resolve, reject) {
          return wx.log_in().then(res => {
            code = res.code
            return userInfo
          }).then(userInfo => {
            wx.requestData(api.login, {
              code: code,
              userInfo: userInfo
            }).then(res => {
              if (res.code === 1) {
                wx.showSuccessToast('登录成功')

                // 缓存用户信息和 token
                try {
                  wx.setStorageSync('userInfo', userInfo)
                  wx.setStorageSync('token', res.token)
                } catch (e) {
                  console.log('本地数据同步缓存发生错误' + e)
                }

                resolve(res)
              } else {
                wx.showErrorToast(res.errMsg)
                reject(res)
              }
            }).catch(err => {
              reject(err)
            })
          }).catch(err => {
            reject(err)
          })
        })
      },

      wx.log_in = () => {
        return new Promise(function(resolve, reject) {
          wx.login({
            success: function(res) {
              if (res.code) {
                console.log('登录成功')
                resolve(res);
              } else {
                reject(res);
              }
            },
            fail: function(err) {
              reject(err);
            }
          });
        });
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
          icon: 'none',
          // image: '/images/icon_error.png'
          duration: 3000
        })
      }
  }
}