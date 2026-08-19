interface SkeletonProps {
  className?: string;
}

export const Skeleton = ({ className = '' }: SkeletonProps) => {
  return <div className={`bg-on-surface-variant/10 animate-pulse rounded-md ${className}`} />;
};
