import * as UserApi from "../../api/UserRequests";
import {
  updateFail,
  updateStart,
  updateSuccess,
} from "../Reducers/AuthReducer";

export const updateUser = (id, formData) => async (dispatch) => {
  dispatch(updateStart());
  console.log("Payload sent to server:", formData);
  try {
    const { data } = await UserApi.updateUser(id, formData);
    console.log("Action ko receive hoa hy ye : ", data);
    dispatch(updateSuccess(data));
  } catch (error) {
    dispatch(updateFail());
  }
};

// export const followUser = (id, data) => async (dispatch) => {
//   dispatch({ type: "FOLLOW_USER", data: id });
//   UserApi.followUser(id, data);
// };

// export const unfollowUser = (id, data) => async (dispatch) => {
//   dispatch({ type: "UNFOLLOW_USER", data: id });
//   UserApi.unfollowUser(id, data);
// };
