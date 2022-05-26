<script lang="ts">
export default {
  name: "NumGauge"
};
</script>

<script setup lang="ts">
import { ECharts } from "echarts";
import echarts from "/@/plugins/echarts";
import { onBeforeMount, onMounted, nextTick } from "vue";
import { useEventListener, tryOnUnmounted, useTimeoutFn } from "@vueuse/core";

let echartInstance: ECharts;

const props = defineProps({
  index: {
    type: Number,
    default: 0
  }
});

function initEchartInstance() {
  const echartDom = document.querySelector(".numGauge" + props.index);
  if (!echartDom) return;
  // @ts-ignore
  echartInstance = echarts.init(echartDom);
  echartInstance.clear(); //清除旧画布 重新渲染

  echartInstance.setOption({
    tooltip: {
      trigger: "item"
    },
    axisTick: {
      show: false
    },
    series: [
      {
        name: "软件下载量",
        type: "gauge",
        min: 0,
        max: 3000 + 500,
        title: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          show: false,
          distance: 50
        },
        progress: {
          show: true,
          roundCap: true
        },
        itemStyle: {
          color: "#58D9F9",
          shadowColor: "rgba(0,138,255,0.45)",
          shadowBlur: 10,
          shadowOffsetX: 2,
          shadowOffsetY: 2
        },
        detail: {
          valueAnimation: true,
          fontSize: 40,
          offsetCenter: [0, "100%"]
        },
        data: [{ value: 3000, name: "人数" }]
      }
    ]
  });
}

onBeforeMount(() => {
  nextTick(() => {
    initEchartInstance();
  });
});

onMounted(() => {
  nextTick(() => {
    useEventListener("resize", () => {
      if (!echartInstance) return;
      useTimeoutFn(() => {
        echartInstance.resize();
      }, 180);
    });
  });
});

tryOnUnmounted(() => {
  if (!echartInstance) return;
  echartInstance.dispose();
  echartInstance = null;
});
</script>

<template>
  <div :class="'numGauge' + props.index" style="width: 100%; height: 35vh" />
</template>
