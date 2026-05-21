import MovieCard from "./MovieCard";
import type { Movie } from "../types/movie.types";
import { useFavorites } from "@/features/favorites/hooks/useFavorites";
import MoviePagination from "./MoviePagination";

interface MovieGridProps {
  displayMovies: Movie[];
  loading: boolean;
  onToggleFavorite: (movie: Movie) => void;
  onClick: (movie: Movie) => void;

  showPagination: boolean;
  page: number;
  totalPages?: number;
  onPageChange: (page: number) => void;
}

const MovieGrid = ({
  loading,
  displayMovies,
  onToggleFavorite,
  onClick,

  showPagination,
  page,
  totalPages,
  onPageChange,
}: MovieGridProps) => {
  const { isFavorite } = useFavorites();

  return (
    <>
      {/* Movie grid */}
      {!loading && displayMovies?.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {displayMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              isFavorite={isFavorite(movie.id)}
              onToggleFavorite={onToggleFavorite}
              onClick={onClick}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      {showPagination && (
        <MoviePagination
          page={page}
          totalPages={totalPages ?? 0}
          handlePageChange={onPageChange}
        />
      )}
    </>
  );
};

export default MovieGrid;
