<template>
  <div class="app-container calendar-list-container" :style="{height: $store.state.app.client.height + 'px'}">
    <el-card :style="{height: ($store.state.app.client.height - 40) + 'px'}">

      <el-tabs tab-position="top" style="height: 200px;" v-model="tab" @tab-click="tabClick">
        <el-tab-pane label="云存储配置" name="ossConfig">
          <tree-select style="font-size: 12px" url="/upms/org/tree" @org-click="orgClick" v-model="config.orgId"></tree-select>
          <el-form label-position="left" :model="OssConfig" :rules="OssRules" ref="OssConfig" label-width="110px">
            <el-form-item label="域名"  prop="qiniuDomain">
              <el-input :disabled="disabled" v-model="OssConfig.qiniuDomain" placeholder="域名" ></el-input>
            </el-form-item>

            <el-form-item label="前缀"  prop="qiniuPrefix">
              <el-input :disabled="disabled" v-model="OssConfig.qiniuPrefix" placeholder="前缀" ></el-input>
            </el-form-item>

            <el-form-item label="AccessKey"  prop="qiniuAccessKey">
              <el-input :disabled="disabled" v-model="OssConfig.qiniuAccessKey" placeholder="AccessKey" ></el-input>
            </el-form-item>

            <el-form-item label="SecretKey"  prop="qiniuSecretKey">
              <el-input :disabled="disabled" v-model="OssConfig.qiniuSecretKey" placeholder="SecretKey" ></el-input>
            </el-form-item>

            <el-form-item label="空间名"  prop="qiniuBucketName">
              <el-input :disabled="disabled" v-model="OssConfig.qiniuBucketName" placeholder="空间名" ></el-input>
            </el-form-item>
          </el-form>
          <div class="dialog-footer" style="float: right;">
            <el-button v-if="!disabled" @click="$refs['OssConfig'].resetFields();qiniuConfig();">取消</el-button>
            <el-button v-if="!disabled" type="success" :loading="btnLoading" @click="qiniuSave('OssConfig')">保存</el-button>
            <el-button v-if="disabled"  type="success" @click="disabled = false">编辑</el-button>
          </div>

        </el-tab-pane>
        <el-tab-pane label="小程序配置" name="appConfig">


        </el-tab-pane>

      </el-tabs>

      <!--<el-table :data="configList" v-loading="listLoading"  :height="$store.state.app.client.height-125" element-loading-text="给我一点时间" border fit highlight-current-row style="width: 100%">-->
        <!--<el-table-column type="index" align="center" label="id" width="50">-->
        <!--</el-table-column>-->
        <!--<el-table-column align="center"  label="key">-->
          <!--<template slot-scope="scope">-->
            <!--<span class="table_text">{{ scope.row.key }}</span>-->
          <!--</template>-->
        <!--</el-table-column>-->
        <!--<el-table-column align="center" label="value">-->
          <!--<template slot-scope="scope">-->
            <!--<span class="table_text" :title="scope.row.value">{{ scope.row.value }}</span>-->
          <!--</template>-->
        <!--</el-table-column>-->
        <!--<el-table-column align="center" label="remark">-->
          <!--<template slot-scope="scope">-->
            <!--<span class="table_text">{{ scope.row.remark}}</span>-->
          <!--</template>-->
        <!--</el-table-column>-->
        <!--<el-table-column align="center" label="createTime">-->
          <!--<template slot-scope="scope">-->
            <!--<span class="table_text">{{ scope.row.createTime | subTime }}</span>-->
          <!--</template>-->
        <!--</el-table-column>-->
        <!--<el-table-column align="center" label="operation">-->
          <!--<template slot-scope="scope">-->
            <!--<el-button v-if="basis_configure_update" size="mini" type="success"-->
                       <!--@click="handleUpdate(scope.row)">编辑-->
            <!--</el-button>-->
            <!--<el-button v-if="basis_configure_del" size="mini" type="danger"-->
                       <!--@click="handleDelete(scope.row)">删除-->
            <!--</el-button>-->
          <!--</template>-->
        <!--</el-table-column>-->
      <!--</el-table>-->
      <!--<div v-show="!listLoading" class="pagination-container" style="margin-top: 10px">-->
        <!--<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"-->
                       <!--:current-page.sync="listQuery.page" background-->
                       <!--style="float: left"-->
                       <!--:page-sizes="[10,20,30, 50]" :page-size="listQuery.limit"-->
                       <!--layout="total, sizes, prev, pager, next, jumper" :total="total">-->
        <!--</el-pagination>-->
        <!--<el-button v-if="basis_configure_add" class="filter-item" style="margin-left: 10px;float: right" @click="createClick" type="primary"><i class="el-icon-plus"></i>添加-->
        <!--</el-button>-->
      <!--</div>-->

      <el-dialog @close="cancel('config')" title="Config Information" width="550px" :visible.sync="configOption">
        <el-form label-position="left" :model="config" :rules="rules" ref="config" label-width="110px">
          <!--<el-form-item label="keys"  prop="keys">-->
            <!--<el-select v-model="key" @change="kerChange" style="width: 100%" collapse-tags placeholder="请选择配置信息">-->
              <!--<el-option-->
                <!--v-for="item in keys"-->
                <!--:key="item.value"-->
                <!--:label="item.label"-->
                <!--:value="item.value">-->
              <!--</el-option>-->
            <!--</el-select>-->
          <!--</el-form-item>-->
          <el-form-item v-show="dialogStatus=='create'" label="org"  prop="orgId">
            <tree-select style="font-size: 12px" url="/upms/org/tree" @org-click="orgClick" v-model="config.orgId"></tree-select>
          </el-form-item>

          <el-form-item label="key"  prop="key">
            <el-input :disabled="dialogStatus=='update'" v-model="config.key" placeholder="Please enter the key" >
              <!--<template slot="append">{{orgId === null? null: '_' + orgId}}</template>-->
            </el-input>
          </el-form-item>
          <el-form-item label="value" prop="value">
            <el-input
              type="textarea"
              :autosize="{ minRows: 4, maxRows: 6}"
              placeholder="Please enter the value"
              v-model="config.value">
            </el-input>
          </el-form-item>
          <el-form-item label="remark" prop="remark">
            <el-input v-model="config.remark" placeholder="Please enter the remark" ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancel('config')">Cancel</el-button>
          <el-button v-if="dialogStatus=='create'" type="success" :loading="btnLoading" @click="create('config')">Enter</el-button>
          <el-button v-else type="success" :loading="btnLoading" @click="update('config')">Update</el-button>
        </div>
      </el-dialog>

    </el-card>
  </div>
