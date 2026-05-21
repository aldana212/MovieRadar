import { useCallback } from "react";
import { useFavoritesQuery } from "../queries/useFavoritesQuery";
import { useAddFavoriteMutation } from "../queries/useAddFavoriteMutation";
import { useRemoveFavoriteMutation } from "../queries/useRemoveFavoriteMutation";

export const useFavorites = () => {

  const { data: favorites, isLoading: loading } = useFavoritesQuery();

  const { mutate: addFavorite } = useAddFavoriteMutation();
  const { mutate: removeFavorite } = useRemoveFavoriteMutation();

  const isFavorite = useCallback(
    (movieId: number): boolean => {
      return favorites?.some((f) => f.movie_id === movieId) ?? false;
    },
    [favorites],
  );

  return {
    favorites,
    loading,
    addFavorite,
    removeFavorite,
    isFavorite,
    // refetch: fetchFavorites,
  };
};
