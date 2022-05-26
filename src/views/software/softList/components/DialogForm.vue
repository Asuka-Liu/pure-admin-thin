<script setup lang="ts">
import { ref, watch } from "vue";
import {
  uploadIconFile,
  uploadMdFile,
  uploadSoftFile
} from "/@/api/uploadFile";
import { ElMessage, FormInstance, UploadUserFile } from "element-plus";
import { genFileId } from "element-plus";
import type { UploadInstance, UploadProps, UploadRawFile } from "element-plus";

interface SoftType {
  // isSetup: boolean;
  groupId: number;
  groupName: string;
  iconSrc: string;
  mdSrc: string;
}

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
    type: Object as () => SoftType,
    default: () => {
      return {};
    }
  }
});

const ruleFormRef = ref<FormInstance>();

const softVisible = ref(false);
const softData = ref(props.data);

const uploadIcon = ref<UploadInstance>();

const uploadMd = ref<UploadInstance>();
const mdList = ref<UploadUserFile[]>([{ name: "", url: "" }]);

//限制图标上传数量
const iconExceed: UploadProps["onExceed"] = files => {
  uploadIcon.value!.clearFiles();
  const file = files[0] as UploadRawFile;
  file.uid = genFileId();
  uploadIcon.value!.handleStart(file);
};
//限制图标上传格式及大小
const IconUpload = file => {
  let FileExt = file.name.replace(/.+\./, "");
  if (["png", "jpg", "jpeg"].indexOf(FileExt.toLowerCase()) === -1) {
    ElMessage.error("必须上传图片格式为jpg/png !");
    return false;
  } else if (file.isLt1M === "0") {
    ElMessage.error("图片大小不能超过1M!");
    return false;
  }
  uploadIconFile([props.data.groupId, file]).then(res => {
    if (res.code === 200) {
      ElMessage.success("上传成功!");
    }
  });
  return true;
};
//限制Markdown文件上传数量
const beforeMdUpload: UploadProps["beforeUpload"] = rawFile => {
  if (rawFile.type !== "md") {
    ElMessage.error("必须上传Markdown文件!");
    return false;
  }
  return true;
};
const mdExceed: UploadProps["onExceed"] = files => {
  uploadMd.value!.clearFiles();
  const file = files[0] as UploadRawFile;
  file.uid = genFileId();
  uploadMd.value!.handleStart(file);
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
    mdList.value[0].name = val.groupName + ".md";
    mdList.value[0].url = val.mdSrc;
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
          ref="uploadIcon"
          :name="props.data.groupName"
          class="upload-icon"
          :limit="1"
          :on-exceed="iconExceed"
          list-type="picture"
          :on-change="IconUpload"
          accept=".jpg,.png,.jpeg"
          :auto-upload="false"
        >
          <el-button type="primary">选择图标</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item label="软件描述">
        <el-upload
          ref="uploadMd"
          class="upload-md"
          :name="props.data.groupName"
          :limit="1"
          list-type="text"
          :file-list="mdList"
          :on-exceed="mdExceed"
          :on-change="beforeMdUpload"
          accept=".md"
          :auto-upload="false"
          :style="{ width: '480px' }"
        >
          <el-button type="primary">选择文件</el-button>
        </el-upload>
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
