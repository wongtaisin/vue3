/*
 * @Author: wingddd wongtaisin1024@gmail.com
 * @Date: 2025-04-03 14:16:34
 * @LastEditors: wingddd wongtaisin1024@gmail.com
 * @LastEditTime: 2026-01-03 16:46:02
 * @FilePath: \vue3\src\store\counter.ts
 * @Description: 带有持久化功能的 Pinia 计数器存储
 *
 * Copyright (c) 2025 by wongtaisin1024@gmail.com, All Rights Reserved.
 */
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useCounterStore = defineStore(
  'counter',
  () => {
    // 存储计数值的响应式引用
    const count = ref(0)

    /**
     * 计算双倍计数值
     * @returns {number} 当前计数值的两倍
     */
    const doubleCount = computed(() => count.value * 2)

    /**
     * 递增计数值
     * 将计数值加1
     */
    const increment = (): void => {
      count.value++
    }

    return {
      count,
      doubleCount,
      increment
    }
  },
  {
    persist: true // 开启持久化
  }
)
