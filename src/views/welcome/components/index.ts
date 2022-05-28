import reSizePie from "./SizePie.vue";
import rePeopleGauge from "./PeopleGauge.vue";
import reNumGauge from "./NumGauge.vue";
import reSoftGauge from "./SoftGauge.vue";
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
const ReSoftGauge = Object.assign(reSoftGauge, {
  install(app: App) {
    app.component(reSoftGauge.name, reSoftGauge);
  }
});

export { ReSizePie, RePeopleGauge, ReNumGauge, ReSoftGauge };
