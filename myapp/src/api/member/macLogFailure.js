import request from '@/utils/request'

// 查询Mac地址认证失败记录列表
export function listMacLogFailure(query) {
  return request({
    url: '/member/macLogFailure/list',
    method: 'get',
    params: query
  })
}

// 查询Mac地址认证失败记录详细
export function getMacLogFailure(id) {
  return request({
    url: '/member/macLogFailure/' + id,
    method: 'get'
  })
}

// 新增Mac地址认证失败记录
export function addMacLogFailure(data) {
  return request({
    url: '/member/macLogFailure',
    method: 'post',
    data: data
  })
}

// 修改Mac地址认证失败记录
export function updateMacLogFailure(data) {
  return request({
    url: '/member/macLogFailure',
    method: 'put',
    data: data
  })
}

// 删除Mac地址认证失败记录
export function delMacLogFailure(id) {
  return request({
    url: '/member/macLogFailure/' + id,
    method: 'delete'
  })
}

// 批量添加Mac地址
export function batchAddMacLog(internetBarId,id) {
  return request({
    url: '/member/macLogFailure/batchAddMacLog/'+internetBarId+'/' + id,
    method: 'put'
  })
}
