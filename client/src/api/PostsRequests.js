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

export const getTimelinePosts = (id) =>
  API.get(`${apiList.getPost}/${id}/timeline`);
export const likePost = (id, userId) =>
  API.put(`${apiList.likePost}${id}/like`, { userId: userId });
