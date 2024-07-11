import request from '@/utils/request'

// 查询盗号上报日志列表
export function listDhLog(query) {
  return request({
    url: '/member/dhLog/list',
    method: 'get',
    params: query
  })
}

// 查询盗号上报日志详细
export function getDhLog(id) {
  return request({
    url: '/member/dhLog/' + id,
    method: 'get'
  })
}

// 新增盗号上报日志
export function addDhLog(data) {
  return request({
    url: '/member/dhLog',
    method: 'post',
    data: data
  })
}

// 修改盗号上报日志
export function updateDhLog(data) {
  return request({
    url: '/member/dhLog',
    method: 'put',
    data: data
  })
}

// 删除盗号上报日志
export function delDhLog(id) {
  return request({
    url: '/member/dhLog/' + id,
    method: 'delete'
  })
}
