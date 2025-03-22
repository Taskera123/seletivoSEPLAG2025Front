import axios from "axios";

export const api = axios.create({
  baseURL: "https://abitus-api.geia.vip",
});
