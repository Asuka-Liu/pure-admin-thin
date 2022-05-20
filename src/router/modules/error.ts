import { $t } from "/@/plugins/i18n";
const Layout = () => import("/@/layout/index.vue");

const errorRouter = {
  path: "/error",
  component: Layout,
  redirect: "/error/403",
  meta: {
    icon: "information-line",
    title: $t("menus.error"),
    rank: 9
  },
  children: [
    {
      path: "/error/403",
      name: "403",
      component: () => import("/@/views/error/403.vue"),
      meta: {
        title: $t("menus.fourZeroOne")
      }
    },
    {
      path: "/error/404",
      name: "404",
      component: () => import("/@/views/error/404.vue"),
      meta: {
        title: $t("menus.fourZeroFour")
      }
    },
    {
      path: "/error/500",
      name: "500",
      component: () => import("/@/views/error/500.vue"),
      meta: {
        title: $t("menus.FiveHundred")
      }
    }
  ]
};

export default errorRouter;
