<template>
  <div class="app-container calendar-list-container">
    <div v-show="showModule=='list'">
      <el-row :gutter="25">


        <el-col :xs="4" :sm="4" :md="8" :lg="6" :xl="4" >
            <el-card style="min-width: 200px">
              <span style="font-size: 16px;font-family: '微软雅黑 Light';color:rgb(145,145,145)">权限筛选</span>
              <org-tree @node-click="searchByOrg" ></org-tree>

            </el-card>
        </el-col>
        <el-col :xs="16" :sm="16" :md="16" :lg="18" :xl="20" >

          <el-row>
            <el-card style="margin-bottom: 5px;">
              <div>
                <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="关键词" v-model="listQuery.roleName"></el-input>
                <el-button class="filter-item" type="primary" v-waves icon="search" @click="search">搜索</el-button>
                <el-button class="filter-item" style="margin-left: 10px;" @click="create" type="primary" icon="create">添加</el-button>
              </div>
            </el-card>
          </el-row>

          <el-row>
            <el-card>
              <el-table :data="stuList" border height="500" highlight-current-row @row-dblclick="editlist"  v-loading="listLoading" element-loading-text="给我一点时间">
                <el-table-column align="center" label="基础信息" min-width="390">
                  <template slot-scope="scope">
                    <!-- 头像 -->
                    <el-row :gutter="15">
                      <el-col :span="10">
                        <el-row>
                          <el-tag class="img">
                            <img :src="scope.row.avatar" class="img">

                          </el-tag>
                        </el-row>
                        <el-row style="margin-top: 12px; text-align: center">
                          姓名：{{scope.row.name}}
                          <br/>
                          手机号：{{scope.row.mobile}}
                          <br/>
                        </el-row>
                      </el-col>
                      <!-- 员工信息 -->
                      <el-col :span="14" style="line-height: 36px;text-align: left">
                        档案号：{{scope.row.archivesNumber}}
                        <br/>
                        身份证：{{scope.row.idNumber}}
                        <br/>
                        介绍人：{{scope.row.introducer}}
                        <br/>
                        入学日期：{{scope.row.enrolTime | subTime}}
                        <br/>
                        期数：{{scope.row.periods}} &nbsp;&nbsp;&nbsp;车型：{{scope.row.motorcycle != null?scope.row.motorcycle.value:null}}
                        <br/>
                        来源渠道：{{scope.row.workMobile}}
                      </el-col>
                    </el-row>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="科目情况" min-width="240">
                  <template slot-scope="scope">
                    <el-tag class="subject">
                      科目一：
                      <el-tag v-if="true" class="pass">已通过</el-tag>
                      <el-tag v-else class="noPass">未通过</el-tag>
                    </el-tag>
                    <el-tag class="subject">
                      科目二：
                      <el-tag v-if="true" class="pass">已通过</el-tag>
                      <el-tag v-else class="noPass">未通过</el-tag>
                    </el-tag>
                    <el-tag class="subject">
                      科目三：
                      <el-tag v-if="false" class="pass">已通过</el-tag>
                      <el-tag v-else class="noPass">未通过</el-tag>
                    </el-tag>
                    <el-tag class="subject">
                      科目四：
                      <el-tag v-if="false" class="pass">已通过</el-tag>
                      <el-tag v-else class="noPass">未通过</el-tag>
                    </el-tag>
                  </template>
                </el-table-column>

                <el-table-column align="center" label="教练" min-width="240">
                  <template slot-scope="scope">

                    <el-tag class="cost">
                      场训教练：
                    </el-tag>
                    <el-tag class="cost">
                      路训教练：
                    </el-tag>

                  </template>
                </el-table-column>
                <el-table-column align="center" label="费用信息" min-width="240">
                  <template slot-scope="scope">

                    <el-tag class="cost">
                      学费：
                    </el-tag>
                    <el-tag class="cost">
                      补考费：
                    </el-tag>
                    <el-tag class="cost">
                      合场费：
                    </el-tag>

                  </template>
                </el-table-column>
              </el-table>


              <!-- <el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit
                         highlight-current-row style="width: 100%">
                 <el-table-column type="selection" class="selection" align="center" prop='uuid'></el-table-column>
                 <el-table-column type="index" label="序号"  align="center" width="50"></el-table-column>
                 <el-table-column label="组织id">
                   <template slot-scope="scope">
                     <span>{{scope.row.orgId}}</span>
                   </template>
                 </el-table-column>
                 <el-table-column label="微信 openID">
                   <template slot-scope="scope">
                     <span>{{scope.row.openId}}</span>
                   </template>
                 </el-table-column>
                 <el-table-column label="密码">
                   <template slot-scope="scope">
                     <span>{{scope.row.password}}</span>
                   </template>
                 </el-table-column>
                 <el-table-column label="档案号">
                   <template slot-scope="scope">
                     <span>{{scope.row.archivesNumber}}</span>
                   </template>
                 </el-table-column>
                 <el-table-column label="学员名字">
                   <template slot-scope="scope">
                     <span>{{scope.row.name}}</span>
                   </template>
                 </el-table-column>
                 <el-table-column label="性别 1男 2女">
                   <template slot-scope="scope">
                     <span>{{scope.row.sex}}</span>
                   </template>
                 </el-table-column>
                 <el-table-column label="年龄">
                   <template slot-scope="scope">
                     <span>{{scope.row.age}}</span>
                   </template>
                 </el-table-column>
                 <el-table-column label="身份证">
                   <template slot-scope="scope">
                     <span>{{scope.row.idNumber}}</span>
                   </template>
                 </el-table-column>
                 <el-table-column label="生日">
                   <template slot-scope="scope">
                     <span>{{scope.row.birthday}}</span>
                   </template>
                 </el-table-column>
                 <el-table-column label="电话1">
                   <template slot-scope="scope">
                     <span>{{scope.row.mobile}}</span>
                   </template>
                 </el-table-column>
                 <el-table-column label="电话2">
                   <template slot-scope="scope">
                     <span>{{scope.row.phone}}</span>
                   </template>
                 </el-table-column>
                 <el-table-column label="邮件">
                   <template slot-scope="scope">
                     <span>{{scope.row.email}}</span>
                   </template>
                 </el-table-column>
                 <el-table-column label="微信">
                   <template slot-scope="scope">
                     <span>{{scope.row.wechat}}</span>
                   </template>
                 </el-table-column>
                 <el-table-column label="头像">
                   <template slot-scope="scope">
                     <span>{{scope.row.avatar}}</span>
                   </template>
                 </el-table-column>
                 <el-table-column label="联系地址">
                   <template slot-scope="scope">
                     <span>{{scope.row.contactAddress}}</span>
                   </template>
                 </el-table-column>
                 <el-table-column label="家庭地址">
                   <template slot-scope="scope">
                     <span>{{scope.row.homeAddress}}</span>
                   </template>
                 </el-table-column>
                 <el-table-column label="单位">
                   <template slot-scope="scope">
                     <span>{{scope.row.company}}</span>
                   </template>
                 </el-table-column>
                 <el-table-column label="职位">
                   <template slot-scope="scope">
                     <span>{{scope.row.position}}</span>
                   </template>
                 </el-table-column>
                 <el-table-column label="入学时间">
                   <template slot-scope="scope">
                     <span>{{scope.row.enrolTime}}</span>
                   </template>
                 </el-table-column>
                 <el-table-column label="期数">
                   <template slot-scope="scope">
                     <span>{{scope.row.periods}}</span>
                   </template>
                 </el-table-column>
                 <el-table-column label="总学时">
                   <template slot-scope="scope">
                     <span>{{scope.row.period}}</span>
                   </template>
                 </el-table-column>
                 <el-table-column label="纬度">
                   <template slot-scope="scope">
                     <span>{{scope.row.latitude}}</span>
                   </template>
                 </el-table-column>
                 <el-table-column label="经度">
                   <template slot-scope="scope">
                     <span>{{scope.row.longitude}}</span>
                   </template>
                 </el-table-column>
                 <el-table-column label="是否体检 1是 2否">
                   <template slot-scope="scope">
                     <span>{{scope.row.physicalExamination}}</span>
                   </template>
                 </el-table-column>
                 <el-table-column label="是否有车 1是 2否">
                   <template slot-scope="scope">
                     <span>{{scope.row.haveCar}}</span>
                   </template>
                 </el-table-column>
                 <el-table-column label="是否增驾 1是 2否">
                   <template slot-scope="scope">
                     <span>{{scope.row.addDrive}}</span>
                   </template>
                 </el-table-column>
                 <el-table-column label="学员状态 -1退学  5毕业">
                   <template slot-scope="scope">
                     <span>{{scope.row.state}}</span>
                   </template>
                 </el-table-column>
                 <el-table-column label="拿证时间">
                   <template slot-scope="scope">
                     <span>{{scope.row.graduationTime}}</span>
                   </template>
                 </el-table-column>
                 <el-table-column label="有效期">
                   <template slot-scope="scope">
                     <span>{{scope.row.periodOfValidity}}</span>
                   </template>
                 </el-table-column>
                 <el-table-column label="上车日期">
                   <template slot-scope="scope">
                     <span>{{scope.row.aboardTime}}</span>
                   </template>
                 </el-table-column>
                 <el-table-column label="删除标记">
                   <template slot-scope="scope">
                     <span>{{scope.row.delFlag}}</span>
                   </template>
                 </el-table-column>
                 <el-table-column label="备注">
                   <template slot-scope="scope">
                     <span>{{scope.row.remark}}</span>
                   </template>
                 </el-table-column>
                 <el-table-column label="操作人">
                   <template slot-scope="scope">
                     <span>{{scope.row.operator}}</span>
                   </template>
                 </el-table-column>
                 <el-table-column label="创建时间/通过时间">
                   <template slot-scope="scope">
                     <span>{{scope.row.createTime}}</span>
                   </template>
                 </el-table-column>
                 <el-table-column label="更新时间/回访时间">
                   <template slot-scope="scope">
                     <span>{{scope.row.updateTime}}</span>
                   </template>
                 </el-table-column>

                 <el-table-column label="操作">
                   <template slot-scope="scope">
                     <el-button size="mini" type="success"
                                @click="update(scope.row)">编辑
                     </el-button>
                     <el-button size="mini" type="danger"
                                @click="delete(scope.row)">删除
                     </el-button>
                   </template>
                 </el-table-column>

               </el-table>-->
              <div v-show="!listLoading" class="pagination-container">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                               :current-page.sync="listQuery.page"
                               :page-sizes="[10,20,30,50]" :page-size="listQuery.limit"
                               layout="total, sizes, prev, pager, next, jumper" :total="total">
                </el-pagination>
              </div>
            </el-card>
          </el-row>


        </el-col>
      </el-row>
    </div>
    <div v-show="showModule=='info'">
      <el-card>
        <div slot="header" class="clearfix">
          <div style="float: left">
            |&nbsp;<span style="font-size: 20px;font-weight: 600;font-family: '微软雅黑 Light'">学员信息</span>
          </div>
          <div style="float: right">
            <el-button type="primary" style="width: 174px;float: right" @click="back">返回</el-button>
          </div>
        </div>

        <div slot="footer" class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button v-if="addInfo=='create'" type="primary" @click="create">确 定</el-button>
          <el-button v-else type="primary" @click="update">修 改</el-button>
        </div>
      </el-card>

    </div>

  </div>
