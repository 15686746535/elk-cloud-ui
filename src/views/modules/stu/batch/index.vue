<template>
  <div class="app-container calendar-list-container" :style="{height: client.height + 'px'}" >
    <el-card body-style="padding:10px 20px;" style="margin-bottom: 5px;height: 80px">
      <div class="filter-container">
        <div style="float:left;margin-top: 8px">
          <div @click="handleSubject('1',$event)" style="border-radius: 4px 0 0 4px;" class="subjectBtn subjectBtn_selected" >科目一</div>
          <div @click="handleSubject('2',$event)" style="border-radius: 0;" class="subjectBtn" >科目二</div>
          <div @click="handleSubject('3',$event)" style="border-radius: 0;" class="subjectBtn" >科目三</div>
          <div @click="handleSubject('4',$event)" style="border-radius: 0 4px 4px 0; margin-right: 10px;" class="subjectBtn" >科目四</div>
        </div>
        <div style="float:right;">
          <el-date-picker style="width: 360px;" v-model="listQuery.interval" type="daterange" align="right" unlink-panels range-separator="—" start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>


          <span v-show="'1' === listQuery.subject"><dict v-model="listQuery.examField" dictType="dict_exam_field1" style="width: 240px;margin-top: 8px"  placeholder="科目一考试场地"></dict></span>
          <span v-show="'2' === listQuery.subject"><dict v-model="listQuery.examField" dictType="dict_exam_field2" style="width: 240px;margin-top: 8px"  placeholder="科目二考试场地"></dict></span>
          <span v-show="'3' === listQuery.subject"><dict v-model="listQuery.examField" dictType="dict_exam_field3" style="width: 240px;margin-top: 8px"  placeholder="科目三考试场地"></dict></span>
          <span v-show="'4' === listQuery.subject"><dict v-model="listQuery.examField" dictType="dict_exam_field4" style="width: 240px;margin-top: 8px"  placeholder="科目四考试场地"></dict></span>

          <el-button type="primary" v-waves @click="searchClick" >搜索</el-button>
        </div>
      </div>
    </el-card>
    <el-card :style="{height: (client.height - 125) + 'px'}">
      <el-table :key='tableKey' :data="list"  v-loading="listLoading" :height="client.height - 225" :stripe="true" element-loading-text="给我一点时间" fithighlight-current-row style="width: 100%;text-align: center;">
        <!--<el-table-column type="selection" class="selection" align="center" prop='uuid'></el-table-column>-->
        <el-table-column type="index" label="序号"  align="center" width="50"></el-table-column>
        <el-table-column align="center"  label="科目">
          <template slot-scope="scope">
            <span>{{scope.row.subject == 1?'科目一':scope.row.subject == 2?'科目二':scope.row.subject == 3?'科目三':scope.row.subject == 4?'科目四':''}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center"  label="考试时间">
          <template slot-scope="scope">
            <span>{{scope.row.examTime | parseTime('{y}-{m}-{d}')}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center"  label="考试场地">
          <template slot-scope="scope">
            <span>{{scope.row.examField}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center"  label="人数">
          <template slot-scope="scope">
            <span>{{scope.row.hasReserved}}/{{scope.row.stuCount}}</span>
          </template>
        </el-table-column>

        <!--<el-table-column align="center" label="批次">-->
          <!--<template slot-scope="scope">-->
            <!--<span>{{scope.row.batch}}</span>-->
          <!--</template>-->
        <!--</el-table-column>-->

        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <!--<el-button-group>-->
              <el-button size="mini" type="success" @click="see(scope.row.batchId, studentListQuery.state)" plain>查 看</el-button>
              <el-button size="mini" type="primary" @click="handleUpdate(scope.row)" plain>编 辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删 除</el-button>
            <!--</el-button-group>-->
          </template>
        </el-table-column>

      </el-table>
      <div v-show="!listLoading" class="pagination-container" style="margin-top: 20px">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                       :current-page.sync="listQuery.page" background
                       style="float:left;"
                       :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit"
                       layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>

        <el-button style="float:right;" @click="createClick" type="primary"><i class="el-icon-plus"></i>添加</el-button>
      </div>
    </el-card>

    <el-dialog  @close="cancel('batch')" title="考试设置" :show-close="false" width="30%" :visible.sync="batchOption">

      <el-form :model="batch"  ref="batch" label-width="100px">
        <!--<el-form-item v-show="dialogStatus=='create'" label="考试科目">-->
          <!--<el-select @blur="setDictType" v-model="batch.subject"  style="width: 100%"  clearable placeholder="考试科目">-->
            <!--<el-option-->
              <!--v-for="item in subject"-->
              <!--:key="item.value"-->
              <!--:label="item.label"-->
              <!--:value="item.value">-->
            <!--</el-option>-->
          <!--</el-select>-->
        <!--</el-form-item>-->
        <el-form-item label="考试场地">
          <!--<span v-if="batch.subject != null">-->
            <span v-show="'1' === batch.subject"><dict v-model="batch.examField" dictType="dict_exam_field1" style="width: 100%;"  placeholder="科目一考试场地"></dict></span>
            <span v-show="'2' === batch.subject"><dict v-model="batch.examField" dictType="dict_exam_field2" style="width: 100%;"  placeholder="科目二考试场地"></dict></span>
            <span v-show="'3' === batch.subject"><dict v-model="batch.examField" dictType="dict_exam_field3" style="width: 100%;"  placeholder="科目三考试场地"></dict></span>
            <span v-show="'4' === batch.subject"><dict v-model="batch.examField" dictType="dict_exam_field4" style="width: 100%;"  placeholder="科目四考试场地"></dict></span>
          <!--</span>-->
          <!--<span v-else><dict dictType="null" style="width: 100%;"  placeholder="考试场地"  ></dict></span>-->
        </el-form-item>
        <el-form-item label="人数"  prop="username">
          <el-input v-model="batch.stuCount" placeholder="人数" ></el-input>
        </el-form-item>
        <el-form-item label="考试时间">
          <el-date-picker style="width: 100%" type="date" placeholder="考试时间" v-model="batch.examTime"></el-date-picker>
        </el-form-item>

      </el-form>

      <div slot="footer">
        <el-button @click="cancel('batch')">取 消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="create('batch')">确 定</el-button>
        <el-button v-else type="primary" @click="update('batch')">修 改</el-button>
      </div>
    </el-dialog>


    <el-dialog :close-on-click-modal="false" @close="closeExamOption" title="考试计划操作" :visible.sync="examOption">
      <!--<div style="width:450px; margin:-30px auto 10px">-->
        <!--<div @click="handleField('0',$event)" class="stateBtn stateBtn_selected" >审核中</div>-->
        <!--<div @click="handleField('1',$event)" class="stateBtn" >约考中</div>-->
        <!--<div @click="handleField('2',$event)" class="stateBtn" >已报考</div>-->
        <!--<div @click="handleField('3',$event)" class="stateBtn" >失 败</div>-->
      <!--</div>-->
        <el-tabs type="border-card" @tab-click="handleField">
          <el-tab-pane name="all" label="申请名单">
            <el-table :data="examBespeak" :height="(client.height/2)" @selection-change="handleSelectionChange"  v-loading="examBespeakLoading" element-loading-text="给我一点时间" border fithighlight-current-row style="width: 100%;">
              <el-table-column type="selection" class="selection" align="center" prop='uuid'></el-table-column>
              <el-table-column type="index" label="序号" align="center" width="50"></el-table-column>
              <el-table-column align="center"  label="学员">
                <template slot-scope="scope">
                  <span>{{scope.row.name}}</span>
                </template>
              </el-table-column>
              <el-table-column  align="center" label="电话">
                <template slot-scope="scope">
                  <span>{{scope.row.mobile}}</span>
                </template>
              </el-table-column>
              <el-table-column  align="center" label="车型">
                <template slot-scope="scope">
                  <span>{{scope.row.motorcycleType}}</span>
                </template>
              </el-table-column>
              <el-table-column  align="center" label="考试时间">
                <template slot-scope="scope">
                  <span>{{scope.row.examTime | subTime}}</span>
                </template>
              </el-table-column>
              <el-table-column  align="center" label="状态">
                <template slot-scope="scope">
                  <!--<span>{{scope.row.state}}</span>-->

                  <el-tag v-if="scope.row.state === '0'" type="warning" size="small" style="border-radius: 20px;">审核中</el-tag>
                  <el-tag v-else-if="scope.row.state === '1'" type="primary" size="small" style="border-radius: 20px;">报考中</el-tag>
                  <el-tag v-else-if="scope.row.state === '2'" type="success" size="small" style="border-radius: 20px;">已报考</el-tag>
                  <el-tag v-else-if="scope.row.state === '3'" type="danger" size="small" style="border-radius: 20px;">失败</el-tag>

                </template>
              </el-table-column>
              <el-table-column align="center" label="操作">
                <template slot-scope="scope">
                  <el-button size="mini" type="danger" @click="revokeExam(scope.row)">取消约考</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane name="0" label="待审核">
            <el-table :data="examBespeak" :height="(client.height/2)" @selection-change="handleSelectionChange"  v-loading="examBespeakLoading" element-loading-text="给我一点时间" border fithighlight-current-row style="width: 100%;">
              <el-table-column type="selection" class="selection" align="center" prop='uuid'></el-table-column>
              <el-table-column type="index" label="序号" align="center" width="50"></el-table-column>
              <el-table-column align="center"  label="学员">
                <template slot-scope="scope">
                  <span>{{scope.row.name}}</span>
                </template>
              </el-table-column>
              <el-table-column  align="center" label="电话">
                <template slot-scope="scope">
                  <span>{{scope.row.mobile}}</span>
                </template>
              </el-table-column>
              <el-table-column  align="center" label="车型">
                <template slot-scope="scope">
                  <span>{{scope.row.motorcycleType}}</span>
                </template>
              </el-table-column>
              <el-table-column  align="center" label="考试时间">
                <template slot-scope="scope">
                  <span>{{scope.row.examTime | subTime}}</span>
                </template>
              </el-table-column>
              <el-table-column  align="center" label="状态">
                <template slot-scope="scope">
                  <!--<span>{{scope.row.state}}</span>-->

                  <el-tag v-if="scope.row.state === '0'" type="warning" size="small" style="border-radius: 20px;">审核中</el-tag>
                  <el-tag v-else-if="scope.row.state === '1'" type="primary" size="small" style="border-radius: 20px;">报考中</el-tag>
                  <el-tag v-else-if="scope.row.state === '2'" type="success" size="small" style="border-radius: 20px;">已报考</el-tag>
                  <el-tag v-else-if="scope.row.state === '3'" type="danger" size="small" style="border-radius: 20px;">失败</el-tag>

                </template>
              </el-table-column>
              <el-table-column align="center" label="操作">
                <template slot-scope="scope">
                  <el-button size="mini" type="danger" @click="revokeExam(scope.row)">取消约考</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane name="1" label="待约考">
            <el-table :data="examBespeak" :height="(client.height/2)" @selection-change="handleSelectionChange"  v-loading="examBespeakLoading" element-loading-text="给我一点时间" border fithighlight-current-row style="width: 100%;">
              <el-table-column type="selection" class="selection" align="center" prop='uuid'></el-table-column>
              <el-table-column type="index" label="序号" align="center" width="50"></el-table-column>
              <el-table-column align="center"  label="学员">
                <template slot-scope="scope">
                  <span>{{scope.row.name}}</span>
                </template>
              </el-table-column>
              <el-table-column  align="center" label="电话">
                <template slot-scope="scope">
                  <span>{{scope.row.mobile}}</span>
                </template>
              </el-table-column>
              <el-table-column  align="center" label="车型">
                <template slot-scope="scope">
                  <span>{{scope.row.motorcycleType}}</span>
                </template>
              </el-table-column>
              <el-table-column  align="center" label="考试时间">
                <template slot-scope="scope">
                  <span>{{scope.row.examTime | subTime}}</span>
                </template>
              </el-table-column>
              <el-table-column  align="center" label="状态">
                <template slot-scope="scope">
                  <!--<span>{{scope.row.state}}</span>-->

                  <el-tag v-if="scope.row.state === '0'" type="warning" size="small" style="border-radius: 20px;">审核中</el-tag>
                  <el-tag v-else-if="scope.row.state === '1'" type="primary" size="small" style="border-radius: 20px;">报考中</el-tag>
                  <el-tag v-else-if="scope.row.state === '2'" type="success" size="small" style="border-radius: 20px;">已报考</el-tag>
                  <el-tag v-else-if="scope.row.state === '3'" type="danger" size="small" style="border-radius: 20px;">失败</el-tag>

                </template>
              </el-table-column>
              <el-table-column align="center" label="操作">
                <template slot-scope="scope">
                  <el-button size="mini" type="danger" @click="revokeExam(scope.row)">取消约考</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane name="2" label="已约考">
            <el-table :data="examBespeak" :height="(client.height/2)" @selection-change="handleSelectionChange"  v-loading="examBespeakLoading" element-loading-text="给我一点时间" border fithighlight-current-row style="width: 100%;">
              <el-table-column type="selection" class="selection" align="center" prop='uuid'></el-table-column>
              <el-table-column type="index" label="序号" align="center" width="50"></el-table-column>
              <el-table-column align="center"  label="学员">
                <template slot-scope="scope">
                  <span>{{scope.row.name}}</span>
                </template>
              </el-table-column>
              <el-table-column  align="center" label="电话">
                <template slot-scope="scope">
                  <span>{{scope.row.mobile}}</span>
                </template>
              </el-table-column>
              <el-table-column  align="center" label="车型">
                <template slot-scope="scope">
                  <span>{{scope.row.motorcycleType}}</span>
                </template>
              </el-table-column>
              <el-table-column  align="center" label="考试时间">
                <template slot-scope="scope">
                  <span>{{scope.row.examTime | subTime}}</span>
                </template>
              </el-table-column>
              <el-table-column  align="center" label="状态">
                <template slot-scope="scope">
                  <!--<span>{{scope.row.state}}</span>-->

                  <el-tag v-if="scope.row.state === '0'" type="warning" size="small" style="border-radius: 20px;">审核中</el-tag>
                  <el-tag v-else-if="scope.row.state === '1'" type="primary" size="small" style="border-radius: 20px;">报考中</el-tag>
                  <el-tag v-else-if="scope.row.state === '2'" type="success" size="small" style="border-radius: 20px;">已报考</el-tag>
                  <el-tag v-else-if="scope.row.state === '3'" type="danger" size="small" style="border-radius: 20px;">失败</el-tag>

                </template>
              </el-table-column>
              <el-table-column align="center" label="操作">
                <template slot-scope="scope">
                  <el-button size="mini" type="danger" @click="revokeExam(scope.row)">取消约考</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane name="3" label="考试名单">
            <el-table :data="examBespeak" :height="(client.height/2)" @selection-change="handleSelectionChange"  v-loading="examBespeakLoading" element-loading-text="给我一点时间" border fithighlight-current-row style="width: 100%;">
              <el-table-column type="selection" class="selection" align="center" prop='uuid'></el-table-column>
              <el-table-column type="index" label="序号" align="center" width="50"></el-table-column>
              <el-table-column align="center"  label="学员">
                <template slot-scope="scope">
                  <span>{{scope.row.name}}</span>
                </template>
              </el-table-column>
              <el-table-column  align="center" label="电话">
                <template slot-scope="scope">
                  <span>{{scope.row.mobile}}</span>
                </template>
              </el-table-column>
              <el-table-column  align="center" label="车型">
                <template slot-scope="scope">
                  <span>{{scope.row.motorcycleType}}</span>
                </template>
              </el-table-column>
              <el-table-column  align="center" label="考试时间">
                <template slot-scope="scope">
                  <span>{{scope.row.examTime | subTime}}</span>
                </template>
              </el-table-column>
              <el-table-column  align="center" label="状态">
                <template slot-scope="scope">
                  <!--<span>{{scope.row.state}}</span>-->

                  <el-tag v-if="scope.row.state === '0'" type="warning" size="small" style="border-radius: 20px;">审核中</el-tag>
                  <el-tag v-else-if="scope.row.state === '1'" type="primary" size="small" style="border-radius: 20px;">报考中</el-tag>
                  <el-tag v-else-if="scope.row.state === '2'" type="success" size="small" style="border-radius: 20px;">已报考</el-tag>
                  <el-tag v-else-if="scope.row.state === '3'" type="danger" size="small" style="border-radius: 20px;">失败</el-tag>

                </template>
              </el-table-column>
              <el-table-column align="center" label="操作">
                <template slot-scope="scope">
                  <el-button size="mini" type="danger" @click="revokeExam(scope.row)">取消约考</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      <!--<el-table :data="examBespeak" :height="(client.height/2)" @selection-change="handleSelectionChange"  v-loading="examBespeakLoading" element-loading-text="给我一点时间" border fithighlight-current-row style="width: 100%;">
        <el-table-column type="selection" class="selection" align="center" prop='uuid'></el-table-column>
        <el-table-column type="index" label="序号" align="center" width="50"></el-table-column>
        <el-table-column align="center"  label="学员">
          <template slot-scope="scope">
            <span>{{scope.row.name}}</span>
          </template>
        </el-table-column>
        <el-table-column  align="center" label="电话">
          <template slot-scope="scope">
            <span>{{scope.row.mobile}}</span>
          </template>
        </el-table-column>
        <el-table-column  align="center" label="车型">
          <template slot-scope="scope">
            <span>{{scope.row.motorcycleType}}</span>
          </template>
        </el-table-column>
        <el-table-column  align="center" label="考试时间">
          <template slot-scope="scope">
            <span>{{scope.row.examTime | subTime}}</span>
          </template>
        </el-table-column>
        <el-table-column  align="center" label="状态">
          <template slot-scope="scope">
            &lt;!&ndash;<span>{{scope.row.state}}</span>&ndash;&gt;

            <el-tag v-if="scope.row.state === '0'" type="warning" size="small" style="border-radius: 20px;">审核中</el-tag>
            <el-tag v-else-if="scope.row.state === '1'" type="primary" size="small" style="border-radius: 20px;">报考中</el-tag>
            <el-tag v-else-if="scope.row.state === '2'" type="success" size="small" style="border-radius: 20px;">已报考</el-tag>
            <el-tag v-else-if="scope.row.state === '3'" type="danger" size="small" style="border-radius: 20px;">失败</el-tag>

          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="revokeExam(scope.row)">取消约考</el-button>
          </template>
        </el-table-column>
      </el-table>-->
      <div slot="footer" style="margin-top: -30px">
        <!--<el-button-group>-->
          <!--<el-button style="margin:0 5px;" type="primary" round>审核通过</el-button>-->
          <!--<el-button style="margin:0 5px;" type="danger" round>失败审核</el-button>-->
        <!--</el-button-group>-->


        <!-- 0默认审核 1是待约考 2是成功约考 3报考成功 -2报考失败 -1审核失败  -->
        <el-button-group v-if="studentListQuery.state === '0'">
          <el-button @click="operation('-1','审核失败')" type="danger" round>失败</el-button>
          <el-button @click="operation('1','审核通过')" type="success" round>通过</el-button>
        </el-button-group>
        <el-button-group v-else-if="studentListQuery.state === '1'">
          <!--<el-button @click="operation('-2','约考失败')" type="danger" round>约考失败</el-button>-->
          <el-button @click="operation('0','撤销成功')" type="info" round>撤销</el-button>
          <el-button @click="operation('2','约考成功')" type="success" round>已约</el-button>
        </el-button-group>
        <el-button-group v-else-if="studentListQuery.state === '2'">
          <el-button @click="operation('-2','报考失败')" type="danger" round>失败</el-button>
          <el-button @click="operation('1','撤销成功')" type="info" round>撤销</el-button>
          <el-button @click="operation('3','报考成功')" type="success" round>成功</el-button>
        </el-button-group>
        <el-button-group v-else-if="studentListQuery.state === '3'">
          <el-button @click="operation('2','撤销成功')" type="primary" round>撤销</el-button>
        </el-button-group>
        <span v-else>
        </span>
      </div>

    </el-dialog>


  </div>
</template>

<script>
  import { getBatchList, delObj, addObj, putObj } from '@/api/student/batch'
  import { getexambespeakbyid, delexambespeak, putExamBespeak } from '@/api/student/exambespeak'
  import { mapGetters } from 'vuex'
  import Dict from '@/components/Dict'
  import waves from '@/directive/waves/index.js' // 水波纹指令
  import { parseTime } from '@/utils/index'
  import { removeAllSpace } from '@/utils/validate'

  export default {
    name: 'table_batch',
    components: {
      Dict
    },
    directives: {
      waves
    },
    data() {
      return {
        batch: {
          subject: '1'
        },
        list: [],
        total: null,
        listLoading: true,
        examBespeakLoading: true,
        listQuery: {
          page: 1,
          limit: 20,
          subject: '1',
          interval: [],
          beginTime: null,
          endTime: null,
          examField: null
        },
        tableKey: 0,
        dialogStatus: '',
        subject: [{
          value: '1',
          label: '科目一'
        }, {
          value: '2',
          label: '科目二'
        }, {
          value: '3',
          label: '科目三'
        }, {
          value: '4',
          label: '科目四'
        }],
        batchOption: false,
        examOption: false,
        examBespeak: [],
        examBespeakList: {
          studentIds: [],
          state: null,
          batchId: null
        },
        studentListQuery: {
          batchId: null,
          state: '0'
        }
      }
    },
    created() {
      this.getList()
    },
    computed: {
      ...mapGetters([
        'permissions',
        'client'
      ])
    },
    methods: {
      getList() {
        this.listLoading = true
        console.log('========== 查询条件  ====================')
        console.log(this.listQuery)
        getBatchList(this.listQuery).then(response => {
          console.log(response.data)
          this.list = response.data.data.list
          this.total = response.data.data.totalCount
          this.listLoading = false
        })
      },
      setDictType() {
        console.log(this.batch.subject)
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
        this.batch = {}
        this.batch.subject = this.listQuery.subject
        this.dialogStatus = 'create'
        this.batchOption = true
      },
      handleUpdate(val) {
        console.log('=========编辑对象=======')
        console.log(val)
        this.batch = val
        this.dialogStatus = 'update'
        this.batchOption = true
      },
      see(batchId, state) {
        this.examBespeakLoading = true
        this.studentListQuery.batchId = batchId
        this.studentListQuery.state = state
        console.log('============= 查询条件 ===================')
        console.log(this.studentListQuery)
        getexambespeakbyid(this.studentListQuery).then(response => {
          console.log('============= 单场次报考学员信息 ===================')
          console.log(response.data.data)
          this.examBespeak = response.data.data
          this.examBespeakLoading = false
        })
        this.examBespeakList.batchId = batchId
        this.examOption = true
      },
      closeExamOption() {
        // this.handleField(1, e)
        this.getList()
      },
      create(formName) {
        const set = this.$refs
        console.log('============= 添加信息 ===================')
        console.log(this.batch)
        this.batch.batch = '<' + parseTime(this.batch.examTime, '{y}-{m}-{d}').toString().substr(0, 10) + '>  ' + this.batch.examField
        set[formName].validate(valid => {
          if (valid) {
            addObj(this.batch)
              .then(() => {
                this.batchOption = false
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
        this.batchOption = false
        this.batch = {}
        const set = this.$refs
        set[formName].resetFields()
        this.getList()
      },
      update(formName) {
        const set = this.$refs
        this.batch.batch = this.batch.examTime
        set[formName].validate(valid => {
          if (valid) {
            putObj(this.batch).then(response => {
              console.log(response.data)
              this.batchOption = false
              this.getList()
              // this.$notify({
              //   title: '成功',
              //   message: '修改成功',
              //   type: 'success',
              //   duration: 2000
              // })
            })
          } else {
            return false
          }
        })
      },
      searchClick() {
        this.listQuery.page = 1
        this.examTimeBlur()
        this.getList()
      },
      handleDelete(val) {
        if (val.hasReserved === 0) {
          this.$confirm('此操作将永久删除, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            delObj(val.batchId).then(() => {
              this.$notify({
                title: '成功',
                message: '删除成功',
                type: 'success',
                duration: 2000
              })
              this.getList()
            })
          })
        } else {
          this.$alert('当前批次已被预约，不可操作', '提示', {
            type: 'warning'
          })
        }
      },
      // 取消约考
      revokeExam(val) {
        this.$confirm('此操作将取消该学员约考, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delexambespeak(val.examBespeakId).then(() => {
            this.see(val.batchId,this.studentListQuery.state)
            this.$notify({
              title: '成功',
              message: '取消成功',
              type: 'success',
              duration: 2000
            })
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消操作'
          })
        })
      },
      handleSelectionChange(val) {
        this.examBespeakList.studentIds = []
        for (var i = 0; i < val.length; i++) {
          this.examBespeakList.studentIds.push(val[i].studentId)
        }
        console.log(val)
        console.log(this.examBespeakList.studentIds)
      },
      // 根据状态查询约考学员
      handleField(state, e) {
        this.studentListQuery.state = state.name
        if (state.name === 'all') this.studentListQuery.state = null
        // var a = document.getElementsByClassName('stateBtn')
        // for (var i = 0; i < a.length; i++) {
        //   a[i].classList.remove('stateBtn_selected')
        // }
        // e.currentTarget.classList.add('stateBtn_selected')
        this.see(this.studentListQuery.batchId, this.studentListQuery.state)
        console.log('=====================================')
        console.log(this.studentListQuery.state)
      },
      operation(state, str) {
        if (this.examBespeakList.studentIds.length === 0) {
          this.$alert('请先选择学员', '提示', {
            confirmButtonText: '确定',
            type: 'warning'
          })
        } else {
          this.examBespeakList.state = state
          putExamBespeak(this.examBespeakList).then(() => {
            this.see(this.studentListQuery.batchId, this.studentListQuery.state)
            this.$notify({
              title: '成功',
              message: str,
              type: 'success',
              duration: 2000
            })
          })
        }
      },
      // 根据科目查询场地
      handleSubject(field, e) {
        this.batch = {}
        this.listQuery.page = 1
        this.listQuery.subject = field
        this.batch.subject = field
        this.listQuery.examField = null
        this.listQuery.interval = []
        this.listQuery.beginTime = null
        this.listQuery.endTime = null
        var a = document.getElementsByClassName('subjectBtn')
        for (var i = 0; i < a.length; i++) {
          a[i].classList.remove('subjectBtn_selected')
        }
        e.currentTarget.classList.add('subjectBtn_selected')
        this.getList()
      },
      examTimeBlur() {
        console.log('=============  我正在转换时间范围 ================')
        if (this.listQuery.interval === null) {
          this.listQuery.interval = []
          this.listQuery.beginTime = null
          this.listQuery.endTime = null
        }
        if (this.listQuery.interval.length !== 0) {
          this.listQuery.beginTime = this.listQuery.interval[0]
          this.listQuery.endTime = this.listQuery.interval[1]
        }
        console.log(this.listQuery.interval)
        console.log(this.listQuery.beginTime)
        console.log(this.listQuery.endTime)
        console.log('=============  完成 ================')
      }
    }
  }
</script>
<style>
  .stateBtn{
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    -webkit-appearance: none;
    text-align: center;
    box-sizing: border-box;
    outline: none;
    margin:0 12px;
    transition: .1s;
    font-weight: 500;
    padding: 12px 20px;
    font-size: 14px;
    border-radius: 4px;
    width: 84px;
    color: #409eff;
    background: #ecf5ff;
    border: 1px solid #b3d8ff;
  }
  .stateBtn:hover{
    color: #fff;
    background-color: #409eff;
    border-color: #409eff;
  }
  .stateBtn_selected{
    color: #fff;
    background-color: #409eff;
    border-color: #409eff;
  }
  .subjectBtn{
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    -webkit-appearance: none;
    text-align: center;
    box-sizing: border-box;
    outline: none;
    margin:0 -3px;
    transition: .1s;
    font-weight: 500;
    padding: 12px 20px;
    font-size: 14px;
    border-radius: 4px;
    width: 84px;
    color: #409eff;
    background: #ecf5ff;
    border: 1px solid #b3d8ff;
  }
  .subjectBtn:hover{
    color: #fff;
    background-color: #409eff;
    border-color: #409eff;
  }
  .subjectBtn_selected{
    color: #fff;
    background-color: #409eff;
    border-color: #409eff;
  }
</style>
