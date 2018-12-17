<template>
  <div>
    <Breadcrumb></Breadcrumb>
    <el-card>
      <el-tabs v-model="activeName">
        <el-tab-pane label="领用" name="receive">
            <Receive></Receive>
        </el-tab-pane>
        <el-tab-pane label="退库" name="return">
            <Return></Return>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>
<script>
import Breadcrumb from "@/components/Breadcrumb.vue";
import Receive from "@/views/Usereturn/Receive.vue";
import Return from "@/views/Usereturn/Return.vue";
export default {
  name: "Usereturn",
  data() {
    return {
        activeName: 'receive'
    };
  },
  methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    },
  components: {
    Receive,
    Return,
    Breadcrumb
  }
};
</script>
<style lang="less">
</style>

