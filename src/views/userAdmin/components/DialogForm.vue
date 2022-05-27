<script setup lang="ts">
import { ref } from "vue";

import { ElMessage, FormInstance } from "element-plus";

interface userType {
  // isSetup: boolean;
  username: string;
  nickname: string;
  isAdmin: string;
}

const addUserData = ref<userType[]>([]);
const userVisible = ref<boolean>(false);
const ruleFormRef = ref<FormInstance>();

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(valid => {
    if (valid) {
      ElMessage.success("提交成功");
      userVisible.value = false;
      resetForm(formEl);
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};

const closeDialog = () => {
  userVisible.value = false;
  resetForm(ruleFormRef.value);
};

const rules = {
  groupName: [{ required: true, message: "请输入软件名称", trigger: "blur" }]
};
</script>

<template>
  <el-dialog
    title="添加用户"
    :width="680"
    draggable
    :before-close="closeDialog"
  >
    <!-- 表单内容 -->
    <el-form
      :label-position="labelPosition"
      label-width="100px"
      :model="formLabelAlign"
      style="max-width: 460px"
    >
      <el-form-item label="Name">
        <el-input v-model="formLabelAlign.name" />
      </el-form-item>
      <el-form-item label="Activity zone">
        <el-input v-model="formLabelAlign.region" />
      </el-form-item>
      <el-form-item label="Activity form">
        <el-input v-model="formLabelAlign.type" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="closeDialog">取消</el-button>
      <el-button type="primary" @click="submitForm(ruleFormRef)">
        确定
      </el-button>
    </template>
  </el-dialog>
</template>
