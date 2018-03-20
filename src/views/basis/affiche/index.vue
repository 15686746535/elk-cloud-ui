<template>
  <div class="app-container calendar-list-container" :style="{height: client.height + 'px'}">
    <el-card style="margin-bottom: 5px;height: 80px">
      <el-input @keyup.enter.native="search" style="width: 200px;" class="filter-item" placeholder="关键词" v-model="listQuery.condition"></el-input>
      <el-button class="filter-item" type="primary" v-waves icon="search" @click="handleFilter">搜索</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="plus">添加</el-button>
    </el-card>
    <el-card :style="{height: (client.height - 125) + 'px'}">
      <el-table :data="list" v-loading="listLoading" :height="(client.height-205)" element-loading-text="给我一点时间" border fithighlight-current-row style="width: 100%">
        <!--<el-table-column type="selection" class="selection" align="center" prop='uuid'></el-table-column>-->
        <el-table-column type="index" label="序号"  align="center" width="50"></el-table-column>
        <el-table-column align="center" label="内容">
            <template slot-scope="scope">
                <span>{{scope.row.content}}</span>
            </template>
        </el-table-column>
        <el-table-column align="center" label="发布人">
            <template slot-scope="scope">
                <span>{{scope.row.operator}}</span>
            </template>
        </el-table-column>
        <el-table-column align="center" label="发布日期">
            <template slot-scope="scope">
                <span>{{scope.row.createTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</span>
            </template>
        </el-table-column>
        <el-table-column align="center" label="修改时间">
            <template slot-scope="scope">
                <span>{{scope.row.updateTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</span>
            </template>
        </el-table-column>

        <el-table-column align="center" label="操作">
            <template slot-scope="scope">
                <el-button size="mini" type="success"
                           @click="handleUpdate(scope.row)">编辑
                </el-button>
                <el-button size="mini" type="danger"
                           @click="handleDelete(scope.row)">删除
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
    <el-dialog :title="textMap[dialogStatus]" width="30%" :visible.sync="dialogFormVisible">
      <el-form label-position="left" :model="affiche" :rules="rules" ref="affiche" label-width="100px">
        <el-form-item label="公告内容">
          <el-input type="text" v-model="affiche.content" placeholder="公告内容" ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel('affiche')">取 消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="create('affiche')">确 定</el-button>
        <el-button v-else type="primary" @click="update('affiche')">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { fetchList, addObj, putObj, getObj ,delObj } from '@/api/basis/affiche'
import { removeAllSpace } from '@/utils/validate'
import waves from '@/directive/waves/index.js' // 水波纹指令
import { mapGetters } from 'vuex'

export default {
  name: 'table_affiche',
  directives: {
    waves
  },
  data() {
    return {
      affiche: {},
      list: [],
      total: null,
      listLoading: true,
      showModule: 'list',
      listQuery: {
        page: 1,
        limit: 20
      },
      rules: {},
      textMap: {
        update: '编辑',
        create: '创建'
      },
      dialogStatus: '',
      dialogFormVisible: false
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
    handleFilter() {
      this.listQuery.page = 1
      this.listQuery.condition = removeAllSpace(this.listQuery.condition)
      // if (this.listQuery.content === '') this.listQuery.content = null
      this.getList()
    },
    handleCreate() {
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.affiche = {}
    },
    handleUpdate(val) {
      this.affiche = val
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
    },
    handleDelete(row) {
      console.log(row)
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delObj(row.afficheId)
          .then(response => {
            this.dialogFormVisible = false
            this.getList()
            this.$notify({
              title: '成功',
              message: '删除成功',
              type: 'success',
              duration: 2000
            })
          })
      })
    },
    create(formName) {
      const set = this.$refs
      set[formName].validate(valid => {
        if (valid) {
          addObj(this.affiche)
            .then(() => {
              this.dialogFormVisible = false
              this.getList()
              this.$notify({
                title: '成功',
                message: '创建成功',
                type: 'success',
                duration: 2000
              })
            })
        } else {
          return false
        }
      })
    },
    cancel(formName) {
      this.dialogFormVisible = false
      this.affiche = {}
      const set = this.$refs
      set[formName].resetFields()
    },
    update(formName) {
      const set = this.$refs
      set[formName].validate(valid => {
        if (valid) {
          putObj(this.affiche).then(() => {
            this.dialogFormVisible = false
            this.getList()
            this.$notify({
              title: '成功',
              message: '修改成功',
              type: 'success',
              duration: 2000
            })
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>
