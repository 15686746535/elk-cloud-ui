<template>
  <div :style="{width:width}">
    <div class="ran-mask-all" v-show="isOpen" @click="cancel"></div>
    <div class="ran-select">
      <input class="ran-input el-input__inner hover " :class="isOpen?'selected':''" @click="choice" :style="{height:height}" :placeholder=placeholder v-model="label" readonly  placeholder="请选择"/>
      <i class="ran-select-icon el-icon-arrow-up hover" @click="choice" :class="isOpen?'ran-select-icon-open':'ran-select-icon-close'"></i>
      <i class="ran-select-icon el-icon-error hover" v-if="currentId != null " @click="clean" :class="isOpen?'ran-select-icon-open':'ran-select-icon-close'"></i>
      <div v-show="isOpen" class="ran-arrow"></div>
      <el-collapse-transition>
        <div v-show="isOpen" class="ran-select-dropdown" :style="{minWidth:width}">
          <div class="not-data" v-show="noData">
            没有数据
          </div>
          <div class="ran-data" v-show="!noData">
            <my-tree :data="orgList"
                     v-model="currentId"
                     choiceType="folder"
                     @node="emitChange"></my-tree>
            <!--<my-tree :data="orgList" :open="true" id="orgSelect" v-model="value" choiceType="folder" @node-click="emitChange"></my-tree>-->
          </div>
        </div>
      </el-collapse-transition>
    </div>
  </div>
</template>

<script>
  import request from '@/utils/request'
  import MyTree from '@/components/MyTree'

  export default {
    name: 'org-select',
    components: {
      MyTree
    },
    model: {
      prop: 'value',
      event: 'change'
    },
    props: {
      width: {
        type: String,
        default: '100%'
      },
      height: {
        type: String,
        default: '40px'
      },
      placeholder: {
        type: String,
        default: '请选择'
      },
      value: {
        type: Number
      }
    },
    data() {
      return {
        noData: true,
        isOpen: false,
        orgList: [],
        currentId: null,
        label: '',
        org: {}
      }
    },
    // 数据请求
    watch: {
      value: function(val) {
        this.currentId = val
        this.choose(this.orgList, val)
      }
    },
    created() {
      request({
        url: '/upms/org/tree',
        method: 'get'
      }).then(response => {
        if (response.data.data) {
          this.noData = false
          this.orgList = response.data.data
        }
      })
    },
    methods: {
      clean() {
        this.label = ''
        this.org = {}
        this.currentId = null
        this.$emit('change', null)
        this.$emit('org-click', {})
      },
      emitChange(value) {
        this.org = value
        this.label = value ? value.label : ''
        this.cancel()
        this.$emit('change', value ? value.id : null)
        this.$emit('org-click', this.org)
      },
      choose(list, id) {
        var that = this
        list.forEach(function(item, index) {
          if (item.id === id) {
            that.label = item.label
          }
          that.choose(item.children, id)
        })
      },
      cancel() {
        this.isOpen = false
      },
      choice() {
        this.isOpen = !this.isOpen
      }
    }
  }

</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .ran-select-icon-open{
    -webkit-transform: rotateZ(0deg);
    transform: rotateZ(0deg);
  }
  .ran-select-icon-close{
    -webkit-transform: rotateZ(180deg);
    transform: rotateZ(180deg);
  }
  .el-icon-error{
    display: none;
  }
  .ran-select:hover{
    .el-icon-error{
      display: block!important;
    }
    .el-icon-arrow-up{
      display: none!important;
    }
  }
  .ran-select-icon{
    position: absolute;
    z-index: 33;
    color: #bab9c1;
    top: 32%;
    right: 10px;
    transition:transform 0.4s;
  }
  .ran-select{
    position: relative;
  }
  .ran-select-dropdown{
    transform-origin: center top 0px;
    position: absolute;
    z-index: 1001;
    border: 1px solid rgb(228, 231, 237);
    border-radius: 4px;
    background-color: rgb(255, 255, 255);
    box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 12px 0px;
    box-sizing: border-box;
    margin: 5px 0px;
  }
  .not-data{
    padding: 20px;
    text-align: center;
    color: #737171;
  }
  .ran-arrow{
    position: absolute;
    width: 0px;
    height: 0px;
    left: 30px;
    top: 50px;
    border-style: solid;
    border-color: rgb(255, 255, 255) transparent;
    border-width: 0px 6px 7px 6px;
    z-index: 6666;
  }
  .ran-data{
    padding: 0 15px;
    max-height: 250px;
    overflow: auto;
  }
  input.selected{
    border-color: #419dff!important;
  }
  .ran-input{
      width: 100%;
     -webkit-appearance: none;
     background-color: #fff;
     border-radius: 4px;
     border: 1px solid #dcdfe6;
     box-sizing: border-box;
     color: #606266;
     display: inline-block;
     font-size: inherit;
     line-height: 1;
     outline: 0;
     padding: 0 15px;
     -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
     transition: border-color .2s cubic-bezier(.645,.045,.355,1);
  }
  .ran-mask-all{
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 666;
  }
  :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color: #c1c4cc; opacity:1;font-size: 14px;
  }

  ::-moz-placeholder { /* Mozilla Firefox 19+ */
    color: #c1c4cc;opacity:1;font-size: 14px;
  }

  input:-ms-input-placeholder{
    color: #c1c4cc;opacity:1;font-size: 14px;
  }

  input::-webkit-input-placeholder{
    color: #c1c4cc;opacity:1;font-size: 14px;
  }
</style>
