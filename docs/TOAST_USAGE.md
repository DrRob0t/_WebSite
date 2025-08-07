# Toast Notifications Usage Guide

## Overview
We use Sonner for toast notifications throughout the Hyve Dynamics website. Toast notifications provide immediate feedback to users about the status of their actions.

## Setup
Toast notifications are already configured in `src/main.tsx` with custom styling that matches our brand.

## Basic Usage

### Import
```typescript
import { toast } from 'sonner'
// or use our custom utility
import { toast } from '@/lib/toast-utils'
```

### Simple Notifications

```typescript
// Success
toast.success('Action completed successfully!')

// Error
toast.error('Something went wrong!')

// Info
toast.info('New update available')

// Warning
toast.warning('Please save your changes')
```

### With Descriptions

```typescript
toast.success('Message sent!', {
  description: 'We\'ll get back to you within 24 hours.',
})

toast.error('Upload failed', {
  description: 'File size must be less than 5MB.',
})
```

## Advanced Usage

### Promise Toast
Show loading, success, and error states automatically:

```typescript
const uploadPromise = uploadFile(file)

toast.promise(uploadPromise, {
  loading: 'Uploading file...',
  success: 'File uploaded successfully!',
  error: 'Failed to upload file',
})
```

### Custom Duration
```typescript
toast.success('This will stay longer', {
  duration: 10000, // 10 seconds
})
```

### Action Buttons
```typescript
toast.success('File deleted', {
  action: {
    label: 'Undo',
    onClick: () => restoreFile(),
  },
})
```

### Custom Toast
```typescript
toast.custom((t) => (
  <div className="flex items-center gap-2">
    <CheckCircle className="h-4 w-4 text-green-500" />
    <span>Custom notification</span>
  </div>
))
```

## Common Patterns

### Form Submission
```typescript
const handleSubmit = async (formData) => {
  try {
    await submitForm(formData)
    toast.success('Form submitted successfully!')
  } catch (error) {
    toast.error('Failed to submit form', {
      description: error.message,
    })
  }
}
```

### File Upload with Progress
```typescript
const handleFileUpload = async (file) => {
  const toastId = toast.loading('Uploading file...')
  
  try {
    const result = await uploadFile(file, {
      onProgress: (progress) => {
        toast.loading(`Uploading: ${progress}%`, {
          id: toastId,
        })
      }
    })
    
    toast.success('Upload complete!', {
      id: toastId,
    })
  } catch (error) {
    toast.error('Upload failed', {
      id: toastId,
      description: error.message,
    })
  }
}
```

### Network Status
```typescript
window.addEventListener('online', () => {
  toast.success('Back online!')
})

window.addEventListener('offline', () => {
  toast.error('No internet connection')
})
```

## Styling
The toast notifications are pre-configured with styles that match the Hyve Dynamics brand:
- Success: Green background
- Error: Red background
- Warning: Yellow background
- Info: Blue background

All toasts appear at the top-center of the screen and include a close button.

## Best Practices

1. **Be concise**: Keep messages short and actionable
2. **Use descriptions**: Add context when helpful
3. **Choose the right type**: Use success/error/info/warning appropriately
4. **Don't overuse**: Only show toasts for important user feedback
5. **Provide actions**: Include undo/retry buttons when relevant
6. **Test accessibility**: Ensure screen readers announce toasts

## Examples in Our Codebase

- **Contact Form**: Shows success/error on form submission
- **File Uploads**: Progress indication during upload
- **Network Issues**: Alerts when offline/online
- **Copy to Clipboard**: Confirmation when text is copied
