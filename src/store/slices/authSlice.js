import { createSlice } from "@reduxjs/toolkit";
import { getToken } from "@/utils/helpers";

const initialState = {
  token: getToken(),
  isAuthenticated: Boolean(getToken()),
  user: null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload?.token ?? null;
      state.user = action.payload?.user ?? null;
      state.isAuthenticated = Boolean(action.payload?.token);
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
    }
  }
});

export const { loginSuccess, setUser, logout } = authSlice.actions;
export default authSlice.reducer;
