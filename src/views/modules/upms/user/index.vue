<template>
  <div class="app-container calendar-list-container" :style="{height: client.height + 'px'}">
    <div v-show="showModule=='list'"  style="height: 100%">
      <el-row :gutter="5">
        <el-col class="org-tree-left">
          <el-card>
            <el-row><span style="font-size: 16px;font-weight: 600;font-family: '微软雅黑 Light'">部门筛选</span>

            <!-- 分割线 -->
           <el-col> <hr style="border: none; border-bottom:1px solid #d3dce6; "/> </el-col></el-row>

            <org-tree @node-click="searchByOrg" ></org-tree>
          </el-card>
        </el-col>

        <el-col :style="{width: (client.width-250) + 'px'}">
          <el-card style="height: 80px">
            <div class="filter-container" style="float: left">
              |&nbsp;<span style="font-size: 20px;font-weight: 600;font-family: '微软雅黑 Light'">同事列表</span>
            </div>
            <div style="float: right">
              <el-input @keyup.enter.native="searchClick" style="width: 300px;" class="filter-item" placeholder="姓名/电话/身份证" v-model="listQuery.condition"></el-input>
              <el-button class="filter-item" type="primary" v-waves @click="searchClick">搜索</el-button>
              <el-button class="filter-item" style="margin-left: 10px;" @click="create" type="primary" ><i class="el-icon-plus"></i>添加</el-button>
            </div>
          </el-card>

          <el-card style="overflow: auto;margin-top: 5px;"  :style="{height: (client.height-125) + 'px'}">
            <!-- 身份卡循环 -->
            <el-table :data="userList" :height="(client.height-220)"  border style="min-width: 980px; " highlight-current-row @row-dblclick="doubleClickRow"  v-loading="listLoading" element-loading-text="给我一点时间">
              <!--<el-table-column type="index" label="序号"  align="center" width="50"></el-table-column>-->
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
                    生日：{{scope.row.birthday | parseTime('{y}-{m}-{d}')}}
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

            <div v-show="!listLoading" class="pagination-container" style="margin-top: 20px">
              <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                             :current-page.sync="listQuery.page"
                             background
                             :page-sizes="[10,20,30,50]" :page-size="listQuery.limit"
                             layout="total, sizes, prev, pager, next, jumper" :total="total">
              </el-pagination>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <div v-show="showModule=='info'" v-loading="infoLoading" >
      <el-card>
        <div slot="header" class="clearfix">
          <div style="float: left">
            |&nbsp;<span style="font-size: 20px;font-weight: 600;font-family: '微软雅黑 Light'">同事信息</span>
          </div>
          <div style="float: right">
            <el-button type="primary" style="width: 174px;float: right" @click="back">返回</el-button>
          </div>
        </div>

        <el-row :gutter="10">
          <el-col :span="4">
            <el-row><el-col><img width="100%" height="100%" :src="userEdit.avatar" class="image"></el-col></el-row>
            <el-row><el-col><el-button type="primary" style="width:100%;max-width: 200px;">更换照片</el-button></el-col></el-row>
          </el-col>

          <el-col :span="20" style="line-height: 50px;">
          <!-- 第一大排 -->
            <el-row>
            <!-- 第一列 -->
            <el-col :span="6">
              <!-- 工号 -->
              <el-row style="height: 50px;">
                <el-col :span="8"><div class="text_css">工号：</div></el-col>
                <el-col :span="14">
                  <el-input v-if="edit"  v-model="userEdit.jobNumber" placeholder="工号"></el-input>
                  <span style="padding-left: 16px;font-size: 12px;" v-else>{{userEdit.jobNumber}}</span>
                </el-col>
              </el-row>

              <!-- 性别 -->
              <el-row style="height: 50px;">
                <el-col :span="8"><div class="text_css">性别：</div></el-col>
                <el-col :span="14">
                  <el-input v-if="edit" disabled v-model="sexVO" placeholder="性别"></el-input>
                  <span style="padding-left: 16px;font-size: 12px;" v-else>{{userEdit.sex | sexFilter}}</span>
                </el-col>
              </el-row>

              <!-- 联系电话 -->
              <el-row style="height: 50px;">
                <el-col :span="8"><div class="text_css">联系电话：</div></el-col>
                <el-col :span="14">
                  <el-input v-if="edit"  v-model="userEdit.mobile" placeholder="联系电话"></el-input>
                  <span style="padding-left: 16px;font-size: 12px;" v-else>{{userEdit.mobile}}</span>
                </el-col>
              </el-row>


            </el-col>

            <!-- 第二列 -->
            <el-col :span="6">

              <!-- 员工姓名 -->
              <el-row style="height: 50px;">
                <el-col :span="8"><div class="text_css">员工姓名：</div></el-col>
                <el-col :span="14">
                  <el-input v-if="edit"  v-model="userEdit.name" placeholder="员工姓名"></el-input>
                  <span style="padding-left: 16px;font-size: 12px;" v-else>{{userEdit.name}}</span>
                </el-col>
              </el-row>

              <!-- 入职日期 -->
              <el-row style="height: 50px;">
                <el-col :span="8"><div class="text_css">入职日期：</div></el-col>
                <el-col :span="14">
                  <el-date-picker  v-if="edit" type="date" placeholder="入职日期"  style="width: 100%" v-model="userEdit.joinedTime"></el-date-picker>
                  <span style="padding-left: 16px;font-size: 12px;" v-else>{{userEdit.joinedTime | parseTime('{y}-{m}-{d}')}}</span>
                </el-col>
              </el-row>

              <!-- email -->
              <el-row style="height: 50px;">
                <el-col :span="8"><div class="text_css">E-mail：</div></el-col>
                <el-col :span="14">
                  <el-input v-if="edit"  v-model="userEdit.email" placeholder="E-mail"></el-input>
                  <span style="padding-left: 16px;font-size: 12px;" v-else>{{userEdit.email}}</span>
                </el-col>
              </el-row>

            </el-col>

            <!-- 第三列 -->
            <el-col :span="6">

              <!-- 身份证号 -->
              <el-row style="height: 50px;">
                <el-col :span="8"><div class="text_css">身份证号：</div></el-col>
                <el-col :span="14">
                  <el-input v-if="edit" @blur="generateInfo"  v-model="userEdit.idNumber" placeholder="身份证号"></el-input>
                  <span style="padding-left: 16px;font-size: 12px;" v-else>{{userEdit.idNumber}}</span>
                </el-col>
              </el-row>


              <!-- 所属部门 -->
              <el-row style="height: 50px;">
                <el-col :span="8"><div class="text_css">所属部门：</div></el-col>
                <el-col :span="14">
                  <org-select v-if="edit" style="width: 100%" v-model="userEdit.orgId" @org-click="orgClick"></org-select>
                  <span style="padding-left: 16px;font-size: 12px;" v-else>{{userEdit.orgName}}</span>
                </el-col>
              </el-row>

              <!-- 联系地址 -->
              <el-row style="height: 50px;">
                <el-col :span="8"><div class="text_css">联系地址：</div></el-col>
                <el-col :span="14">
                  <el-input v-if="edit"  v-model="userEdit.contactAddress" placeholder="联系地址"></el-input>
                  <span style="padding-left: 16px;font-size: 12px;" v-else>{{userEdit.contactAddress}}</span>
                </el-col>
              </el-row>

            </el-col>

            <!-- 第四列 -->
            <el-col :span="6">

              <!-- 生日 -->
              <el-row style="height: 50px;">
                <el-col :span="8"><div class="text_css">生日：</div></el-col>
                <el-col :span="14">
                  <el-date-picker  v-if="edit" type="date" placeholder="生日"  style="width: 100%" v-model="userEdit.birthday"></el-date-picker>
                  <span style="padding-left: 16px;font-size: 12px;" v-else>{{userEdit.birthday | subTime}}</span>
                </el-col>
              </el-row>


              <!-- 职位 -->
              <el-row style="height: 50px;">
                <el-col :span="8"><div class="text_css">职位：</div></el-col>
                <el-col :span="14">
                  <el-select v-if="edit" v-model="userEdit.roleId" filterable placeholder="职位" @change="roleChange">
                    <el-option
                      v-for="item in roleList"
                      :key="item.roleId"
                      :label="item.roleName"
                      :value="item.roleId"
                      >
                    </el-option>
                  </el-select>
                  <!--<el-input v-if="edit"  v-model="userEdit.roleName" placeholder="职位"></el-input>-->
                  <span style="padding-left: 16px;font-size: 12px;" v-else>{{userEdit.roleName}}</span>

                </el-col>
              </el-row>

              <!-- 家庭住址 -->
              <el-row style="height: 50px;">
                <el-col :span="8"><div class="text_css">家庭住址：</div></el-col>
                <el-col :span="14">
                  <el-input v-if="edit"  v-model="userEdit.homeAddress" placeholder="家庭住址"></el-input>
                  <span style="padding-left: 16px;font-size: 12px;" v-else>{{userEdit.homeAddress}}</span>
                </el-col>
              </el-row>

            </el-col>

          </el-row>

            <!-- 分割线 -->
            <el-row><el-col> <hr style="border: none; border-bottom:1px solid #d3dce6; "/> </el-col></el-row>

            <!-- 第二大排 -->
            <el-row>
              <!-- 第一列 -->
              <el-col :span="6">

                <!-- 学历 -->
                <el-row style="height: 50px;">
                  <el-col :span="8"><div class="text_css">学历：</div></el-col>
                  <el-col :span="14">
                    <el-input v-if="edit"  v-model="userEdit.education" placeholder="学历" ></el-input>
                    <span style="padding-left: 16px;font-size: 12px;" v-else>{{userEdit.education}}</span>
                  </el-col>
                </el-row>

              </el-col>

              <!-- 第二列 -->
              <el-col :span="6">

                <!-- 专业 -->
                <el-row style="height: 50px;">
                  <el-col :span="8"><div class="text_css">专业：</div></el-col>
                  <el-col :span="14">
                    <el-input v-if="edit"  v-model="userEdit.major" placeholder="专业" ></el-input>
                    <span style="padding-left: 16px;font-size: 12px;" v-else>{{userEdit.major}}</span>
                  </el-col>
                </el-row>

              </el-col>
              <!-- 第三列 -->
              <el-col :span="6">

                <!-- QQ -->
                <el-row style="height: 50px;">
                  <el-col :span="8"><div class="text_css">QQ：</div></el-col>
                  <el-col :span="14">
                    <el-input v-if="edit"  v-model="userEdit.qq" placeholder="QQ" ></el-input>
                    <span style="padding-left: 16px;font-size: 12px;" v-else>{{userEdit.qq}}</span>
                  </el-col>
                </el-row>


              </el-col>
              <!-- 第四列 -->
              <el-col :span="6">

                <!-- 微信 -->
                <el-row style="height: 50px;">
                  <el-col :span="8"><div class="text_css">微信：</div></el-col>
                  <el-col :span="14">
                    <el-input v-if="edit"  v-model="userEdit.wechat" placeholder="微信" ></el-input>
                    <span style="padding-left: 16px;font-size: 12px;" v-else>{{userEdit.wechat}}</span>
                  </el-col>
                </el-row>


              </el-col>
            </el-row>

            <!-- 分割线 -->
            <el-row><el-col> <hr style="border: none; border-bottom:1px solid #d3dce6; "/> </el-col></el-row>

            <!-- 第三大排 -->
            <el-row>
              <!-- 第一列 -->
              <el-col :span="6">

                <!-- 转正日期 -->
                <el-row style="height: 50px;">
                  <el-col :span="8"><div class="text_css">转正日期：</div></el-col>
                  <el-col :span="14">
                    <el-date-picker  v-if="edit" type="date" placeholder="转正日期"  style="width: 100%" v-model="userEdit.positiveTime"></el-date-picker>
                    <span style="padding-left: 16px;font-size: 12px;" v-else>{{userEdit.positiveTime | parseTime('{y}-{m}-{d}')}}</span>
                  </el-col>
                </el-row>

              </el-col>

              <!-- 第二列 -->
              <el-col :span="6">

                <!-- 公积金 -->
                <el-row style="height: 50px;">
                  <el-col :span="8"><div class="text_css">公积金：</div></el-col>
                  <el-col :span="14">
                    <el-date-picker  v-if="edit" type="date" placeholder="公积金"  style="width: 100%" v-model="userEdit.providentFundTime"></el-date-picker>
                    <span style="padding-left: 16px;font-size: 12px;" v-else>{{userEdit.providentFundTime | parseTime('{y}-{m}-{d}')}}</span>
                  </el-col>
                </el-row>

              </el-col>
              <!-- 第三列 -->
              <el-col :span="6">

                <!-- 五险 -->
                <el-row style="height: 50px;">
                  <el-col :span="8"><div class="text_css">五险：</div></el-col>
                  <el-col :span="14">
                    <el-date-picker  v-if="edit" type="date" placeholder="五险"  style="width: 100%" v-model="userEdit.fiveInsuranceTime"></el-date-picker>
                    <span style="padding-left: 16px;font-size: 12px;" v-else>{{userEdit.fiveInsuranceTime | parseTime('{y}-{m}-{d}')}}</span>
                  </el-col>
                </el-row>


              </el-col>
              <!-- 第四列 -->
              <el-col :span="6">

                <!-- 工作电话 -->
                <el-row style="height: 50px;">
                  <el-col :span="8"><div class="text_css">工作电话：</div></el-col>
                  <el-col :span="14">
                    <el-input v-if="edit"  v-model="userEdit.workMobile" placeholder="工作电话" ></el-input>
                    <span style="padding-left: 16px;font-size: 12px;" v-else>{{userEdit.workMobile}}</span>
                  </el-col>
                </el-row>


              </el-col>

            </el-row>

            <!-- 分割线 -->
            <el-row><el-col> <hr style="border: none; border-bottom:1px solid #d3dce6; "/> </el-col></el-row>

            <!-- 第三大排 -->
            <el-row>
              <!-- 第一列 -->
              <el-col :span="6">

                <!-- 紧急联系人 -->
                <el-row style="height: 50px;">
                  <el-col :span="8"><div class="text_css">紧急联系人：</div></el-col>
                  <el-col :span="14">
                    <el-input v-if="edit"  v-model="userEdit.emergencyContact" placeholder="紧急联系人" ></el-input>
                    <span style="padding-left: 16px;font-size: 12px;" v-else>{{userEdit.emergencyContact}}</span>
                  </el-col>
                </el-row>

              </el-col>

              <!-- 第二列 -->
              <el-col :span="6">

                <!-- 紧急联系人电话 -->
                <el-row style="height: 50px;">
                  <el-col :span="8"><div class="text_css">紧急联系人电话：</div></el-col>
                  <el-col :span="14">
                    <el-input v-if="edit"  v-model="userEdit.emergencyMobile" placeholder="紧急联系人电话" ></el-input>
                    <span style="padding-left: 16px;font-size: 12px;" v-else>{{userEdit.emergencyMobile}}</span>
                  </el-col>
                </el-row>

              </el-col>
              <!-- 第三列 -->
              <el-col :span="6">

                <el-row v-if="edit" :gutter="10">
                  <el-col :span="12"><el-button v-if="!addInfo" type="info" style="width: 100%;" @click="cancel">取消</el-button></el-col>
                  <el-col :span="12"><el-button v-if="addInfo" type="success" style="width: 100%;" @click="add">确认保存</el-button></el-col>
                  <el-col :span="12"><el-button v-if="!addInfo" type="success" style="width: 100%;" @click="update">确认修改</el-button></el-col>
                </el-row>


                <el-row v-else>
                  <el-col :span="12"><el-button type="primary" style="width: 100%;" @click="editInfo">编辑信息</el-button></el-col>
                </el-row>

              </el-col>
            </el-row>
            <!-- 分割线 -->
            <el-row><el-col> <hr style="border: none; "/> </el-col></el-row>
          </el-col>
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
  import { mapGetters } from 'vuex'
  import { roleList } from '@/api/upms/role'
  import { removeAllSpace } from '@/utils/validate'
  import Bar from '@/components/Bar'
  import Dict from '@/components/Dict'
  import LineChart from '@/components/LineChart'
  import OrgTree from '@/components/OrgTree'
  import { fetchTree } from '@/api/upms/org'
  import OrgSelect from '@/components/OrgSelect'
  import { fetchList, addObj, putObj, getObj } from '@/api/upms/user'

  export default {
    name: 'index',
    computed: {
      ...mapGetters([
        'permissions',
        'client'
      ]),
      sexVO() {
        const typeMap = {
          1: '男',
          0: '女'
        }
        return typeMap[this.userEdit.sex]
      }
    },
    components: {
      Bar,
      OrgTree,
      LineChart,
      Dict,
      OrgSelect
    },
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
        infoLoading: true,
        // 分页数据
        listQuery: {
          page: 1,
          limit: 20,
          orgId: null,
          condition: null
        },
        // 树形图
        treeData: [],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        userEdit: {},
        // 添加 标记
        addInfo: false,
        roleList: []
      }
    },
    created() {
      this.getOrgList()
    },
    methods: {
      // 新增
      create() {
        this.userEdit = {}
        this.addInfo = true
        this.edit = true
        this.showModule = 'info'
      },
      // 双击行  编辑
      doubleClickRow(val) {
        this.infoLoading = true
        console.log('====================== 正在进入单个员工编辑 =====================')
        getObj(val.userId).then(response => {
          console.log(response.data)
          this.userEdit = response.data.data
          console.log(this.userEdit.orgId)
          roleList(this.userEdit.orgId).then(response => {
            console.log('321123321123654')
            console.log(response.data)
            this.roleList = response.data.data.list
            console.log(this.roleList)
          })
          this.infoLoading = false
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
        this.listLoading = true
        fetchList(this.listQuery).then(response => {
          console.log(response.data)
          this.userList = response.data.data.list
          this.total = response.data.data.totalCount
          this.listLoading = false
        })
        console.log('=====================   完成   =======================')
      },
      // 根据部门id查询员工
      searchByOrg(data) {
        if (data) {
          console.log('=====================   根据部门id查询员工信息   =======================')
          this.listQuery.page = 1
          this.listQuery.orgId = data.id
          this.getUserList()
        }
      },
      // 编辑
      editInfo() {
        console.log('=====================     编辑    ===================')
        this.edit = true
        console.log(this.roleList)
        console.log('=====================     完成    ===================')
      },
      // 取消编辑
      cancel() {
        console.log('=================== 正在完成取消操作 ===================')
        this.doubleClickRow(this.userEdit)
        this.edit = false
        console.log('=================== 完成 ===================')
      },
      // 添加
      add() {
        console.log('这里是添加方法===========================')
        console.log(this.userEdit)
        addObj(this.userEdit).then(response => {
          this.userEdit.userId = response.data.data
        })
        this.edit = false
      },
      // 修改
      update() {
        console.log('这里是修改方法===========================')
        console.log(this.userEdit)
        putObj(this.userEdit).then(response => {
          console.log(response.data)
          this.doubleClickRow(this.userEdit)
        })
        this.edit = false
      },
      orgClick(org) {
        console.log(123)
        console.log(org)
        this.userEdit.orgName = org.name
        roleList(org.id).then(response => {
          console.log(response.data)
          this.roleList = response.data.data
        })
      },
      roleChange(val) {
        console.log(val)
        // this.userEdit.roleName = val.roleName
      },
      filterNode(value, data) {
        if (!value) return true
        return data.label.indexOf(value) !== -1
      },
      searchClick() {
        this.listQuery.page = 1
        this.listQuery.condition = removeAllSpace(this.listQuery.condition)
        this.getUserList()
      },
      handleClick(tab, event) {
        console.log(this.activeName)
      },
      // 根据身份证号生成信息
      generateInfo() {
        if (this.userEdit.idNumber.length === 18) {
          this.userEdit.birthday = this.userEdit.idNumber.substring(6, 10) + '-' + this.userEdit.idNumber.substring(10, 12) + '-' + this.userEdit.idNumber.substring(12, 14)
          this.userEdit.sex = this.userEdit.idNumber.substr(16, 1) % 2
        }
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
    max-width: 200px;
    max-height: 200px;
    display: block;
    float: left;
  }
  .text_css{
    color:#495060;
    font-size: 16px;
    word-break:keep-all;/* 不换行 */
    white-space:nowrap;/* 不换行 */
    overflow:hidden;/* 内容超出宽度时隐藏超出部分的内容 */
    text-overflow:ellipsis;/* 当对象内文本溢出时显示省略标记(...) ；需与overflow:hidden;一起使用。*/
  }
</style>
