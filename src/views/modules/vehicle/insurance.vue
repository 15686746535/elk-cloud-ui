<template>
    <div class="app-container calendar-list-container">
        <div v-show="showModule=='list'">
            <el-card style="margin-bottom: 5px;">
                <div class="filter-container">
                    <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="关键词" v-model="listQuery.roleName"></el-input>
                    <el-button class="filter-item" type="primary"  icon="search" @click="search">搜索</el-button>
                    <el-button class="filter-item" style="margin-left: 10px;" @click="create" type="primary" icon="create">添加</el-button>
                </div>
            </el-card>
            <el-card>
                <el-table key='tableKey' :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit
                          highlight-current-row style="width: 100%">
                    <el-table-column type="selection" class="selection" align="center" prop='uuid'></el-table-column>
                    <el-table-column type="index" label="序号"  align="center" width="50"></el-table-column>
                    <el-table-column label="订单号">
                        <template slot-scope="scope">
                            <span>{{scope.row.orderNum}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="车辆id">
                        <template slot-scope="scope">
                            <span>{{scope.row.vehicleId}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="保险公司名称">
                        <template slot-scope="scope">
                            <span>{{scope.row.companyName}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="保险类型">
                        <template slot-scope="scope">
                            <span>{{scope.row.type}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="起始时间">
                        <template slot-scope="scope">
                            <span>{{scope.row.startTime}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="结束时间">
                        <template slot-scope="scope">
                            <span>{{scope.row.endTime}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作者">
                        <template slot-scope="scope">
                            <span>{{scope.row.operator}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="保额">
                        <template slot-scope="scope">
                            <span>{{scope.row.coverage}}</span>
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
              <el-form :model="insurance" ref="safetyEntity"  label-width="100px" size="mini">
                <el-form-item label="维修费用" prop="cost">
                  <el-input v-model="insurance.cost" placeholder="维修费用" ></el-input>
                </el-form-item>

              </el-form>
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
    import { fetchList, getObj } from '@/api/vehicle/insurance'
    // import waves from '@/directive/waves/index.js' // 水波纹指令

    export default {
      name: 'table_insurance',
      // directives: {
      //   waves
      // },
      data() {
        return {
          insurance: {},
          list: [],
          total: null,
          listLoading: true,
          showModule: 'list',
          listQuery: {
            page: 1,
            limit: 20
          },
          dialogStatus:''
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
          this.insurance = {}
          this.showModule = 'info'
        },
        update(row) {
          getObj(row.roleId)
            .then(response => {
              this.insurance = response.data
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
