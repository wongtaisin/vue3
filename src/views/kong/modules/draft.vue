<!--
 * @Author: wingddd wongtaisin1024@gmail.com
 * @Date: 2024-11-15 13:46:29
 * @LastEditors: wingddd wongtaisin1024@gmail.com
 * @LastEditTime: 2026-01-04 16:39:50
 * @FilePath: \vue3\src\views\kong\modules\draft.vue
 * @Description: 草稿列表页面
 *
 * Copyright (c) 2024 by wongtaisin1024@gmail.com, All Rights Reserved.
-->
<template>
  <div class="draft">
    <el-form :model="params" label-width="auto">
      <el-row :gutter="20">
        <el-col :span="4">
          <el-form-item label="草稿编号" prop="orderNo">
            <el-input placeholder="请输入草稿编号" v-model.trim="params.orderNo" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="保存时间" prop="orderStartTime">
            <el-date-picker
              @change="handleTime"
              end-placeholder="结束日期"
              range-separator="至"
              start-placeholder="开始日期"
              type="datetimerange"
              v-model="dateTime"
              value-format="YYYY-MM-DD HH:mm:ss"
            />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-button @click="onSubmit" type="primary">查询</el-button>
        </el-col>
      </el-row>
    </el-form>
    <el-table
      :data="tableData"
      :header-cell-style="{ background: '#f5f7fA', color: '#606266' }"
      :height="autoHeight()"
      border
      stripe
    >
      <el-table-column align="center" fixed label="序号" prop="sequence" width="60">
        <template #default="scope">{{
          (page.page - 1) * page.pageSize + scope.$index + 1
        }}</template>
      </el-table-column>
      <el-table-column label="订单编号" prop="orderNo" />
      <el-table-column label="下单时间" prop="orderTime" />
      <el-table-column label="文件" prop="address" width="350">
        <template #default="scope">
          <div :key="i" class="file-item" v-for="(item, i) in scope.row.fileList">
            <div class="file-title">{{ item.fileTitle }}：</div>
            <div @click="handleFileDownload(item)" class="fileSty">{{ item.fileName }}</div>
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
      <el-table-column align="center" label="操作">
        <template #default="scope">
          <el-space spacer="|" style="color: #999" wrap>
            <el-link :id="scope.row.id" @click="handleEdit(scope.row)" type="primary">
              <i class="iconfont icon-xiugai" /> 编辑
            </el-link>
            <el-link
              :id="scope.row.id"
              @click="handleCancel(scope.row, scope.$index)"
              type="danger"
            >
              <i class="iconfont icon-shanchu" /> 取消
            </el-link>
          </el-space>
        </template>
      </el-table-column>
    </el-table>

    <CommonPagination
      :page="page.page"
      :page-size="page.pageSize"
      :total="total"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    />
  </div>
</template>

<script lang="ts" setup>
import { ElMessage, ElMessageBox } from 'element-plus'
import { computed, onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

// 模拟数据
const mockData = [
  {
    orderNo: 'DR2024001',
    orderTime: '2024-01-01 10:00:00',
    fileList: [
      {
        fileTitle: 'PCB文件',
        fileName: 'pcb_design_v1.zip'
      }
    ],
    productCount: 100,
    isSingle: '1',
    panelWay: '2x2',
    estimatedAmount: '1000.00',
    id: 1
  }
]

const autoHeight = () => {
  let a = document.body.scrollHeight
  return a - 220
}

onMounted(() => {
  draftListLoad()
})

const userInfo = computed(() => ({
  userId: '110',
  username: 'huang'
}))

const dateTime = ref('')

// 时间选择处理
const handleTime = () => {
  if (dateTime.value && dateTime.value.length === 2) {
    params.orderStartTime = dateTime.value[0]
    params.orderEndTime = dateTime.value[1]
  } else {
    params.orderStartTime = ''
    params.orderEndTime = ''
  }
}

const onSubmit = () => {
  page.page = 1
  draftListLoad()
}

const params = reactive<any>({
  orderNo: '',
  orderStatus: '',
  orderEndTime: '',
  orderStartTime: '',
  userId: userInfo.value.userId
})

const page = reactive({
  page: 1,
  pageSize: 10
})

// 订单列表信息
const tableData = ref<any>([])
const total = ref(0)

// 加载列表数据
const draftListLoad = () => {
  // 模拟分页和筛选
  const filteredData = mockData.filter(item => {
    if (params.orderNo && !item.orderNo.includes(params.orderNo)) return false
    return true
  })

  const start = (page.page - 1) * page.pageSize
  const end = start + page.pageSize

  tableData.value = filteredData.slice(start, end)
  total.value = filteredData.length
}

// 文件下载
const handleFileDownload = (item: any) => {
  window.open(item.fileAddress)
  ElMessage.success('文件下载成功')
}

const router = useRouter()
const handleEdit = (row: any) => {
  router.push({
    path: '/pcba/valuation',
    query: { orderNo: row.orderNo }
  })
}

// 取消订单
const handleCancel = (row: any, index: number) => {
  return ElMessageBox.confirm(`订单编号 ${row.orderNo}?`, '正在取消订单', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(
    () => {
      tableData.value.splice(index, 1)
      ElMessage.success('取消成功')
    },
    () => ElMessage.success('已取消删除')
  )
}

// 分页处理
const handleCurrentChange = (index: number) => {
  page.page = index
  draftListLoad()
}

const handleSizeChange = (index: number) => {
  page.pageSize = index
  draftListLoad()
}
</script>

<style lang="scss" scoped>
.draft {
  background: white;
  width: 100%;

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
      color: #606266;
    }

    .fileSty {
      color: #409eff;
      cursor: pointer;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 200px;
      transition: all 0.3s;

      &:hover {
        color: #66b1ff;
        text-decoration: underline;
        overflow: visible;
        white-space: normal;
        position: relative;
        z-index: 100;
      }
    }
  }
}
.iconfont {
  margin-right: 5px;
}
</style>
