import request from '@/utils/request'

// 查询Mac地址记录列表
export function listMemMacLog(query) {
  return request({
    url: '/member/memMacLog/list',
    method: 'get',
    params: query
  })
}

// 查询Mac地址记录详细
export function getMemMacLog(id) {
  return request({
    url: '/member/memMacLog/' + id,
    method: 'get'
  })
}

// 新增Mac地址记录
export function addMemMacLog(data) {
  return request({
    url: '/member/memMacLog',
    method: 'post',
    data: data
  })
}

// 修改Mac地址记录
export function updateMemMacLog(data) {
  return request({
    url: '/member/memMacLog',
    method: 'put',
    data: data
  })
}

// 删除Mac地址记录
export function delMemMacLog(id) {
  return request({
    url: '/member/memMacLog/' + id,
    method: 'delete'
  })
}

// 清空mac地址
export function clearMemMacLog(internetBarId) {
  return request({
    url: '/member/memMacLog/clearData/' + internetBarId,
    method: 'delete'
  })
}

// 获取导入mac地址数量限制
export function getImportLimit() {
  return request({
    url: '/member/memMacLog/mac/getImportLimit',
    method: 'get'
  })
}

// 批量启用Mac地址记录
export function batchUpdateEnable(internetBarId,id) {
  return request({
    url: '/member/memMacLog/batchUpdateEnable/'+internetBarId+'/' + id,
    method: 'put'
  })
}

// 批量禁用Mac地址记录
export function batchUpdateDisable(internetBarId,id) {
  return request({
    url: '/member/memMacLog/batchUpdateDisable/'+internetBarId+'/' + id,
    method: 'put'
  })
}
