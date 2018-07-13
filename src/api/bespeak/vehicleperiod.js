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
// 添加
export function bespeakVehiclePeriod(obj) {
  return request({
    url: '/bespeak/vehicleperiod/bespeak',
    method: 'post',
    params: obj
  })
}
// 删除
export function deleteVehiclePeriodStudent(obj) {
  return request({
    url: '/bespeak/vehicleperiod/deleteVehiclePeriodStudent',
    method: 'delete',
    params: obj
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

export function disableVehicle(obj) {
  return request({
    url: '/bespeak/vehicleperiod/disableVehicle',
    method: 'post',
    data: { vid: obj.vid, state: obj.state }
  })
}
export function disablePeriod(obj) {
  return request({
    url: '/bespeak/vehicleperiod/disablePeriod',
    method: 'post',
    data: { pid: obj.pid, state: obj.state }
  })
}

