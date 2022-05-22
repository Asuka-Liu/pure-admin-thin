import { http } from "../utils/http";

export const uploadFile = (params?: object) => {
  return http.request("get", "/getAsyncRoutes", { params });
};
