import { WAjax, localDB } from "wsm-common";
import {global} from "@/config";
import {createHashHistory} from 'history'
const history = createHashHistory()
const request = WAjax.create({
  baseURL: global.url + "/api",
});
// 设置WAjax拦截器: 响应拦截器
request.interceptors.request.use(
  function (config) {
    // 添加请求头
    // 这里的config包含每次请求的内容
    const token = localDB.get("makeFriendsToken");
    if (token) {
      // 添加headers
      config.headers.Authorization = `${token}`;
    } else {

    }
    return config;
  },
  function (err) {
    return {
      data: {
        code: 0,
        data: 0,
        info: 0,
        msg: "接口error"
      }
    }
  }
);
request.interceptors.response.use(
  function (response) {
    switch (response.data.code) {
      case 0:
        localDB.del("makeFriendsToken,info");
        history.push('/login');
        break;
      case "401":
        localDB.del("makeFriendsToken,info");
        history.push('/login');
        break;
      case "403":
        localDB.del("makeFriendsToken,info");
        history.push('/login');
        break;
      case "404":
        localDB.del("makeFriendsToken,info");
        history.push('/login');
        break;
      default:
        return response;
    }
    return response;
  },
  function (error) {
    localDB.del("makeFriendsToken,info,icon");
    history.push('/login');
    return {
      data: {
        code: 0,
        data: 0,
        info: 0,
        msg: "接口错误"
      }
    }
  }
);

export default request;
