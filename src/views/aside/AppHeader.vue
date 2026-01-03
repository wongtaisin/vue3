<template>
  <div
    class="common-aside"
    :style="{ backgroundColor: styleForm.header.bgColor, color: styleForm.header.txtColor }"
  >
    <!-- 图标 -->
    <el-icon @click="isCollapse = !isCollapse" style="cursor: pointer">
      <Expand v-show="isCollapse" />
      <Fold v-show="!isCollapse" />
    </el-icon>
    <el-icon style="margin-left: 10px; cursor: pointer" @click="router.go(0)">
      <RefreshRight />
    </el-icon>
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <!-- 最末尾的级别span 不给跳转,其他的router-link可以跳转-->
      <el-breadcrumb-item v-for="(item, index) in breadList" :key="item.path">
        <span v-if="index == breadList.length - 1" :style="{ color: styleForm.header.txtColor }">
          {{ item.meta.title }}
        </span>
        <router-link v-else :to="item.path" :style="{ color: styleForm.header.txtColor }">
          {{ item.meta.title }}
        </router-link>
      </el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 工具栏 -->
    <div class="tools" :style="{ color: styleForm.header.txtColor }">
      <span class="mr-15" v-show="!isFullScreen" @click="fullScreen" style="padding-top: 3px">
        <el-tooltip effect="dark" content="进入全屏" placement="bottom">
          <el-icon><FullScreen /></el-icon>
        </el-tooltip>
      </span>
      <span class="mr-15" v-show="isFullScreen" @click="cancelFullScreen" style="padding-top: 3px">
        <el-tooltip effect="dark" content="取消全屏" placement="bottom">
          <el-icon size="20"><Monitor /></el-icon>
        </el-tooltip>
      </span>

      <DarkBg class="mr-15" />
    </div>

    <!-- 用户信息 -->
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar :size="25" :src="userInfo.portrait || portrait" />
        <span style="padding-left: 5px" :style="{ color: styleForm.header.txtColor }">
          {{ userInfo.nickName }}
        </span>
        <el-icon class="el-icon--right">
          <ArrowDown :style="{ color: styleForm.header.txtColor }" />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>
            <el-icon><User /></el-icon>
            {{ userInfo.userName }}
          </el-dropdown-item>
          <el-dropdown-item @click="dialogChangePass.init(1)">
            <el-icon><Edit /></el-icon>修改密码
          </el-dropdown-item>
          <el-dropdown-item @click="handleLogout" divided>
            <el-icon><Close /></el-icon>退出系统
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>

  <!-- 修改密码组件 -->
  <ChangePass ref="dialogChangePass" />
</template>

<script lang="ts" setup>
import { ElMessage, ElMessageBox } from 'element-plus'
import { computed, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { isCollapse } from '../configCenter' // 左侧菜单折叠和头部折叠按钮切换开关
import DarkBg from './dark.vue'

// 导入Pinia 状态库
import { useGlobalConfigStore } from '@/store/globalConfig'
import { useTokenStore } from '@/store/token'
import { useUserStore } from '@/store/user'

// 导入修改密码对话框组件
import ChangePass from '@/components/ChangePass.vue'
const dialogChangePass = ref()

// 路由组件
const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

// 获取用户信息
const userInfo = ref<any>({})
userInfo.value = userStore.userInfo

// const portrait = ref('@/assets/images/avator/avator05.png')
const portrait = ref(
  'https://img0.baidu.com/it/u=4060187940,3351722992&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500'
)

console.log(userInfo.value)

// 全屏开关
let isFullScreen = ref(false)

// 面包屑数据
const breadList = computed<any>(() => route.matched)

// 退出系统
const handleLogout = () => {
  // 询问
  ElMessageBox.confirm('您确定要退出吗？', '温馨提示', {
    type: 'warning'
  })
    .then(() => {
      // loginOut()
      const store = useTokenStore()
      store.saveToken('') // 清空token
      userStore.setUserInfo({}) // 清空用户信息
      ElMessage.success('用户已登出！')
      router.push('/login')
    })
    .catch(err => {
      // ElMessage.info('用户取消退出')
      // return Promise.reject(err)
      ElMessage({
        type: 'info',
        message: err === 'cancel' ? '用户取消退出' : 'Stay in the current route'
      })
    })
}

// 全屏
const fullScreen = () => {
  document.documentElement.requestFullscreen()
  isFullScreen.value = true
}
// 取消全屏
const cancelFullScreen = () => {
  document.exitFullscreen()
  isFullScreen.value = false
}

// 当前侧边栏样式
const menuStyle = {
  id: '01',
  txtColor: '#ffffff',
  hoverTxtColor: '#ffffff',
  bgColor: '#001529',
  hoverBgColor: '#1a252f',
  activeColor: '#ffd04b',
  activeBgColor: '#247bb4'
}

// 顶栏样式1
const headerStyle = {
  id: '01',
  txtColor: '#333333',
  bgColor: '#ffffff'
}

// 读取保存的样式
const configStore = useGlobalConfigStore()
let styleForm = reactive({
  animation: configStore.getConfig.animation,
  aside: configStore.getConfig.aside || menuStyle,
  header: configStore.getConfig.header || headerStyle
})
</script>

<style lang="scss" scoped>
@include m(r, 15);

.common-aside {
  padding: 0% 20px;
  height: 59px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #efefef;
}

.tools {
  margin-left: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;

  span {
    margin-left: 8px;
    margin-right: 8px;
  }
}

.el-dropdown {
  float: right;
  .el-dropdown-link {
    display: flex;
    align-items: center;
  }
}

.el-breadcrumb {
  margin-left: 20px;
}
</style>