</template>

<script>
  import { fetchList, getObj } from '@/api/student/student'
  import OrgTree from '@/components/OrgTree'
  import waves from '@/directive/waves/index.js' // 水波纹指令

  export default {
    name: 'table_student',
    components: {
      OrgTree
    },
    directives: {
      waves
    },
    data() {
      return {
        student: {},
        stuList: [],
        total: null,
        listLoading: true,
        showModule: 'list',
        addInfo: false,
        listQuery: {
          page: 1,
          limit: 20
        },
        edit: false
      }
    },
    created() {
      this.getList()
    },
    methods: {
      // 根据部门id查询员工
      searchByOrg(data) {
        console.log('=====================   根据部门id查询学员信息   =======================')
      },
      // 双击行  编辑
      editlist(val) {
        console.log('====================== 正在进入单个学员编辑 =====================')
        // getObj(val.userId).then(response => {
        //   console.log(response.data)
        //   this.userListEdit = response.data.data
        // })
        this.showModule = 'info'
      },
      getList() {
        this.listLoading = true
        fetchList(this.listQuery).then(response => {
          console.log('===================  这是所有学员信息  ==================')
          console.log(response.data)
          this.stuList = response.data.data
          this.total = response.data.total
          this.listLoading = false
        })
      },
      handleSizeChange(val) {
        this.listQuery.limit = val
        this.getList()
      },
      handleCurrentChange(val) {
        this.listQuery.page = val
        this.getList()
      },
      create() {
        this.student = {}
        this.showModule = 'info'
      },
      update(row) {
        getObj(row.roleId)
          .then(response => {
            this.student = response.data
            this.showModule = 'info'
          })
      },
      search() {
        this.listQuery.page = 1
        this.getList()
      },
      delete(id) {
        this.getList()
      },
      cancel() {
        this.showModule = 'list'
      },
      // 返回列表
      back() {
        this.showModule = 'list'
        this.edit = false
        this.addInfo = false
      }
    }
  }
</script>

<style>

  .img{
    width: 150px;
    height: 150px;
    padding: 0;
    border-radius: 150px;
    overflow: hidden;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
  .subject{
    width: 140px;
    height: 30px;
    display:block;
    margin: 10px auto;
    color: rgb(124,124,124);
    background: none;
    border: none;
    font-size: 14px;
  }
  .pass{
    width: 70px;
    height: 30px;
    border-radius: 10px;
    color: #fff;
    text-align: center;
    background-color: rgb(66,185,131);
  }
  .noPass{
    width: 70px;
    height: 30px;
    border-radius: 10px;
    color:#fff;
    text-align: center;
    background-color: rgb(177,177,177);
  }
  .cost{
    width: 140px;
    height: 30px;
    display:block;
    margin: 10px auto;
    text-align: left;
    color: rgb(124,124,124);
    background: none;
    border: none;
    font-size: 14px;
  }
  .image {
    margin-bottom: 20px;
    margin-right: 50px;
    width: 200px;
    height: 200px;
    display: block;
    float: left;
  }

</style>
