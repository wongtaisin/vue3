<!--
 * @Author: wingddd wongtaisin1024@gmail.com
 * @Date: 2024-11-13 08:05:37
 * @LastEditors: wingddd wongtaisin1024@gmail.com
 * @LastEditTime: 2026-01-03 16:58:56
 * @FilePath: \vue3\src\App.vue
 * @Description: Vue 根组件,配置全局语言和路由视图
 *
 * Copyright (c) 2024 by wongtaisin1024@gmail.com, All Rights Reserved.
-->
<template>
  <el-config-provider :locale="zhCnLocale">
    <router-view />
  </el-config-provider>
</template>

<script lang="ts" setup>
import zhCn from 'element-plus/es/locale/lang/zh-cn'

const zhCnLocale = zhCn
</script>

<style>
/* 全局样式 */
:root {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
    sans-serif;
}
</style>
