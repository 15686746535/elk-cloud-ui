import request from '@/utils/request'
// 查询集合
export function getList(query) {
  return request({
    url: '/finance/payment/code/getList',
    method: 'get',
    params: query
  })
}
// 查询集合
export function getPage(query) {
  return request({
    url: '/finance/payment/code/getPage',
    method: 'get',
    params: query
  })
}
export function getObj(code) {
  return request({
    url: '/finance/payment/code/' + code,
    method: 'get'
  })
}
// 添加
export function addObj(obj) {
  return request({
    url: '/finance/payment/code',
    method: 'post',
    data: obj
  })
}
// 更新
export function putObj(obj) {
  return request({
    url: '/finance/payment/code',
    method: 'put',
    data: obj
  })
}

