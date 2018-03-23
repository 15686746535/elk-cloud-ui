import request from '@/utils/request'
// 查询集合
export function getBatchList(query) {
  return request({
    url: '/stu/batch/getPage',
    method: 'get',
    params: query
  })
}
export function getBatch(id) {
  return request({
    url: '/stu/batch/getBatch/' + id,
    method: 'get'
  })
}
// 添加
export function addObj(obj) {
  return request({
    url: '/stu/batch',
    method: 'post',
    data: obj
  })
}
// 根据ID获取
export function getObj(id) {
  return request({
    url: '/stu/batch/' + id,
    method: 'get'
  })
}
// 删除
export function delObj(id) {
  return request({
    url: '/stu/batch/' + id,
    method: 'delete'
  })
}
// 更新
export function putObj(obj) {
  return request({
    url: '/stu/batch',
    method: 'put',
    data: obj
  })
}
