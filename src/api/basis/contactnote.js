import request from '@/utils/request'
// 查询集合
export function fetchList(query) {
  return request({
    url: '/basis/contactnote/getPage',
    method: 'get',
    params: query
  })
}
// 添加
export function addObj(obj) {
  return request({
    url: '/basis/contactnote',
    method: 'post',
    data: obj
  })
}
// 根据ID获取
export function getObj(id) {
  return request({
    url: '/basis/contactnote/' + id,
    method: 'get'
  })
}
// 删除
export function delObj(id) {
  return request({
    url: '/basis/contactnote/' + id,
    method: 'delete'
  })
}
// 更新
export function putObj(obj) {
  return request({
    url: '/basis/contactnote',
    method: 'put',
    data: obj
  })
}
