// 根据角色动态生成路由
import { MockMethod } from "vite-plugin-mock";

const userAdminRouter = {
  path: "/userAdmin",
  redirect: "/userAdmin/userList",
  meta: {
    icon: "lollipop",
    title: "menus.userAdmin",
    rank: 1
  },
  children: [
    {
      path: "/userAdmin/userList",
      name: "userList",
      meta: {
        icon: "user-outlined",
        title: "menus.userList"
      }
    },
    {
      path: "/userAdmin/userAdd",
      name: "userAdd",
      meta: {
        icon: "user-add-outlined",
        title: "menus.userAdd"
      }
    }
  ]
};
const permissionRouter = {
  path: "/permission",
  redirect: "/ permission/user/index",
  meta: {
    title: "menus.permission",
    icon: "lollipop",
    rank: 1
  },
  children: [
    {
      path: "/permission/user/index",
      name: "permissionUser",
      meta: {
        title: "menus.permissionUser"
      }
    },
    {
      path: "/permission/button/index",
      name: "permissionButton",
      meta: {
        title: "menus.permissionButton",
        authority: []
      }
    }
  ]
};

// 添加不同按钮权限到/permission/button页面中
function setDifAuthority(authority, routes) {
  routes.children[1].meta.authority = [authority];
  return routes;
}

export default [
  {
    url: "/getAsyncRoutes",
    method: "get",
    response: ({ query }) => {
      if (query.name === "admin") {
        return {
          code: 0,
          info: [userAdminRouter, setDifAuthority("v-admin", permissionRouter)]
        };
      } else {
        return {
          code: 0,
          info: [setDifAuthority("v-test", permissionRouter)]
        };
      }
    }
  }
] as MockMethod[];
