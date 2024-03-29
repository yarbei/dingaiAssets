import Vue from 'vue'
import Router from 'vue-router'
import store from './store'
Vue.use(Router)

var router = new Router({
  routes: [{
    path: '/',
    name: 'login',
    component: () =>
      import('@/views/Login/Login.vue'),
    meta: {
      title: '登录'
    }
  }, {
    path: '/main',
    name: 'main',
    redirect: '/main',
    component: () =>
      import('@/views/Main/Main.vue'),
    meta: {
      title: '主页'
    },
    children: [{
      path: '',
      name: 'dashboard',
      hidden: false,
      component: () =>
        import('@/views/Dashboard/Dashboard.vue'),
      meta: {
        icon: 'el-icon-dashboard',
        title: '仪表盘'
      }
    }, {
      path: 'register',
      name: 'register',
      hidden: false,
      component: () =>
        import('@/views/Register/Register.vue'),
      meta: {
        icon: 'el-icon-qianyuejilu',
        title: '资产登记'
      }
    }, {
      path: 'usereturn',
      name: 'usereturn',
      hidden: false,
      component: () =>
        import('@/views/Usereturn/Usereturn.vue'),
      meta: {
        icon: 'el-icon-document',
        title: '领用/退库'
      }
    }, {
      path: 'modify',
      name: 'modify',
      hidden: false,
      component: () =>
        import('@/views/Modify/Modify.vue'),
      meta: {
        icon: 'el-icon-xiugai',
        title: '信息变更'
      }
    }, {
      path: 'password',
      name: 'password',
      hidden: true,
      component: () =>
        import('@/views/Password/Password.vue'),
      meta: {
        icon: 'el-icon-qianyuejilu',
        title: '修改密码'
      }
    }, {
      path: 'info',
      name: 'info',
      hidden: true,
      component: () =>
        import('@/views/Info/Info.vue'),
      meta: {
        icon: 'el-icon-qianyuejilu',
        title: '修改资料'
      }
    }, {
      path: 'borrow',
      name: 'borrow',
      hidden: false,
      component: () =>
        import('@/views/Borrow/Borrow.vue'),
      meta: {
        icon: 'el-icon-jiehuan',
        title: '借用归还'
      }
    }, {
      path: 'repair',
      name: 'repair',
      hidden: false,
      component: () =>
        import('@/views/Repair/Repair.vue'),
      meta: {
        icon: 'el-icon-weixiu',
        title: '维修管理'
      }
    }, {
      path: 'scrap',
      name: 'scrap',
      hidden: false,
      component: () =>
        import('@/views/Scrap/Scrap.vue'),
      meta: {
        icon: 'el-icon-weixiu',
        title: '报废管理'
      }
    }, {
      path: 'census',
      name: 'census',
      hidden: false,
      component: () =>
        import('@/views/Census/Census.vue'),
      meta: {
        icon: 'el-icon-qianyuejilu',
        title: '资产统计'
      },
      children: [{
        path: 'bill',
        name: 'bill',
        hidden: false,
        component: () =>
          import('@/views/Bill/Bill.vue'),
        meta: {
          icon: 'el-icon-yuan',
          title: '资产清单'
        }
      }, {
        path: 'classify',
        name: 'classify',
        hidden: false,
        component: () =>
          import('@/views/Classify/Classify.vue'),
        meta: {
          icon: 'el-icon-yuan',
          title: '分类使用情况'
        }
      }, {
        path: 'summary',
        name: 'summary',
        hidden: false,
        component: () =>
          import('@/views/Summary/Summary.vue'),
        meta: {
          icon: 'el-icon-yuan',
          title: '分类汇总'
        }
      }]
    }, {
      path: 'set',
      name: 'set',
      hidden: false,
      component: () =>
        import('@/views/Set/Set.vue'),
      meta: {
        icon: 'el-icon-setting',
        title: '设置'
      },
      children: [{
        path: 'orgstruc',
        name: 'orgstruc',
        hidden: false,
        component: () =>
          import('@/views/OrgStruc/OrgStruc.vue'),
        meta: {
          icon: 'el-icon-rank',
          title: '组织结构'
        }
      }, {
        path: 'staff',
        name: 'staff',
        hidden: false,
        component: () =>
          import('@/views/Staff/Staff.vue'),
        meta: {
          icon: 'el-icon-yuan',
          title: '员工管理'
        }
      }, {
        path: 'role',
        name: 'role',
        hidden: false,
        component: () =>
          import('@/views/Role/Role.vue'),
        meta: {
          icon: 'el-icon-yuan',
          title: '角色管理'
        }
      }, {
        path: 'user',
        name: 'user',
        hidden: false,
        component: () =>
          import('@/views/User/User.vue'),
        meta: {
          icon: 'el-icon-yuan',
          title: '用户管理'
        }
      }, {
        path: 'assetscla',
        name: 'assetscla',
        hidden: false,
        component: () =>
          import('@/views/Assetscla/Assetscla.vue'),
        meta: {
          icon: 'el-icon-yuan',
          title: '资产分类'
        }
      }]
    }]
  }]
})

// router.beforeEach(function(to, from, next) {
//   if (store.state.token || to.path == '/') {
//     next()
//   } else {
//     next('/')
//   }
// })

export default router