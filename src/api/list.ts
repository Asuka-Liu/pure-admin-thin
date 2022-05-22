import { http } from "../utils/http";

interface postType extends Promise<any> {
  data?: object;
  code?: number;
  msg?: string;
}

// 获取软件列表
export const getAllSoftGroup = (data?: object): postType => {
  return http.request("get", "/getAllSoftGroup", { data });
};
