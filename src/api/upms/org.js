import request from '@/utils/request'

export function fetchTree() {
  return request({
    url: '/upms/org/tree',
    method: 'get'
  })
}

export function addObj(obj) {
  console.log('========== 这里是保存接口  ============')
  console.log(obj)
  return request({
    url: '/upms/org/',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/upms/org/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/upms/org/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  console.log('========== 这里是修改接口  ============')
  console.log(obj)
  return request({
    url: '/upms/org',
    method: 'put',
    data: obj
  })
}
