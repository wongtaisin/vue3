<!--
 * @Author: wingddd wongtaisin1024@gmail.com
 * @Date: 2024-11-15 13:46:29
 * @LastEditors: wingddd wongtaisin1024@gmail.com
 * @LastEditTime: 2026-01-04 16:18:47
 * @FilePath: \vue3\src\views\pcba\common\top.vue
 * @Description: PCB在线下单平台顶部导航组件
 *
 * Copyright (c) 2024 by wongtaisin1024@gmail.com, All Rights Reserved.
-->
<template>
  <section>
    <el-affix position="top">
      <div class="top">
        <div class="main">
          <el-row class="row-bg" justify="space-between">
            <el-col :span="3">
              <span class="title">PCB在线下单平台</span>
            </el-col>
            <el-col :span="18">
              <el-menu
                :default-active="activeIndex"
                class="el-menu-demo"
                mode="horizontal"
                @select="handleSelect"
              >
                <!-- <el-menu-item index="1">PCBA计价下单</el-menu-item> -->
                <el-menu-item index="2">PCBA订单列表</el-menu-item>
              </el-menu>
            </el-col>
            <el-col :span="3">
              <el-input
                v-model="search"
                class="input-with-select"
                placeholder="搜索"
                clearable
                @keyup.enter="handleSearch"
              >
                <template #append>
                  <el-button @click="handleSearch">
                    <i class="iconfont icon-sousuo"></i>
                  </el-button>
                </template>
              </el-input>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-affix>
  </section>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const activeIndex = ref('2')

// 菜单选择
const handleSelect = (index: string) => {
  if (index === '1') {
    router.push('/pcba/valuation')
  } else if (index === '2') {
    router.push('/order')
  }
}

// 关键字搜索
const emitEvents = defineEmits(['searchClick'])
const search = ref('')
const handleSearch = () => {
  if (!search.value.trim()) return
  const regExp = new RegExp(search.value, 'g')
  const highlightedText = search.value.replace(
    regExp,
    `<span style="background: yellow;">${search.value}</span>`
  )
  emitEvents('searchClick', highlightedText, '搜索查询返值')
}
</script>

<style lang="scss" scoped>
.top {
  background: white;
  height: 60px;
  line-height: 60px;
  border-bottom: 1px solid #f5f5f5;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

  .main {
    max-width: 1540px;
    min-width: 1280px;
    margin: 0 auto;
    padding: 0 20px;

    .title {
      font-size: 18px;
      font-weight: 700;
      color: #333;
    }
  }

  .backstage {
    margin-left: 30px;
    cursor: pointer;
    font-weight: bold;
    transition: color 0.3s;

    &:hover {
      color: var(--el-color-primary-light-3);
    }
  }
}

/* 覆盖 Element Plus 水平菜单 */
:deep(.el-menu--horizontal.el-menu) {
  border-bottom: 0;
}

/* 覆盖你自定义容器内的 ElInput 内部样式 */
.input-with-select {
  :deep(.el-input__wrapper) {
    border-radius: 4px;
  }
}
</style>
