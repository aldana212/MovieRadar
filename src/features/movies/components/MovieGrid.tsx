import MovieCard from "./MovieCard";
import type { Movie } from "../types/movie.types";
import { useFavorites } from "@/features/favorites/hooks/useFavorites";
import MoviePagination from "./MoviePagination";
import { useNavigate } from "react-router-dom";

interface MovieGridProps {
  displayMovies: Movie[];
  loading: boolean;
  showPagination: boolean;
  page?: number;
  onPageChange?: (page: number) => void;
  totalPages?: number;
}

const MovieGrid = ({
  loading,
  displayMovies,
  page,
  onPageChange,
  totalPages = 1,
}: MovieGridProps) => {
  const { isFavorite, handleToggleFavorite } = useFavorites();

  const navigate = useNavigate();

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
              onToggleFavorite={handleToggleFavorite}
              onClick={() => navigate(`/movie/${movie?.id}`)}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
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
