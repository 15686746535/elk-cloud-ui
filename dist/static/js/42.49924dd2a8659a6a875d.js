webpackJsonp([42],{DzwQ:function(t,e,i){"use strict";function a(t){return Object(o.a)({url:"/basis/affiche/getPage",method:"get",params:t})}function n(t){return Object(o.a)({url:"/basis/affiche",method:"post",data:t})}function l(t){return Object(o.a)({url:"/basis/affiche/"+t,method:"delete"})}function s(t){return Object(o.a)({url:"/basis/affiche",method:"put",data:t})}e.c=a,e.a=n,e.b=l,e.d=s;var o=i("vLgD")},fzvx:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=i("pdOo"),n=i("pZfE"),l=i("VU/8"),s=l(a.a,n.a,!1,null,null,null);e.default=s.exports},pZfE:function(t,e,i){"use strict";var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"app-container calendar-list-container",style:{height:t.$store.state.app.client.height+"px"}},[i("el-card",{staticStyle:{"margin-bottom":"5px",height:"80px"}},[i("el-input",{staticClass:"filter-item",staticStyle:{width:"200px"},attrs:{placeholder:"关键词"},nativeOn:{keyup:function(e){if(!("button"in e)&&t._k(e.keyCode,"enter",13,e.key))return null;t.searchClick(e)}},model:{value:t.listQuery.condition,callback:function(e){t.$set(t.listQuery,"condition",e)},expression:"listQuery.condition"}}),t._v(" "),i("el-button",{staticClass:"filter-item",attrs:{type:"primary",icon:"search"},on:{click:t.searchClick}},[t._v("搜索")]),t._v(" "),i("el-button",{staticClass:"filter-item",staticStyle:{"margin-left":"10px"},attrs:{type:"primary"},on:{click:t.createClick}},[i("i",{staticClass:"el-icon-plus"}),t._v("添加")])],1),t._v(" "),i("el-card",{style:{height:t.$store.state.app.client.height-125+"px"}},[i("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],staticStyle:{width:"100%"},attrs:{data:t.list,height:t.$store.state.app.client.height-205,"element-loading-text":"给我一点时间",border:"",fit:"","highlight-current-row":""}},[i("el-table-column",{attrs:{type:"index",label:"序号",align:"center",width:"50"}}),t._v(" "),i("el-table-column",{attrs:{align:"center",label:"内容"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",[t._v(t._s(e.row.content))])]}}])}),t._v(" "),i("el-table-column",{attrs:{align:"center",label:"发布人"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",[t._v(t._s(e.row.operator))])]}}])}),t._v(" "),i("el-table-column",{attrs:{align:"center",label:"发布日期"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",[t._v(t._s(e.row.createTime))])]}}])}),t._v(" "),i("el-table-column",{attrs:{align:"center",label:"修改时间"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",[t._v(t._s(e.row.updateTime))])]}}])}),t._v(" "),i("el-table-column",{attrs:{align:"center",label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("el-button",{attrs:{size:"mini",type:"success"},on:{click:function(i){t.handleUpdate(e.row)}}},[t._v("编辑\n              ")]),t._v(" "),i("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(i){t.handleDelete(e.row)}}},[t._v("删除\n              ")])]}}])})],1),t._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:!t.listLoading,expression:"!listLoading"}],staticClass:"pagination-container",staticStyle:{"margin-top":"20px"}},[i("el-pagination",{attrs:{"current-page":t.listQuery.page,background:"","page-sizes":[10,20,30,50],"page-size":t.listQuery.limit,layout:"total, sizes, prev, pager, next, jumper",total:t.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange,"update:currentPage":function(e){t.$set(t.listQuery,"page",e)}}})],1)],1),t._v(" "),i("el-dialog",{attrs:{title:t.textMap[t.dialogStatus],width:"550px",visible:t.dialogFormVisible},on:{"update:visible":function(e){t.dialogFormVisible=e}}},[i("el-form",{ref:"affiche",attrs:{"label-position":"left",model:t.affiche,rules:t.rules,"label-width":"100px"}},[i("el-form-item",{attrs:{label:"公告内容"}},[i("el-input",{attrs:{type:"text",placeholder:"公告内容"},model:{value:t.affiche.content,callback:function(e){t.$set(t.affiche,"content",e)},expression:"affiche.content"}})],1)],1),t._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(e){t.cancel("affiche")}}},[i("i",{staticClass:"el-icon-fa-undo"}),t._v(" 取 消")]),t._v(" "),"create"==t.dialogStatus?i("el-button",{attrs:{type:"primary"},on:{click:function(e){t.create("affiche")}}},[t._v("确 定")]):i("el-button",{attrs:{type:"primary"},on:{click:function(e){t.update("affiche")}}},[t._v("修 改")])],1)],1)],1)},n=[],l={render:a,staticRenderFns:n};e.a=l},pdOo:function(t,e,i){"use strict";var a=i("Dd8w"),n=i.n(a),l=i("DzwQ"),s=i("E4LH"),o=i("NYxO");e.a={name:"table_affiche",data:function(){return{affiche:{},list:[],total:null,listLoading:!0,showModule:"list",listQuery:{page:1,limit:20},rules:{},textMap:{update:"编辑",create:"创建"},dialogStatus:"",dialogFormVisible:!1}},created:function(){this.getList()},computed:n()({},Object(o.b)(["permissions","client"])),methods:{getList:function(){var t=this;this.listLoading=!0,Object(l.c)(this.listQuery).then(function(e){t.list=e.data.data.list,t.total=e.data.data.totalCount,t.listLoading=!1})},handleSizeChange:function(t){this.listQuery.limit=t,this.getList()},handleCurrentChange:function(t){this.listQuery.page=t,this.getList()},searchClick:function(){this.listQuery.page=1,this.listQuery.condition=Object(s.a)(this.listQuery.condition),this.getList()},createClick:function(){this.dialogStatus="create",this.dialogFormVisible=!0,this.affiche={}},handleUpdate:function(t){this.affiche=t,this.dialogStatus="update",this.dialogFormVisible=!0},handleDelete:function(t){var e=this;this.$confirm("此操作将永久删除, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){Object(l.b)(t.afficheId).then(function(t){e.dialogFormVisible=!1,e.getList(),e.$notify({title:"成功",message:"删除成功",type:"success",duration:2e3})})})},create:function(t){var e=this;this.$refs[t].validate(function(t){if(!t)return!1;Object(l.a)(e.affiche).then(function(){e.dialogFormVisible=!1,e.getList(),e.$notify({title:"成功",message:"创建成功",type:"success",duration:2e3})})})},cancel:function(t){this.dialogFormVisible=!1,this.affiche={},this.$refs[t].resetFields()},update:function(t){var e=this;this.$refs[t].validate(function(t){if(!t)return!1;Object(l.d)(e.affiche).then(function(){e.dialogFormVisible=!1,e.getList(),e.$notify({title:"成功",message:"修改成功",type:"success",duration:2e3})})})}}}}});
//# sourceMappingURL=42.49924dd2a8659a6a875d.js.map