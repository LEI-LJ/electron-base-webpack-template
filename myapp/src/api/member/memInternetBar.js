import request from '@/utils/request'

// 查询网吧数据信息列表
export function listMemInternetBar(query) {
  return request({
    url: '/member/memInternetBar/list',
    method: 'get',
    params: query
  })
}

// 查询网吧数据信息详细
export function getMemInternetBar(id) {
  return request({
    url: '/member/memInternetBar/' + id,
    method: 'get'
  })
}

// 新增网吧数据信息
export function addMemInternetBar(data) {
  return request({
    url: '/member/memInternetBar',
    method: 'post',
    data: data
  })
}

// 修改网吧数据信息
export function updateMemInternetBar(data) {
  return request({
    url: '/member/memInternetBar',
    method: 'put',
    data: data
  })
}

// 删除网吧数据信息
export function delMemInternetBar(id) {
  return request({
    url: '/member/memInternetBar/' + id,
    method: 'delete'
  })
}

// 删除网吧数据信息
export function delMemInternetBar2(id) {
  return request({
    url: '/member/memInternetBar/del/' + id,
    method: 'delete'
  })
}

// 修改网吧状态
export function changeStatus(data) {
  return request({
    url: '/member/memInternetBar/changeStatus',
    method: 'put',
    data: data
  })
}

// 取消激活状态
export function cancelActive(clientBarcodeBindId) {
  return request({
    url: '/member/memInternetBar/cancelActive/'+clientBarcodeBindId,
    method: 'put'
  })
}

// 查询网吧激活服务端数据信息列表
export function activeList(query) {
  return request({
    url: '/member/memInternetBar/activeList',
    method: 'get',
    params: query
  })
}

// 更新网吧识别码
export function updateBarCode(id) {
  return request({
    url: '/member/memInternetBar/updateBarCode/' + id,
    method: 'put'
  })
}


// 获取导入mac地址数量限制
export function getImportLimit() {
  return request({
    url: '/member/memInternetBar/mac/getImportLimit',
    method: 'get'
  })
}
