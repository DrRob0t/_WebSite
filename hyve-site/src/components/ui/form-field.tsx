import * as React from 'react'
import { AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FormFieldErrorProps {
  error?: {
    message?: string
  }
  id: string
}

export const FormFieldError: React.FC<FormFieldErrorProps> = ({ error, id }) => {
  if (!error?.message) return null

  return (
    <p id={`${id}-error`} className="text-sm text-red-500 flex items-center gap-1 mt-1">
      <AlertCircle className="h-3 w-3 flex-shrink-0" />
      <span>{error.message}</span>
    </p>
  )
}

interface FormFieldProps {
  children: React.ReactNode
  label: string
  error?: {
    message?: string
  }
  required?: boolean
  className?: string
  htmlFor: string
}

export const FormField: React.FC<FormFieldProps> = ({
  children,
  label,
  error,
  required,
  className,
  htmlFor,
}) => {
  return (
    <div className={cn("space-y-2", className)}>
      <label
        htmlFor={htmlFor}
        className="text-sm font-body font-medium text-hyve-text flex items-center gap-1"
      >
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      {children}
      <FormFieldError error={error} id={htmlFor} />
    </div>
  )
}

// Helper function to get field error styling
export const getFieldErrorStyles = (hasError: boolean) => {
  return hasError ? "border-red-500 focus:border-red-500" : ""
}

// Helper function to get field aria attributes
export const getFieldAriaAttributes = (fieldName: string, error?: { message?: string }) => {
  return {
    'aria-invalid': !!error,
    'aria-describedby': error ? `${fieldName}-error` : undefined,
  }
}
