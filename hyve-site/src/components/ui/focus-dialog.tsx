import * as React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * Enhanced Dialog component with built-in focus management
 * Radix UI Dialog already provides:
 * - Focus trap
 * - Escape key handling
 * - Focus restoration
 * - Proper ARIA attributes
 */

const FocusDialog = DialogPrimitive.Root

const FocusDialogTrigger = DialogPrimitive.Trigger

const FocusDialogPortal = DialogPrimitive.Portal

const FocusDialogClose = DialogPrimitive.Close

const FocusDialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      'fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      className
    )}
    {...props}
  />
))
FocusDialogOverlay.displayName = DialogPrimitive.Overlay.displayName

interface FocusDialogContentProps extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  showCloseButton?: boolean
  onEscapeKeyDown?: (event: KeyboardEvent) => void
  onCloseAutoFocus?: (event: Event) => void
}

const FocusDialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  FocusDialogContentProps
>(({ className, children, showCloseButton = true, ...props }, ref) => (
  <FocusDialogPortal>
    <FocusDialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        'fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200',
        'data-[state=open]:animate-in data-[state=closed]:animate-out',
        'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
        'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
        'data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]',
        'data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]',
        'sm:rounded-lg',
        className
      )}
      {...props}
    >
      {children}
      {showCloseButton && (
        <DialogPrimitive.Close 
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
          aria-label="Close dialog"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      )}
    </DialogPrimitive.Content>
  </FocusDialogPortal>
))
FocusDialogContent.displayName = DialogPrimitive.Content.displayName

const FocusDialogHeader = ({ 
  className, 
  ...props 
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div 
    className={cn('flex flex-col space-y-1.5 text-center sm:text-left', className)} 
    {...props} 
  />
)
FocusDialogHeader.displayName = 'FocusDialogHeader'

const FocusDialogFooter = ({ 
  className, 
  ...props 
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className)}
    {...props}
  />
)
FocusDialogFooter.displayName = 'FocusDialogFooter'

const FocusDialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn('text-lg font-semibold leading-none tracking-tight', className)}
    {...props}
  />
))
FocusDialogTitle.displayName = DialogPrimitive.Title.displayName

const FocusDialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
))
FocusDialogDescription.displayName = DialogPrimitive.Description.displayName

// Hook to programmatically manage dialog focus
export const useDialogFocus = () => {
  const [dialogOpen, setDialogOpen] = React.useState(false)
  const triggerRef = React.useRef<HTMLElement>(null)

  const openDialog = React.useCallback(() => {
    // Store current focus
    triggerRef.current = document.activeElement as HTMLElement
    setDialogOpen(true)
  }, [])

  const closeDialog = React.useCallback(() => {
    setDialogOpen(false)
    // Focus will be restored automatically by Radix
  }, [])

  return {
    dialogOpen,
    openDialog,
    closeDialog,
    triggerRef,
  }
}

export {
  FocusDialog,
  FocusDialogPortal,
  FocusDialogOverlay,
  FocusDialogTrigger,
  FocusDialogClose,
  FocusDialogContent,
  FocusDialogHeader,
  FocusDialogFooter,
  FocusDialogTitle,
  FocusDialogDescription,
}
