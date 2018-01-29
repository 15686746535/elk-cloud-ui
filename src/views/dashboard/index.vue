<template>
  <div class="dashboard-container">
    <div class="dashboard-text">欢迎登陆</div>
    <div class="dashboard-text">用户名：{{name}}</div>
    <div class="dashboard-text">角色名：<span v-for='role in roles' :key='role'>{{role}}</span></div>
    <br/>
    <br/>
    <br/>
    <span>字典标签,自定义标签</span>
    <dict dictType="dict_sex" v-model="dict" >1111</dict>

    <org-select></org-select>

    <el-button style="width: 174px;" @click="getDict">取值</el-button>

    <span>值为：{{dict}}</span>

    <div style="height: 500px;float: left;width: 300px;" >
      <!-- 调用实例  -->
      <org-tree @node-click="nodeClick" ></org-tree>
    </div>
    <div style="height: 500px;float: left;width: 300px;" >
      <!--
      -- 参数
      list:数据
      recordList:有复选框时回选节点集合
      id：如果同页面使用多个需要id区分
      open：是否展开    folder
      choiceType：类型 folder显示文件夹图标  checkbox显示复选框 folder_checkbox 都显示
      -- 事件
      @node-click：点击节点触发，返回节点对象
      @node-checkbox：点击复选框时触发 类型为checkbox时用来获取选中集合  传出两个参数 (val, isAdd) val 节点id  ，isAdd true选中，false取消
      -->
      <tree :list="list" :recordList="recordList" id="tree" :open="true" choiceType="checkbox" @node-checkbox="nodeCheckbox"></tree>

    </div>
    <div style="height: 500px">
      <div id="box">
        <input type="button" value="按钮" @click="toggle">
        <transition name="fade">
          <div id="div1" class="test1" v-show="hidden" ></div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Dict from '@/components/Dict'
import OrgSelect from '@/components/OrgSelect'
import OrgTree from '@/components/OrgTree'
import Tree from '@/components/Tree'

export default {
  components: {
    Dict,
    OrgTree,
    Tree,
    OrgSelect
  },
  name: 'dashboard',
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  },
  data() {
    return {
      dict: null,
      disabled: true,
      org: null,
      hidden: true,
      checkbox: [],
      recordList: [1, 2, 3],
      list: [
        {
          'id': 1,
          'name': '项目管理',
          'children': [
            {
              'id': 2,
              'name': '项目',
              'children': [
                {
                  'id': 3,
                  'name': '项目1',
                  'children': [
                    {
                      'id': 4,
                      'name': '项目1-1',
                      'children': [
                        {
                          'id': 5,
                          'name': '项目1-1-1',
                          'children': []
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              'id': 6,
              'name': '我的任务',
              'children': []
            },
            {
              'id': 7,
              'name': '人员周报',
              'children': []
            }
          ]
        },
        {
          'id': 8,
          'name': '数据统计',
          'children': []
        },
        {
          'id': 9,
          'name': '人事管理',
          'children': []
        },
        {
          'id': 10,
          'name': '基础管理',
          'children': [
            {
              'id': 12,
              'name': '基础管理1',
              'children': []
            }
          ]
        }
      ]
    }
  },
  methods: {
    nodeClick: function(org) {
      console.log('treeModel')
      console.log(org)
    },
    nodeCheckbox(val, isAdd) {
      if (isAdd) {
        this.checkbox.push(val)
      } else {
        this.delNodeId(val)
      }
      console.log(this.checkbox)
    },
    delNodeId(id) {
      for (var i = 0; i < this.checkbox.length; i++) {
        if (this.checkbox[i] === id) this.checkbox.splice(i, 1)
      }
    },
    toggle() {
      this.hidden = !this.hidden
    },
    getDict() {
      console.log('org')
      console.log(this.org)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }


}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-active {
  opacity: 0
}
.test1{
  height: 200px;
  height: 200px;
  background-color: chartreuse
}
</style>
