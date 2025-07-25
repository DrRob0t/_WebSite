import React, { useEffect, useRef } from 'react'

interface CustomMeshBackgroundProps {
  enabled?: boolean
  className?: string
  children?: React.ReactNode
  vertexPointSize?: number
}

interface PointData {
  x: number
  z: number
  index: number
}

/**
 * 🌐 CUSTOM MESH GRID BACKGROUND
 * 
 * Creates a static perspective grid that extends to the horizon.
 * Beautiful, clean, and performant mesh background with click interaction.
 * 
 * Features:
 * - Organized grid pattern
 * - Perspective view extending to horizon
 * - Hyve brand colors
 * - Click to highlight closest point
 * - Optimized performance
 */
export const CustomMeshBackground = ({ 
  enabled = true, 
  className = "",
  children,
  vertexPointSize = 1.5
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
    
    // Style the canvas to enable clicks
    renderer.domElement.style.position = 'absolute'
    renderer.domElement.style.top = '0'
    renderer.domElement.style.left = '0'
    renderer.domElement.style.width = '100%'
    renderer.domElement.style.height = '100%'
    renderer.domElement.style.pointerEvents = 'auto'
    renderer.domElement.style.cursor = 'pointer'
    
    container.appendChild(renderer.domElement)

    // Create grid with lines
    const gridWidth = 120   
    const gridDepth = 120
    const gridDivisions = 60  // Reduced from 150 for better performance

    // Create ONE big buffer for the grid
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
    grid.rotation.y = Math.PI / 7 // 30 degrees rotation for perspective
    scene.add(grid)

    // Create vertex points with colors
    const pointGeometry = new THREE.BufferGeometry()
    const pointMaterial = new THREE.PointsMaterial({
      size: vertexPointSize * 0.1,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true,
      alphaTest: 0.1,
      vertexColors: true // Enable vertex colors
    })

    // Create points at every grid intersection
    const pointsArray: number[] = []
    const colorsArray: number[] = []
    const pointsData: PointData[] = [] // Store point data for click detection
    
    // Calculate grid square size for positioning
    const gridSquareSize = gridWidth / gridDivisions // ~1.6 units
    const pushDownDistance = gridSquareSize * 1 // 2 times the square size
    
    for (let i = 0; i <= gridDivisions; i++) {
      for (let j = 0; j <= gridDivisions; j++) {
        const x = (j / gridDivisions) * gridWidth - gridWidth / 2
        const z = (i / gridDivisions) * gridDepth - gridDepth / 2
        pointsArray.push(x, 0, z) // Y starts at 0
        
        // Default color (Hyve accent color)
        colorsArray.push(0.498, 0.702, 0.745) // RGB of #7FB3BE
        
        // Store point data for distance calculations
        pointsData.push({ x, z, index: pointsData.length })
      }
    }

    pointGeometry.setAttribute('position', new THREE.Float32BufferAttribute(pointsArray, 3))
    pointGeometry.setAttribute('color', new THREE.Float32BufferAttribute(colorsArray, 3))
    
    const points = new THREE.Points(pointGeometry, pointMaterial)
    points.rotation.y = Math.PI / 7 // Rotate points with the grid

    scene.add(points)

    // Position camera for perspective view
    camera.position.set(0, 12, 35)  // Higher and further back for better coverage
    camera.lookAt(0, -3, -15)       // Look further down and deeper

    // Animation system for smooth movement
    const animationState = {
      targetPositions: new Float32Array(pointsData.length), // Target Y positions for each point
      velocities: new Float32Array(pointsData.length),      // Current velocity for each point
      isAnimating: false,
      animationId: null as number | null
    }
    
    // Initialize all targets to 0 (flat)
    animationState.targetPositions.fill(0)
    animationState.velocities.fill(0)



    // Create a map for fast grid vertex lookups
    const gridVertexMap = new Map<string, number[]>()
    
    // Build the lookup map once
    const buildGridVertexMap = () => {
      const gridPositions = gridGeometry.attributes.position.array as Float32Array
      
      for (let i = 0; i < gridPositions.length; i += 3) {
        const x = gridPositions[i]
        const z = gridPositions[i + 2]
        const key = `${x.toFixed(3)},${z.toFixed(3)}`
        
        if (!gridVertexMap.has(key)) {
          gridVertexMap.set(key, [])
        }
        gridVertexMap.get(key)!.push(i + 1) // Store Y coordinate indices
      }
    }
    
    buildGridVertexMap()

    // Animation loop for smooth physics-based movement
    const animate = () => {
      if (!animationState.isAnimating) return
      
      const pointPositions = pointGeometry.attributes.position.array as Float32Array
      const gridPositions = gridGeometry.attributes.position.array as Float32Array
      let hasMovement = false
      
      // ==== ANIMATION SPEED CONTROLS ====
      // Adjust these values to change animation speed:
      
      // Spring strength: How quickly points move toward their target
      // - Higher (0.5+) = Faster, snappier animation
      // - Lower (0.1-0.2) = Slower, more gentle animation
      const springStrength = 0.05
      
      // Damping: How much energy is lost each frame (0-1)
      // - Higher (0.9-0.95) = Less energy loss, more bounces, slower to settle
      // - Lower (0.7-0.85) = More energy loss, fewer bounces, faster to settle
      const damping = 0.85
      
      // Minimum thresholds: When to stop animating
      // - Higher values = Animation stops sooner (faster overall)
      // - Lower values = Animation continues longer (slower overall)
      const minVelocity = 0.001       // Stop when velocity is below this
      const minDistance = 0.002       // Stop when distance to target is below this
      
      // First pass: Update point positions only
      for (let i = 0; i < pointsData.length; i++) {
        const velocity = animationState.velocities[i]
        
        // Skip if this point isn't moving
        if (Math.abs(velocity) < minVelocity && 
            Math.abs(animationState.targetPositions[i] - pointPositions[i * 3 + 1]) < minDistance) {
          continue
        }
        
        const positionIndex = i * 3 + 1 // Y coordinate
        const currentY = pointPositions[positionIndex]
        const targetY = animationState.targetPositions[i]
        const distance = targetY - currentY
        
        // Apply spring force toward target
        const springForce = distance * springStrength
        animationState.velocities[i] = (velocity + springForce) * damping
        
        // Update position
        pointPositions[positionIndex] = currentY + animationState.velocities[i]
        hasMovement = true
      }
      
      // Second pass: Update grid vertices efficiently using the map
      if (hasMovement) {
        for (let i = 0; i < pointsData.length; i++) {
          const point = pointsData[i]
          const newY = pointPositions[i * 3 + 1]
          const key = `${point.x.toFixed(3)},${point.z.toFixed(3)}`
          
          const indices = gridVertexMap.get(key)
          if (indices) {
            for (const idx of indices) {
              gridPositions[idx] = newY
            }
          }
        }
        
        // Update geometry
        pointGeometry.attributes.position.needsUpdate = true
        gridGeometry.attributes.position.needsUpdate = true
        
        // Render
        renderer.render(scene, camera)
        
        // Continue animation
        animationState.animationId = requestAnimationFrame(animate)
      } else {
        animationState.isAnimating = false
        animationState.animationId = null
        console.log('🛑 Animation stopped - points settled')
      }
    }

    // Click detection setup
    const raycaster = new THREE.Raycaster()
    const mouse = new THREE.Vector2()

    // Click handler to create depression effect
    const handleClick = (event: MouseEvent) => {
      console.log('🔵 Canvas click detected!', { x: event.clientX, y: event.clientY })
      
      const rect = renderer.domElement.getBoundingClientRect()
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1
      
      raycaster.setFromCamera(mouse, camera)
      
      // Create a plane at y=0 for intersection
      const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0)
      const intersectPoint = new THREE.Vector3()
      
      if (raycaster.ray.intersectPlane(plane, intersectPoint)) {
        // Transform hit point to local grid space
        const localPoint = grid.worldToLocal(intersectPoint.clone())
        
        console.log('🔵 Hit point in local space:', { x: localPoint.x, z: localPoint.z })
        
        // Find the closest grid point
        let closestDistance = Infinity
        let closestIndex = -1
        
        pointsData.forEach((point, index) => {
          const distance = Math.sqrt(
            (point.x - localPoint.x) ** 2 + 
            (point.z - localPoint.z) ** 2
          )
          
          if (distance < closestDistance) {
            closestDistance = distance
            closestIndex = index
          }
        })
        
                if (closestIndex !== -1) {
          console.log('✅ Closest point found at index:', closestIndex, 'distance:', closestDistance.toFixed(2))
          
          // Get color array for points
          const colors = pointGeometry.attributes.color.array as Float32Array
          
          // Reset all colors to default
          for (let i = 0; i < pointsData.length; i++) {
            const colorIndex = i * 3
            colors[colorIndex] = 0.498     // R of #7FB3BE
            colors[colorIndex + 1] = 0.702 // G of #7FB3BE
            colors[colorIndex + 2] = 0.745 // B of #7FB3BE
          }
          
          // Target positions are always 0 (flat surface) - points will bounce back
          animationState.targetPositions.fill(0)
          
          // Get the clicked point coordinates
          const clickedPoint = pointsData[closestIndex]
          const influenceRadius = gridSquareSize * 5 // Affect points within 5 grid squares
          
          // Apply initial downward velocity for depression effect
          pointsData.forEach((point, index) => {
            const distance = Math.sqrt(
              (point.x - clickedPoint.x) ** 2 + 
              (point.z - clickedPoint.z) ** 2
            )
            
            if (distance <= influenceRadius) {
              // Calculate bell-shaped falloff using Gaussian-like curve
              const normalizedDistance = distance / influenceRadius // 0 to 1
              const bellCurve = Math.exp(-(normalizedDistance * normalizedDistance) * 6) // Gaussian bell shape
              
              // Apply downward velocity instead of setting target position
              // Negative velocity will push points down, then spring will pull them back to 0
              animationState.velocities[index] = -pushDownDistance * bellCurve * 2 // Strong initial push
              
              // Color the center point differently
              if (index === closestIndex) {
                const colorIndex = index * 3
                colors[colorIndex] = 1.0     // R - bright red
                colors[colorIndex + 1] = 0.3 // G - some green
                colors[colorIndex + 2] = 0.0 // B - no blue
              }
            }
          })
          
          // Update color attribute
          pointGeometry.attributes.color.needsUpdate = true
          
          // Start animation if not already running
          if (!animationState.isAnimating) {
            animationState.isAnimating = true
            console.log('🎬 Starting smooth animation with bounce physics')
            animate()
          }
          
          console.log('🔽 Depression animation started with radius:', influenceRadius.toFixed(2), 'units')
        }
      }
    }
    
    // Add click event listener
    renderer.domElement.addEventListener('click', handleClick, false)
    
    console.log('🎯 CustomMeshBackground initialized with smooth depression physics')

    // Initial render
    renderer.render(scene, camera)

    // Handle resize
    const handleResize = () => {
      if (mountRef.current) {
        const newWidth = mountRef.current.clientWidth
        const newHeight = mountRef.current.clientHeight
        camera.aspect = newWidth / newHeight
        camera.updateProjectionMatrix()
        renderer.setSize(newWidth, newHeight)
        renderer.render(scene, camera) // Re-render on resize
      }
    }
    
    window.addEventListener('resize', handleResize)

    // Store references
    sceneRef.current = {
      scene,
      camera,
      renderer,
      grid,
      points,
      animationState
    }

    // Cleanup
    return () => {
      console.log('🧹 Cleaning up CustomMeshBackground')
      window.removeEventListener('resize', handleResize)
      renderer.domElement.removeEventListener('click', handleClick)
      
      // Stop any running animation
      if (animationState.animationId) {
        cancelAnimationFrame(animationState.animationId)
        animationState.isAnimating = false
      }
      
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement)
      }
      
      // Clean up geometries and materials
      gridGeometry.dispose()
      pointGeometry.dispose()
      pointMaterial.dispose()
      lineMaterial.dispose()
      renderer.dispose()
      
      sceneRef.current = null
    }
  }, [enabled, vertexPointSize])

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
        }} 
      />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
} 