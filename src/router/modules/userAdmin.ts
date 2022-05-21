import { $t } from "/@/plugins/i18n";
const Layout = () => import("/@/layout/index.vue");

const userAdminRouter = {
  path: "/userAdmin",
  component: Layout,
  redirect: "/userAdmin/userList",
  meta: {
    icon: "lollipop",
    title: $t("menus.userAdmin"),
    rank: 1,
    authority: ["admin"]
  },
  children: [
    {
      path: "/userAdmin/userList",
      name: "userList",
      component: () => import("/@/views/userAdmin/userList.vue"),
      meta: {
        icon: "user-outlined",
        title: $t("menus.userList"),
        authority: ["admin"]
      }
    },
    {
      path: "/userAdmin/userAdd",
      name: "userAdd",
      component: () => import("/@/views/userAdmin/userAdd.vue"),
      meta: {
        icon: "user-add-outlined",
        title: $t("menus.userAdd"),
        authority: ["admin"]
      }
    }
  ]
};

export default userAdminRouter;
