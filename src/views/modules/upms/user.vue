<template>
  <div style="height: 100%">
    <div v-show="showModule=='list'"  style="height: 100%">
      <el-card style="height: 100%" >
        <div style="height: 80px;border-bottom: 1px solid #ccc;">
          <div class="filter-container" style="float: left;line-height: 40px">
            |&nbsp;<span style="font-size: 20px;font-weight: 600;font-family: '微软雅黑 Light'">同事列表</span>
          </div>
          <div style="float: right">
            <tree-select url="/upms/org/tree" id="serch" v-model="listQuery.orgId" style="width: 150px;float: left;margin-right: 5px;" placeholder="所属部门"></tree-select>
            <el-date-picker v-model="listQuery.joinedTime" type="date" style="width: 150px;" placeholder="选择入职日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd"> </el-date-picker>
            <el-input @keyup.enter.native="searchClick" style="width: 150px;" class="filter-item" placeholder="姓名/电话/身份证" v-model="listQuery.condition"></el-input>
            <el-button class="filter-item" type="primary"  @click="searchClick"><i class="el-icon-search"></i> 搜 索</el-button>
          </div>
        </div>

        <!-- 身份卡循环 -->
        <el-table :data="userList" :height="(tableHeight-220)" highlight-current-row @row-dblclick="doubleClickRow"  v-loading="listLoading" element-loading-text="给我一点时间">
          <!--<el-table-column type="index" label="序号"  align="center" width="50"></el-table-column>-->
          <el-table-column align="center" label="" width="100">
            <template slot-scope="scope">
              <!-- 头像 -->
              <el-row>
                <el-tag class="img">
                  <img :src="scope.row.avatar" class="img">
                </el-tag>
              </el-row>
              <el-row>
                <el-col style="color: #7c7c7c;text-align: center;font-size: 14px;font-weight: 600;">{{scope.row.jobNumber}}</el-col>
              </el-row>
            </template>
          </el-table-column>
          <el-table-column align="left" label="" min-width="85px">
            <template slot-scope="scope" >
              <!-- 个人信息 -->
              <el-col style="line-height: 25px">
                <el-row>
                  <el-col class="table_text">姓名：<saan style="font-weight: 600;">{{scope.row.name}}</saan></el-col>
                </el-row>
                <el-row :gutter="10">
                  <el-col class="table_text">性别：{{scope.row.sex | sexFilter}}</el-col>
                </el-row>
                <el-row :gutter="10">
                  <el-col class="table_text">生日：{{scope.row.birthday | subTime}}</el-col>
                </el-row>
                <el-row :gutter="10">
                  <el-col class="table_text">身份证：{{scope.row.idNumber}}</el-col>
                </el-row>
              </el-col>
            </template>
          </el-table-column>

          <el-table-column align="center" label="" min-width="110px">
            <template slot-scope="scope" >
              <!-- 个人信息 -->
              <el-col style="line-height: 25px">
                <el-row>
                  <el-col class="table_text">手机号：{{scope.row.mobile}}</el-col>
                </el-row>
                <el-row>
                  <el-col class="table_text">微信：{{scope.row.wechat}}</el-col>
                </el-row>
                <el-row >
                  <el-col class="table_text">QQ：{{scope.row.qq }}</el-col>
                </el-row>
                <el-row >
                  <el-col class="table_text" :title="scope.row.contactAddress">联系地址：{{scope.row.contactAddress}}</el-col>
                </el-row>
              </el-col>
            </template>
          </el-table-column>

          <el-table-column align="center" label="" min-width="150px">
            <template slot-scope="scope" >
              <!-- 个人信息 -->
              <el-col style="line-height: 25px">
                <el-row >
                  <el-col class="table_text">工作电话：{{scope.row.workMobile}}</el-col>
                </el-row>
                <el-row >
                  <el-col  class="table_text">所属职位：{{scope.row.roles}}</el-col>
                </el-row>
                <el-row >
                  <el-col class="table_text">入职日期：{{scope.row.joinedTime | subTime}}</el-col>
                </el-row>
                <el-row >
                  <el-col class="table_text">转正日期：{{scope.row.positiveTime | subTime}}</el-col>
                </el-row>
              </el-col>
            </template>
          </el-table-column>
        </el-table>

        <div v-show="!listLoading" class="pagination-container" style="margin-top: 20px">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                         :current-page.sync="listQuery.page"
                         background
                         style="float: left"
                         size="mini"
                         :page-sizes="[10,20,30,50]" :page-size="listQuery.limit"
                         layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>
          <div style="float: right" >
            <el-button size="small" :loading="expLoading"  @click="exportUser" type="info" v-if="permissions.upms_user_export"><i class="el-icon-download"></i> 导 出</el-button>
            <el-button size="small" @click="create" type="primary" v-if="permissions.upms_user_add"><i class="el-icon-plus"></i> 添 加</el-button>
          </div>
        </div>
      </el-card>
    </div>
    <div v-show="showModule=='info'">
      <el-card>
        <div slot="header" class="clearfix">
          <div style="float: left">
            |&nbsp;<span style="font-size: 16px;font-weight: 600;line-height:29px;font-family: '微软雅黑 Light'">同事信息</span>
          </div>
          <div style="float: right">
            <el-button type="primary" size="mini" @click="back"><i class="el-icon-back"></i> 返 回</el-button>
          </div>
        </div>

        <el-form :model="userEntity" :rules="userEntityRules" ref="userEntity" label-width="80px" size="mini">

          <el-row :gutter="5">
            <el-col :span="14">
              <el-row>
                <el-card body-style="padding:15px 15px 0 15px;"  v-loading="infoLoading" element-loading-text="转圈圈加载中~" shadow="hover">
                  <el-row>
                    <el-col :span="6">
                      <el-upload :disabled="!edit"  class="avatar-uploader" action="/oss/upload" name="file"
                                 accept=".png,.jpg" :show-file-list="false" :headers="headers"
                                  :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                        <img :src="userEntity.avatar" class="avatar">
                      </el-upload>
                    </el-col>
                    <el-col :span="18">

                      <el-row :gutter="10" style="height: 50px">
                        <el-col :span="12">
                          <el-form-item prop="jobNumber">
                            <span slot="label" class="text_css">工号:</span>
                            <el-input v-if="edit"  v-model="userEntity.jobNumber" placeholder="工号"></el-input>
                            <span style="padding-left: 16px;font-size: 12px;" v-else>{{userEntity.jobNumber}}</span>
                          </el-form-item>
                        </el-col>

                        <el-col :span="12">
                          <el-form-item prop="idNumber">
                            <span slot="label" class="text_css">身份证:</span>
                            <el-input v-if="edit" @blur="generateInfo" :maxlength="18"  @keyup.enter.native="generateInfo" v-model="userEntity.idNumber" placeholder="身份证号"></el-input>
                            <span style="padding-left: 16px;font-size: 12px;" v-else>{{userEntity.idNumber}}</span>
                          </el-form-item>
                        </el-col>
                      </el-row>

                      <el-row :gutter="10" style="height: 50px">
                        <el-col :span="12">
                          <el-form-item prop="name">
                            <span slot="label" class="text_css">姓名:</span>
                            <el-input v-if="edit"  v-model="userEntity.name" placeholder="员工姓名"></el-input>
                            <span style="padding-left: 16px;font-size: 12px;" v-else>{{userEntity.name}}</span>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item prop="sex">
                            <span slot="label" class="text_css">性别:</span>
                            <el-radio-group v-if="edit" v-model="userEntity.sex">
                              <el-radio label="1">男</el-radio>
                              <el-radio label="0">女</el-radio>
                            </el-radio-group>
                            <span style="padding-left: 16px;font-size: 12px;" v-else>{{userEntity.sex | sexFilter}}</span>
                          </el-form-item>
                        </el-col>
                      </el-row>

                      <el-row :gutter="10"style="height: 50px">
                        <el-col :span="12">
                          <el-form-item prop="birthday">
                            <span slot="label" class="text_css">生日:</span>
                            <el-date-picker value-format="timestamp"  v-if="edit" type="date" placeholder="生日"  style="width: 100%" v-model="userEntity.birthday"></el-date-picker>
                            <span style="padding-left: 16px;font-size: 12px;" v-else>{{userEntity.birthday | subTime}}</span>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">

                          <el-form-item prop="mobile">
                            <span slot="label" class="text_css">联系电话:</span>
                            <el-input v-if="edit"  v-model="userEntity.mobile" placeholder="联系电话"></el-input>
                            <span style="padding-left: 16px;font-size: 12px;" v-else>{{userEntity.mobile}}</span>
                          </el-form-item>


                        </el-col>
                      </el-row>

                    </el-col>
                  </el-row>
                </el-card>
              </el-row>
              <el-row>
                <el-card shadow="hover" style="margin-top: 5px;">
                  <el-card body-style="padding:10px;" :style="{height: (tableHeight-423) + 'px'}" shadow="never" style="border: none;min-height: 350px;" >
                    <el-row :gutter="10" style="height: 50px">
                      <el-col :span="8">

                        <el-form-item prop="workMobile">
                          <span slot="label" class="text_css">工作电话:</span>
                          <el-input v-if="edit"  v-model="userEntity.workMobile" placeholder="工作电话" ></el-input>
                          <span style="padding-left: 16px;font-size: 12px;" v-else>{{userEntity.workMobile}}</span>
                        </el-form-item>

                      </el-col>

                      <el-col :span="8">

                        <el-form-item prop="wechat">
                          <span slot="label" class="text_css">微信:</span>
                          <el-input v-if="edit"  v-model="userEntity.wechat" placeholder="微信" ></el-input>
                          <span style="padding-left: 16px;font-size: 12px;" v-else>{{userEntity.wechat}}</span>
                        </el-form-item>

                      </el-col>

                      <el-col :span="8">

                        <el-form-item prop="contactAddress">
                          <span slot="label" class="text_css">联系地址:</span>
                          <el-input v-if="edit"  v-model="userEntity.contactAddress" placeholder="联系地址"></el-input>
                          <span style="padding-left: 16px;font-size: 12px;" v-else>{{userEntity.contactAddress}}</span>
                        </el-form-item>

                      </el-col>
                    </el-row>

                    <el-row :gutter="10" style="height: 50px">
                      <el-col :span="8">

                        <el-form-item prop="orgId">
                          <span slot="label" class="text_css">所属部门:</span>
                          <tree-select height="28px" style="font-size: 12px" v-show="edit" url="/upms/org/tree" v-model="userEntity.orgId" placeholder="所属部门"></tree-select>
                          <span style="padding-left: 16px;font-size: 12px;" v-show="!edit" >{{userEntity.orgName}}</span>
                        </el-form-item>

                      </el-col>

                      <el-col :span="8">

                        <el-form-item prop="roleIdList">
                          <span slot="label" class="text_css">职位:</span>
                          <el-select v-show="edit" v-model="userEntity.roleIdList" collapse-tags style="width: 100%" multiple placeholder="请选择职位">
                            <el-option v-for="role in roleList" :key="role.roleId" :label="role.roleName" :value="role.roleId">
                            </el-option>
                          </el-select>
                          <span style="padding-left: 16px;font-size: 12px;" v-show="!edit">
                          <span v-for="(roleName,index) in userEntity.roleNameList" >{{roleName}}<span v-if="userEntity.roleNameList.length !== (user+1)">、</span></span>
                        </span>
                        </el-form-item>

                      </el-col>

                      <el-col :span="8">

                        <el-form-item prop="homeAddress">
                          <span slot="label" class="text_css">家庭住址:</span>
                          <el-input v-if="edit"  v-model="userEntity.homeAddress" placeholder="家庭住址"></el-input>
                          <span style="padding-left: 16px;font-size: 12px;" v-else>{{userEntity.homeAddress}}</span>
                        </el-form-item>

                      </el-col>
                    </el-row>

                    <el-row :gutter="10" style="height: 50px">
                      <el-col :span="8">

                        <el-form-item prop="education">
                          <span slot="label" class="text_css">学历:</span>
                          <el-input v-if="edit"  v-model="userEntity.education" placeholder="学历" ></el-input>
                          <span style="padding-left: 16px;font-size: 12px;" v-else>{{userEntity.education}}</span>
                        </el-form-item>

                      </el-col>

                      <el-col :span="8">

                        <el-form-item prop="major">
                          <span slot="label" class="text_css">专业:</span>
                          <el-input v-if="edit"  v-model="userEntity.major" placeholder="专业" ></el-input>
                          <span style="padding-left: 16px;font-size: 12px;" v-else>{{userEntity.major}}</span>
                        </el-form-item>

                      </el-col>

                      <el-col :span="8">

                        <el-form-item prop="qq">
                          <span slot="label" class="text_css">QQ:</span>
                          <el-input v-if="edit"  v-model="userEntity.qq" placeholder="QQ" ></el-input>
                          <span style="padding-left: 16px;font-size: 12px;" v-else>{{userEntity.qq}}</span>
                        </el-form-item>

                      </el-col>
                    </el-row>

                    <el-row :gutter="10" style="height: 50px">
                      <el-col :span="8">


                        <el-form-item prop="joinedTime">
                          <span slot="label" class="text_css">入职日期:</span>
                          <el-date-picker value-format="timestamp" v-if="edit" type="date" placeholder="入职日期"  style="width: 100%" v-model="userEntity.joinedTime"></el-date-picker>
                          <span style="padding-left: 16px;font-size: 12px;" v-else>{{userEntity.joinedTime | subTime}}</span>
                        </el-form-item>

                      </el-col>

                      <el-col :span="8">

                        <el-form-item prop="positiveTime">
                          <span slot="label" class="text_css">转正日期:</span>
                          <el-date-picker value-format="timestamp"  v-if="edit" type="date" placeholder="转正日期"  style="width: 100%" v-model="userEntity.positiveTime"></el-date-picker>
                          <span style="padding-left: 16px;font-size: 12px;" v-else>{{userEntity.positiveTime | subTime}}</span>
                        </el-form-item>

                      </el-col>

                      <el-col :span="8">

                        <el-form-item prop="email">
                          <span slot="label" class="text_css">E-mail:</span>
                          <el-input v-if="edit"  v-model="userEntity.email" placeholder="E-mail"></el-input>
                          <span style="padding-left: 16px;font-size: 12px;" v-else>{{userEntity.email}}</span>
                        </el-form-item>

                      </el-col>
                    </el-row>


                    <el-row :gutter="10" style="height: 50px">
                      <el-col :span="8">

                        <el-form-item  prop="emergencyContact">
                          <span slot="label" class="text_css">紧急联系人:</span>
                          <el-input v-if="edit"  v-model="userEntity.emergencyContact" placeholder="紧急联系人" ></el-input>
                          <span style="padding-left: 16px;font-size: 12px;" v-else>{{userEntity.emergencyContact}}</span>
                        </el-form-item>

                      </el-col>

                      <el-col :span="8">

                        <el-form-item  prop="emergencyMobile">
                          <span slot="label" class="text_css">紧急电话:</span>
                          <el-input v-if="edit"  v-model="userEntity.emergencyMobile" placeholder="紧急联系人电话" ></el-input>
                          <span style="padding-left: 16px;font-size: 12px;" v-else>{{userEntity.emergencyMobile}}</span>
                        </el-form-item>

                      </el-col>

                      <el-col :span="8">

                        <el-form-item prop="fiveInsuranceTime">
                          <span slot="label" class="text_css">五险购买:</span>
                          <el-date-picker value-format="timestamp"  v-if="edit" type="date" placeholder="五险购买时间"  style="width: 100%" v-model="userEntity.fiveInsuranceTime"></el-date-picker>
                          <span style="padding-left: 16px;font-size: 12px;" v-else>{{userEntity.fiveInsuranceTime | subTime}}</span>
                        </el-form-item>

                      </el-col>
                    </el-row>

                    <el-row :gutter="10" style="height: 50px">

                      <el-col :span="8">

                        <el-form-item prop="providentFundTime">
                          <span slot="label" class="text_css">公积金购买:</span>
                          <el-date-picker value-format="timestamp"  v-if="edit" type="date" placeholder="公积金购买时间"  style="width: 100%" v-model="userEntity.providentFundTime"></el-date-picker>
                          <span style="padding-left: 16px;font-size: 12px;" v-else>{{userEntity.providentFundTime | subTime}}</span>
                        </el-form-item>

                      </el-col>
                      <el-col :span="8">

                        <el-form-item prop="major">
                          <span slot="label" class="text_css">介绍人:</span>
                          <el-input v-if="edit"  v-model="userEntity.introducer" placeholder="介绍人" ></el-input>
                          <span style="padding-left: 16px;font-size: 12px;" v-else>{{userEntity.introducer}}</span>
                        </el-form-item>

                      </el-col>
                    </el-row>

                    <el-row :gutter="20" style="height: 50px">
                      <el-col :span="24">

                        <el-form-item prop="fiveInsuranceTime">
                          <span slot="label" class="text_css">是否教练:</span>
                          <el-radio-group  v-if="edit"  v-model="userEntity.iscoach">
                            <el-radio label="0">不是</el-radio>
                            <el-radio label="16">场训</el-radio>
                            <el-radio label="32">路训</el-radio>
                            <el-radio label="48">场训&路训</el-radio>
                          </el-radio-group>
                          <span style="padding-left: 16px;font-size: 12px;" v-else>{{userEntity.iscoach | isCoachFilter}}</span>
                        </el-form-item>

                      </el-col>

                    </el-row>
                    <el-row :gutter="20" style="height: 50px">
                      <el-col :span="24">

                        <el-form-item label-width="120px" prop="remark">
                          <span slot="label" class="text_css">备注:</span>
                          <el-input  v-if="edit"  type="textarea" v-model="userEntity.remark" :autosize="{ minRows: 4, maxRows: 4}" placeholder="备注"></el-input>
                          <span style="padding-left: 16px;font-size: 12px;" v-else>{{userEntity.remark}}</span>
                        </el-form-item>

                      </el-col>

                    </el-row>

                  </el-card>
                  <el-card shadow="never" body-style="padding:0;" style="border: none;">
                    <el-row v-if="edit">
                      <div style="float: right;" >
                        <el-button v-if="addInfo" size="mini" type="success"  @click="add('userEntity')"><i class="el-icon-fa-save"></i> 保存</el-button>
                        <el-button v-if="!addInfo" size="mini" type="info" @click="cancel('userEntity')"><i class="el-icon-close"></i> 取消</el-button>
                        <el-button v-if="!addInfo" size="mini" type="success" @click="update('userEntity')" ><i class="el-icon-fa-save"></i> 保存</el-button>
                      </div>
                    </el-row>


                    <el-row v-else>
                      <div style="float: left">
                        <el-button type="danger" size="mini" @click="quit(userEntity.userId)" v-if="permissions.upms_user_del"><i class="el-icon-circle-close-outline"></i>办理离职</el-button>
                        <el-button type="danger" size="mini" @click="rePassword(userEntity.userId)" v-if="permissions.upms_user_rePassword"><i class="el-icon-refresh"></i>重置密码</el-button>
                      </div>
                      <div style="float: right;" >
                        <el-button type="primary" size="mini" @click="editInfo" v-if="permissions.upms_user_update" ><i class="el-icon-edit"></i> 编 辑</el-button>
                      </div>
                    </el-row>
                  </el-card>
                </el-card>
              </el-row>
            </el-col>

            <el-col :span="10">
              <el-row>
                <el-card shadow="hover" body-style="padding:0" :style="{height: (tableHeight-150) + 'px'}" style="min-height: 633px;">
                <!--<el-card shadow="hover" body-style="padding:0"  :style="{height: (tableHeight-510) + 'px'}" style="min-height: 300px;">-->
                  <div style="height: 40px;width: 100%;background-color: rgb(245, 247, 250);border-bottom:1px solid rgb(235, 239, 245)">
                    <div style="background-color: #ffffff;width: 100px;height: 40px;line-height: 40px;color: #409eff;font-size: 14px;text-align: center;border-right:1px solid rgb(235, 239, 245)">
                      招生信息
                    </div>
                  </div>

                  <el-table :data="studentList" v-loading="studentListLoading" :height="tableHeight-192" element-loading-text="给我一点时间" border fit highlight-current-row style="width: 100%;min-height: 633px;">
                    <el-table-column type="index" align="center" label="编号" width="50">
                    </el-table-column>
                    <el-table-column align="center" label="姓名">
                      <template slot-scope="scope">
                        <span>{{ scope.row.name}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column align="center" label="电话">
                      <template slot-scope="scope">
                        <span>{{ scope.row.mobile}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column align="center" label="入学日期">
                      <template slot-scope="scope">
                        <span>{{ scope.row.enrolTime | subTime}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column align="center" label="车型" width="50">
                      <template slot-scope="scope">
                        <span>{{ scope.row.motorcycleType}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column align="center" label="状态" width="70">
                      <template slot-scope="scope">
                        <span>{{ scope.row.state | subjectFilter}}</span>
                      </template>
                    </el-table-column>
                  </el-table>


                </el-card>
              </el-row>

              <!--  操作日志  -->

              <!--<el-row>-->
                <!--<el-card shadow="hover" body-style="padding:0"  :style="{height: (tableHeight-510) + 'px'}" style="min-height: 300px;margin-top: 5px">-->
                  <!--<div style="height: 40px;width: 100%;background-color: rgb(245, 247, 250);border-bottom:1px solid rgb(235, 239, 245)">-->
                    <!--<div style="background-color: #ffffff;width: 100px;height: 40px;line-height: 40px;color: #409eff;font-size: 14px;text-align: center;border-right:1px solid rgb(235, 239, 245)">-->
                      <!--操作日志-->
                    <!--</div>-->
                  <!--</div>-->



                <!--</el-card>-->
              <!--</el-row>-->
            </el-col>

          </el-row>

        </el-form>

      </el-card>

    </div>
  </div>


</template>
<script>
  import { mapGetters } from 'vuex'
  import { roleList } from '@/api/upms/role'
  import { queryEnrollStudents } from '@/api/student/student'
  import { removeAllSpace } from '@/utils/validate'
  import { autoProduce } from '@/utils/index'
  import Bar from '@/components/Bar'
  import LineChart from '@/components/LineChart'
  import { fetchList, addObj, putObj, getObj, rePassword, quit, findUserByCondition, exportUser } from '@/api/upms/user'
  import { getToken } from '@/utils/auth'

  export default {
    name: 'user-list',
    props: {
      area: Array
    },
    watch: {
      area: function(val) {
        this.tableHeight = val[1]
      },
      'listQuery.joinedTime': function(val) {
        if (!val || val === '') {
          this.listQuery.joinedTime = null
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
    components: {
      Bar,
      LineChart
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
        if (this.addInfo) {
          findUserByCondition({ 'condition': value }).then(response => {
            if (response.data.data) {
              callback(new Error('身份证号码已存在'))
            } else {
              callback()
            }
          })
        } else {
          callback()
        }
      }
      var mobileIsExistence = (rule, value, callback) => {
        if (this.addInfo) {
          findUserByCondition({ 'condition': value }).then(response => {
            if (response.data.data) {
              callback(new Error('电话号码已存在'))
            } else {
              callback()
            }
          })
        } else {
          callback()
        }
      }
      var roleListReg = (rule, value, callback) => {
        if (value.length > 0) {
          callback()
        } else {
          callback(new Error('请选择职位'))
        }
      }
      return {
        tableHeight: this.area[1],
        // 编辑标记
        edit: false,
        // 模块标记
        showModule: 'list',
        // 员工集合
        userList: [],
        // 总条数
        total: 1,
        listLoading: true,
        infoLoading: false,
        expLoading: false,
        studentListLoading: false,
        // 分页数据
        listQuery: {
          page: 1,
          limit: 20,
          orgId: null,
          joinedTime: null,
          quit: '0',
          condition: null
        },
        studentListQuery: {
          page: 1,
          limit: 0,
          userIds: null,
          condition: null
        },
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        userEntity: {
          avatar: 'http://p84u3sabi.bkt.clouddn.com/elk/20180504/870ffb6238ad4b569c7b7a2f7daf1013.jpg',
          jobNumber: null,
          idNumber: null,
          name: null,
          sex: null,
          birthday: null,
          mobile: null,
          wechat: null,
          contactAddress: null,
          orgId: null,
          orgName: null,
          roleIdList: [],
          roleName: null,
          homeAddress: null,
          education: null,
          major: null,
          qq: null,
          joinedTime: null,
          positiveTime: null,
          email: null,
          introducer: null,
          emergencyContact: null,
          emergencyMobile: null,
          fiveInsuranceTime: null,
          providentFundTime: null,
          iscoach: null,
          workMobile: null
        },
        // 添加 标记
        addInfo: false,
        roleList: [],
        studentList: [],
        userEntityRules: {
          mobile: [
            { required: true, message: '请输入手机号', trigger: ['blur', 'change'] },
            { pattern: /^1[23456789]\d{9}$/, message: '请输入正确的手机号码', trigger: ['blur', 'change'] },
            { validator: mobileIsExistence, trigger: ['blur'] }
          ],
          iscoach: [
            { required: true, message: '请选择是否教练', trigger: ['blur', 'change'] }
          ],
          idNumber: [
            { required: true, message: '请输入身份证', trigger: ['blur', 'change'] },
            { validator: idNumberReg, trigger: ['blur', 'change'] },
            { validator: idNumberIsExistence, trigger: ['blur'] }
          ],
          jobNumber: [
            { required: true, message: '请输入档案号', trigger: ['blur', 'change'] }
          ],
          email: [
            { required: false, message: '请输入邮箱', trigger: ['blur', 'change'] },
            { pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, message: '请输入正确的邮箱', trigger: ['blur', 'change'] }
          ],
          name: [
            { required: true, message: '请输入姓名', trigger: ['blur', 'change'] }
          ],
          sex: [
            { required: true, message: '请选择性别', trigger: ['blur', 'change'] }
          ],
          birthday: [
            { required: true, message: '请选择生日', trigger: ['blur', 'change'] }
          ],
          wechat: [
            { required: false, message: '请输入微信', trigger: ['blur', 'change'] }
          ],
          contactAddress: [
            { required: true, message: '请输入联系地址', trigger: ['blur', 'change'] }
          ],
          orgId: [
            { required: true, message: '请选择部门', trigger: ['blur', 'change'] }
          ],
          roleIdList: [
            { required: true, message: '请选择职位', trigger: ['blur', 'change'] },
            { validator: roleListReg, trigger: ['blur', 'change'] }
          ],
          homeAddress: [
            { required: false, message: '请输入家庭地址', trigger: ['blur', 'change'] }
          ],
          qq: [
            { required: false, message: '请输入qq', trigger: ['blur', 'change'] }
          ],
          joinedTime: [
            { required: true, message: '请选择入职日期', trigger: ['blur', 'change'] }
          ],
          positiveTime: [
            { required: false, message: '请选择转正日期', trigger: ['blur', 'change'] }
          ],
          emergencyContact: [
            { required: false, message: '请输入紧急联系人', trigger: ['blur', 'change'] }
          ],
          emergencyMobile: [
            { required: false, message: '请输入紧急联系人电话', trigger: ['blur', 'change'] },
            { pattern: /^1[2345789]\d{9}$/, message: '请输入正确的手机号码', trigger: ['blur', 'change'] }
          ],
          workMobile: [
            { required: false, message: '请输入工作电话', trigger: ['blur', 'change'] },
            { pattern: /^1[2345789]\d{9}$/, message: '请输入正确的手机号码', trigger: ['blur', 'change'] }
          ]
        }
      }
    },
    created() {
      this.getUserList()
    },
    methods: {
      // 新增
      create() {
        this.userEntity = {
          avatar: 'http://p84u3sabi.bkt.clouddn.com/elk/20180504/870ffb6238ad4b569c7b7a2f7daf1013.jpg',
          jobNumber: null,
          idNumber: null,
          name: null,
          sex: null,
          birthday: null,
          mobile: null,
          wechat: null,
          contactAddress: null,
          orgId: null,
          orgName: null,
          roleIdList: [],
          roleName: null,
          homeAddress: null,
          education: null,
          major: null,
          introducer: null,
          qq: null,
          joinedTime: null,
          positiveTime: null,
          email: null,
          emergencyContact: null,
          emergencyMobile: null,
          fiveInsuranceTime: null,
          providentFundTime: null,
          workMobile: null
        }
        this.studentList = []
        this.addInfo = true
        this.edit = true
        this.getRoleList()
        this.showModule = 'info'
      },
      // 双击行  编辑
      doubleClickRow(val) {
        this.infoLoading = true
        getObj(val.userId).then(response => {
          this.userEntity = response.data.data
          if (!this.userEntity.roleIdList) this.userEntity.roleIdList = []
          this.getRoleList()
          this.studentListQuery.userIds = this.userEntity.userId
          this.getEnrollStudentList()
          this.infoLoading = false
        })
        this.showModule = 'info'
      },
      getRoleList() {
        roleList().then(response => {
          this.roleList = response.data.data
        })
      },
      // 改变页容量
      handleSizeChange(val) {
        this.listQuery.limit = val
        this.getUserList()
      },
      // 改变当前页
      handleCurrentChange(val) {
        this.listQuery.page = val
        this.getUserList()
      },
      // 返回列表
      back() {
        this.showModule = 'list'
        this.getUserList()
        const set = this.$refs
        set['userEntity'].resetFields()
        this.edit = false
        this.addInfo = false
      },
      // 查询员工集合
      getUserList() {
        this.listLoading = true
        fetchList(this.listQuery).then(response => {
          this.userList = response.data.data.list
          this.total = response.data.data.totalCount
          this.listLoading = false
        })
      },
      // 查询招生信息集合
      getEnrollStudentList() {
        this.studentListLoading = true
        queryEnrollStudents(this.studentListQuery).then(response => {
          this.studentList = response.data.data.list
          // this.total = response.data.data.totalCount
          this.studentListLoading = false
        })
      },
      // 根据部门id查询员工
      searchByOrg() {
        this.getUserList()
      },
      // 编辑
      editInfo() {
        this.edit = true
      },
      // 取消编辑
      cancel(formName) {
        const set = this.$refs
        set[formName].resetFields()
        this.doubleClickRow(this.userEntity)
        this.edit = false
      },
      // 添加
      add(formName) {
        const set = this.$refs
        set[formName].validate(valid => {
          if (valid) {
            addObj(this.userEntity).then(response => {
              this.userEntity.userId = response.data.data
              this.back()
            })
          }
        })
      },
      // 修改
      update(formName) {
        const set = this.$refs
        set[formName].validate(valid => {
          if (valid) {
            putObj(this.userEntity).then(response => {
              this.doubleClickRow(this.userEntity)
              this.edit = false
            })
          }
        })
      },
      // orgClick(org) {
      //   this.userEntity.orgName = org.name
      //   roleList(org.id).then(response => {
      //     this.roleList = response.data.data
      //   })
      // },
      filterNode(value, data) {
        if (!value) return true
        return data.label.indexOf(value) !== -1
      },
      searchClick() {
        this.listQuery.page = 1
        this.listQuery.condition = removeAllSpace(this.listQuery.condition)
        this.getUserList()
      },
      // 根据身份证号生成信息
      generateInfo() {
        var value = autoProduce(this.userEntity.idNumber)
        if (value) {
          if (!this.userEntity.jobNumber) {
            this.userEntity.jobNumber = value[0]
          }
          if (!this.userEntity.birthday) {
            this.userEntity.birthday = value[1]
          }
          this.userEntity.sex = value[2].toString()
        }
      },
      handleAvatarSuccess(res, file) {
        this.userEntity.avatar = res.data
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
      rePassword(userId) {
        this.$confirm('是否重置密码?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          rePassword(userId).then(() => {
          })
        })
      },
      quit(userId) {
        this.$prompt('请输入离职原因', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputValidator: function(value) {
            if (value && value.trim() !== '') {
              return true
            } else {
              return false
            }
          },
          inputErrorMessage: '请输入离职原因'
        }).then(({ value }) => {
          quit({ remark: value, userId: userId, quit: '1' }).then(() => {
            this.back()
          })
        })
        // this.$confirm('是否办理员工离职?', '提示', {
        //   confirmButtonText: '确定',
        //   cancelButtonText: '取消',
        //   type: 'warning'
        // }).then(() => {
        //   quit(userId).then(() => {
        //     this.back()
        //   })
        // })
      },
      noNull(value) {
        console.log('noNull')
        console.log(value)
      },
      exportUser() {
        this.expLoading = true
        exportUser(this.listQuery).then(response => {
          let time = new Date()
          let blob = new Blob([response.data], { type: 'application/x-xls' })
          let link = document.createElement('a')
          link.href = window.URL.createObjectURL(blob)
          link.download = '同事名单(' + time.toLocaleString() + ').xls'
          link.click()
          this.expLoading = false
        })
      }
    }
  }
</script>


<style rel="stylesheet/scss" lang="scss" scoped>
  .img{
    width: 70px;
    height: 70px;
    padding: 0;
    /*border-radius: 50%;*/
    overflow: hidden;
  }

  .table_text{
    color: #7c7c7c;font-size: 12px;text-align: left;
    word-break:keep-all;/* 不换行 */
    white-space:nowrap;/* 不换行 */
    overflow:hidden;/* 内容超出宽度时隐藏超出部分的内容 */
    text-overflow:ellipsis;/* 当对象内文本溢出时显示省略标记(...) ；需与overflow:hidden;一起使用。*/
  }
  .userInfo{
    float: left;
    padding: 0 0 0 20px;
  }

  .image {
    margin-bottom: 20px;
    margin-right: 50px;
    max-width: 200px;
    max-height: 200px;
    display: block;
    float: left;
  }
  .text_css{
    color:#495060;
    font-weight: 700;
    font-size: 12px;
    word-break:keep-all;/* 不换行 */
    white-space:nowrap;/* 不换行 */
    overflow:hidden;/* 内容超出宽度时隐藏超出部分的内容 */
    text-overflow:ellipsis;/* 当对象内文本溢出时显示省略标记(...) ；需与overflow:hidden;一起使用。*/
  }
  .avatar-uploader{
    border: 1px dashed #d9d9d9;
    width: 120px;
    height: 160px;
    margin: 0 auto 20px;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 160px;
    line-height: 160px;
    text-align: center;
  }
  .avatar {
    width: 120px;
    height: 180px;
    display: block;
  }
</style>
