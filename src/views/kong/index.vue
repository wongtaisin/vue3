<!--
 * @Author: wingddd wongtaisin1024@gmail.com
 * @Date: 2024-11-21 11:44:41
 * @LastEditors: wingddd wongtaisin1024@gmail.com
 * @LastEditTime: 2026-01-03 16:51:35
 * @FilePath: \vue3\src\views\kong\index.vue
 * @Description: PCBA订单和草稿列表页面
 *
 * Copyright (c) 2024 by wongtaisin1024@gmail.com, All Rights Reserved.
-->
<template>
  <div class="kong-container w-100">
    <el-card>
      <el-tabs @tab-click="handleClick" class="demo-tabs" type="card" v-model="activeName">
        <el-tab-pane label="订单" name="order" />
        <el-tab-pane label="草稿" name="draft" />
        <router-view :key="route.path" v-slot="{ Component }">
          <component :is="Component" />
        </router-view>
      </el-tabs>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import type { TabsPaneContext } from 'element-plus'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()
const activeName = ref('order')

const handleClick = (tab: TabsPaneContext) => {
  const path = tab.props.name === 'order' ? '/kong/order' : '/kong/draft'
  router.push({ path })
}
</script>

<style lang="scss" scoped>
.kong-container {
  margin: 0 20px;
}
</style>
