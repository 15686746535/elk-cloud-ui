import request from '@/utils/request'
// 查询集合
export function getexambespeak(query) {
  return request({
    url: '/student/exambespeak/getPage',
    method: 'get',
    params: query
  })
}
// 添加
export function addObj(obj) {
  return request({
    url: '/student/exambespeak',
    method: 'post',
    data: obj
  })
}
// 根据ID获取
export function getexambespeakbyid(id) {
  return request({
    url: '/student/exambespeak/' + id,
    method: 'get'
  })
}
// 删除
export function delexambespeak(id) {
  return request({
    url: '/student/exambespeak/' + id,
    method: 'delete'
  })
}
// 更新
export function putexambespeak(obj) {
  return request({
    url: '/student/exambespeak',
    method: 'put',
    data: obj
  })
}
