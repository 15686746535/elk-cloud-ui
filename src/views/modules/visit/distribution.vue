<template>
  <div style="height: 100%">
    <el-card style="height: 100%">
      <el-row :gutter="10" style="margin-bottom: 15px">
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
      <el-row :gutter="5" >
        <el-col :span="16">
          <el-card :style="{height: tableHeight-100 + 'px' }">
            <el-table :data="list" :height="(tableHeight-175)" @selection-change="handleSelectionChange" @row-click="follow"  v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row style="width: 100%">
              <el-table-column type="selection" class="selection" align="center" prop='uuid'></el-table-column>
              <el-table-column type="index" label="序号"  align="center" width="50"></el-table-column>
              <el-table-column  align="center" label="姓名" width="150">
                <template slot-scope="scope">
                  <span>{{scope.row.name}}</span>
                </template>
              </el-table-column>

              <el-table-column align="center" label="性别" width="50">
                <template slot-scope="scope">
                  <span>{{scope.row.sex | sexFilter}}</span>
                </template>
              </el-table-column>


              <el-table-column align="center" label="类别" width="50">
                <template slot-scope="scope">
                  <span>{{scope.row.customerType}}</span>
                </template>
              </el-table-column>

              <el-table-column align="center" label="渠道">
                <template slot-scope="scope">
                  <span>{{scope.row.source}}</span>
                </template>
              </el-table-column>

              <el-table-column align="center" label="电话/微信">
                <template slot-scope="scope">
                  <a href="#" style="color: #409eff;text-decoration: underline;" @click="addFollowUp(scope.row)">查看</a>
                </template>
              </el-table-column>
            </el-table>
            <div v-show="!listLoading" class="pagination-container" style="margin-top: 10px;clear: both">
              <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                             :current-page.sync="listQuery.page"
                             background style="float: left"
                             :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit"
                             layout="total, sizes, prev, pager, next" :total="total">
              </el-pagination>
              <div style="float: right;">
                <el-button size="small" style="float:right;margin: 0 5px" @click="distribution" type="primary" v-if="permissions.visit_intention_distribution"><i class="el-icon-refresh"></i>分配</el-button>
                <el-upload class="upload-demo" action="/visit/intention/import"
                           :headers="headers"
                           style="float:right;"
                           :on-success="handleTextSuccess"
                           accept=".xls,.xlsx"
                           :on-error="handleTextError"
                           :show-file-list="false"
                           :before-upload="beforeTextUpload">
                  <el-button size="small"  v-if="permissions.visit_intention_import"><i class="el-icon-upload2"></i>导入</el-button>
                </el-upload>

              </div>
            </div>
          </el-card>

        </el-col>
        <el-col :span="8">
          <el-card :style="{height: tableHeight-100 + 'px' }">
            <div slot="header" class="clearfix">
              <div >
                |&nbsp;<span style="font-size: 16px;font-family: '微软雅黑 Light';color:rgb(145,145,145)">跟进信息</span>
              </div>
              <div id="follow-content" :style="{height: tableHeight-150+'px' }">
                <div class="content-itrm" style="" v-for="up in followUpList">
                  <el-tag>
                    <img :src="up.avatar?up.avatar:'../../../static/img/usreicon_40.png'">
                  </el-tag>
                  <div class="username">{{up.name}}</div>
                  <div class="time">{{up.createTime | formatTime('{y}-{m}-{d} {h}:{i}')}}</div>
                  <div class="content" style="">
                    <p>{{up.content}}</p>
                  </div>
                </div>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
    <el-dialog :modal="false" @close="getList" title="选择负责人" width="350px" :visible.sync="dialogIntentionList">
      <tree-select url="/upms/org/tree" v-model="intentionList.orgId" @org-click="orgClick"></tree-select>

      <el-select :loading="selectLoading" v-model="intentionList.userId" clearable style="width: 100%;margin-top: 20px;" filterable placeholder="负责人">
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
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { userList } from '@/api/upms/user'
  import { removeAllSpace } from '@/utils/validate'
  import { getCommonPage, putIntention } from '@/api/visit/intention'
  import { getToken } from '@/utils/auth'
  import { followUpList, addFollowUp } from '@/api/visit/followup'

  export default {
    name: 'table_intention',
    props: {
      area: Array
    },
    watch: {
      area: function(val) {
        this.tableHeight = val[1]
      }
    },
    data() {
      return {
        tableHeight: this.area[1],
        list: [],
        total: null,
        followUpList: [],
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
      headers() {
        return {
          'Authorization': 'Bearer ' + getToken()
        }
      }
    },
    methods: {
      getList() {
        this.listLoading = true
        getCommonPage(this.listQuery).then(response => {
          this.list = response.data.data.list
          this.total = response.data.data.totalCount
          this.listLoading = false
        })
      },
      // 根据部门id查询员工
      searchByOrg(data) {
        if (data) {
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
      follow(row, event, column) {
        followUpList({ intentionId: row.intentionId }).then(response => {
          this.followUpList = response.data.data
        })
        // var intention = {
        //   intentionId: row.intentionId,
        //   name: row.name
        // }
        // this.$store.dispatch('setIntention', intention)
        // document.getElementById('vl-tool-right').classList.add('show')
      },
      addFollowUp(row) {
        var followUp = {
          intentionId: row.intentionId,
          content: '查看联系方式'
        }
        addFollowUp(followUp).then(() => {
          this.getList()
          this.$message.success('已转入我的意向，请到我的意向信息查看')
        })
      },
      handleSelectionChange(val) {
        this.intentionList.intentionIds = []
        for (var i = 0; i < val.length; i++) {
          this.intentionList.intentionIds.push(val[i].intentionId)
        }
      },
      orgClick() {
        this.selectLoading = true
        userList({ orgId: this.intentionList.orgId }).then(response => {
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
        this.$store.dispatch('setLoading', true)
        return true
      },
      handleTextSuccess(res, file) {
        this.$store.dispatch('setLoading', false)
        if (res.code === 0) {
          this.$message.success(res.msg)
          this.getList()
        } else {
          this.$message.error(res.msg)
        }
      },
      handleTextError(err, file, fileList) {
        this.$message.error('上传失败')
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  #follow-content{
    padding: 35px 10px 20px 35px;
    overflow: auto;

    .content-itrm{
      border-left: 2px solid #1E9FFF;
      min-height: 100px;
      padding-bottom: 25px;

      .el-tag{
        float: left;
        width: 35px;
        height: 35px;
        border-radius: 50%;
        margin-left: -19px;
        margin-top: -12px;
        padding: 0px;
        overflow: hidden;
        background: #1E9FFF;

        img{
          width: 33px;
          height: 33px;
          border-radius: 50%;
        }
      }
      .username{
        float: left;
        color: rgb(73, 80, 96);
        font-size: 12px;
        margin-left: 10px;
        font-weight: 600;
        width: 80px;
      }
      .time{
        float: left;
        color: #FF6C60;
        font-size: 12px;
      }
      .content{
        clear: both;
        white-space:normal;
        width: 100%;
        padding: 0 10px 0 40px;
        p{
          font-size: 12px;
          border-radius: 10px;
          white-space:normal;
          color: #606266;
          line-height: 20px;
        }
      }
    }
  }
</style>

