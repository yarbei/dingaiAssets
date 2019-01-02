<template>
  <div>
    <Breadcrumb></Breadcrumb>
    <el-card>
      <el-row>
        <el-col :span="14">
          <el-button type="primary" icon="el-icon-plus" size="small" @click="addRepair">新增</el-button>
          <el-button icon="el-icon-printer" size="small">打印</el-button>
          <el-button icon="el-icon-printer" size="small" @click="exportExcel">导出</el-button>
        </el-col>
        <el-col :span="10">
          <el-date-picker
            v-model="date"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            size="small"
          ></el-date-picker>
          <el-button icon="el-icon-search" size="small" style="margin-left:10px"></el-button>
        </el-col>
      </el-row>
      <!-- 领用资产表格 -->
      <el-table :data="repairData" border style="width: 100%" align="center">
        <el-table-column prop="status" label="状态" width="120" align="center">
          <template slot-scope="scope">
            <da-assets-state :status="scope.row.status"></da-assets-state>
          </template>
        </el-table-column>
        <el-table-column prop="repair_number" label="维修单号" align="center"></el-table-column>
        <el-table-column prop="report_time" label="报修时间">
          <template slot-scope="scope">{{scope.row.report_time | date}}</template>
        </el-table-column>
        <el-table-column prop="report_repair_id" label="报修人"></el-table-column>
        <el-table-column prop="repair_handle_id" label="维修人"></el-table-column>
        <el-table-column prop="cost" label="维修花费">
          <template slot-scope="scope">{{scope.row.cost | currency}}</template>
        </el-table-column>
        <el-table-column label="操作" width="120">
          <template slot-scope="scope">
            <el-button @click="seeRepair(scope.row)" type="text" size="small">查看</el-button>
            <el-button @click="editRepair(scope.row)" type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 新增维修单 -->
      <el-dialog title="新增维修单" :visible.sync="addRepairTableVisible" width="80%">
        <el-steps :active="active" finish-status="success">
          <el-step title="报修"></el-step>
          <el-step title="已接单"></el-step>
          <el-step title="维修中"></el-step>
          <el-step title="完成"></el-step>
        </el-steps>
        <el-form
          :model="addRepairData"
          class="demo-form-inline"
          :size="$store.state.uiSize"
          label-width="80px"
        >
          <el-row>
            <el-col :span="8">
              <el-form-item label="维修单号">
                <el-input placeholder v-model="addRepairData.repair_number" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="报修时间">
                <el-date-picker v-model="addRepairData.report_time" type="date" placeholder="选择日期"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="报修人">
                <el-input v-model="selectUser.personnel_name">
                  <el-button slot="append" icon="el-icon-user-list" @click="UserInnerVisible=true"></el-button>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="说明">
                <el-input type="textarea" v-model="addRepairData.repair_content" width="80%"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-button :size="$store.state.uiSize" @click="AssetsInnerVisible=true">选择资产</el-button>
              <el-button type="danger" :size="$store.state.uiSize" @click="delAssets">删除</el-button>
            </el-col>
          </el-row>
          <el-row>
            <el-table
              :data="selectedAssetData"
              border
              style="width: 100%"
              align="center"
              @selection-change="delSelectionChange"
            >
              <el-table-column type="selection" ></el-table-column>
              <el-table-column prop="bar_code" label="资产条码"></el-table-column>
              <el-table-column prop="name" label="资产名称"></el-table-column>
              <el-table-column prop="type_id" label="资产类型"></el-table-column>
              <el-table-column prop="company" label="使用公司"></el-table-column>
              <el-table-column prop="department" label="使用部门"></el-table-column>
              <el-table-column prop="user_id" label="使用人"></el-table-column>
              <el-table-column prop="manager_id" label="管理员"></el-table-column>
              <el-table-column prop="address" label="存放地点"></el-table-column>
            </el-table>
          </el-row>
        </el-form>
        <!-- 选择报修人表单 -->
        <el-dialog width="80%" title="选择用户" :visible.sync="UserInnerVisible" append-to-body>
          <SelectUser :selectUsers="selectUsers"></SelectUser>
          <div slot="footer" class="dialog-footer">
            <el-button @click="UserInnerVisible = false">取 消</el-button>
          </div>
        </el-dialog>
        <!-- 选择报修资产表单 -->
        <el-dialog width="80%" title="选择资产" :visible.sync="AssetsInnerVisible" append-to-body>
          <SelectAssets :selectAssets="selectAssets"></SelectAssets>
          <div slot="footer" class="dialog-footer">
            <el-button @click="AssetsInnerVisible = false">取 消</el-button>
            <el-button type="primary" @click="selectAssetsDone">确 定</el-button>
          </div>
        </el-dialog>
        <!-- 新增报修表单底部按钮 -->
        <div slot="footer" class="dialog-footer">
          <el-button @click="addRepairTableVisible = false">取 消</el-button>
          <el-button type="primary" @click="addRepairDone">确 定</el-button>
        </div>
      </el-dialog>

      <!-- 查看报修资产表单 -->
      <el-dialog title="查看维修单" :visible.sync="seeRepairTableVisible" width="80%">
        <el-steps :active="active" finish-status="success">
          <el-step title="报修"></el-step>
          <el-step title="已接单"></el-step>
          <el-step title="维修中"></el-step>
          <el-step title="完成"></el-step>
        </el-steps>
        <el-form
          :model="addRepairData"
          class="demo-form-inline"
          :size="$store.state.uiSize"
          label-width="80px"
        >
          <el-row>
            <el-col :span="8">
              <el-form-item label="维修单号">
                <el-input placeholder v-model="addRepairData.repair_number" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="报修时间">
                <el-date-picker v-model="addRepairData.report_time" type="date" placeholder="选择日期" disabled></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="报修人">
                <el-input placeholder v-model="addRepairData.report_repair_id" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="维修状态">
                <el-input placeholder v-model="addRepairData.status" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="维修人">
                <el-input placeholder v-model="addRepairData.repair_handle_id" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="维修时间">
                <el-date-picker v-model="addRepairData.repair_time" type="date" disabled></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="报修说明">
                <el-input type="textarea" v-model="addRepairData.repair_content" width="80%"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="18">
              <el-form-item label="维修说明">
                <el-input type="textarea" v-model="addRepairData.repair_remarks" width="80%"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="维修花费">
                <el-input placeholder v-model="addRepairData.cost" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-table
              :data="selectedAssetData"
              border
              style="width: 100%"
              align="center"
              @selection-change="delSelectionChange"
            >
              <el-table-column type="selection"></el-table-column>
              <el-table-column prop="bar_code" label="资产条码"></el-table-column>
              <el-table-column prop="name" label="资产名称"></el-table-column>
              <el-table-column prop="type_id" label="资产类型"></el-table-column>
              <el-table-column prop="company" label="使用公司"></el-table-column>
              <el-table-column prop="department" label="使用部门"></el-table-column>
              <el-table-column prop="user_id" label="使用人"></el-table-column>
              <el-table-column prop="manager_id" label="管理员"></el-table-column>
              <el-table-column prop="address" label="存放地点"></el-table-column>
            </el-table>
          </el-row>
          
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="seeRepairTableVisible = false">取 消</el-button>
        </div>
      </el-dialog>

      <!-- 编辑报修资产表单 -->
      <el-dialog title="编辑维修单" :visible.sync="editRepairTableVisible" width="80%">
        <el-steps :active="active" :finish-status="finishStatus">
          <el-step title="报修"></el-step>
          <el-step title="已接单"></el-step>
          <el-step title="维修中"></el-step>
          <el-step :title="this.stated"></el-step>
        </el-steps>
        <el-form
          :model="editRepairData"
          class="demo-form-inline"
          :size="$store.state.uiSize"
          label-width="80px"
        >
          <el-row>
            <el-col :span="8">
              <el-form-item label="维修单号">
                <el-input placeholder v-model="addRepairData.repair_number" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="报修时间">
                <el-date-picker v-model="addRepairData.report_time" type="date" placeholder="选择日期" disabled></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="报修人">
                <el-input placeholder v-model="addRepairData.report_repair_id" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="维修状态">
                <el-select placeholder="维修状态" v-model="editRepairData.status" :value="editRepairData.status" @change="stateChange">{{editRepairData.status}}
                    <el-option
                      v-for="v in status"
                      :key="v.status"
                      :label="v.title"
                      :value="v.status"
                    ></el-option>
                  </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="维修人">
                <el-input v-model="selectUser.personnel_name">
                  <el-button slot="append" icon="el-icon-user-list" @click="UserInnerVisible=true"></el-button>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="维修时间">
                <el-date-picker v-model="addRepairData.repair_time" type="date" placeholder="选择日期"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="报修说明">
                <el-input type="textarea" v-model="addRepairData.repair_content" width="80%"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="18">
              <el-form-item label="维修说明">
                <el-input type="textarea" v-model="addRepairData.repair_remarks" width="80%"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="维修花费">
                <el-input placeholder v-model="addRepairData.cost" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-table
              :data="selectedAssetData"
              border
              style="width: 100%"
              @selection-change="delSelectionChange"
            >
              <el-table-column type="selection"></el-table-column>
              <el-table-column prop="bar_code" label="资产条码"></el-table-column>
              <el-table-column prop="name" label="资产名称"></el-table-column>
              <el-table-column prop="type_id" label="资产类型"></el-table-column>
              <el-table-column prop="company" label="使用公司"></el-table-column>
              <el-table-column prop="department" label="使用部门"></el-table-column>
              <el-table-column prop="user_id" label="使用人"></el-table-column>
              <el-table-column prop="manager_id" label="管理员"></el-table-column>
              <el-table-column prop="address" label="存放地点"></el-table-column>
            </el-table>
          </el-row>
          
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="editRepairTableVisible = false">取 消</el-button>
          <el-button type="primary" @click="editRepairDone">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="$store.state.pageSizes"
        :page-size="$store.state.defaultPageSize"
        layout="sizes, prev, pager, next"
        :total="400"
        background
      ></el-pagination>
    </el-card>
  </div>
