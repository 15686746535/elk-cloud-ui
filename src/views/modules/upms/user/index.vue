<template>
  <div class="app-container calendar-list-container" :style="{height: $store.state.app.client.height + 'px'}">
    <div v-show="showModule=='list'"  style="height: 100%">
      <el-row :gutter="5">
        <el-col class="org-tree-left">
          <el-card>
            <el-row><span style="font-size: 16px;font-weight: 600;font-family: '微软雅黑 Light'">部门筛选</span>

              <!-- 分割线 -->
              <el-col> <hr style="border: none; border-bottom:1px solid #d3dce6; "/> </el-col></el-row>
            <my-tree url="/upms/org/tree" v-model="listQuery.orgId"  @node="searchByOrg"></my-tree>
          </el-card>
        </el-col>

        <el-col :style="{width: ($store.state.app.client.width-250) + 'px'}">
          <el-card style="height: 80px">
            <div class="filter-container" style="float: left">
              |&nbsp;<span style="font-size: 20px;font-weight: 600;font-family: '微软雅黑 Light'">同事列表</span>
            </div>
            <div style="float: right">
              <el-input @keyup.enter.native="searchClick" style="width: 300px;" class="filter-item" placeholder="姓名/电话/身份证" v-model="listQuery.condition"></el-input>
              <el-button class="filter-item" type="primary"  @click="searchClick">搜索</el-button>

            </div>
          </el-card>

          <el-card style="margin-top: 5px;"  :style="{height: ($store.state.app.client.height-125) + 'px'}">
            <!-- 身份卡循环 -->
            <el-table :data="userList" :height="($store.state.app.client.height-220)"  border highlight-current-row @row-dblclick="doubleClickRow"  v-loading="listLoading" element-loading-text="给我一点时间">
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
                    生日：{{scope.row.birthday | subTime}}
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
                             style="float: left"
                             :page-sizes="[10,20,30,50]" :page-size="listQuery.limit"
                             layout="total, sizes, prev, pager, next, jumper" :total="total">
              </el-pagination>
              <el-button class="filter-item" style="margin-left: 10px; float: right" @click="create" type="primary" ><i class="el-icon-plus"></i>添加</el-button>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <div v-show="showModule=='info'" v-loading="infoLoading"  style="height: 100%">
      <el-card style="overflow: auto">
        <div slot="header" class="clearfix">
          <div style="float: left">
            |&nbsp;<span style="font-size: 20px;font-weight: 600;font-family: '微软雅黑 Light'">同事信息</span>
          </div>
          <div style="float: right">
            <el-button type="primary" style="float: right" @click="back">返回</el-button>
          </div>
        </div>

        <!--:model="dict" :rules="rules" ref="dict"-->
        <el-form label-position="left" label-width="80px">

          <el-row :gutter="5">
            <el-col :span="14">
              <el-row>
                <el-card shadow="hover" style="height: 200px" >
                  <el-row>
                    <el-col :span="6">

                      <el-form-item>
                        <el-upload v-if="edit" style="width: 140px; margin: 5px auto 0" class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                          <img v-if="userEdit.avatar" :src="userEdit.avatar" class="avatar">
                          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                        <img v-else :src="userEdit.avatar" class="avatar_img">
                      </el-form-item>

                    </el-col>
                    <el-col :span="18">

                      <el-row :gutter="10" style="height: 40px;margin: 10px 0">
                        <el-col :span="12">
                          <el-form-item prop="jobNumber">
                            <span slot="label" class="text_css">工号：</span>
                            <el-input v-if="edit"  v-model="userEdit.jobNumber" placeholder="工号"></el-input>
                            <span style="padding-left: 16px;font-size: 12px;" v-else>{{userEdit.jobNumber}}</span>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item prop="idNumber">
                            <span slot="label" class="text_css">身份证号：</span>
                            <el-input v-if="edit" @blur="generateInfo" :maxlength="18"  @keyup.enter.native="generateInfo" v-model="userEdit.idNumber" placeholder="身份证号"></el-input>
                            <span style="padding-left: 16px;font-size: 12px;" v-else>{{userEdit.idNumber}}</span>
                          </el-form-item>
                        </el-col>
                      </el-row>

                      <el-row :gutter="10" style="height: 40px;margin: 10px 0">
                        <el-col :span="12">
                          <el-form-item prop="name">
                            <span slot="label" class="text_css">姓名：</span>
                            <el-input v-if="edit"  v-model="userEdit.name" placeholder="员工姓名"></el-input>
                            <span style="padding-left: 16px;font-size: 12px;" v-else>{{userEdit.name}}</span>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item prop="sex">
                            <span slot="label" class="text_css">性别：</span>
                            <el-radio-group v-if="edit" v-model="userEdit.sex">
                              <el-radio :label="1">男</el-radio>
                              <el-radio :label="0">女</el-radio>
                            </el-radio-group>
                            <span style="padding-left: 16px;font-size: 12px;" v-else>{{userEdit.sex | sexFilter}}</span>
                          </el-form-item>
                        </el-col>
                      </el-row>

                      <el-row :gutter="10" style="height: 40px;margin: 10px 0">
                        <el-col :span="12">
                          <el-form-item prop="birthday">
                            <span slot="label" class="text_css">生日：</span>
                            <el-date-picker value-format="timestamp"  v-if="edit" type="date" placeholder="生日"  style="width: 100%" v-model="userEdit.birthday"></el-date-picker>
                            <span style="padding-left: 16px;font-size: 12px;" v-else>{{userEdit.birthday | subTime}}</span>
                          </el-form-item>
                        </el-col>
                      </el-row>

                    </el-col>
                  </el-row>
                </el-card>
              </el-row>
              <el-row>
                <el-card shadow="hover" style="margin-top: 5px;height: 500px" >
                  <el-row :gutter="10" style="height: 40px;margin: 10px 0">
                    <el-col :span="8">

                      <el-form-item prop="mobile">
                        <span slot="label" class="text_css">联系电话：</span>
                        <el-input v-if="edit"  v-model="userEdit.mobile" placeholder="联系电话"></el-input>
                        <span style="padding-left: 16px;font-size: 12px;" v-else>{{userEdit.mobile}}</span>
                      </el-form-item>

                    </el-col>

                    <el-col :span="8">

                      <el-form-item prop="wechat">
                        <span slot="label" class="text_css">微信：</span>
                        <el-input v-if="edit"  v-model="userEdit.wechat" placeholder="微信" ></el-input>
                        <span style="padding-left: 16px;font-size: 12px;" v-else>{{userEdit.wechat}}</span>
                      </el-form-item>

                    </el-col>

                    <el-col :span="8">

                      <el-form-item prop="contactAddress">
                        <span slot="label" class="text_css">联系地址：</span>
                        <el-input v-if="edit"  v-model="userEdit.contactAddress" placeholder="联系地址"></el-input>
                        <span style="padding-left: 16px;font-size: 12px;" v-else>{{userEdit.contactAddress}}</span>
                      </el-form-item>

                    </el-col>
                  </el-row>

                  <el-row :gutter="10" style="height: 40px;margin: 10px 0">
                    <el-col :span="8">

                      <el-form-item prop="orgId">
                        <span slot="label" class="text_css">所属部门：</span>
                        <tree-select v-show="edit" url="/upms/org/tree" v-model="userEdit.orgId" @org-click="orgClick" placeholder="家庭住址"></tree-select>
                        <span style="padding-left: 16px;font-size: 12px;" v-show="!edit" >{{userEdit.orgName}}</span>
                      </el-form-item>

                    </el-col>

                    <el-col :span="8">

                      <el-form-item prop="roleId">
                        <span slot="label" class="text_css">职位：</span>
                        <el-select v-if="edit" v-model="userEdit.roleId" style="width: 100%" filterable placeholder="职位" @change="roleChange">
                          <el-option
                            v-for="item in roleList"
                            :key="item.roleId"
                            :label="item.roleName"
                            :value="item.roleId"
                          >
                          </el-option>
                        </el-select>
                        <span style="padding-left: 16px;font-size: 12px;" v-else>{{userEdit.roleName}}</span>
                      </el-form-item>

                    </el-col>

                    <el-col :span="8">

                      <el-form-item prop="homeAddress">
                        <span slot="label" class="text_css">家庭住址：</span>
                        <el-input v-if="edit"  v-model="userEdit.homeAddress" placeholder="家庭住址"></el-input>
                        <span style="padding-left: 16px;font-size: 12px;" v-else>{{userEdit.homeAddress}}</span>
                      </el-form-item>

                    </el-col>
                  </el-row>

                  <el-row :gutter="10" style="height: 40px;margin: 10px 0">
                    <el-col :span="8">

                      <el-form-item prop="education">
                        <span slot="label" class="text_css">学历：</span>
                        <el-input v-if="edit"  v-model="userEdit.education" placeholder="学历" ></el-input>
                        <span style="padding-left: 16px;font-size: 12px;" v-else>{{userEdit.education}}</span>
                      </el-form-item>

                    </el-col>

                    <el-col :span="8">

                      <el-form-item prop="major">
                        <span slot="label" class="text_css">专业：</span>
                        <el-input v-if="edit"  v-model="userEdit.major" placeholder="专业" ></el-input>
                        <span style="padding-left: 16px;font-size: 12px;" v-else>{{userEdit.major}}</span>
                      </el-form-item>

                    </el-col>

                    <el-col :span="8">

                      <el-form-item prop="qq">
                        <span slot="label" class="text_css">QQ：</span>
                        <el-input v-if="edit"  v-model="userEdit.qq" placeholder="QQ" ></el-input>
                        <span style="padding-left: 16px;font-size: 12px;" v-else>{{userEdit.qq}}</span>
                      </el-form-item>

                    </el-col>
                  </el-row>

                  <el-row :gutter="10" style="height: 40px;margin: 10px 0">
                    <el-col :span="8">


                      <el-form-item prop="joinedTime">
                        <span slot="label" class="text_css">入职日期：</span>
                        <el-date-picker value-format="timestamp"  v-if="edit" type="date" placeholder="入职日期"  style="width: 100%" v-model="userEdit.joinedTime"></el-date-picker>
                        <span style="padding-left: 16px;font-size: 12px;" v-else>{{userEdit.joinedTime | subTime}}</span>
                      </el-form-item>

                    </el-col>

                    <el-col :span="8">

                      <el-form-item prop="positiveTime">
                        <span slot="label" class="text_css">转正日期：</span>
                        <el-date-picker value-format="timestamp"  v-if="edit" type="date" placeholder="转正日期"  style="width: 100%" v-model="userEdit.positiveTime"></el-date-picker>
                        <span style="padding-left: 16px;font-size: 12px;" v-else>{{userEdit.positiveTime | subTime}}</span>
                      </el-form-item>

                    </el-col>

                    <el-col :span="8">

                      <el-form-item prop="email">
                        <span slot="label" class="text_css">E-mail：</span>
                        <el-input v-if="edit"  v-model="userEdit.email" placeholder="E-mail"></el-input>
                        <span style="padding-left: 16px;font-size: 12px;" v-else>{{userEdit.email}}</span>
                      </el-form-item>

                    </el-col>
                  </el-row>


                  <el-row :gutter="20" style="height: 40px;margin: 10px 0">
                    <el-col :span="12">

                      <el-form-item label-width="130px" prop="emergencyContact">
                        <span slot="label" class="text_css">紧急联系人姓名：</span>
                        <el-input v-if="edit"  v-model="userEdit.emergencyContact" placeholder="紧急联系人" ></el-input>
                        <span style="padding-left: 16px;font-size: 12px;" v-else>{{userEdit.emergencyContact}}</span>
                      </el-form-item>

                    </el-col>

                    <el-col :span="12">

                      <el-form-item label-width="130px" prop="emergencyMobile">
                        <span slot="label" class="text_css">紧急联系人电话：</span>
                        <el-input v-if="edit"  v-model="userEdit.emergencyMobile" placeholder="紧急联系人电话" ></el-input>
                        <span style="padding-left: 16px;font-size: 12px;" v-else>{{userEdit.emergencyMobile}}</span>
                      </el-form-item>

                    </el-col>
                  </el-row>

                  <el-row :gutter="20" style="height: 40px;margin: 10px 0">
                    <el-col :span="12">

                      <el-form-item label-width="130px" prop="fiveInsuranceTime">
                        <span slot="label" class="text_css">五险购买时间：</span>
                        <el-date-picker value-format="timestamp"  v-if="edit" type="date" placeholder="五险购买时间"  style="width: 100%" v-model="userEdit.fiveInsuranceTime"></el-date-picker>
                        <span style="padding-left: 16px;font-size: 12px;" v-else>{{userEdit.fiveInsuranceTime | subTime}}</span>
                      </el-form-item>

                    </el-col>

                    <el-col :span="12">

                      <el-form-item label-width="130px" prop="providentFundTime">
                        <span slot="label" class="text_css">公积金购买时间：</span>
                        <el-date-picker value-format="timestamp"  v-if="edit" type="date" placeholder="公积金购买时间"  style="width: 100%" v-model="userEdit.providentFundTime"></el-date-picker>
                        <span style="padding-left: 16px;font-size: 12px;" v-else>{{userEdit.providentFundTime | subTime}}</span>
                      </el-form-item>

                    </el-col>
                  </el-row>

                  <el-row :gutter="20" style="height: 40px;margin: 10px 0">
                    <el-col :span="12">

                      <el-form-item label-width="130px" prop="workMobile">
                        <span slot="label" class="text_css">工作电话：</span>
                        <el-input v-if="edit"  v-model="userEdit.workMobile" placeholder="工作电话" ></el-input>
                        <span style="padding-left: 16px;font-size: 12px;" v-else>{{userEdit.workMobile}}</span>
                      </el-form-item>

                    </el-col>

                    <el-col :span="12">&nbsp;</el-col>
                  </el-row>


                  <el-row v-if="edit" style="height: 40px;margin-top: 70px">
                    <div style="float: right;" >
                      <el-button v-if="addInfo"  type="success"  @click="add"><i class="el-icon-fa-save"></i> 保存</el-button>
                      <el-button v-if="!addInfo" type="info" @click="cancel"><i class="el-icon-close"></i> 取消</el-button>
                      <el-button v-if="!addInfo" type="success" @click="update"><i class="el-icon-fa-save"></i> 保存</el-button>
                    </div>
                  </el-row>


                  <el-row v-else style="height: 40px;margin-top: 70px">
                    <div style="float: right;" >
                      <el-button type="primary" @click="editInfo"><i class="el-icon-edit"></i> 编辑</el-button>
                    </div>
                  </el-row>


                </el-card>
              </el-row>
            </el-col>

            <el-col :span="10">
              <el-row>
                <el-card shadow="hover" body-style="padding:0" style="height: 350px">
                  <div style="height: 40px;width: 100%;background-color: rgb(245, 247, 250);border-bottom:1px solid rgb(235, 239, 245)">
                    <div style="background-color: #ffffff;width: 100px;height: 40px;line-height: 40px;color: #409eff;font-size: 14px;text-align: center;border-right:1px solid rgb(235, 239, 245)">
                      招生信息
                    </div>
                  </div>



                </el-card>
              </el-row>
              <el-row>
                <el-card shadow="hover" body-style="padding:0" style="height: 350px;margin-top: 5px">
                  <div style="height: 40px;width: 100%;background-color: rgb(245, 247, 250);border-bottom:1px solid rgb(235, 239, 245)">
                    <div style="background-color: #ffffff;width: 100px;height: 40px;line-height: 40px;color: #409eff;font-size: 14px;text-align: center;border-right:1px solid rgb(235, 239, 245)">
                      操作日志
                    </div>
                  </div>



                </el-card>
              </el-row>
            </el-col>

          </el-row>

        </el-form>

      </el-card>

    </div>


  </div>


