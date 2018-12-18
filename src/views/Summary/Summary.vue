<template>
   <div>
    	 <Breadcrumb></Breadcrumb>
	    	 <el-card>
	    	<el-tabs v-model="activeName">
    	   		<el-tab-pane label="分类汇总" name="active">
    	   			<el-form ref="form" :model="formData" size="small" label-width="60px" class="demo-form-inline" style="display:inline-block">
    	   				<el-form-item label="公司:">
		                  <el-select placeholder="请选择公司" v-model="formData.sel">
		                    <el-option
		                      v-for="v in $store.state.company"
		                      :key="v.id"
		                      :label="v.name"
		                      :value="v.id"
		             
		                    ></el-option>
		                  </el-select>
		                </el-form-item>
    	   			</el-form>
    	   			<el-button size="small" @click="exportExcel" style="margin-left: 15px;">导出</el-button>
    	   		</el-tab-pane> 
    	   </el-tabs>
    	   <!-- 资产表格 -->
    	   <el-table
	    	   :data="classSum"
	    	   border
	    	   style="width: 100%"
	    	   align="center"
	    	   >
	    	   <el-table-column type="selection" width="30"></el-table-column>
	    	   <el-table-column prop="class_code" label="类别编码" ></el-table-column>
	    	   <el-table-column prop="class_name" label="类别名称" ></el-table-column>
	    	   <el-table-column prop="assets_num" label="资产数量" ></el-table-column>
	    	    <el-table-column prop="assets_money" label="资产金额" >
	    	   	<template slot-scope="scope">{{scope.row.assets_money | currency}}</template>
	    	   </el-table-column>
    		</el-table>

      	<!-- 分页 -->
	      	<el-pagination
		        @size-change="handleSizeChange"
		        @current-change="handleCurrentChange"
		        :page-sizes="[10, 20, 30, 50]"
		        :page-size="10"
		        layout="sizes, prev, pager, next"
		        :total="400"
		        background
		      ></el-pagination>
    	</el-card>
    </div>
</template>
<script>
import Breadcrumb from "@/components/Breadcrumb.vue";
export default {
    name:'Summary',
      data(){
    	return {
    		activeName:"active",
    		search: "",
    		classSum:[],
    		pageSize: 10, //分页默认size
    		formData:{},
    	}
    },
    components:{
    	Breadcrumb,
    },
    methods:{
    	  // 分页条数变化
	    handleSizeChange() {},
	    // 当前页发生变化
	    handleCurrentChange(currentPage) {},
	     //导出表格
	    exportExcel() {
	      this.$store.commit("exportExcel");
	    },

    },
    mounted(){
    	this.classSum =[
    		{
    			class_code:"01",
    			class_name:"土地、房屋及构筑物",
    			assets_num:100,
    			assets_money:10000
    		},
    		{
    			class_code:"02",
    			class_name:"专用设备",
    			assets_num:50,
    			assets_money:5000
    		},
    		{
    			class_code:"03",
    			class_name:"图书文物及陈列品",
    			assets_num:1000,
    			assets_money:10000
    		}
    	]
    }
}
</script>
<style lang="less" scoped>
	.el-tabs__content{
		overflow:auto;
	}
	.el-table{
		margin-top:0px;
	}
</style>