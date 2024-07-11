import request from '@/utils/request'

// 查询网吧推送消息订阅列表
export function listMemInternetBarSubscription(query) {
  return request({
    url: '/member/memInternetBarSubscription/list',
    method: 'get',
    params: query
  })
}

// 查询网吧推送消息订阅详细
export function getMemInternetBarSubscription(id) {
  return request({
    url: '/member/memInternetBarSubscription/' + id,
    method: 'get'
  })
}

// 获取网吧订阅邀请码
export function getInviteSubscriptionCode(internetBarId,id) {
  return request({
    url: '/member/memInternetBarSubscription/getInviteSubscriptionCode',
    method: 'get',
    params: { 'internetBarId':internetBarId,'id':id }
  })
}

// 新增网吧推送消息订阅
export function addMemInternetBarSubscription(data) {
  return request({
    url: '/member/memInternetBarSubscription',
    method: 'post',
    data: data
  })
}

// 修改网吧推送消息订阅
export function updateMemInternetBarSubscription(data) {
  return request({
    url: '/member/memInternetBarSubscription',
    method: 'put',
    data: data
  })
}

// 删除网吧推送消息订阅
export function delMemInternetBarSubscription(id) {
  return request({
    url: '/member/memInternetBarSubscription/' + id,
    method: 'delete'
  })
}

// 修改通知状态
export function changeStatus(data) {
  return request({
    url: '/member/memInternetBarSubscription/changeStatus',
    method: 'put',
    data: data
  })
}
