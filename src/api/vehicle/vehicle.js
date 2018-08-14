import request from '@/utils/request'
// 查询集合
export function fetchList(query) {
  return request({
    url: '/vehicle/car/getPage',
    method: 'get',
    params: query
  })
}// 查询集合
export function queryVehicleList() {
  return request({
    url: '/vehicle/car/queryVehicleList',
    method: 'get'
  })
}
// 添加车辆信息
export function addObj(key, obj) {
  return request({
    url: '/vehicle/' + key,
    method: 'post',
    data: obj
  })
}

// 删除车辆信息
export function delVehicleSub(key, obj) {
  if (key=='insurance') {
    key += '/del/'+obj.insuranceId
  }
  return request({
    url: '/vehicle/' + key,
    method: 'delete',
  })
}
// 根据ID获取
export function getObj(id) {
  return request({
    url: '/vehicle/car/' + id,
    method: 'get'
  })
}
// 删除
export function delObj(id) {
  return request({
    url: '/vehicle/car/' + id,
    method: 'delete'
  })
}
// 更新
export function putObj(key, obj) {
  return request({
    url: '/vehicle/' + key,
    method: 'put',
    data: obj
  })
}
