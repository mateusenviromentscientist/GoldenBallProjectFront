import { useState, useCallback, useMemo } from 'react';
import type { ReactNode } from 'react';
import { GoldenBallContext } from './GoldenBallContext';
import type { GoldenBallContextType } from './GoldenBallContext';
import { winners as winnersData } from '../data/winners';
import type { Winner } from '../types/winner';

type Props = { children: ReactNode };

export function GoldenBallProvider({ children }: Props) {
  const [selectedWinner, setSelectedWinner] = useState<Winner | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const selectWinner = useCallback((winner: Winner) => {
    setSelectedWinner(winner);
    setIsDetailsOpen(true);
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedWinner(null);
    setIsDetailsOpen(false);
  }, []);

  const handleSetSearchTerm = useCallback((term: string) => {
    setSearchTerm(term);
  }, []);

  const value = useMemo<GoldenBallContextType>(
    () => ({
      winners: winnersData,
      selectedWinner,
      searchTerm,
      isDetailsOpen,
      selectWinner,
      clearSelection,
      setSearchTerm: handleSetSearchTerm,
    }),
    [selectedWinner, searchTerm, isDetailsOpen, selectWinner, clearSelection, handleSetSearchTerm]
  );

  return <GoldenBallContext.Provider value={value}>{children}</GoldenBallContext.Provider>;
}
