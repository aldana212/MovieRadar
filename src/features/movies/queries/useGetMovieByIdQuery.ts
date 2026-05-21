import { useQuery } from "@tanstack/react-query";
import { moviesApi } from "../api/moviesApi";

export const useGetMovieByIdQuery = (id: number) => {
  const fetchData = async () => {
    try {
      const response = await moviesApi.getMovieDetails(id);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const query = useQuery({
    queryKey: ["getMovieById", id],
    queryFn: fetchData,
    enabled: !!id,
  });

  return {
    ...query,
  };
};
