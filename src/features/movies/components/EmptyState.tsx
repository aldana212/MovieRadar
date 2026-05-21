import { Loader2 } from "lucide-react";

const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <Loader2 className="w-12 h-12 text-gray-700 mb-4" />
      <p className="text-gray-400 text-lg font-medium">No results found</p>
      <p className="text-gray-600 text-sm mt-1">Try a different search term</p>
    </div>
  );
};

export default EmptyState;
