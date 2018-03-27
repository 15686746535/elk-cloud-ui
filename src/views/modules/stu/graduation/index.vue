<template>
  <div class="app-container calendar-list-container" :style="{height: client.height + 'px'}">
    <div v-show="showModule=='list'" style="height: 100%">
      <el-row :gutter="5">
        <el-col class="org-tree-left">
          <el-card>
            <span style="font-size: 16px;font-family: '微软雅黑 Light';color:rgb(145,145,145)">权限筛选</span>
            <org-tree @node-click="searchByOrg" ></org-tree>
          </el-card>
        </el-col>

        <el-col :style="{width: (client.width-250) + 'px'}">
          <el-card style="margin-bottom: 5px;height: 125px;line-height: 50px">
              <el-date-picker v-model="listQuery.interval" type="daterange" align="right" unlink-panels range-separator="—" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions">
              </el-date-picker>
              <el-select v-model="listQuery.subject" clearable placeholder="科目">
                <el-option
                  v-for="item in subject"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <dict v-model="listQuery.motorcycleType" dictType="dict_motorcycle_type" style="width: 200px;"  placeholder="车型"  ></dict>
              <dict v-model="listQuery.source" dictType="dict_enrolSite" style="width: 200px;"  placeholder="报名点"  ></dict>
              <Coach v-model="listQuery.fieldCoach" coachType="field" style="width: 200px;"  placeholder="场训教练"  ></Coach>
              <Coach v-model="listQuery.roadCoach" coachType="road" style="width: 200px;"  placeholder="路训教练"  ></Coach>
              <dict v-model="listQuery.source" dictType="dict_source" style="width: 200px;"  placeholder="来源渠道"  ></dict>
              <el-input @keyup.enter.native="searchClick" style="width: 200px;" class="filter-item" placeholder="姓名/电话/身份证" v-model="listQuery.condition"></el-input>
              <el-button class="filter-item" type="primary" v-waves icon="search" @click="searchClick">搜索</el-button>
              <!--<el-button class="filter-item" style="margin-left: 10px;" @click="create" type="primary" icon="plus">添加</el-button>-->
          </el-card>

          <el-card :style="{height: (client.height-170) + 'px'}">
              <el-table :data="stuList" :height="(client.height-260)" highlight-current-row @row-dblclick="editlist" v-loading="listLoading" element-loading-text="给我一点时间">
                <el-table-column align="center" label="头像" min-width="170px">
                  <template slot-scope="scope">
                    <!-- 头像 -->
                    <el-tag class="img">
                      <img :src="scope.row.avatar" class="img">
                    </el-tag>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="个人信息" min-width="230px">
                  <template slot-scope="scope" >
                    <!-- 个人信息 -->
                    <el-col style=" line-height: 25px">
                      <el-row style="margin: 12px 0;" :gutter="10">
                        <el-col :span="8" class="table_text">姓名：</el-col>
                        <el-col :span="16" style="color: #7c7c7c;text-align: left;font-size: 14px;">{{scope.row.name}}</el-col>
                      </el-row>
                      <el-row style="margin: 12px 0;" :gutter="10">
                        <el-col :span="8" class="table_text">手机号：</el-col>
                        <el-col :span="16" style="color: #7c7c7c;text-align: left;font-size: 14px;">{{scope.row.mobile}}</el-col>
                      </el-row>
                      <el-row style="margin: 12px 0;" :gutter="10">
                        <el-col :span="8" class="table_text">身份证：</el-col>
                        <el-col :span="16" style="color: #7c7c7c;text-align: left;font-size: 14px;">{{scope.row.idNumber}}</el-col>
                      </el-row>
                      <el-row style="margin: 12px 0;" :gutter="10">
                        <el-col :span="8" class="table_text">介绍人：</el-col>
                        <el-col :span="16" style="color: #7c7c7c;text-align: left;font-size: 14px;">{{scope.row.introducer}}</el-col>
                      </el-row>
                    </el-col>
                  </template>
                </el-table-column>

                <el-table-column align="center" label="入学信息" min-width="230px">
                  <template slot-scope="scope">
                    <el-col style=" line-height: 25px">
                      <el-row style="margin: 12px 0;" :gutter="10">
                        <el-col :span="8" class="table_text">档案号：</el-col>
                        <el-col :span="16" style="color: #7c7c7c;text-align: left;font-size: 14px;">{{scope.row.archivesNumber}}</el-col>
                      </el-row>
                      <el-row style="margin: 12px 0;" :gutter="10">
                        <el-col :span="8" class="table_text">入学日期：</el-col>
                        <el-col :span="16" style="color: #7c7c7c;text-align: left;font-size: 14px;">{{scope.row.enrolTime | parseTime('{y}-{m}-{d}')}}</el-col>
                      </el-row>
                      <el-row style="margin: 12px 0;" :gutter="10">
                        <el-col :span="8" class="table_text">期数：</el-col>
                        <el-col :span="16" style="color: #7c7c7c;text-align: left;font-size: 14px;">{{scope.row.periods}}</el-col>
                      </el-row>
                      <el-row style="margin: 12px 0;" :gutter="10">
                        <el-col :span="8" class="table_text">来源渠道：</el-col>
                        <el-col :span="16" style="color: #7c7c7c;text-align: left;font-size: 14px;">{{scope.row.source}}</el-col>
                      </el-row>
                    </el-col>
                  </template>
                </el-table-column>

                <el-table-column align="center" label="科目信息" min-width="200px">
                  <template slot-scope="scope">
                    <el-tag class="subject">
                      科目一：
                      <el-tag v-if="scope.row.state > 1" class="pass">已通过</el-tag>
                      <el-tag v-else class="noPass">未通过</el-tag>
                    </el-tag>
                    <el-tag class="subject">
                      科目二：
                      <el-tag v-if="scope.row.state > 2" class="pass">已通过</el-tag>
                      <el-tag v-else class="noPass">未通过</el-tag>
                    </el-tag>
                    <el-tag class="subject">
                      科目三：
                      <el-tag v-if="scope.row.state > 3" class="pass">已通过</el-tag>
                      <el-tag v-else class="noPass">未通过</el-tag>
                    </el-tag>
                    <el-tag class="subject">
                      科目四：
                      <el-tag v-if="scope.row.state > 4" class="pass">已通过</el-tag>
                      <el-tag v-else class="noPass">未通过</el-tag>
                    </el-tag>
                  </template>
                </el-table-column>

                <el-table-column align="center" label="培训信息" min-width="230px">
                  <template slot-scope="scope">
                    <el-col style=" line-height: 25px">
                      <el-row style="margin: 12px 0;" :gutter="10">
                        <el-col :span="8" class="table_text">车型：</el-col>
                        <el-col :span="16" style="color: #7c7c7c;text-align: left;font-size: 14px;">{{scope.row.motorcycleType}}</el-col>
                      </el-row>
                      <el-row style="margin: 12px 0;" :gutter="10">
                        <el-col :span="8" class="table_text">培训场地：</el-col>
                        <el-col :span="16" style="color: #7c7c7c;text-align: left;font-size: 14px;">{{scope.row.campus}}</el-col>
                      </el-row>
                      <el-row style="margin: 12px 0;" :gutter="10">
                        <el-col :span="8" class="table_text">报名点：</el-col>
                        <el-col :span="16" style="color: #7c7c7c;text-align: left;font-size: 14px;">{{scope.row.enrolSite}}</el-col>
                      </el-row>
                      <!--<el-row style="margin: 12px 0;" :gutter="10">-->
                        <!--<el-col :span="7" style="color: #7c7c7c;font-size: 16px;text-align: left;">来源渠道：</el-col>-->
                        <!--<el-col :span="17" style="color: #7c7c7c;text-align: left;font-size: 14px;">{{scope.row.source}}</el-col>-->
                      <!--</el-row>-->
                    </el-col>
                  </template>
                </el-table-column>



                <!--<el-table-column align="center" label="教练" min-width="240">-->
                  <!--<template slot-scope="scope">-->

                    <!--<el-tag class="cost">-->
                      <!--场训教练：{{scope.row.fieldCoachName}}-->
                    <!--</el-tag>-->
                    <!--<el-tag class="cost">-->
                      <!--路训教练：{{scope.row.roadCoachName}}-->
                    <!--</el-tag>-->

                  <!--</template>-->
                <!--</el-table-column>-->
                <!--<el-table-column align="center" label="费用信息" min-width="240">-->
                  <!--<template slot-scope="scope">-->

                    <!--<el-tag class="cost">-->
                      <!--学费：-->
                    <!--</el-tag>-->
                    <!--<el-tag class="cost">-->
                      <!--补考费：-->
                    <!--</el-tag>-->
                    <!--<el-tag class="cost">-->
                      <!--合场费：-->
                    <!--</el-tag>-->

                  <!--</template>-->
                <!--</el-table-column>-->
              </el-table>



              <div v-show="!listLoading" class="pagination-container" style="margin-top: 20px">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                               :current-page.sync="listQuery.page"
                               background
                               :page-sizes="[10,20,30,50]" :page-size="listQuery.limit"
                               layout="total, sizes, prev, pager, next, jumper" :total="total">
                </el-pagination>
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
      <el-row :style="{height: (client.height-105) + 'px'}">
        <el-col :style="{height: (client.height-105) + 'px',width: (client.width-570) + 'px'}">
          <el-tabs v-model="activeName" type="border-card" style="height: 100%;border-radius: 4px 0 0 4px;">
            <el-tab-pane label="最近信息" name="1">
            </el-tab-pane>
            <el-tab-pane label="科目情况" name="2">
            </el-tab-pane>
            <el-tab-pane label="费用情况" name="3">角色管理</el-tab-pane>
            <el-tab-pane label="来访跟进信息" name="4">定时任务补偿</el-tab-pane>
            <el-tab-pane label="约车日志" name="5">定时任务补偿</el-tab-pane>
          </el-tabs>
        </el-col>
        <el-col style="width: 570px"  :style="{height: (client.height-105) + 'px'}" >

          <el-card :style="{height: (client.height-105) + 'px'}" body-style="padding: 0;" style="border-bottom: none; border-radius:0 4px 4px 0;line-height: 50px;overflow-y: auto;">
            <!-- 基本信息 -->
            <el-row class="title">基本信息</el-row>
            <el-row style="height: 260px; padding: 0 10px;margin-top: 10px">
              <el-col :span="12">
                <!-- 档案号 -->
                <el-row style="height: 50px;">
                  <el-col :span="7"><span class="text_css">档案号：</span></el-col>
                  <el-col :span="17">
                    <el-input v-if="edit" style="width: 100%;" class="filter-item" placeholder="档案号" v-model.number="student.archivesNumber"></el-input>
                    <div style="padding-left: 16px;font-size: 12px;" v-else>{{student.archivesNumber}}</div>
                  </el-col>
                </el-row>

                <!-- 姓名 -->
                <el-row style="height: 50px;">
                  <el-col :span="7"><span class="text_css">姓名：</span></el-col>
                  <el-col :span="17">
                    <el-input v-if="edit" style="width: 100%;" class="filter-item" placeholder="姓名" v-model="student.name"></el-input>
                    <div style="padding-left: 16px;font-size: 12px;" v-else>{{student.name}}</div>
                  </el-col>
                </el-row>

                <!-- 身份证号 -->
                <el-row style="height: 50px;">
                  <el-col :span="7"><span class="text_css">身份证号：</span></el-col>
                  <el-col :span="17">
                    <el-input v-if="edit" style="width: 100%;" class="filter-item" placeholder="身份证号" :maxlength="18" @blur="generateInfo" v-model="student.idNumber"></el-input>
                    <div style="padding-left: 16px;font-size: 12px;" v-else>{{student.idNumber}}</div>
                  </el-col>
                </el-row>

                <!-- 性别 -->
                <el-row style="height: 50px;">
                  <el-col :span="7" ><div class="text_css">性别：</div></el-col>
                  <el-col :span="17" >
                    <template v-if="edit">
                      <el-radio v-model="student.sex" label="1">男</el-radio>
                      <el-radio v-model="student.sex" label="0">女</el-radio>
                    </template>
                    <div style="padding-left: 16px;font-size: 12px;" v-else>{{student.sex | sexFilter}}</div>
                  </el-col>
                </el-row>

                <!-- 生日 -->
                <el-row style="height: 50px;">
                  <el-col :span="7"><span class="text_css">生日：</span></el-col>
                  <el-col :span="17">
                    <el-date-picker v-if="edit" type="date" placeholder="生日"  style="width: 100%" v-model="student.birthday"></el-date-picker>
                    <div style="padding-left: 16px;font-size: 12px;" v-else>{{student.birthday | parseTime('{y}-{m}-{d}')}}</div>

                  </el-col>
                </el-row>

              </el-col>
              <el-col :span="12">
                <el-row>
                  <el-upload v-if="edit" style="width: 140px; margin: 5px auto 0" class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                    <img v-if="student.avatar" :src="student.avatar" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                  <img v-else :src="student.avatar" class="avatar_img">
                </el-row>
              </el-col>
            </el-row>


            <!-- 入学信息 -->
            <el-row class="title">入学信息</el-row>
            <el-row :gutter="10" style="height: 210px; padding: 0 10px;margin-top: 10px">
              <el-col :span="12">

                <!-- 入学日期 -->
                <el-row style="height: 50px">
                  <el-col :span="7"><span class="text_css">入学日期：</span></el-col>
                  <el-col :span="17">
                    <el-date-picker v-if="edit" type="date" placeholder="入学日期"  style="width: 100%" v-model="student.enrolTime"></el-date-picker>
                    <div style="padding-left: 16px;font-size: 12px;" v-else>{{student.enrolTime | parseTime('{y}-{m}-{d}')}}</div>
                  </el-col>
                </el-row>


                <!-- 入学期数 -->
                <el-row style="height: 50px">
                  <el-col :span="7"><span class="text_css">入学期数：</span></el-col>
                  <el-col :span="17">
                    <el-input v-if="edit" style="width: 100%;" class="filter-item" placeholder="入学期数" v-model.number="student.periods"></el-input>
                    <div style="padding-left: 16px;font-size: 12px;" v-else>{{student.periods}}</div>
                  </el-col>
                </el-row>

                <!-- 所学车型 -->
                <el-row style="height: 50px">
                  <el-col :span="7"><span class="text_css">所学车型：</span></el-col>
                  <el-col :span="17">
                    <dict v-if="edit" v-model="student.motorcycleType" dictType="dict_motorcycle_type" style="width: 100%;"  placeholder="所学车型"></dict>
                    <div style="padding-left: 16px;font-size: 12px;" v-else>{{student.motorcycleType}}</div>
                  </el-col>
                </el-row>

                <!-- 场训教练 -->
                <el-row style="height: 50px">
                  <el-col :span="7"><span class="text_css">场训教练：</span></el-col>
                  <el-col :span="17">
                    <Coach v-if="edit" v-model="student.fieldCoach" coachType="field" style="width: 100%;"  placeholder="场训教练" @selectCoach="getFieldCoach" ></Coach>
                    <div style="padding-left: 16px;font-size: 12px;" v-else>{{student.fieldCoachName}}</div>
                  </el-col>
                </el-row>

              </el-col>
              <el-col :span="12">

                <!-- 校区 -->
                <el-row style="height: 50px;">
                  <el-col :span="7"><span class="text_css">校区：</span></el-col>
                  <el-col :span="17">
                    <dict v-if="edit" dictType="dict_campus" v-model="student.campus" style="width: 100%;"  placeholder="校区"></dict>
                    <div style="padding-left: 16px;font-size: 12px;" v-else>{{student.campus}}</div>
                  </el-col>
                </el-row>


                <!-- 来源渠道 -->
                <el-row style="height: 50px;">
                  <el-col :span="7"><span class="text_css">来源渠道：</span></el-col>
                  <el-col :span="17">
                    <dict v-if="edit" dictType="dict_source" v-model="student.source" style="width: 100%;"  placeholder="来源渠道"></dict>
                    <div style="padding-left: 16px;font-size: 12px;" v-else>{{student.source}}</div>
                  </el-col>
                </el-row>

                <!-- 报名点 -->
                <el-row style="height: 50px">
                  <el-col :span="7"><span class="text_css">报名点：</span></el-col>
                  <el-col :span="17">
                    <dict v-if="edit" v-model="student.enrolSite" dictType="dict_enrolSite" style="width: 100%;"  placeholder="报名点"></dict>
                    <div style="padding-left: 16px;font-size: 12px;" v-else>{{student.enrolSite}}</div>
                  </el-col>
                </el-row>

                <!-- 路训教练 -->
                <el-row style="height: 50px">
                  <el-col :span="7"><span class="text_css">路训教练：</span></el-col>
                  <el-col :span="17">
                    <Coach v-if="edit" v-model="student.roadCoach" coachType="road" style="width: 100%;"  placeholder="路训教练"  @selectCoach="getRoadCoach"></Coach>
                    <div style="padding-left: 16px;font-size: 12px;" v-else>{{student.roadCoachName}}</div>
                  </el-col>
                </el-row>

              </el-col>
            </el-row>


            <!-- 联系信息 -->
            <el-row class="title">联系信息</el-row>
            <el-row :gutter="10" style="height: 110px; padding: 0 10px;margin-top: 10px">
              <el-col :span="12">

                <!-- 联系电话 -->
                <el-row style="height: 50px">
                  <el-col :span="7"><span class="text_css">联系电话：</span></el-col>
                  <el-col :span="17">
                    <el-input v-if="edit" style="width: 100%;" class="filter-item" placeholder="联系电话" :maxlength="11" v-model.number="student.mobile"></el-input>
                    <div style="padding-left: 16px;font-size: 12px;" v-else>{{student.mobile}}</div>
                  </el-col>
                </el-row>

                <!-- 电子邮箱 -->
                <el-row style="height: 50px">
                  <el-col :span="7"><span class="text_css">电子邮箱：</span></el-col>
                  <el-col :span="17">
                    <el-input v-if="edit" style="width: 100%;" class="filter-item" placeholder="电子邮箱" v-model.number="student.email"></el-input>
                    <div style="padding-left: 16px;font-size: 12px;" v-else>{{student.email}}</div>
                  </el-col>
                </el-row>

              </el-col>
              <el-col :span="12">
                <!-- 微信 -->
                <el-row style="height: 50px">
                  <el-col :span="7"><span class="text_css">微信：</span></el-col>
                  <el-col :span="17">
                    <el-input v-if="edit" style="width: 100%;" class="filter-item" placeholder="微信" v-model.number="student.wechat"></el-input>
                    <div style="padding-left: 16px;font-size: 12px;" v-else>{{student.wechat}}</div>
                  </el-col>
                </el-row>

                <!-- 所属职位 -->
                <el-row style="height: 50px">
                  <el-col :span="7"><span class="text_css">所属职位：</span></el-col>
                  <el-col :span="17">
                    <el-input v-if="edit" style="width: 100%;" class="filter-item" placeholder="所属职位" v-model.number="student.position"></el-input>
                    <div style="padding-left: 16px;font-size: 12px;" v-else>{{student.position}}</div>
                  </el-col>
                </el-row>

              </el-col>
            </el-row>

            <!-- 所属单位 -->
            <el-row style="height: 50px;margin: 0 5px">
              <el-col :span="4"><span class="text_css">所属单位：</span></el-col>
              <el-col :span="17">
                <el-input v-if="edit" style="width: 100%;" class="filter-item" placeholder="所属单位" v-model.number="student.company"></el-input>
                <div style="padding-left: 16px;font-size: 12px;" v-else>{{student.company}}</div>
              </el-col>
            </el-row>


            <!-- 联系地址 -->
            <el-row style="height: 50px;margin: 0 5px">
              <el-col :span="4"><span class="text_css">联系地址：</span></el-col>
              <el-col :span="17">
                <el-input v-if="edit" style="width: 100%;" class="filter-item" placeholder="联系地址" v-model.number="student.contactAddress"></el-input>
                <div style="padding-left: 16px;font-size: 12px;" v-else>{{student.contactAddress}}</div>
              </el-col>
            </el-row>



            <!-- 费用信息 -->
            <el-row class="title">费用信息</el-row>




          </el-card>

          <!--<el-card body-style="padding: 0;" style="height:60px; border-radius:0 0 4px 0;border-top: none;border-top: 1px solid #dcdfe6;">
            <div v-if="edit && !addInfo" style="width: 163px;margin: 10px auto">
              <el-button type="danger" plain  @click="cancel">取 消</el-button>
              <el-button type="primary" @click="update">修 改</el-button>
            </div>
            <div v-if="edit && addInfo" style="width: 80px;margin: 10px auto">
              <el-button type="primary" @click="add">保 存</el-button>
            </div>
            <div v-else style="width: 163px;margin: 10px auto">
              <el-button type="success">预 约</el-button>
              <el-button type="primary" @click="editInfo">编 辑</el-button>
            </div>

          </el-card>-->

        </el-col>
      </el-row>
    </div>



  </div>
