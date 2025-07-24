import React, { useEffect, useRef, useState } from 'react'

/**
 * 🌊 VANTA BACKGROUND COMPONENT - SAFE IMPLEMENTATION
 * 
 * ✅ Features:
 * - Easy enable/disable switch
 * - Proper cleanup to prevent memory leaks
 * - Error boundaries for graceful fallback
 * - Performance optimized settings
 * - Hyve brand color integration
 * 
 * 🎛️ CUSTOMIZATION:
 * - enabled: true/false to toggle background
 * - Vanta settings in initVanta() function
 * - Colors: Change 0x102542 to your hex color
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
          vantaEffect.current = window.VANTA.WAVES({
            el: vantaRef.current,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            // 🎨 HYVE DYNAMICS BRAND COLORS
            color: 0x102542,      // hyve-header (Oxford Blue)
            waveHeight: 20.00,
            waveSpeed: 0.75,
            zoom: 0.65,
            // @ts-expect-error - THREE types
            THREE: window.THREE,
            points: 8.00,
            max: 20.00,
          })
          
          setIsLoaded(true)
          console.log('✅ Vanta WAVES background initialized successfully')
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