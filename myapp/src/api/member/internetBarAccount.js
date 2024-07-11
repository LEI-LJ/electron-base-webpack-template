import request from '@/utils/request'

// 查询网吧账户列表
export function listInternetBarAccount(query) {
  return request({
    url: '/member/internetBarAccount/list',
    method: 'get',
    params: query
  })
}

// 获取下拉选网吧账户列表
export function getSelectInternetBarAccountList(query) {
  return request({
    url: '/member/internetBarAccount/select/List',
    method: 'get',
    params: query
  })
}

// 查询网吧账户详细
export function getInternetBarAccount(id) {
  return request({
    url: '/member/internetBarAccount/' + id,
    method: 'get'
  })
}

// 新增网吧账户
export function addInternetBarAccount(data) {
  return request({
    url: '/member/internetBarAccount',
    method: 'post',
    data: data
  })
}

// 绑定已有网吧账户
export function bindAccount(data) {
  return request({
    url: '/member/internetBarAccount/bindAccount',
    method: 'post',
    data: data
  })
}

// 解绑网吧账户
export function unbindAccount(data) {
  return request({
    url: '/member/internetBarAccount/unbind/account',
    method: 'post',
    data: data
  })
}

// 修改网吧账户
export function updateInternetBarAccount(data) {
  return request({
    url: '/member/internetBarAccount',
    method: 'put',
    data: data
  })
}

// 取消绑定微信
export function cancelWxAuthAccount(data) {
  return request({
    url: '/member/internetBarAccount/wxAuth/cancel',
    method: 'post',
    data: data
  })
}

// 获取账号绑定qrcode
export function getWxAuthAccountQrCode(query) {
  return request({
    url: '/member/internetBarAccount/wxAuth/getQrCode',
    method: 'get',
    params: query
  })
}

// 删除网吧账户
export function delInternetBarAccount(id) {
  return request({
    url: '/member/internetBarAccount/' + id,
    method: 'delete'
  })
}


