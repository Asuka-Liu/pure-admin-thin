<script lang="ts">
export default {
  name: "SoftList"
};
</script>

<script setup lang="ts">
import { getAllSoftGroup } from "/@/api/list";
import Card from "./components/Card.vue";
import { ref, onMounted, nextTick } from "vue";
import dialogForm from "./components/DialogForm.vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { useRenderIcon } from "/@/components/ReIcon/src/hooks";
import router from "/@/router";

const svg = `
        <path class="path" d="
          M 30 15
          L 28 17
          M 25.61 25.61
          A 15 15, 0, 0, 1, 15 30
          A 15 15, 0, 1, 1, 27.99 7.5
          L 15 15
        " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
      `;

interface SoftFileType {
  softId: number;
  softName: string;
  groupId: number;
  downloadSrc: string;
  downloadNum: number;
  uploadTime: string;
}

interface SoftGroupType {
  groupId: number;
  groupName: string;
  iconSrc: string;
  mdSrc: string;
  softInfoList: SoftFileType[];
}

const INITIAL_DATA = {
  groupName: "",
  status: "",
  iconSrc: "",
  mdSrc: "",
  type: "",
  softInfoList: []
};

const pagination = ref({ current: 1, pageSize: 12, total: 0 });

const softGroup = ref([]);
const dataLoading = ref(true);

const getSoftListData = async () => {
  try {
    const { data } = await getAllSoftGroup();
    softGroup.value = data;
    pagination.value = {
      ...pagination.value,
      total: data.length
    };
  } catch (e) {
    console.log(e);
  } finally {
    setTimeout(() => {
      dataLoading.value = false;
    }, 500);
  }
};

onMounted(() => {
  getSoftListData();
});

const softDialogVisible = ref(false);
const softData = ref({ ...INITIAL_DATA });
const searchValue = ref("");

const onPageSizeChange = (size: number) => {
  pagination.value.pageSize = size;
  pagination.value.current = 1;
};
const onCurrentChange = (current: number) => {
  pagination.value.current = current;
};
const handleDeleteItem = software => {
  ElMessageBox.confirm(
    software
      ? `确认删除后${software.groupName}的所有产品信息将被清空, 且无法恢复`
      : "",
    "提示",
    {
      type: "warning"
    }
  )
    .then(() => {
      ElMessage({
        type: "success",
        message: "删除成功"
      });
    })
    .catch(() => {});
};
const handleManageProduct = software => {
  softDialogVisible.value = true;
  nextTick(() => {
    softData.value = { ...software, status: "1" };
  });
};
const softUpload = () => {
  router.push("/software/uploadSoft");
};
</script>

<template>
  <div class="main">
    <div class="w-full flex justify-between mb-4">
      <el-button :icon="useRenderIcon('add')" @click="softUpload"
        >上传软件
      </el-button>
      <el-input
        style="width: 300px"
        v-model="searchValue"
        placeholder="请输入软件名称"
        clearable
      >
        <template #suffix>
          <el-icon class="el-input__icon">
            <IconifyIconOffline
              v-show="searchValue.length === 0"
              icon="search"
            />
          </el-icon>
        </template>
      </el-input>
    </div>
    <div
      v-loading="dataLoading"
      :element-loading-svg="svg"
      element-loading-svg-view-box="-10, -10, 50, 50"
    >
      <el-empty
        description="暂无数据"
        v-show="
          softGroup
            .slice(
              pagination.pageSize * (pagination.current - 1),
              pagination.pageSize * pagination.current
            )
            .filter(v =>
              v.groupName.toLowerCase().includes(searchValue.toLowerCase())
            ).length === 0
        "
      />
      <template v-if="pagination.total > 0">
        <el-row :gutter="16">
          <el-col
            v-for="(software, index) in softGroup
              .slice(
                pagination.pageSize * (pagination.current - 1),
                pagination.pageSize * pagination.current
              )
              .filter(v =>
                v.groupName.toLowerCase().includes(searchValue.toLowerCase())
              )"
            :key="index"
            :xs="24"
            :sm="12"
            :md="8"
            :lg="6"
            :xl="4"
          >
            <Card
              :software="software"
              @delete-item="handleDeleteItem"
              @manage-product="handleManageProduct"
            />
          </el-col>
        </el-row>
        <el-pagination
          class="float-right"
          v-model:currentPage="pagination.current"
          :page-size="pagination.pageSize"
          :total="pagination.total"
          :page-sizes="[12, 24, 36]"
          :background="true"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="onPageSizeChange"
          @current-change="onCurrentChange"
        />
      </template>
    </div>
    <dialogForm v-model:visible="softDialogVisible" :data="softData" />
  </div>
</template>
