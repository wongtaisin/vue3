/*
 * @Author: wingddd wongtaisin1024@gmail.com
 * @Date: 2025-04-03 11:21:34
 * @LastEditors: wingddd wongtaisin1024@gmail.com
 * @LastEditTime: 2026-01-03 16:45:27
 * @FilePath: \vue3\src\router\modules\three.ts
 * @Description:
 *
 * Copyright (c) 2025 by wongtaisin1024@gmail.com, All Rights Reserved.
 */
export default [
  {
    path: 'three',
    name: 'three',
    redirect: '/three/list',
    component: () => import('@/views/three/index.vue'),
    meta: {
      title: 'three',
      activeMenu: '/three/list'
    },
    children: [
      {
        path: '/three/list',
        component: () => import('@/views/three/list/index.vue'),
        name: 'three列表',
        meta: {
          path: '/three/list',
          name: 'three列表',
          type: 'three-list'
        }
      },
      {
        path: '/three/factory',
        component: () => import('@/views/three/factory/index.vue'),
        name: 'three工厂',
        meta: {
          path: '/three/factory',
          name: 'three工厂',
          type: 'three-factory'
        }
      }
    ]
  }
]
