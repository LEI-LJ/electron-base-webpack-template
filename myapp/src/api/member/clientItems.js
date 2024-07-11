import request from '@/utils/request'

// 查询终端功能项目列表
export function listClientItems(query) {
  return request({
    url: '/member/clientItems/list',
    method: 'get',
    params: query
  })
}

// 查询终端功能项目详细
export function getClientItems(id) {
  return request({
    url: '/member/clientItems/' + id,
    method: 'get'
  })
}

// 查询全部的有效的终端功能项目详细
export function getAllClientItems(query) {
  return request({
    url: '/member/clientItems/show/getAllClientItems',
    method: 'get',
    params: query
  })
}

// 新增终端功能项目
export function addClientItems(data) {
  return request({
    url: '/member/clientItems',
    method: 'post',
    data: data
  })
}

// 一键应用一级功能项
export function handleBatchItems(id) {
  return request({
    url: '/member/clientItems/handleBatchItems/'+id,
    method: 'post'
  })
}

// 保存发行配置
export function savePublish(data) {
  return request({
    url: '/member/clientItems/savePublish',
    method: 'post',
    data: data
  })
}

// 修改终端功能项目
export function updateClientItems(data) {
  return request({
    url: '/member/clientItems',
    method: 'put',
    data: data
  })
}

// 删除终端功能项目
export function delClientItems(id) {
  return request({
    url: '/member/clientItems/' + id,
    method: 'delete'
  })
}
