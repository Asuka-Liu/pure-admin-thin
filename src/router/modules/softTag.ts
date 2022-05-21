import { $t } from "/@/plugins/i18n";
const Layout = () => import("/@/layout/index.vue");

const tagRouter = {
  path: "/tag",
  component: Layout,
  redirect: "/tag/index",
  meta: {
    icon: "tag-outlined",
    title: $t("menus.tag"),
    rank: 3
  },
  children: [
    {
      path: "/tag/index",
      name: "tag",
      component: () => import("/@/views/softTag/index.vue"),
      meta: {
        title: $t("menus.tag")
      }
    }
  ]
};

export default tagRouter;
