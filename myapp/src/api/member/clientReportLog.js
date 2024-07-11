import request from '@/utils/request'

// 查询终端上报日志列表 --废弃
export function listClientReportLog(query) {
  return request({
    // list 单表 list2 id分表 list3 日分表
    url: '/member/clientReportLog/list2',
    method: 'get',
    params: query
  })
}

// 查询终端上报日志列表
export function listClientReportLog3(query) {
  return request({
    // list 单表 list2 id分表 list3 日分表
    url: '/member/clientReportLog/list3',
    method: 'get',
    params: query
  })
}

// 查询终端上报日志列表
export function listClientReportLog4(query) {
  return request({
    // list 单表 list2 id分表 list3 日分表 list4 网维网吧Id分表
    url: '/member/clientReportLog/list4',
    method: 'get',
    params: query
  })
}

// 查询终端上报日志详细
export function getClientReportLog(id) {
  return request({
    url: '/member/clientReportLog/' + id,
    method: 'get'
  })
}

