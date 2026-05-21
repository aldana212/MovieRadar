import { useQuery } from "@tanstack/react-query";
import { moviesApi } from "../api/moviesApi";

export const useSearchMoviesQuery = ({
  search,
  page,
}: {
  search: string;
  page: number;
}) => {
  const fetchData = async () => {
    try {
      const response = await moviesApi.searchMovies(search, page);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const query = useQuery({
    queryKey: ["getTrending", search, page],
    queryFn: fetchData,
    enabled: !!search.trim(),
    placeholderData: (previousData) => previousData,
  });

  return {
    ...query,
  };
};
