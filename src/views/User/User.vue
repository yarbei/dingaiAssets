<template>
  <div>
    <Breadcrumb></Breadcrumb>
    <el-card>
      <el-tabs v-model="activeName">
        <el-tab-pane label="用户管理" name="active">
          <el-row>
            <el-col :span="18">
              <el-button type="primary" icon="el-icon-plus" size="small" @click="addUsers">新增</el-button>
              <el-button type="danger" icon="el-icon-delete" size="small" @click="delUsers">删除</el-button>
			  <el-button type="primary" icon="el-icon-download" size="small" @click="exportExcel">导出</el-button>
              
                <!-- <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>下载导入模板</el-dropdown-item>
                  <el-dropdown-item divided>批量导入资产</el-dropdown-item>
                  <el-dropdown-item divided @click="exportExcel">导出资产</el-dropdown-item>
                </el-dropdown-menu>-->
             
            </el-col>
            <!-- <el-col :span="6">
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
            </el-col>-->
          </el-row>
        </el-tab-pane>
      </el-tabs>
      <!-- 用户表格 -->
      <el-table
        :data="userData"
        border
        style="width: 100%"
        align="center"
        @selection-change="delSelectionChange"
      >
        <el-table-column fixed="left" type="selection" width="30"></el-table-column>
        <el-table-column prop="username" label="用户名" ></el-table-column>
        <el-table-column prop="names" label="姓名" ></el-table-column>
        <el-table-column prop="phone" label="联系方式"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button @click="seeUsers(scope.row)" type="text" size="small">查看</el-button>
            <el-button @click="editUsers(scope.row)" type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>

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
    <!-- 新增资产表单 -->
    <el-dialog title="新增用户" :visible.sync="addUsersTableVisible" width="80%">
      <el-form
        :model="addUser"
        class="demo-form-inline"
        :size="$store.state.uiSize"
        label-width="80px"
      >
        <el-row>
          <el-col :span="8">
            <el-form-item label="用户名">
              <el-input placeholder="用户名" v-model="addUser.username"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="密码">
              <el-input placeholder="密码" v-model="addUser.password"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="姓名">
              <el-input placeholder="姓名" v-model="addUser.names"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="联系方式">
              <el-input placeholder="联系方式" v-model="addUser.phone"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="Email">
              <el-input placeholder="Email" v-model="addUser.email"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addUsersTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUsersDone">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 查看资产表单 -->
    <el-dialog title="查看" :visible.sync="seeUsersTableVisible" width="80%">
      <el-form
        :model="addUser"
        class="demo-form-inline"
        :size="$store.state.uiSize"
        label-width="80px"
		disabled
      >
        <el-row>
          <el-col :span="8">
            <el-form-item label="用户名">
              <el-input placeholder="用户名" v-model="addUser.username"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="密码">
              <el-input placeholder="密码" v-model="addUser.password"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="姓名">
              <el-input placeholder="姓名" v-model="addUser.names"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="联系方式">
              <el-input placeholder="联系方式" v-model="addUser.phone"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="Email">
              <el-input placeholder="Email" v-model="addUser.email"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="seeUsersTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="seeUsersTableVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑资产表单 -->
    <el-dialog title="编辑" :visible.sync="editUsersTableVisible" width="80%">
       <el-form
        :model="editUsers"
        class="demo-form-inline"
        :size="$store.state.uiSize"
        label-width="80px"
      >
        <el-row>
          <el-col :span="8">
            <el-form-item label="用户名">
              <el-input placeholder="用户名" v-model="editUser.username"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="密码">
              <el-input placeholder="密码" v-model="editUser.password"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="姓名">
              <el-input placeholder="姓名" v-model="editUser.names"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="联系方式">
              <el-input placeholder="联系方式" v-model="editUser.phone"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="Email">
              <el-input placeholder="Email" v-model="editUser.email"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editUsersTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUsersDone">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Breadcrumb from "@/components/Breadcrumb.vue";
import DaAssetsState from "@/components/DaAssetsState.vue";
export default {
  name: "User",
  data() {
    return {
      activeName: "active", //选项默认选中
      pageSize: 10, //分页默认size
      userData: [], //所有用户数据
      addUsersTableVisible: false, //打开新增用户表单
      addUser: {}, //新增用户数据
      seeUsersTableVisible: false, //查看用户表单
      editUsersTableVisible: false, //打开编辑用户表单
      editUser: {}, //编辑用户数据
      delData: [] //将要删除的数据
    };
  },
  mounted() {
    this.userData = [
      {
		id: 1,
		username:'admin1',
		password:'admin1',
		name: "张三",
		phone:123456,
		email:'949883887@qq.com'
	  },
	  {
		id: 2,
		username:'admin2',
		password:'admin2',
		name: "李四",
		phone:123456,
		email:'949883887@qq.com'
	  },
	  {
		id: 3,
		username:'admin3',
		password:'admin3',
		name: "王五",
		phone:123456,
		email:'949883887@qq.com'
      },
      {
		id: 4,
		username:'admin4',
		password:'admin4',
		name: "赵六",
		phone:123456,
		email:'949883887@qq.com'
      },
    ];
  },
  methods: {
    // 分页 条数 变化
    handleSizeChange(size) {
      this.pageSize = size;
    },
    //当前页发生变化
    handleCurrentChange(currentPage) {},
    // 打开新增用户表单
    addUsers() {
      this.addUsers = {};
      this.addUsersTableVisible = true;
    },
    // 确定提交新增数据
    addUsersDone() {
      this.addUsersTableVisible = false;
      this.addUsers.purchase_time = this.addUsers.purchase_time || new Date();
      this.userData.push(this.addUsers);
      this.$message({
        message: "提交成功",
        type: "success"
      });
      this.addUsers = {};
    },
    //导出表格
    exportExcel() {
      this.$store.commit("exportExcel");
    },
    //查看用户表单
    seeUsers(val) {
      this.seeUsersTableVisible = true;
      this.addUsers = JSON.parse(JSON.stringify(val));
    },
    // 编辑用户表单
    editUsers(val) {
      this.editUsersTableVisible = true;
      this.editUsers = JSON.parse(JSON.stringify(val));
    },
    // 提交编辑用户表单
    editUsersDone() {
      this.editUsersTableVisible = false;
      this.editUsers.purchase_time =
        this.editUsers.purchase_time || new Date();
      this.userData.forEach((val, key) => {
        if (val.id == this.editUsers.id) {
          Object.assign(this.userData[key], this.editUsers);
        }
      });
      this.$message({
        message: "提交成功",
        type: "success"
      });
      this.editUsers = {};
    },
    //当多选框状态发生改变时,val是选中的数据
    delSelectionChange(val) {
      this.delData = JSON.parse(JSON.stringify(val));
    },
    //删除数据
    delUsers(val) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.userData.forEach((v, k) => {
            this.delData.forEach((val, key) => {
              if (v.id == val.id) {
                this.userData.splice(k, 1);
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
  components: {
    Breadcrumb,
    DaAssetsState
  }
};
</script>
<style lang="less" scoped>
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

