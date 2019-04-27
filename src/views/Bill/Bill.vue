<template>
	<div>
    	 <Breadcrumb></Breadcrumb>
	    	 <el-card>
	    	<el-tabs v-model="activeName">
    	   		<el-tab-pane label="资产登记" name="active">
    	   			<el-row>
    	   				<el-col :span="18">
    	   					<el-dropdown split-button type="primary" size="small" style="margin-left:10px">
    	   						<i class="el-icon-printer"></i>
    	   						使用公司
    	   						<el-dropdown-menu slot="dropdown">
    	   							<el-dropdown-item>康佳</el-dropdown-item>
    	   							<el-dropdown-item>康琴</el-dropdown-item>
    	   						</el-dropdown-menu>
    	   					</el-dropdown>
    	   					 <el-button type="primary" icon="el-icon-plus" size="small" style="margin-left: 15px;">导出</el-button>
    	   				</el-col>
    	   				<el-col :span="6">
    	   						<el-input
    	   						placeholder="请输入内容"
    	   						v-model="search"
    	   						class="input-with-select"
    	   						size="small"
    	   						>
    	   						<el-button slot="append" icon="el-icon-search"></el-button>
    	   						</el-input>
    	   				</el-col>
    	   			</el-row>
    	   		</el-tab-pane> 
    	   </el-tabs>
    	   <!-- 资产表格 -->
    	   <el-table
	    	   :data="registerData"
	    	   border
	    	   style="width: 100%"
	    	   align="center"
	    	   >
	    	   <el-table-column type="selection"></el-table-column>
	    	   <el-table-column prop="status" label="资产状态" align="center">
		    	   	<template slot-scope="scope">
		    	   		<da-assets-state :status="scope.row.status"></da-assets-state>
		    	   	</template>
	    	   </el-table-column>
	    	   <el-table-column prop="bar_code" label="资产条码" width="130"></el-table-column>
	    	   <el-table-column prop="name" label="资产名称"></el-table-column>
	    	   <el-table-column prop="type_id" label="资产类型"></el-table-column>
	    	   <el-table-column prop="specification" label="规格型号"></el-table-column>
	    	   <el-table-column prop="sn" label="产品序列"></el-table-column>
	    	   <el-table-column prop="money" label="金额">
	    	   	<template slot-scope="scope">{{scope.row.money | currency}}</template>
	    	   </el-table-column>
	    	   <el-table-column prop="company" label="使用公司"></el-table-column>
	    	   <el-table-column prop="department" label="使用部门"></el-table-column>
	    	   <el-table-column prop="purchase_time" label="购买时间">
	    	   	<template slot-scope="scope">{{scope.row.purchase_time | date}}</template>
	    	   </el-table-column>
	    	   <el-table-column prop="user_id" label="使用人"></el-table-column>
	    	   <el-table-column prop="manager_id" label="管理员"></el-table-column>
	    	   <el-table-column prop="address" label="存放地点"></el-table-column>
	    	   <el-table-column prop="duration_use" label="使用期限"></el-table-column>
	    	   <el-table-column prop="source" label="来源"></el-table-column>
	    	   <el-table-column  label="操作" fixed="right"  >
	    	   	<template slot-scope="scope">
	    	   		<el-button  type="text" size="small"  @click="seeDialog(scope.row)">查看</el-button>
	    	   	</template>
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
    		 <!-- 查看资产表单 -->
		    <el-dialog title="查看" :visible.sync="seeDialogTableVisible" width="80%">
		      <el-tabs tab-position="left">
		        <el-tab-pane label="基本信息">
		          <el-form
		            :inline="true"
		            :model="seeData"
		            class="demo-form-inline"
		            :size="$store.state.uiSize"
		            label-width="80px"
		            :disabled="true"
		          >
		            <el-row>
		              <el-col :span="8">
		                <el-form-item label="资产条码">
		                  <el-input placeholder="资产条码" v-model="seeData.bar_code" readonly></el-input>
		                </el-form-item>
		              </el-col>
		              <el-col :span="8">
		                <el-form-item label="资产名称">
		                  <el-input placeholder="资产名称" v-model="seeData.name"></el-input>
		                </el-form-item>
		              </el-col>
		              <el-col :span="8">
		                <el-form-item label="资产类型">
		                  <el-select placeholder="资产类型" v-model="seeData.type_id">
		                    <el-option
		                      v-for="v in $store.state.type"
		                      :key="v.id"
		                      :label="v.name"
		                      :value="v.id"
		                    ></el-option>
		                  </el-select>
		                </el-form-item>
		              </el-col>
		            </el-row>
		            <el-row>
		              <el-col :span="8">
		                <el-form-item label="规格型号">
		                  <el-input placeholder="规格型号" v-model="seeData.specification"></el-input>
		                </el-form-item>
		              </el-col>
		              <el-col :span="8">
		                <el-form-item label="SN号">
		                  <el-input placeholder="SN号" v-model="seeData.sn"></el-input>
		                </el-form-item>
		              </el-col>
		              <el-col :span="8">
		                <el-form-item label="计量单位">
		                  <el-input placeholder="计量单位" v-model="seeData.metering"></el-input>
		                </el-form-item>
		              </el-col>
		            </el-row>
		            <el-row>
		              <el-col :span="8">
		                <el-form-item label="金额">
		                  <el-input placeholder="金额" v-model="seeData.money"></el-input>
		                </el-form-item>
		              </el-col>
		              <el-col :span="8">
		                <el-form-item label="使用公司">
		                  <el-select placeholder="使用公司" v-model="seeData.company">
		                    <el-option
		                      v-for="v in $store.state.company"
		                      :key="v.id"
		                      :label="v.name"
		                      :value="v.id"
		                    ></el-option>
		                  </el-select>
		                </el-form-item>
		              </el-col>
		              <el-col :span="8">
		                <el-form-item label="使用部门">
		                  <el-select placeholder="使用部门" v-model="seeData.department">
		                    <el-option
		                      v-for="v in $store.state.department"
		                      :key="v.id"
		                      :label="v.name"
		                      :value="v.id"
		                    ></el-option>
		                  </el-select>
		                </el-form-item>
		              </el-col>
		            </el-row>
		            <el-row>
		              <el-col :span="8">
		                <el-form-item label="购买时间">
		                  <el-input placeholder="购买时间" v-model="seeData.purchase_time"></el-input>
		                </el-form-item>
		              </el-col>
		              <el-col :span="8">
		                <el-form-item label="使用人">
		                  <el-select placeholder="使用人" v-model="seeData.user_id">
		                    <el-option
		                      v-for="v in $store.state.staff"
		                      :key="v.id"
		                      :label="v.name"
		                      :value="v.id"
		                    ></el-option>
		                  </el-select>
		                </el-form-item>
		              </el-col>
		              <el-col :span="8">
		                <el-form-item label="管理员">
		                  <el-select placeholder="管理员" v-model="seeData.manager_id">
		                    <el-option
		                      v-for="v in $store.state.admin"
		                      :key="v.id"
		                      :label="v.name"
		                      :value="v.id"
		                    ></el-option>
		                  </el-select>
		                </el-form-item>
		              </el-col>
		            </el-row>
		            <el-row>
		              <el-col :span="8">
		                <el-form-item label="存放地点">
		                  <el-select placeholder="存放地点" v-model="seeData.warehouse_id">
		                    <el-option
		                      v-for="v in $store.state.address"
		                      :key="v.id"
		                      :label="v.name"
		                      :value="v.id"
		                    ></el-option>
		                  </el-select>
		                </el-form-item>
		              </el-col>
		              <el-col :span="8">
		                <el-form-item label="使用期限">
		                  <el-input placeholder="使用期限" v-model="seeData.duration_use"></el-input>
		                </el-form-item>
		              </el-col>
		              <el-col :span="8">
		                <el-form-item label="来源">
		                  <el-select placeholder="来源" v-model="seeData.source">
		                    <el-option
		                      v-for="v in $store.state.source"
		                      :key="v.id"
		                      :label="v.name"
		                      :value="v.id"
		                    ></el-option>
		                  </el-select>
		                </el-form-item>
		              </el-col>
		            </el-row>
		            <el-row>
		              <el-col :span="16">
		                <el-form-item label="备注">
		                  <el-input type="textarea" v-model="seeData.remarks"></el-input>
		                </el-form-item>
		              </el-col>
		              <el-col :span="8">
		                <el-form-item label="上传">
		                  <el-upload
		                    class="avatar-uploader"
		                    action="https://jsonplaceholder.typicode.com/posts/"
		                    :show-file-list="false"
		                  >
		                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
		                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
		                  </el-upload>
		                </el-form-item>
		              </el-col>
		            </el-row>
		          </el-form>
		        </el-tab-pane>
		        <el-tab-pane label="维保信息"></el-tab-pane>
		      </el-tabs>
		      <div slot="footer" class="dialog-footer">
		        <el-button @click="seeDialogTableVisible = false">取 消</el-button>
		        <el-button type="primary" @click="seeDialogTableVisible = false">确 定</el-button>
		      </div>
		    </el-dialog>
	    <!-- 编辑资产表单 -->
    </div>
