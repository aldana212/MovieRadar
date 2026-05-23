import EmptyState from "@/features/movies/components/EmptyState";
import MovieGrid from "@/features/movies/components/MovieGrid";
import MovieSkeleton from "@/features/movies/components/MovieSkeleton";
import SectionHeading from "@/features/movies/components/SectionHeading";
import { useMovieSearch } from "@/features/movies/hooks/useMovieSearch";
import { useMoviesByGenreQuery } from "@/features/movies/queries/useMoviesByGenreQuery";
import { TrendingUp } from "lucide-react";
import { useCallback, useState } from "react";
import { useParams } from "react-router-dom";

const GenrePage = () => {
  const { id } = useParams();

  const [page, setPage] = useState<number>(1);

  const { query, searchMovies, loading } = useMovieSearch({ page });

  const handlePageChange = useCallback((newPage: number) => {
    setPage(newPage);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const { data: displayMovies, isLoading } = useMoviesByGenreQuery({
    genreId: id ?? "",
    page,
  });

  const data = query.trim().length > 0 ? searchMovies : displayMovies;
  const loadings = query.trim().length > 0 ? loading : isLoading;

  return (
    <div className="w-full flex flex-col flex-1 gap-[48px]">
      <SectionHeading
        title="Más Populares"
        icono={<TrendingUp className="w-7 h-7 text-blue-400" />}
        loading={loadings}
        movies={data?.results ?? []}
      />

      <MovieSkeleton loading={loadings} />

      <EmptyState displayMovies={data?.results ?? []} loading={loadings} />

      <MovieGrid
        displayMovies={data?.results ?? []}
        loading={loadings}
        page={page}
        onPageChange={handlePageChange}
        showPagination={true}
        totalPages={data?.total_pages}
      />
    </div>
  );
};

export default GenrePage;
