import request from '@/utils/request'
// 查询集合
export function getPage(query) {
  return request({
    url: '/finance/payment/getPage',
    method: 'get',
    params: query
  })
}
export function getObj(code) {
  return request({
    url: '/finance/payment/' + code,
    method: 'get'
  })
}
// 添加
export function addObj(obj) {
  return request({
    url: '/finance/payment',
    method: 'post',
    data: obj
  })
}
// 更新
export function putObj(obj) {
  return request({
    url: '/finance/payment',
    method: 'put',
    data: obj
  })
}
// 审核
export function auditor(obj) {
  return request({
    url: '/finance/payment/auditor',
    method: 'put',
    data: obj
  })
}

