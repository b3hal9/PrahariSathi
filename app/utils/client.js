import { create } from "apisauce";

const apiClient = create({
  // baseURL: 'http://172.10.10.187:5000/api',
  baseURL: "http://192.168.254.2:5000/api",
});

export default apiClient;

export const setAuthHeader = (token) => {
  if (token) {
    apiClient.setHeader("x-auth-token", token);
  } else {
    delete apiClient.setHeader("x-auth-token");
  }
};
