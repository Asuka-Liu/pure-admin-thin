<script setup lang="ts">
import Motion from "./utils/motion";
import { useRouter } from "vue-router";
import { loginRules } from "./utils/rule";
import { initRouter } from "/@/router/utils";
import { message } from "@pureadmin/components";
import type { FormInstance } from "element-plus";
import { storageSession } from "/@/utils/storage";
import { ref, reactive, watch, computed } from "vue";
import { useUserStoreHook } from "/@/store/modules/user";
import { bg, avatar, currentWeek } from "./utils/static";
import { ReImageVerify } from "/@/components/ReImageVerify";
import { useRenderIcon } from "/@/components/ReIcon/src/hooks";

const imgCode = ref("");
const router = useRouter();
const loading = ref(false);
const checked = ref(false);
const ruleFormRef = ref<FormInstance>();
const currentPage = computed(() => {
  return useUserStoreHook().currentPage;
});

const ruleForm = reactive({
  username: "admin",
  password: "admin123",
  verifyCode: ""
});

const onLogin = async (formEl: FormInstance | undefined) => {
  loading.value = true;
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      // 模拟请求，需根据实际开发进行修改
      setTimeout(() => {
        loading.value = false;
        storageSession.setItem("info", {
          username: "admin",
          accessToken: "eyJhbGciOiJIUzUxMiJ9.test"
        });
        initRouter("admin").then(() => {});
        message.success("登陆成功");
        router.push("/");
      }, 1000);
    } else {
      loading.value = false;
      return fields;
    }
  });
};

watch(imgCode, value => {
  useUserStoreHook().SET_VERIFYCODE(value);
  console.log(value);
});
</script>

<template>
  <img :src="bg" class="wave" />
  <div class="login-container">
    <div class="img">
      <component :is="currentWeek" />
    </div>
    <div class="login-box">
      <div class="login-form">
        <avatar class="avatar" />
        <Motion>
          <h2>ZzuSoft Admin</h2>
        </Motion>

        <el-form
          v-if="currentPage === 0"
          ref="ruleFormRef"
          :model="ruleForm"
          :rules="loginRules"
          size="large"
          @keyup.enter="onLogin(ruleFormRef)"
        >
          <Motion :delay="100">
            <el-form-item prop="username">
              <el-input
                clearable
                :input-style="{ 'user-select': 'none' }"
                v-model="ruleForm.username"
                placeholder="账号"
                :prefix-icon="useRenderIcon('user')"
              />
            </el-form-item>
          </Motion>

          <Motion :delay="150">
            <el-form-item prop="password">
              <el-input
                clearable
                :input-style="{ 'user-select': 'none' }"
                show-password
                v-model="ruleForm.password"
                placeholder="密码"
                :prefix-icon="useRenderIcon('lock')"
              />
            </el-form-item>
          </Motion>

          <Motion :delay="200">
            <el-form-item prop="verifyCode">
              <el-input
                clearable
                :input-style="{ 'user-select': 'none' }"
                v-model="ruleForm.verifyCode"
                placeholder="验证码"
              >
                <template v-slot:append>
                  <ReImageVerify v-model:code="imgCode" />
                </template>
              </el-input>
            </el-form-item>
          </Motion>

          <Motion :delay="250">
            <el-form-item>
              <div class="w-full h-20px flex justify-between items-center">
                <el-checkbox v-model="checked">记住密码</el-checkbox>
              </div>
              <el-button
                class="w-full mt-4"
                size="default"
                type="primary"
                :loading="loading"
                @click="onLogin(ruleFormRef)"
              >
                登录
              </el-button>
            </el-form-item>
          </Motion>
        </el-form>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url("/@/style/login.css");
</style>

<style lang="scss" scoped>
:deep(.el-input-group__append, .el-input-group__prepend) {
  padding: 0;
}
</style>
