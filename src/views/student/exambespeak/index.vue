<template>
  <div class="app-container calendar-list-container" :style="{height: client.height + 'px'}">

    <el-row :gutter="5" :style="{height: (client.height - 45) + 'px'}">

      <el-col :span="12">
        <el-card>
          <div style="border-bottom: 20px;height: 60px">
            <div @click="handleField(1,$event)" class="subjectBtn" >科目一</div>
            <div @click="handleField(2,$event)" class="subjectBtn" >科目二</div>
            <div @click="handleField(3,$event)" class="subjectBtn" >科目三</div>
            <div @click="handleField(4,$event)" class="subjectBtn" >科目四</div>
            <el-input v-model="studentListQuery.condition" :style="{width: (client.width/7) + 'px'}" placeholder="姓名/身份证/电话" ></el-input>
            <el-button type="primary" v-waves @click="search" >搜索</el-button>
          </div>
          <el-table @row-click="clickOld" :data="studentOld" :height="(client.height-205)" v-loading="listOldLoading" element-loading-text="给我一点时间" border fithighlight-current-row style="width: 100%">
            <!--<el-table-column type="selection" class="selection" align="center" prop='uuid'></el-table-column>-->
            <el-table-column type="index" label="序号"  align="center" width="50"></el-table-column>
            <el-table-column label="姓名">
              <template slot-scope="scope">
                <span>{{scope.row.name}}</span>
              </template>
            </el-table-column>

            <el-table-column label="身份证">
              <template slot-scope="scope">
                <span>{{scope.row.idNumber}}</span>
              </template>
            </el-table-column>

            <el-table-column label="电话">
              <template slot-scope="scope">
                <span>{{scope.row.phone}}</span>
              </template>
            </el-table-column>

          </el-table>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <el-button v-waves @click="handleBespeak" type="primary" style=" float: right; margin-bottom: 20px;">预 约</el-button>

          <el-table  @row-click="clickNew"  :data="studentNew"   :height="(client.height-205)" border fithighlight-current-row style="width: 100%">
            <!--<el-table-column type="selection" class="selection" align="center" prop='uuid'></el-table-column>-->
            <el-table-column type="index" label="序号"  align="center" width="50"></el-table-column>
            <el-table-column label="姓名">
              <template slot-scope="scope">
                <span>{{scope.row.name}}</span>
              </template>
            </el-table-column>

            <el-table-column label="身份证">
              <template slot-scope="scope">
                <span>{{scope.row.idNumber}}</span>
              </template>
            </el-table-column>

            <el-table-column label="电话">
              <template slot-scope="scope">
                <span>{{scope.row.phone}}</span>
              </template>
            </el-table-column>
          </el-table>

          <el-dialog :close-on-click-modal="false" title="选择批次" width="30%" :visible.sync="dialogFormBespeak">
            <div :style="{height: (client.height)/3 +'px'}">
              <div class="batchCss"  v-for="batch in batchList" @click="batchClick($event,batch)" style="float: left;margin: 5px">
                {{batch.examTime | subTime}}
              </div>
            </div>
            <div slot="footer" class="dialog-footer">
              <el-button @click="cancel">取 消</el-button>
              <el-button type="primary" @click="create">确 定</el-button>
            </div>
          </el-dialog>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import waves from '@/directive/waves/index.js'
  import { fetchList } from '@/api/student/student'
  import { addObj } from '@/api/student/exambespeak'
  import { getBatchList } from '@/api/student/batch'
  import { mapGetters } from 'vuex'// 水波纹指令

  export default {
    name: 'table_exambespeak',
    directives: {
      waves
    },
    data() {
      return {
        studentOld: [],
        studentNew: [],
        batchList: [],
        total: null,
        listNewLoading: true,
        listOldLoading: true,
        studentListQuery: {
          page: 1,
          limit: 20,
          subject: 1,
          condition: null
        },
        batchListQuery: {
          page: 1,
          limit: 20,
          subject: 1
        },
        examBespeakList: {
          studentIds: [],
          state: 1,
          batchId: null
        },
        dialogFormBespeak: false
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
        this.listNewLoading = true
        this.listOldLoading = true
        console.log(' ====== =============  这是查询条件  ==================')
        console.log(this.studentListQuery)
        fetchList(this.studentListQuery).then(response => {
          console.log(' ====== =============  这是所有学员信息  ==================')
          console.log(response.data)
          this.studentOld = response.data.data.list
          this.total = response.data.data.totalCount
          this.listNewLoading = false
        })
        getBatchList(this.batchListQuery).then(response => {
          console.log(' ===================  这是所有批次信息  ==================')
          console.log(response.data)
          this.batchList = response.data.data.list
          this.total = response.data.data.totalCount
          this.listOldLoading = false
        })
      },
      // 根据科目查询场地
      handleField(field, e) {
        this.studentListQuery.page = 1
        this.studentListQuery.subject = field
        this.batchListQuery.subject = field
        this.studentNew = []
        var a = document.getElementsByClassName('subjectBtn')
        for (var i = 0; i < a.length; i++) {
          a[i].classList.remove('subjectBtn_selected')
        }
        e.currentTarget.classList.add('subjectBtn_selected')
        this.getList()
      },
      cancel() {
        this.dialogFormBespeak = false
      },
      create() {
        this.dialogFormBespeak = false
        console.log('================== 这里是添加批次 ====================')
        console.log(this.examBespeakList)
        addObj(this.examBespeakList).then(response => {
        })
      },
      clickOld(row) {
        this.studentNew.push(row)
        this.examBespeakList.studentIds.push(row.studentId)
        this.delNodeId(this.studentOld, row)
      },
      clickNew(row) {
        this.studentOld.push(row)
        this.delNodeId(this.studentNew, row)
        this.delNodeId(this.examBespeakList.studentIds, row.studentId)
      },
      delNodeId(student, id) {
        for (var i = 0; i < student.length; i++) {
          if (student[i] === id) student.splice(i, 1)
        }
      },
      handleBespeak() {
        console.log(this.examBespeakList)
        if (this.studentNew.length !== 0) {
          this.dialogFormBespeak = true
        } else {
          this.$alert('请先选择报考学员', '提示', {
            confirmButtonText: '确定',
            type: 'info'
          })
        }
        this.cleanBatchSelected()
        this.examBespeakList.batchId = null
      },
      cleanBatchSelected() {
        var a = document.getElementsByClassName('batchCss')
        for (var i = 0; i < a.length; i++) {
          a[i].classList.remove('batchCss_selected')
        }
      },
      batchClick(e, batch) {
        this.examBespeakList.batchId = batch.batchId
        var a = document.getElementsByClassName('batchCss')
        for (var i = 0; i < a.length; i++) {
          a[i].classList.remove('batchCss_selected')
        }
        e.currentTarget.classList.add('batchCss_selected')
      },
      hasClass(classList, clazz) {
        for (var i = 0; i < classList.length; i++) {
          if (classList[i] === clazz) {
            return true
          }
        }
        return false
      },
      search() {
        this.getList()
      }
    }
  }
