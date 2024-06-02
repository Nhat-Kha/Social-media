import { applyMiddleware } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import AuthReducer from "./Reducers/AuthReducer";
import PostReducer from "./Reducers/PostReducer";
import chatReducer from "./Reducers/ChatReducer";

const saveToLocalStorage = (store) => {
  try {
    const serializedStore = JSON.stringify(store);
    window.localStorage.setItem("store", serializedStore);
  } catch (error) {
    console.log(error);
  }
};

const loadFromLocalStorage = () => {
  try {
    const serializedStore = window.localStorage.getItem("store");
    if (serializedStore === null) return undefined;
    return JSON.parse(serializedStore);
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

const persistedState = loadFromLocalStorage();

const store = configureStore({
  reducer: {
    auth: AuthReducer,
    post: PostReducer,
    chat: chatReducer,
  },
  preloadedState: persistedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware(applyMiddleware(thunk)),
});

store.subscribe(() => saveToLocalStorage(store.getState()));

export default store;
