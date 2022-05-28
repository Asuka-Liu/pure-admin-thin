<script lang="ts">
export default {
  name: "SoftGauge"
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

//Todo 可以抽离出来 采用api获取
const softData = [
  {
    value: 500,
    name: "软件文件",
    title: {
      offsetCenter: ["-130%", "-100%"]
    },
    detail: {
      valueAnimation: true,
      offsetCenter: ["-130%", "-70%"]
    }
  },
  {
    value: 200,
    name: "软件组",
    title: {
      offsetCenter: ["130%", "40%"]
    },
    detail: {
      valueAnimation: true,
      offsetCenter: ["130%", "70%"]
    }
  }
];

function initEchartInstance() {
  const echartDom = document.querySelector(".softGauge" + props.index);
  if (!echartDom) return;
  // @ts-ignore
  echartInstance = echarts.init(echartDom);
  echartInstance.clear(); //清除旧画布 重新渲染

  echartInstance.setOption({
    tooltip: {
      trigger: "item"
    },
    title: {
      text: "软件",
      left: "center",
      top: "center"
    },
    series: [
      {
        type: "gauge",
        min: 0,
        max: 500 + 200, //设置最大值
        startAngle: 90,
        endAngle: -270,
        pointer: {
          show: false
        },
        progress: {
          show: true,
          overlap: false,
          roundCap: true,
          clip: false,
          itemStyle: {
            borderWidth: 1,
            borderColor: "#464646"
          }
        },
        emphasis: {
          label: {
            show: true,
            fontSize: "30",
            fontWeight: "bold"
          }
        },
        axisLine: {
          lineStyle: {
            width: 40
          }
        },
        splitLine: {
          show: false,
          distance: 0,
          length: 5
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          show: false,
          distance: 30
        },
        data: softData,
        title: {
          fontSize: 15
        },
        detail: {
          width: 50,
          height: 20,
          fontSize: 15,
          color: "auto",
          borderColor: "auto",
          borderRadius: 20,
          borderWidth: 1
        }
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
  <div :class="'softGauge' + props.index" style="width: 100%; height: 35vh" />
</template>
