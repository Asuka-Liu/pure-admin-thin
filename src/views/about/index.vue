<script lang="ts">
export default {
  name: "About"
};
</script>

<script setup lang="ts">
interface schemaItem {
  field: string;
  label: string;
}
interface peopleItem {
  name: string;
}

// eslint-disable-next-line no-undef
const { pkg, lastBuildTime } = __APP_INFO__;
const { dependencies, version } = pkg;

const schema: schemaItem[] = [];

const devPeopleList: peopleItem[] = [
  {
    name: "Asuka-liu"
  },
  {
    name: "EnergyMrZhao"
  },
  {
    name: "DukeWF"
  }
];

Object.keys(dependencies).forEach(key => {
  schema.push({ field: dependencies[key], label: key });
});
</script>

<template>
  <div>
    <el-card class="box-card mb-4" shadow="never">
      <template #header>
        <div class="card-header">
          <span class="font-medium">关于</span>
        </div>
      </template>
      <span style="font-size: 15px">
        Pure-Admin
        是一个基于Vue3、Vite2、TypeScript、Element-Plus、Vue-Route-Next
        等技术栈的管理系统
      </span>
    </el-card>

    <el-card class="box-card m-4" shadow="hover">
      <template #header>
        <div class="card-header">
          <span class="font-medium">项目信息</span>
        </div>
      </template>
      <el-descriptions :column="2" border>
        <el-descriptions-item label="版本" label-align="left" align="left">
          <el-tag>{{ version }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item
          label="最后编译时间"
          label-align="left"
          align="left"
        >
          <el-tag>{{ lastBuildTime }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="Github" label-align="left" align="left">
          <a
            href="https://github.com/xiaoxian521/vue-pure-admin"
            target="_blank"
          >
            <span style="color: var(--el-color-primary)">Github</span>
          </a>
        </el-descriptions-item>
        <el-descriptions-item label="QQ交流群" label-align="left" align="left">
          <a href="https://jq.qq.com/?_wv=1027&k=2gq8t3wl" target="_blank">
            <span style="color: var(--el-color-primary)">
              点击链接加入群聊
            </span>
          </a>
        </el-descriptions-item>
      </el-descriptions>
    </el-card>
    <el-card class="box-card m-4" shadow="hover">
      <template #header>
        <div class="card-header">
          <span class="font-medium">开发人员</span>
        </div>
      </template>
      <el-descriptions border>
        <el-descriptions-item
          :label="item.name"
          label-align="left"
          align="left"
          v-for="(item, index) in devPeopleList"
          :key="index"
        >
          <a :href="'https://github.com/' + item.name" target="_blank">
            <span style="color: var(--el-color-primary)">Github</span>
          </a>
        </el-descriptions-item>
      </el-descriptions>
    </el-card>
    <el-card class="box-card m-4" shadow="hover">
      <template #header>
        <div class="card-header">
          <span class="font-medium">环境依赖</span>
        </div>
      </template>
      <el-descriptions border>
        <el-descriptions-item
          :label="item.label"
          label-align="left"
          align="left"
          v-for="(item, index) in schema"
          :key="index"
        >
          <a
            :href="'https://www.npmjs.com/package/' + item.label"
            target="_blank"
          >
            <span style="color: var(--el-color-primary)">{{ item.field }}</span>
          </a>
        </el-descriptions-item>
      </el-descriptions>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.main-content {
  margin: 0 !important;
}
</style>
