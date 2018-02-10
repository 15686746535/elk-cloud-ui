import request from '@/utils/request'
// 查询集合
export function followUpList(query) {
  return request({
    url: '/visit/followup/getPage',
    method: 'get',
    params: query
  })
}
// 添加
export function addFollowUp(obj) {
  return request({
    url: '/visit/followup',
    method: 'post',
    data: obj
  })
}
// 根据ID获取
export function getFollowUp(id) {
  return request({
    url: '/visit/followup/' + id,
    method: 'get'
  })
}
// 删除
export function delFollowUp(id) {
  return request({
    url: '/visit/followup/' + id,
    method: 'delete'
  })
}
// 更新
export function putFollowUp(obj) {
  return request({
    url: '/visit/followup',
    method: 'put',
    data: obj
  })
}