</template>
<script>
import Breadcrumb from "@/components/Breadcrumb.vue";
import DaAssetsState from "@/components/DaAssetsState.vue";
export default {
    name: 'Bill',
    data(){
    	return {
    		activeName:"active",
    		search: "",
    		registerData:[],
    		pageSize: 10, //分页默认size
    		seeDialogTableVisible: false, //查看资产表单
    		seeData:{},
    		imageUrl:""
    	}
    },
    components:{
    	Breadcrumb,
    	DaAssetsState
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
	      //查看资产表单
	    seeDialog(val) {
	      this.seeDialogTableVisible = true;
	      this.seeData= JSON.parse(JSON.stringify(val));
	    },

    },
    mounted() {
	    this.registerData = [
	      {
	        id: 1,
	        bar_code: "0191063662278",
	        name: "打印机",
	        type_id: "02",
	        specification: "索尼3000",
	        sn: 49090343,
	        metering: "台",
	        money: 2980,
	        company: "光威",
	        department: "",
	        purchase_time: "Sat Aug 25 2018 23:25:52 GMT+0800 (中国标准时间)",
	        user_id: 1001,
	        manager_id: 102,
	        status: 0,
	        address: "办公室北区",
	        duration_use: "",
	        source: "购入",
	        remarks: "",
	        image: "http://placehold.it/200x200",
	        supplier: "索尼赛格旗舰店",
	        contacts: "张素芳",
	        tell: 13131312323,
	        expiry_time: "1529254718034",
	        explain: ""
	      },
	      {
	        id: 2,
	        bar_code: "0191063662276",
	        name: "切纸机",
	        type_id: "03",
	        specification: "索尼3000",
	        sn: 49090343,
	        metering: "台",
	        money: 280,
	        company: "南京",
	        department: "",
	        purchase_time: "1529254718034",
	        user_id: 1001,
	        manager_id: 102,
	        status: 1,
	        address: "办公室北区",
	        duration_use: "",
	        source: "购入",
	        remarks: "",
	        image: "http://placehold.it/200x200",
	        supplier: "索尼赛格旗舰店",
	        contacts: "张素芳",
	        tell: 13131312323,
	        expiry_time: "1529254718034",
	        explain: ""
	      },
	      {
	        id: 3,
	        bar_code: "0191063662267",
	        name: "复印机",
	        type_id: "03",
	        specification: "索尼3000",
	        sn: 49090343,
	        metering: "台",
	        money: 280,
	        company: "南京",
	        department: "",
	        purchase_time: "1529254718034",
	        user_id: 1001,
	        manager_id: 102,
	        status: 2,
	        address: "办公室北区",
	        duration_use: "",
	        source: "购入",
	        remarks: "",
	        image: "http://placehold.it/200x200",
	        supplier: "索尼赛格旗舰店",
	        contacts: "张素芳",
	        tell: 13131312323,
	        expiry_time: "1529254718034",
	        explain: ""
	      },
	      {
	        id: 4,
	        bar_code: "0191064662278",
	        name: "电风扇",
	        type_id: "03",
	        specification: "索尼3000",
	        sn: 49090343,
	        metering: "台",
	        money: 280,
	        company: "南京",
	        department: "",
	        purchase_time: "1529254718034",
	        user_id: 1001,
	        manager_id: 102,
	        status: 0,
	        address: "办公室北区",
	        duration_use: "",
	        source: "购入",
	        remarks: "",
	        image: "http://placehold.it/200x200",
	        supplier: "索尼赛格旗舰店",
	        contacts: "张素芳",
	        tell: 13131312323,
	        expiry_time: "1529254718034",
	        explain: ""
	      },
	      {
	        id: 5,
	        bar_code: "0191063662270",
	        name: "电风扇",
	        type_id: "03",
	        specification: "索尼3000",
	        sn: 49090343,
	        metering: "台",
	        money: 280,
	        company: "南京",
	        department: "",
	        purchase_time: "1529254718034",
	        user_id: 1001,
	        manager_id: 102,
	        status: 12,
	        address: "办公室北区",
	        duration_use: "",
	        source: "购入",
	        remarks: "",
	        image: "http://placehold.it/200x200",
	        supplier: "索尼赛格旗舰店",
	        contacts: "张素芳",
	        tell: 13131312323,
	        expiry_time: "1529254718034",
	        explain: ""
	      },
	      {
	        id: 6,
	        bar_code: "0191063662277",
	        name: "电风扇",
	        type_id: "03",
	        specification: "索尼3000",
	        sn: 49090343,
	        metering: "台",
	        money: 280,
	        company: "南京",
	        department: "",
	        purchase_time: "1529254718034",
	        user_id: 1001,
	        manager_id: 102,
	        status: 0,
	        address: "办公室北区",
	        duration_use: "",
	        source: "购入",
	        remarks: "",
	        image: "http://placehold.it/200x200",
	        supplier: "索尼赛格旗舰店",
	        contacts: "张素芳",
	        tell: 13131312323,
	        expiry_time: "1529254718034",
	        explain: ""
	      },
	      {
	        id: 7,
	        bar_code: "0191063662272",
	        name: "电风扇",
	        type_id: "03",
	        specification: "索尼3000",
	        sn: 49090343,
	        metering: "台",
	        money: 280,
	        company: "南京",
	        department: "",
	        purchase_time: "1529254718034",
	        user_id: 1001,
	        manager_id: 102,
	        status: 4,
	        address: "办公室北区",
	        duration_use: "",
	        source: "购入",
	        remarks: "",
	        image: "http://placehold.it/200x200",
	        supplier: "索尼赛格旗舰店",
	        contacts: "张素芳",
	        tell: 13131312323,
	        expiry_time: "1529254718034",
	        explain: ""
	      },
	      {
	        id: 8,
	        bar_code: "0191063662271",
	        name: "电风扇",
	        type_id: "03",
	        specification: "索尼3000",
	        sn: 49090343,
	        metering: "台",
	        money: 280,
	        company: "南京",
	        department: "",
	        purchase_time: "1529254718034",
	        user_id: 1001,
	        manager_id: 102,
	        status: 0,
	        address: "办公室北区",
	        duration_use: "",
	        source: "购入",
	        remarks: "",
	        image: "http://placehold.it/200x200",
	        supplier: "索尼赛格旗舰店",
	        contacts: "张素芳",
	        tell: 13131312323,
	        expiry_time: "1529254718034",
	        explain: ""
	      }
	    ];
  },
}
</script>
<style lang="less">

</style>