import axios from "axios";
import apiList, { server } from "./apiList";

const API = axios.create({ baseURL: server });

export const getMessages = (id) => API.get(`${apiList.getMessage}${id}`);
export const addMessages = (data) => API.post(apiList.getMessage, data);
