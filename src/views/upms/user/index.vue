<template>
  <div class="app-container">
    <div v-show="showModule=='list'">
      <el-row>
        <el-col :span="16" style='margin-top:15px;width: 100%'>
          <div class="filter-container" style="float: left">
            |&nbsp;<span style="font-size: 20px;font-weight: 600;font-family: '微软雅黑 Light'">同事列表</span>
          </div>
          <div style="float: right">
            <el-input @keyup.enter.native="handleFilter" style="width: 300px;" class="filter-item" placeholder="用户名" v-model="listQuery.username"></el-input>
            <el-button class="filter-item" type="primary" v-waves @click="handleFilter">搜索</el-button>
            <el-button class="filter-item" style="margin-left: 10px;" @click="create" type="primary" icon="edit">添加</el-button>
          </div>


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

        <el-col :span="16" style='margin-left: 10px; margin-top:15px;width: 84%'>
          <el-card>
            <!-- 身份卡循环 -->
            <el-table :data="userList" height="600" border style="width: 100%; " highlight-current-row @row-dblclick="editlist"  v-loading="listLoading" element-loading-text="给我一点时间">
              <el-table-column label="员工信息">
                <template slot-scope="scope">
                  <!-- 头像 -->
                  <img :src="scope.row.avatar" class="img">
                  <!-- 员工信息 -->
                  <div class="userInfo">
                    姓名：{{scope.row.name}}
                    <br/>
                    工号：{{scope.row.jobNumber}}
                    <br/>
                    职位：{{scope.row.roleName}}
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
                  <bar style="height: 180px" :data="scope.row.recruits"></bar>
                </template>
              </el-table-column>

              <el-table-column label="来访信息">
                <template slot-scope="scope">
                  <LineChart style="height: 180px" :chart-data="scope.row.visits"></LineChart>
                </template>
              </el-table-column>
            </el-table>

            <div v-show="!listLoading" class="pagination-container">
              <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                             :current-page.sync="listQuery.page"
                             :page-sizes="[10,20,30,50]" :page-size="listQuery.limit"
                             layout="total, sizes, prev, pager, next, jumper" :total="total">
              </el-pagination>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <div v-show="showModule=='info'">
      <el-card>
        <div slot="header" class="clearfix">
          <div style="float: left">
            |&nbsp;<span style="font-size: 20px;font-weight: 600;font-family: '微软雅黑 Light'">同事信息</span>
          </div>
          <div style="float: right">
            <el-button type="primary" style="width: 174px;float: right" @click="back">返回</el-button>
          </div>
        </div>


        <el-row style="width: 15%; float: left;">
          <img width="100%" height="100%" :src="userListEdit.avatar" class="image">
          <el-button type="primary" style="width: 174px;">修改头像</el-button>
        </el-row>
        <el-row style="width: 85%;float: left;">
          <el-form :inline="true" :model="userListEdit" label label-width="120px" label-position="left" class="demo-form-inline">


            <el-col :span="6">
              <el-form-item label="工号:" required>
                <el-input v-if="edit"  v-model="userListEdit.jobNumber" style="width: 180px" placeholder="工号"></el-input>
                <span style="padding-left: 16px;font-size: 12px;" v-else>{{userListEdit.jobNumber}}</span>
              </el-form-item>
            </el-col>


            <el-col :span="6">
              <el-form-item label="员工姓名:" required>
                <el-input v-if="edit"  v-model="userListEdit.name" style="width: 180px" placeholder="员工姓名"></el-input>
                <span style="padding-left: 16px;font-size: 12px;" v-else>{{userListEdit.name}}</span>
              </el-form-item>
            </el-col>


            <el-col :span="6">
              <el-form-item label="身份证号:" required>
                <el-input v-if="edit"  v-model="userListEdit.idNumber" style="width: 180px" placeholder="身份证号"></el-input>
                <span style="padding-left: 16px;font-size: 12px;" v-else>{{userListEdit.idNumber}}</span>
              </el-form-item>
            </el-col>

            <!-- 出生日期 -->
            <el-col :span="6">
              <el-form-item label="生日:" required>
                <el-date-picker v-if="edit"   type="date" placeholder="生日"  style="width: 180px;" v-model="userListEdit.birthday"></el-date-picker>
                <span class="" style="padding-left: 16px;font-size: 12px;" v-else>{{userListEdit.birthday | subTime}}</span>
              </el-form-item>
            </el-col>

            <!--<div style="border-bottom:1px solid #001528;margin-left:220px; width: 1010px;"></div>   | parseTime('{y}-{m}-{d}')-->

            <!-- 性别 -->
            <el-col :span="6">
              <el-form-item label="性别:" required>
                <dict dictType="dict_sex" style="width: 180px;" v-if="edit" v-model="userListEdit.sex" placeholder="性别"></dict>
                <span style="padding-left: 16px;font-size: 12px;" v-else>{{userListEdit.sex==1?'男':userListEdit.sex==2?'女':''}}</span>
              </el-form-item>
            </el-col>

            <!-- 入职日期 -->
            <el-col :span="6">
              <el-form-item label="入职日期:" required>
                <el-date-picker  v-if="edit" type="date" placeholder="入职日期"  style="width: 180px" v-model="userListEdit.joinedTime"></el-date-picker>
                <span style="padding-left: 16px;font-size: 12px;" v-else>{{userListEdit.joinedTime | subTime}}</span>
              </el-form-item>
            </el-col>





            <!-- 所属部门 -->
            <el-col :span="6">
              <el-form-item label="所属部门:" required>
                <el-input  v-if="edit" v-model="userListEdit.orgId" style="width: 180px" placeholder="所属部门"></el-input>
                <span style="padding-left: 16px;font-size: 12px;" v-else>{{userListEdit.orgName}}</span>
              </el-form-item>
            </el-col>

            <!-- 职位 -->
            <el-col :span="6">
              <el-form-item label="职位:" required>
                <el-input  v-if="edit" v-model="userListEdit.roleId" style="width: 180px" placeholder="职位"></el-input>
                <span style="padding-left: 16px;font-size: 12px;" v-else>{{userListEdit.roleName}}</span>
              </el-form-item>
            </el-col>

            <!-- 联系电话 -->
            <el-col :span="6">
              <el-form-item label="联系电话:" required>
                <el-input v-if="edit"  v-model="userListEdit.mobile" placeholder="联系电话"  style="width: 180px"></el-input>
                <span style="padding-left: 16px;font-size: 12px;" v-else>{{userListEdit.mobile}}</span>
              </el-form-item>
            </el-col>

            <!-- E-mail -->
            <el-col :span="6">
              <el-form-item label="E-mail:" required>
                <el-input  v-if="edit" v-model="userListEdit.email" style="width: 180px" placeholder="E-mail"></el-input>
                <span style="padding-left: 16px;font-size: 12px;" v-else>{{userListEdit.email}}</span>
              </el-form-item>
            </el-col>


            <!-- 联系地址 -->
            <el-col :span="6">
              <el-form-item label="联系地址:" required>
                <el-input v-if="edit"  v-model="userListEdit.contactAddress" placeholder="联系地址"  style="width: 180px"></el-input>
                <span style="padding-left: 16px;font-size: 12px;" v-else>{{userListEdit.contactAddress}}</span>
              </el-form-item>
            </el-col>

            <!-- 家庭住址 -->
            <el-col :span="6">
              <el-form-item label="家庭地址:" required>
                <el-input v-if="edit"  v-model="userListEdit.homeAddress" placeholder="家庭地址"  style="width: 180px"></el-input>
                <span style="padding-left: 16px;font-size: 12px;" v-else>{{userListEdit.homeAddress}}</span>
              </el-form-item>
            </el-col>


            <!-- 分割线 -->
            <el-col> <hr style="border: none;margin:-5px 0 20px 0; border-bottom:1px solid #d3dce6; "/> </el-col>

            <!-- 学历 -->
            <el-col :span="6">
              <el-form-item label="学历:" required>
                <el-input v-if="edit"  v-model="userListEdit.education" placeholder="学历"  style="width: 180px"></el-input>
                <span style="padding-left: 16px;font-size: 12px;" v-else>{{userListEdit.education}}</span>
              </el-form-item>
            </el-col>

            <!-- 专业 -->
            <el-col :span="6">
              <el-form-item label="专业:" required>
                <el-input v-if="edit" v-model="userListEdit.major" placeholder="专业"  style="width: 180px"></el-input>
                <span style="padding-left: 16px;font-size: 12px;" v-else>{{userListEdit.major}}</span>
              </el-form-item>
            </el-col>

            <!-- QQ -->
            <el-col :span="6">
              <el-form-item label="QQ:" required>
                <el-input v-if="edit"  v-model="userListEdit.qq" placeholder="QQ"  style="width: 180px"></el-input>
                <span style="padding-left: 16px;font-size: 12px;" v-else>{{userListEdit.qq}}</span>
              </el-form-item>
            </el-col>

            <!-- wechat -->
            <el-col :span="6">
              <el-form-item label="微信:" required>
                <el-input v-if="edit"  v-model="userListEdit.wechat" placeholder="微信"  style="width: 180px"></el-input>
                <span style="padding-left: 16px;font-size: 12px;" v-else>{{userListEdit.wechat}}</span>
              </el-form-item>
            </el-col>

            <!-- 分割线 -->
            <el-col> <hr style="border: none;margin:-5px 0 20px 0; border-bottom:1px solid #d3dce6; "/> </el-col>

            <!-- 转正日期 -->
            <el-col :span="6">
              <el-form-item label="转正日期:" required>
                <el-date-picker  v-if="edit" type="date" placeholder="转正日期"  style="width: 180px" v-model="userListEdit.positiveTime"></el-date-picker>
                <span style="padding-left: 16px;font-size: 12px;" v-else>{{userListEdit.positiveTime | subTime}}</span>
              </el-form-item>
            </el-col>

            <!-- 公积金 -->
            <el-col :span="6">
              <el-form-item label="公积金:" required>
                <el-date-picker  v-if="edit" type="date" placeholder="公积金"  style="width: 180px" v-model="userListEdit.providentFundTime"></el-date-picker>
                <span style="padding-left: 16px;font-size: 12px;" v-else>{{userListEdit.providentFundTime | subTime}}</span>
              </el-form-item>
            </el-col>

            <!-- 五险 -->
            <el-col :span="6">
              <el-form-item label="五险:" required>
                <el-date-picker  v-if="edit" type="date" placeholder="五险"  style="width: 180px" v-model="userListEdit.fiveInsuranceTime"></el-date-picker>
                <span style="padding-left: 16px;font-size: 12px;" v-else>{{userListEdit.fiveInsuranceTime | subTime}}</span>
              </el-form-item>
            </el-col>


            <!-- 工作电话 -->
            <el-col :span="6">
              <el-form-item label="工作电话:" required>
                <el-input v-if="edit"  v-model="userListEdit.workMobile" placeholder="工作电话"  style="width: 180px"></el-input>
                <span style="padding-left: 16px;font-size: 12px;" v-else>{{userListEdit.workMobile}}</span>
              </el-form-item>
            </el-col>

            <!-- 分割线 -->
            <el-col> <hr style="border: none;margin:-5px 0 20px 0; border-bottom:1px solid #d3dce6; "/> </el-col>

            <!-- 紧急联系人 -->
            <el-col :span="6">
              <el-form-item label="紧急联系人:" required>
                <el-input v-if="edit"  v-model="userListEdit.emergencyContact" placeholder="紧急联系人"  style="width: 180px"></el-input>
                <span style="padding-left: 16px;font-size: 12px;" v-else>{{userListEdit.emergencyContact}}</span>
              </el-form-item>
            </el-col>

            <!-- 紧急联系人电话 -->
            <el-col :span="6">
              <el-form-item label="电话:" required>
                <el-input v-if="edit"  v-model="userListEdit.emergencyMobile" placeholder="紧急联系人电话"  style="width: 180px"></el-input>
                <span style="padding-left: 16px;font-size: 12px;" v-else>{{userListEdit.emergencyMobile}}</span>
              </el-form-item>
            </el-col>


            <el-col :span="6">

              <el-form-item v-if="edit">
                <el-button v-if="!addInfo" type="primary" style="width: 150px;" @click="cancel">取消</el-button>
                <el-button v-if="addInfo" type="primary" style="width: 150px;" @click="add">确认保存</el-button>
                <el-button v-if="!addInfo" type="primary" style="width: 150px;" @click="update">确认修改</el-button>
              </el-form-item>


              <el-form-item v-else>
                <el-button type="primary" style="width: 150px;" @click="editInfo('vehicle')">编辑信息</el-button>
              </el-form-item>


            </el-col>


          </el-form>
        </el-row>

      </el-card>

        <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick" style="margin-top: 10px" >
          <el-tab-pane label="团队情况" name="1">
            <bar style="width: 300px"></bar>
          </el-tab-pane>
          <el-tab-pane label="跟进情况" name="2">配置管理</el-tab-pane>
          <el-tab-pane label="招生情况" name="3">角色管理</el-tab-pane>
        </el-tabs>
    </div>

  </div>


