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
    const gridWidth = 240
    const gridDepth = 240
    const gridDivisions = 150

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
    const pushDownDistance = gridSquareSize * 1.1 // 2 times the square size
    
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

    // Helper function to update grid line vertices that correspond to a specific point
    const updateGridVerticesForPoint = (
      pointX: number, 
      pointZ: number, 
      newY: number, 
      gridPositions: Float32Array
    ) => {
      // Find all grid line vertices that match this point's X,Z coordinates
      for (let i = 0; i < gridPositions.length; i += 3) {
        const vertexX = gridPositions[i]
        const vertexZ = gridPositions[i + 2]
        
        // Check if this vertex matches our point (with small tolerance for floating point)
        const tolerance = 0.001
        if (Math.abs(vertexX - pointX) < tolerance && Math.abs(vertexZ - pointZ) < tolerance) {
          gridPositions[i + 1] = newY // Update Y coordinate
        }
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
          
          // Get position and color arrays for points
          const pointPositions = pointGeometry.attributes.position.array as Float32Array
          const colors = pointGeometry.attributes.color.array as Float32Array
          
          // Get position array for grid lines
          const gridPositions = gridGeometry.attributes.position.array as Float32Array
          
          // Reset all points to default state first
          for (let i = 0; i < pointsData.length; i++) {
            const colorIndex = i * 3
            const positionIndex = i * 3 + 1 // Y coordinate
            
            // Reset color to default
            colors[colorIndex] = 0.498     // R of #7FB3BE
            colors[colorIndex + 1] = 0.702 // G of #7FB3BE
            colors[colorIndex + 2] = 0.745 // B of #7FB3BE
            
            // Reset Y position to 0
            pointPositions[positionIndex] = 0
          }
          
          // Reset all grid line vertices to Y = 0
          for (let i = 1; i < gridPositions.length; i += 3) {
            gridPositions[i] = 0 // Y coordinate
          }
          
          // Get the clicked point coordinates
          const clickedPoint = pointsData[closestIndex]
          const influenceRadius = gridSquareSize * 5 // Affect points within 4 grid squares
          
          // Apply depression effect to points within influence radius
          pointsData.forEach((point, index) => {
            const distance = Math.sqrt(
              (point.x - clickedPoint.x) ** 2 + 
              (point.z - clickedPoint.z) ** 2
            )
            
            if (distance <= influenceRadius) {
              // Calculate falloff: closer points move down more
              const falloff = Math.max(0, 1 - (distance / influenceRadius))
              const depression = -pushDownDistance * falloff
              
              // Update point position
              const positionIndex = index * 3 + 1 // Y coordinate
              pointPositions[positionIndex] = depression
              
              // Color the center point differently
              if (index === closestIndex) {
                const colorIndex = index * 3
                colors[colorIndex] = 1.0     // R - bright red
                colors[colorIndex + 1] = 0.3 // G - some green
                colors[colorIndex + 2] = 0.0 // B - no blue
              }
              
                             // Update corresponding grid line vertices
               // Each point corresponds to multiple line vertices, so we need to find and update them
               updateGridVerticesForPoint(point.x, point.z, depression, gridPositions)
            }
          })
          
          // Update all attributes
          pointGeometry.attributes.color.needsUpdate = true
          pointGeometry.attributes.position.needsUpdate = true
          gridGeometry.attributes.position.needsUpdate = true
          
          console.log('🔽 Depression created with radius:', influenceRadius.toFixed(2), 'units')
          
          // Re-render
          renderer.render(scene, camera)
        }
      }
    }
    
    // Add click event listener
    renderer.domElement.addEventListener('click', handleClick, false)
    
    console.log('🎯 CustomMeshBackground initialized with point highlighting')

    // Single render - no animation needed
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
      points
    }

    // Cleanup
    return () => {
      console.log('🧹 Cleaning up CustomMeshBackground')
      window.removeEventListener('resize', handleResize)
      renderer.domElement.removeEventListener('click', handleClick)
      
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