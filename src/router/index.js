/**
 */
import Vue from 'vue'
import Router from 'vue-router'

import { getIcon } from './icon.js'
const _import = require('./_import_development')

Vue.use(Router)

/**
 * 默认任务栏 无需验权
 * @type {*[]}
 */
export const defaultMap = [
  { id: 'menu17', name: '短消息', content: _import('modules/activiti/notice'), icon: getIcon('msg'), msgCount: 0, childItem: [] },
  { id: 'menu20', name: '我的日程', content: _import('modules/activiti/schedule'), icon: getIcon('journal'), msgCount: 0, childItem: [] },
  { id: 'menu21', name: '今日完成', content: _import('modules/activiti/agency'), icon: getIcon('schedule'), msgCount: 0, childItem: [] },
  { id: 'menu31', name: '计划任务', content: _import('modules/upms/target'), icon: getIcon('task'), msgCount: 0, childItem: [] }
]
/**
 * 开始菜单
 * @type {*[]}
 */
export const startMenuMap = [
  { id: 20000, name: '学员管理', content: null, icon: getIcon('user'), childItem: [] },
  { id: 30000, name: '客户管理', icon: getIcon('user_list'), childItem: [] },
  { id: 50000, name: '车辆管理', icon: getIcon('car'), childItem: [] },
  { id: 60000, name: '人力资源', icon: getIcon('users'), childItem: [] },
  { id: 70000, name: '财务管理', icon: getIcon('statistics'), childItem: [] },
  { id: 80000, name: '数据统计', icon: getIcon('money'), childItem: [] },
  { id: 90000, name: '服务管理', icon: getIcon('basis'), childItem: [] },
  { id: 99999, name: '系统设置', icon: getIcon('configure'), childItem: [] }
]
/**
 * 应用
 * @type {*[]}
 */
