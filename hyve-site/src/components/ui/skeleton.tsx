import { cn } from '@/lib/utils'

interface SkeletonProps {
  className?: string
}

export const Skeleton = ({ className }: SkeletonProps) => {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md bg-gray-200 dark:bg-gray-800',
        className
      )}
    />
  )
}

// Common skeleton patterns
export const SkeletonCard = ({ className }: { className?: string }) => {
  return (
    <div className={cn('space-y-3', className)}>
      <Skeleton className="h-48 w-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  )
}

export const SkeletonText = ({ 
  lines = 3,
  className 
}: { 
  lines?: number
  className?: string 
}) => {
  return (
    <div className={cn('space-y-2', className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn(
            'h-4',
            i === lines - 1 ? 'w-3/4' : 'w-full'
          )}
        />
      ))}
    </div>
  )
}

export const SkeletonButton = ({ className }: { className?: string }) => {
  return <Skeleton className={cn('h-10 w-24', className)} />
}

export const SkeletonAvatar = ({ 
  size = 'md',
  className 
}: { 
  size?: 'sm' | 'md' | 'lg'
  className?: string 
}) => {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12',
  }
  
  return (
    <Skeleton 
      className={cn(
        'rounded-full',
        sizeClasses[size],
        className
      )} 
    />
  )
}

// Industry card skeleton for your specific use case
export const IndustryCardSkeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <Skeleton className="h-48 w-full" />
      <div className="p-6 space-y-3">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
        <div className="pt-2">
          <Skeleton className="h-10 w-28" />
        </div>
      </div>
    </div>
  )
}
