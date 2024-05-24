import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authData: null,
  loading: false,
  error: false,
  errorMessage: null,
  updateLoading: false,
};

// const authReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case "AUTH_START":
//       return { ...state, loading: true, error: false };
//     case "AUTH_SUCCESS":
//       localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
//       return { ...state, authData: action.data, loading: false, error: true };
//     case "AUTH_FAIL":
//       return {
//         ...state,
//         loading: false,
//         errorMessage: action?.message,
//         error: true,
//       };
//     case "UPDATING_START":
//       return { ...state, updateLoading: true, error: false };
//     case "UPDATING_SUCCESS":
//       localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
//       return {
//         ...state,
//         authData: action.data,
//         updateLoading: false,
//         error: false,
//       };
//     case "UPDATING_FAIL":
//       return { ...state, updateLoading: false, error: true };
//     case "LOG_OUT":
//       localStorage.clear();
//       return {
//         ...state,
//         authData: null,
//         loading: false,
//         error: false,
//         updateLoading: false,
//       };

//     case "FOLLOW_USER":
//       return {
//         ...state,
//         authData: {
//           ...state.authData,
//           user: {
//             ...state.authData.user,
//             following: [...state.authData.user.following, action.data],
//           },
//         },
//       };

//     case "UNFOLLOW_USER":
//       return {
//         ...state,
//         authData: {
//           ...state.authData,
//           user: {
//             ...state.authData.user,
//             following: [
//               ...state.authData.user.following.filter(
//                 (personId) => personId !== action.data
//               ),
//             ],
//           },
//         },
//       };

//     default:
//       return state;
//   }
// };

const authReducer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authStart: (state, action) => {
      console.log({ state, action });
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
    logOut: (state, action) => {
      console.log({ state, action });
      localStorage.clear();
      state.loading = false;
      state.error = false;
      state.errorMessage = false;
      state.authData = null;
      state.updateLoading = false;
    },
  },
});

export const { authStart, authSuccess, authFail, logOut } = authReducer.actions;
export default authReducer.reducer;
