import request from '@/utils/request'
// 查询集合
export function fetchList(query) {
  return request({
    url: '/bespeak/shuttlestudent/getPage',
    method: 'get',
    params: query
  })
}
// 添加
export function addObj(obj) {
  return request({
    url: '/bespeak/shuttlestudent',
    method: 'post',
    data: obj
  })
}

// 根据ID获取
export function getObj(id) {
  return request({
    url: '/bespeak/shuttlestudent/' + id,
    method: 'get'
  })
}
// 根据ID获取约车日志
export function getShuttleLogByStudentId(id) {
  return request({
    url: '/bespeak/shuttlestudent/queryShuttleLogByStudentId/' + id,
    method: 'get'
  })
}
// 删除
export function delObj(id) {
  return request({
    url: '/bespeak/shuttlestudent/' + id,
    method: 'delete'
  })
}
// 更新
export function putObj(obj) {
  return request({
    url: '/bespeak/shuttlestudent',
    method: 'put',
    params: obj
  })
}
