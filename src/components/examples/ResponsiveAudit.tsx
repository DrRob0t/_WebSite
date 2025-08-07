import { useState, useEffect } from 'react'
import { Smartphone, Tablet, Monitor, AlertCircle, Check, X } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

interface Issue {
  component: string
  issue: string
  severity: 'high' | 'medium' | 'low'
  breakpoint: string
}

export const ResponsiveAudit = () => {
  const [currentBreakpoint, setCurrentBreakpoint] = useState('')
  const [viewportSize, setViewportSize] = useState({ width: 0, height: 0 })
  const [isTouchDevice, setIsTouchDevice] = useState(false)
  const [pixelRatio, setPixelRatio] = useState(1)
  const [issues, setIssues] = useState<Issue[]>([])

  // Detect current breakpoint
  const getBreakpoint = (width: number) => {
    if (width < 640) return 'xs (< 640px)'
    if (width < 768) return 'sm (640px - 768px)'
    if (width < 1024) return 'md (768px - 1024px)'
    if (width < 1280) return 'lg (1024px - 1280px)'
    if (width < 1536) return 'xl (1280px - 1536px)'
    return '2xl (> 1536px)'
  }

  // Check for responsive issues
  const checkResponsiveIssues = () => {
    const newIssues: Issue[] = []
    const width = window.innerWidth

    // Check touch target sizes
    const buttons = document.querySelectorAll('button, a')
    buttons.forEach((element) => {
      const rect = element.getBoundingClientRect()
      if (rect.width < 44 || rect.height < 44) {
        newIssues.push({
          component: element.tagName.toLowerCase(),
          issue: `Touch target too small: ${Math.round(rect.width)}x${Math.round(rect.height)}px (min: 44x44px)`,
          severity: 'high',
          breakpoint: getBreakpoint(width),
        })
      }
    })

    // Check for horizontal overflow
    if (document.documentElement.scrollWidth > window.innerWidth) {
      newIssues.push({
        component: 'layout',
        issue: 'Horizontal scroll detected - content overflows viewport',
        severity: 'high',
        breakpoint: getBreakpoint(width),
      })
    }

    // Check text readability on mobile
    if (width < 768) {
      const textElements = document.querySelectorAll('p, span, div')
      textElements.forEach((element) => {
        const fontSize = window.getComputedStyle(element).fontSize
        if (parseInt(fontSize) < 14) {
          newIssues.push({
            component: 'text',
            issue: `Font size too small for mobile: ${fontSize}`,
            severity: 'medium',
            breakpoint: getBreakpoint(width),
          })
          return // Only report once per check
        }
      })
    }

    // Check for fixed positioning issues on mobile
    if (width < 768) {
      const fixedElements = document.querySelectorAll('[style*="position: fixed"]')
      if (fixedElements.length > 2) { // Allow header and maybe one more
        newIssues.push({
          component: 'layout',
          issue: 'Multiple fixed position elements may cause issues on mobile',
          severity: 'medium',
          breakpoint: getBreakpoint(width),
        })
      }
    }

    setIssues(newIssues)
  }

  useEffect(() => {
    const updateViewport = () => {
      setViewportSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
      setCurrentBreakpoint(getBreakpoint(window.innerWidth))
      setPixelRatio(window.devicePixelRatio || 1)
      checkResponsiveIssues()
    }

    const checkTouch = () => {
      setIsTouchDevice(
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia('(pointer: coarse)').matches
      )
    }

    updateViewport()
    checkTouch()

    window.addEventListener('resize', updateViewport)
    return () => window.removeEventListener('resize', updateViewport)
  }, [])

  const getBreakpointIcon = () => {
    if (viewportSize.width < 768) return <Smartphone className="h-5 w-5" />
    if (viewportSize.width < 1024) return <Tablet className="h-5 w-5" />
    return <Monitor className="h-5 w-5" />
  }

  const getSeverityColor = (severity: Issue['severity']) => {
    switch (severity) {
      case 'high':
        return 'destructive'
      case 'medium':
        return 'secondary'
      case 'low':
        return 'outline'
      default:
        return 'default'
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-md">
      <Card className="shadow-xl bg-white/95 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            {getBreakpointIcon()}
            Responsive Audit
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {/* Current State */}
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Breakpoint:</span>
              <Badge variant="outline">{currentBreakpoint}</Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Viewport:</span>
              <span className="font-mono">
                {viewportSize.width} × {viewportSize.height}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Touch Device:</span>
              <span>{isTouchDevice ? <Check className="h-4 w-4 text-green-500" /> : <X className="h-4 w-4 text-red-500" />}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Pixel Ratio:</span>
              <span>{pixelRatio}x</span>
            </div>
          </div>

          {/* Issues */}
          {issues.length > 0 && (
            <div className="border-t pt-3">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="h-4 w-4 text-destructive" />
                <span className="font-medium text-sm">Issues Found</span>
              </div>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {issues.map((issue, index) => (
                  <div key={index} className="text-xs space-y-1 p-2 bg-muted rounded">
                    <div className="flex items-center gap-2">
                      <Badge variant={getSeverityColor(issue.severity)} className="text-xs">
                        {issue.severity}
                      </Badge>
                      <span className="font-medium">{issue.component}</span>
                    </div>
                    <p className="text-muted-foreground">{issue.issue}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="border-t pt-3 space-y-2">
            <Button
              size="sm"
              variant="outline"
              className="w-full"
              onClick={() => checkResponsiveIssues()}
            >
              Refresh Audit
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
