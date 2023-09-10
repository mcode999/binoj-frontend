<template>
  <div id="globalHeader">
    <t-head-menu v-model="active">
      <template #logo>
        <component :is="codeLogo" class="headerLogo"></component>
        <span class="logoTitle">Bin OJ</span>
      </template>
      <t-menu-item
        v-for="item in visibleRoutes"
        :value="item.path"
        :to="item.path"
        :key="item.name"
      >
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
import { ref, computed, onMounted } from 'vue'
import routes from '@/router/routes'
import { useRouter } from 'vue-router'
import checkAccess from '@/access/checkAccess'
import codeLogo from '@/assets/code.svg?component'
import { useUserInfoStore } from '@/stores/user'
import { MessagePlugin } from 'tdesign-vue-next'
import { ChevronDownIcon } from 'tdesign-icons-vue-next'
import { UserControllerService } from '@/api'
import ACCESS_ENUM from '@/access/accessEnum'

// 激活路由
const router = useRouter()
const active = computed(() => {
  return router.currentRoute.value.path
})

// 下拉菜单项
const options = ref([
  {
    content: '登录',
    value: 1,
    onClick: () => toLogin()
  }
])
const userInfoStore = useUserInfoStore()

// 挂载时判断是否登录，加载下拉菜单项
const loadOptions = () => {
  if (userInfoStore.loginUser.userRole !== ACCESS_ENUM.NOT_LOGIN) {
    options.value = [
      {
        content: '个人中心',
        value: 1,
        onClick: () => MessagePlugin.success('个人中心')
      },
      {
        content: '退出登录',
        value: 2,
        onClick: () => userLogout()
      }
    ]
  }
}
onMounted(() => {
  loadOptions()
})

// 显示在菜单中的路由数据
const visibleRoutes = computed(() => {
  return routes.filter((item) => {
    if (item.meta?.isHidden) {
      return false
    }
    // 根据权限过滤菜单
    return checkAccess(userInfoStore.loginUser, item?.meta?.access as string);

  })
})
// to登录页
const toLogin = () => {
  router.push('/user/login')
}
// 退出登录
const userLogout = async () => {
  const res = await UserControllerService.userLogoutUsingPost()
  if (res.code === 0) {
    userInfoStore.clean()
    await MessagePlugin.success('退出登录成功')
  } else {
    await MessagePlugin.error(res.message)
  }
}
</script>

<style scoped>
#globalHeader {
  margin: 0;
  padding: 0;
}
.headerLogo {
  height: 34px;
  width: 34px;
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
