<template>
<!-- 面包屑组件 -->
    <el-breadcrumb separato-class="el-icon-arrow-right">
  <el-breadcrumb-item
  :to="{ name: v.name }"
  v-for="v in path"
  :key='v.name'>{{v.meta.title}}
  </el-breadcrumb-item>
</el-breadcrumb>
</template>
<script>
export default {
    name: 'Dreadcrumb',
    created(){
        this.path=this.$route.matched
    },
    data(){
        return {
            path:[]
        }
    }
}
</script>
<style lang="less" scoped>
.el-breadcrumb{
height:50px;
line-height:50px;
font-size: 14px;
}
</style>

