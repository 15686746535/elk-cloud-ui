<template>
  <div class="app-container calendar-list-container" :style="{height: client.height + 'px'}" >
    <el-card style="margin-bottom: 5px;height: 80px">
      <div class="filter-container">
        <el-date-picker style="width: 360px;" v-model="listQuery.interval" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
        </el-date-picker>
        <el-select v-model="listQuery.subject" clearable placeholder="科目">
          <el-option
            v-for="item in subject"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-select v-model="listQuery.subject" clearable placeholder="考场">
          <el-option
            v-for="item in subject"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-button type="primary" v-waves @click="search" >搜索</el-button>
        <el-button @click="handleCreate" type="primary"><i class="el-icon-plus"></i>添加</el-button>
      </div>
    </el-card>
    <el-card :style="{height: (client.height - 125) + 'px'}">
      <el-table :key='tableKey' :data="list"  :style="{height: (client.height-130) + 'px'}" v-loading="listLoading" :max-height="client.height - 225" element-loading-text="给我一点时间" border fithighlight-current-row style="width: 100%;text-align: center;">
        <el-table-column type="selection" class="selection" align="center" prop='uuid'></el-table-column>
        <el-table-column type="index" label="序号"  align="center" width="50"></el-table-column>
        <el-table-column align="center"  label="科目">
          <template slot-scope="scope">
            <span>{{scope.row.subject == 1?'科目一':scope.row.subject == 2?'科目二':scope.row.subject == 3?'科目三':scope.row.subject == 4?'科目四':''}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center"  label="考试时间">
          <template slot-scope="scope">
            <span>{{scope.row.examTime | parseTime('{y}-{m}-{d}')}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center"  label="考试场地">
          <template slot-scope="scope">
            <span>{{scope.row.examField}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center"  label="人数">
          <template slot-scope="scope">
            <span>{{scope.row.stuCount}}</span>
          </template>
        </el-table-column>

        <!--<el-table-column align="center" label="批次">-->
          <!--<template slot-scope="scope">-->
            <!--<span>{{scope.row.batch}}</span>-->
          <!--</template>-->
        <!--</el-table-column>-->

        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="see(scope.row)" plain>查 看</el-button>
            <el-button size="mini" type="primary" @click="handleUpdate(scope.row)">编 辑</el-button>
          </template>
        </el-table-column>

      </el-table>
      <div v-show="!listLoading" class="pagination-container" style="margin-top: 20px">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                       :current-page.sync="listQuery.page" background
                       :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit"
                       layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </el-card>

    <el-dialog title="考试设置" :show-close="false" width="30%" :visible.sync="batchOption">

      <el-form :model="batch"  ref="batch" label-width="100px">
        <el-form-item label="考试科目">
          <el-select @blur="setDictType" v-model="batch.subject"  style="width: 100%"  clearable placeholder="考试科目">
            <el-option
              v-for="item in subject"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="考试场地">
          <span v-if="batch.subject != null">
            <span v-show="'1' === batch.subject"><dict v-model="batch.examField" dictType="dict_exam_field1" style="width: 100%;"  placeholder="科目一考试场地"></dict></span>
            <span v-show="'2' === batch.subject"><dict v-model="batch.examField" dictType="dict_exam_field2" style="width: 100%;"  placeholder="科目二考试场地"></dict></span>
            <span v-show="'3' === batch.subject"><dict v-model="batch.examField" dictType="dict_exam_field3" style="width: 100%;"  placeholder="科目三考试场地"></dict></span>
            <span v-show="'4' === batch.subject"><dict v-model="batch.examField" dictType="dict_exam_field4" style="width: 100%;"  placeholder="科目四考试场地"></dict></span>
          </span>
          <span v-else><dict dictType="null" style="width: 100%;"  placeholder="考试场地"  ></dict></span>
        </el-form-item>
        <el-form-item label="人数"  prop="username">
          <el-input v-model="batch.stuCount" placeholder="人数" ></el-input>
        </el-form-item>
        <el-form-item label="考试时间">
          <el-date-picker style="width: 100%" type="date" placeholder="考试时间" v-model="batch.examTime"></el-date-picker>
        </el-form-item>
        <!--<el-form-item label="批次"  prop="username">-->
          <!--<el-input v-model="batch.batch" placeholder="批次" ></el-input>-->
        <!--</el-form-item>-->

      </el-form>


      <!--<el-input style="line-height: 50px;" v-model="batch.examField" placeholder="考试场地"></el-input>-->
      <!--<el-date-picker style="line-height: 50px;width: 100%" type="date" placeholder="考试时间" v-model="batch.examTime"></el-date-picker>-->
      <!--<el-input style="line-height: 50px;" v-model="batch.subject" placeholder="考试科目"></el-input>-->
      <div slot="footer">
        <el-button @click="cancel('batch')">取 消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="create('batch')">确 定</el-button>
        <el-button v-else type="primary" @click="update('batch')">修 改</el-button>
      </div>
    </el-dialog>


    <el-dialog title="考试计划操作" :visible.sync="examOption">
      <el-table :data="list" :height="(client.height/2)" v-loading="listLoading" element-loading-text="给我一点时间" border fithighlight-current-row style="width: 100%;">
        <el-table-column type="selection" class="selection" align="center" prop='uuid'></el-table-column>
        <el-table-column type="index" label="序号" align="center" width="50"></el-table-column>
        <el-table-column label="学员">
          <template slot-scope="scope">
            <span>{{scope.row.examField}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="see(scope.row)">取消约考</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div v-show="!listLoading" class="pagination-container" style="margin-top: 20px">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                       :current-page.sync="listQuery.page" background
                       :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit"
                       layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>

    </el-dialog>


  </div>
</template>

<script>
  import { getBatchList, getObj, addObj, putObj } from '@/api/student/batch'
  import { mapGetters } from 'vuex'
  import Dict from '@/components/Dict'
  import waves from '@/directive/waves/index.js' // 水波纹指令

  export default {
    name: 'table_batch',
    components: {
      Dict
    },
    directives: {
      waves
    },
    data() {
      return {
        batch: {},
        list: [],
        total: null,
        listLoading: true,
        listQuery: {
          page: 1,
          limit: 20,
          subject: null,
          interval: null
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
        examOption: false
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
          console.log(response.data)
          this.list = response.data.data.list
          this.total = response.data.data.totalCount
          this.listLoading = false
        })
      },
      setDictType() {
        console.log(this.batch.subject)
      },
      handleSizeChange(val) {
        this.listQuery.limit = val
        this.getList()
      },
      handleCurrentChange(val) {
        this.listQuery.page = val
        this.getList()
      },
      handleCreate() {
        this.batch = {}
        this.dialogStatus = 'create'
        this.batchOption = true
      },
      handleUpdate(val) {
        this.batch = val
        this.dialogStatus = 'update'
        this.batchOption = true
      },
      see(val) {
        this.examOption = true
      },
      create(formName) {
        const set = this.$refs
        console.log(this.batch)
        set[formName].validate(valid => {
          if (valid) {
            addObj(this.batch)
              .then(() => {
                this.batchOption = false
                this.getList()
                this.$notify({
                  title: '成功',
                  message: '创建成功',
                  type: 'success',
                  duration: 2000
                })
              })
          } else {
            return false
          }
        })
      },
      cancel(formName) {
        this.batchOption = false
        this.batch = {}
        const set = this.$refs
        set[formName].resetFields()
        this.getList()
      },
      update(formName) {
        const set = this.$refs
        set[formName].validate(valid => {
          if (valid) {
            putObj(this.batch).then(() => {
              this.batchOption = false
              this.getList()
              this.$notify({
                title: '成功',
                message: '修改成功',
                type: 'success',
                duration: 2000
              })
            })
          } else {
            return false
          }
        })
      },
      search() {
        this.listQuery.page = 1
        this.getList()
      },
      delete(id) {
        this.getList()
      }
      // ,
      // cancel(formName) {
      //   this.batchOption = false
      //   const set = this.$refs
      //   set[formName].resetFields()
      // }
    }
  }
</script>
