import request from '@/utils/request'

// 查询终端功能项目配置列表
export function listClientItemsConfig(query) {
  return request({
    url: '/member/clientItemsConfig/list',
    method: 'get',
    params: query
  })
}

// 查询终端功能项目配置详细
export function getClientItemsConfig(id) {
  return request({
    url: '/member/clientItemsConfig/' + id,
    method: 'get'
  })
}

// 新增终端功能项目配置
export function addClientItemsConfig(data) {
  return request({
    url: '/member/clientItemsConfig',
    method: 'post',
    data: data
  })
}
// 一键应用功能配置数据
export function handleBatchItemsConfig(id) {
  return request({
    url: '/member/clientItemsConfig/handleBatchItemsConfig/'+id,
    method: 'post'
  })
}

// 修改终端功能项目配置
export function updateClientItemsConfig(data) {
  return request({
    url: '/member/clientItemsConfig',
    method: 'put',
    data: data
  })
}

// 删除终端功能项目配置
export function delClientItemsConfig(id) {
  return request({
    url: '/member/clientItemsConfig/' + id,
    method: 'delete'
  })
}
