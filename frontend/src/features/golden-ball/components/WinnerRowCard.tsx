import React, { useCallback } from 'react';
import { Target, Zap, Trophy, ChevronRight } from 'lucide-react';
import { Badge } from '@/shared/components/ui/Badge';
import { getCountryFlag } from '../utils/countryFlags';
import { resolveImageSrc } from '../utils/imageUtils';
import type { Winner } from '../types/winner';

type Props = {
  winner: Winner;
  isSelected: boolean;
  onSelect: (winner: Winner) => void;
};

export const WinnerRowCard = React.memo(function WinnerRowCard({
  winner,
  isSelected,
  onSelect,
}: Props) {
  const handleSelect = useCallback(() => {
    onSelect(winner);
  }, [winner, onSelect]);

  const avatarFallback = `https://ui-avatars.com/api/?name=${encodeURIComponent(winner.name ?? 'Unknown')}&background=374151&color=d1d5db`;
  const imageSrc = resolveImageSrc(winner.image, avatarFallback);

  return (
    <article
      className={`
        group relative rounded-2xl border p-4 transition-all duration-200 cursor-pointer
        flex items-center gap-4
        ${
          isSelected
            ? 'border-amber-500/60 bg-amber-500/10 shadow-lg shadow-amber-500/10'
            : 'border-gray-800 bg-gray-900/60 hover:border-gray-700 hover:bg-gray-800/60 hover:scale-[1.01] hover:shadow-md'
        }
      `}
      onClick={handleSelect}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleSelect()}
      aria-label={`View details for ${winner.name ?? 'this winner'}`}
      aria-pressed={isSelected}
    >
      {/* Avatar */}
      <div className="relative shrink-0">
        <img
          src={imageSrc}
          alt={winner.name ?? 'Winner'}
          loading="lazy"
          className="w-12 h-12 rounded-full object-cover object-top border-2 border-gray-700 group-hover:border-gray-600 transition-colors"
          onError={(e) => {
            (e.target as HTMLImageElement).src = avatarFallback;
          }}
        />
        {isSelected && (
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-500 flex items-center justify-center">
            <Trophy size={8} className="text-gray-900" />
          </span>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <h3
            className={`font-semibold text-sm truncate ${isSelected ? 'text-amber-400' : 'text-gray-100'}`}
          >
            {winner.name ?? '—'}
          </h3>
          {winner.yearWinner !== null && (
            <Badge variant="subtle">{winner.yearWinner}</Badge>
          )}
        </div>
        <p className="text-xs text-gray-500 mt-0.5 truncate">
          {getCountryFlag(winner.country)} {winner.country ?? '—'}
        </p>
      </div>

      {/* Stats */}
      <div className="hidden sm:flex items-center gap-3 shrink-0">
        <Badge variant={isSelected ? 'gold' : 'default'}>
          <Target size={10} />
          {winner.goals ?? 0}
        </Badge>
        <Badge variant="default">
          <Zap size={10} />
          {winner.assists ?? 0}
        </Badge>
      </div>

      {/* Action */}
      <button
        className={`
          shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-medium transition-all
          ${
            isSelected
              ? 'bg-amber-500 text-gray-900'
              : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-gray-200 group-hover:bg-gray-700'
          }
        `}
        onClick={(e) => {
          e.stopPropagation();
          handleSelect();
        }}
        aria-label={`View details for ${winner.name ?? 'this winner'}`}
      >
        <span className="hidden sm:inline">{isSelected ? 'Selected' : 'Details'}</span>
        <ChevronRight size={12} className={isSelected ? 'rotate-90' : ''} />
      </button>
    </article>
  );
});
