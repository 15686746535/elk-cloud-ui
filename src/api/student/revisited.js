import request from '@/utils/request'
// 查询集合
export function getRevisitedList(query) {
  return request({
    url: '/stu/revisited/getPage',
    method: 'get',
    params: query
  })
}
// 添加
export function addRevisited(obj) {
  return request({
    url: '/stu/revisited',
    method: 'post',
    params: obj
  })
}
// 根据ID获取
export function getRevisited(id) {
  return request({
    url: '/stu/revisited/' + id,
    method: 'get'
  })
}
// 删除
export function delRevisited(id) {
  return request({
    url: '/stu/revisited/' + id,
    method: 'delete'
  })
}
// 更新
export function putObj(obj) {
  return request({
    url: '/stu/revisited',
    method: 'put',
    data: obj
  })
}
