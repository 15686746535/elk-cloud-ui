/**
 *  获取图标
 */
export function getIcon(key) {
  return IconMap[key] || IconMap.app_default
}

/**
 * 定义图标 base64格式 尺寸 72 X 72
 */
export const IconMap = {
  msg: '../../../static/icon/msg.png',
  journal: '../../../static/icon/journal.png',
  schedule: '../../../static/icon/schedule.png',
  task: '../../../static/icon/task.png',
  user: '../../../static/icon/user.png',
  user_list: '../../../static/icon/user_list.png',
  car: '../../../static/icon/car.png',
  users: '../../../static/icon/users.png',
  configure: '../../../static/icon/configure.png',
  statistics: '../../../static/icon/statistics.png',
  money: '../../../static/icon/money.png',
  basis: '../../../static/icon/basis.png',
  // 以上是系统图标 在下方添加程序图标
  app_default: '../../../static/icon/app/app_default.png', // 默认图标
  app_stu_student: '../../../static/icon/app/app_stu_student.png',
  app_stu_complaint: '../../../static/icon/app/app_complaint.png',
  app_stu_add: '../../../static/icon/app/app_stu_add.png',
  app_stu_service: '../../../static/icon/app/app_stu_service.png',
  app_stu_batch: '../../../static/icon/app/app_stu_batch.png',
  app_stu_grade: '../../../static/icon/app/app_stu_grade.png',
  app_stu_graduation: '../../../static/icon/app/app_stu_graduation.png',
  app_stu_revisit: '../../../static/icon/app/app_stu_revisit.png',
  app_stu_revisited: '../../../static/icon/app/app_stu_revisited.png',
  app_vehicle_period: '../../../static/icon/app/app_vehicle_period.png',
  app_visit_intention: '../../../static/icon/app/app_visit_intention.png',
  app_rate: '../../../static/icon/app/app_rate.png',
  app_visit_enrolled: '../../../static/icon/app/app_visit_enrolled.png',
  app_visit_close: '../../../static/icon/app/app_visit_close.png',
  app_car: '../../../static/icon/app/app_car.png',
  app_user: '../../../static/icon/app/app_user.png',
  app_quit_user: '../../../static/icon/app/app_quit_user.png',
  app_visit_distribution: '../../../static/icon/app/app_visit_distribution.png',
  app_org: '../../../static/icon/app/app_org.png',
  app_role: '../../../static/icon/app/app_role.png',
  app_shuttle: '../../../static/icon/app/app_shuttle.png',
  app_cost_info: '../../../static/icon/app/app_cost_info.png',
  app_recruit: '../../../static/icon/app/app_recruit.png',
  app_info: '../../../static/icon/app/app_info.png',
  app_worrycount: '../../../static/icon/app/app_worrycount.png',
  app_intentioncount: '../../../static/icon/app/app_intentioncount.png',
  app_subject: '../../../static/icon/app/app_subject.png',
  app_campus: '../../../static/icon/app/app_campus.png',
  app_enroll: '../../../static/icon/app/app_enroll.png',
  app_business: '../../../static/icon/app/app_business.png',
  app_message: '../../../static/icon/app/app_message.png',
  app_worrytype: '../../../static/icon/app/app_worrytype.png',
  app_question: '../../../static/icon/app/app_question.png',
  app_examdot: '../../../static/icon/app/app_examdot.png',
  app_source: '../../../static/icon/app/app_source.png',
  app_customer_type: '../../../static/icon/app/app_customer_type.png',
  app_model: '../../../static/icon/app/app_model.png',
  app_password: '../../../static/icon/app/app_password.png',
  app_configure: '../../../static/icon/app/app_configure.png',
  app_systemlog: '../../../static/icon/app/app_systemlog.png',
  app_training: '../../../static/icon/app/app_training.png',
  app_service: '../../../static/icon/app/app_service.png',
  app_sourcetype: '../../../static/icon/app/app_sourcetype.png',
  app_enrol_site: '../../../static/icon/app/app_enrol_site.png',
  app_visit_add: '../../../static/icon/app/app_visit_add.png',
  app_job: '../../../static/icon/app/app_job.png',
  app_out: '../../../static/icon/app/app_power_exit.png'
}
