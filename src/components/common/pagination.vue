<!--
 * @Author: wingddd wongtaisin1024@gmail.com
 * @Date: 2024-11-26 14:50:23
 * @LastEditors: wingddd wongtaisin1024@gmail.com
 * @LastEditTime: 2026-01-04 16:12:22
 * @FilePath: \vue3\src\components\common\pagination.vue
 * @Description:
 *
 * Copyright (c) 2024 by wongtaisin1024@gmail.com, All Rights Reserved.
-->
<template>
  <div class="common-pagination pt-15">
    <slot></slot>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="pageSizes"
      :page-size="pageSize"
      :total="total"
      class="pagination"
      layout="total, sizes, prev, pager, next, jumper"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

interface PaginationProps {
  total?: number
  pageNumber?: number
  pageSize?: number
}

interface EmitType {
  (e: 'update:page', val: number): void
  (e: 'sizeChange', val: number): void
  (e: 'currentChange', val: number): void
}

const props = withDefaults(defineProps<PaginationProps>(), {
  total: 1,
  pageSize: 10
})

const emit = defineEmits<EmitType>()

const currentPage = ref<number | undefined>(props.pageNumber)
const pageSizes: number[] = [10, 30, 50]

watch(
  () => props.pageNumber,
  (newVal: number | undefined) => {
    currentPage.value = newVal
  }
)

// 重置页码
const reset = (): void => {
  emit('update:page', 1)
}

// 每页条数改变
const handleSizeChange = (val: number): void => {
  emit('sizeChange', val)
}

// 当前页改变
const handleCurrentChange = (val: number): void => {
  emit('currentChange', val)
}

defineExpose({ reset }) // 导出 reset 方法
</script>

<style lang="scss" scoped>
@include p(t, 15);

.common-pagination {
  text-align: right;
  overflow: hidden;
  width: 100%;
  min-height: 30px;
}

:deep(.el-pagination) {
  .el-select {
    .el-input {
      .el-input__inner {
        height: 28px;
      }

      .el-select__caret {
        line-height: 16px;
      }
    }
  }
}
</style>
