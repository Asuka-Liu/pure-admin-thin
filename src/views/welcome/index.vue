<script setup lang="ts">
import {
  ReSizePie,
  RePeopleGauge,
  ReNumGauge,
  ReSoftGauge
} from "./components";
import { ref, computed } from "vue";
import avatars from "/@/assets/avatars.jpg";

const date: Date = new Date();
let loading = ref<boolean>(true);

setTimeout(() => {
  loading.value = !loading.value;
}, 800);

let greetings = computed(() => {
  if (date.getHours() >= 0 && date.getHours() < 12) {
    return "上午阳光明媚，祝你薪水翻倍🌞！";
  } else if (date.getHours() >= 12 && date.getHours() < 18) {
    return "下午小风娇好，愿你青春不老😃！";
  } else {
    return "折一根天使羽毛，愿拂去您的疲惫烦恼忧伤🌛！";
  }
});
</script>

<template>
  <div class="welcome">
    <el-card class="top-content">
      <div class="left-mark">
        <img :src="avatars" />
        <span>{{ greetings }}</span>
      </div>
    </el-card>
    <el-row :gutter="24" style="margin: 20px">
      <el-col
        :xs="24"
        :sm="24"
        :md="12"
        :lg="12"
        :xl="12"
        style="margin-bottom: 20px"
        v-motion
        :initial="{
          opacity: 0,
          y: 100
        }"
        :enter="{
          opacity: 1,
          y: 0,
          transition: {
            delay: 400
          }
        }"
      >
        <el-card>
          <template #header>
            <span style="font-size: 16px; font-weight: 500"> 游览人数 </span>
          </template>
          <el-skeleton animated :rows="7" :loading="loading">
            <template #default>
              <RePeopleGauge />
            </template>
          </el-skeleton>
        </el-card>
      </el-col>
      <el-col
        :xs="24"
        :sm="24"
        :md="12"
        :lg="12"
        :xl="12"
        style="margin-bottom: 20px"
        v-motion
        :initial="{
          opacity: 0,
          y: 100
        }"
        :enter="{
          opacity: 1,
          y: 0,
          transition: {
            delay: 600
          }
        }"
      >
        <el-card>
          <template #header>
            <span style="font-size: 16px; font-weight: 500"> 软件下载量 </span>
          </template>
          <el-skeleton animated :rows="7" :loading="loading">
            <template #default>
              <ReNumGauge />
            </template>
          </el-skeleton>
        </el-card>
      </el-col>
      <el-col
        :xs="24"
        :sm="24"
        :md="12"
        :lg="8"
        :xl="8"
        style="margin-bottom: 20px"
        v-motion
        :initial="{
          opacity: 0,
          y: 100
        }"
        :enter="{
          opacity: 1,
          y: 0,
          transition: {
            delay: 200
          }
        }"
      >
        <el-card>
          <template #header>
            <span style="font-size: 16px; font-weight: 500">
              MinIO存储信息
            </span>
          </template>
          <el-skeleton animated :rows="7" :loading="loading">
            <template #default>
              <ReSizePie />
            </template>
          </el-skeleton>
        </el-card>
      </el-col>
      <el-col
        :xs="24"
        :sm="24"
        :md="12"
        :lg="8"
        :xl="8"
        style="margin-bottom: 20px"
        v-motion
        :initial="{
          opacity: 0,
          y: 100
        }"
        :enter="{
          opacity: 1,
          y: 0,
          transition: {
            delay: 200
          }
        }"
      >
        <el-card>
          <template #header>
            <span style="font-size: 16px; font-weight: 500">
              MinIO存储信息
            </span>
          </template>
          <el-skeleton animated :rows="7" :loading="loading">
            <template #default>
              <ReSoftGauge />
            </template>
          </el-skeleton>
        </el-card>
      </el-col>
      <el-col
        :xs="24"
        :sm="24"
        :md="12"
        :lg="8"
        :xl="8"
        style="margin-bottom: 20px"
        v-motion
        :initial="{
          opacity: 0,
          y: 100
        }"
        :enter="{
          opacity: 1,
          y: 0,
          transition: {
            delay: 200
          }
        }"
      >
        <el-card>
          <template #header>
            <span style="font-size: 16px; font-weight: 500"> 待开发 </span>
          </template>
          <el-skeleton animated :rows="7" :loading="loading">
            <template #default> 待开发 </template>
          </el-skeleton>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style module scoped>
.size {
  height: 335px;
}
</style>

<style lang="scss" scoped>
.main-content {
  margin: 0 !important;
}

.welcome {
  height: 100%;

  .top-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    background: #fff;

    .left-mark {
      display: flex;
      align-items: center;

      img {
        display: block;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin-right: 10px;
        cursor: pointer;
      }

      span {
        font-size: 14px;
      }
    }
  }
}
</style>
