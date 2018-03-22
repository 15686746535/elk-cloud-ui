import request from '@/utils/request'
// 查询集合
export function fetchList(query) {
  return request({
    url: '/car/car/getPage',
    method: 'get',
    params: query
  })
}
// 添加车辆信息
export function addObj(key, obj) {
  return request({
    url: '/car/' + key,
    method: 'post',
    data: obj
  })
}
// 根据ID获取
export function getObj(id) {
  return request({
    url: '/car/car/' + id,
    method: 'get'
  })
}
// 删除
export function delObj(id) {
  return request({
    url: '/car/car/' + id,
    method: 'delete'
  })
}
// 更新
export function putObj(key, obj) {
  return request({
    url: '/car/' + key,
    method: 'put',
    data: obj
  })
}
