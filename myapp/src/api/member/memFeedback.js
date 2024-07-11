import request from '@/utils/request'

// 查询防御反馈列表
export function listMemFeedback(query) {
  return request({
    url: '/member/memFeedback/list',
    method: 'get',
    params: query
  })
}

// 查询防御反馈详细
export function getMemFeedback(id) {
  return request({
    url: '/member/memFeedback/' + id,
    method: 'get'
  })
}

// 新增防御反馈
export function addMemFeedback(data) {
  return request({
    url: '/member/memFeedback',
    method: 'post',
    data: data
  })
}

// 修改防御反馈
export function updateMemFeedback(data) {
  return request({
    url: '/member/memFeedback',
    method: 'put',
    data: data
  })
}

// 删除防御反馈
export function delMemFeedback(id) {
  return request({
    url: '/member/memFeedback/' + id,
    method: 'delete'
  })
}


// 变更状态
export function updateStatus(id) {
  return request({
    url: '/member/memFeedback/updateStatus/' + id,
    method: 'put'
  })
}
