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
      transparent: true,
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
    
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)
      
      const elapsedTime = clock.getElapsedTime()
      
      // Gentle wave motion
      horizontalLines.children.forEach((line: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
        const positions = line.geometry.attributes.position.array
        for (let i = 1; i < positions.length; i += 3) {
          const x = positions[i - 1]
          const z = positions[i + 1]
          // Wave equation
          positions[i] = Math.sin(x * 0.05 + elapsedTime * 0.5) * 0.3 +
                        Math.sin(z * 0.05 + elapsedTime * 0.3) * 0.2
        }
        line.geometry.attributes.position.needsUpdate = true
      })

      verticalLines.children.forEach((line: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
        const positions = line.geometry.attributes.position.array
        for (let i = 1; i < positions.length; i += 3) {
          const x = positions[i - 1]
          const z = positions[i + 1]
          // Same wave equation for consistency
          positions[i] = Math.sin(x * 0.05 + elapsedTime * 0.5) * 0.3 +
                        Math.sin(z * 0.05 + elapsedTime * 0.3) * 0.2
        }
        line.geometry.attributes.position.needsUpdate = true
      })

      // Animate vertex points with same wave motion
      vertexPoints.children.forEach((pointsObject: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
        const positions = pointsObject.geometry.attributes.position.array
        for (let i = 1; i < positions.length; i += 3) {
          const x = positions[i - 1]
          const z = positions[i + 1]
          // Same wave equation as lines
          positions[i] = Math.sin(x * 0.05 + elapsedTime * 0.5) * 0.3 +
                        Math.sin(z * 0.05 + elapsedTime * 0.3) * 0.2
        }
        pointsObject.geometry.attributes.position.needsUpdate = true
      })
      
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
      animationFrameId
    }

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      if (sceneRef.current?.animationFrameId) {
        cancelAnimationFrame(sceneRef.current.animationFrameId)
      }
      
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement)
      }
      
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
  }, [enabled])

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
          background: 'linear-gradient(to bottom, #102542 0%, #0a1628 100%)' // Hyve gradient
        }} 
      />
      <div className="relative z-10">{children}</div>
    </div>
  )
} 