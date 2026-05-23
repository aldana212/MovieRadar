import { Search } from "lucide-react";
import { useSearchStore } from "../store/searchStore";
import CustomInput from "@/components/ui/CustomInput/CustomInput";

const SearchBar = () => {
  const query = useSearchStore((state) => state.query);
  const setQuery = useSearchStore((state) => state.setQuery);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <CustomInput
        type="search"
        placeholder="Buscar películas..."
        icon={<Search className="w-5 h-5 text-[#475569] pointer-events-none" />}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        classNameInput="bg-transparent border border-[#1E293B]"
      />
    </div>
  );
};

export default SearchBar;
