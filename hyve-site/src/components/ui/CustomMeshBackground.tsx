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

    // Create ONE big buffer for the grid (PERFORMANCE FIX)
    const positions: number[] = []
    
    // Add horizontal line segments
    for (let i = 0; i <= gridDivisions; i++) {
      const z = (i / gridDivisions) * gridDepth - gridDepth / 2
      for (let j = 0; j < gridDivisions; j++) {
        const x0 = (j / gridDivisions) * gridWidth - gridWidth / 2
        const x1 = ((j + 1) / gridDivisions) * gridWidth - gridWidth / 2
        positions.push(x0, 0, z, x1, 0, z)
      }
    }
    
    // Add vertical line segments
    for (let j = 0; j <= gridDivisions; j++) {
      const x = (j / gridDivisions) * gridWidth - gridWidth / 2
      for (let i = 0; i < gridDivisions; i++) {
        const z0 = (i / gridDivisions) * gridDepth - gridDepth / 2
        const z1 = ((i + 1) / gridDivisions) * gridDepth - gridDepth / 2
        positions.push(x, 0, z0, x, 0, z1)
      }
    }
    
    const gridGeometry = new THREE.BufferGeometry()
    gridGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    
    const lineMaterial = new THREE.LineBasicMaterial({ 
      color: 0x7FB3BE, // Hyve accent color
      opacity: 0.4,
      transparent: true
    })
    
    const grid = new THREE.LineSegments(gridGeometry, lineMaterial)
    grid.rotation.y = Math.PI / 7 // 30 degrees in radians
    scene.add(grid)

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
    vertexPoints.rotation.y = Math.PI / 7    // Rotate points with the grid

    scene.add(vertexPoints)

    // Position camera for perspective view
    camera.position.set(0, 12, 35)  // Higher and further back for better coverage
    camera.lookAt(0, -3, -15)       // Look further down and deeper

    // Animation variables
    const clock = new THREE.Clock()
    let animationFrameId: number | null = null
    
    // Store base positions for geometries
    const baseGridPositions = new Float32Array(gridGeometry.attributes.position.array)
    const basePointPositions = new Float32Array(pointGeometry.attributes.position.array)
    
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
    
    // Click handler for ripple effects
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
      
      // Create a plane at y=0 for intersection
      const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0)
      const intersectPoint = new THREE.Vector3()
      
      if (raycaster.ray.intersectPlane(plane, intersectPoint)) {
        // Transform hit point to local grid space
        const localPoint = grid.worldToLocal(intersectPoint.clone())
        
        console.log('🔵 Hit point in local space:', { x: localPoint.x, z: localPoint.z })
        
        // Add visual click indicator
        const indicatorGeometry = new THREE.CircleGeometry(0.5, 32)
        const indicatorMaterial = new THREE.MeshBasicMaterial({ 
          color: 0x7FB3BE,
          transparent: true,
          opacity: 0.8,
          side: THREE.DoubleSide
        })
        const indicator = new THREE.Mesh(indicatorGeometry, indicatorMaterial)
        indicator.position.copy(intersectPoint)
        indicator.position.y = 0.5 // Higher to avoid z-fighting
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
        
        // Add new ripple with improved parameters
        ripples.push({
          x: localPoint.x,
          z: localPoint.z,
          startTime: animationTime,
          amplitude: 0.35,  // Moderate amplitude
          speed: 7,         // Slower speed
          duration: 4       // Longer duration
        })
        
        console.log('✅ Ripple added! Total ripples:', ripples.length)
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
      
      // Debug: Check if animation is running (remove after testing)
      if (Math.floor(animationTime) % 5 === 0 && Math.floor(animationTime) !== Math.floor(animationTime - deltaTime)) {
        console.log('🎬 Animation running, time:', animationTime.toFixed(1))
      }
      
      // Clean up expired ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const rippleAge = animationTime - ripples[i].startTime
        if (rippleAge > ripples[i].duration) {
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
            
            // FIX: Narrower band and smaller radius
            if (distanceFromWave < 1.2 && distance < 25) {
              // Smooth bell curve for the wave
              const waveProfile = Math.exp(-(distanceFromWave * distanceFromWave) / 8)
              
              // Time-based envelope
              const envelope = Math.sin(normalizedTime * Math.PI) // Smooth rise and fall
              
              // Calculate the wave height with distance-based amplitude taper
              rippleEffect += waveProfile * envelope * ripple.amplitude * (1 - distance / 25)
            }
          }
        })
        return rippleEffect
      }
      
      // Animate grid lines with optimized single buffer update
      const gridPositions = gridGeometry.attributes.position.array as Float32Array
      
      for (let i = 0; i < gridPositions.length; i += 6) {   // Each segment has two vertices
        for (let k = 0; k < 2; k++) {                      // v0 and v1
          const idx = i + k * 3 + 1  // +1 to get Y position
          const x = baseGridPositions[idx - 1]
          const z = baseGridPositions[idx + 1]
          
          // Very subtle base wave
          const baseWave = Math.sin(x * 0.03 + animationTime * 0.3) * 0.05 +
                          Math.sin(z * 0.03 + animationTime * 0.2) * 0.05
          
          // Add ripple effects
          const rippleEffect = calculateRippleEffect(x, z)
          
          // Set Y position (height)
          gridPositions[idx] = baseWave + rippleEffect
        }
      }
      gridGeometry.attributes.position.needsUpdate = true

      // Animate vertex points
      const pointPositions = pointGeometry.attributes.position.array as Float32Array
      
      for (let i = 0; i < pointPositions.length; i += 3) {
        const x = basePointPositions[i]      // x coordinate
        const z = basePointPositions[i + 2]  // z coordinate
        
        // Very subtle base wave
        const baseWave = Math.sin(x * 0.03 + animationTime * 0.3) * 0.05 +
                        Math.sin(z * 0.03 + animationTime * 0.2) * 0.05
        
        // Add ripple effects
        const rippleEffect = calculateRippleEffect(x, z)
        
        // Set Y position (height)
        pointPositions[i + 1] = baseWave + rippleEffect
      }
      pointGeometry.attributes.position.needsUpdate = true

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
      grid,
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
      gridGeometry.dispose()
      pointGeometry.dispose()
      pointMaterial.dispose()
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