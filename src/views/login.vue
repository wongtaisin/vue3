<template>
  <div class="login">
    <el-form :model="params" :rules="loginRules" class="login-form" ref="loginFormRef">
      <h3 class="title">骏亚数字</h3>
      <el-form-item prop="username">
        <el-input v-model="params.username" auto-complete="off" placeholder="账号" type="text">
          <template #prefix>
            <svg aria-hidden="true" class="icon">
              <use xlink:href="#icon-zhanghaoguanli-zhanghaoguanli" />
            </svg>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="params.password"
          @keyup.enter="handleLogin"
          auto-complete="off"
          placeholder="密码"
          type="password"
        >
          <template #prefix>
            <svg aria-hidden="true" class="icon">
              <use xlink:href="#icon-mima1" />
            </svg>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="code" v-if="captchaEnabled">
        <el-input
          v-model="params.code"
          @keyup.enter="handleLogin"
          auto-complete="off"
          placeholder="验证码"
          style="width: 230px"
        >
          <template #prefix>
            <svg aria-hidden="true" class="icon">
              <use xlink:href="#icon-anquan" />
            </svg>
          </template>
        </el-input>
        <div class="login-code">
          <Code ref="codeRef" />
        </div>
      </el-form-item>
      <el-checkbox v-model="params.rememberMe" class="mb-20">记住密码</el-checkbox>
      <el-form-item style="width: 100%">
        <el-button
          :loading="loading"
          @click="handleLogin"
          size="large"
          style="width: 100%"
          type="primary"
        >
          {{ loading ? '登 录 中...' : '登 录' }}
        </el-button>
        <div v-if="register" style="float: right">
          <router-link class="link-type" to="/register">立即注册</router-link>
        </div>
      </el-form-item>
    </el-form>
    <div class="el-login-footer">
      <span>Copyright ©2024 All Rights Reserved.</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import Code from '@/components/code.vue'
import { setToken, setloginUserKey } from '@/utils/auth'
import { decrypt, encrypt } from '@/utils/jsencrypt'
import { FormInstance, FormRules } from 'element-plus'
import Cookies from 'js-cookie'
import { onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

interface Form {
  username: string
  password: string
  rememberMe: boolean
  code: string
  uuid: string
}

const router = useRouter()
const loading = ref(false)
const captchaEnabled = ref(true)
const register = ref(false)
const loginFormRef = ref<FormInstance>()

const params = reactive<Form>({
  username: 'admin',
  password: '123456',
  rememberMe: false,
  code: '',
  uuid: ''
})

// 获取验证码文本
const codeRef = ref()
const getVerifyCode = () => {
  return codeRef.value?.getCodeText()
}

// 验证码校验规则
const validateCaptcha = (_rule: any, value: string, callback: (error?: Error) => void): void => {
  if (!value) {
    callback(new Error('请输入验证码'))
    return
  }
  // 获取验证码组件中的文本进行比对
  const codeText = getVerifyCode()
  if (value.toLowerCase() !== codeText.toLowerCase()) {
    callback(new Error('验证码错误'))
  } else {
    callback()
  }
}

// 刷新验证码
const refreshCode = () => {
  codeRef.value?.generateCode()
}

// 登录表单校验规则
const loginRules = reactive<FormRules<Form>>({
  username: [
    { required: true, trigger: 'blur', message: '请输入您的账号' },
    { min: 2, max: 20, message: '账号长度在2-20个字符之间', trigger: 'blur' }
  ],
  password: [
    { required: true, trigger: 'blur', message: '请输入您的密码' },
    { min: 6, max: 20, message: '密码长度在6-20个字符之间', trigger: 'blur' }
  ],
  code: [
    { required: true, trigger: 'blur', message: '请输入验证码' },
    { validator: validateCaptcha, trigger: 'blur' }
  ]
})

onMounted(() => {
  getCookie()
})

// 获取Cookie中保存的用户信息
const getCookie = () => {
  const username = Cookies.get('username')
  const password = Cookies.get('password')
  const rememberMe = Cookies.get('rememberMe')

  params.username = username ?? ''
  params.password = password ? decrypt(password) : ''
  params.rememberMe = rememberMe === 'true'
}

// 处理登录逻辑
const handleLogin = async () => {
  if (!loginFormRef.value) return

  try {
    await loginFormRef.value.validate()
    loading.value = true

    // 记住密码处理
    if (params.rememberMe) {
      Cookies.set('username', params.username, { expires: 30 })
      Cookies.set('password', encrypt(params.password), { expires: 30 })
      Cookies.set('rememberMe', String(params.rememberMe), { expires: 30 })
    } else {
      Cookies.remove('username')
      Cookies.remove('password')
      Cookies.remove('rememberMe')
    }

    const ot = {
      username: params.username.trim(),
      password: params.password,
      code: params.code,
      uuid: params.uuid
    }

    // TODO: 调用登录接口
    const res = {
      token: '123456',
      login_user_key: '123456'
    }

    setToken(res.token)
    setloginUserKey(res.login_user_key)

    router.push('/pcba/valuation')
  } catch (error) {
    loading.value = false
    console.error('登录失败:', error)
    if (captchaEnabled.value) {
      refreshCode()
    }
  }
}
</script>

<style lang="scss" scoped>
@include m(b, 20);

.login {
  position: fixed;
  top: 0;
  z-index: 100;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url('../assets/images/login-background.jpg');
  background-size: cover;
}

.login-form {
  border-radius: 6px;
  background: #ffffff;
  width: 350px;
  padding: 25px 25px 5px 25px;

  .title {
    margin-bottom: 30px;
    text-align: center;
    color: #707070;
  }

  .el-input {
    height: 38px;

    input {
      height: 38px;
    }
  }

  .icon {
    width: 20px;
    margin-left: 2px;
  }
}

.login-code {
  height: 40px;
  float: right;
  vertical-align: middle;
  cursor: pointer;
}

.el-login-footer {
  width: 100%;
  bottom: 10px;
  position: fixed;
  text-align: center;
  font-size: 12px;
  color: #fff;
}
</style>
