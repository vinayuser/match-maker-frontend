import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    isLoading: false,
    alert: null
  },
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setAlert: (state, action) => {
      state.alert = action.payload;
    },
    clearAlert: (state) => {
      state.alert = null;
    }
  }
});

export const { setLoading, setAlert, clearAlert } = uiSlice.actions;
export default uiSlice.reducer;
