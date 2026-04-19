import { api, unwrapData } from "./client";

export async function registerRequest(email, password) {
  const res = await api.post("/api/v1/auth/register", { email, password });
  return unwrapData(res);
}

export async function loginRequest(email, password) {
  const res = await api.post("/api/v1/auth/login", { email, password });
  return unwrapData(res);
}

export async function meRequest() {
  const res = await api.get("/api/v1/auth/me");
  return unwrapData(res);
}
