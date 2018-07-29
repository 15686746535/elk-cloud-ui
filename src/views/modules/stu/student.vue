<template>
  <div class="student" style="height: 100%;">
    <!-- 列表 -->
    <div v-show="showModule=='list'" style="height: 100%">
      <el-card body-style="padding: 5px 20px;" style="margin-bottom: 5px;height: 90px;line-height: 38px">
        <el-row :gutter="5">
          <el-col :xs="6" :sm="6" :md="8" :lg="7" :xl="5">
            <el-date-picker value-format="timestamp" style="width: 100%" size="mini" v-model="listQuery.interval" type="daterange" align="left"
                            unlink-panels range-separator="—" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions">
            </el-date-picker>
          </el-col>
          <el-col :xs="6" :sm="6" :md="6" :lg="5" :xl="4">
            <el-select size="mini" style="width: 100%" v-model="listQuery.subject" clearable placeholder="科目">
              <el-option
                v-for="item in subject"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col>
          <el-col class="hidden-md-and-down" :xs="6" :sm="6" :md="6" :lg="5" :xl="4">
            <dict v-model="listQuery.enrolSite" size="mini" dictType="dict_enrolSite" placeholder="报名点"  ></dict>
          </el-col>
          <el-col :xs="6" :sm="6" :md="6" :lg="5" :xl="4">
            <Coach v-model="listQuery.fieldCoach" size="mini" coachType="field" placeholder="场训教练"  ></Coach>
          </el-col>
          <el-col :xs="6" :sm="6" :md="6" :lg="5" :xl="4">
            <Coach v-model="listQuery.roadCoach" size="mini" coachType="road" placeholder="路训教练"  ></Coach>
          </el-col>
          <el-col class="hidden-md-and-down"  :xs="6" :sm="6" :md="6" :lg="5" :xl="3">
            <dict v-model="listQuery.source" size="mini" dictType="dict_source" placeholder="来源渠道"  ></dict>
          </el-col>
          <el-col :xs="6" :sm="6" :md="6" :lg="3" :xl="3">

            <el-select style="width: 100%" size="mini" v-model="listQuery.motorcycleType" clearable placeholder="车型">
              <el-option
                v-for="item in $store.state.app.motorcycleType"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </el-col>
          <el-col :xs="6" :sm="6" :md="6" :lg="5" :xl="4">
            <el-input @keyup.enter.native="searchClick" size="mini" placeholder="姓名/电话/身份证" v-model="listQuery.condition"></el-input>
          </el-col>
          <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2">
            <el-button type="primary"  size="mini" @click="searchClick"><i class="el-icon-search"></i>搜索</el-button>
          </el-col>
        </el-row>
      </el-card>
      <el-card :style="{height: tableHeight - 130 + 'px'}" id="student-table-card">
        <el-table :data="stuList" :height="tableHeight - 220" highlight-current-row stripe @row-dblclick="editList" v-loading="listLoading" element-loading-text="给我一点时间">
          <el-table-column align="center" label="头像" min-width="150px">
            <template slot-scope="scope">
              <!-- 头像 -->
              <el-row>
                <el-tag class="img">
                  <img :src="scope.row.avatar" class="img">
                </el-tag>
              </el-row>
              <el-row>
                <el-col style="color: #7c7c7c;text-align: center;font-size: 12px;">{{scope.row.name}}</el-col>
              </el-row>
              <el-row>
                <el-col style="color: #7c7c7c;text-align: center;font-size: 12px;">{{scope.row.mobile}}</el-col>
              </el-row>
            </template>
          </el-table-column>
          <el-table-column align="center" label="个人信息" min-width="230px">
            <template slot-scope="scope" >
              <!-- 个人信息 -->
              <el-col style=" line-height: 25px">
                <el-row :gutter="10">
                  <el-col :span="7" class="table_text">身份证:</el-col>
                  <el-col :span="17" class="table_text">{{scope.row.idNumber}}</el-col>
                </el-row>
                <el-row :gutter="10">
                  <el-col :span="7" class="table_text">性别:</el-col>
                  <el-col :span="17" class="table_text">{{scope.row.sex | sexFilter}}</el-col>
                </el-row>
                <el-row :gutter="10">
                  <el-col :span="7" class="table_text">状态:</el-col>
                  <el-col :span="17" class="table_text">{{scope.row.state | subjectFilter}}</el-col>
                </el-row>

                <el-row :gutter="10">
                  <el-col :span="7" class="table_text">介绍人:</el-col>
                  <el-col :span="17" class="table_text">{{scope.row.introducers.replace(new RegExp('/','gm'), '、')}}</el-col>
                </el-row>
              </el-col>
            </template>
          </el-table-column>

          <el-table-column align="center" label="入学信息" min-width="230px">
            <template slot-scope="scope">
              <el-col style=" line-height: 25px">
                <el-row :gutter="10">
                  <el-col :span="7" class="table_text">档案号:</el-col>
                  <el-col :span="17" class="table_text">{{scope.row.archivesNumber}}</el-col>
                </el-row>
                <el-row :gutter="10">
                  <el-col :span="7" class="table_text">入学日期:</el-col>
                  <el-col :span="17" class="table_text">{{scope.row.enrolTime | subTime}}</el-col>
                </el-row>
                <el-row :gutter="10">
                  <el-col :span="7" class="table_text">期数:</el-col>
                  <el-col :span="17" class="table_text">{{scope.row.periods}}</el-col>
                </el-row>
                <el-row :gutter="10">
                  <el-col :span="7" class="table_text">车型:</el-col>
                  <el-col :span="17" class="table_text">{{scope.row.motorcycleType}}</el-col>
                </el-row>
              </el-col>
            </template>
          </el-table-column>

          <el-table-column align="center" label="培训信息" min-width="230px">
            <template slot-scope="scope">

              <el-col style=" line-height: 25px">
                <el-row :gutter="10">
                  <el-col :span="7" class="table_text">校区:</el-col>
                  <el-col :span="17" class="table_text">{{scope.row.campus}}</el-col>
                </el-row>
                <el-row :gutter="10">
                  <el-col :span="7" class="table_text">来源渠道:</el-col>
                  <el-col :span="17" class="table_text">{{scope.row.source}}</el-col>
                </el-row>

                <el-row :gutter="10">
                  <el-col :span="7" class="table_text">场训教练:</el-col>
                  <el-col :span="17" class="table_text">{{scope.row.fieldName}}</el-col>
                </el-row>

                <el-row :gutter="10">
                  <el-col :span="7" class="table_text">路训教练:</el-col>
                  <el-col :span="17" class="table_text">{{scope.row.roadName}}</el-col>
                </el-row>
              </el-col>
            </template>
          </el-table-column>

          <el-table-column align="center" label="费用信息" min-width="230px">
            <template slot-scope="scope">
              <el-col style=" line-height: 25px">
                <el-row :gutter="10">
                  <el-col :span="7" class="table_text">服务项:</el-col>
                  <el-col :span="17" class="table_text">{{scope.row.serviceNotes.replace(new RegExp('/','gm'), '、')}}</el-col>
                </el-row>

                <el-row :gutter="10">
                  <el-col :span="7" class="table_text">应收金额:</el-col>
                  <el-col :span="17" class="table_text">{{scope.row.receivable}}</el-col>
                </el-row>

                <el-row :gutter="10">
                  <el-col :span="7" class="table_text">欠费金额:</el-col>
                  <el-col :span="17" class="table_text">{{scope.row.arrearage}}</el-col>
                </el-row>
              </el-col>
            </template>
          </el-table-column>

        </el-table>
        <div v-show="!listLoading" class="page-util">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                         :current-page.sync="listQuery.page"
                         background
                         style="float:left;"
                         :page-sizes="[10,20,30,50]" :page-size="listQuery.limit"
                         layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>
          <el-button @click="create" size="small" style="float:right;margin: 0 30px" type="primary" v-if="permissions.stu_student_add"><i class="el-icon-plus"></i>添加</el-button>
          <!--<el-button size="small" style="float:right;margin: 0 5px" :loading="expLoading" @click="exportStudent"  v-if="permissions.stu_student_export" type="info"><i class="el-icon-download"></i>导出</el-button>-->
          <el-upload class="upload-demo" action="/stu/student/import"
                     :headers="headers"
                     :on-success="handleTextSuccess"
                     accept=".xls,.xlsx"
                     style="float:right;margin: 0 5px"
                     :on-error="handleAvatarError"
                     :before-upload="beforeTextUpload"
                     :show-file-list="false">
            <!--<el-button size="small"  v-if="permissions.stu_student_import"  ><i class="el-icon-upload2"></i>导入</el-button>-->
          </el-upload>


        </div>
      </el-card>
    </div>
    <!--详情-->
    <el-card v-show="showModule=='info'" style="height: 100%;overflow: auto;position: relative;">
      <el-button type="primary" :disabled="edit" size="mini"  @click="backClick" style="position: absolute;top: 25px;right: 35px;z-index: 6666;"><i class="el-icon-back"></i> 返 回</el-button>
      <div style="position: absolute;top: 15px;left: 16px;z-index: 6666;">
        <el-upload :disabled="!edit"  style="height: 50px;" class="avatar-uploader" action="/oss/upload" name="file" :show-file-list="false" :headers="headers" accept=".png,.jpg"
                   :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" :on-error="handleAvatarError">
          <img :src="student.avatar" class="avatar">
        </el-upload>
      </div>
      <el-row style="height: 100%;" :gutter="10">
        <el-col :span="area[1] === 600?24:12" style="height: 799px;">
          <el-form :model="student" :rules="studentRules" ref="student" label-position="left" label-width="80px" size="mini">
            <el-card body-style="padding: 0;"
                     v-loading="infoLoading" element-loading-text="努力匹配中..."
                     shadow="never" style="border-radius:0 4px 0 0;line-height: 40px;overflow-y: auto;">

              <!-- 基本信息 -->
              <el-row class="title" style="line-height: 35px;height: 35px;">基本信息</el-row>
              <!--基本信息-->
              <el-row :gutter="15" style="padding: 0 20px">
                <el-col :span="12">
                  <!-- 档案号 -->
                  <el-row>
                    <el-form-item prop="archivesNumber">
                      <span slot="label" class="text_css">档案号:</span>
                      <el-input v-if="edit" size="mini" class="filter-item" placeholder="档案号" v-model="student.archivesNumber"></el-input>
                      <div style="padding-left: 16px;font-size: 12px;" v-else>{{student.archivesNumber}}</div>
                    </el-form-item>
                  </el-row>
                  <!-- 姓名 -->
                  <el-row>
                    <el-form-item prop="name">
                      <span slot="label" class="text_css">姓名:</span>
                      <el-input v-if="edit" size="mini" class="filter-item" placeholder="姓名" v-model="student.name"></el-input>
                      <div style="padding-left: 16px;font-size: 12px;" v-else>{{student.name}}</div>
                    </el-form-item>
                  </el-row>
                  <!-- 身份证号 -->
                  <el-row>
                    <el-form-item prop="idNumber">
                      <span slot="label" class="text_css">身份证号:</span>
                      <el-input v-if="edit" size="mini" class="filter-item" placeholder="身份证号" :maxlength="18"  @keyup.enter.native="generateInfo"  @blur="generateInfo" v-model="student.idNumber"></el-input>
                      <div style="padding-left: 16px;font-size: 12px;" v-else>{{student.idNumber}}</div>
                    </el-form-item>
                  </el-row>
                  <!-- 性别 -->
                  <el-row>
                    <el-form-item prop="sex">
                      <span slot="label" class="text_css">性别:</span>
                      <template v-if="edit">
                        <el-radio size="mini" v-model="student.sex" label="1">男</el-radio>
                        <el-radio size="mini" v-model="student.sex" label="0">女</el-radio>
                      </template>
                      <div style="padding-left: 16px;font-size: 12px;" v-else>{{student.sex | sexFilter}}</div>
                    </el-form-item>
                  </el-row>
                  <!-- 生日 -->
                  <el-row>
                    <el-form-item prop="birthday">
                      <span slot="label" class="text_css">生日:</span>
                      <el-date-picker value-format="timestamp"  v-if="edit" type="date" placeholder="生日"  style="width: 100%" v-model="student.birthday"></el-date-picker>
                      <div style="padding-left: 16px;font-size: 12px;" v-else>{{student.birthday | subTime}}</div>
                    </el-form-item>
                  </el-row>
                  <!-- 联系地址 -->
                  <el-row>
                    <el-form-item prop="contactAddress">
                      <span slot="label" class="text_css">联系地址:</span>
                      <el-input v-if="edit" style="width: 100%;" class="filter-item" placeholder="联系地址" v-model="student.contactAddress"></el-input>
                      <div style="padding-left: 16px;font-size: 12px;" v-else>{{student.contactAddress}}</div>
                    </el-form-item>
                  </el-row>
                </el-col>
                <el-col :span="12">
                  <!--联系电话-->
                  <el-row>
                    <el-form-item prop="mobile">
                      <span slot="label" class="text_css">联系电话:</span>
                      <el-input v-if="edit" style="width: 100%;" class="filter-item" placeholder="联系电话" :maxlength="11" v-model.number="student.mobile"></el-input>
                      <div style="padding-left: 16px;font-size: 12px;" v-else>{{student.mobile}}</div>
                    </el-form-item>
                  </el-row>
                  <!-- 微信 -->
                  <el-row>
                    <el-form-item prop="wechat">
                      <span slot="label" class="text_css">* 微信:</span>
                      <el-input v-if="edit" style="width: 100%;" class="filter-item" placeholder="微信" v-model="student.wechat"></el-input>
                      <div style="padding-left: 16px;font-size: 12px;" v-else>{{student.wechat}}</div>
                    </el-form-item>
                  </el-row>
                  <!-- 电子邮箱 -->
                  <el-row>
                    <el-form-item prop="email">
                      <span slot="label" class="text_css">* 电子邮箱:</span>
                      <el-input v-if="edit" style="width: 100%;" class="filter-item" placeholder="电子邮箱" v-model="student.email"></el-input>
                      <div style="padding-left: 16px;font-size: 12px;" v-else>{{student.email}}</div>
                    </el-form-item>
                  </el-row>
                  <!-- 所属单位 -->
                  <el-row>
                    <el-form-item prop="company">
                      <span slot="label" class="text_css">* 所属单位:</span>
                      <el-input v-if="edit" style="width: 100%;" class="filter-item" placeholder="所属单位" v-model="student.company"></el-input>
                      <div style="padding-left: 16px;font-size: 12px;" v-else>{{student.company}}</div>
                    </el-form-item>
                  </el-row>
                  <!-- 所属职位 -->
                  <el-row >
                    <el-form-item prop="position">
                      <span slot="label" class="text_css">* 所属职位:</span>
                      <el-input v-if="edit" style="width: 100%;" class="filter-item" placeholder="所属职位" v-model="student.position"></el-input>
                      <div style="padding-left: 16px;font-size: 12px;" v-else>{{student.position}}</div>
                    </el-form-item>
                  </el-row>
                </el-col>
              </el-row>
              <!-- 入学信息 -->
              <el-row class="title" style="line-height: 35px;height: 35px">入学信息</el-row>
              <el-row :gutter="15" style="padding: 0 20px;height: 374px">
                <el-col :span="12">
                  <!-- 入学日期 -->
                  <el-row>
                    <el-form-item prop="enrolTime">
                      <span slot="label" class="text_css">入学日期:</span>
                      <el-date-picker value-format="timestamp"  v-if="edit" type="date" placeholder="入学日期"  style="width: 100%" v-model="student.enrolTime"></el-date-picker>
                      <div style="padding-left: 16px;font-size: 12px;" v-else>{{student.enrolTime | subTime}}</div>
                    </el-form-item>
                  </el-row>
                  <!-- 校区 -->
                  <el-row>
                    <el-form-item prop="campus">
                      <span slot="label" class="text_css">校区:</span>
                      <dict v-if="edit" dictType="dict_campus" v-model="student.campus" style="width: 100%;"  placeholder="校区"></dict>
                      <div style="padding-left: 16px;font-size: 12px;" v-else>{{student.campus}}</div>
                    </el-form-item>
                  </el-row>
                  <!-- 入学期数 -->
                  <el-row>
                    <el-form-item prop="periods">
                      <span slot="label" class="text_css">入学期数:</span>
                      <el-input v-if="edit" style="width: 100%;" class="filter-item" placeholder="入学期数" v-model="student.periods"></el-input>
                      <div style="padding-left: 16px;font-size: 12px;" v-else>{{student.periods}}</div>
                    </el-form-item>
                  </el-row>
                  <!-- 来源渠道 -->
                  <el-row>
                    <el-form-item prop="source">
                      <span slot="label" class="text_css">来源渠道:</span>
                      <dict v-if="edit" dictType="dict_source" v-model="student.source" style="width: 100%;"  placeholder="来源渠道"></dict>
                      <div style="padding-left: 16px;font-size: 12px;" v-else>{{student.source}}</div>
                    </el-form-item>
                  </el-row>
                  <!-- 是否体检 -->
                  <el-row >
                    <el-form-item prop="physicalExamination">
                      <span slot="label" class="text_css">是否体检:</span>
                      <el-radio-group v-if="edit" v-model="student.physicalExamination">
                        <el-radio label="1">是</el-radio>
                        <el-radio label="0">否</el-radio>
                      </el-radio-group>
                      <div style="padding-left: 16px;font-size: 12px;" v-else>{{student.physicalExamination === '1'?'是':'否'}}</div>
                    </el-form-item>
                  </el-row>
                  <!-- 是否有车 -->
                  <el-row>
                    <el-form-item prop="haveCar">
                      <span slot="label" class="text_css">是否有车:</span>
                      <el-radio-group v-if="edit" v-model="student.haveCar">
                        <el-radio label="1">是</el-radio>
                        <el-radio label="0">否</el-radio>
                      </el-radio-group>
                      <div style="padding-left: 16px;font-size: 12px;" v-else>{{student.haveCar === '1'?'是':'否'}}</div>
                    </el-form-item>
                  </el-row>
                  <el-row >
                    <el-form-item prop="remark">
                      <span slot="label"  class="text_css">备注:</span>
                      <el-input v-if="edit"   type="textarea" v-model="student.remark" :autosize="{ minRows: 2, maxRows: 4}" placeholder="备注"></el-input>
                      <div style="padding-left: 16px;font-size: 12px;" v-else>{{student.remark}}</div>
                    </el-form-item>
                  </el-row>
                </el-col>
                <el-col :span="12">
                  <!-- 所学车型 -->
                  <el-row>
                    <el-form-item prop="motorcycleType">
                      <span slot="label" class="text_css">所学车型:</span>
                      <el-select v-if="edit" style="width: 100%" size="mini" v-model="student.motorcycleType" clearable placeholder="车型">
                        <el-option
                          v-for="item in $store.state.app.motorcycleType"
                          :key="item"
                          :label="item"
                          :value="item">
                        </el-option>
                      </el-select>
                      <div style="padding-left: 16px;font-size: 12px;" v-else>{{student.motorcycleType}}</div>
                    </el-form-item>
                  </el-row>
                  <!-- 练车类型 -->
                  <el-row>
                    <el-form-item prop="serviceType">
                      <span slot="label" class="text_css">练车类型:</span>
                      <el-select v-if="edit" style="width: 100%" size="mini" v-model="student.serviceType" clearable placeholder="练车类型">
                        <el-option
                          v-for="item in $store.state.app.vehicleType"
                          :key="item.value"
                          :label="item.name"
                          :value="item.value">
                        </el-option>
                      </el-select>
                      <div style="padding-left: 16px;font-size: 12px;" v-else>{{student.serviceType | serviceTypeFilter}}</div>
                    </el-form-item>
                  </el-row>
                   <!--报名点-->
                  <el-row>
                    <el-form-item prop="enrolSite">
                      <span slot="label" class="text_css">报名点:</span>
                      <dict v-if="edit" v-model="student.enrolSite" dictType="dict_enrolSite" style="width: 100%;"  placeholder="报名点"></dict>
                      <div style="padding-left: 16px;font-size: 12px;" v-else>{{student.enrolSite}}</div>
                    </el-form-item>
                  </el-row>
                  <!-- 场训教练 -->
                  <el-row>
                    <el-form-item prop="fieldName">
                      <span slot="label" class="text_css">* 场训教练:</span>
                      <Coach  v-show="edit" v-model="student.fieldCoach" coachType="field" style="width: 100%;"  placeholder="场训教练" @selectCoach="getFieldCoach" ></Coach>
                      <div style="padding-left: 16px;font-size: 12px;" v-show="!edit" >{{student.fieldName === null?'未安排':student.fieldName}}</div>
                    </el-form-item>
                  </el-row>
                  <!-- 路训教练 -->
                  <el-row>
                    <el-form-item prop="roadName">
                      <span slot="label" class="text_css">* 路训教练:</span>
                      <Coach  v-show="edit" v-model="student.roadCoach" coachType="road" style="width: 100%;"  placeholder="路训教练"  @selectCoach="getRoadCoach"></Coach>
                      <div style="padding-left: 16px;font-size: 12px;" v-show="!edit" >{{student.roadName === null?'未安排':student.roadName}}</div>
                    </el-form-item>
                  </el-row>
                  <!-- 是否增驾 -->
                  <el-row>
                    <el-form-item prop="addDrive">
                      <span slot="label" class="text_css">是否增驾:</span>
                      <el-radio-group v-if="edit" v-model="student.addDrive">
                        <el-radio label="1">是</el-radio>
                        <el-radio label="0">否</el-radio>
                      </el-radio-group>
                      <div style="padding-left: 16px;font-size: 12px;" v-else>{{student.addDrive === '1'?'是':'否'}}</div>
                    </el-form-item>
                  </el-row>
                  <!-- 介绍人 -->
                  <el-row style="margin: 0 10px">
                    <el-form-item prop="introducerNameList">
                      <span slot="label"  class="text_css">* 介绍人:</span>

                      <el-select v-show="edit" v-model="student.introducerId" filterable placeholder="请选择介绍人" style="width: 100%" >
                        <el-option v-for="user in userList" :key="user.userId" :label="user.name" :value="user.userId">
                        </el-option>
                      </el-select>
                      <div style="padding-left: 16px;font-size: 12px;"  v-show="!edit" >
                        <span v-for="(introducerName,index) in student.introducerNameList" >{{introducerName}}<span v-if="student.introducerNameList.length !== (student+1)">、</span></span>
                      </div>
                    </el-form-item>
                  </el-row>
                  <!-- 历史费用 -->
                  <el-row style="margin: 0 10px" v-if="student.serviceRemark!==null&&student.serviceRemark!==''">
                    <el-form-item prop="company">
                      <span slot="label" class="text_css">历史费用:</span>
                      <div style="padding-left: 16px;font-size: 12px;" >{{student.serviceRemark}}</div>
                    </el-form-item>
                  </el-row>
                </el-col>
              </el-row>
            </el-card>
            <el-card body-style="padding: 10px 20px;"  shadow="never" style="height:50px; border-radius:0 0 4px 0;">
              <div v-if="edit" style="float: right;">
                <el-button type="info" size="mini" @click="cancel('student')"><i class="el-icon-fa-undo"></i> 取 消</el-button>
                <el-button type="success" size="mini" :loading="btnLoading" @click="update('student')"><i class="el-icon-fa-save"></i> 保 存</el-button>
              </div>
              <div v-else style="float: right;">
                <el-button type="primary" v-show="student.physicalExamination==='1'" v-if="permissions.stu_push_122"  size="mini" @click="dialog122"><i class="el-icon-fa-bars"></i> 录入122</el-button>
                <el-button type="primary" size="mini" @click="openService"  v-if="permissions.stu_service_charge_add"><i class="el-icon-goods"></i> 收 费</el-button>
                <el-button type="primary" size="mini" @click="handleBespeakCar"  v-if="permissions.stu_bespeak_car_add"><i class="el-icon-fa-car"></i> 约 车</el-button>
                <el-button type="primary" size="mini" @click="handleBespeakExam" v-if="permissions.stu_bespeak_exam_add"><i class="el-icon-fa-book"></i> 约 考</el-button>
                <el-button type="primary" size="mini" @click="editInfo" v-if="permissions.stu_student_update"><i class="el-icon-edit"></i> 编 辑</el-button>
              </div>

            </el-card>
          </el-form>
        </el-col>
        <el-col :span="area[1] === 600?24:12"  >
          <el-tabs v-model="activeName" type="border-card"  @tab-click="handleClick" style="height: 799px;border-radius: 4px 0 0 4px;">
            <!--<el-tab-pane label="最近信息" name="1">-->
            <!--</el-tab-pane>-->
            <el-tab-pane label="考试情况" name="1" style="height: 100%">
              <el-table :data="examNoteList" stripe style="width: 100%;">
                <el-table-column type="index" label="序号"  align="center" width="50"></el-table-column>
                <el-table-column align="center"  label="考试日期">
                  <template slot-scope="scope">
                    <span>{{ scope.row.examTime | subTime}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center"  label="考试科目">
                  <template slot-scope="scope">
                    <span>{{ scope.row.subject | subjectFilter}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center"  label="考试批次">
                  <template slot-scope="scope">
                    <span><{{scope.row.examTime | subTime}}> {{scope.row.examField}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center"  label="考试结果">
                  <template slot-scope="scope">
                    <el-tag v-show="scope.row.examState === '1'" type="info" style="color: #fff;" color="#67C23A">通 过</el-tag>
                    <el-tag v-show="scope.row.examState === '2'" type="info" style="color: #fff;" color="#F56C6C">失 败</el-tag>
                    <el-tag v-show="scope.row.examState === '3'" type="info" style="color: #fff;" color="#E6A23C">缺 考</el-tag>
                  </template>
                </el-table-column>

              </el-table>

            </el-tab-pane>
            <el-tab-pane label="费用情况" name="3">
              <el-table :data="financeList" stripe style="width: 100%;">
                <el-table-column type="expand">
                  <template slot-scope="props">
                    <div style="line-height: 22px;">
                      <span v-for="(service,index) in props.row.financeList">
                      <span style="text-decoration: underline">{{service.code+'_'+service.name + '('+service.price+'*'+service.number+')'}}</span>
                      <span v-if="index+1 < props.row.financeList.length">、</span>
                      </span>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column align="left"  label="单号" width="150">
                  <template slot-scope="scope">
                    <a href="javascript:void(0) " style="color: -webkit-link;cursor: pointer;text-decoration: underline;" @click="openService(scope.row)">{{scope.row.serialPrefix}}{{scope.row.paytime | parseTime('{y}{m}')}}{{scope.row.serialNumber | parseSerial}}</a>
                  </template>
                </el-table-column>
                <el-table-column align="left"  label="缴费金额">
                  <template slot-scope="scope">
                    <span>{{scope.row.money}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="left"  label="缴费时间">
                  <template slot-scope="scope">
                    <span>{{scope.row.paytime | parseTime('{y}-{m}-{d}')}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="left"  label="缴费类型">
                  <template slot-scope="scope">
                    <span>{{scope.row.receivablesType}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="left"  label="缴费方式">
                  <template slot-scope="scope">
                    <p v-for="type in scope.row.payTypeList">{{type.mode + '('+type.money+')'}}</p>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="来访跟进信息" name="4">
              <div style="line-height: 160px;height: 160px;color: #909399;text-align: center;font-size: 14px" v-if="followUpList.length === 0">
                无跟进信息
              </div>
              <div v-else :style="{height: (client.height-175) + 'px'}"  style="width: 100%;overflow: auto;margin-bottom: 10px;padding: 35px">
                <div style="border-left: 2px solid #9fcfff;min-height: 100px;padding-bottom: 25px;" v-for="followUp in followUpList">
                  <el-tag style="float:left;width:50px; height: 50px; border-radius: 1000px;margin-left: -26px;margin-top: -15px; padding: 0;overflow: hidden;">
                    <img width="100%" height="100%" :src="followUp.avatar">
                  </el-tag>
                  <div style="float:left;color:#495060;font-size: 18px;margin-left: 10px;">{{followUp.userName}}</div>
                  <div style="float:right;color:#495060;font-size: 14px;">{{followUp.createTime | subTime('dateTime')}}</div>
                  <div style="clear: both;white-space:normal;width: 100%">
                    <p style="font-size: 14px;margin-left: 35px;border-radius: 10px;white-space:normal;width:80%;">{{followUp.content}}</p>
                  </div>
                </div>
              </div>

            </el-tab-pane>
            <el-tab-pane label="约车日志" name="5">
              <el-table :data="vehiclePeriodList" stripe style="width: 100%">
                <el-table-column type="index" label="序号"  align="center" width="50"></el-table-column>
                <el-table-column align="center"  label="科目">
                  <template slot-scope="scope">
                    <span>{{ scope.row.subject | subjectFilter}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center"  label="签到">
                  <template slot-scope="scope">
                    <span>{{ scope.row.sign === '0'?'否':'是'}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center"  label="车牌">
                  <template slot-scope="scope">
                    <span>{{ scope.row.plateNumber}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center"  label="场地">
                  <template slot-scope="scope">
                    <span>{{ scope.row.fieldAddress}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center"  label="时间">
                  <template slot-scope="scope">
                    <span>{{ scope.row.trainDate | subTime('dateTime')}}  {{scope.row.period}}</span>
                  </template>
                </el-table-column>

              </el-table>
            </el-tab-pane>

          </el-tabs>
        </el-col>
      </el-row>
    </el-card>
    <!--添加-->
    <el-card v-show="showModule=='add'" @close="backClick" title="录入详细信息" width="800px"  style="height: 100%;overflow: auto">
      <div v-loading="createLoading" element-loading-text="努力加载中..." style="line-height: 50px;">
        <el-form :model="studentEntity" :rules="studentEntityRules" ref="studentEntity" label-width="80px" size="mini" >
          <el-row :gutter="20">
            <el-col :span="12" >
              <!-- 联系电话 -->
              <el-row >
                <el-form-item prop="mobile">
                  <span slot="label" class="text_css">联系电话</span>
                  <el-input size="mini" class="filter-item" @keyup.enter.native="matchingStudents" @blur="matchingStudents" placeholder="联系电话" :maxlength="11"  v-model.number="studentEntity.mobile"></el-input>
                </el-form-item>

              </el-row>

              <!-- 身份证号 -->
              <el-row >
                <el-form-item prop="idNumber">
                  <span slot="label" class="text_css">身份证号</span>
                  <el-input size="mini" class="filter-item" placeholder="身份证号" :maxlength="18" @keyup.enter.native="AddGenerateInfo" @blur="AddGenerateInfo" v-model="studentEntity.idNumber"></el-input>
                </el-form-item>
              </el-row>

              <!-- 档案号 -->
              <el-row >
                <el-form-item prop="archivesNumber">
                  <span slot="label" class="text_css">档案号</span>
                  <el-input size="mini" class="filter-item" placeholder="档案号" v-model="studentEntity.archivesNumber"></el-input>
                </el-form-item>
              </el-row>

              <!-- 姓名 -->
              <el-row >

                <el-form-item prop="name">
                  <span slot="label" class="text_css">姓名</span>
                  <el-input size="mini" class="filter-item" placeholder="姓名" clearable v-model="studentEntity.name"></el-input>
                </el-form-item>

              </el-row>


              <!-- 微信 -->
              <el-row >
                <el-form-item prop="wechat">
                  <span slot="label"  class="text_css">微信</span>
                  <el-input size="mini" class="filter-item" placeholder="微信" v-model="studentEntity.wechat"></el-input>
                </el-form-item>
              </el-row>


              <!-- 校区 -->
              <el-row >
                <el-form-item prop="campus">
                  <span slot="label"  class="text_css">校区</span>
                  <dict size="mini" v-model="studentEntity.campus" dictType="dict_campus" style="width: 100%;"  placeholder="校区"></dict>
                </el-form-item>
              </el-row>

              <!-- 联系地址 -->
              <el-row >
                <el-form-item prop="contactAddress">
                  <span slot="label"  class="text_css">联系地址</span>
                  <el-input size="mini" class="filter-item" placeholder="联系地址" v-model="studentEntity.contactAddress"></el-input>
                </el-form-item>
              </el-row>


              <!-- 入学期数 -->
              <el-row >
                <el-form-item prop="periods">
                  <span slot="label"  class="text_css">入学期数</span>
                  <el-input size="mini" class="filter-item" placeholder="入学期数" v-model="studentEntity.periods"></el-input>
                </el-form-item>
              </el-row>




              <!-- 生日 -->
              <el-row >
                <el-form-item prop="birthday">
                  <span slot="label" class="text_css">生日</span>
                  <el-date-picker size="mini" value-format="timestamp"  type="date" placeholder="生日"  style="width: 100%" v-model="studentEntity.birthday"></el-date-picker>
                </el-form-item>
              </el-row>

              <!-- 所学车型 -->
              <el-row >
                <el-form-item prop="motorcycleType">
                  <span slot="label"  class="text_css">所学车型</span>
                  <el-select v-if="edit" style="width: 100%" size="mini" v-model="studentEntity.motorcycleType" clearable placeholder="车型">
                    <el-option
                      v-for="item in $store.state.app.motorcycleType"
                      :key="item"
                      :label="item"
                      :value="item">
                    </el-option>
                  </el-select>
                  <!--<dict size="mini" v-model="studentEntity.motorcycleType" dictType="dict_motorcycle_type" style="width: 100%;"  placeholder="所学车型"></dict>-->
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item prop="serviceType">
                  <span slot="label"  class="text_css">练车类型:</span>
                  <el-select v-if="edit" style="width: 100%" size="mini" v-model="studentEntity.serviceType" clearable placeholder="练车类型">
                    <el-option
                      v-for="item in $store.state.app.vehicleType"
                      :key="item.value"
                      :label="item.name"
                      :value="item.value">
                    </el-option>
                  </el-select>
                  <!--<dict size="mini" v-model="studentEntity.motorcycleType" dictType="dict_motorcycle_type" style="width: 100%;"  placeholder="所学车型"></dict>-->
                </el-form-item>
              </el-row>
              <!-- 来源渠道 -->
              <el-row >
                <el-form-item prop="source">
                  <span slot="label" class="text_css">来源渠道</span>
                  <dict size="mini" v-model="studentEntity.source" dictType="dict_source" style="width: 100%;"  placeholder="来源渠道"></dict>
                </el-form-item>
              </el-row>


              <!-- 入学日期 -->
              <el-row >
                <el-form-item prop="enrolTime">
                  <span slot="label"  class="text_css">入学日期</span>
                  <el-date-picker size="mini" value-format="timestamp" type="date" placeholder="入学日期" style="width: 100%" v-model="studentEntity.enrolTime"></el-date-picker>
                </el-form-item>
              </el-row>

            </el-col>

            <el-col :span="12">

              <el-row>
                <el-col :span="6"> &nbsp;</el-col>
                <el-col  :span="18">
                  <div style="height: 150px;width: 100px;margin: 0 auto">
                    <el-upload :disabled="!edit"  class="AddAvatar-uploader" action="/oss/upload" name="file" :show-file-list="false" :headers="headers"
                               accept=".png,.jpg"
                               :on-success="AddHandleAvatarSuccess" :before-upload="beforeAvatarUpload" :on-error="handleAvatarError">
                      <img :src="studentEntity.avatar" class="AddAvatar">
                    </el-upload>
                  </div>
                </el-col>
              </el-row>


              <!-- 性别 -->
              <el-row >
                <el-form-item prop="sex">
                  <span slot="label" class="text_css">性别</span>
                  <el-radio-group size="mini" v-model="studentEntity.sex">
                    <el-radio label="1">男</el-radio>
                    <el-radio label="0">女</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-row>


              <!-- 是否体检 -->
              <el-row >
                <el-form-item prop="physicalExamination">
                  <span slot="label" class="text_css">是否体检</span>
                  <el-radio-group v-model="studentEntity.physicalExamination">
                    <el-radio label="1">是</el-radio>
                    <el-radio label="0">否</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-row>


              <!-- 是否增驾 -->
              <el-row >
                <el-form-item prop="addDrive">
                  <span slot="label" class="text_css">是否增驾</span>
                  <el-radio-group v-model="studentEntity.addDrive">
                    <el-radio label="1">是</el-radio>
                    <el-radio label="0">否</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-row>

              <!-- 是否有车 -->
              <el-row >
                <el-form-item prop="haveCar">
                  <span slot="label" class="text_css">是否有车</span>
                  <el-radio-group v-model="studentEntity.haveCar">
                    <el-radio label="1">是</el-radio>
                    <el-radio label="0" >否</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-row>

              <!-- 电子邮箱 -->
              <el-row >
                <el-form-item prop="email">
                  <span slot="label"  class="text_css">电子邮箱</span>
                  <el-input style="width: 100%;" class="filter-item" placeholder="电子邮箱" v-model="studentEntity.email"></el-input>
                </el-form-item>
              </el-row>


              <!-- 所在单位 -->
              <el-row >
                <el-form-item prop="company">
                  <span slot="label"  class="text_css">所在单位</span>
                  <el-input style="width: 100%;" class="filter-item" placeholder="所在单位" v-model="studentEntity.company"></el-input>
                </el-form-item>

              </el-row>

              <!-- 所属职位 -->
              <el-row >
                <el-form-item prop="position">
                  <span slot="label"  class="text_css">所属职位</span>
                  <el-input style="width: 100%;" class="filter-item" placeholder="所属职位" v-model="studentEntity.position"></el-input>
                </el-form-item>
              </el-row>
              <!-- 报名点 -->
              <el-row >
                <el-form-item prop="enrolSite">
                  <span slot="label"  class="text_css">报名点</span>
                  <dict v-model="studentEntity.enrolSite" dictType="dict_enrolSite" style="width: 100%;"  placeholder="报名点"></dict>
                </el-form-item>
              </el-row>

              <!-- 介绍人 -->
              <el-row >
                <el-form-item prop="introducerList">
                  <span slot="label"  class="text_css">介绍人</span>
                  <el-select v-model="studentEntity.introducerId" filterable placeholder="请选择介绍人" style="width: 100%" >
                    <el-option v-for="user in userList" :key="user.userId" :label="user.name" :value="user.userId">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-row>


            </el-col>

          </el-row>
          <el-row :gutter="20">
            <el-form-item prop="remark">
              <span slot="label"  class="text_css">备注</span>
              <el-input  type="textarea" v-model="studentEntity.remark" :autosize="{ minRows: 4, maxRows: 4}" placeholder="备注"></el-input>
            </el-form-item>
          </el-row>
        </el-form>
      </div>
      <div  class="dialog-footer">
        <el-button plain @click="reset('studentEntity')">重  置</el-button>
        <el-button type="primary" :loading="btnLoading" @click="add('studentEntity')">建 档</el-button>
      </div>
    </el-card>

    <el-dialog :modal="false" @close="closeBespeak" title="选择批次" width="550px" :visible.sync="dialogFormBespeak">
      <div :style="{height: ($store.state.app.client.height)/3 +'px'}" style="overflow: auto">
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
        <el-button @click="closeBespeak"><i class="el-icon-fa-undo"></i> 取 消</el-button>
        <el-button :loading="btnLoading" type="primary" @click="createBespeak('exam')">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog :modal="false" @close="closeBespeak" title="选择课时" width="550px" :visible.sync="besCarDialog">
      <div :style="{height: ($store.state.app.client.height)/3 +'px'}" style="overflow: auto">
        <div v-if="carClassList.length === 0" style="width: 100%;text-align: center;font-size: 18px;color: #99a9bf;font-weight: 100;">
          无可预约课时
        </div>
        <div v-else v-for="carClass in carClassList"  style="float: left;margin: 5px">
          <div class="carClassCss" @click="carClassClick($event,carClass)" style="float: left;">
            明天{{carClass.period}}
            <span>【{{carClass.number}}/{{carClass.count}}】</span>
          </div>

        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeBespeak"><i class="el-icon-fa-undo"></i> 取 消</el-button>
        <el-button :loading="btnLoading" type="primary" @click="createBespeak('car')">确 定</el-button>
      </div>
    </el-dialog>



    <el-dialog :modal="false"  @close="isPush122 = false;btnLoading = false;$refs['student122'].resetFields()" title="录入122" width="800px" :visible.sync="isPush122">

      <el-form :model="student122" :rules="studentRules122" ref="student122" label-width="80px" size="mini" >
        <el-row :gutter="20">
          <el-col :span="12" >
            <el-form-item prop="orgId">
              <span slot="label" class="text_css">部门</span>
              <tree-select style="font-size: 12px;" height="28px" url="/upms/org/tree" v-model="student122.orgId"  placeholder="部门" ></tree-select>
            </el-form-item>

            <el-form-item prop="XM">
              <span slot="label" class="text_css">姓名</span>
              <el-input size="mini" class="filter-item"  placeholder="姓名"  v-model.number="student122.XM"></el-input>
            </el-form-item>

            <el-form-item prop="SFZMHM">
              <span slot="label" class="text_css">身份证号</span>
              <el-input size="mini" class="filter-item"  placeholder="身份证号码"  v-model.number="student122.SFZMHM"></el-input>
            </el-form-item>

            <el-form-item prop="CSRQ">
              <span slot="label" class="text_css">出生日期</span>
              <el-date-picker size="mini" value-format="yyyy-MM-dd"  type="date" placeholder="生日"  style="width: 100%" v-model="student122.CSRQ"></el-date-picker>
            </el-form-item>

            <el-form-item prop="DJZSXXDZ">
              <span slot="label" class="text_css">登记住所</span>
              <el-input size="mini" class="filter-item"  placeholder="登记住所"  v-model.number="student122.DJZSXXDZ"></el-input>
            </el-form-item>

            <el-form-item prop="SJHM">
              <span slot="label" class="text_css">手机号码</span>
              <el-input size="mini" class="filter-item"  placeholder="手机号码"  v-model.number="student122.SJHM"></el-input>
            </el-form-item>

            <el-form-item prop="LXDH">
              <span slot="label" class="text_css">固定电话</span>
              <el-input size="mini" class="filter-item"  placeholder="固定电话"  v-model.number="student122.LXDH"></el-input>
            </el-form-item>

          </el-col>
          <el-col :span="12" >
            <el-form-item prop="XB">
              <span slot="label" class="text_css">性别</span>
              <el-radio-group size="mini" v-model="student122.XB">
                <el-radio label="1">男</el-radio>
                <el-radio label="0">女</el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item prop="GJ">
              <span slot="label" class="text_css">国籍</span>
              <el-select style="width: 100%" size="mini" v-model="student122.GJ" clearable placeholder="国籍">
                <el-option
                  v-for="item in GJList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item prop="SFZYXQZ">
              <span slot="label" class="text_css">身份证有效期</span>
              <el-input size="mini" class="filter-item"  placeholder="身份证有效期"  v-model.number="student122.SFZYXQZ"></el-input>
            </el-form-item>

            <el-form-item prop="YZBM">
              <span slot="label" class="text_css">邮政编码</span>
              <el-input size="mini" class="filter-item"  placeholder="邮政编码"  v-model.number="student122.YZBM"></el-input>
            </el-form-item>

            <el-form-item prop="ZKCX">
              <span slot="label" class="text_css">申请车型</span>
              <el-select style="width: 100%" size="mini" v-model="student122.ZKCX" clearable placeholder="申请车型">
                <el-option
                  v-for="item in $store.state.app.motorcycleType"
                  :key="item"
                  :label="item"
                  :value="item">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item prop="ZZZM">
              <span slot="label" class="text_css">暂住证编号</span>
              <el-input size="mini" class="filter-item"  placeholder="暂住证编号"  v-model.number="student122.ZZZM"></el-input>
            </el-form-item>
          </el-col>

        </el-row>

      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button plain @click="isPush122 = false;btnLoading = false;$refs['student122'].resetFields()">取消</el-button>
        <el-button type="primary" :loading="btnLoading" @click="push122('student122')">录入</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import { autoProduce } from '@/utils/index'
  import Coach from '@/components/Coach'
  import { removeAllSpace } from '@/utils/validate'
  import { getToken } from '@/utils/auth'
  import { mapGetters } from 'vuex'

  import { fetchStudentList, getStudent, saveStudent, putStudent, isExistence, exportStudent, getIntention, push122, getFinanceList } from '@/api/student/student'
  import { examFetchList, batchSave } from '@/api/student/examnote'
  import { getBatchList } from '@/api/student/batch'

  import { getUserList } from '@/api/upms/user'
  import { getVehiclePeriodByStudentId, getClassByCoachId, bespeakVehiclePeriod } from '@/api/bespeak/vehicleperiod'
  import { getShuttleLogByStudentId } from '@/api/bespeak/shuttlestudent'
  import { followUpList } from '@/api/visit/followup'
  import { getIntentionByMobile } from '@/api/visit/intention'
  import { Message } from 'element-ui'
  import finance from '@/views/modules/stu/serviceNote.vue'

  export default {
    components: {
      Coach
    },
    data() {
      var idNumberReg = (rule, value, callback) => {
        /* 台湾 */
        var TaiwanReg = /^[A-Z][0-9]{9}$/
        /* 香港 */
        var HongKongReg = /^[A-Z][0-9]{6}\([0-9A]\)$/
        /* 澳门 */
        var MacaoReg = /^[157][0-9]{6}\([0-9]\)$/
        /* 大陆 */
        var userCardReg = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31|)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2})((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$/
        if (userCardReg.test(value)) {
          callback()
        } else if (TaiwanReg.test(value)) {
          callback()
        } else if (HongKongReg.test(value)) {
          callback()
        } else if (MacaoReg.test(value)) {
          callback()
        } else {
          callback(new Error('请输入正确的身份证号码'))
        }
      }
      var idNumberIsExistence = (rule, value, callback) => {
        isExistence(value).then(response => {
          if (response.data.data) {
            callback(new Error('身份证号码已存在'))
          } else {
            callback()
          }
        })
      }
      var mobileIsExistence = (rule, value, callback) => {
        isExistence(value).then(response => {
          if (response.data.data) {
            callback(new Error('电话号码已存在'))
          } else {
            callback()
          }
        })
      }
      return {
        student: {
          studentId: null,
          orgId: null,
          openId: null,
          archivesNumber: null,
          name: null,
          sex: null,
          age: null,
          idNumber: null,
          birthday: null,
          mobile: null,
          phone: null,
          email: null,
          wechat: null,
          avatar: null,
          contactAddress: null,
          campus: null,
          company: null,
          position: null,
          enrolTime: null,
          periods: null,
          studyTime: null,
          latitude: null,
          longitude: null,
          physicalExamination: '0',
          haveCar: '0',
          addDrive: '0',
          state: null,
          graduationTime: null,
          periodOfValidity: null,
          aboardTime: null,
          roadCoach: null,
          fieldCoach: null,
          incrementList: [],
          introducerId: null,
          introducerList: [],
          serviceType: null,
          arrearage: null,
          enrolSite: null,
          source: null,
          motorcycleType: null,
          vehicleType: null,
          delFlag: null,
          remark: null,
          operator: null,
          createTime: null,
          updateTime: null
        },
        studentEntity: {
          intentionId: null,
          archivesNumber: null,
          name: null,
          sex: null,
          idNumber: null,
          birthday: null,
          mobile: null,
          phone: null,
          email: null,
          wechat: null,
          avatar: null,
          contactAddress: null,
          campus: null,
          company: null,
          position: null,
          enrolTime: null,
          periods: null,
          studyTime: null,
          latitude: null,
          longitude: null,
          physicalExamination: '0',
          haveCar: '0',
          addDrive: '0',
          state: null,
          graduationTime: null,
          periodOfValidity: null,
          aboardTime: null,
          incrementList: [],
          introducerId: null,
          introducerList: [],
          serviceType: null,
          arrearage: null,
          enrolSite: null,
          source: null,
          motorcycleType: null
        },
        studentEntityRules: {
          mobile: [
            { required: true, message: '请输入手机号', trigger: ['blur', 'change'] },
            { pattern: /^1[123456789]\d{9}$/, message: '请输入正确的手机号码', trigger: ['blur', 'change'] },
            { validator: mobileIsExistence, trigger: ['blur'] }
          ],
          idNumber: [
            { required: true, message: '请输入身份证', trigger: ['blur', 'change'] },
            { validator: idNumberReg, trigger: ['blur', 'change'] },
            { validator: idNumberIsExistence, trigger: ['blur'] }
          ],
          archivesNumber: [
            { required: true, message: '请输入档案号', trigger: ['blur', 'change'] }
          ],
          name: [
            { required: true, message: '请输入姓名', trigger: ['blur', 'change'] }
          ],
          wechat: [],
          campus: [
            { required: true, message: '请输入校区地址', trigger: ['blur', 'change'] }
          ],
          contactAddress: [
            { required: true, message: '请输入住址', trigger: ['blur', 'change'] }
          ],
          periods: [
            { required: true, message: '请输入入学期数', trigger: ['blur', 'change'] }
          ],
          birthday: [
            { required: true, message: '请选择生日', trigger: ['blur', 'change'] }
          ],
          motorcycleType: [
            { required: true, message: '请选择所学车型', trigger: ['blur', 'change'] }
          ],
          source: [
            { required: true, message: '请选择来源渠道', trigger: ['blur', 'change'] }
          ],
          enrolTime: [
            { required: true, message: '请选择入学日期', trigger: ['blur', 'change'] }
          ],
          sex: [
            { required: true, message: '请选择性别', trigger: ['blur', 'change'] }
          ],
          physicalExamination: [
            { required: true, message: '请选择是否体检', trigger: ['blur', 'change'] }
          ],
          addDrive: [
            { required: true, message: '请选择是否增加', trigger: ['blur', 'change'] }
          ],
          haveCar: [
            { required: true, message: '请选择是否有车', trigger: ['blur', 'change'] }
          ],
          email: [
            { pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, message: '请输入正确的邮箱', trigger: ['blur', 'change'] }
          ],
          company: [],
          position: [],
          enrolSite: [
            { required: true, message: '请选择报名点', trigger: ['blur', 'change'] }
          ],
          introducer: [
            { required: true, message: '请选择介绍人', trigger: ['blur', 'change'] }
          ]
        },
        studentRules: {
          mobile: [
            { required: true, message: '请输入手机号', trigger: ['blur', 'change'] },
            { pattern: /^1[123456789]\d{9}$/, message: '请输入正确的手机号码', trigger: ['blur', 'change'] }
          ],
          idNumber: [
            { required: true, message: '请输入身份证', trigger: ['blur', 'change'] },
            { validator: idNumberReg, trigger: ['blur', 'change'] }
          ],
          archivesNumber: [
            { required: true, message: '请输入档案号', trigger: ['blur', 'change'] }
          ],
          name: [
            { required: true, message: '请输入姓名', trigger: ['blur', 'change'] }
          ],
          wechat: [],
          campus: [
            { required: true, message: '请输入校区地址', trigger: ['blur', 'change'] }
          ],
          contactAddress: [
            { required: true, message: '请输入住址', trigger: ['blur', 'change'] }
          ],
          periods: [
            { required: true, message: '请输入入学期数', trigger: ['blur', 'change'] }
          ],
          birthday: [
            { required: true, message: '请选择生日', trigger: ['blur', 'change'] }
          ],
          motorcycleType: [
            { required: true, message: '请选择所学车型', trigger: ['blur', 'change'] }
          ],
          source: [
            { required: true, message: '请选择来源渠道', trigger: ['blur', 'change'] }
          ],
          enrolTime: [
            { required: true, message: '请选择入学日期', trigger: ['blur', 'change'] }
          ],
          sex: [
            { required: true, message: '请选择性别', trigger: ['blur', 'change'] }
          ],
          physicalExamination: [
            { required: true, message: '请选择是否体检', trigger: ['blur', 'change'] }
          ],
          addDrive: [
            { required: true, message: '请选择是否增加', trigger: ['blur', 'change'] }
          ],
          haveCar: [
            { required: true, message: '请选择是否有车', trigger: ['blur', 'change'] }
          ],
          email: [
            { pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, message: '请输入正确的邮箱', trigger: ['blur', 'change'] }
          ],
          company: [],
          position: [],
          enrolSite: [
            { required: true, message: '请选择报名点', trigger: ['blur', 'change'] }
          ],
          introducer: [
            { required: true, message: '请选择介绍人', trigger: ['blur', 'change'] }
          ]
        },
        stuList: [],
        examNoteList: [],
        vehiclePeriodList: [],
        shuttleLogList: [],
        followUpList: [],
        total: 1,
        listLoading: true,
        btnLoading: false,
        expLoading: false,
        isCreate: false,
        isPush122: false,
        showModule: 'list',
        data122: 'list',
        listQuery: {
          page: 1,
          limit: 20,
          condition: null,
          interval: [],
          subject: null,
          roadCoach: null,
          fieldCoach: null,
          source: null,
          motorcycleType: null,
          orgId: null
        },
        activeName: '1',
        edit: false,
        pickerOptions: {
          shortcuts: [{
            text: '昨天',
            onClick(picker) {
              const end = new Date(new Date().setHours(0, 0, 0, 0))
              const start = new Date(new Date().setHours(0, 0, 0, 0))
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 1)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '近三天',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 3)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '本周',
            onClick(picker) {
              const end = new Date()
              const day = new Date(new Date().setHours(0, 0, 0, 0))
              var week = day.getDay()
              if (week === 0) week = 7
              const start = day
              start.setTime(start.getTime() - 3600 * 1000 * 24 * (week - 1))
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '本月',
            onClick(picker) {
              const end = new Date()
              const start = new Date(new Date().setHours(0, 0, 0, 0))
              start.setDate(1)
              picker.$emit('pick', [start, end])
            }
          }]
        },
        subject: [
          {
            value: 1,
            label: '科目一'
          }, {
            value: 2,
            label: '科目二'
          }, {
            value: 3,
            label: '科目三'
          }, {
            value: 4,
            label: '科目四'
          }
        ],
        dialogFormBespeak: false,
        besCarDialog: false,
        batchList: [],
        examBespeak: {
          studentId: null,
          state: 0,
          examId: null,
          periodId: null,
          subject: null
        },
        carBespeak: {
          studentId: null,
          pid: null
        },
        carClassList: [],
        batchListQuery: {
          page: 1,
          limit: 0,
          /* 今天以前传 before   今天之后传 after */
          scope: 'after',
          subject: null
        },
        /* 添加加载动画 */
        createLoading: false,
        infoLoading: false,
        tableHeight: this.area[1],
        userList: [],
        GJList: [
          { label: '中国', value: '156' }
        ],
        studentRules122: {
          orgId: [{ required: true, message: '部门不能为空', trigger: 'blur' }],
          SFZMHM: [{ required: true, message: '身份证号码不能为空', trigger: 'blur' }],
          SFZYXQZ: [{ required: true, message: '身份证有效期不能为空', trigger: 'blur' }],
          XM: [{ required: true, message: '姓名不能为空', trigger: 'blur' }],
          CSRQ: [{ required: true, message: '出生日期不能为空', trigger: 'blur' }],
          DJZSXXDZ: [{ required: true, message: '登记住所不能为空', trigger: 'blur' }],
          YZBM: [{ required: true, message: '邮政编码不能为空', trigger: 'blur' }],
          ZKCX: [{ required: true, message: '申请车型不能为空', trigger: 'blur' }],
          SJHM: [{ required: true, message: '手机号码不能为空', trigger: 'blur' }]
        },
        student122: {
          studentId: '',
          orgId: '',
          SFZMHM: '', // 身份证号码
          SFZMMC: 'A', // 身份证名称 默认A
          SFZYXQZ: '', // 身份证有效期
          XM: '', // 姓名
          CSRQ: '', // 出生日期
          GJ: '156', // 国籍 默认156
          XB: '', // 性别 0男 1女
          DJZSXZQH: '', // 所属辖区 ------
          DJZSXXDZ: '', // 登记住所 ======
          DZYX: '', // 电子邮箱
          LXZSXZQH: '', // 住所行政区划 -----
          LXZSXXDZ: '', // 住所详细地址 ======
          LY: 'A', // 默认A
          SJHM: '', // 手机号码
          YJDZ: '', // address
          YZBM: '', //  邮政编码
          XZQH: '', //  所属辖区 ======
          LXDH: '', // 固定电话
          ZZZM: '', //  暂住证编号
          ZKCX: '', // 申请车型
          MODAL: '2', // 2
          TICKET: '', // 秘钥
          SFZC2: '2' // 2
        },
        financeList: []
      }
    },
    created() {
      this.$data.showModule = this.display
      this.getList()
    },
    props: {
      display: String,
      area: Array
    },
    watch: {
      area: function(val) {
        this.tableHeight = val[1]
      },
      'student.introducerId': function(val) {
        console.log(val)
        if (val) {
          this.student.introducerIdList = [val]
        }
      },
      'studentEntity.introducerId': function(val) {
        if (val) {
          this.studentEntity.introducerList = [val]
        }
      }
    },
    computed: {
      ...mapGetters([
        'permissions',
        'client'
      ]),
      headers() {
        return {
          'Authorization': 'Bearer ' + getToken()
        }
      }
    },
    methods: {
      dialog122() {
        getIntention(this.student.intentionId).then(response => {
          console.log(this.student)
          if (response.data.code === 0 && response.data.data) {
            this.student122.studentId = this.student.studentId //
            this.student122.orgId = this.student.orgId // 组织
            this.student122.SFZMHM = this.student.idNumber // 身份证号码
            this.student122.SFZYXQZ = response.data.data.validity // 身份证有效期
            this.student122.SFZMMC = 'A' // 身份证名称 默认A
            this.student122.XM = this.student.name // 姓名
            this.student122.CSRQ = this.parseTime(this.student.birthday, '{y}-{m}-{d}') // 出生日期
            this.student122.GJ = response.data.data.nationality // 国籍
            this.student122.XB = this.student.sex === '1' ? '0' : '1' // 性别

            this.student122.DJZSXZQH = response.data.data.djzsxzqh // 所属辖区
            this.student122.DJZSXXDZ = response.data.data.lxzsxxdz // 登记住所

            this.student122.DZYX = this.student.email // 电子邮箱
            this.student122.LXZSXZQH = response.data.data.lxzsxzqh // 住所行政区划
            this.student122.LXZSXXDZ = response.data.data.lxzsxxdz // 住所详细地址

            this.student122.LY = 'A' // 默认A
            this.student122.SJHM = this.student.mobile // 手机号码
            this.student122.YJDZ = response.data.data.address // address
            this.student122.YZBM = response.data.data.postalCode // 邮政编码

            this.student122.XZQH = response.data.data.lxzsxzqh // 所属辖区
            // LXDH: '', // 固定电话
            // ZZZM: '', //  暂住证编号
            this.student122.ZKCX = this.student.motorcycleType // 申请车型
            this.student122.MODAL = '2'
            this.student122.SFZC2 = '2'
            this.isPush122 = true
          }
        })
      },
      push122(fname) {
        this.$refs[fname].validate((valid) => {
          if (valid) {
            this.btnLoading = true
            console.log('push122 ************************** begin', this.student122)
            push122(this.student122).then(response => {
              console.log('push122 ************************** end')
              console.log(response)
              if (response.data.code === 0) {
                Message.success('录入成功')
              } else if (response.data.data === 500) {
                Message.success(response.data.data.message)
              } else {
                Message.success('录入失败')
              }
              this.btnLoading = false
              this.isPush122 = false
              this.editList(this.student)
            })
          }
        })
      },
      parseTime(time, cFormat) {
        if (arguments.length === 0) {
          return null
        }
        if (arguments[0] === undefined || arguments[0] == null) {
          return null
        }
        if ((time + '').length === 10) {
          time = +time * 1000
        }

        const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
        let date
        if (typeof time === 'object') {
          date = time
        } else {
          date = new Date(parseInt(time))
        }
        const formatObj = {
          y: date.getFullYear(),
          m: date.getMonth() + 1,
          d: date.getDate(),
          h: date.getHours(),
          i: date.getMinutes(),
          s: date.getSeconds(),
          a: date.getDay()
        }
        const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
          let value = formatObj[key]
          if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
          if (result.length > 0 && value < 10) {
            value = '0' + value
          }
          return value || 0
        })
        return time_str
      },
      // 根据部门id查询学员信息
      searchByOrg(data) {
        this.listQuery.page = 1
        this.getList()
      },
      // 双击行  编辑
      editList(val) {
        this.activeName = '1'
        this.financeList = []
        this.infoLoading = true
        getStudent(val.studentId).then(response => {
          var student = response.data.data
          if (student.introducerIdList && student.introducerIdList.length > 0) {
            student.introducerId = student.introducerIdList[0]
          }
          this.examBespeak.studentId = this.student.studentId
          if (student.introducerIdList === null) student.introducerIdList = [] // 防止介绍人为null
          this.student = student
          this.getIntroducerList()
          this.getExam()
          this.infoLoading = false
        })
        this.showModule = 'info'
      },
      /* 切换标签 */
      handleClick(tab, event) {
        if (tab.label === '考试情况') {
          this.getExam()
        } else if (tab.label === '费用情况') {
          this.getFinance()
        } else if (tab.label === '来访跟进信息') {
          this.getFollowUpList()
        } else if (tab.label === '约车日志') {
          this.getVehiclePeriod()
        } else if (tab.label === '接送日志') {
          this.getShuttleLog()
        }
      },
      /* 费用情况 */
      getFinance() {
        if (this.student.studentId) {
          getFinanceList(this.student.studentId).then(response => {
            if (response.data.code === 0) {
              var list = response.data.data
              this.financeList = list.filter(function(item) {
                return item.state !== '-1'
              })
            }
          })
        }
      },
      /* 考试日志 */
      getExam() {
        if (this.student.studentId) {
          examFetchList({ studentId: this.student.studentId, examState: 'exam_note_true' }).then(response => {
            this.examNoteList = response.data.data.list
          })
        }
      },
      /* 约车日志 */
      getVehiclePeriod() {
        if (this.student.studentId) {
          getVehiclePeriodByStudentId(this.student.studentId).then(response => {
            this.vehiclePeriodList = response.data.list
          })
        }
      },
      /* 接送日志 */
      getShuttleLog() {
        if (this.student.studentId) {
          getShuttleLogByStudentId(this.student.studentId).then(response => {
            this.shuttleLogList = response.data.list
          })
        }
      },
      /* 跟进信息 */
      getFollowUpList() {
        if (this.student.mobile) {
          followUpList({ 'mobile': this.student.mobile }).then(response => {
            this.followUpList = response.data.data
          })
        }
      },
      // 获取所有学员
      getList() {
        this.listLoading = true
        fetchStudentList(this.listQuery).then(response => {
          this.stuList = response.data.data.list
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
      // 编辑
      editInfo() {
        this.edit = true
      },
      // 添加
      add(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.btnLoading = true
            saveStudent(this.studentEntity).then(() => {
              this.backClick()
              this.btnLoading = false
              this.showModule = 'list'
            })
          }
        })
      },
      // 新增
      create() {
        this.isCreate = true
        this.edit = true
        this.showModule = 'add'
        this.getIntroducerList()
      },
      /* 获取介绍人列表 */
      getIntroducerList() {
        getUserList().then(response => {
          this.userList = response.data.data
        })
      },
      // 修改
      update(formName) {
        console.log(this.student)
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.btnLoading = true
            putStudent(this.student).then(() => {
              this.editList(this.student)
              this.btnLoading = false
              this.$refs[formName].resetFields()
              this.edit = false
            })
          }
        })
      },
      // 取消
      cancel(formName) {
        this.$refs[formName].resetFields()
        this.editList(this.student)
        this.edit = false
      },
      // 返回列表
      backClick() {
        this.showModule = 'list'
        this.edit = false
        this.isCreate = false
        this.getList()
        if (this.$refs['studentEntity']) {
          this.$refs['studentEntity'].resetFields()
        }
      },
      // 搜索
      searchClick() {
        this.listQuery.page = 1
        this.examTimeBlur()
        this.listQuery.condition = removeAllSpace(this.listQuery.condition)
        this.getList()
      },
      generateInfo() {
        var value = autoProduce(this.student.idNumber)
        if (value) {
          if (!this.student.archivesNumber) {
            this.student.archivesNumber = value[0]
          }
          if (!this.student.birthday) {
            this.student.birthday = value[1]
          }
          this.student.sex = value[2].toString()
        }
      },
      handleAvatarSuccess(res, file) {
        this.student.avatar = res.data
      },
      handleAvatarError(err, file, fileList) {
        console.log(err, file, fileList)
        this.$message.error('上传失败')
      },
      beforeAvatarUpload(file) {
        const type = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif']
        const isLt2M = file.size / 1024 / 1024 < 1
        const isImages = file.type && type.indexOf(file.type) > -1

        if (!isImages) {
          this.$message.error('只支持jpg、png格式的图片！')
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 1MB!')
        }

        return isImages && isLt2M
      },
      AddHandleAvatarSuccess(res, file) {
        this.studentEntity.avatar = res.data
      },
      AddGenerateInfo() {
        var value = autoProduce(this.studentEntity.idNumber)
        if (value) {
          if (!this.studentEntity.archivesNumber) {
            this.studentEntity.archivesNumber = value[0]
          }
          if (!this.studentEntity.birthday) {
            this.studentEntity.birthday = value[1]
          }
          this.studentEntity.sex = value[2].toString()
        }
      },
      beforeTextUpload(file) {
        this.$store.dispatch('setLoading', true)
        return true
      },
      handleTextSuccess(res, file) {
        this.$store.dispatch('setLoading', false)
        if (res.code === 0) {
          this.$message.success(res.msg)
          this.getList()
        } else {
          this.$message.error(res.msg)
        }
      },
      reset(formName) {
        this.$refs[formName].resetFields()
        this.btnLoading = false
      },
      getFieldCoach(coach) {
        this.student.fieldCoachName = coach.name
      },
      getRoadCoach(coach) {
        this.student.roadCoachName = coach.name
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
      handleBespeakExam() {
        this.examBespeak.subject = this.student.state
        this.batchListQuery.subject = this.student.state
        getBatchList(this.batchListQuery).then(response => {
          this.batchList = response.data.data.list
        })
        this.dialogFormBespeak = true
        this.cleanBatchSelected()
        this.examBespeak.examId = null
      },
      cleanBatchSelected() {
        var a = document.getElementsByClassName('batchCss')
        for (var i = 0; i < a.length; i++) {
          a[i].classList.remove('batchCss_selected')
        }
      },
      cleanCarClassSelected() {
        var a = document.getElementsByClassName('carClassCss')
        for (var i = 0; i < a.length; i++) {
          a[i].classList.remove('carClassCss_selected')
        }
      },
      closeBespeak() {
        this.editList(this.student)
        this.examBespeak.examId = null
        this.dialogFormBespeak = false
        this.btnLoading = false
        this.besCarDialog = false
      },
      /* 约考 */
      batchClick(e, batch) {
        this.examBespeak.examId = batch.examId
        var a = document.getElementsByClassName('batchCss')
        for (var i = 0; i < a.length; i++) {
          a[i].classList.remove('batchCss_selected')
        }
        e.currentTarget.classList.add('batchCss_selected')
      },
      /* 约车 */
      carClassClick(e, carClass) {
        console.log(carClass)
        this.examBespeak.pid = carClass.pid
        var a = document.getElementsByClassName('carClassCss')
        for (var i = 0; i < a.length; i++) {
          a[i].classList.remove('carClassCss_selected')
        }
        e.currentTarget.classList.add('carClassCss_selected')
      },
      createBespeak(flag) {
        if (flag === 'exam') {
          if (this.examBespeak.examId === null) {
            this.$message.warning('请先选择报考批次')
          } else {
            this.btnLoading = true
            batchSave(this.examBespeak).then(() => {
              this.dialogFormBespeak = false
              this.btnLoading = false
              this.examBespeak.examId = null
            })
          }
        } else if (flag === 'car') {
          if (this.examBespeak.pid === null) {
            this.$message.warning('请先选择课时')
          } else {
            this.btnLoading = true
            bespeakVehiclePeriod({ studentId: this.examBespeak.studentId, pid: this.examBespeak.pid }).then(() => {
              this.besCarDialog = false
              this.btnLoading = false
              this.examBespeak.pid = null
              this.editList(this.student)
            })
          }
        }
      },
      matchingStudents() {
        if (this.studentEntity.mobile) {
          this.createLoading = true
          getIntentionByMobile({ 'mobile': this.studentEntity.mobile }).then(response => {
            var flag = true
            if (response.data.data) {
              this.studentEntity.intentionId = response.data.data.intentionId
              if (!this.studentEntity.name) this.studentEntity.name = response.data.data.name
              if (!this.studentEntity.idNumber && response.data.data.idNumber) {
                this.studentEntity.idNumber = response.data.data.idNumber
                this.AddGenerateInfo()
              }
              if (!this.studentEntity.sex) this.studentEntity.sex = response.data.data.sex
              if (!this.studentEntity.source) this.studentEntity.source = response.data.data.source
              if (!this.studentEntity.wechat) this.studentEntity.wechat = response.data.data.wechat
              if (!this.studentEntity.contactAddress) this.studentEntity.contactAddress = response.data.data.contactAddress
              for (var i = 0; i < this.studentEntity.introducerList.length; i++) {
                if (this.studentEntity.introducerList[i] === response.data.data.userId) {
                  flag = false
                  break
                }
              }
              if (flag) this.studentEntity.introducerList.push(response.data.data.userId)
              if (!this.studentEntity.motorcycleType) this.studentEntity.motorcycleType = response.data.data.applyType
            }
            this.createLoading = false
          })
        }
      },
      openService(row) { // openFinace
        var id = this.student.studentId + '_stu'
        var title = '￥' + this.student.name + ' 学费收取'
        var data = { student: this.student }
        if (row && row.chargeId) {
          id = row.chargeId + '_info'
          title = '收费详情'
          data = { charge: { chargeId: row.chargeId, pageLevel: 'info' }}
        }
        this.$layer.open({
          type: 2,
          id: id, // title
          title: title, // title
          shadeClose: false, // 点击遮罩关闭
          tabIcon: '../../../static/icon/app/app_stu_service.png', // 应用图标 任务栏显示
          shade: false, // 遮罩 默认不显示
          content: {
            content: finance,
            parent: this, // 当前的vue对象
            data: data // props
          }
        })
      },
      handleBespeakCar() {
        var coachId
        this.cleanCarClassSelected()
        if (this.student.state === '2') coachId = this.student.fieldCoach
        if (this.student.state === '3') coachId = this.student.roadCoach
        this.examBespeak.subject = this.student.state
        if (coachId) {
          if (this.student.bespCarFlag === '0') {
            getClassByCoachId({ coachId: coachId }).then(response => {
              console.log(21212)
              console.log(response)
              this.carClassList = response.data.data
              this.besCarDialog = true
            })
          } else {
            this.$message.warning('该学员已预约')
          }
        } else {
          this.$message.warning('该学员未分配当前科目教练')
        }
      },
      exportStudent() {
        this.expLoading = true
        exportStudent(this.listQuery).then(response => {
          var time = new Date()
          var blob = new Blob([response.data], { type: 'application/x-xls' })
          var link = document.createElement('a')
          link.href = window.URL.createObjectURL(blob)
          link.download = '学员名单(' + time.toLocaleString() + ').xls'
          link.click()
          this.expLoading = false
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.student{
  .img{
    width: 50px;
    height: 50px;
    padding: 0;
    border-radius: 150px;
    overflow: hidden;
  }
  .page-util{
    margin-top: 20px;
    position: fixed;
    bottom: 0;
    background-color: #fff;
    z-index: 666;
    padding: 20px 0;
    width: 100%;
    left: 0px;
    border-top: 1px solid #ccc;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
  .title{
    height: 40px;
    line-height: 40px;
    color:#495060;
    background-color: #f5f7fa;
    text-align: center;
    font-size: 16px;
    margin-bottom: 10px;
  }
  .text_css{
    color:#495060;
    font-size: 12px;
    word-break:keep-all;/* 不换行 */
    white-space:nowrap;/* 不换行 */
    overflow:hidden;/* 内容超出宽度时隐藏超出部分的内容 */
    text-overflow:ellipsis;/* 当对象内文本溢出时显示省略标记(...) ；需与overflow:hidden;一起使用。*/
  }
  .table_text{
    color: #7c7c7c;font-size: 12px;
    text-align: left;
    word-break:keep-all;/* 不换行 */
    white-space:nowrap;/* 不换行 */
    overflow:hidden;/* 内容超出宽度时隐藏超出部分的内容 */
    text-overflow:ellipsis;/* 当对象内文本溢出时显示省略标记(...) ；需与overflow:hidden;一起使用。*/
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 140px;
    height: 180px;
    line-height: 180px;
    text-align: center;
  }
  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  .avatar_img {
    line-height: 180px;
    position: relative;
    margin: auto;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    width: 140px;
    height: 180px;
    display: block;
  }
  .AddAvatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .AddAvatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .AddAvatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 130px;
    line-height: 130px;
    text-align: center;
  }
  .AddAvatar {
    width: 100px;
    height: 130px;
    display: block;
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
  .carClassCss{
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
  .carClassCss_selected{
    background-color: rgba(103,194,58,.1);
    border-color: rgba(103,194,58,.2);
    color: #67c23a;
  }
  .carClassCss:hover{
    background-color: rgba(103,194,58,.1);
    border-color: rgba(103,194,58,.2);
    color: #67c23a;
  }
}

</style>
