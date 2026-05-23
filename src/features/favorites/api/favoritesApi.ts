import { supabase } from "@/lib/supabase";
import type { FavoriteRow } from "../types/favorite.types";
import type { Movie } from "@/features/movies/types/movie.types";
import type { FavoriteFilters } from "../hooks/useFavorites";

export const favoritesApi = {
  getFavorites: async (
    userId?: string,
    filters?: FavoriteFilters,
  ): Promise<FavoriteRow[]> => {
    if (!userId) throw new Error("userId is required");

    let query = supabase.from("favorites").select("*").eq("user_id", userId);

    // 🔎 SEARCH
    if (filters?.search) {
      query = query.ilike("title", `%${filters.search}%`);
    }

    // 📊 SORT (default: recent)
    switch (filters?.sort ?? "recent") {
      case "recent":
        query = query.order("created_at", { ascending: false });
        break;

      case "rating":
        query = query.order("vote_average", { ascending: false });
        break;

      case "title_asc":
        query = query.order("title", { ascending: true });
        break;

      case "title_desc":
        query = query.order("title", { ascending: false });
        break;

      default:
        query = query.order("created_at", { ascending: false });
    }

    const { data, error } = await query;

    if (error) throw error;

    return data ?? [];
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
