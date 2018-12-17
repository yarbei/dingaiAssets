import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('@/views/Login/Login.vue'),
      meta: { title: '登录' }
    },
    {
      path: '/main',
      name: 'main',
      redirect: '/main',
      component: () => import('@/views/Main/Main.vue'),
      meta: { title: '主页' },
      children: [{
        path: '',
        name: 'dashboard',
        hidden: false,
        component: () => import('@/views/Dashboard/Dashboard.vue'),
        meta: { icon: 'el-icon-dashboard', title: '仪表盘' }
      },
      {
        path: 'register',
        name: 'register',
        hidden: false,
        component: () => import('@/views/Register/Register.vue'),
        meta: { icon: 'el-icon-qianyuejilu', title: '资产登记' }
      },
      {
        path: 'usereturn',
        name: 'usereturn',
        hidden: false,
        component: () => import('@/views/Usereturn/Usereturn.vue'),
        meta: { icon: 'el-icon-document', title: '领用/退库' }
      },
      {
        path: 'census',
        name: 'census',
        hidden: false,
        component: () => import('@/views/Census/Census.vue'),
        meta: { icon: 'el-icon-qianyuejilu', title: '资产统计' },
        children: [{
          path: 'bill',
          name: 'bill',
          hidden: false,
          component: () => import('@/views/Bill/Bill.vue'),
          meta: { icon: 'el-icon-yuan', title: '资产清单' }
        },
        {
          path: 'classify',
          name: 'classify',
          hidden: false,
          component: () => import('@/views/Classify/Classify.vue'),
          meta: { icon: 'el-icon-yuan', title: '分类使用情况' }
        },
        {
          path: 'summary',
          name: 'summary',
          hidden: false,
          component: () => import('@/views/Summary/Summary.vue'),
          meta: { icon: 'el-icon-yuan', title: '分类汇总' }
        }]
      },
      {
        path: 'password',
        name: 'password',
        hidden: true,
        component: () => import('@/views/Password/Password.vue'),
        meta: { icon: 'el-icon-qianyuejilu', title: '修改密码' }
      },
      {
        path: 'info',
        name: 'info',
        hidden: true,
        component: () => import('@/views/Info/Info.vue'),
        meta: { icon: 'el-icon-qianyuejilu', title: '修改资料' }
      }]
    }
  ]
})
