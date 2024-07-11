import request from '@/utils/request'

// 查询外挂上报日志列表
export function listClientWgReportLog(query) {
  return request({
    url: '/member/clientWgReportLog/list2',
    method: 'get',
    params: query
  })
}

// 查询外挂上报日志详细
export function getClientWgReportLog(id) {
  return request({
    url: '/member/clientWgReportLog/' + id,
    method: 'get'
  })
}

