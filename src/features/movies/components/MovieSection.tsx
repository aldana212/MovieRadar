/* eslint-disable react-hooks/set-state-in-effect */
import MovieGrid from "./MovieGrid";
import MovieSkeleton from "./MovieSkeleton";
import EmptyState from "./EmptyState";
import MovieModal from "./MovieModal";
import FavoritesSidebar from "@/features/favorites/components/FavoritesSidebar";
import SectionHeading from "./SectionHeading";
import { useMoviesController } from "../hooks/useMoviesController";

export type View = "search" | "trending";

const MovieSection = () => {
  const {
    view,
    page,
    selectedMovie,
    setSelectedMovie,
    isSidebarOpen,
    toggleSidebar,
    displayMovies,
    loading,
    favorites,
    favLoading,
    error,
    isFavorite,
    removeFavorite,
    showPagination,
    handlePageChange,
    handleToggleFavorite,
  } = useMoviesController();

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      {/* Section heading */}
      <SectionHeading
        view={view}
        movies={displayMovies?.results}
        loading={loading}
      />

      {/* Error */}
      {error && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">
          {error.message}
        </div>
      )}

      <MovieSkeleton loading={loading} />

      {/* Empty state */}
      {!loading && displayMovies.results.length === 0 && view === "search" && (
        <EmptyState />
      )}

      {/* Movie grid */}
      <MovieGrid
        displayMovies={displayMovies?.results}
        loading={loading}
        onToggleFavorite={handleToggleFavorite}
        onClick={setSelectedMovie}
        showPagination={showPagination}
        page={page}
        totalPages={displayMovies?.total_pages ?? 0}
        onPageChange={handlePageChange}
      />

      {/* Movie modal */}
      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          isFavorite={isFavorite(selectedMovie.id)}
          onToggleFavorite={(movie) => {
            handleToggleFavorite(movie);
          }}
          onClose={() => setSelectedMovie(null)}
        />
      )}

      {/* Favorites panel */}
      <FavoritesSidebar
        isSidebarOpen={isSidebarOpen}
        favorites={favorites ?? []}
        loading={favLoading}
        onRemove={removeFavorite}
        onMovieClick={(movie) => {
          setSelectedMovie(movie);
          toggleSidebar();
        }}
        onClose={toggleSidebar}
      />
    </main>
  );
};

export default MovieSection;
