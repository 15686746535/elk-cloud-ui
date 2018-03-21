<template>
  <div class="app-container calendar-list-container" :style="{height: client.height + 'px'}">

    <el-row :gutter="5" :style="{height: (client.height - 45) + 'px'}">

      <el-col :span="12">
        <el-card>
          <div style="line-height: 50px;height: 50px;margin-bottom:5px;">
            <div @click="handleField(1,$event)" class="subjectBtn subjectBtn_selected" >科目一</div>
            <div @click="handleField(2,$event)" class="subjectBtn" >科目二</div>
            <div @click="handleField(3,$event)" class="subjectBtn" >科目三</div>
            <div @click="handleField(4,$event)" class="subjectBtn" >科目四</div>
            <el-input v-model="studentListQuery.condition"  @keyup.enter.native="search" :style="{width: (client.width/7) + 'px'}" placeholder="姓名/身份证/电话" ></el-input>
            <el-button type="primary" v-waves @click="handleFilter" >搜索</el-button>
            可预约：{{studentOld.length}}人
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
          <div style="line-height: 50px;height: 50px;margin-bottom:5px;">
            已选择：{{studentNew.length}}人
            <el-button v-waves @click="handleBespeak" type="primary" style=" float: right;">预 约</el-button>
          </div>
          <el-table  @row-click="clickNew" :data="studentNew" :height="(client.height-205)" border fithighlight-current-row style="width: 100%">
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

          <el-dialog @close="cancel" title="选择批次" width="30%" :visible.sync="dialogFormBespeak">
            <div :style="{height: (client.height)/3 +'px'}" style="overflow: auto">
              <div v-for="batch in batchList"  style="float: left;margin: 5px">
                <div class="batchCss" @click="batchClick($event,batch)" style="float: left;">
                  {{batch.examTime | subTime}}&nbsp;{{batch.examField}}
                  <!--{{batch.hasReserved}}/{{batch.stuCount}}-->
                  <span v-if="(batch.stuCount - batch.hasReserved)>0">【剩余 {{batch.stuCount - batch.hasReserved}} 人】</span>
                  <span v-else style="color: crimson">【已满】</span>
                </div>

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
  import { batchsSave } from '@/api/student/exambespeak'
  import { getBatchList, getBatch } from '@/api/student/batch'
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
        studentTotal: null,
        listNewLoading: true,
        listOldLoading: true,
        studentListQuery: {
          page: 1,
          limit: 10000000,
          subject: 1,
          condition: null
        },
        subject: 1,
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
          var studentOldCount = this.studentOld.length
          for (var i = 0; i < studentOldCount; i++) {
            for (var j = 0; j < this.studentNew.length; j++) {
              if (this.studentOld[i].studentId === this.studentNew[j].studentId) {
                this.studentOld.splice(i, 1)
                studentOldCount--
                i--
                break
              }
            }
          }
          this.studentTotal = response.data.data.totalCount
          this.listNewLoading = false
        })
        getBatch(this.subject).then(response => {
          console.log(' ===================  这是所有批次信息  ==================')
          console.log(response.data.data)
          this.batchList = response.data.data
          // this.total = response.data.data.totalCount
          this.listOldLoading = false
        })
      },
      // 根据科目查询场地
      handleField(field, e) {
        this.studentListQuery.page = 1
        this.studentListQuery.subject = field
        this.studentListQuery.condition = null
        this.studentNew = []
        this.examBespeakList.studentIds = []
        this.subject = field
        var a = document.getElementsByClassName('subjectBtn')
        for (var i = 0; i < a.length; i++) {
          a[i].classList.remove('subjectBtn_selected')
        }
        e.currentTarget.classList.add('subjectBtn_selected')
        this.getList()
      },
      cancel() {
        this.examBespeakList.batchId = null
        this.dialogFormBespeak = false
      },
      create() {
        console.log('================== 这里是添加学员到批次 ====================')
        console.log(this.examBespeakList)
        if (this.examBespeakList.batchId === null) {
          this.$alert('请先选择报考批次', '提示', {
            confirmButtonText: '确定',
            type: 'warning'
          })
        } else {
          batchsSave(this.examBespeakList).then(response => {
            this.$notify({
              title: '成功',
              message: '预约成功',
              type: 'success'
            })
            this.dialogFormBespeak = false
            this.examBespeakList.batchId = null
          })
        }
      },
      clickOld(row) {
        var flag = true
        for (var i = 0; i < this.studentNew.length; i++) {
          if (this.studentNew[i].studentId === row.studentId) flag = false
        }
        if (flag) {
          this.studentNew.push(row)
          this.examBespeakList.studentIds.push(row.studentId)
          this.delNodeId(this.studentOld, row.studentId)
        }
      },
      clickNew(row) {
        this.studentOld.push(row)
        this.delNodeId(this.studentNew, row.studentId)
        // this.delNodeId(this.examBespeakList.studentIds, row.studentId)
        for (var i = 0; i < this.examBespeakList.studentIds.length; i++) {
          if (this.examBespeakList.studentIds[i] === row.studentId) {
            this.examBespeakList.studentIds.splice(i, 1)
          }
        }
      },
      delNodeId(student, val) {
        for (var i = 0; i < student.length; i++) {
          if (student[i].studentId === val) {
            student.splice(i, 1)
          }
        }
      },
      handleBespeak() {
        console.log(this.examBespeakList)
        console.log(this.batchList)
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
        console.log(this.examBespeakList.studentIds.length)
        if ((batch.stuCount - batch.hasReserved) >= this.examBespeakList.studentIds.length) {
          this.examBespeakList.batchId = batch.batchId
          var a = document.getElementsByClassName('batchCss')
          for (var i = 0; i < a.length; i++) {
            a[i].classList.remove('batchCss_selected')
          }
          e.currentTarget.classList.add('batchCss_selected')
        } else {
          this.$alert('选择人数大于批次剩余人数,请核对后选择', '警告', {
            confirmButtonText: '确定',
            type: 'error'
          })
        }
      },
      hasClass(classList, clazz) {
        for (var i = 0; i < classList.length; i++) {
          if (classList[i] === clazz) {
            return true
          }
        }
        return false
      },
      handleFilter() {
        this.getList()
      },
      handleSizeChange(val) {
        this.studentListQuery.limit = val
        this.getList()
      },
      handleCurrentChange(val) {
        this.studentListQuery.page = val
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
