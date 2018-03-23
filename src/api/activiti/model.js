import request from '@/utils/request'

export function modelPage(query) {
  return request({
    url: '/activiti/model/modelPage',
    method: 'get',
    params: query
  })
}

