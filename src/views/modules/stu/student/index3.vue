<template>
  <div class="app-container calendar-list-container" :style="{height: client.height + 'px'}">
    <div v-show="showModule=='list'" style="height: 100%">
      <el-row :gutter="5">
        <el-col class="org-tree-left">
          <el-card>
            <span style="font-size: 16px;font-family: '微软雅黑 Light';color:rgb(145,145,145)">权限筛选</span>
            <org-tree @node-click="searchByOrg" ></org-tree>
          </el-card>
        </el-col>

        <el-col :style="{width: (client.width-250) + 'px'}">
          <el-card style="margin-bottom: 5px;height: 125px;line-height: 50px">
              <el-date-picker value-format="timestamp" v-model="listQuery.interval" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions">
              </el-date-picker>
              <el-select v-model="listQuery.subject" clearable placeholder="科目">
                <el-option
                  v-for="item in subject"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <dict v-model="listQuery.motorcycleType" dictType="dict_motorcycle_type" style="width: 200px;"  placeholder="车型"  ></dict>
              <dict v-model="listQuery.source" dictType="dict_enrolSite" style="width: 200px;"  placeholder="报名点"  ></dict>
              <dict v-model="listQuery.fieldCoach" dictType="dict_sex" style="width: 200px;"  placeholder="场训教练"  ></dict>
              <dict v-model="listQuery.roadCoach" dictType="dict_sex" style="width: 200px;"  placeholder="路训教练"  ></dict>
              <dict v-model="listQuery.source" dictType="dict_source" style="width: 200px;"  placeholder="来源渠道"  ></dict>
              <el-input @keyup.enter.native="searchClick" style="width: 200px;" class="filter-item" placeholder="姓名/电话/身份证" v-model="listQuery.condition"></el-input>
              <el-button class="filter-item" type="primary" v-waves icon="search" @click="searchClick">搜索</el-button>
              <el-button class="filter-item" style="margin-left: 10px;" @click="create" type="primary" ><i class="el-icon-plus"></i>添加</el-button>
          </el-card>

          <el-card :style="{height: (client.height-170) + 'px'}">
              <el-table :data="stuList.length == 0?null:stuList" :height="(client.height-260)" highlight-current-row @row-dblclick="editlist"  v-loading="listLoading" element-loading-text="给我一点时间">
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
                        <el-row style="line-height: 25px; text-align: center">
                          姓名：{{scope.row.name}}
                          <br/>
                          手机号：{{scope.row.mobile}}
                          <br/>
                        </el-row>
                      </el-col>
                      <!-- 员工信息 -->
                      <el-col :span="14" style="line-height: 25px;text-align: left">
                        档案号：{{scope.row.archivesNumber}}
                        <br/>
                        身份证：{{scope.row.idNumber}}
                        <br/>
                        介绍人：{{scope.row.introducer}}
                        <!-- 分割线 -->
                        <el-row><el-col> <hr style="border: none; border-bottom:1px solid #d3dce6; "/> </el-col></el-row>
                        入学日期：{{scope.row.enrolTime | subTime}}
                        <br/>
                        期数：{{scope.row.periods}} &nbsp;&nbsp;&nbsp;车型：{{scope.row.motorcycleType}}
                        <br/>
                        来源渠道：{{scope.row.source}}
                      </el-col>
                    </el-row>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="科目情况" min-width="240">
                  <template slot-scope="scope">
                    <el-tag class="subject">
                      科目一：
                      <el-tag v-if="scope.row.state > 1" class="pass">已通过</el-tag>
                      <el-tag v-else class="noPass">未通过</el-tag>
                    </el-tag>
                    <el-tag class="subject">
                      科目二：
                      <el-tag v-if="scope.row.state > 2" class="pass">已通过</el-tag>
                      <el-tag v-else class="noPass">未通过</el-tag>
                    </el-tag>
                    <el-tag class="subject">
                      科目三：
                      <el-tag v-if="scope.row.state > 3" class="pass">已通过</el-tag>
                      <el-tag v-else class="noPass">未通过</el-tag>
                    </el-tag>
                    <el-tag class="subject">
                      科目四：
                      <el-tag v-if="scope.row.state > 4" class="pass">已通过</el-tag>
                      <el-tag v-else class="noPass">未通过</el-tag>
                    </el-tag>
                  </template>
                </el-table-column>

                <el-table-column align="center" label="教练" min-width="240">
                  <template slot-scope="scope">

                    <el-tag class="cost">
                      场训教练：{{scope.row.fieldCoachName}}
                    </el-tag>
                    <el-tag class="cost">
                      路训教练：{{scope.row.roadCoachName}}
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

    <div v-show="showModule=='info'" style="height: 100%">
      <el-row :gutter="10">

        <el-col :span="10">
          <el-card>
            <div slot="header" class="clearfix">
              <div style="float: left">
                |&nbsp;<span style="font-size: 16px;font-family: '微软雅黑 Light';color:rgb(145,145,145)">学员信息</span>
              </div>
              <div style="float: right">
                <el-button type="primary" style="width: 174px;float: right" @click="back">返回</el-button>
              </div>
            </div>

            <el-row>

              <el-col :span="10">
                  <img width="100%" height="100%" :src="student.avatar" class="image">
              </el-col>
              <el-col :span="14"  style="line-height: 50px;">
                <el-row>
                  <el-col :span="8" ><div class="text_css">姓名：</div></el-col>
                  <el-col :span="14" >
                    <el-input v-if="edit"  v-model="student.name" placeholder="姓名"></el-input>
                    <div style="padding-left: 16px;font-size: 12px;" v-else>{{student.name}}</div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8" ><div class="text_css">性别：</div></el-col>
                  <el-col :span="14" >
                    <el-input disabled v-if="edit" v-model="sexVO" placeholder="性别"></el-input>
                    <div style="padding-left: 16px;font-size: 12px;" v-else>{{student.sex | sexFilter}}</div>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="8"><div class="text_css">出生日期：</div></el-col>
                  <el-col :span="14">
                    <el-date-picker value-format="timestamp"  v-if="edit" type="date" placeholder="出生日期"  style="width: 100%" v-model="student.birthday"></el-date-picker>
                    <div style="padding-left: 16px;font-size: 12px;" v-else>{{student.birthday | subTime}}</div>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="8"><div class="text_css">档案号：</div></el-col>
                  <el-col :span="14">
                    <el-input v-if="edit"  v-model="student.archivesNumber" placeholder="档案号"></el-input>
                    <div style="padding-left: 16px;font-size: 12px;" v-else>{{student.archivesNumber}}</div>
                  </el-col>
                </el-row>
              </el-col>

            </el-row>

            <!-- 分割线 -->
            <el-row><el-col> <hr style="border: none; border-bottom:1px solid #d3dce6; "/> </el-col></el-row>

            <el-row>

              <el-col :span="12" style="line-height: 50px;">
                <el-row>
                  <el-col :span="8" ><div class="text_css">入学日期：</div></el-col>
                  <el-col :span="14" >
                    <el-date-picker value-format="timestamp"  v-if="edit" type="date" placeholder="入学日期"  style="width: 100%" v-model="student.enrolTime"></el-date-picker>
                    <div style="padding-left: 16px;font-size: 12px;" v-else>{{student.enrolTime | subTime}}</div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8" ><div class="text_css">所学车型：</div></el-col>
                  <el-col :span="14" >
                    <dict v-if="edit" v-model="student.motorcycleType" dictType="dict_motorcycle_type" style="width: 100%;"  placeholder="所学车型"></dict>
                    <div style="padding-left: 16px;font-size: 12px;" v-else>{{student.motorcycleType}}</div>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="8"><div class="text_css">来源渠道：</div></el-col>
                  <el-col :span="14">
                    <dict v-if="edit" dictType="dict_source" style="width: 100%;" v-model="student.source"  placeholder="来源渠道"></dict>
                    <div style="padding-left: 16px;font-size: 12px;" v-else>{{student.source}}</div>
                  </el-col>
                </el-row>


              </el-col>

              <el-col :span="12" style="line-height: 50px;">
                <el-row>
                  <el-col :span="8"><div class="text_css">入学期数：</div></el-col>
                  <el-col :span="14">
                    <dict dictType="dict_sex" v-model="student.periods" v-if="edit"  placeholder="入学期数"  ></dict>
                    <div style="padding-left: 16px;font-size: 12px;" v-else>{{student.periods}}</div>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="8"><div class="text_css">场训教练：</div></el-col>
                  <el-col :span="14">
                    <dict dictType="dict_sex" v-if="edit"  placeholder="场训教练"  ></dict>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="8"><div class="text_css">报名点：</div></el-col>
                  <el-col :span="14">
                    <dict dictType="dict_enrolSite" v-model="student.enrolSite" v-if="edit"  placeholder="报名点"  ></dict>
                    <div style="padding-left: 16px;font-size: 12px;" v-else>{{student.enrolSite}}</div>
                  </el-col>
                </el-row>


              </el-col>


            </el-row>


            <!-- 分割线 -->
            <el-row><el-col> <hr style="border: none; border-bottom:1px solid #d3dce6; "/> </el-col></el-row>


            <el-row style="line-height: 50px;">

              <el-row>
                <el-col :span="4" ><div class="text_css">身份证号：</div></el-col>
                <el-col :span="10" >
                  <el-input v-if="edit" @blur="generateInfo"  v-model="student.idNumber" placeholder="身份证号"></el-input>
                  <div style="padding-left: 16px;font-size: 12px;" v-else>{{student.idNumber}}</div>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="4" ><div class="text_css">联系电话：</div></el-col>
                <el-col :span="10" >
                  <el-input v-if="edit"  v-model="student.mobile" placeholder="联系电话"></el-input>
                  <div style="padding-left: 16px;font-size: 12px;" v-else>{{student.mobile}}</div>
                </el-col>
              </el-row>

            </el-row>

            <!-- 分割线 -->
            <el-row><el-col> <hr style="border: none; border-bottom:1px solid #d3dce6; "/> </el-col></el-row>


            <el-row><el-col> <div style="text-align: center;color: #bfcbd9;font-size: 12px; cursor: pointer; margin:10px auto">查看更多︾</div> </el-col></el-row>


            <!-- 分割线 -->
            <el-row><el-col> </el-col></el-row>

            <el-row>
              <el-col>

                <el-row v-if="edit" :gutter="60">
                  <el-col :span="12"><el-button v-if="!addInfo" type="info" style="width: 100%;" @click="cancel">取消</el-button></el-col>
                  <el-col :span="12"><el-button v-if="addInfo" type="primary" style="width: 100%;" @click="add">确认保存</el-button></el-col>
                  <el-col :span="12"><el-button v-if="!addInfo" type="primary" style="width: 100%;" @click="update">确认修改</el-button></el-col>
                </el-row>


                <el-row v-else :gutter="60">
                  <el-col :span="12"><el-button type="success" style="width: 100%;" @click="editInfo">收款</el-button></el-col>
                  <el-col :span="12"><el-button type="primary" style="width: 100%;" @click="editInfo">编辑信息</el-button></el-col>
                </el-row>


              </el-col>

            </el-row>

          </el-card>
        </el-col>

        <el-col :span="14" >
            <el-tabs v-model="activeName" type="border-card" style="height: 100%;border-radius: 4px;">
              <el-tab-pane label="最近信息" name="1">


              </el-tab-pane>
              <el-tab-pane label="科目情况" name="2">

              </el-tab-pane>
              <el-tab-pane label="费用情况" name="3">角色管理</el-tab-pane>
              <el-tab-pane label="来访跟进信息" name="4">定时任务补偿</el-tab-pane>
              <el-tab-pane label="约车日志" name="5">定时任务补偿</el-tab-pane>
            </el-tabs>



        </el-col>
      </el-row>

    </div>

  </div>
