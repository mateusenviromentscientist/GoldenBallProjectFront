import React from 'react';
import { Target, Zap, Calendar, Globe, X, Trophy } from 'lucide-react';
import { useGoldenBallContext } from '../context/useGoldenBallContext';
import { getCountryFlag } from '../utils/countryFlags';

type StatPillProps = { icon: React.ReactNode; label: string; value: number | null };

function StatPill({ icon, label, value }: StatPillProps) {
  return (
    <div className="flex flex-col items-center gap-1 rounded-2xl bg-gray-800/60 border border-gray-700 px-4 py-3">
      <div className="text-amber-400">{icon}</div>
      <span className="text-xl font-bold text-gray-100">{value ?? 0}</span>
      <span className="text-xs text-gray-500">{label}</span>
    </div>
  );
}

export const WinnerDetailsCard = React.memo(function WinnerDetailsCard() {
  const { selectedWinner, clearSelection } = useGoldenBallContext();

  if (!selectedWinner) return null;

  const avatarFallback = `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedWinner.name ?? 'Unknown')}&background=374151&color=d1d5db&size=80`;

  return (
    <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-br from-gray-900 to-gray-800/80 p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-amber-500/5 pointer-events-none rounded-2xl" />

      <button
        onClick={clearSelection}
        className="absolute top-4 right-4 p-1.5 rounded-lg text-gray-500 hover:text-gray-300 hover:bg-gray-700/60 transition-all"
        aria-label="Close details"
      >
        <X size={16} />
      </button>

      {/* Header */}
      <div className="flex items-start gap-4 mb-6">
        <div className="relative shrink-0">
          <img
            src={selectedWinner.image ?? avatarFallback}
            alt={selectedWinner.name ?? 'Winner'}
            loading="lazy"
            className="w-20 h-20 rounded-2xl object-cover object-top border-2 border-amber-500/40"
            onError={(e) => {
              (e.target as HTMLImageElement).src = avatarFallback;
            }}
          />
          <div className="absolute -bottom-2 -right-2 w-7 h-7 rounded-xl bg-amber-500 flex items-center justify-center shadow-lg">
            <Trophy size={14} className="text-gray-900" />
          </div>
        </div>

        <div className="min-w-0 pt-1">
          <h2 className="text-lg font-bold text-amber-400 leading-tight">
            {selectedWinner.name ?? '—'}
          </h2>
          <div className="flex items-center gap-3 mt-2 flex-wrap">
            <span className="flex items-center gap-1 text-xs text-gray-400">
              <Globe size={12} />
              {getCountryFlag(selectedWinner.country)} {selectedWinner.country ?? '—'}
            </span>
            {selectedWinner.yearWinner !== null && (
              <span className="flex items-center gap-1 text-xs text-gray-400">
                <Calendar size={12} />
                {selectedWinner.yearWinner}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3">
        <StatPill icon={<Target size={18} />} label="Goals" value={selectedWinner.goals} />
        <StatPill icon={<Zap size={18} />} label="Assists" value={selectedWinner.assists} />
      </div>
    </div>
  );
});
