import request from '@/utils/request'
// 查询集合
export function getexambespeak(query) {
  return request({
    url: '/stu/exam/bespeak/getPage',
    method: 'get',
    params: query
  })
}
// 添加
export function addObj(obj) {
  return request({
    url: '/stu/exam/bespeak',
    method: 'post',
    data: obj
  })
}
// 添加
export function batchsSave(obj) {
  return request({
    url: '/stu/exam/bespeak/batchsSave',
    method: 'post',
    data: obj
  })
}
// 添加
export function batchSave(obj) {
  return request({
    url: '/stu/exam/bespeak',
    method: 'post',
    data: obj
  })
}
// 根据条件获取
export function getexambespeakbyid(query) {
  return request({
    url: '/stu/exam/bespeak/queryBespeak',
    method: 'get',
    params: query
  })
}
// 删除
export function delexambespeak(id) {
  return request({
    url: '/stu/exam/bespeak/' + id,
    method: 'delete'
  })
}
// 更新
export function putExamBespeak(obj) {
  return request({
    url: '/stu/exam/bespeak',
    method: 'put',
    data: obj
  })
}
