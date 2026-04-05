import { useState, useCallback, useMemo, useEffect } from 'react';
import type { ReactNode } from 'react';
import { GoldenBallContext } from './GoldenBallContext';
import type { GoldenBallContextType } from './GoldenBallContext';
import { fetchWinners } from '../services/winnersService';
import type { Winner } from '../types/winner';

type Props = { children: ReactNode };

export function GoldenBallProvider({ children }: Props) {
  const [winners, setWinners] = useState<Winner[]>([]);
  const [selectedWinner, setSelectedWinner] = useState<Winner | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    setIsLoading(true);
    setError(null);

    fetchWinners(controller.signal)
      .then((data) => {
        setWinners(data);
        setIsLoading(false);
      })
      .catch((err: unknown) => {
        if (err instanceof Error && err.name === 'AbortError') return;
        setError('Failed to load winners. Please try again.');
        setIsLoading(false);
      });

    return () => controller.abort();
  }, []);

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
      winners,
      selectedWinner,
      searchTerm,
      isDetailsOpen,
      isLoading,
      error,
      selectWinner,
      clearSelection,
      setSearchTerm: handleSetSearchTerm,
    }),
    [winners, selectedWinner, searchTerm, isDetailsOpen, isLoading, error, selectWinner, clearSelection, handleSetSearchTerm]
  );

  return <GoldenBallContext.Provider value={value}>{children}</GoldenBallContext.Provider>;
}
