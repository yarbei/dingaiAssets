(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-8c9681e8"],{"2fbc":function(e,l,a){"use strict";var n=function(){var e=this,l=e.$createElement,a=e._self._c||l;return a("el-breadcrumb",{attrs:{"separato-class":"el-icon-arrow-right"}},e._l(e.path,function(l){return a("el-breadcrumb-item",{key:l.name,attrs:{to:{name:l.name}}},[e._v(e._s(l.meta.title)+"\r\n  ")])}),1)},t=[],o=(a("cadf"),a("551c"),a("097d"),{name:"Dreadcrumb",created:function(){this.path=this.$route.matched},data:function(){return{path:[]}}}),r=o,i=(a("db41"),a("2877")),u=Object(i["a"])(r,n,t,!1,null,"265f03be",null);u.options.__file="Breadcrumb.vue";l["a"]=u.exports},"3fed":function(e,l,a){"use strict";a.r(l);var n=function(){var e=this,l=e.$createElement,a=e._self._c||l;return a("div",[a("Breadcrumb"),a("el-card",[a("el-row",[a("el-col",{attrs:{span:4}},[a("el-dropdown",{on:{command:e.addCompany}},[a("el-button",{attrs:{type:"primary"}},[e._v("\n            新增\n            "),a("i",{staticClass:"el-icon-arrow-down el-icon--right"})]),a("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[a("el-dropdown-item",[e._v("新建公司")])],1)],1)],1),a("el-col",{attrs:{span:20}},[a("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:e.formInline}},[a("el-form-item",{attrs:{label:"公司编码"}},[a("el-input",{attrs:{placeholder:"公司编码",required:""},model:{value:e.formInline.num,callback:function(l){e.$set(e.formInline,"num",l)},expression:"formInline.num"}})],1),a("el-form-item",{attrs:{label:"公司名称"}},[a("el-input",{attrs:{placeholder:"公司名称"},model:{value:e.formInline.name,callback:function(l){e.$set(e.formInline,"name",l)},expression:"formInline.name"}})],1),a("el-form-item",{attrs:{label:"父级"}},[a("el-cascader",{attrs:{options:e.options},on:{change:e.handleChange},model:{value:e.selectedOptions,callback:function(l){e.selectedOptions=l},expression:"selectedOptions"}})],1),a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:e.onSubmit}},[e._v("保存")])],1),a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:e.onDelete}},[e._v("删除")])],1),a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:e.onSubmit}},[e._v("禁用")])],1)],1)],1)],1)],1),a("el-tree",{attrs:{data:e.data,props:e.defaultProps},on:{"node-click":e.handleNodeClick}})],1)},t=[],o=(a("7f7f"),a("2fbc")),r={name:"OrgStruc",components:{Breadcrumb:o["a"]},data:function(){return{formInline:{num:"",name:"",father:""},data:[],defaultProps:{children:"children",label:"label"},options:[{value:"zhinan",label:"指南",children:[{value:"shejiyuanze",label:"设计原则",children:[{value:"yizhi",label:"一致"},{value:"fankui",label:"反馈"},{value:"xiaolv",label:"效率"},{value:"kekong",label:"可控"}]},{value:"daohang",label:"导航",children:[{value:"cexiangdaohang",label:"侧向导航"},{value:"dingbudaohang",label:"顶部导航"}]}]},{value:"zujian",label:"组件",children:[{value:"basic",label:"Basic",children:[{value:"layout",label:"Layout 布局"},{value:"color",label:"Color 色彩"},{value:"typography",label:"Typography 字体"},{value:"icon",label:"Icon 图标"},{value:"button",label:"Button 按钮"}]},{value:"form",label:"Form",children:[{value:"radio",label:"Radio 单选框"},{value:"checkbox",label:"Checkbox 多选框"},{value:"input",label:"Input 输入框"},{value:"input-number",label:"InputNumber 计数器"},{value:"select",label:"Select 选择器"},{value:"cascader",label:"Cascader 级联选择器"},{value:"switch",label:"Switch 开关"},{value:"slider",label:"Slider 滑块"},{value:"time-picker",label:"TimePicker 时间选择器"},{value:"date-picker",label:"DatePicker 日期选择器"},{value:"datetime-picker",label:"DateTimePicker 日期时间选择器"},{value:"upload",label:"Upload 上传"},{value:"rate",label:"Rate 评分"},{value:"form",label:"Form 表单"}]},{value:"data",label:"Data",children:[{value:"table",label:"Table 表格"},{value:"tag",label:"Tag 标签"},{value:"progress",label:"Progress 进度条"},{value:"tree",label:"Tree 树形控件"},{value:"pagination",label:"Pagination 分页"},{value:"badge",label:"Badge 标记"}]},{value:"notice",label:"Notice",children:[{value:"alert",label:"Alert 警告"},{value:"loading",label:"Loading 加载"},{value:"message",label:"Message 消息提示"},{value:"message-box",label:"MessageBox 弹框"},{value:"notification",label:"Notification 通知"}]},{value:"navigation",label:"Navigation",children:[{value:"menu",label:"NavMenu 导航菜单"},{value:"tabs",label:"Tabs 标签页"},{value:"breadcrumb",label:"Breadcrumb 面包屑"},{value:"dropdown",label:"Dropdown 下拉菜单"},{value:"steps",label:"Steps 步骤条"}]},{value:"others",label:"Others",children:[{value:"dialog",label:"Dialog 对话框"},{value:"tooltip",label:"Tooltip 文字提示"},{value:"popover",label:"Popover 弹出框"},{value:"card",label:"Card 卡片"},{value:"carousel",label:"Carousel 走马灯"},{value:"collapse",label:"Collapse 折叠面板"}]}]},{value:"ziyuan",label:"资源",children:[{value:"axure",label:"Axure Components"},{value:"sketch",label:"Sketch Templates"},{value:"jiaohu",label:"组件交互文档"}]}],selectedOptions:[],selectedOptions2:[]}},methods:{handleChange:function(e){console.log(e)},onSubmit:function(){""===this.formInline.name||""===this.formInline.num?this.$confirm("名称、编码不能为空"):this.data.push({label:this.formInline.name,num:this.formInline.num})},onDelete:function(){var e=this;this.$confirm("是够永久删除该公司及子公司?",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){e.data.splice(e.$treeNodeId,0,""),e.$message({type:"success",message:"删除成功!"})}).catch(function(){e.$message({type:"info",message:"已取消删除"})})},addCompany:function(){console.log(1)},handleNodeClick:function(e){console.log(e),this.formInline.name=e.label,this.formInline.num=e.num},handleSelect:function(e){console.log(e)}}},i=r,u=a("2877"),c=Object(u["a"])(i,n,t,!1,null,null,null);c.options.__file="OrgStruc.vue";l["default"]=c.exports},"7f7f":function(e,l,a){var n=a("86cc").f,t=Function.prototype,o=/^\s*function ([^ (]*)/,r="name";r in t||a("9e1e")&&n(t,r,{configurable:!0,get:function(){try{return(""+this).match(o)[1]}catch(e){return""}}})},"85ea":function(e,l,a){},db41:function(e,l,a){"use strict";var n=a("85ea"),t=a.n(n);t.a}}]);
//# sourceMappingURL=chunk-8c9681e8-legacy.9af3d5cc.js.map