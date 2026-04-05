import { SearchX } from 'lucide-react';

type EmptyStateProps = { message?: string };

export function EmptyState({ message = 'No results found' }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-gray-500">
      <SearchX size={40} className="mb-3 opacity-40" />
      <p className="text-sm">{message}</p>
    </div>
  );
}
