import request from '@/utils/request'

// 查询外挂特征列表
export function listWgFeature(query) {
  return request({
    url: '/member/wgFeature/list',
    method: 'get',
    params: query
  })
}

// 查询外挂特征列表
export function selectOptionFeatureData(query) {
  return request({
    url: '/member/wgFeature/selectOptionData',
    method: 'get',
    params: query
  })
}

// 查询外挂特征详细
export function getWgFeature(id) {
  return request({
    url: '/member/wgFeature/' + id,
    method: 'get'
  })
}

// 新增外挂特征
export function addWgFeature(data) {
  return request({
    url: '/member/wgFeature',
    method: 'post',
    data: data
  })
}

// 修改外挂特征
export function updateWgFeature(data) {
  return request({
    url: '/member/wgFeature',
    method: 'put',
    data: data
  })
}

// 删除外挂特征
export function delWgFeature(id) {
  return request({
    url: '/member/wgFeature/' + id,
    method: 'delete'
  })
}
