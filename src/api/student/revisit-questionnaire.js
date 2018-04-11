import request from '@/utils/request'
// 查询集合
export function getRevisitQuestionNaireList(query) {
  return request({
    url: '/stu/revisitquestionnaire/getPage',
    method: 'get',
    params: query
  })
}
// 添加
export function addQuestionNaireList(obj) {
  return request({
    url: '/stu/revisitquestionnaire',
    method: 'post',
    data: obj
  })
}
// 根据ID获取
export function getQuestionNaireList(id) {
  return request({
    url: '/stu/revisitquestionnaire/' + id,
    method: 'get'
  })
}
// 删除
export function delQuestionNaireList(id) {
  return request({
    url: '/stu/revisitquestionnaire/' + id,
    method: 'delete'
  })
}
// 更新
export function putQuestionNaireList(obj) {
  return request({
    url: '/stu/revisitquestionnaire',
    method: 'put',
    data: obj
  })
}
