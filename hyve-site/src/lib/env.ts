// Environment variable utilities with type safety and validation

export interface AppEnv {
  readonly API_URL: string
  readonly APP_NAME: string
  readonly APP_VERSION: string
  readonly IS_DEVELOPMENT: boolean
  readonly IS_PRODUCTION: boolean
  readonly GA_MEASUREMENT_ID?: string
  readonly SENTRY_DSN?: string
  readonly ENABLE_ANALYTICS: boolean
  readonly ENABLE_CSP_REPORTS: boolean
  readonly CSP_REPORT_URI?: string
  readonly CDN_URL?: string
  readonly ENABLE_DEBUG_TOOLS: boolean
  readonly ENABLE_PERFORMANCE_MONITORING: boolean
  readonly CONTACT_API_ENDPOINT?: string
  readonly LINKEDIN_URL?: string
  readonly TWITTER_URL?: string
}

/**
 * Get environment variable with type safety
 * Only VITE_ prefixed variables are available in the browser
 */
function getEnvVar(key: string, defaultValue?: string): string {
  const value = import.meta.env[`VITE_${key}`] || defaultValue
  if (!value) {
    console.warn(`Environment variable VITE_${key} is not set`)
    return ''
  }
  return value
}

/**
 * Get boolean environment variable
 */
function getBooleanEnvVar(key: string, defaultValue: boolean = false): boolean {
  const value = getEnvVar(key)
  if (!value) return defaultValue
  return value.toLowerCase() === 'true'
}

/**
 * Application environment configuration
 * All values are read-only and validated at startup
 */
export const env: AppEnv = {
  API_URL: getEnvVar('API_URL', 'https://api.hyvedynamics.com'),
  APP_NAME: getEnvVar('APP_NAME', 'Hyve Dynamics'),
  APP_VERSION: getEnvVar('APP_VERSION', '1.0.0'),
  IS_DEVELOPMENT: import.meta.env.DEV,
  IS_PRODUCTION: import.meta.env.PROD,
  GA_MEASUREMENT_ID: import.meta.env.VITE_GA_MEASUREMENT_ID,
  SENTRY_DSN: import.meta.env.VITE_SENTRY_DSN,
  ENABLE_ANALYTICS: getBooleanEnvVar('ENABLE_ANALYTICS', false),
  ENABLE_CSP_REPORTS: getBooleanEnvVar('ENABLE_CSP_REPORTS', false),
  CSP_REPORT_URI: import.meta.env.VITE_CSP_REPORT_URI,
  CDN_URL: import.meta.env.VITE_CDN_URL,
  ENABLE_DEBUG_TOOLS: getBooleanEnvVar('ENABLE_DEBUG_TOOLS', !import.meta.env.PROD),
  ENABLE_PERFORMANCE_MONITORING: getBooleanEnvVar('ENABLE_PERFORMANCE_MONITORING', false),
  CONTACT_API_ENDPOINT: import.meta.env.VITE_CONTACT_API_ENDPOINT,
  LINKEDIN_URL: getEnvVar('LINKEDIN_URL', 'https://linkedin.com/company/hyve-dynamics'),
  TWITTER_URL: getEnvVar('TWITTER_URL', 'https://twitter.com/hyvedynamics'),
} as const

/**
 * Validate environment variables at startup
 * This helps catch configuration issues early
 */
export function validateEnvironment(): void {
  const errors: string[] = []

  // Validate required variables
  if (!env.APP_NAME) {
    errors.push('VITE_APP_NAME is required')
  }

  if (!env.API_URL) {
    errors.push('VITE_API_URL is required')
  }

  // Validate URL formats
  const urlsToValidate = [
    { url: env.API_URL, name: 'VITE_API_URL' },
    { url: env.CDN_URL, name: 'VITE_CDN_URL', optional: true },
    { url: env.CSP_REPORT_URI, name: 'VITE_CSP_REPORT_URI', optional: true },
    { url: env.CONTACT_API_ENDPOINT, name: 'VITE_CONTACT_API_ENDPOINT', optional: true },
    { url: env.LINKEDIN_URL, name: 'VITE_LINKEDIN_URL', optional: true },
    { url: env.TWITTER_URL, name: 'VITE_TWITTER_URL', optional: true },
  ]

  urlsToValidate.forEach(({ url, name, optional }) => {
    if (url) {
      try {
        new URL(url)
      } catch {
        errors.push(`${name} must be a valid URL`)
      }
    } else if (!optional) {
      errors.push(`${name} is required`)
    }
  })

  // Validate Sentry DSN format if provided
  if (env.SENTRY_DSN && !env.SENTRY_DSN.startsWith('https://')) {
    errors.push('VITE_SENTRY_DSN must be a valid Sentry DSN starting with https://')
  }

  // Validate GA Measurement ID format if provided
  if (env.GA_MEASUREMENT_ID && !env.GA_MEASUREMENT_ID.match(/^G-[A-Z0-9]+$/)) {
    errors.push('VITE_GA_MEASUREMENT_ID must be in format G-XXXXXXXXXX')
  }

  // Production-specific validations
  if (env.IS_PRODUCTION) {
    // Security warnings
    if (env.ENABLE_DEBUG_TOOLS) {
      console.warn('⚠️ SECURITY WARNING: Debug tools are enabled in production')
    }

    // Analytics warnings
    if (!env.GA_MEASUREMENT_ID && env.ENABLE_ANALYTICS) {
      console.warn('VITE_GA_MEASUREMENT_ID not set but analytics is enabled')
    }

    // Error tracking warnings
    if (!env.SENTRY_DSN) {
      console.warn('VITE_SENTRY_DSN not set - error tracking disabled in production')
    }

    // CSP reporting warnings
    if (env.ENABLE_CSP_REPORTS && !env.CSP_REPORT_URI) {
      console.warn('VITE_CSP_REPORT_URI not set but CSP reporting is enabled')
    }

    // Required production configurations
    if (!env.CDN_URL) {
      console.warn('VITE_CDN_URL not set - consider using a CDN for production')
    }
  }

  if (errors.length > 0) {
    console.error('Environment validation failed:', errors)
    throw new Error(`Environment validation failed: ${errors.join(', ')}`)
  }

  // Log configuration in development
  if (env.IS_DEVELOPMENT) {
    console.log('Environment configuration:', {
      APP_NAME: env.APP_NAME,
      APP_VERSION: env.APP_VERSION,
      API_URL: env.API_URL,
      ENABLE_ANALYTICS: env.ENABLE_ANALYTICS,
    })
  }
}

/**
 * Check if we're running in a secure context (HTTPS or localhost)
 */
export function isSecureContext(): boolean {
  return window.isSecureContext || location.hostname === 'localhost'
}

/**
 * Get the current environment name for logging/debugging
 */
export function getEnvironmentName(): string {
  if (env.IS_DEVELOPMENT) return 'development'
  if (env.IS_PRODUCTION) return 'production'
  return 'unknown'
}
