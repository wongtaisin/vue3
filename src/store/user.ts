/*
 * @Author: wingddd wongtaisin1024@gmail.com
 * @Date: 2025-04-03 14:16:34
 * @LastEditors: wingddd wongtaisin1024@gmail.com
 * @LastEditTime: 2026-01-03 16:42:39
 * @FilePath: \vue3\src\store\user.ts
 * @Description: 用于管理用户信息的 Pinia store，支持持久化存储
 *
 * Copyright (c) 2025 wongtaisin1024@gmail.com, All Rights Reserved.
 */
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useUserStore = defineStore(
  'user',
  () => {
    // 用户基本信息,包含用户ID、用户名、头像等数据
    const userInfo = ref<Record<string, any>>({})

    // 用户权限列表,存储用户可访问的权限标识
    const authorityList = ref<string[]>([])

    /**
     * 获取用户权限列表
     * @returns {string[]} 用户拥有的权限标识数组
     * @description 通过计算属性返回最新的权限列表
     */
    const getAuthorityList = computed(() => authorityList.value)

    /**
     * 获取用户基本信息
     * @returns {Record<string, any>} 包含用户详细信息的对象
     * @description 通过计算属性返回最新的用户信息
     */
    const getUserInfo = computed(() => userInfo.value)

    /**
     * 更新用户权限列表
     * @param {string[]} data - 新的权限列表数组
     * @description 用于登录后或权限变更时更新用户权限
     */
    const setAuthorityList = (data: string[]) => {
      authorityList.value = data
    }

    /**
     * 更新用户基本信息
     * @param {Record<string, any>} data - 新的用户信息对象
     * @description 用于登录后或用户信息变更时更新用户数据
     */
    const setUserInfo = (data: Record<string, any>) => {
      userInfo.value = data
    }

    return {
      authorityList,
      getAuthorityList,
      setAuthorityList,
      userInfo,
      getUserInfo,
      setUserInfo
    }
  },
  {
    persist: true // 启用 Pinia 持久化插件,在页面刷新后保持状态
  }
)
