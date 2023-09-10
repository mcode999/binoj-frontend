import { defineStore } from 'pinia'
import ACCESS_ENUM from '@/access/accessEnum'
import { UserControllerService } from '@/api'

export const useUserInfoStore = defineStore('userInfo', {
  state: () => {
    return {
      loginUser: {
        userName: '未登录',
        userRole: ACCESS_ENUM.NOT_LOGIN
      }
    }
  },
  actions: {
    setLoginUser(userInfo: any) {
      this.loginUser = userInfo
    },
    async getLoginUser() {
      // 从远程请求获取登录信息
      const res= await UserControllerService.getLoginUserUsingGet()
      if (res.code === 0) {
        this.setLoginUser(res.data)
      } else {
        this.loginUser.userRole = ACCESS_ENUM.NOT_LOGIN
      }
      return this.loginUser
    },
    clean() {
      this.loginUser = {
        userName: '未登录',
        userRole: ACCESS_ENUM.NOT_LOGIN
      }
    }
  }
})
