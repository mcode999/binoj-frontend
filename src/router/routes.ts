import { RouteRecordRaw } from 'vue-router'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/home.vue'),
    meta: {
      title: '浏览题目'
    }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/about.vue'),
    meta: {
      title: '关于我的'
    }
  },
  {
    path: '/noAuth',
    name: 'NoAuth',
    component: () => import('@/views/noAuth.vue'),
    meta: {
      title: '未登录'
    }
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('@/views/Admin.vue'),
    meta: {
      title: '管理',
      access: 'canAdmin'
    }
  }
]

export default routes
