<template>
  <div class="app-container calendar-list-container" :style="{height: $store.state.app.client.height + 'px'}">
    <div v-show="showModule=='list'" style="height: 100%">
      <el-row :gutter="5">
        <el-col class="org-tree-left">
          <el-card>
            <span style="font-size: 16px;font-family: '微软雅黑 Light';color:rgb(145,145,145)">权限筛选</span>
            <my-tree url="/upms/org/tree" v-model="listQuery.orgId"  @node="searchByOrg"></my-tree>
          </el-card>
        </el-col>

        <el-col :style="{width: ($store.state.app.client.width-250) + 'px'}">
          <el-card style="margin-bottom: 5px;height: 125px;line-height: 50px">
              <el-date-picker value-format="timestamp"  :style="{width: ($store.state.app.client.width/7)*1.5 + 'px'}" v-model="listQuery.interval" type="daterange" align="left" unlink-panels range-separator="—" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions">
              </el-date-picker>
              <el-select :style="{width: ($store.state.app.client.width/7) + 'px'}" v-model="listQuery.subject" clearable placeholder="科目">
                <el-option
                  v-for="item in subject"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <dict v-model="listQuery.motorcycleType" dictType="dict_motorcycle_type" :style="{width: ($store.state.app.client.width/7) + 'px'}"  placeholder="车型"  ></dict>
              <dict v-model="listQuery.enrolSite" dictType="dict_enrolSite" :style="{width: ($store.state.app.client.width/7) + 'px'}"  placeholder="报名点"  ></dict>
              <Coach v-model="listQuery.fieldCoach" coachType="field":style="{width: ($store.state.app.client.width/7) + 'px'}"  placeholder="场训教练"  ></Coach>
              <Coach v-model="listQuery.roadCoach" coachType="road" :style="{width: ($store.state.app.client.width/7) + 'px'}"  placeholder="路训教练"  ></Coach>
              <dict v-model="listQuery.source" dictType="dict_source" :style="{width: ($store.state.app.client.width/7) + 'px'}"  placeholder="来源渠道"  ></dict>
              <el-input @keyup.enter.native="searchClick" style="width: 200px;margin-bottom: 0px;" class="filter-item" placeholder="姓名/电话/身份证" v-model="listQuery.condition"></el-input>
              <el-button class="filter-item" type="primary"  @click="searchClick"><i class="el-icon-search"></i>搜索</el-button>
          </el-card>

          <el-card :style="{height: ($store.state.app.client.height-170) + 'px'}">
              <el-table :data="stuList" :height="($store.state.app.client.height-260)" highlight-current-row stripe @row-dblclick="editList" v-loading="listLoading" element-loading-text="给我一点时间">
                <el-table-column align="center" label="头像" min-width="150px">
                  <template slot-scope="scope">
                    <!-- 头像 -->
                    <el-row>
                      <el-tag class="img">
                        <img :src="scope.row.avatar" class="img">
                      </el-tag>
                    </el-row>
                    <el-row>
                      <el-col style="color: #7c7c7c;text-align: center;font-size: 14px;">{{scope.row.name}}</el-col>
                    </el-row>
                    <el-row>
                      <el-col style="color: #7c7c7c;text-align: center;font-size: 14px;">{{scope.row.mobile}}</el-col>
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
                        <el-col :span="17" class="table_text">
                          <span v-for="(introducer,index) in scope.row.introducerList">{{introducer}}<span v-if="scope.row.introducerList.length !== (index+1)">、</span></span>
                        </el-col>
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
                        <el-col :span="7" class="table_text">服务类别:</el-col>
                        <el-col :span="17" class="table_text">{{scope.row.serviceType}}</el-col>
                      </el-row>

                      <el-row :gutter="10">
                        <el-col :span="7" class="table_text">增值服务:</el-col>
                        <el-col :span="17" class="table_text"><span v-for="increment in scope.row.incrementList">{{increment}}、</span></el-col>
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



              <div v-show="!listLoading" class="pagination-container" style="margin-top: 20px">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                               :current-page.sync="listQuery.page"
                               background
                               style="float:left;"
                               :page-sizes="[10,20,30,50]" :page-size="listQuery.limit"
                               layout="total, sizes, prev, pager, next, jumper" :total="total">
                </el-pagination>
                <el-button style="float:right;" @click="create" type="primary"><i class="el-icon-plus"></i>添加</el-button>
              </div>
            </el-card>
        </el-col>
      </el-row>
    </div>

    <el-card body-style="padding:0;" v-show="showModule=='info'">
      <div slot="header"  style="line-height: 30px;" class="clearfix">
        学员详细信息
        <div style="float: right"><el-button type="primary" size="mini"  @click="backClick"><i class="el-icon-back"></i> 返 回</el-button></div>
      </div>
      <el-row :style="{height: ($store.state.app.client.height-110) + 'px'}">
        <el-col :style="{height: ($store.state.app.client.height-110) + 'px',width: ($store.state.app.client.width-555) + 'px'}">
          <el-tabs v-model="activeName" type="border-card" style="height: 100%;border-radius: 4px 0 0 4px;">
            <el-tab-pane label="最近信息" name="1">
            </el-tab-pane>
            <el-tab-pane label="考试情况" name="2">

              <el-table :data="examNoteList" stripe style="width: 100%">
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
                    <span>{{ scope.row.batch}}</span>
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


            </el-tab-pane>
            <el-tab-pane label="来访跟进信息" name="4">


            </el-tab-pane>
            <el-tab-pane label="约车日志" name="5">

              <el-table :data="vehiclePeriodList" stripe style="width: 100%">
                <el-table-column type="index" label="序号"  align="center" width="50"></el-table-column>
                <el-table-column align="center"  label="科目">
                  <template slot-scope="scope">
                    <span>{{ scope.row.subject | subjectFilter}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center"  label="教练">
                  <template slot-scope="scope">
                    <span>{{ scope.row.name}}</span>
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
                    <span>{{ scope.row.studyTime}}</span>
                  </template>
                </el-table-column>

              </el-table>


            </el-tab-pane>
            <el-tab-pane label="接送日志" name="6">

              <el-table :data="shuttleLogList" stripe style="width: 100%">

                <el-table-column type="index" label="序号"  align="center" width="50"></el-table-column>
                <el-table-column align="center"  label="接送地址">
                  <template slot-scope="scope">
                    <span>{{ scope.row.deliveryAddress}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center"  label="接送教练">
                  <template slot-scope="scope">
                    <span>{{ scope.row.name}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center"  label="接送时间">
                  <template slot-scope="scope">
                    <span>{{ scope.row.shuttleTime | subTime}} {{ scope.row.relayTime}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center"  label="接送状态">
                  <template slot-scope="scope">
                    <el-tag v-show="scope.row.state === '0'" type="info" style="color: #fff;" color="#E6A23C">未接送</el-tag>
                    <el-tag v-show="scope.row.state === '1'" type="info" style="color: #fff;" color="#67C23A">已接送</el-tag>
                    <el-tag v-show="scope.row.state === '2'" type="info" style="color: #fff;" color="#F56C6C">已取消</el-tag>
                  </template>
                </el-table-column>
                <el-table-column align="center"  label="未接送原因">
                  <template slot-scope="scope">
                    <span>{{ scope.row.undeliveredReason}}</span>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
          </el-tabs>
        </el-col>

        <el-col style="width: 550px"  :style="{height: ($store.state.app.client.height-110) + 'px'}" >
          <el-form :model="student" :rules="studentRules" ref="student" label-position="left" label-width="90px">
            <el-card :style="{height: ($store.state.app.client.height-160) + 'px'}" body-style="padding: 0;"
                     v-loading="infoLoading" element-loading-text="୧(๑•̀⌄•́๑)૭努力匹配中..."
                     shadow="never" style="border-radius:0 4px 0 0;line-height: 50px;overflow-y: auto;">
              <!-- 基本信息 -->
              <el-row>
                <el-row class="title">基本信息</el-row>
                <el-row style="padding: 0 10px;margin-top: 10px">
                  <el-col :span="12">
                    <!-- 档案号 -->
                    <el-row>
                      <el-form-item prop="archivesNumber">
                        <span slot="label" class="text_css">档案号:</span>
                        <el-input v-if="edit" style="width: 100%;" class="filter-item" placeholder="档案号" v-model="student.archivesNumber"></el-input>
                        <div style="padding-left: 16px;font-size: 12px;" v-else>{{student.archivesNumber}}</div>
                      </el-form-item>

                    </el-row>

                    <!-- 姓名 -->
                    <el-row>
                      <el-form-item prop="name">
                        <span slot="label" class="text_css">姓名:</span>
                        <el-input v-if="edit" style="width: 100%;" class="filter-item" placeholder="姓名" v-model="student.name"></el-input>
                        <div style="padding-left: 16px;font-size: 12px;" v-else>{{student.name}}</div>
                      </el-form-item>
                    </el-row>

                    <!-- 身份证号 -->
                    <el-row>
                      <el-form-item prop="idNumber">
                        <span slot="label" class="text_css">身份证号:</span>
                        <el-input v-if="edit" style="width: 100%;" class="filter-item" placeholder="身份证号" :maxlength="18"  @keyup.enter.native="generateInfo"  @blur="generateInfo" v-model="student.idNumber"></el-input>
                        <div style="padding-left: 16px;font-size: 12px;" v-else>{{student.idNumber}}</div>
                      </el-form-item>

                    </el-row>

                    <!-- 性别 -->
                    <el-row>
                      <el-form-item prop="sex">
                        <span slot="label" class="text_css">性别:</span>
                        <template v-if="edit">
                          <el-radio v-model="student.sex" label="1">男</el-radio>
                          <el-radio v-model="student.sex" label="0">女</el-radio>
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

                  </el-col>
                  <el-col :span="12">
                    <el-row>
                      <el-form-item prop="avatar">
                        <el-upload :disabled="!edit"  class="avatar-uploader" action="/oss/upload" name="file" :show-file-list="false" :headers="headers"
                                   :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                          <img :src="student.avatar" class="avatar">
                        </el-upload>

                        <!--<el-upload v-if="edit" style="width: 140px; margin: 5px auto 0" class="avatar-uploader" action="/oss/oss/upload/" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">-->
                          <!--<img v-if="student.avatar" :src="student.avatar" class="avatar">-->
                          <!--<i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
                        <!--</el-upload>-->
                        <!--<img v-else :src="student.avatar" class="avatar_img">-->
                      </el-form-item>
                    </el-row>
                  </el-col>
                </el-row>
              </el-row>


              <!-- 入学信息 -->
              <el-row>
                <el-row class="title">入学信息</el-row>
                <el-row style="padding: 0 10px;margin-top: 10px">
                  <el-row :gutter="10">
                    <el-col :span="12">
                      <!-- 入学日期 -->
                      <el-row>
                        <el-form-item prop="enrolTime">
                          <span slot="label" class="text_css">入学日期:</span>
                          <el-date-picker value-format="timestamp"  v-if="edit" type="date" placeholder="入学日期"  style="width: 100%" v-model="student.enrolTime"></el-date-picker>
                          <div style="padding-left: 16px;font-size: 12px;" v-else>{{student.enrolTime | subTime}}</div>
                        </el-form-item>
                      </el-row>
                    </el-col>
                    <el-col :span="12">
                      <!-- 校区 -->
                      <el-row>
                        <el-form-item prop="campus">
                          <span slot="label" class="text_css">校区:</span>
                          <dict v-if="edit" dictType="dict_campus" v-model="student.campus" style="width: 100%;"  placeholder="校区"></dict>
                          <div style="padding-left: 16px;font-size: 12px;" v-else>{{student.campus}}</div>
                        </el-form-item>
                      </el-row>
                    </el-col>
                  </el-row>
                  <el-row :gutter="10">
                    <el-col :span="12">
                      <!-- 入学期数 -->
                      <el-row>
                        <el-form-item prop="periods">
                          <span slot="label" class="text_css">入学期数:</span>
                          <el-input v-if="edit" style="width: 100%;" class="filter-item" placeholder="入学期数" v-model="student.periods"></el-input>
                          <div style="padding-left: 16px;font-size: 12px;" v-else>{{student.periods}}</div>
                        </el-form-item>
                      </el-row>
                    </el-col>
                    <el-col :span="12">
                      <!-- 来源渠道 -->
                      <el-row>
                        <el-form-item prop="source">
                          <span slot="label" class="text_css">来源渠道:</span>
                          <dict v-if="edit" dictType="dict_source" v-model="student.source" style="width: 100%;"  placeholder="来源渠道"></dict>
                          <div style="padding-left: 16px;font-size: 12px;" v-else>{{student.source}}</div>
                        </el-form-item>
                      </el-row>
                    </el-col>
                  </el-row>
                  <el-row :gutter="10">
                    <el-col :span="12">

                      <!-- 所学车型 -->
                      <el-row>
                        <el-form-item prop="motorcycleType">
                          <span slot="label" class="text_css">所学车型:</span>
                          <dict v-if="edit" v-model="student.motorcycleType" dictType="dict_motorcycle_type" style="width: 100%;"  placeholder="所学车型"></dict>
                          <div style="padding-left: 16px;font-size: 12px;" v-else>{{student.motorcycleType}}</div>
                        </el-form-item>
                      </el-row>
                    </el-col>
                    <el-col :span="12">
                      <!-- 报名点 -->
                      <el-row>
                        <el-form-item prop="enrolSite">
                          <span slot="label" class="text_css">报名点:</span>
                          <dict v-if="edit" v-model="student.enrolSite" dictType="dict_enrolSite" style="width: 100%;"  placeholder="报名点"></dict>
                          <div style="padding-left: 16px;font-size: 12px;" v-else>{{student.enrolSite}}</div>
                        </el-form-item>
                      </el-row>
                    </el-col>
                  </el-row>
                  <el-row :gutter="10">
                    <el-col :span="12">
                      <!-- 场训教练 -->
                      <el-row >

                        <el-form-item prop="fieldName">
                          <span slot="label" class="text_css">场训教练:</span>
                          <Coach  v-show="edit" v-model="student.fieldCoach" coachType="field" style="width: 100%;"  placeholder="场训教练" @selectCoach="getFieldCoach" ></Coach>
                          <div style="padding-left: 16px;font-size: 12px;" v-show="!edit" >{{student.fieldName === null?'未安排':student.fieldName}}</div>
                        </el-form-item>
                      </el-row>
                    </el-col>
                    <el-col :span="12">
                      <!-- 路训教练 -->
                      <el-row>
                        <el-form-item prop="roadName">
                          <span slot="label" class="text_css">路训教练:</span>
                          <Coach  v-show="edit" v-model="student.roadCoach" coachType="road" style="width: 100%;"  placeholder="路训教练"  @selectCoach="getRoadCoach"></Coach>
                          <div style="padding-left: 16px;font-size: 12px;" v-show="!edit" >{{student.roadName === null?'未安排':student.roadName}}</div>
                        </el-form-item>
                      </el-row>

                    </el-col>
                  </el-row>
                  <el-row :gutter="10">
                    <el-col>
                      <!-- 介绍人 -->
                      <el-row>

                        <el-form-item prop="introducerNameList">
                          <span slot="label"  class="text_css">介绍人:</span>
                          <el-select v-show="edit" v-model="student.introducerIdList" collapse-tags style="width: 100%" multiple placeholder="请选择介绍人">
                            <el-option v-for="user in userList" :key="user.userId" :label="user.name" :value="user.userId">
                            </el-option>
                          </el-select>
                          <span v-for="(introducerName,index) in student.introducerNameList"  v-show="!edit" >{{introducerName}}<span v-if="student.introducerNameList.length !== (index+1)">、</span></span>
                        </el-form-item>
                      </el-row>
                    </el-col>
                  </el-row>
                </el-row>
              </el-row>


              <!-- 联系信息 -->
              <el-row>
                <el-row class="title">联系信息:</el-row>
                <el-row style="padding: 0 10px;margin-top: 10px">
                  <el-row :gutter="10">
                    <el-col :span="12">
                      <!-- 联系电话 -->
                      <el-row>
                        <el-form-item prop="mobile">
                          <span slot="label" class="text_css">联系电话:</span>
                          <el-input v-if="edit" style="width: 100%;" class="filter-item" placeholder="联系电话" :maxlength="11" v-model.number="student.mobile"></el-input>
                          <div style="padding-left: 16px;font-size: 12px;" v-else>{{student.mobile}}</div>
                        </el-form-item>
                      </el-row>
                    </el-col>
                    <el-col :span="12">
                      <!-- 微信 -->
                      <el-row>
                        <el-form-item prop="wechat">
                          <span slot="label" class="text_css">微信:</span>
                          <el-input v-if="edit" style="width: 100%;" class="filter-item" placeholder="微信" v-model="student.wechat"></el-input>
                          <div style="padding-left: 16px;font-size: 12px;" v-else>{{student.wechat}}</div>
                        </el-form-item>
                      </el-row>
                    </el-col>
                  </el-row>
                </el-row>

                <el-row style="padding: 0 10px;margin-top: 10px">
                  <el-row :gutter="10">
                    <el-col :span="12">
                      <!-- 电子邮箱 -->
                      <el-row>
                        <el-form-item prop="email">
                          <span slot="label" class="text_css">电子邮箱:</span>
                          <el-input v-if="edit" style="width: 100%;" class="filter-item" placeholder="电子邮箱" v-model="student.email"></el-input>
                          <div style="padding-left: 16px;font-size: 12px;" v-else>{{student.email}}</div>
                        </el-form-item>
                      </el-row>
                    </el-col>
                    <el-col :span="12">
                      <!-- 所属职位 -->
                      <el-row>
                        <el-form-item prop="position">
                          <span slot="label" class="text_css">所属职位:</span>
                          <el-input v-if="edit" style="width: 100%;" class="filter-item" placeholder="所属职位" v-model="student.position"></el-input>
                          <div style="padding-left: 16px;font-size: 12px;" v-else>{{student.position}}</div>
                        </el-form-item>
                      </el-row>
                    </el-col>
                  </el-row>
                </el-row>


                <el-row style="padding: 0 10px;margin-top: 10px">
                  <el-row :gutter="10">
                    <el-col :span="12">
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
                    </el-col>
                    <el-col :span="12">
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
                    </el-col>
                  </el-row>
                </el-row>

                <el-row style="padding: 0 10px;margin-top: 10px">
                  <el-row :gutter="10">
                    <el-col :span="12">
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
                    </el-col>
                  </el-row>
                </el-row>

                <!-- 所属单位 -->
                <el-row style="margin: 0 10px">
                  <el-form-item prop="company">
                    <span slot="label" class="text_css">所属单位:</span>
                    <el-input v-if="edit" style="width: 100%;" class="filter-item" placeholder="所属单位" v-model="student.company"></el-input>
                    <div style="padding-left: 16px;font-size: 12px;" v-else>{{student.company}}</div>
                  </el-form-item>
                </el-row>


                <!-- 联系地址 -->
                <el-row style="margin: 0 10px">
                  <el-form-item prop="contactAddress">
                    <span slot="label" class="text_css">联系地址:</span>
                    <el-input v-if="edit" style="width: 100%;" class="filter-item" placeholder="联系地址" v-model="student.contactAddress"></el-input>
                    <div style="padding-left: 16px;font-size: 12px;" v-else>{{student.contactAddress}}</div>
                  </el-form-item>
                </el-row>

              </el-row>





            </el-card>
            <el-card body-style="padding: 10px 20px;"  shadow="never" style="height:50px; border-radius:0 0 4px 0;">
              <div v-if="edit" style="float: right;">
                <el-button type="info" size="mini" @click="cancel('student')"><i class="el-icon-fa-undo"></i> 取 消</el-button>
                <el-button type="success" size="mini" :loading="btnLoading" @click="update('student')"><i class="el-icon-fa-save"></i> 保 存</el-button>
              </div>
              <div v-else style="float: right;">
                <el-button type="primary" size="mini" @click="handleBespeakCar"><i class="el-icon-fa-car"></i> 约 车</el-button>
                <el-button type="primary" size="mini" @click="handleBespeakExam"><i class="el-icon-edit"></i> 约 考</el-button>
                <el-button type="primary" size="mini" @click="editInfo"><i class="el-icon-edit"></i> 编 辑</el-button>
              </div>

            </el-card>
          </el-form>
        </el-col>
      </el-row>
    </el-card>


    <div v-show="showModule=='create'"  v-loading="createLoading" element-loading-text="୧(๑•̀⌄•́๑)૭努力加载中...">
      <el-card body-style="padding:5px 20px;" style="margin-bottom: 5px;height: 60px;line-height: 50px">
        录入详细信息
        <div style="float: right"><el-button type="primary" @click="backClick">返  回</el-button></div>
      </el-card>
      <el-row :gutter="5">
        <el-col :span="12">
          <el-card :style="{height: ($store.state.app.client.height - 110) + 'px'}" style="overflow: auto;line-height: 50px">
            <el-form :model="studentEntity" :rules="studentEntityRules" ref="studentEntity" label-width="120px">
              <el-row>
                <el-row :gutter="20">
                  <el-col :span="12" >

                    <!-- 联系电话 -->
                    <el-row >
                      <el-form-item prop="mobile">
                        <span slot="label" class="text_css">联系电话</span>
                        <el-input style="width: 100%;" class="filter-item" @keyup.enter.native="matchingStudents" @blur="matchingStudents" placeholder="联系电话" :maxlength="11"  v-model.number="studentEntity.mobile"></el-input>
                      </el-form-item>

                    </el-row>

                    <!-- 身份证号 -->
                    <el-row >
                      <el-form-item prop="idNumber">
                        <span slot="label" class="text_css">身份证号</span>
                        <el-input style="width: 100%;" class="filter-item" placeholder="身份证号" :maxlength="18" @keyup.enter.native="AddGenerateInfo" @blur="AddGenerateInfo" v-model="studentEntity.idNumber"></el-input>
                      </el-form-item>
                    </el-row>

                    <!-- 档案号 -->
                    <el-row >
                      <el-form-item prop="archivesNumber">
                        <span slot="label" class="text_css">档案号</span>
                        <el-input style="width: 100%;" class="filter-item" placeholder="档案号" v-model="studentEntity.archivesNumber"></el-input>
                      </el-form-item>
                    </el-row>

                    <!-- 姓名 -->
                    <el-row >

                      <el-form-item prop="name">
                        <span slot="label" class="text_css">姓名</span>
                        <el-input style="width: 100%;" class="filter-item" placeholder="姓名" clearable v-model="studentEntity.name"></el-input>
                      </el-form-item>

                    </el-row>


                    <!-- 微信 -->
                    <el-row >
                      <el-form-item prop="wechat">
                        <span slot="label"  class="text_css">微信</span>
                        <el-input style="width: 100%;" class="filter-item" placeholder="微信" v-model="studentEntity.wechat"></el-input>
                      </el-form-item>
                    </el-row>


                    <!-- 校区 -->
                    <el-row >
                      <el-form-item prop="campus">
                        <span slot="label"  class="text_css">校区</span>
                        <dict v-model="studentEntity.campus" dictType="dict_campus" style="width: 100%;"  placeholder="校区"></dict>
                      </el-form-item>
                    </el-row>

                    <!-- 联系地址 -->
                    <el-row >
                      <el-form-item prop="contactAddress">
                        <span slot="label"  class="text_css">联系地址</span>
                        <el-input style="width: 100%;" class="filter-item" placeholder="联系地址" v-model="studentEntity.contactAddress"></el-input>
                      </el-form-item>
                    </el-row>


                    <!-- 入学期数 -->
                    <el-row >
                      <el-form-item prop="periods">
                        <span slot="label"  class="text_css">入学期数</span>
                        <el-input style="width: 100%;" class="filter-item" placeholder="入学期数" v-model="studentEntity.periods"></el-input>
                      </el-form-item>
                    </el-row>




                    <!-- 生日 -->
                    <el-row >
                      <el-form-item prop="birthday">
                        <span slot="label" class="text_css">生日</span>
                        <el-date-picker value-format="timestamp"  type="date" placeholder="生日"  style="width: 100%" v-model="studentEntity.birthday"></el-date-picker>
                      </el-form-item>
                    </el-row>

                    <!-- 所学车型 -->
                    <el-row >
                      <el-form-item prop="motorcycleType">
                        <span slot="label"  class="text_css">所学车型</span>
                        <dict v-model="studentEntity.motorcycleType" dictType="dict_motorcycle_type" style="width: 100%;"  placeholder="所学车型"></dict>
                      </el-form-item>
                    </el-row>

                    <!-- 来源渠道 -->
                    <el-row >
                      <el-form-item prop="source">
                        <span slot="label" class="text_css">来源渠道</span>
                        <dict v-model="studentEntity.source" dictType="dict_source" style="width: 100%;"  placeholder="来源渠道"></dict>
                      </el-form-item>
                    </el-row>


                    <!-- 入学日期 -->
                    <el-row >
                      <el-form-item prop="enrolTime">
                        <span slot="label"  class="text_css">入学日期</span>
                        <el-date-picker value-format="timestamp" type="date" placeholder="入学日期" style="width: 100%" v-model="studentEntity.enrolTime"></el-date-picker>
                      </el-form-item>
                    </el-row>

                  </el-col>

                  <el-col :span="12">

                    <el-row>
                      <el-col :span="6"> &nbsp;</el-col>
                      <el-col  :span="18">
                        <div style="height: 150px;width: 100px;margin: 0 auto">
                          <el-upload :disabled="!edit"  class="AddAvatar-uploader" action="/oss/upload" name="file" :show-file-list="false" :headers="headers"
                                     :on-success="AddHandleAvatarSuccess" :before-upload="beforeAvatarUpload">
                            <img :src="studentEntity.avatar" class="AddAvatar">
                          </el-upload>
                          <!--<el-upload class="AddAvatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="AddHandleAvatarSuccess" :before-upload="beforeAvatarUpload">-->
                            <!--<img v-if="studentEntity.avatar" :src="studentEntity.avatar" class="AddAvatar">-->
                            <!--<i v-else class="el-icon-plus AddAvatar-uploader-icon"></i>-->
                          <!--</el-upload>-->
                        </div>
                      </el-col>
                    </el-row>


                    <!-- 性别 -->
                    <el-row >
                      <el-form-item prop="sex">
                        <span slot="label" class="text_css">性别</span>
                        <el-radio-group v-model="studentEntity.sex">
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
                          <el-radio label="0">否</el-radio>
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
                        <el-select v-model="studentEntity.introducerList" collapse-tags style="width: 100%" multiple placeholder="请选择介绍人">
                          <el-option v-for="user in userList" :key="user.userId" :label="user.name" :value="user.userId">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-row>


                  </el-col>

                </el-row>

              </el-row>
              <el-row>
                <el-col>
                  <div style="width: 200px;margin: 0 auto">
                    <el-button style="float: left" type="primary" :loading="btnLoading" @click="add('studentEntity')">建 档</el-button>
                    <el-button style="float: right" plain @click="reset('studentEntity')">重  置</el-button>
                  </div>
                </el-col>
              </el-row>

            </el-form>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card :style="{height: ($store.state.app.client.height - 110) + 'px'}" style="overflow: auto">









          </el-card>
        </el-col>
      </el-row>
    </div>

    <el-dialog @close="closeBespeak" title="选择批次" width="40%" :visible.sync="dialogFormBespeak">
      <div :style="{height: ($store.state.app.client.height)/3 +'px'}" style="overflow: auto">
        <div v-if="batchList.length === 0" style="width: 100%;text-align: center;font-size: 18px;color: #99a9bf;font-weight: 100;">
          无可预约场次
        </div>
        <div v-else v-for="batch in batchList"  style="float: left;margin: 5px">
          <div class="batchCss" @click="batchClick($event,batch)" style="float: left;">
            <{{batch.examTime | subTime}}> {{batch.examField}}
            <span>【{{batch.hasReserved}}/{{batch.stuCount}}】</span>
          </div>

        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeBespeak"><i class="el-icon-fa-undo"></i> 取 消</el-button>
        <el-button :loading="btnLoading" type="primary" @click="createBespeak">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import { fetchList, getObj, addObj, putObj } from '@/api/student/student'
  import { userList } from '@/api/upms/user'
  import { autoProduce } from '@/utils/index'
  import { examFetchList } from '@/api/student/examnote'
  import { getVehiclePeriodByStudentId } from '@/api/bespeak/vehicleperiod'
  import { getShuttleLogByStudentId } from '@/api/bespeak/shuttlestudent'
  import { getIntentionByMobile } from '@/api/visit/intention'
  import Coach from '@/components/Coach'
  import { removeAllSpace } from '@/utils/validate'
  import { mapGetters } from 'vuex'
  import { getBatchList } from '@/api/student/batch'
  import { batchSave } from '@/api/student/exambespeak'
  import { getToken } from '@/utils/auth'

  export default {
    name: 'table_student',
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
      var introducerListReg = (rule, value, callback) => {
        if (value.length > 0) {
          callback()
        } else {
          callback(new Error('请选择介绍人'))
        }
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
          physicalExamination: null,
          haveCar: null,
          addDrive: null,
          state: null,
          graduationTime: null,
          periodOfValidity: null,
          aboardTime: null,
          roadCoach: null,
          fieldCoach: null,
          incrementList: [],
          introducerList: [],
          serviceType: null,
          arrearage: null,
          enrolSite: null,
          source: null,
          motorcycleType: null,
          delFlag: null,
          remark: null,
          operator: null,
          createTime: null,
          updateTime: null
        },
        studentEntity: {
          studentId: null,
          intentionId: null,
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
          physicalExamination: null,
          haveCar: null,
          addDrive: null,
          state: null,
          graduationTime: null,
          periodOfValidity: null,
          aboardTime: null,
          roadCoach: null,
          fieldCoach: null,
          incrementList: [],
          introducerList: [],
          serviceType: null,
          arrearage: null,
          enrolSite: null,
          source: null,
          motorcycleType: null,
          delFlag: null,
          remark: null,
          operator: null,
          createTime: null,
          updateTime: null
        },
        studentEntityRules: {
          mobile: [
            { required: true, message: '请输入手机号', trigger: ['blur', 'change'] },
            { pattern: /^1[2345789]\d{9}$/, message: '目前只支持中国大陆的手机号码', trigger: ['blur', 'change'] }
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
          wechat: [
            { required: true, message: '请输入微信', trigger: ['blur', 'change'] }
          ],
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
          introducerList: [
            { required: true, message: '请选择介绍人', trigger: ['blur', 'change'] },
            { validator: introducerListReg, trigger: ['blur', 'change'] }
          ]
        },
        studentRules: {
          mobile: [
            { required: true, message: '请输入手机号', trigger: ['blur', 'change'] },
            { pattern: /^1[2345789]\d{9}$/, message: '目前只支持中国大陆的手机号码', trigger: ['blur', 'change'] }
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
          wechat: [
            { required: true, message: '请输入微信', trigger: ['blur', 'change'] }
          ],
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
            { required: true, message: '请输入邮箱', trigger: ['blur', 'change'] },
            { pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, message: '请输入正确的邮箱', trigger: ['blur', 'change'] }
          ],
          company: [],
          position: [],
          enrolSite: [
            { required: true, message: '请选择报名点', trigger: ['blur', 'change'] }
          ],
          introducerList: [
            { required: true, message: '请选择介绍人', trigger: ['blur', 'change'] },
            { validator: introducerListReg, trigger: ['blur', 'change'] }
          ]
        },
        stuList: [],
        examNoteList: [],
        vehiclePeriodList: [],
        shuttleLogList: [],
        total: 1,
        listLoading: true,
        btnLoading: false,
        showModule: 'list',
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
        batchList: [],
        examBespeak: {
          studentId: null,
          state: 0,
          examId: null,
          subject: null
        },
        batchListQuery: {
          page: 1,
          limit: 0,
          /* 今天以前传 before   今天之后传 after */
          scope: 'after',
          subject: null
        },
        /* 添加加载动画 */
        createLoading: true,
        infoLoading: true,
        userList: []
      }
    },
    created() {
      this.getList()
    },
    computed: {
      ...mapGetters([
        'permissions',
        'client'
      ]),
      sexVO() {
        const typeMap = {
          1: '男',
          0: '女'
        }
        return typeMap[this.student.sex]
      },
      headers() {
        return {
          'Authorization': 'Bearer ' + getToken()
        }
      }
    },
    methods: {
      // 根据部门id查询学员信息
      searchByOrg(data) {
        console.log('=====================   根据部门id查询学员信息   =======================')
        this.listQuery.page = 1
        this.getList()
      },
      // 双击行  编辑
      editList(val) {
        console.log('====================== 进入单个学员编辑 =====================')
        this.infoLoading = true
        getObj(val.studentId).then(response => {
          console.log(response.data.data)
          this.student = response.data.data
          this.examBespeak.studentId = this.student.studentId
          if (this.student.introducerIdList === null) this.student.introducerIdList = [] // 防止介绍人为null
          this.getIntroducerList()
          this.infoLoading = false
        })
        examFetchList({ studentId: val.studentId, examState: 'exam_note_true' }).then(response => {
          console.log('====================== 考试日志 =====================')
          console.log(response.data)
          this.examNoteList = response.data.data.list
        })
        getVehiclePeriodByStudentId(val.studentId).then(response => {
          console.log('====================== 约车日志 =====================')
          console.log(response.data)
          this.vehiclePeriodList = response.data.list
        })
        getShuttleLogByStudentId(val.studentId).then(response => {
          console.log('====================== 接送日志 =====================')
          console.log(response.data)
          this.shuttleLogList = response.data.list
        })
        this.showModule = 'info'
      },
      // 获取所有学员
      getList() {
        this.listLoading = true
        fetchList(this.listQuery).then(response => {
          console.log(' ====== =============  这是所有学员信息  ==================')
          console.log(response.data)
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
            console.log('======================= 添加的数据 ======')
            console.log(this.studentEntity)
            this.btnLoading = true
            addObj(this.studentEntity).then(response => {
              this.backClick()
              this.btnLoading = false
            })
          }
        })
      },
      // 新增
      create() {
        this.studentEntity = {
          studentId: null,
          intentionId: null,
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
          physicalExamination: null,
          haveCar: null,
          addDrive: null,
          state: null,
          graduationTime: null,
          periodOfValidity: null,
          aboardTime: null,
          roadCoach: null,
          fieldCoach: null,
          incrementList: [],
          introducerList: [],
          serviceType: null,
          arrearage: null,
          enrolSite: null,
          source: null,
          motorcycleType: null,
          delFlag: null,
          remark: null,
          operator: null,
          createTime: null,
          updateTime: null
        }
        this.showModule = 'create'
        this.edit = true
        this.getIntroducerList()
      },
      /* 获取介绍人列表 */
      getIntroducerList() {
        userList().then(response => {
          console.log(response.data.data)
          this.userList = response.data.data
        })
      },
      // 修改
      update(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.btnLoading = true
            console.log('=========== 修改之后的值 =========')
            console.log(this.student)
            putObj(this.student).then(() => {
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
        this.$refs['student'].resetFields()
        this.getList()
      },
      // 搜索
      searchClick() {
        this.listQuery.page = 1
        console.log('============== 搜索方法 ===============')
        this.examTimeBlur()
        this.listQuery.condition = removeAllSpace(this.listQuery.condition)
        console.log(this.listQuery)
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
      beforeAvatarUpload(file) {
        const type = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif']
        const isLt2M = file.size / 1024 / 1024 < 2
        const isImages = file.type && type.indexOf(file.type) > -1

        if (!isImages) {
          this.$message.error('只支持jpg、png、gif格式的图片！')
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
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
      reset(formName) {
        this.$refs[formName].resetFields()
        console.log(this.studentEntity)
      },
      getFieldCoach(coach) {
        console.log('============ 教练 =============')
        console.log(coach)
        this.student.fieldCoachName = coach.name
      },
      getRoadCoach(coach) {
        console.log('============ 教练 =============')
        console.log(coach)
        this.student.roadCoachName = coach.name
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
        console.log('=============  完成 ================')
      },
      handleBespeakExam() {
        console.log(this.student.state)
        this.examBespeak.subject = this.student.state
        this.batchListQuery.subject = this.student.state
        getBatchList(this.batchListQuery).then(response => {
          console.log(' ===================  这是所有批次信息  ==================')
          console.log(response.data.data)
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
      closeBespeak() {
        this.editList(this.student)
        this.examBespeak.examId = null
        this.dialogFormBespeak = false
      },
      batchClick(e, batch) {
        this.examBespeak.examId = batch.examId
        var a = document.getElementsByClassName('batchCss')
        for (var i = 0; i < a.length; i++) {
          a[i].classList.remove('batchCss_selected')
        }
        e.currentTarget.classList.add('batchCss_selected')
      },
      createBespeak() {
        console.log('================== 这里是添加学员到批次 ====================')
        console.log(this.examBespeak)
        if (this.examBespeak.examId === null) {
          this.$alert('请先选择报考批次', '提示', {
            confirmButtonText: '确定',
            type: 'warning'
          })
        } else {
          this.btnLoading = true
          batchSave(this.examBespeak).then(() => {
            this.dialogFormBespeak = false
            this.btnLoading = false
            this.examBespeak.examId = null
          })
        }
      },
      matchingStudents() {
        this.createLoading = true
        getIntentionByMobile(this.studentEntity.mobile).then(response => {
          console.log('======== 匹配到的值 =========')
          console.log(response.data)
          var flag = true
          if (response.data.data) {
            this.studentEntity.intentionId = response.data.data.intentionId
            if (!this.studentEntity.name) this.studentEntity.name = response.data.data.name
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
            console.log(this.studentEntity.introducerList)
            if (!this.studentEntity.motorcycleType) this.studentEntity.motorcycleType = response.data.data.applyType
          }
          this.createLoading = false
        })
      },
      handleBespeakCar() {}
    }
  }
</script>

<style>

  .img{
    width: 50px;
    height: 50px;
    padding: 0;
    border-radius: 150px;
    overflow: hidden;
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
  }
  .text_css{
    color:#495060;
    font-size: 16px;
    word-break:keep-all;/* 不换行 */
    white-space:nowrap;/* 不换行 */
    overflow:hidden;/* 内容超出宽度时隐藏超出部分的内容 */
    text-overflow:ellipsis;/* 当对象内文本溢出时显示省略标记(...) ；需与overflow:hidden;一起使用。*/
  }
  .table_text{
    color: #7c7c7c;font-size: 14px;text-align: left;
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
    width: 140px;
    height: 180px;
    display: block;
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
</style>
