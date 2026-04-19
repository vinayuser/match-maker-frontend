import axios from "axios";
import { STATUS_CODES } from "@/constants/statusCodes";
import { MESSAGES } from "@/constants/messages";
import { clearToken, getToken } from "@/utils/helpers";
import { logout } from "@/store/slices/authSlice";
import { store } from "@/store";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api",
  timeout: 30000
});

axiosClient.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    if (status === STATUS_CODES.UNAUTHORIZED) {
      clearToken();
      store.dispatch(logout());
      return Promise.reject(new Error(MESSAGES.SESSION_EXPIRED));
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
