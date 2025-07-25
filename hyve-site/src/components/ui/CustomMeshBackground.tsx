import React, { useEffect, useRef } from 'react'

interface CustomMeshBackgroundProps {
  enabled?: boolean
  className?: string
  children?: React.ReactNode
  vertexPointSize?: number
  onDebugClick?: (info: { x: number; y: number; type: string }) => void
}

/**
 * 🌐 CUSTOM MESH GRID BACKGROUND
 * 
 * Creates a perspective grid that extends to the horizon with gentle wave motion.
 * Like the globe mesh but flat, extending into the distance.
 * 
 * Features:
 * - Organized grid pattern (not chaotic)
 * - Gentle wave-like movement
 * - Perspective view extending to horizon
 * - Hyve brand colors
 * - Optimized performance
 */
export const CustomMeshBackground = ({ 
  enabled = true, 
  className = "",
  children,
  vertexPointSize = 1.5,
  onDebugClick
}: CustomMeshBackgroundProps) => {
  const mountRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<any>(null) // eslint-disable-line @typescript-eslint/no-explicit-any

  useEffect(() => {
    if (!enabled || !mountRef.current) return

    // @ts-expect-error - Three.js global
    if (!window.THREE) {
      console.warn('Three.js not loaded, skipping custom mesh background')
      return
    }

    // @ts-expect-error - Three.js global
    const THREE = window.THREE

    // Scene setup
    const scene = new THREE.Scene()
    scene.fog = new THREE.Fog(0x102542, 10, 50) // Add fog for depth
    
    // Get the actual container dimensions
    const container = mountRef.current
    const containerWidth = container.clientWidth
    const containerHeight = container.clientHeight
    
    const camera = new THREE.PerspectiveCamera(
      60,
      containerWidth / containerHeight,
      0.1,
      100
    )
    
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true 
    })
    
    renderer.setSize(containerWidth, containerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    
    // Style the canvas to ensure it can receive clicks
    renderer.domElement.style.position = 'absolute'
    renderer.domElement.style.top = '0'
    renderer.domElement.style.left = '0'
    renderer.domElement.style.width = '100%'
    renderer.domElement.style.height = '100%'
    renderer.domElement.style.pointerEvents = 'auto'
    
    container.appendChild(renderer.domElement)

    // Create grid with lines
    const gridWidth = 240  // Increased for better coverage
    const gridDepth = 240  // Increased for better coverage
    const gridDivisions = 150  // More divisions for finer grid

    // Create horizontal lines
    const horizontalLines = new THREE.Group()
    const lineMaterial = new THREE.LineBasicMaterial({ 
      color: 0x7FB3BE, // Hyve accent color
      opacity: 0.4,
      transparent: true
    })

    for (let i = 0; i <= gridDivisions; i++) {
      const points = []
      const z = (i / gridDivisions) * gridDepth - gridDepth / 2
      
      for (let j = 0; j <= gridDivisions; j++) {
        const x = (j / gridDivisions) * gridWidth - gridWidth / 2
        points.push(new THREE.Vector3(x, 0, z))
      }
      
      const geometry = new THREE.BufferGeometry().setFromPoints(points)
      const line = new THREE.Line(geometry, lineMaterial)
      horizontalLines.add(line)
    }

    // Create vertical lines
    const verticalLines = new THREE.Group()
    for (let i = 0; i <= gridDivisions; i++) {
      const points = []
      const x = (i / gridDivisions) * gridWidth - gridWidth / 2
      
      for (let j = 0; j <= gridDivisions; j++) {
        const z = (j / gridDivisions) * gridDepth - gridDepth / 2
        points.push(new THREE.Vector3(x, 0, z))
      }
      
      const geometry = new THREE.BufferGeometry().setFromPoints(points)
      const line = new THREE.Line(geometry, lineMaterial)
      verticalLines.add(line)
    }

    // Create vertex points
    const vertexPoints = new THREE.Group()
    const pointGeometry = new THREE.BufferGeometry()
    const pointMaterial = new THREE.PointsMaterial({
      color: 0x7FB3BE, // Same color as lines
      size: vertexPointSize * 0.1, // Make them smaller
      transparent: true,  // FIX #5: Add transparent flag
      opacity: 0.8,
      sizeAttenuation: true,
      alphaTest: 0.1, // Helps with rendering circular points
      vertexColors: false
    })

    // Create points at every grid intersection
    const pointsArray = []
    for (let i = 0; i <= gridDivisions; i++) {
      for (let j = 0; j <= gridDivisions; j++) {
        const x = (j / gridDivisions) * gridWidth - gridWidth / 2
        const z = (i / gridDivisions) * gridDepth - gridDepth / 2
        pointsArray.push(x, 0, z) // Y = 0 initially, will be animated
      }
    }

    pointGeometry.setAttribute('position', new THREE.Float32BufferAttribute(pointsArray, 3))
    const points = new THREE.Points(pointGeometry, pointMaterial)
    vertexPoints.add(points)

    // Rotate the grid 30 degrees
    horizontalLines.rotation.y = Math.PI / 7 // 30 degrees in radians
    verticalLines.rotation.y = Math.PI / 7   // 30 degrees in radians
    vertexPoints.rotation.y = Math.PI / 7    // Rotate points with the grid

    scene.add(horizontalLines)
    scene.add(verticalLines)
    scene.add(vertexPoints)

    // Position camera for perspective view
    camera.position.set(0, 12, 35)  // Higher and further back for better coverage
    camera.lookAt(0, -3, -15)       // Look further down and deeper

    // Animation variables
    const clock = new THREE.Clock()
    let animationFrameId: number | null = null
    
    // Store base positions for all geometries (FIX #2)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const basePositions: Map<any, Float32Array> = new Map()
    
    // Save base positions for each line
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    horizontalLines.children.forEach((line: any) => {
      basePositions.set(line.geometry, line.geometry.attributes.position.array.slice())
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    verticalLines.children.forEach((line: any) => {
      basePositions.set(line.geometry, line.geometry.attributes.position.array.slice())
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    vertexPoints.children.forEach((points: any) => {
      basePositions.set(points.geometry, points.geometry.attributes.position.array.slice())
    })
    
    // Ripple system
    const ripples: Array<{
      x: number;
      z: number;
      startTime: number;
      amplitude: number;
      speed: number;
      duration: number;
    }> = []
    
    // Track animation time separately to avoid timing issues
    let animationTime = 0
    
    // Click indicators for visual feedback
    const clickIndicators = new THREE.Group()
    scene.add(clickIndicators)
    
    // Click detection setup
    const raycaster = new THREE.Raycaster()
    const mouse = new THREE.Vector2()
    
    // Click handler for ripple effects (FIX #1: Use proper coordinate transform)
    const handleClick = (event: MouseEvent) => {
      // Debug callback
      if (onDebugClick) {
        onDebugClick({ x: event.clientX, y: event.clientY, type: 'canvas' })
      }
      
      console.log('🔵 Canvas click detected!', { x: event.clientX, y: event.clientY })
      
      const rect = renderer.domElement.getBoundingClientRect()
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1
      
      console.log('🔵 Normalized mouse coordinates:', { x: mouse.x, y: mouse.y })
      
      raycaster.setFromCamera(mouse, camera)
      
      // FIX #1: Use raycaster to intersect with the actual grid
      // First try to hit any horizontal line
      const allLines = [...horizontalLines.children, ...verticalLines.children]
      const intersects = raycaster.intersectObjects(allLines, false)
      
      if (intersects.length > 0) {
        const hit = intersects[0]
        // Transform hit point to local grid space
        const localPoint = horizontalLines.worldToLocal(hit.point.clone())
        
        console.log('🔵 Hit point in local space:', { x: localPoint.x, z: localPoint.z })
        
        // Add visual click indicator (FIX #4: Higher Y position)
        const indicatorGeometry = new THREE.CircleGeometry(0.5, 32)
        const indicatorMaterial = new THREE.MeshBasicMaterial({ 
          color: 0x7FB3BE,
          transparent: true,
          opacity: 0.8,
          side: THREE.DoubleSide
        })
        const indicator = new THREE.Mesh(indicatorGeometry, indicatorMaterial)
        indicator.position.copy(hit.point)
        indicator.position.y = 0.5 // FIX #4: Higher to avoid z-fighting
        indicator.rotation.x = -Math.PI / 2
        clickIndicators.add(indicator)
        
        // Animate the indicator to fade out
        const fadeOutIndicator = () => {
          indicatorMaterial.opacity -= 0.02
          if (indicatorMaterial.opacity > 0) {
            requestAnimationFrame(fadeOutIndicator)
          } else {
            clickIndicators.remove(indicator)
            indicatorGeometry.dispose()
            indicatorMaterial.dispose()
          }
        }
        fadeOutIndicator()
        
        // Add new ripple with improved parameters (FIX #3: Slower, wider)
        ripples.push({
          x: localPoint.x,
          z: localPoint.z,
          startTime: animationTime,
          amplitude: 0.35,  // Moderate amplitude
          speed: 7,         // Slower speed
          duration: 4       // Longer duration
        })
        
        console.log('✅ Ripple added! Total ripples:', ripples.length)
        console.log('✅ Active ripples:', ripples)
        console.log('✅ Animation time:', animationTime)
      } else {
        console.log('❌ No intersection with grid')
      }
    }
    
    // Capture clicks at different levels to ensure we catch them
    const handleClickCapture = (event: MouseEvent) => {
      console.log('🟢 Click captured at container level')
      event.stopPropagation() // Prevent bubbling
      handleClick(event)
    }
    
    // Add multiple event listeners to ensure we catch clicks
    renderer.domElement.addEventListener('click', handleClick, false)
    renderer.domElement.addEventListener('mousedown', (e: MouseEvent) => {
      console.log('🟡 Mouse down on canvas', { x: e.clientX, y: e.clientY })
    })
    container.addEventListener('click', handleClickCapture, true) // Use capture phase
    
    // Set cursor style
    renderer.domElement.style.cursor = 'pointer'
    container.style.cursor = 'pointer'
    
    // Test that events are working
    console.log('🎯 CustomMeshBackground initialized with click handlers')
    console.log('🎯 Renderer element:', renderer.domElement)
    console.log('🎯 Container element:', container)
    
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)
      
      const deltaTime = clock.getDelta() // Get time since last frame
      animationTime += deltaTime // Accumulate time
      
      // Clean up expired ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const rippleAge = animationTime - ripples[i].startTime
        if (rippleAge > ripples[i].duration) {
          console.log('🗑️ Removing expired ripple, age:', rippleAge)
          ripples.splice(i, 1)
        }
      }
      
      // Calculate ripple effect for a given point
      const calculateRippleEffect = (x: number, z: number): number => {
        let rippleEffect = 0
        ripples.forEach(ripple => {
          const distance = Math.sqrt((x - ripple.x) ** 2 + (z - ripple.z) ** 2)
          const rippleAge = animationTime - ripple.startTime
          const normalizedTime = rippleAge / ripple.duration
          
          if (normalizedTime >= 0 && normalizedTime < 1) {
            // Calculate wave radius (how far the wave has traveled)
            const waveRadius = rippleAge * ripple.speed
            
            // Check if this point is close to the current wave position
            const distanceFromWave = Math.abs(distance - waveRadius)
            
            // FIX #3: Wider band for the ripple
            if (distanceFromWave < 6 && distance < 50) { // Wider band
              // Smooth bell curve for the wave
              const waveProfile = Math.exp(-(distanceFromWave * distanceFromWave) / 8) // Wider curve
              
              // Time-based envelope
              const envelope = Math.sin(normalizedTime * Math.PI) // Smooth rise and fall
              
              // Calculate the wave height
              rippleEffect += waveProfile * envelope * ripple.amplitude
            }
          }
        })
        return rippleEffect
      }
      
      // Gentle wave motion with ripples (FIX #2: Use base positions)
      horizontalLines.children.forEach((line: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
        const positions = line.geometry.attributes.position.array
        const base = basePositions.get(line.geometry)!
        
        for (let i = 1; i < positions.length; i += 3) {
          const x = base[i - 1]
          const z = base[i + 1]
          
          // Very subtle base wave
          const baseWave = Math.sin(x * 0.03 + animationTime * 0.3) * 0.05 +
                          Math.sin(z * 0.03 + animationTime * 0.2) * 0.05
          
          // Add ripple effects
          const rippleEffect = calculateRippleEffect(x, z)
          
          // Set Y position (height) - NOT cumulative
          positions[i] = baseWave + rippleEffect
        }
        line.geometry.attributes.position.needsUpdate = true
      })

      verticalLines.children.forEach((line: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
        const positions = line.geometry.attributes.position.array
        const base = basePositions.get(line.geometry)!
        
        for (let i = 1; i < positions.length; i += 3) {
          const x = base[i - 1]
          const z = base[i + 1]
          
          // Very subtle base wave
          const baseWave = Math.sin(x * 0.03 + animationTime * 0.3) * 0.05 +
                          Math.sin(z * 0.03 + animationTime * 0.2) * 0.05
          
          // Add ripple effects
          const rippleEffect = calculateRippleEffect(x, z)
          
          // Set Y position (height) - NOT cumulative
          positions[i] = baseWave + rippleEffect
        }
        line.geometry.attributes.position.needsUpdate = true
      })

      // Animate vertex points with same wave motion and ripples
      vertexPoints.children.forEach((pointsObject: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
        const positions = pointsObject.geometry.attributes.position.array
        const base = basePositions.get(pointsObject.geometry)!
        
        for (let i = 1; i < positions.length; i += 3) {
          const x = base[i - 1]
          const z = base[i + 1]
          
          // Very subtle base wave
          const baseWave = Math.sin(x * 0.03 + animationTime * 0.3) * 0.05 +
                          Math.sin(z * 0.03 + animationTime * 0.2) * 0.05
          
          // Add ripple effects
          const rippleEffect = calculateRippleEffect(x, z)
          
          // Set Y position (height) - NOT cumulative
          positions[i] = baseWave + rippleEffect
        }
        pointsObject.geometry.attributes.position.needsUpdate = true
      })
      
      // Debug: log active ripples every second
      if (Math.floor(animationTime) !== Math.floor(animationTime - deltaTime) && ripples.length > 0) {
        console.log('🔄 Active ripples update:', ripples.length, 'ripples at time:', animationTime)
        ripples.forEach((ripple, index) => {
          const age = animationTime - ripple.startTime
          console.log(`  Ripple ${index}: age=${age.toFixed(2)}s, remaining=${(ripple.duration - age).toFixed(2)}s`)
        })
      }

      renderer.render(scene, camera)
    }
    
    animate()

    // Handle resize
    const handleResize = () => {
      if (mountRef.current) {
        const newWidth = mountRef.current.clientWidth
        const newHeight = mountRef.current.clientHeight
        camera.aspect = newWidth / newHeight
        camera.updateProjectionMatrix()
        renderer.setSize(newWidth, newHeight)
      }
    }
    
    window.addEventListener('resize', handleResize)

    // Store references
    sceneRef.current = {
      scene,
      camera,
      renderer,
      horizontalLines,
      verticalLines,
      vertexPoints,
      clickIndicators,
      animationFrameId
    }

    // Cleanup
    return () => {
      console.log('🧹 Cleaning up CustomMeshBackground')
      window.removeEventListener('resize', handleResize)
      renderer.domElement.removeEventListener('click', handleClick)
      renderer.domElement.removeEventListener('mousedown', () => {})
      container.removeEventListener('click', handleClickCapture, true)
      
      if (sceneRef.current?.animationFrameId) {
        cancelAnimationFrame(sceneRef.current.animationFrameId)
      }
      
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement)
      }
      
      // Clean up click indicators
      clickIndicators.children.forEach((indicator: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
        if (indicator.geometry) indicator.geometry.dispose()
        if (indicator.material) indicator.material.dispose()
      })
      clickIndicators.clear()
      
      // Clean up geometries and materials
      horizontalLines.children.forEach((line: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
        line.geometry.dispose()
      })
      verticalLines.children.forEach((line: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
        line.geometry.dispose()
      })
      vertexPoints.children.forEach((pointsObject: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
        pointsObject.geometry.dispose()
        pointsObject.material.dispose()
      })
      lineMaterial.dispose()
      renderer.dispose()
      
      sceneRef.current = null
    }
  }, [enabled, onDebugClick])

  if (!enabled) {
    return <div className={className}>{children}</div>
  }

  return (
    <div className={`relative ${className}`}>
      <div 
        ref={mountRef} 
        className="absolute inset-0" 
        style={{ 
          zIndex: 0,
          background: 'linear-gradient(to bottom, #102542 0%, #0a1628 100%)', // Hyve gradient
          pointerEvents: 'auto'
        }} 
      />
      <div className="relative z-10 pointer-events-none">
        <div className="pointer-events-auto">{children}</div>
      </div>
    </div>
  )
} 