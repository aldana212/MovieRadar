import { useMutation } from "@tanstack/react-query";
import { favoritesApi } from "../api/favoritesApi";
import { queryClient } from "@/lib/queryClient";
import { useAuthStore } from "@/features/auth/store/authStore";

export const useRemoveFavoriteMutation = () => {

  const user = useAuthStore(s => s.user);

  const mutation = useMutation({
    mutationFn: async (movieId: number) => {
      const res = await favoritesApi.removeFavorite(user?.id, movieId);
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
