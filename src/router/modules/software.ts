import { $t } from "/@/plugins/i18n";
const Layout = () => import("/@/layout/index.vue");

const softwareRouter = {
  path: "/software",
  component: Layout,
  redirect: "/software/softList",
  meta: {
    icon: "appstore-filled",
    title: $t("menus.software"),
    rank: 4
  },
  children: [
    {
      path: "/software/softList",
      name: "softList",
      component: () => import("/@/views/software/softList/index.vue"),
      meta: {
        icon: "appstore-outlined",
        title: $t("menus.softwareList")
      }
    },
    {
      path: "/software/uploadSoft",
      name: "uploadSoft",
      component: () => import("/@/views/software/uploadSoft/index.vue"),
      meta: {
        icon: "appstore-add-outlined",
        title: $t("menus.softwareUpload")
      }
    }
  ]
};

export default softwareRouter;
