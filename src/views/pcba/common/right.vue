<!--
 * @Author: wingddd wongtaisin1024@gmial.com
 * @Date: 2024-11-13 9:02:55
 * @LastEditors: wingddd wongtaisin1024@gmail.com
 * @LastEditTime: 2025-08-21 15:44:52
 * @FilePath: \project\src\views\pcba\common\right.vue
 * @Description: right
 *
 * Copyright (c) 2025 by wongtaisin1024@gmail.com, All Rights Reserved.
-->
<template>
  <section>
    <!-- <el-affix :offset="80"> -->
    <div class="right">
      <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item title="PCBA参数详情" name="1">
          <el-descriptions border :column="1">
            <el-descriptions-item label="产品类型" label-class-name="left-label">
              kooriookami
            </el-descriptions-item>
            <el-descriptions-item label-class-name="left-label" label="PCB板类型">
              18100000000
            </el-descriptions-item>
            <el-descriptions-item label="贴装层">Suzhou</el-descriptions-item>
            <el-descriptions-item label="PCB尺寸">
              <el-tag size="small">School</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="生产数量"></el-descriptions-item>
            <el-descriptions-item label="BOM物料种"></el-descriptions-item>
            <el-descriptions-item label="单片贴片数"></el-descriptions-item>
            <el-descriptions-item label-class-name="left-label" label="单片插件点数" />
            <el-descriptions-item label="钢网类型"></el-descriptions-item>
            <el-descriptions-item label="包装类型"></el-descriptions-item>
          </el-descriptions>
        </el-collapse-item>
        <el-collapse-item title="PCBA制造及工艺" name="2">
          <el-descriptions border :column="2">
            <el-descriptions-item label="是否组装" label-class-name="left-label">
              kooriookami
            </el-descriptions-item>
            <el-descriptions-item label-class-name="left-label" label="程序烧录">
              18100000000
            </el-descriptions-item>
            <el-descriptions-item label="是否分板">Suzhou</el-descriptions-item>
            <el-descriptions-item label="功能测试">
              <el-tag size="small">School</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="X-ray单板数"></el-descriptions-item>
            <el-descriptions-item label="确认样品图"></el-descriptions-item>
            <el-descriptions-item label="X-ray元件数"></el-descriptions-item>
          </el-descriptions>
        </el-collapse-item>
        <el-collapse-item title="PCBA价格及生产周期" name="3">
          <el-table :data="tableData" ref="refTable" @select="selectClick">
            <el-table-column type="selection" width="55" />
            <el-table-column label="交期">
              <template #default="scope">{{ scope.row.date }}</template>
            </el-table-column>
            <el-table-column property="name" label="价格" />
            <el-table-column property="address" label="单价" show-overflow-tooltip />
          </el-table>
        </el-collapse-item>
        <el-collapse-item title="PCBA费用详情" name="4">
          <el-descriptions direction="vertical" border :column="3">
            <el-descriptions-item label="工程费">kooriookami</el-descriptions-item>
            <el-descriptions-item label="贴片费">18100000000</el-descriptions-item>
            <el-descriptions-item label="插件费">Suzhou</el-descriptions-item>
            <el-descriptions-item label="特殊工艺费">
              <el-tag size="small">School</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="其他"></el-descriptions-item>
          </el-descriptions>
          <section class="css-row">
            <el-row justify="space-between">
              <el-col :span="12">费用合计</el-col>
              <el-col :span="12" class="css-text-right">
                <span>¥</span>
                3083.22
              </el-col>
            </el-row>
            <el-row justify="space-between">
              <el-col :span="12">税费</el-col>
              <el-col :span="12" class="css-text-right">
                <span>¥</span>
                18100000000
              </el-col>
            </el-row>
            <el-row justify="space-between">
              <el-col :span="12">运费</el-col>
              <el-col :span="12" class="css-text-right">
                <span>¥</span>
                998.98
              </el-col>
            </el-row>
          </section>
          <section class="css-row">
            <el-row justify="space-between">
              <el-col :span="6" class="css-total">PCBA预估金额</el-col>
              <el-col :span="9" class="css-tab">"实际价格以订单审核后为主"</el-col>
              <el-col :span="9" class="css-origin css-text-right">
                <span></span>
                ¥3088888.22
              </el-col>
            </el-row>
          </section>
          <section style="margin-top: 20px">
            <el-row :gutter="20" justify="space-between">
              <el-col :span="12">
                <el-button type="primary" style="width: 100%; height: 42px" plain>
                  保存草稿
                </el-button>
              </el-col>
              <el-col :span="12">
                <el-button type="primary" style="width: 100%; height: 42px">提交订单</el-button>
              </el-col>
            </el-row>
          </section>
        </el-collapse-item>
      </el-collapse>
    </div>
    <!-- </el-affix> -->
  </section>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
const activeNames = ref(['1', '2', '3', '4'])
const handleChange = (val: any) => {
  console.log(val, `右侧折叠`)
}

// 已下是表格处理
const refTable = ref() // 表格ref

interface User {
  date: string
  name: string
  address: string
}
const tableData = reactive<User[]>([
  {
    date: '2016-05-04',
    name: 'Aleyna Kutzner',
    address: '86'
  },
  {
    date: '2016-05-03',
    name: 'Helen Jacobi',
    address: '760'
  },
  {
    date: '2016-05-02',
    name: 'Brandon Deckert',
    address: '41'
  },
  {
    date: '2016-05-01',
    name: 'Margie Smith',
    address: '23618'
  }
])

// table选择项发生变化时会触发该事件
const selectClick = (selection: any, row: any) => {
  console.log(selection, row, `table选择项发生变化时会触发该事件`)
  if (selection.length > 1) {
    let del_row = selection.shift()
    refTable.value.toggleRowSelection(del_row, false) // 用于多选表格，切换某一行的选中状态，如果使用了第二个参数，则是设置这一行选中与否（selected 为 true 则选中）
  }
}
</script>

<style lang="scss" scoped>
.right {
  // box-shadow: 2px 2px 5px 2px #888888;
  width: 500px;
}

.css-row {
  margin-top: 10px;

  .css-total {
    line-height: 42px;
    font-size: 14px;
    font-weight: bold;
  }

  .css-origin {
    color: #ff9700;
    font-size: 24px;
    font-weight: bold;
  }

  .css-text-right {
    width: 100%;
    text-align: right;
  }

  .css-tab {
    color: #8c8c8c;
    line-height: 3;
  }
}

:deep(.left-label) {
  width: 110px;
}

:deep(.el-collapse-item) {
  background: white;
  padding: 20px 20px 0.1px 20px;
  margin-bottom: 10px;

  &:last-child {
    margin-bottom: 0;
  }
}

:deep(.el-collapse-item__header) {
  background: #f5f7f9;
  padding: 0 10px;
  font-weight: bold;
  margin-bottom: 20px;
  border-top: none;
}

// 隐藏全选按钮
:deep(.el-table th.el-table__cell:nth-child(1) .cell) {
  visibility: hidden;
}
</style>
