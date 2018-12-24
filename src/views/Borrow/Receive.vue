<template>
  <div>
    <el-row>
      <el-col :span="14">
        <el-button type="primary" icon="el-icon-plus" size="small" @click="addReceive">新增</el-button>
        <el-button type="primary" icon="el-icon-xiugai" size="small" @click="delDialogs">归还</el-button>
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
    <el-table :data="receiveData" border style="width: 100%" @selection-change="delSelectionChange">
      <el-table-column fixed type="selection" width="30"></el-table-column>
      <el-table-column prop="status" label="状态" width="100" align="center">
        <template slot-scope="scope">
          <DaAssetsState :status="scope.row.status"></DaAssetsState>
        </template>
      </el-table-column>
      <el-table-column prop="collar_number" label="借用单号" width="150" align="center"></el-table-column>
      <el-table-column prop="collar_time" label="借用时间" width="150">
        <template slot-scope="scope">{{scope.row.collar_time | date}}</template>
      </el-table-column>
      <el-table-column prop="personnel_name" label="借用人" width="150"></el-table-column>
      <el-table-column prop="department_name" label="借用处理人" width="150"></el-table-column>
      <el-table-column prop="company_name" label="归还处理人" width="150"></el-table-column>
      <el-table-column prop="collar_time" label="预计归还时间" width="150">
        <template slot-scope="scope">{{scope.row.collar_time | date}}</template>
      </el-table-column>
      <el-table-column prop="collar_time" label="归还时间" width="150">
        <template slot-scope="scope">{{scope.row.collar_time | date}}</template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="60">
        <template slot-scope="scope">
          <el-button @click="seeReceive(scope.row)" type="text" size="small">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 新增借用资产表单 -->
    <el-dialog title="借用单" :visible.sync="addReceiveTableVisible" width="80%">
      <el-form
        :model="addReceiveData"
        class="demo-form-inline"
        :size="$store.state.uiSize"
        label-width="80px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="借用人">
              <el-input v-model="selectUser.personnel_name">
                <el-button slot="append" icon="el-icon-user-list" @click="UserInnerVisible=true"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="借出时间">
              <el-date-picker v-model="addReceiveData.collar_time" type="date" placeholder="选择借出日期"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="预计归还">
              <el-date-picker v-model="addReceiveData.purchase_time" type="date" placeholder="选择归还日期"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="借出处理">
              <el-input v-model="selectCompany.name" disabled placeholder="处理人"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="归还时间">
              <el-date-picker v-model="addReceiveData.purchase_time" type="date" placeholder="选择归还日期"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="归还处理">
              <el-input v-model="selectCompany.name" disabled placeholder="处理人"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="14">
            <el-form-item label="说明">
              <el-input type="textarea" v-model="addReceiveData.remarks" width="80%"></el-input>
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

    <!-- 归还借用资产表单 -->
    <el-dialog title="借用单" :visible.sync="delDialogsTableVisible" width="80%">
      <el-form
        :model="addReceiveData"
        class="demo-form-inline"
        :size="$store.state.uiSize"
        label-width="80px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="借用人">
              <el-input v-model="selectUser.personnel_name">
                <el-button slot="append" icon="el-icon-user-list" @click="UserInnerVisible=true"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="借出时间">
              <el-date-picker v-model="addReceiveData.collar_time" type="date" placeholder="选择借出日期"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="预计归还">
              <el-date-picker v-model="addReceiveData.purchase_time" type="date" placeholder="选择归还日期"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="借出处理">
              <el-input v-model="selectCompany.name" disabled placeholder="处理人"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="归还时间">
              <el-date-picker v-model="addReceiveData.purchase_time" type="date" placeholder="选择归还日期"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="归还处理">
              <el-input v-model="selectCompany.name" disabled placeholder="处理人"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="14">
            <el-form-item label="说明">
              <el-input type="textarea" v-model="addReceiveData.remarks" width="80%"></el-input>
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

    <!-- 查看领用资产表单 -->
    <el-dialog title="借用单" :visible.sync="seeReceiveTableVisible" width="80%">
      <el-form
        :model="addReceiveData"
        class="demo-form-inline"
        :size="$store.state.uiSize"
        label-width="80px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="借用人">
              <el-input readonly v-model="addReceiveData.personnel_name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="借出时间">
              <el-date-picker readonly v-model="addReceiveData.collar_time" type="date" placeholder="选择借出日期"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="预计归还">
              <el-date-picker readonly v-model="addReceiveData.purchase_time" type="date" placeholder="选择归还日期"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="借出处理" label-width="80px">
              <el-input disabled v-model="addReceiveData.personnel_name" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="归还时间">
              <el-date-picker readonly v-model="addReceiveData.purchase_time" type="date" placeholder="选择归还日期"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="归还处理">
              <el-input placeholder="处理人" disabled v-model="addReceiveData.warehouse_id"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="14">
            <el-form-item label="说明">
              <el-input type="textarea" readonly v-model="addReceiveData.remarks" width="80%"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- <el-row>
          <el-col>
            <el-button :size="$store.state.uiSize" @click="AssetsInnerVisible=true">选择资产</el-button>
            <el-button type="danger" :size="$store.state.uiSize" @click="delAssets">删除</el-button>
          </el-col>
        </el-row> -->
        <el-row>
          <el-table
            :data="selectedAssetData"
            border
            style="width: 100%"
            align="center"
            @selection-change="delSelectionChange">
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
import DaAssetsState from "@/components/DaAssetsState.vue";
import SelectUser from "@/components/SelectUser.vue";
import SelectAssets from "@/components/SelectAssets.vue";
export default {
  name: "Receive",
  data() {
    return {
      date: "",
      receiveData: [], //领用资产数据
      pageSize: 10, //分页默认size
      addReceiveTableVisible: false, //打开新增领用资产表单
      delDialogsTableVisible: false, //打开退还领用资产表单
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
      returnData: [] //将要归还的数据
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
      console.log(this.addReceiveData);
      this.$message({
        message: "提交成功",
        type: "success"
      });
      this.addReceiveData = {};
    },
    //当多选框状态发生改变时,val是选a中的数据
    delSelectionChange(val) {
      this.delData = JSON.parse(JSON.stringify(val));
      this.delData = val
    },
    // 资产归还
    // delDialogs () {
    //   // console.log(this)
    //   // this.delDialogsTableVisible= true,
    //   this.registerData.forEach((v, k) => {
    //     this.delData.forEach((val, key) => {
    //       if (v.id == val.id) {
    //         this.registerData.splice(this.registerData.indexOf(v), 1);
    //         this.$message({
    //           showClose: true,
    //           message: '恭喜你，资产归还成功',
    //           type: 'success'
    //         })
    //       }
    //     });
    //   });
    // },
    delDialogs(val) {
      this.$confirm("你确定要归还该资产, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消", 
        type: "warning"
      })
        .then(() => {
          this.registerData.forEach((v, k) => {
            this.delData.forEach((val, key) => {
              if (v.id == val.id) {
                this.registerData.splice(k, 1);
              }
            });
          });
          this.$message({
            type: "success",
            message: "归还成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消归还"
          });
        });
    },  

    
    //删除数据
    // delDialogs(val) {
    //   this.$confirm("你确定要归还该资产, 是否继续?", "提示", {
    //     confirmButtonText: "确定",
    //     cancelButtonText: "取消", 
    //     type: "warning"
    //   })
    //     .then(() => {
    //       this.registerData.forEach((v, k) => {
    //         this.delData.forEach((val, key) => {
    //           if (v.id == val.id) {
    //             this.registerData.splice(k, 1);
    //           }
    //         });
    //       });
    //       this.$message({
    //         type: "success",
    //         message: "删除成功!"
    //       });
    //     })
    //     .catch(() => {
    //       this.$message({
    //         type: "info",
    //         message: "已取消删除"
    //       });
    //     });
    // },
    //导出表格
    exportExcel() {
      this.$store.commit("exportExcel");
    },
    //查看资产表单
    seeReceive(val) {
      console.log(val)
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
      this.selectingAssetData = assets;
    },
    // 确定选择领用资产
    selectAssetsDone() {
      this.AssetsInnerVisible = false;
      this.selectedAssetData = this.selectingAssetData;
    },
    //选中领用的资产的数据
    delSelectionChange(val) {
      this.delAssetsData = val;
    },
    //删除选中的领用的资产数据
    delAssets() {
      let a = new Set(this.selectedAssetData);
      let b = new Set(this.delAssetsData);
      let differenceABSet = new Set([...a].filter(x => !b.has(x)));
      let arr = Array.from(differenceABSet);
      this.selectedAssetData = arr;
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
    DaAssetsState,
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
