/*
 * @Author: wingddd wongtaisin1024@gmail.com
 * @Date: 2024-11-13 08:05:37
 * @LastEditors: wingddd wongtaisin1024@gmail.com
 * @LastEditTime: 2026-01-03 16:45:38
 * @FilePath: \vue3\src\router\routes.ts
 * @Description:
 *
 * Copyright (c) 2024 by wongtaisin1024@gmail.com, All Rights Reserved.
 */

import { RouteRecordRaw } from 'vue-router'
import Order from './modules/order' // Order模块路由
import Three from './modules/three' // Three模块路由

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login.vue'),
    meta: {
      title: '登录页'
    }
  },
  {
    path: '/',
    name: 'Home',
    redirect: '/order/list',
    component: () => import('@/views/home.vue'),
    meta: {
      title: '首页'
    },
    children: [
      ...Order, // 引入Order模块路由
      ...Three // 引入Three模块路由
    ]
  },
  {
    path: '/pcba/valuation',
    name: 'pcba-valuation',
    component: () => import('@/views/pcba/index.vue'),
    meta: {
      title: '计价下单'
    }
  },
  {
    path: '/kong/list',
    name: 'kong-list',
    redirect: '/kong/order',
    component: () => import('@/views/kong/index.vue'),
    meta: {
      title: '空管理',
      activeMenu: '/kong/order'
    },
    children: [
      {
        path: '/kong/order',
        component: () => import('@/views/kong/modules/order.vue'),
        name: '空列表',
        meta: {
          path: '/kong/order',
          name: '空列表',
          type: 'kong-order'
        }
      },
      {
        path: '/kong/draft',
        component: () => import('@/views/kong/modules/draft.vue'),
        name: '空草稿',
        meta: {
          path: '/kong/draft',
          name: '空草稿',
          type: 'kong-draft'
        }
      }
    ]
  }
]

export default routes
