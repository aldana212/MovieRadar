import { authApi } from "@/features/auth/api/authApi";
import { useAuthStore } from "@/features/auth/store/authStore";
import { useFavorites } from "@/features/favorites/hooks/useFavorites";
import { useSidebarStore } from "@/features/favorites/store/useSidebarStore";
import SearchBar from "@/features/movies/components/SearchBar";
import { Film, Heart, LogOut, User } from "lucide-react";

const Navbar = () => {
  const openSidebar = useSidebarStore((state) => state.openSidebar);
  const user = useAuthStore((s) => s.user);
  const { favorites = [] } = useFavorites();

  return (
    <header className="sticky top-0 z-30 bg-gray-950/90 backdrop-blur-md border-b border-gray-800/60">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-4">
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="p-1.5 bg-blue-500/20 rounded-lg border border-blue-500/30">
            <Film className="w-5 h-5 text-blue-400" />
          </div>
          <span className="font-bold text-white text-lg tracking-tight hidden sm:block">
            MovieRadar
          </span>
        </div>

        <div className="flex-1">
          <SearchBar />
        </div>

        <button
          onClick={openSidebar}
          className="relative flex items-center gap-2 px-4 py-2.5 bg-gray-800 hover:bg-gray-700 rounded-xl border border-gray-700 hover:border-gray-600 transition-all text-sm font-medium text-gray-300 hover:text-white flex-shrink-0"
        >
          <Heart
            className={`w-4 h-4 ${favorites.length > 0 ? "text-red-400 fill-current" : ""}`}
          />
          <span className="hidden sm:block">Favorites</span>
          {favorites.length > 0 && (
            <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
              {favorites.length > 99 ? "99+" : favorites.length}
            </span>
          )}
        </button>

        <div className="hidden sm:flex items-center gap-2 pl-3 border-l border-gray-700">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-800/60 rounded-lg">
            <User className="w-3.5 h-3.5 text-gray-500" />
            <span className="text-xs text-gray-400 max-w-[120px] truncate">
              {user?.email}
            </span>
          </div>
          <button
            onClick={() => authApi.logout()}
            className="p-2.5 bg-gray-800 hover:bg-gray-700 rounded-xl border border-gray-700 hover:border-gray-600 transition-all text-gray-400 hover:text-red-400"
            title="Sign out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