</template>

<script>
  import { fetchList, getObj, addObj, putObj } from '@/api/student/student'
  import { examFetchList, getExam } from '@/api/student/examnote'
  import OrgTree from '@/components/OrgTree'
  import Dict from '@/components/Dict'
  import waves from '@/directive/waves/index.js' // 水波纹指令
  import { removeAllSpace } from '@/utils/validate'
  import { mapGetters } from 'vuex'
  export default {
    name: 'table_student',
    components: {
      OrgTree,
      Dict
    },
    directives: {
      waves
    },
    data() {
      return {
        student: {},
        stuList: [],
        total: 1,
        listLoading: true,
        showModule: 'list',
        addInfo: false,
        listQuery: {
          page: 1,
          limit: 20,
          condition: null,
          interval: [],
          subject: null,
          roadCoach: null,
          fieldCoach: null,
          source: null,
          motorcycleType: null,
          orgId: null
        },
        activeName: '1',
        edit: false,
        pickerOptions: {
          shortcuts: [{
            text: '昨天',
            onClick(picker) {
              const end = new Date(new Date().setHours(0, 0, 0, 0))
              const start = new Date(new Date().setHours(0, 0, 0, 0))
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 1)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '近三天',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 3)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '本周',
            onClick(picker) {
              const end = new Date()
              const day = new Date(new Date().setHours(0, 0, 0, 0))
              var week = day.getDay()
              if (week === 0) week = 7
              const start = day
              start.setTime(start.getTime() - 3600 * 1000 * 24 * (week - 1))
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '本月',
            onClick(picker) {
              const end = new Date()
              const start = new Date(new Date().setHours(0, 0, 0, 0))
              start.setDate(1)
              picker.$emit('pick', [start, end])
            }
          }]
        },
        subject: [{
          value: 1,
          label: '科目一'
        }, {
          value: 2,
          label: '科目二'
        }, {
          value: 3,
          label: '科目三'
        }, {
          value: 4,
          label: '科目四'
        }]
      }
    },
    created() {
      this.getList()
    },
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
        return typeMap[this.student.sex]
      }
    },
    methods: {
      // 根据部门id查询员工
      searchByOrg(data) {
        console.log('=====================   根据部门id查询学员信息   =======================')
        this.listQuery.page = 1
        this.listQuery.orgId = data.id
        this.getList()
      },
      // 字典
      getDict(val) {
      },
      // 双击行  编辑
      editlist(val) {
        console.log('====================== 正在进入单个学员编辑 =====================')
        console.log(val)
        getObj(val.studentId).then(response => {
          // console.log(response.data)
          this.student = response.data.data
        })
        examFetchList({ studentId: val.studentId, examState: 'exam_note_true' }).then(response => {
          console.log('====================== getExam =====================')
          console.log(response.data)
          console.log('====================== getExam =====================')
          // this.student = response.data.data
        })
        // this.student = val
        this.showModule = 'info'
      },
      // 获取所有学员
      getList() {
        this.listLoading = true
        fetchList(this.listQuery).then(response => {
          console.log(' ====== =============  这是所有学员信息  ==================')
          console.log(response.data)
          this.stuList = response.data.data.list
          this.total = response.data.data.totalCount
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
      // 编辑
      editInfo() {
        this.edit = true
      },
      // 添加
      add() {
        addObj(this.student).then(response => {
        })
        this.edit = false
      },
      // 新增
      create() {
        this.student = {}
        this.showModule = 'info'
        this.edit = true
      },
      // 修改
      update() {
        putObj(this.student).then(response => {
        })
        this.edit = false
      },
      // 搜索
      searchClick() {
        this.listQuery.page = 1
        console.log('============== 搜索方法 ===============')
        this.listQuery.condition = removeAllSpace(this.listQuery.condition)
        console.log(this.listQuery)
        this.getList()
      },
      // 删除
      delete(id) {
        this.getList()
      },
      // 取消
      cancel() {
        this.edit = false
      },
      // 返回列表
      back() {
        this.showModule = 'list'
        this.edit = false
        this.addInfo = false
        this.getList()
      },
      generateInfo() {
        if (this.student.idNumber.length === 18) {
          this.student.birthday = this.student.idNumber.substring(6, 10) + '-' + this.student.idNumber.substring(10, 12) + '-' + this.student.idNumber.substring(12, 14)
          this.student.sex = this.student.idNumber.substr(16, 1) % 2
        }
      }
    }
  }
</script>

<style>

  .img{
    width: 100px;
    height: 100px;
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
    border: none;
    background-color: rgb(66,185,131);
  }
  .noPass{
    width: 70px;
    height: 30px;
    border-radius: 10px;
    color:#fff;
    border: none;
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
    max-width: 200px;
    max-height: 200px;
  }
.text_css{
  color:#495060;
  font-size: 18px;
  word-break:keep-all;/* 不换行 */
  white-space:nowrap;/* 不换行 */
  overflow:hidden;/* 内容超出宽度时隐藏超出部分的内容 */
  text-overflow:ellipsis;/* 当对象内文本溢出时显示省略标记(...) ；需与overflow:hidden;一起使用。*/
}

</style>
