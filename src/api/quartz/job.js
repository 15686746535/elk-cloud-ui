import request from '@/utils/request'
// 查询集合
export function fetchList(query) {
  return request({
    url: '/quartz/job/getPage',
    method: 'get',
    params: query
  })
}
// 添加
export function addObj(obj) {
  return request({
    url: '/quartz/job',
    method: 'post',
    data: obj
  })
}
// 根据ID获取
export function getObj(id) {
  return request({
    url: '/quartz/job/' + id,
    method: 'get'
  })
}
// 删除
export function delObj(id) {
  return request({
    url: '/quartz/job/' + id,
    method: 'delete'
  })
}
// 更新
export function putObj(obj) {
  return request({
    url: '/quartz/job/update',
    method: 'put',
    data: obj
  })
}
// 立即执行任务
export function run(jobId) {
  return request({
    url: '/quartz/job/' + jobId,
    method: 'put'
  })
}
