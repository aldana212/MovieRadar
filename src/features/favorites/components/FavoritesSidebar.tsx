import type { FavoriteRow } from "../types/favorite.types";
import type { Movie } from "@/features/movies/types/movie.types";
import StarRating from "@/features/movies/components/StarRating";
import { Heart, Trash2, X } from "lucide-react";
import { TMDB_CONFIG } from "@/config/tmdb";

interface FavoritesSidebarProps {
  isSidebarOpen: boolean;
  favorites: FavoriteRow[];
  loading: boolean;
  onRemove: (movieId: number) => void;
  onMovieClick: (movie: Movie) => void;
  onClose: () => void;
}

const FavoritesSidebar = ({
  isSidebarOpen,
  favorites,
  loading,
  onRemove,
  onMovieClick,
  onClose,
}: FavoritesSidebarProps) => {
  return (
    <div
      className={`
    fixed inset-0 z-40
    transition-all duration-300
    ${isSidebarOpen ? "visible" : "invisible"}
  `}
    >
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`
      absolute inset-0 bg-black/60 backdrop-blur-sm
      transition-opacity duration-300
      ${isSidebarOpen ? "opacity-100" : "opacity-0"}
    `}
      />

      <div
        className={`
      absolute top-0 right-0
      w-full max-w-sm h-full
      bg-gray-900 border-l border-gray-700
      shadow-2xl flex flex-col

      transform transition-all duration-500 ease-out

      ${
        isSidebarOpen
          ? "translate-x-0 opacity-100"
          : "translate-x-full opacity-0"
      }`}
      >
        <div className="flex items-center justify-between p-5 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-400 fill-current" />
            <h2 className="text-white font-semibold text-lg">Favorites</h2>
            <span className="ml-1 px-2 py-0.5 bg-red-500/20 text-red-400 text-xs rounded-full border border-red-500/30">
              {favorites.length}
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-300 transition-colors p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {loading && (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex gap-3 p-3 bg-gray-800 rounded-xl animate-pulse"
                >
                  <div
                    className="w-12 h-18 bg-gray-700 rounded-lg flex-shrink-0"
                    style={{ height: "72px" }}
                  />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-700 rounded w-3/4" />
                    <div className="h-3 bg-gray-700 rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && favorites.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center py-16">
              <Heart className="w-12 h-12 text-gray-700 mb-3" />
              <p className="text-gray-500 text-sm">No favorites yet.</p>
              <p className="text-gray-600 text-xs mt-1">
                Click the heart on any movie to save it.
              </p>
            </div>
          )}

          {favorites.map((fav) => {
            const movie: Movie = {
              id: fav.movie_id,
              title: fav.title,
              poster_path: fav.poster_path ?? null,
              backdrop_path: null,
              release_date: fav.release_date ?? "",
              vote_average: fav.vote_average ?? 0,
              overview: fav.overview ?? "",
            };
            const poster = fav.poster_path
              ? `${TMDB_CONFIG.IMAGE.poster}${fav.poster_path}`
              : null;
            const year = fav.release_date?.split("-")[0] ?? "—";

            return (
              <div
                key={fav.id}
                className="group flex gap-3 p-3 bg-gray-800/60 hover:bg-gray-800 rounded-xl transition-all cursor-pointer border border-transparent hover:border-gray-700"
                onClick={() => onMovieClick(movie)}
              >
                <div
                  className="w-12 flex-shrink-0 rounded-lg overflow-hidden bg-gray-700"
                  style={{ height: "72px" }}
                >
                  {poster ? (
                    <img
                      src={poster}
                      alt={fav.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-600">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M7 4v16M17 4v16M3 8h4m10 0h4M3 16h4m10 0h4"
                        />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-white text-sm font-medium line-clamp-2 leading-tight mb-0.5">
                    {fav.title}
                  </h4>
                  <p className="text-gray-500 text-xs mb-1">{year}</p>
                  {(fav.vote_average ?? 0) > 0 && (
                    <StarRating score={fav.vote_average!} size="sm" />
                  )}
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemove(fav.movie_id);
                  }}
                  className="self-start p-1.5 text-gray-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all rounded-lg hover:bg-red-500/10"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FavoritesSidebar;
