import axios from "axios";

const api = axios.create({
  baseURL: "https://192.168.18.22:3030",
});

export default api;
