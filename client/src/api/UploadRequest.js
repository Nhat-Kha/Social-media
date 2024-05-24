import axios from "axios";
import apiList, { server } from "./apiList";

const API = axios.create({ baseURL: server });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

export const uploadImage = (data) => API.post(apiList.uploadImg, data);
export const uploadPost = (data) => API.post(apiList.uploadPost, data);
