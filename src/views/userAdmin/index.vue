<script lang="ts">
export default {
  name: "userList"
};
</script>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";

import {
  getUserList,
  deleteUser,
  addUser,
  changeUserRole
} from "/@/api/system";
import { ElMessage, ElMessageBox } from "element-plus";

interface UserListType {
  id: number; // 用户id
  username: string; //学号
  nickname: string; //昵称
  isAdmin: boolean; //是否是管理员
}

const searchValue = ref("");
const dataLoading = ref(true);

const userList = ref<UserListType[]>([]);

//获取用户列表
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

//改变管理员权限
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
      // Todo  post接口修改管理员权限 finish
      changeUserRole({ id: row.id, isAdmin: row.isAdmin })
        .then(value => {
          if (value.code === 200) {
            ElMessage.success(
              `${row.username} 管理员权限${row.isAdmin ? "启用" : "停用"}成功`
            );
          } else {
            ElMessage.error(
              `${row.username} 管理员权限${row.isAdmin ? "启用" : "停用"}失败`
            );
            userList.value[$index].isAdmin = !row.isAdmin;
          }
        })
        .catch(() => {
          ElMessage.error(
            `${row.username} 管理员权限${row.isAdmin ? "启用" : "停用"}失败`
          );
          userList.value[$index].isAdmin = !row.isAdmin;
        });
    })
    .catch(() => {
      row.isAdmin === true ? (row.isAdmin = false) : (row.isAdmin = true);
      ElMessage.warning("已取消修改");
    });
}

//搜索
const filterUserData = computed(() =>
  userList.value.filter(
    data =>
      !searchValue.value ||
      data.username.toLowerCase().includes(searchValue.value.toLowerCase())
  )
);
//删除用户
const handleDelete = (id: number) => {
  const i = userList.value.findIndex(item => item.id === id);
  userList.value.splice(i, 1);
  deleteUser([{ id: i }]); //删除用户
};

//添加用户
const userAdd = () => {
  ElMessageBox.prompt("请输入学号", "添加用户", {
    confirmButtonText: "添加",
    cancelButtonText: "Cancel",
    inputPattern: /^\d{4,25}$/, //4-25位数字
    inputErrorMessage: "请输入正确的学号"
  })
    .then(({ value }) => {
      addUser([{ username: value }]);
      userList.value.push({
        id: userList.value.length + 1,
        username: value,
        nickname: value,
        isAdmin: false
      });
      ElMessage({
        type: "success",
        message: `已添加学号:${value}`
      });
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "已取消添加"
      });
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
        placeholder="请输入学号"
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
        :header-cell-style="{ 'text-align': 'center' }"
        :cell-style="{ 'text-align': 'center' }"
      >
        <el-table-column type="index" label="序号" width="180" />
        <el-table-column prop="username" label="学号" />
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
  </div>
</template>

<style scoped lang="scss">
:deep(.el-dropdown-menu__item i) {
  margin: 0;
}
</style>
