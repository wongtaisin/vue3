<!--
 * @Author: wingddd wongtaisin1024@gmial.com
 * @Date: 2024-11-13 10:12:45
 * @LastEditors: wingddd wongtaisin1024@gmail.com
 * @LastEditTime: 2026-01-03 16:53:06
 * @FilePath: \vue3\src\views\pcba\index.vue
 * @Description: PCB在线下单平台
 *
 * Copyright (c) 2025 by wongtaisin1024@gmail.com, All Rights Reserved.
-->
<template>
  <section>
    <OrderTop />
    <div class="order">
      <OrderLeft />
      <OrderMiddle />
      <OrderRight />
    </div>
  </section>
</template>

<script lang="ts" setup>
import OrderLeft from './common/left.vue'
import OrderMiddle from './common/middle.vue'
import OrderRight from './common/right.vue'
import OrderTop from './common/top.vue'
</script>

<style lang="scss" scoped>
.order {
  max-width: 1540px;
  min-width: 1280px;
  margin: 0 auto;
  display: flex;
  padding-top: 20px;
}
</style>
