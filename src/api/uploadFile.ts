import { http } from "../utils/http";

interface iconType extends Promise<any> {
  groupId?: number;
  file?: object;
}
interface mdType extends Promise<any> {
  groupId?: number;
  file?: object;
}
export const uploadIconFile = (params?: object): iconType => {
  return http.request("post", "/uploadIcon", { params });
};

export const uploadMdFile = (params?: object): mdType => {
  return http.request("get", "/uploadMd", { params });
};
export const uploadSoftFile = (params?: object) => {
  return http.request("get", "/uploadSoft", { params });
};