</template>

<script>
  import { fetchList, getObj, addObj, putObj } from '@/api/student/student'
  import { examFetchList, getExam } from '@/api/student/examnote'
  import OrgSelect from '@/components/OrgSelect'
  import OrgTree from '@/components/OrgTree'
  import Coach from '@/components/Coach'
  import Dict from '@/components/Dict'
  import waves from '@/directive/waves/index.js' // 水波纹指令
  import { removeAllSpace } from '@/utils/validate'
  import { mapGetters } from 'vuex'
  export default {
    name: 'table_student',
    components: {
      OrgTree,
      Dict,
      OrgSelect,
      Coach
    },
    directives: {
      waves
    },
    data() {
      return {
        student: {},
        stuList: [],
        total: 1,
        listLoading: true,
        showModule: 'list',
        addInfo: false,
        listQuery: {
          page: 1,
          limit: 20,
          condition: null,
          interval: [],
          subject: 5,
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
        subject: [{
          value: 5,
          label: '已毕业'
        }, {
          value: -1,
          label: '已退学'
        }],
        studentEntity: {}
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
      // 根据部门id查询员工
      searchByOrg(data) {
        console.log('=====================   根据部门id查询学员信息   =======================')
        this.listQuery.page = 1
        this.listQuery.orgId = data.id
        this.getList()
      },
      // 字典
      getDict(val) {
      },
      // 双击行  编辑
      editlist(val) {
        console.log('====================== 正在进入单个学员编辑 =====================')
        getObj(val.studentId).then(response => {
          console.log(response.data.data)
          this.student = response.data.data
        })
        examFetchList({ studentId: val.studentId, examState: 'exam_note_true' }).then(response => {
          console.log('====================== getExam =====================')
          console.log(response.data)
          console.log('====================== getExam =====================')
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
      add() {
        addObj(this.studentEntity).then(response => {
          this.$notify({
            title: '成功',
            message: '创建成功',
            type: 'success',
            duration: 2000
          })
          this.backClick()
        })
      },
      // 新增
      create() {
        this.student = {}
        this.showModule = 'create'
        this.edit = true
        this.addInfo = true
      },
      // 修改
      update() {
        putObj(this.student).then(response => {
          this.$notify({
            title: '成功',
            message: '修改成功',
            type: 'success',
            duration: 2000
          })
          this.edit = false
        })
      },
      // 搜索
      searchClick() {
        this.listQuery.page = 1
        console.log('============== 搜索方法 ===============')
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
        this.editlist(this.student)
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
        if (this.student.idNumber.length === 18) {
          this.student.birthday = this.student.idNumber.substring(6, 10) + '-' + this.student.idNumber.substring(10, 12) + '-' + this.student.idNumber.substring(12, 14)
          this.student.sex = this.student.idNumber.substr(16, 1) % 2
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
        if (this.studentEntity.idNumber.length === 18) {
          this.studentEntity.birthday = this.studentEntity.idNumber.substring(6, 10) + '-' + this.studentEntity.idNumber.substring(10, 12) + '-' + this.studentEntity.idNumber.substring(12, 14)
          if (this.studentEntity.idNumber.substr(16, 1) % 2 === 1) this.studentEntity.sex = '1'
          if (this.studentEntity.idNumber.substr(16, 1) % 2 === 0) this.studentEntity.sex = '0'
        }
      },
      reset() {
        this.studentEntity = {}
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
        console.log(this.listQuery.interval)
        console.log(this.listQuery.beginTime)
        console.log(this.listQuery.endTime)
        console.log('=============  完成 ================')
      }
    }
  }
</script>

<style>

  .img{
    width: 150px;
    height: 150px;
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
  .image {
    max-width: 200px;
    max-height: 200px;
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
    width: 200px;
    height: 230px;
    line-height: 230px;
    text-align: center;
  }
  .AddAvatar {
    width: 200px;
    height: 230px;
    display: block;
  }
</style>
