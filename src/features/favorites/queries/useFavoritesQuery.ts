import { useQuery } from "@tanstack/react-query";
import { favoritesApi } from "../api/favoritesApi";
import { useAuthStore } from "@/features/auth/store/authStore";

export const useFavoritesQuery = () => {

   const user = useAuthStore(s => s.user);

  const fetchData = async () => {
    try {
      const response = await favoritesApi.getFavorites(user?.id);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const query = useQuery({
    queryKey: ["getFavorites", user?.id],
    queryFn: fetchData,
    enabled: !!user?.id,
  });

  return {
    ...query,
  };
};
