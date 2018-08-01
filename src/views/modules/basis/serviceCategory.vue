<template>
  <div style="height: 100%">
    <el-card style="height: 100%">
      <el-table :data="list" v-loading="listLoading"  :height="tableHeight-125"  element-loading-text="给我一点时间" border fit highlight-current-row style="width: 100%">
        <el-table-column type="index" align="center" label="编号" width="50">
      </el-table-column>
      <el-table-column align="center" label="收费服务">
        <template slot-scope="scope">
          <span>{{ scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="价格">
        <template slot-scope="scope">
          <span>{{ scope.row.price}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"  label="收费类型">
        <template slot-scope="scope">
          <span>{{ scope.row.priceType | priceTypeFilter}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="服务类型">
        <template slot-scope="scope">
          <span>{{ scope.row.code | codeFilter}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="收费服务描述">
        <template slot-scope="scope">
          <span>{{ scope.row.remark }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="排序">
        <template slot-scope="scope">
          <span>{{ scope.row.sort}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="创建时间">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime | subTime }}</span>
        </template>
      </el-table-column>
        <el-table-column align="center" label="状态">
          <template slot-scope="scope">
            <el-switch title="禁用、启用" v-model="scope.row.status" @change="handleDisable(scope.row)" :active-value="0" :inactive-value="-1"></el-switch>
          </template>
        </el-table-column>
      <el-table-column align="center" label="操作" >
        <template slot-scope="scope">
          <el-button v-if="update_menu" size="small" type="success"
                     @click="handleUpdate(scope.row)">编辑
          </el-button>
          <!--<el-button v-if="del_menu" size="mini" type="danger"-->
                     <!--@click="handleDelete(scope.row)">删除-->
          <!--</el-button>-->
          <!--<el-button v-if="update_menu&&scope.row.status==0" size="mini" type="info"-->
                     <!--@click="handleDisable(scope.row)">禁用-->
          <!--</el-button>-->
          <!--<el-button v-if="update_menu&&scope.row.status==-1" size="mini" type="primary"-->
                     <!--@click="handleDisable(scope.row)">启用-->
          <!--</el-button>-->
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
      <el-button v-if="add_menu" size="small" style="float: right" @click="createClick" type="primary"><i class="el-icon-plus"></i>添加</el-button>
    </div>
    </el-card>


    <el-dialog :modal="false" @close="cancel('serviceCategory')" :title="textMap[dialogStatus]" width="550px" :visible.sync="dialogFormVisible">
      <el-form label-position="left" :model="serviceCategory" :rules="rules" ref="serviceCategory" label-width="100px">
        <el-form-item label="服务类型" prop="code">
          <el-select v-model="serviceCategory.code" style="width: 100%" placeholder="请选择服务类型">
            <el-option
              v-for="item in codes"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>


        <el-form-item label="收费服务"  prop="name">
          <el-input v-model="serviceCategory.name" placeholder="收费服务" ></el-input>
        </el-form-item>
        <el-form-item label="价格" prop="price">
          <el-input type="number" v-model.number="serviceCategory.price" placeholder="价格" ></el-input>
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input type="number" v-model.number="serviceCategory.sort" placeholder="排序" ></el-input>
        </el-form-item>
        <el-form-item label="收费类型" prop="priceType">
          <el-radio v-model="serviceCategory.priceType" label="0">单次收费</el-radio>
          <el-radio v-model="serviceCategory.priceType" label="1">多次收费</el-radio>
        </el-form-item>
        <el-form-item label="收费服务描述" prop="remark">
          <el-input v-model="serviceCategory.remark" placeholder="收费服务描述" ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel('serviceCategory')"><i class="el-icon-fa-undo"></i> 取 消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="create('serviceCategory')">确 定</el-button>
        <el-button v-else type="primary" @click="update('serviceCategory')">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { getFinanceList, addFinance, putFinance, delFinance } from '@/api/finance/service-category'
  import { removeAllSpace } from '@/utils/validate'
  import { mapGetters } from 'vuex'

  export default {
    name: 'finance_service_category',
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
        listQuery: {
          page: 1,
          limit: 20
        },
        serviceCategory: {
          name: null,
          price: null,
          sort: 1,
          priceType: null,
          code: null,
          remark: null,
          number: 1
        },
        dialogFormVisible: false,
        dialogStatus: '',
        /* 按钮权限 */
        add_menu: false,
        update_menu: false,
        del_menu: false,
        textMap: {
          update: '编辑',
          create: '创建'
        },
        codes: [
          {
            value: '001',
            label: '代收费'
          }, {
            value: '002',
            label: '培训费'
          },
          {
            value: '003',
            label: '服务包'
          }, {
            value: '004',
            label: '活动'
          }
        ],
        rules: {
          name: [
            { required: true, message: '请输入收费服务名字', trigger: ['blur', 'change'] }
          ],
          price: [
            { required: true, message: '请输入价格', trigger: ['blur', 'change'] }
          ],
          priceType: [
            { required: true, message: '请选择收费类型', trigger: ['blur', 'change'] }
          ],
          code: [
            { required: true, message: '请选择服务类型', trigger: ['blur', 'change'] }
          ]
        }
      }
    },
    computed: {
      ...mapGetters([
        'permissions',
        'client'
      ])
    },
    filters: {
      codeFilter(status) {
        const statusMap = {
          '001': '代收费',
          '002': '培训费',
          '003': '服务包',
          '004': '活动'
        }
        return statusMap[status]
      },
      priceTypeFilter(status) {
        const statusMap = {
          '0': '单次收费',
          '1': '多次收费'
        }
        return statusMap[status]
      }
    },
    created() {
      this.getList()
      this.add_menu = this.permissions['finance_service-category_add']
      this.update_menu = this.permissions['finance_service_category_update']
      this.del_menu = this.permissions['finance_service_category_del']
    },
    methods: {
      getList() {
        this.listLoading = true
        getFinanceList(this.listQuery).then(response => {
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
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delFinance(row.categoryId)
            .then(() => {
              this.dialogFormVisible = false
              this.getList()
            })
        })
      },
      handleDisable(row) {
        var dat = { categoryId: row.categoryId, status: row.status, number: 1 }
        console.log(dat)
        putFinance(dat)
      },
      handleEnable(row) {
        var dat = {}
        dat.categoryId = row.categoryId
        dat.status = 0
        putFinance().then(() => {
          this.dialogFormVisible = false
          this.getList()
        })
      },
      createClick() {
        this.serviceCategory = {}
        this.dialogStatus = 'create'
        this.dialogFormVisible = true
      },
      handleUpdate(val) {
        this.serviceCategory = val
        this.dialogStatus = 'update'
        this.dialogFormVisible = true
      },
      create(formName) {
        const set = this.$refs
        set[formName].validate(valid => {
          if (valid) {
            this.serviceCategory.number = 1
            addFinance(this.serviceCategory)
              .then(() => {
                this.dialogFormVisible = false
                this.getList()
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
            this.serviceCategory.number = 1
            putFinance(this.serviceCategory).then(() => {
              this.dialogFormVisible = false
              this.getList()
            })
          } else {
            return false
          }
        })
      }
    }
  }
</script>
