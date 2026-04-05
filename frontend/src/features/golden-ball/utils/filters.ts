import type { Winner } from '../types/winner';

export function filterWinners(winners: Winner[], searchTerm: string): Winner[] {
  if (!searchTerm.trim()) return winners;
  const lower = searchTerm.toLowerCase();
  return winners.filter(
    (w) =>
      w.name?.toLowerCase().includes(lower) ||
      w.country?.toLowerCase().includes(lower) ||
      String(w.yearWinner ?? '').includes(lower)
  );
}
