import { useQuery } from "@tanstack/react-query";
import { moviesApi } from "../api/moviesApi";

export const useMovieGenresQuery = () => {
  const fetchData = async () => {
    try {
      const response = await moviesApi.getMovieGenres();
      // return response;
      return response?.genres.slice(0, 8);
    } catch (error) {
      console.log(error);
    }
  };

  const query = useQuery({
    queryKey: ["getGenres"],
    queryFn: fetchData,
    placeholderData: (previousData) => previousData,
  });

  return {
    ...query,
  };
};
