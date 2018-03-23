import request from '@/utils/request'
// 查询集合
export function getGrade(query) {
  return request({
    url: '/stu/examnote/getPage',
    method: 'get',
    params: query
  })
}
// 添加
export function addObj(obj) {
  return request({
    url: '/stu/revisitstudent',
    method: 'post',
    data: obj
  })
}
// 根据ID获取
export function getObj(id) {
  return request({
    url: '/stu/revisitstudent/' + id,
    method: 'get'
  })
}
// 删除
export function delObj(id) {
  return request({
    url: '/stu/revisitstudent/' + id,
    method: 'delete'
  })
}
// 更新
export function putObj(obj) {
  return request({
    url: '/stu/revisitstudent',
    method: 'put',
    data: obj
  })
}
