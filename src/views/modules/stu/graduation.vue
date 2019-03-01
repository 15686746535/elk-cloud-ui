<template>
  <div  class="student"  style="height: 100%;">
    <!-- 列表 -->
    <div v-show="showModule=='list'" style="height: 100%">
      <el-card body-style="padding: 5px 20px;" style="margin-bottom: 5px;height: 90px;line-height: 38px">
        <el-row :gutter="5">
          <el-col :xs="6" :sm="6" :md="8" :lg="7" :xl="5">
            <el-date-picker value-format="timestamp" style="width: 100%" size="mini" v-model="listQuery.interval" type="daterange" align="left" unlink-panels range-separator="—" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions">
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
                  <el-col :span="17" class="table_text">{{scope.row.introducers}}</el-col>
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
                  <el-col :span="17" class="table_text">{{scope.row.receivable>0?'双击查看详情':'无'}}</el-col>
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
        </div>
      </el-card>
    </div>
    <el-card v-show="showModule=='info'" body-style="padding:0;" >
      <el-row >
        <el-col :span="area[1] === 600?24:12" style="height: 100%;">
          <el-form :model="student" ref="student" label-position="left" label-width="80px" size="mini">
            <el-card body-style="padding: 0;"
                     v-loading="infoLoading" element-loading-text="努力匹配中..."
                     shadow="never" style="border-radius:0 4px 0 0;line-height: 40px;overflow-y: auto;">
              <!-- 基本信息 -->
              <el-row class="title" style="line-height: 60px;height: 60px">

                <el-col :span="3">
                  <div style="height: 50px;margin-top: 5px;margin-left: -40px;">
                    <img :src="student.avatar" class="avatar">
                  </div>
                </el-col>

                <el-col :span="17">基本信息</el-col>

                <el-col :span="4">
                  <el-button type="primary" :disabled="edit" size="mini"  @click="backClick"><i class="el-icon-back"></i> 返 回</el-button>
                </el-col>

              </el-row>

              <!--基本信息-->
              <el-row >
                <el-col :span="12">
                  <!-- 档案号 -->
                  <el-row>
                    <el-form-item prop="archivesNumber">
                      <span slot="label" class="text_css">档案号:</span>
                      <div style="padding-left: 16px;font-size: 12px;">{{student.archivesNumber}}</div>
                    </el-form-item>
                  </el-row>
                  <!-- 姓名 -->
                  <el-row>
                    <el-form-item prop="name">
                      <span slot="label" class="text_css">姓名:</span>
                      <div style="padding-left: 16px;font-size: 12px;">{{student.name}}</div>
                    </el-form-item>
                  </el-row>
                  <!-- 身份证号 -->
                  <el-row>
                    <el-form-item prop="idNumber">
                      <span slot="label" class="text_css">身份证号:</span>
                      <div style="padding-left: 16px;font-size: 12px;">{{student.idNumber}}</div>
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
                  <!-- 联系地址 -->
                  <el-row>
                    <el-form-item prop="contactAddress">
                      <span slot="label" class="text_css">联系地址:</span>
                      <div style="padding-left: 16px;font-size: 12px;">{{student.contactAddress}}</div>
                    </el-form-item>
                  </el-row>
                </el-col>
                <el-col :span="12">
                  <!--联系电话-->
                  <el-row>
                    <el-form-item prop="mobile">
                      <span slot="label" class="text_css">联系电话:</span>
                      <div style="padding-left: 16px;font-size: 12px;" >{{student.mobile}}</div>
                    </el-form-item>
                  </el-row>
                  <!-- 微信 -->
                  <el-row>
                    <el-form-item prop="wechat">
                      <span slot="label" class="text_css">* 微信:</span>
                      <div style="padding-left: 16px;font-size: 12px;" >{{student.wechat}}</div>
                    </el-form-item>
                  </el-row>
                  <!-- 电子邮箱 -->
                  <el-row>
                    <el-form-item prop="email">
                      <span slot="label" class="text_css">* 电子邮箱:</span>
                      <div style="padding-left: 16px;font-size: 12px;" >{{student.email}}</div>
                    </el-form-item>
                  </el-row>
                  <!-- 所属单位 -->
                  <el-row>
                    <el-form-item prop="company">
                      <span slot="label" class="text_css">* 所属单位:</span>
                      <div style="padding-left: 16px;font-size: 12px;" >{{student.company}}</div>
                    </el-form-item>
                  </el-row>
                  <!-- 所属职位 -->
                  <el-row >
                    <el-form-item prop="position">
                      <span slot="label" class="text_css">* 所属职位:</span>
                      <div style="padding-left: 16px;font-size: 12px;" >{{student.position}}</div>
                    </el-form-item>
                  </el-row>
                </el-col>
              </el-row>
              <!-- 入学信息 -->
              <el-row class="title" style="line-height: 60px;height: 60px">入学信息</el-row>
              <el-row>
                <el-col :span="12">
                  <!-- 入学日期 -->
                  <el-row>
                    <el-form-item prop="enrolTime">
                      <span slot="label" class="text_css">入学日期:</span>
                      <div style="padding-left: 16px;font-size: 12px;" >{{student.enrolTime | subTime}}</div>
                    </el-form-item>
                  </el-row>
                  <!-- 校区 -->
                  <el-row>
                    <el-form-item prop="campus">
                      <span slot="label" class="text_css">校区:</span>
                      <div style="padding-left: 16px;font-size: 12px;" >{{student.campus}}</div>
                    </el-form-item>
                  </el-row>
                  <!-- 入学期数 -->
                  <el-row>
                    <el-form-item prop="periods">
                      <span slot="label" class="text_css">入学期数:</span>
                      <div style="padding-left: 16px;font-size: 12px;" >{{student.periods}}</div>
                    </el-form-item>
                  </el-row>
                  <!-- 来源渠道 -->
                  <el-row>
                    <el-form-item prop="source">
                      <span slot="label" class="text_css">来源渠道:</span>
                      <div style="padding-left: 16px;font-size: 12px;" >{{student.source}}</div>
                    </el-form-item>
                  </el-row>
                  <!-- 是否体检 -->
                  <el-row >
                    <el-form-item prop="physicalExamination">
                      <span slot="label" class="text_css">是否体检:</span>
                      <div style="padding-left: 16px;font-size: 12px;" >{{student.physicalExamination === '1'?'是':'否'}}</div>
                    </el-form-item>
                  </el-row>
                  <!-- 是否有车 -->
                  <el-row>
                    <el-form-item prop="haveCar">
                      <span slot="label" class="text_css">是否有车:</span>
                      <div style="padding-left: 16px;font-size: 12px;" >{{student.haveCar === '1'?'是':'否'}}</div>
                    </el-form-item>
                  </el-row>
                  <!-- 历史费用 -->
                  <el-row style="margin: 0 10px">
                    <el-form-item prop="company">
                      <span slot="label" class="text_css">* 历史费用:</span>
                      <div style="padding-left: 16px;font-size: 12px;" >{{student.serviceRemark}}</div>
                    </el-form-item>
                  </el-row>
                </el-col>
                <el-col :span="12">
                  <!-- 所学车型 -->
                  <el-row>
                    <el-form-item prop="motorcycleType">
                      <span slot="label" class="text_css">所学车型:</span>
                      <div style="padding-left: 16px;font-size: 12px;">{{student.motorcycleType}}</div>
                    </el-form-item>
                  </el-row>
                  <!-- 报名点 -->
                  <el-row>
                    <el-form-item prop="enrolSite">
                      <span slot="label" class="text_css">报名点:</span>
                      <div style="padding-left: 16px;font-size: 12px;">{{student.enrolSite}}</div>
                    </el-form-item>
                  </el-row>
                  <!-- 场训教练 -->
                  <el-row>
                    <el-form-item prop="fieldName">
                      <span slot="label" class="text_css">* 场训教练:</span>
                      <div style="padding-left: 16px;font-size: 12px;" >{{student.fieldName === null?'未安排':student.fieldName}}</div>
                    </el-form-item>
                  </el-row>
                  <!-- 路训教练 -->
                  <el-row>
                    <el-form-item prop="roadName">
                      <span slot="label" class="text_css">* 路训教练:</span>
                      <div style="padding-left: 16px;font-size: 12px;" >{{student.roadName === null?'未安排':student.roadName}}</div>
                    </el-form-item>
                  </el-row>
                  <!-- 是否增驾 -->
                  <el-row>
                    <el-form-item prop="addDrive">
                      <span slot="label" class="text_css">是否增驾:</span>
                      <div style="padding-left: 16px;font-size: 12px;">{{student.addDrive === '1'?'是':'否'}}</div>
                    </el-form-item>
                  </el-row>
                  <!-- 介绍人 -->
                  <el-row style="margin: 0 10px">
                    <el-form-item prop="introducerNameList">
                      <span slot="label"  class="text_css">* 介绍人:</span>
                      <div style="padding-left: 16px;font-size: 12px;" >
                        <span v-for="(introducerName,index) in student.introducerNameList" >{{introducerName}}<span v-if="student.introducerNameList.length !== (student+1)">、</span></span>
                      </div>
                    </el-form-item>
                  </el-row>
                  <el-button type="primary" size="mini" @click="dialogFormVisible  = true"
                             v-if="permissions.stu_student_update" icon="el-icon-edit">状态修改</el-button>
                </el-col>
              </el-row>
            </el-card>
          </el-form>
        </el-col>
        <el-col :span="area[1] === 600?24:12"  >
          <el-tabs v-model="activeName" type="border-card"  @tab-click="handleClick" style="height: 100%;border-radius: 4px 0 0 4px;">
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
                    <span>{{scope.row.paytime.substring(0,10)}}</span>
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
                <el-table-column align="left"  label="状态">
                  <template slot-scope="scope">
                    <span>{{scope.row.state | chargeStateFilter}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="left"  label="操作">
                  <template slot-scope="scope">
                    <span class="a" @click="writeoffHandle(scope.row.chargeId)"
                          v-if="scope.row.state==='1'&&scope.row.type=='1'&&permissions.cost_info_examine_write_off">冲销</span>
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
      </el-row>
    </el-card>

    <el-dialog title="修改科目状态" :modal="false" :close-on-click-modal="false" :visible.sync="dialogFormVisible">
      <el-radio-group v-model="student.state">
        <el-radio label="1">科目一</el-radio>
        <el-radio label="2">科目二</el-radio>
        <el-radio label="3">科目三</el-radio>
        <el-radio label="4">科目四</el-radio>
        <el-radio label="5">毕业</el-radio>
      </el-radio-group>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editState">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import Coach from '@/components/Coach'
  import { removeAllSpace } from '@/utils/validate'
  import { mapGetters } from 'vuex'

  import { fetchStudentList, getStudent,  editSubState,getFinanceByStudentId } from '@/api/student/student'
  import { examFetchList } from '@/api/student/examnote'
  import finance from '@/views/modules/stu/serviceNote.vue'
  import { getVehiclePeriodByStudentId } from '@/api/bespeak/vehicleperiod'
  import { getShuttleLogByStudentId } from '@/api/bespeak/shuttlestudent'
  import { followUpList } from '@/api/visit/followup'

  export default {
    name: 'table_student',
    components: {
      Coach
    },
    props: {
      area: Array
    },
    watch: {
      area: function(val) {
        this.tableHeight = val[1]
      }
    },
    data() {
      return {
        dialogFormVisible: false,
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
        tableHeight: this.area[1],
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
        userList: [],
        financeList: []
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
      editState() { // 科目状态修改
        if (this.student.state > 5 || this.student.state < 0) this.dialogFormVisible = false;
        editSubState(this.student).then(response => {
          this.dialogFormVisible = false;
        });
      },
      // 根据部门id查询学员信息
      searchByOrg(data) {
        this.listQuery.page = 1
        this.getList()
      },
      // 双击行  编辑
      editList(val) {
        this.infoLoading = true
        getStudent(val.studentId).then(response => {
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
          getFinanceByStudentId(this.student.studentId).then(response => {
            if (response.data.code === 0) {
              var list = response.data.data
              console.log(list)
              this.financeList = list.filter(function(item) {
                return item.state !== '-1'
              })
            }
          })
        }
      },
      /* 考试日志 */
      getExam() {
        examFetchList({ studentId: this.student.studentId, examState: 'exam_note_true' }).then(response => {
          this.examNoteList = response.data.data.list
        })
      },
      /* 约车日志 */
      getVehiclePeriod() {
        getVehiclePeriodByStudentId(this.student.studentId).then(response => {
          this.vehiclePeriodList = response.data.list
        })
      },
      /* 接送日志 */
      getShuttleLog() {
        getShuttleLogByStudentId(this.student.studentId).then(response => {
          this.shuttleLogList = response.data.list
        })
      },
      /* 跟进信息 */
      getFollowUpList() {
        followUpList({ 'mobile': this.student.mobile }).then(response => {
          this.followUpList = response.data.data
        })
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
      // 返回列表
      backClick() {
        this.showModule = 'list'
        this.edit = false
        this.getList()
      },
      // 搜索
      searchClick() {
        this.listQuery.page = 1
        this.examTimeBlur()
        this.listQuery.condition = removeAllSpace(this.listQuery.condition)
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
      openService(row) { // openFinace
        var id = this.student.studentId + '_stu'
        var title = '￥' + this.student.name + ' 学费收取'
        var data = { student: this.student }
        if (row && row.chargeId) {
          id = row.chargeId + '_info'
          title = '收费详情'
          data = { charge: { chargeId: row.chargeId, pageLevel: 'info' }}
        }
        this.layerOpen({
          id: id, // id
          title: title, // title
          icon: '../../../static/icon/app/app_stu_service.png', // 应用图标 任务栏显示
          content: finance,
          data: data // props
        })
      },
      layerOpen(app) {
        this.$layer.open({
          type: 2,
          id: app.id, // title
          title: app.title, // title
          shadeClose: false, // 点击遮罩关闭
          prohibit: this.$store.state.app.prohibit,
          tabIcon: app.icon, // 应用图标 任务栏显示
          shade: false, // 遮罩 默认不显示
          content: {
            content: app.content,
            parent: this, // 当前的vue对象
            data: app.data // props
          }
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
      width: 50px;
      height: 50px;
      border-radius: 10px;
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
