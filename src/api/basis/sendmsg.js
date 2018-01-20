import request from '@/utils/request'
// 查询集合
export function fetchList(query) {
  console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
  console.log(query)
  return request({
    url: '/basis/sendmsg/getPage',
    method: 'get',
    params: query
  })
}
// 添加
export function addObj(obj) {
  return request({
    url: '/basis/sendmsg/',
    method: 'post',
    data: obj
  })
}
// 根据ID获取
export function getObj(id) {
  return request({
    url: '/basis/sendmsg/' + id,
    method: 'get'
  })
}
// 删除
export function delObj(id) {
  return request({
    url: '/basis/sendmsg/' + id,
    method: 'delete'
  })
}
// 更新
export function putObj(obj) {
  return request({
    url: '/basis/sendmsg',
    method: 'put',
    data: obj
  })
}
