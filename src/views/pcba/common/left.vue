<!--
 * @Author: wingddd wongtaisin1024@gmial.com
 * @Date: 2024-11-13 9:02:55
 * @LastEditors: wingddd wongtaisin1024@gmail.com
 * @LastEditTime: 2025-08-21 15:43:31
 * @FilePath: \vue3\src\views\pcba\common\left.vue
 * @Description: left
 *
 * Copyright (c) 2025 by wongtaisin1024@gmail.com, All Rights Reserved.
-->
<template>
  <section>
    <el-affix :offset="80">
      <div class="left">
        <el-anchor :offset="100">
          <el-anchor-link :href="`#${res['title']}`" :key="i" class="menu" v-for="(res, i) in item">
            <!-- <i :class="`iconfont` + ' ' + res.icon" /> -->
            <svg aria-hidden="true" class="icon" style="width: 36px; height: 36px">
              <use :xlink:href="`#` + res.icon" />
            </svg>
            <div class="font">{{ res['font'] }}</div>
          </el-anchor-link>
        </el-anchor>
      </div>
    </el-affix>
  </section>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const item = ref([
  {
    icon: 'icon-shangchuanwenjian',
    font: '上传文件',
    title: 'upload'
  },
  {
    icon: 'icon-jibenxinxi1',
    font: '基本信息',
    title: 'information'
  },
  {
    icon: 'icon-qitachajianqu',
    font: 'SMT贴片及插件',
    title: 'smt'
  },
  {
    icon: 'icon-routing-orange',
    font: '制造工艺',
    title: 'craft'
  },
  {
    icon: 'icon-kuaidi',
    font: '包装类型',
    title: 'pack'
  },
  {
    icon: 'icon-kuaidichaxun',
    font: '发货/快递',
    title: 'expressage'
  }
])
</script>

<style lang="scss" scoped>
.left {
  // box-shadow: 2px 2px 5px 2px #888888;
  background: white;
  width: 66px;
  padding: 0px 10px 20px;

  .menu {
    text-align: center;
    padding-top: 20px;

    i {
      font-size: 32px;
    }

    .font {
      width: 66px;
      white-space: pre-wrap;
    }
  }
}

:deep(.el-anchor.el-anchor--vertical) {
  .el-anchor__list {
    padding-left: 0;
  }
  .el-anchor__marker {
    width: 0;
  }
}
</style>
