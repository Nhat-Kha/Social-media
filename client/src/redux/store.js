import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
} from "redux";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { reducers } from "./Reducers";
import AuthReducer from "./Reducers/AuthReducer";
import PostReducer from "./Reducers/PostReducer";

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
  },
  preloadedState: persistedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware(applyMiddleware(thunk)),
});

store.subscribe(() => saveToLocalStorage(store.getState()));

export default store;