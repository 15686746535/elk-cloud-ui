import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css'
import locale from 'element-ui/lib/locale/lang/zh-CN'
import App from './App'
import router from './router/index'
import store from './store'
import * as filters from './filters' // 全局filter
import '@/icons' // icon
import '@/permission' // 权限
import MyTree from './components/MyTree'
import Dict from './components/Dict'
import TreeSelect from './components/TreeSelect'
import layer from './components/ElLayer/layer.js'
Vue.use(ElementUI, { locale })
import VueDND from 'awe-dnd'
// 引入自定义组件。index.js是组件的默认入口

window.Vue1 = Vue
var lai = layer(Vue, {
  msgtime: 1
})
Vue.prototype.$layer = lai

Vue.use(TreeSelect)
Vue.use(MyTree)
Vue.use(Dict)
Vue.use(VueDND)

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false
window.app1 = new Vue({
  el: '#app',
  render: h => h(App),
  store,
  router,
  template: '<App/>',
  components: { App }
})

