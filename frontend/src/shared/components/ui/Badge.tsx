import type { ReactNode } from 'react';

type BadgeProps = {
  children: ReactNode;
  variant?: 'default' | 'gold' | 'subtle';
};

export function Badge({ children, variant = 'default' }: BadgeProps) {
  const styles = {
    default: 'bg-gray-800 text-gray-200',
    gold: 'bg-amber-500/20 text-amber-400 border border-amber-500/30',
    subtle: 'bg-gray-800/60 text-gray-400',
  };
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${styles[variant]}`}
    >
      {children}
    </span>
  );
}
