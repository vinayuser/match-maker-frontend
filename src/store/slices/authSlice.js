import { createSlice } from "@reduxjs/toolkit";
import { clearToken, getToken } from "@/utils/helpers";
import { registerUser, loginUser } from "./authThunks";

const storedUser = (() => {
  try {
    const raw = localStorage.getItem("authUser");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
})();

const initialState = {
  token: getToken(),
  isAuthenticated: Boolean(getToken()),
  user: storedUser,
  authError: null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload?.token ?? null;
      state.user = action.payload?.user ?? null;
      state.isAuthenticated = Boolean(action.payload?.token);
      state.authError = null;
      if (state.user) localStorage.setItem("authUser", JSON.stringify(state.user));
    },
    setUser: (state, action) => {
      state.user = action.payload;
      if (state.user) localStorage.setItem("authUser", JSON.stringify(state.user));
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      state.authError = null;
      clearToken();
      localStorage.removeItem("authUser");
    },
    clearAuthError: (state) => {
      state.authError = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.token = action.payload?.token ?? null;
        state.user = action.payload?.user ?? null;
        state.isAuthenticated = Boolean(action.payload?.token);
        state.authError = null;
        if (state.user) localStorage.setItem("authUser", JSON.stringify(state.user));
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.authError = action.payload || action.error?.message;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.token = action.payload?.token ?? null;
        state.user = action.payload?.user ?? null;
        state.isAuthenticated = Boolean(action.payload?.token);
        state.authError = null;
        if (state.user) localStorage.setItem("authUser", JSON.stringify(state.user));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.authError = action.payload || action.error?.message;
      });
  }
});

export const { loginSuccess, setUser, logout, clearAuthError } = authSlice.actions;
export default authSlice.reducer;
