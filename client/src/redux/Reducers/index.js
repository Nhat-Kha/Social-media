import { combineReducers } from "redux";

import authReducer from "./AuthReducer";
import chatReducer from "./ChatReducer";
import postReducer from "./PostReducer";

export const reducers = combineReducers({
  authReducer,
  chatReducer,
  postReducer,
});
