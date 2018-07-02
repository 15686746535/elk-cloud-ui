<template>
  <div class="app-container calendar-list-container" :style="{height: $store.state.app.client.height + 'px'}">
    <el-card :style="{height: ($store.state.app.client.height - 40) + 'px'}">
      <el-table :data="configList" v-loading="listLoading"  :height="$store.state.app.client.height-125" element-loading-text="给我一点时间" border fit highlight-current-row style="width: 100%">
        <el-table-column type="index" align="center" label="id" width="50">
        </el-table-column>
        <el-table-column align="center" label="节点值">
          <template slot-scope="scope">
            <span class="table_text">{{ scope.row.node}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="节点名字">
          <template slot-scope="scope">
            <span class="table_text" :title="scope.row.name">{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="是否启用">
          <template slot-scope="scope">
            <span class="table_text">{{ scope.row.state}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="创建时间">
          <template slot-scope="scope">
            <span class="table_text">{{ scope.row.createTime | subTime }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary"
                       @click="handleUpdate(scope.row)">编辑
            </el-button>
            <el-button size="mini" type="danger"
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
        <el-button style="margin-left: 10px;float: right" @click="createClick" type="primary"><i class="el-icon-plus"></i>添加
        </el-button>
      </div>

      <el-dialog :modal="false" @close="cancel('config')" title="Config Information" width="550px" :visible.sync="configOption">

        <el-form label-position="left" :model="config" :rules="rules" ref="config" label-width="110px">
          <el-form-item v-show="dialogStatus=='create'" label="org"  prop="orgId">
            <tree-select style="font-size: 12px" url="/upms/org/tree" @org-click="orgClick" v-model="config.orgId"></tree-select>
          </el-form-item>

          <el-form-item label="key"  prop="key">
            <el-input :disabled="dialogStatus=='update'" v-model="config.key" placeholder="Please enter the key" >
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
  import { queryTriggerList, addTrigger, getTrigger, putTrigger, delTrigger } from '@/api/activiti/trigger'
  import { mapGetters } from 'vuex'
  export default {
    name: 'menu',
    data() {
      return {
        pageTotal: null
      }
    },
    created() {
    },
    computed: {
      ...mapGetters([
        'elements',
        'permissions',
        'client'
      ])
    },
    methods: {
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
