<template>
  <div class="app-container calendar-list-container" :style="{height: client.height + 'px'}" >
    <el-card body-style="padding:10px 20px;" style="margin-bottom: 5px;height: 80px">
      <div class="filter-container">
        <div style="float:left;margin-top: 8px">
          <el-radio-group @change="handleSubject" v-model="questionnaireListQuery.subject">
            <el-radio-button label="1">科目一</el-radio-button>
            <el-radio-button label="2">科目二</el-radio-button>
            <el-radio-button label="3">科目三</el-radio-button>
          </el-radio-group>
        </div>
      </div>
    </el-card>
    <!--<el-card>
      <el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit
                highlight-current-row style="width: 100%">
        <el-table-column type="selection" class="selection" align="center" prop='uuid'></el-table-column>
        <el-table-column type="index" label="序号"  align="center" width="50"></el-table-column>
        <el-table-column label="问卷ID">
          <template slot-scope="scope">
            <span>{{scope.row.questionnaireId}}</span>
          </template>
        </el-table-column>
        <el-table-column label="问题">
          <template slot-scope="scope">
            <span>{{scope.row.question}}</span>
          </template>
        </el-table-column>
        <el-table-column label="答案A">
          <template slot-scope="scope">
            <span>{{scope.row.item1}}</span>
          </template>
        </el-table-column>
        <el-table-column label="答案B">
          <template slot-scope="scope">
            <span>{{scope.row.item2}}</span>
          </template>
        </el-table-column>
        <el-table-column label="答案C">
          <template slot-scope="scope">
            <span>{{scope.row.item3}}</span>
          </template>
        </el-table-column>
        <el-table-column label="答案D">
          <template slot-scope="scope">
            <span>{{scope.row.item4}}</span>
          </template>
        </el-table-column>
        <el-table-column label="答案5">
          <template slot-scope="scope">
            <span>{{scope.row.item5}}</span>
          </template>
        </el-table-column>
        <el-table-column label="答案6">
          <template slot-scope="scope">
            <span>{{scope.row.item6}}</span>
          </template>
        </el-table-column>
        <el-table-column label="答案类型">
          <template slot-scope="scope">
            <span>{{scope.row.itemType1}}</span>
          </template>
        </el-table-column>
        <el-table-column label="答案类型">
          <template slot-scope="scope">
            <span>{{scope.row.itemType2}}</span>
          </template>
        </el-table-column>
        <el-table-column label="答案类型">
          <template slot-scope="scope">
            <span>{{scope.row.itemType3}}</span>
          </template>
        </el-table-column>
        <el-table-column label="答案类型">
          <template slot-scope="scope">
            <span>{{scope.row.itemType4}}</span>
          </template>
        </el-table-column>
        <el-table-column label="答案类型">
          <template slot-scope="scope">
            <span>{{scope.row.itemType5}}</span>
          </template>
        </el-table-column>
        <el-table-column label="答案类型">
          <template slot-scope="scope">
            <span>{{scope.row.itemType6}}</span>
          </template>
        </el-table-column>
        <el-table-column label="删除标记">
          <template slot-scope="scope">
            <span>{{scope.row.delFlag}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作人">
          <template slot-scope="scope">
            <span>{{scope.row.operator}}</span>
          </template>
        </el-table-column>
        <el-table-column label="创建时间">
          <template slot-scope="scope">
            <span>{{scope.row.createTime}}</span>
          </template>
        </el-table-column>
        <el-table-column label="更新时间">
          <template slot-scope="scope">
            <span>{{scope.row.updateTime}}</span>
          </template>
        </el-table-column>
        <el-table-column label="排序">
          <template slot-scope="scope">
            <span>{{scope.row.sort}}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="success"
                       @click="update(scope.row)">编辑
            </el-button>
            <el-button size="mini" type="danger"
                       @click="delete(scope.row)">删除
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
    </el-card>-->
    <el-card :style="{height: (client.height-125) + 'px',width: (client.width-570) + 'px'}" style="float: left;border-radius:4px 0 0 4px;overflow: auto;">
        <el-table :data="questionnaireList" :height="(client.height-225)" highlight-current-row stripe v-loading="questionnaireLoading" element-loading-text="给我一点时间">
        <el-table-column type="index" align="center" label="编号" width="50">
        </el-table-column>
        <el-table-column align="center" label="问卷名字">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="创建时间">
          <template slot-scope="scope">
            <span>{{ scope.row.createTime | subTime('dateTime')}}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="创建人">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="备注">
          <template slot-scope="scope">
            <span>{{ scope.row.state }}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.state" active-value="0" inactive-value="1" @change="questionnaireChange(scope.row)" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
          </template>
        </el-table-column>
      </el-table>

      <div v-show="!questionnaireLoading" class="pagination-container" style="margin-top: 20px">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                       :current-page.sync="questionnaireListQuery.page" background
                       style="float:left;"
                       :page-sizes="[10,20,30, 50]" :page-size="questionnaireListQuery.limit"
                       layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>

        <el-button style="float:right;" @click="createClick" type="primary"><i class="el-icon-plus"></i>添加</el-button>
      </div>

    </el-card>

    <el-card :style="{height: (client.height-125) + 'px'}" body-style="padding: 0;" style="width: 570px; border-radius:0 4px 4px 0;overflow: auto;float: left">

    </el-card>

    <el-dialog  @close="cancelQuestionnaire('revisitQuestionnaire')" title="添加问卷" :show-close="false" width="30%" :visible.sync="questionnaireOption">

      <el-form :model="revisitQuestionnaire" :rules="revisitQuestionnaire" ref="revisitQuestionnaire" label-position="center" label-width="100px">
        <el-form-item label="问卷名字" prop="name">
          <el-input v-model="revisitQuestionnaire.name" placeholder="问卷名字" ></el-input>
        </el-form-item>

        <el-form-item label="备注" prop="state">
          <el-input v-model="revisitQuestionnaire.state" placeholder="备注" ></el-input>
        </el-form-item>

      </el-form>

      <div slot="footer">
        <el-button @click="cancelQuestionnaire('revisitQuestionnaire')">取 消</el-button>
        <el-button type="primary" @click="createQuestionnaire('revisitQuestionnaire')">确 定</el-button>
      </div>
    </el-dialog>


  </div>
</template>

<script>
  import { getQuestion, getObj, addObj } from '@/api/student/revisit-question'
  import { mapGetters } from 'vuex'
  import { getRevisitQuestionnaireList, addQuestionnaireList, getQuestionnaireList, putQuestionnaireList } from '@/api/student/revisit-questionnaire'
  import waves from '@/directive/waves/index.js'// 水波纹指令

  export default {
    name: 'table_revisitQuestion',
    directives: {
      waves
    },
    computed: {
      ...mapGetters([
        'permissions',
        'client'
      ])
    },
    data() {
      return {
        revisitQuestion: {},
        revisitQuestionnaire: {},
        questionnaireList: [],
        total: null,
        questionnaireLoading: true,
        questionnaireOption: false,
        questionnaireListQuery: {
          page: 1,
          limit: 20,
          subject: 1
        }
      }
    },
    created() {
      this.getQuestionnaireList()
    },
    methods: {
      handleSizeChange(val) {
        this.questionnaireListQuery.limit = val
        this.getQuestionnaireList()
      },
      handleCurrentChange(val) {
        this.questionnaireListQuery.page = val
        this.getQuestionnaireList()
      },
      /* 查询问卷集合 */
      getQuestionnaireList() {
        this.questionnaireLoading = true
        getRevisitQuestionnaireList(this.questionnaireListQuery).then(response => {
          console.log('=================== 问卷 -=============')
          console.log(response.data.data)
          this.questionnaireList = response.data.data.list
          this.total = response.data.data.totalCount
          this.questionnaireLoading = false
        })
      },
      /* 科目查询 */
      handleSubject() {
        this.revisitQuestionnaire.subject = this.questionnaireListQuery.subject
        this.getQuestionnaireList()
      },
      /* 禁用启用开关 */
      questionnaireChange(row) {
        this.revisitQuestionnaire = row
        if (this.revisitQuestionnaire.state === 1) {
          this.revisitQuestionnaire.state = 0
        } else if (this.revisitQuestionnaire.state === 0) {
          this.revisitQuestionnaire.state = 1
        }
        putQuestionnaireList(this.revisitQuestionnaire).then(response => {
          this.getQuestionnaireList()
        })
      },
      createClick() {
        this.revisitQuestionnaire = {}
        this.questionnaireOption = true
      },
      createQuestionnaire(formName) {
        const set = this.$refs
        set[formName].validate(valid => {
          if (valid) {
            addQuestionnaireList(this.revisitQuestionnaire).then(() => {
              this.questionnaireOption = false
              this.getQuestionnaireList()
            })
          } else {
            return false
          }
        })
      },
      cancelQuestionnaire(formName) {
        this.questionnaireOption = false
        const set = this.$refs
        set[formName].resetFields()
      }
    }
  }
</script>
