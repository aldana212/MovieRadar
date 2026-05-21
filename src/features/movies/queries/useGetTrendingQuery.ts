import { useQuery } from "@tanstack/react-query";
import { moviesApi } from "../api/moviesApi";

export const useGetTrendingQuery = () => {
  const fetchData = async () => {
    try {
      const response = await moviesApi.getTrending();
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const query = useQuery({
    queryKey: ["getTrending"],
    queryFn: fetchData,
  });

  return {
    ...query,
  };
};
