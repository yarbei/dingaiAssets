<template>
<!-- 选择用户组件 -->
  <el-row :gutter="20" height='100%'>
    <el-col :span="6" class="box" height='100%'>
      <el-tree :data="$store.state.company" :props="defaultProps" @node-click="selectDepartments"></el-tree>
    </el-col>
    <el-col :span="18">
      <el-table :data="userData" border align="center" style="width: 100%;margin:0">
        <el-table-column label width="120">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="select(scope.row)">选择</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="personnel_number" label="员工工号" width="150" align="center"></el-table-column>
        <el-table-column prop="personnel_name" label="员工姓名" width="150"></el-table-column>
        <el-table-column prop="company_name" label="所属公司" width="150"></el-table-column>
        <el-table-column prop="department_name" label="所属部门" width="150"></el-table-column>
        <el-table-column prop="email" label="邮箱" width="150"></el-table-column>
        <el-table-column prop="phone" label="手机" width="150"></el-table-column>
      </el-table>
    </el-col>
  </el-row>
</template>
<script>
export default {
  name: "SelectUser",
  data() {
    return {
      defaultProps: {
        children: "children",
        label: "name"
      }, //树形结构控件数据
      userData: [], //某公司某部门用户表格数据
      company: {}, //选择公司
      departments: {} //选择部门数据
    };
  },
  props: {
    selectUsers: {
      type: Function,
      required: true
    }
  },
  methods: {
    //选择用户
    select(val) {
      this.selectUsers(val, this.departments, this.company);
    },
    selectDepartments(val) {
      if (val.children) {
        var company = val;
        this.company = company;
      } else {
        var department = val;
        this.departments = department;
        this.userData = [
          {
            personnel_id: 1,
            personnel_number: 1001,
            personnel_name: "张三",
            company_id: 1,
            company_name: "康佳",
            dep_id: 1,
            department_name: "研发部",
            email: "zhangsan@qq.com",
            phone: 13800002222
          },
          {
            personnel_id: 2,
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
      }
    }
  }
};
</script>
<style lang="less">
.box{
    border:1px solid #eee;
    height: 300px;
}
</style>
