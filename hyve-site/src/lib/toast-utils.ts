import { toast as sonnerToast } from 'sonner'

// Custom toast utility functions for consistent messaging across the app

export const toast = {
  // Success notifications
  success: (message: string, description?: string) => {
    return sonnerToast.success(message, {
      description,
      duration: 4000,
    })
  },

  // Error notifications
  error: (message: string, description?: string) => {
    return sonnerToast.error(message, {
      description,
      duration: 5000,
    })
  },

  // Info notifications
  info: (message: string, description?: string) => {
    return sonnerToast.info(message, {
      description,
      duration: 4000,
    })
  },

  // Warning notifications
  warning: (message: string, description?: string) => {
    return sonnerToast.warning(message, {
      description,
      duration: 4000,
    })
  },

  // Loading notification with promise
  promise: <T,>(
    promise: Promise<T>,
    {
      loading = 'Loading...',
      success = 'Success!',
      error = 'Something went wrong',
    }: {
      loading?: string
      success?: string | ((data: T) => string)
      error?: string | ((error: any) => string)
    }
  ) => {
    return sonnerToast.promise(promise, {
      loading,
      success,
      error,
    })
  },

  // Custom notification
  custom: (component: React.ReactNode) => {
    return sonnerToast.custom(component)
  },

  // Dismiss a toast
  dismiss: (toastId?: string | number) => {
    sonnerToast.dismiss(toastId)
  },
}

// Common toast messages for reuse
export const toastMessages = {
  form: {
    success: 'Form submitted successfully!',
    error: 'Failed to submit form. Please try again.',
    validation: 'Please check the form for errors.',
  },
  auth: {
    loginSuccess: 'Welcome back!',
    loginError: 'Invalid credentials. Please try again.',
    logoutSuccess: 'You have been logged out.',
  },
  file: {
    uploadSuccess: 'File uploaded successfully!',
    uploadError: 'Failed to upload file. Please try again.',
    sizeError: 'File size exceeds the maximum limit.',
    typeError: 'Invalid file type.',
  },
  network: {
    offline: 'You are currently offline.',
    online: 'Back online!',
    slow: 'Slow network detected. This might take a while...',
  },
  clipboard: {
    success: 'Copied to clipboard!',
    error: 'Failed to copy to clipboard.',
  },
}
