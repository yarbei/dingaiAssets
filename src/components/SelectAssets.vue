<template>
  <el-row :gutter="20" height="100%">
    <el-col :span="6" class="box" height="100%">
      <el-tree :data="$store.state.assets_type" :props="defaultProps" @node-click="selectAsset"></el-tree>
    </el-col>
    <el-col :span="18">
      <el-table
        :data="registerData"
        border
        style="width: 100%;margin:0"
        align="center"
        @selection-change="SelectionChange"
      >
        <el-table-column type="selection" width="30"></el-table-column>
        <el-table-column prop="status" label="资产状态" width="100" align="center">
          <template slot-scope="scope">
            <DaAssetsState :status="scope.row.status"></DaAssetsState>
          </template>
        </el-table-column>
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
    </el-col>
  </el-row>
</template>
<script>
import DaAssetsState from "./DaAssetsState.vue";
export default {
  name: "SelectAssets",
  data() {
    return {
      registerData: [], //所有资产数据
      defaultProps: {
        children: "children",
        label: "type_name"
      }, //树形结构控件数据
      userData: [], //某公司某部门用户表格数据
    };
  },
  props: {
    selectAssets: {
      type: Function,
      required: true
    }
  },
  methods: {
    //选择资产
    SelectionChange(val) {
      this.selectAssets(val);
    },
    selectAsset(val) {
      if (val.children) {
      } else {
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
          },
          {
            id: 9,
            bar_code: "0191063662252",
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
            id: 10,
            bar_code: "0191063662223",
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
            id: 11,
            bar_code: "0191063662233",
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
      }
    }
  },
  components: {
    DaAssetsState
  }
};
</script>
<style lang="less" scoped>
.box {
  border: 1px solid #eee;
  height: 300px;
  padding: 0;
}
.el-table {
  width: 100%;
  height: 260px;
  overflow: auto;
  margin: 0;
}
</style>
