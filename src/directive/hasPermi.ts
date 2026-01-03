/**
 * v-hasPermi 操作权限处理
 * @description 用于检查用户是否具有特定操作权限的自定义指令
 * @example v-hasPermi="['system:user:add','system:user:edit']"
 */

import { DirectiveBinding } from 'vue'

interface Element extends HTMLElement {
  parentNode: Element | null
}

const hasPermi = {
  mounted(el: Element, binding: DirectiveBinding): void {
    const { value } = binding
    const ALL_PERMISSION = '*:*:*'

    // 在mounted钩子中获取最新的权限数据
    const userInfo = sessionStorage.getItem('userInfo')
    const userInfoData: any = JSON.parse(userInfo || '{}').permissions
    const permissions: string[] = userInfoData || []

    if (!Array.isArray(value) || value.length === 0) {
      throw new Error('请设置操作权限标签值')
    }

    const hasPermissions = permissions.some(
      (permission: string) => permission === ALL_PERMISSION || value.includes(permission)
    )

    if (!hasPermissions && el.parentNode) {
      el.parentNode.removeChild(el)
    }
  }
}

export default hasPermi
