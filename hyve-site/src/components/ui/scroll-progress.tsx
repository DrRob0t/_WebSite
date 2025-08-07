import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ScrollProgressProps {
  className?: string
  height?: number
  color?: string
  showOnPages?: string[] // Optional: only show on specific pages
}

export const ScrollProgress = ({ 
  className, 
  height = 3,
  color = 'bg-hyve-accent',
  showOnPages 
}: ScrollProgressProps) => {
  const [isVisible, setIsVisible] = useState(true)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  useEffect(() => {
    if (showOnPages && showOnPages.length > 0) {
      const currentPath = window.location.pathname
      const shouldShow = showOnPages.some(page => currentPath.includes(page))
      setIsVisible(shouldShow)
    }
  }, [showOnPages])

  if (!isVisible) return null

  return (
    <motion.div
      className={cn(
        "fixed top-0 left-0 right-0 z-[60] origin-left",
        color,
        className
      )}
      style={{ 
        scaleX,
        height: `${height}px`
      }}
    />
  )
}

// Hook to get scroll percentage
export const useScrollPercentage = () => {
  const [percentage, setPercentage] = useState(0)

  useEffect(() => {
    const updateScrollPercentage = () => {
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const scrollTop = window.scrollY
      const scrollableHeight = documentHeight - windowHeight
      
      if (scrollableHeight > 0) {
        const currentPercentage = (scrollTop / scrollableHeight) * 100
        setPercentage(Math.min(100, Math.max(0, currentPercentage)))
      }
    }

    window.addEventListener('scroll', updateScrollPercentage)
    updateScrollPercentage()

    return () => window.removeEventListener('scroll', updateScrollPercentage)
  }, [])

  return percentage
}
