import { api, unwrapData } from "./client";

export async function fetchDiscoveryCards(params = {}) {
  const { limit = 25, minMatchPercent = 65, preferredGender = "" } = params;
  const res = await api.get("/api/v1/discovery/cards", {
    params: {
      limit,
      minMatchPercent,
      ...(preferredGender ? { preferredGender } : {})
    }
  });
  return unwrapData(res);
}

export async function sendInterestRequest(targetUserId) {
  const res = await api.post(`/api/v1/discovery/${targetUserId}/connect`);
  return unwrapData(res);
}
