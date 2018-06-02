<template>
  <div class="app-container calendar-list-container" :style="{height: $store.state.app.client.height + 'px'}" >
    <el-card style="margin-bottom: 5px;height: 80px; ">
      <el-input @keyup.enter.native="searchClick" style="width: 200px;" class="filter-item" placeholder="关键词" v-model="listQuery.name"></el-input>
      <el-button class="filter-item" type="primary" @click="searchClick">搜索</el-button>

      <el-button class="filter-item" style="float: right" @click="messageConfigClick" type="primary">配置短信密钥</el-button>
    </el-card>
    <el-card :style="{height: ($store.state.app.client.height - 125) + 'px'}">
      <el-table :height="$store.state.app.client.height - 225" :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit
                highlight-current-row style="width: 100%">
        <el-table-column type="index" label="序号"  align="center" width="50"></el-table-column>
        <el-table-column  align="center" label="内容">
          <template slot-scope="scope">
            <span>{{scope.row.message}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="接收者姓名">
          <template slot-scope="scope">
            <span>{{scope.row.name}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="接收电话">
          <template slot-scope="scope">
            <span>{{scope.row.mobile}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="发送状态">
          <template slot-scope="scope">
            <span>{{scope.row.status | sendFilter}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="发送时间">
          <template slot-scope="scope">
            <span>{{scope.row.sendTime | subTime}}</span>
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
    <!-- 发送消息 -->
    <el-dialog @clock="this.$refs['messageConfig'].resetFields()" title="添加短信配置" width="550px" :visible.sync="messageConfigOption">
      <el-form :model="messageConfig" :rules="messageConfigRules" ref="messageConfig" label-position="left">
        <el-form-item prop="dxtAccount">
          <el-input v-model="messageConfig.dxtAccount" placeholder="账号"></el-input>
        </el-form-item>

        <el-form-item prop="dxtPassword">
          <el-input v-model="messageConfig.dxtPassword" placeholder="密码"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="jump"><i class="el-icon-fa-registered"></i> 注 册</el-button>
        <el-button :loading="btnLoading" type="primary" @click="createMessageConfig('messageConfig')"><i class="el-icon-fa-save"></i> 保 存</el-button>
      </div>
      <!-- 清除上一个浮动效果影响 -->
      <!--<div style="clear: both">-->
      <!--</div>-->
    </el-dialog>


  </div>
</template>

<script>
  import { fetchList, getObj } from '@/api/basis/message'
  import { mapGetters } from 'vuex'
  import { getConfigList, addConfig, getByKey, putConfig } from '@/api/basis/config'
  import { removeAllSpace } from '@/utils/validate'

  export default {
    name: 'table_message',
    computed: {
      ...mapGetters([
        'permissions',
        'client'
      ])
    },
    data() {
      return {
        config: {
          key: null,
          value: null
        },
        messageConfigRules: {
          dxtAccount: [
            { required: true, message: '请输入账号', trigger: ['blur', 'change'] }
          ],
          dxtPassword: [
            { required: true, message: '请输入密码', trigger: ['blur', 'change'] }
          ]
        },
        messageConfig: {
          dxtAccount: null,
          dxtPassword: null
        },
        list: [],
        total: null,
        messageConfigOption: false,
        btnLoading: false,
        listLoading: true,
        dialogStatus: 'create',
        showModule: 'list',
        listQuery: {
          page: 1,
          limit: 20,
          name: null
        }
      }
    },
    created() {
      this.getList()
    },
    filters: {
      sendFilter(status) {
        const typeMap = {
          '0': '暂未发送',
          '100': '发送成功',
          '101': '验证失败(101)',
          '102': '手机号码格式不正确(102)',
          '103': '会员级别不够(103)',
          '104': '内容未审核(104)',
          '105': '内容过多(105)',
          '106': '账户余额不足(106)',
          '107': 'Ip受限(107)',
          '108': '手机号码发送太频繁，请换号或隔天再发(108)',
          '109': '帐号被锁定(109)',
          '110': '发送通道不正确(110)',
          '111': '当前时间段禁止短信发送(111)',
          '120': '短信发送系统升级(120)'
        }
        return typeMap[status]
      }
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
      searchClick() {
        this.listQuery.page = 1
        this.getList()
      },
      jump() {
        window.open('http://www.dxton.com/')
      },
      messageConfigClick() {
        this.messageConfigOption = true
        getByKey('dxton_config').then(response => {
          console.log(response.data)
          this.config.key = response.data.key
          this.dialogStatus = 'create'
          if (response.data.data) {
            this.dialogStatus = 'update'
            this.config.configId = response.data.data.configId
            this.messageConfig.dxtAccount = JSON.parse(response.data.data.value).dxtAccount
            this.messageConfig.dxtPassword = JSON.parse(response.data.data.value).dxtPassword
          }
        })
      },
      createMessageConfig(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.btnLoading = true
            this.config.value = JSON.stringify(this.messageConfig)
            if (this.dialogStatus == 'create') {
              addConfig(this.config).then(() => {
                this.btnLoading = false
                this.messageConfigOption = false
                this.$refs[formName].resetFields()
              })
            } else if (this.dialogStatus == 'update') {
              console.log(this.config)
              putConfig(this.config).then(() => {
                this.btnLoading = false
                this.messageConfigOption = false
                this.$refs[formName].resetFields()
              })
            }
          }
        })
      }
    }
  }
</script>
