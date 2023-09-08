<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { MessagePlugin } from 'tdesign-vue-next'
import type { FormInstanceFunctions, FormRule, SubmitContext } from 'tdesign-vue-next'
import { DesktopIcon, LockOnIcon } from 'tdesign-icons-vue-next'
import CodeIcon from '@/components/icons/CodeIcon.vue'
import { UserRegisterRequest } from '@/api'
import { UserControllerService } from '@/api'

const router = useRouter()
const form = ref<FormInstanceFunctions>()
const formData = reactive<UserRegisterRequest>({
  userAccount: '',
  userPassword: '',
  checkPassword: ''
})

const rules: Record<string, FormRule[]> = {
  userAccount: [
    { required: true },
    { pattern: /[a-zA-Z0-9]+/, message: '账号只可包含大小写字母和数字' }
  ],
  userPassword: [
    { required: true },
    { min: 6, message: '请输入密码长度至少为6' },
    { pattern: /[A-Z]+/, message: '密码必须包含大写字母' }
  ],
  checkPassword: [
    { required: true },
    { min: 6, message: '请输入密码长度至少为6' },
    { pattern: /[A-Z]+/, message: '密码必须包含大写字母' },
    { validator: (val) => val.value !== formData.userPassword, message: '两次输入密码不一致' }
  ]
}

const onReset = () => {
  MessagePlugin.success('重置成功')
}

const onSubmit = async (ctx: SubmitContext) => {
  if (ctx.validateResult === true) {
    const res = await UserControllerService.userRegisterUsingPost(formData)
    if (res.code === 0) {
      MessagePlugin.success('注册成功')
      router.push('/user/login')
    }
  } else {
    MessagePlugin.warning(ctx.firstError)
  }
}

// 去登录
const onClick = () => {
  router.push('/user/login')
}
</script>

<template>
  <div id="userRegister">
    <div class="header">
      <CodeIcon :style="{ marginRight: '10px' }" />
      <div>Bin OJ在线判题系统-注册</div>
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

      <t-form-item name="checkPassword">
        <t-input
          v-model="formData.checkPassword"
          type="password"
          clearable
          placeholder="请确认密码"
        >
          <template #prefix-icon>
            <lock-on-icon />
          </template>
        </t-input>
      </t-form-item>

      <t-form-item>
        <t-button theme="primary" type="submit" block>注册</t-button>
      </t-form-item>
    </t-form>
    <div class="footer">
      <t-link @click="onClick"> 已有账号，去登录 </t-link>
    </div>
  </div>
</template>
<style scoped>
#userRegister {
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
