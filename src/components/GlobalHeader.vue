<template>
  <div id="globalHeader">
    <t-head-menu :default-value="active">
      <template #logo>
        <img height="36" :src="codeLogo" alt="logo" />
        <span class="logoTitle">Bin OJ</span>
      </template>
      <t-menu-item v-for="item in routes" :value="item.path" :to="item.path" :key="item.name">
        {{ item.meta.title }}
      </t-menu-item>
      <template #operations>
        <t-dropdown :options="options" :min-column-width="88">
          <t-button variant="text">
            {{ userInfoStore.loginUser.userName }}
            <template #suffix> <ChevronDownIcon /></template>
          </t-button>
        </t-dropdown>
      </template>
    </t-head-menu>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import routes from '@/router/routes'
import { useRoute } from 'vue-router'
import codeLogo from '@/assets/code.svg'
import { useUserInfoStore } from '@/stores/user'
import { MessagePlugin } from 'tdesign-vue-next'
import { ChevronDownIcon } from 'tdesign-icons-vue-next'

// 激活路由
const route = useRoute()
const active = ref('')
// 在挂载时赋值
onMounted(() => {
  active.value = route.path
})
// 使用watch监听路由变化
watch(
  () => route.path,
  (newPath, oldPath) => {
      if (newPath !== oldPath) {
      active.value = newPath
    }
  },
  { immediate: true }
)

// 下拉菜单项
const options = [
  {
    content: '个人中心',
    value: 1,
    onClick: () => MessagePlugin.success('个人中心')
  },
  {
    content: '退出登录',
    value: 2,
    onClick: () => MessagePlugin.success('退出登录')
  }
]
const userInfoStore = useUserInfoStore()
</script>

<style scoped>
#globalHeader {
  margin: 0;
  padding: 0;
}
#globalHeader .t-head-menu {
  padding-left: 40px;
  padding-right: 20px;
}
#globalHeader .logoTitle {
  color: #444;
  font-weight: bolder;
  font-size: 22px;
  margin-left: 16px;
  margin-right: 16px;
}
</style>
