import axios from "axios";
import apiList, { server } from "./apiList";

const API = axios.create({ baseURL: server });

export const createChat = (data) => API.post(apiList.createChat, data);
export const userChats = (id) => API.get(`${apiList.getChat}${id}`);
export const findChat = (firstId, secondId) =>
  API.get(`${apiList.findChat}${firstId}/${secondId}`);
