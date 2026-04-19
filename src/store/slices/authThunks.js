import { createAsyncThunk } from "@reduxjs/toolkit";
import { setToken } from "@/utils/helpers";
import * as authApi from "@/api/auth";

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const data = await authApi.registerRequest(email, password);
      if (data?.token) setToken(data.token);
      return data;
    } catch (e) {
      const msg = e.response?.data?.message || e.message || "REGISTER_FAILED";
      return rejectWithValue(msg);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const data = await authApi.loginRequest(email, password);
      if (data?.token) setToken(data.token);
      return data;
    } catch (e) {
      const msg = e.response?.data?.message || e.message || "LOGIN_FAILED";
      return rejectWithValue({
        message: msg,
        statusCode: e.response?.status || e.response?.data?.statusCode,
        data: e.response?.data?.data || null
      });
    }
  }
);
