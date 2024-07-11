import request from '@/utils/request'

// 查询终端监控日志列表
export function listClientMonitorLog(query) {
  return request({
    url: '/member/clientMonitorLog/list3',
    method: 'get',
    params: query
  })
}

// 查询终端监控日志详细
export function getClientMonitorLog(id) {
  return request({
    url: '/member/clientMonitorLog/' + id,
    method: 'get'
  })
}

// 新增终端监控日志
export function addClientMonitorLog(data) {
  return request({
    url: '/member/clientMonitorLog',
    method: 'post',
    data: data
  })
}

// 修改终端监控日志
export function updateClientMonitorLog(data) {
  return request({
    url: '/member/clientMonitorLog',
    method: 'put',
    data: data
  })
}

// 删除终端监控日志
export function delClientMonitorLog(id) {
  return request({
    url: '/member/clientMonitorLog/' + id,
    method: 'delete'
  })
}
