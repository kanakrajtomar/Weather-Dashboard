
import { Button } from '@/components/ui/button';
import { Clock, X } from 'lucide-react';

interface RecentSearchesProps {
  searches: string[];
  onSelectCity: (city: string) => void;
}

const RecentSearches = ({ searches, onSelectCity }: RecentSearchesProps) => {
  if (searches.length === 0) return null;

  return (
    <div className="w-full max-w-md mt-4 animate-fade-in">
      <div className="flex items-center gap-2 mb-2 text-sm text-gray-500">
        <Clock size={16} />
        <span>Recent searches</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {searches.map((search) => (
          <Button
            key={search}
            size="sm"
            variant="outline"
            className="bg-white bg-opacity-80 hover:bg-opacity-100"
            onClick={() => onSelectCity(search)}
          >
            {search}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default RecentSearches;
