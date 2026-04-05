import { useMemo } from 'react';
import { useGoldenBallContext } from '../context/useGoldenBallContext';
import { filterWinners } from '../utils/filters';

export function useWinnerTable() {
  const { winners, selectedWinner, searchTerm, selectWinner } = useGoldenBallContext();

  const filteredWinners = useMemo(
    () => filterWinners(winners, searchTerm),
    [winners, searchTerm]
  );

  return { filteredWinners, selectedWinner, selectWinner };
}
