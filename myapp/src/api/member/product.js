import request from '@/utils/request'

// 查询充值产品列表
export function listProduct(query) {
  return request({
    url: '/member/product/list',
    method: 'get',
    params: query
  })
}

// 查询充值产品列表
export function getAllProduct(query) {
  return request({
    url: '/member/product/list/getAll',
    method: 'get',
    params: query
  })
}

// 查询充值产品详细
export function getProduct(id) {
  return request({
    url: '/member/product/' + id,
    method: 'get'
  })
}

// 新增充值产品
export function addProduct(data) {
  return request({
    url: '/member/product',
    method: 'post',
    data: data
  })
}

// 修改充值产品
export function updateProduct(data) {
  return request({
    url: '/member/product',
    method: 'put',
    data: data
  })
}// 更新状态 -- 充值产品
export function changeStatus(data) {
  return request({
    url: '/member/product/changeStatus',
    method: 'put',
    data: data
  })
}

// 删除充值产品
export function delProduct(id) {
  return request({
    url: '/member/product/' + id,
    method: 'delete'
  })
}
