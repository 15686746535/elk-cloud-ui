import request from '@/utils/request'
// 查询集合
export function fetchList(query) {
  return request({
    url: '/visit/intention/getPage',
    method: 'get',
    params: query
  })
}
// 添加
export function addObj(obj) {
  console.log('====12138===')
  console.log(obj)
  return request({
    url: '/visit/intention',
    method: 'post',
    data: obj
  })
}
// 根据ID获取
export function getIntentionByMobile(id) {
  return request({
    url: '/visit/intention/queryIntentionByMobile/' + id,
    method: 'get'
  })
}
// 根据ID获取
export function getObj(id) {
  return request({
    url: '/visit/intention/' + id,
    method: 'get'
  })
}
// 删除
export function delObj(id) {
  return request({
    url: '/visit/intention/' + id,
    method: 'delete'
  })
}
// 更新
export function putObj(obj) {
  return request({
    url: '/visit/intention/',
    method: 'put',
    data: obj
  })
}
// 更新
export function putIntention(obj) {
  return request({
    url: '/visit/intention/redistribution',
    method: 'put',
    data: obj
  })
}
// 获取负责人
export function getOperator(id) {
  return request({
    url: '/visit/intention/operator',
    method: 'get'
  })
}

