import { defineStore } from 'pinia'
export const useUserInfoStore = defineStore('userInfo', {
  state: () => {
    return {
      loginUser: {
        userName: '未登录',
        role: 'noLogin'
      }
    }
  },
  actions: {
    setLoginUser(userInfo: any) {
      this.loginUser = userInfo
    },
    getLoginUser() {
      return this.loginUser
    }
  }
})
