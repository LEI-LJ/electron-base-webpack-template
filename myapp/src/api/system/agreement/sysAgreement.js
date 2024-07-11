import request from '@/utils/request'

// 查询平台协议列表
export function listSysAgreement(query) {
  return request({
    url: '/system/sysAgreement/list',
    method: 'get',
    params: query
  })
}

// 查询平台协议详细
export function getSysAgreement(id) {
  return request({
    url: '/system/sysAgreement/' + id,
    method: 'get'
  })
}

// 新增平台协议
export function addSysAgreement(data) {
  return request({
    url: '/system/sysAgreement',
    method: 'post',
    data: data
  })
}

// 更新状态 -- 平台协议
export function changeStatus(data) {
  return request({
    url: '/system/sysAgreement/changeStatus',
    method: 'put',
    data: data
  })
}

