import request from '@/utils/request'
// 查询集合
export function getVehiclePeriodList(query) {
  return request({
    url: '/bespeak/vehicleperiod/getPage',
    method: 'get',
    params: query
  })
}
// 查询集合
export function getShuttledList(query) {
  return request({
    url: '/bespeak/vehicleperiod/tomorrow',
    method: 'get',
    params: query
  })
}
// 添加
export function addVehiclePeriod(obj) {
  return request({
    url: '/bespeak/vehicleperiod',
    method: 'post',
    data: obj
  })
}
// 根据ID获取
export function getVehiclePeriod(id) {
  return request({
    url: '/bespeak/vehicleperiod/' + id,
    method: 'get'
  })
}
// 根据ID获取约车日志
export function getVehiclePeriodByStudentId(id) {
  return request({
    url: '/bespeak/vehicleperiod/queryVehiclePeriodByStudentId/' + id,
    method: 'get'
  })
}
// 根据ID获取约车日志
export function getClassByCoachId(id) {
  return request({
    url: '/bespeak/vehicleperiod/getClassByCoachId/' + id,
    method: 'get'
  })
}
// 删除
export function delVehiclePeriod(id) {
  return request({
    url: '/bespeak/vehicleperiod/' + id,
    method: 'delete'
  })
}
// 更新
export function putVehiclePeriod(obj) {
  return request({
    url: '/bespeak/vehicleperiod',
    method: 'put',
    data: obj
  })
}
