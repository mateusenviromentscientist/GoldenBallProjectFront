import { useMemo } from 'react';
import { useWinnerTable } from '../hooks/useWinnerTable';
import { WinnerRowCard } from './WinnerRowCard';
import { EmptyState } from '@/shared/components/ui/EmptyState';

export function WinnerTable() {
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

  if (!filteredWinners.length) {
    return <EmptyState message="No winners found. Try a different search." />;
  }

  return (
    <section aria-label="Golden Ball Winners" className="flex flex-col gap-3">
      {rows}
    </section>
  );
}
