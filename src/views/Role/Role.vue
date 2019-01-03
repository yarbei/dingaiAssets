<template>
  <div>
    <Breadcrumb></Breadcrumb>
    <el-card>
      <el-tabs v-model="activeName">
        <el-tab-pane label="角色管理" name="active">
          <el-row>
            <el-col :span="18">
              <el-button type="primary" icon="el-icon-plus" size="small" @click="addReceive">新增</el-button>
              <el-button type="danger" icon="el-icon-delete" size="small" @click="delDialogs">删除</el-button>
              <el-dropdown split-button type="primary" size="small" style="margin-left:10px">
                <i class="el-icon-printer"></i>
                导入导出
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>下载导入模板</el-dropdown-item>
                  <el-dropdown-item divided>批量导入资产</el-dropdown-item>
                  <el-dropdown-item divided @click="exportExcel">导出资产</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <el-dropdown split-button type="primary" size="small" style="margin-left:10px">
                <i class="el-icon-printer"></i>
                打印
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>打印资产标签</el-dropdown-item>
                  <el-dropdown-item divided>打印资产卡片</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
            <el-col :span="6">
              <div>
                <el-input
                  placeholder="请输入内容"
                  v-model="search"
                  class="input-with-select"
                  size="small"
                >
                  <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
              </div>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
      <!-- 角色表格 -->
      <el-table :data="receiveData" border style="width: 100%" align="center" @selection-change="delSelectionChange">
        <el-table-column type="selection" width="40"></el-table-column>
        <el-table-column prop="personnel_number" label="员工工号" width="170" align="center"></el-table-column>
        <el-table-column prop="personnel_name" label="员工姓名" width="170"></el-table-column>
        <el-table-column prop="company_name" label="所属公司" width="170"></el-table-column>
        <el-table-column prop="department_name" label="所属部门" width="150"></el-table-column>
        <el-table-column prop="email" label="邮箱" width="150"></el-table-column>
        <el-table-column prop="phone" label="手机" width="150"></el-table-column>
      </el-table>
      <!-- 新增角色 -->
      <el-dialog title="新增角色" :visible.sync="addReceiveTableVisible" width="70%">
        <el-form
          :model="addReceiveData"
          class="demo-form-inline"
          :size="$store.state.uiSize"
          label-width="80px"
        >
          <el-row>
              <el-col :span="8">
                <el-form-item label="员工工号">
                  <el-input v-model="addReceiveData.personnel_number"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="员工姓名">
                  <el-input v-model="addReceiveData.personnel_name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="所属公司">
                  <el-input v-model="addReceiveData.company_name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="所属部门">
                  <el-input v-model="addReceiveData.department_name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="邮箱">
                  <el-input v-model="addReceiveData.email"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="手机">
                  <el-input v-model="addReceiveData.phone"></el-input>
                </el-form-item>
              </el-col>
          </el-row>
        </el-form>
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
    </el-card>
  </div>
</template>
<script>
import Breadcrumb from "@/components/Breadcrumb.vue";
import DaAssetsState from "@/components/DaAssetsState.vue";
export default {
  name: "Register",
  data() {
    return {
      activeName: "active", //选项默认选中
      search: "", //搜索关键词
      pageSize: 10, //分页默认size
      registerData: [], //所有资产数据
      addReceiveTableVisible: false, //打开新增表单
      addReceiveData: {}, //新增领用资产数据
      addDialog: {}, //新增资产数据
      imageUrl: "", //上传地址
      editDialog: {}, //编辑资产数据
      delData: [], //将要删除的数据
      receiveData: [], //领用资产数据
    };
  },
  mounted() {
    this.receiveData = [
          {
            id: 1,
            personnel_number: 1001,
            personnel_name: "张三",
            company_name: "康佳",
            dep_id: 1,
            department_name: "研发部",
            email: "zhangsan@qq.com",
            phone: 13800002222
          },
          {
            id: 2,
            personnel_number: 1002,
            personnel_name: "李四",
            company_id: 1,
            company_name: "康佳",
            dep_id: 2,
            department_name: "人事部",
            email: "lisi@qq.com",
            phone: 13800002233
          }
    ];

  },
  methods: {
    // 分页条数变化
    handleSizeChange() {},
    // 当前页发生变化
    handleCurrentChange(currentPage) {},
    //上传图片
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    // 打开新增角色表单
    addReceive() {
      this.selectUser = {};
      this.addReceiveData = {};
      this.selectedAssetData = [];
      this.addReceiveTableVisible = true;
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
    //查看报废表单
    seeDialog(val) {
      this.seeDialogTableVisible = true;
      this.addDialog = JSON.parse(JSON.stringify(val));
    },
    //选中删除数据
    delSelectionChange(val) {
      this.delData = JSON.parse(JSON.stringify(val));
    },
    //删除数据
    delDialogs(val) {
      if(this.delData.length == 0 ){
        this.$message({
          message: "请选中要删除的数据条目！",
          type: "info"
        });
      }else{
        this.$confirm("此操作将删除该文件, 是否继续?", "提示", {
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
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
      }
    }
  },
  components: {
    Breadcrumb,
    DaAssetsState
  }
};
</script>
<style lang="less">
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

