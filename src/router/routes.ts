import ACCESS_ENUM from '@/access/accessEnum'
import { RouteRecordRaw } from 'vue-router'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/user',
    name: 'User',
    component: () => import('@/layouts/UserLayout.vue'),
    children: [
      {
        path: '/user/login',
        name: '用户登录',
        component: () => import('@/views/user/UserLogin.vue')
      },
      {
        path: '/user/register',
        name: '用户注册',
        component: () => import('@/views/user/UserRegister.vue')
      }
    ],
    meta: {
      title: '用户',
      isHidden: true
    }
  },
  {
    path: '/add/question',
    name: 'AddQuestion',
    component: () => import('@/views/question/AddQuestion.vue'),
    meta: {
      title: '创建题目',
      access: ACCESS_ENUM.ADMIN
    }
  },
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    meta: {
      title: '浏览题目'
    }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/About.vue'),
    meta: {
      title: '关于我的'
    }
  },
  {
    path: '/403',
    name: '403',
    component: () => import('@/views/result/403.vue'),
    meta: {
      title: '403',
      isHidden: true
    }
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('@/views/Admin.vue'),
    meta: {
      title: '管理员可见',
      access: ACCESS_ENUM.ADMIN
    }
  }
]

export default routes
