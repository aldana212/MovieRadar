import { TMDB_CONFIG } from "@/config/tmdb";

export const getPosterUrl = (poster_path: string | null) => {
  if (!poster_path) return null;

  return `${TMDB_CONFIG.IMAGE.poster}${poster_path}`;
};

export const getBackdropUrl = (backdrop_path: string | null) => {
  if (!backdrop_path) return null;

  return `${TMDB_CONFIG.IMAGE.backdrop}${backdrop_path}`;
};
