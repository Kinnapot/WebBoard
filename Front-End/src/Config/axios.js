import axios from "axios";
import localStorageService from "../service/localStorageService";
import { notification } from "antd";

axios.defaults.baseURL = "http://localhost:8000";


//ส่ง Token ไปทุกที่ ที่เรียก axios
axios.interceptors.request.use(
  (config) => {
    if (config.url.includes("/login") || config.url.includes("/register")) {
      return config;
    }

    const token = localStorageService.getToken();

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (err) => {
    Promise.reject(err);
  }
);

//ระบบจัดการ token หมดอายุ
axios.interceptors.response.use(
  response => {
    return response;
  },
  err => {
    if(err.response && err.response.status === 401) {
      localStorageService.removeToken();
      window.location.reload();
      notification.error({
        message: "time out please to login again"
      });
      return Promise.reject(err);
    }

    return Promise.reject(err);
  }
)

export default axios;
