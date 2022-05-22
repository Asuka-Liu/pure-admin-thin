<script setup lang="ts">
import { ref, watch } from "vue";
import { ElMessage, FormInstance } from "element-plus";
import { genFileId } from "element-plus";
import type { UploadInstance, UploadProps, UploadRawFile } from "element-plus";

const SELECT_OPTIONS = [
  { label: "分类1", value: 1 },
  { label: "分类2", value: 2 },
  { label: "分类3", value: 3 },
  { label: "分类4", value: 4 },
  { label: "分类5", value: 5 }
];

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  data: {
    type: Object,
    default: () => {
      return {};
    }
  }
});

const ruleFormRef = ref<FormInstance>();

const softVisible = ref(false);
const softData = ref(props.data);

const upload = ref<UploadInstance>();

const handleExceed: UploadProps["onExceed"] = files => {
  upload.value!.clearFiles();
  const file = files[0] as UploadRawFile;
  file.uid = genFileId();
  upload.value!.handleStart(file);
};


const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(valid => {
    if (valid) {
      ElMessage.success("提交成功");
      softVisible.value = false;
      resetForm(formEl);
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};

const closeDialog = () => {
  softVisible.value = false;
  resetForm(ruleFormRef.value);
};

const emit = defineEmits(["update:visible"]);
watch(
  () => softVisible.value,
  val => {
    emit("update:visible", val);
  }
);

watch(
  () => props.visible,
  val => {
    softVisible.value = val;
  }
);

watch(
  () => props.data,
  val => {
    softData.value = val;
  }
);

const rules = {
  groupName: [{ required: true, message: "请输入软件名称", trigger: "blur" }]
};
</script>

<template>
  <el-dialog
    v-model="softVisible"
    title="软件管理"
    :width="680"
    draggable
    :before-close="closeDialog"
  >
    <!-- 表单内容 -->
    <el-form
      ref="ruleFormRef"
      :model="softData"
      :rules="rules"
      label-width="100px"
    >
      <el-form-item label="软件名称" prop="groupName">
        <el-input
          v-model="softData.groupName"
          :style="{ width: '480px' }"
          placeholder="请输入软件名称"
        />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="softData.status">
          <el-radio label="0">已停用</el-radio>
          <el-radio label="1">已启用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="软件图标" prop="iconSrc">
        <el-upload
          ref="upload"
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :limit="1"
          :on-exceed="handleExceed"
          :auto-upload="false"
        >
          <el-button type="primary">选择文件</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item label="软件描述" prop="mdSrc">
        <el-input
          v-model="softData.mdSrc"
          :style="{ width: '480px' }"
          placeholder="请输入软件描述"
        />
      </el-form-item>
      <el-form-item label="软件分类" prop="type">
        <el-select
          v-model="softData.type"
          clearable
          :style="{ width: '480px' }"
        >
          <el-option
            v-for="(item, index) in SELECT_OPTIONS"
            :key="index"
            :value="item.value"
            :label="item.label"
          >
            {{ item.label }}
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="文件列表" prop="softInfoList">
        <el-table :data="softData.softInfoList" :style="{ width: '480px' }">
          <el-table-column prop="softName" label="文件名称" width="180" />
          <el-table-column prop="downloadSrc" label="下载链接" width="300" />
        </el-table>
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
