import { Search, TrendingUp } from "lucide-react";
import React from "react";
import { useSearchStore } from "../store/searchStore";
import type { Movie } from "../types/movie.types";
import type { View } from "./MovieSection";

interface SectionHeadingProps {
  view: View;
  movies: Movie[];
  loading: boolean;
}

const SectionHeading = ({ view, movies, loading }: SectionHeadingProps) => {
  const query = useSearchStore((state) => state.query);

  return (
    <div className="flex items-center gap-3 mb-6">
      {view === "trending" ? (
        <>
          <TrendingUp className="w-5 h-5 text-blue-400" />
          <h1 className="text-xl font-semibold text-white">
            Trending This Week
          </h1>
        </>
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
