<template>
  <div>
    <Breadcrumb></Breadcrumb>
    <el-row :gutter="20">
        <el-col :span="4">
            <pending :num="num"></pending>
        </el-col>
        <el-col :span="4">
            <pending :num="num"></pending>
        </el-col>
        <el-col :span="4">
            <pending :num="num"></pending>
        </el-col>
        <el-col :span="4">
            <pending :num="num"></pending>
        </el-col>
        <el-col :span="4">
            <pending :num="num"></pending>
        </el-col>
        <el-col :span="4">
            <pending :num="num"></pending>
        </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <i class="el-icon-bingtu"></i>
            <span>资产概况</span>
          </div>
          <el-col :span="12" align="center">
            <div>在用</div>
            <el-progress
              type="circle"
              :percentage="assetsProfile.use"
              color="#409eff"
              :width="150"
              :stroke-width="15"
            ></el-progress>
          </el-col>
          <el-col :span="12" align="center">
            <div>闲置</div>
            <el-progress
              type="circle"
              :percentage="assetsProfile.unused"
              color="#67c23a"
              :width="150"
              :stroke-width="15"
            ></el-progress>
          </el-col>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <i class="el-icon-bingtu"></i>
            <span>资产状态占比</span>
          </div>
          <ve-pie :data="assetsState" :settings="chartSettings" style="height:190px"></ve-pie>
        </el-card>
      </el-col>
      <el-col :span="24" style="margin-top:20px">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <i class="el-icon-bingtu"></i>
            <span>资产分类统计</span>
          </div>
          <ve-histogram :data="classCensus" :color="colors"></ve-histogram>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import Breadcrumb from "@/components/Breadcrumb.vue";
import Pending from "./Pending.vue";
export default {
  name: "Dashboard",
  data() {
      this.colors= ['#67c23a']
      this.chartSettings = {
        radius: 60,
        offsetY: 120
      }
    return {
        num: {
            title:'待签字',
            data:222
        },
      assetsProfile: {
        use: 46,
        unused: 54
      },
      assetsState: {
        columns: ["状态", "指标"],
        rows: [
          { '状态': "闲置", '指标': 1393 },
          { '状态': "在用", '指标': 3530 },
          { '状态': "报废", '指标': 2923 }
        ]
      },
      classCensus: {
        columns: ["分类","数量"],
        rows: [
          { 分类: "土地、房屋及构筑物", 数量: 1393 },
          { 分类: "专用设备", 数量: 3530 },
          { 分类: "电气设备", 数量: 2923 },
          { 分类: "电子产品及通信设备", 数量: 430 },
          { 分类: "文艺体育设备", 数量: 923 },
          { 分类: "图书文物及陈列品", 数量: 1920 },
          { 分类: "家具用具及其他类", 数量: 620 }
        ]
      }
    };
  },
  components: {
    Breadcrumb,
    Pending
  }
};
</script>
<style lang="less">
.el-progress {
  margin: 20px;
}
</style>

