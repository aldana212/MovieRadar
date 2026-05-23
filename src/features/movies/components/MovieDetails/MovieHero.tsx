import { Calendar, Clock3, Heart, Star } from "lucide-react";
import { formatDate, formatRuntime } from "../../utils/movieFormatters";
import type { MovieDetails } from "../../types/MovieDetails.types";
import { useFavorites } from "@/features/favorites/hooks/useFavorites";
import { getBackdropUrl, getPosterUrl } from "../../utils/movieImage";

interface MovieHeroProps {
  details: MovieDetails;
  loading: boolean;
}

const MovieHero = ({ details }: MovieHeroProps) => {
  const { isFavorite } = useFavorites();

  const backdrop = getBackdropUrl(details?.backdrop_path ?? "");

  const poster = getPosterUrl(details?.poster_path ?? "");

  return (
    <div className="relative w-full min-h-[870px] px-[64px] pb-[48px] overflow-hidden  flex items-end cursor-pointer rounded-[8px]">
      {/* BACKDROP */}
      {poster ? (
        <img
          src={backdrop ?? ""}
          alt={details?.title}
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
      via-[#0A0C0E]/40
      to-transparent
    "
      />

      {/* CONTENT */}
      <div className="absolute left-[64px] bottom-[48px] z-10 flex justify-end items-end gap-[32px] w-full">
        <div className="w-[288px] min-h-[288px] rounded-[8px] pb-[48px]">
          <img
            src={poster ?? ""}
            alt={details?.title}
            className="w-full h-full object-cover object-center transition-all duration-300 group-hover:scale-[1.02] rounded-[8px]"
          />
        </div>
        <div className="w-[80%]  h-auto flex flex-col gap-[8px] ">
          <div className="flex items-center gap-[12px]">
            {details?.genres.map((item) => (
              <div
                key={item?.id}
                className="max-w-max h-[26px] flex justify-center items-center px-[12px] py-[4px] 
                  bg-gradient-to-t
                from-[#FFFFFF]/5
                via-[#FFFFFF]/0
                  border border-[#FFFFFF]/10 rounded-full"
              >
                <span className="text-[#00F1FE] text-[12px] leading-[16px] font-medium">
                  {item?.name}
                </span>
              </div>
            ))}
          </div>

          <h1 className="text-3xl md:text-[50px] font-extrabold leading-[50px]">
            {details?.title}
          </h1>

          <p className="text-sm md:text-[18px] leading-[28px] text-[#C2C6D8] max-w-2xl">
            {details?.tagline}
          </p>

          <div className="flex flex-wrap items-center gap-[24px] text-sm text-gray-300">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span>{details?.vote_average.toFixed(1)}/10</span>
            </div>

            <span>|</span>

            <div className="flex items-center gap-1">
              <Clock3 className="w-4 h-4" />
              <span>{formatRuntime(details?.runtime ?? 0)}</span>
            </div>

            <span>|</span>

            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(details?.release_date ?? "")}</span>
            </div>
          </div>

          <div className="pt-[24px]">
            <button
              //   onClick={() => handleToggleFavorite(movie)}
              className={`max-w-max flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200
                ${
                  isFavorite(details?.id ?? 0)
                    ? "bg-red-500/20 text-red-400 border border-red-500/40 hover:bg-red-500/30"
                    : "bg-white/10 text-gray-300 border border-white/20 hover:bg-red-500/20 hover:text-red-400 hover:border-red-500/40"
                }`}
            >
              <Heart
                className={`w-4 h-4 ${isFavorite(details?.id ?? 0) ? "fill-current" : ""}`}
              />
              {/* {isFavorite ? "Remove from Favorites" : "Add to Favorites"} */}
              Add to Favorites
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieHero;