export const appMap = [
  // 学员管理
  { id: 20100, desktop: '1', type: '1', pid: 20000, params: { display: 'list' }, name: '学员管理', content: _import('modules/stu/student'), icon: getIcon('app_stu_student'), msgCount: 0, childItem: [] },
  { id: 20101, desktop: '1', type: '1', pid: 20100, params: { display: 'add' }, name: '学员添加', content: _import('modules/stu/student'), icon: getIcon('app_stu_add'), msgCount: 0, childItem: [] },
  { id: 20900, desktop: '1', type: '1', pid: 20000, params: [], name: '学费收取', content: _import('modules/stu/serviceNote'), icon: getIcon('app_stu_service'), msgCount: 0, childItem: [] },
  { id: 20300, desktop: '1', type: '1', pid: 20000, params: [], name: '考试安排', content: _import('modules/stu/batch'), icon: getIcon('app_stu_batch'), msgCount: 0, childItem: [] },
  { id: 20400, desktop: '1', type: '1', pid: 20000, params: [], name: '成绩登记', content: _import('modules/stu/grade'), icon: getIcon('app_stu_grade'), msgCount: 0, childItem: [] },
  { id: 21100, desktop: '1', type: '1', pid: 20000, params: [], name: '分配教练', content: _import('modules/stu/coach'), icon: getIcon('app_default'), msgCount: 0, childItem: [] },
  { id: 20600, desktop: '1', type: '1', pid: 20000, params: [], name: '毕业学员', content: _import('modules/stu/graduation'), icon: getIcon('app_stu_graduation'), msgCount: 0, childItem: [] },
  { id: 20700, desktop: '1', type: '1', pid: 20000, params: [], name: '学员回访', content: _import('modules/stu/revisit'), icon: getIcon('app_stu_revisit'), msgCount: 0, childItem: [] },
  { id: 20800, desktop: '1', type: '1', pid: 20000, params: [], name: '回访信息', content: _import('modules/stu/revisited'), icon: getIcon('app_stu_revisited'), msgCount: 0, childItem: [] },
  { id: 80100, desktop: '1', type: '1', pid: 20000, params: [], name: '约车信息', content: _import('modules/bespeak/vehiclePeriod'), icon: getIcon('app_vehicle_period'), msgCount: 0, childItem: [] },
  { id: 21000, desktop: '1', type: '1', pid: 20000, params: [], name: '投诉建议', content: _import('modules/stu/complaint'), icon: getIcon('app_stu_complaint'), msgCount: 0, childItem: [] },
  // 客户公客
  { id: 30200, desktop: '1', type: '2', pid: 30000, params: { display: 'list' }, name: '意向信息', content: _import('modules/visit/intention'), icon: getIcon('app_visit_intention'), msgCount: 0, childItem: [] },
  { id: 30201, desktop: '1', type: '2', pid: 30200, params: { display: 'add' }, name: '意向添加', content: _import('modules/visit/intention'), icon: getIcon('app_visit_add'), msgCount: 0, childItem: [] },
  { id: 30100, desktop: '1', type: '2', pid: 30000, params: [], name: '意向公海', content: _import('modules/visit/distribution'), icon: getIcon('app_visit_distribution'), msgCount: 0, childItem: [] },
  { id: 30300, desktop: '1', type: '2', pid: 30000, params: [], name: '入学意向', content: _import('modules/visit/enrolled'), icon: getIcon('app_visit_enrolled'), msgCount: 0, childItem: [] },
  { id: 30400, desktop: '1', type: '2', pid: 30000, params: [], name: '关闭意向', content: _import('modules/visit/close'), icon: getIcon('app_visit_close'), msgCount: 0, childItem: [] },
  // 车辆管理

  { id: 50100, desktop: '1', type: '3', pid: 50000, params: [], name: '车辆信息', content: _import('modules/vehicle/car'), icon: getIcon('app_car'), msgCount: 0, childItem: [] },
  // 人力资源
  { id: 60100, desktop: '1', type: '4', pid: 60000, params: [], name: '同事信息', content: _import('modules/upms/user'), icon: getIcon('app_user'), msgCount: 0, childItem: [] },
  { id: 60400, desktop: '1', type: '4', pid: 60000, params: [], name: '离职同事', content: _import('modules/upms/quitUser'), icon: getIcon('app_quit_user'), msgCount: 0, childItem: [] },
  { id: 60200, desktop: '1', type: '4', pid: 60000, params: [], name: '部门设置', content: _import('modules/upms/org'), icon: getIcon('app_org'), msgCount: 0, childItem: [] },
  { id: 60300, desktop: '1', type: '4', pid: 60000, params: [], name: '职位设置', content: _import('modules/upms/role'), icon: getIcon('app_role'), msgCount: 0, childItem: [] },
  { id: 150110, desktop: '1', type: '4', pid: 60000, params: [], name: '接送信息', content: _import('modules/bespeak/shuttle'), icon: getIcon('app_shuttle'), msgCount: 0, childItem: [] },
  // 财务
  { id: 70100, desktop: '1', type: '5', pid: 70000, params: [], name: '收费记录', content: _import('modules/finance/costNote'), icon: getIcon('app_cost_info'), msgCount: 0, childItem: [] },
  { id: 70200, desktop: '1', type: '5', pid: 70000, params: [], name: '付款记录', content: _import('modules/finance/payment'), icon: getIcon('app_default'), msgCount: 0, childItem: [] },
  // 统计
  { id: 120600, desktop: '1', type: '6', pid: 80000, params: [], name: '招生人数统计', content: _import('modules/visualization/recruit'), icon: getIcon('app_recruit'), msgCount: 0, childItem: [] },
  { id: 120100, desktop: '1', type: '6', pid: 80000, params: [], name: '顾虑统计', content: _import('modules/visualization/worry'), icon: getIcon('app_worrycount'), msgCount: 0, childItem: [] },
  { id: 120400, desktop: '1', type: '6', pid: 80000, params: [], name: '来访统计', content: _import('modules/visualization/intention'), icon: getIcon('app_intentioncount'), msgCount: 0, childItem: [] },
  { id: 120200, desktop: '1', type: '6', pid: 80000, params: [], name: '网点统计', content: _import('modules/visualization/enrolSite'), icon: getIcon('app_enrol_site'), msgCount: 0, childItem: [] },
  { id: 120500, desktop: '1', type: '6', pid: 80000, params: [], name: '来源统计', content: _import('modules/visualization/source'), icon: getIcon('app_source'), msgCount: 0, childItem: [] },
  { id: 120300, desktop: '1', type: '6', pid: 80000, params: [], name: '在培统计', content: _import('modules/visualization/subject'), icon: getIcon('app_subject'), msgCount: 0, childItem: [] },
  { id: 120700, desktop: '1', type: '6', pid: 80000, params: [], name: '招生详情统计', content: _import('modules/visualization/kpi'), icon: getIcon('app_info'), msgCount: 0, childItem: [] },
  { id: 120800, desktop: '1', type: '6', pid: 80000, params: [], name: '通过率统计', content: _import('modules/visualization/rate'), icon: getIcon('app_rate'), msgCount: 0, childItem: [] },
  // 基础配置
  { id: 40100, desktop: '1', type: '7', pid: 90000, params: [], name: '校区设置', content: _import('modules/basis/campus'), icon: getIcon('app_campus'), msgCount: 0, childItem: [] },
  { id: 40300, desktop: '1', type: '7', pid: 90000, params: [], name: '网点设置', content: _import('modules/basis/enrollDot'), icon: getIcon('app_enroll'), msgCount: 0, childItem: [] },
  { id: 40500, desktop: '1', type: '7', pid: 90000, params: [], name: '收费设置', content: _import('modules/basis/serviceCategory'), icon: getIcon('app_service'), msgCount: 0, childItem: [] },
  { id: 40600, desktop: '1', type: '7', pid: 90000, params: [], name: '回访设置', content: _import('modules/basis/revisitQuestion'), icon: getIcon('app_question'), msgCount: 0, childItem: [] },
  { id: 40700, desktop: '1', type: '7', pid: 90000, params: [], name: '来源设置', content: _import('modules/basis/source'), icon: getIcon('app_sourcetype'), msgCount: 0, childItem: [] },
  { id: 40900, desktop: '1', type: '7', pid: 90000, params: [], name: '顾虑设置', content: _import('modules/basis/worry'), icon: getIcon('app_worrytype'), msgCount: 0, childItem: [] },
  { id: 41000, desktop: '1', type: '7', pid: 90000, params: [], name: '考场设置', content: _import('modules/basis/examDot'), icon: getIcon('app_examdot'), msgCount: 0, childItem: [] },
  { id: 41200, desktop: '1', type: '7', pid: 90000, params: [], name: '训练场地', content: _import('modules/basis/trainingDot'), icon: getIcon('app_training'), msgCount: 0, childItem: [] },
  { id: 41300, desktop: '1', type: '7', pid: 90000, params: [], name: '客户类型', content: _import('modules/basis/customerType'), icon: getIcon('app_customer_type'), msgCount: 0, childItem: [] },
  { id: 41400, desktop: '1', type: '7', pid: 90000, params: [], name: '付款方式', content: _import('modules/basis/mode'), icon: getIcon('app_default'), msgCount: 0, childItem: [] },
  { id: 41500, desktop: '1', type: '7', pid: 90000, params: [], name: '收款单位', content: _import('modules/basis/company'), icon: getIcon('app_default'), msgCount: 0, childItem: [] },
  { id: 41600, desktop: '1', type: '7', pid: 90000, params: [], name: '付款项目', content: _import('modules/basis/payment_code'), icon: getIcon('app_default'), msgCount: 0, childItem: [] },
  // 日志
  { id: 140100, desktop: '1', type: '8', pid: 99999, params: [], name: '短信记录', content: _import('modules/record/message'), icon: getIcon('app_message'), msgCount: 0, childItem: [] },
  { id: 140200, desktop: '1', type: '8', pid: 99999, params: [], name: '系统日志', content: _import('modules/record/log'), icon: getIcon('app_systemlog'), msgCount: 0, childItem: [] },
  // 系统设置
  { id: 10001, desktop: '1', type: '9', pid: 99999, params: [], name: '密码修改', content: _import('modules/upms/changepassword'), icon: getIcon('app_password'), msgCount: 0, childItem: [] },
  { id: 10004, desktop: '1', type: '9', pid: 99999, params: [], name: '系统配置', content: _import('modules/sys/configure'), icon: getIcon('app_configure'), msgCount: 0, childItem: [] },
  { id: 10005, desktop: '1', type: '9', pid: 99999, params: [], name: '定时任务', content: _import('modules/quartz/job'), icon: getIcon('app_job'), msgCount: 0, childItem: [] },
  { id: 10006, desktop: '1', type: '9', pid: 99999, params: [], name: '流程设置', content: _import('modules/activiti/model'), icon: getIcon('app_model'), msgCount: 0, childItem: [] },
  { id: 10007, desktop: '1', type: '9', pid: 99999, params: [], name: '待办配置', content: _import('modules/activiti/business'), icon: getIcon('app_business'), msgCount: 0, childItem: [] },
  { id: 10008, desktop: '1', type: '9', pid: 99999, params: ['out'], name: '退出系统', content: null, icon: getIcon('app_out'), msgCount: 0, childItem: [] }
]

