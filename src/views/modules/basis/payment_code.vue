<template xmlns:v-popover="http://www.w3.org/1999/xhtml">
  <div style="height: 100%">
    <el-card style="height: 100%">
      <el-table :key='tableKey' :data="list" v-loading="listLoading" :height="tableHeight-125"  element-loading-text="给我一点时间" border fit highlight-current-row style="width: 100%">
        <el-table-column type="index" align="center" label="编号" width="50">
        </el-table-column>
        <el-table-column align="center"  label="代码">
          <template slot-scope="scope">
            <span>{{ scope.row.code }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center"  label="付款项目">
          <template slot-scope="scope">
            <span>{{ scope.row.content }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center"  label="默认金额">
          <template slot-scope="scope">
            <span>{{ scope.row.money }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="描述">
          <template slot-scope="scope">
            <span>{{ scope.row.remark }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button v-if="permissions.basis_company_update" size="small" type="success"
                       @click="handleUpdate(scope.row)">编辑
            </el-button>
            <el-button v-if="permissions.basis_company_del" size="small" type="danger"
                       @click="handleDelete(scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div v-show="!listLoading" class="pagination-container" style="margin-top: 10px">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                       :current-page.sync="listQuery.page" background
                       style="float: left"
                       :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit"
                       layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
        <el-button v-if="permissions.basis_company_add" class="filter-item" style="float: right" @click="createClick" type="primary"><i class="el-icon-plus"></i>添加</el-button>
      </div>
    </el-card>


    <el-dialog :modal="false" @close="cancel('paymentCode')" :title="textMap[dialogStatus]" width="550px" :visible.sync="dialogFormVisible">
      <el-form label-position="left" :model="paymentCode" :rules="rules" ref="paymentCode" label-width="110px">
        <el-form-item label="代码"  prop="code">
          <el-input v-model="paymentCode.code" placeholder="代码" ></el-input>
        </el-form-item>
        <el-form-item label="付款项目"  prop="content">
          <el-input v-model="paymentCode.content" placeholder="付款项目" ></el-input>
        </el-form-item>
        <el-form-item label="默认金额"  prop="money">
          <el-input v-model="paymentCode.money" placeholder="默认金额" ></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="remark">
          <el-input v-model="paymentCode.remark" placeholder="描述" ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel('paymentCode')"><i class="el-icon-fa-undo"></i> 取 消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" :loading="btnLoading" @click="create('paymentCode')">确 定</el-button>
        <el-button v-else type="primary" :loading="btnLoading" @click="update('paymentCode')">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import { getPage, getObj, addObj, putObj } from '@/api/finance/payment-code'

  import { mapGetters } from 'vuex'

  export default {
    name: 'mode',
    props: {
      area: Array
    },
    watch: {
      area: function(val) {
        this.tableHeight = val[1]
      }
    },
    data() {
      var existence = (rule, value, callback) => {
        getObj(value).then(response => {
          if (response.data.data) {
            if (this.dialogStatus === 'create') {
              callback(new Error('代码重复'))
            } else {
              callback()
            }
          } else {
            callback()
          }
        })
      }
      return {
        tableHeight: this.area[1],
        list: [],
        lists: [],
        total: null,
        listLoading: true,
        btnLoading: false,
        listQuery: {
          page: 1,
          limit: 20
        },
        rules: {
          code: [
            { required: true, message: '请输入代码', trigger: ['blur', 'change'] },
            { validator: existence, trigger: ['blur', 'change'] }
          ],
          content: [
            { required: true, message: '请输入付款项目', trigger: ['blur', 'change'] }
          ],
          money: [
            { required: true, message: '请输入默认金额', trigger: ['blur', 'change'] }
          ]
        },
        paymentCode: {},
        enrolSite: {},
        dialogFormVisible: false,
        dialogStatus: '',
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
    },
    methods: {
      getList() {
        this.listLoading = true
        getPage(this.listQuery).then(response => {
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
      handleDelete(row) {
        this.$confirm('是否删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          row.delFlag = '1'
          putObj(row).then(() => {
            this.dialogFormVisible = false
            this.getList()
          })
        })
      },
      createClick() {
        this.paymentCode = {}
        this.dialogStatus = 'create'
        this.dialogFormVisible = true
      },
      handleUpdate(val) {
        this.paymentCode = val
        this.dialogStatus = 'update'
        this.dialogFormVisible = true
      },
      create(formName) {
        const set = this.$refs
        set[formName].validate(valid => {
          if (valid) {
            this.btnLoading = true
            addObj(this.paymentCode)
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
        this.getList()
        this.$refs[formName].resetFields()
      },
      update(formName) {
        const set = this.$refs
        set[formName].validate(valid => {
          if (valid) {
            this.btnLoading = true
            putObj(this.paymentCode).then(() => {
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