</template>

<script>
  import waves from '@/directive/waves/index.js' // 水波纹指令
  import Bar from '@/components/Bar'
  import Dict from '@/components/Dict'
  import LineChart from '@/components/LineChart'
  import { fetchTree } from '@/api/upms/org'
  import { fetchList, addObj, putObj, getObj } from '@/api/upms/user'

  export default {
    components: {
      Bar,
      LineChart,
      Dict
    },
    name: 'index',
    directives: {
      waves
    },
    data() {
      return {
        // 编辑标记
        edit: false,
        // 信息卡切换标记
        activeName: '1',
        // 模块标记
        showModule: 'list',
        // 员工集合
        userList: [],
        // 总条数
        total: 1,
        listLoading: true,
        // 分页数据
        listQuery: {
          page: 1,
          limit: 20,
          orgId: null
        },
        // 树形图
        treeData: [],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        userListEdit: {},
        addInfo: false
      }
    },
    created() {
      this.getOrgList()
    },
    methods: {
      // 新增
      create() {
        this.userListEdit = {}
        this.addInfo = true
        this.edit = true
        this.showModule = 'info'
      },
      // 双击行  编辑
      editlist(val) {
        console.log('====================== 正在进入单个员工编辑 =====================')
        getObj(val.userId).then(response => {
          console.log(response.data)
          this.userListEdit = response.data.data
        })
        this.showModule = 'info'
      },
      // 改变页容量
      handleSizeChange(val) {
        this.listQuery.limit = val
        this.getUserList()
      },
      // 改变当前页
      handleCurrentChange(val) {
        this.listQuery.page = val
        this.getUserList()
      },
      // 返回列表
      back() {
        this.showModule = 'list'
        this.getUserList()
        this.edit = false
        this.addInfo = false
      },
      // 查询部门集合
      getOrgList() {
        console.log('=====================   查询部门集合   =======================')
        fetchTree().then(response => {
          console.log(response.data)
          this.listQuery.orgId = response.data.data[0].id
          this.treeData = response.data.data
          console.log('=====================  完成   =======================')
          this.getUserList()
        })
      },
      // 查询员工集合
      getUserList() {
        console.log('=====================   查询员工集合   =======================')
        this.listLoading = false
        fetchList(this.listQuery).then(response => {
          console.log(response.data)
          this.userList = response.data.data.list
          this.listLoading = false
        })
        console.log('=====================   完成   =======================')
      },
      // 根据部门id查询员工
      searchByOrg(data) {
        console.log('=====================   根据部门id查询员工信息   =======================')
        this.listQuery.orgId = data.id
        this.getUserList()
      },
      // 编辑
      editInfo() {
        console.log('=====================     编辑    ===================')
        this.edit = true
        console.log('=====================     完成    ===================')
      },
      // 取消编辑
      cancel() {
        console.log('=================== 正在完成取消操作 ===================')
        this.editlist(this.userListEdit)
        this.edit = false
        console.log('=================== 完成 ===================')
      },
      // 添加
      add() {
        addObj(this.userListEdit).then(response => {
          console.log('这里是添加方法===========================')
          this.vehicle.vehicleEntity.vehicleId = response.data.data
          console.log(this.vehicle.vehicleEntity.vehicleId)
        })
        this.edit = false
      },
      // 修改
      update() {
        putObj(this.userListEdit).then(response => {
          console.log(response.data)
        })
        this.edit = false
      },
      filterNode(value, data) {
        if (!value) return true
        return data.label.indexOf(value) !== -1
      },
      handleFilter() {
        this.listQuery.page = 1
        this.getUserList()
      },
      handleClick(tab, event) {
        console.log(this.activeName)
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
  .userInfo{
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
