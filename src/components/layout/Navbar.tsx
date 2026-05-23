import { useAuthStore } from "@/features/auth/store/authStore";
import { useFavorites } from "@/features/favorites/hooks/useFavorites";
import SearchBar from "@/features/movies/components/SearchBar";
import { Film, Heart, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);

  const { favorites = [] } = useFavorites();

  return (
    <header className="sticky top-0 z-30 bg-[#0A0C0E] backdrop-blur-md border-b border-gray-800/60">
      <div className="w-full h-[70px] px-[24px] flex items-center justify-between">
        <div className="sm:flex hidden items-center gap-[12px] flex-shrink-0">
          <div className="p-1.5 bg-blue-500/20 rounded-lg border border-blue-500/30">
            <Film className="w-5 h-5 text-blue-400" />
          </div>
          <span className="font-extrabold text-white text-[24px] tracking-tight hidden sm:block">
            MovieRadar
          </span>
        </div>

        <div className="flex-1">
          <SearchBar />
        </div>

        <div className="flex items-center gap-[16px]">
          <button
            onClick={() => navigate("/favorites")}
            className="relative flex items-center gap-2 px-2.5 py-2.5 bg-transparent hover:bg-[#0F172A] rounded-xl border border-gray-700 hover:border-gray-600 transition-all text-sm font-medium text-gray-300 hover:text-white flex-shrink-0 cursor-pointer"
          >
            <Heart
              className={`w-4 h-4 ${favorites.length > 0 ? "text-red-400 fill-current" : ""}`}
            />
            {favorites.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center font-bold">
                {favorites.length > 99 ? "99+" : favorites.length}
              </span>
            )}
          </button>

          <div className="hidden sm:flex min-w-px h-[30px] bg-gray-700" />

          <div className="min-w-[161.08px] hidden sm:flex items-center gap-[12px] px-2 py-1.5 bg-[#0F172A]/80 rounded-full">
            <div className="min-w-[32px] min-h-[32px] bg-[#0A0C0E]/50 rounded-full flex justify-center items-center">
              <User className="w-3.5 h-3.5 text-gray-500" />
            </div>
            <span className="text-xs text-gray-400 max-w-[120px] truncate">
              {user?.email}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
