import { useQuery } from "@tanstack/react-query";
import { moviesApi } from "../api/moviesApi";

export type Filters = {
  page: number;
  genreId: number | string;
};

export const useMoviesByGenreQuery = (filters: Filters) => {
  const { page, genreId } = filters;

  const fetchData = async () => {
    try {
      const params = new URLSearchParams({
        with_genres: String(genreId),
        sort_by: "popularity.desc",
        page: String(page),
      });

      const response = await moviesApi.getPopularMoviesByFiltersQuery(
        params.toString(),
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const query = useQuery({
    queryKey: ["genre-movies", filters.page, filters.genreId],
    queryFn: fetchData,
    placeholderData: (previousData) => previousData,
  });

  return {
    ...query,
  };
};
