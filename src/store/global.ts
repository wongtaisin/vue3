/*
 * @Author: wingddd wongtaisin1024@gmail.com
 * @Date: 2024-12-02 10:21:36
 * @LastEditors: wingddd wongtaisin1024@gmail.com
 * @LastEditTime: 2024-12-02 11:19:12
 * @FilePath: \aiComputer\src\pinia\global.ts
 * @Description: Keep-alive 组件缓存管理
 *
 * Copyright (c) 2024 by wongtaisin1024@gmail.com, All Rights Reserved.
 */
import { defineStore } from 'pinia'
import { ref } from 'vue'

// Keep-alive 组件状态管理
export const useKeepAliveStore = defineStore('keepAlive', () => {
  const keepAliveComponents = ref<string[]>([]) // 缓存组件名称列表

  // 添加需要缓存的组件
  const keepAlive = (name: string): void => {
    !keepAliveComponents.value.includes(name) && keepAliveComponents.value.push(name)
  }

  // 移除缓存的组件
  const removeKeepAlive = (name: string): void => {
    const index = keepAliveComponents.value.indexOf(name)
    index !== -1 && keepAliveComponents.value.splice(index, 1)
  }

  // 清空所有缓存的组件
  const clearKeepAlive = (): void => {
    keepAliveComponents.value = []
  }

  return {
    keepAliveComponents,
    keepAlive,
    removeKeepAlive,
    clearKeepAlive
  }
})
