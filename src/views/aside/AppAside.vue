<template>
  <el-aside>
    <el-menu :default-active="onRoutes" router unique-opened :collapse="isCollapse">
      <div class="logo pt-20 pb-20" href="/">
        <img class="mr-10" src="@/assets/images/Vitejs-logo.png" />
        <h1>Vite + Vue3 + TS + PINIA</h1>
      </div>
      <el-scrollbar style="height: calc(100vh - 134px)">
        <LeftMenuItem :item="item" :key="i" v-for="(item, i) in menu" />
      </el-scrollbar>
    </el-menu>
  </el-aside>
</template>

<script lang="ts" setup>
import { getAllMenu } from '@/api/menu'
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { isCollapse } from '../configCenter'
import LeftMenuItem from './LeftMenuItem.vue'

interface MenuItem {
  value: string
  name: string
  title: string
  path: string
  icon: string
  menuType?: number
  children?: MenuItem[]
}

const route = useRoute()

// 菜单列表
const menu = ref<MenuItem[]>([])

// 获取菜单列表
const getMenu = async () => {
  const res = await getAllMenu()
  menu.value = res
}

// 处理路由
const onRoutes: any = computed(() => {
  if (route.meta.activeMenu) return route.meta.activeMenu
  return route.path
})

getMenu()
</script>

<style lang="scss" scoped>
@include p(b, 20);
@include p(t, 20);
@include m(r, 10);

.el-aside {
  width: auto;
  height: 100vh;
}

.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 90px;

  img {
    width: 50px;
  }

  h1 {
    color: white;
    font-size: 20px;
    text-decoration: none;
  }
}

:deep(.el-menu) {
  width: 200px;
  background: #001529;
  color: #fff;
  border-right: none;

  // 所有子项样式都写在这里，天然限定在 .el-menu 内部
  .el-sub-menu {
    &.is-active {
      > .el-sub-menu__title {
        color: white;
        background-color: #001529 !important;
      }
    }

    // 把 .el-sub-menu__title 的 hover 放进来
    .el-sub-menu__title {
      color: #fff;
      &:hover {
        background: #247bb4;
      }
    }
  }

  // 把 .el-menu-item 相关样式全部放进来
  .el-menu-item {
    color: #fff;

    &.is-active {
      background: #247bb4;
      color: #f1d070;
    }

    &:hover {
      background: rgba(26, 37, 47, 1);
    }
  }

  // 折叠状态
  &.el-menu--collapse {
    width: 60px;
    h1 {
      display: none;
    }
  }
}
</style>
