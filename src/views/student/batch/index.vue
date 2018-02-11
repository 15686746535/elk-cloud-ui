<template>
  <div class="app-container calendar-list-container" :style="{height: client.height + 'px'}" >
    <el-card style="margin-bottom: 5px;height: 80px">
      <div class="filter-container">
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
        <el-button @click="create" type="primary"><i class="el-icon-plus"></i>添加</el-button>
      </div>
    </el-card>
    <el-card :style="{height: (client.height - 125) + 'px'}">
      <el-table :key='tableKey' :data="list" v-loading="listLoading" :max-height="client.height - 225" element-loading-text="给我一点时间" border fit
                highlight-current-row style="width: 100%;text-align: center;">
        <el-table-column type="selection" class="selection" align="center" prop='uuid'></el-table-column>
        <el-table-column type="index" label="序号"  align="center" width="50"></el-table-column>
        <el-table-column align="center"  label="科目">
          <template slot-scope="scope">
            <span>{{scope.row.subject == 1?'科目一':scope.row.subject == 2?'科目二':scope.row.subject == 3?'科目三':scope.row.subject == 4?'科目四':''}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center"  label="考试时间">
          <template slot-scope="scope">
            <span>{{scope.row.examTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</span>
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
        <el-table-column align="center" label="批次">
          <template slot-scope="scope">
            <span>{{scope.row.batch}}</span>
          </template>
        </el-table-column>
        <!--<el-table-column label="备注">-->
          <!--<template slot-scope="scope">-->
            <!--<span>{{scope.row.remark}}</span>-->
          <!--</template>-->
        <!--</el-table-column>-->
        <!--<el-table-column label="操作人">-->
          <!--<template slot-scope="scope">-->
            <!--<span>{{scope.row.operator}}</span>-->
          <!--</template>-->
        <!--</el-table-column>-->
        <!--<el-table-column label="创建时间">-->
          <!--<template slot-scope="scope">-->
            <!--<span>{{scope.row.createTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</span>-->
          <!--</template>-->
        <!--</el-table-column>-->
        <!--<el-table-column label="更新时间">-->
          <!--<template slot-scope="scope">-->
            <!--<span>{{scope.row.updateTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</span>-->
          <!--</template>-->
        <!--</el-table-column>-->

        <el-table-column align="center" fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="see(scope.row)" plain>查 看</el-button>
            <el-button size="mini" type="primary" @click="see(scope.row)">编 辑</el-button>
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

    <el-dialog title="考试设置" width="30%" :visible.sync="dialogFormVisible">

      <el-form :model="batch" label-width="100px">
        <el-form-item label="考试场地">
          <el-input v-model="batch.examField" placeholder="考试场地"></el-input>
        </el-form-item>
        <el-form-item label="考试时间">
          <el-date-picker style="width: 100%" type="date" placeholder="考试时间" v-model="batch.examTime"></el-date-picker>
        </el-form-item>
        <el-form-item label="考试科目">
          <el-select v-model="batch.subject"  style="width: 100%"  clearable placeholder="考试科目">
            <el-option
              v-for="item in subject"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>


      <!--<el-input style="line-height: 50px;" v-model="batch.examField" placeholder="考试场地"></el-input>-->
      <!--<el-date-picker style="line-height: 50px;width: 100%" type="date" placeholder="考试时间" v-model="batch.examTime"></el-date-picker>-->
      <!--<el-input style="line-height: 50px;" v-model="batch.subject" placeholder="考试科目"></el-input>-->
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel('batch')">取 消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="create('batch')">确 定</el-button>
        <el-button v-else type="primary" @click="update('batch')">修 改</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import { fetchList, getObj } from '@/api/student/batch'
  import { mapGetters } from 'vuex'
  import waves from '@/directive/waves/index.js' // 水波纹指令

  export default {
    name: 'table_batch',
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
          subject: null
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
        dialogFormVisible: false,
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
        fetchList(this.listQuery).then(response => {
          console.log(response.data)
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
      create() {
        this.batch = {}
        this.dialogFormVisible = true
      },
      see(val) {
        this.batch = val
        this.dialogFormVisible = true
      },
      update(row) {
        console.log(row)
        getObj(row.roleId)
          .then(response => {
            this.batch = response.data
          })
      },
      search() {
        this.listQuery.page = 1
        this.getList()
      },
      delete(id) {
        this.getList()
      },
      cancel(formName) {
        this.dialogFormVisible = false
        const set = this.$refs
        set[formName].resetFields()
      }
    }
  }
</script>
