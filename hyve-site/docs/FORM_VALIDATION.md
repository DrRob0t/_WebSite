# Form Validation Guide

## Overview
We use `react-hook-form` with `zod` for form validation throughout the Hyve Dynamics website. This provides type-safe validation with excellent performance and user experience.

## Dependencies
- `react-hook-form` - Form state management
- `zod` - Schema validation
- `@hookform/resolvers` - Connects zod with react-hook-form

## Basic Setup

### 1. Define Schema
```typescript
import * as z from 'zod'

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message is too short'),
})

type FormData = z.infer<typeof formSchema>
```

### 2. Setup Form
```typescript
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const {
  register,
  handleSubmit,
  formState: { errors, isSubmitting },
  reset,
} = useForm<FormData>({
  resolver: zodResolver(formSchema),
  mode: 'onBlur', // Validate on blur for better UX
})
```

### 3. Handle Submission
```typescript
const onSubmit = async (data: FormData) => {
  try {
    await submitToAPI(data)
    toast.success('Form submitted!')
    reset()
  } catch (error) {
    toast.error('Submission failed')
  }
}
```

### 4. Build Form UI
```tsx
<form onSubmit={handleSubmit(onSubmit)}>
  <Input
    {...register('email')}
    className={errors.email ? 'border-red-500' : ''}
    aria-invalid={!!errors.email}
  />
  {errors.email && (
    <p className="text-red-500 text-sm">
      {errors.email.message}
    </p>
  )}
</form>
```

## Common Validation Patterns

### Required Fields
```typescript
z.string().min(1, 'This field is required')
```

### Email Validation
```typescript
z.string().email('Please enter a valid email')
```

### Phone Number
```typescript
z.string().regex(/^[\d\s\-\+\(\)]+$/, 'Invalid phone number')
```

### URL Validation
```typescript
z.string().url('Please enter a valid URL')
```

### Optional Fields
```typescript
z.string().optional().or(z.literal(''))
```

### Conditional Validation
```typescript
const schema = z.object({
  contactMethod: z.enum(['email', 'phone']),
  email: z.string().optional(),
  phone: z.string().optional(),
}).refine((data) => {
  if (data.contactMethod === 'email') {
    return !!data.email
  }
  return !!data.phone
}, {
  message: 'Please provide contact details',
  path: ['email'], // or ['phone']
})
```

## Reusable Components

### FormField Component
Use the `FormField` component for consistent styling:
```tsx
import { FormField } from '@/components/ui/form-field'

<FormField
  label="Email"
  htmlFor="email"
  error={errors.email}
  required
>
  <Input
    id="email"
    {...register('email')}
    className={getFieldErrorStyles(!!errors.email)}
    {...getFieldAriaAttributes('email', errors.email)}
  />
</FormField>
```

### Pre-built Schemas
Import common schemas from `@/lib/form-schemas`:
```typescript
import { emailSchema, nameSchema, messageSchema } from '@/lib/form-schemas'

const myFormSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  message: messageSchema,
})
```

## Accessibility

Always include proper ARIA attributes:
```tsx
<Input
  aria-invalid={!!errors.field}
  aria-describedby={errors.field ? 'field-error' : undefined}
/>
<p id="field-error" role="alert">
  {errors.field?.message}
</p>
```

## Best Practices

1. **Validation Modes**
   - Use `onBlur` for better UX (validates when user leaves field)
   - Use `onChange` for critical fields (passwords, etc.)
   - Use `onSubmit` for simple forms

2. **Error Messages**
   - Be specific and helpful
   - Suggest how to fix the error
   - Keep messages concise

3. **Loading States**
   - Disable form during submission
   - Show loading spinner on submit button
   - Prevent double submissions

4. **Success Feedback**
   - Show success toast
   - Reset form after successful submission
   - Redirect if needed

## Examples in Our Codebase

- **Contact Form** (`/src/components/layout/Header.tsx`) - Basic contact form with validation
- **Form Schemas** (`/src/lib/form-schemas.ts`) - Reusable validation schemas
- **Form Field Component** (`/src/components/ui/form-field.tsx`) - Consistent error display

## Testing Forms

```typescript
// Test validation
const result = formSchema.safeParse({
  email: 'invalid-email',
  name: 'A', // Too short
})

if (!result.success) {
  console.log(result.error.flatten())
}
```
