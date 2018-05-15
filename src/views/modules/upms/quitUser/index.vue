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

        <el-col :style="{width: ($store.state.app.client.width-225) + 'px'}">
          <el-card style="height: 80px">
            <div class="filter-container" style="float: left;line-height: 40px">
              |&nbsp;<span style="font-size: 20px;font-weight: 600;font-family: '微软雅黑 Light'">同事列表</span>
            </div>
            <div style="float: right">
              <el-input @keyup.enter.native="searchClick" style="width: 300px;" class="filter-item" placeholder="姓名/电话/身份证" v-model="listQuery.condition"></el-input>
              <el-button class="filter-item" type="primary"  @click="searchClick"><i class="el-icon-search"></i> 搜 索</el-button>

            </div>
          </el-card>

          <el-card style="margin-top: 5px;"  :style="{height: ($store.state.app.client.height-125) + 'px'}">
            <!-- 身份卡循环 -->
            <el-table :data="userList" :height="($store.state.app.client.height-220)" highlight-current-row @row-dblclick="doubleClickRow"  v-loading="listLoading" element-loading-text="给我一点时间">
              <!--<el-table-column type="index" label="序号"  align="center" width="50"></el-table-column>-->
              <el-table-column align="center" label="头像" width="200">
                <template slot-scope="scope">
                  <!-- 头像 -->
                  <el-row>
                    <el-tag class="img">
                      <img :src="scope.row.avatar" class="img">
                    </el-tag>
                  </el-row>
                  <el-row>
                    <el-col style="color: #7c7c7c;text-align: center;font-size: 12px;">{{scope.row.name}}</el-col>
                  </el-row>
                  <el-row>
                    <el-col style="color: #7c7c7c;text-align: center;font-size: 12px;">{{scope.row.mobile}}</el-col>
                  </el-row>
                </template>
              </el-table-column>
              <el-table-column align="center" label="个人信息" width="300">
                <template slot-scope="scope" >
                  <!-- 个人信息 -->
                  <el-col style="line-height: 25px">
                    <el-row :gutter="10">
                      <el-col :span="7" class="table_text">工号:</el-col>
                      <el-col :span="17" class="table_text">{{scope.row.jobNumber}}</el-col>
                    </el-row>
                    <el-row :gutter="10">
                      <el-col :span="7" class="table_text">职位:</el-col>
                      <el-col :span="17" class="table_text">
                        {{scope.row.roles}}
                      </el-col>
                    </el-row>
                    <el-row :gutter="10">
                      <el-col :span="7" class="table_text">生日:</el-col>
                      <el-col :span="17" class="table_text">{{scope.row.birthday | subTime}}</el-col>
                    </el-row>

                    <el-row :gutter="10">
                      <el-col :span="7" class="table_text">工作电话:</el-col>
                      <el-col :span="17" class="table_text">
                        {{scope.row.workMobile}}
                      </el-col>
                    </el-row>
                  </el-col>
                </template>
              </el-table-column>
              <el-table-column label="招生记录">
                <template slot-scope="scope">
                  <bar :data="scope.row.recruits"></bar>
                </template>
              </el-table-column>

              <el-table-column label="来访信息">
                <template slot-scope="scope">
                  <LineChart :chart-data="scope.row.visits"></LineChart>
                </template>
              </el-table-column>
            </el-table>

            <div v-show="!listLoading" class="pagination-container" style="margin-top: 20px">
              <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                             :current-page.sync="listQuery.page"
                             background
                             style="float: left"
                             size="mini"
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
            |&nbsp;<span style="font-size: 16px;font-weight: 600;line-height:29px;font-family: '微软雅黑 Light'">同事信息</span>
          </div>
          <div style="float: right">
            <el-button type="primary" size="mini" @click="back"><i class="el-icon-back"></i> 返 回</el-button>
          </div>
        </div>

        <el-form :model="userEntity" ref="userEntity" label-width="80px" size="mini">

          <el-row :gutter="5">
            <el-col :span="14">
              <el-row>
                <el-card body-style="padding:15px 15px 0 15px;"  v-loading="infoLoading" element-loading-text="给我一点时间" shadow="hover">
                  <el-row>
                    <el-col :span="6">
                      <el-upload :disabled="false"  class="avatar-uploader" action="/oss/upload" name="file" :show-file-list="false" :headers="headers"
                                  :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                        <img :src="userEntity.avatar" class="avatar">
                      </el-upload>
                    </el-col>
                    <el-col :span="18">

                      <el-row :gutter="10" style="height: 50px">
                        <el-col :span="12">
                          <el-form-item prop="jobNumber">
                            <span slot="label" class="text_css">工号:</span>
                            <span style="padding-left: 16px;font-size: 12px;" >{{userEntity.jobNumber}}</span>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item prop="idNumber">
                            <span slot="label" class="text_css">身份证:</span>
                            <span style="padding-left: 16px;font-size: 12px;" >{{userEntity.idNumber}}</span>
                          </el-form-item>
                        </el-col>
                      </el-row>

                      <el-row :gutter="10" style="height: 50px">
                        <el-col :span="12">
                          <el-form-item prop="name">
                            <span slot="label" class="text_css">姓名:</span>
                            <span style="padding-left: 16px;font-size: 12px;" >{{userEntity.name}}</span>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item prop="sex">
                            <span slot="label" class="text_css">性别:</span>
                            <span style="padding-left: 16px;font-size: 12px;" >{{userEntity.sex | sexFilter}}</span>
                          </el-form-item>
                        </el-col>
                      </el-row>

                      <el-row :gutter="10"style="height: 50px">
                        <el-col :span="12">
                          <el-form-item prop="birthday">
                            <span slot="label" class="text_css">生日:</span>
                            <span style="padding-left: 16px;font-size: 12px;" >{{userEntity.birthday | subTime}}</span>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">

                          <el-form-item prop="mobile">
                            <span slot="label" class="text_css">联系电话:</span>
                            <span style="padding-left: 16px;font-size: 12px;" >{{userEntity.mobile}}</span>
                          </el-form-item>


                        </el-col>
                      </el-row>

                    </el-col>
                  </el-row>
                </el-card>
              </el-row>
              <el-row>
                <el-card shadow="hover" style="margin-top: 5px;">
                  <el-card body-style="padding:10px;" :style="{height: ($store.state.app.client.height-423) + 'px'}" shadow="never" style="border: none;min-height: 350px;" >
                    <el-row :gutter="10" style="height: 50px">
                      <el-col :span="8">

                        <el-form-item prop="workMobile">
                          <span slot="label" class="text_css">工作电话:</span>
                          <span style="padding-left: 16px;font-size: 12px;" >{{userEntity.workMobile}}</span>
                        </el-form-item>

                      </el-col>

                      <el-col :span="8">

                        <el-form-item prop="wechat">
                          <span slot="label" class="text_css">微信:</span>
                          <span style="padding-left: 16px;font-size: 12px;" >{{userEntity.wechat}}</span>
                        </el-form-item>

                      </el-col>

                      <el-col :span="8">

                        <el-form-item prop="contactAddress">
                          <span slot="label" class="text_css">联系地址:</span>
                          <span style="padding-left: 16px;font-size: 12px;" >{{userEntity.contactAddress}}</span>
                        </el-form-item>

                      </el-col>
                    </el-row>

                    <el-row :gutter="10" style="height: 50px">
                      <el-col :span="8">

                        <el-form-item prop="orgId">
                          <span slot="label" class="text_css">所属部门:</span>
                          <span style="padding-left: 16px;font-size: 12px;" >{{userEntity.orgName}}</span>
                        </el-form-item>

                      </el-col>

                      <el-col :span="8">

                        <el-form-item prop="roleIdList">
                          <span slot="label" class="text_css">职位:</span>
                          <span style="padding-left: 16px;font-size: 12px;">
                          <span v-for="(roleName,index) in userEntity.roleNameList" >{{roleName}}<span v-if="userEntity.roleNameList.length !== (index+1)">、</span></span>
                        </span>
                        </el-form-item>

                      </el-col>

                      <el-col :span="8">

                        <el-form-item prop="homeAddress">
                          <span slot="label" class="text_css">家庭住址:</span>
                          <span style="padding-left: 16px;font-size: 12px;" >{{userEntity.homeAddress}}</span>
                        </el-form-item>

                      </el-col>
                    </el-row>

                    <el-row :gutter="10" style="height: 50px">
                      <el-col :span="8">

                        <el-form-item prop="education">
                          <span slot="label" class="text_css">学历:</span>
                          <span style="padding-left: 16px;font-size: 12px;" >{{userEntity.education}}</span>
                        </el-form-item>

                      </el-col>

                      <el-col :span="8">

                        <el-form-item prop="major">
                          <span slot="label" class="text_css">专业:</span>
                          <span style="padding-left: 16px;font-size: 12px;" >{{userEntity.major}}</span>
                        </el-form-item>

                      </el-col>

                      <el-col :span="8">

                        <el-form-item prop="qq">
                          <span slot="label" class="text_css">QQ:</span>
                          <span style="padding-left: 16px;font-size: 12px;" >{{userEntity.qq}}</span>
                        </el-form-item>

                      </el-col>
                    </el-row>

                    <el-row :gutter="10" style="height: 50px">
                      <el-col :span="8">


                        <el-form-item prop="joinedTime">
                          <span slot="label" class="text_css">入职日期:</span>
                          <span style="padding-left: 16px;font-size: 12px;" >{{userEntity.joinedTime | subTime}}</span>
                        </el-form-item>

                      </el-col>

                      <el-col :span="8">

                        <el-form-item prop="positiveTime">
                          <span slot="label" class="text_css">转正日期:</span>
                          <span style="padding-left: 16px;font-size: 12px;" >{{userEntity.positiveTime | subTime}}</span>
                        </el-form-item>

                      </el-col>

                      <el-col :span="8">

                        <el-form-item prop="email">
                          <span slot="label" class="text_css">E-mail:</span>
                          <span style="padding-left: 16px;font-size: 12px;" >{{userEntity.email}}</span>
                        </el-form-item>

                      </el-col>
                    </el-row>


                    <el-row :gutter="20" style="height: 50px">
                      <el-col :span="12">

                        <el-form-item label-width="120px" prop="emergencyContact">
                          <span slot="label" class="text_css">紧急联系人姓名:</span>
                          <span style="padding-left: 16px;font-size: 12px;" >{{userEntity.emergencyContact}}</span>
                        </el-form-item>

                      </el-col>

                      <el-col :span="12">

                        <el-form-item label-width="120px" prop="emergencyMobile">
                          <span slot="label" class="text_css">紧急联系人电话:</span>
                          <span style="padding-left: 16px;font-size: 12px;" >{{userEntity.emergencyMobile}}</span>
                        </el-form-item>

                      </el-col>
                    </el-row>

                    <el-row :gutter="20" style="height: 50px">
                      <el-col :span="12">

                        <el-form-item label-width="120px" prop="fiveInsuranceTime">
                          <span slot="label" class="text_css">五险购买时间:</span>
                          <span style="padding-left: 16px;font-size: 12px;" >{{userEntity.fiveInsuranceTime | subTime}}</span>
                        </el-form-item>

                      </el-col>

                      <el-col :span="12">

                        <el-form-item label-width="120px" prop="providentFundTime">
                          <span slot="label" class="text_css">公积金购买时间:</span>
                          <span style="padding-left: 16px;font-size: 12px;" >{{userEntity.providentFundTime | subTime}}</span>
                        </el-form-item>

                      </el-col>
                    </el-row>

                    <el-row :gutter="20" style="height: 50px">
                      <el-col :span="24">

                        <el-form-item label-width="120px" prop="fiveInsuranceTime">
                          <span slot="label" class="text_css">是否教练:</span>
                          <span style="padding-left: 16px;font-size: 12px;" >{{userEntity.iscoach | isCoachFilter}}</span>
                        </el-form-item>

                      </el-col>

                    </el-row>

                  </el-card>
                  <el-card shadow="never" body-style="padding:0;" style="border: none;">
                    <el-row>
                      <div style="float: right;" >
                        <el-button type="primary" size="mini" @click="quit(userEntity.userId)"><i class="el-icon-circle-check-outline"></i> 复 职</el-button>
                      </div>
                    </el-row>
                  </el-card>
                </el-card>
              </el-row>
            </el-col>

            <el-col :span="10">
              <el-row>
                <el-card shadow="hover" body-style="padding:0" :style="{height: ($store.state.app.client.height-150) + 'px'}" style="min-height: 633px;">
                <!--<el-card shadow="hover" body-style="padding:0"  :style="{height: ($store.state.app.client.height-510) + 'px'}" style="min-height: 300px;">-->
                  <div style="height: 40px;width: 100%;background-color: rgb(245, 247, 250);border-bottom:1px solid rgb(235, 239, 245)">
                    <div style="background-color: #ffffff;width: 100px;height: 40px;line-height: 40px;color: #409eff;font-size: 14px;text-align: center;border-right:1px solid rgb(235, 239, 245)">
                      招生信息
                    </div>
                  </div>

                  <el-table :data="studentList" v-loading="studentListLoading" :height="$store.state.app.client.height-205"  element-loading-text="给我一点时间" border fit highlight-current-row style="width: 100%">
                    <el-table-column type="index" align="center" label="编号" width="50">
                    </el-table-column>
                    <el-table-column align="center"  label="姓名">
                      <template slot-scope="scope">
                        <span>{{ scope.row.label}}</span>
                      </template>
                    </el-table-column>
                  </el-table>




                </el-card>
              </el-row>

              <!--  操作日志  -->

              <!--<el-row>-->
                <!--<el-card shadow="hover" body-style="padding:0"  :style="{height: ($store.state.app.client.height-510) + 'px'}" style="min-height: 300px;margin-top: 5px">-->
                  <!--<div style="height: 40px;width: 100%;background-color: rgb(245, 247, 250);border-bottom:1px solid rgb(235, 239, 245)">-->
                    <!--<div style="background-color: #ffffff;width: 100px;height: 40px;line-height: 40px;color: #409eff;font-size: 14px;text-align: center;border-right:1px solid rgb(235, 239, 245)">-->
                      <!--操作日志-->
                    <!--</div>-->
                  <!--</div>-->



                <!--</el-card>-->
              <!--</el-row>-->
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
  import { queryEnrollStudents } from '@/api/student/student'
  import { removeAllSpace } from '@/utils/validate'
  import Bar from '@/components/Bar'
  import LineChart from '@/components/LineChart'
  import { fetchList, getObj, delObj } from '@/api/upms/user'
  import { getToken } from '@/utils/auth'

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
        return typeMap[this.userEntity.sex]
      },
      headers() {
        return {
          'Authorization': 'Bearer ' + getToken()
        }
      }
    },
    components: {
      Bar,
      LineChart
    },
    data() {
      return {
        // 模块标记
        showModule: 'list',
        // 员工集合
        userList: [],
        // 总条数
        total: 1,
        listLoading: true,
        infoLoading: false,
        studentListLoading: false,
        // 分页数据
        listQuery: {
          page: 1,
          limit: 20,
          orgId: null,
          quit: '1',
          condition: null
        },
        studentListQuery: {
          page: 1,
          limit: 20,
          userId: null,
          condition: null
        },
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        userEntity: {
          avatar: 'http://p84u3sabi.bkt.clouddn.com/elk/20180504/870ffb6238ad4b569c7b7a2f7daf1013.jpg',
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
          roleIdList: [],
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
          iscoach: null,
          workMobile: null
        },
        // 添加 标记
        addInfo: false,
        roleList: [],
        studentList: [],
      }
    },
    created() {
      this.getUserList()
    },
    methods: {
      // 双击行  编辑
      doubleClickRow(val) {
        this.infoLoading = true
        getObj(val.userId).then(response => {
          console.log('====================== 单个员工信息 =====================')
          console.log(response.data)
          this.userEntity = response.data.data
          console.log(this.userEntity.orgId)
          this.getRoleList()
          this.studentListQuery.userId = this.userEntity.userId
          this.getEnrollStudentList()
          this.infoLoading = false
        })
        this.showModule = 'info'
      },
      getRoleList() {
        roleList().then(response => {
          console.log('====================== 职位 =====================')
          this.roleList = response.data.data
          console.log(this.roleList)
        })
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
        const set = this.$refs
        set['userEntity'].resetFields()
        this.addInfo = false
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
      // 查询招生信息集合
      getEnrollStudentList() {
        console.log('=====================   查询员工集合   =======================')
        this.studentListLoading = true
        queryEnrollStudents(this.studentListQuery).then(response => {
          console.log(response.data)
          this.studentList = response.data.data.list
          // this.total = response.data.data.totalCount
          this.studentListLoading = false
        })
        console.log('=====================   完成   =======================')
      },
      // 根据部门id查询员工
      searchByOrg() {
        this.getUserList()
      },
      searchClick() {
        this.listQuery.page = 1
        this.listQuery.condition = removeAllSpace(this.listQuery.condition)
        this.getUserList()
      },
      quit(userId) {
        this.$confirm('是否办理员工复职?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delObj({ 'userId': userId, 'quit': '0' }).then(() => {
            this.back()
          })
        })
      },
      handleAvatarSuccess() {},
      beforeAvatarUpload() {}
    }
  }
</script>


<style rel="stylesheet/scss" lang="scss" scoped>
  .img{
    width: 50px;
    height: 50px;
    padding: 0;
    border-radius: 150px;
    overflow: hidden;
  }

  .table_text{
    color: #7c7c7c;font-size: 12px;text-align: left;
    word-break:keep-all;/* 不换行 */
    white-space:nowrap;/* 不换行 */
    overflow:hidden;/* 内容超出宽度时隐藏超出部分的内容 */
    text-overflow:ellipsis;/* 当对象内文本溢出时显示省略标记(...) ；需与overflow:hidden;一起使用。*/
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
    font-size: 12px;
    word-break:keep-all;/* 不换行 */
    white-space:nowrap;/* 不换行 */
    overflow:hidden;/* 内容超出宽度时隐藏超出部分的内容 */
    text-overflow:ellipsis;/* 当对象内文本溢出时显示省略标记(...) ；需与overflow:hidden;一起使用。*/
  }
  .avatar-uploader{
    border: 1px dashed #d9d9d9;
    width: 120px;
    height: 160px;
    margin: 0 auto 20px;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 160px;
    line-height: 160px;
    text-align: center;
  }
  .avatar {
    width: 120px;
    height: 180px;
    display: block;
  }
</style>
