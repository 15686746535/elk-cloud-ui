webpackJsonp([39],{"3xAv":function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=i("Svex"),n=i("dMSF"),s=i("VU/8"),l=s(a.a,n.a,!1,null,null,null);e.default=l.exports},Svex:function(t,e,i){"use strict";var a=i("iB5p");i("E4LH");e.a={name:"table_frequency",data:function(){return{frequency:{},list:[],total:null,listLoading:!0,showModule:"list",listQuery:{page:1,limit:20}}},created:function(){this.getList()},methods:{getList:function(){var t=this;this.listLoading=!0,Object(a.a)(this.listQuery).then(function(e){t.list=e.data.data.list,t.total=e.data.data.totalCount,t.listLoading=!1})},handleSizeChange:function(t){this.listQuery.limit=t,this.getList()},handleCurrentChange:function(t){this.listQuery.page=t,this.getList()},create:function(){this.frequency={},this.showModule="info"},update:function(t){var e=this;Object(a.b)(t.roleId).then(function(t){e.frequency=t.data,e.showModule="info"})},searchClick:function(){this.listQuery.page=1,this.getList()},delete:function(t){this.getList()},cancel:function(){this.showModule="list"}}}},dMSF:function(t,e,i){"use strict";var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"app-container calendar-list-container"},[i("div",{directives:[{name:"show",rawName:"v-show",value:"list"==t.showModule,expression:"showModule=='list'"}]},[i("el-card",{staticStyle:{"margin-bottom":"5px"}},[i("div",{staticClass:"filter-container"},[i("el-input",{staticClass:"filter-item",staticStyle:{width:"200px"},attrs:{placeholder:"姓名/电话/身份证"},nativeOn:{keyup:function(e){if(!("button"in e)&&t._k(e.keyCode,"enter",13,e.key))return null;t.searchClick(e)}},model:{value:t.listQuery.roleName,callback:function(e){t.$set(t.listQuery,"roleName",e)},expression:"listQuery.roleName"}}),t._v(" "),i("el-button",{staticClass:"filter-item",attrs:{type:"primary",icon:"search"},on:{click:t.searchClick}},[t._v("搜索")]),t._v(" "),i("el-button",{staticClass:"filter-item",staticStyle:{"margin-left":"10px"},attrs:{type:"primary"},on:{click:t.create}},[i("i",{staticClass:"el-icon-plus"}),t._v("添加")])],1)]),t._v(" "),i("el-card",[i("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],key:t.tableKey,staticStyle:{width:"100%"},attrs:{data:t.list,"element-loading-text":"给我一点时间",border:"",fit:"","highlight-current-row":""}},[i("el-table-column",{staticClass:"selection",attrs:{type:"selection",align:"center",prop:"uuid"}}),t._v(" "),i("el-table-column",{attrs:{type:"index",label:"序号",align:"center",width:"50"}}),t._v(" "),i("el-table-column",{attrs:{label:"学员ID"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",[t._v(t._s(e.row.studentId))])]}}])}),t._v(" "),i("el-table-column",{attrs:{label:"科目"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",[t._v(t._s(e.row.subject))])]}}])}),t._v(" "),i("el-table-column",{attrs:{label:"次数"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",[t._v(t._s(e.row.frequency))])]}}])}),t._v(" "),i("el-table-column",{attrs:{label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("el-button",{attrs:{size:"mini",type:"success"},on:{click:function(i){t.update(e.row)}}},[t._v("编辑\n            ")]),t._v(" "),i("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(t){delete e.row}}},[t._v("删除\n            ")])]}}])})],1),t._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:!t.listLoading,expression:"!listLoading"}],staticClass:"pagination-container",staticStyle:{"margin-top":"20px"}},[i("el-pagination",{attrs:{"current-page":t.listQuery.page,background:"","page-sizes":[10,20,30,50],"page-size":t.listQuery.limit,layout:"total, sizes, prev, pager, next, jumper",total:t.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange,"update:currentPage":function(e){t.$set(t.listQuery,"page",e)}}})],1)],1)],1),t._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:"info"==t.showModule,expression:"showModule=='info'"}]},[i("el-card",[i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:t.cancel}},[i("i",{staticClass:"el-icon-fa-undo"}),t._v(" 取 消")]),t._v(" "),"create"==t.dialogStatus?i("el-button",{attrs:{type:"primary"},on:{click:t.create}},[t._v("确 定")]):i("el-button",{attrs:{type:"primary"},on:{click:t.update}},[t._v("修 改")])],1)])],1)])},n=[],s={render:a,staticRenderFns:n};e.a=s},iB5p:function(t,e,i){"use strict";function a(t){return Object(s.a)({url:"/stu/frequency/getPage",method:"get",params:t})}function n(t){return Object(s.a)({url:"/stu/frequency/"+t,method:"get"})}e.a=a,e.b=n;var s=i("vLgD")}});
//# sourceMappingURL=39.7aa58c26377297d0d2b0.js.map