import { Trophy } from 'lucide-react';
import { WinnerTable } from '../components/WinnerTable';
import { WinnerDetailsCard } from '../components/WinnerDetailsCard';
import { SearchBar } from '../components/SearchBar';
import { useGoldenBallContext } from '../context/useGoldenBallContext';

export function GoldenBallPage() {
  const { selectedWinner, winners } = useGoldenBallContext();

  return (
    <div className="flex flex-col lg:flex-row gap-6 min-h-0">
      {/* Left column */}
      <div className="flex-1 min-w-0 flex flex-col gap-4">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Trophy size={20} className="text-amber-500" />
              <h1 className="text-xl font-bold text-gray-100">Winners Table</h1>
            </div>
            <p className="text-sm text-gray-500">{winners.length} Golden Ball winners</p>
          </div>
          <SearchBar />
        </div>

        {/* Mobile details card */}
        {selectedWinner && (
          <div className="lg:hidden">
            <WinnerDetailsCard />
          </div>
        )}

        <WinnerTable />
      </div>

      {/* Desktop side panel */}
      <div className="hidden lg:block w-80 xl:w-96 shrink-0">
        <div className="sticky top-6">
          {selectedWinner ? (
            <WinnerDetailsCard />
          ) : (
            <div className="rounded-2xl border border-gray-800 bg-gray-900/40 p-6 text-center">
              <Trophy size={32} className="text-gray-700 mx-auto mb-3" />
              <p className="text-sm text-gray-500">Select a winner to see their details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
