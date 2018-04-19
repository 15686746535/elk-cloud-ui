import MyTreeCom from './baseTree.vue'

// 这里是重点
const MyTree = {
  install: function(Vue) {
    Vue.component('my-tree', MyTreeCom)
  }
}

// 导出组件
export default MyTree
