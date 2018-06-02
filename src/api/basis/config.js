import request from '@/utils/request'
// 查询集合
export function getConfigList(query) {
  return request({
    url: '/basis/config/getPage',
    method: 'get',
    params: query
  })
}
// 添加
export function addConfig(obj) {
  return request({
    url: '/basis/config',
    method: 'post',
    data: obj
  })
}
// 根据ID获取
export function getConfig(id) {
  return request({
    url: '/basis/config/' + id,
    method: 'get'
  })
}
// 根据ID获取
export function getByKey(id) {
  return request({
    url: '/basis/config/getByKey/' + id,
    method: 'get'
  })
}
// 删除
export function delConfig(id) {
  return request({
    url: '/basis/config/' + id,
    method: 'delete'
  })
}
// 更新
export function putConfig(obj) {
  return request({
    url: '/basis/config',
    method: 'put',
    data: obj
  })
}

export function qiniuConfig() {
  return request({
    url: '/oss/config',
    method: 'get'
  })
}

export function saveConfig(obj) {
  return request({
    url: '/oss/saveConfig',
    method: 'post',
    data: obj
  })
}
