<template>
  <li :id="'li_'+model.id" >
    <span :id="'li_switch_'+model.id" class="button switch " :class="getSwitchClazz"  @click='toggle'></span>
    <span v-if="getChoiceType('checkbox')" :id="'li_checkbox_'+model.id" class="button chk "
          :class="backfill(model.id)?'checkbox_true_full':'checkbox_false_full'"  @click='nodeChecked(model.id,$event)'></span>
    <a :id="id+'_li_a_'+model.id" @click="nodeClick(model,$event)" class="node " :class="defaultSelected">
      <span v-if="getChoiceType('folder')" :id="'li_a_icon_'+model.id"  class="button ico " :class="getIconClazz"></span>
      <span :id="'li_a_name_'+model.id" class="node_name" >{{model.name}}</span>
    </a>
    <el-collapse-transition><!--collapse 展开折叠-->
      <ul v-show="isOpen"  v-if='isFolder' :class="isLine" :id="'li_ul_'+model.id">
        <template v-for='(cel,index) in model.children'>
          <items  :model='cel' :id="id" :recordList="recordList" v-model="value" @node-click="nodeSelected"
                  @node-checkbox="nodeCheckbox" :choiceType="choiceType"  :sort="index" :open="open" :listSize="model.children.length"></items>
        </template>
      </ul>
    </el-collapse-transition>
  </li>
</template>

<script>
  export default {
    name: 'items',
    props: {
      model: {
        type: Object
      },
      id: {
        type: String
      },
      clazz: {
        type: String
      },
      sort: {
        type: Number
      },
      open: {
        type: Boolean
      },
      listSize: {
        type: Number
      },
      choiceType: {
        type: String
      },
      recordList: {
        type: Array
      },
      value: {
      }
    },
    data() {
      return {
        isOpen: true
      }
    },
    computed: {
      isFolder() {
        return this.model.children && this.model.children.length
      },
      isLine() {
        if (this.listSize === this.sort + 1) {
          return ''
        } else {
          if (this.listSize > 1) {
            return 'line'
          } else {
            return ''
          }
        }
      },
      getIconClazz() {
        if (this.model.children.length > 0) {
          if (this.isOpen) {
            return 'ico_open'
          } else {
            return 'ico_close'
          }
        } else {
          return 'ico_docu'
        }
      },
      defaultSelected() {
        var clazz = this.id + '_node '
        if (this.model.id === this.value) {
          return clazz + 'selected'
        }
        return clazz
      },
      getSwitchClazz() {
        if (this.clazz === 'tree_' && this.sort === 0) {
          if (this.sort > 1) {
            if (this.isOpen) {
              return 'roots_open'
            } else {
              return 'roots_close'
            }
          } else {
            if (this.isOpen) {
              return 'root_open'
            } else {
              return 'root_close'
            }
          }
        } else if (this.listSize === this.sort + 1) {
          if (!this.isFolder) {
            return 'bottom_docu'
          } else {
            return this.isOpen ? 'bottom_open' : 'bottom_close'
          }
        } else if (!this.isFolder) {
          return 'center_docu'
        } else {
          return this.isOpen ? 'center_open' : 'center_close'
        }
      }
    },
    created() {
      this.isOpen = this.open
      this.backfill()
      this.defaultSelect()
    },
    updated() {
      this.defaultSelect()
    },
    // watch: {
    //   value: function(val) {
    //     console.log('//////////////////')
    //     this.defaultSelect()
    //   }
    // },
    methods: {
      defaultSelect() {
        console.log()
        if (this.value) {
          if (this.model.id === this.value) {
            this.nodeSelected(this.model)
          }
        } else {
          this.nodeSelected(null)
        }
      },
      backfill(id) {
        if (this.recordList && this.recordList.length) {
          for (var i = 0; i < this.recordList.length; i++) {
            if (id === this.recordList[i]) {
              return true
            }
          }
        }
        return false
      },
      nodeCheckbox(val, isAdd) {
        this.$emit('node-checkbox', val, isAdd)
      },
      nodeChecked(id, e) {
        var classList = e.currentTarget.classList
        if (this.hasClass(classList, 'checkbox_true_full')) {
          classList.add('checkbox_false_full')
          classList.remove('checkbox_true_full')
          this.$emit('node-checkbox', id, false)
        } else {
          classList.add('checkbox_true_full')
          classList.remove('checkbox_false_full')
          this.$emit('node-checkbox', id, true)
        }
      },
      getChoiceType(type) {
        return this.choiceType.indexOf(type) !== -1
      },
      nodeSelected(node) {
        this.$emit('node-click', node)
      },
      nodeClick(node, e) {
        var a = document.getElementsByClassName(this.id + '_node')
        for (var i = 0; i < a.length; i++) {
          a[i].classList.remove('selected')
        }
        e.currentTarget.classList.add('selected')
        this.nodeSelected(node)
      },
      hasClass(classList, clazz) {
        for (var i = 0; i < classList.length; i++) {
          if (classList[i] === clazz) {
            return true
          }
        }
        return false
      },
      toggle() {
        if (this.isFolder) {
          this.isOpen = !this.isOpen
        }
      }
    }
  }

