<template>
  <div class="app-container calendar-list-container" :style="{height: $store.state.app.client.height + 'px'}">
    <div v-show="showModule=='list'">
      <!--<el-card body-style="padding:10px 20px;" style="margin-bottom: 5px;height: 60px">-->
      <!--<div class="filter-container">-->
      <!--<div style="float: right">-->
      <!--<el-input @keyup.enter.native="searchClick" style="width: 200px;" class="filter-item" placeholder="接送人/接送名单" v-model="shuttleLogQuery.condition"></el-input>-->
      <!--<el-button class="filter-item" type="primary"  @click="searchClick">搜索</el-button>-->
      <!--</div>-->
      <!--</div>-->
      <!--</el-card>-->
      <el-card :style="{height: ($store.state.app.client.height - 45) + 'px'}">
        <div class="filter-container">
          <div style="float: left;line-height: 40px">
            |&nbsp;<span style="font-size: 18px;font-weight: 600;font-family: '微软雅黑 Light'">接送列表</span>
          </div>
          <div style="float: right">
            <el-input @keyup.enter.native="searchClick" style="width: 200px;" class="filter-item" placeholder="接送人/接送名单" v-model="shuttleLogQuery.condition"></el-input>
            <el-button class="filter-item" type="primary"  @click="searchClick">搜索</el-button>
          </div>
        </div>
        <el-table :data="shuttleList"  :height="($store.state.app.client.height-195)"  v-loading="shuttleLogLoading" element-loading-text="给我一点时间"  fit highlight-current-row style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-table :data="props.row.studentList" element-loading-text="给我一点时间"  fit highlight-current-row style="width: 100%">
                <el-table-column align="center" label="学员">
                  <template slot-scope="scope">
                    <span>{{scope.row.studentName}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="电话">
                  <template slot-scope="scope">
                    <span>{{scope.row.mobile}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="时间">
                  <template slot-scope="scope">
                    <span>{{scope.row.relayTime}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="地址">
                  <template slot-scope="scope">
                    <span>{{scope.row.relayAddress}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="状态">
                  <template slot-scope="scope">
                    <span v-show="scope.row.state === '0'" style="color:#E6A23C">未接送</span>
                    <span v-show="scope.row.state === '1'" style="color:#67c23a">已接送</span>
                    <span v-show="scope.row.state === '2'" style="color:#f56c6c">已取消</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="未接送原因">
                  <template slot-scope="scope">
                    <span>{{scope.row.undeliveredReason}}</span>
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </el-table-column>
          <el-table-column type="index" label="序号"  align="center" width="50"></el-table-column>
          <el-table-column align="center" label="接送人">
            <template slot-scope="scope">
              <span>{{scope.row.name}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="接送区域">
            <template slot-scope="scope">
              <span>{{scope.row.region}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="接送日期">
            <template slot-scope="scope">
              <span>{{scope.row.shuttleTime | subTime}}</span>
            </template>
          </el-table-column>


        </el-table>
        <div v-show="!shuttleLogLoading" class="pagination-container" style="margin-top: 20px">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                         :current-page.sync="shuttleLogQuery.page" background
                         style="float: left"
                         :page-sizes="[10,20,30, 50]" :page-size="shuttleLogQuery.limit"
                         layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>
          <el-button style="float:right;" @click="create" type="primary"><i class="el-icon-plus"></i>添加</el-button>
        </div>
      </el-card>
    </div>
    <div v-show="showModule=='info'">
      <el-card :style="{height: ($store.state.app.client.height - 45) + 'px'}">
        <el-row class="filter-container">
          <div style="float: left;line-height: 40px">
            |&nbsp;<span style="font-size: 18px;font-weight: 600;font-family: '微软雅黑 Light'">接送列表</span>
          </div>
          <div style="float: right">
            <el-button class="filter-item" type="primary"  @click="backClick">返 回</el-button>
          </div>
        </el-row>
        <el-row :gutter="5">
          <el-col :span="8">
            <el-card :style="{height: ($store.state.app.client.height - 145) + 'px'}" shadow="never">
              <div class="filter-container">
                <!--<div style="float: left;line-height: 28px">-->
                  <!--|&nbsp;<span style="font-size: 16px;font-weight: 600;font-family: '微软雅黑 Light'">未安排名单</span>-->
                <!--</div>-->
                <div style="float: right">
                  <el-input @keyup.enter.native="searchClick" size="mini" style="width: 200px" class="filter-item" placeholder="接送人/接送名单" v-model="shuttleLogQuery.condition"></el-input>
                  <el-button class="filter-item" type="primary" size="mini" @click="backClick">搜索</el-button>
                </div>
              </div>
              <el-table :data="shuttleList" :height="($store.state.app.client.height - 260)" border style="width: 100%"
                        @selection-change="handleSelectionChange" highlight-current-row v-loading="notShuttleListLoading" element-loading-text="给我一点时间">
                <el-table-column type="selection" class="selection" align="center" prop='uuid'></el-table-column>
                <el-table-column type="index" align="center" label="编号" width="50">
                </el-table-column>
                <el-table-column align="center" label="姓名">
                  <template slot-scope="scope">
                    <span>{{scope.row.name}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="电话">
                  <template slot-scope="scope">
                    <span>{{scope.row.name}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="详细地址">
                  <template slot-scope="scope">
                    <span>{{scope.row.name}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="常接送人">
                  <template slot-scope="scope">
                    <span>{{scope.row.name}}</span>
                  </template>
                </el-table-column>
              </el-table>

              <div style="float: right;margin-top: 12px;" >
                <el-button type="primary" size="mini"><i class="el-icon-plus"></i> 添 加</el-button>
                <el-button type="primary" size="mini"><i class="el-icon-fa-bus"></i> 接 送</el-button>
              </div>
            </el-card>
          </el-col>
          <el-col :span="16">
            <el-card :style="{height: ($store.state.app.client.height - 145) + 'px'}" shadow="never">

              <div class="filter-container">
                <!--<div style="float: left;line-height: 28px">-->
                  <!--|&nbsp;<span style="font-size: 16px;font-weight: 600;font-family: '微软雅黑 Light'">已安排名单</span>-->
                <!--</div>-->
                <div style="float: right">
                  <el-input @keyup.enter.native="searchClick" size="mini" style="width: 200px" class="filter-item" placeholder="接送人/接送名单" v-model="shuttleLogQuery.condition"></el-input>
                  <el-button class="filter-item" type="primary" size="mini" @click="backClick">搜索</el-button>
                </div>
              </div>

              <el-table :data="shuttleList"  :height="($store.state.app.client.height-260)"  v-loading="notShuttleListLoading" element-loading-text="给我一点时间"  fit highlight-current-row style="width: 100%">
                <el-table-column type="expand">
                  <template slot-scope="props">
                    <el-table :data="props.row.studentList" element-loading-text="给我一点时间"  fit highlight-current-row style="width: 100%">
                      <el-table-column align="center" label="学员">
                        <template slot-scope="scope">
                          <span>{{scope.row.studentName}}</span>
                        </template>
                      </el-table-column>
                      <el-table-column align="center" label="电话">
                        <template slot-scope="scope">
                          <span>{{scope.row.mobile}}</span>
                        </template>
                      </el-table-column>
                      <el-table-column align="center" label="地址">
                        <template slot-scope="scope">
                          <span>{{scope.row.relayAddress}}</span>
                        </template>
                      </el-table-column>
                    </el-table>
                  </template>
                </el-table-column>
                <el-table-column type="index" label="序号"  align="center" width="50"></el-table-column>
                <el-table-column align="center" label="接送人">
                  <template slot-scope="scope">
                    <span>{{scope.row.name}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="电话">
                  <template slot-scope="scope">
                    <span>{{scope.row.region}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="人数">
                  <template slot-scope="scope">
                    <span>{{scope.row.region}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="接送日期">
                  <template slot-scope="scope">
                    <span>{{scope.row.shuttleTime | subTime}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="操作">
                  <template slot-scope="scope">
                    <el-button type="danger" size="mini"><i class="el-icon-delete"></i> 删 除</el-button>
                  </template>
                </el-table-column>


              </el-table>
              <div v-show="!shuttledListLoading" class="pagination-container" style="margin-top: 12px;">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                               :current-page.sync="shuttleLogQuery.page" background
                               style="float: left"
                               :page-sizes="[10,20,30, 50]" :page-size="shuttleLogQuery.limit"
                               layout="total, sizes, prev, pager, next, jumper" :total="total">
                </el-pagination>
                <div style="float: right;" >
                  <el-button type="primary" size="mini"><i class="el-icon-plus"></i> 添 加</el-button>
                  <el-button type="primary" size="mini"><i class="el-icon-fa-bus"></i> 接 送</el-button>
                </div>
              </div>



            </el-card>
          </el-col>
        </el-row>
      </el-card>
    </div>
  </div>
</template>

<script>
  import { fetchList, getObj } from '@/api/bespeak/shuttle'
  import { mapGetters } from 'vuex'
  import { removeAllSpace } from '@/utils/validate'

  export default {
    name: 'table_shuttle',
    computed: {
      ...mapGetters([
        'permissions',
        'client'
      ])
    },
    data() {
      return {
        shuttle: {},
        shuttleList: [],
        total: null,
        shuttleLogLoading: true,
        shuttledListLoading: false,
        notShuttleListLoading: false,
        showModule: 'list',
        shuttleLogQuery: {
          page: 1,
          limit: 20
        }
      }
    },
    created() {
      this.getShuttleList()
    },
    methods: {
      /* 获取查看页面接送名单 */
      getShuttleList() {
        this.shuttleLogLoading = true
        fetchList(this.shuttleLogQuery).then(response => {
          console.log('=========== 接送名单 ==========')
          console.log(response.data)
          this.shuttleList = response.data.data.list
          this.total = response.data.data.totalCount
          this.shuttleLogLoading = false
        })
      },
      handleSizeChange(val) {
        this.shuttleLogQuery.limit = val
        this.getShuttleList()
      },
      handleCurrentChange(val) {
        this.shuttleLogQuery.page = val
        this.getShuttleList()
      },
      /* 转到管理页面 */
      create() {
        this.shuttle = {}
        this.showModule = 'info'
      },
      /* 修改 */
      update(row) {
        getObj(row.roleId)
          .then(response => {
            this.shuttle = response.data
            this.showModule = 'info'
          })
      },
      /* 搜索 */
      searchClick() {
        this.shuttleLogQuery.page = 1
        this.getShuttleList()
      },
      /* 返回list */
      backClick() {
        this.showModule = 'list'
      },
      /* 被接送人集合 */
      handleSelectionChange() {
      }
    }
  }
</script>
