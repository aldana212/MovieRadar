/* eslint-disable react-hooks/set-state-in-effect */
import { useCallback, useEffect, useMemo, useState } from "react";
import type { View } from "../components/MovieSection";
import type { Movie } from "../types/movie.types";

import { useSidebarStore } from "@/features/favorites/store/useSidebarStore";
import { useSearchStore } from "../store/searchStore";
import { useDebounce } from "./useDebounce";

import { useFavorites } from "@/features/favorites/hooks/useFavorites";
import { useGetTrendingQuery } from "../queries/useGetTrendingQuery";
import { useSearchMoviesQuery } from "../queries/useSearchMoviesQuery";

import { EMPTY_RESPONSE } from "@/constants/EMPTY_RESPONSE";

export const useMoviesController = () => {
  // --------------------
  // UI State
  // --------------------
  const [view, setView] = useState<View>("trending");
  const [page, setPage] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  // --------------------
  // Global State
  // --------------------
  const { isSidebarOpen, toggleSidebar } = useSidebarStore();
  const query = useSearchStore((state) => state.query);

  // --------------------
  // Derived State
  // --------------------
  const debouncedQuery = useDebounce(query, 500);
  const isSearching = view === "search";

  // --------------------
  // Favorites
  // --------------------
  const {
    favorites,
    loading: favLoading,
    addFavorite,
    removeFavorite,
    isFavorite,
  } = useFavorites();

  // --------------------
  // Queries
  // --------------------
  const {
    data: trending,
    isLoading: isLoadingTrending,
    error,
  } = useGetTrendingQuery();

  const {
    data: searchResults,
    isFetching,
    isPending,
  } = useSearchMoviesQuery({
    search: debouncedQuery,
    page,
  });

  // --------------------
  // Effects
  // --------------------
  useEffect(() => {
    if (!query) {
      setPage(1);
      setView("trending");
      return;
    }

    setView("search");
  }, [query]);

  // --------------------
  // Handlers
  // --------------------
  const handleToggleFavorite = useCallback(
    (movie: Movie) => {
      if (isFavorite(movie.id)) {
        removeFavorite(movie.id);
      } else {
        addFavorite(movie);
      }
    },
    [isFavorite, addFavorite, removeFavorite]
  );

  const handlePageChange = useCallback((newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // --------------------
  // UI Derived Data
  // --------------------
  const loadingMovies = isPending || isFetching;

  const loading = isSearching ? loadingMovies : isLoadingTrending;

  const displayMovies = useMemo(() => {
    return isSearching
      ? searchResults ?? EMPTY_RESPONSE
      : trending ?? EMPTY_RESPONSE;
  }, [isSearching, searchResults, trending]);

  const totalPages = displayMovies?.total_pages ?? 0;

  const showPagination = isSearching && totalPages > 1;

  // --------------------
  // Return
  // --------------------
  return {
    // state
    view,
    page,
    selectedMovie,
    setSelectedMovie,

    // global
    isSidebarOpen,
    toggleSidebar,

    // data
    displayMovies,
    loading,
    favorites,
    favLoading,
    error,

    // favorites actions
    isFavorite,
    addFavorite,
    removeFavorite,

    // derived
    isSearching,
    showPagination,
    totalPages,

    // actions
    handleToggleFavorite,
    handlePageChange,
  };
};