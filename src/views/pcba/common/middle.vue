<!--
 * @Author: wingddd wongtaisin1024@gmail.com
 * @Date: 2024-11-13 9:02:55
 * @LastEditors: wingddd wongtaisin1024@gmail.com
 * @LastEditTime: 2025-08-21 15:45:53
 * @FilePath: \project\src\views\pcba\common\middle.vue
 * @Description: middle
 *
 * Copyright (c) 2025 by wongtaisin1024@gmail.com, All Rights Reserved.
-->
<template>
  <section class="middle">
    <div class="demo-collapse">
      <el-collapse @change="handleChange" v-model="activeNames">
        <el-collapse-item id="upload" name="1" title="上传文件">
          <el-form
            :inline="true"
            :model="formInline"
            :rules="rules"
            class="demo-form-inline"
            ref="ruleFormRef"
          >
            <el-row :gutter="20">
              <el-col :span="12">
                <FileUpload title="Gerber文件" tip="可以直接上传Gerber" :autoUpload="false" />
              </el-col>
              <el-col :span="12">
                <FileUpload title="钢网文件" tip="邮寄钢网可以无需上传文件" :autoUpload="false" />
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <FileUpload title="BOM清单" tip="文件最好是xlsx、xls两种" :autoUpload="false" />
              </el-col>
              <el-col :span="12">
                <FileUpload title="坐标文件" tip="文件格式txt、xlsx、xls、csv" />
              </el-col>
            </el-row>
            <!-- <el-form-item>
							<el-button @click="submitForm(ruleFormRef)" type="primary">提交</el-button>
						</el-form-item> -->
          </el-form>
        </el-collapse-item>
        <el-collapse-item id="information" name="2" title="基本信息">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="产品类型" label-width="100px" prop="productCode">
                <el-select placeholder="请选择产品类型" v-model="formInline.productCode">
                  <el-option
                    :disabled="item.disabled"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    v-for="item in options"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="PCB板类型" label-width="100px" prop="pcbPlateType">
                <el-select placeholder="请选择PCB板类型" v-model="formInline.pcbPlateType">
                  <el-option
                    :key="item.code"
                    :label="item.name"
                    :value="item.code"
                    v-for="item in pcbPlateType"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="贴装层" label-width="100px" prop="isSingle">
                <el-radio-group v-model="formInline.isSingle">
                  <el-radio border value="1">单面</el-radio>
                  <el-radio border value="2">双面</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="生产数量" label-width="100px" prop="productCount">
                <el-input-number :min="1" v-model="formInline.productCount">
                  <template #suffix>
                    <span>PCS</span>
                  </template>
                </el-input-number>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item label="PCB尺寸" label-width="100px" prop="pcbWidth">
                <el-input-number :min="0" v-model="formInline.pcbWidth">
                  <template #suffix>
                    <span>CM</span>
                  </template>
                </el-input-number>
                <span>&nbsp;&nbsp;x&nbsp;&nbsp;</span>
                <el-input-number :min="0" v-model="formInline.pcbHeight">
                  <template #suffix>
                    <span>CM</span>
                  </template>
                </el-input-number>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item label="拼板方式" label-width="100px" prop="panelRows">
                <el-input-number :min="0" v-model="formInline.panelRows"></el-input-number>
                <span>&nbsp;&nbsp;x&nbsp;&nbsp;</span>
                <el-input-number :min="0" v-model="formInline.panelColumns"></el-input-number>
              </el-form-item>
            </el-col>
          </el-row>
        </el-collapse-item>
        <el-collapse-item id="smt" name="3" title="SMT贴片及插件">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="BOM物料种类" label-width="100px" prop="bomType">
                <el-input placeholder="BOM物料种类" v-model="formInline.bomType" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="单片贴片数" label-width="100px" prop="pasterNumber">
                <el-input-number
                  :max="999999999"
                  :min="0"
                  @change="handleNumber"
                  controls-position="right"
                  v-model="formInline.pasterNumber"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="是否存在插件" label-width="100px" prop="isPlugIn">
                <el-radio-group @change="handlePlug" v-model="formInline.isPlugIn">
                  <el-radio :value="1" border>是</el-radio>
                  <el-radio :value="0" border>否</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="12" v-if="formInline.isPlugIn === 1">
              <el-form-item label="单片插件点数" label-width="100px" prop="plugInNumber">
                <el-input-number
                  :max="999999999"
                  :min="0"
                  controls-position="right"
                  v-model="formInline.plugInNumber"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12" v-else>
              <el-form-item label="钢网是否寄回" label-width="100px" prop="isSendSteelMesh">
                <el-radio-group v-model="formInline.isSendSteelMesh">
                  <el-radio border style="margin-right: 5px" value="0">不需要</el-radio>
                  <el-radio border style="margin-right: 0" value="1">随时发</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="formInline.isPlugIn === 1 ? 12 : 24">
              <el-form-item
                :label-width="formInline.isPlugIn === 1 ? '72px' : '100px'"
                label="钢网类型"
                prop="steelMeshType"
              >
                <el-radio-group v-model="formInline.steelMeshType">
                  <el-radio border style="margin-right: 5px" value="1">普通钢网</el-radio>
                  <el-radio border style="margin-right: 0" value="2">阶梯钢网</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="12" v-show="formInline.isPlugIn === 1">
              <el-form-item label="钢网是否寄回" label-width="100px" prop="isSendSteelMesh">
                <el-radio-group v-model="formInline.isSendSteelMesh">
                  <el-radio border style="margin-right: 5px" value="0">不需要</el-radio>
                  <el-radio border style="margin-right: 0" value="1">随时发</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
        </el-collapse-item>
        <el-collapse-item id="craft" name="4" title="制造工艺">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="程序烧录" label-width="100px" prop="programming">
                <el-radio-group v-model="formInline.programming">
                  <el-radio border value="0">不需要</el-radio>
                  <el-radio border value="1">需要</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="功能测试" label-width="100px" prop="functionalTest">
                <el-radio-group v-model="formInline.functionalTest">
                  <el-radio border value="0">不需要</el-radio>
                  <el-radio border value="1">需要</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12" v-if="formInline.programming === '1'">
              <el-form-item label="烧录方式" label-width="100px" prop="programmingWay">
                <el-radio-group v-model="formInline.programmingWay">
                  <el-radio-button label="在线" value="1" />
                  <el-radio-button label="离线" value="2" />
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="12" v-else>
              <el-form-item label="是否组装" label-width="100px" prop="assembly">
                <el-radio-group v-model="formInline.assembly">
                  <el-radio border value="0">不需要</el-radio>
                  <el-radio border value="1">需要</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="是否分板" label-width="100px" prop="needBoardSeparation">
                <el-radio-group v-model="formInline.needBoardSeparation">
                  <el-radio border value="0">不需要</el-radio>
                  <el-radio border value="1">需要</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12" v-if="formInline.programming !== '1'">
              <el-form-item label="X-ray单板数" label-width="100px" prop="xRaySingle">
                <el-input-number
                  :max="999999999"
                  :min="0"
                  @change="handleNum"
                  controls-position="right"
                  v-model="formInline.xRaySingle"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12" v-else>
              <el-form-item label="是否组装" label-width="100px" prop="assembly">
                <el-radio-group v-model="formInline.assembly">
                  <el-radio border value="0">不需要</el-radio>
                  <el-radio border value="1">需要</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="确认样品图" label-width="100px" prop="sampleImage">
                <el-radio-group v-model="formInline.sampleImage">
                  <el-radio border :value="0">不需要</el-radio>
                  <el-radio border :value="1">需要</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col v-show="formInline.assembly === '1'">
              <el-form-item label="组装时间" label-width="100px" prop="assemblyTime">
                <el-input-number :min="1" v-model="formInline.assemblyTime">
                  <template #suffix>
                    <span>min</span>
                  </template>
                </el-input-number>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col v-if="formInline.programming === '1'">
              <el-form-item label="X-ray单板数" label-width="100px" prop="xRaySingle">
                <el-input-number
                  :max="999999999"
                  :min="0"
                  @change="handleNum"
                  controls-position="right"
                  v-model="formInline.xRaySingle"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item label="X-ray元件数" label-width="100px" prop="xRayComponent">
                <el-input-number
                  :min="0"
                  @change="handleNum"
                  controls-position="right"
                  v-model="formInline.xRayComponent"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item label="工艺备注" label-width="100px" prop="desc">
                <el-input type="textarea" v-model="formInline.desc" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-collapse-item>
        <el-collapse-item id="pack" name="5" title="包装类型">
          <el-row>
            <el-col>
              <el-form-item label="包装类型" label-width="100px" prop="packagingType">
                <el-radio-group v-model="formInline.packagingType">
                  <el-radio-button label="标准: 防静电袋 " value="1" />
                  <el-radio-button label="品质: 防静电袋屏蔽袋 " value="2" />
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
        </el-collapse-item>
        <el-collapse-item id="expressage" name="6" title="发货/快递">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="快递公司" label-width="100px" prop="courierCompany">
                <el-select placeholder="请选择快递公司" v-model="formInline.courierCompany">
                  <el-option label="中通" value="中通" />
                  <el-option label="中国邮政" value="中国邮政" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-collapse-item>
      </el-collapse>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { FormInstance, FormRules } from 'element-plus'
