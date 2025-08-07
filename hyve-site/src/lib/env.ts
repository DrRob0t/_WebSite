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

  // Validate URL format
  try {
    new URL(env.API_URL)
  } catch {
    errors.push('VITE_API_URL must be a valid URL')
  }

  // Log warnings for optional but recommended variables
  if (env.IS_PRODUCTION) {
    if (!env.GA_MEASUREMENT_ID && env.ENABLE_ANALYTICS) {
      console.warn('VITE_GA_MEASUREMENT_ID not set but analytics is enabled')
    }

    if (!env.SENTRY_DSN) {
      console.warn('VITE_SENTRY_DSN not set - error tracking disabled')
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
