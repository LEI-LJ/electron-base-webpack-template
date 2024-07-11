import request from '@/utils/request'

// 查询终端任务列表
export function listClientTask(query) {
  return request({
    url: '/member/clientTask/list',
    method: 'get',
    params: query
  })
}

// 查询终端任务详细
export function getClientTask(id) {
  return request({
    url: '/member/clientTask/' + id,
    method: 'get'
  })
}

// 新增终端任务
export function addClientTask(data) {
  return request({
    url: '/member/clientTask',
    method: 'post',
    data: data
  })
}

// 修改终端任务
export function updateClientTask(data) {
  return request({
    url: '/member/clientTask',
    method: 'put',
    data: data
  })
}

// 删除终端任务
export function delClientTask(id) {
  return request({
    url: '/member/clientTask/' + id,
    method: 'delete'
  })
}
