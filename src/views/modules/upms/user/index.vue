<template>
  <div class="app-container calendar-list-container" :style="{height: $store.state.app.client.height + 'px'}">
    <div v-show="showModule=='list'"  style="height: 100%">
      <el-row :gutter="5">
        <el-col class="org-tree-left">
          <el-card>
            <el-row><span style="font-size: 16px;font-weight: 600;font-family: '微软雅黑 Light'">部门筛选</span>
            <!-- 分割线 -->
            <el-col> <hr style="border: none; border-bottom:1px solid #d3dce6; "/> </el-col></el-row>
            <my-tree url="/upms/org/tree" v-model="listQuery.orgId"  @node="searchByOrg"></my-tree>
          </el-card>
        </el-col>

        <el-col :style="{width: ($store.state.app.client.width-250) + 'px'}">
          <el-card style="height: 80px">
            <div class="filter-container" style="float: left;line-height: 40px">
              |&nbsp;<span style="font-size: 20px;font-weight: 600;font-family: '微软雅黑 Light'">同事列表</span>
            </div>
            <div style="float: right">
              <el-input @keyup.enter.native="searchClick" style="width: 300px;" class="filter-item" placeholder="姓名/电话/身份证" v-model="listQuery.condition"></el-input>
              <el-button class="filter-item" type="primary"  @click="searchClick">搜索</el-button>

            </div>
          </el-card>

          <el-card style="margin-top: 5px;"  :style="{height: ($store.state.app.client.height-125) + 'px'}">
            <!-- 身份卡循环 -->
            <el-table :data="userList" :height="($store.state.app.client.height-220)" highlight-current-row @row-dblclick="doubleClickRow"  v-loading="listLoading" element-loading-text="给我一点时间">
              <!--<el-table-column type="index" label="序号"  align="center" width="50"></el-table-column>-->
              <el-table-column align="center" label="头像" width="200">
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
              <el-table-column align="center" label="个人信息" width="300">
                <template slot-scope="scope" >
                  <!-- 个人信息 -->
                  <el-col style=" line-height: 25px">
                    <el-row :gutter="10">
                      <el-col :span="7" class="table_text">工号：</el-col>
                      <el-col :span="17" class="table_text">{{scope.row.jobNumber}}</el-col>
                    </el-row>
                    <el-row :gutter="10">
                      <el-col :span="7" class="table_text">职位：</el-col>
                      <el-col :span="17" class="table_text">
                        <span v-for="(role,index) in scope.row.roleList">{{role.roleName}}<span v-if="scope.row.roleList.length !== (index+1)">、</span></span>
                      </el-col>
                    </el-row>
                    <el-row :gutter="10">
                      <el-col :span="7" class="table_text">生日：</el-col>
                      <el-col :span="17" class="table_text">{{scope.row.birthday | subTime}}</el-col>
                    </el-row>

                    <el-row :gutter="10">
                      <el-col :span="7" class="table_text">工作电话：</el-col>
                      <el-col :span="17" class="table_text">
                        {{scope.row.workMobile}}
                      </el-col>
                    </el-row>
                  </el-col>
                </template>
              </el-table-column>

              <!--<el-table-column label="员工信息">
                <template slot-scope="scope">
                  &lt;!&ndash; 头像 &ndash;&gt;
                  <el-row :gutter="20">
                    <el-col :span="4">
                      <el-tag class="img">
                        <img :src="scope.row.avatar" class="img">
                      </el-tag>
                    </el-col>
                    <el-col :span="20">
                      &lt;!&ndash; 员工信息 &ndash;&gt;
                      &lt;!&ndash;<div class="userInfo">&ndash;&gt;
                        <br/>
                        工号：{{scope.row.jobNumber}}
                        <br/>
                        职位：
                        <span v-for="(role,index) in scope.row.roleList">{{role.roleName}}<span v-if="scope.row.roleList.length !== (index+1)">、</span></span>
                        &lt;!&ndash;{{scope.row.roleName}}&ndash;&gt;
                        <br/>
                        生日：{{scope.row.birthday | subTime}}
                        <br/>
                        <br/>
                        工作电话：{{scope.row.workMobile}}
                      &lt;!&ndash;</div>&ndash;&gt;
                    </el-col>
                  </el-row>
                </template>
              </el-table-column>-->
              <el-table-column label="招生记录">
                <template slot-scope="scope">
                  <bar :data="scope.row.recruits"></bar>
                </template>
              </el-table-column>

              <el-table-column label="来访信息">
                <template slot-scope="scope">
                  <LineChart :chart-data="scope.row.visits"></LineChart>
                </template>
              </el-table-column>
            </el-table>

            <div v-show="!listLoading" class="pagination-container" style="margin-top: 20px">
              <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                             :current-page.sync="listQuery.page"
                             background
                             style="float: left"
                             :page-sizes="[10,20,30,50]" :page-size="listQuery.limit"
                             layout="total, sizes, prev, pager, next, jumper" :total="total">
              </el-pagination>
              <el-button class="filter-item" style="margin-left: 10px; float: right" @click="create" type="primary" ><i class="el-icon-plus"></i>添加</el-button>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <div v-show="showModule=='info'" v-loading="infoLoading" >
      <el-card>
        <div slot="header" class="clearfix">
          <div style="float: left">
            |&nbsp;<span style="font-size: 20px;font-weight: 600;line-height:40px;font-family: '微软雅黑 Light'">同事信息</span>
          </div>
          <div style="float: right">
            <el-button type="primary" style="float: right" @click="back">返回</el-button>
          </div>
        </div>

        <el-form :model="userEntity" :rules="userEntityRules" ref="userEntity" label-position="left" label-width="120px">

          <el-row :gutter="5">
            <el-col :span="14">
              <el-row>
                <el-card body-style="padding:15px 15px 0 15px;" shadow="hover">
                  <el-row>
                    <el-col :span="6">
                      <el-upload :disabled="!edit" class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                        <img v-if="userEntity.avatar" :src="userEntity.avatar" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                      </el-upload>
                    </el-col>
                    <el-col :span="18">

                      <el-row :gutter="10" style="height: 60px">
                        <el-col :span="12">
                          <el-form-item prop="jobNumber">
                            <span slot="label" class="text_css">工号：</span>
                            <el-input v-if="edit"  v-model="userEntity.jobNumber" placeholder="工号"></el-input>
                            <span style="padding-left: 16px;font-size: 12px;" v-else>{{userEntity.jobNumber}}</span>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item prop="idNumber">
                            <span slot="label" class="text_css">身份证：</span>
                            <el-input v-if="edit" @blur="generateInfo" :maxlength="18"  @keyup.enter.native="generateInfo" v-model="userEntity.idNumber" placeholder="身份证号"></el-input>
                            <span style="padding-left: 16px;font-size: 12px;" v-else>{{userEntity.idNumber}}</span>
                          </el-form-item>
                        </el-col>
                      </el-row>

                      <el-row :gutter="10" style="height: 60px">
                        <el-col :span="12">
                          <el-form-item prop="name">
                            <span slot="label" class="text_css">姓名：</span>
                            <el-input v-if="edit"  v-model="userEntity.name" placeholder="员工姓名"></el-input>
                            <span style="padding-left: 16px;font-size: 12px;" v-else>{{userEntity.name}}</span>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item prop="sex">
                            <span slot="label" class="text_css">性别：</span>
                            <el-radio-group v-if="edit" v-model="userEntity.sex">
                              <el-radio :label="1">男</el-radio>
                              <el-radio :label="0">女</el-radio>
                            </el-radio-group>
                            <span style="padding-left: 16px;font-size: 12px;" v-else>{{userEntity.sex | sexFilter}}</span>
                          </el-form-item>
                        </el-col>
                      </el-row>

                      <el-row :gutter="10" style="height: 60px">
                        <el-col :span="12">
                          <el-form-item prop="birthday">
                            <span slot="label" class="text_css">生日：</span>
                            <el-date-picker value-format="timestamp"  v-if="edit" type="date" placeholder="生日"  style="width: 100%" v-model="userEntity.birthday"></el-date-picker>
                            <span style="padding-left: 16px;font-size: 12px;" v-else>{{userEntity.birthday | subTime}}</span>
                          </el-form-item>
                        </el-col>
                      </el-row>

                    </el-col>
                  </el-row>
                </el-card>
              </el-row>
              <el-row>
                <el-card body-style="padding:10px;" shadow="hover" style="margin-top: 5px;" >
                  <el-row :gutter="10" style="height: 60px">
                    <el-col :span="8">

                      <el-form-item prop="mobile">
                        <span slot="label" class="text_css">联系电话：</span>
                        <el-input v-if="edit"  v-model="userEntity.mobile" placeholder="联系电话"></el-input>
                        <span style="padding-left: 16px;font-size: 12px;" v-else>{{userEntity.mobile}}</span>
                      </el-form-item>

                    </el-col>

                    <el-col :span="8">

                      <el-form-item prop="wechat">
                        <span slot="label" class="text_css">微信：</span>
                        <el-input v-if="edit"  v-model="userEntity.wechat" placeholder="微信" ></el-input>
                        <span style="padding-left: 16px;font-size: 12px;" v-else>{{userEntity.wechat}}</span>
                      </el-form-item>

                    </el-col>

                    <el-col :span="8">

                      <el-form-item prop="contactAddress">
                        <span slot="label" class="text_css">联系地址：</span>
                        <el-input v-if="edit"  v-model="userEntity.contactAddress" placeholder="联系地址"></el-input>
                        <span style="padding-left: 16px;font-size: 12px;" v-else>{{userEntity.contactAddress}}</span>
                      </el-form-item>

                    </el-col>
                  </el-row>

                  <el-row :gutter="10" style="height: 60px">
                    <el-col :span="8">

                      <el-form-item prop="orgId">
                        <span slot="label" class="text_css">所属部门：</span>
                        <tree-select v-show="edit" url="/upms/org/tree" v-model="userEntity.orgId" @org-click="orgClick" placeholder="家庭住址"></tree-select>
                        <span style="padding-left: 16px;font-size: 12px;" v-show="!edit" >{{userEntity.orgName}}</span>
                      </el-form-item>

                    </el-col>

                    <el-col :span="8">

                      <el-form-item prop="roleIdList">
                        <span slot="label" class="text_css">职位：</span>
                        <el-select v-show="edit" v-model="userEntity.roleIdList" collapse-tags style="width: 100%" multiple placeholder="请选择职位">
                          <el-option v-for="role in roleList" :key="role.roleId" :label="role.roleName" :value="role.roleId">
                          </el-option>
                        </el-select>
                        <!--<span v-for="(introducerName,index) in student.introducerNameList"  v-show="!edit" >{{introducerName}}<span v-if="student.introducerNameList.length !== (index+1)">、</span></span>-->

                        <!--<el-select v-if="edit" v-model="userEntity.roleIdList" style="width: 100%" collapse-tags multiple placeholder="职位" @change="roleChange">-->
                          <!--<el-option-->
                            <!--v-for="item in roleList"-->
                            <!--:key="item.roleId"-->
                            <!--:label="item.roleName"-->
                            <!--:value="item.roleId"-->
                          <!--&gt;-->
                          <!--</el-option>-->
                        <!--</el-select>-->
                        <!--<span style="padding-left: 16px;font-size: 12px;" v-else>{{userEntity.roleName}}</span>-->
                      </el-form-item>

                    </el-col>

                    <el-col :span="8">

                      <el-form-item prop="homeAddress">
                        <span slot="label" class="text_css">家庭住址：</span>
                        <el-input v-if="edit"  v-model="userEntity.homeAddress" placeholder="家庭住址"></el-input>
                        <span style="padding-left: 16px;font-size: 12px;" v-else>{{userEntity.homeAddress}}</span>
                      </el-form-item>

                    </el-col>
                  </el-row>

                  <el-row :gutter="10" style="height: 60px">
                    <el-col :span="8">

                      <el-form-item prop="education">
                        <span slot="label" class="text_css">学历：</span>
                        <el-input v-if="edit"  v-model="userEntity.education" placeholder="学历" ></el-input>
                        <span style="padding-left: 16px;font-size: 12px;" v-else>{{userEntity.education}}</span>
                      </el-form-item>

                    </el-col>

                    <el-col :span="8">

                      <el-form-item prop="major">
                        <span slot="label" class="text_css">专业：</span>
                        <el-input v-if="edit"  v-model="userEntity.major" placeholder="专业" ></el-input>
                        <span style="padding-left: 16px;font-size: 12px;" v-else>{{userEntity.major}}</span>
                      </el-form-item>

                    </el-col>

                    <el-col :span="8">

                      <el-form-item prop="qq">
                        <span slot="label" class="text_css">QQ：</span>
                        <el-input v-if="edit"  v-model="userEntity.qq" placeholder="QQ" ></el-input>
                        <span style="padding-left: 16px;font-size: 12px;" v-else>{{userEntity.qq}}</span>
                      </el-form-item>

                    </el-col>
                  </el-row>

                  <el-row :gutter="10" style="height: 60px">
                    <el-col :span="8">


                      <el-form-item prop="joinedTime">
                        <span slot="label" class="text_css">入职日期：</span>
                        <el-date-picker value-format="timestamp" v-if="edit" type="date" placeholder="入职日期"  style="width: 100%" v-model="userEntity.joinedTime"></el-date-picker>
                        <span style="padding-left: 16px;font-size: 12px;" v-else>{{userEntity.joinedTime | subTime}}</span>
                      </el-form-item>

                    </el-col>

                    <el-col :span="8">

                      <el-form-item prop="positiveTime">
                        <span slot="label" class="text_css">转正日期：</span>
                        <el-date-picker value-format="timestamp"  v-if="edit" type="date" placeholder="转正日期"  style="width: 100%" v-model="userEntity.positiveTime"></el-date-picker>
                        <span style="padding-left: 16px;font-size: 12px;" v-else>{{userEntity.positiveTime | subTime}}</span>
                      </el-form-item>

                    </el-col>

                    <el-col :span="8">

                      <el-form-item prop="email">
                        <span slot="label" class="text_css">E-mail：</span>
                        <el-input v-if="edit"  v-model="userEntity.email" placeholder="E-mail"></el-input>
                        <span style="padding-left: 16px;font-size: 12px;" v-else>{{userEntity.email}}</span>
                      </el-form-item>

                    </el-col>
                  </el-row>


                  <el-row :gutter="20" style="height: 60px">
                    <el-col :span="12">

                      <el-form-item label-width="150px" prop="emergencyContact">
                        <span slot="label" class="text_css">紧急联系人姓名：</span>
                        <el-input v-if="edit"  v-model="userEntity.emergencyContact" placeholder="紧急联系人" ></el-input>
                        <span style="padding-left: 16px;font-size: 12px;" v-else>{{userEntity.emergencyContact}}</span>
                      </el-form-item>

                    </el-col>

                    <el-col :span="12">

                      <el-form-item label-width="150px" prop="emergencyMobile">
                        <span slot="label" class="text_css">紧急联系人电话：</span>
                        <el-input v-if="edit"  v-model="userEntity.emergencyMobile" placeholder="紧急联系人电话" ></el-input>
                        <span style="padding-left: 16px;font-size: 12px;" v-else>{{userEntity.emergencyMobile}}</span>
                      </el-form-item>

                    </el-col>
                  </el-row>

                  <el-row :gutter="20" style="height: 60px">
                    <el-col :span="12">

                      <el-form-item label-width="150px" prop="fiveInsuranceTime">
                        <span slot="label" class="text_css">五险购买时间：</span>
                        <el-date-picker value-format="timestamp"  v-if="edit" type="date" placeholder="五险购买时间"  style="width: 100%" v-model="userEntity.fiveInsuranceTime"></el-date-picker>
                        <span style="padding-left: 16px;font-size: 12px;" v-else>{{userEntity.fiveInsuranceTime | subTime}}</span>
                      </el-form-item>

                    </el-col>

                    <el-col :span="12">

                      <el-form-item label-width="150px" prop="providentFundTime">
                        <span slot="label" class="text_css">公积金购买时间：</span>
                        <el-date-picker value-format="timestamp"  v-if="edit" type="date" placeholder="公积金购买时间"  style="width: 100%" v-model="userEntity.providentFundTime"></el-date-picker>
                        <span style="padding-left: 16px;font-size: 12px;" v-else>{{userEntity.providentFundTime | subTime}}</span>
                      </el-form-item>

                    </el-col>
                  </el-row>

                  <el-row :gutter="20" style="height: 60px">
                    <el-col :span="12">

                      <el-form-item label-width="150px" prop="workMobile">
                        <span slot="label" class="text_css">工作电话：</span>
                        <el-input v-if="edit"  v-model="userEntity.workMobile" placeholder="工作电话" ></el-input>
                        <span style="padding-left: 16px;font-size: 12px;" v-else>{{userEntity.workMobile}}</span>
                      </el-form-item>

                    </el-col>

                    <el-col :span="12">&nbsp;</el-col>
                  </el-row>


                  <el-row v-if="edit">
                    <div style="float: right;" >
                      <el-button v-if="addInfo"  type="success"  @click="add('userEntity')"><i class="el-icon-fa-save"></i> 保存</el-button>
                      <el-button v-if="!addInfo" type="info" @click="cancel('userEntity')"><i class="el-icon-close"></i> 取消</el-button>
                      <el-button v-if="!addInfo" type="success" @click="update('userEntity')"><i class="el-icon-fa-save"></i> 保存</el-button>
                    </div>
                  </el-row>


                  <el-row v-else>
                    <div style="float: right;" >
                      <el-button type="primary" @click="editInfo"><i class="el-icon-edit"></i> 编辑</el-button>
                    </div>
                  </el-row>


                </el-card>
              </el-row>
            </el-col>

            <el-col :span="10">
              <el-row>
                <el-card shadow="hover" body-style="padding:0" style="height: 350px">
                  <div style="height: 40px;width: 100%;background-color: rgb(245, 247, 250);border-bottom:1px solid rgb(235, 239, 245)">
                    <div style="background-color: #ffffff;width: 100px;height: 40px;line-height: 40px;color: #409eff;font-size: 14px;text-align: center;border-right:1px solid rgb(235, 239, 245)">
                      招生信息
                    </div>
                  </div>



                </el-card>
              </el-row>
              <el-row>
                <el-card shadow="hover" body-style="padding:0" style="height: 350px;margin-top: 5px">
                  <div style="height: 40px;width: 100%;background-color: rgb(245, 247, 250);border-bottom:1px solid rgb(235, 239, 245)">
                    <div style="background-color: #ffffff;width: 100px;height: 40px;line-height: 40px;color: #409eff;font-size: 14px;text-align: center;border-right:1px solid rgb(235, 239, 245)">
                      操作日志
                    </div>
                  </div>



                </el-card>
              </el-row>
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
  import { removeAllSpace } from '@/utils/validate'
  import { autoProduce } from '@/utils/index'
  import Bar from '@/components/Bar'
  import LineChart from '@/components/LineChart'
  import { fetchList, addObj, putObj, getObj } from '@/api/upms/user'

  export default {
    name: 'index',
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
        return typeMap[this.userEntity.sex]
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
      var roleListReg = (rule, value, callback) => {
        if (value.length > 0) {
          callback()
        } else {
          callback(new Error('请选择职位'))
        }
      }
      return {
        // 编辑标记
        edit: false,
        // 模块标记
        showModule: 'list',
        // 员工集合
        userList: [],
        // 总条数
        total: 1,
        listLoading: true,
        infoLoading: true,
        // 分页数据
        listQuery: {
          page: 1,
          limit: 20,
          orgId: null,
          condition: null
        },
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        userEntity: {
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
          emergencyContact: null,
          emergencyMobile: null,
          fiveInsuranceTime: null,
          providentFundTime: null,
          workMobile: null
        },
        // 添加 标记
        addInfo: false,
        roleList: [],
        userEntityRules: {
          mobile: [
            { required: true, message: '请输入手机号', trigger: 'blur,change' },
            { pattern: /^1[2345789]\d{9}$/, message: '目前只支持中国大陆的手机号码', trigger: 'blur,change' }
          ],
          idNumber: [
            { required: true, message: '请输入身份证', trigger: 'blur,change' },
            { validator: idNumberReg, trigger: 'blur,change' }
          ],
          jobNumber: [
            { required: true, message: '请输入档案号', trigger: 'blur,change' }
          ],
          email: [
            { required: true, message: '请输入邮箱', trigger: 'blur,change' },
            { pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, message: '请输入正确的邮箱', trigger: 'blur,change' }
          ],
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur,change' }
          ],
          sex: [
            { required: true, message: '请选择性别', trigger: 'blur,change' }
          ],
          birthday: [
            { required: true, message: '请选择生日', trigger: 'blur,change' }
          ],
          wechat: [
            { required: true, message: '请输入微信', trigger: 'blur,change' }
          ],
          contactAddress: [
            { required: true, message: '请输入联系地址', trigger: 'blur,change' }
          ],
          orgId: [
            { required: true, message: '请选择部门', trigger: 'blur,change' }
          ],
          roleIdList: [
            { required: true, message: '请选择职位', trigger: 'blur,change' },
            { validator: roleListReg, trigger: 'blur,change' }
          ],
          homeAddress: [
            { required: true, message: '请输入家庭地址', trigger: 'blur,change' }
          ],
          qq: [
            { required: true, message: '请输入qq', trigger: 'blur,change' }
          ],
          joinedTime: [
            { required: true, message: '请选择入职日期', trigger: 'blur,change' }
          ],
          positiveTime: [
            { required: true, message: '请选择转正日期', trigger: 'blur,change' }
          ],
          emergencyContact: [
            { required: true, message: '请输入紧急联系人', trigger: 'blur,change' }
          ],
          emergencyMobile: [
            { required: true, message: '请输入紧急联系人电话', trigger: 'blur,change' }
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
          emergencyContact: null,
          emergencyMobile: null,
          fiveInsuranceTime: null,
          providentFundTime: null,
          workMobile: null

        }
        this.addInfo = true
        this.edit = true
        this.showModule = 'info'
      },
      // 双击行  编辑
      doubleClickRow(val) {
        this.infoLoading = true
        getObj(val.userId).then(response => {
          console.log('====================== 单个员工信息 =====================')
          console.log(response.data)
          this.userEntity = response.data.data
          console.log(this.userEntity.orgId)
          roleList(this.userEntity.orgId).then(response => {
            console.log('====================== 职位 =====================')
            this.roleList = response.data.data
            console.log(this.roleList)
          })
          this.infoLoading = false
        })
        this.showModule = 'info'
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
        console.log('=====================   查询员工集合   =======================')
        this.listLoading = true
        fetchList(this.listQuery).then(response => {
          console.log(response.data)
          this.userList = response.data.data.list
          this.total = response.data.data.totalCount
          this.listLoading = false
        })
        console.log('=====================   完成   =======================')
      },
      // 根据部门id查询员工
      searchByOrg() {
        this.getUserList()
      },
      // 编辑
      editInfo() {
        console.log('=====================     编辑    ===================')
        this.edit = true
        console.log(this.roleList)
        console.log('=====================     完成    ===================')
      },
      // 取消编辑
      cancel(formName) {
        console.log('=================== 正在完成取消操作 ===================')
        const set = this.$refs
        set[formName].resetFields()
        this.doubleClickRow(this.userEntity)
        this.edit = false
        console.log('=================== 完成 ===================')
      },
      // 添加
      add(formName) {
        const set = this.$refs
        set[formName].validate(valid => {
          if (valid) {
            console.log('这里是添加方法===========================')
            console.log(this.userEntity)
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
            console.log('这里是修改方法===========================')
            console.log(this.userEntity)
            putObj(this.userEntity).then(response => {
              console.log(response.data)
              this.doubleClickRow(this.userEntity)
              this.edit = false
            })
          }
        })
      },
      orgClick(org) {
        this.userEntity.orgName = org.name
        roleList(org.id).then(response => {
          console.log(response.data)
          // this.userEntity.roleIdList = []
          // this.userEntity.roleIdList.push(response.data.data[0].roleId)
          this.roleList = response.data.data
        })
      },
      roleChange(val) {
        console.log(val)
        // this.userEntity.roleName = val.roleName
      },
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
          this.userEntity.sex = value[2]
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
      }
    }
  }
</script>


<style rel="stylesheet/scss" lang="scss" scoped>
  .img{
    width: 50px;
    height: 50px;
    padding: 0;
    border-radius: 150px;
    overflow: hidden;
  }

  .table_text{
    color: #7c7c7c;font-size: 14px;text-align: left;
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
    font-size: 16px;
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
