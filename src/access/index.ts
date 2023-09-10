import router from '@/router'
import { useUserInfoStore } from '@/stores/user'
import ACCESS_ENUM from './accessEnum'
import checkAccess from './checkAccess'
import { MessagePlugin } from 'tdesign-vue-next'

router.beforeEach(async (to, from, next) => {
  const userStore = useUserInfoStore()
  // 如果之前没登录过，自动登录
  if (!userStore.loginUser || userStore.loginUser.userRole === ACCESS_ENUM.NOT_LOGIN) {
    // await是为了等用户登录成功之后再执行后续的代码
    await userStore.getLoginUser()
  }
  const needAccess = (to.meta?.access as string) ?? ACCESS_ENUM.NOT_LOGIN
  // 要跳转前的页面必须要登录
  if (needAccess !== ACCESS_ENUM.NOT_LOGIN) {
    // 如果没登录，跳转到登录页面
    if (!userStore.loginUser || userStore.loginUser.userRole === ACCESS_ENUM.NOT_LOGIN) {
      MessagePlugin.warning('请登录后访问')
      next(`/user/login?redirect=${to.fullPath}`)
      return
    }
    // 如果已经登录了，但是权限不足，则跳转至无权限页面
    if (!checkAccess(userStore.loginUser, needAccess)) {
      next('/403')
      return
    }
  }
  next()
})
