import { ENV } from "@/config/env";
import axios from "axios";

export const api = axios.create({
  baseURL: ENV.TMDB_BASE_URL,

  headers: {
    Authorization: `Bearer ${ENV.TMDB_TOKEN}`,
  },
});
