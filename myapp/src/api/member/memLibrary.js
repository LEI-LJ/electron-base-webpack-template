import request from '@/utils/request'

// 查询素材库列表
export function listMemLibrary(query) {
  return request({
    url: '/member/memLibrary/list',
    method: 'get',
    params: query
  })
}

// 查询素材库详细
export function getMemLibrary(id) {
  return request({
    url: '/member/memLibrary/' + id,
    method: 'get'
  })
}

// 新增素材库
export function addMemLibrary(data) {
  return request({
    url: '/member/memLibrary',
    method: 'post',
    data: data
  })
}

// 修改素材库
export function updateMemLibrary(data) {
  return request({
    url: '/member/memLibrary',
    method: 'put',
    data: data
  })
}

// 删除素材库
export function delMemLibrary(id) {
  return request({
    url: '/member/memLibrary/' + id,
    method: 'delete'
  })
}
