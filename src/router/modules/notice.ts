import { $t } from "/@/plugins/i18n";
const Layout = () => import("/@/layout/index.vue");

const noticeRouter = {
  path: "/notice",
  component: Layout,
  redirect: "/notice/index",
  meta: {
    icon: "bar-outlined",
    title: $t("menus.notice"),
    rank: 2
  },
  children: [
    {
      path: "/notice/index",
      name: "notice",
      component: () => import("/@/views/notice/index.vue"),
      meta: {
        title: $t("menus.notice")
      }
    }
  ]
};

export default noticeRouter;
