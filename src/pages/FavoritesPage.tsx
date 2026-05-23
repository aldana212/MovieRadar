import { type SelectOption } from "@/components/ui/CustomSelect/CustomSelect";
import FavoritesFilter from "@/features/favorites/components/FavoritesFilter";
import { useFavorites } from "@/features/favorites/hooks/useFavorites";
import { favoriteToMovie } from "@/features/favorites/utils/favoriteToMovie";
import EmptyState from "@/features/movies/components/EmptyState";
import MovieGrid from "@/features/movies/components/MovieGrid";
import MovieSkeleton from "@/features/movies/components/MovieSkeleton";
import SectionHeading from "@/features/movies/components/SectionHeading";
import { useDebounce } from "@/features/movies/hooks/useDebounce";
import { useMovieSearch } from "@/features/movies/hooks/useMovieSearch";
import type { Movie } from "@/features/movies/types/movie.types";
import { TrendingUp } from "lucide-react";
import { useState } from "react";

const FavoritesPage = () => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SelectOption | null>(null);

  const { query, searchMovies, loading } = useMovieSearch({ page: 1 });

  const debouncedSearch = useDebounce(search, 500);

  const { favorites, loading: favLoading } = useFavorites({
    search: debouncedSearch,
    sort: sort?.value as string,
  });

  const favoriteMovies: Movie[] = favorites?.map(favoriteToMovie) ?? [];

  const data = query.trim().length > 0 ? searchMovies.results : favoriteMovies;
  const loadings = query.trim().length > 0 ? loading : favLoading;

  return (
    <div className="w-full flex flex-col flex-1 gap-[48px]">
      <SectionHeading
        title="Más Populares"
        description="Explora las historias que más te han cautivado. Tu selección personal de cine premium, siempre disponible en MovieVerse."
        icono={<TrendingUp className="w-7 h-7 text-blue-400" />}
        loading={loadings}
        movies={data ?? []}
      />

      {query.trim().length === 0 && (
        <FavoritesFilter
          search={search}
          setSearch={setSearch}
          sort={sort}
          setSort={setSort}
        />
      )}

      <MovieSkeleton loading={loadings} />

      <EmptyState displayMovies={data ?? []} loading={loadings} />

      <MovieGrid
        displayMovies={data ?? []}
        loading={loadings}
        showPagination={false}
        totalPages={0}
      />
    </div>
  );
};

export default FavoritesPage;
