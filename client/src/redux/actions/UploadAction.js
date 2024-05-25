import * as UploadApi from "../../api/UploadRequest";
import {
  uploadFail,
  uploadStart,
  uploadSuccess,
} from "../Reducers/PostReducer";

export const uploadImage = (data) => async (dispatch) => {
  try {
    console.log("Image upload Action start");
    await UploadApi.uploadImage(data);
  } catch (error) {
    console.log({ error });
  }
};

export const uploadPost = (data) => async (dispatch) => {
  dispatch(uploadStart());
  try {
    const newPost = await UploadApi.uploadPost(data);
    console.log({ newPost });
    dispatch(uploadSuccess(newPost.data));
  } catch (error) {
    console.log({ error });
    dispatch(uploadFail());
  }
};
