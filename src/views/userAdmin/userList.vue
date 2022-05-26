<script lang="ts">
export default {
  name: "userList"
};
</script>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";

import { router } from "/@/router";
import { getUserList } from "/@/api/system";

interface UserListType {
  id: number;
  username: string;
  nickname: string;
  email: string;
  mobile: string;
  role: string;
  createTime: string;
  updateTime: string;
  status: number;
}

const searchValue = ref("");
const dataLoading = ref(true);

const userList = ref<UserListType[]>([]);

const getUserListData = async () => {
  try {
    const { data } = await getUserList();
    userList.value = data;
  } catch (e) {
    console.log(e);
  } finally {
    setTimeout(() => {
      dataLoading.value = false;
    }, 500);
  }
};

onMounted(() => {
  getUserListData();
});

const filterUserData = computed(() =>
  userList.value.filter(
    data =>
      !searchValue.value ||
      data.username.toLowerCase().includes(searchValue.value.toLowerCase())
  )
);

const userAdd = () => {
  router.push({
    name: "userAdd"
  });
};
</script>

<template>
  <div class="main">
    <div class="w-full flex justify-between mb-4">
      <el-button @click="userAdd"
        ><IconifyIconOffline icon="user-add-outlined" /> 新建用户
      </el-button>
      <el-input
        style="width: 300px"
        v-model="searchValue"
        placeholder="请输入用户名"
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
      element-loading-svg-view-box="-10, -10, 50, 50"
    >
      <el-table
        :data="filterUserData"
        stripe
        table-layout="auto"
        style="width: 100%"
      >
        <el-table-column prop="id" label="序号" />
        <el-table-column prop="username" label="用户名" />
        <el-table-column prop="nickname" label="昵称" />
        <el-table-column prop="email" label="邮箱" />
        <el-table-column prop="mobile" label="手机号" />
        <el-table-column prop="role" label="角色" />
        <el-table-column prop="createTime" label="创建时间" />
        <el-table-column prop="updateTime" label="更新时间" />
        <el-table-column prop="status" label="状态" />
        <el-table-column label="操作">
          <template #default="scope">
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--    <dialogForm v-model:visible="softDialogVisible" :data="softData" />-->
  </div>
</template>

<style scoped lang="scss">
:deep(.el-dropdown-menu__item i) {
  margin: 0;
}
</style>
