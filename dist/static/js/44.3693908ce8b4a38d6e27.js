webpackJsonp([44],{"4zeu":function(t,e,s){"use strict";var n=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"app-container calendar-list-container",style:{height:t.$store.state.app.client.height+"px"}},[s("div",{directives:[{name:"show",rawName:"v-show",value:"list"==t.showModule,expression:"showModule=='list'"}]},[s("el-card",{style:{height:t.$store.state.app.client.height-45+"px"}},[s("div",{staticClass:"filter-container"},[s("div",{staticStyle:{float:"left","line-height":"40px"}},[t._v("\n          | "),s("span",{staticStyle:{"font-size":"18px","font-weight":"600","font-family":"'微软雅黑 Light'"}},[t._v("接送列表")])]),t._v(" "),s("div",{staticStyle:{float:"right"}},[s("el-input",{staticClass:"filter-item",staticStyle:{width:"200px"},attrs:{placeholder:"接送人/接送名单"},nativeOn:{keyup:function(e){if(!("button"in e)&&t._k(e.keyCode,"enter",13,e.key))return null;t.searchClick(e)}},model:{value:t.shuttleLogQuery.condition,callback:function(e){t.$set(t.shuttleLogQuery,"condition",e)},expression:"shuttleLogQuery.condition"}}),t._v(" "),s("el-button",{staticClass:"filter-item",attrs:{type:"primary"},on:{click:t.searchClick}},[s("i",{staticClass:"el-icon-search"}),t._v("搜索")])],1)]),t._v(" "),s("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.shuttleLogLoading,expression:"shuttleLogLoading"}],staticStyle:{width:"100%"},attrs:{data:t.shuttleLog,height:t.$store.state.app.client.height-195,"element-loading-text":"给我一点时间",fit:"","highlight-current-row":""}},[s("el-table-column",{attrs:{type:"expand"},scopedSlots:t._u([{key:"default",fn:function(e){return[s("el-table",{staticStyle:{width:"100%"},attrs:{data:e.row.studentList,"element-loading-text":"给我一点时间",fit:"","highlight-current-row":""}},[s("el-table-column",{attrs:{align:"center",label:"学员"},scopedSlots:t._u([{key:"default",fn:function(e){return[s("span",[t._v(t._s(e.row.studentName))])]}}])}),t._v(" "),s("el-table-column",{attrs:{align:"center",label:"电话"},scopedSlots:t._u([{key:"default",fn:function(e){return[s("span",[t._v(t._s(e.row.mobile))])]}}])}),t._v(" "),s("el-table-column",{attrs:{align:"center",label:"时间"},scopedSlots:t._u([{key:"default",fn:function(e){return[s("span",[t._v(t._s(e.row.relayTime))])]}}])}),t._v(" "),s("el-table-column",{attrs:{align:"center",label:"地址"},scopedSlots:t._u([{key:"default",fn:function(e){return[s("span",[t._v(t._s(e.row.relayAddress))])]}}])}),t._v(" "),s("el-table-column",{attrs:{align:"center",label:"状态"},scopedSlots:t._u([{key:"default",fn:function(e){return[s("span",{directives:[{name:"show",rawName:"v-show",value:"0"===e.row.state,expression:"scope.row.state === '0'"}],staticStyle:{color:"#E6A23C"}},[t._v("待接送")]),t._v(" "),s("span",{directives:[{name:"show",rawName:"v-show",value:"1"===e.row.state,expression:"scope.row.state === '1'"}],staticStyle:{color:"#67c23a"}},[t._v("已接送")]),t._v(" "),s("span",{directives:[{name:"show",rawName:"v-show",value:"2"===e.row.state,expression:"scope.row.state === '2'"}],staticStyle:{color:"#f56c6c"}},[t._v("未接送")])]}}])}),t._v(" "),s("el-table-column",{attrs:{align:"center",label:"未接送原因"},scopedSlots:t._u([{key:"default",fn:function(e){return[s("span",[t._v(t._s(e.row.undeliveredReason))])]}}])})],1)]}}])}),t._v(" "),s("el-table-column",{attrs:{type:"index",label:"序号",align:"center",width:"50"}}),t._v(" "),s("el-table-column",{attrs:{align:"center",label:"接送人"},scopedSlots:t._u([{key:"default",fn:function(e){return[s("span",[t._v(t._s(e.row.name))])]}}])}),t._v(" "),s("el-table-column",{attrs:{align:"center",label:"接送人电话"},scopedSlots:t._u([{key:"default",fn:function(e){return[s("span",[t._v(t._s(e.row.mobile))])]}}])}),t._v(" "),s("el-table-column",{attrs:{align:"center",label:"接送日期"},scopedSlots:t._u([{key:"default",fn:function(e){return[s("span",[t._v(t._s(t._f("subTime")(e.row.shuttleTime)))])]}}])})],1),t._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:!t.shuttleLogLoading,expression:"!shuttleLogLoading"}],staticClass:"pagination-container",staticStyle:{"margin-top":"20px"}},[s("el-pagination",{staticStyle:{float:"left"},attrs:{"current-page":t.shuttleLogQuery.page,background:"","page-sizes":[10,20,30,50],"page-size":t.shuttleLogQuery.limit,layout:"total, sizes, prev, pager, next, jumper",total:t.shuttleLogTotal},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange,"update:currentPage":function(e){t.$set(t.shuttleLogQuery,"page",e)}}}),t._v(" "),s("el-button",{staticStyle:{float:"right"},attrs:{type:"primary"},on:{click:t.create}},[s("i",{staticClass:"el-icon-plus"}),t._v("添加")])],1)],1)],1),t._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:"info"==t.showModule,expression:"showModule=='info'"}]},[s("el-card",{style:{height:t.$store.state.app.client.height-45+"px"}},[s("el-row",{staticClass:"filter-container"},[s("div",{staticStyle:{float:"left","line-height":"40px"}},[t._v("\n          | "),s("span",{staticStyle:{"font-size":"18px","font-weight":"600","font-family":"'微软雅黑 Light'"}},[t._v("接送列表")])]),t._v(" "),s("div",{staticStyle:{float:"right"}},[s("el-button",{staticClass:"filter-item",attrs:{type:"primary"},on:{click:t.backClick}},[s("i",{staticClass:"el-icon-back"}),t._v(" 返 回")])],1)]),t._v(" "),s("el-row",{attrs:{gutter:5}},[s("el-col",{attrs:{span:8}},[s("el-card",{style:{height:t.$store.state.app.client.height-145+"px"},attrs:{shadow:"never"}},[s("div",{staticClass:"filter-container"},[s("div",{staticStyle:{"line-height":"28px"}},[t._v("\n                | "),s("span",{staticStyle:{"font-size":"16px","font-weight":"600","font-family":"'微软雅黑 Light'"}},[t._v("未安排名单")])])]),t._v(" "),s("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.notShuttleListLoading,expression:"notShuttleListLoading"}],staticStyle:{width:"100%"},attrs:{data:t.notShuttleList,height:t.$store.state.app.client.height-260,border:"","highlight-current-row":"","element-loading-text":"给我一点时间"},on:{"selection-change":t.handleSelectionChange}},[s("el-table-column",{staticClass:"selection",attrs:{type:"selection",align:"center",prop:"uuid"}}),t._v(" "),s("el-table-column",{attrs:{type:"index",align:"center",label:"编号",width:"50"}}),t._v(" "),s("el-table-column",{attrs:{align:"center",label:"姓名"},scopedSlots:t._u([{key:"default",fn:function(e){return[s("span",[t._v(t._s(e.row.studentName))])]}}])}),t._v(" "),s("el-table-column",{attrs:{align:"center",label:"电话",width:"120"},scopedSlots:t._u([{key:"default",fn:function(e){return[s("span",[t._v(t._s(e.row.mobile))])]}}])}),t._v(" "),s("el-table-column",{attrs:{align:"center",label:"详细地址"},scopedSlots:t._u([{key:"default",fn:function(e){return[s("span",[t._v(t._s(e.row.relayAddress))])]}}])}),t._v(" "),s("el-table-column",{attrs:{align:"center",label:"常接送人"},scopedSlots:t._u([{key:"default",fn:function(e){return[s("span",[t._v(t._s(e.row.bespeakName))])]}}])})],1),t._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:!t.notShuttleListLoading,expression:"!notShuttleListLoading"}],staticClass:"pagination-container",staticStyle:{"margin-top":"12px"}},[s("el-pagination",{staticStyle:{float:"left"},attrs:{layout:"prev, pager, next","current-page":t.notShuttleListQuery.page,"page-size":t.notShuttleListQuery.limit,total:t.notShuttleTotal},on:{"current-change":t.notShuttleHandleCurrentChange}}),t._v(" "),s("div",{staticStyle:{float:"right"}},[s("el-button",{attrs:{type:"primary",size:"mini"},on:{click:t.shuttleClick}},[s("i",{staticClass:"el-icon-fa-bus"}),t._v(" 接 送")])],1)],1),t._v(" "),s("el-dialog",{attrs:{"close-on-click-modal":!1,width:"450px",title:"请选择接送人",visible:t.userListOption},on:{"update:visible":function(e){t.userListOption=e}}},[s("el-select",{staticStyle:{width:"100%"},attrs:{"collapse-tags":"",filterable:"",placeholder:"请选择接送人"},model:{value:t.shuttle.userId,callback:function(e){t.$set(t.shuttle,"userId",e)},expression:"shuttle.userId"}},t._l(t.userList,function(t){return s("el-option",{key:t.userId,attrs:{label:t.name,value:t.userId}})})),t._v(" "),s("div",{attrs:{slot:"footer"},slot:"footer"},[s("el-button",{on:{click:function(e){t.userListOption=!1}}},[s("i",{staticClass:"el-icon-fa-undo"}),t._v(" 取 消")]),t._v(" "),s("el-button",{directives:[{name:"show",rawName:"v-show",value:t.isAdd,expression:"isAdd"}],attrs:{type:"primary",loading:t.btnLoading},on:{click:t.addStudent}},[t._v("确 定")]),t._v(" "),s("el-button",{directives:[{name:"show",rawName:"v-show",value:!t.isAdd,expression:"!isAdd"}],attrs:{type:"primary",loading:t.btnLoading},on:{click:t.updateShuttleStudent}},[t._v("确 定")])],1)],1)],1)],1),t._v(" "),s("el-col",{attrs:{span:16}},[s("el-card",{style:{height:t.$store.state.app.client.height-145+"px"},attrs:{shadow:"never"}},[s("div",{staticClass:"filter-container"},[s("div",{staticStyle:{float:"left","line-height":"28px"}},[t._v("\n                | "),s("span",{staticStyle:{"font-size":"16px","font-weight":"600","font-family":"'微软雅黑 Light'"}},[t._v("已安排名单")])])]),t._v(" "),s("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.shuttledListLoading,expression:"shuttledListLoading"}],staticStyle:{width:"100%"},attrs:{data:t.shuttledList,height:t.$store.state.app.client.height-260,"element-loading-text":"给我一点时间",fit:"","highlight-current-row":""}},[s("el-table-column",{attrs:{type:"expand"},scopedSlots:t._u([{key:"default",fn:function(e){return[s("el-table",{staticStyle:{width:"100%"},attrs:{data:e.row.studentList,"element-loading-text":"给我一点时间",fit:"","highlight-current-row":""}},[s("el-table-column",{attrs:{align:"center",label:"学员"},scopedSlots:t._u([{key:"default",fn:function(e){return[s("span",[t._v(t._s(e.row.studentName))])]}}])}),t._v(" "),s("el-table-column",{attrs:{align:"center",label:"电话"},scopedSlots:t._u([{key:"default",fn:function(e){return[s("span",[t._v(t._s(e.row.mobile))])]}}])}),t._v(" "),s("el-table-column",{attrs:{align:"center",label:"地址"},scopedSlots:t._u([{key:"default",fn:function(e){return[s("span",[t._v(t._s(e.row.relayAddress))])]}}])}),t._v(" "),s("el-table-column",{attrs:{align:"center",label:"操作"},scopedSlots:t._u([{key:"default",fn:function(n){return[s("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(s){t.updateShuttleStudentClick(e.row.shuttleId,n.row.studentId)}}},[s("i",{staticClass:"el-icon-edit"}),t._v(" 修 改")])]}}])})],1)]}}])}),t._v(" "),s("el-table-column",{attrs:{type:"index",label:"序号",align:"center",width:"50"}}),t._v(" "),s("el-table-column",{attrs:{align:"center",label:"接送人"},scopedSlots:t._u([{key:"default",fn:function(e){return[s("span",[t._v(t._s(e.row.name))])]}}])}),t._v(" "),s("el-table-column",{attrs:{align:"center",label:"电话"},scopedSlots:t._u([{key:"default",fn:function(e){return[s("span",[t._v(t._s(e.row.mobile))])]}}])}),t._v(" "),s("el-table-column",{attrs:{align:"center",label:"已安排人数"},scopedSlots:t._u([{key:"default",fn:function(e){return[s("span",[t._v(t._s(e.row.count))])]}}])}),t._v(" "),s("el-table-column",{attrs:{align:"center",label:"接送日期"},scopedSlots:t._u([{key:"default",fn:function(e){return[s("span",[t._v(t._s(t._f("subTime")(e.row.shuttleTime)))])]}}])})],1),t._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:!t.shuttledListLoading,expression:"!shuttledListLoading"}],staticClass:"pagination-container",staticStyle:{"margin-top":"12px"}},[s("el-pagination",{staticStyle:{float:"left"},attrs:{"current-page":t.shuttledListQuery.page,background:"","page-sizes":[10,20,30,50],"page-size":t.shuttledListQuery.limit,layout:"total, sizes, prev, pager, next, jumper",total:t.shuttledTotal},on:{"size-change":t.shuttledHandleSizeChange,"current-change":t.shuttledHandleCurrentChange,"update:currentPage":function(e){t.$set(t.shuttledListQuery,"page",e)}}})],1)],1)],1)],1)],1)],1)])},l=[],i={render:n,staticRenderFns:l};e.a=i},ORFD:function(t,e,s){"use strict";var n=s("Dd8w"),l=s.n(n),i=s("rkgi"),a=s("J2Jh"),o=s("iCfI"),u=s("NYxO"),r=s("1x1p"),c=s("E4LH");e.a={name:"table_shuttle",computed:l()({},Object(u.b)(["permissions","client"])),data:function(){return{shuttleLog:[],shuttleLogTotal:null,shuttleLogLoading:!0,notShuttleList:[],notShuttleTotal:null,notShuttleListLoading:!1,shuttledList:[],shuttledTotal:null,shuttledListLoading:!1,userList:[],userListOption:!1,btnLoading:!1,studentListLoading:!1,studentList:[],studentListTotal:null,addStudentOption:!1,isAdd:!0,showModule:"list",shuttle:{userId:null,studentList:[]},shuttleLogQuery:{page:1,limit:20,condition:null,scope:"before"},notShuttleListQuery:{page:1,limit:20},shuttledListQuery:{page:1,limit:20,scope:"after"},studentListQuery:{page:1,limit:20}}},created:function(){this.getShuttleLog()},methods:{getShuttleLog:function(){var t=this;this.shuttleLogLoading=!0,this.shuttleLogQuery.condition=Object(c.a)(this.shuttleLogQuery.condition),Object(o.e)(this.shuttleLogQuery).then(function(e){t.shuttleLog=e.data.data.list,t.shuttleLogTotal=e.data.data.totalCount,t.shuttleLogLoading=!1})},getNotShuttleList:function(){var t=this;this.notShuttleListLoading=!0,Object(i.a)(this.notShuttleListQuery).then(function(e){t.notShuttleList=e.data.data.list,t.notShuttleTotal=e.data.data.totalCount,t.notShuttleListLoading=!1})},getShuttledList:function(){var t=this;this.shuttledListLoading=!0,Object(o.e)(this.shuttledListQuery).then(function(e){t.shuttledList=e.data.data.list,t.shuttledTotal=e.data.data.totalCount,t.shuttledListLoading=!1})},getUserList:function(){var t=this;Object(r.j)().then(function(e){t.userList=e.data.data})},handleSizeChange:function(t){this.shuttleLogQuery.limit=t,this.getShuttleLog()},handleCurrentChange:function(t){this.shuttleLogQuery.page=t,this.getShuttleLog()},notShuttleHandleCurrentChange:function(t){this.notShuttleListQuery.page=t,this.getNotShuttleList()},shuttledHandleSizeChange:function(t){this.shuttledListQuery.limit=t,this.getShuttledList()},shuttledHandleCurrentChange:function(t){this.shuttledListQuery.page=t,this.getShuttledList()},create:function(){this.getNotShuttleList(),this.getShuttledList(),this.showModule="info"},searchClick:function(){this.shuttleLogQuery.page=1,this.getShuttleLog()},backClick:function(){this.getShuttleLog(),this.showModule="list"},handleSelectionChange:function(t){this.shuttle.studentList=t},shuttleClick:function(){0===this.shuttle.studentList.length?this.$message.warning("请选择学员"):(this.getUserList(),this.shuttle.userId=null,this.userListOption=!0,this.isAdd=!0)},addStudent:function(){var t=this;0===this.shuttle.studentList.length?this.$message.warning("请选择学员"):null===this.shuttle.userId?this.$message.warning("请选择接送人"):(this.btnLoading=!0,Object(a.a)(this.shuttle).then(function(){t.userListOption=!1,t.addStudentOption=!1,t.btnLoading=!1,t.getNotShuttleList(),t.getShuttledList()}))},updateShuttleStudentClick:function(t,e){this.shuttle.shuttleId=t,this.shuttle.studentId=e,this.getUserList(),this.shuttle.userId=null,this.userListOption=!0,this.isAdd=!1},updateShuttleStudent:function(){var t=this;null===this.shuttle.userId?this.$message.warning("请选择接送人"):(this.btnLoading=!0,Object(a.c)(this.shuttle).then(function(){t.userListOption=!1,t.btnLoading=!1,t.addStudentOption=!1,t.getNotShuttleList(),t.getShuttledList()}))}}}},XhkQ:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=s("ORFD"),l=s("4zeu"),i=s("VU/8"),a=i(n.a,l.a,!1,null,null,null);e.default=a.exports},rkgi:function(t,e,s){"use strict";function n(t){return Object(l.a)({url:"/bespeak/shuttle/queryUndelivered",method:"get",params:t})}e.a=n;var l=s("vLgD")}});
//# sourceMappingURL=44.3693908ce8b4a38d6e27.js.map