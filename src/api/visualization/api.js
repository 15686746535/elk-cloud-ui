import request from '@/utils/request'

export function queryIndex() {
  return request({
    url: '/visualization/index',
    method: 'get'
  })
}
// 顾虑问题统计
export function queryWorry(params) {
  return request({
    url: '/visualization/queryWorry',
    method: 'get',
    params: params
  })
}

// 学员来源渠道统计
export function querySource(params) {
  return request({
    url: '/visualization/querySource',
    method: 'get',
    params: params
  })
}

// 来访统计
export function queryIntention(params) {
  return request({
    url: '/visualization/queryIntention',
    method: 'get',
    params: params
  })
}

// 各科在培训学员统计
export function querySubject(params) {
  return request({
    url: '/visualization/querySubject',
    method: 'get',
    params: params
  })
}

// 招生点数据统计
export function queryEnrolSite(params) {
  return request({
    url: '/visualization/queryEnrolSite',
    method: 'get',
    params: params
  })
}

// 每月招收人数统计
export function queryRecruit(params) {
  return request({
    url: '/visualization/queryRecruit',
    method: 'get',
    params: params
  })
}
// 每月招收人数统计
export function queryCampus(params) {
  return request({
    url: '/visualization/queryCampus',
    method: 'get',
    params: params
  })
}

// 招生详情统计
export function queryIntroducer(params) {
  return request({
    url: '/visualization/queryIntroducer',
    method: 'get',
    params: params
  })
}
