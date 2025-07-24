import React, { useEffect, useRef, useState } from 'react'

/**
 * 🕸️ VANTA NET BACKGROUND COMPONENT - MESH GRID IMPLEMENTATION
 * 
 * ✅ Features:
 * - Interconnected mesh grid (no globe sphere)
 * - Easy enable/disable switch
 * - Proper cleanup to prevent memory leaks
 * - Error boundaries for graceful fallback
 * - Performance optimized settings
 * - Hyve brand color integration
 * 
 * 🎛️ CUSTOMIZATION:
 * - enabled: true/false to toggle background
 * - Vanta NET settings in initVanta() function
 * - Colors: Change 0x7FB3BE for mesh lines, 0x102542 for background
 * 
 * 🚨 TROUBLESHOOTING:
 * - If issues occur, set enabled={false} in App.tsx
 * - Check browser console for error messages
 * - Fallback gradient will show if Vanta fails
 */

interface VantaBackgroundProps {
  enabled?: boolean
  className?: string
  children?: React.ReactNode
}

export const VantaBackground = ({ 
  enabled = true, 
  className = "",
  children 
}: VantaBackgroundProps) => {
  const vantaRef = useRef<HTMLDivElement>(null)
  const vantaEffect = useRef<any>(null) // eslint-disable-line @typescript-eslint/no-explicit-any
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    if (!enabled || hasError) return

          const initVanta = () => {
        try {
          // @ts-expect-error - Vanta types not available
          if (!window.VANTA || !window.THREE) {
            console.warn('Vanta.js or Three.js not loaded, skipping animated background')
            return
          }

          if (vantaRef.current && !vantaEffect.current) {
            // @ts-expect-error - Vanta types not available
            vantaEffect.current = window.VANTA.NET({
              el: vantaRef.current,
              mouseControls: true,
              touchControls: true,
              gyroControls: false,
              minHeight: 200.00,
              minWidth: 200.00,
              scale: 1.00,
              scaleMobile: 1.00,
              // 🎨 HYVE DYNAMICS BRAND COLORS - MESH GRID
              color: 0x7FB3BE,           // hyve-accent (Moonstone) for mesh lines
              backgroundColor: 0x102542,  // hyve-header (Oxford Blue) for background
              points: 12.00,             // Number of connection points
              maxDistance: 25.00,        // Maximum connection distance
              spacing: 16.00,            // Spacing between points
              showDots: true,            // Show connection dots
              size: 1.50,               // Size of the dots
              // @ts-expect-error - THREE types
              THREE: window.THREE,
            })
            
            setIsLoaded(true)
            console.log('✅ Vanta NET mesh grid background initialized successfully')
          }
      } catch (error) {
        console.error('❌ Error initializing Vanta background:', error)
        setHasError(true)
      }
    }

    const timeoutId = setTimeout(initVanta, 100)

    return () => {
      clearTimeout(timeoutId)
      if (vantaEffect.current) {
        try {
          vantaEffect.current.destroy()
          vantaEffect.current = null
          console.log('🧹 Vanta background cleaned up')
        } catch (error) {
          console.error('Error cleaning up Vanta:', error)
        }
      }
    }
  }, [enabled, hasError])

  // Additional cleanup on unmount
  useEffect(() => {
    return () => {
      if (vantaEffect.current) {
        try {
          vantaEffect.current.destroy()
        } catch (error) {
          console.error('Error in unmount cleanup:', error)
        }
      }
    }
  }, [])

  if (!enabled || hasError) {
    return <div className={className}>{children}</div>
  }

  return (
    <div 
      ref={vantaRef} 
      className={`relative ${className}`}
      style={{ minHeight: '100vh', zIndex: 1 }}
    >
      <div 
        className="relative z-10 w-full h-full"
        style={{ position: 'relative', zIndex: 10 }}
      >
        {children}
      </div>
      {!isLoaded && enabled && (
        <div className="absolute inset-0 bg-hyve-background animate-pulse z-5" />
      )}
    </div>
  )
}

// Error Boundary Component
export class VantaErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
    console.error('Vanta Error Boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="bg-hyve-background">
          {this.props.children}
        </div>
      )
    }

    return this.props.children
  }
} 