import { reactive, ref } from 'vue'
import FileUpload from './fileUpload.vue'

const activeNames = ref(['1', '2', '3', '4', '5', '6'])
const handleChange = (val: any) => {
  console.log(val)
}

interface RuleForm {
  user: string
  region: string
  fileList: string[]
  num2: string
  input: string
  desc: string
  packagingType: string
  courierCompany: string
  productCode: string[]
  isSingle: string
  productCount: number
  pcbPlateType: string[]
  pcbWidth: number
  pcbHeight: number
  panelRows: number
  panelColumns: number
  bomType: string
  pasterNumber: number
  isPlugIn: number
  plugInNumber: number
  isSendSteelMesh: string
  steelMeshType: string
  programming: string
  programmingWay: string
  functionalTest: string
  assembly: string
  assemblyTime: number
  needBoardSeparation: string
  sampleImage: number
  xRaySingle: number
  xRayComponent: number
}

// 表单提交
const formInline = reactive<RuleForm>({
  user: '',
  region: '',
  fileList: [],
  num2: '',
  input: '',
  desc: '',
  packagingType: '1',
  courierCompany: '中通',
  productCode: [],
  isSingle: '1',
  productCount: 1,
  pcbPlateType: [],
  pcbWidth: 0,
  pcbHeight: 0,
  panelRows: 0,
  panelColumns: 0,
  bomType: '',
  pasterNumber: 0,
  isPlugIn: 0,
  plugInNumber: 1,
  isSendSteelMesh: '0',
  steelMeshType: '1',
  programming: '0',
  programmingWay: '',
  functionalTest: '0',
  assembly: '0',
  assemblyTime: 0,
  needBoardSeparation: '0',
  sampleImage: 0,
  xRaySingle: 0,
  xRayComponent: 0
})
const ruleFormRef = ref<FormInstance>()
const rules = reactive<FormRules<RuleForm>>({
  isPlugIn: [{ required: true, message: '请选择是否有插件', trigger: 'change' }]
})

