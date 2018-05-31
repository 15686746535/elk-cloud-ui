import request from '@/utils/request'
// 查询集合
export function shuttlestudentList(query) {
  return request({
    url: '/bespeak/shuttlestudent/getPage',
    method: 'get',
    params: query
  })
}
// 添加
export function addShuttleStudent(obj) {
  return request({
    url: '/bespeak/shuttlestudent',
    method: 'post',
    data: obj
  })
}

// 根据ID获取
export function getShuttleStudent(id) {
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
export function delShuttleStudent(id) {
  return request({
    url: '/bespeak/shuttlestudent/' + id,
    method: 'delete'
  })
}
// 更新
export function putShuttleStudent(obj) {
  return request({
    url: '/bespeak/shuttlestudent',
    method: 'put',
    data: obj
  })
}
