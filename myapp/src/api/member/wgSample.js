import request from '@/utils/request'

// 查询外挂样本列表
export function listWgSample(query) {
  return request({
    url: '/member/wgSample/list',
    method: 'get',
    params: query
  })
}

// 查询外挂样本详细
export function getWgSample(id) {
  return request({
    url: '/member/wgSample/' + id,
    method: 'get'
  })
}

// 新增外挂样本
export function addWgSample(data) {
  return request({
    url: '/member/wgSample',
    method: 'post',
    data: data
  })
}

// 修改外挂样本
export function updateWgSample(data) {
  return request({
    url: '/member/wgSample',
    method: 'put',
    data: data
  })
}

// 修改外挂样本
export function auditWgSample(data) {
  return request({
    url: '/member/wgSample/audit',
    method: 'put',
    data: data
  })
}

// 删除外挂样本
export function delWgSample(id) {
  return request({
    url: '/member/wgSample/' + id,
    method: 'delete'
  })
}
