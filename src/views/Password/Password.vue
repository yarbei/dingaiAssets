<template>
    <div>
        <Breadcrumb></Breadcrumb>
        <div class="container">
            <el-form :model="login" :rules="rules" ref="login" class="demo-login" size="100px">
            <el-form-item prop="user">
                <el-input v-model="login.user" placeholder="请输入账号"></el-input>
            </el-form-item>
            <el-form-item prop="pass">
                <el-input v-model="login.pass" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item prop="newpass">
                <el-input v-model="login.newpass" placeholder="请确认密码"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button class='btn' type="primary" @click="submitForm('login')">提交</el-button>
            </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import Breadcrumb from "@/components/Breadcrumb.vue";
export default {
    name:'Password',
    components: {
        Breadcrumb
    },
    data () {
    return {
      login: {
        user: '',
        pass: ''
      },
      rules: {
        user: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
        pass: [{ required: true, message: '密码不能为空', trigger: 'blur' }],
        newpass: [{ required: true, message: '新密码不能为空', trigger: 'blur' }]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
            console.log(valid)
          this.$router.push('/main')
        } else {
          this.$message.error('提交失败')
          return false
        }
      })
    }
  }
}
</script>
<style lang="less">
    .container{
        width: 300px;
    }
</style>
