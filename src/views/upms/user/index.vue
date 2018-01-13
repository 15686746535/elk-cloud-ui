<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      |&nbsp;<span style="font-size: 20px;font-weight: 600;font-family: '微软雅黑 Light'">同事列表</span>
      <!--<el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="用户名"-->
                <!--v-model="listQuery.username">-->
      <!--</el-input>-->
      <!--<el-button class="filter-item" type="primary" v-waves icon="search" @click="handleFilter">搜索</el-button>-->
      <!--<el-button v-if="sys_user_add" class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="edit">添加</el-button>-->
      <!--<el-button class="filter-item" type="primary" icon="document" @click="handleDownload">导出</el-button>-->
    </div>
    <el-row>
      <el-col style='width: 15%;margin-top:15px; box-shadow: #99a9bf 5px 5px 5px;text-align: center'>
        <!--<div style="">-->
        <el-card>
          <span style="font-size: 16px;font-weight: 600;font-family: '微软雅黑 Light'">部门筛选</span>
          <hr>
          <el-tree
            class="filter-tree"
            :data="treeData"
            node-key="id"
            highlight-current
            :props="defaultProps"
            :filter-node-method="filterNode"
            @node-click="getUserList"
            default-expand-all
          >
          </el-tree>
          <!--<el-tree-->
            <!--:data="treeData"-->
            <!--:props="defaultProps"-->
            <!--show-checkbox-->
            <!--node-key="id"-->
            <!--default-expand-all-->
            <!--:expand-on-click-node="true"-->
            <!--:render-content="renderContent">-->
          <!--</el-tree>-->

        <!--</div>-->
        </el-card>
      </el-col>
      <el-col :span="16" style='margin-left: 10px; margin-top:15px;width: 75%'>
        <el-card>
        <!--<div>-->
          <div class="tab_title" style="width: 35%;">基本信息</div>
          <div class="tab_title">招生图表</div>
          <div class="tab_title">来访登记表</div>
        <!--</div>-->
        <!-- 身份卡循环 -->
        <div class="user_table" v-for="list in userList">
          <div class="user_info">
            <img :src="list.avatar" class="img">  <!-- 头像 -->
            <!-- 员工信息 -->
            <div class="user">
              姓名：{{list.name}}
            </div>
          </div>
          <!-- 招生记录 -->
          <div class="user_recruit">
            <LineChart :chart-data="lineChartData"></LineChart>
          </div>
          <!-- 来访信息 -->
          <div class="user_visit">
            <bar></bar>
          </div>

        </div>
        </el-card>
      </el-col>
      <!--<el-col :span="16" style='margin-top:15px;'>-->
        <!--<el-button @click="cancel('form')">取 消</el-button>-->
        <!--<el-button v-if="dialogStatus=='create'" type="primary" @click="create('form')">确 定</el-button>-->
        <!--<el-button v-else type="primary" @click="update('form')">修 改</el-button>-->
      <!--</el-col>-->
    </el-row>
  </div>
</template>

<script>
  import waves from '@/directive/waves/index.js' // 水波纹指令
  import Bar from '@/components/Bar'
  import LineChart from '@/components/LineChart'
  import { fetchTree } from '@/api/upms/org'
  import { fetchList } from '@/api/upms/user'

  const lineChartData = {
    newVisitis: {
      expectedData: [100, 120, 161, 134, 105, 160, 165],
      actualData: [120, 82, 91, 154, 162, 140, 145]
    },
    messages: {
      expectedData: [200, 192, 120, 144, 160, 130, 140],
      actualData: [180, 160, 151, 106, 145, 150, 130]
    },
    purchases: {
      expectedData: [80, 100, 121, 104, 105, 90, 100],
      actualData: [120, 90, 100, 138, 142, 130, 130]
    },
    shoppings: {
      expectedData: [130, 140, 141, 142, 145, 150, 160],
      actualData: [120, 82, 91, 154, 162, 140, 130]
    }
  }

  export default {
    components: {
      Bar,
      LineChart
    },
    name: 'index',
    directives: {
      waves
    },
    data() {
      return {
        lineChartData: lineChartData.newVisitis,
        userList: [],
        total: 1,
        listLoading: true,
        listQuery: {
          page: 1,
          limit: 20,
          orgId: null
        },
        treeData: [],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      }
    },
    created() {
      this.getOrgList()
      this.getUserList(null)
    },
    methods: {
      append: function(store, data) {
        store.append({ id: this.id++, label: 'testtest', children: [] }, data)
      },
      remove: function(store, data) {
        store.remove(data)
      },
      renderContent: function(createElement, { node }) {
        return createElement('span', [
          createElement('span', node.label),
          createElement('span', {
            attrs: {
              style: 'float: right; margin-right: 20px'
            }
          })
        ])
      },
      getOrgList() {
        fetchTree().then(response => {
          this.treeData = response.data.data
        })
      },
      getUserList(data) {
        if (data != null) {
          this.listQuery.orgId = data.id
          fetchList(this.listQuery).then(response => {
            this.userList = response.data.data.list
          })
        } else {
          fetchList(this.listQuery).then(response => {
            this.userList = response.data.data.list
          })
        }
      },
      filterNode(value, data) {
        if (!value) return true
        return data.label.indexOf(value) !== -1
      }
    }
  }
</script>


<style scoped>

  .user_table{
    width: 98%;
    height: 170px;
    clear: both;
    background-color: #f7f7f7;
    margin: 10px 0 0 10px;
  }
  .user_info{
    float: left;
    width: 35%;
    height: 150px;
    margin: 10px 0 0 10px;
  }
  .img{
    width: 150px;
    height: 150px;
    float: left;
  }
  .user{
    float: left;
    width: 130px;
    height: 130px;
    padding: 20px 0 0 20px;
  }
  .user_visit {
    float: left;
    width: 30%;
    height: 150px;
    margin: 10px 0 0 10px;
  }

  .user_recruit {
    float: left;
    width: 30%;
    height: 150px;
    margin: 10px 0 0 10px;
  }
  .tab_title{
    float: left;
    text-align: center;
    width: 30%;
    height: 30px;
    margin: 10px 0 0 10px;
  }
</style>
