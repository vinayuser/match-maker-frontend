import axios from "axios";
import { getToken, clearToken } from "@/utils/helpers";

const baseURL = import.meta.env.VITE_API_URL || "http://localhost:4000";

export const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json"
  }
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      clearToken();
    }
    return Promise.reject(err);
  }
);

export function unwrapData(response) {
  const body = response?.data;
  if (body && body.status === 0) {
    const msg = body.message || "REQUEST_FAILED";
    const e = new Error(msg);
    e.data = body.data;
    throw e;
  }
  return body?.data !== undefined ? body.data : body;
}
