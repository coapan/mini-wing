// 接口地址
const apiDev = 'http://192.168.1.2'
const apiPro = 'https://api.phpzhi.com'
const apiRoot = apiDev + '/api'

export default {
  index: apiRoot + '/index/index',
  login: apiRoot + '/user/login'
}