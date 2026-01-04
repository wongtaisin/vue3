/*
 * @Author: wingddd wongtaisin1024@gmail.com
 * @Date: 2025-04-03 14:16:34
 * @LastEditors: wingddd wongtaisin1024@gmail.com
 * @LastEditTime: 2025-08-21 11:26:02
 * @FilePath: \vue3\src\pinia\token.ts
 * @Description: 用于管理 token 的 Pinia store，支持持久化存储
 *
 * Copyright (c) 2025 wongtaisin1024@gmail.com, All Rights Reserved.
 */
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useTokenStore = defineStore('token', () => {
  // 存储token的JSON字符串的响应式引用
  const tokenJson = ref<string>('')

  /**
   * 获取并解析token
   * 优先从内存中获取，如果没有则从localStorage读取
   * @returns {Record<string, any>} 解析后的token对象
   * @throws 当JSON解析失败时抛出错误
   */
  const token = computed(() => {
    return tokenJson.value || localStorage.getItem('token') || ''
  })

  /**
   * 保存token到内存和localStorage
   * @param {string} data - token的JSON字符串
   */
  const saveToken = (data: string): void => {
    tokenJson.value = data
    localStorage.setItem('token', data)
  }

  /**
   * 清除token
   * 同时清除内存和localStorage中的token
   */
  const clearToken = (): void => {
    tokenJson.value = ''
    localStorage.removeItem('token')
  }

  return {
    token,
    saveToken,
    clearToken
  }
})
