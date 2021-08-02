import {WAjax} from "wsm-common";
const request = WAjax.create({
  baseURL: "/api",
  timeout: 8000,
});
// 设置WAjax拦截器: 响应拦截器
request.interceptors.request.use(
  function (config) {
    // 添加请求头
    // 这里的config包含每次请求的内容
    const token = window.localStorage.getItem("auth_token");
    if (token) {
      // 添加headers
      config.headers.Authorization = `${token}`;
    } else {
        
    }
    return config;
  },
  function (err) {
    return Promise.reject(err);
  }
);
request.interceptors.response.use(
  function (response) {
    switch (response.data.code) {
      case "401":
        localStorage.removeItem("auth_token");
        break;
      case "403":
        localStorage.removeItem("auth_token");
        break;
      case "404":
        localStorage.removeItem("auth_token");
        break;
      case "500":
        localStorage.removeItem("auth_token");
        break;
      default:
        return response;
    }
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default request;
