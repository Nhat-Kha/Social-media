import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: null,
  loading: false,
  error: false,
  uploading: false,
};

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
      state.posts = [newPost, ...state.posts];
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