</template>
<script>
  import { mapGetters } from 'vuex'
  import { roleList } from '@/api/upms/role'
  import { removeAllSpace } from '@/utils/validate'
  import { autoProduce } from '@/utils/index'
  import Bar from '@/components/Bar'
  import LineChart from '@/components/LineChart'
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
      LineChart
    },
    data() {
      return {
        // 编辑标记
        edit: false,
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
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        userEdit: {
          jobNumber: null,
          idNumber: null,
          name: null,
          sex: null,
          birthday: null,
          mobile: null,
          wechat: null,
          contactAddress: null,
          orgId: null,
          orgName: null,
          roleId: null,
          roleName: null,
          homeAddress: null,
          education: null,
          major: null,
          qq: null,
          joinedTime: null,
          positiveTime: null,
          email: null,
          emergencyContact: null,
          emergencyMobile: null,
          fiveInsuranceTime: null,
          providentFundTime: null,
          workMobile: null
        },
        // 添加 标记
        addInfo: false,
        roleList: []
      }
    },
    created() {
      this.getUserList()
    },
    methods: {
      // 新增
      create() {
        this.userEdit = {
          jobNumber: null,
          idNumber: null,
          name: null,
          sex: null,
          birthday: null,
          mobile: null,
          wechat: null,
          contactAddress: null,
          orgId: null,
          orgName: null,
          roleId: null,
          roleName: null,
          homeAddress: null,
          education: null,
          major: null,
          qq: null,
          joinedTime: null,
          positiveTime: null,
          email: null,
          emergencyContact: null,
          emergencyMobile: null,
          fiveInsuranceTime: null,
          providentFundTime: null,
          workMobile: null

        }
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
            console.log(response.data)
            this.roleList = response.data.data
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
      // 查询员工集合
      getUserList() {
        console.log('=====================   查询员工集合   =======================')
        this.listLoading = false
        fetchList(this.listQuery).then(response => {
          console.log(response.data)
          this.userList = response.data.data.list
          this.total = response.data.data.totalCount
          this.listLoading = false
        })
        console.log('=====================   完成   =======================')
      },
      // 根据部门id查询员工
      searchByOrg() {
        this.getUserList()
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
        this.userEdit.orgName = org.name
        roleList(org.id).then(response => {
          console.log(response.data)
          this.userEdit.roleId = response.data.data[0].roleId
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
      // 根据身份证号生成信息
      generateInfo() {
        var value = autoProduce(this.userEdit.idNumber)
        if (value) {
          if (!this.userEdit.jobNumber) {
            this.userEdit.jobNumber = value[0]
          }
          if (!this.userEdit.birthday) {
            this.userEdit.birthday = value[1]
          }
          this.userEdit.sex = value[2]
        }
      },
      handleAvatarSuccess(res, file) {
        this.student.avatar = URL.createObjectURL(file.raw)
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg'
        const isLt2M = file.size / 1024 / 1024 < 2

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
        }
        return isJPG && isLt2M
      }
    }
  }
</script>


<style rel="stylesheet/scss" lang="scss" scoped>
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
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 150px;
    line-height: 150px;
    text-align: center;
  }
  .avatar {
    width: 120px;
    height: 150px;
    display: block;
  }
  .avatar_img {
    line-height: 150px;
    position: relative;
    margin: auto;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    width: 120px;
    height: 150px;
    display: block;
  }
</style>
