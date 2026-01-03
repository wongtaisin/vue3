/*
 * @Author: wingddd wongtaisin1024@gmail.com
 * @Date: 2025-07-18 09:54:15
 * @LastEditors: wingddd wongtaisin1024@gmail.com
 * @LastEditTime: 2025-07-18 11:01:52
 * @FilePath: \project\src\router\modules\order.ts
 * @Description:
 *
 * Copyright (c) 2025 by wongtaisin1024@gmail.com, All Rights Reserved.
 */

export default [
  {
    path: '/order',
    name: 'order',
    redirect: '/order/list',
    component: () => import('@/views/order/index.vue'),
    meta: {
      title: 'order订单列表',
      activeMenu: '/order/list'
    },
    children: [
      {
        path: '/order/list',
        component: () => import('@/views/order/modules/list.vue'),
        name: '订单',
        meta: {
          path: '/order/list',
          name: '订单',
          type: 'order-list'
        }
      },
      {
        path: '/order/draft',
        component: () => import('@/views/order/modules/draft.vue'),
        name: '草稿',
        meta: {
          path: '/order/draft',
          name: '草稿',
          type: 'order-draft'
        }
      }
    ]
  }
]
