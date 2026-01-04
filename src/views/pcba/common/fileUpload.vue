<!--
 * @Author: wingddd wongtaisin1024@gmial.com
 * @Date: 2024-11-14 15:02:55
 * @LastEditors: wingddd wongtaisin1024@gmail.com
 * @LastEditTime: 2025-08-21 15:15:50
 * @FilePath: \vue3\src\views\pcba\common\fileUpload.vue
 * @Description: 文件上传
 *
 * Copyright (c) 2025 by wongtaisin1024@gmail.com, All Rights Reserved.
-->
<template>
  <section>
    <el-form-item :label="props.title" label-width="100px">
      <el-upload
        :before-remove="beforeRemove"
        :before-upload="beforeUPload"
        :limit="1"
        :on-exceed="handleExceed"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
        :auto-upload="props.autoUpload"
        class="upload-demo"
        ref="uploadRef"
        :http-request="uploadExcel"
        v-model:file-list="fileList"
      >
        <template #trigger>
          <el-button type="primary">
            <i class="iconfont icon-shangchuan mt-20" />
            <span>上传文件</span>
          </el-button>
        </template>
        <template #tip>
          <div class="el-upload__tip">{{ props.tip }}</div>
        </template>
      </el-upload>
    </el-form-item>
  </section>
</template>

<script lang="ts" setup>
import { ElMessage, ElMessageBox, UploadProps, UploadUserFile } from 'element-plus'
import { ref } from 'vue'

interface Props {
  title: string
  tip?: string
  autoUpload?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  autoUpload: true
})

// 上传文件
const fileList = ref<UploadUserFile[]>([
  // {
  //   name: 'element-plus-logo.svg',
  //   url: 'https://element-plus.org/images/element-plus-logo.svg',
  // }
])

// 文件上传之前判断
const beforeUPload: UploadProps['beforeUpload'] = file => {
  console.log(file, `文件上传之前判断`)
  const isExcel =
    file.type === 'application/vnd.ms-excel' ||
    file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  const isLt2M = file.size / 1024 / 1024 < 20

  if (!isExcel)
    ElMessageBox({
      title: '温馨提示',
      message: '上传文件只能是 txt / xlsx / xls / csv 格式！',
      type: 'warning'
    })

  if (!isLt2M)
    ElMessageBox({
      title: '温馨提示',
      message: '上传文件大小不能超过 20MB!',
      type: 'warning'
    })
  return isExcel && isLt2M
}

// 文件列表移除文件时
const handleRemove: UploadProps['onRemove'] = (file, uploadFiles) => {
  console.log(file, uploadFiles, `文件列表移除文件时`)
}

// 下载文件
const handlePreview: UploadProps['onPreview'] = uploadFile => {
  console.log(uploadFile, `下载文件`)
}

// 选取文件超过数量提示
const handleExceed: UploadProps['onExceed'] = (files, uploadFiles) => {
  console.log(files, uploadFiles, `选取文件超过数量提示`)
  ElMessage.warning(`最多只能上传${files.length} 文件, 请重新 ${files.length + uploadFiles.length}`)
}

// 删除上传文件
const beforeRemove: UploadProps['beforeRemove'] = (uploadFile, uploadFiles) => {
  console.log(uploadFiles, `删除上传文件`)
  return ElMessageBox.confirm(`确定删除 ${uploadFile.name} ?`).then(
    () => true,
    () => false
  )
}

// 文件上传
const uploadExcel = async (param: any) => {
  let fileFormData = new FormData()
  fileFormData.append('file', param.file)
  console.log(fileFormData, `文件上传`)
}
</script>

<style lang="scss" scoped>
.iconfont {
  margin-right: 5px;
}
</style>
