<!--
 * @Author: wingddd wongtaisin1024@gmail.com
 * @Date: 2024-11-16 09:01:55
 * @LastEditors: wingddd wongtaisin1024@gmail.com
 * @LastEditTime: 2026-01-03 16:44:35
 * @FilePath: \vue3\src\components\areaData.vue
 * @Description: 地区选择组件
 *
 * Copyright (c) 2024 by wongtaisin1024@gmail.com, All Rights Reserved.
-->
<template>
  <section>
    <el-cascader
      v-model="selectedOptions"
      :options="regionData"
      :props="areaProps"
      :clearable="false"
      placeholder="省/市/区"
      @change="handleAddressChange"
    />
  </section>
</template>

<script setup lang="ts">
import { codeToText, regionData } from 'element-china-area-data'
import { ref, watch } from 'vue'

interface Props {
  id?: string
}

const props = defineProps<Props>()

interface AddressInfo {
  province: string
  city: string
  area: string
  codeText: string
}

const emits = defineEmits(['emitArea'])

const selectedOptions = ref<string[]>([])
const userAddress = ref<AddressInfo>({
  province: '',
  city: '',
  area: '',
  codeText: ''
})

const areaProps = {
  expandTrigger: 'hover' as const
}

// 监听id变化,更新选中值
watch(
  () => props.id,
  newId => {
    if (newId) selectedOptions.value = newId.split(',')
  },
  {
    immediate: true // 立即执行
  }
)

// 处理地址选择变化
const handleAddressChange = (codes: string[]) => {
  if (!codes.length) return

  const [province, city, area] = codes
  const codeText = `${codeToText[province]}${codeToText[city]}${codeToText[area]}`

  userAddress.value = {
    province,
    city,
    area,
    codeText
  }

  emits('emitArea', codeText, codes)
}
</script>

<style lang="scss" scoped></style>