/**
 * 应用 白名单
 * @type {Array}
 */
export const anonList = [-1086, 10008, 10001, 30100, 21000]
/**
 * 添加
 * @type {{id: number, desktop: string, pid: number, params: Array, name: string, content: *, icon: *, msgCount: number, childItem: Array}}
 */
export const addApp = [
  { id: -1086, desktop: '1', pid: -9999, params: [], name: '添加', content: _import('modules/stu/revisit'), icon: getIcon('icon_add'), msgCount: 0, childItem: [] },
]
/**
 * 权限过滤器
 * @param list
 */
export function getApp(appid) {
  var APP = null
  appMap.forEach(function(app, index) {
    if (app.id === appid) {
      APP = app
    }
  })
  return APP
}

/**
 * 权限过滤器
 * @param list
 */
export function hasAppFilter(permissions, roles) {
  return appMap.filter(function(app) {
    // admin 拥有全部
    return (roles && roles.indexOf('admins') > -1) || anonList.indexOf(app.id) > -1 || permissions.indexOf(app.id) > -1
  })
}

/**
 * 桌面过滤器
 * @param list
 * @param desktop
 */
export function desktopFilter(list, desktop) {
  if (list) {
    return list.filter(function(app) {
      // admin 拥有全部
      return app.desktop === desktop
    })
  } else {
    return null
  }
}

/**
 * 桌面显示app过滤器
 * @param permissions
 * @param roles
 * @returns {*[]}
 */
export function showAppFilter(hasAppList, showAppList) {
  var list = []
  showAppList.forEach(function(app, i) {
    hasAppList.forEach(function(item, index) {
      if (item.id === app.menuId) {
        item.desktop = app.desktop
        list.push(item)
      }
    })
  })
  return list
}

/**
 * 格式化开始菜单
 * @param list
 * @returns {*}
 */
export function startFilter(appList) {
  startMenuMap.forEach(function(item, index) {
    appList.forEach(function(app, i) {
      if (item.id === app.pid) {
        item.childItem.push(app)
      }
    })
  })
  return startMenuMap
}

/**
 * 桌面
 * @type {*[]}
 */
export const constantRouterMap = [
  { path: '/login', name: '登陆', component: _import('login/index') },
  { path: '/404', name: '404' },
  { path: '/', name: '首页', redirect: '/home', component: _import('desktop/index'), children: [{ path: 'home', component: _import('desktop/index'), name: '首页' }] }
]
/**
 * 注册路由
 */
export default new Router({
  routes: constantRouterMap
})
