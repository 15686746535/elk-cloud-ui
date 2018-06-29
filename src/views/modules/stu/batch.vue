<template>
  <div class="app-container1 calendar-list-container1" :style="{height: $store.state.app.client.height + 'px'}" >
    <el-card body-style="padding:10px 20px;" style="margin-bottom: 5px;height: 50px">
      <el-row :gutter="5">
        <el-col :xs="7" :sm="7" :md="8" :lg="12" :xl="13">
          <el-radio-group size="mini" @change="handleSubject" v-model="listQuery.subject">
            <el-radio-button label="1">科目一</el-radio-button>
            <el-radio-button label="2">科目二</el-radio-button>
            <el-radio-button label="3">科目三</el-radio-button>
            <el-radio-button label="4">科目四</el-radio-button>
          </el-radio-group>
        </el-col>
        <el-col :xs="8" :sm="8" :md="8" :lg="6" :xl="6">
          <el-date-picker value-format="timestamp" size="mini" style="width: 100%;" v-model="listQuery.interval" type="daterange" align="left" unlink-panels range-separator="—" start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>
        </el-col>
        <el-col :xs="6" :sm="6" :md="5" :lg="4" :xl="4">
          <span v-show="'1' === listQuery.subject"><dict size="mini" v-model="listQuery.examField" dictType="dict_exam_field1" placeholder="科目一考试场地"></dict></span>
          <span v-show="'2' === listQuery.subject"><dict size="mini" v-model="listQuery.examField" dictType="dict_exam_field2" placeholder="科目二考试场地"></dict></span>
          <span v-show="'3' === listQuery.subject"><dict size="mini" v-model="listQuery.examField" dictType="dict_exam_field3" placeholder="科目三考试场地"></dict></span>
          <span v-show="'4' === listQuery.subject"><dict size="mini" v-model="listQuery.examField" dictType="dict_exam_field4" placeholder="科目四考试场地"></dict></span>
        </el-col>
        <el-col :xs="3" :sm="3" :md="3" :lg="2" :xl="1">
          <el-button type="primary" size="mini" @click="searchClick" ><i class="el-icon-search"></i> 搜 索</el-button>
        </el-col>
      </el-row>

    </el-card>
    <el-card :style="{height: ($store.state.app.client.height - 95) + 'px'}">
      <!--{{permissions}}-->
      <el-table :key='tableKey' :data="list"  v-loading="listLoading" :height="$store.state.app.client.height - 190" :stripe="true" element-loading-text="给我一点时间" fit highlight-current-row style="width: 100%;text-align: center;">
        <el-table-column type="index" label="序号"  align="center" width="50"></el-table-column>
        <el-table-column align="center"  label="科目">
          <template slot-scope="scope">
            <span>{{scope.row.subject == 1?'科目一':scope.row.subject == 2?'科目二':scope.row.subject == 3?'科目三':scope.row.subject == 4?'科目四':''}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center"  label="考试时间">
          <template slot-scope="scope">
            <span>{{scope.row.examTime | subTime}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center"  label="考试场地">
          <template slot-scope="scope">
            <span>{{scope.row.examField}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center"  label="已约人数">
          <template slot-scope="scope">
            <!--<span>{{scope.row.hasReserved}}/{{scope.row.stuCount}}</span>-->
            <span>{{scope.row.stuCount<0?0:scope.row.stuCount}}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="预约截至日期">
          <template slot-scope="scope">
            {{scope.row.expiryTime | subTime}}
          </template>
        </el-table-column>

        <el-table-column align="center" label="操作" width="240">
          <template slot-scope="scope">
            <!--<el-button-group>-->
              <el-button size="mini" type="success" @click="see(scope.row.examId, studentListQuery.examineState)" plain>查 看</el-button>
              <el-button size="mini" type="primary" v-if="permissions.stu_exam_update" @click="handleUpdate(scope.row)" plain>编 辑</el-button>
              <el-button size="mini" type="danger" v-if="permissions.stu_exam_del" @click="handleDelete(scope.row)">删 除</el-button>
            <!--</el-button-group>-->
          </template>
        </el-table-column>

      </el-table>
      <div v-show="!listLoading" class="pagination-container" style="margin-top: 20px">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                       :current-page.sync="listQuery.page" background
                       style="float:left;"
                       :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit"
                       layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>

        <el-button style="float:right;" @click="createClick" size="small" v-if="permissions.stu_exam_add" type="primary"><i class="el-icon-plus"></i>添加</el-button>
      </div>
    </el-card>

    <!-- 考试设置 -->
    <el-dialog @close="cancel('batch')" title="考试设置" :show-close="false" width="550px" :visible.sync="batchOption">

      <el-form :model="batch" :rules="batchRules" ref="batch" label-width="120px">
        <el-form-item label="考试场地" prop="examField">
          <span v-show="'1' === batch.subject"><dict v-model="batch.examField" dictType="dict_exam_field1" style="width: 100%;"  placeholder="科目一考试场地"></dict></span>
          <span v-show="'2' === batch.subject"><dict v-model="batch.examField" dictType="dict_exam_field2" style="width: 100%;"  placeholder="科目二考试场地"></dict></span>
          <span v-show="'3' === batch.subject"><dict v-model="batch.examField" dictType="dict_exam_field3" style="width: 100%;"  placeholder="科目三考试场地"></dict></span>
          <span v-show="'4' === batch.subject"><dict v-model="batch.examField" dictType="dict_exam_field4" style="width: 100%;"  placeholder="科目四考试场地"></dict></span>
        </el-form-item>
        <!--<el-form-item label="人数"  prop="stuCount">-->
          <!--<el-input v-model.number="batch.stuCount" placeholder="人数" ></el-input>-->
        <!--</el-form-item>-->
        <el-form-item label="考试时间" prop="examTime">
          <el-date-picker value-format="timestamp" style="width: 100%" type="date" placeholder="考试时间" v-model="batch.examTime"></el-date-picker>
        </el-form-item>
        <el-form-item label="预约截止日期" prop="expiryTime">
          <el-date-picker value-format="timestamp" style="width: 100%" type="date" placeholder="预约截止日期" v-model="batch.expiryTime"></el-date-picker>
        </el-form-item>

      </el-form>

      <div slot="footer">
        <el-button @click="cancel('batch')"><i class="el-icon-fa-undo"></i> 取 消</el-button>
        <el-button v-if="dialogStatus=='create'" :loading="btnLoading" type="primary" @click="create('batch')">确 定</el-button>
        <el-button v-else type="primary" :loading="btnLoading" @click="update('batch')">修 改</el-button>
      </div>
    </el-dialog>


    <el-dialog :close-on-click-modal="false" @close="closeExamOption" title="考试计划操作" :visible.sync="examOption">

      <el-tabs body-style="padding:0;" v-model="bespeakTabs" type="border-card" @tab-click="handleField">
        <el-tab-pane name="all" label="申请名单">
          <el-table :data="examBespeak" :height="($store.state.app.client.height/2)" @selection-change="handleSelectionChange"  v-loading="examBespeakLoading" element-loading-text="给我一点时间"  fit highlight-current-row style="width: 100%;">
            <el-table-column type="index" label="序号" align="center" width="50"></el-table-column>
            <el-table-column align="center"  label="学员">
              <template slot-scope="scope">
                <span>{{scope.row.name}}</span>
              </template>
            </el-table-column>
            <el-table-column  align="center" label="电话">
              <template slot-scope="scope">
                <span>{{scope.row.mobile}}</span>
              </template>
            </el-table-column>
            <el-table-column  align="center" label="车型">
              <template slot-scope="scope">
                <span>{{scope.row.motorcycleType}}</span>
              </template>
            </el-table-column>
            <el-table-column  align="center" label="考试时间" width="100">
              <template slot-scope="scope">
                <span>{{scope.row.examTime | subTime}}</span>
              </template>
            </el-table-column>
            <!--:filters="[-->
            <!--{ text: '报考失败', value: '4' },-->
            <!--{ text: '审核失败', value: '5' },-->
            <!--{ text: '待审核', value: '0' },-->
            <!--{ text: '待约考', value: '1' },-->
            <!--{ text: '已约考', value: '2' },-->
            <!--{ text: '报考成功', value: '3' }-->
            <!--]"-->
            <!--:filter-method="filterTag" filter-placement="bottom-end"-->
            <el-table-column  align="center"
                              label="状态">
              <template slot-scope="scope">
                <!--<span>{{scope.row.state}}</span>-->
                <!-- 0默认审核 1是待约考 2是成功约考 3报考成功 4报考失败 5审核失败  6取消约考  -->
                <span v-if="scope.row.examineState === '4'" style="border-radius: 20px;color: #f56c6c">报考失败</span>
                <span v-else-if="scope.row.examineState === '5'" style="border-radius: 20px;color: #e6a23c">审核失败</span>
                <span v-else-if="scope.row.examineState === '0'" style="border-radius: 20px;color: #909399">待审核</span>
                <span v-else-if="scope.row.examineState === '1'" style="border-radius: 20px;color: #02b7ac">待约考</span>
                <span v-else-if="scope.row.examineState === '2'" style="border-radius: 20px;color: #409eff">已约考</span>
                <span v-else-if="scope.row.examineState === '3'" style="border-radius: 20px;color: #67c23a">报考成功</span>
                <span v-else-if="scope.row.examineState === '6'" style="border-radius: 20px;color: #f56c6c">取消约考</span>

              </template>
            </el-table-column>
            <!--<el-table-column align="center" label="操作">-->
              <!--<template slot-scope="scope">-->
                <!--<el-button size="mini" type="danger" @click="revokeExam(scope.row)">取消约考</el-button>-->
              <!--</template>-->
            <!--</el-table-column>-->
          </el-table>
        </el-tab-pane>
        <el-tab-pane name="0" label="待审核" :disabled="!permissions.stu_exam_examine">
          <el-table :data="examBespeak" :height="($store.state.app.client.height/2)" @selection-change="handleSelectionChange"  v-loading="examBespeakLoading" element-loading-text="给我一点时间"  fit highlight-current-row style="width: 100%;">
            <el-table-column type="selection" class="selection" align="center" prop='uuid'></el-table-column>
            <el-table-column type="index" label="序号" align="center" width="50"></el-table-column>
            <el-table-column align="center"  label="学员">
              <template slot-scope="scope">
                <span>{{scope.row.name}}</span>
              </template>
            </el-table-column>
            <el-table-column  align="center" label="电话">
              <template slot-scope="scope">
                <span>{{scope.row.mobile}}</span>
              </template>
            </el-table-column>
            <el-table-column  align="center" label="车型">
              <template slot-scope="scope">
                <span>{{scope.row.motorcycleType}}</span>
              </template>
            </el-table-column>
            <el-table-column  align="center" label="考试时间" width="100">
              <template slot-scope="scope">
                <span>{{scope.row.examTime | subTime}}</span>
              </template>
            </el-table-column>

            <el-table-column align="center" label="操作">
              <template slot-scope="scope">
                <el-button size="mini" type="danger" @click="revokeExam(scope.row)">取消约考</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane name="1" label="待约考" :disabled="!permissions.stu_exam_bespeak">
          <el-table :data="examBespeak" :height="($store.state.app.client.height/2)" @selection-change="handleSelectionChange"  v-loading="examBespeakLoading" element-loading-text="给我一点时间"  fit highlight-current-row style="width: 100%;">
            <el-table-column type="selection" class="selection" align="center" prop='uuid'></el-table-column>
            <el-table-column type="index" label="序号" align="center" width="50"></el-table-column>
            <el-table-column align="center"  label="学员">
              <template slot-scope="scope">
                <span>{{scope.row.name}}</span>
              </template>
            </el-table-column>
            <el-table-column  align="center" label="电话">
              <template slot-scope="scope">
                <span>{{scope.row.mobile}}</span>
              </template>
            </el-table-column>
            <el-table-column  align="center" label="车型">
              <template slot-scope="scope">
                <span>{{scope.row.motorcycleType}}</span>
              </template>
            </el-table-column>
            <el-table-column  align="center" label="考试时间" width="100">
              <template slot-scope="scope">
                <span>{{scope.row.examTime | subTime}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="操作">
              <template slot-scope="scope">
                <el-button size="mini" type="danger" @click="revokeExam(scope.row)">取消约考</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane name="2" label="已约考" :disabled="!permissions.stu_exam_bespeak_ok">
          <el-table :data="examBespeak" :height="($store.state.app.client.height/2)" @selection-change="handleSelectionChange"  v-loading="examBespeakLoading" element-loading-text="给我一点时间"  fit highlight-current-row style="width: 100%;">
            <el-table-column type="selection" class="selection" align="center" prop='uuid'></el-table-column>
            <el-table-column type="index" label="序号" align="center" width="50"></el-table-column>
            <el-table-column align="center"  label="学员">
              <template slot-scope="scope">
                <span>{{scope.row.name}}</span>
              </template>
            </el-table-column>
            <el-table-column  align="center" label="电话">
              <template slot-scope="scope">
                <span>{{scope.row.mobile}}</span>
              </template>
            </el-table-column>
            <el-table-column  align="center" label="车型">
              <template slot-scope="scope">
                <span>{{scope.row.motorcycleType}}</span>
              </template>
            </el-table-column>
            <el-table-column  align="center" label="考试时间" width="100">
              <template slot-scope="scope">
                <span>{{scope.row.examTime | subTime}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="操作">
              <template slot-scope="scope">
                <el-button size="mini" type="danger" @click="revokeExam(scope.row)">取消约考</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane name="3" label="考试名单" :disabled="!permissions.stu_exam_roster">
            <el-table :data="examBespeak" :height="($store.state.app.client.height/2)" @selection-change="handleSelectionChange"  v-loading="examBespeakLoading" element-loading-text="给我一点时间"  fit highlight-current-row style="width: 100%;">
              <el-table-column type="selection" class="selection" align="center" prop='uuid'></el-table-column>
              <el-table-column type="index" label="序号" align="center" width="50"></el-table-column>
              <el-table-column align="center"  label="学员">
                <template slot-scope="scope">
                  <span>{{scope.row.name}}</span>
                </template>
              </el-table-column>
              <el-table-column  align="center" label="电话"  width="130">
                <template slot-scope="scope">
                  <span>{{scope.row.mobile}}</span>
                </template>
              </el-table-column>
              <el-table-column  align="center" label="车型">
                <template slot-scope="scope">
                  <span>{{scope.row.motorcycleType}}</span>
                </template>
              </el-table-column>
              <el-table-column  align="center" label="考试时间" width="100">
                <template slot-scope="scope">
                  <span>{{scope.row.examTime | subTime}}</span>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
      </el-tabs>
      <div slot="footer" style="margin-top: -30px" v-show="bespeakTabs != 'all'">

        <!-- 0默认审核 1是待约考 2是成功约考 3报考成功 4报考失败 5审核失败  -->
        <el-button-group v-if="studentListQuery.examineState === '0'">
          <el-button @click="operation('5','examCancel')" size="small" type="danger" round>失败</el-button>
          <el-button @click="operation('1','examExamine')" size="small" type="success" round>通过</el-button>
        </el-button-group>
        <el-button-group v-else-if="studentListQuery.examineState === '1'">
          <el-button @click="operation('0','examCancel')" size="small" type="info" round>撤销</el-button>
          <el-button @click="operation('2','examExamine')" size="small" type="success" round>已约</el-button>
        </el-button-group>
        <el-button-group v-else-if="studentListQuery.examineState === '2'">
          <el-button @click="operation('4','examExamine')" size="small" type="danger" round>失败</el-button>
          <el-button @click="operation('1','examCancel')" size="small" type="info" round>撤销</el-button>
          <el-button @click="operation('3','examExamine')" size="small" type="success" round>成功</el-button>
        </el-button-group>

        <div  v-else-if="studentListQuery.examineState === '3'">
          <el-button-group style="float: left">
            <el-button type="primary" size="small" :loading="expLoading" @click="exportExamList" round>导出名单</el-button>
          </el-button-group>
          <el-button-group>
            <el-button @click="operation('6','examCancel')" size="small" type="danger" round>取消约考</el-button>
          </el-button-group>
        </div>
        <span v-else>
        </span>
      </div>

    </el-dialog>


  </div>
</template>

<script>
  import { getBatchList, delObj, addObj, putObj, exportExamList } from '@/api/student/batch'
  import { examFetchList, putExamBespeak } from '@/api/student/examnote'
  import { mapGetters } from 'vuex'

  export default {
    name: 'table_batch',
    data() {
      return {
        batch: {
          subject: '1'
        },
        list: [],
        total: null,
        listLoading: true,
        examBespeakLoading: true,
        listQuery: {
          page: 1,
          limit: 20,
          subject: '1',
          interval: [],
          beginTime: null,
          endTime: null,
          examField: null
        },
        tableKey: 0,
        dialogStatus: '',
        subject: [{
          value: '1',
          label: '科目一'
        }, {
          value: '2',
          label: '科目二'
        }, {
          value: '3',
          label: '科目三'
        }, {
          value: '4',
          label: '科目四'
        }],
        batchOption: false,
        testUrl: null,
        examOption: false,
        btnLoading: false,
        expLoading: false,
        examBespeak: [],
        bespeakTabs: 'all',
        examBespeakList: {
          examNoteList: [],
          subject: null,
          examineState: null
        },
        studentListQuery: {
          page: 1,
          limit: 0,
          examId: null,
          examineState: '0',
          examState: 'exam_note_examine'
        },
        batchRules: {
          examField: [
            { required: true, message: '请选择考试场地', trigger: ['blur', 'change'] }
          ],
          // stuCount: [
          //   { required: true, type: 'number', message: '请输入人数', trigger: ['blur', 'change'] }
          // ],
          examTime: [
            { required: true, message: '请选择考试时间', trigger: ['blur', 'change'] }
          ],
          expiryTime: [
            { required: true, message: '请选择预约截止日期', trigger: ['blur', 'change'] }
          ]
        }
      }
    },
    created() {
      this.getList()
    },
    computed: {
      ...mapGetters([
        'permissions',
        'client'
      ])
    },
    methods: {
      getList() {
        this.listLoading = true
        getBatchList(this.listQuery).then(response => {
          this.list = response.data.data.list
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
      createClick() {
        this.batch = {}
        this.batch.subject = this.listQuery.subject
        this.dialogStatus = 'create'
        this.batchOption = true
      },
      handleUpdate(val) {
        this.batch = val
        this.dialogStatus = 'update'
        this.batchOption = true
      },
      see(examId, state) {
        this.examBespeakLoading = true
        this.studentListQuery.examId = examId
        this.studentListQuery.examineState = state
        this.examBespeakList.subject = this.listQuery.subject
        examFetchList(this.studentListQuery).then(response => {
          this.examBespeak = response.data.data.list
          this.examBespeakLoading = false
        })
        // this.examBespeakList.examId = examId
        this.examOption = true
      },
      closeExamOption() {
        this.getList()
      },
      create(formName) {
        const set = this.$refs
        set[formName].validate(valid => {
          if (valid) {
            this.btnLoading = true
            addObj(this.batch)
              .then(() => {
                this.getList()
                this.batchOption = false
                this.btnLoading = false
              })
          } else {
            return false
          }
        })
      },
      cancel(formName) {
        this.batchOption = false
        this.btnLoading = false
        this.batch = {}
        const set = this.$refs
        set[formName].resetFields()
        this.getList()
      },
      update(formName) {
        const set = this.$refs
        set[formName].validate(valid => {
          if (valid) {
            this.btnLoading = true
            putObj(this.batch).then(response => {
              this.batchOption = false
              this.btnLoading = false
              this.getList()
            })
          } else {
            return false
          }
        })
      },
      searchClick() {
        this.listQuery.page = 1
        this.examTimeBlur()
        this.getList()
      },
      handleDelete(val) {
        if (val.stuCount === 0) {
          this.$confirm('此操作将永久删除, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'error'
          }).then(() => {
            delObj(val.examId).then(() => {
              this.$notify({
                title: '成功',
                message: '删除成功',
                type: 'success',
                duration: 2000
              })
              this.getList()
            })
          })
        } else {
          this.$alert('当前批次已被预约，不可操作', '提示', {
            type: 'warning'
          })
        }
      },
      // 取消约考
      revokeExam(val) {
        this.$confirm('此操作将取消该学员约考, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.examBespeakList.examNoteList = []
          this.examBespeakList.examNoteList.push({ 'studentId': val.studentId, 'examId': val.examId })
          this.operation('6', 'examCancel')
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消操作'
          })
        })
      },
      handleSelectionChange(val) {
        this.examBespeakList.examNoteList = []
        for (var i = 0; i < val.length; i++) {
          this.examBespeakList.examNoteList.push({ 'studentId': val[i].studentId, 'examId': val[i].examId })
        }
      },
      // 根据状态查询约考学员
      handleField(state) {
        this.studentListQuery.examineState = state.name
        if (state.name === 'all') this.studentListQuery.examineState = null
        this.see(this.studentListQuery.examId, this.studentListQuery.examineState)
      },
      operation(state, url) {
        if (this.examBespeakList.examNoteList.length === 0) {
          this.$message.warning('请先选择学员')
        } else {
          this.examBespeakList.examineState = state
          this.examBespeakList.subject = this.listQuery.subject
          putExamBespeak(this.examBespeakList, url).then(() => {
            this.see(this.studentListQuery.examId, this.studentListQuery.examineState)
          })
        }
      },
      // 根据科目查询场地
      handleSubject() {
        this.batch = {}
        this.listQuery.page = 1
        this.batch.subject = this.listQuery.subject
        this.listQuery.examField = null
        this.listQuery.interval = []
        this.listQuery.beginTime = null
        this.listQuery.endTime = null
        this.getList()
      },
      examTimeBlur() {
        if (this.listQuery.interval === null) {
          this.listQuery.interval = []
          this.listQuery.beginTime = null
          this.listQuery.endTime = null
        }
        if (this.listQuery.interval.length !== 0) {
          this.listQuery.beginTime = this.listQuery.interval[0]
          this.listQuery.endTime = this.listQuery.interval[1]
        }
      },
      filterTag(value, row) {
        return row.state === value
      },
      filterHandler(value, row, column) {
        const property = column['property']
        return row[property] === value
      },
      exportExamList() {
        this.expLoading = true
        var subject
        if (this.listQuery.subject === '1') {
          subject = '一'
        } else if (this.listQuery.subject === '2') {
          subject = '二'
        } else if (this.listQuery.subject === '3') {
          subject = '三'
        } else if (this.listQuery.subject === '4') {
          subject = '四'
        }
        this.studentListQuery.subject = subject
        exportExamList(this.studentListQuery).then(response => {
          var time = new Date()
          var blob = new Blob([response.data], { type: 'application/x-xls' })
          var link = document.createElement('a')
          link.href = window.URL.createObjectURL(blob)
          link.download = '考试名单(' + time.toLocaleString() + ').xls'
          link.click()
          this.expLoading = false
        })
      }
    }
  }
</script>
