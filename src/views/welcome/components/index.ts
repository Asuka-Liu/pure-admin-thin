import reSizePie from "./SizePie.vue";
import rePeopleGauge from "./PeopleGauge.vue";
import reNumGauge from "./NumGauge.vue";
import { App } from "vue";

const ReSizePie = Object.assign(reSizePie, {
  install(app: App) {
    app.component(reSizePie.name, reSizePie);
  }
});
const RePeopleGauge = Object.assign(rePeopleGauge, {
  install(app: App) {
    app.component(rePeopleGauge.name, rePeopleGauge);
  }
});
const ReNumGauge = Object.assign(reNumGauge, {
  install(app: App) {
    app.component(reNumGauge.name, reNumGauge);
  }
});

export { ReSizePie, RePeopleGauge, ReNumGauge };
