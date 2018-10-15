<template>
  <div style="height: 100%" class="batch-page">
    <el-card v-show="!examOption" style="height: 100%; ">
      <el-row :gutter="5" style="height: 50px">
        <el-col :span="8">
          <el-radio-group size="mini" @change="handleSubject" v-model="listQuery.subject">
            <el-radio-button label="1">科目一</el-radio-button>
            <el-radio-button label="2">科目二</el-radio-button>
            <el-radio-button label="3">科目三</el-radio-button>
            <el-radio-button label="4">科目四</el-radio-button>
          </el-radio-group>
        </el-col>
        <el-col :span="6">
          <el-date-picker value-format="timestamp" size="mini" style="width: 100%;" v-model="listQuery.interval" type="daterange" align="left" unlink-panels range-separator="—" start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>
        </el-col>
        <el-col :span="4">
          <span v-show="'1' === listQuery.subject"><dict size="mini" v-model="listQuery.examField" dictType="dict_exam_field1" placeholder="科目一考试场地"></dict></span>
          <span v-show="'2' === listQuery.subject"><dict size="mini" v-model="listQuery.examField" dictType="dict_exam_field2" placeholder="科目二考试场地"></dict></span>
          <span v-show="'3' === listQuery.subject"><dict size="mini" v-model="listQuery.examField" dictType="dict_exam_field3" placeholder="科目三考试场地"></dict></span>
          <span v-show="'4' === listQuery.subject"><dict size="mini" v-model="listQuery.examField" dictType="dict_exam_field4" placeholder="科目四考试场地"></dict></span>
        </el-col>
        <el-col :span="4">
          <el-input @keyup.enter.native="searchClick" size="mini" placeholder="学员姓名/电话/身份证" v-model="listQuery.stuCondition"></el-input>
        </el-col>
        <el-col :span="1">
          <el-button type="primary" size="mini" @click="searchClick" ><i class="el-icon-search"></i> 搜 索</el-button>
        </el-col>
      </el-row>
      <!--{{permissions}}-->
      <el-table :key='tableKey' :data="list"  v-loading="listLoading" :height="tableHeight - 190" :stripe="true" element-loading-text="给我一点时间" fit highlight-current-row style="width: 100%;text-align: center;">
        <el-table-column type="index" label="序号"  align="center" width="50"></el-table-column>
        <el-table-column align="center"  label="科目" width="80">
          <template slot-scope="scope">
            <span>{{scope.row.subject | subjectFilter}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center"  label="考试时间"  width="100">
          <template slot-scope="scope">
            <span>{{scope.row.examTime | subTime}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="预约截至日期" width="110">
          <template slot-scope="scope">
            {{scope.row.expiryTime | subTime}}
          </template>
        </el-table-column>
        <el-table-column align="center"  label="已约" width="50">
          <template slot-scope="scope">
            <!--<span>{{scope.row.hasReserved}}/{{scope.row.stuCount}}</span>-->
            <span>{{scope.row.stuCount<0?0:scope.row.stuCount}}</span>
          </template>
        </el-table-column>
        <el-table-column align="left"  label="考试场地"  show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{scope.row.examField}}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="操作" width="240">
          <template slot-scope="scope">
            <!--<el-button-group>-->
              <el-button size="mini" type="success" @click="look(scope.row)" plain>查 看</el-button>
              <el-button size="mini" type="primary" v-if="permissions.stu_exam_update" @click="handleUpdate(scope.row)" plain>编 辑</el-button>
              <el-button size="mini" type="danger" v-if="permissions.stu_exam_del" @click="handleDelete(scope.row)">删 除</el-button>
            <!--</el-button-group>-->
          </template>
        </el-table-column>

      </el-table>
      <div v-show="!listLoading" class="pagination-container" style="margin-top: 20px;">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                       :current-page.sync="listQuery.page" background
                       style="float:left;"
                       :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit"
                       layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>

        <el-button style="float:right;margin-right: 10px" @click="createsClick" size="small" v-if="permissions.stu_exam_add" type="primary"><i class="el-icon-plus"></i>批量添加</el-button>
        <el-button style="float:right;margin-right: 10px" @click="createClick" size="small" v-if="permissions.stu_exam_add" type="primary"><i class="el-icon-plus"></i>添加</el-button>
      </div>
    </el-card>
    <el-card v-show="examOption" style="height: 100%; ">
      <el-select v-model="studentListQuery.categoryId" collapse-tags style="width: 200px;position: absolute;z-index: 66;right: 100px;top: 54px;" size="mini" filterable placeholder="选择显示服务包购买情况">
        <el-option v-for="service in financeList" :key="service.categoryId" :label="service.name" :value="service.categoryId">
        </el-option>
      </el-select>

      <el-button @click="close" size="small" type="danger" style="position: absolute;z-index: 66;right: 40px;top: 54px;">返回</el-button>
      <el-tabs body-style="padding:0;" v-model="bespeakTabs" type="border-card" @tab-click="handleField" style="height: 100%; ">
        <el-tab-pane name="all" label="申请名单">
          <el-table :data="examBespeak" :height="tableHeight - 180" @selection-change="handleSelectionChange"  v-loading="examBespeakLoading" element-loading-text="给我一点时间"  fit highlight-current-row style="width: 100%;">
            <el-table-column type="index" label="序号" align="center" width="50"></el-table-column>
            <el-table-column align="center"  label="学员" width="100">
              <template slot-scope="scope">
                <span>{{scope.row.name}}</span>
              </template>
            </el-table-column>
            <el-table-column  align="center" label="电话"  width="110">
              <template slot-scope="scope">
                <span>{{scope.row.mobile}}</span>
              </template>
            </el-table-column>
            <el-table-column  align="center" label="身份证"  width="170">
              <template slot-scope="scope">
                <span>{{scope.row.idNumber}}</span>
              </template>
            </el-table-column>
            <el-table-column  align="center" label="车型" width="60">
              <template slot-scope="scope">
                <span>{{scope.row.motorcycleType}}</span>
              </template>
            </el-table-column>
            <el-table-column  align="center" label="考试次数" width="60">
              <template slot-scope="scope">
                <span>{{scope.row.examCount}}</span>
              </template>
            </el-table-column>
            <el-table-column  align="center" label="欠费" width="60">
              <template slot-scope="scope">
                <span>{{scope.row.arrearage}}</span>
              </template>
            </el-table-column>
            <el-table-column  v-if="service.show" align="center" :label="service.name" min-width="120" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{scope.row.hasService}}</span>
              </template>
            </el-table-column>
            <el-table-column  align="center" label="考场" width="120"  show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{scope.row.examField}}</span>
              </template>
            </el-table-column>
            <el-table-column  align="center" label="入学时间" width="100">
              <template slot-scope="scope">
                <span>{{scope.row.enrolTime | subTime}}</span>
              </template>
            </el-table-column>
            <el-table-column  align="center" label="考试时间" width="100">
              <template slot-scope="scope">
                <span>{{scope.row.examTime | subTime}}</span>
              </template>
            </el-table-column>
            <el-table-column v-if="listQuery.subject === '2'" align="center" label="场训教练" width="100">
              <template slot-scope="scope">
                <span>{{scope.row.fieldCoach}}</span>
              </template>
            </el-table-column>
            <el-table-column v-if="listQuery.subject === '3'" align="center" label="路训教练" width="100">
              <template slot-scope="scope">
                <span>{{scope.row.roadCoach}}</span>
              </template>
            </el-table-column>

            <el-table-column  align="center"
                              label="状态">
              <template slot-scope="scope">
                <!--<span>{{scope.row.state}}</span>-->
                <!-- 0默认审核 1是待约考 2是成功约考 3报考成功 4报考失败 5审核失败  6取消约考  -->
                <span v-if="scope.row.examineState === '4'" style="border-radius: 20px;color: #f56c6c">报考失败</span>
                <span v-else-if="scope.row.examineState === '5'" style="border-radius: 20px;color: #e6a23c">审核失败</span>
                <span v-else-if="scope.row.examineState === '0'" style="border-radius: 20px;color: #909399">待审核</span>
                <span v-else-if="scope.row.examineState === '1'" style="border-radius: 20px;color: #02b7ac">待约考</span>
                <span v-else-if="scope.row.examineState === '2'" style="border-radius: 20px;color: #409eff">已约考</span>
                <span v-else-if="scope.row.examineState === '3'" style="border-radius: 20px;color: #67c23a">报考成功</span>
                <span v-else-if="scope.row.examineState === '6'" style="border-radius: 20px;color: #f56c6c">取消约考</span>
              </template>
            </el-table-column>
            <!--<el-table-column align="center" label="操作">-->
            <!--<template slot-scope="scope">-->
            <!--<el-button size="mini" type="danger" @click="revokeExam(scope.row)">取消约考</el-button>-->
            <!--</template>-->
            <!--</el-table-column>-->
          </el-table>
        </el-tab-pane>
        <el-tab-pane name="0" label="待审核" :disabled="!permissions.stu_exam_examine">
          <el-table :data="examBespeak" :height="tableHeight - 180" @selection-change="handleSelectionChange"  v-loading="examBespeakLoading" element-loading-text="给我一点时间"  fit highlight-current-row style="width: 100%;">
            <el-table-column type="selection" class="selection" align="center" prop='uuid'></el-table-column>
            <el-table-column type="index" label="序号" align="center" width="50"></el-table-column>
            <el-table-column align="center"  label="学员" width="100">
              <template slot-scope="scope">
                <span>{{scope.row.name}}</span>
              </template>
            </el-table-column>
            <el-table-column  align="center" label="电话"  width="110">
              <template slot-scope="scope">
                <span>{{scope.row.mobile}}</span>
              </template>
            </el-table-column>
            <el-table-column  align="center" label="身份证"  width="170">
              <template slot-scope="scope">
                <span>{{scope.row.idNumber}}</span>
              </template>
            </el-table-column>
            <el-table-column  align="center" label="车型" width="50">
              <template slot-scope="scope">
                <span>{{scope.row.motorcycleType}}</span>
              </template>
            </el-table-column>
            <el-table-column  align="center" label="考试次数" width="60">
              <template slot-scope="scope">
                <span>{{scope.row.examCount}}</span>
              </template>
            </el-table-column>
            <el-table-column  align="center" label="欠费" width="60">
              <template slot-scope="scope">
                <span>{{scope.row.arrearage}}</span>
              </template>
            </el-table-column>
            <el-table-column  v-if="service.show" align="center" :label="service.name" min-width="120" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{scope.row.hasService}}</span>
              </template>
            </el-table-column>
            <el-table-column  align="center" label="考场" width="120"  show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{scope.row.examField}}</span>
              </template>
            </el-table-column>
            <el-table-column  align="center" label="入学时间" width="100">
              <template slot-scope="scope">
                <span>{{scope.row.enrolTime | subTime}}</span>
              </template>
            </el-table-column>
            <el-table-column  align="center" label="考试时间" width="100">
              <template slot-scope="scope">
                <span>{{scope.row.examTime | subTime}}</span>
              </template>
            </el-table-column>
            <el-table-column v-if="listQuery.subject === '2'" align="center" label="场训教练" width="100">
              <template slot-scope="scope">
                <span>{{scope.row.fieldCoach}}</span>
              </template>
            </el-table-column>
            <el-table-column v-if="listQuery.subject === '3'" align="center" label="路训教练" width="100">
              <template slot-scope="scope">
                <span>{{scope.row.roadCoach}}</span>
              </template>
            </el-table-column>

            <el-table-column align="center" label="操作" min-width="220">
              <template slot-scope="scope">
                <el-button size="mini" type="danger" @click="revokeExam(scope.row)">取消</el-button>
                <el-button size="mini" type="primary" @click="superviseInfo(scope.row)" :loading="superviseLoading" >监管查询</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane name="1" label="待约考" :disabled="!permissions.stu_exam_bespeak">
          <el-table :data="examBespeak" :height="tableHeight - 180"  @selection-change="handleSelectionChange"  v-loading="examBespeakLoading" element-loading-text="给我一点时间"  fit highlight-current-row style="width: 100%;">
            <el-table-column type="selection" class="selection" align="center" prop='uuid'></el-table-column>
            <el-table-column type="index" label="序号" align="center" width="50"></el-table-column>
            <el-table-column align="center"  label="学员" width="100">
              <template slot-scope="scope">
                <span>{{scope.row.name}}</span>
              </template>
            </el-table-column>
            <el-table-column  align="center" label="电话"  width="110">
              <template slot-scope="scope">
                <span>{{scope.row.mobile}}</span>
              </template>
            </el-table-column>
            <el-table-column  align="center" label="身份证"  width="170">
              <template slot-scope="scope">
                <span>{{scope.row.idNumber}}</span>
              </template>
            </el-table-column>
            <el-table-column  align="center" label="车型" width="60">
              <template slot-scope="scope">
                <span>{{scope.row.motorcycleType}}</span>
              </template>
            </el-table-column>
            <el-table-column  align="center" label="考试次数" width="60">
              <template slot-scope="scope">
                <span>{{scope.row.examCount}}</span>
              </template>
            </el-table-column>
            <el-table-column  align="center" label="欠费" width="60">
              <template slot-scope="scope">
                <span>{{scope.row.arrearage}}</span>
              </template>
            </el-table-column>
            <el-table-column  v-if="service.show" align="center" :label="service.name" min-width="120" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{scope.row.hasService}}</span>
              </template>
            </el-table-column>
            <el-table-column  align="center" label="考场" width="130"  show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{scope.row.examField}}</span>
              </template>
            </el-table-column>
            <el-table-column  align="center" label="入学时间" width="100">
              <template slot-scope="scope">
                <span>{{scope.row.enrolTime | subTime}}</span>
              </template>
            </el-table-column>
            <el-table-column  align="center" label="考试时间" width="100">
              <template slot-scope="scope">
                <span>{{scope.row.examTime | subTime}}</span>
              </template>
            </el-table-column>
            <el-table-column v-if="listQuery.subject === '2'" align="center" label="场训教练" width="100">
              <template slot-scope="scope">
                <span>{{scope.row.fieldCoach}}</span>
              </template>
            </el-table-column>
            <el-table-column v-if="listQuery.subject === '3'" align="center" label="路训教练" width="100">
              <template slot-scope="scope">
                <span>{{scope.row.roadCoach}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="操作">
              <template slot-scope="scope">
                <el-button size="mini" type="danger" @click="revokeExam(scope.row)">取消</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane name="2" label="已约考" :disabled="!permissions.stu_exam_bespeak_ok">
          <el-table :data="examBespeak" :height="tableHeight - 180"  @selection-change="handleSelectionChange"  v-loading="examBespeakLoading" element-loading-text="给我一点时间"  fit highlight-current-row style="width: 100%;">
            <el-table-column type="selection" class="selection" align="center" prop='uuid'></el-table-column>
            <el-table-column type="index" label="序号" align="center" width="50"></el-table-column>
            <el-table-column align="center"  label="学员" width="100">
              <template slot-scope="scope">
                <span>{{scope.row.name}}</span>
              </template>
            </el-table-column>
            <el-table-column  align="center" label="电话"  width="110">
              <template slot-scope="scope">
                <span>{{scope.row.mobile}}</span>
              </template>
            </el-table-column>
            <el-table-column  align="center" label="身份证"  width="170">
              <template slot-scope="scope">
                <span>{{scope.row.idNumber}}</span>
              </template>
            </el-table-column>
            <el-table-column  align="center" label="车型" width="60">
              <template slot-scope="scope">
                <span>{{scope.row.motorcycleType}}</span>
              </template>
            </el-table-column>
            <el-table-column  align="center" label="考试次数" width="60">
              <template slot-scope="scope">
                <span>{{scope.row.examCount}}</span>
              </template>
            </el-table-column>
            <el-table-column  align="center" label="欠费" width="60">
              <template slot-scope="scope">
                <span>{{scope.row.arrearage}}</span>
              </template>
            </el-table-column>
            <el-table-column  v-if="service.show" align="center" :label="service.name" min-width="120" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{scope.row.hasService}}</span>
              </template>
            </el-table-column>
            <el-table-column  align="center" label="考场" width="130"  show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{scope.row.examField}}</span>
              </template>
            </el-table-column>
            <el-table-column  align="center" label="入学时间" width="100">
              <template slot-scope="scope">
                <span>{{scope.row.enrolTime | subTime}}</span>
              </template>
            </el-table-column>
            <el-table-column  align="center" label="考试时间" width="100">
              <template slot-scope="scope">
                <span>{{scope.row.examTime | subTime}}</span>
              </template>
            </el-table-column>
            <el-table-column v-if="listQuery.subject === '2'" align="center" label="场训教练" width="100">
              <template slot-scope="scope">
                <span>{{scope.row.fieldCoach}}</span>
              </template>
            </el-table-column>
            <el-table-column v-if="listQuery.subject === '3'" align="center" label="路训教练" width="100">
              <template slot-scope="scope">
                <span>{{scope.row.roadCoach}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="操作">
              <template slot-scope="scope">
                <el-button size="mini" type="danger" @click="revokeExam(scope.row)">取消</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane name="3" label="考试名单" :disabled="!permissions.stu_exam_roster">
          <el-table :data="examBespeak" :height="tableHeight - 180"  @selection-change="handleSelectionChange"  v-loading="examBespeakLoading" element-loading-text="给我一点时间"  fit highlight-current-row style="width: 100%;">
            <el-table-column type="selection" class="selection" align="center" prop='uuid'></el-table-column>
            <el-table-column type="index" label="序号" align="center" width="40"></el-table-column>
            <el-table-column align="center"  label="学员" width="100">
              <template slot-scope="scope">
                <span>{{scope.row.name}}</span>
              </template>
            </el-table-column>
            <el-table-column  align="center" label="电话"  width="110">
              <template slot-scope="scope">
                <span>{{scope.row.mobile}}</span>
              </template>
            </el-table-column>
            <el-table-column  align="center" label="身份证"  width="170">
              <template slot-scope="scope">
                <span>{{scope.row.idNumber}}</span>
              </template>
            </el-table-column>
            <el-table-column  align="center" label="车型" width="60">
              <template slot-scope="scope">
                <span>{{scope.row.motorcycleType}}</span>
              </template>
            </el-table-column>
            <el-table-column  align="center" label="考试次数" width="60">
              <template slot-scope="scope">
                <span>{{scope.row.examCount}}</span>
              </template>
            </el-table-column>
            <el-table-column  align="center" label="欠费" width="60">
              <template slot-scope="scope">
                <span>{{scope.row.arrearage}}</span>
              </template>
            </el-table-column>
            <el-table-column  v-if="service.show" align="center" :label="service.name" min-width="120" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{scope.row.hasService}}</span>
              </template>
            </el-table-column>
            <el-table-column  align="center" label="考场" min-width="120" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{scope.row.examField}}</span>
              </template>
            </el-table-column>
            <el-table-column  align="center" label="入学时间" width="100">
              <template slot-scope="scope">
                <span>{{scope.row.enrolTime | subTime}}</span>
              </template>
            </el-table-column>
            <el-table-column  align="center" label="考试时间" width="100">
              <template slot-scope="scope">
                <span>{{scope.row.examTime | subTime}}</span>
              </template>
            </el-table-column>
            <el-table-column v-if="listQuery.subject === '2'" align="center" label="场训教练" width="100">
              <template slot-scope="scope">
                <span>{{scope.row.fieldCoach}}</span>
              </template>
            </el-table-column>
            <el-table-column v-if="listQuery.subject === '3'" align="center" label="路训教练" width="100">
              <template slot-scope="scope">
                <span>{{scope.row.roadCoach}}</span>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <div style="margin-top: 10px;height: 40px;"  >
          <div v-show="!examBespeakLoading" class="pagination-container" style="margin-top: 5px;margin-right: 20px;">
            <el-pagination @size-change="handleSizeExamBespeak" @current-change="handleCurrentExamBespeak"
                           :current-page.sync="studentListQuery.page" background
                           style="float:left;"
                           :page-sizes="[10,20,30]" :page-size="studentListQuery.limit"
                           layout="total, sizes, prev, pager, next, jumper" :total="examBespeakTotal">
            </el-pagination>
          </div>
          <div v-show="!examBespeakLoading">
            <!-- 0默认审核 1是待约考 2是成功约考 3报考成功 4报考失败 5审核失败  -->
            <el-button v-if="studentListQuery.examineState === '0' && bespeakTabs != 'all'" style="float: left"  @click="operation('5','examCancel','warning','审核失败?')" size="small" type="danger">失败</el-button>
            <el-button v-if="studentListQuery.examineState === '0' && bespeakTabs != 'all'"  style="float: right"  @click="operation('1','examExamine',null,null)" size="small" type="success">通过</el-button>
            <el-button v-if="studentListQuery.examineState === '1'" style="float: left" @click="operation('0','examCancel','warning','是否撤销?')" size="small" type="info" >撤销</el-button>
            <el-button v-if="studentListQuery.examineState === '1'" style="float: left" @click="openExam" size="small" type="info" >改约</el-button>
            <el-button v-if="studentListQuery.examineState === '1'" style="float: right" @click="operation('2','examExamine',null,null)" size="small" type="success" >已约</el-button>

            <el-button v-if="studentListQuery.examineState === '2'" style="float: left" @click="operation('4','examExamine','warning','确定约考失败?')" size="small" type="danger" >失败</el-button>
            <el-button v-if="studentListQuery.examineState === '2'" style="float: left;margin-left: 20px;" @click="operation('1','examCancel','warning','是否撤销?')" size="small" type="info" >撤销</el-button>
            <el-button v-if="studentListQuery.examineState === '2'" style="float: right" @click="operation('3','examExamine',null,null)" size="small" type="success" >成功</el-button>

            <el-button v-if="studentListQuery.examineState === '3'" style="float: left" @click="operation('6','examCancel','warning','是否取消约考?')" size="small" type="danger">取消约考</el-button>
            <el-button v-if="studentListQuery.examineState === '3'"  style="float: right" type="primary" size="small" :loading="expLoading" @click="exportExamList">导出名单</el-button>
          </div>
        </div>
      </el-tabs>
    </el-card>
    <!-- 考试设置 -->
    <el-dialog :modal="false" @close="cancel('batchs')" title="批量考试设置"  width="550px" :visible.sync="batchOption2">
      <el-form :model="batchs" :rules="batchsRules" ref="batchs" label-width="120px">
        <el-form-item label="截至间隔" prop="day">
          <el-input-number v-model="batchs.interval" style="width: 100%" :min="3" :max="15" label="截止日期与考试日期的间隔天数"></el-input-number>
        </el-form-item>
        <el-form-item label="考试时间" prop="examTime">
          <el-date-picker value-format="yyyy-MM-dd" style="width: 100%;" type="dates" placeholder="选择一个或多个日期" v-model="batchs.examTime" :picker-options="pickerOptions2"></el-date-picker>
        </el-form-item>
        <el-form-item label="考试场地" prop="examField">
          <el-select v-model="batchs.examField" multiple collapse-tags style="width: 100%" placeholder="考试场地">
            <el-option v-for="field in fieldList" :key="field.value" :label="field.label" :value="field.value">
            </el-option>
          </el-select>
        </el-form-item>
        <div class="dialog-footer" align="right">
          <el-button :loading="btnLoading" type="primary" @click="saveExams('batchs')">确 定</el-button>
        </div>
      </el-form>
    </el-dialog>

    <el-dialog :modal="false" @close="cancel('batch')" title="考试设置" :show-close="false" width="550px" :visible.sync="batchOption">
      <el-form :model="batch" :rules="batchRules" ref="batch" label-width="120px">
        <el-form-item label="考试场地" prop="examField">
          <span v-show="'1' === batch.subject"><dict v-model="batch.examField" dictType="dict_exam_field1" style="width: 100%;"  placeholder="科目一考试场地"></dict></span>
          <span v-show="'2' === batch.subject"><dict v-model="batch.examField" dictType="dict_exam_field2" style="width: 100%;"  placeholder="科目二考试场地"></dict></span>
          <span v-show="'3' === batch.subject"><dict v-model="batch.examField" dictType="dict_exam_field3" style="width: 100%;"  placeholder="科目三考试场地"></dict></span>
          <span v-show="'4' === batch.subject"><dict v-model="batch.examField" dictType="dict_exam_field4" style="width: 100%;"  placeholder="科目四考试场地"></dict></span>
        </el-form-item>
        <!--<el-form-item label="人数"  prop="stuCount">-->
          <!--<el-input v-model.number="batch.stuCount" placeholder="人数" ></el-input>-->
        <!--</el-form-item>-->

        <el-form-item label="考试时间" prop="examTime">
          <el-date-picker value-format="timestamp" style="width: 100%;" type="date" placeholder="考试时间" v-model="batch.examTime" :picker-options="pickerOptions0"></el-date-picker>
        </el-form-item>

        <el-form-item label="预约截止日期"  prop="expiryTime">
          <el-date-picker value-format="timestamp" style="width: 100%;" type="date" placeholder="预约截止日期" :picker-options="pickerOptions1" v-model="batch.expiryTime"></el-date-picker>
        </el-form-item>

      </el-form>

      <div slot="footer">
        <el-button @click="cancel('batch')"><i class="el-icon-fa-undo"></i> 取 消</el-button>
        <el-button v-if="dialogStatus=='create'" :loading="btnLoading" type="primary" @click="create('batch')">确 定</el-button>
        <el-button v-else type="primary" :loading="btnLoading" @click="update('batch')">修 改</el-button>
      </div>
    </el-dialog>

    <el-dialog :modal="false"  title="监管查询" :close-on-click-modal="false" width="50%" :visible.sync="superviseOpen2" :loading="dgLoading" >
      <el-table :data="superviseRes.recList" :show-header="false" border style="width: 100%">
        <el-table-column prop="subject" label="科目">
          <template slot-scope="scope">
            <span>{{scope.row.subject | subjectFilter}}</span>
          </template>
        </el-table-column>
        <el-table-column  prop="type" label="状态">
          <template slot-scope="scope">
            <span :class="'supervise_type_'+scope.row.type">{{scope.row.type | typeFilter}}</span>
          </template>
        </el-table-column>
      </el-table>
      <div v-if="!superviseRes.show">
        {{superviseRes.error}}
      </div>
    </el-dialog>

    <el-dialog :modal="false"  title="选择考试场次" :close-on-click-modal="false" width="450px" :visible.sync="batch_dialog" :loading="dgLoading" >
      <div style="height: 250px;overflow: auto">
        <div v-if="batchList.length === 0" style="width: 100%;text-align: center;font-size: 18px;color: #99a9bf;font-weight: 100;">
          无可预约场次
        </div>
        <div v-else v-for="batch in batchList"  style="float: left;margin: 5px">
          <div class="batchCss" @click="batchClick($event,batch)" style="float: left;">
            <{{batch.examTime | subTime}}> {{batch.examField}}
            <span>（已约{{batch.stuCount}}人）</span>
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button :loading="btnLoading" type="primary" @click="updateExam">确 定</el-button>
      </div>
    </el-dialog>



  </div>
