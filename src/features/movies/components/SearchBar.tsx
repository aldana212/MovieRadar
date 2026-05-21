import { Search, X } from "lucide-react";
import React, { useRef } from "react";
import { useSearchStore } from "../store/searchStore";

const SearchBar = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const query = useSearchStore((state) => state.query);
  const setQuery = useSearchStore((state) => state.setQuery);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
      className="relative flex items-center w-full max-w-2xl mx-auto"
    >
      <Search className="absolute left-4 w-5 h-5 text-gray-400 pointer-events-none" />
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search movies..."
        className="w-full pl-12 pr-12 py-3.5 bg-gray-800/80 text-white placeholder-gray-500 rounded-2xl border border-gray-700 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-sm backdrop-blur-sm"
      />
      {query && (
        <button
          type="button"
          onClick={() => {
            setQuery("");
            inputRef.current?.focus();
          }}
          className="absolute right-4 text-gray-500 hover:text-gray-300 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </form>
  );
};

export default SearchBar;