// 提交文件
// const submitForm = async (formEl: FormInstance | undefined) => {
// 	console.log(formEl, formInline, `提交文件`)
// 	if (!formEl) return
// 	await formEl.validate((valid, fields) => {
// 		if (valid) {
// 			console.log('submit!')
// 		} else {
// 			console.log('error submit!', fields)
// 		}
// 	})
// }

// PCB板类型
const pcbPlateType = ref([
  {
    name: '硬板',
    code: '1'
  },
  {
    name: '软板',
    code: '2'
  },
  {
    name: '软硬结合板',
    code: '3'
  }
])

// 下拉
const options = ref([
  {
    value: 'Option1',
    label: 'Option1'
  },
  {
    value: 'Option2',
    label: 'Option2',
    disabled: true
  },
  {
    value: 'Option3',
    label: 'Option3'
  },
  {
    value: 'Option4',
    label: 'Option4'
  },
  {
    value: 'Option5',
    label: 'Option5'
  }
])

const handleNum = (value: any) => {
  console.log(value)
}

// 单片贴片数
const handleNumber = (value: any) => {
  console.log(value, `单片贴片数`)
}

// 是否存在插件
const handlePlug = (value: any) => {
  console.log(value, '是否存在插件')
}
</script>

<style lang="scss" scoped>
i {
  margin-right: 5px;
}

.middle {
  width: 100%;
  margin: 0 20px;
}

.demo-collapse {
  // box-shadow: 2px 2px 5px 2px #888888;
  background: white;
  // width: calc(100% - 456px);
  // width: 100%;
  padding: 20px;
}

:deep(.el-collapse-item__header) {
  background: #f5f7f9;
  padding: 0 10px;
  font-weight: bold;
  margin-bottom: 20px;
}

:deep(.el-radio) {
  margin-right: 10px;
}

:deep(.el-upload__tip) {
  color: #8c8c8c;
}

:deep(.el-form-item__label) {
  color: black;
}

// .demo-form-inline .el-input {
// 	--el-input-width: 120px;
// }

// .demo-form-inline .el-select {
// 	--el-select-width: 120px;
// }
</style>
