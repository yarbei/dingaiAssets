<template>
  <div> 
      <Breadcrumb></Breadcrumb>
      <el-card>
        <el-tabs v-model="activeName">
          <el-tab-pane label="报废管理" name="active">
            <el-row>
              <el-col :span="13">
                <el-button type="primary" icon="el-icon-plus" size="small" @click="addReceive">新增</el-button>
                <el-button type="warning" icon="el-icon-plus" size="small"  @click="delDialogs">还原</el-button>
                <el-button icon="el-icon-printer" size="small">打印</el-button>
                <el-button icon="el-icon-printer" size="small" @click="exportExcel">导出</el-button>
              </el-col>
              <el-col :span="11">
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
          </el-tab-pane>
        </el-tabs>
        <!-- 领用资产表格 -->
        <el-table :data="receiveData" border style="width: 100%" align="center" @selection-change="delSelectionChange">
          <el-table-column type="selection" width="40"></el-table-column>
          <el-table-column prop="collar_number" label="报废单号" width="200" align="center"></el-table-column>
          <el-table-column prop="collar_time" label="报修时间" width="200">
            <template slot-scope="scope">{{scope.row.collar_time | date}}</template>
          </el-table-column>
          <el-table-column prop="personnel_name" label="处理人" width="200"></el-table-column>
          <el-table-column prop="explain" label="说明" width="200" align="center" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <el-button @click="seeReceive(scope.row)" type="text" size="small">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 新增报废资产表单 -->
        <el-dialog title="新增报废单" :visible.sync="addReceiveTableVisible" width="70%">
          <el-form
            :model="addReceiveData"
            class="demo-form-inline"
            :size="$store.state.uiSize"
            label-width="80px"
          >
            <el-row>
              <el-col :span="8">
                <el-form-item label="报废单号">
                  <el-input v-model="addReceiveData.collar_number"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="报修时间">
                  <el-date-picker v-model="addReceiveData.collar_time" type="date" placeholder="选择日期"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="处理人">
                  <el-input v-model="addReceiveData.personnel_name"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="说明">
                  <el-input type="textarea" v-model="addReceiveData.explain" width="80%"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
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
        <!-- 查看报废资产表单 -->
        <el-dialog title="新增报废单" :visible.sync="seeReceiveTableVisible" width="70%">
          <el-form
            :model="addReceiveData"
            class="demo-form-inline"
            :size="$store.state.uiSize"
            label-width="80px"
          >
            <el-row>
              <el-col :span="8">
                <el-form-item label="报废单号">
                  <el-input v-model="addReceive.collar_number" readonly></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="报修时间">
                  <el-date-picker v-model="addReceive.collar_time" type="date" placeholder="选择日期" readonly></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="处理人">
                  <el-input v-model="addReceive.personnel_name" readonly></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="说明">
                  <el-input v-model="addReceive.explain" width="80%" readonly></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <!-- 查看报废表单底部按钮 -->
          <div slot="footer" class="dialog-footer">
            <el-button @click="seeReceiveTableVisible = false">取 消</el-button>
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
      </el-card>
  </div>
</template>
<script>
import Breadcrumb from "@/components/Breadcrumb.vue";
import SelectUser from "@/components/SelectUser.vue";
import SelectAssets from "@/components/SelectAssets.vue";
export default {
  name: "Receive",
  data() {
    return {
      date: "",
      activeName: "active", //选项默认选中
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
      delAssetsData: [], //即将要删除的数据
      delData: [] //将要删除的数据
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
    //查看资产表单
    seeReceive(val) {
      this.seeReceiveTableVisible = true;
      this.addReceive = JSON.parse(JSON.stringify(val));
    },
    // 确定提交新增数据
    addReceiveDone() {
      this.addReceiveTableVisible = false;
      this.addReceiveData.collar_time = this.addReceiveData.collar_time || new Date();
      this.receiveData.push(this.addReceiveData);
      console.log(this.addReceiveData);
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
      this.selectingAssetData = assets;
    },
    // 确定选择领用资产
    selectAssetsDone() {
      this.AssetsInnerVisible = false;
      this.selectedAssetData = this.selectingAssetData;
    },
    //选中还原的资产的数据
    delSelectionChange(val) {
      this.delData = JSON.parse(JSON.stringify(val));
    },
    returnSelectionChange(val) {
      this.returnData = JSON.parse(JSON.stringify(val));
      this.returnData = val
      // console.log(this.returnData)
    },
    delDialogs(val) {
      if(this.delData.length == 0 ){
        this.$message({
          message: "请选中要归还资产的数据条目！",
          type: "info"
        });
      }else{
        this.$confirm("此操作将永久还原该文件, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          this.receiveData.forEach((v, k) => {
            this.delData.forEach((val, key) => {
              if (v.id == val.id) {
                this.receiveData.splice(k, 1);
              }
            });
          });
          this.$message({
            type: "success",
            message: "还原成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消还原"
          });
        });
      }
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
        expect_retreat: "1529254718034",
        explain: "腐蚀严重无法修复或继续使用要发生危险！"
      },
      {
        id: 2,
        collar_number: "LY20180618013",
        collar_time: "1529254718034",
        personnel_name: "李四",
        department_name: "研发部",
        company_name: "康达",
        expect_retreat: "1529254718034",
        explain: "腐蚀严重无法修复或继续使用要发生危险！"
      },
      {
        id: 3,
        collar_number: "LY20180618012",
        collar_time: "1529254718034",
        personnel_name: "王五",
        department_name: "研发部",
        company_name: "康达",
        expect_retreat: "1529254718034",
        explain: "腐蚀严重无法修复或继续使用要发生危险！"
      },
      {
        id: 4,
        collar_number: "LY20180618009",
        collar_time: "1529254718034",
        personnel_name: "赵柳",
        department_name: "研发部",
        company_name: "康达",
        expect_retreat: "1529254718034",
        explain: "腐蚀严重无法修复或继续使用要发生危险！"
      }
    ];
  },
  components: {
    Breadcrumb,
    SelectUser,
    SelectAssets
  }
};
</script>
<style lang="less">
.el-table{
  margin-top:20px;
}
</style>