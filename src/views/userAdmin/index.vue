<script lang="ts">
export default {
  name: "userList"
};
</script>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";

import dialogForm from "./components/DialogForm.vue";
import { getUserList, deleteUser } from "/@/api/system";
import { ElMessage, ElMessageBox } from "element-plus";

interface UserListType {
  id: number;
  username: string;
  nickname: string;
  isAdmin: boolean;
}

const searchValue = ref("");
const dataLoading = ref(true);
const userDialogVisible = ref(false);

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

function adminChange({ $index, row }) {
  ElMessageBox.confirm(
    `确认要<strong>${
      row.role === true ? " 停用 " : " 启用 "
    }</strong><strong style='color:var(--el-color-primary)'>${
      row.username
    }</strong> 角色的<strong> 管理员 </strong>权限吗?`,
    "系统提示",
    {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
      dangerouslyUseHTMLString: true,
      draggable: true
    }
  )
    .then(() => {
      // Todo  post接口修改管理员权限
      setTimeout(() => {
        ElMessage.success("已成功修改");
      }, 300);
    })
    .catch(() => {
      row.isAdmin === true ? (row.isAdmin = false) : (row.isAdmin = true);
      ElMessage.warning("已取消修改");
    });
}

const filterUserData = computed(() =>
  userList.value.filter(
    data =>
      !searchValue.value ||
      data.username.toLowerCase().includes(searchValue.value.toLowerCase())
  )
);
const handleDelete = (id: number) => {
  const i = userList.value.findIndex(item => item.id === id);
  userList.value.splice(i, 1);
  deleteUser([{ id: i }]); //删除用户
};

const userAdd = () => {
  userDialogVisible.value = true;
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
        <el-table-column type="index" label="序号" width="180" />
        <el-table-column prop="username" label="用户名" />
        <el-table-column prop="nickname" label="昵称" />

        <el-table-column label="管理员" align="center" prop="role">
          <template #default="scope">
            <el-switch
              v-model="scope.row.isAdmin"
              @change="adminChange(scope)"
            />
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template #default="scope">
            <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <dialogForm v-show="userDialogVisible" />
  </div>
</template>

<style scoped lang="scss">
:deep(.el-dropdown-menu__item i) {
  margin: 0;
}
</style>
