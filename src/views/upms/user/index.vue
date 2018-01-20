<template>
  <div class="app-container calendar-list-container">
    <div v-show="showModule=='list'">
      <div class="filter-container">
        |&nbsp;<span style="font-size: 20px;font-weight: 600;font-family: '微软雅黑 Light'">同事列表</span>
      </div>
      <el-row>
        <el-col :span="16" style='margin-left: 63%; margin-top:15px;width: 37%'>
          <el-input @keyup.enter.native="handleFilter" style="width: 300px;" class="filter-item" placeholder="用户名" v-model="listQuery.username"></el-input>
          <el-button class="filter-item" type="primary" v-waves @click="handleFilter">搜索</el-button>
          <el-button class="filter-item" style="margin-left: 10px;" @click="handleCurrentChange" type="primary" icon="edit">添加</el-button>
        </el-col>

        <el-col style='width: 15%;margin-top:15px; box-shadow: #99a9bf 5px 5px 5px;text-align: center'>
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
              @node-click="searchByOrg"
              default-expand-all
            ></el-tree>
          </el-card>
        </el-col>

        <el-col :span="16" style='margin-left: 10px; margin-top:15px;width: 75%'>
          <el-card>
            <!-- 身份卡循环 -->
            <el-table :data="userList" height="600" border style="width: 100%; " highlight-current-row @current-change="handleCurrentChange"  v-loading="listLoading" element-loading-text="给我一点时间">
              <el-table-column label="员工信息">
                <template slot-scope="scope">
                  <!-- 头像 -->
                  <img :src="scope.row.avatar" class="img">
                  <!-- 员工信息 -->
                  <div class="user">
                    姓名：{{scope.row.name}}
                    <br/>
                    工号：{{scope.row.jobNumber}}
                    <br/>
                    职位：{{scope.row.birthday}}
                    <br/>
                    生日：{{scope.row.birthday}}
                    <br/>
                    私人电话：{{scope.row.mobile}}
                    <br/>
                    工作电话：{{scope.row.workMobile}}
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="招生记录">
                <template slot-scope="scope">
                  <bar style="height: 180px" :data="recruits"></bar>
                </template>
              </el-table-column>

              <el-table-column label="来访信息">
                <template slot-scope="scope">
                  <LineChart style="height: 180px" :chart-data="visits"></LineChart>
                </template>
              </el-table-column>
            </el-table>

            <el-form-item>
              <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="关键词" v-model="listQuery.roleName"></el-input>
              <el-button class="filter-item" type="primary" v-waves >搜索</el-button>
              <!--<el-button class="filter-item" style="margin-left: 10px;" @click="create" type="primary" icon="create">添加</el-button>-->
              <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="create">添加</el-button>
            </el-form-item>

          </el-card>
        </el-col>
      </el-row>
    </div>

    <div v-show="showModule=='info'">
      <el-card class="box-card1">
        <div slot="header" class="clearfix">
          |&nbsp;<span style="font-size: 20px;font-weight: 600;font-family: '微软雅黑 Light'">同事列表</span>
          <el-button type="primary" style="width: 174px;float: right" @click="back">返回</el-button>
        </div>

        <div style="width: 200px; height: 300px;float: left;">
          <img width="100%" height="100%" :src="userListEdit.avatar" class="image">
          <el-button type="primary" style="width: 174px;">修改头像</el-button>
        </div>

        <el-form :inline="true" :model="userListEdit" label label-width="82px" label-position="left" class="demo-form-inline">


          <el-col :span="5">
            <el-form-item label="员工姓名:" required>
              <span style="padding-left: 16px;font-size: 12px;" v-if="!edit">{{userListEdit.name}}</span>
              <el-input v-else  v-model="userListEdit.name" style="width: 180px" placeholder="员工姓名"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="5">
            <el-form-item label="工号:" required>
              <span style="padding-left: 16px;font-size: 12px;" v-if="!edit">{{userListEdit.jobNumber}}</span>
              <el-input v-else  v-model="userListEdit.jobNumber" style="width: 180px" placeholder="工号"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="5">
            <el-form-item label="身份证号:" required>
              <span style="padding-left: 16px;font-size: 12px;" v-if="!edit">{{userListEdit.idNumber}}</span>
              <el-input v-else  v-model="userListEdit.idNumber" style="width: 180px" placeholder="身份证号"></el-input>
            </el-form-item>
          </el-col>

          <!-- 出生日期 -->
          <el-col :span="5">
            <el-form-item label="出生日期:" required>
              <span class="" style="padding-left: 16px;font-size: 12px;" v-if="!edit">{{userListEdit.birthday | parseTime('{y}-{m}-{d}')}}</span>
              <el-date-picker v-else   type="date" placeholder="出生日期"  style="width: 180px;" v-model="userListEdit.birthday"></el-date-picker>
            </el-form-item>
          </el-col>

          <!--<div style="border-bottom:1px solid #001528;margin-left:220px; width: 1010px;"></div>   | parseTime('{y}-{m}-{d}')-->

          <!-- 性别 -->
          <el-col :span="5">
            <el-form-item label="性别:" required>
              <span style="padding-left: 16px;font-size: 12px;" v-if="!edit">{{userListEdit.sex==1?'男':'女'}}</span>
              <span v-else >
            <el-radio  v-model="userListEdit.sex" label="1">男</el-radio>
            <el-radio  v-model="userListEdit.sex" label="2">女</el-radio>
            </span>
            </el-form-item>
          </el-col>

          <!-- 所属部门 -->
          <el-col :span="5">
            <el-form-item label="所属部门:" required>
              <span style="padding-left: 16px;font-size: 12px;" v-if="!edit">{{userListEdit.qq}}</span>
              <el-input  v-else v-model="userListEdit.idCard" style="width: 180px" placeholder="所属部门"></el-input>
            </el-form-item>
          </el-col>

          <!-- 联系电话 -->
          <el-col :span="5">
            <el-form-item label="联系电话:" required>
              <span style="padding-left: 16px;font-size: 12px;" v-if="!edit">{{userListEdit.mobile}}</span>
              <el-input v-else  v-model="userListEdit.mobile" placeholder="联系电话"  style="width: 180px"></el-input>
            </el-form-item>
          </el-col>

          <!-- 联系地址 -->
          <el-col :span="5">
            <el-form-item label="联系地址:" required>
              <span style="padding-left: 16px;font-size: 12px;" v-if="!edit">{{userListEdit.contactAddress}}</span>
              <el-input v-else  v-model="userListEdit.contactAddress" placeholder="联系地址"  style="width: 180px"></el-input>
            </el-form-item>
          </el-col>

          <!-- 家庭住址 -->
          <el-col :span="5">
            <el-form-item label="家庭地址:" required>
              <span style="padding-left: 16px;font-size: 12px;" v-if="!edit">{{userListEdit.homeAddress}}</span>
              <el-input v-else  v-model="userListEdit.homeAddress" placeholder="家庭地址"  style="width: 180px"></el-input>
            </el-form-item>
          </el-col>

          <!-- 学历 -->
          <el-col :span="5">
            <el-form-item label="学历:" required>
              <span style="padding-left: 16px;font-size: 12px;" v-if="!edit">{{userListEdit.education}}</span>
              <el-input v-else  v-model="userListEdit.education" placeholder="学历"  style="width: 180px"></el-input>
            </el-form-item>
          </el-col>

          <!-- 专业 -->
          <el-col :span="5">
            <el-form-item label="专业:" required>
              <span style="padding-left: 16px;font-size: 12px;" v-if="!edit">{{userListEdit.major}}</span>
              <el-input v-else v-model="userListEdit.major" placeholder="专业"  style="width: 180px"></el-input>
            </el-form-item>
          </el-col>

          <!-- QQ -->
          <el-col :span="5">
            <el-form-item label="QQ:" required>
              <span style="padding-left: 16px;font-size: 12px;" v-if="!edit">{{userListEdit.qq}}</span>
              <el-input v-else  v-model="userListEdit.qq" placeholder="QQ"  style="width: 180px"></el-input>
            </el-form-item>
          </el-col>

          <!--<hr style="padding-top: 120px; margin-left:200px;margin-bottom: 30px; width: 1110px; border: none; border-bottom:1px solid #99a9bf;"/>-->

          <!--<el-col :span="6">-->
          <!--<el-form-item label="活动区域" required>-->
          <!--<el-select v-model="userInfo.region" placeholder="活动区域">-->
          <!--<el-option label="区域一" value="shanghai"></el-option>-->
          <!--<el-option label="区域二" value="beijing"></el-option>-->
          <!--</el-select>-->
          <!--</el-form-item>-->
          <!--</el-col>-->

          <!--<el-col :span="5">-->
          <!--<el-form-item label="档案号:" required>-->

          <!--<span style="padding-left: 16px;font-size: 12px;" v-if="!edit">{{userInfo.user.qq}}</span>-->
          <!--<el-input v-else  v-model="userInfo.user" style="width: 180px" placeholder="档案号"></el-input>-->
          <!--</el-form-item>-->
          <!--</el-col>-->

          <!--<el-col :span="5">-->
          <!--<el-form-item label="职位:" required>-->
          <!--<span style="padding-left: 16px;font-size: 12px;" v-if="!edit">{{userInfo.user.qq}}</span>-->
          <!--<el-input  v-else v-model="userInfo.idCard" style="width: 180px" placeholder="职位"></el-input>-->
          <!--</el-form-item>-->
          <!--</el-col>-->

          <!-- 入职日期 -->
          <el-col :span="5">
            <el-form-item label="入职日期:" required>
              <span style="padding-left: 16px;font-size: 12px;" v-if="!edit">{{userListEdit.joinedTime }}</span>
              <el-date-picker  v-else type="date" placeholder="入职日期"  style="width: 180px" v-model="userListEdit.joinedTime"></el-date-picker>
            </el-form-item>
          </el-col>

          <!--<hr style="padding-top: 120px; margin-left:200px;margin-bottom: 30px; width: 980px; border: none; border-bottom:1px solid #99a9bf;"/>-->

          <el-col :span="20">
            <el-form-item  style="float: right">
              <el-button type="primary" v-if="edit" style="width: 174px;" @click="saveInfo">确认</el-button>
              <el-button style="width: 174px;" @click="editInfo">编辑信息</el-button>
            </el-form-item>
          </el-col>


        </el-form>


      </el-card>
      <el-card class="box-card2">

        <!--<el-tabs v-model="activeName2" type="card" @tab-click="handleClick">-->
        <el-tabs v-model="activeName2" type="card">
          <el-tab-pane label="团队情况" name="first">
            <bar style="width: 300px"></bar>
          </el-tab-pane>
          <el-tab-pane label="跟进情况" name="second">配置管理</el-tab-pane>
          <el-tab-pane label="招生情况" name="third">角色管理</el-tab-pane>
        </el-tabs>
      </el-card>
    </div>

  </div>


