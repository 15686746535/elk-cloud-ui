<template>
  <div class="complaint" style="height: 100%;">
    <el-card style="height: 100%" v-show="showModule=='list'">
      <dict v-model="listQuery.condition" dictType="dict_campus" style="width: 200px;height: 40px;"  placeholder="校区"></dict>
      <el-select style="width: 200px;height: 40px;"  v-model="listQuery.state" clearable placeholder="状态">
        <el-option key="1" label="已完结" value="1"> </el-option>
        <el-option key="0" label="处理中" value="0"> </el-option>
      </el-select>
      <el-input @keyup.enter.native="search" style="width: 200px;height: 40px;" class="filter-item" placeholder="关键字" v-model="listQuery.condition" clearable></el-input>
      <el-button class="filter-item" type="primary"  icon="el-icon-search" style="margin-bottom: 15px" @click="search">搜索</el-button>
      <!--数据表格 @select="selectRow" @select-all="selectRow"  -->
      <el-table :key='0'  :height="tableHeight-190" :data="list" @row-dblclick="info" v-loading="listLoading" :stripe="true" :fit="false" element-loading-text="给我一点时间" border fit highlight-current-row style="width: 100%" >
        <el-table-column type="index" label="序号" fixed align="center" width="50"></el-table-column>
        <!--<el-table-column type="selection" width="35" fixed></el-table-column>-->
        <el-table-column label="状态" fixed width="80">
          <template slot-scope="scope">
            <el-tag  v-if="scope.row.state==1" type="success">已完结</el-tag>
            <el-tag v-if="scope.row.state==0" type="warning">处理中</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="学员" fixed width="80">
          <template slot-scope="scope">
            <span>{{scope.row.name}}</span>
          </template>
        </el-table-column>
        <el-table-column label="联系电话" fixed width="110">
          <template slot-scope="scope">
            <span>{{scope.row.mobile}}</span>
          </template>
        </el-table-column>
        <el-table-column label="类型" width="50">
          <template slot-scope="scope">
            <span>{{scope.row.type}}</span>
          </template>
        </el-table-column>
        <el-table-column label="投诉板块" width="110">
          <template slot-scope="scope">
            <span>{{scope.row.category}}</span>
          </template>
        </el-table-column>
        <el-table-column label="诉说内容"  width="130">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" :content="scope.row.content" placement="top-start">
              <div class="table_text">
                <span>{{scope.row.content}}</span>
              </div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="受理方式" width="80">
          <template slot-scope="scope">
            <span>{{scope.row.source}}</span>
          </template>
        </el-table-column>
        <el-table-column label="学员意见/诉求" width="130">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" :content="scope.row.appeal" placement="top-start">
              <div class="table_text">
                <span>{{scope.row.appeal}}</span>
              </div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="校区" width="100" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{scope.row.campus}}</span>
          </template>
        </el-table-column>
        <el-table-column label="责任部门" width="100">
          <template slot-scope="scope">
            <span>{{scope.row.orgName}}</span>
          </template>
        </el-table-column>
        <el-table-column label="受理人" width="80">
          <template slot-scope="scope">
            <span>{{scope.row.receiver}}</span>
          </template>
        </el-table-column>
        <el-table-column label="核实处理时间" width="100">
          <template slot-scope="scope">
            <span>{{scope.row.answerTime | subTime}}</span>
          </template>
        </el-table-column>
        <el-table-column label="核实处理结果" width="130">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" :content="scope.row.answer" placement="top-start">
              <div class="table_text">
                <span>{{scope.row.answer}}</span>
              </div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="抽查回访" width="130">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" :content="scope.row.verify" placement="top-start">
              <div class="table_text">
                <span>{{scope.row.verify}}</span>
              </div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="备注" width="130">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" :content="scope.row.remark" placement="top-start">
              <div class="table_text">
                <span>{{scope.row.remark}}</span>
              </div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="受理日期" width="100">
          <template slot-scope="scope">
            <span>{{scope.row.createTime | subTime}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="50" align="center">
          <template slot-scope="scope">
            <a href="#" style="color: -webkit-link;text-decoration: underline;" v-if="scope.row.state == 0" @click="achieve(scope.row.id)" type="success">完结</a>
          </template>
        </el-table-column>
      </el-table>
      <!--分页插件-->
      <div v-show="!listLoading" class="pagination-container" style="margin-top: 20px;">
        <el-pagination style="float: left" @size-change="handleSizeChange" @current-change="handleCurrentChange"
                       :current-page.sync="listQuery.page"
                       :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit"
                       layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
        <el-button style="float: right" @click="create" v-if="permissions.stu_complaint_add" type="primary"><i class="el-icon-plus"></i> 添 加</el-button>
      </div>
    </el-card>
    <el-card style="height: 100%;overflow: auto" v-show="showModule=='info'">
      <el-form :model="complaint" :rules="rules" ref="complaint" label-width="120px" size="mini" class="demo-ruleForm">
        <el-form-item prop="studentId">
          <span slot="label" class="text_css">学员：</span>
          <el-select v-if="edit" style="width: 100%;" v-model="complaint.studentId" size="medium"  filterable remote reserve-keyword placeholder="输入关键字检索"
                     :remote-method="getStudentList" :loading="studentListLoading">
            <el-option v-for="student in studentList" :key="student.studentId" :label="student.name" :value="student.studentId">
            </el-option>
          </el-select>
          <div style="padding-left: 16px;font-size: 12px;" v-else>{{complaint.name}}</div>
        </el-form-item>
        <el-form-item prop="source" v-if="!edit">
          <span slot="label" class="text_css">联系方式：</span>
          <div style="padding-left: 16px;font-size: 12px;">{{complaint.mobile}}</div>
        </el-form-item>
        <el-form-item prop="source">
          <span slot="label" class="text_css">受理方式：</span>
          <dict v-if="edit" v-model="complaint.source" dictType="dict_complaint_source" size="medium" placeholder="受理方式"></dict>
          <div style="padding-left: 16px;font-size: 12px;" v-else>{{complaint.source}}</div>
        </el-form-item>
        <el-form-item prop="type">
          <span slot="label" class="text_css">类型：</span>
          <el-radio-group v-if="edit" v-model="complaint.type">
            <el-radio label="投诉" value="" selected>投诉</el-radio>
            <el-radio label="建议">建议</el-radio>
          </el-radio-group>
          <div style="padding-left: 16px;font-size: 12px;" v-else>{{complaint.type}}</div>
        </el-form-item>
        <el-form-item prop="category">
          <span slot="label" class="text_css">投诉板块：</span>
          <dict v-if="edit" v-model="complaint.category" size="medium"  dictType="dict_complaint_category" placeholder="投诉板块"></dict>
          <div style="padding-left: 16px;font-size: 12px;" v-else>{{complaint.category}}</div>
        </el-form-item>
        <el-form-item prop="content">
          <span slot="label" class="text_css">诉说内容：</span>
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 2}" v-if="edit"  v-model="complaint.content" placeholder="诉说内容"></el-input>
          <div style="padding-left: 16px;font-size: 12px;" v-else>{{complaint.content}}</div>
        </el-form-item>
        <el-form-item prop="appeal">
          <span slot="label" class="text_css">学员意见/诉求：</span>
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 2}" v-if="edit"  v-model="complaint.appeal" placeholder="学员意见/诉求"></el-input>
          <div style="padding-left: 16px;font-size: 12px;" v-else>{{complaint.appeal}}</div>
        </el-form-item>
        <el-form-item prop="dutyOrg">
          <span slot="label" class="text_css">校区：</span>
          <dict size="medium" v-if="edit" v-model="complaint.campus" dictType="dict_campus" style="height: 40px;width: 100%;"  placeholder="校区"></dict>
          <div style="padding-left: 16px;font-size: 12px;" v-else>{{complaint.campus}}</div>
        </el-form-item>
        <el-form-item prop="dutyOrg">
          <span slot="label" class="text_css">责任部门：</span>
          <tree-select v-if="edit"   url="/upms/org/tree" id="dutyOrg" v-model="complaint.dutyOrg" style="height: 40px;width: 100%;"  placeholder="责任部门"></tree-select>
          <div style="padding-left: 16px;font-size: 12px;" v-else>{{complaint.orgName}}</div>
        </el-form-item>
        <el-form-item prop="answerTime">
          <span slot="label" class="text_css">核实处理时间：</span>
          <el-date-picker v-if="edit" v-model="complaint.answerTime" type="date" placeholder="回复时间" size="medium" style="height: 40px;width: 100%;" format="yyyy-MM-dd" value-format="timestamp"> </el-date-picker>
          <div style="padding-left: 16px;font-size: 12px;" v-else>{{complaint.answerTime | subTime}}</div>
        </el-form-item>
        <el-form-item prop="answer">
          <span slot="label" class="text_css">核实处理结果：</span>
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 2}" v-if="edit"  v-model="complaint.answer" placeholder="核实处理结果"></el-input>
          <div style="padding-left: 16px;font-size: 12px;" v-else>{{complaint.answer}}</div>
        </el-form-item>
        <el-form-item prop="verify">
          <span slot="label" class="text_css">抽查回访：</span>
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 2}" v-if="edit"  v-model="complaint.verify" placeholder="抽查回访"></el-input>
          <div style="padding-left: 16px;font-size: 12px;" v-else>{{complaint.verify}}</div>
        </el-form-item>
        <el-form-item prop="remark">
          <span slot="label" class="text_css">备注：</span>
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 2}" v-if="edit"  v-model="complaint.remark" placeholder="备注"></el-input>
          <div style="padding-left: 16px;font-size: 12px;" v-else>{{complaint.remark}}</div>
        </el-form-item>
        <el-form-item prop="verify" v-if="!edit">
          <span slot="label" class="text_css">受理人：</span>
          <div style="padding-left: 16px;font-size: 12px;" >{{complaint.receiver}}</div>
        </el-form-item>
        <el-form-item prop="verify" v-if="!edit">
          <span slot="label" class="text_css">受理日期：</span>
          <div style="padding-left: 16px;font-size: 12px;" >{{complaint.createTime | subTime}}</div>
        </el-form-item>
        <el-row v-if="edit">
          <div  align="center">
            <el-button type="info" @click="cancel('complaint')"><i class="el-icon-fa-undo"></i> 取 消</el-button>
            <el-button type="success" v-if="!isAdd" :loading="btnLoading"  @click="update('complaint')"><i class="el-icon-fa-save"></i> 保 存</el-button>
            <el-button type="success" v-if="isAdd" :loading="btnLoading" @click="add('complaint')"><i class="el-icon-fa-save"></i> 创 建</el-button>
          </div>
        </el-row>
        <el-row v-else>
          <div align="center">
            <el-button type="info" @click="cancel(null)"><i class="el-icon-fa-undo"></i> 取 消</el-button>
            <el-button type="primary" @click="setEdit"  v-if="permissions.stu_complaint_update"><i class="el-icon-edit"></i> 编 辑</el-button>
          </div>
        </el-row>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { fetchList, putObj, addObj } from '@/api/basis/complaint'
