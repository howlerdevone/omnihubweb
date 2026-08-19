import { Skeleton } from '@/components/custom/skeleton';

export const AppCardSkeleton = () => {
  return (
    <div className="border-outline-variant/40 relative flex flex-col gap-4 overflow-hidden rounded-2xl border bg-surface-container-low p-6">
      <div className="flex items-start justify-between">
        <Skeleton className="h-14 w-14" />
        <Skeleton className="h-6 w-6" />
      </div>

      <div className="space-y-2">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>
    </div>
  );
};
