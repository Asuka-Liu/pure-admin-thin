<script lang="ts">
export default {
  name: "ReCard"
};
</script>

<script setup lang="ts">
import { computed, PropType } from "vue";


export interface CardSoftType {
  // isSetup: boolean;
  groupName: string;
  iconSrc: string;
  mdSrc: string;
}

const props = defineProps({
  software: {
    type: Object as PropType<CardSoftType>
  }
});

const emit = defineEmits(["manage-product", "delete-item"]);

const handleClickManage = (softGroup: CardSoftType) => {
  emit("manage-product", softGroup);
};

const handleClickDelete = (product: CardSoftType) => {
  emit("delete-item", product);
};

const cardClass = computed(() => ["list-card-item"]);

const cardLogoClass = computed(() => ["list-card-item_detail--logo"]);
</script>

<template>
  <div :class="cardClass">
    <div class="list-card-item_detail">
      <el-row justify="space-between">
        <div :class="cardLogoClass">
          <el-image :src="software.iconSrc" />
        </div>
        <div class="list-card-item_detail--operation">
          <el-tag
            color=" #00a870"
            effect="dark"
            class="mx-1 list-card-item_detail--operation--tag"
          >
            已启用
          </el-tag>
          <el-dropdown trigger="click" max-height="2">
            <IconifyIconOffline icon="more-vertical" class="icon-more" />
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="handleClickManage(software)">
                  管理
                </el-dropdown-item>
                <el-dropdown-item @click="handleClickDelete(software)">
                  删除
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-row>
      <p class="list-card-item_detail--name">{{ software.groupName }}</p>
      <p class="list-card-item_detail--desc">{{ software.mdSrc }}</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
$text-color-disabled: rgba(0, 0, 0, 0.26);

.list-card-item {
  display: flex;
  flex-direction: column;
  margin-bottom: 12px;
  border-radius: 3px;
  overflow: hidden;
  cursor: pointer;
  color: rgba(0, 0, 0, 0.6);

  &_detail {
    flex: 1;
    background: #fff;
    padding: 24px 32px;
    min-height: 140px;

    &--logo {
      width: 56px;
      height: 56px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #e0ebff;
      font-size: 32px;
      color: #0052d9;

      &__disabled {
        color: #a1c4ff;
      }
    }

    &--operation {
      display: flex;
      height: 100%;

      &--tag {
        border: 0;
      }
    }

    .icon-more {
      font-size: 24px;
      color: rgba(36, 36, 36, 1);
    }

    &--name {
      margin: 24px 0 8px 0;
      font-size: 16px;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.9);
    }

    &--desc {
      font-size: 12px;
      line-height: 20px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      margin-bottom: 24px;
      height: 40px;
    }
  }

  &__disabled {
    color: $text-color-disabled;

    .icon-more {
      color: $text-color-disabled;
    }

    .list-card-item_detail--name {
      color: $text-color-disabled;
    }

    .list-card-item_detail--operation--tag {
      color: #bababa;
    }
  }
}
</style>
