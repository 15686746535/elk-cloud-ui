import request from '@/utils/request'
// 查询集合
export function fetchList(query) {
  return request({
    url: '/vehicle/vehicle/getPage',
    method: 'get',
    params: query
  })
}
// 添加车辆信息
export function addObj(key, obj) {
  return request({
    url: '/vehicle/' + key + '/',
    method: 'post',
    data: obj
  })
}
// 添加车辆信息
export function addVehicle(obj) {
  return request({
    url: '/vehicle/vehicle/',
    method: 'post',
    data: obj
  })
}
// 添加车辆证书信息
export function addCertificate(obj) {
  return request({
    url: '/vehicle/certificate/',
    method: 'post',
    data: obj
  })
}
// 添加车辆技术信息
export function addTechnical(obj) {
  return request({
    url: '/vehicle/technical/',
    method: 'post',
    data: obj
  })
}
// 添加车辆安全信息
export function addSafety(obj) {
  return request({
    url: '/vehicle/safety/',
    method: 'post',
    data: obj
  })
}
// 根据ID获取
export function getObj(id) {
  return request({
    url: '/vehicle/vehicle/' + id,
    method: 'get'
  })
}
// 删除
export function delObj(id) {
  return request({
    url: '/vehicle/vehicle/' + id,
    method: 'delete'
  })
}
// 更新
export function putObj(key, obj) {
  return request({
    url: '/vehicle/' + key + '/',
    method: 'put',
    data: obj
  })
}
// 更新车辆信息
export function putVehicle(obj) {
  return request({
    url: '/vehicle/vehicle/',
    method: 'put',
    data: obj
  })
}
// 更新车辆证书信息
export function putCertificate(obj) {
  return request({
    url: '/vehicle/certificate/',
    method: 'put',
    data: obj
  })
}
// 更新车辆技术信息
export function putTechnical(obj) {
  return request({
    url: '/vehicle/technical/',
    method: 'put',
    data: obj
  })
}
// 更新车辆安全信息
export function putSafety(obj) {
  return request({
    url: '/vehicle/safety/',
    method: 'put',
    data: obj
  })
}
