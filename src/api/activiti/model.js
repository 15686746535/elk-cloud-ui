import request from '@/utils/request'

export function modelPage(query) {
  return request({
    url: '/activiti/model/modelPage',
    method: 'get',
    params: query
  })
}

export function showFlowImg(modelId) {
  return request({
    url: '/activiti/model/showFlowImg/' + modelId,
    method: 'get'
  })
}

// 保存
export function modelSave(obj) {
  return request({
    url: '/activiti/model/add',
    method: 'post',
    data: obj
  })
}

// 修改
export function modelUpdate(obj) {
  return request({
    url: '/activiti/model',
    method: 'put',
    data: obj
  })
}

// 获取流程图所有节点和连线
export function flowTree(modelId) {
  return request({
    url: '/activiti/model/flowTree/' + modelId,
    method: 'get'
  })
}

// 获取节点的扩展设置信息
export function flowSetInfo(params) {
  return request({
    url: '/activiti/model/flowSetInfo/' + params.nodeId + '/' + params.type,
    method: 'get'
  })
}

// 选择审批范围弹框
export function userAreaSelect(params) {
  return request({
    url: '/activiti/model/userAreaSelect',
    method: 'get',
    params: params
  })
}

// 删除模型
export function modelDel(modelId) {
  return request({
    url: '/activiti/model/' + modelId,
    method: 'delete'
  })
}

// 保存节点设置
export function saveNode(obj) {
  return request({
    url: '/activiti/model/saveNode',
    method: 'post',
    data: obj
  })
}

// 部署流程
export function modelDeploy(modelId) {
  return request({
    url: '/activiti/model/deploy/' + modelId,
    method: 'put'
  })
}

// 部署流程
export function modelDefault(modelId) {
  return request({
    url: '/activiti/model/default/' + modelId,
    method: 'put'
  })
}
