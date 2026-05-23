import { useQuery } from "@tanstack/react-query";
import { moviesApi } from "../api/moviesApi";

export const useGetTrendingQuery = (timeWindow: string) => {
  const fetchData = async () => {
    try {
      const response = await moviesApi.getTrending(timeWindow);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const query = useQuery({
    queryKey: ["getTrending", timeWindow],
    queryFn: fetchData,
    enabled: !!timeWindow,
  });

  return {
    ...query,
  };
};
