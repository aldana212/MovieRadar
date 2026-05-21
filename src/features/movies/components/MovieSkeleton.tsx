import React from "react";

const MovieSkeleton = ({ loading }: { loading: boolean }) => {
  return (
    <>
      {loading && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800"
            >
              <div className="aspect-[2/3] bg-gray-800 animate-pulse" />
              <div className="p-3 space-y-2">
                <div className="h-3 bg-gray-800 rounded animate-pulse w-3/4" />
                <div className="h-3 bg-gray-800 rounded animate-pulse w-1/2" />
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default MovieSkeleton;
