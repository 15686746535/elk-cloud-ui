<template>
  <div class="app-container calendar-list-container" :style="{height: $store.state.app.client.height + 'px'}">
    <div v-show="showModule=='list'">
      <!--<el-card body-style="padding:10px 20px;" style="margin-bottom: 5px;height: 60px">-->
      <!--<div class="filter-container">-->
      <!--<div style="float: right">-->
      <!--<el-input @keyup.enter.native="searchClick" style="width: 200px;" class="filter-item" placeholder="接送人/接送名单" v-model="shuttleLogQuery.condition"></el-input>-->
      <!--<el-button class="filter-item" type="primary"  @click="searchClick">搜索</el-button>-->
      <!--</div>-->
      <!--</div>-->
      <!--</el-card>-->
      <el-card :style="{height: ($store.state.app.client.height - 45) + 'px'}">
        <div class="filter-container">
          <div style="float: left;line-height: 40px">
            |&nbsp;<span style="font-size: 18px;font-weight: 600;font-family: '微软雅黑 Light'">接送列表</span>
          </div>
          <div style="float: right">
            <el-input @keyup.enter.native="searchClick" style="width: 200px;" class="filter-item" placeholder="接送人/接送名单" v-model="shuttleLogQuery.condition"></el-input>
            <el-button class="filter-item" type="primary"  @click="searchClick"><i class="el-icon-search"></i>搜索</el-button>
          </div>
        </div>
        <el-table :data="shuttleLog"  :height="($store.state.app.client.height-195)"  v-loading="shuttleLogLoading" element-loading-text="给我一点时间"  fit highlight-current-row style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-table :data="props.row.studentEntityList" element-loading-text="给我一点时间"  fit highlight-current-row style="width: 100%">
                <el-table-column align="center" label="学员">
                  <template slot-scope="scope">
                    <span>{{scope.row.name}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="电话">
                  <template slot-scope="scope">
                    <span>{{scope.row.mobile}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="时间">
                  <template slot-scope="scope">
                    <span>{{scope.row.relayTime}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="地址">
                  <template slot-scope="scope">
                    <span>{{scope.row.relayAddress}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="状态">
                  <template slot-scope="scope">
                    <span v-show="scope.row.state === '0'" style="color:#E6A23C">待接送</span>
                    <span v-show="scope.row.state === '1'" style="color:#67c23a">已接送</span>
                    <span v-show="scope.row.state === '2'" style="color:#f56c6c">未接送</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="未接送原因">
                  <template slot-scope="scope">
                    <span>{{scope.row.undeliveredReason}}</span>
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </el-table-column>
          <el-table-column type="index" label="序号"  align="center" width="50"></el-table-column>
          <el-table-column align="center" label="接送人">
            <template slot-scope="scope">
              <span>{{scope.row.name}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="接送人电话">
            <template slot-scope="scope">
              <span>{{scope.row.mobile}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="接送日期">
            <template slot-scope="scope">
              <span>{{scope.row.shuttleTime | subTime}}</span>
            </template>
          </el-table-column>


        </el-table>
        <div v-show="!shuttleLogLoading" class="pagination-container" style="margin-top: 20px">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                         :current-page.sync="shuttleLogQuery.page" background
                         style="float: left"
                         :page-sizes="[10,20,30, 50]" :page-size="shuttleLogQuery.limit"
                         layout="total, sizes, prev, pager, next, jumper" :total="shuttleLogTotal">
          </el-pagination>
          <el-button style="float:right;" @click="create" type="primary"><i class="el-icon-plus"></i>添加</el-button>
        </div>
      </el-card>
    </div>
    <div v-show="showModule=='info'">
      <el-card :style="{height: ($store.state.app.client.height - 45) + 'px'}">
        <el-row class="filter-container">
          <div style="float: left;line-height: 40px">
            |&nbsp;<span style="font-size: 18px;font-weight: 600;font-family: '微软雅黑 Light'">接送列表</span>
          </div>
          <div style="float: right">
            <el-button class="filter-item" type="primary"  @click="backClick"><i class="el-icon-back"></i> 返 回</el-button>
          </div>
        </el-row>
        <el-row :gutter="5">
          <el-col :span="8">
            <el-card :style="{height: ($store.state.app.client.height - 145) + 'px'}" shadow="never">
              <div class="filter-container">
                <div style="line-height: 28px">
                  |&nbsp;<span style="font-size: 16px;font-weight: 600;font-family: '微软雅黑 Light'">未安排名单</span>
                </div>
                <!--<div style="float: right">-->
                  <!--<el-input @keyup.enter.native="notShuttleHandleCurrentChange(1)" size="mini" style="width: 180px" class="filter-item" placeholder="接送人/接送名单" v-model="notShuttleListQuery.condition"></el-input>-->
                  <!--<el-button class="filter-item" type="primary" size="mini" @click="notShuttleHandleCurrentChange(1)"><i class="el-icon-search"></i>搜索</el-button>-->
                <!--</div>-->
              </div>
              <el-table :data="notShuttleList" :height="($store.state.app.client.height - 260)" border style="width: 100%"
                        @selection-change="handleSelectionChange" highlight-current-row v-loading="notShuttleListLoading" element-loading-text="给我一点时间">
                <el-table-column type="selection" class="selection" align="center" prop='uuid'></el-table-column>
                <el-table-column type="index" align="center" label="编号" width="50">
                </el-table-column>
                <el-table-column align="center" label="姓名">
                  <template slot-scope="scope">
                    <span>{{scope.row.studentName}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="电话" width="120">
                  <template slot-scope="scope">
                    <span>{{scope.row.mobile}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="详细地址">
                  <template slot-scope="scope">
                    <span>{{scope.row.relayAddress}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="常接送人">
                  <template slot-scope="scope">
                    <span>{{scope.row.bespeakName}}</span>
                  </template>
                </el-table-column>
              </el-table>

              <div v-show="!notShuttleListLoading" class="pagination-container" style="margin-top: 12px;">
                <el-pagination
                  @current-change="notShuttleHandleCurrentChange"
                  layout="prev, pager, next"
                  style="float: left"
                  :current-page="notShuttleListQuery.page"
                  :page-size="notShuttleListQuery.limit"
                  :total="notShuttleTotal"
                >
                </el-pagination>
                <div style="float: right;" >
                  <!--<el-button type="primary" size="mini" @click="getStudentList"><i class="el-icon-plus"></i> 添 加</el-button>-->
                  <el-button type="primary" size="mini" @click="shuttleClick"><i class="el-icon-fa-bus"></i> 接 送</el-button>
                </div>

              </div>

              <!--<el-dialog :close-on-click-modal="false" width="700px" title="添加接送学员" :visible.sync="addStudentOption">
                <el-row>
                  <div class="filter-container">
                    &lt;!&ndash;<div style="float: left;line-height: 28px">&ndash;&gt;
                    &lt;!&ndash;|&nbsp;<span style="font-size: 16px;font-weight: 600;font-family: '微软雅黑 Light'">未安排名单</span>&ndash;&gt;
                    &lt;!&ndash;</div>&ndash;&gt;
                    <div style="float: right">
                      <el-input @keyup.enter.native="studentHandleCurrentChange(1)" size="mini" style="width: 180px" class="filter-item" placeholder="接送人/接送名单" v-model="studentListQuery.condition"></el-input>
                      <el-button class="filter-item" type="primary" size="mini" @click="studentHandleCurrentChange(1)"><i class="el-icon-search"></i>搜索</el-button>
                    </div>
                  </div>
                  <el-table :data="studentList" :height="($store.state.app.client.height - 420)" border style="width: 100%"
                            @selection-change="handleSelectionChange" highlight-current-row v-loading="studentListLoading" element-loading-text="给我一点时间">
                    <el-table-column type="selection" class="selection" align="center" prop='uuid'></el-table-column>
                    <el-table-column type="index" align="center" label="编号" width="50">
                    </el-table-column>
                    <el-table-column align="center" label="姓名">
                      <template slot-scope="scope">
                        <span>{{scope.row.name}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column align="center" label="电话" width="120">
                      <template slot-scope="scope">
                        <span>{{scope.row.mobile}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column align="center" label="详细地址">
                      <template slot-scope="scope">
                        <span>{{scope.row.relayAddress}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column align="center" label="常接送人">
                      <template slot-scope="scope">
                        <span>{{scope.row.studentName}}</span>
                      </template>
                    </el-table-column>
                  </el-table>

                  <div class="pagination-container" style="margin-top: 12px;">
                    <el-pagination
                      @current-change="studentHandleCurrentChange"
                      layout="prev, pager, next"
                      style="float: left"
                      :current-page="studentListQuery.page"
                      :page-size="studentListQuery.limit"
                      :total="studentListTotal"
                    >
                    </el-pagination>
                  </div>
                </el-row>
                <el-row style="margin-top: 10px;">
                  <el-select v-model="shuttle.userId" collapse-tags style="width: 100%" filterable placeholder="请选择接送人">
                    <el-option v-for="user in userList" :key="user.userId" :label="user.name" :value="user.userId">
                    </el-option>
                  </el-select>
                </el-row>
                <div slot="footer">
                  <el-button @click="addStudentOption = false"><i class="el-icon-fa-undo"></i> 取 消</el-button>
                  <el-button type="primary" @click="addStudent">确 定</el-button>
                </div>
              </el-dialog>-->

              <!-- 添加接送信息 -->
              <el-dialog :close-on-click-modal="false" width="450px" title="请选择接送人" :visible.sync="userListOption">
                <el-select v-model="shuttle.userId" collapse-tags style="width: 100%" filterable placeholder="请选择接送人">
                  <el-option v-for="user in userList" :key="user.userId" :label="user.name" :value="user.userId">
                  </el-option>
                </el-select>
                <div slot="footer">
                  <el-button @click="userListOption = false"><i class="el-icon-fa-undo"></i> 取 消</el-button>
                  <el-button type="primary" v-show="isAdd" @click="addStudent">确 定</el-button>
                  <el-button type="primary" v-show="!isAdd" @click="updateShuttleStudent">确 定</el-button>
                </div>
              </el-dialog>
            </el-card>
          </el-col>

          <!-- 已安排名单 -->
          <el-col :span="16">
            <el-card :style="{height: ($store.state.app.client.height - 145) + 'px'}" shadow="never">

              <div class="filter-container">
                <div style="float: left;line-height: 28px">
                  |&nbsp;<span style="font-size: 16px;font-weight: 600;font-family: '微软雅黑 Light'">已安排名单</span>
                </div>
                <!--<div style="float: right">-->
                  <!--<el-input @keyup.enter.native="shuttledHandleCurrentChange(1)" size="mini" style="width: 200px" class="filter-item" placeholder="接送人/接送名单" v-model="shuttledListQuery.condition"></el-input>-->
                  <!--<el-button class="filter-item" type="primary" size="mini" @click="shuttledHandleCurrentChange(1)"><i class="el-icon-search"></i>搜索</el-button>-->
                <!--</div>-->
              </div>

              <el-table :data="shuttledList"  :height="($store.state.app.client.height-260)"  v-loading="shuttledListLoading" element-loading-text="给我一点时间"  fit highlight-current-row style="width: 100%">
                <el-table-column type="expand">
                  <template slot-scope="props">
                    <el-table :data="props.row.studentEntityList" element-loading-text="给我一点时间"  fit highlight-current-row style="width: 100%">
                      <el-table-column align="center" label="学员">
                        <template slot-scope="scope">
                          <span>{{scope.row.name}}</span>
                        </template>
                      </el-table-column>
                      <el-table-column align="center" label="电话">
                        <template slot-scope="scope">
                          <span>{{scope.row.mobile}}</span>
                        </template>
                      </el-table-column>
                      <el-table-column align="center" label="地址">
                        <template slot-scope="scope">
                          <span>{{scope.row.relayAddress}}</span>
                        </template>
                      </el-table-column>
                      <el-table-column align="center" label="操作">
                        <template slot-scope="scope">
                          <el-button type="primary" size="mini" @click="updateShuttleStudentClick(props.row.shuttleId, scope.row.studentId)"><i class="el-icon-edit"></i> 修 改</el-button>
                        </template>
                      </el-table-column>
                    </el-table>
                  </template>
                </el-table-column>
                <el-table-column type="index" label="序号"  align="center" width="50"></el-table-column>
                <el-table-column align="center" label="接送人">
                  <template slot-scope="scope">
                    <span>{{scope.row.name}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="电话">
                  <template slot-scope="scope">
                    <span>{{scope.row.mobile}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="已安排人数">
                  <template slot-scope="scope">
                    <span>{{scope.row.count}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="接送日期">
                  <template slot-scope="scope">
                    <span>{{scope.row.shuttleTime | subTime}}</span>
                  </template>
                </el-table-column>
                <!--<el-table-column align="center" label="操作">-->
                  <!--<template slot-scope="scope">-->
                    <!--<el-button type="danger" size="mini"><i class="el-icon-delete"></i> 删 除</el-button>-->
                  <!--</template>-->
                <!--</el-table-column>-->


              </el-table>
              <div v-show="!shuttledListLoading" class="pagination-container" style="margin-top: 12px;">
                <el-pagination @size-change="shuttledHandleSizeChange" @current-change="shuttledHandleCurrentChange"
                               :current-page.sync="shuttledListQuery.page" background
                               style="float: left"
                               :page-sizes="[10,20,30, 50]" :page-size="shuttledListQuery.limit"
                               layout="total, sizes, prev, pager, next, jumper" :total="shuttledTotal">
                </el-pagination>
                <!--<div style="float: right;" >-->
                  <!--<el-button type="primary" size="mini"><i class="el-icon-plus"></i> 添 加</el-button>-->
                  <!--<el-button type="primary" size="mini"><i class="el-icon-fa-bus"></i> 接 送</el-button>-->
                <!--</div>-->
              </div>



            </el-card>
          </el-col>
        </el-row>
      </el-card>
    </div>
  </div>
</template>

<script>
  import { getShuttleList, queryUndelivered } from '@/api/bespeak/shuttle'
  import { addShuttleStudent, putShuttleStudent } from '@/api/bespeak/shuttlestudent'
  // import { fetchList } from '@/api/student/student'
  import { getShuttledList } from '@/api/bespeak/vehicleperiod'
  import { mapGetters } from 'vuex'
  import { userList } from '@/api/upms/user'
  import { removeAllSpace } from '@/utils/validate'

  export default {
    name: 'table_shuttle',
    computed: {
      ...mapGetters([
        'permissions',
        'client'
      ])
    },
    data() {
      return {
        /* 接送名单 */
        shuttleLog: [],
        shuttleLogTotal: null,
        shuttleLogLoading: true,
        /* 未安排接送名单 */
        notShuttleList: [],
        notShuttleTotal: null,
        notShuttleListLoading: false,
        /* 已安排接送名单 */
        shuttledList: [],
        shuttledTotal: null,
        shuttledListLoading: false,
        userList: [],
        userListOption: false,
        studentListLoading: false,
        studentList: [],
        studentListTotal: null,
        addStudentOption: false,
        isAdd: true,
        showModule: 'list',
        shuttle: {
          userId: null,
          studentList: []
        },
        shuttleLogQuery: {
          page: 1,
          limit: 20,
          scope: 'before'
        },
        notShuttleListQuery: {
          page: 1,
          limit: 20
        },
        shuttledListQuery: {
          page: 1,
          limit: 20,
          scope: 'after'
        },
        studentListQuery: {
          page: 1,
          limit: 20
        }
      }
    },
    created() {
      this.getShuttleLog()
    },
    methods: {
      /* 获取查看页面接送名单 */
      getShuttleLog() {
        this.shuttleLogLoading = true
        console.log('------ 获取查看页面接送名单查询条件 -------')
        console.log(this.shuttleLogQuery)
        getShuttledList(this.shuttleLogQuery).then(response => {
          console.log('=========== 接送名单 ==========')
          console.log(response.data)
          this.shuttleLog = response.data.data.list
          this.shuttleLogTotal = response.data.data.totalCount
          this.shuttleLogLoading = false
        })
      },
      /* 获取未安排接送名单 */
      getNotShuttleList() {
        this.notShuttleListLoading = true
        console.log('------ 获取未安排接送名单查询条件 -------')
        console.log(this.notShuttleListQuery)
        queryUndelivered(this.notShuttleListQuery).then(response => {
          console.log('=========== 获取未安排接送名单 ==========')
          console.log(response.data)
          this.notShuttleList = response.data.data.list
          this.notShuttleTotal = response.data.data.totalCount
          this.notShuttleListLoading = false
        })
      },
      /* 获取已安排接送名单 */
      getShuttledList() {
        this.shuttledListLoading = true
        console.log('------ 获取已安排接送名单查询条件 -------')
        console.log(this.shuttledListQuery)
        getShuttledList(this.shuttledListQuery).then(response => {
          console.log('=========== 获取已安排接送名单 ==========')
          console.log(response.data)
          this.shuttledList = response.data.data.list
          this.shuttledTotal = response.data.data.totalCount
          this.shuttledListLoading = false
        })
      },
      /* 获取接送人人列表 */
      getUserList() {
        userList().then(response => {
          console.log(response.data.data)
          this.userList = response.data.data
        })
      },
      /* 获取学员名单 */
      // getStudentList() {
      //   this.getUserList()
      //   this.studentListLoading = true
      //   this.addStudentOption = true
      //   fetchList(this.studentListQuery).then(response => {
      //     console.log('=========== 获取学员名单 ==========')
      //     console.log(response.data)
      //     this.studentList = response.data.data.list
      //     this.studentListTotal = response.data.data.totalCount
      //     this.shuttle.userId = null
      //     this.shuttle.studentList = []
      //     this.studentListLoading = false
      //   })
      // },
      /* 接送名单 */
      handleSizeChange(val) {
        this.shuttleLogQuery.limit = val
        this.getShuttleLog()
      },
      handleCurrentChange(val) {
        this.shuttleLogQuery.page = val
        this.getShuttleLog()
      },
      /* 未安排接送名单 */
      notShuttleHandleCurrentChange(val) {
        this.notShuttleListQuery.page = val
        this.getNotShuttleList()
      },
      /* 已安排接送名单 */
      shuttledHandleSizeChange(val) {
        this.shuttledListQuery.limit = val
        this.getShuttledList()
      },
      shuttledHandleCurrentChange(val) {
        this.shuttledListQuery.page = val
        this.getShuttledList()
      },
      /* 学员名单 */
      // studentHandleCurrentChange(val) {
      //   this.studentListQuery.page = val
      //   this.studentListLoading = true
      //   fetchList(this.studentListQuery).then(response => {
      //     this.studentList = response.data.data.list
      //     this.studentListTotal = response.data.data.totalCount
      //     this.studentListLoading = false
      //   })
      // },
      /* 转到管理页面 */
      create() {
        this.getNotShuttleList()
        this.getShuttledList()
        this.showModule = 'info'
      },
      /* 搜索 */
      searchClick() {
        this.shuttleLogQuery.page = 1
        this.getShuttleLog()
      },
      /* 返回list */
      backClick() {
        this.getShuttleLog()
        this.showModule = 'list'
      },
      /* 被接送人集合 */
      handleSelectionChange(val) {
        console.log(val)
        this.shuttle.studentList = val
      },
      shuttleClick() {
        if (this.shuttle.studentList.length === 0) {
          this.$message.warning('请选择学员')
        } else {
          this.getUserList()
          this.shuttle.userId = null
          this.userListOption = true
          this.isAdd = true
        }
      },
      addStudent() {
        if (this.shuttle.studentList.length === 0) {
          this.$message.warning('请选择学员')
        } else if (this.shuttle.userId === null) {
          this.$message.warning('请选择接送人')
        } else {
          console.log(this.shuttle)
          addShuttleStudent(this.shuttle).then(() => {
            this.userListOption = false
            this.addStudentOption = false
            this.getNotShuttleList()
            this.getShuttledList()
          })
        }
      },
      updateShuttleStudentClick(shuttleId, studentId) {
        this.shuttle.shuttleId = shuttleId
        this.shuttle.studentId = studentId
        this.getUserList()
        this.shuttle.userId = null
        this.userListOption = true
        this.isAdd = false
      },
      updateShuttleStudent() {
        if (this.shuttle.userId === null) {
          this.$message.warning('请选择接送人')
        } else {
          putShuttleStudent(this.shuttle).then(() => {
            this.userListOption = false
            this.addStudentOption = false
            this.getNotShuttleList()
            this.getShuttledList()
          })
        }
      }
    }
  }
</script>
