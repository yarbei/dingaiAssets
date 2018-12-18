<template>
  <div>
    <Breadcrumb></Breadcrumb>
    <el-card>
      <el-tabs v-model="activeName">
        <el-tab-pane label="基本信息变更" name="Basic">
            <Basic></Basic>
        </el-tab-pane>
        <el-tab-pane label="维保信息变更" name="Maintennance">
            <Maintenance></Maintenance>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>
<script>
import Breadcrumb from "@/components/Breadcrumb.vue";
import Basic from "@/views/Modify/Basic.vue";
import Maintenance from "@/views/Modify/Maintenance.vue";
export default {
  name: "Modify",
  data() {
    return {
        activeName: 'Basic'
    };
  },
  methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    },
  components: {
    Basic,
    Maintenance,
    Breadcrumb
  }
};
</script>
<style lang="less">
</style>

