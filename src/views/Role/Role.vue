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
              <el-button type="primary" icon="el-icon-plus" size="small" @click="addAuthorization" style="margin-left:10px;">角色授权</el-button>
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
        <el-table-column type="selection"></el-table-column>
        <el-table-column prop="personnel_number" label="员工工号" align="center"></el-table-column>
        <el-table-column prop="personnel_name" label="员工姓名"></el-table-column>
        <el-table-column prop="company_name" label="所属公司"></el-table-column>
        <el-table-column prop="department_name" label="所属部门"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="phone" label="手机"></el-table-column>
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
                  <el-input v-model="addReceiveData.personnel_number">
                  </el-input>
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
      <!-- 角色授权 -->
      <el-dialog title="角色授权" :visible.sync="addAuthorizationTableVisible" width="70%">
        <el-tree
          :data="data2"
          show-checkbox
          node-key="id"
          :props="defaultProps">
        </el-tree>
        <!-- 角色授权表单底部按钮 -->
        <div slot="footer" class="dialog-footer">
          <el-button @click="addAuthorizationTableVisible = false">取 消</el-button>
          <el-button type="primary" @click="addAuthorizationiveDone">保存</el-button>
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
import SelectUser from "@/components/SelectUser.vue";
import SelectAssets from "@/components/SelectAssets.vue";
export default {
  name: "Register",
  data() {
    return {
      activeName: "active", //选项默认选中
      search: "", //搜索关键词
      pageSize: 10, //分页默认size
      registerData: [], //所有资产数据
      addReceiveTableVisible: false, //打开新增表单
      addAuthorizationTableVisible: false, //打开新增表单
      addReceiveData: {}, //新增领用资产数据
      addDialog: {}, //新增资产数据
      imageUrl: "", //上传地址
      editDialog: {}, //编辑资产数据
      delData: [], //将要删除的数据
      receiveData: [], //领用资产数据
      data2: [{
          id: 1,
          label: '首页',
          children: [{
            id: 2,
            label: '资产登记'
          }, {
            id: 3,
            label: '领用/退库'
          },{
            id: 3,
            label: '报废管理'
          },]
      },],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  mounted() {
    this.receiveData = [
      {
        id: 1,
        personnel_number: "LY20180618003",
        collar_time: "1529254718034",
        personnel_name: "张三",
        department_name: "研发部",
        company_name: "康达",
        email: "12345@qq.com",
        phone: "12345678901"
      },
      {
        id: 2,
        personnel_number: "LY20180618013",
        collar_time: "1529254718034",
        personnel_name: "李四",
        department_name: "研发部",
        company_name: "康达",
        email: "12345@qq.com",
        phone: "12345678901"
      },
      {
        id: 3,
        personnel_number: "LY20180618012",
        collar_time: "1529254718034",
        personnel_name: "王五",
        department_name: "研发部",
        company_name: "康达",
        email: "12345@qq.com",
        phone: "12345678901"
      },
      {
        id: 4,
        personnel_number: "LY20180618009",
        collar_time: "1529254718034",
        personnel_name: "赵柳",
        department_name: "研发部",
        company_name: "康达",
        email: "12345@qq.com",
        phone: "12345678901"
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

    // 打开角色授权表单
    addAuthorization() {
      if(this.delData.length == 0){
        this.$message({
          message: "请选中要删除的数据条目！",
          type: "info"
        });
      }else{
        this.addAuthorizationTableVisible = true;
      }
    },
    // 提交授权
    addAuthorizationiveDone() {
      this.addAuthorizationiveTableVisible = false;
      this.$message({
        type: "success",
        message: "授权成功",
      });
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
    },
    handleCheckChange(data, checked, indeterminate) {
      console.log(data, checked, indeterminate);
    },
    handleNodeClick(data) {
      console.log(data);
    },
    loadNode(node, resolve) {
      if (node.level === 0) {
        return resolve([{ name: 'region1' }]);
      }
      if (node.level > 3) return resolve([]);

      var hasChild;
      if (node.data.name === 'region1') {
        hasChild = true;
      } else {
        hasChild = Math.random() > 0.5;
      }

      setTimeout(() => {
        var data;
        if (hasChild) {
          data = [{
            name: 'zone' + this.count++
          }, {
            name: 'zone' + this.count++
          }];
        } else {
          data = [];
        }

        resolve(data);
      }, 500);
    },
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

