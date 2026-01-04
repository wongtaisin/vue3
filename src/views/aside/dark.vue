<!--
 * @Author: wingddd wongtaisin1024@gmail.com
 * @Date: 2025-07-18 11:10:40
 * @LastEditors: wingddd wongtaisin1024@gmail.com
 * @LastEditTime: 2025-07-18 11:24:55
 * @FilePath: \vue3\src\views\aside\dark.vue
 * @Description:
 *
 * Copyright (c) 2025 by wongtaisin1024@gmail.com, All Rights Reserved.
-->
<template>
  <el-switch
    v-model="isShow"
    @change="switchChange"
    style="--el-switch-on-color: #2c2c2c; --el-switch-off-color: #f2f2f2"
  >
    <template #active-action>
      <el-icon><Moon /></el-icon>
    </template>
    <template #inactive-action>
      <el-icon><Sunny /></el-icon>
    </template>
  </el-switch>
</template>

<script lang="tsx" setup>
import { ref } from 'vue'

const isShow = ref(false)

//开关触发的事件
const switchChange = (val: any) => {
  isShow.value = val

  let html = document.documentElement
  // console.log(html) //html根元素

  val ? (html.className = 'dark') : (html.className = '') //判断添加不添加
}
</script>

<style lang="scss" scoped></style>
