export function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-2xl bg-gray-800/60 p-4 flex gap-4 items-center">
      <div className="w-12 h-12 rounded-full bg-gray-700 shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-gray-700 rounded w-1/2" />
        <div className="h-3 bg-gray-700 rounded w-1/3" />
      </div>
      <div className="h-8 w-20 bg-gray-700 rounded-xl" />
    </div>
  );
}
