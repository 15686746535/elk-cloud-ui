<template>
  <div class="app-container calendar-list-container">
    <div v-show="showModule=='list'">
      <el-card style="margin-bottom: 5px;">
        <div class="filter-container">
          <el-select v-model="listQuery.subject" clearable placeholder="科目">
            <el-option
              v-for="item in subject"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="关键词" v-model="listQuery.roleName"></el-input>
          <el-button class="filter-item" type="primary" v-waves icon="search" @click="search">搜索</el-button>
          <el-button class="filter-item" style="margin-left: 10px;" @click="create" type="primary" icon="plus">添加</el-button>
        </div>
      </el-card>
      <el-card>
        <el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit
                  highlight-current-row style="width: 100%;text-align: center">
          <el-table-column type="selection" class="selection" align="center" prop='uuid'></el-table-column>
          <el-table-column type="index" label="序号"  align="center" width="50"></el-table-column>
          <!--<el-table-column label="组织ID">-->
            <!--<template slot-scope="scope">-->
              <!--<span>{{scope.row.orgId}}</span>-->
            <!--</template>-->
          <!--</el-table-column>-->
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
          <!--<el-table-column label="批次">-->
            <!--<template slot-scope="scope">-->
              <!--<span>{{scope.row.batch}}</span>-->
            <!--</template>-->
          <!--</el-table-column>-->
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

          <el-table-column align="center" fixed="right" label="操作" width="150">
            <template slot-scope="scope">
              <el-row :gutter="10">
                <el-col :span="12"><el-button size="mini" type="success" style="width: 100%"
                         @click="update(scope.row)">查看
                </el-button></el-col>
                <el-col :span="12"><el-button size="mini" type="danger" style="width: 100%"
                           @click="delete(scope.row)">编辑
                </el-button></el-col>
              </el-row>
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
    </div>
    <div v-show="showModule=='info'">
      <el-card>
        <!-- 这里手写 -->

        <div slot="footer" class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button v-if="dialogStatus=='create'" type="primary" @click="create">确 定</el-button>
          <el-button v-else type="primary" @click="update">修 改</el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
  import { fetchList, getObj } from '@/api/student/batch'
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
        showModule: 'list',
        listQuery: {
          page: 1,
          limit: 20,
          subject: null
        },
        tableKey: 0,
        dialogStatus: '',
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
      subjectVO(subject) {
        switch (subject) {
          case 1:
            return '科目一'
          case 2:
            return '科目二'
          case 3:
            return '科目三'
          case 4:
            return '科目四'
          default:
            return ''
        }
      }
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
        this.showModule = 'info'
      },
      update(row) {
        console.log(row)
        getObj(row.roleId)
          .then(response => {
            this.batch = response.data
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
      }
    }
  }
</script>
