<!--
 * @Author: wingddd wongtaisin1024@gmail.com
 * @Date: 2024-11-21 11:44:41
 * @LastEditors: wingddd wongtaisin1024@gmail.com
 * @LastEditTime: 2026-01-03 16:52:41
 * @FilePath: \vue3\src\views\order\index.vue
 * @Description: PCBA订单和草稿列表页面
 *
 * Copyright (c) 2024 by wongtaisin1024@gmail.com, All Rights Reserved.
-->
<template>
  <div class="pcba-container w-100">
    <router-view :key="route.path" v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<style lang="scss" scoped>
@include w(100);
</style>
