import { supabase } from "@/lib/supabase";
import type { FavoriteRow } from "../types/favorite.types";
import type { Movie } from "@/features/movies/types/movie.types";

export const favoritesApi = {
  getFavorites: async (userId?: string): Promise<FavoriteRow[]> => {
    const { data, error } = await supabase
      .from("favorites")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) throw error;

    return data;
  },

  addFavorite: async (userId?: string, movie?: Movie) => {
    const { data, error } = await supabase
      .from("favorites")
      .insert({
        user_id: userId,
        movie_id: movie?.id,
        title: movie?.title,
        poster_path: movie?.poster_path,
        release_date: movie?.release_date,
        vote_average: movie?.vote_average,
        overview: movie?.overview,
      })
      .select()
      .maybeSingle();

    if (error) throw error;

    return data;
  },

  removeFavorite: async (userId?: string, movieId?: number) => {
    const { error } = await supabase
      .from("favorites")
      .delete()
      .eq("user_id", userId)
      .eq("movie_id", movieId);

    if (error) throw error;
  },
};
