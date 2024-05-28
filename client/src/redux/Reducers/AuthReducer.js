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
    followUsers: (state, action) => {
      console.log("data followUser:", action);

      const newData = action.payload;
      state.authData = {
        ...state.authData,
        user: {
          ...state.authData.user,
          following: [...state.authData.user.following, newData],
        },
      };
      console.log({ newData });
    },
    unFollowUser: (state, action) => {
      console.log("data unFollowUser:", action.payload);

      const newData = action.payload;
      state.authData = {
        ...state.authData,
        user: {
          ...state.authData.user,
          following: [
            ...state.authData.user.following.filter(
              (personId) => personId !== newData
            ),
          ],
        },
      };
      console.log({ newData });
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
  followUsers,
  unFollowUser,
} = authReducer.actions;
export default authReducer.reducer;
