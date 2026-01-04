/*
 * @Author: wingddd wongtaisin1024@gmail.com
 * @Date: 2025-04-03 14:16:34
 * @LastEditors: wingddd wongtaisin1024@gmail.com
 * @LastEditTime: 2025-07-18 13:50:13
 * @FilePath: \vue3\src\pinia\tabs.ts
 * @Description: 用于管理标签页的 Pinia store，支持持久化存储
 *
 * Copyright (c) 2025 by wongtaisin1024@gmail.com, All Rights Reserved.
 */
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useTabsStore = defineStore(
  'tabsStore',
  () => {
    // 存储标签页列表的响应式引用
    const tabs = ref<any[]>([])

    /**
     * 获取标签页列表
     * 优先从localStorage读取，如果为空则返回空数组
     * @returns {any[]} 标签页列表
     */
    const getTabs = computed(() => {
      tabs.value = JSON.parse(localStorage.getItem('tabs') || '[]')
      return tabs.value
    })

    /**
     * 保存新的标签页
     * 如果标签页数量超过10个，则移除最早的标签页
     * @param {any} data - 要保存的标签页数据
     */
    const saveTabs = (data: any): void => {
      // 系统默认最多显示10个标签页
      // TODO: 后续添加左右滚动功能后可优化此限制
      if (tabs.value.length >= 10) {
        tabs.value.shift() // 移除最早的标签页
      }

      tabs.value.push(data)
      localStorage.setItem('tabs', JSON.stringify(tabs.value))
    }

    /**
     * 覆盖更新标签页列表
     * @param {any[]} data - 新的标签页列表数据
     */
    const copyTabs = (data: any): void => {
      tabs.value = data
      localStorage.setItem('tabs', JSON.stringify(data))
    }

    return { tabs, getTabs, saveTabs, copyTabs }
  },
  {
    persist: true // 开启持久化存储，保证页面刷新后状态不丢失
  }
)
