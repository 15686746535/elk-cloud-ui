import request from '@/utils/request'
// 查询集合
export function getServiceChargeList(query) {
  return request({
    url: '/finance/service/charge/getPage',
    method: 'get',
    params: query
  })
}
// 一次收费
export function saveServiceCharge(obj) {
  return request({
    url: '/finance/service/charge',
    method: 'post',
    data: obj
  })
}
// 二次收费
export function twoPayment(obj) {
  return request({
    url: '/finance/service/charge/twoPayment',
    method: 'post',
    data: obj
  })
}
// 根据ID获取
export function queryMoneyListById(id) {
  return request({
    url: '/finance/service/charge/' + id,
    method: 'get'
  })
}
// 根据ID获取
export function getServiceCharge(id) {
  return request({
    url: '/finance/service/charge/' + id,
    method: 'get'
  })
}
// 删除
export function delServiceCharge(id) {
  return request({
    url: '/finance/service/charge/' + id,
    method: 'delete'
  })
}
// 更新
export function putServiceCharge(obj) {
  return request({
    url: '/finance/service/charge',
    method: 'put',
    data: obj
  })
}

export function querySerialNumber(time) {
  return request({
    url: '/finance/service/charge/querySerialNumber/' + time,
    method: 'get'
  })
}
export function updateFinaceState(dat) {
  return request({
    url: '/finance/service/charge/updatestate',
    method: 'post',
    data: dat
  })
}

export function writeoff(id) {
  return request({
    url: '/finance/service/charge/writeoff/' + id,
    method: 'post'
  })
}

export function getServiceByChargeId(chargeId) {
  return request({
    url: '/finance/service/charge/update/' + chargeId,
    method: 'get'
  })
}

export function getChargeId(params) {
  return request({
    url: '/finance/service/charge/paging',
    method: 'get',
    params: params
  })
}
export function downloadExcel(params) {
  return request({
    url: '/export/charge',
    method: 'get',
    params: params,
    responseType: 'arraybuffer'
  })
}
