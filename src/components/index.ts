import CommonPagination from '@/components/common/pagination.vue'

import type { Component } from 'vue'

// 全局组件注册配置
const components: Array<{ name: string; component: Component }> = [
  { name: 'CommonPagination', component: CommonPagination }
]

export default components
