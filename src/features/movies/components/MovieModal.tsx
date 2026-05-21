import { Calendar, Clock, Heart, Star, TrendingUp, X } from "lucide-react";
import StarRating from "./StarRating";
import { useGetMovieByIdQuery } from "../queries/useGetMovieByIdQuery";
import { TMDB_CONFIG } from "@/config/tmdb";
import type { Movie } from "../types/movie.types";

interface MovieModalProps {
  movie: Movie;
  isFavorite?: boolean;
  onToggleFavorite: (movie: Movie) => void;
  onClose: () => void;
}

const MovieModal = ({
  movie,
  isFavorite,
  onToggleFavorite,
  onClose,
}: MovieModalProps) => {

  const { data: details, isLoading: loading } = useGetMovieByIdQuery(movie.id);

  const data = details ?? movie;

  const backdrop = data.backdrop_path
    ? `${TMDB_CONFIG.IMAGE.backdrop}${data.backdrop_path}`
    : null;
  const poster = data.poster_path
    ? `${TMDB_CONFIG.IMAGE.poster}${data.poster_path}`
    : null;
  const year = data.release_date?.split("-")[0] ?? "—";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-3xl max-h-[90vh] bg-gray-900 rounded-2xl overflow-hidden shadow-2xl border border-gray-700 flex flex-col">
        {/* Backdrop */}
        <div className="relative h-56 flex-shrink-0 bg-gray-800 overflow-hidden">
          {backdrop && (
            <img src={backdrop} alt="" className="w-full h-full object-cover" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />

          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-gray-300 hover:text-white hover:bg-black/70 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex gap-6 p-6 overflow-y-auto flex-1 -mt-20 relative">
          {/* Poster */}
          <div className="flex-shrink-0 w-32 rounded-xl overflow-hidden shadow-xl border border-gray-700 self-start">
            {poster ? (
              <img src={poster} alt={data.title} className="w-full" />
            ) : (
              <div className="aspect-[2/3] bg-gray-700 flex items-center justify-center text-gray-500">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M7 4v16M17 4v16M3 8h4m10 0h4M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
                  />
                </svg>
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <h2 className="text-white text-2xl font-bold leading-tight mb-1">
              {data.title}
            </h2>
            {details?.tagline && (
              <p className="text-gray-400 italic text-sm mb-3">
                "{details.tagline}"
              </p>
            )}

            <div className="flex flex-wrap gap-3 mb-4">
              {data.vote_average > 0 && (
                <StarRating score={data.vote_average} />
              )}
              <div className="flex items-center gap-1 text-gray-400 text-sm">
                <Calendar className="w-4 h-4" />
                <span>{year}</span>
              </div>
              {details?.runtime ? (
                <div className="flex items-center gap-1 text-gray-400 text-sm">
                  <Clock className="w-4 h-4" />
                  <span>
                    {Math.floor(details.runtime / 60)}h {details.runtime % 60}m
                  </span>
                </div>
              ) : null}
              {details?.vote_count ? (
                <div className="flex items-center gap-1 text-gray-400 text-sm">
                  <Star className="w-4 h-4" />
                  <span>{details.vote_count.toLocaleString()} votes</span>
                </div>
              ) : null}
              {details?.popularity ? (
                <div className="flex items-center gap-1 text-gray-400 text-sm">
                  <TrendingUp className="w-4 h-4" />
                  <span>{Math.round(details.popularity)}</span>
                </div>
              ) : null}
            </div>

            {details?.genres && details.genres.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {details.genres.map((g) => (
                  <span
                    key={g.id}
                    className="px-2.5 py-0.5 bg-blue-500/20 text-blue-300 text-xs rounded-full border border-blue-500/30"
                  >
                    {g.name}
                  </span>
                ))}
              </div>
            )}

            {loading && !details && (
              <div className="flex gap-2 mb-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-6 w-16 bg-gray-700 rounded-full animate-pulse"
                  />
                ))}
              </div>
            )}

            {data.overview && (
              <p className="text-gray-300 text-sm leading-relaxed mb-6">
                {data.overview}
              </p>
            )}

            <button
              onClick={() => onToggleFavorite(data)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200
                ${
                  isFavorite
                    ? "bg-red-500/20 text-red-400 border border-red-500/40 hover:bg-red-500/30"
                    : "bg-white/10 text-gray-300 border border-white/20 hover:bg-red-500/20 hover:text-red-400 hover:border-red-500/40"
                }`}
            >
              <Heart
                className={`w-4 h-4 ${isFavorite ? "fill-current" : ""}`}
              />
              {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
