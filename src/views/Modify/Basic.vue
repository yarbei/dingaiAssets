<template>
  <!-- 基本信息 -->
  <div>
    <el-row>
      <el-col :span="14">
        <el-button type="primary" icon="el-icon-plus" size="small" @click="addReceive">新增</el-button>
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
    <!-- 基本信息变更表格 -->
    <el-table :data="receiveData" border style="width: 100%">
      <el-table-column type="selection"></el-table-column>
      <el-table-column prop="collar_number" label="变更单号" align="center"></el-table-column>
      <el-table-column prop="collar_time" label="变更时间">
        <template slot-scope="scope">{{scope.row.collar_time | date}}</template>
      </el-table-column>
      <el-table-column prop="personnel_name" label="资产名称"></el-table-column>
      <el-table-column prop="department_name" label="资产类型"></el-table-column>
      <el-table-column prop="personnel_name" label="使用人"></el-table-column>
      <el-table-column prop="company_name" label="使用公司"></el-table-column>
      <el-table-column prop="department_name" label="使用部门"></el-table-column>
      <el-table-column prop="personnel_name" label="管理员"></el-table-column>
      <el-table-column label="操作" fixed="right" align="center">
        <template slot-scope="scope">
          <el-button @click="seeReceive(scope.row)" type="text" size="small">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 新增基本信息变更单 -->
    <el-dialog title="变更单" :visible.sync="addReceiveTableVisible" width="80%">
      <el-form
        :model="addReceiveData"
        class="demo-form-inline"
        :size="$store.state.uiSize"
        label-width="80px"
      >
        <el-row>
          <el-col :span="16">
            <el-form-item label="变更单号">
              <el-input v-model="selectCompany.name" disabled=""></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="处理时间">
              <el-date-picker v-model="addReceiveData.collar_time" type="date" placeholder="选择日期">               
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="资产名称" >
              <el-input v-model="addReceiveData.personnel_name">
                <el-button slot="append" icon="el-icon-user-list" @click="AssetsInnerVisible=true"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="资产类型">
              <el-select placeholder="资产类型" v-model="addReceiveData.warehouse_id">
                <el-option
                  v-for="v in $store.state.type"
                  :key="v.id"
                  :label="v.name"
                  :value="v.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="规格型号">
              <el-input v-model="selectCompany.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="8">
          <el-col :span="8">
            <el-form-item label="SN号">
              <el-input placeholder="SN号" v-model="addReceiveData.bar_code" disabled=""></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="计量单位">
              <el-input placeholder="计量单位" v-model="addReceiveData.bar_code" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="管理员">
              <el-input placeholder="管理员" v-model="addReceiveData.personal_name" disabled=""></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="存放地点">
              <el-select placeholder="存放地点" v-model="addReceiveData.warehouse_id">
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
              <el-input placeholder="使用期限(月)" v-model="addReceiveData.bar_code" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="来源">
              <el-select placeholder="来源" v-model="addReceiveData.warehouse_id">
                <el-option
                  v-for="v in $store.state.address"
                  :key="v.id"
                  :label="v.name"
                  :value="v.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item label="备注">
              <el-input type="textarea" v-model="addReceiveData.remarks" width="80%"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row></el-row>
      </el-form>
      <!-- 选择领用人表单 -->
      <el-dialog width="80%" title="选择用户" :visible.sync="UserInnerVisible" append-to-body>
        <SelectUser :selectUsers="selectUsers"></SelectUser>
        <div slot="footer" class="dialog-footer">
          <el-button @click="UserInnerVisible = false">取 消</el-button>
        </div>
      </el-dialog>
      <!-- 选择领用资产表单 -->
      <el-dialog width="80%" title="选择资产" :visible.sync="AssetsInnerVisible" append-to-body>
        <SelectAssets :selectAssets="selectAssets"></SelectAssets>
        <div slot="footer" class="dialog-footer">
          <el-button @click="AssetsInnerVisible = false">取 消</el-button>
          <el-button type="primary" @click="selectAssetsDone">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 新增领用表单底部按钮 -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="addReceiveTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="addReceiveDone">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 查看基本信息变更表单 -->
    <el-dialog title="查看变更单" :visible.sync="seeReceiveTableVisible" width="80%">
      <el-form
        :model="addReceiveData"
        class="demo-form-inline"
        :size="$store.state.uiSize"
        label-width="80px"
        disabled 
      >
        <el-row>
          <el-col :span="16">
            <el-form-item label="领用人">
              <el-input v-model="addReceiveData.personnel_name" >
                <el-button slot="append" icon="el-icon-user-list" @click="UserInnerVisible=true"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="处理时间">
              <el-date-picker v-model="addReceiveData.collar_time" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="资产名称">
              <el-input v-model="addReceiveData.company_name" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="资产类型">
              <el-input v-model="addReceiveData.department_name" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="规格型号">
              <el-input v-model="addReceiveData.department_name" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="SN号">
              <el-input v-model="addReceiveData.department_name" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="计量单位">
              <el-input v-model="addReceiveData.department_name" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="管理员">
              <el-input v-model="addReceiveData.admin" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
                <el-row>
          <el-col :span="8">
            <el-form-item label="存放地点">
              <el-input v-model="addReceiveData.department_name" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="使用期限">
              <el-input v-model="addReceiveData.department_name" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="来源">
              <el-input v-model="addReceiveData.department_name" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16">
            <el-form-item label="备注">
              <el-input type="textarea" v-model="addReceiveData.remarks" width="80%"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="处理人">
              <el-input placeholder="处理人" v-model="addReceiveData.bar_code" ></el-input>
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
            <el-table-column type="selection" width="30"></el-table-column>
            <el-table-column prop="bar_code" label="资产条码" width="150"></el-table-column>
            <el-table-column prop="name" label="资产名称" width="120"></el-table-column>
            <el-table-column prop="type_id" label="资产类型" width="100"></el-table-column>
            <el-table-column prop="specification" label="规格型号" width="100"></el-table-column>
            <el-table-column prop="money" label="金额" width="100">
              <template slot-scope="scope">{{scope.row.money | currency}}</template>
            </el-table-column>
            <el-table-column prop="purchase_time" label="购买时间" width="150">
              <template slot-scope="scope">{{scope.row.purchase_time | date}}</template>
            </el-table-column>
            <el-table-column prop="company" label="使用公司" width="100"></el-table-column>
            <el-table-column prop="department" label="使用部门" width="100"></el-table-column>
            <el-table-column prop="user_id" label="使用人" width="100"></el-table-column>
            <el-table-column prop="manager_id" label="管理员" width="100"></el-table-column>
            <el-table-column prop="address" label="存放地点" width="100"></el-table-column>
            <el-table-column prop="source" label="来源" width="100"></el-table-column>
          </el-table>
        </el-row>
      </el-form>
      <!-- 选择领用资产表单 -->
      <el-dialog width="80%" title="选择资产" :visible.sync="AssetsInnerVisible" append-to-body>
        <SelectAssets :selectAssets="selectAssets"></SelectAssets>
        <div slot="footer" class="dialog-footer">
          <el-button @click="AssetsInnerVisible = false">取 消</el-button>
          <el-button type="primary" @click="selectAssetsDone">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 查看基本信息底部按钮 -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="addReceiveTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="seeReceiveTableVisible = false">确 定</el-button>
      </div>
    </el-dialog>

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
  </div>
