<template>
  <li class="" >
    <!--展开 收缩图标-->
    <span class="button switch" :class="leafWidth?clazz + ' spread-true' : clazz" @click="isOpen = !isOpen"></span>
    <!--复选框-->
    <span v-if="checkbox" class="button chk "  @click="emit(model)" :class="model.selected?'checkbox_true_full':'checkbox_false_full'" ></span>
    <a class="node" @click="emit(model)" :class="(selected === model.id )&& !checkbox?'selected':''" :style="{width:leafWidth}">
      <!--文件夹图标-->
      <span v-if="folder" class="button ico" :class="model.children.length > 0 ? isOpen ? 'ico_open' : 'ico_close' : 'ico_docu'"></span>
      <!--节点名字-->
      <span class="node_name" >{{model.name}}<!--{{model.parentId}}--></span>
    </a>
    <el-collapse-transition>
      <ul :class="length > 1 && length !== index + 1 ? 'line' : ''" v-show="isOpen">
        <template v-for="(node,i) in model.children">
          <leaf  :model="node"
                 :selected="selected"
                 :index="i"
                 :list="list"
                 :folder="folder"
                 :leafWidth="leafWidth"
                 :checkbox="checkbox"
                 :length="model.children.length"
                 @node="emit"
                 @node-checkbox="nodeCheckbox"></leaf>
        </template>
      </ul>
    </el-collapse-transition>
  </li>
</template>

<script>
  export default {
    name: 'leaf',
    props: {
      model: Object,
      index: Number,
      length: Number,
      leafWidth: String,
      folder: Boolean,
      checkbox: Boolean,
      list: Array,
      selected: Number
    },
    data() {
      return {
        node: null,
        parent: null,
        isOpen: true
      }
    },
    watch: {
      value: function(val) {
        // this.Click()
      }
    },
    created() {
      this.isOpen = this.model.spread
    },
    computed: {
      clazz() {
        if (this.model.parentId === -1 && this.index === 0) { // 最外层第一个
          if (this.length > 1) {
            return this.isOpen ? 'roots_open' : 'roots_close' // 日┌  /  田┌
          } else {
            return this.isOpen ? 'root_open' : 'root_close' // 日─  /  田─
          }
        } else {
          if (this.length === this.index + 1) { // 最后节点
            if (this.model.children && this.model.children.length > 0) { // 有子集
              return this.isOpen ? 'bottom_open' : 'bottom_close' // 日└ / 田└
            } else {
              return 'bottom_docu'// └
            }
          } else { // 中间节点
            if (this.model.children && this.model.children.length > 0) { // 有子集
              return this.isOpen ? 'center_open' : 'center_close' // 日├ / 田├
            } else {
              return 'center_docu'// ├
            }
          }
        }
      }
    },
    methods: {
      nodeClick(e) {
        var a = document.getElementsByClassName('selected')
        for (var i = 0; i < a.length; i++) {
          a[i].classList.remove('selected')
        }
        e.currentTarget.classList.add('selected')
        this.emit(this.model)
      },
      emit(node) {
        if (this.checkbox) {
          var nodeList = []
          var selected = !node.selected
          node.selected = selected
          selectedAll(node.children, node.id, selected)
          // this.selectedParent(this.list, node.parentId, selected)
          getNodeList(this.list, nodeList)
          this.nodeCheckbox(nodeList)
        } else {
          this.$emit('node', node)
        }
      },
      nodeCheckbox(nodeList) {
        this.$emit('node-checkbox', nodeList)
      },
      selectedParent(list, pid, selected) {
        for (var i = 0; i < 3; i++) {
          if (this.parent && this.parent.parentId > 0) {
            this.getParent(list, this.parent.parentId, selected)
          } else {
            this.getParent(list, pid, selected)
          }
        }
      },
      getParent(list, pid, selected) {
        var that = this
        list.forEach(function(item, index) {
          if (item.id === pid) {
            item.selected = selected
            that.parent = item
          } else {
            that.getParent(item.children, pid, selected)
          }
        })
      }
    }
  }

  export function selectedAll(list, id, selected) {
    list.forEach(function(item, index) {
      if (item.parentId === id) {
        item.selected = selected
        selectedAll(item.children, item.id, selected)
      }
    })
  }

  export function getNodeList(list, nodeList) {
    list.forEach(function(item, index) {
      if (item.selected) {
        nodeList.push(item.id)
      }
      getNodeList(item.children, nodeList)
    })
  }

</script>
<style scoped>
  .node_name{
    line-height: 21px;
  }
  li ul.line {
    background: url(img/line_conn.png) 0 0 repeat-y;
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
    background-image: url(img/bootstrap.png);
  }
  li a.node{
    margin-left: -7px;
  }
  li a.node:hover{
    background-color: #dcdfe6;
  }
  li .node.selected{
    color: #409eff;
    background-color: #dcdfe6;
  }
  li span.button.ico {
    margin-right: -7px;
  }
  li span.button.chk{
    margin: 0px -4px;
  }
  li span.button.chk.checkbox_false_full {
    background-position: -5px 0px;
  }
  li span.button.chk.checkbox_true_full {
    background-position: -26px -21px;
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
    background: url(img/line_conn.png) 0 0 repeat-y;
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