</script>
<style>
  .batchCss{
    background-color: rgba(64,158,255,.1);
    display: inline-block;
    padding: 0 10px;
    height: 32px;
    line-height: 30px;
    font-size: 12px;
    color: #409eff;
    border-radius: 4px;
    box-sizing: border-box;
    border: 1px solid rgba(64,158,255,.2);
    white-space: nowrap;
    cursor: pointer;
  }
  .batchCss_selected{
    background-color: rgba(103,194,58,.1);
    border-color: rgba(103,194,58,.2);
    color: #67c23a;
  }
  .batchCss:hover{
    background-color: rgba(103,194,58,.1);
    border-color: rgba(103,194,58,.2);
    color: #67c23a;
  }
  .subjectBtn{
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    border: 1px solid #c2e7b0;
    -webkit-appearance: none;
    text-align: center;
    box-sizing: border-box;
    outline: none;
    margin: 0;
    transition: .1s;
    font-weight: 500;
    padding: 12px 20px;
    font-size: 14px;
    border-radius: 4px;
    color: #67c23a;
    background: #f0f9eb;
  }
  .subjectBtn:hover{
    color: #fff;
    background-color: #67c23a;
    border-color: #67c23a;
  }
  .subjectBtn_selected{
    color: #fff;
    background-color: #67c23a;
    border-color: #67c23a;
  }
</style>
