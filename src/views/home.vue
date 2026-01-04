<!--
 * @Author: wingddd wongtaisin1024@gmail.com
 * @Date: 2025-07-18 09:52:15
 * @LastEditors: wingddd wongtaisin1024@gmail.com
 * @LastEditTime: 2026-01-03 16:53:43
 * @FilePath: \vue3\src\views\home.vue
 * @Description:
 *
 * Copyright (c) 2025 by wongtaisin1024@gmail.com, All Rights Reserved.
-->
<template>
  <el-container>
    <AppAside />

    <el-container>
      <el-header>
        <AppHeader />
      </el-header>

      <!-- Tab选项卡 -->
      <AppTabs />

      <!-- 主内容区 -->
      <el-scrollbar style="height: calc(100vh - 100px)">
        <el-main>
          <!-- 路由容器 -->
          <router-view v-slot="{ Component }">
            <keep-alive :include="keepAliveStore.keepAliveComponents">
              <Component :is="markRaw(shallowRef(Component).value)" :key="route.fullPath" />
            </keep-alive>
          </router-view>
        </el-main>
      </el-scrollbar>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import AppAside from '@/views/aside/AppAside.vue'
import AppHeader from '@/views/aside/AppHeader.vue'
import AppTabs from '@/views/aside/AppTabs.vue'
import { markRaw, shallowRef } from 'vue'
import { useRoute } from 'vue-router'

import { useKeepAliveStore } from '@/store/global'

const route = useRoute()

const keepAliveStore = useKeepAliveStore()
</script>

<style lang="scss" scoped>
:deep(.el-header) {
  padding: 0;
}
</style>
