import request from '@/utils/request'
// 查询集合
export function getRevisitQuestionnaireList(query) {
  return request({
    url: '/stu/revisitquestionnaire/getPage',
    method: 'get',
    params: query
  })
}
// 添加
export function addQuestionnaireList(obj) {
  return request({
    url: '/stu/revisitquestionnaire',
    method: 'post',
    data: obj
  })
}
// 根据ID获取
export function getQuestionnaireList(id) {
  return request({
    url: '/stu/revisitquestionnaire/' + id,
    method: 'get'
  })
}
// 删除
export function delQuestionnaireList(id) {
  return request({
    url: '/stu/revisitquestionnaire/' + id,
    method: 'delete'
  })
}
// 更新
export function putQuestionnaireList(obj) {
  return request({
    url: '/stu/revisitquestionnaire',
    method: 'put',
    data: obj
  })
}
