<!--
 * @Author: wingddd wongtaisin1024@gmail.com
 * @Date: 2024-11-15 13:46:29
 * @LastEditors: wingddd wongtaisin1024@gmail.com
 * @LastEditTime: 2026-01-04 16:34:10
 * @FilePath: \vue3\src\views\order\modules\list.vue
 * @Description: 订单列表页面
 *
 * Copyright (c) 2024 by wongtaisin1024@gmail.com, All Rights Reserved.
-->
<template>
  <el-card>
    <el-tabs @tab-click="handleTabClick" class="demo-tabs" v-model="activeTabName">
      <el-tab-pane label="所有订单" name="" />
      <el-tab-pane label="待审核" name="0" />
      <el-tab-pane label="待确认" name="1" />
      <el-tab-pane label="待发货" name="2" />
      <el-tab-pane label="已发货" name="3" />
      <el-tab-pane label="已取消" name="4" />
    </el-tabs>
    <el-form :model="params" label-width="auto">
      <el-row :gutter="20">
        <el-col :span="4">
          <el-form-item label="订单编号" prop="orderNo">
            <el-input placeholder="请输入订单编号" v-model.trim="params.orderNo" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="下单时间" prop="orderStartTime">
            <el-date-picker
              @change="handleDateTimeChange"
              end-placeholder="结束日期"
              range-separator="至"
              start-placeholder="开始日期"
              type="datetimerange"
              v-model="dateTimeRange"
              value-format="YYYY-MM-DD HH:mm:ss"
            />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-button @click="handleSearch" type="primary">查询</el-button>
        </el-col>
      </el-row>
    </el-form>
    <el-table :data="tableData" border stripe>
      <el-table-column align="center" fixed label="序号" prop="sequence" width="60">
        <template #default="scope">
          {{ (pagination.page - 1) * pagination.pageSize + scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="订单编号" prop="orderNo" />
      <el-table-column label="下单时间" prop="orderTime" />
      <el-table-column label="文件" prop="address" width="350">
        <template #default="scope">
          <div :key="i" class="file-item" v-for="(item, i) in scope.row.fileList">
            <div class="file-title">{{ item.fileTitle }}：</div>
            <div @click="handleFileDownload(item)" class="file-name">{{ item.fileName }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="数量" prop="actualAmount">
        <template #default="scope">
          <p>{{ scope.row.productCount }}pcs</p>
          <p v-if="scope.row.isSingle == '1'">单层</p>
          <p v-else>双层</p>
          <p>拼版 {{ scope.row.panelWay }}</p>
        </template>
      </el-table-column>
      <el-table-column label="价格" prop="estimatedAmount" />
      <el-table-column align="center" label="状态">
        <template #default="scope">
          <el-button type="danger" v-if="scope.row.orderStatus == 0">待审核</el-button>
          <el-button
            @click="handleOrderConfirm(scope.row)"
            type="primary"
            v-if="scope.row.orderStatus == 1"
            >确认下单</el-button
          >
          <el-button type="warning" v-if="scope.row.orderStatus == 2">待发货</el-button>
          <el-button type="success" v-if="scope.row.orderStatus == 3">已发货</el-button>
          <el-button type="info" v-if="scope.row.orderStatus == 4">已取消</el-button>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template #default="scope">
          <el-space spacer="|" style="color: #999" wrap>
            <el-link :id="scope.row.id" @click="handleOrderDetail(scope.row)" type="primary">
              <i class="iconfont icon-detail" /> 详情
            </el-link>
            <el-link
              :id="scope.row.id"
              @click="handleOrderCancel(scope.row, scope.$index)"
              type="danger"
            >
              <i class="iconfont icon-shanchu" /> 取消
            </el-link>
          </el-space>
        </template>
      </el-table-column>
    </el-table>

    <CommonPagination
      :page="pagination.page"
      :page-size="pagination.pageSize"
      :total="total"
      @current-change="handlePageChange"
      @size-change="handleSizeChange"
    />

    <OrderDetails ref="orderDetailsRef" />
  </el-card>
</template>

<script lang="ts" setup>
import { downloadFile } from '@/api/common'
import { getInfo } from '@/store/actions'
import { orderListInit } from '@/store/modules/order'
import { ElMessage, ElMessageBox, TabsPaneContext } from 'element-plus'
import { computed, onMounted, reactive, ref } from 'vue'
import OrderDetails from '../common/details.vue'

const userInfo = computed<any>(() => getInfo().data)

// 标签页相关
const activeTabName = ref('')
const handleTabClick = (tab: TabsPaneContext) => {
  params.orderStatus = tab.props.name
  resetPagination()
  orderListLoad()
}

// 日期时间范围
const dateTimeRange = ref('')
const handleDateTimeChange = () => {
  const [start, end] = dateTimeRange.value || []
  params.orderStartTime = start || ''
  params.orderEndTime = end || ''
}

// 搜索处理
const handleSearch = () => {
  resetPagination()
  orderListLoad()
}

// 查询参数
const params = reactive<any>({
  orderNo: '',
  orderStatus: '',
  orderEndTime: '',
  orderStartTime: '',
  userId: userInfo.value.userId || 110
})

// 分页参数
const pagination = reactive({
  page: 1,
  pageSize: 10
})

// 重置分页
const resetPagination = () => {
  pagination.page = 1
  pagination.pageSize = 10
}

// 订单列表数据
const tableData = ref<any>([])
const total = ref(0)

// 加载订单列表
const userOrderListInit = orderListInit()
const orderListLoad = async () => {
  const res = await userOrderListInit.getOrderList()
  tableData.value = res.rows
  total.value = res.total
}

// 文件下载
const handleFileDownload = async (file: any) => {
  await downloadFile(file)
  ElMessage.success('下载成功')
}

// 订单详情
const orderDetailsRef = ref()
const handleOrderDetail = (order: any) => {
  orderDetailsRef.value?.opens(order)
}

// 确认下单
const handleOrderConfirm = async (order: any) => {
  // TODO: 调用确认下单接口
  const res = {
    orderNo: order.orderNo,
    orderStatus: 1
  }
  console.log(res)
  ElMessage.success('下单成功')
  orderListLoad()
}

// 取消订单
const handleOrderCancel = (order: any, index: number) => {
  return ElMessageBox.confirm(`订单编号 ${order.orderNo}?`, '正在取消订单', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(
    async () => {
      ElMessage.success('取消成功')
      tableData.value.splice(index, 1)
    },
    () => ElMessage.success('已取消删除')
  )
}

// 分页处理
const handlePageChange = (page: number) => {
  pagination.page = page
  orderListLoad()
}

const handleSizeChange = (size: number) => {
  pagination.pageSize = size
  orderListLoad()
}

onMounted(() => {
  orderListLoad()
})
</script>

<style lang="scss" scoped>
.file-item {
  display: flex;
  align-items: center;
  margin-bottom: 4px;

  .file-title {
    text-align: right;
    margin-right: 8px;
    white-space: nowrap;
    flex-shrink: 0;
    width: 80px;
  }

  .file-name {
    color: rgb(78, 193, 243);
    cursor: pointer;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    min-width: 200px;
    transition: all 0.3s;

    &:hover {
      color: rgb(78, 193, 243);
      cursor: pointer;
      overflow: visible;
      white-space: normal;
      position: relative;
      z-index: 100;
    }
  }
}

.iconfont {
  margin-right: 3px;
}
</style>
