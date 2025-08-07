import { cn } from '@/lib/utils'

interface SpinnerProps {
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

const sizeClasses = {
  sm: 'h-4 w-4',
  md: 'h-6 w-6',
  lg: 'h-8 w-8',
  xl: 'h-12 w-12',
}

export const Spinner = ({ className, size = 'md' }: SpinnerProps) => {
  return (
    <div
      className={cn(
        'animate-spin rounded-full border-2 border-current border-t-transparent text-primary',
        sizeClasses[size],
        className
      )}
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  )
}

// Full page spinner component
export const PageSpinner = ({ className }: { className?: string }) => {
  return (
    <div className={cn('flex items-center justify-center min-h-[400px]', className)}>
      <Spinner size="lg" />
    </div>
  )
}

// Inline spinner with text
export const SpinnerWithText = ({ 
  text = 'Loading...', 
  className 
}: { 
  text?: string
  className?: string 
}) => {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <Spinner size="sm" />
      <span className="text-sm text-muted-foreground">{text}</span>
    </div>
  )
}
