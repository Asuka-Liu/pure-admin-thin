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

export const deleteUser = (data?: object): ResponseType => {
  return http.request("post", "/deleteUser", { data });
};
