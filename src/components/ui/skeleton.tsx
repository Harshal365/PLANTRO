export function Skeleton({ className }: { className?: string }) {
  return (
    <div className={`skeleton ${className}`} />
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="rounded-xl border border-border overflow-hidden">
      <div className="h-72 relative">
        <div className="absolute inset-0 skeleton" />
      </div>
      <div className="p-4 space-y-3">
        <div className="flex items-center gap-1">
          <div className="h-4 w-4 skeleton rounded-full" />
          <div className="h-4 w-4 skeleton rounded-full" />
          <div className="h-4 w-4 skeleton rounded-full" />
          <div className="h-4 w-4 skeleton rounded-full" />
          <div className="h-4 w-4 skeleton rounded-full" />
          <div className="h-4 w-8 skeleton rounded" />
        </div>
        <div className="h-6 w-3/4 skeleton rounded" />
        <div className="flex items-center gap-2">
          <div className="h-6 w-16 skeleton rounded" />
          <div className="h-5 w-12 skeleton rounded" />
        </div>
      </div>
    </div>
  );
}
