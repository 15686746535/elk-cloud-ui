<template>
  <el-card style="height: 100%;overflow: auto;">
    <!-- 集合数量较大可以使用filterable进行 -->
    <el-select v-model="orgId" placeholder="请选择组织">
      <el-option
        v-for="item in groupList"
        :key="item.orgId"
        :label="item.orgName"
        :value="item.orgId">
      </el-option>
    </el-select>
    <div style="clear: both"></div>
    <el-tabs tab-position="top" style="height: 200px;" v-model="tab" @tab-click="groupIdChange">
      <el-tab-pane label="云存储配置" name="ossConfig">
        <el-form label-position="left" :model="ossConfig" :rules="ossRules" ref="ossConfig" label-width="110px">
          <el-form-item label="域名"  prop="qiniuDomain">
            <el-input :disabled="disabled" v-model="ossConfig.qiniuDomain" placeholder="域名" ></el-input>
          </el-form-item>

          <el-form-item label="前缀"  prop="qiniuPrefix">
            <el-input :disabled="disabled" v-model="ossConfig.qiniuPrefix" placeholder="前缀" ></el-input>
          </el-form-item>

          <el-form-item label="AccessKey"  prop="qiniuAccessKey">
            <el-input :disabled="disabled" v-model="ossConfig.qiniuAccessKey" placeholder="AccessKey" ></el-input>
          </el-form-item>

          <el-form-item label="SecretKey"  prop="qiniuSecretKey">
            <el-input :disabled="disabled" v-model="ossConfig.qiniuSecretKey" placeholder="SecretKey" ></el-input>
          </el-form-item>

          <el-form-item label="空间名"  prop="qiniuBucketName">
            <el-input :disabled="disabled" v-model="ossConfig.qiniuBucketName" placeholder="空间名" ></el-input>
          </el-form-item>
        </el-form>
        <div class="dialog-footer" style="float: right;">
          <el-button v-if="!disabled" @click="$refs['ossConfig'].resetFields();qiniuConfig();">取消</el-button>
          <el-button v-if="!disabled" type="success" :loading="btnLoading" @click="qiniuSave('ossConfig')">保存</el-button>
          <el-button v-if="disabled"  type="success" @click="disabled = false">编辑</el-button>
        </div>

      </el-tab-pane>
      <el-tab-pane label="教练端配置" name="appCoachConfig">
        <el-form label-position="left" :model="appConfig" :rules="appRules" ref="appConfig" label-width="110px">

          <el-form-item label="key"  prop="key">
            <el-input :disabled="true" v-model="config.key" placeholder="key" ></el-input>
          </el-form-item>

          <el-form-item label="aesKey"  prop="aesKey">
            <el-input :disabled="disabled" v-model="appConfig.aesKey" placeholder="aesKey" ></el-input>
          </el-form-item>

          <el-form-item label="appId"  prop="appId">
            <el-input :disabled="disabled" v-model="appConfig.appId" placeholder="appId" ></el-input>
          </el-form-item>

          <el-form-item label="secret"  prop="secret">
            <el-input :disabled="disabled" v-model="appConfig.secret" placeholder="secret" ></el-input>
          </el-form-item>

          <el-form-item label="token"  prop="token">
            <el-input :disabled="disabled" v-model="appConfig.token" placeholder="token" ></el-input>
          </el-form-item>

          <el-form-item label="短信通账号"  prop="dxtAccount">
            <el-input :disabled="disabled" v-model="appConfig.dxtAccount" placeholder="短信通账号" ></el-input>
          </el-form-item>

          <el-form-item label="短信通密码"  prop="dxtPassword">
            <el-input type="password" :disabled="disabled" v-model="appConfig.dxtPassword" placeholder="短信通密码" ></el-input>
          </el-form-item>

        </el-form>

        <div style="float: right;padding-bottom: 30px;">
          <el-button v-if="!disabled" @click="cancel('appConfig')">Cancel</el-button>
          <el-button v-if="!disabled" type="success" :loading="btnLoading" @click="create('appConfig')">Enter</el-button>
          <el-button v-if="disabled" type="success" :loading="btnLoading" @click="disabled = false">Update</el-button>
        </div>

      </el-tab-pane>


      <el-tab-pane label="市场端配置" name="appSalesmanConfig">
        <el-form label-position="left" :model="appConfig" :rules="appRules" ref="appConfig" label-width="110px">

          <el-form-item label="key"  prop="key">
            <el-input :disabled="true" v-model="config.key" placeholder="key" ></el-input>
          </el-form-item>

          <el-form-item label="aesKey"  prop="aesKey">
            <el-input :disabled="disabled" v-model="appConfig.aesKey" placeholder="aesKey" ></el-input>
          </el-form-item>

          <el-form-item label="appId"  prop="appId">
            <el-input :disabled="disabled" v-model="appConfig.appId" placeholder="appId" ></el-input>
          </el-form-item>

          <el-form-item label="secret"  prop="secret">
            <el-input :disabled="disabled" v-model="appConfig.secret" placeholder="secret" ></el-input>
          </el-form-item>

          <el-form-item label="token"  prop="token">
            <el-input :disabled="disabled" v-model="appConfig.token" placeholder="token" ></el-input>
          </el-form-item>

          <el-form-item label="短信通账号"  prop="dxtAccount">
            <el-input :disabled="disabled" v-model="appConfig.dxtAccount" placeholder="短信通账号" ></el-input>
          </el-form-item>

          <el-form-item label="短信通密码"  prop="dxtPassword">
            <el-input type="password" :disabled="disabled" v-model="appConfig.dxtPassword" placeholder="短信通密码" ></el-input>
          </el-form-item>

        </el-form>

        <div style="float: right;padding-bottom: 30px;">
          <el-button v-if="!disabled" @click="cancel('appConfig')">Cancel</el-button>
          <el-button v-if="!disabled" type="success" :loading="btnLoading" @click="create('appConfig')">Enter</el-button>
          <el-button v-if="disabled" type="success" :loading="btnLoading" @click="disabled = false">Update</el-button>
        </div>


      </el-tab-pane>


      <el-tab-pane label="学员端配置" name="appStudentConfig">
        <el-form label-position="left" :model="appConfig" :rules="appRules" ref="appConfig" label-width="110px">

          <el-form-item label="key"  prop="key">
            <el-input :disabled="true" v-model="config.key" placeholder="key" ></el-input>
          </el-form-item>

          <el-form-item label="aesKey"  prop="aesKey">
            <el-input :disabled="disabled" v-model="appConfig.aesKey" placeholder="aesKey" ></el-input>
          </el-form-item>

          <el-form-item label="appId"  prop="appId">
            <el-input :disabled="disabled" v-model="appConfig.appId" placeholder="appId" ></el-input>
          </el-form-item>

          <el-form-item label="secret"  prop="secret">
            <el-input :disabled="disabled" v-model="appConfig.secret" placeholder="secret" ></el-input>
          </el-form-item>

          <el-form-item label="token"  prop="token">
            <el-input :disabled="disabled" v-model="appConfig.token" placeholder="token" ></el-input>
          </el-form-item>

          <el-form-item label="短信通账号"  prop="dxtAccount">
            <el-input :disabled="disabled" v-model="appConfig.dxtAccount" placeholder="短信通账号" ></el-input>
          </el-form-item>

          <el-form-item label="短信通密码"  prop="dxtPassword">
            <el-input type="password" :disabled="disabled" v-model="appConfig.dxtPassword" placeholder="短信通密码" ></el-input>
          </el-form-item>

        </el-form>

        <div style="float: right;padding-bottom: 30px;">
          <el-button v-if="!disabled" @click="cancel('appConfig')">Cancel</el-button>
          <el-button v-if="!disabled" type="success" :loading="btnLoading" @click="create('appConfig')">Enter</el-button>
          <el-button v-if="disabled" type="success" :loading="btnLoading" @click="disabled = false">Update</el-button>
        </div>


      </el-tab-pane>


      <el-tab-pane label="短信模板配置" name="messageConfig">

        <el-table :data="configList" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row style="width: 100%">
          <el-table-column type="index" align="center" label="id" width="50">
          </el-table-column>
          <el-table-column label="value">
            <template slot-scope="scope">
              <span class="table_text" :title="scope.row.value">{{ scope.row.value }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="remark" width="200">
            <template slot-scope="scope">
              <span class="table_text">{{ scope.row.remark}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="createTime" width="120">
            <template slot-scope="scope">
              <span class="table_text">{{ scope.row.createTime | subTime }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="operation" width="180">
            <template slot-scope="scope">
              <el-button v-if="basis_configure_update" size="mini" type="success"
                         @click="handleUpdate(scope.row)">编辑
              </el-button>
              <el-button v-if="basis_configure_del" size="mini" type="danger"
                         @click="handleDelete(scope.row)">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>

        <el-dialog :modal="false" @close="getConfigListByCondition('message_model_orgId'.replace(new RegExp('orgId', 'gm'), orgId))" title="添加短信模板" width="550px" :visible.sync="dialogMessageConfig">
          <el-form label-position="left" :model="config" :rules="configRules" ref="config" label-width="110px">

              <span v-if="isAdd">

                <el-form-item label="messageType"  prop="messageType">
                  <el-select v-model="messageType" style="width: 100%" placeholder="请选择类型">
                    <el-option
                      v-for="item in messageTypeList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>

                </el-form-item>

              </span>

            <el-form-item label="value"  prop="value">
              <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 4}" v-model="config.value" placeholder="请输入模板"></el-input>
            </el-form-item>
          </el-form>

          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogMessageConfig = false; getConfigListByCondition('message_model_orgId'.replace(new RegExp('orgId', 'gm'), orgId))"><i class="el-icon-fa-undo"></i> 取 消</el-button>
            <el-button :loading="btnLoading" type="primary" @click="createMessageConfig('config')"><i class="el-icon-fa-save"></i> 确 定</el-button>
          </div>

        </el-dialog>
        <div style="clear: both;height: 20px;width: 100%"></div>
        <el-button style="float: right;padding-bottom: 30px;" type="primary" @click="createClick">添加</el-button>

      </el-tab-pane>

    </el-tabs>
  </el-card>
</template>

<script>
  import { getConfigList, addConfig, getConfig, delConfig, putConfig, qiniuConfig, saveConfig, getByKey } from '@/api/basis/config'
  import { groupList } from '@/api/upms/org'
  import { mapGetters } from 'vuex'
  export default {
    name: 'menu',
    data() {
      return {
        tab: 'ossConfig',
        disabled: true,
        dialogMessageConfig: false,
        appCoachOrgId: null,
        appSalesmanOrgId: null,
        appStudentOrgId: null,
        groupList: [],
        appConfig: {
          aesKey: '',
          appId: '',
          secret: '',
          token: '',
          dxtAccount: '',
          dxtPassword: ''
        },
        ossConfig: {
          type: 1,
          qiniuDomain: '', // 域名
          qiniuPrefix: '', // 路径前缀
          qiniuAccessKey: '', // AccessKey
          qiniuSecretKey: '', // SecretKey
          qiniuBucketName: '' // 空间名
        },
        ossRules: {
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
        configRules: {
          value: [
            { required: true, message: '请输入短信模板', trigger: ['blur', 'change'] }
          ]
        },
        appRules: {
          aesKey: [
            { required: false, message: '请输入aesKey', trigger: 'blur' }
          ],
          appId: [
            { required: true, message: '请输入appId', trigger: 'blur' }
          ],
          secret: [
            { required: true, message: '请输入secret', trigger: 'blur' }
          ],
          token: [
            { required: false, message: '请输入token', trigger: 'blur' }
          ],
          dxtAccount: [
            { required: true, message: '请输入短信通账号', trigger: 'blur' }
          ],
          dxtPassword: [
            { required: true, message: '请输入短信通密码', trigger: 'blur' }
          ]
        },
        config: {
          key: null,
          value: null,
          remark: null
        },
        configList: [],
        listLoading: false,
        btnLoading: false,
        messageType: 'message_model_orgId_0_1',
        basis_configure_add: true,
        basis_configure_update: true,
        basis_configure_del: true,
        listQuery: {
          limit: 20,
          page: 1
        },
        rules: {
          key: [
            { required: true, message: 'Please enter the key', trigger: ['blur'] }
          ],
          value: [
            { required: true, message: 'Please enter the value', trigger: ['blur'] }
          ],
          remark: [
            { required: true, message: 'Please enter the remark', trigger: ['blur'] }
          ]
        },
        orgId: null,
        key: null,
        isAdd: null,
        keys: [
          {
            value: 'CLOUD_STORAGE_CONFIG_KEY_ORG',
            label: '云存储配置KEY'
          },
          {
            value: 'String DXTON_CONFIG = "DXTON_CONFIG',
            label: '短信通配置'
          }
        ],
        messageTypeList: [
          {
            label: '学员添加短信模板',
            value: 'message_model_orgId_0_1'
          },
          {
            label: '科一考试前短信模板',
            value: 'message_model_orgId_1_1'
          },
          {
            label: '科一通过后短信模板',
            value: 'message_model_orgId_1_2'
          },
          {
            label: '科二考试前短信模板',
            value: 'message_model_orgId_2_1'
          },
          {
            label: '科二通过后短信模板',
            value: 'message_model_orgId_2_2'
          },
          {
            label: '科三考试前短信模板',
            value: 'message_model_orgId_3_1'
          },
          {
            label: '科三通过后短信模板',
            value: 'message_model_orgId_3_2'
          }
        ]
      }
    },
    created() {
      this.qiniuConfig()
      this.getGroupList()
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
      qiniuConfig() {
        this.disabled = true
        qiniuConfig().then(response => {
          if (response.data.code === 0) {
            this.ossConfig = response.data.data
          }
        })
      },
      qiniuSave(formName) {
        const set = this.$refs
        set[formName].validate(valid => {
          if (valid) {
            this.btnLoading = true
            this.ossConfig.type = 1
            saveConfig(this.ossConfig).then(() => {
              this.btnLoading = false
              this.disabled = true
            })
          }
        })
      },
      getGroupList() {
        groupList().then(response => {
          if (response.data.code === 0) {
            this.groupList = response.data.data
            if (this.groupList) if (this.groupList.length > 0) this.orgId = this.groupList[0].orgId
          }
        })
      },
      getList() {
        this.listLoading = true
        getConfigList(this.config).then(response => {
          this.configList = response.data.data.list
          this.listLoading = false
        })
      },
      getConfigListByCondition(condition) {
        this.listLoading = true
        getConfigList({ 'condition': condition }).then(response => {
          this.configList = response.data.data.list
          this.listLoading = false
        })
      },
      handleUpdate(val) {
        this.config = val
        this.isAdd = false
        this.dialogMessageConfig = true
      },
      handleDelete(val) {
        this.$confirm('是否取消该配置?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delConfig(val.configId).then(() => {
            this.getConfigListByCondition('message_model_orgId'.replace(new RegExp('orgId', 'gm'), this.orgId))
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
        this.isAdd = true
        this.config.value = ''
        this.dialogMessageConfig = true
      },
      cancel(formName) {
        this.btnLoading = false
        this.disabled = true
        var key = ''
        if (this.tab === 'appCoachConfig') {
          key = 'elk-app-coach:' + this.orgId
        } else if (this.tab === 'appSalesmanConfig') {
          key = 'elk-app-salesman:' + this.orgId
        } else if (this.tab === 'appStudentConfig') {
          key = 'elk-app-student:' + this.orgId
        } else if (this.tab === 'messageConfig') {
        } else if (this.tab === 'ossConfig') {
        }
        getByKey(key).then(response => {
          this.isAdd = true
          this.config.configId = null
          if (response.data.data) {
            this.isAdd = false
            this.config.configId = response.data.data.configId
            this.config.key = response.data.data.key
            this.appConfig = JSON.parse(response.data.data.value)
          }
        })
      },
      create(formName) {
        const set = this.$refs
        set[formName].validate(valid => {
          if (valid) {
            if (formName === 'appConfig') this.config.value = JSON.stringify(this.appConfig)
            this.btnLoading = true
            if (this.isAdd) {
              addConfig(this.config).then(() => {
                this.cancel(formName)
                this.btnLoading = false
              })
            } else {
              addConfig(this.config).then(() => {
                this.cancel(formName)
                this.btnLoading = false
              })
            }
          }
        })
      },
      update(formName) {
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
      orgClick(org) {
      },
      kerChange() {},
      groupIdChange(tab, event) {
        var flag = ''
        if (tab.name === 'appCoachConfig') {
          this.config.key = 'elk-app-coach:' + this.orgId
          flag = 'appConfig'
        } else if (tab.name === 'appSalesmanConfig') {
          this.config.key = 'elk-app-salesman:' + this.orgId
          flag = 'appConfig'
        } else if (tab.name === 'appStudentConfig') {
          this.config.key = 'elk-app-student:' + this.orgId
          flag = 'appConfig'
        } else if (tab.name === 'messageConfig') {
          flag = 'messageConfig'
        }

        console.log(flag)
        if (flag === 'appConfig') {
          getByKey(this.config.key).then(response => {
            this.isAdd = true
            this.config.configId = null
            if (response.data.data) {
              this.isAdd = false
              this.config.configId = response.data.data.configId
              this.config.key = response.data.data.key
              this.appConfig = JSON.parse(response.data.data.value)
            }
          })
        } else if (flag === 'messageConfig') {
          this.getConfigListByCondition('message_model_orgId'.replace(new RegExp('orgId', 'gm'), this.orgId))
        }
      },
      createMessageConfig(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.btnLoading = true
            if (this.isAdd) {
              this.config.key = this.messageType.replace(new RegExp('orgId', 'gm'), this.orgId)
              for (var i = 0; i < this.messageTypeList.length; i++) {
                if (this.messageType === this.messageTypeList[i].value) {
                  this.config.remark = this.messageTypeList[i].label
                }
              }
            }
            addConfig(this.config).then(() => {
              this.btnLoading = false
              this.dialogMessageConfig = false
              this.$refs[formName].resetFields()
              this.getConfigListByCondition('message_model_orgId'.replace(new RegExp('orgId', 'gm'), this.orgId))
            })
          }
        })
      }
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
