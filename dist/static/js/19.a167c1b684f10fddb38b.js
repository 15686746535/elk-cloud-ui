webpackJsonp([19],{"3EW4":function(e,t,o){"use strict";var n=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"app-container calendar-list-container",style:{height:e.$store.state.app.client.height+"px"}},[o("el-row",{attrs:{gutter:10}},[o("el-col",{staticClass:"org-tree-left"},[o("el-card",{staticClass:"box-card"},[o("span",{staticStyle:{"font-size":"16px","font-family":"'微软雅黑 Light'",color:"rgb(145,145,145)"}},[e._v("┃ 菜单树")]),e._v(" "),o("my-tree",{attrs:{url:"/upms/menu/tree",choiceType:"folder"},on:{node:e.getNodeData},model:{value:e.currentId,callback:function(t){e.currentId=t},expression:"currentId"}})],1)],1),e._v(" "),o("el-col",{style:{width:e.$store.state.app.client.width-225+"px"}},[o("el-card",{staticClass:"box-card",staticStyle:{height:"80px","margin-bottom":"10px"}},[o("el-button-group",[o("el-button",{attrs:{type:"primary"},on:{click:e.handlerAdd}},[o("i",{staticClass:"el-icon-plus"}),e._v("添加")]),e._v(" "),o("el-button",{attrs:{type:"primary"},on:{click:e.handlerEdit}},[o("i",{staticClass:"el-icon-edit"}),e._v("编辑")]),e._v(" "),o("el-button",{attrs:{type:"primary"},on:{click:e.handleDelete}},[o("i",{staticClass:"el-icon-delete"}),e._v("删除")])],1)],1),e._v(" "),o("el-card",{staticClass:"box-card",staticStyle:{overflow:"auto"},style:{height:e.$store.state.app.client.height-130+"px"}},[o("el-form",{ref:"form",attrs:{"label-position":"right","label-width":"80px",model:e.form}},[o("el-form-item",{attrs:{label:"父级节点",prop:"parentId"}},[o("el-input",{attrs:{disabled:"",placeholder:"请选择父级节点"},model:{value:e.parentName,callback:function(t){e.parentName=t},expression:"parentName"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"节点类型",prop:"type"}},[o("el-select",{attrs:{disabled:e.formEdit,placeholder:"请选择菜单类型"},model:{value:e.form.type,callback:function(t){e.$set(e.form,"type",t)},expression:"form.type"}},[o("el-option",{key:"0",attrs:{label:"菜单",value:"0"}}),e._v(" "),o("el-option",{key:"1",attrs:{label:"按钮",value:"1"}})],1)],1),e._v(" "),o("el-form-item",{attrs:{label:"菜单名字",prop:"name"}},[o("el-input",{attrs:{disabled:e.formEdit,placeholder:"请输入名字"},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1),e._v(" "),-1!==e.form.parentId||"1"===e.form.type?o("el-form-item",{attrs:{label:"权限标识",prop:"permission"}},[o("el-input",{attrs:{disabled:e.formEdit,placeholder:"请输入权限标识"},model:{value:e.form.permission,callback:function(t){e.$set(e.form,"permission",t)},expression:"form.permission"}})],1):e._e(),e._v(" "),"0"===e.form.type?o("el-form-item",{attrs:{label:"菜单图标",prop:"icon"}},[o("div",{staticStyle:{position:"relative"}},[o("input",{directives:[{name:"model",rawName:"v-model",value:e.form.icon,expression:"form.icon"}],staticClass:"ran-input hover",class:e.formEdit?"disabled":"",staticStyle:{height:"40px"},attrs:{readonly:"",placeholder:"请选择图标"},domProps:{value:e.form.icon},on:{click:function(t){e.formEdit?e.iconDialog=!1:e.iconDialog=!0},input:function(t){t.target.composing||e.$set(e.form,"icon",t.target.value)}}}),e._v(" "),o("div",{staticStyle:{position:"absolute",top:"0",right:"15px","font-size":"24px"}},[null!=e.form.icon?o("svg-icon",{attrs:{"icon-class":e.form.icon}}):e._e()],1)])]):e._e(),e._v(" "),"0"===e.form.type?o("el-form-item",{attrs:{label:"菜单路由",prop:"path"}},[o("el-input",{attrs:{disabled:e.formEdit,placeholder:"请输入路由"},model:{value:e.form.path,callback:function(t){e.$set(e.form,"path",t)},expression:"form.path"}})],1):e._e(),e._v(" "),-1!==e.form.parentId||"1"===e.form.type?o("el-form-item",{attrs:{label:"资源路径",prop:"url"}},[o("el-input",{attrs:{disabled:e.formEdit,placeholder:"请输入资源路径"},model:{value:e.form.url,callback:function(t){e.$set(e.form,"url",t)},expression:"form.url"}})],1):e._e(),e._v(" "),o("el-form-item",{directives:[{name:"show",rawName:"v-show",value:-1!==e.form.parentId||"1"===e.form.type,expression:"form.parentId!==-1||form.type==='1'"}],attrs:{label:"请求方法",prop:"method"}},[o("el-select",{staticClass:"filter-item",attrs:{disabled:e.formEdit,placeholder:"请选择请求类型"},model:{value:e.form.method,callback:function(t){e.$set(e.form,"method",t)},expression:"form.method"}},e._l(e.methodOptions,function(e){return o("el-option",{key:e,attrs:{label:e,value:e}})}))],1),e._v(" "),"0"===e.form.type?o("el-form-item",{attrs:{label:"前端路径",prop:"component"}},[o("el-input",{attrs:{disabled:e.formEdit,placeholder:"前端页面路径"},model:{value:e.form.component,callback:function(t){e.$set(e.form,"component",t)},expression:"form.component"}})],1):e._e(),e._v(" "),o("el-form-item",{attrs:{label:"排序",prop:"sort"}},[o("el-input",{attrs:{type:"number",disabled:e.formEdit,placeholder:"请输入排序"},model:{value:e.form.sort,callback:function(t){e.$set(e.form,"sort",t)},expression:"form.sort"}})],1),e._v(" "),"update"==e.formStatus?o("el-form-item",[o("el-button",{attrs:{type:"primary"},on:{click:e.update}},[e._v("更新")]),e._v(" "),o("el-button",{on:{click:e.onCancel}},[e._v("取消")])],1):e._e(),e._v(" "),"create"==e.formStatus?o("el-form-item",[o("el-button",{attrs:{type:"primary"},on:{click:e.create}},[e._v("保存")]),e._v(" "),o("el-button",{on:{click:e.onCancel}},[e._v("取消")])],1):e._e()],1)],1)],1)],1),e._v(" "),o("el-dialog",{staticClass:"my-dialog",attrs:{visible:e.iconDialog,"custom-class":"tabs-dialog",width:"500px"},on:{"update:visible":function(t){e.iconDialog=t}}},[o("el-tabs",{attrs:{type:"border-card"}},[o("el-tab-pane",[o("span",{attrs:{slot:"label"},slot:"label"},[o("i",{staticClass:"el-icon-menu"}),e._v(" 菜单")]),e._v(" "),o("div",{staticClass:"icon-container"},[o("span",{staticClass:"icon-span",on:{click:function(t){e.iconSelected("")}}},[e._v("无")]),e._v(" "),e._l(e.icons,function(t){return o("span",{staticClass:"icon-span",on:{click:function(o){e.iconSelected(t)}}},[o("svg-icon",{attrs:{"icon-class":t}})],1)})],2)]),e._v(" "),o("el-tab-pane",[o("span",{attrs:{slot:"label"},slot:"label"},[o("i",{staticClass:"el-icon-more"}),e._v(" 补充")]),e._v(" "),o("div",{staticClass:"icon-container"},e._l(e.icons,function(t,n){return n%2?o("span",{staticClass:"icon-span",on:{click:function(o){e.iconSelected(t)}}},[o("svg-icon",{attrs:{"icon-class":t}})],1):e._e()}))])],1)],1)],1)},r=[],i={render:n,staticRenderFns:r};t.a=i},"78fv":function(e,t,o){"use strict";function n(e){o("VN5a")}Object.defineProperty(t,"__esModule",{value:!0});var r=o("l3C+"),i=o("3EW4"),a=o("VU/8"),s=n,l=a(r.a,i.a,!1,s,"data-v-fbb279fe",null);t.default=l.exports},VN5a:function(e,t,o){var n=o("wqeU");"string"==typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);o("rjj0")("0ea1d270",n,!0)},"l3C+":function(e,t,o){"use strict";var n=o("Dd8w"),r=o.n(n),i=o("v513"),a=o("NYxO");t.a={name:"menu",data:function(){return{formStatus:"",iconDialog:!1,typeOptions:["0","1"],methodOptions:["GET","POST","PUT","DELETE"],icons:["404","eye","menu","password","user","users","org","eye","menu","password","user","users","org","eye","menu","password","user","users","org","eye","menu","password","user","users","org","eye","menu","password","user","users","org","eye","menu","password","user","users","org"],treeData:[],form:{permission:void 0,name:void 0,parentId:void 0,url:void 0,path:void 0,icon:void 0,sort:void 0,component:void 0,type:void 0,generateBtn:!1,method:void 0},currentId:null,currentMenu:null,parentName:null,menuManager_btn_add:!0,menuManager_btn_edit:!0,menuManager_btn_del:!0}},created:function(){this.getList(),this.menuManager_btn_add=this.permissions.upms_menu_add,this.menuManager_btn_edit=this.permissions.upms_menu_update,this.menuManager_btn_del=this.permissions.upms_menu_del},computed:r()({},Object(a.b)(["elements","permissions","client"]),{formEdit:function(){return""===this.formStatus}}),methods:{getList:function(){var e=this;Object(i.c)().then(function(t){e.treeData=t.data.data})},getNodeData:function(e){this.currentMenu=e,this.setForm()},setForm:function(){"update"===this.formStatus?(this.form=this.currentMenu,this.form.menuId=this.currentMenu.id,this.parentName=this.currentMenu.parentName?this.currentMenu.parentName:"无"):"create"===this.formStatus&&(this.currentMenu?(this.parentName=this.currentMenu.name,this.form.parentId=this.currentMenu.id):(this.parentName="无",this.form.parentId=-1))},iconSelected:function(e){this.iconDialog=!1,this.form.icon=e},handlerEdit:function(){this.currentMenu?(this.formStatus="update",this.setForm()):this.$notify({title:"错误",message:"请选择菜单",type:"error",duration:2e3})},handlerAdd:function(){this.formStatus="create",this.resetForm(),this.setForm()},handleDelete:function(){var e=this;this.$confirm("此操作将永久删除, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){Object(i.b)(e.currentId).then(function(){e.getList(),e.resetForm(),e.onCancel(),e.$notify({title:"成功",message:"删除成功",type:"success",duration:2e3})})})},update:function(){var e=this;this.formStatus="",Object(i.d)(this.form).then(function(){e.getList(),e.$notify({title:"成功",message:"更新成功",type:"success",duration:2e3})})},create:function(){var e=this;this.formStatus="",this.form.generateBtn="0"===this.form.type,Object(i.a)(this.form).then(function(){e.getList(),e.resetForm(),e.$notify({title:"成功",message:"创建成功",type:"success",duration:2e3})})},onCancel:function(){this.resetForm(),this.formStatus=""},resetForm:function(){this.form={permission:void 0,name:void 0,parentId:void 0,url:void 0,path:void 0,icon:void 0,sort:void 0,component:void 0,type:void 0,generateBtn:!1,method:void 0}}}}},v513:function(e,t,o){"use strict";function n(e){return Object(s.a)({url:"/upms/menu/tree",method:"get",params:e})}function r(e){return Object(s.a)({url:"/upms/menu",method:"post",data:e})}function i(e){return Object(s.a)({url:"/upms/menu/"+e,method:"delete"})}function a(e){return Object(s.a)({url:"/upms/menu",method:"put",data:e})}t.c=n,t.a=r,t.b=i,t.d=a;var s=o("vLgD")},wqeU:function(e,t,o){t=e.exports=o("FZ+f")(!0),t.push([e.i,"@media screen and (max-height:768px){.menuTreeCard[data-v-fbb279fe]{height:200px}}.icon-span[data-v-fbb279fe]{font-size:30px;margin:10px;color:#000;line-height:40px}.icon-container[data-v-fbb279fe]{height:250px;overflow:auto;margin-bottom:10px;padding-left:10px}.icon-container .icon-span[data-v-fbb279fe]:hover{cursor:pointer;color:#419dff}.ran-input[data-v-fbb279fe]{width:100%;-webkit-appearance:none;background-color:#fff;border-radius:4px;border:1px solid #dcdfe6;-webkit-box-sizing:border-box;box-sizing:border-box;color:#606266;display:inline-block;font-size:inherit;line-height:1;outline:0;padding:0 15px;-webkit-transition:border-color .2s cubic-bezier(.645,.045,.355,1);transition:border-color .2s cubic-bezier(.645,.045,.355,1)}.ran-input[data-v-fbb279fe]:hover{border:1px solid #bfc1c7}.ran-input.disabled[data-v-fbb279fe]{background-color:#f5f7fa;border-color:#e4e7ed;color:#c0c4cc;cursor:not-allowed}","",{version:3,sources:["G:/WebStrom/elk-cloud-ui/src/views/modules/sys/menu/index.vue"],names:[],mappings:"AACA,qCACA,+BAAgC,YAAa,CAC5C,CACA,AACD,4BACE,eAAgB,AAChB,YAAa,AACb,WAAa,AACb,gBAAkB,CACnB,AACD,iCACE,aAAc,AACd,cAAe,AACf,mBAAoB,AACpB,iBAAmB,CACpB,AACD,kDACE,eAAgB,AAChB,aAAe,CAChB,AACD,4BACE,WAAY,AACZ,wBAAyB,AACzB,sBAAuB,AACvB,kBAAmB,AACnB,yBAA0B,AAC1B,8BAA+B,AACvB,sBAAuB,AAC/B,cAAe,AACf,qBAAsB,AACtB,kBAAmB,AACnB,cAAe,AACf,UAAW,AACX,eAAgB,AAChB,mEAAoE,AACpE,0DAA4D,CAC7D,AACD,kCACE,wBAA0B,CAC3B,AACD,qCACE,yBAA0B,AAC1B,qBAAsB,AACtB,cAAe,AACf,kBAAoB,CACrB",file:"index.vue",sourcesContent:["\n@media screen and (max-height: 768px) {\n.menuTreeCard[data-v-fbb279fe] {height: 200px\n}\n}\n.icon-span[data-v-fbb279fe]{\n  font-size: 30px;\n  margin: 10px;\n  color: black;\n  line-height: 40px;\n}\n.icon-container[data-v-fbb279fe]{\n  height: 250px;\n  overflow: auto;\n  margin-bottom: 10px;\n  padding-left: 10px;\n}\n.icon-container .icon-span[data-v-fbb279fe]:hover{\n  cursor: pointer;\n  color: #419dff;\n}\n.ran-input[data-v-fbb279fe]{\n  width: 100%;\n  -webkit-appearance: none;\n  background-color: #fff;\n  border-radius: 4px;\n  border: 1px solid #dcdfe6;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  color: #606266;\n  display: inline-block;\n  font-size: inherit;\n  line-height: 1;\n  outline: 0;\n  padding: 0 15px;\n  -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);\n  transition: border-color .2s cubic-bezier(.645,.045,.355,1);\n}\n.ran-input[data-v-fbb279fe]:hover{\n  border: 1px solid #bfc1c7;\n}\n.ran-input.disabled[data-v-fbb279fe]{\n  background-color: #f5f7fa;\n  border-color: #e4e7ed;\n  color: #c0c4cc;\n  cursor: not-allowed;\n}\n.my-dialog[data-v-fbb279fe]{\n}\n\n"],sourceRoot:""}])}});
//# sourceMappingURL=19.a167c1b684f10fddb38b.js.map