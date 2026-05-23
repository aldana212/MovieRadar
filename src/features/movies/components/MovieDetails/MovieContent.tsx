import { useState } from "react";
import type { MovieDetails } from "../../types/MovieDetails.types";
import {
  Banknote,
  ChevronLeft,
  ChevronRight,
  CircleCheckBig,
  Flame,
  Globe,
  ShieldUser,
  TrendingUp,
  Users,
} from "lucide-react";
import { formatMoney, formatPopularity } from "../../utils/movieFormatters";

interface MovieContentProps {
  details: MovieDetails;
  loading: boolean;
}

const visibleCards = 5;

const MovieContent = ({ details }: MovieContentProps) => {

      const [startIndex, setStartIndex] = useState(0);
      const [count, setCount] = useState(visibleCards);

  const directors = details?.credits.crew.filter(
    (person) => person.job === "Director",
  )[0];

  const trailer = details?.videos.results.find(
    (video) => video.type === "Trailer" && video.site === "YouTube",
  );

  const cast = details?.credits.cast ?? [];

  const next = () => {
    if (count < cast?.length) {
      setStartIndex(startIndex + 1);
      setCount(count + visibleCards);
    }
  };
  const prev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  return (
    <div className="w-full flex items-start gap-[48px]">
      <div className="w-[752px] flex flex-col gap-[48px]">
        <div className="flex flex-col gap-[12px]">
          <h3 className="text-[16px] leading-[24px] text-[#00DBE7]">
            Sinopsis
          </h3>
          <p className="text-[16px] leading-[26px] text-[#C2C6D8]">
            {details?.overview}
          </p>
        </div>

        <div className="w-[752px] h-[400px] rounded-[8px] overflow-hidden">
          {trailer ? (
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${trailer.key}`}
              title={trailer.name}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-[#0F172A] text-gray-400">
              Trailer no disponible
            </div>
          )}
        </div>

        <div className="flex flex-col gap-[12px]">
          <div className="w-full h-[68px] flex justify-between items-center">
            <h3 className="text-[16px] leading-[24px] text-[#00DBE7]">
              Reparto Principal
            </h3>
            <div className="max-w-max flex items-center gap-[8px]">
              <button
                className="w-[40px] h-[40px] flex justify-center items-center bg-transparent p-3 border border-alizarin-crimson-800 rounded-full shadow-lg hover:scale-110 transition duration-300 cursor-pointer"
                onClick={prev}
              >
                <ChevronLeft />
              </button>
              <button
                className="w-[40px] h-[40px] flex justify-center items-center bg-transparent p-3 border border-alizarin-crimson-800 rounded-full  shadow-lg hover:scale-110 transition duration-300 cursor-pointer"
                onClick={next}
              >
                <ChevronRight />
              </button>
            </div>
          </div>

          <div className="w-full h-auto overflow-hidden">
            <div
              className="relative w-full h-auto flex items-center gap-[24px]  transition-transform duration-500"
              style={{
                transform: `translateX(-${startIndex * 760}px)`,
              }}
            >
              {cast.map((actor) => {
                return (
                  <div
                    key={actor.id}
                    className={`w-full flex flex-col items-center text-center transition-all duration-300`}
                  >
                    <img
                      src={
                        actor.profile_path
                          ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                          : "/placeholder-avatar.png"
                      }
                      alt={actor.name}
                      className="
                          min-w-[128px]
                          h-[128px]
                          rounded-full
                          object-cover
                          border
                        border-[#1E293B]
                        "
                    />

                    <h3 className="mt-2 text-sm font-medium text-white">
                      {actor.name}
                    </h3>

                    <p className="text-xs text-gray-400 line-clamp-2">
                      {actor.character}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="w-[352px] h-auto p-[24px] bg-[#FFFFFF]/2 flex flex-col gap-[24px] rounded-[8px]">
        <h3 className="text-[16px] text-[#00F1FE] leading-[24px]">
          Estadísticas
        </h3>
        <div className="flex flex-col gap-[16px]">
          <div className="flex items-center gap-[16px]">
            <div className="w-[40px] h-[40px] bg-[#323539] flex justify-center items-center rounded-[8px]">
              <ShieldUser />
            </div>
            <div className="flex flex-col">
              <h4 className="text-[16px] text-[#C2C6D8] leading-[20px]">
                Director
              </h4>
              <span className="text-[16px] text-[#E1E2E7] leading-[20px]">
                {directors?.name ?? ""}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-[16px]">
            <div className="w-[40px] h-[40px] bg-[#323539] flex justify-center items-center rounded-[8px]">
              <Banknote />
            </div>
            <div className="flex flex-col">
              <h4 className="text-[16px] text-[#C2C6D8] leading-[20px]">
                Presupuesto
              </h4>
              <span className="text-[16px] text-[#E1E2E7] leading-[20px]">
                {formatMoney(details?.budget ?? 0)}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-[16px]">
            <div className="w-[40px] h-[40px] bg-[#323539] flex justify-center items-center rounded-[8px]">
              <TrendingUp />
            </div>
            <div className="flex flex-col">
              <h4 className="text-[16px] text-[#C2C6D8] leading-[20px]">
                Recaudación
              </h4>
              <span className="text-[16px] text-[#E1E2E7] leading-[20px]">
                {formatMoney(details?.revenue ?? 0)}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-[16px]">
            <div className="w-[40px] h-[40px] bg-[#323539] flex justify-center items-center rounded-[8px]">
              <Globe />
            </div>
            <div className="flex flex-col">
              <h4 className="text-[16px] text-[#C2C6D8] leading-[20px]">
                Idioma original
              </h4>
              <span className="text-[16px] text-[#E1E2E7] leading-[20px]">
                {details?.original_language}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-[16px]">
            <div className="w-[40px] h-[40px] bg-[#323539] flex justify-center items-center rounded-[8px]">
              <CircleCheckBig />
            </div>
            <div className="flex flex-col">
              <h4 className="text-[16px] text-[#C2C6D8] leading-[20px]">
                Estado
              </h4>
              <span className="text-[16px] text-[#E1E2E7] leading-[20px]">
                {details?.status}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-[16px]">
            <div className="w-[40px] h-[40px] bg-[#323539] flex justify-center items-center rounded-[8px]">
              <Flame />
            </div>
            <div className="flex flex-col">
              <h4 className="text-[16px] text-[#C2C6D8] leading-[20px]">
                Popularidad
              </h4>
              <span className="text-[16px] text-[#E1E2E7] leading-[20px]">
                {formatPopularity(details?.popularity ?? 0)}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-[16px]">
            <div className="w-[40px] h-[40px] bg-[#323539] flex justify-center items-center rounded-[8px]">
              <Users />
            </div>
            <div className="flex flex-col">
              <h4 className="text-[16px] text-[#C2C6D8] leading-[20px]">
                Votos
              </h4>
              <span className="text-[16px] text-[#E1E2E7] leading-[20px]">
                {details?.vote_count}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieContent;
