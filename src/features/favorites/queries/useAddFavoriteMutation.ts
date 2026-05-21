import { useMutation } from "@tanstack/react-query";
import { favoritesApi } from "../api/favoritesApi";
import { queryClient } from "@/lib/queryClient";
import type { Movie } from "@/features/movies/types/movie.types";
import { useAuthStore } from "@/features/auth/store/authStore";

export const useAddFavoriteMutation = () => {

   const user = useAuthStore(s => s.user);

  const mutation = useMutation({
    mutationFn: async (newTodo: Movie) => {
      const res = await favoritesApi.addFavorite(user?.id, newTodo);
      return res;
    },
    onError: (error) => {
      console.error("Error:", error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getFavorites", user?.id] });
    },
  });

  return {
    ...mutation,
  };
};