</template>

<script>
  import { getBatchList, delObj, addObj, createBatchs, putObj, getSuperviseInfo, exportExamList, getFieldList } from '@/api/student/batch'
  import { examFetchList, putExamBespeak } from '@/api/student/examnote'
  import { getFinanceList } from '@/api/finance/service-category'
  import { mapGetters } from 'vuex'
  export default {
    name: 'table_batch',
    props: {
      layerid: String,
      area: Array
    },
    watch: {
      area: function(val) {
        this.tableHeight = val[1]
      },
      'studentListQuery.categoryId': function(val) {
        var category = this.getCategory(val)
        if (category) {
          this.service.name = category.name + '购买次数'
          this.service.show = true
          this.see(this.studentListQuery.examId, this.studentListQuery.examineState)
        } else {
          this.service.name = ''
          this.service.show = false
        }
      },
      'batch.examTime': function(val) {
        if (val) {
          var now = Date.now()
          this.pickerOptions1 = {
            disabledDate(time) {
              if (time.getTime() < val && time.getTime() > now) {
                return false
              } else {
                return true
              }
            }
          }
        } else {
          this.pickerOptions1 = {
            disabledDate(time) {
              return time.getTime() < Date.now()
            }
          }
        }
      },
      'batch.expiryTime': function(val) {
        var Time = Date.now() + 1000 * 60 * 60 * 24
        if (val) {
          Time = val
        }
        this.pickerOptions0 = {
          disabledDate(time) {
            if (time.getTime() > Time) {
              return false
            } else {
              return true
            }
          }
        }
      },
      'batchs.interval': function(val) {
        var Time = Date.now() + 1000 * 60 * 60 * 24 * 7
        if (val) {
          Time = Date.now() + 1000 * 60 * 60 * 24 * parseInt(val)
        }
        this.pickerOptions2 = {
          disabledDate(time) {
            return time.getTime() < Time
          }
        }
      }
    },
    data() {
      var that = this
      var expiryValidator = (rule, value, callback) => {
        if (that.batch.examTime && value >= that.batch.examTime) {
          callback(new Error('截止日期必须小于开始日期'))
        } else {
          callback()
        }
      }
      return {
        tableHeight: this.area[1],
        batch: {
          subject: '1',
          examField: null,
          examTime: null,
          expiryTime: null
        },
        batchs: {
          subject: '1',
          interval: '7',
          examTime: [],
          examField: []
        },
        fieldList: [],
        batchInfo: {},
        dgLoading: false,
        superviseOpen2: false,
        batch_dialog: false,
        superviseRes: {
          show: true,
          error: '',
          recList: []
        },
        list: [],
        batchList: [],
        financeList: [],
        total: null,
        listLoading: true,
        pickerOptions0: {
          disabledDate(time) {
            return time.getTime() < Date.now() + 1000 * 60 * 60 * 24
          }
        },
        pickerOptions1: {
          disabledDate(time) {
            return time.getTime() < Date.now()
          }
        },
        pickerOptions2: {
          disabledDate(time) {
            return time.getTime() < Date.now() + 1000 * 60 * 60 * 24 * 7
          }
        },
        superviseLoading: false,
        examBespeakLoading: true,
        listQuery: {
          page: 1,
          limit: 20,
          subject: '1',
          interval: [],
          beginTime: null,
          endTime: null,
          stuCondition: null,
          examField: null
        },
        tableKey: 0,
        dialogStatus: '',
        subject: [
          { value: '1', label: '科目一' },
          { value: '2', label: '科目二' },
          { value: '3', label: '科目三' },
          { value: '4', label: '科目四' }
        ],
        batchListQuery: {
          page: 1,
          limit: 0,
          /* 今天以前传 before   今天之后传 after */
          scope: 'after',
          subject: null
        },
        batchOption: false,
        batchOption2: false,
        testUrl: null,
        examOption: false,
        btnLoading: false,
        expLoading: false,
        examBespeak: [],
        examBespeakTotal: null,
        bespeakTabs: 'all',
        examBespeakList: {
          examNoteList: [],
          subject: null,
          examineState: null
        },
        service: {
          show: false,
          name: ''
        },
        studentListQuery: {
          page: 1,
          limit: 20,
          examId: null,
          examineState: '0',
          categoryId: null,
          examState: 'exam_note_examine'
        },
        batchsRules: {
          examField: [
            { required: true, message: '请选择考试场地', trigger: ['blur', 'change'] }
          ],
          examTime: [
            { required: true, message: '请选择考试时间', trigger: ['blur', 'change'] }
          ]
        },
        batchRules: {
          examField: [
            { required: true, message: '请选择考试场地', trigger: ['blur', 'change'] }
          ],
          // stuCount: [
          //   { required: true, type: 'number', message: '请输入人数', trigger: ['blur', 'change'] }
          // ],
          examTime: [
            { required: true, message: '请选择考试时间', trigger: ['blur', 'change'] }
          ],
          expiryTime: [
            { required: true, message: '请选择预约截止日期', trigger: ['blur', 'change'] },
            { validator: expiryValidator, trigger: ['blur', 'change'] }
          ]
        }
      }
    },
    filters: {
      typeFilter(type) {
        type = 'type_' + type
        const statusMap = {
          type_1: '待驾校上报阶段',
          type_2: '待运管审核',
          type_3: '--',
          type_4: '可约考',
          type_5: '明日约考（科目三理论部分需和科目三道路驾驶一起上报公安方可考试）'
        }
        return statusMap[type] || type
      }
    },
    created() {
      this.getList()
      this.getFinanceList()
    },
    computed: {
      ...mapGetters([
        'permissions',
        'client'
      ])
    },
    methods: {
      getCategory(id) {
        var category = null
        if (this.financeList) {
          this.financeList.forEach(function(item) {
            if (item.categoryId === id) {
              category = item
            }
          })
        }
        return category
      },
      getList() {
        this.listLoading = true
        getBatchList(this.listQuery).then(response => {
          this.list = response.data.data.list
          this.total = response.data.data.totalCount
          this.listLoading = false
        })
      },
      // 获取所有服务包 ok
      getFinanceList() {
        this.listLoading = true
        getFinanceList().then(response => {
          var data = response.data
          this.financeList = data.list || []
          this.listLoading = false
          console.log(data)
        })
      },
      handleSizeExamBespeak(val) {
        this.listQuery.limit = val
        this.see(this.studentListQuery.examId, this.studentListQuery.examineState)
      },
      handleCurrentExamBespeak(val) {
        this.listQuery.page = val
        this.see(this.studentListQuery.examId, this.studentListQuery.examineState)
      },
      handleSizeChange(val) {
        this.listQuery.limit = val
        this.getList()
      },
      handleCurrentChange(val) {
        this.listQuery.page = val
        this.getList()
      },
      createsClick() {
        this.batchs = {
          subject: '1',
          interval: '7',
          examTime: [],
          examField: []
        }
        this.batch.subject = this.listQuery.subject
        this.dialogStatus = 'create'
        this.batchOption2 = true
        console.log(this.batchs.subject)
        getFieldList('dict_exam_field' + this.batchs.subject).then(response => {
          console.log('-->', response)
          console.log('-->', response.data.data)
          this.fieldList = response.data.data
        })
      },
      createClick() {
        this.batch = {
          subject: '1',
          examTime: null,
          expiryTime: null,
          examField: null
        }
        this.batch.subject = this.listQuery.subject
        this.dialogStatus = 'create'
        this.batchOption = true
      },
      handleUpdate(val) {
        this.batch = val
        this.dialogStatus = 'update'
        this.batchOption = true
      },
      close() {
        this.examOption = false
      },
      look(exam) {
        this.bespeakTabs = 'all'
        this.batchInfo = exam
        this.see(exam.examId, null)
      },
      see(examId, state) {
        this.examBespeakLoading = true
        this.studentListQuery.examId = examId
        this.studentListQuery.examineState = state
        if (this.listQuery.subject === '2') {
          this.studentListQuery.sidx = 's.field_coach'
        }
        if (this.listQuery.subject === '3') {
          this.studentListQuery.sidx = 's.road_coach'
        }
        this.examBespeakList.subject = this.listQuery.subject
        examFetchList(this.studentListQuery).then(response => {
          this.examBespeak = response.data.data.list
          this.examBespeakTotal = response.data.data.totalCount
          console.log(response.data.data)
          this.examBespeakLoading = false
        })
        // this.examBespeakList.examId = examId
        this.examOption = true
      },
      closeExamOption() {
        this.getList()
      },
      saveExams(formName) {
        const set = this.$refs
        set[formName].validate(valid => {
          if (valid) {
            this.btnLoading = true
            createBatchs(this.batchs).then(() => {
              this.getList()
              this.batchOption2 = false
              this.btnLoading = false
            })
          } else {
            return false
          }
        })
      },
      create(formName) {
        const set = this.$refs
        set[formName].validate(valid => {
          if (valid) {
            this.btnLoading = true
            addObj(this.batch)
              .then(() => {
                this.getList()
                this.batchOption = false
                this.btnLoading = false
              })
          } else {
            return false
          }
        })
      },
      cancel(formName) {
        this.batchOption = false
        this.batchOption2 = false
        this.btnLoading = false
        this.batch = {
          subject: '1',
          examTime: null,
          expiryTime: null,
          examField: null
        }
        this.batchs = {
          subject: '1',
          interval: '7',
          examTime: [],
          examField: []
        }
        const set = this.$refs
        set[formName].resetFields()
        this.getList()
      },
      update(formName) {
        const set = this.$refs
        set[formName].validate(valid => {
          if (valid) {
            this.btnLoading = true
            putObj(this.batch).then(response => {
              this.batchOption = false
              this.btnLoading = false
              this.getList()
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
        if (val.stuCount === 0) {
          this.$confirm('此操作将永久删除, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'error'
          }).then(() => {
            delObj(val.examId).then(() => {
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
      superviseInfo(val) {
        this.superviseRes.recList = []
        var stu = {
          idcardDto: val.idNumber,
          trainType: val.motorcycleType,
          phoneDto: val.mobile
        }
        this.superviseLoading = true
        this.dgLoading = true
        getSuperviseInfo(stu).then(resp => {
          var res = resp.data
          if (res.code === 0) {
            var supervise = JSON.parse(res.data)
            if (supervise.errorcode === 0) {
              this.superviseOpen2 = true
              this.dgLoading = false
              this.superviseRes.recList = supervise.data.recList
            } else {
              this.$message.error(supervise.data)
            }
          }
          this.superviseLoading = false
        })
      },
      // 取消约考
      revokeExam(val) {
        this.$confirm('此操作将取消该学员约考, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.examBespeakList.examNoteList = []
          this.examBespeakList.examNoteList.push({ 'studentId': val.studentId, 'examId': val.examId })
          this.operation('6', 'examCancel')
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消操作'
          })
        })
      },
      handleSelectionChange(val) {
        this.examBespeakList.examNoteList = []
        for (var i = 0; i < val.length; i++) {
          this.examBespeakList.examNoteList.push({ 'studentId': val[i].studentId, 'examId': val[i].examId })
        }
      },
      // 根据状态查询约考学员
      handleField(state) {
        this.studentListQuery.page = 1
        this.studentListQuery.examineState = state.name
        if (state.name === 'all') this.studentListQuery.examineState = null
        this.see(this.studentListQuery.examId, this.studentListQuery.examineState)
      },
      openExam() {
        if (this.examBespeakList.examNoteList.length === 0) {
          this.$message.warning('请先选择学员')
        } else {
          this.batch_dialog = true
          this.dgLoading = true
          this.batchListQuery.subject = this.examBespeakList.subject
          getBatchList(this.batchListQuery).then(response => {
            this.batchList = response.data.data.list
          })
        }
      },
      updateExam() {
        if (this.examBespeakList.examNoteList.length === 0) {
          this.$message.warning('请先选择学员')
        } else {
          console.log(this.examBespeakList)
          this.examBespeakList.examineState = 6
          this.btnLoading = true
          putExamBespeak(this.examBespeakList, 'updateExam').then(() => {
            this.see(this.studentListQuery.examId, this.studentListQuery.examineState)
            this.batch_dialog = false
            this.dgLoading = false
            this.btnLoading = false
          })
        }
      },
      /* 约考 */
      batchClick(e, batch) {
        this.examBespeakList.examId = batch.examId
        var a = document.getElementsByClassName('batchCss')
        for (var i = 0; i < a.length; i++) {
          a[i].classList.remove('batchCss_selected')
        }
        e.currentTarget.classList.add('batchCss_selected')
      },
      operation(state, url, type, msg) {
        if (this.examBespeakList.examNoteList.length === 0) {
          this.$message.warning('请先选择学员')
        } else {
          this.examBespeakList.examineState = state
          this.examBespeakList.subject = this.listQuery.subject
          if (msg) {
            // 'warning'
            this.$confirm(msg, '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: type | 'warning'
            }).then(() => {
              putExamBespeak(this.examBespeakList, url).then(() => {
                this.see(this.studentListQuery.examId, this.studentListQuery.examineState)
              })
            })
          } else {
            putExamBespeak(this.examBespeakList, url).then(() => {
              this.see(this.studentListQuery.examId, this.studentListQuery.examineState)
            })
          }
        }
        // if (this.batchInfo && this.batchInfo.expiryTime <= Date.now()) {
        //
        // } else {
        //   this.$message.warning('该场考试尚未到截止日期，不能操作！')
        // }
      },
      // 根据科目查询场地
      handleSubject() {
        this.batch = {
          subject: '1',
          examTime: null,
          expiryTime: null,
          examField: null
        }
        this.listQuery.page = 1
        this.batch.subject = this.listQuery.subject
        this.batchs.subject = this.listQuery.subject
        this.listQuery.examField = null
        this.listQuery.interval = []
        this.listQuery.beginTime = null
        this.listQuery.endTime = null
        this.getList()
      },
      examTimeBlur() {
        if (this.listQuery.interval === null) {
          this.listQuery.interval = []
          this.listQuery.beginTime = null
          this.listQuery.endTime = null
        }
        if (this.listQuery.interval.length !== 0) {
          this.listQuery.beginTime = this.listQuery.interval[0]
          this.listQuery.endTime = this.listQuery.interval[1]
        }
      },
      filterTag(value, row) {
        return row.state === value
      },
      filterHandler(value, row, column) {
        const property = column['property']
        return row[property] === value
      },
      exportExamList() {
        this.expLoading = true
        var subject
        if (this.listQuery.subject === '1') {
          subject = '一'
        } else if (this.listQuery.subject === '2') {
          subject = '二'
        } else if (this.listQuery.subject === '3') {
          subject = '三'
        } else if (this.listQuery.subject === '4') {
          subject = '四'
        }
        console.log(this.layerid)
        this.$store.dispatch('pushProhibit', this.layerid)
        this.studentListQuery.subject = subject
        exportExamList(this.studentListQuery).then(response => {
          var time = new Date()
          var blob = new Blob([response.data], { type: 'application/x-xls;charset=utf-8' })
          var downloadElement = document.createElement('a')
          var href = window.URL.createObjectURL(blob) // 创建下载的链接
          downloadElement.href = href
          downloadElement.download = '考试名单(' + time.toLocaleString() + ').xls' // 下载后文件名
          document.body.appendChild(downloadElement)
          downloadElement.click() // 点击下载
          document.body.removeChild(downloadElement) // 下载完成移除元素
          window.URL.revokeObjectURL(href) // 释放掉blob对象
          this.expLoading = false
          this.$store.dispatch('removeProhibit', this.layerid)
        })
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.batch-page{
  .supervise_type_4{
    color: #67C23A;
  }
  .batchCss{
    background-color: rgba(64,158,255,.1);
    display: inline-block;
    padding: 0 10px;
    height: 32px;
    line-height: 30px;
    font-size: 12px;
    color: #409eff;
    border-radius: 4px;
    box-sizing: border-box;
    border: 1px solid rgba(64,158,255,.2);
    white-space: nowrap;
    cursor: pointer;
  }
  .batchCss_selected{
    background-color: rgba(103,194,58,.1);
    border-color: rgba(103,194,58,.2);
    color: #67c23a;
  }
  .batchCss:hover{
    background-color: rgba(103,194,58,.1);
    border-color: rgba(103,194,58,.2);
    color: #67c23a;
  }
}
</style>

