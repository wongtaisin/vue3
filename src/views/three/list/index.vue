<!--
 * @Author: wingddd wongtaisin1024@gmail.com
 * @Date: 2025-04-03 11:38:32
 * @LastEditors: wingddd wongtaisin1024@gmail.com
 * @LastEditTime: 2026-01-03 16:53:27
 * @FilePath: \vue3\src\views\three\list\index.vue
 * @Description:
 *
 * Copyright (c) 2025 by wongtaisin1024@gmail.com, All Rights Reserved.
-->
<template>
  <Component :is="containerRender" />
</template>

<script lang="tsx" setup>
import { ElButton, ElMessage } from 'element-plus'
import SC from './index.module.scss'

const handleClick = () => {
  ElMessage.error('Button clicked!')
}

const containerRender = (
  <div class={SC['list-view']}>
    <h1>List View</h1>
    <ElButton type="primary" onClick={handleClick}>
      Click primary
    </ElButton>
    <ElButton type="success" onClick={handleClick}>
      Click success
    </ElButton>
  </div>
)
</script>

<style lang="scss" scoped></style>
