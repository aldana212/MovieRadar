import { useQuery } from "@tanstack/react-query";
import { favoritesApi } from "../api/favoritesApi";
import { useAuthStore } from "@/features/auth/store/authStore";
import type { FavoriteFilters } from "../hooks/useFavorites";

export const useFavoritesQuery = (filters?: FavoriteFilters) => {

   const user = useAuthStore(s => s.user);

  const fetchData = async () => {
    try {
      const response = await favoritesApi.getFavorites(user?.id, filters);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const query = useQuery({
    queryKey: ["getFavorites", user?.id, filters],
    enabled: !!user?.id,
    queryFn: fetchData,
  });

  return {
    ...query,
  };
};
