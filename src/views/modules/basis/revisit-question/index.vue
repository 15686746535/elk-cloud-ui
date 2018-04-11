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
    <el-row :style="{height: (client.height-125) + 'px'}">
      <el-col :style="{height: (client.height-125) + 'px',width: (client.width-570) + 'px'}">
        <el-card>

        </el-card>
      </el-col>
      <el-col style="width: 570px"  :style="{height: (client.height-125) + 'px'}" >

        <el-card :style="{height: (client.height-185) + 'px'}" body-style="padding: 0;" style="border-bottom: none; border-radius:0 4px 0 0;z-index: 50;line-height: 50px;overflow-y: auto;box-shadow: none;">
        </el-card>
        <el-card body-style="padding: 0;" style="height:60px; border-radius:0 0 4px 0;border-top: none;border-top: 1px solid #dcdfe6;">
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { getQuestion, getObj, addObj } from '@/api/student/revisit-question'
  import { mapGetters } from 'vuex'
  import { getRevisitQuestionNaireList, addQuestionNaireList, getQuestionNaireList} from '@/api/student/revisit-questionnaire'
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
        questionnaireList: [],
        total: null,
        questionnaireLoading: true,
        showModule: 'list',
        questionnaireListQuery: {
          page: 1,
          limit: 20,
          subject: 1
        },
        tableKey: 0,
        dialogStatus: ''
      }
    },
    created() {
      this.getQuestionnaireList()
    },
    methods: {
      getQuestionnaireList() {
        this.questionnaireLoading = true
        getRevisitQuestionNaireList(this.questionnaireListQuery).then(response => {
          console.log('=================== 问卷 -=============')
          console.log(response.data.data)
          this.questionnaireList = response.data.data
          this.total = response.data.data.totalCount
          this.questionnaireLoading = false
        })
      },
      handleSubject() {}
    }
  }
</script>
