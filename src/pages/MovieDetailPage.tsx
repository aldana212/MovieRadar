import { useGetMovieByIdQuery } from "@/features/movies/queries/useGetMovieByIdQuery";
import { useParams } from "react-router-dom";

import MovieHero from "@/features/movies/components/MovieDetails/MovieHero";
import MovieDetailsSkeleton from "@/features/movies/components/MovieDetails/MovieDetailsSkeleton";
import MovieContent from "@/features/movies/components/MovieDetails/MovieContent";

const MovieDetailPage = () => {

  const { movieId } = useParams();

  const { data: details, isLoading: loading } = useGetMovieByIdQuery(
    Number(movieId),
  );

  if (loading || !details) {
    return <MovieDetailsSkeleton />;
  }

  return (
    <div className="w-full h-auto flex flex-col flex-1 gap-[48px]">
      {/* Hero */}
      <MovieHero details={details} loading={loading} />

      <MovieContent details={details} loading={loading} />
    </div>
  );
};

export default MovieDetailPage;
