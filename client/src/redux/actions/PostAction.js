import {
  retreivingFail,
  retreivingStart,
  retreivingSuccess,
} from "../Reducers/PostReducer";
import * as PostsApi from "../../api/PostsRequests";

export const getTimelinePosts = (id) => async (dispatch) => {
  await dispatch(retreivingStart());
  try {
    const { data } = await PostsApi.getTimelinePosts(id);
    dispatch(retreivingSuccess(data));
  } catch (error) {
    console.log({ error });
    dispatch(retreivingFail());
  }
};
