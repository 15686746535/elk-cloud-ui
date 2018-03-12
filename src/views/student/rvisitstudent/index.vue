<template>
  <div class="app-container calendar-list-container">
    <div v-show="showModule=='list'">
      <el-row :gutter="10">
        <el-col :span="24" style='margin-top:15px;width: 100%'>
          <div class="filter-container" style="float: left">
            |&nbsp;<span style="font-size: 20px;font-weight: 600;font-family: '微软雅黑 Light'">回访列表</span>
          </div>
          <div style="float: right">
            <el-input @keyup.enter.native="handleFilter" style="width: 300px;" class="filter-item" placeholder="姓名/电话/身份证" v-model="listQuery.condition"></el-input>
            <el-button class="filter-item" type="primary" v-waves @click="handleFilter">搜索</el-button>
          </div>


        </el-col>

        <el-col :span="4" style='margin-top:15px; text-align: center'>
          <el-card>
            <el-row><span style="font-size: 16px;font-weight: 600;font-family: '微软雅黑 Light'">部门筛选</span>
            </el-row>

            <!-- 分割线 -->
            <el-row><el-col> <hr style="border: none; border-bottom:1px solid #d3dce6; "/> </el-col></el-row>

            <el-row  style="overflow: auto"><org-tree @node-click="searchByOrg" ></org-tree>
            </el-row>
          </el-card>
        </el-col>
        <el-col :span="20" style='margin-top:15px;'>
          <el-card>
            <el-table :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit
                      highlight-current-row style="width: 100%">
              <!--<el-table-column type="selection" class="selection" align="center" prop='uuid'></el-table-column>-->
              <el-table-column type="index" label="序号"  align="center" width="50"></el-table-column>
              <el-table-column label="姓名">
                <template slot-scope="scope">
                  <span>{{scope.row.name}}</span>
                </template>
              </el-table-column>
              <el-table-column  width="165px" label="身份证">
                <template slot-scope="scope">
                  <span>{{scope.row.idNumber}}</span>
                </template>
              </el-table-column>
              <el-table-column label="性别">
                <template slot-scope="scope">
                  <span>{{scope.row.sex | sexFilter}}</span>
                </template>
              </el-table-column>
              <el-table-column label="车型">
                <template slot-scope="scope">
                  <span>{{scope.row.moctorcycleType}}</span>
                </template>
              </el-table-column>
              <el-table-column label="电话">
                <template slot-scope="scope">
                  <span>{{scope.row.mobile}}</span>
                </template>
              </el-table-column>
              <el-table-column label="科目">
                <template slot-scope="scope">
                  <span>{{scope.row.subject}}</span>
                </template>
              </el-table-column>
              <el-table-column width="210px" label="是否回访">
                <template slot-scope="scope">
                  <el-tag class="subject">
                    <el-tag v-if="scope.row.rvisitFlag == 1" class="pass">已回访</el-tag>
                    <el-tag v-else class="noPass">未回访</el-tag>
                  </el-tag>
                </template>
              </el-table-column>

              <el-table-column align="center" width="120px" label="操作">
                <template slot-scope="scope">
                  <el-button size="mini" type="success"
                             @click="update(scope.row)">登记
                  </el-button>
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
        </el-col>
      </el-row>
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
  import { fetchList, getObj } from '@/api/student/rvisitstudent'
  import { removeAllSpace } from '@/utils/validate'
  import OrgTree from '@/components/OrgTree'
  import waves from '@/directive/waves/index.js' // 水波纹指令

  export default {
    name: 'table_rvisitstudent',
    directives: {
      waves
    },
    components: {
      OrgTree
    },
    data() {
      return {
        rvisitstudent: {},
        list: [],
        total: null,
        listLoading: true,
        showModule: 'list',
        listQuery: {
          page: 1,
          limit: 20,
          orgId: ''
        },
        dialogStatus: ''
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
        this.rvisitstudent = {}
        this.showModule = 'info'
      },
      update(row) {
        getObj(row.roleId)
          .then(response => {
            this.rvisitstudent = response.data
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
      handleFilter() {
        this.listQuery.page = 1
        this.getUserList()
      },
      // 根据部门id查询员工
      searchByOrg(data) {
        console.log('=====================   根据部门id查询员工信息   =======================')
        this.listQuery.page = 1
        this.listQuery.orgId = data.id
        this.getList()
      }
    }
  }
</script>

<style>
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
</style>
