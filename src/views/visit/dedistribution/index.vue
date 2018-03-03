<template>
  <div class="app-container calendar-list-container" :style="{height: client.height + 'px'}">

    <el-row :gutter="5">
      <el-col class="org-tree-left">
        <el-card>
          <span style="font-size: 16px;font-family: '微软雅黑 Light';color:rgb(145,145,145)">权限筛选</span>
          <org-tree @node-click="searchByOrg" ></org-tree>
        </el-card>
      </el-col>
      <el-col :style="{width: (client.width-250) + 'px'}">
        <el-card style="margin-bottom: 5px;height: 80px;">
          <!--<el-date-picker v-model="interval" type="daterange" align="right" unlink-panels range-separator="—" start-placeholder="来访时间" end-placeholder="来访时间" :picker-options="pickerOptions">-->
          <!--</el-date-picker>-->
          <dict dictType="dict_customer_type" v-model="listQuery.customerType" style="width: 200px;"  placeholder="类别"></dict>
          <dict dictType="dict_source" v-model="listQuery.source" style="width: 200px;"  placeholder="来源渠道"></dict>
          <el-input @keyup.enter.native="search" style="width: 200px;" class="filter-item" placeholder="姓名/电话/微信" v-model="listQuery.condition"></el-input>
          <el-button class="filter-item" type="primary" v-waves icon="search" @click="search">搜索</el-button>
          <el-button class="filter-item" style="margin-left: 10px;" type="primary">上传</el-button>
          <el-button class="filter-item" style="margin-left: 10px;" @click="open" type="success" icon="plus">重新分配</el-button>
        </el-card>

        <el-card :style="{height: (client.height-125) + 'px'}">
          <el-table :data="list" :height="(client.height-205)" @selection-change="handleSelectionChange"  v-loading="listLoading" element-loading-text="给我一点时间" border fithighlight-current-row style="width: 100%">
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




        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { fetchList, addObj, getObj, putObj, getOperator } from '@/api/visit/intention'
  import OrgTree from '@/components/OrgTree'
  import Dict from '@/components/Dict'
  import waves from '@/directive/waves/index.js'// 水波纹指令

  export default {
    name: 'table_intention',
    components: {
      OrgTree,
      Dict
    },
    directives: {
      waves
    },
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
          state: null,
          operator: null,
          followUp: true
        },
        interval: [],
        intentionList: {
          intentionIds: [],
          state: null
        }
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
      }
    },
    methods: {
      getList() {
        console.log('=====================   所有未分配来访信息   =======================')
        this.listLoading = true
        fetchList(this.listQuery).then(response => {
          this.list = response.data.data.list
          this.total = response.data.data.totalCount
          this.listLoading = false
        })
      },
      // 根据部门id查询员工
      searchByOrg(data) {
        console.log('=====================   根据部门id查询来访信息   =======================')
        this.listQuery.page = 1
        // this.listQuery.orgId = data.id
        // this.getList()
      },
      // 搜索
      search() {
        this.listQuery.page = 1
        this.getList()
      },
      open() {
        this.$confirm('是否将选择信息重新分配', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '移交成功'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消移交'
          })
        })
      },
      handleSelectionChange(val) {
        this.intentionList.intentionIds = []
        for (var i = 0; i < val.length; i++) {
          this.intentionList.intentionIds.push(val[i].intentionId)
        }
      }
    }
  }
</script>

<style>

</style>

