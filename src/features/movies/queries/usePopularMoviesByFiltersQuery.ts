import { useQuery } from "@tanstack/react-query";
import { moviesApi } from "../api/moviesApi";

export type Filters = {
  page: number;
  genreId: number | null;
  year: number | null;
};

export const usePopularMoviesByFiltersQuery = (filters: Filters) => {
  const { page, genreId, year } = filters;

  const fetchData = async () => {
    try {
      const params = new URLSearchParams({
        sort_by: "popularity.desc",
        page: String(page),
      });

      if (genreId) params.append("with_genres", String(genreId));
      if (year) params.append("primary_release_year", String(year));

      const response = await moviesApi.getPopularMoviesByFiltersQuery(
        params.toString(),
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const query = useQuery({
    queryKey: ["getPopularFilters", filters.page, filters.genreId, filters.year],
    queryFn: fetchData,
    placeholderData: (previousData) => previousData,
  });

  return {
    ...query,
  };
};
