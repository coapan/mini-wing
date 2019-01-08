import api from '../config/api.js'

// 小程序登录获取 code 值
function login() {
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
}

// 微信小程序授权登录
function loginByWeixin(userInfo) {
  let code = null
  return new Promise(function(resolve, reject) {
    return login().then(res => {
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
}
export default {
  login,
  loginByWeixin
}