<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import BasicLayout from '@/layouts/BasicLayout.vue'

const route = useRoute()

// 全局初始化函数，有单次调用的方法都可以写在这里
const doInit = () => {
  console.log('Hello 欢迎来到Bin OJ系统')
}
onMounted(() => {
  doInit()
})
</script>

<template>
  <template v-if="route.path.startsWith('/user')">
    <router-view />
  </template>
  <template v-else>
    <BasicLayout />
  </template>
</template>

<style scoped>
</style>