</template>
<script>
import DaAssetsState from "@/components/DaAssetsState.vue"
import Breadcrumb from "@/components/Breadcrumb.vue"
import SelectUser from "@/components/SelectUser.vue"
import SelectAssets from "@/components/SelectAssets.vue"
export default {
  name: "Repair",
  data() {
    return {
      active:0,//步骤条默认状态变量
      stated:'维修成功',
      finishStatus:'success',//步骤条结束时状态
      date: "",
      repairData: [], //维修表格数据
      pageSize: 10, //分页默认size
      addRepairTableVisible: false, //打开新增维修资产表单
      addRepairData: {}, //新增维修资产数据
      seeRepairTableVisible: false, //查看维修表单
      editRepairTableVisible: false,//编辑维修单
      editRepairData:{},//编辑维修表单数据
      UserInnerVisible: false, //打开选择报修人表单
      AssetsInnerVisible: false, //打开选择维修资产表单
      selectUser: {}, //选择员工数据
      selectDepartment: {}, //选择部门数据
      selectCompany: {}, //选择公司数据
      selectingAssetData: [], //选择资产时数据
      selectedAssetData: [], //确定选择资产数据
      delAssetsData: [], //即将要删除的数据
      status:[{
        status:9,
        title:'已取消'
      },
      {
        status:10,
        title:'已报修'
      },
      {
        status:11,
        title:'已接单'
      },
      {
        status:12,
        title:'维修中'
      },
      {
        status:13,
        title:'维修成功'
      },
      {
        status:14,
        title:'维修失败'
      }]
    };
  },
  methods: {
    //维修状态发生变化
    stateChange(val){
      switch(val){
        case 9:this.active=0;this.stated='维修成功';this.finishStatus='success';break;
        case 10:this.active=1;this.stated='维修成功';this.finishStatus='success';break;
        case 11:this.active=2;this.stated='维修成功';this.finishStatus='success';break;
        case 12:this.active=3;this.stated='维修成功';this.finishStatus='success';break;
        case 13:this.active=4;this.stated='维修成功';this.finishStatus='success';break;
        case 14:this.active=5;this.stated='维修失败';this.finishStatus='error';break;
      }
    },
    // 分页条数变化
    handleSizeChange() {},
    // 当前页发生变化
    handleCurrentChange(currentPage) {},
    // 打开新增维修表单
    addRepair() {
      this.selectUser = {};
      this.addRepairData = {};
      this.selectedAssetData = [];
      this.addRepairTableVisible = true;
    },
    // 确定提交新增数据
    addRepairDone() {
      this.addRepairTableVisible = false;
      this.addRepairData.report_time =
        this.addRepairData.report_time || new Date();
        this.addRepairData.status=10;
      this.repairData.push(this.addRepairData);
      console.log(this.addRepairData);
      this.$message({
        message: "提交成功",
        type: "success"
      });
      this.addRepairData = {};
    },
    //导出表格
    exportExcel() {
      this.$store.commit("exportExcel");
    },
    //查看维修表单
    seeRepair(val) {
      this.seeRepairTableVisible = true;
      this.addRepairData = JSON.parse(JSON.stringify(val));
    },
    //编辑维修表单
    editRepair(val){
      this.editRepairTableVisible =true;
      this.editRepairData = JSON.parse(JSON.stringify(val));
      console.log(this.editRepairData)
      switch(this.editRepairData.status){
        case 9:this.active=0;this.stated='维修成功';this.finishStatus='success';break;
        case 10:this.active=1;this.stated='维修成功';this.finishStatus='success';break;
        case 11:this.active=2;this.stated='维修成功';this.finishStatus='success';break;
        case 12:this.active=3;this.stated='维修成功';this.finishStatus='success';break;
        case 13:this.active=4;this.stated='维修成功';this.finishStatus='success';break;
        case 14:this.active=5;this.stated='维修失败';this.finishStatus='error';break;
      }
    },
    editRepairDone(){
      this.editRepairTableVisible = false;
    },
    //选择公司部门员工
    selectUsers(users, departments, company) {
      this.selectUser = users;
      this.selectCompany = company;
      this.selectDepartment = departments;
      console.log(this.selectDepartment, this.selectCompany);
      this.UserInnerVisible = false;
    },
    //选择维修资产
    selectAssets(assets) {
      this.selectingAssetData = assets;
    },
    // 确定选择维修资产
    selectAssetsDone() {
      this.AssetsInnerVisible = false;
      this.selectedAssetData = this.selectingAssetData;
    },
    //选中维修资产的数据
    delSelectionChange(val) {
      this.delAssetsData = val;
    },
    //删除选中的维修的资产数据
    delAssets() {
      let a = new Set(this.selectedAssetData);
      let b = new Set(this.delAssetsData);
      let differenceABSet = new Set([...a].filter(x => !b.has(x)));
      let arr = Array.from(differenceABSet);
      this.selectedAssetData = arr;
    }
  },
 mounted() {
    this.repairData = [
      {
        repair_id: 1,
        repair_number: "0191063662278",
        report_time: "Sat Aug 25 2018 23:25:52 GMT+0800 (中国标准时间)",
        repair_handle_id:1,
        report_repair_id:1,
        cost:80,
        status:10,
        repair_time:"1529254718034",
        repair_content:"",
        repair_remarks:"",
        asset_id:1
      },
      {
        repair_id: 2,
        repair_number: "0191063662276",
        report_time: "1529254718034",
        repair_handle_id:2,
        report_repair_id:2,
        cost:80,
        status:11,
        repair_time:"1529254718034",
        repair_content:"",
        repair_remarks:"",
        asset_id:1
      },
      {
        repair_id: 3,
        repair_number: "0191063662267",
        report_time: "1529254718034",
        repair_handle_id:3,
        report_repair_id:3,
        cost:80,
        status:12,
        repair_time:"1529254718034",
        repair_content:"",
        repair_remarks:"",
        asset_id:1
      },
      {
        repair_id: 4,
        repair_number: "0191064662278",
        report_time: "1529254718034",
        repair_handle_id:4,
        report_repair_id:4,
        cost:80,
        status:13,
        repair_time:"1529254718034",
        repair_content:"",
        repair_remarks:"",
        asset_id:1
      },
    ];
  },
  components: {
    SelectUser,
    SelectAssets,
    Breadcrumb,
    DaAssetsState
  }
};
</script>
<style lang="less">
.el-table {
  margin-top: 20px;
}
</style>

