import { authApi } from "@/features/auth/api/authApi";
import { useMovieGenresQuery } from "@/features/movies/queries/useMovieGenresQuery";
import type { Genre } from "@/features/movies/types/genre.types";
import { getGenreIcon } from "@/utils/get-genre-icon";
import { Flame, LogOut, Popcorn } from "lucide-react";

import { NavLink } from "react-router-dom";
import CustomButton from "../ui/CustomButton/CustomButton";

const mainMenu = [
  {
    id: "trending",
    label: "Trending",
    icon: Flame,
    path: "/trending",
  },
  {
    id: "popular",
    label: "Popular",
    icon: Popcorn,
    path: "/popular",
  },
  {
    id: "favorites",
    label: "Favorites",
    icon: Popcorn,
    path: "/favorites",
  },
];

const Sidebar = () => {
  const { data: genres } = useMovieGenresQuery();

  return (
    <aside
      className="
        fixed
        top-[70px]
        
        left-0
        z-50
        w-[256px]
        h-[calc(100vh-70px)]
        sm:flex hidden flex-col
        bg-[#0A0C0E]
        border-r border-t border-gray-800/60
        pt-8
        px-6
      "
    >
      <div className="flex-1 flex flex-col gap-8">
        {/* Main Menu */}
        <div className="flex flex-col gap-4">
          <h3 className="text-sm text-[#64748B] font-bold">Main Menu</h3>

          <nav className="flex flex-col gap-2">
            {mainMenu.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.id}
                  to={item.path}
                  className={({ isActive }) =>
                    `
                  relative
                    flex items-center gap-3
                    px-4 py-3 rounded-xl
                    transition-all duration-300

                    ${
                      isActive
                        ? "bg-[#3B82F6]/10 text-[#3B82F6]"
                        : "text-[#94A3B8] hover:bg-[#3B82F6]/5"
                    }
                  `
                  }
                >
                  {({ isActive }) => (
                    <>
                      {/* Raya animada */}
                      <span
                        className={`
                          absolute left-0 top-1/2
                          -translate-y-1/2
                          h-[60%] rounded-full bg-[#3B82F6]
                          transition-all duration-300 ease-out
                          ${isActive ? "w-1 opacity-100" : "w-0 opacity-0"}
                        `}
                      />
                      <Icon size={20} />
                      <span>{item.label}</span>
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Genres */}
        <div className="flex flex-col gap-4">
          <h3 className="text-sm text-[#64748B] font-bold">Genres</h3>

          <nav className="flex flex-col gap-2">
            {genres?.map((genre: Genre) => {
              const Icon = getGenreIcon(genre.id);

              return (
                <NavLink
                  key={genre.id}
                  to={`/genre/${genre.id}`}
                  className={({ isActive }) =>
                    `
                  relative
                    flex items-center gap-3
                    px-4 py-3 rounded-xl
                    transition-all duration-300

                    ${
                      isActive
                        ? "bg-[#3B82F6]/10 text-[#3B82F6]"
                        : "text-[#94A3B8] hover:bg-[#3B82F6]/5"
                    }
                  `
                  }
                >
                  {({ isActive }) => (
                    <>
                      {/* Raya animada */}
                      <span
                        className={`
                          absolute left-0 top-1/2
                          -translate-y-1/2
                          h-[60%] rounded-r-full bg-[#3B82F6]
                          transition-all duration-300 ease-out
                          ${isActive ? "w-1 opacity-100" : "w-0 opacity-0"}
                        `}
                      />
                      <Icon size={20} />
                      <span>{genre?.name}</span>
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>
      </div>

      <div className="w-full min-h-[95px] flex justify-center items-center ">
        {/* <button
          onClick={() => authApi.logout()}
          className="w-full flex items-center justify-center gap-[8px] p-2.5 bg-[#0F172A] rounded-[12px] border border-[#1E293B] transition-all text-gray-400 hover:text-red-400"
          title="Sign out"
        >
          <LogOut className="w-4 h-4" />
          <span>Cerrar Sesión</span>
        </button> */}

        <CustomButton
          variant="ghost"
          label="Cerrar Sesión"
          onClick={() => authApi.logout()}
          icon={<LogOut className="w-4 h-4" />}
        />
      </div>
    </aside>
  );
};

export default Sidebar;
