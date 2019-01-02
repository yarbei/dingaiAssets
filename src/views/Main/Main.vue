<template>
  <el-container>
    <el-aside style="width:200px" :class="{active:isCollapse}">
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        background-color="#2f3e4e"
        text-color="#fff"
        active-text-color="#4cb4e7"
        :collapse="isCollapse"
        :router="true"
      >
        <div class="logo">
          <i class="el-icon-logo"></i>
          <span>丁艾资产</span>
        </div>
        <template v-for="v in nav">
          <el-submenu :index="v.name" :key="v.name" v-if="v.children">
            <template slot="title">
              <i :class="v.meta.icon"></i>
              <span>{{v.meta.title}}</span>
            </template>

            <el-menu-item
              v-for="val in v.children"
              :key="val.name"
              :index="val.name"
              :route="{name:val.name}"
            >
              <i :class="val.meta.icon"></i>
              <span>{{val.meta.title}}</span>
            </el-menu-item>
          </el-submenu>
          <el-menu-item :index="v.name" :key="v.name" :route="{name:v.name}" v-else>
            <!-- 有route则index不生效,route的值是一个路径对象 -->
            <i :class="v.meta.icon"></i>
            <span slot="title">{{v.meta.title}}</span>
          </el-menu-item>
        </template>
      </el-menu>
    </el-aside>
    <el-container style="padding:0 20px">
      <el-header style="padding:0">
        <div class="icon" @click="isCollapse=!isCollapse">
          <i class="el-icon-ego-menu" :class="{active:isCollapse}"></i>
        </div>
        <el-menu class="el-menu-demo" mode="horizontal" :router="true">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-bell"></i> 消息
            </template>
            <el-menu-item index="1-1">
              <div class="left" style="float:left;height: 36px;margin: 7px 10px 7px 0;width: 36px;line-height: 36px;">
              <i class="el-icon-bell" style="font-size:24px;background-color: #f2f2f2;border-radius: 50%;height: 100%;line-height: 36px;text-align:center;width: 100%;"
                ></i>
              </div>
              <div class="right" style="float:left">
                <p style="margin:0;padding:0;line-height:24px;font-size:14px">新功能上线通知</p>
                <p style="margin:0;padding:0;line-height:24px;font-size:14px">2018-08-10</p>
              </div>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-admin"></i>管理员
            </template>
            <el-menu-item index="/main/password">
              <i class="el-icon-password"></i>修改密码
            </el-menu-item>
            <!-- <el-menu-item index="/main/info">
              <i class="el-icon-edit-outline"></i> 修改资料
            </el-menu-item> -->
            <el-menu-item index="2-3">
              <i class="el-icon-tuichudenglu"></i>退出登录
            </el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-question"></i>帮助
            </template>
            <el-menu-item index="3-1">
              <i class="el-icon-question"></i>帮助中心
            </el-menu-item>
            <el-menu-item index="3-2">
              <i class="el-icon-document"></i>使用手册
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-header>
      <el-main>
      <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "Main",
  data() {
    return {
      isCollapse: false,
      nav: ""
    };
  },
  created() {
    this.nav = this.$router.options.routes[1].children.filter(o => !o.hidden);
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>
<style lang="less" scoped>
.el-container {
  width: 100%;
  height: 100%;
  .el-aside {
    background: #2f3e4e;
    color: #fff;
    font-size: 24px;
    transition: 0.3s;
    height: 100%;
    .logo {
      text-align: center;
      height: 60px;
      line-height: 60px;
      i {
        font-size: 28px;
      }
    }
    .el-menu {
      border-right: none;
      background: #2f3e4e;
    }
    &.active {
      width: 60px !important;
      .logo {
        span {
          display: none;
        }
      }
    }
  }
  .el-header {
    height: 61px;
    border-bottom: 1px solid #eee;
    .icon {
      float: left;
    }
    i {
      font-size: 24px;
      line-height: 60px;
      transform: rotate(0deg);
      transition: 0.3s;
      &.active {
        transform: rotate(-90deg);
      }
    }
    .el-menu-demo {
      float: right;
    }
    .el-menu-vertical-demo:not(.el-menu--collapse) {
      width: 200px;
    }
  }
  router-view{
    background: #eee;
    width: 100%;
    height: 100%;
  }
}
</style>
