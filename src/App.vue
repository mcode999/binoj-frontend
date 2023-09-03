<script setup lang="ts">
import BasicLayout from '@/layouts/BasicLayout.vue'
import { useRouter } from 'vue-router'
import { useUserInfoStore } from '@/stores/user'

const router = useRouter()
router.beforeEach((to, from, next) => {
  // 仅管理员可见
  if (to.meta?.access === 'canAdmin') {
    const userInfoStore = useUserInfoStore()
    if (userInfoStore.getLoginUser()?.role !== 'admin') {
      next("/noAuth")
      return
    }
  }
  next()
})
</script>

<template>
  <BasicLayout />
</template>

<style scoped></style>