</template>
<script>
import SelectUser from "@/components/SelectUser.vue";
import SelectAssets from "@/components/SelectAssets.vue";
export default {
  name: "Basic",
  data() {
    return {
      date: "",
      receiveData: [], //领用资产数据
      pageSize: 10, //分页默认size
      addReceiveTableVisible: false, //打开新增领用资产表单
      addReceiveData: {}, //新增领用资产数据
      seeReceiveTableVisible: false, //查看资产表单
      UserInnerVisible: false, //打开选择领用人表单
      AssetsInnerVisible: false, //打开选择领用资产表单
      selectUser: {}, //选择员工数据
      selectDepartment: {}, //选择部门数据
      selectCompany: {}, //选择公司数据
      selectingAssetData: [], //选择资产时数据
      selectedAssetData: [], //确定选择资产数据
      delAssetsData: [] //即将要删除的数据
    };
  },
  methods: {
    // 分页条数变化
    handleSizeChange() {},
    // 当前页发生变化
    handleCurrentChange(currentPage) {},
    // 打开新增资产表单
    addReceive() {
      this.selectUser = {};
      this.addReceiveData = {};
      this.selectedAssetData = [];
      this.addReceiveTableVisible = true;
    },
    // 确定提交新增数据
    addReceiveDone() {
      this.addReceiveTableVisible = false;
      this.addReceiveData.purchase_time =
        this.addReceiveData.purchase_time || new Date();
      this.receiveData.push(this.addReceiveData);
      // console.log(this.addReceiveData);
      this.$message({
        message: "提交成功",
        type: "success"
      });
      this.addReceiveData = {};
    },
    //导出表格
    exportExcel() {
      this.$store.commit("exportExcel");
    },
    //查看信息变更表单
    seeReceive(val) {
      // console.log(val);
      this.seeReceiveTableVisible = true;
      this.addReceiveData = JSON.parse(JSON.stringify(val));
    },
    //选择公司部门员工
    selectUsers(users, departments, company) {
      this.selectUser = users;
      this.selectCompany = company;
      this.selectDepartment = departments;
      console.log(this.selectDepartment, this.selectCompany);
      this.UserInnerVisible = false;
    },
    //选择领用资产
    selectAssets(assets) {
      // console.log(assets)
      this.selectingAssetData = assets;
    },
    // 确定选择领用资产
    selectAssetsDone() {
      this.AssetsInnerVisible = false;
      this.selectedAssetData = this.selectingAssetData;
      this.addReceiveData.personnel_name = this.selectingAssetData[0].name
    },
    //选中领用的资产的数据
    delSelectionChange(val) {
      this.delAssetsData = val;
    }
  },
  mounted() {
    this.receiveData = [
      {
        id: 1,
        collar_number: "LY20180618003",
        collar_time: "1529254718034",
        personnel_name: "张三",
        department_name: "研发部",
        company_name: "康达",
        expect_retreat: "1529254718034"
      },
      {
        id: 2,
        collar_number: "LY20180618013",
        collar_time: "1529254718034",
        personnel_name: "李四",
        department_name: "研发部",
        company_name: "康达",
        expect_retreat: "1529254718034"
      },
      {
        id: 3,
        collar_number: "LY20180618012",
        collar_time: "1529254718034",
        personnel_name: "王五",
        department_name: "研发部",
        company_name: "康达",
        expect_retreat: "1529254718034"
      },
      {
        id: 4,
        collar_number: "LY20180618009",
        collar_time: "1529254718034",
        personnel_name: "赵柳",
        department_name: "研发部",
        company_name: "康达",
        expect_retreat: "1529254718034"
      }
    ];
  },
  components: {
    SelectUser,
    SelectAssets
  }
};
</script>
<style lang="less">
.el-table {
  margin-top: 20px;
}
</style>