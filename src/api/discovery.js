import { api, unwrapData } from "./client";

export async function fetchDiscoveryCards(params = {}) {
  const {
    limit = 25,
    minMatchPercent = 65,
    preferredGender = "",
    religiousLevel = "",
    lifestyle = "",
    location = "",
    minAge = 0,
    maxAge = 0
  } = params;
  const res = await api.get("/api/v1/discovery/cards", {
    params: {
      limit,
      minMatchPercent,
      ...(preferredGender ? { preferredGender } : {}),
      ...(religiousLevel ? { religiousLevel } : {}),
      ...(lifestyle ? { lifestyle } : {}),
      ...(location ? { location } : {}),
      ...(minAge ? { minAge } : {}),
      ...(maxAge ? { maxAge } : {})
    }
  });
  return unwrapData(res);
}

export async function sendInterestRequest(targetUserId) {
  const res = await api.post(`/api/v1/discovery/${targetUserId}/connect`);
  return unwrapData(res);
}

export async function markNotInterestedRequest(targetUserId) {
  const res = await api.post(`/api/v1/discovery/${targetUserId}/not-interested`);
  return unwrapData(res);
}

export async function markFavoriteRequest(targetUserId) {
  const res = await api.post(`/api/v1/discovery/${targetUserId}/favorite`);
  return unwrapData(res);
}

export async function unmarkFavoriteRequest(targetUserId) {
  const res = await api.delete(`/api/v1/discovery/${targetUserId}/favorite`);
  return unwrapData(res);
}

export async function fetchSentRequests(params = {}) {
  const { page = 1, limit = 20 } = params;
  const res = await api.get("/api/v1/discovery/sent-requests", { params: { page, limit } });
  return unwrapData(res);
}

export async function fetchFavorites(params = {}) {
  const { page = 1, limit = 20 } = params;
  const res = await api.get("/api/v1/discovery/favorites", { params: { page, limit } });
  return unwrapData(res);
}
