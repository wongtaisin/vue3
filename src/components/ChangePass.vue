<template>
  <div>
    <el-dialog v-model="dialogFormVisible" title="修改密码" style="width: 450px">
      <el-form ref="ruleFormRef" :model="form" :rules="rules">
        <el-form-item label="旧密码" prop="oldPass" :label-width="formLabelWidth">
          <el-input
            autocomplete="off"
            type="password"
            v-model="form.oldPass"
            placeholder="请输入旧密码"
          />
        </el-form-item>
        <el-form-item label="新密码" prop="newPass" :label-width="formLabelWidth">
          <el-input
            autocomplete="off"
            type="password"
            v-model="form.newPass"
            placeholder="请输入新密码"
          />
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPass" :label-width="formLabelWidth">
          <el-input
            autocomplete="off"
            type="password"
            v-model="form.confirmPass"
            placeholder="请再输入一次新密码"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="onSubmit"> 确认 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ElMessage } from 'element-plus'
import { reactive, ref } from 'vue'

const dialogFormVisible = ref(false)
const formLabelWidth = '80px'

const ruleFormRef = ref()

const form = ref({
  oldPass: '',
  newPass: '',
  confirmPass: ''
})

const rules = reactive({
  oldPass: [
    { required: true, message: '请输入旧密码', trigger: 'blur' },
    { min: 6, max: 18, message: '密码长度为6~18位英文字母', trigger: 'blur' }
  ],
  newPass: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { min: 6, max: 18, message: '密码长度为6~18位英文字母', trigger: 'blur' }
  ],
  confirmPass: [
    { required: true, message: '请再次输入新密码', trigger: 'blur' },
    { min: 6, max: 18, message: '密码长度为6~18位英文字母', trigger: 'blur' }
  ]
})

const init = (userId: any) => {
  // 呼出对话框
  dialogFormVisible.value = true
  // userId
  // TODO 根据用户userId,判断用户是否存在
}

const onSubmit = () => {
  ruleFormRef.value.validate((valid: any) => {
    if (valid) {
      // TODO
      // 调用修改密码接口
      ElMessage.success('密码修改成功')
      dialogFormVisible.value = false

      // 登录成功，跳转到管理首页
      // console.log('Submit')
    } else {
      console.log('Error submit')
      return false
    }
  })
}

defineExpose({
  init
})
</script>

<style lang="scss" scoped>
.el-input {
  width: 300px;
}

.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
