import MyTreeSelect from './select.vue'

// 这里是重点
const TreeSelect = {
  install: function(Vue) {
    Vue.component('tree-select', MyTreeSelect)
  }
}

// 导出组件
export default TreeSelect
