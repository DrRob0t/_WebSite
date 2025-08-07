import React, { Component } from 'react'
import type { ErrorInfo, ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import { AlertTriangle } from 'lucide-react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
  errorInfo: ErrorInfo | null
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error to monitoring service (e.g., Sentry, LogRocket)
    console.error('Error caught by ErrorBoundary:', error, errorInfo)
    
    // You can also log to an error reporting service here
    // Example: Sentry.captureException(error, { extra: errorInfo })
    
    this.setState({
      error,
      errorInfo,
    })
  }

  private handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    })
    // Optionally reload the page
    window.location.href = '/'
  }

  public render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      if (this.props.fallback) {
        return <>{this.props.fallback}</>
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="max-w-md w-full px-6 py-8 bg-white shadow-lg rounded-lg">
            <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            
            <h1 className="mt-4 text-2xl font-bold text-center text-gray-900">
              Oops! Something went wrong
            </h1>
            
            <p className="mt-2 text-center text-gray-600">
              We're sorry for the inconvenience. An unexpected error has occurred.
            </p>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-4 p-4 bg-gray-100 rounded-md">
                <summary className="cursor-pointer font-medium text-gray-700">
                  Error details (Development only)
                </summary>
                <pre className="mt-2 text-xs text-gray-600 overflow-auto">
                  {this.state.error.toString()}
                  {this.state.errorInfo && this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}

            <div className="mt-6 flex flex-col gap-3">
              <Button 
                onClick={this.handleReset}
                className="w-full"
                variant="default"
              >
                Go to Homepage
              </Button>
              
              <Button
                onClick={() => window.history.back()}
                className="w-full"
                variant="outline"
              >
                Go Back
              </Button>
            </div>

            <p className="mt-4 text-sm text-center text-gray-500">
              If this problem persists, please contact our support team.
            </p>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

// Higher-order component for functional components
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  fallback?: ReactNode
) {
  return (props: P) => (
    <ErrorBoundary fallback={fallback}>
      <Component {...props} />
    </ErrorBoundary>
  )
}
