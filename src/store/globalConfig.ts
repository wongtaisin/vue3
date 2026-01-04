/*
 * @Author: wingddd wongtaisin1024@gmail.com
 * @Date: 2025-04-03 14:16:34
 * @LastEditors: wingddd wongtaisin1024@gmail.com
 * @LastEditTime: 2025-08-21 11:24:46
 * @FilePath: \vue3\src\pinia\globalConfig.ts
 * @Description: 用于管理令牌的 Pinia 存储，支持持久化存储。
 *
 * Copyright (c) 2025 wongtaisin1024@gmail.com, All Rights Reserved.
 */
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useGlobalConfigStore = defineStore(
  'globalConfig',
  () => {
    // 存储全局配置的响应式引用
    const config = ref<Record<string, any>>({})

    /**
     * 获取全局配置
     * 优先从内存中获取，如果为空则从localStorage读取
     * @returns {Record<string, any>} 全局配置对象
     */
    const getConfig = computed(() =>
      Object.keys(config.value).length
        ? config.value
        : JSON.parse(localStorage.getItem('globalConfig') || '{}')
    )

    /**
     * 保存配置到内存和localStorage
     * @param {Record<string, any>} data - 要保存的配置对象
     */
    const saveConfig = (data: Record<string, any>): void => {
      config.value = data
      localStorage.setItem('globalConfig', JSON.stringify(data))
    }

    return { config, getConfig, saveConfig }
  },
  {
    persist: true // 开启持久化
  }
)
