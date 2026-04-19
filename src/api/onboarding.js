import { api, unwrapData } from "./client";
import { getToken } from "@/utils/helpers";

const baseURL = import.meta.env.VITE_API_URL || "http://localhost:4000";

export async function getOnboardingRequest() {
  const res = await api.get("/api/v1/onboarding");
  return unwrapData(res);
}

export async function patchOnboardingRequest(body) {
  const res = await api.patch("/api/v1/onboarding", body);
  return unwrapData(res);
}

export async function submitOnboardingRequest() {
  const res = await api.post("/api/v1/onboarding/submit");
  return unwrapData(res);
}

/**
 * @param {File} file
 */
export async function uploadPhotoRequest(file) {
  const form = new FormData();
  form.append("photo", file);
  const token = getToken();
  const res = await fetch(`${baseURL}/api/v1/upload/photo`, {
    method: "POST",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: form
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(body.message || "UPLOAD_FAILED");
    throw err;
  }
  if (body.status === 0) {
    const err = new Error(body.message || "UPLOAD_FAILED");
    throw err;
  }
  return body.data;
}
