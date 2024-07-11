import request from '@/utils/request'

// 查询网吧与产品绑定列表
export function listInternetbarProductBind(query) {
  return request({
    url: '/member/internetbarProductBind/list',
    method: 'get',
    params: query
  })
}

// 查询网吧与产品绑定详细
export function getInternetbarProductBind(id) {
  return request({
    url: '/member/internetbarProductBind/' + id,
    method: 'get'
  })
}

// 查询网吧与产品绑定详细
export function getExpireInfo(userId,internetBarId) {
  return request({
    url: '/member/internetbarProductBind/getExpireInfo/' + userId+'/'+internetBarId,
    method: 'get'
  })
}

// 新增网吧与产品绑定
export function addInternetbarProductBind(data) {
  return request({
    url: '/member/internetbarProductBind',
    method: 'post',
    data: data
  })
}

// 修改网吧与产品绑定
export function updateInternetbarProductBind(data) {
  return request({
    url: '/member/internetbarProductBind',
    method: 'put',
    data: data
  })
}

// 删除网吧与产品绑定
export function delInternetbarProductBind(id) {
  return request({
    url: '/member/internetbarProductBind/' + id,
    method: 'delete'
  })
}
