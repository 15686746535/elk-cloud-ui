import request from '@/utils/request'

// 查询集合
export function queryTriggerList(query) {
  return request({
    url: '/sys/activiti/trigger/getPage',
    method: 'get',
    params: query
  })
}

// 添加
export function addTrigger(obj) {
  return request({
    url: '/sys/activiti/trigger',
    method: 'post',
    data: obj
  })
}

// 根据Id获取对象
export function getTrigger(id) {
  return request({
    url: '/sys/activiti/trigger/' + id,
    method: 'get'
  })
}

// 更新
export function putTrigger(obj) {
  return request({
    url: '/sys/activiti/trigger',
    method: 'put',
    data: obj
  })
}

// 删除
export function delTrigger(id) {
  return request({
    url: '/sys/activiti/trigger/' + id,
    method: 'delete'
  })
}
