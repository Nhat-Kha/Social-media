import axios from "axios";
import apiList, { server } from "./apiList";

const API = axios.create({ baseURL: server });

export const logIn = (formData) => API.post(apiList.login, formData);

export const signUp = (formdata) => API.post(apiList.signup, formdata);
