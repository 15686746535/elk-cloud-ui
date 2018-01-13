<template>
  <div class="app-container calendar-list-container">
    <div v-show="showModule=='list'">
      <el-card style="margin-bottom: 5px;">
        <div class="filter-container">
          <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="关键词" v-model="listQuery.roleName"></el-input>
          <el-button class="filter-item" type="primary" v-waves icon="search" @click="search">搜索</el-button>
          <el-button class="filter-item" style="margin-left: 10px;" @click="create" type="primary" icon="create">添加</el-button>
        </div>
      </el-card>
      <el-card>
        <el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit
                  highlight-current-row style="width: 100%">
          <el-table-column type="selection" class="selection" align="center" prop='uuid'></el-table-column>
          <el-table-column type="index" label="序号"  align="center" width="50"></el-table-column>
          <el-table-column label="组织id">
            <template slot-scope="scope">
              <span>{{scope.row.orgId}}</span>
            </template>
          </el-table-column>
          <el-table-column label="微信 openID">
            <template slot-scope="scope">
              <span>{{scope.row.openId}}</span>
            </template>
          </el-table-column>
          <el-table-column label="密码">
            <template slot-scope="scope">
              <span>{{scope.row.password}}</span>
            </template>
          </el-table-column>
          <el-table-column label="档案号">
            <template slot-scope="scope">
              <span>{{scope.row.archivesNumber}}</span>
            </template>
          </el-table-column>
          <el-table-column label="学员名字">
            <template slot-scope="scope">
              <span>{{scope.row.name}}</span>
            </template>
          </el-table-column>
          <el-table-column label="性别 1男 2女">
            <template slot-scope="scope">
              <span>{{scope.row.sex}}</span>
            </template>
          </el-table-column>
          <el-table-column label="年龄">
            <template slot-scope="scope">
              <span>{{scope.row.age}}</span>
            </template>
          </el-table-column>
          <el-table-column label="身份证">
            <template slot-scope="scope">
              <span>{{scope.row.idNumber}}</span>
            </template>
          </el-table-column>
          <el-table-column label="生日">
            <template slot-scope="scope">
              <span>{{scope.row.birthday}}</span>
            </template>
          </el-table-column>
          <el-table-column label="电话1">
            <template slot-scope="scope">
              <span>{{scope.row.mobile}}</span>
            </template>
          </el-table-column>
          <el-table-column label="电话2">
            <template slot-scope="scope">
              <span>{{scope.row.phone}}</span>
            </template>
          </el-table-column>
          <el-table-column label="邮件">
            <template slot-scope="scope">
              <span>{{scope.row.email}}</span>
            </template>
          </el-table-column>
          <el-table-column label="微信">
            <template slot-scope="scope">
              <span>{{scope.row.wechat}}</span>
            </template>
          </el-table-column>
          <el-table-column label="头像">
            <template slot-scope="scope">
              <span>{{scope.row.avatar}}</span>
            </template>
          </el-table-column>
          <el-table-column label="联系地址">
            <template slot-scope="scope">
              <span>{{scope.row.contactAddress}}</span>
            </template>
          </el-table-column>
          <el-table-column label="家庭地址">
            <template slot-scope="scope">
              <span>{{scope.row.homeAddress}}</span>
            </template>
          </el-table-column>
          <el-table-column label="单位">
            <template slot-scope="scope">
              <span>{{scope.row.company}}</span>
            </template>
          </el-table-column>
          <el-table-column label="职位">
            <template slot-scope="scope">
              <span>{{scope.row.position}}</span>
            </template>
          </el-table-column>
          <el-table-column label="入学时间">
            <template slot-scope="scope">
              <span>{{scope.row.enrolTime}}</span>
            </template>
          </el-table-column>
          <el-table-column label="期数">
            <template slot-scope="scope">
              <span>{{scope.row.periods}}</span>
            </template>
          </el-table-column>
          <el-table-column label="总学时">
            <template slot-scope="scope">
              <span>{{scope.row.period}}</span>
            </template>
          </el-table-column>
          <el-table-column label="纬度">
            <template slot-scope="scope">
              <span>{{scope.row.latitude}}</span>
            </template>
          </el-table-column>
          <el-table-column label="经度">
            <template slot-scope="scope">
              <span>{{scope.row.longitude}}</span>
            </template>
          </el-table-column>
          <el-table-column label="是否体检 1是 2否">
            <template slot-scope="scope">
              <span>{{scope.row.physicalExamination}}</span>
            </template>
          </el-table-column>
          <el-table-column label="是否有车 1是 2否">
            <template slot-scope="scope">
              <span>{{scope.row.haveCar}}</span>
            </template>
          </el-table-column>
          <el-table-column label="是否增驾 1是 2否">
            <template slot-scope="scope">
              <span>{{scope.row.addDrive}}</span>
            </template>
          </el-table-column>
          <el-table-column label="学员状态 -1退学  5毕业">
            <template slot-scope="scope">
              <span>{{scope.row.state}}</span>
            </template>
          </el-table-column>
          <el-table-column label="拿证时间">
            <template slot-scope="scope">
              <span>{{scope.row.graduationTime}}</span>
            </template>
          </el-table-column>
          <el-table-column label="有效期">
            <template slot-scope="scope">
              <span>{{scope.row.periodOfValidity}}</span>
            </template>
          </el-table-column>
          <el-table-column label="上车日期">
            <template slot-scope="scope">
              <span>{{scope.row.aboardTime}}</span>
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
          <el-table-column label="创建时间/通过时间">
            <template slot-scope="scope">
              <span>{{scope.row.createTime}}</span>
            </template>
          </el-table-column>
          <el-table-column label="更新时间/回访时间">
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
  import { fetchList, getObj } from '@/api/student'
  import waves from '@/directive/waves/index.js' // 水波纹指令

  export default {
    name: 'table_student',
    directives: {
      waves
    },
    data() {
      return {
        student: {},
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
        this.student = {}
        this.showModule = 'info'
      },
      update(row) {
        getObj(row.roleId)
          .then(response => {
            this.student = response.data
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
