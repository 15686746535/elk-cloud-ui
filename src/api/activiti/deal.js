import request from '@/utils/request'
// 根据流程key 获取业务可用的流程
export function queryFlowsByActKey(actKey) {
  return request({
    url: '/activiti/deal/' + actKey,
    method: 'get'
  })
}
// 获取流程第一个节点信息
export function getStartFlowInfo(deployId) {
  return request({
    url: '/activiti/deal/' + deployId,
    method: 'get'
  })
}
// 流程选择审批人
export function approverPage(query) {
  return request({
    url: '/activiti/deal/approverPage',
    method: 'get',
    params: query
  })
}
// 启动流程
export function startFlow(obj) {
  return request({
    url: '/activiti/deal/startFlow',
    method: 'post',
    data: obj
  })
}
// 更新 delete
export function putObj(obj) {
  return request({
    url: '/basis/affiche',
    method: 'put',
    data: obj
  })
}
