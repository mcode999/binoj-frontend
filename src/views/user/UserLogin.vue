<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import {useUserInfoStore} from '@/stores/user'
import { MessagePlugin } from 'tdesign-vue-next'
import type { FormInstanceFunctions, FormRule, SubmitContext } from 'tdesign-vue-next'
import { DesktopIcon, LockOnIcon } from 'tdesign-icons-vue-next'
import CodeIcon from '@/components/icons/CodeIcon.vue'
import { UserLoginRequest } from '@/api'
import { UserControllerService } from '@/api'

const router = useRouter()
const form = ref<FormInstanceFunctions>()
const formData = reactive<UserLoginRequest>({
  userAccount: '',
  userPassword: ''
})

const rules: Record<string, FormRule[]> = {
  userAccount: [
    { required: true },
    { pattern: /[a-zA-Z0-9]+/, message: '账号只可包含大小写字母和数字' }
  ],
  userPassword: [{ required: true }, { min: 6, message: '请输入密码长度至少为6' }]
}

const onReset = () => {
  MessagePlugin.success('重置成功')
}

const userStore = useUserInfoStore()
const onSubmit = async (ctx: SubmitContext) => {
  if (ctx.validateResult === true) {
    const res = await UserControllerService.userLoginUsingPost(formData)
    if (res.code === 0) {
      router.push('/')
      MessagePlugin.success('登录成功')
      // 设置用户状态
      userStore.setLoginUser(res.data)
    }
  } else {
    console.log('Validate Errors: ', firstError, validateResult)
    MessagePlugin.warning(firstError)
  }
}

// 去注册
const onClick = () => {
  router.push('/user/register')
}
</script>

<template>
  <div id="userLogin">
    <div class="header">
      <CodeIcon :style="{ marginRight: '10px' }" />
      <div>Bin OJ在线判题系统-登录</div>
    </div>
    <t-form
      ref="form"
      :rules="rules"
      :data="formData"
      :label-width="0"
      @reset="onReset"
      @submit="onSubmit"
    >
      <t-form-item name="userAccount">
        <t-input v-model="formData.userAccount" clearable placeholder="请输入账号">
          <template #prefix-icon>
            <desktop-icon />
          </template>
        </t-input>
      </t-form-item>

      <t-form-item name="userPassword">
        <t-input v-model="formData.userPassword" type="password" clearable placeholder="请输入密码">
          <template #prefix-icon>
            <lock-on-icon />
          </template>
        </t-input>
      </t-form-item>

      <t-form-item>
        <t-button theme="primary" type="submit" block>登录</t-button>
      </t-form-item>
    </t-form>
    <div class="footer">
      <t-link @click="onClick"> 没有账号?去注册 </t-link>
    </div>
  </div>
</template>
<style scoped>
#userLogin {
  width: 350px;
  margin-top: -100px;
}
.header {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-weight: bold;
  font-size: 18px;
  color: #666666;
  padding-bottom: 20px;
}

.footer {
  text-align: end;
  padding-top: 15px;
}
.footer > .t-link {
  font-size: 14px;
  color: #666666;
}
</style>
