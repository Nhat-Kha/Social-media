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

export const getUser = (userId) => API.get(`${apiList.getUser}${userId}`);
export const updateUser = (id, formData) =>
  API.put(`${apiList.updateUserId}${id}`, formData);
export const getAllUser = () => API.get("/user");
export const followUser = (id, data) => API.put(`/user/${id}/follow`, data);
export const unfollowUser = (id, data) => API.put(`/user/${id}/unfollow`, data);
