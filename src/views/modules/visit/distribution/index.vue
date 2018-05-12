<template>
  <div class="app-container calendar-list-container" :style="{height: $store.state.app.client.height + 'px'}">

    <el-col :style="{width: ($store.state.app.client.width) + 'px'}">
        <el-card body-style="padding:10px 20px;" style="margin-bottom: 5px;height: 50px;">
          <!--<el-date-picker value-format="timestamp" v-model="interval" type="daterange" align="left" unlink-panels range-separator="—" start-placeholder="来访时间" end-placeholder="来访时间" :picker-options="pickerOptions">-->
          <!--</el-date-picker>-->
          <el-row :gutter="10">
            <el-col :xs="6" :sm="6" :md="5" :lg="4">
              <dict dictType="dict_customer_type" size="mini" v-model="listQuery.customerType" placeholder="类别"></dict>
            </el-col>
            <el-col :xs="6" :sm="6" :md="5" :lg="4">
              <dict dictType="dict_source" size="mini" v-model="listQuery.source" placeholder="来源渠道"></dict>
            </el-col>
            <el-col :xs="6" :sm="6" :md="5" :lg="4">
              <el-input @keyup.enter.native="searchClick" size="mini" placeholder="姓名/电话/微信" v-model="listQuery.condition"></el-input>
            </el-col>
            <el-col :xs="6" :sm="6" :md="5" :lg="4">
              <el-button size="mini" type="primary"  icon="search" @click="searchClick"><i class="el-icon-search"></i> 搜 索</el-button>
            </el-col>
          </el-row>
        </el-card>

        <el-card :style="{height: ($store.state.app.client.height-95) + 'px'}">
          <el-table :data="list" :height="($store.state.app.client.height-175)" @selection-change="handleSelectionChange"  v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row style="width: 100%">
            <el-table-column type="selection" class="selection" align="center" prop='uuid'></el-table-column>
            <el-table-column type="index" label="序号"  align="center" width="50"></el-table-column>
            <el-table-column  align="center" label="姓名">
              <template slot-scope="scope">
                <span>{{scope.row.name}}</span>
              </template>
            </el-table-column>

            <el-table-column align="center" label="性别">
              <template slot-scope="scope">
                <span>{{scope.row.sex | sexFilter}}</span>
              </template>
            </el-table-column>


            <el-table-column align="center" label="类别">
              <template slot-scope="scope">
                <span>{{scope.row.customerType}}</span>
              </template>
            </el-table-column>

            <el-table-column align="center" label="渠道">
              <template slot-scope="scope">
                <span>{{scope.row.source}}</span>
              </template>
            </el-table-column>

            <el-table-column align="center" label="电话">
              <template slot-scope="scope">
                <span>{{scope.row.mobile}}</span>
              </template>
            </el-table-column>

            <el-table-column align="center" label="微信">
              <template slot-scope="scope">
                <span>{{scope.row.wechat}}</span>
              </template>
            </el-table-column>

          </el-table>
          <div v-show="!listLoading" class="pagination-container" style="margin-top: 10px;clear: both">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                           :current-page.sync="listQuery.page"
                           background style="float: left"
                           :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit"
                           layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
            <div style="float: right;">
              <el-button size="small" style="float:right;margin: 0 5px" @click="distribution" type="primary"><i class="el-icon-refresh"></i>分配</el-button>
              <el-upload class="upload-demo" action="/visit/intention/import"
                         :headers="headers"
                         style="float:right;"
                         :on-success="handleTextSuccess"
                         :on-error="handleTextError"
                         :show-file-list="false"
                         :before-upload="beforeTextUpload">
                <el-button size="small"><i class="el-icon-upload2"></i>导入</el-button>
              </el-upload>

            </div>
          </div>



        </el-card>
        <el-dialog @close="getList" title="选择负责人" width="350px" :visible.sync="dialogIntentionList">
          <tree-select url="/upms/org/tree" v-model="intentionList.orgId" @org-click="orgClick"></tree-select>

          <el-select :loading="selectLoading" v-model="intentionList.userId" clearable style="width: 100%;margin-top: 20px;" placeholder="负责人">
            <el-option
              v-for="item in userList"
              :key="item.userId"
              :label="item.name"
              :value="item.userId">
            </el-option>
          </el-select>
          <div slot="footer" class="dialog-footer">
            <el-button @click="closeIntention" size="small">取 消</el-button>
            <el-button type="primary" @click="redistribution" size="small">确 定</el-button>
          </div>
        </el-dialog>
      </el-col>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { userList } from '@/api/upms/user'
  import { removeAllSpace } from '@/utils/validate'
  import { fetchList, putIntention } from '@/api/visit/intention'
  import { getToken } from '@/utils/auth'

  export default {
    name: 'table_intention',
    data() {
      return {
        list: [],
        total: null,
        listLoading: true,
        listQuery: {
          page: 1,
          limit: 20,
          orgId: null,
          condition: null,
          source: null,
          customerType: null,
          beginTime: null,
          endTime: null,
          state: -1,
          followUp: true
        },
        interval: [],
        intentionList: {
          intentionIds: [],
          state: 0,
          orgId: null,
          userId: null
        },
        userList: [],
        dialogIntentionList: false,
        selectLoading: false,
        orgId: null
      }
    },
    created() {
      this.getList()
    },
    computed: {
      ...mapGetters([
        'permissions',
        'client'
      ]),
      sexVO() {
        const typeMap = {
          1: '男',
          0: '女'
        }
        return typeMap[this.student.sex]
      },
      headers() {
        return {
          'Authorization': 'Bearer ' + getToken()
        }
      }
    },
    methods: {
      getList() {
        console.log('=====================   所有未分配来访信息   =======================')
        this.listLoading = true
        fetchList(this.listQuery).then(response => {
          this.list = response.data.data.list
          console.log('====== 意向信息 =====')
          console.log(this.list)
          this.total = response.data.data.totalCount
          this.listLoading = false
        })
      },
      // 根据部门id查询员工
      searchByOrg(data) {
        if (data) {
          console.log('=====================   根据部门id查询来访信息   =======================')
          this.listQuery.page = 1
          this.listQuery.orgId = data.id
          this.getList()
        }
      },
      // 搜索
      searchClick() {
        this.listQuery.page = 1
        this.listQuery.condition = removeAllSpace(this.listQuery.condition)
        this.getList()
      },
      distribution() {
        if (this.intentionList.intentionIds.length === 0) {
          this.$message.warning('请选择意向')
        } else {
          this.dialogIntentionList = true
        }
      },
      handleSelectionChange(val) {
        this.intentionList.intentionIds = []
        for (var i = 0; i < val.length; i++) {
          this.intentionList.intentionIds.push(val[i].intentionId)
        }
      },
      orgClick() {
        console.log('..........')
        this.selectLoading = true
        userList({ orgId: this.intentionList.orgId }).then(response => {
          console.log(response.data.data)
          this.userList = response.data.data
          this.selectLoading = false
        })
      },
      redistribution() {
        if (this.intentionList.userId) {
          // this.$confirm('是否将选择信息重新分配', '提示', {
          //   confirmButtonText: '确定',
          //   cancelButtonText: '取消',
          //   type: 'info'
          // }).then(() => {
          console.log('------- 分配信息 -------')
          console.log(this.intentionList)
          putIntention(this.intentionList).then(() => {
            this.$message({
              type: 'success',
              message: '分配成功'
            })
            this.dialogIntentionList = false
          })
          // }).catch(() => {
          //   this.$message({
          //     type: 'info',
          //     message: '已取消分配'
          //   })
          // })
        } else {
          // this.$alert('请先选择学员', '提示', {
          //   confirmButtonText: '确定',
          //   type: 'warning'
          // })
          this.$message({
            type: 'warning',
            message: '请选择负责人'
          })
        }
        console.log(this.orgId)
      },
      closeIntention() {
        this.dialogIntentionList = false
      },
      handleSizeChange(val) {
        this.listQuery.limit = val
        this.getList()
      },
      handleCurrentChange(val) {
        this.listQuery.page = val
        this.getList()
      },
      beforeTextUpload(file) {
        const isXls = (file.type === 'application/vnd.ms-excel') || (file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')

        if (!isXls) {
          this.$message.error('只能上传Excel文件！')
        }

        return isXls
      },
      handleTextSuccess(res, file) {
        this.$message.success('上传成功')
      },
      handleTextError(err, file, fileList) {
        this.$message.error('上传失败')
      }
    }
  }
</script>

<style>

</style>

