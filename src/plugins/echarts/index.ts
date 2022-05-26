import * as echarts from "echarts/core";

import { PieChart, GaugeChart } from "echarts/charts";
import { SVGRenderer } from "echarts/renderers";

import {
  GridComponent,
  TitleComponent,
  LegendComponent,
  ToolboxComponent,
  TooltipComponent,
  DataZoomComponent,
  VisualMapComponent
} from "echarts/components";

const { use, registerTheme } = echarts;

use([
  PieChart,
  GaugeChart,
  SVGRenderer,
  GridComponent,
  TitleComponent,
  LegendComponent,
  ToolboxComponent,
  TooltipComponent,
  DataZoomComponent,
  VisualMapComponent
]);

// 自定义主题
import theme from "./theme.json";
registerTheme("ovilia-green", theme);

export default echarts;
