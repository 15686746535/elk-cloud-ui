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
              <el-date-picker value-format="timestamp"  :style="{width: ($store.state.app.client.width/7)*1.5 + 'px'}" v-model="listQuery.interval" type="daterange" align="right" unlink-panels range-separator="—" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions">
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
                        <el-col :span="7" class="table_text">身份证：</el-col>
                        <el-col :span="17" class="table_text">{{scope.row.idNumber}}</el-col>
                      </el-row>
                      <el-row :gutter="10">
                        <el-col :span="7" class="table_text">性别：</el-col>
                        <el-col :span="17" class="table_text">{{scope.row.sex | sexFilter}}</el-col>
                      </el-row>
                      <el-row :gutter="10">
                        <el-col :span="7" class="table_text">状态：</el-col>
                        <el-col :span="17" class="table_text">{{scope.row.state | subjectFilter}}</el-col>
                      </el-row>

                      <el-row :gutter="10">
                        <el-col :span="7" class="table_text">介绍人：</el-col>
                        <el-col :span="17" class="table_text"><span v-for="introducer in scope.row.introducerList">{{introducer}}、</span></el-col>
                      </el-row>
                    </el-col>
                  </template>
                </el-table-column>

                <el-table-column align="center" label="入学信息" min-width="230px">
                  <template slot-scope="scope">
                    <el-col style=" line-height: 25px">
                      <el-row :gutter="10">
                        <el-col :span="7" class="table_text">档案号：</el-col>
                        <el-col :span="17" class="table_text">{{scope.row.archivesNumber}}</el-col>
                      </el-row>
                      <el-row :gutter="10">
                        <el-col :span="7" class="table_text">入学日期：</el-col>
                        <el-col :span="17" class="table_text">{{scope.row.enrolTime | subTime}}</el-col>
                      </el-row>
                      <el-row :gutter="10">
                        <el-col :span="7" class="table_text">期数：</el-col>
                        <el-col :span="17" class="table_text">{{scope.row.periods}}</el-col>
                      </el-row>
                      <el-row :gutter="10">
                        <el-col :span="7" class="table_text">车型：</el-col>
                        <el-col :span="17" class="table_text">{{scope.row.motorcycleType}}</el-col>
                      </el-row>
                    </el-col>
                  </template>
                </el-table-column>

                <el-table-column align="center" label="培训信息" min-width="230px">
                  <template slot-scope="scope">

                    <el-col style=" line-height: 25px">
                      <el-row :gutter="10">
                        <el-col :span="7" class="table_text">校区：</el-col>
                        <el-col :span="17" class="table_text">{{scope.row.campus}}</el-col>
                      </el-row>
                      <el-row :gutter="10">
                        <el-col :span="7" class="table_text">来源渠道：</el-col>
                        <el-col :span="17" class="table_text">{{scope.row.source}}</el-col>
                      </el-row>

                      <el-row :gutter="10">
                        <el-col :span="7" class="table_text">场训教练：</el-col>
                        <el-col :span="17" class="table_text">{{scope.row.fieldName}}</el-col>
                      </el-row>

                      <el-row :gutter="10">
                        <el-col :span="7" class="table_text">路训教练：</el-col>
                        <el-col :span="17" class="table_text">{{scope.row.roadName}}</el-col>
                      </el-row>
                    </el-col>
                  </template>
                </el-table-column>

                <el-table-column align="center" label="费用信息" min-width="230px">
                  <template slot-scope="scope">
                    <el-col style=" line-height: 25px">
                      <el-row :gutter="10">
                        <el-col :span="7" class="table_text">服务类别：</el-col>
                        <el-col :span="17" class="table_text">{{scope.row.roadName}}</el-col>
                      </el-row>

                      <el-row :gutter="10">
                        <el-col :span="7" class="table_text">增值服务：</el-col>
                        <el-col :span="17" class="table_text"><span v-for="increment in scope.row.incrementList">{{increment}}、</span></el-col>
                      </el-row>

                      <el-row :gutter="10">
                        <el-col :span="7" class="table_text">应收金额：</el-col>
                        <el-col :span="17" class="table_text">{{scope.row.receivable}}</el-col>
                      </el-row>

                      <el-row :gutter="10">
                        <el-col :span="7" class="table_text">欠费金额：</el-col>
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

    <div v-show="showModule=='info'" style="height: 100%">
      <el-card body-style="padding:5px 20px;" style="margin-bottom: 5px;height: 60px;line-height: 50px">
        录入详细信息
        <div style="float: right"><el-button type="primary" @click="backClick">返  回</el-button></div>
      </el-card>
      <el-row :style="{height: ($store.state.app.client.height-105) + 'px'}">
        <el-col :style="{height: ($store.state.app.client.height-105) + 'px',width: ($store.state.app.client.width-570) + 'px'}">
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
        <el-col style="width: 570px"  :style="{height: ($store.state.app.client.height-105) + 'px'}" >
          <el-form :model="student" label-position="left" label-width="80px">
            <el-card :style="{height: ($store.state.app.client.height-165) + 'px'}" body-style="padding: 0;" style="border-bottom: none; border-radius:0 4px 0 0;z-index: 50;line-height: 50px;overflow-y: auto;box-shadow: none;">
              <!-- 基本信息 -->
              <el-row>
                <el-row class="title">基本信息</el-row>
                <el-row style="padding: 0 10px;margin-top: 10px">
                  <el-col :span="12">
                    <!-- 档案号 -->
                    <el-row style="height: 50px;">
                      <el-form-item>
                        <span slot="label" class="text_css">档案号：</span>
                        <el-input v-if="edit" style="width: 100%;" class="filter-item" placeholder="档案号" v-model="student.archivesNumber"></el-input>
                        <div style="padding-left: 16px;font-size: 12px;" v-else>{{student.archivesNumber}}</div>
                      </el-form-item>

                    </el-row>

                    <!-- 姓名 -->
                    <el-row style="height: 50px;">
                      <el-form-item>
                        <span slot="label" class="text_css">姓名：</span>
                        <el-input v-if="edit" style="width: 100%;" class="filter-item" placeholder="姓名" v-model="student.name"></el-input>
                        <div style="padding-left: 16px;font-size: 12px;" v-else>{{student.name}}</div>
                      </el-form-item>
                    </el-row>

                    <!-- 身份证号 -->
                    <el-row style="height: 50px;">
                      <el-form-item>
                        <span slot="label" class="text_css">身份证号：</span>
                        <el-input v-if="edit" style="width: 100%;" class="filter-item" placeholder="身份证号" :maxlength="18"  @keyup.enter.native="generateInfo"  @blur="generateInfo" v-model="student.idNumber"></el-input>
                        <div style="padding-left: 16px;font-size: 12px;" v-else>{{student.idNumber}}</div>
                      </el-form-item>

                    </el-row>

                    <!-- 性别 -->
                    <el-row style="height: 50px;">
                      <el-form-item>
                        <span slot="label" class="text_css">性别：</span>
                        <template v-if="edit">
                          <el-radio v-model="student.sex" label="1">男</el-radio>
                          <el-radio v-model="student.sex" label="0">女</el-radio>
                        </template>
                        <div style="padding-left: 16px;font-size: 12px;" v-else>{{student.sex | sexFilter}}</div>
                      </el-form-item>

                    </el-row>

                    <!-- 生日 -->
                    <el-row style="height: 50px;">
                      <el-form-item>
                        <span slot="label" class="text_css">生日：</span>
                        <el-date-picker value-format="timestamp"  v-if="edit" type="date" placeholder="生日"  style="width: 100%" v-model="student.birthday"></el-date-picker>
                        <div style="padding-left: 16px;font-size: 12px;" v-else>{{student.birthday | subTime}}</div>
                      </el-form-item>
                    </el-row>

                  </el-col>
                  <el-col :span="12">
                    <el-row>
                      <el-form-item>
                        <el-upload v-if="edit" style="width: 140px; margin: 5px auto 0" class="avatar-uploader" action="/oss/oss/upload/" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                          <img v-if="student.avatar" :src="student.avatar" class="avatar">
                          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                        <img v-else :src="student.avatar" class="avatar_img">
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
                      <el-row style="height: 50px">
                        <el-form-item>
                          <span slot="label" class="text_css">入学日期：</span>
                          <el-date-picker value-format="timestamp"  v-if="edit" type="date" placeholder="入学日期"  style="width: 100%" v-model="student.enrolTime"></el-date-picker>
                          <div style="padding-left: 16px;font-size: 12px;" v-else>{{student.enrolTime | subTime}}</div>
                        </el-form-item>
                      </el-row>
                    </el-col>
                    <el-col :span="12">
                      <!-- 校区 -->
                      <el-row style="height: 50px;">
                        <el-form-item>
                          <span slot="label" class="text_css">校区：</span>
                          <dict v-if="edit" dictType="dict_campus" v-model="student.campus" style="width: 100%;"  placeholder="校区"></dict>
                          <div style="padding-left: 16px;font-size: 12px;" v-else>{{student.campus}}</div>
                        </el-form-item>
                      </el-row>
                    </el-col>
                  </el-row>
                  <el-row :gutter="10">
                    <el-col :span="12">
                      <!-- 入学期数 -->
                      <el-row style="height: 50px">
                        <el-form-item>
                          <span slot="label" class="text_css">入学期数：</span>
                          <el-input v-if="edit" style="width: 100%;" class="filter-item" placeholder="入学期数" v-model="student.periods"></el-input>
                          <div style="padding-left: 16px;font-size: 12px;" v-else>{{student.periods}}</div>
                        </el-form-item>
                      </el-row>
                    </el-col>
                    <el-col :span="12">
                      <!-- 来源渠道 -->
                      <el-row style="height: 50px;">
                        <el-form-item>
                          <span slot="label" class="text_css">来源渠道：</span>
                          <dict v-if="edit" dictType="dict_source" v-model="student.source" style="width: 100%;"  placeholder="来源渠道"></dict>
                          <div style="padding-left: 16px;font-size: 12px;" v-else>{{student.source}}</div>
                        </el-form-item>
                      </el-row>
                    </el-col>
                  </el-row>
                  <el-row :gutter="10">
                    <el-col :span="12">

                      <!-- 所学车型 -->
                      <el-row style="height: 50px">
                        <el-form-item>
                          <span slot="label" class="text_css">所学车型：</span>
                          <dict v-if="edit" v-model="student.motorcycleType" dictType="dict_motorcycle_type" style="width: 100%;"  placeholder="所学车型"></dict>
                          <div style="padding-left: 16px;font-size: 12px;" v-else>{{student.motorcycleType}}</div>
                        </el-form-item>
                      </el-row>
                    </el-col>
                    <el-col :span="12">
                      <!-- 报名点 -->
                      <el-row style="height: 50px">
                        <el-form-item>
                          <span slot="label" class="text_css">报名点：</span>
                          <dict v-if="edit" v-model="student.enrolSite" dictType="dict_enrolSite" style="width: 100%;"  placeholder="报名点"></dict>
                          <div style="padding-left: 16px;font-size: 12px;" v-else>{{student.enrolSite}}</div>
                        </el-form-item>
                      </el-row>
                    </el-col>
                  </el-row>
                  <el-row :gutter="10">
                    <el-col :span="12">
                      <!-- 场训教练 -->
                      <el-row style="height: 50px">

                        <el-form-item>
                          <span slot="label" class="text_css">场训教练：</span>
                          <Coach  v-show="edit" v-model="student.fieldCoach" coachType="field" style="width: 100%;"  placeholder="场训教练" @selectCoach="getFieldCoach" ></Coach>
                          <div style="padding-left: 16px;font-size: 12px;"  v-show="!edit" >{{student.fieldName}}</div>
                        </el-form-item>
                      </el-row>
                    </el-col>
                    <el-col :span="12">
                      <!-- 路训教练 -->
                      <el-row style="height: 50px">
                        <el-form-item>
                          <span slot="label" class="text_css">路训教练：</span>
                          <Coach  v-show="edit" v-model="student.roadCoach" coachType="road" style="width: 100%;"  placeholder="路训教练"  @selectCoach="getRoadCoach"></Coach>
                          <div style="padding-left: 16px;font-size: 12px;"  v-show="!edit" >{{student.roadName}}</div>
                        </el-form-item>
                      </el-row>

                    </el-col>
                  </el-row>
                  <el-row :gutter="10">
                    <el-col>
                      <!-- 介绍人 -->
                      <el-row style="height: 50px">

                        <el-form-item>
                          <span slot="label"  class="text_css">介绍人：</span>
                          <el-select v-show="edit" v-model="student.introducerIdList" collapse-tags style="width: 100%" multiple placeholder="请选择介绍人">
                            <el-option v-for="user in userList" :key="user.userId" :label="user.name" :value="user.userId">
                            </el-option>
                          </el-select>
                          <span v-for="introducerName in student.introducerNameList"  v-show="!edit" >{{introducerName}}、</span>
                        </el-form-item>
                      </el-row>
                    </el-col>
                  </el-row>
                </el-row>
              </el-row>


              <!-- 联系信息 -->
              <el-row>
                <el-row class="title">联系信息</el-row>
                <el-row style="padding: 0 10px;margin-top: 10px">
                  <el-row :gutter="10">
                    <el-col :span="12">
                      <!-- 联系电话 -->
                      <el-row style="height: 50px">
                        <el-form-item>
                          <span slot="label" class="text_css">联系电话：</span>
                          <el-input v-if="edit" style="width: 100%;" class="filter-item" placeholder="联系电话" :maxlength="11" v-model.number="student.mobile"></el-input>
                          <div style="padding-left: 16px;font-size: 12px;" v-else>{{student.mobile}}</div>
                        </el-form-item>
                      </el-row>
                    </el-col>
                    <el-col :span="12">
                      <!-- 微信 -->
                      <el-row style="height: 50px">
                        <el-form-item>
                          <span slot="label" class="text_css">微信：</span>
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
                      <el-row style="height: 50px">
                        <el-form-item>
                          <span slot="label" class="text_css">电子邮箱：</span>
                          <el-input v-if="edit" style="width: 100%;" class="filter-item" placeholder="电子邮箱" v-model="student.email"></el-input>
                          <div style="padding-left: 16px;font-size: 12px;" v-else>{{student.email}}</div>
                        </el-form-item>
                      </el-row>
                    </el-col>
                    <el-col :span="12">
                      <!-- 所属职位 -->
                      <el-row style="height: 50px">
                        <el-form-item>
                          <span slot="label" class="text_css">所属职位：</span>
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
                      <el-row style="height: 50px">
                        <el-form-item>
                          <span slot="label" class="text_css">是否体检：</span>
                          <el-col :span="18">
                            <el-radio-group v-if="edit" v-model="student.physicalExamination">
                              <el-radio label="1">是</el-radio>
                              <el-radio label="0">否</el-radio>
                            </el-radio-group>
                            <div style="padding-left: 16px;font-size: 12px;" v-else>{{student.physicalExamination === '1'?'是':'否'}}</div>
                          </el-col>
                        </el-form-item>
                      </el-row>
                    </el-col>
                    <el-col :span="12">
                      <!-- 是否增驾 -->
                      <el-row style="height: 50px">
                        <el-form-item>
                          <span slot="label" class="text_css">是否增驾：</span>
                          <el-col :span="18">
                            <el-radio-group v-if="edit" v-model="student.addDrive">
                              <el-radio label="1">是</el-radio>
                              <el-radio label="0">否</el-radio>
                            </el-radio-group>
                            <div style="padding-left: 16px;font-size: 12px;" v-else>{{student.addDrive === '1'?'是':'否'}}</div>
                          </el-col>
                        </el-form-item>
                      </el-row>
                    </el-col>
                  </el-row>
                </el-row>

                <el-row style="padding: 0 10px;margin-top: 10px">
                  <el-row :gutter="10">
                    <el-col :span="12">
                      <!-- 是否有车 -->
                      <el-row style="height: 50px">
                        <el-form-item>
                          <span slot="label" class="text_css">是否有车：</span>
                          <el-col :span="18">
                            <el-radio-group v-if="edit" v-model="student.haveCar">
                              <el-radio label="1">是</el-radio>
                              <el-radio label="0">否</el-radio>
                            </el-radio-group>
                            <div style="padding-left: 16px;font-size: 12px;" v-else>{{student.haveCar === '1'?'是':'否'}}</div>
                          </el-col>
                        </el-form-item>
                      </el-row>
                    </el-col>
                  </el-row>
                </el-row>

                <!-- 所属单位 -->
                <el-row style="height: 50px;margin: 0 10px">
                  <el-form-item>
                    <span slot="label" class="text_css">所属单位：</span>
                    <el-input v-if="edit" style="width: 100%;" class="filter-item" placeholder="所属单位" v-model="student.company"></el-input>
                    <div style="padding-left: 16px;font-size: 12px;" v-else>{{student.company}}</div>
                  </el-form-item>
                </el-row>


                <!-- 联系地址 -->
                <el-row style="height: 50px;margin: 0 10px">
                  <el-form-item>
                    <span slot="label" class="text_css">联系地址：</span>
                    <el-input v-if="edit" style="width: 100%;" class="filter-item" placeholder="联系地址" v-model="student.contactAddress"></el-input>
                    <div style="padding-left: 16px;font-size: 12px;" v-else>{{student.contactAddress}}</div>
                  </el-form-item>
                </el-row>

              </el-row>





            </el-card>
            <el-card body-style="padding: 0;" style="height:60px; border-radius:0 0 4px 0;border-top: none;border-top: 1px solid #dcdfe6;">
              <div v-if="edit && !addInfo" style="width: 163px;margin: 10px auto">
                <el-button type="danger" plain  @click="cancel">取 消</el-button>
                <el-button type="primary" @click="update">修 改</el-button>
              </div>
              <div v-if="edit && addInfo" style="width: 80px;margin: 10px auto">
                <el-button type="primary" @click="add">保 存</el-button>
              </div>
              <div v-else style="width: 163px;margin: 10px auto">
                <el-button type="success" @click="handleBespeak">约 考</el-button>
                <el-button type="primary" @click="editInfo">编 辑</el-button>
              </div>

            </el-card>
          </el-form>
        </el-col>
      </el-row>
    </div>

    <div v-show="showModule=='create'"  v-loading="createLoading" element-loading-text="匹配中...">
      <el-card body-style="padding:5px 20px;" style="margin-bottom: 5px;height: 60px;line-height: 50px">
        录入详细信息
        <div style="float: right"><el-button type="primary" @click="backClick">返  回</el-button></div>
      </el-card>
      <el-row :gutter="5">
        <el-col :span="12">
          <el-card :style="{height: ($store.state.app.client.height - 110) + 'px'}" style="overflow: auto;line-height: 50px">
            <el-form :model="studentEntity" :rules="studentEntityRules" :ref="studentEntity" label-width="100px">
              <el-row>
                <el-row :gutter="20">
                  <el-col :span="12" >

                    <!-- 联系电话 -->
                    <el-row >
                      <el-form-item prop="mobile">
                        <span slot="label" class="text_css">联系电话：</span>
                        <el-input style="width: 100%;" class="filter-item" @keyup.enter.native="matchingStudents" placeholder="联系电话" :maxlength="11"  v-model.number="studentEntity.mobile"></el-input>
                      </el-form-item>

                    </el-row>

                    <!-- 身份证号 -->
                    <el-row >
                      <el-form-item prop="idNumber">
                        <span slot="label" class="text_css">身份证号：</span>
                        <el-input style="width: 100%;" class="filter-item" placeholder="身份证号" :maxlength="18" @keyup.enter.native="AddGenerateInfo" @blur="AddGenerateInfo" v-model="studentEntity.idNumber"></el-input>
                      </el-form-item>
                    </el-row>

                    <!-- 档案号 -->
                    <el-row >
                      <el-form-item prop="archivesNumber">
                        <span slot="label" class="text_css">档案号：</span>
                        <el-input style="width: 100%;" class="filter-item" placeholder="档案号" v-model="studentEntity.archivesNumber"></el-input>
                      </el-form-item>
                    </el-row>

                    <!-- 姓名 -->
                    <el-row >

                      <el-form-item prop="name">
                        <span slot="label" class="text_css">姓名：</span>
                        <el-input style="width: 100%;" class="filter-item" placeholder="姓名" clearable v-model="studentEntity.name"></el-input>
                      </el-form-item>

                    </el-row>


                    <!-- 微信 -->
                    <el-row >
                      <el-form-item prop="wechat">
                        <span slot="label"  class="text_css">微信：</span>
                        <el-input style="width: 100%;" class="filter-item" placeholder="微信" v-model="studentEntity.wechat"></el-input>
                      </el-form-item>
                    </el-row>


                    <!-- 校区 -->
                    <el-row >
                      <el-form-item prop="campus">
                        <span slot="label"  class="text_css">校区：</span>
                        <dict v-model="studentEntity.campus" dictType="dict_campus" style="width: 100%;"  placeholder="校区"></dict>
                      </el-form-item>
                    </el-row>

                    <!-- 联系地址 -->
                    <el-row >
                      <el-form-item prop="contactAddress">
                        <span slot="label"  class="text_css">联系地址：</span>
                        <el-input style="width: 100%;" class="filter-item" placeholder="联系地址" v-model="studentEntity.contactAddress"></el-input>
                      </el-form-item>
                    </el-row>


                    <!-- 入学期数 -->
                    <el-row >
                      <el-form-item prop="periods">
                        <span slot="label"  class="text_css">入学期数：</span>
                        <el-input style="width: 100%;" class="filter-item" placeholder="入学期数" v-model="studentEntity.periods"></el-input>
                      </el-form-item>
                    </el-row>




                    <!-- 生日 -->
                    <el-row >
                      <el-form-item prop="birthday">
                        <span slot="label" class="text_css">生日：</span>
                        <el-date-picker value-format="timestamp"  type="date" placeholder="生日"  style="width: 100%" v-model="studentEntity.birthday"></el-date-picker>
                      </el-form-item>
                    </el-row>

                    <!-- 所学车型 -->
                    <el-row >
                      <el-form-item prop="motorcycleType">
                        <span slot="label"  class="text_css">所学车型：</span>
                        <dict v-model="studentEntity.motorcycleType" dictType="dict_motorcycle_type" style="width: 100%;"  placeholder="所学车型"></dict>
                      </el-form-item>
                    </el-row>

                    <!-- 来源渠道 -->
                    <el-row >
                      <el-form-item prop="source">
                        <span slot="label" class="text_css">来源渠道：</span>
                        <dict v-model="studentEntity.source" dictType="dict_source" style="width: 100%;"  placeholder="来源渠道"></dict>
                      </el-form-item>
                    </el-row>


                    <!-- 入学日期 -->
                    <el-row >
                      <el-form-item prop="enrolTime">
                        <span slot="label"  class="text_css">入学日期：</span>
                        <el-date-picker value-format="timestamp" type="date" placeholder="入学日期" style="width: 100%" v-model="studentEntity.enrolTime"></el-date-picker>
                      </el-form-item>
                    </el-row>

                  </el-col>

                  <el-col :span="12">

                    <el-row>
                      <el-col :span="6"> &nbsp;</el-col>
                      <el-col  :span="18">
                        <div style="height: 150px;width: 100px;margin: 0 auto">
                          <el-upload class="AddAvatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="AddHandleAvatarSuccess" :before-upload="beforeAvatarUpload">
                            <img v-if="studentEntity.avatar" :src="studentEntity.avatar" class="AddAvatar">
                            <i v-else class="el-icon-plus AddAvatar-uploader-icon"></i>
                          </el-upload>

                        </div>
                      </el-col>
                    </el-row>


                    <!-- 性别 -->
                    <el-row >
                      <el-form-item prop="sex">
                        <span slot="label" class="text_css">性别：</span>
                        <el-col :span="18">
                          <el-radio-group v-model="studentEntity.sex">
                            <el-radio label="1">男</el-radio>
                            <el-radio label="0">女</el-radio>
                          </el-radio-group>
                        </el-col>
                      </el-form-item>
                    </el-row>


                    <!-- 是否体检 -->
                    <el-row >
                      <el-form-item prop="physicalExamination">
                        <span slot="label" class="text_css">是否体检：</span>
                        <el-col :span="18">
                          <el-radio-group v-model="studentEntity.physicalExamination">
                            <el-radio label="1">是</el-radio>
                            <el-radio label="0">否</el-radio>
                          </el-radio-group>
                        </el-col>
                      </el-form-item>
                    </el-row>


                    <!-- 是否增驾 -->
                    <el-row >
                      <el-form-item prop="addDrive">
                        <span slot="label" class="text_css">是否增驾：</span>
                        <el-col :span="18">
                          <el-radio-group v-model="studentEntity.addDrive">
                            <el-radio label="1">是</el-radio>
                            <el-radio label="0">否</el-radio>
                          </el-radio-group>
                        </el-col>
                      </el-form-item>
                    </el-row>

                    <!-- 是否有车 -->
                    <el-row >
                      <el-form-item prop="haveCar">
                        <span slot="label" class="text_css">是否有车：</span>
                        <el-col :span="18">
                          <el-radio-group v-model="studentEntity.haveCar">
                            <el-radio label="1">是</el-radio>
                            <el-radio label="0">否</el-radio>
                          </el-radio-group>
                        </el-col>
                      </el-form-item>
                    </el-row>

                    <!-- 电子邮箱 -->
                    <el-row >
                      <el-form-item prop="email">
                        <span slot="label"  class="text_css">电子邮箱：</span>
                        <el-input style="width: 100%;" class="filter-item" placeholder="电子邮箱" v-model="studentEntity.email"></el-input>
                      </el-form-item>
                    </el-row>


                    <!-- 所在单位 -->
                    <el-row >
                      <el-form-item prop="company">
                        <span slot="label"  class="text_css">所在单位：</span>
                        <el-input style="width: 100%;" class="filter-item" placeholder="所在单位" v-model="studentEntity.company"></el-input>
                      </el-form-item>

                    </el-row>

                    <!-- 所属职位 -->
                    <el-row >
                      <el-form-item prop="position">
                        <span slot="label"  class="text_css">所属职位：</span>
                        <el-input style="width: 100%;" class="filter-item" placeholder="所属职位" v-model="studentEntity.position"></el-input>
                      </el-form-item>
                    </el-row>
                    <!-- 报名点 -->
                    <el-row >
                      <el-form-item prop="enrolSite">
                        <span slot="label"  class="text_css">报名点：</span>
                        <dict v-model="studentEntity.enrolSite" dictType="dict_enrolSite" style="width: 100%;"  placeholder="报名点"></dict>
                      </el-form-item>
                    </el-row>

                    <!-- 介绍人 -->
                    <el-row >
                      <el-form-item prop="idNumber">
                        <span slot="label"  class="text_css">介绍人：</span>
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
                  <div style="width: 163px;margin: 0 auto">
                    <el-button type="primary"  @click="add('studentEntity')">建 档</el-button>
                    <el-button plain @click="reset('studentEntity')">重  置</el-button>
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

    <el-dialog @close="cancel" title="选择批次" width="40%" :visible.sync="dialogFormBespeak">
      <div :style="{height: ($store.state.app.client.height)/3 +'px'}" style="overflow: auto">
        <div v-if="batchList.length === 0" style="width: 100%;text-align: center;font-size: 18px;color: #99a9bf;font-weight: 100;">
          无可预约场次
        </div>
        <div v-else v-for="batch in batchList"  style="float: left;margin: 5px">
          <div class="batchCss" @click="batchClick($event,batch)" style="float: left;">
            {{batch.batch}}
            <span>【{{batch.hasReserved}}/{{batch.stuCount}}】</span>
          </div>

        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeBespeak">取 消</el-button>
        <el-button type="primary" @click="createBespeak">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import { fetchList, getObj, addObj, putObj } from '@/api/student/student'
  import { userList } from '@/api/upms/user'
  import { examFetchList } from '@/api/student/examnote'
  import { getVehiclePeriodByStudentId } from '@/api/bespeak/vehicleperiod'
  import { getShuttleLogByStudentId } from '@/api/bespeak/shuttlestudent'
  import { getIntentionByMobile } from '@/api/visit/intention'
  import Coach from '@/components/Coach'
  import { removeAllSpace } from '@/utils/validate'
  import { mapGetters } from 'vuex'
  import { getBatchList } from '@/api/student/batch'
  import { batchSave } from '@/api/student/exambespeak'
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
            { required: true, message: '请输入手机号', trigger: 'blur' },
            { pattern: /^1[2345789]\d{9}$/, message: '目前只支持中国大陆的手机号码', trigger: 'blur' }
          ],
          idNumber: [
            { required: true, message: '请输入身份证', trigger: 'blur' },
            { validator: idNumberReg, trigger: 'blur' }
          ],
          archivesNumber: [
            { required: true, message: '请输入档案号', trigger: 'blur' }
          ],
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' }
          ],
          wechat: [
            { required: true, message: '请输入微信', trigger: 'blur' }
          ],
          campus: [
            { required: true, message: '请输入校区地址', trigger: 'blur' }
          ],
          contactAddress: [
            { required: true, message: '请输入住址', trigger: 'blur' }
          ],
          periods: [
            { required: true, message: '请输入入学期数', trigger: 'blur' }
          ],
          birthday: [
            { required: true, message: '请选择生日', trigger: 'blur' }
          ],
          motorcycleType: [
            { required: true, message: '请选择所学车型', trigger: 'blur' }
          ],
          source: [
            { required: true, message: '请选择来源渠道', trigger: 'blur' }
          ],
          enrolTime: [
            { required: true, message: '请选择入学日期', trigger: 'blur' }
          ],
          sex: [
            { required: true, message: '请选择性别', trigger: 'blur' }
          ],
          physicalExamination: [
            { required: true, message: '请选择是否体检', trigger: 'blur' }
          ],
          addDrive: [
            { required: true, message: '请选择是否增加', trigger: 'blur' }
          ],
          haveCar: [
            { required: true, message: '请选择是否有车', trigger: 'blur' }
          ],
          email: [
            { required: true, message: '请输入邮箱', trigger: 'blur' },
            { pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, message: '请输入正确的邮箱', trigger: 'blur' }
          ],
          company: [],
          position: [],
          enrolSite: [
            { required: true, message: '请选择报名点', trigger: 'blur' }
          ],
          introducerList: [
            { required: true, message: '请选择介绍人', trigger: 'blur' },
            { validator: introducerListReg, trigger: 'blur' }
          ]
        },
        stuList: [],
        examNoteList: [],
        vehiclePeriodList: [],
        shuttleLogList: [],
        total: 1,
        listLoading: true,
        showModule: 'list',
        addInfo: false,
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
        createLoading: false,
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
      }
    },
    methods: {
      // 根据部门id查询学员信息
      searchByOrg(data) {
        console.log('=====================   根据部门id查询学员信息   =======================')
        this.listQuery.page = 1
        this.getList()
      },
      // 字典
      getDict(val) {
      },
      // 双击行  编辑
      editList(val) {
        console.log('====================== 进入单个学员编辑 =====================')
        getObj(val.studentId).then(response => {
          console.log(response.data.data)
          this.student = response.data.data
          this.examBespeak.studentId = this.student.studentId
          if (this.student.introducerIdList === null) this.student.introducerIdList = [] // 防止介绍人为null
          this.getIntroducerList()
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
        this.addInfo = false
      },
      // 添加
      add(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log('======================= 添加的数据 ======')
            console.log(this.studentEntity)
            addObj(this.studentEntity).then(response => {
              // this.backClick()
            })
          }
        })
      },
      // 新增
      create() {
        this.reset()
        this.showModule = 'create'
        this.edit = true
        this.addInfo = true
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
      update() {
        console.log('=========== 修改之后的值 =========')
        console.log(this.student)
        putObj(this.student).then(() => {
          this.editList(this.student)
          this.edit = false
        })
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
      // 删除
      delete(id) {
        this.getList()
      },
      // 取消
      cancel() {
        this.editList(this.student)
        this.edit = false
      },
      // 返回列表
      backClick() {
        this.showModule = 'list'
        this.edit = false
        this.addInfo = false
        this.getList()
      },
      generateInfo() {
        var date
        if (this.student.idNumber !== null) {
          if (this.student.idNumber.length === 18) {
            if (!this.student.birthday) {
              date = this.student.idNumber.substring(6, 10) + '-' + this.student.idNumber.substring(10, 12) + '-' + this.student.idNumber.substring(12, 14)
              date = date.substring(0, 10)
              date = date.replace(/-/g, '/')
              this.student.birthday = new Date(date).getTime()
            }
            if (this.student.idNumber.substr(16, 1) % 2 === 1 && this.student.sex === null) this.student.sex = '1'
            if (this.student.idNumber.substr(16, 1) % 2 === 0 && this.student.sex === null) this.student.sex = '0'
          }
        }
      },
      handleAvatarSuccess(res, file) {
        this.student.avatar = URL.createObjectURL(file.raw)
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg'
        const isLt2M = file.size / 1024 / 1024 < 2

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
        }
        return isJPG && isLt2M
      },
      orgClick() {},
      AddHandleAvatarSuccess(res, file) {
        this.studentEntity.avatar = URL.createObjectURL(file.raw)
      },
      AddGenerateInfo() {
        var date
        if (this.studentEntity.idNumber !== null) {
          if (this.studentEntity.idNumber.length === 18) {
            if (!this.studentEntity.birthday) {
              date = this.studentEntity.idNumber.substring(6, 10) + '-' + this.studentEntity.idNumber.substring(10, 12) + '-' + this.studentEntity.idNumber.substring(12, 14)
              date = date.substring(0, 10)
              date = date.replace(/-/g, '/')
              this.studentEntity.birthday = new Date(date).getTime()
            }
            if (this.studentEntity.idNumber.substr(16, 1) % 2 === 1 && this.studentEntity.sex === null) this.studentEntity.sex = '1'
            if (this.studentEntity.idNumber.substr(16, 1) % 2 === 0 && this.studentEntity.sex === null) this.studentEntity.sex = '0'
          }
        }
      },
      reset(formName) {
        this.$refs[formName].resetFields()
        this.studentEntity = {
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
        }
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
      handleBespeak() {
        console.log(this.student.state)
        this.examBespeak.subject = this.student.state
        this.batchListQuery.subject = this.student.state
        getBatchList(this.batchListQuery).then(response => {
          console.log(' ===================  这是所有批次信息  ==================')
          console.log(response.data.data)
          this.batchList = response.data.data.list
          // this.total = response.data.data.totalCount
          this.listOldLoading = false
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
          batchSave(this.examBespeak).then(() => {
            this.$notify({
              title: '成功',
              message: '预约成功',
              type: 'success'
            })
            this.dialogFormBespeak = false
            this.examBespeak.examId = null
          })
        }
      },
      matchingStudents() {
        this.createLoading = true
        getIntentionByMobile(this.studentEntity.mobile).then(response => {
          console.log('======== 匹配到的值 =========')
          console.log(response.data)
          if (response.data.data) {
            if (this.studentEntity.name === null || this.studentEntity.name === '') this.studentEntity.name = response.data.data.name
            if (this.studentEntity.sex === null || this.studentEntity.sex === '') this.studentEntity.sex = response.data.data.sex
            if (this.studentEntity.source === null || this.studentEntity.source === '') this.studentEntity.source = response.data.data.source
            if (this.studentEntity.wechat === null || this.studentEntity.wechat === '') this.studentEntity.wechat = response.data.data.wechat
            if (this.studentEntity.contactAddress === null || this.studentEntity.contactAddress === '') this.studentEntity.contactAddress = response.data.data.contactAddress
            this.studentEntity.introducerList.push(response.data.data.userId)
            if (this.studentEntity.motorcycleType === null || this.studentEntity.motorcycleType === '') this.studentEntity.motorcycleType = response.data.data.applyType
          }
          this.createLoading = false
        })
      }
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
  .subject{
    width: 140px;
    height: 30px;
    display:block;
    margin: 10px auto;
    color: rgb(124,124,124);
    background: none;
    border: none;
    font-size: 14px;
  }
  .pass{
    width: 70px;
    height: 30px;
    border-radius: 10px;
    color: #fff;
    text-align: center;
    border: none;
    background-color: rgb(66,185,131);
  }
  .noPass{
    width: 70px;
    height: 30px;
    border-radius: 10px;
    color:#fff;
    border: none;
    text-align: center;
    background-color: rgb(177,177,177);
  }
  .cost{
    width: 140px;
    height: 30px;
    display:block;
    margin: 10px auto;
    text-align: left;
    color: rgb(124,124,124);
    background: none;
    border: none;
    font-size: 14px;
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
