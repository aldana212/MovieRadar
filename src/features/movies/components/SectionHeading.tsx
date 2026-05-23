import { Search } from "lucide-react";
import { useSearchStore } from "../store/searchStore";
import type { Movie } from "../types/movie.types";
import type { ReactNode } from "react";
import type { FavoriteRow } from "@/features/favorites/types/favorite.types";

interface SectionHeadingProps {
  title: string;
  description?: string;
  icono: ReactNode;
  movies: Movie[] | FavoriteRow[];
  loading: boolean;
}

// title, icon, movies, loading

const SectionHeading = ({
  title,
  description,
  icono,
  movies,
  loading,
}: SectionHeadingProps) => {
  const query = useSearchStore((state) => state.query);

  return (
    <div className="flex items-center gap-3">
      {query.trim().length === 0 ? (
        <div className="flex flex-col items-start gap-[8px]">
          <div className="flex items-center gap-[12px]">
            {icono}
            <h1 className="text-[40px] leading-[40px] font-bold text-[#FFFFFF]">
              {title}
            </h1>
          </div>
          {description && <p className="max-w-[655px] text-[16px] text-[#C2C6D8] leading-[22px]">{description}</p>}
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <Search className="w-4 h-4 text-gray-500" />
          <span className="text-gray-400 text-sm">
            Results for{" "}
            <span className="text-white font-medium">"{query}"</span>
          </span>
          {!loading && (
            <span className="text-gray-600 text-sm">
              &mdash; {movies.length} movie{movies.length !== 1 ? "s" : ""}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default SectionHeading;
