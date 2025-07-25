import React, { useEffect, useRef } from 'react'

interface CustomMeshBackgroundProps {
  enabled?: boolean
  className?: string
  children?: React.ReactNode
  vertexPointSize?: number
}

/**
 * 🌐 CUSTOM MESH GRID BACKGROUND
 * 
 * Creates a static perspective grid that extends to the horizon.
 * Beautiful, clean, and performant mesh background.
 * 
 * Features:
 * - Organized grid pattern
 * - Perspective view extending to horizon
 * - Hyve brand colors
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

    // Create vertex points
    const pointGeometry = new THREE.BufferGeometry()
    const pointMaterial = new THREE.PointsMaterial({
      color: 0x7FB3BE, // Same color as lines
      size: vertexPointSize * 0.1,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true,
      alphaTest: 0.1,
      vertexColors: false
    })

    // Create points at every grid intersection
    const pointsArray = []
    for (let i = 0; i <= gridDivisions; i++) {
      for (let j = 0; j <= gridDivisions; j++) {
        const x = (j / gridDivisions) * gridWidth - gridWidth / 2
        const z = (i / gridDivisions) * gridDepth - gridDepth / 2
        pointsArray.push(x, 0, z)
      }
    }

    pointGeometry.setAttribute('position', new THREE.Float32BufferAttribute(pointsArray, 3))
    const points = new THREE.Points(pointGeometry, pointMaterial)
    points.rotation.y = Math.PI / 7 // Rotate points with the grid

    scene.add(points)

    // Position camera for perspective view
    camera.position.set(0, 12, 35)  // Higher and further back for better coverage
    camera.lookAt(0, -3, -15)       // Look further down and deeper

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