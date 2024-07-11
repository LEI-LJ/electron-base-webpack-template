import request from '@/utils/request'

// 查询网吧产品日志列表
export function listInternetbarProductLog(query) {
  return request({
    url: '/member/internetbarProductLog/list',
    method: 'get',
    params: query
  })
}

// 查询网吧产品日志详细
export function getInternetbarProductLog(id) {
  return request({
    url: '/member/internetbarProductLog/' + id,
    method: 'get'
  })
}

// 新增网吧产品日志
export function addInternetbarProductLog(data) {
  return request({
    url: '/member/internetbarProductLog',
    method: 'post',
    data: data
  })
}

// 修改网吧产品日志
export function updateInternetbarProductLog(data) {
  return request({
    url: '/member/internetbarProductLog',
    method: 'put',
    data: data
  })
}

// 删除网吧产品日志
export function delInternetbarProductLog(id) {
  return request({
    url: '/member/internetbarProductLog/' + id,
    method: 'delete'
  })
}
