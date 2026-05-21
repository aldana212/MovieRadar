import { api } from "@/services/axios";
import type { ApiResponse } from "@/types/api.types";
import type { Movie } from "../types/movie.types";

export const moviesApi = {
  getTrending: async (page = 1): Promise<ApiResponse<Movie>> => {
    const { data } = await api.get<ApiResponse<Movie>>(
      `/trending/movie/week?page=${page}`,
    );

    return data;
  },

  searchMovies: async (
    query: string,
    page = 1,
  ): Promise<ApiResponse<Movie>> => {
    const { data } = await api.get<ApiResponse<Movie>>(`/search/movie`, {
      params: {
        query,
        page,
      },
    });

    return data;
  },

  getMovieDetails: async (id: number): Promise<Movie> => {
    const { data } = await api.get<Movie>(`/movie/${id}`);

    return data;
  },
};
