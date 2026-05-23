import CustomButton from "@/components/ui/CustomButton/CustomButton";
import CustomSelect, {
  type SelectOption,
} from "@/components/ui/CustomSelect/CustomSelect";
import EmptyState from "@/features/movies/components/EmptyState";
import MovieGrid from "@/features/movies/components/MovieGrid";
import MovieSkeleton from "@/features/movies/components/MovieSkeleton";
import SectionHeading from "@/features/movies/components/SectionHeading";
import { useMovieSearch } from "@/features/movies/hooks/useMovieSearch";
import { useMovieGenresQuery } from "@/features/movies/queries/useMovieGenresQuery";
import {
  usePopularMoviesByFiltersQuery,
  type Filters,
} from "@/features/movies/queries/usePopularMoviesByFiltersQuery";
import { getYearOptions } from "@/utils/getYearOptions";
import { Filter, TrendingUp } from "lucide-react";
import { useMemo, useState } from "react";

const PopularPage = () => {
  const [selectedGenre, setSelectedGenre] = useState<SelectOption | null>(null);
  const [selectedYear, setSelectedYear] = useState<SelectOption | null>(null);

  const [filters, setFilters] = useState<Filters>({
    page: 1,
    genreId: null,
    year: null,
  });

  const { query, searchMovies, loading } = useMovieSearch({ page: 1 });

  const { data: displayMovies, isLoading } =
    usePopularMoviesByFiltersQuery(filters);

  const yearOptions = getYearOptions(2000);
  const { data: genres } = useMovieGenresQuery();

  // Usa useMemo para transformar los datos de la API
  const options = useMemo(() => {
    if (!genres) return [];

    return genres.map((genre) => ({
      value: genre.id,
      label: genre.name,
    }));
  }, [genres]); // Solo se ejecuta si "genres" cambia

  const handleApplyFilters = () => {
    setFilters((prev) => ({
      ...prev,
      genreId: Number(selectedGenre?.value),
      year: Number(selectedYear?.value),
    }));
  };

  const isValid = selectedGenre !== null || selectedYear !== null;

  const data = query.trim().length > 0 ? searchMovies : displayMovies;
  const loadings = query.trim().length > 0 ? loading : isLoading;

  return (
    <div className="w-full flex flex-col flex-1 gap-[48px]">
      <div className="flex flex-col gap-[20px]">
        <SectionHeading
          title="Más Populares"
          icono={<TrendingUp className="w-7 h-7 text-blue-400" />}
          loading={loadings}
          movies={data?.results ?? []}
        />

        {query.trim().length === 0 && (
          <div className="w-full h-[128px] flex items-end gap-[24px] p-[24px] bg-[#0F172A]/80 border border-[#FFFFFF]/5 rounded-[24px]">
            <div className="w-[200px] flex flex-col gap-[8px]">
              <label
                htmlFor="Categoría"
                className="text-[16px] text-[#C2C6D8] leading-[24px]"
              >
                Categoría
              </label>
              <CustomSelect
                options={options}
                value={selectedGenre}
                onChange={setSelectedGenre}
                placeholder="Selecciona un género"
              />
            </div>
            <div className="w-[200px] flex flex-col gap-[8px]">
              <label
                htmlFor="Año"
                className="text-[16px] text-[#C2C6D8] leading-[24px]"
              >
                Año
              </label>
              <CustomSelect
                options={yearOptions}
                value={selectedYear}
                onChange={setSelectedYear}
                placeholder="Todos los años"
              />
            </div>

            <CustomButton
              disabled={!isValid}
              variant="secondary"
              label="Aplicar Filtros"
              onClick={handleApplyFilters}
              icon={<Filter size={18} />}
            />
          </div>
        )}
      </div>

      <MovieSkeleton loading={loadings} />

      <EmptyState displayMovies={data?.results ?? []} loading={loadings} />

      <MovieGrid
        displayMovies={data?.results ?? []}
        loading={loadings}
        showPagination={false}
        totalPages={0}
      />
    </div>
  );
};

export default PopularPage;
