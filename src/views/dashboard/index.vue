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
    <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/"   multiple :limit="3" >
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
    <div style="height: 500px;float: left;width: 300px;" >
      <!-- 调用实例  -->
      <org-tree @node-click="nodeClick" ></org-tree>
    </div>
    <div style="height: 500px;float: left;width: 300px;" >
      <tree :list="list" :recordList="recordList" :open="true" choiceType="checkbox" @node-checkbox="nodeCheckbox"></tree>
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
</style>
