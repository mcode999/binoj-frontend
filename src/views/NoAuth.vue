<script setup lang="ts">
import Result from '@/components/Result.vue'
</script>

<template>
  <div id="noAuth">
    <result title="403 Forbidden" tip="抱歉，您无权限访问此页面">
      <t-button @click="() => $router.push('/')">返回首页</t-button>
    </result>
  </div>
</template>
<style scoped></style>
