<template>
    <div>
        <Breadcrumb></Breadcrumb>
        <div class="container">
            <el-form :model="infoData" class="demo-login" size="100px">
            <el-form-item prop="username">
                <el-input v-model="infoData.username" disabled></el-input>
            </el-form-item>
            <el-form-item prop="names">
                <el-input v-model="infoData.names" placeholder="请输入姓名"></el-input>
            </el-form-item>
            <el-form-item prop="phone">
                <el-input v-model="infoData.phone" placeholder="请输入联系方式"></el-input>
            </el-form-item>
            <el-form-item prop="email">
                <el-input v-model="infoData.email" placeholder="请输入Email"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button class='btn' type="primary" @click="submitForm(infoData)">提交</el-button>
            </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import Breadcrumb from "@/components/Breadcrumb.vue";
export default {
    name:'Info',
    components: {
        Breadcrumb
    },
    data () {
    return {
      infoData:{
          username:sessionStorage.getItem('username'),
          names:'张三',
          phone:123456,
          email:'949883887@qq.com'
      },
    }
  },
  methods: {
    submitForm (formName) {
        console.log(formName)
    //   this.$refs[formName].validate(valid => {
    //     if (valid) {
    //         console.log(valid)
    //       this.$router.push('/main')
    //     } else {
    //       this.$message.error('提交失败')
    //       return false
    //     }
    //   })
    }
  }
}
</script>
<style lang="less">
    .container{
        width: 300px;
    }
</style>
