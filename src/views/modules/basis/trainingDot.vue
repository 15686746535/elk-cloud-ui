<template xmlns:v-popover="http://www.w3.org/1999/xhtml">
  <div style="height: 100%">
    <el-card style="height: 100%">
      <div style="height: 60px">
        <el-radio-group @change="handleSubject" v-model="listQuery.type">
          <el-radio-button label="dict_training_field2">科目二</el-radio-button>
          <el-radio-button label="dict_training_field3">科目三</el-radio-button>
        </el-radio-group>
      </div>
      <el-table :key='tableKey' :data="list" v-loading="listLoading" :height="tableHeight-180"  element-loading-text="给我一点时间" border fit highlight-current-row style="width: 100%">
        <el-table-column type="index" align="center" label="编号" width="50">
        </el-table-column>
        <el-table-column align="center"  label="培训场地">
          <template slot-scope="scope">
            <span>{{ scope.row.label }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="描述">
          <template slot-scope="scope">
            <span>{{ scope.row.description }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="排序">
          <template slot-scope="scope">
            <el-popover ref="popover" placement="right" title="提示" width="200" trigger="hover" content="依据数字大小排序，数字越大排名越后">
            </el-popover>
            <span v-popover:popover>{{ scope.row.sort }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="创建时间">
          <template slot-scope="scope">
            <span>{{ scope.row.createTime | subTime }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button v-if="menu_upd" size="small" type="success"
                       @click="handleUpdate(scope.row)">编辑
            </el-button>
            <el-button v-if="menu_del" size="mini" type="danger"
                       @click="handleDelete(scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div v-show="!listLoading" class="pagination-container" style="margin-top: 10px">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                       :current-page.sync="listQuery.page" background
                       style="float:left;"
                       :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit"
                       layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
        <el-button v-if="menu_add" class="filter-item" style="margin-left: 10px;float: right" @click="createClick" type="primary" icon="edit">添加</el-button>
      </div>

    </el-card>
    <el-dialog :modal="false" @close="cancel('dict')" :title="textMap[dialogStatus]" width="550px" :visible.sync="dialogFormVisible">
      <el-form label-position="left" :model="dict" :rules="rules" ref="dict" label-width="100px">
        <el-form-item label="训练场地"  prop="label">
          <el-input v-model="dict.label" placeholder="训练场地" ></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input v-model="dict.description" placeholder="描述" ></el-input>
        </el-form-item>
        <el-form-item label="排序(升)" prop="sort">
          <el-popover ref="popover" placement="right" title="提示" width="200" trigger="hover" content="依据数字大小排序，数字越大排名越后">
          </el-popover>
          <el-input type="number" v-popover:popover v-model.number="dict.sort" placeholder="排序(升序)" ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel('dict')"><i class="el-icon-fa-undo"></i> 取 消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" :loading="btnLoading" @click="create('dict')">确 定</el-button>
        <el-button v-else type="primary" :loading="btnLoading" @click="update('dict')">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import { fetchList, addObj, putObj, delObj } from '@/api/basis/dict'
  import { removeAllSpace } from '@/utils/validate'
  import { mapGetters } from 'vuex'

  export default {
    name: 'table_sys_dict',
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
        lists: [],
        total: null,
        listLoading: true,
        btnLoading: false,
        listQuery: {
          page: 1,
          limit: 20,
          type: 'dict_training_field2'
        },
        rules: {
          label: [
            { required: true, message: '请填写训练场地', trigger: ['blur', 'change'] }
          ],
          description: [
            { required: true, message: '请填写训练场地描述', trigger: ['blur', 'change'] }
          ],
          sort: [
            { required: true, type: 'number', message: '请填写训练场地排序等级', trigger: ['blur', 'change'] }
          ]
        },
        dict: {},
        enrolSite: {},
        dialogFormVisible: false,
        dialogStatus: '',
        menu_add: false,
        menu_upd: false,
        menu_del: false,
        textMap: {
          update: '编辑',
          create: '创建'
        },
        tableKey: 0
      }
    },
    computed: {
      ...mapGetters([
        'permissions',
        'client'
      ])
    },
    created() {
      this.getList()
      this.menu_add = this.permissions['basis_training_dot_add']
      this.menu_upd = this.permissions['basis_training_dot_update']
      this.menu_del = this.permissions['basis_training_dot_del']
    },
    methods: {
      getList() {
        this.listLoading = true
        this.listQuery.orderByField = 'create_time'
        this.listQuery.isAsc = false
        fetchList(this.listQuery).then(response => {
          this.list = response.data.data.list
          this.total = response.data.data.totalCount
          this.listLoading = false
        })
      },
      // 根据科目查询场地
      handleSubject() {
        this.listQuery.page = 1
        this.getList()
      },
      handleSizeChange(val) {
        this.listQuery.limit = val
        this.getList()
      },
      handleCurrentChange(val) {
        this.listQuery.page = val
        this.getList()
      },
      handleDelete(row) {
        this.$confirm('是否删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delObj(row.dictId).then(() => {
            this.dialogFormVisible = false
            this.getList()
          })
        })
      },
      createClick() {
        this.dict = {}
        this.dialogStatus = 'create'
        this.dialogFormVisible = true
      },
      handleUpdate(val) {
        this.dict = val
        this.dialogStatus = 'update'
        this.dialogFormVisible = true
      },
      create(formName) {
        const set = this.$refs
        set[formName].validate(valid => {
          if (valid) {
            this.btnLoading = true
            this.dict.value = this.dict.label
            this.dict.type = this.listQuery.type
            addObj(this.dict)
              .then(() => {
                this.getList()
                set[formName].resetFields()
                this.btnLoading = false
                this.dialogFormVisible = false
              })
          } else {
            return false
          }
        })
      },
      cancel(formName) {
        this.dialogFormVisible = false
        this.dict = {}
        this.enrolSite = {}
        const set = this.$refs
        set[formName].resetFields()
      },
      update(formName) {
        const set = this.$refs
        set[formName].validate(valid => {
          if (valid) {
            this.btnLoading = true
            this.dict.value = this.dict.label
            putObj(this.dict).then(() => {
              this.getList()
              set[formName].resetFields()
              this.btnLoading = false
              this.dialogFormVisible = false
            })
          } else {
            return false
          }
        })
      }
    }
  }
</script>
