import request from '@/utils/request'

// 查询游戏上报日志列表
export function listClientGameReportLog(query) {
  return request({
    // list 单表 list2 id分表 list3 日分表
    url: '/member/clientGameReportLog/list3',
    method: 'get',
    params: query
  })
}

// 查询游戏上报日志列表
export function getGameReportLogList4(query) {
  return request({
    // list4 日分表 综合30天查询 不分页
    url: '/member/clientGameReportLog/list4',
    method: 'get',
    params: query
  })
}

// 查询游戏上报日志详细
export function getClientGameReportLog(id) {
  return request({
    url: '/member/clientGameReportLog/' + id,
    method: 'get'
  })
}

// 新增游戏上报日志
export function addClientGameReportLog(data) {
  return request({
    url: '/member/clientGameReportLog',
    method: 'post',
    data: data
  })
}

// 修改游戏上报日志
export function updateClientGameReportLog(data) {
  return request({
    url: '/member/clientGameReportLog',
    method: 'put',
    data: data
  })
}

// 删除游戏上报日志
export function delClientGameReportLog(id) {
  return request({
    url: '/member/clientGameReportLog/' + id,
    method: 'delete'
  })
}
