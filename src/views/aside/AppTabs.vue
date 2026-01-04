<template>
  <div class="tabs">
    <div class="tabs-home">
      <router-link to="/" class="linkTabs">
        <el-icon><House /></el-icon>
      </router-link>
    </div>

    <!-- tabs选项卡 -->
    <div class="tabs content">
      <router-link
        v-for="item in tabsStore.getTabs"
        :key="item.tabs"
        class="linkTabs"
        :to="item.path"
        active-class="active"
      >
        <el-text v-text="item.name" />
        <div class="close_bg">
          <el-icon @click.prevent="handleCloseTab(item.name)"><Close /></el-icon>
        </div>
      </router-link>
      <!-- <el-tabs closable @tab-click="handleUrl">
				<el-tab-pane
					v-for="(item, i) in tabsStore.getTabs"
					:key="i"
					:label="item.name"
					:name="item.path"
				/>
			</el-tabs> -->
    </div>

    <!-- tabs选项卡右侧下拉菜单 -->
    <div class="tabs-tools">
      <el-dropdown trigger="click" :teleported="true">
        <button class="dropdown-trigger" type="button" aria-label="标签页操作菜单">
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </button>
        <template #dropdown>
          <el-dropdown-menu role="menu">
            <el-dropdown-item role="menuitem" @click="handleTab('01')">
              <el-icon><RefreshLeft /></el-icon>
              <el-text>刷新当前</el-text>
            </el-dropdown-item>
            <el-dropdown-item @click="handleTab('02')">
              <el-icon><Close /></el-icon><el-text>关闭当前</el-text>
            </el-dropdown-item>
            <el-dropdown-item @click="handleTab('03')">
              <el-icon><Back /></el-icon><el-text>关闭左侧</el-text>
            </el-dropdown-item>
            <el-dropdown-item @click="handleTab('04')">
              <el-icon><Right /></el-icon><el-text>关闭右侧</el-text>
            </el-dropdown-item>
            <el-dropdown-item @click="handleTab('05')">
              <el-icon><Remove /></el-icon><el-text>关闭其它</el-text>
            </el-dropdown-item>
            <el-dropdown-item @click="handleTab('06')">
              <el-icon><CircleClose /></el-icon><el-text>关闭全部</el-text>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useTabsStore } from '@/store/tabs'
import { useRoute, useRouter } from 'vue-router'

const tabsStore = useTabsStore()
const router = useRouter()
const route = useRoute()

// 关闭当前tabs标签
const handleCloseTab = (name: unknown) => {
  const index = tabsStore.getTabs.findIndex((obj: { name: unknown }) => obj.name === name)
  const newArr = tabsStore.getTabs.filter((obj: { name: unknown }) => obj.name !== name)
  tabsStore.copyTabs(newArr)
  if (index - 1 >= 0) {
    router.push(newArr[index - 1]['path'])
  } else {
    router.push('/')
  }
}

// 关闭当前tabs标签左侧的标签
const handleCloseTabLeft = (name: unknown) => {
  const index = tabsStore.getTabs.findIndex((obj: { name: unknown }) => obj.name === name)
  const newArr = tabsStore.getTabs.splice(0, index)
  tabsStore.copyTabs(tabsStore.getTabs)
  console.log(index, newArr, `关闭当前tabs标签左侧的标签`)
}

// 关闭当前tabs标签右侧的标签
const handleCloseTabRight = (name: unknown) => {
  const arr = tabsStore.getTabs
  const index = arr.findIndex((obj: { name: unknown }) => obj.name === name)
  if (arr.length - index > 0) {
    arr.splice(index + 1, arr.length - index)
  }
  tabsStore.copyTabs(arr)
}

// 关闭当前tabs标签以外的标签
const handleCloseTabOther = (name: unknown) => {
  const arr = tabsStore.getTabs
  const index = arr.findIndex((obj: { name: unknown }) => obj.name === name)
  const newArr = arr.filter((obj: { name: unknown }) => obj.name === name)

  console.log(index, newArr, `关闭当前tabs标签以外的标签`)

  tabsStore.copyTabs(newArr)
}

// 关闭当前tabs标签右侧的标签
const handleCloseTabCloseAll = (name: unknown) => {
  console.log(name)
  tabsStore.copyTabs([])
  router.push('/')
}

// tab栏最右侧下拉菜单
const handleTab = (data: string) => {
  switch (data) {
    case '01': // 刷新当前
      router.go(0)
      break
    case '02': // 关闭当前
      handleCloseTab(route.meta.title)
      break
    case '03': // 关闭左侧
      handleCloseTabLeft(route.meta.title)
      break
    case '04': // 关闭右侧
      handleCloseTabRight(route.meta.title)
      break
    case '05': // 关闭其他
      handleCloseTabOther(route.meta.title)
      break
    case '06': // 关闭全部
      handleCloseTabCloseAll(route.meta.title)
      break
    default:
      console.warn('Unknown action:', data)
  }
}

// const handleUrl = (url: any) => {
// 	console.log('flush', url.props.name)
// 	router.push(url.props.name)
// }
</script>

<style lang="scss" scoped>
.tabs {
  width: 100%;
  height: 40px;
  background-color: #ffffff;
  box-shadow: 0 1px 4px -2px rgba(0, 21, 41, 0.08);
  display: flex;
  flex-direction: row;
  align-items: center;

  .tabs-home {
    width: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 20px;
    margin-right: 20px;
  }

  .tabs content {
    flex: 1;
  }
  .tabs-tools {
    width: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .active {
    padding-left: 20px;
    padding-right: 20px;
    text-decoration: none;
    color: #333;
    height: 38px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 2px solid #1677ff;
    font-size: 14px;
    background-color: #e8f1ff;
  }
  .linkTabs {
    padding-left: 10px;
    padding-right: 10px;
    text-decoration: none;
    color: #333;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    line-height: 40px;
    .el-text {
      margin-right: 3px;
    }
  }
  .close_bg {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .close_bg:hover {
    background-color: #ee6666;
    color: #ffffff;
  }
}

.dropdown-trigger {
  border: none;
  background: transparent;
  padding: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;

  &:hover {
    color: var(--el-color-primary);
  }
}
</style>
