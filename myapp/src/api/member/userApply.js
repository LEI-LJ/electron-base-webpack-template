import request from '@/utils/request'

// 查询网维注册申请列表
export function listUserApply(query) {
  return request({
    url: '/member/userApply/list',
    method: 'get',
    params: query
  })
}

// 查询网维注册申请详细
export function getUserApply(id) {
  return request({
    url: '/member/userApply/' + id,
    method: 'get'
  })
}

// 新增网维注册申请
export function addUserApply(data) {
  return request({
    url: '/member/userApply',
    method: 'post',
    data: data
  })
}

// 修改网维注册申请
export function updateUserApply(data) {
  return request({
    url: '/member/userApply',
    method: 'put',
    data: data
  })
}

// 删除网维注册申请
export function delUserApply(id) {
  return request({
    url: '/member/userApply/' + id,
    method: 'delete'
  })
}
