import { useFavorites } from "@/features/favorites/hooks/useFavorites";
import EmptyState from "@/features/movies/components/EmptyState";
import MovieGrid from "@/features/movies/components/MovieGrid";
import MovieHero from "@/features/movies/components/MovieHero";
import MovieSkeleton from "@/features/movies/components/MovieSkeleton";
import SectionHeading from "@/features/movies/components/SectionHeading";
import TrendingFilter from "@/features/movies/components/TrendingFilter";
import { useMovieSearch } from "@/features/movies/hooks/useMovieSearch";
import { useGetTrendingQuery } from "@/features/movies/queries/useGetTrendingQuery";
import { TrendingUp } from "lucide-react";
import { useState } from "react";

const TrendingPage = () => {
  const [timeWindow, setTimeWindow] = useState<"day" | "week">("day");

  const { query, searchMovies, loading } = useMovieSearch({ page: 1 });

  const { isFavorite } = useFavorites();

  const {
    data: displayMovies,
    isLoading,
    // error,
  } = useGetTrendingQuery(timeWindow);

  const data = query.trim().length > 0 ? searchMovies : displayMovies;
  const loadings = query.trim().length > 0 ? loading : isLoading;

  const heroMovie = data?.results
    ?.slice()
    .sort((a, b) => b.vote_average - a.vote_average)[0];

  return (
    <div className="w-full flex flex-col flex-1 gap-[48px] overflow-hidden">
      {query.trim().length === 0 && heroMovie && (
        <MovieHero
          view="trending"
          movie={heroMovie}
          isFavorite={isFavorite(heroMovie?.id ?? 0)}
        />
      )}

      <div className="flex flex-col gap-[24px]">
        <div className="flex items-center justify-between">
          <SectionHeading
            title="Trending This Week"
            icono={<TrendingUp className="w-7 h-7 text-blue-400" />}
            loading={loadings}
            movies={data?.results ?? []}
          />

          {query.trim().length === 0 && (
            <TrendingFilter value={timeWindow} onChange={setTimeWindow} />
          )}
        </div>

        <MovieSkeleton loading={loadings} />

        <EmptyState displayMovies={data?.results ?? []} loading={loadings} />

        <MovieGrid
          displayMovies={data?.results ?? []}
          loading={loadings}
          showPagination={false}
        />
      </div>
    </div>
  );
};

export default TrendingPage;
