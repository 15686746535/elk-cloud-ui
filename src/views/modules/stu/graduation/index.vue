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

        <el-col :style="{width: ($store.state.app.client.width-225) + 'px'}">
          <el-card style="margin-bottom: 5px;height: 125px;line-height: 50px">
            <el-date-picker value-format="timestamp"  :style="{width: ($store.state.app.client.width/7)*1.5 + 'px'}" v-model="listQuery.interval" type="daterange" align="left" unlink-panels range-separator="—" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions">
            </el-date-picker>
            <el-select :style="{width: ($store.state.app.client.width/7) + 'px'}" v-model="listQuery.subject" placeholder="科目">
              <el-option
                v-for="item in subject"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-select :style="{width: ($store.state.app.client.width/7) + 'px'}" v-model="listQuery.motorcycleType" placeholder="车型">
              <el-option
                v-for="item in $store.state.app.motorcycleType"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
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
                      <el-col :span="7" class="table_text">收费服务:</el-col>
                      <el-col :span="17" class="table_text">{{scope.row.serviceType}}</el-col>
                    </el-row>

                    <el-row :gutter="10">
                      <el-col :span="7" class="table_text">增值服务:</el-col>
                      <el-col :span="17" class="table_text">
                        <span v-for="(increment,index) in scope.row.incrementList">{{increment}}<span v-if="scope.row.incrementList.length !== (index+1)">、</span></span>
                      </el-col>
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
      <el-row >
        <el-col :style="{height: ($store.state.app.client.height-110) + 'px',width: ($store.state.app.client.width-555) + 'px'}">
          <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick" style="height: 100%;border-radius: 4px 0 0 4px;">
            <!--<el-tab-pane label="最近信息" name="1">-->
            <!--</el-tab-pane>-->
            <el-tab-pane label="考试情况" name="1">

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
            <!--<el-tab-pane label="费用情况" name="3">-->


            <!--</el-tab-pane>-->
            <el-tab-pane label="来访跟进信息" name="4">
              <div :style="{height: (client.height-175) + 'px'}"  style="width: 100%;overflow: auto;margin-bottom: 10px;padding: 35px">
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
          <el-form :model="student" ref="student" label-position="left" label-width="80px" size="mini" >
            <el-card :style="{height: ($store.state.app.client.height-100) + 'px'}" body-style="padding: 0;"
                     v-loading="infoLoading" element-loading-text="୧(๑•̀⌄•́๑)૭努力匹配中..."
                     shadow="never" style="border-radius:0 4px 0 0;line-height: 50px;overflow-y: auto;">
              <!-- 基本信息 -->
              <el-row>
                <el-row class="title">基本信息</el-row>
                <el-row style="padding: 0 10px">
                  <el-col :span="12">
                    <!-- 档案号 -->
                    <el-row>
                      <el-form-item prop="archivesNumber">
                        <span slot="label" class="text_css">档案号:</span>
                        <div style="padding-left: 16px;font-size: 12px;" >{{student.archivesNumber}}</div>
                      </el-form-item>

                    </el-row>

                    <!-- 姓名 -->
                    <el-row>
                      <el-form-item prop="name">
                        <span slot="label" class="text_css">姓名:</span>
                        <div style="padding-left: 16px;font-size: 12px;" >{{student.name}}</div>
                      </el-form-item>
                    </el-row>

                    <!-- 身份证号 -->
                    <el-row>
                      <el-form-item prop="idNumber">
                        <span slot="label" class="text_css">身份证号:</span>
                        <div style="padding-left: 16px;font-size: 12px;" >{{student.idNumber}}</div>
                      </el-form-item>

                    </el-row>

                    <!-- 性别 -->
                    <el-row>
                      <el-form-item prop="sex">
                        <span slot="label" class="text_css">性别:</span>
                        <div style="padding-left: 16px;font-size: 12px;" >{{student.sex | sexFilter}}</div>
                      </el-form-item>

                    </el-row>

                    <!-- 生日 -->
                    <el-row>
                      <el-form-item prop="birthday">
                        <span slot="label" class="text_css">生日:</span>
                        <div style="padding-left: 16px;font-size: 12px;" >{{student.birthday | subTime}}</div>
                      </el-form-item>
                    </el-row>

                  </el-col>
                  <el-col :span="12">
                    <el-row>
                      <!-- 头像 -->
                      <el-form-item prop="avatar">
                        <el-upload :disabled="false" class="avatar-uploader" action="/oss/upload" name="file" :show-file-list="false">
                          <img :src="student.avatar" class="avatar">
                        </el-upload>
                      </el-form-item>
                    </el-row>
                  </el-col>
                </el-row>
              </el-row>


              <!-- 入学信息 -->
              <el-row>
                <el-row class="title">入学信息</el-row>
                <el-row style="padding: 0 10px">
                  <el-row :gutter="10">
                    <el-col :span="12">
                      <!-- 入学日期 -->
                      <el-row>
                        <el-form-item prop="enrolTime">
                          <span slot="label" class="text_css">入学日期:</span>
                          <div style="padding-left: 16px;font-size: 12px;" >{{student.enrolTime | subTime}}</div>
                        </el-form-item>
                      </el-row>
                    </el-col>
                    <el-col :span="12">
                      <!-- 校区 -->
                      <el-row>
                        <el-form-item prop="campus">
                          <span slot="label" class="text_css">校区:</span>
                          <div style="padding-left: 16px;font-size: 12px;" >{{student.campus}}</div>
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
                          <div style="padding-left: 16px;font-size: 12px;" >{{student.periods}}</div>
                        </el-form-item>
                      </el-row>
                    </el-col>
                    <el-col :span="12">
                      <!-- 来源渠道 -->
                      <el-row>
                        <el-form-item prop="source">
                          <span slot="label" class="text_css">来源渠道:</span>
                          <div style="padding-left: 16px;font-size: 12px;" >{{student.source}}</div>
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
                          <div style="padding-left: 16px;font-size: 12px;" >{{student.motorcycleType}}</div>
                        </el-form-item>
                      </el-row>
                    </el-col>
                    <el-col :span="12">
                      <!-- 报名点 -->
                      <el-row>
                        <el-form-item prop="enrolSite">
                          <span slot="label" class="text_css">报名点:</span>
                          <div style="padding-left: 16px;font-size: 12px;" >{{student.enrolSite}}</div>
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
                          <div style="padding-left: 16px;font-size: 12px;" >{{student.fieldName === null?'未安排':student.fieldName}}</div>
                        </el-form-item>
                      </el-row>
                    </el-col>
                    <el-col :span="12">
                      <!-- 路训教练 -->
                      <el-row>
                        <el-form-item prop="roadName">
                          <span slot="label" class="text_css">路训教练:</span>
                          <div style="padding-left: 16px;font-size: 12px;" >{{student.roadName === null?'未安排':student.roadName}}</div>
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
                          <span v-for="(introducerName,index) in student.introducerNameList">{{introducerName}}<span v-if="student.introducerNameList.length !== (index+1)">、</span></span>
                        </el-form-item>
                      </el-row>
                    </el-col>
                  </el-row>
                </el-row>
              </el-row>


              <!-- 联系信息 -->
              <el-row>
                <el-row class="title">联系信息:</el-row>
                <el-row style="padding: 0 10px">
                  <el-row :gutter="10">
                    <el-col :span="12">
                      <!-- 联系电话 -->
                      <el-row>
                        <el-form-item prop="mobile">
                          <span slot="label" class="text_css">联系电话:</span>
                          <div style="padding-left: 16px;font-size: 12px;" >{{student.mobile}}</div>
                        </el-form-item>
                      </el-row>
                    </el-col>
                    <el-col :span="12">
                      <!-- 微信 -->
                      <el-row>
                        <el-form-item prop="wechat">
                          <span slot="label" class="text_css">微信:</span>
                          <div style="padding-left: 16px;font-size: 12px;" >{{student.wechat}}</div>
                        </el-form-item>
                      </el-row>
                    </el-col>
                  </el-row>
                </el-row>

                <el-row style="padding: 0 10px">
                  <el-row :gutter="10">
                    <el-col :span="12">
                      <!-- 电子邮箱 -->
                      <el-row>
                        <el-form-item prop="email">
                          <span slot="label" class="text_css">电子邮箱:</span>
                          <div style="padding-left: 16px;font-size: 12px;" >{{student.email}}</div>
                        </el-form-item>
                      </el-row>
                    </el-col>
                    <el-col :span="12">
                      <!-- 所属职位 -->
                      <el-row>
                        <el-form-item prop="position">
                          <span slot="label" class="text_css">所属职位:</span>
                          <div style="padding-left: 16px;font-size: 12px;" >{{student.position}}</div>
                        </el-form-item>
                      </el-row>
                    </el-col>
                  </el-row>
                </el-row>


                <el-row style="padding: 0 10px">
                  <el-row :gutter="10">
                    <el-col :span="12">
                      <!-- 是否体检 -->
                      <el-row >
                        <el-form-item prop="physicalExamination">
                          <span slot="label" class="text_css">是否体检:</span>
                          <div style="padding-left: 16px;font-size: 12px;" >{{student.physicalExamination === '1'?'是':'否'}}</div>
                        </el-form-item>
                      </el-row>
                    </el-col>
                    <el-col :span="12">
                      <!-- 是否增驾 -->
                      <el-row>
                        <el-form-item prop="addDrive">
                          <span slot="label" class="text_css">是否增驾:</span>
                          <div style="padding-left: 16px;font-size: 12px;" >{{student.addDrive === '1'?'是':'否'}}</div>
                        </el-form-item>
                      </el-row>
                    </el-col>
                  </el-row>
                </el-row>

                <el-row style="padding: 0 10px">
                  <el-row :gutter="10">
                    <el-col :span="12">
                      <!-- 是否有车 -->
                      <el-row>
                        <el-form-item prop="haveCar">
                          <span slot="label" class="text_css">是否有车:</span>
                          <div style="padding-left: 16px;font-size: 12px;" >{{student.haveCar === '1'?'是':'否'}}</div>
                        </el-form-item>
                      </el-row>
                    </el-col>
                  </el-row>
                </el-row>

                <!-- 所属单位 -->
                <el-row style="margin: 0 10px">
                  <el-form-item prop="company">
                    <span slot="label" class="text_css">所属单位:</span>
                    <div style="padding-left: 16px;font-size: 12px;" >{{student.company}}</div>
                  </el-form-item>
                </el-row>


                <!-- 联系地址 -->
                <el-row style="margin: 0 10px">
                  <el-form-item prop="contactAddress">
                    <span slot="label" class="text_css">联系地址:</span>
                    <div style="padding-left: 16px;font-size: 12px;" >{{student.contactAddress}}</div>
                  </el-form-item>
                </el-row>

              </el-row>





            </el-card>
          </el-form>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
  import Coach from '@/components/Coach'
  import { removeAllSpace } from '@/utils/validate'
  import { mapGetters } from 'vuex'

  import { fetchStudentList, getStudent } from '@/api/student/student'
  import { examFetchList } from '@/api/student/examnote'

  import { getVehiclePeriodByStudentId } from '@/api/bespeak/vehicleperiod'
  import { getShuttleLogByStudentId } from '@/api/bespeak/shuttlestudent'
  import { followUpList } from '@/api/visit/followup'

  export default {
    name: 'table_student',
    components: {
      Coach
    },
    data() {
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
        stuList: [],
        examNoteList: [],
        vehiclePeriodList: [],
        shuttleLogList: [],
        followUpList: [],
        total: 1,
        listLoading: true,
        btnLoading: false,
        showModule: 'list',
        listQuery: {
          page: 1,
          limit: 20,
          condition: null,
          interval: [],
          subject: '5',
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
            value: '5',
            label: '毕业'
          }, {
            value: '-1',
            label: '退学'
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
        getStudent(val.studentId).then(response => {
          console.log(response.data.data)
          this.student = response.data.data
          this.examBespeak.studentId = this.student.studentId
          if (this.student.introducerIdList === null) this.student.introducerIdList = [] // 防止介绍人为null
          this.getExam()
          this.infoLoading = false
        })
        this.showModule = 'info'
      },
      /* 切换标签 */
      handleClick(tab, event) {
        console.log(tab.name)
        if (tab.label === '考试情况') {
          this.getExam()
        } else if (tab.label === '费用情况') {
          // this.getExam()
        } else if (tab.label === '来访跟进信息') {
          this.getFollowUpList()
        } else if (tab.label === '约车日志') {
          this.getVehiclePeriod()
        } else if (tab.label === '接送日志') {
          this.getShuttleLog()
        }
      },
      /* 考试日志 */
      getExam() {
        examFetchList({ studentId: this.student.studentId, examState: 'exam_note_true' }).then(response => {
          console.log('====================== 考试日志 =====================')
          console.log(response.data)
          this.examNoteList = response.data.data.list
        })
      },
      /* 约车日志 */
      getVehiclePeriod() {
        getVehiclePeriodByStudentId(this.student.studentId).then(response => {
          console.log('====================== 约车日志 =====================')
          console.log(response.data)
          this.vehiclePeriodList = response.data.list
        })
      },
      /* 接送日志 */
      getShuttleLog() {
        getShuttleLogByStudentId(this.student.studentId).then(response => {
          console.log('====================== 接送日志 =====================')
          console.log(response.data)
          this.shuttleLogList = response.data.list
        })
      },
      /* 跟进信息 */
      getFollowUpList() {
        console.log(this.student.mobile)
        followUpList({ 'mobile': this.student.mobile }).then(response => {
          console.log('====================== 跟进信息 =====================')
          console.log(response.data)
          this.followUpList = response.data.data
        })
      },
      // 获取所有学员
      getList() {
        this.listLoading = true
        fetchStudentList(this.listQuery).then(response => {
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
      // 返回列表
      backClick() {
        this.showModule = 'list'
        this.edit = false
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
