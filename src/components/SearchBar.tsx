import { useRef, KeyboardEvent } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Props 
interface SearchBarProps {
  city: string;
  setCity: (city: string) => void;
  handleSearch: (e: React.FormEvent) => void; 
  isLoading: boolean;
}

const SearchBar = ({
  city,
  setCity,
  handleSearch,
  isLoading,
}: SearchBarProps) => {
  const searchInput = useRef<HTMLInputElement>(null);

  
  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && city.trim() && !isLoading) {
      e.preventDefault();
      handleSearch(e as unknown as React.FormEvent);
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className="search-form flex w-full max-w-md gap-2 mb-4"
    >
      <div className="search-wrapper relative flex-grow">
        <Input
          ref={searchInput}
          type="text"
          value={city}
          onChange={(e) => {
           
            setCity(e.target.value);
          }}
          onKeyDown={handleKeyPress}
          placeholder="Search any city..."
          className="search-input pr-10 bg-white/80 border-gray-300 focus:border-blue-500"
          disabled={isLoading}
          aria-label="Search city"
          autoComplete="off" 
        />
        <Search
          className="search-icon absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
          size={18}
        />
      </div>
      <Button
        type="submit"
        disabled={isLoading || !city.trim()}
        className="search-button bg-blue-600 hover:bg-blue-700 text-white"
      >
        {isLoading ? "Searching..." : "Search"}
      </Button>
    </form>
  );
};

export default SearchBar;
