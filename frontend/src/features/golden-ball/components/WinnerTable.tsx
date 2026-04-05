import { useMemo } from 'react';
import { AlertCircle } from 'lucide-react';
import { useWinnerTable } from '../hooks/useWinnerTable';
import { useGoldenBallContext } from '../context/useGoldenBallContext';
import { WinnerRowCard } from './WinnerRowCard';
import { EmptyState } from '@/shared/components/ui/EmptyState';
import { SkeletonCard } from '@/shared/components/ui/SkeletonCard';

const SKELETON_COUNT = 5;

export function WinnerTable() {
  const { isLoading, error } = useGoldenBallContext();
  const { filteredWinners, selectedWinner, selectWinner } = useWinnerTable();

  const rows = useMemo(
    () =>
      filteredWinners.map((winner) => (
        <WinnerRowCard
          key={winner.id}
          winner={winner}
          isSelected={selectedWinner?.id === winner.id}
          onSelect={selectWinner}
        />
      )),
    [filteredWinners, selectedWinner, selectWinner]
  );

  if (isLoading) {
    return (
      <section aria-label="Loading winners" className="flex flex-col gap-3">
        {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </section>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-red-400 gap-3">
        <AlertCircle size={36} className="opacity-60" />
        <p className="text-sm">{error}</p>
      </div>
    );
  }

  if (!filteredWinners.length) {
    return <EmptyState message="No winners found. Try a different search." />;
  }

  return (
    <section aria-label="Golden Ball Winners" className="flex flex-col gap-3">
      {rows}
    </section>
  );
}
