/**
 * @Author: 左盐
 * @Date:   2018-03-23 18:27:59
 * @Email:  huabinglan@163.com
 * @Project: xxx
 * @Last modified by:   左盐
 * @Last modified time: 2018-03-23 18:27:59
 */
export default class helper {
  /**
   * 点击mask关闭弹窗
   * @param  {[type]} event [description]
   * @param  {[type]} layer [description]
   * @return {[type]}       [description]
   */
  static clickMaskCloseAll(event, layer, id) {
    var mask = event.target.getAttribute('class')
    if (mask && (mask.indexOf('notify-mask') > -1 || mask.indexOf('icon-remove') > -1)) {
      layer.close(id)
    }
  }
  /**
   * 默认的yes按钮操作
   * @param  {[type]} event [description]
   * @return {[type]}       [description]
   */
  static btnyes(event, options) {
    if (typeof (options.yes) === 'function') {
      options.yes()
    } else {
      options.layer.close(options.id)
    }
  }
  /**
   * 默认取消按钮操作
   * @param  {[type]} event [description]
   * @return {[type]}       [description]
   */
  static btncancel(event, options) {
    if (typeof (options.cancel) === 'function') {
      options.cancel()
    } else {
      options.layer.close(options.id)
    }
  }
  /**
   * 鼠标拖动弹窗
   * @param  {[type]} event   [description]
   * @param  {[type]} options [description]
   * @return {[type]}         [description]
   */
  static moveStart(event, options) {
    options.offset = options.offset === 'auto' ? [] : options.offset
    if (options.offset.length === 0) {
      options.offset.push(document.getElementById(options.id + '').offsetLeft)
      options.offset.push(document.getElementById(options.id + '').offsetTop)
      options.offset.push(0)
    }
    if (options.offset.length === 2) {
      options.offset.push(0)
    }
    options.offset[0] = (document.getElementById(options.id + '').offsetLeft)
    options.offset[1] = (document.getElementById(options.id + '').offsetTop)
  }
  /**
   * 拖动弹窗
   * @param  {[type]} event  [description]
   * @param  {[type]} ismove [description]
   * @return {[type]}        [description]
   */
  static move(event, options, ismove) {
    if (ismove) {
      var o = document.getElementById(options.id + '_alert')
      o.style.left = options.offset[0] + (event.clientX - this.moveLeft) + 'px'
      o.style.top = options.offset[1] + (event.clientY - this.moveTop) + 'px'
    }
  }
  /**
   * [sleep description]
   * @param  {[type]} ms [description]
   * @return {[type]}    [description]
   */
  static sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
}
