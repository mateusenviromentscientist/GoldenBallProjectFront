import { createContext } from 'react';
import type { Winner } from '../types/winner';

export type GoldenBallContextType = {
  winners: Winner[];
  selectedWinner: Winner | null;
  searchTerm: string;
  isDetailsOpen: boolean;
  isLoading: boolean;
  error: string | null;
  selectWinner: (winner: Winner) => void;
  clearSelection: () => void;
  setSearchTerm: (term: string) => void;
};

export const GoldenBallContext = createContext<GoldenBallContextType | null>(null);
