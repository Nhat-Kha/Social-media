import * as AuthApi from "../../api/AuthRequest";

export const logIn = (formData, navigate) => async (dispatch) => {
  dispatch({ type: "AUTH_START" });
  try {
    const { data } = await AuthApi.logIn(formData);
    dispatch({ type: "AUTH_SUCCESS", data: data });
    navigate("../home", { replace: true });
  } catch (error) {
    console.log("error: ", error.response.data.message);
    const message = error.response.data.message;
    console.log({ message });
    dispatch({ type: "AUTH_FAIL", message });
  }
};

export const signUp = (formData, navigate) => async (dispatch) => {
  dispatch({ type: "AUTH_START" });
  try {
    const { data } = await AuthApi.signUp(formData);
    dispatch({ type: "AUTH_SUCCESS", data: data });
    navigate("../home", { replace: true });
  } catch (error) {
    console.log("error: ", error.response.data.message);
    const message = error.response.data.message;
    console.log({ message });
    dispatch({ type: "AUTH_FAIL", message });
  }
};

export const logout = () => async (dispatch) => {
  dispatch({ type: "LOG_OUT" });
};
