import { createSlice } from "@reduxjs/toolkit";
import { getToken } from "@/utils/helpers";
import { registerUser, loginUser } from "./authThunks";

const initialState = {
  token: getToken(),
  isAuthenticated: Boolean(getToken()),
  user: null,
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
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      state.authError = null;
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
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.authError = action.payload || action.error?.message;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.token = action.payload?.token ?? null;
        state.user = action.payload?.user ?? null;
        state.isAuthenticated = Boolean(action.payload?.token);
        state.authError = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.authError = action.payload || action.error?.message;
      });
  }
});

export const { loginSuccess, setUser, logout, clearAuthError } = authSlice.actions;
export default authSlice.reducer;
