<template>
  <div class="app-container calendar-list-container">
    <div v-show="showModule=='list'">
      <el-card style="margin-bottom: 5px;">
        <div class="filter-container">
          <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="关键词" v-model="listQuery.roleName"></el-input>
          <el-button class="filter-item" type="primary" v-waves icon="search" @click="search">搜索</el-button>
          <el-button class="filter-item" style="margin-left: 10px;" @click="create" type="primary" icon="plus">添加</el-button>
        </div>
      </el-card>
      <el-card>
        <el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit
                  highlight-current-row style="width: 100%">
          <el-table-column type="selection" class="selection" align="center" prop='uuid'></el-table-column>
          <el-table-column type="index" label="序号"  align="center" width="50"></el-table-column>
          <el-table-column label="组织ID">
            <template slot-scope="scope">
              <span>{{scope.row.orgId}}</span>
            </template>
          </el-table-column>
          <el-table-column label="客户名字">
            <template slot-scope="scope">
              <span>{{scope.row.name}}</span>
            </template>
          </el-table-column>
          <el-table-column label="咨询车型">
            <template slot-scope="scope">
              <span>{{scope.row.applyType}}</span>
            </template>
          </el-table-column>
          <el-table-column label="咨询内容">
            <template slot-scope="scope">
              <span>{{scope.row.content}}</span>
            </template>
          </el-table-column>
          <el-table-column label="性别">
            <template slot-scope="scope">
              <span>{{scope.row.sex}}</span>
            </template>
          </el-table-column>
          <el-table-column label="电话">
            <template slot-scope="scope">
              <span>{{scope.row.mobile}}</span>
            </template>
          </el-table-column>
          <el-table-column label="微信号">
            <template slot-scope="scope">
              <span>{{scope.row.wechat}}</span>
            </template>
          </el-table-column>
          <el-table-column label="客户类别">
            <template slot-scope="scope">
              <span>{{scope.row.customerType}}</span>
            </template>
          </el-table-column>
          <el-table-column label="联系地址">
            <template slot-scope="scope">
              <span>{{scope.row.contactAddress}}</span>
            </template>
          </el-table-column>
          <el-table-column label="来访日期">
            <template slot-scope="scope">
              <span>{{scope.row.visitTime}}</span>
            </template>
          </el-table-column>
          <el-table-column label="状态标记(来访/待入学/关闭)">
            <template slot-scope="scope">
              <span>{{scope.row.state}}</span>
            </template>
          </el-table-column>
          <el-table-column label="私有标记">
            <template slot-scope="scope">
              <span>{{scope.row.privateFlag}}</span>
            </template>
          </el-table-column>
          <el-table-column label="删除标记">
            <template slot-scope="scope">
              <span>{{scope.row.delFlag}}</span>
            </template>
          </el-table-column>
          <el-table-column label="备注">
            <template slot-scope="scope">
              <span>{{scope.row.remark}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作人">
            <template slot-scope="scope">
              <span>{{scope.row.operator}}</span>
            </template>
          </el-table-column>
          <el-table-column label="创建时间">
            <template slot-scope="scope">
              <span>{{scope.row.createTime}}</span>
            </template>
          </el-table-column>
          <el-table-column label="更新时间">
            <template slot-scope="scope">
              <span>{{scope.row.updateTime}}</span>
            </template>
          </el-table-column>

          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="success"
                         @click="update(scope.row)">编辑
              </el-button>
              <el-button size="mini" type="danger"
                         @click="delete(scope.row)">删除
              </el-button>
            </template>
          </el-table-column>

        </el-table>
        <div v-show="!listLoading" class="pagination-container">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                         :current-page.sync="listQuery.page"
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
  import { fetchList, getObj } from '@/api/visit/client'
  import waves from '@/directive/waves/index.js' // 水波纹指令

  export default {
    name: 'table_client',
    directives: {
      waves
    },
    data() {
      return {
        client: {},
        list: [],
        total: null,
        listLoading: true,
        showModule: 'list',
        listQuery: {
          page: 1,
          limit: 20
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
        this.client = {}
        this.showModule = 'info'
      },
      update(row) {
        getObj(row.roleId)
          .then(response => {
            this.client = response.data
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
