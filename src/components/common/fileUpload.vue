<!--
 * @Author: wingddd wongtaisin1024@gmail.com
 * @Date: 2024-11-14 15:02:55
 * @LastEditors: wingddd wongtaisin1024@gmail.com
 * @LastEditTime: 2024-11-26 15:15:09
 * @FilePath: \vue3\src\components\common\fileUpload.vue
 * @Description: 文件上传组件
 *
 * Copyright (c) 2024 by wongtaisin1024@gmail.com, All Rights Reserved.
-->
<template>
  <div class="upload-page">
    <el-upload
      :before-upload="beforeUpload"
      :data="uploadData"
      :limit="1"
      :on-error="handleError"
      :on-exceed="handleExceed"
      :on-success="handleSuccess"
      :show-file-list="true"
      :action="uploadUrl"
      :headers="headers"
      class="upload-demo"
    >
      <template #trigger>
        <el-button type="primary">
          <i class="iconfont icon-shangchuan" />
          <span>上传文件</span>
        </el-button>
      </template>
      <template #tip>
        <div class="el-upload__tip">{{ props.tip }}</div>
      </template>
    </el-upload>
  </div>
</template>

<script lang="ts" setup>
import { getInfo } from '@/store/actions'
import { getToken, loginUserKey } from '@/utils/auth'
import { ElMessage } from 'element-plus'
import { computed } from 'vue'

interface Props {
  tip?: string
  id: number // 需要绑定的id
}

const props = defineProps<Props>()

interface UserInfo {
  userId: string
  userName: string
}

interface UploadResponse {
  code: number
  msg: string
  data: {
    id: string
  }
}

const userInfo = computed<UserInfo>(() => getInfo().data as UserInfo)
const uploadUrl = '/api/fmsmart/file/upload'

// 请求头
const headers = computed(() => ({
  Authorization: `Bearer ${getToken()}`,
  Userkey: loginUserKey()
}))

// 上传参数
const uploadData = computed(() => ({
  fileType: props.id,
  uploadId: userInfo.value.userId,
  uploadName: userInfo.value.userName
}))

// 文件上传前校验
const beforeUpload = (file: File): boolean => {
  const maxSize = 100 // 最大文件大小(MB)
  const isLt2M = file.size / 1024 / 1024 < maxSize

  if (!isLt2M) {
    ElMessage.warning(`上传文件大小不能超过 ${maxSize}MB!`)
    return false
  }
  return true
}

// 文件数超出限制
const handleExceed = (): void => {
  ElMessage.warning('最多只能上传一个文件！')
}

// 上传失败
const handleError = (): void => {
  ElMessage.error('文件上传失败,请重试！')
}

const emitEvents = defineEmits(['uploadFile'])

// 上传成功
const handleSuccess = (response: UploadResponse): void => {
  if (response.code === 200) {
    ElMessage.success(response.msg)
    emitEvents('uploadFile', response.data.id, '打印文件上传！')
  } else {
    ElMessage.error(response.msg)
  }
}
</script>

<style lang="scss" scoped>
.iconfont {
  margin-right: 5px;
}
</style>
