import { Heart } from "lucide-react";
import StarRating from "./StarRating";
import { TMDB_CONFIG } from "@/config/tmdb";
import type { Movie } from "../types/movie.types";

interface MovieCardProps {
  movie: Movie;
  isFavorite: boolean;
  onToggleFavorite: (movie: Movie) => void;
  onClick: (movie: Movie) => void;
}

const MovieCard = ({
  movie,
  isFavorite,
  onClick,
  onToggleFavorite,
}: MovieCardProps) => {
  const year = movie.release_date?.split("-")[0] ?? "—";
  const poster = movie.poster_path
    ? `${TMDB_CONFIG.IMAGE.poster}${movie.poster_path}`
    : null;

  return (
    <div
      className="group relative bg-gray-900 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl hover:shadow-black/60 border border-gray-800 hover:border-gray-600"
      onClick={() => onClick(movie)}
    >
      <div className="aspect-[2/3] bg-gray-800 overflow-hidden">
        {poster ? (
          <img
            src={poster}
            alt={movie.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-600">
            <svg
              className="w-12 h-12"
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

      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggleFavorite(movie);
        }}
        className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm transition-all duration-200 z-10
          ${
            isFavorite
              ? "bg-red-500/90 text-white shadow-lg shadow-red-500/30"
              : "bg-black/50 text-gray-400 hover:bg-red-500/80 hover:text-white opacity-0 group-hover:opacity-100"
          }`}
      >
        <Heart className={`w-4 h-4 ${isFavorite ? "fill-current" : ""}`} />
      </button>

      <div className="p-3">
        <h3 className="text-white font-semibold text-sm leading-tight line-clamp-2 mb-1">
          {movie.title}
        </h3>
        <div className="flex items-center justify-between">
          <span className="text-gray-500 text-xs">{year}</span>
          {movie.vote_average > 0 && (
            <StarRating score={movie.vote_average} size="sm" />
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
