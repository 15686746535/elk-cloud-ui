<template>
  <li :id="'li_'+model.id" >
    <span :id="'li_switch_'+model.id" class="button switch " :class="getSwitchClazz"  @click='toggle'></span>
    <span v-if="getChoiceType('checkbox')" :id="'li_checkbox_'+model.id" class="button chk "
          :class="backfill(model.id)?'checkbox_true_full':'checkbox_false_full'"  @click='nodeChecked(model.id,$event)'></span>
    <a :id="'li_a_'+model.id" @click="nodeClick(model,$event)" class="node " :class="id+'_node'">
      <span v-if="getChoiceType('folder')" :id="'li_a_icon_'+model.id"  class="button ico " :class="getIconClazz"></span>
      <span :id="'li_a_name_'+model.id" class="node_name" >{{model.name}}</span>
    </a>
    <ul v-show="isOpen" v-if='isFolder' :class="isLine" :id="'li_ul_'+model.id">
      <template v-for='(cel,index) in model.children'>
        <items  :model='cel' :id="id" :recordList="recordList"  @node-click="nodeClick" @node-checkbox="nodeCheckbox" :choiceType="choiceType"  :sort="index" :open="open" :listSize="model.children.length"></items>
      </template>
    </ul>
  </li>
</template>

<script>
  export default {
    name: 'items',
    props: ['model', 'id', 'clazz', 'sort', 'open', 'listSize', 'choiceType', 'recordList'],
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
    },
    methods: {
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
      nodeClick(node, e) {
        var a = document.getElementsByClassName(this.id + '_node')
        for (var i = 0; i < a.length; i++) {
          a[i].classList.remove('selected')
        }
        e.currentTarget.classList.add('selected')
        this.$emit('node-click', node, e)
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
  li ul.line {
    background: url(../img/line_conn.png) 0 0 repeat-y;
  }
  li ul {
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
