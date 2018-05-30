import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', name: '登陆', component: _import('login/index'), isShow: false, children: [] },
  { path: '/404', name: '404', component: _import('404'), isShow: false, children: [] },
  {
    menuId: 0,
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    isShow: false,
    meta: {
      title: '首页',
      icon: 'menu'
    },
    children: [
      { menuId: 0, path: 'dashboard', component: _import('dashboard/index'), isShow: false, name: '首页' }
    ]
  }
]

export default new Router({
  // mode: 'history', // 后端支持可开
  // scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
/**
 * 系统菜单 menuId 需要和数据库一样
 * 修改图标无需再数据库修改，只需在此修icon改即可
 * @type {*[]}
 */
export const asyncRouterMap = [
  {
    menuId: 10000,
    path: '/sys',
    component: Layout,
    isShow: true,
    meta: {
      title: '系统管理',
      icon: 'menu'
    },
    children: [
      { menuId: 10100, path: 'menu', component: _import('modules/sys/menu/index'), name: '菜单管理', isShow: true, meta: { title: '菜单管理', icon: 'menu' }},
      { menuId: 10200, path: 'swagger', component: _import('modules/sys/monitor/swagger'), name: '接口文档', isShow: true, meta: { title: '接口文档', icon: 'menu' }},
      { menuId: 10300, path: 'configure', component: _import('modules/sys/configure/index'), name: '配置信息', isShow: true, meta: { title: '配置信息', icon: 'menu' }},
      { menuId: 10400, path: 'monitor', component: _import('modules/sys/monitor/monitor'), name: '服务监控', isShow: true, meta: { title: '服务监控', icon: 'menu' }}
      // { menuId: 10500, path: 'trigger', component: _import('modules/sys/monitor/trigger'), name: '节点设置', isShow: true, meta: { title: '节点设置', icon: 'menu' }}
    ]
  },
  {
    menuId: 20000,
    path: '/stu',
    component: Layout,
    isShow: true,
    meta: {
      title: '学员管理',
      icon: 'menu'
    },
    children: [
      { menuId: 20100, path: 'student', component: _import('modules/stu/student/index'), name: '学员信息', isShow: true, meta: { title: '学员信息', icon: 'menu' }},
      { menuId: 20900, path: 'service-note', component: _import('modules/stu/service-note/index'), name: '学员缴费', isShow: true, meta: { title: '学员缴费', icon: 'menu' }},
      { menuId: 20300, path: 'exam', component: _import('modules/stu/batch/index'), name: '考试安排', isShow: true, meta: { title: '考试安排', icon: 'menu' }},
      { menuId: 20400, path: 'grade', component: _import('modules/stu/grade/index'), name: '成绩登记', isShow: true, meta: { title: '成绩登记', icon: 'menu' }},
      { menuId: 20600, path: 'graduation', component: _import('modules/stu/graduation/index'), name: '毕业学员', isShow: true, meta: { title: '毕业学员', icon: 'menu' }},
      { menuId: 20700, path: 'revisit', component: _import('modules/stu/revisit/index'), name: '学员回访', isShow: true, meta: { title: '学员回访', icon: 'menu' }},
      { menuId: 20800, path: 'revisited', component: _import('modules/stu/revisited/index'), name: '已回访', isShow: true, meta: { title: '已回访', icon: 'menu' }}
    ]
  },
  {
    menuId: 30000,
    path: '/visit',
    component: Layout,
    isShow: true,
    meta: {
      title: '客户管理',
      icon: 'menu'
    },
    children: [
      { menuId: 30100, path: 'distribution', component: _import('modules/visit/distribution/index'), name: '意向分配', isShow: true, meta: { title: '意向分配', icon: 'menu' }},
      { menuId: 30200, path: 'intention', component: _import('modules/visit/intention/index'), name: '意向信息', isShow: true, meta: { title: '意向信息', icon: 'menu' }},
      { menuId: 30300, path: 'enrolled', component: _import('modules/visit/enrolled/index'), name: '已入学', isShow: true, meta: { title: '已入学', icon: 'menu' }},
      { menuId: 30400, path: 'close', component: _import('modules/visit/close/index'), name: '已关闭', isShow: true, meta: { title: '已关闭', icon: 'menu' }}
    ]
  },
  {
    menuId: 40000,
    path: '/basis',
    component: Layout,
    isShow: true,
    meta: {
      title: '服务管理',
      icon: 'menu'
    },
    children: [
      { menuId: 40100, path: 'campus', component: _import('modules/basis/campus/index'), name: '校区设置', isShow: true, meta: { title: '校区设置', icon: 'menu' }},
      // { menuId: 40200, path: 'motorcycle-type', component: _import('modules/basis/motorcycle-type/index'), name: '车型设置', isShow: true, meta: { title: '车型设置', icon: 'menu' }},
      { menuId: 40300, path: 'enroll-dot', component: _import('modules/basis/enroll-dot/index'), name: '报名点设置', isShow: true, meta: { title: '报名点设置', icon: 'menu' }},
      // { menuId: 40400, path: 'increment', component: _import('modules/basis/increment/index'), name: '增值包设置', alwaysShow: true, meta: { title: '增值包设置', icon: 'menu' }},
      { menuId: 40500, path: 'service-category', component: _import('modules/basis/service-category/index'), name: '收费服务设置', isShow: true, meta: { title: '收费服务设置', icon: 'menu' }},
      { menuId: 40600, path: 'revisit-question', component: _import('modules/basis/revisit-question/index'), name: '回访问题设置', isShow: true, meta: { title: '回访问题设置', icon: 'menu' }},
      { menuId: 40700, path: 'source', component: _import('modules/basis/source/index'), name: '来源渠道设置', isShow: true, meta: { title: '来源渠道设置', icon: 'menu' }},
      // { menuId: 40800, path: 'mc-model', component: _import('modules/basis/mc-model/index'), name: '短信模板设置', isShow: true, meta: { title: '短信模板设置', icon: 'menu' }},
      { menuId: 40900, path: 'worry', component: _import('modules/basis/worry/index'), name: '顾虑问题设置', isShow: true, meta: { title: '顾虑问题设置', icon: 'menu' }},
      { menuId: 41000, path: 'exam-dot', component: _import('modules/basis/exam-dot/index'), name: '考试场地设置', isShow: true, meta: { title: '考试场地设置', icon: 'menu' }},
      { menuId: 41200, path: 'training-dot', component: _import('modules/basis/training-dot/index'), name: '训练场地设置', isShow: true, meta: { title: '训练场地设置', icon: 'menu' }},
      { menuId: 41300, path: 'customer-type', component: _import('modules/basis/customer-type/index'), name: '客户类型', isShow: true, meta: { title: '客户类型', icon: 'menu' }}
    ]
  },

  {
    menuId: 50000,
    path: '/vehicle',
    component: Layout,
    isShow: true,
    meta: {
      title: '车辆管理',
      icon: 'menu'
    },
    children: [
      { menuId: 50100, path: 'car', component: _import('modules/vehicle/car/index'), name: '车辆信息', isShow: true, meta: { title: '车辆信息', icon: 'menu' }}
    ]
  },
  {
    menuId: 60000,
    path: '/upms',
    component: Layout,
    redirect: '/upms/user',
    isShow: true,
    meta: {
      title: '行政人力',
      icon: 'menu'
    },
    children: [
      { menuId: 60100, path: 'user', component: _import('modules/upms/user/index'), name: '同事信息', isShow: true, meta: { title: '同事信息', icon: 'menu' }},
      { menuId: 60100, path: 'quitUser', component: _import('modules/upms/quitUser/index'), name: '离职同事', isShow: true, meta: { title: '离职同事', icon: 'menu' }},
      { menuId: 60200, path: 'org', component: _import('modules/upms/org/index'), name: '部门设置', isShow: true, meta: { title: '部门设置', icon: 'menu' }},
      { menuId: 60300, path: 'role', component: _import('modules/upms/role/index'), name: '职位设置', isShow: true, meta: { title: '职位设置', icon: 'menu' }}
    ]
  },
  {
    menuId: 70000,
    path: '/finance',
    component: Layout,
    isShow: true,
    meta: {
      title: '财务管理',
      icon: 'menu'
    },
    children: [
      { menuId: 70100, path: 'costInfo', component: _import('modules/finance/cost-info/index'), name: '费用信息', isShow: true, meta: { title: '费用信息', icon: 'menu' }}
    ]
  },
  {
    menuId: 80000,
    path: '/bespeak',
    component: Layout,
    isShow: true,
    meta: {
      title: '约车管理',
      icon: 'menu'
    },
    children: [
      { menuId: 80100, path: 'period', component: _import('modules/bespeak/vehicle-period/index'), name: '约车信息', isShow: true, meta: { title: '约车信息', icon: 'menu' }}
    ]
  },
  {
    menuId: 150000,
    path: '/bespeak',
    component: Layout,
    isShow: true,
    meta: {
      title: '接送管理',
      icon: 'menu'
    },
    children: [
      { menuId: 150100, path: 'shuttle', component: _import('modules/bespeak/shuttle/index'), name: '接送信息', isShow: true, meta: { title: '接送信息', icon: 'menu' }}
    ]
  },
  {
    menuId: 90000,
    path: '/activiti',
    component: Layout,
    isShow: true,
    meta: {
      title: '流程管理',
      icon: 'menu'
    },
    children: [
      { menuId: 90100, path: 'model', component: _import('modules/activiti/model/index'), name: '流程设置', isShow: true, meta: { title: '流程设置', icon: 'menu' }},
      { menuId: 90300, path: 'doneList', component: _import('modules/activiti/doneList/index'), name: '我的已办', isShow: true, meta: { title: '我的已办', icon: 'menu' }},
      { menuId: 90400, path: 'business', component: _import('modules/activiti/business/index'), name: '业务设置', isShow: true, meta: { title: '业务设置', icon: 'menu' }}
    ]
  },
  // {
  //   menuId: 100000,
  //   path: '/file',
  //   component: Layout,
  //   isShow: true,
  //   meta: {
  //     title: '文件管理',
  //     icon: 'menu'
  //   },
  //   children: [
      // { menuId: 100100, path: 'manage', component: _import('modules/file-manage/file-share/index'), name: '共享文件', isShow: true, meta: { title: '共享文件', icon: 'menu' }}
  //   ]
  // },
  {
    menuId: 110000,
    path: '/qrtz',
    component: Layout,
    isShow: true,
    meta: {
      title: '定时任务管理',
      icon: 'menu'
    },
    children: [
      { menuId: 110100, path: 'job', component: _import('modules/quartz/job/index'), name: '定时任务', isShow: true, meta: { title: '定时任务', icon: 'menu' }}
    ]
  },
  {
    menuId: 120000,
    path: '/visualization',
    component: Layout,
    isShow: true,
    meta: {
      title: '可视化中心',
      icon: 'menu'
    },
    children: [
      { menuId: 120600, path: 'recruit', component: _import('modules/visualization/recruit'), name: '每月招生统计', isShow: true, meta: { title: '每月招生统计', icon: 'menu' }},
      { menuId: 120100, path: 'worry', component: _import('modules/visualization/worry'), name: '顾虑问题统计', isShow: true, meta: { title: '顾虑问题统计', icon: 'menu' }},
      { menuId: 120400, path: 'intention', component: _import('modules/visualization/intention'), name: '来访统计', isShow: true, meta: { title: '来访统计', icon: 'menu' }},
      { menuId: 120200, path: 'enrolSite', component: _import('modules/visualization/enrolSite'), name: '招生点数据统计', isShow: true, meta: { title: '招生点数据统计', icon: 'menu' }},
      { menuId: 120500, path: 'source', component: _import('modules/visualization/source'), name: '来源渠道', isShow: true, meta: { title: '来源渠道', icon: 'menu' }},
      { menuId: 120300, path: 'subject', component: _import('modules/visualization/subject'), name: '在培学员统计', isShow: true, meta: { title: '在培学员统计', icon: 'menu' }}
    ]
  },
  {
    menuId: 140000,
    path: '/log-record',
    component: Layout,
    isShow: true,
    meta: {
      title: '日志记录',
      icon: 'menu'
    },
    children: [
      { menuId: 140100, path: 'sendmsg', component: _import('modules/log-record/sendmsg/index'), name: '短信发送记录', isShow: true, meta: { title: '短信发送记录', icon: 'menu' }},
      { menuId: 140200, path: 'log', component: _import('modules/log-record/log/index'), name: '系统日志', isShow: true, meta: { title: '系统日志', icon: 'menu' }}
    ]
  }
]

