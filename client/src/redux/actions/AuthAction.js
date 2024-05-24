import * as AuthApi from "../../api/AuthRequest";
import {
  authFail,
  authStart,
  authSuccess,
  logOut,
} from "../Reducers/AuthReducer";

export const logIn = (formData, navigate) => async (dispatch) => {
  dispatch(authStart());
  try {
    const { data } = await AuthApi.logIn(formData);
    dispatch(authSuccess(data));
    navigate("../home", { replace: true });
  } catch (error) {
    console.log("error: ", error.response.data.message);
    const message = error.response.data.message;
    console.log({ message });
    dispatch(authFail(message));
  }
};

export const signUp = (formData, navigate) => async (dispatch) => {
  dispatch({ type: "AUTH_START" });
  try {
    const { data } = await AuthApi.signUp(formData);
    dispatch(authSuccess(data));
    navigate("../home", { replace: true });
  } catch (error) {
    console.log("error: ", error.response.data.message);
    const message = error.response.data.message;
    console.log({ message });
    dispatch(authFail(message));
  }
};

export const logout = () => async (dispatch) => {
  dispatch(logOut());
};
