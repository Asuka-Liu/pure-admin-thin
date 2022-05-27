import { $t } from "/@/plugins/i18n";
const Layout = () => import("/@/layout/index.vue");

const userAdminRouter = {
  path: "/userAdmin",
  component: Layout,
  redirect: "/userAdmin/index",
  meta: {
    icon: "lollipop",
    title: $t("menus.userAdmin"),
    rank: 1,
    authority: ["admin"]
  },
  children: [
    {
      path: "/userAdmin/index",
      name: "userList",
      component: () => import("/@/views/userAdmin/index.vue"),
      meta: {
        title: $t("menus.userAdmin")
      }
    }
  ]
};

export default userAdminRouter;
