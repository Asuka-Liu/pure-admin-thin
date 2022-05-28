import { http } from "../utils/http";

interface ResponseType extends Promise<any> {
  data?: object;
  code?: number;
  msg?: string;
}

// 获取用户管理列表
export const getUserList = (data?: object): ResponseType => {
  return http.request("get", "/getUserList", { data });
};

//删除用户
export const deleteUser = (data?: object): ResponseType => {
  return http.request("post", "/deleteUser", { data });
};

// 添加用户
export const addUser = (data?: object): ResponseType => {
  return http.request("post", "/addUser", { data });
};
