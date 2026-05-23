import { useMemo } from "react";

import { useDebounce } from "./useDebounce";
import { useSearchStore } from "../store/searchStore";
import { useSearchMoviesQuery } from "../queries/useSearchMoviesQuery";

import { EMPTY_RESPONSE } from "@/constants/EMPTY_RESPONSE";

interface Props {
  page?: number;
}

export const useMovieSearch = ({ page = 1 }: Props) => {
  const query = useSearchStore((state) => state.query);

  const debouncedQuery = useDebounce(query, 500);

  const { data, isPending, isFetching } = useSearchMoviesQuery({
    search: debouncedQuery,
    page,
  });

  const loading = isPending || isFetching;

  const searchMovies = useMemo(() => data ?? EMPTY_RESPONSE, [data]);

  return {
    query,
    loading,
    searchMovies,
    isSearching: !!query,
  };
};
