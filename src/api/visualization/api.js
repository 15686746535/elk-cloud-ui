import request from '@/utils/request'

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
export function queryRate(params) {
  return request({
    url: '/visualization/queryRate',
    method: 'get',
    params: params
  })
}

//统计招生人数
export function queryFactStuCount(params) {
  return request({
    url: '/visualization/queryFactStuCount',
    method: 'get',
    params: params
  })
}
//统计招生金额
export function queryFactMoneyCount(params) {
  return request({
    url: '/visualization/queryFactMoneyCount',
    method: 'get',
    params: params
  })
}

export function queryGDP(params) {
  return request({
    url: '/visualization/queryAverageOutput',
    method: 'get',
    params: params
  })
}

//招生同比增长率
export function queryAmountRate(params) {
  return request({
    url: '/visualization/queryFactAndTarget',
    method: 'get',
    params: params
  })
}
//招生金额完成率
export function moneyCompletRate(params) {
  return request({
    url: '/visualization/moneyFactAndTarget',
    method: 'get',
    params: params
  })
}
//车型招生
export function queryCarTypeStatistics(params) {
  return request({
    url: '/visualization/queryCarTypeStatistics',
    method: 'get',
    params: params
  })
}
//市场占有率
export function queryFactAndMarket(params) {
  return request({
    url: '/visualization/queryFactAndMarket',
    method: 'get',
    params: params
  })
}


