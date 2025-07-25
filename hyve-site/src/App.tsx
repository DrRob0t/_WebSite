// src/App.tsx - Hyve Dynamics with Header and Navigation
import { Layout } from "@/components/layout/Layout"
import { CustomMeshBackground } from "@/components/ui/CustomMeshBackground"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

function App() {
  // 🎛️ EASY DISABLE: Set to false to disable mesh background
  const enableMeshBackground = true
  
  // Debug state to track clicks
  const [clickDebugInfo, setClickDebugInfo] = useState<{
    count: number
    lastClick: { x: number; y: number; time: string } | null
  }>({
    count: 0,
    lastClick: null
  })

  // Handle background click for debugging
  const handleBackgroundClick = (e: React.MouseEvent) => {
    const now = new Date().toLocaleTimeString()
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    setClickDebugInfo(prev => ({
      count: prev.count + 1,
      lastClick: { x, y, time: now }
    }))
    
    console.log('Background clicked!', { x, y, time: now })
  }

  // Handle debug info from CustomMeshBackground
  const handleCanvasClick = (info: { x: number; y: number; type: string }) => {
    const now = new Date().toLocaleTimeString()
    
    setClickDebugInfo(prev => ({
      count: prev.count + 1,
      lastClick: { x: info.x, y: info.y, time: now }
    }))
    
    console.log('🎯 Canvas click from CustomMeshBackground!', info)
  }

  return (
    <Layout>
      <div 
        className="min-h-screen relative"
        onClick={handleBackgroundClick}
      >
        <CustomMeshBackground 
          enabled={enableMeshBackground}
          className="min-h-screen"
          onDebugClick={handleCanvasClick}
        >
          {/* Debug Dialog */}
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-20 right-4 bg-hyve-card border border-hyve-accent/20 rounded-lg p-4 shadow-lg max-w-sm z-50"
            >
              <h3 className="text-hyve-header font-bold mb-2">🐛 Debug Info</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-hyve-text/70">Background Enabled:</span>
                  <span className={`font-mono ${enableMeshBackground ? 'text-green-400' : 'text-red-400'}`}>
                    {enableMeshBackground ? 'true' : 'false'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-hyve-text/70">Total Clicks:</span>
                  <span className="font-mono text-hyve-accent">{clickDebugInfo.count}</span>
                </div>
                {clickDebugInfo.lastClick && (
                  <>
                    <div className="border-t border-hyve-accent/10 pt-2 mt-2">
                      <p className="text-hyve-text/70 mb-1">Last Click:</p>
                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <span className="text-hyve-text/50">Position:</span>
                          <span className="font-mono text-xs text-hyve-accent">
                            ({Math.round(clickDebugInfo.lastClick.x)}, {Math.round(clickDebugInfo.lastClick.y)})
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-hyve-text/50">Time:</span>
                          <span className="font-mono text-xs text-hyve-accent">
                            {clickDebugInfo.lastClick.time}
                          </span>
                        </div>
                      </div>
                    </div>
                  </>
                )}
                <div className="border-t border-hyve-accent/10 pt-2 mt-2">
                  <p className="text-xs text-hyve-text/50">
                    Click anywhere on the background to test ripple effect
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          
          {/* Empty content area - just header and footer remain */}
          <div className="min-h-[60vh]" />
        </CustomMeshBackground>
      </div>
    </Layout>
  )
}

export default App
