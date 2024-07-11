import request from '@/utils/request'

// 登录方法
export function login(username, password, code, uuid, loginType, smsCode) {
  const data = {
    username: username,
    password: password,
    code: code,
    uuid: uuid,
    loginType: loginType,
    smsCode: smsCode
  }
  return request({
    url: '/login',
    headers: {
      isToken: false
    },
    method: 'post',
    data: data
  })
}

// 注册方法
export function register(data) {
  return request({
    url: '/register',
    headers: {
      isToken: false
    },
    method: 'post',
    data: data
  })
}

// 获取用户详细信息
export function getInfo() {
  return request({
    url: '/getInfo',
    method: 'get'
  })
}

// 退出方法
export function logout() {
  return request({
    url: '/logout',
    method: 'post'
  })
}

// 获取验证码
export function getCodeImg() {
  console.log(request, 'request')
  return request({
    url: '/captchaImage',
    headers: {
      isToken: false
    },
    method: 'get',
    timeout: 20000
  })
}

// 根据账户获取短信验证码
export function getSmsCode(username, code, uuid) {
  return request({
    url: '/getSmsCode',
    headers: {
      isToken: false
    },
    method: 'post',
    data: {
      username: username,
      code: code,
      uuid: uuid,
    },
    timeout: 20000
  })
}
