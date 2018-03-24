<template>
  <div class="app-container calendar-list-container" :style="{height: client.height + 'px'}">
    <transition name="el-zoom-in-center">
      <div v-show="showList">
        <el-card :style="{height: (client.height - 40) + 'px'}">
          <div class="filter-container" style="padding-bottom: 20px;">
            <el-input @keyup.enter.native="search" style="width: 200px;margin: 0" class="filter-item" placeholder="关键字" v-model="listQuery.condition"></el-input>
            <el-button type="primary" @click="search" >搜索</el-button>
            <el-button  type="primary" @click="dialogOpen"><i class="el-icon-plus"></i>添加</el-button>
          </div>
          <el-table  :data="modelList"  v-loading="loading" border :height="client.height - 225" :stripe="true" element-loading-text="给我一点时间" fithighlight-current-row
                     style="width: 100%;text-align: center;">
            <!--<el-table-column type="selection" class="selection" align="center" prop='uuid'></el-table-column>-->
            <el-table-column type="index" label="序号"  align="center" width="50"></el-table-column>

            <el-table-column prop="name" label="流程名字" align="center" width="250"></el-table-column>
            <el-table-column prop="businessName" label="业务" align="center" width="150"></el-table-column>
            <el-table-column align="center"  label="是否部署" width="80">
              <template slot-scope="scope">
                <span>{{scope.row.status === '0'?'未部署':'已部署'}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="orgName" label="机构" align="center" width="300"></el-table-column>
            <el-table-column prop="createTime" label="创建时间" align="center" width="200"></el-table-column>


            <el-table-column align="center" label="操作" width="600">
              <template slot-scope="scope">
                <el-button size="mini" type="primary" plain >编 辑</el-button>
                <el-button size="mini" type="primary" @click="designFlow(scope.row.modelId)" plain>设计流程图</el-button>
                <el-button size="mini" type="primary" plain>设计节点</el-button>
                <el-button size="mini" type="primary" plain>查看流程图</el-button>

                <el-button size="mini" type="primary" plain>部署</el-button>
                <el-button size="mini" type="danger" plain>删除</el-button>

                <el-button size="mini" type="primary" plain>升级</el-button>
              </template>
            </el-table-column>

          </el-table>
          <div v-show="!loading" class="pagination-container" style="margin-top: 20px">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                           :current-page.sync="listQuery.page" background
                           :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit"
                           layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
          </div>
        </el-card>
      </div>
    </transition>
    <transition name="el-zoom-in-center">
      <div v-show="!showList">
      <span @click="closeIframe">
        <svg-icon class="close-iframe" icon-class="close" ></svg-icon>
      </span>
        <iframe ref="iframe" :src="url" frameborder="0" style="border:0;" :height="(client.height-60)+'px'" width="100%"></iframe>
      </div>
    </transition>

    <el-dialog  @close="getList" title="添加" :show-close="false" width="30%" :visible.sync="option">
      <el-form :model="model"  ref="model" :rules="rules" label-width="100px">
        <el-form-item label="名称"  prop="name">
          <el-input v-model="model.name" placeholder="流程名称" ></el-input>
        </el-form-item>
        <el-form-item label="业务" prop="businessId">
          <bus-select :dataList="busTree" v-model="model.businessId" placeholder="关联业务" @bus-click="busSet"></bus-select>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input v-model="model.description" placeholder="描述" ></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer">
        <el-button @click="cancel('model')">取 消</el-button>
        <el-button v-if="dialogType=='create'" type="primary" @click="create('model')">确 定</el-button>
        <el-button v-else type="primary" @click="update('model')">修 改</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
  import { modelPage, modelSave } from '@/api/activiti/model'
  import { busTree } from '@/api/activiti/business'
  import { mapGetters } from 'vuex'
  import BusSelect from '@/components/BusSelect'

  export default {
    name: 'active_model',
    components: {
      BusSelect
    },
    data() {
      var checkBus = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请选择业务'))
        }
        if (this.bus.type === '1') {
          return callback(new Error('只能选择业务类，不能选择分组'))
        }
        setTimeout(() => {
          if (this.bus.type === '2') {
            callback()
          }
        }, 1000)
      }
      return {
        showList: true,
        option: false,
        dialogType: 'create',
        listQuery: {
          page: 1,
          limit: 20,
          condition: ''
        },
        modelList: [],
        model: {
          businessId: '2dd79ea6652244b789cfeffbece4fec9', // 关联的 业务表 ID
          name: null, // 模型名称
          description: null // 描述
        },
        rules: {
          name: [
            { required: true, message: '请输入模型名称', trigger: 'submit' }
          ],
          businessId: [
            { validator: checkBus, trigger: 'submit' }
          ]
        },
        busTree: [],
        bus: {},
        total: null,
        loading: false,
        url: '' // http://127.0.0.1:8114/model/add?modelId=ff9c84da-c37f-11e7-8db5-2c4d5453f651
      }
    },
    computed: {
      ...mapGetters([
        'permissions',
        'client'
      ])
    },
    mounted() {
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        this.loading = true
        console.log('========== 查询条件  ====================')
        console.log(this.listQuery)
        modelPage(this.listQuery).then(response => {
          console.log(response)
          var data = response.data.data
          this.modelList = data.list
          this.total = data.totalCount
          this.loading = false
        })
      },
      busSet(bus) {
        console.log('=====')
        console.log(bus)
        this.bus = bus
      },
      checkBus(rule, value, callback) {
        if (!value) {
          return callback(new Error('请选择业务'))
        }
      },
      designFlow(modelId) {
        console.log('========== 设计流程图 busSet ====================')
        console.log(modelId)
        this.url = 'http://127.0.0.1:8114/model/add?modelId=' + modelId
        this.showList = false
      },
      getBusTree() {
        console.log('========== 查询业务树  ====================')
        busTree().then(response => {
          console.log(response)
          this.busTree = response.data.data
          console.log(this.busTree)
        })
      },
      dialogOpen() {
        this.option = true
        this.getBusTree()
      },
      setBusiness(obj) {
        console.log(obj)
      },
      create(formName) {
        const set = this.$refs
        console.log('============= 添加信息 ===================')
        console.log(this.model)
        console.log(formName)
        set[formName].validate(valid => {
          console.log(valid)
          if (valid) {
            console.log('============= modelSave ===================')
            modelSave(this.model)
              .then(() => {
                this.option = false
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
        this.option = false
        this.bus = {}
        this.model = {}
        const set = this.$refs
        set[formName].resetFields()
        this.getList()
      },
      update(formName) {
        const set = this.$refs
        set[formName].validate(valid => {
          if (valid) {
            // putObj(this.batch).then(() => {
            //   this.batchOption = false
            //   this.getList()
            //   this.$notify({
            //     title: '成功',
            //     message: '修改成功',
            //     type: 'success',
            //     duration: 2000
            //   })
            // })
          } else {
            return false
          }
        })
      },
      search() {
        this.listQuery.page = 1
        this.getList()
      },
      closeIframe() {
        this.showList = true
        this.url = ''
      },
      handleSizeChange(val) {
        this.listQuery.limit = val
        this.getList()
      },
      handleCurrentChange(val) {
        this.listQuery.page = val
        this.getList()
      }
    }
  }
</script>

<style scoped>
  .close-iframe{
    position: absolute;
    right: 35px;
    top: 110px;
    font-size: 40px;
    z-index: 66;
    color: red;
  }
  .close-iframe:hover{
    cursor: pointer;
  }
</style>
