// Security utilities for XSS prevention and input sanitization

import DOMPurify from 'dompurify'

/**
 * Sanitize HTML content to prevent XSS attacks
 * Use this for any user-generated content or external HTML
 */
export function sanitizeHtml(dirty: string): string {
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: [
      'b',
      'i',
      'em',
      'strong',
      'u',
      'br',
      'p',
      'div',
      'span',
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'ul',
      'ol',
      'li',
      'a',
      'img',
    ],
    ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'target', 'rel'],
    ALLOW_DATA_ATTR: false,
    FORBID_TAGS: ['script', 'object', 'embed', 'style', 'link'],
    FORBID_ATTR: ['onerror', 'onload', 'onclick', 'onmouseover'],
  })
}

/**
 * Sanitize text content (strips all HTML)
 * Use this for plain text fields where HTML should not be allowed
 */
export function sanitizeText(input: string): string {
  return DOMPurify.sanitize(input, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] })
}

/**
 * Validate and sanitize URL to prevent javascript: and data: URLs
 */
export function sanitizeUrl(url: string): string {
  const cleanUrl = url.trim()

  // Block dangerous protocols
  if (cleanUrl.match(/^(javascript|data|vbscript|file|about):/i)) {
    // Blocked potentially dangerous URL
    return '#'
  }

  // Allow relative URLs and safe protocols
  if (cleanUrl.match(/^(https?:\/\/|\/|\.\/|#)/)) {
    return cleanUrl
  }

  // Default to treating as relative if no protocol
  return cleanUrl.startsWith('/') ? cleanUrl : `/${cleanUrl}`
}

/**
 * Escape special characters in user input for safe display
 */
export function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

/**
 * Validate email format using a secure regex
 * Prevents ReDoS (Regular Expression Denial of Service)
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return emailRegex.test(email) && email.length <= 254 // RFC 5321 limit
}

/**
 * Rate limiting for form submissions and API calls
 */
class RateLimiter {
  private attempts: Map<string, number[]> = new Map()

  isAllowed(key: string, maxAttempts: number = 5, windowMs: number = 60000): boolean {
    const now = Date.now()
    const attempts = this.attempts.get(key) || []

    // Remove old attempts outside the window
    const recentAttempts = attempts.filter(time => now - time < windowMs)

    if (recentAttempts.length >= maxAttempts) {
      return false
    }

    recentAttempts.push(now)
    this.attempts.set(key, recentAttempts)
    return true
  }

  reset(key: string): void {
    this.attempts.delete(key)
  }
}

export const rateLimiter = new RateLimiter()

/**
 * Generate a secure random token for CSRF protection
 */
export function generateSecureToken(): string {
  if (window.crypto && window.crypto.getRandomValues) {
    const array = new Uint8Array(32)
    window.crypto.getRandomValues(array)
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('')
  } else {
    // Fallback for older browsers (less secure)
    // Using fallback random number generation
    return Math.random().toString(36).substring(2) + Date.now().toString(36)
  }
}

/**
 * Secure storage utilities that avoid storing sensitive data in localStorage
 */
export const secureStorage = {
  /**
   * Store non-sensitive data with expiration
   */
  set(key: string, value: any, expirationMs: number = 24 * 60 * 60 * 1000): void {
    const item = {
      value,
      expiry: Date.now() + expirationMs,
    }
    try {
      localStorage.setItem(key, JSON.stringify(item))
    } catch (error) {
      console.warn('Failed to store item in localStorage:', error)
    }
  },

  /**
   * Retrieve data, automatically removing expired items
   */
  get(key: string): any {
    try {
      const itemStr = localStorage.getItem(key)
      if (!itemStr) return null

      const item = JSON.parse(itemStr)
      if (Date.now() > item.expiry) {
        localStorage.removeItem(key)
        return null
      }

      return item.value
    } catch (error) {
      console.warn('Failed to retrieve item from localStorage:', error)
      return null
    }
  },

  /**
   * Remove item from storage
   */
  remove(key: string): void {
    try {
      localStorage.removeItem(key)
    } catch (error) {
      console.warn('Failed to remove item from localStorage:', error)
    }
  },

  /**
   * Clear all stored items (use with caution)
   */
  clear(): void {
    try {
      localStorage.clear()
    } catch (error) {
      console.warn('Failed to clear localStorage:', error)
    }
  },
}

/**
 * Check if the current page is being loaded in an iframe (clickjacking protection)
 */
export function detectClickjacking(): boolean {
  if (window.top !== window.self) {
    console.warn('Page is being loaded in an iframe - potential clickjacking attempt')
    return true
  }
  return false
}

/**
 * Basic timing attack protection for string comparison
 */
export function secureStringCompare(a: string, b: string): boolean {
  if (a.length !== b.length) {
    return false
  }

  let result = 0
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i)
  }

  return result === 0
}
