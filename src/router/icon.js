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
  // 以上是系统图标 在下方添加程序图标
  app_default: '../../../static/icon/app/app_one_note.png', // 默认图标
}
