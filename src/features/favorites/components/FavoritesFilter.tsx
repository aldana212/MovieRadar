import CustomInput from "@/components/ui/CustomInput/CustomInput";
import CustomSelect, {
  type SelectOption,
} from "@/components/ui/CustomSelect/CustomSelect";
import { Search } from "lucide-react";

type Props = {
  search: string;
  setSearch: (value: string) => void;
  sort: SelectOption | null;
  setSort: (value: SelectOption | null) => void;
};

const favoriteSortOptions = [
  { value: "recent", label: "Agregados recientemente" },
  { value: "rating", label: "Mejor valorados" },
  { value: "title_asc", label: "Título (A-Z)" },
  { value: "title_desc", label: "Título (Z-A)" },
];

const FavoritesFilter = ({ search, setSearch, sort, setSort }: Props) => {
  return (
    <div className="w-full flex items-center justify-between">
      <div className="relative flex items-center w-[384px] max-w-2xl">
        <CustomInput
          type="search"
          placeholder="Search movies..."
          icon={
            <Search className="w-5 h-5 text-[#475569] pointer-events-none" />
          }
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          classNameInput="bg-transparent border border-[#1E293B]"
        />
      </div>
      <div className="flex items-center gap-[12px]">
        <h3>Ordenar por:</h3>
        <div className="w-[200px] flex flex-col gap-[8px]">
          <CustomSelect
            options={favoriteSortOptions}
            value={sort}
            onChange={setSort}
            placeholder="Ordenar"
          />
        </div>
      </div>
    </div>
  );
};

export default FavoritesFilter;
