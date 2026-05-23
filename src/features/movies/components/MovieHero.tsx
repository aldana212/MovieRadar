import type { Movie } from "../types/movie.types";
import StarRating from "./StarRating";
import { useFavorites } from "@/features/favorites/hooks/useFavorites";
import { Heart } from "lucide-react";
import { getPosterUrl } from "../utils/movieImage";

type ViewMode = "trending" | "popular";

interface MovieHeroProps {
  view: ViewMode;
  movie: Movie;
  isFavorite: boolean;
}

const MovieHero = ({ movie, isFavorite }: MovieHeroProps) => {
  const { handleToggleFavorite } = useFavorites();

  if (!movie) return null;

  const poster = getPosterUrl(movie.poster_path ?? "");

  return (
    <section className="relative w-full min-h-[614px] overflow-hidden bg-red-300 flex items-end rounded-xl group cursor-pointer">
      {/* BACKDROP */}
      {poster ? (
        <img
          src={poster}
          alt={movie.title}
          className="absolute inset-0 w-full h-full object-cover object-center transition-all duration-300 group-hover:scale-[1.02]"
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

      {/* OVERLAY */}
      <div
        className="
      absolute inset-0
      bg-gradient-to-t
      from-[#0A0C0E]
      via-[#0A0C0E]/20
      to-transparent
    "
      />

      {/* CONTENT */}
      <div className="relative z-10 flex flex-col justify-end w-full h-full transition-all duration-300 group-hover:scale-[1.02]">
        <div className="w-[80%] min-h-[420px] flex flex-col gap-[12px] p-[64px]">
          <div className="max-w-max h-[26px] flex justify-center items-center px-[12px] py-[4px] bg-[#00F1FE]/20 rounded-full">
            <span className="text-[#00F1FE] text-[12px] leading-[16px] font-medium">
              TENDENCIA DE LA SEMANA
            </span>
          </div>

          <div className="flex flex-col gap-[8px]">
            <h1 className="text-3xl md:text-[72px] font-extrabold leading-[80px]">
              {movie.title}
            </h1>

            <div className="flex items-center gap-3 text-sm text-gray-300">
              {movie.vote_average > 0 && (
                <StarRating score={movie.vote_average} size="sm" />
              )}
              <span>{movie.release_date}</span>
            </div>
          </div>

          <p className="text-sm md:text-[18px] leading-[28px] text-[#C2C6D8] max-w-2xl">
            {movie?.overview?.slice(0, 280)}...
          </p>

          <button
            onClick={() => handleToggleFavorite(movie)}
            className={`max-w-max flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200
                ${
                  isFavorite
                    ? "bg-red-500/20 text-red-400 border border-red-500/40 hover:bg-red-500/30"
                    : "bg-white/10 text-gray-300 border border-white/20 hover:bg-red-500/20 hover:text-red-400 hover:border-red-500/40"
                }`}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? "fill-current" : ""}`} />
            {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default MovieHero;
