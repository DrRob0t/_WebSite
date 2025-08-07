import * as z from 'zod'

// Common validation patterns for reuse across forms

// Email validation with custom error messages
export const emailSchema = z
  .string()
  .email('Please enter a valid email address')
  .min(1, 'Email is required')

// Name validation
export const nameSchema = z
  .string()
  .min(2, 'Name must be at least 2 characters')
  .max(50, 'Name must be less than 50 characters')
  .regex(/^[a-zA-Z\s'-]+$/, 'Name can only contain letters, spaces, hyphens, and apostrophes')

// Phone validation (optional)
export const phoneSchema = z
  .string()
  .regex(/^[\d\s\-\+\(\)]+$/, 'Invalid phone number format')
  .min(10, 'Phone number must be at least 10 digits')
  .optional()
  .or(z.literal(''))

// Message/textarea validation
export const messageSchema = z
  .string()
  .min(10, 'Message must be at least 10 characters')
  .max(500, 'Message must be less than 500 characters')

// Company name validation (optional)
export const companySchema = z
  .string()
  .max(100, 'Company name must be less than 100 characters')
  .optional()

// URL validation
export const urlSchema = z.string().url('Please enter a valid URL').optional().or(z.literal(''))

// Password validation
export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number')
  .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character')

// Common form schemas
export const contactFormSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  message: messageSchema,
  company: companySchema,
})

export const newsletterFormSchema = z.object({
  email: emailSchema,
  name: nameSchema.optional(),
})

export const inquiryFormSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
  company: companySchema,
  industryType: z.enum([
    'aerospace',
    'automotive',
    'energy',
    'structural-health',
    'robotics',
    'other',
  ]),
  message: messageSchema,
  preferredContact: z.enum(['email', 'phone']).default('email'),
})

// Type exports
export type ContactFormData = z.infer<typeof contactFormSchema>
export type NewsletterFormData = z.infer<typeof newsletterFormSchema>
export type InquiryFormData = z.infer<typeof inquiryFormSchema>
