<template>
    <div>
      <Breadcrumb></Breadcrumb>
      <el-card>
        <el-tabs v-model="activeName">
          <el-tab-pane label="借用" >
            <Receive></Receive>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
</template>

<script>
  import Breadcrumb from "@/components/Breadcrumb.vue";
  import Receive from "./Receive.vue";

    export default {
      name: "Borrow",
      components: {
        Breadcrumb,
        Receive,
      },
      methods: {
        handleClick(tab, event) {
          console.log(tab, event);
        }
      },
    }
</script>

<style scoped>

</style>
