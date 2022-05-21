import { $t } from "/@/plugins/i18n";
const Layout = () => import("/@/layout/index.vue");

const aboutRouter = {
  path: "/about",
  component: Layout,
  redirect: "/about",
  meta: {
    icon: "question-circle-outlined",
    rank: 5
  },
  children: [
    {
      path: "/about/index",
      name: "reAbout",
      component: () => import("/@/views/about/index.vue"),
      meta: {
        title: $t("menus.about")
      }
    }
  ]
};

export default aboutRouter;
