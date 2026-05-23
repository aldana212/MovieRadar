import { api } from "@/services/axios";
import type { ApiResponse } from "@/types/api.types";
import type { Movie } from "../types/movie.types";
import type { GenreListResponse } from "../types/genre.types";
import type { MovieDetails } from "../types/MovieDetails.types";

export const moviesApi = {
  getTrending: async (
    timeWindow: string,
    page = 1,
  ): Promise<ApiResponse<Movie>> => {
    const { data } = await api.get<ApiResponse<Movie>>(
      `/trending/movie/${timeWindow}?page=${page}`,
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

  getMovieDetails: async (id: number): Promise<MovieDetails> => {
    const { data } = await api.get<MovieDetails>(`/movie/${id}?append_to_response=credits,videos,similar`);

    return data;
  },

  getMovieGenres: async (language = "es-ES"): Promise<GenreListResponse> => {
    const { data } = await api.get<GenreListResponse>(
      `/genre/movie/list?language=${language}`,
    );

    return data;
  },

  getPopularMoviesByFiltersQuery: async (
    query: string,
  ): Promise<ApiResponse<Movie>> => {
    const { data } = await api.get<ApiResponse<Movie>>(
      `/discover/movie?${query}`,
    );

    return data;
  },

  getMoviesByGenre: async (query: string,): Promise<ApiResponse<Movie>> => {

    const { data } = await api.get<ApiResponse<Movie>>(
      `/discover/movie?${query}`,
    );

    return data;
  },
};
