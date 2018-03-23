import request from '@/utils/request'
// 查询集合
export function getexambespeak(query) {
  return request({
    url: '/stu/exambespeak/getPage',
    method: 'get',
    params: query
  })
}
// 添加
export function addObj(obj) {
  return request({
    url: '/stu/exambespeak',
    method: 'post',
    data: obj
  })
}
// 添加
export function batchsSave(obj) {
  return request({
    url: '/stu/exambespeak/batchsSave',
    method: 'post',
    data: obj
  })
}
// 添加
export function batchSave(obj) {
  return request({
    url: '/stu/exambespeak',
    method: 'post',
    data: obj
  })
}
// 根据条件获取
export function getexambespeakbyid(query) {
  return request({
    url: '/stu/exambespeak/queryBespeak',
    method: 'get',
    params: query
  })
}
// 删除
export function delexambespeak(id) {
  return request({
    url: '/stu/exambespeak/' + id,
    method: 'delete'
  })
}
// 更新
export function putExamBespeak(obj) {
  return request({
    url: '/stu/exambespeak',
    method: 'put',
    data: obj
  })
}
