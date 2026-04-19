export const getToken = () => localStorage.getItem("authToken");

export const setToken = (token) => {
  if (!token) return;
  localStorage.setItem("authToken", token);
};

export const clearToken = () => {
  localStorage.removeItem("authToken");
};