</script>
<style scoped>
  /*
  1.v-enter：定义进入过渡的开始状态。在元素被插入时生效，在下一个帧移除。
  2.v-enter-active：定义过渡的状态。在元素整个过渡过程中作用，在元素被插入时生效，
    在 transition/animation 完成之后移除。这个类可以被用来定义过渡的过程时间，延迟和曲线函数。
  3.v-enter-to: 2.1.8版及以上 定义进入过渡的结束状态。在元素被插入一帧后生效 (与此同时 v-enter 被删除)，
    在 transition/animation 完成之后移除。
  4.v-leave: 定义离开过渡的开始状态。在离开过渡被触发时生效，在下一个帧移除。
  5.v-leave-active：定义过渡的状态。在元素整个过渡过程中作用，在离开过渡被触发后立即生效，
    在 transition/animation 完成之后移除。这个类可以被用来定义过渡的过程时间，延迟和曲线函数。
  6.v-leave-to: 2.1.8版及以上 定义离开过渡的结束状态。在离开过渡被触发一帧后生效 (与此同时 v-leave 被删除)，
    在 transition/animation 完成之后移除。
  */
  li ul.line {
    background: url(../img/line_conn.png) 0 0 repeat-y;
  }
  li ul {
    height: auto;
    margin: 0;
    padding: 0 0 0 12px;
  }
  li {
    padding: 0;
    margin: 0;
    list-style: none;
    line-height: 17px;
    text-align: left;
    white-space: nowrap;
    outline: 0;
  }
  * {
    padding: 0;
    margin: 0;
    font-size: 14px;
    font-family: Verdana, Arial, Helvetica, AppleGothic, sans-serif;
  }
  li a {
    padding-right: 3px;
    margin: 0;
    cursor: pointer;
    height: 21px;
    color: #333;
    background-color: transparent;
    text-decoration: none;
    vertical-align: top;
    display: inline-block;
  }
  li span.button {
    line-height: 0;
    margin: 0;
    padding: 0;
    width: 21px;
    height: 21px;
    display: inline-block;
    vertical-align: middle;
    border: 0 none;
    cursor: pointer;
    outline: none;
    background-color: transparent;
    background-repeat: no-repeat;
    background-attachment: scroll;
    background-image: url(../img/bootstrap.png);
  }
  li a.node{
    margin-left: -7px;
  }
  li a.node.selected{
    background-color: #dcdfe6;
  }
  li span.button.ico {
    margin-right: -7px;
  }
  li span.button.chk.checkbox_false_full {
    background-position: -5px 0px;
  }
  li span.button.chk.checkbox_true_full {
    background-position: -26px 0px;
  }
  li span.button.ico_docu {
    background-position: -147px -43px;
    vertical-align: top;
  }
  li span.button.ico_close {
    background-position: -147px 0;
    vertical-align: top;
  }
  li span.button.ico_open {
    background-position: -147px -21px;
    vertical-align: top;
  }
  li span.button.roots_open {
    background-position: -105px 0;
  }
  li span.button.roots_close {
    background-position: -126px 0;
  }
  li span.button.center_open {
    background-position: -105px -20px;
  }
  li span.button.center_close {
    background-position: -126px -20px;
  }
  li span.button.bottom_open {
    background-position: -105px -42px;
  }
  li span.button.bottom_close {
    background-position: -126px -42px;
  }
  li ul.line {
    background: url(../img/line_conn.png) 0 0 repeat-y;
  }
  li span.button.center_docu {
    background-position: -84px -21px;
  }
  li span.button.bottom_docu {
    background-position: -84px -42px;
  }
  li span.button.root_open {
    background-position: -105px -62px;
  }
  li span.button.root_close {
    background-position: -126px -62px;
  }
  li span.button.center_docu {
    background-position: -84px -21px;
  }
</style>
