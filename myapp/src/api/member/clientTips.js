import request from '@/utils/request'

// 查询终端小知识列表
export function listClientTips(query) {
  return request({
    url: '/member/clientTips/list',
    method: 'get',
    params: query
  })
}

// 查询终端小知识详细
export function getClientTips(id) {
  return request({
    url: '/member/clientTips/' + id,
    method: 'get'
  })
}

// 新增终端小知识
export function addClientTips(data) {
  return request({
    url: '/member/clientTips',
    method: 'post',
    data: data
  })
}

// 修改终端小知识
export function updateClientTips(data) {
  return request({
    url: '/member/clientTips',
    method: 'put',
    data: data
  })
}

// 删除终端小知识
export function delClientTips(id) {
  return request({
    url: '/member/clientTips/' + id,
    method: 'delete'
  })
}
