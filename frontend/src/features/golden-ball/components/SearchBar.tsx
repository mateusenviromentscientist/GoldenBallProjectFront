import { Search, X } from 'lucide-react';
import { useGoldenBallContext } from '../context/useGoldenBallContext';

export function SearchBar() {
  const { searchTerm, setSearchTerm } = useGoldenBallContext();

  return (
    <div className="relative w-full max-w-md">
      <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search by name, country, or year..."
        className="w-full rounded-xl bg-gray-800/60 border border-gray-700 pl-9 pr-9 py-2 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all"
        aria-label="Search winners"
      />
      {searchTerm && (
        <button
          onClick={() => setSearchTerm('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
          aria-label="Clear search"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
}