</template>

<script>
  import waves from '@/directive/waves/index.js' // 水波纹指令
  import Bar from '@/components/Bar'
  import LineChart from '@/components/LineChart'
  import { fetchTree } from '@/api/upms/org'
  import { fetchList } from '@/api/upms/user'

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
        edit: false,
        activeName2: 'first',
        showModule: 'list',
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
        },
        userListEdit: {}
      }
    },
    created() {
      this.getOrgList()
    },
    methods: {
      append: function(store, data) {
        store.append({ id: this.id++, label: 'testtest', children: [] }, data)
      },
      remove: function(store, data) {
        store.remove(data)
      },
      // 点击行  编辑
      handleCurrentChange(val) {
        this.showModule = 'info'
        this.userListEdit = val
      },
      back() {
        this.showModule = 'list'
      },
      getOrgList() {
        fetchTree().then(response => {
          console.log(response.data.data)
          this.listQuery.orgId = response.data.data[0].id
          console.log(this.listQuery.orgId)
          this.treeData = response.data.data
          this.getUserList()
        })
      },
      getUserList() {
        console.log('=-=-=-=-=-=-=-=-=-=-=-546456456456456=-=-=-=-=-=-')
        console.log(this.listQuery)
        fetchList(this.listQuery).then(response => {
          console.log('=-=-=-=-=-=-=-=-=-=-=-546456456456456=-=-=-=-=-=-')
          console.log(response.data.data.list)
          this.userList = response.data.data.list
          this.listLoading = false
        })
      },
      searchByOrg(data) {
        this.listQuery.orgId = data.id
        this.getUserList()
      },
      filterNode(value, data) {
        if (!value) return true
        return data.label.indexOf(value) !== -1
      },
      editInfo() {
        this.edit = true
        console.log(this.userInfo.user.sex)
      },
      saveInfo() {
        this.edit = false
      },
      handleFilter() {
        this.listQuery.page = 1
        this.getUserList()
      }
    }
  }
</script>


<style scoped>
  .img{
    width: 150px;
    height: 150px;
    float: left;
  }
  .user{
    float: left;
    padding: 0 0 0 20px;
  }

  .image {
    margin-bottom: 20px;
    margin-right: 50px;
    width: 174px;
    height: 174px;
    display: block;
    float: left;
  }
</style>
