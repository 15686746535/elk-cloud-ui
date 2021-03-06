/**
 * @Author: 左盐
 * @Date:   2018-03-05 16:12:17
 * @Email:  huabinglan@163.com
 * @Last modified by:   左盐
 * @Last modified time: 2018-03-31 10:39:54
 */

let Notification = (function(vue, globalOption = {
  msgtime: 1.5 // msg消失时间
}) {
  let NotificationConstructor = vue.extend(require('./layer.vue').default)
  let MaskLayer = vue.extend(require('./mask.vue').default)
  let TaskLayer = vue.extend(require('./task.vue').default)
  let self = {}
  const defOptions = {
    type: 0, // 0（信息框，默认）1（页面层）2（iframe层）3（加载层）4（tips层）
    id: '',
    title: '信息',
    content: '',
    area: 'auto',
    offset: 'auto',
    tabIcon: -1,
    icon: -1,
    genre: 'task',
    btn: '确定',
    time: 0,
    shade: true,
    yes: '',
    cancel: '',
    tips: [0, {}], // 支持上右下左四个方向，通过1-4进行方向设定,可以设定tips: [1, '#c00']
    tipsMore: false, // 是否允许多个tips
    isMax: false, // 最大显示
    maxmin: true, // 允许最大最小
    closeBtn: true, // 显示关闭按钮
    shadeClose: true
  }
  self.instances = {}
  self.instancesVue = []
  let seed = 0

  /**
   * [function description]
   * @method function
   * @param  {[type]} options [description]
   * @return {[type]}         [description]
   */
  self.open = function(options) {
    options = mergeJson(options, defOptions)
    if (options.id) {
      // 传入id
      var dom = document.getElementById(options.id + '_task')
      if (dom) {
        dom.click()
        return false
      }
    } else {
      options.id = `notification_${new Date().getTime()}_${seed++}`
    }
    options.layer = self
    if (options.type === 2) {
      options.area = ['1024px', '600px'] // 默认 宽 高
      options.content.content = vue.extend(options.content.content)
    }
    var instance = new NotificationConstructor({
      data: options,
      propsData: { options: options }
    })
    instance.id = options.id
    instance.vm = instance.$mount()
    self.instances[options.id] = {
      inst: instance,
      type: options.type
    }
    document.body.appendChild(instance.vm.$el)
    self.instancesVue[options.id] = {
      'mask': '',
      'main': instance.vm,
      'iframe': ''
    }
    if (options.closeBtn) {
      // 构建回到桌面
      var task = document.getElementsByClassName('vl-notify-task')
      var home = document.getElementById('home_task')
      if (!home) {
        var hoptions = {
          id: 'home',
          genre: 'home'
        }
        var homeInstance = new TaskLayer({
          data: hoptions
        })
        homeInstance.vm = homeInstance.$mount()

        task[0].appendChild(homeInstance.vm.$el)
      }
      if (options.type === 2 && task && task.length > 0) {
        var taskInstance = new TaskLayer({
          data: options
        })
        taskInstance.vm = taskInstance.$mount()
        task[0].appendChild(taskInstance.vm.$el)
      }
    }
    if (options.shade) { // 是否显示遮罩
      // let layerMask = document.querySelector('.vl-notify-mask')
      // if (layerMask) {
      //   document.body.removeChild(layerMask)
      // }
      var maskInstance = new MaskLayer({
        data: options
      })
      maskInstance.vm = maskInstance.$mount()
      document.body.appendChild(maskInstance.vm.$el)
      self.instancesVue[options.id].mask = maskInstance.vm
    }
    return options.id
  }
  /**
   * alert
   * @param  {[type]} content [description]
   * @param  {[type]} options [description]
   * @param  {[type]} yes     [description]
   * @return {[type]}         [description]
   */
  self.alert = function(content, options, yes) {
    switch (typeof (options)) {
      case 'function':
        yes = options
        options = {}
        break
      case 'object':
        break
      default:
        options = {}
        break
    }
    yes = typeof (yes) === 'function' ? yes : ''

    options.content = content || ''
    options.yes = yes
    return self.open(options)
  }
  /**
   * alert
   * @param  {[type]} content [description]
   * @param  {[type]} options [description]
   * @param  {[type]} yes     [description]
   * @return {[type]}         [description]
   */
  self.confirm = function(content, options, yes, cancel) {
    switch (typeof (options)) {
      case 'function':
        cancel = yes
        yes = options
        options = {}
        break
      case 'object':
        break
      default:
        options = {}
        break
    }
    yes = typeof (yes) === 'function' ? yes : ''
    cancel = typeof (cancel) === 'function' ? cancel : 'cancel'

    options.content = content || ''
    options.yes = yes
    options.cancel = cancel
    return self.open(options)
  }
  /**
   * [function description]
   * @method function
   * @param  {[type]} content [description]
   * @param  {[type]} options [description]
   * @param  {[type]} end     [description]
   * @return {[type]}         [description]
   */
  self.msg = function(content, options, end) {
    switch (typeof (options)) {
      case 'function':
        end = options
        options = {}
        break
      case 'object':
        break
      default:
        options = {}
        break
    }
    end = typeof (end) === 'function' ? end : ''
    options.type = 5
    options.time = options.time ? options.time : globalOption.msgtime
    options.content = content || 'this is a msg!!'
    options.yes = end
    if (options.shade == undefined) {
      options.shade = false
    }
    self.closeAll('msg')
    return self.open(options)
  }
  // loading
  self.loading = function(icon, options) {
    if (typeof (icon) === 'object') {
      options = icon
      icon = 0
    }
    options = options || {}
    options.icon = icon ? icon : 0
    if (options.icon < 0 || options.icon > 2) {
      options.icon = 0
    }
    if (!options.time) {
      options.time = 100
    }
    options.type = 3
    if (options.shade == undefined) {
      options.shade = true
    }
    if (options.shadeClose == undefined) {
      options.shadeClose = false
    }
    return self.open(options)
  }
  /**
   * tips
   * @method function
   * @param  {[type]} content [description]
   * @param  {[type]} follow  [description]
   * @param  {[type]} options [description]
   * @return {[type]}         [description]
   */
  self.tips = function(content, follow, options) {
    options = options || {}
    options.type = 4
    options.content = content || ''
    options.title = follow || 'body'
    options.tips = options.tips || [0, {}]
    if (typeof (options.tips) !== 'object') {
      options.tips = [options.tips, {}]
    }
    if (options.shade == undefined) {
      options.shade = false
    }
    if (!options.tipsMore) {
      self.closeAll('tips')
    }
    return self.open(options)
  }
  /**
   * [description]
   * @param  {[type]} options [description]
   * @return {[type]}         [description]
   */
  self.iframe = function(opt) {
    let option = {
      type: 2,
      content: opt.content,
      area: opt.area
    }
    option = mergeJson(option, opt)
    return self.open(option)
  }
  /**
   * 关闭一个弹窗
   * @param  {[type]} id [description]
   * @return {[type]}    [description]
   */
  self.close = function(id) {
    var oElm = document.getElementById(id)
    var layerMask = document.getElementById(id + '_mask')
    var layerTask = document.getElementById(id + '_task')
    if (layerMask) {
      document.body.removeChild(layerMask)
      if (self.instancesVue[id].mask) {
        self.instancesVue[id].mask.$destroy()
      }
    }
    if (layerTask) {
      var task = document.getElementsByClassName('vl-notify-task')
      task[0].removeChild(layerTask)
    }
    if (oElm) {
      document.body.removeChild(oElm)
      delete self.instances[id]
      self.instancesVue[id].main.$destroy()
      if (self.instancesVue[id].iframe != '') {
        self.instancesVue[id].iframe.$destroy()
      }
    } else {
      setTimeout(function() {
        oElm = document.getElementById(id)
        if (oElm) {
          document.body.removeChild(oElm)
          delete self.instances[id]
          self.instancesVue[id].main.$destroy()
          if (self.instancesVue[id].iframe !== '') {
            self.instancesVue[id].iframe.$destroy()
          }
        }
      }, 200)
    }
  }
  /**
   * 关闭一个弹窗
   * @param  {[type]} id [description]
   * @return {[type]}    [description]
   */
  self.closeAll = function(type = -1) {
    let types = {
      'alert': 0,
      'page': 1,
      'iframe': 2,
      'loading': 3,
      'tips': 4,
      'msg': 5
    }
    if (type === -1) {
      for (let k in self.instances) {
        self.close(k)
      }
    } else {
      let targetType = types[type]
      for (let k in self.instances) {
        if (self.instances[k].type === targetType) {
          self.close(k)
        }
      }
    }
  }
  /**
   * get offset
   */
  function getOffset() {
    let offset = []
    offset.push(document.body.clientWidth)
    offset.push(document.body.clientHeight)
    return offset
  }

  /**
   * 合并json
   * @method mergeJson
   * @param  {[type]}  optons [description]
   * @param  {[type]}  def    [description]
   * @return {[type]}         [description]
   */
  function mergeJson(options, def) {
    for (let key in def) {
      if (options[key] == undefined) {
        options[key] = def[key]
      }
    }
    return options
  }

  return self
})
export  default  Notification
// module.exports = Notification