</template>

<script>
  import { getConfigList, addConfig, getConfig, delConfig, putConfig, qiniuConfig, saveConfig } from '@/api/basis/config'
  import { mapGetters } from 'vuex'
  export default {
    name: 'menu',
    data() {
      return {
        tab: 'ossConfig',
        disabled: true,
        OssConfig: {
          type: 1,
          qiniuDomain: '', // 域名
          qiniuPrefix: '', // 路径前缀
          qiniuAccessKey: '', // AccessKey
          qiniuSecretKey: '', // SecretKey
          qiniuBucketName: '' // 空间名
        },
        OssRules: {
          qiniuDomain: [
            { required: true, message: '请输入域名', trigger: 'blur' }
          ],
          qiniuPrefix: [
            { required: true, message: '请输入路径前缀', trigger: 'blur' }
          ],
          qiniuAccessKey: [
            { required: true, message: '请输入AccessKey', trigger: 'blur' }
          ],
          qiniuSecretKey: [
            { required: true, message: '请输入SecretKey', trigger: 'blur' }
          ],
          qiniuBucketName: [
            { required: true, message: '请输入空间名', trigger: 'blur' }
          ]
        },
        config: {
          key: null,
          value: null,
          remark: null
        },
        configList: [],
        listLoading: true,
        configOption: false,
        btnLoading: false,
        dialogStatus: 'create',
        basis_configure_add: true,
        basis_configure_update: true,
        basis_configure_del: true,
        listQuery: {
          limit: 20,
          page: 1
        },
        total: null,
        rules: {
          key: [
            { required: true, message: 'Please enter the key', trigger: ['blur', 'change'] }
          ],
          value: [
            { required: true, message: 'Please enter the value', trigger: ['blur', 'change'] }
          ],
          remark: [
            { required: true, message: 'Please enter the remark', trigger: ['blur', 'change'] }
          ]
        },
        orgId: null,
        key: null,
        keys: [
          {
            value: 'CLOUD_STORAGE_CONFIG_KEY_ORG',
            label: '云存储配置KEY'
          },
          {
            value: 'String DXTON_CONFIG = "DXTON_CONFIG',
            label: '短信通配置'
          }
        ]
      }
    },
    created() {
      this.qiniuConfig()
      this.basis_configure_add = this.permissions['basis_configure_add']
      this.basis_configure_update = this.permissions['basis_configure_update']
      this.basis_configure_del = this.permissions['basis_configure_del']
    },
    computed: {
      ...mapGetters([
        'elements',
        'permissions',
        'client'
      ])
    },
    methods: {
      tabClick(tab) {
        if (tab.name === 'ossConfig') {
          this.qiniuConfig()
        } else if (tab.name === 'appConfig') {
          this.qiniuConfig()
        }
      },
      qiniuConfig() {
        this.disabled = true
        qiniuConfig().then(response => {
          if (response.data.code === 0) {
            this.OssConfig = response.data.data
          }
        })
      },
      qiniuSave(formName) {
        const set = this.$refs
        set[formName].validate(valid => {
          if (valid) {
            this.btnLoading = true
            this.OssConfig.type = 1
            console.log(this.OssConfig)
            saveConfig(this.OssConfig).then(() => {
              this.btnLoading = false
              this.disabled = true
            })
          }
        })
      },
      getList() {
        this.listLoading = true
        getConfigList(this.OssConfig).then(response => {
          this.configList = response.data.data.list
          this.total = response.data.data.totalCount
          this.listLoading = false
        })
      },
      handleUpdate(val) {
        this.config = val
        this.dialogStatus = 'update'
        this.configOption = true
      },
      handleDelete(val) {
        this.$confirm('是否取消该配置?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delConfig(val.configId).then(() => {
          })
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
      createClick() {
        this.config = {}
        this.dialogStatus = 'create'
        this.configOption = true
      },
      cancel(formName) {
        this.configOption = false
        this.btnLoading = false
        this.$refs[formName].resetFields()
      },
      create(formName) {
        const set = this.$refs
        set[formName].validate(valid => {
          if (valid) {
            this.config.key = this.config.key + '_' + this.config.orgId
            this.btnLoading = true
            addConfig(this.config).then(() => {
              this.cancel(formName)
              this.btnLoading = false
            })
          }
        })
      },
      update(formName) {
        const set = this.$refs
        set[formName].validate(valid => {
          if (valid) {
            this.config.key = this.config.key + '_' + this.config.orgId
            this.btnLoading = true
            putConfig(this.config).then(() => {
              this.cancel(formName)
              this.btnLoading = false
            })
          }
        })
      },
      orgClick(org) {
      },
      kerChange() {}
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>

  .table_text{
    color: #7c7c7c;font-size: 12px;
    text-align: left;
    word-break:keep-all;/* 不换行 */
    white-space:nowrap;/* 不换行 */
    overflow:hidden;/* 内容超出宽度时隐藏超出部分的内容 */
    text-overflow:ellipsis;/* 当对象内文本溢出时显示省略标记(...) ；需与overflow:hidden;一起使用。*/
  }
</style>