import { fetchStudentList } from '@/api/student/student'
import { mapGetters } from 'vuex'

export default {
  name: 'table_complaint',
  directives: {
  },
  props: {
    linkId: Number,
    display: String,
    layerid: String,
    area: Array
  },
  watch: {
    area: function(val) {
      this.tableHeight = val[1]
    }
  },
  filters: {
  },
  computed: {
    ...mapGetters([
      'permissions',
      'client'
    ])
  },
  data() {
    return {
      tableHeight: this.area[1],
      complaint: {},
      studentList: [],
      list: [],
      total: null,
      edit: false,
      isAdd: false,
      studentListLoading: false,
      listLoading: true,
      btnLoading: false,
      showModule: 'list',
      rules: {
        studentId: [
          { required: true, message: '此处必填', trigger: ['blur', 'change'] }
        ],
        source: [
          { required: true, message: '此处必填', trigger: ['blur', 'change'] }
        ],
        type: [
          { required: true, message: '此处必填', trigger: ['blur', 'change'] }
        ],
        category: [
          { required: true, message: '此处必填', trigger: ['blur', 'change'] }
        ],
        content: [
          { required: true, message: '此处必填', trigger: ['blur', 'change'] }
        ],
        appeal: [
          { required: true, message: '此处必填', trigger: ['blur', 'change'] }
        ],
        dutyOrg: [
          { required: true, message: '此处必填', trigger: ['blur', 'change'] }
        ]
      },
      listQuery: {
        page: 1,
        limit: 20
      },
      studentListQuery: {
        page: 1,
        limit: 0,
        condition: null
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.data.data.list
        console.log(this.list)
        this.total = response.data.data.totalCount
        this.listLoading = false
      })
    },
    // 获取所有学员
    getStudentList(query) {
      if (query) {
        this.studentListLoading = true
        this.studentListQuery.condition = query
        fetchStudentList(this.studentListQuery).then(response => {
          this.studentList = response.data.data.list
          console.log(response.data.data.list)
          this.studentListLoading = false
        })
      } else {
        this.studentList = []
      }
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },
    selectRow(selection, row) {
      console.log(selection)
    },
    achieve(id) {
      console.log(id)
      var complaint = {
        id: id,
        state: 1
      }
      putObj(complaint).then(response => {
        if (response.data.code === 0) {
          this.getList()
        }
      })
    },
    info(row, event) {
      this.complaint = row
      this.showModule = 'info'
      console.log(row)
    },
    setEdit() {
      this.getStudentList(this.complaint.name)
      this.edit = true
    },
    create() {
      this.complaint = { type: '投诉' }
      this.showModule = 'info'
      this.edit = true
      this.isAdd = true
    },
    add(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.btnLoading = true
          this.complaint.state = 0
          addObj(this.complaint).then(response => {
            if (response.data.code === 0) {
              this.cancel(formName)
            }
          })
        }
      })
    },
    update(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.btnLoading = true
          putObj(this.complaint).then(response => {
            if (response.data.code === 0) {
              this.cancel(formName)
            }
          })
        }
      })
    },
    search() {
      this.listQuery.page = 1
      this.getList()
    },
    cancel(formName) {
      if (formName) {
        this.$refs[formName].resetFields()
      }
      this.edit = false
      this.isAdd = false
      this.btnLoading = false
      this.showModule = 'list'
      this.getList()
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .table_text{
    color: #7c7c7c;font-size: 12px;text-align: left;
    word-break:keep-all;/* 不换行 */
    white-space:nowrap;/* 不换行 */
    overflow:hidden;/* 内容超出宽度时隐藏超出部分的内容 */
    text-overflow:ellipsis;/* 当对象内文本溢出时显示省略标记(...) ；需与overflow:hidden;一起使用。*/
  }
</style>
