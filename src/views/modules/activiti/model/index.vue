<template>
  <div class="app-container calendar-list-container" :style="{height: $store.state.app.client.height + 'px'}">
    <transition name="el-zoom-in-center">
      <div v-show="isShow('list')">
        <el-card :style="{height: ($store.state.app.client.height - 40) + 'px'}">
          <div class="filter-container" style="padding-bottom: 20px;">
            <el-input @keyup.enter.native="search" style="width: 200px;margin: 0" class="filter-item" placeholder="关键字" v-model="listQuery.condition"></el-input>
            <el-button type="primary" @click="search" >搜索</el-button>
          </div>
          <el-table :data="modelList"  v-loading="tableLoading" border :height="$store.state.app.client.height - 225" :stripe="true" element-loading-text="给我一点时间" fit highlight-current-row style="width: 100%;text-align: center;">
            <el-table-column type="index" label="序号"  align="center" width="50"></el-table-column>
            <el-table-column prop="name" label="流程名字" align="center" width="250">
              <template slot-scope="scope"><!--defaultFlag-->
                <span>{{scope.row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center"  label="是否部署" width="100">
              <template slot-scope="scope">
                <span>{{scope.row.status === '0'?'未部署':'已部署'}}</span><span style="color: #67c23a">{{scope.row.defaultFlag === '0'?'':'[默认]' }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="orgName" label="机构" align="center" width="300"></el-table-column>
            <el-table-column prop="createTime" label="创建时间" align="center" width="200">
              <template slot-scope="scope">
                <span>{{scope.row.createTime | subTime }}</span>
              </template>
            </el-table-column>


            <el-table-column align="left" label="操作" >
              <template slot-scope="scope">
                <el-button size="mini" type="primary" @click="designFlow(scope.row.modelId)" plain >编 辑</el-button>
                <!--<el-button size="mini" type="primary" @click="showFlowImg(scope.row.modelId)" plain>查看流程图</el-button>-->
                <el-button v-if="scope.row.status === '0'" size="mini" @click="deploy(scope.row.modelId)" type="primary" plain>部署</el-button>
                <el-button v-if="scope.row.defaultFlag === '0'" size="mini" @click="setDefault(scope.row.modelId)" type="primary" plain>部署为默认流程</el-button>
                <el-button v-if="scope.row.status === '0'" size="mini"  @click="delModel(scope.row.modelId)" type="danger" plain>删除</el-button>
              </template>
            </el-table-column>

          </el-table>

          <div v-show="!tableLoading" class="pagination-container" style="margin-top: 20px;">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" style="float: left"
                           :current-page.sync="listQuery.page" background
                           :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit"
                           layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
            <div class="" style="float: right;">
              <el-button  type="primary" @click="designFlow(-1)"><i class="el-icon-plus"></i>添加</el-button>
            </div>
          </div>

        </el-card>
      </div>
    </transition>
    <transition name="el-zoom-in-center">
      <div v-show="isShow('design')">
      <span @click="openList">
        <svg-icon class="close-iframe" icon-class="close" ></svg-icon>
      </span>
        <iframe ref="iframe" :src="url" frameborder="0" style="border:0;" :height="($store.state.app.client.height-60)+'px'" width="100%"></iframe>
      </div>
    </transition>
    <transition name="el-zoom-in-center">
      <div v-show="isShow('img')">
        <el-card :style="{height: ($store.state.app.client.height - 40) + 'px'}" style="overflow: auto">
          <span @click="openList">
            <svg-icon class="close-iframe" icon-class="close" ></svg-icon>
          </span>
          <div v-html="svg"></div>
        </el-card>
      </div>
    </transition>
  </div>

</template>

<script>
  import { modelPage, modelSave, flowTree, modelUpdate, modelDeploy, modelDefault, showFlowImg, modelDel } from '@/api/activiti/model'
  import { mapGetters } from 'vuex'
  import { getToken } from '@/utils/auth'

  export default {
    name: 'active_model',
    components: {
    },
    data() {
      return {
        showPlate: 'list',
        option: false,
        dialogType: 'create',
        listQuery: {
          page: 1,
          limit: 20,
          condition: ''
        },
        modelList: [],
        model: {
          orgId: null, // 组织
          name: null, // 模型名称
          description: null // 描述
        },
        rules: {
          name: [
            { required: true, message: '请输入模型名称', trigger: 'submit' }
          ],
          description: [
            { required: true, message: '请输入描述', trigger: 'submit' }
          ],
          orgId: [
            { required: true, message: '请选择组织', trigger: 'submit' }
          ]
        },
        busTree: [],
        bus: {},
        total: null,
        tableLoading: false,
        svg: '',
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
        this.tableLoading = true
        modelPage(this.listQuery).then(response => {
          var data = response.data.data
          this.modelList = data.list
          this.total = data.totalCount
          this.tableLoading = false
        })
      },
      isShow(v) {
        return this.showPlate === v
      },
      busSet(bus) {
        this.bus = bus
      },
      designFlow(modelId) {
        this.url = this.$store.state.app.iFrameUrl + '/activiti/model/create?modelId=' + modelId + '&token=' + getToken()
        this.showPlate = 'design'
      },
      delModel(modelId) {
        this.$confirm('确定删除流程?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          modelDel(modelId).then(response => {
            this.getList()
          })
        })
      },
      setDefault(modelId) {
        this.$confirm('将流程设置为默认并部署?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          modelDefault(modelId).then(response => {
            this.getList()
          })
        })
      },
      deploy(modelId) {
        this.$confirm('确定部署流程?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          modelDeploy(modelId).then(response => {
            this.getList()
          })
        })
      },
      showFlowImg(modelId) {
        showFlowImg(modelId).then(response => {
          this.svg = response.data.data
          this.showPlate = 'img'
        })
      },
      flowTree(modelId) {
        flowTree(modelId).then(response => {
        })
      },
      dialogOpen(model) {
        if (model) {
          this.model = {
            modelId: model.modelId, // ID
            orgId: model.orgId, // 关联的 业务表 ID
            name: model.name, // 模型名称
            description: model.description // 描述
          }
          this.dialogType = 'update'
        } else {
          this.dialogType = 'create'
        }
        this.option = true
      },
      create(formName) {
        const set = this.$refs
        set[formName].validate(valid => {
          if (valid) {
            // 展开加载中
            this.$store.dispatch('setLoading', true)
            modelSave(this.model).then(() => {
              this.option = false
              this.loading = false
              this.getList()
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
            // 展开加载中
            this.$store.dispatch('setLoading', true)
            modelUpdate(this.model).then(() => {
              this.option = false
              this.getList()
            })
          } else {
            return false
          }
        })
      },
      search() {
        this.listQuery.page = 1
        this.getList()
      },
      openList() {
        this.showPlate = 'list'
        this.url = ''
        this.getList()
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
