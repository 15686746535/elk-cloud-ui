<template>
  <li :id="getID('_li')">
    <span :id="getID('_li_switch')" class="button switch " :class="getSwitchClazz"  @click='toggle'></span>
    <a :id="getID('_li_a')" @click="choice(model)">
      <span :id="getID('_li_a_icon')"  class="button ico " :class="getIconClazz"></span>
      <span :id="getID('_li_a_span')"  class="node_name">{{model.name}}</span>
    </a>
    <ul v-show="isOpen" v-if='isFolder' :class="isLine?'line':''" :id="getID('_li_ul')">
      <template v-for='(cel,index) in model.children'>
        <items  :model='cel' :id="getID('_li_ul')+'_'" :sort="index" :open="open" :extent="model.children.length"></items>
      </template>
    </ul>
  </li>
</template>

<script>
  export default {
    name: 'items',
    model: {
      prop: 'click',
      event: 'change'
    },
    props: ['model', 'id', 'sort', 'open', 'extent'],
    components: {},
    data() {
      return {
        isOpen: true,
        node: {
          id: null,
          name: ''
        }
      }
    },
    computed: {
      isFolder: function() {
        return this.model.children && this.model.children.length
      },
      isLine: function() {
        if (this.model.children.length > 1 || this.model.children.length === 1 && this.model.children[0].children.length > 0) {
          return true
        } else {
          return false
        }
      },
      getIconClazz: function() {
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
      getSwitchClazz: function() {
        if (this.id === 'tree_' && this.sort === 0) {
          return this.isOpen ? 'roots_open' : 'roots_close'
        } else if (this.extent === this.sort + 1) {
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
    },
    methods: {
      choice: function(model) {
        this.$emit('change', model)
      },
      getID: function(suffix) {
        return this.id + (this.sort + 1) + suffix
      },
      toggle: function() {
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
    padding: 0 0 0 18px;
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
  li span.button.ico {
    margin-right: -2px;
    margin-left: -6px;
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
  /*顶级树形按钮样式*/
  /*展开*/
  li span.button.roots_open {
    background-position: -105px 0;
  }
  /*关闭*/
  li span.button.roots_close {
    background-position: -126px 0;
  }
  /*中间树形按钮样式*/
  /*展开*/
  li span.button.center_open {
    background-position: -105px -21px;
  }
  /*关闭*/
  li span.button.center_close {
    background-position: -126px -21px;
  }
  /*最后一个*/
  /*展开*/
  li span.button.bottom_open {
    background-position: -105px -42px;
  }
  /*关闭*/
  li span.button.bottom_close {
    background-position: -126px -42px;
  }
  /*枝干的虚线连接┊*/
  li ul.line {
    background: url(../img/line_conn.png) 0 0 repeat-y;
  }
  /*叶子节点 ├ */
  li span.button.center_docu {
    background-position: -84px -21px;
  }
  /*叶子节点 └*/
  li span.button.bottom_docu {
    background-position: -84px -42px;
  }


  li span.button.center_docu {
    background-position: -84px -21px;
  }
</style>
