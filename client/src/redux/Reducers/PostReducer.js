import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: null,
  loading: false,
  error: false,
  uploading: false,
};

// const postReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case "UPLOAD_START":
//       return { ...state, error: false, uploading: true };
//     case "UPLOAD_SUCCESS":
//       return {
//         ...state,
//         posts: [action.data, ...state.posts],
//         uploading: false,
//         error: false,
//       };
//     case "UPLOAD_FAIL":
//       return { ...state, uploading: false, error: true };

//     case "RETREIVING_START":
//       return { ...state, loading: true, error: false };
//     case "RETREIVING_SUCCESS":
//       return { ...state, posts: action.data, loading: false, error: false };
//     case "RETREIVING_FAIL":
//       return { ...state, loading: false, error: true };
//     default:
//       return state;
//   }
// };
const postReducer = createSlice({
  name: "post",
  initialState,
  reducers: {
    uploadStart: (state) => {
      state.error = false;
      state.uploading = true;
    },
    uploadSuccess: (state, action) => {
      const { newPost } = action.payload;
      // let newPost = [action.payload, ...state.posts];

      state.posts = [newPost, ...state.posts];
      // state.posts = newPost;
      state.uploading = false;
      state.error = false;
    },
    uploadFail: (state) => {
      state.uploading = false;
      state.error = true;
    },
    retreivingStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    retreivingSuccess: (state, action) => {
      state.posts = action.payload;
      state.loading = false;
      state.error = false;
    },
    retreivingFail: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const {
  uploadStart,
  uploadSuccess,
  uploadFail,
  retreivingStart,
  retreivingSuccess,
  retreivingFail,
} = postReducer.actions;
export default postReducer.reducer;
