import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

interface MoviePaginationProps {
  page: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
}

const MoviePagination = ({
  page,
  totalPages,
  handlePageChange,
}: MoviePaginationProps) => {
  return (
    <div className="flex items-center justify-center gap-2 mt-10">
      <button
        onClick={() => handlePageChange(page - 1)}
        disabled={page === 1}
        className="p-2 rounded-xl bg-gray-800 border border-gray-700 text-gray-400 hover:text-white hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <div className="flex gap-1">
        {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
          let p: number;
          if (totalPages <= 7) p = i + 1;
          else if (page <= 4) p = i + 1;
          else if (page >= totalPages - 3) p = totalPages - 6 + i;
          else p = page - 3 + i;

          return (
            <button
              key={p}
              onClick={() => handlePageChange(p)}
              className={`w-9 h-9 rounded-xl text-sm font-medium transition-all
                      ${
                        page === p
                          ? "bg-blue-500 text-white shadow-lg shadow-blue-500/30"
                          : "bg-gray-800 border border-gray-700 text-gray-400 hover:text-white hover:bg-gray-700"
                      }`}
            >
              {p}
            </button>
          );
        })}
      </div>

      <button
        onClick={() => handlePageChange(page + 1)}
        disabled={page === totalPages}
        className="p-2 rounded-xl bg-gray-800 border border-gray-700 text-gray-400 hover:text-white hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};

export default MoviePagination;
