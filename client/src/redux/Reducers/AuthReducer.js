import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authData: null,
  loading: false,
  error: false,
  errorMessage: null,
  updateLoading: false,
};

const authReducer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    authSuccess: (state, action) => {
      console.log({ state, action });
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
      state.authData = action.payload;
      state.loading = false;
      state.error = true;
    },
    authFail: (state, action) => {
      console.log({ state, action });
      state.loading = false;
      state.error = true;
      state.errorMessage = action.payload;
    },
    logOut: (state) => {
      localStorage.clear();
      state.loading = false;
      state.error = false;
      state.errorMessage = false;
      state.authData = null;
      state.updateLoading = false;
    },
    updateStart: (state) => {
      state.updateLoading = true;
      state.error = false;
    },
    updateSuccess: (state, action) => {
      localStorage.setItem("profile", JSON.stringify({ ...action?.payload }));
      state.authData = action.payload;
      state.updateLoading = false;
      state.error = false;
    },
    updateFail: (state) => {
      state.updateLoading = false;
      state.error = true;
    },
  },
});

export const {
  authStart,
  authSuccess,
  authFail,
  logOut,
  updateStart,
  updateSuccess,
  updateFail,
} = authReducer.actions;
export default authReducer.reducer;
