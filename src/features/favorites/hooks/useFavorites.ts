import { useCallback } from "react";
import { useFavoritesQuery } from "../queries/useFavoritesQuery";
import { useAddFavoriteMutation } from "../queries/useAddFavoriteMutation";
import { useRemoveFavoriteMutation } from "../queries/useRemoveFavoriteMutation";
import type { Movie } from "@/features/movies/types/movie.types";

export type FavoriteFilters = {
  search?: string;
  sort?: string | null;
};

export const useFavorites = (filters?: FavoriteFilters) => {
  const { data: favorites, isLoading: loading } = useFavoritesQuery(filters);

  const { mutate: addFavorite } = useAddFavoriteMutation();
  const { mutate: removeFavorite } = useRemoveFavoriteMutation();

  const isFavorite = useCallback(
    (movieId: number): boolean => {
      return favorites?.some((f) => f.movie_id === movieId) ?? false;
    },
    [favorites],
  );

  const handleToggleFavorite = useCallback(
    (movie: Movie) => {
      if (isFavorite(movie.id)) {
        removeFavorite(movie.id);
      } else {
        addFavorite(movie);
      }
    },
    [isFavorite, removeFavorite, addFavorite],
  );

  return {
    favorites,
    loading,
    addFavorite,
    removeFavorite,
    isFavorite,
    handleToggleFavorite
    // refetch: fetchFavorites,
  };
};
