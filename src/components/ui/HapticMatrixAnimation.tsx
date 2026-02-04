import { useEffect, useRef, useState, useCallback } from 'react'
import * as THREE from 'three'

// Vertex shader - handles mesh deformation with ripple and pressure
const vertexShader = `
  uniform float uTime;
  uniform vec2 uRippleCenter;
  uniform float uRippleTime;
  uniform float uRippleStrength;
  
  varying vec2 vUv;
  varying float vElevation;
  varying float vRipple;
  varying float vPressure;
  
  void main() {
    vUv = uv;
    vec3 pos = position;
    
    // Ambient floating motion - gentle sine waves
    float wave1 = sin(pos.x * 2.0 + uTime * 0.8) * 0.12;
    float wave2 = sin(pos.y * 2.5 + uTime * 0.6) * 0.10;
    float wave3 = cos(pos.x * 1.5 + pos.y * 1.5 + uTime * 0.5) * 0.06;
    
    float ambientWave = wave1 + wave2 + wave3;
    
    // Ripple effect from click
    float dist = distance(uv, uRippleCenter);
    float rippleRadius = uRippleTime * 0.45;
    float rippleWidth = 0.15;
    float ripple = 0.0;
    float pressure = 0.0;
    
    if (uRippleStrength > 0.0) {
      // Outward propagating ring
      ripple = smoothstep(rippleRadius - rippleWidth, rippleRadius, dist) 
             - smoothstep(rippleRadius, rippleRadius + rippleWidth, dist);
      ripple *= uRippleStrength * sin(dist * 20.0 - uRippleTime * 4.0) * 0.5;
      ripple *= 1.0 - smoothstep(0.0, 3.5, uRippleTime);
      
      // Pressure field - strongest at center, fading outward
      pressure = 1.0 - smoothstep(0.0, rippleRadius + 0.25, dist);
      pressure *= uRippleStrength;
      pressure *= 1.0 - smoothstep(0.0, 4.0, uRippleTime);
      
      // Add some oscillation to pressure
      pressure *= 0.6 + 0.4 * sin(uRippleTime * 1.5);
    }
    
    pos.z += ambientWave + ripple;
    
    vElevation = ambientWave;
    vRipple = ripple;
    vPressure = pressure + ambientWave * 0.3;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`

// Fragment shader with CFD/FEA jet colormap
const fragmentShader = `
  uniform float uTime;
  uniform vec2 uRippleCenter;
  uniform float uRippleTime;
  uniform float uRippleStrength;
  
  varying vec2 vUv;
  varying float vElevation;
  varying float vRipple;
  varying float vPressure;
  
  // Classic "Jet" colormap
  vec3 jetColormap(float t) {
    t = clamp(t, 0.0, 1.0);
    
    vec3 color;
    
    if (t < 0.25) {
      float s = t / 0.25;
      color = vec3(0.0, s, 1.0);
    } else if (t < 0.5) {
      float s = (t - 0.25) / 0.25;
      color = vec3(0.0, 1.0, 1.0 - s);
    } else if (t < 0.75) {
      float s = (t - 0.5) / 0.25;
      color = vec3(s, 1.0, 0.0);
    } else {
      float s = (t - 0.75) / 0.25;
      color = vec3(1.0, 1.0 - s, 0.0);
    }
    
    return color;
  }
  
  void main() {
    // Grid pattern
    vec2 grid = fract(vUv * 10.0);
    float gridLine = smoothstep(0.02, 0.05, grid.x) * smoothstep(0.02, 0.05, grid.y);
    gridLine *= smoothstep(0.02, 0.05, 1.0 - grid.x) * smoothstep(0.02, 0.05, 1.0 - grid.y);
    
    // Pressure for colormap
    float pressureNorm = vPressure * 0.5 + 0.5;
    pressureNorm = clamp(pressureNorm, 0.0, 1.0);
    
    vec3 pressureColor = jetColormap(pressureNorm);
    // Base color: #3F485B (129, 183, 194) normalized
    vec3 baseColor = vec3(0.506, 0.718, 0.761);
    
    float activity = abs(vPressure) + abs(vRipple) * 2.0;
    activity = clamp(activity, 0.0, 1.0);
    
    vec3 color = mix(baseColor, pressureColor, activity * 0.9 + 0.1);
    
    // Grid lines slightly darker
    color = mix(color * 0.7, color, gridLine);
    
    // Edge fade
    float edge = smoothstep(0.0, 0.08, vUv.x) * smoothstep(0.0, 0.08, vUv.y);
    edge *= smoothstep(0.0, 0.08, 1.0 - vUv.x) * smoothstep(0.0, 0.08, 1.0 - vUv.y);
    
    float alpha = 0.9;
    alpha *= edge * 0.4 + 0.6;
    
    color += vec3(0.1, 0.05, 0.0) * max(0.0, vPressure) * 0.5;
    
    gl_FragColor = vec4(color, alpha);
  }
`

interface SensorData {
  element: HTMLDivElement
  row: number
  col: number
  uvX: number
  uvY: number
}

interface HapticMatrixAnimationProps {
  className?: string
}

// Smoothstep utility function
function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)))
  return t * t * (3 - 2 * t)
}

// Get jet colormap color as CSS
function getJetColor(t: number): string {
  t = Math.max(0, Math.min(1, t))

  let r: number, g: number, b: number

  if (t < 0.25) {
    const s = t / 0.25
    r = 0
    g = s
    b = 1
  } else if (t < 0.5) {
    const s = (t - 0.25) / 0.25
    r = 0
    g = 1
    b = 1 - s
  } else if (t < 0.75) {
    const s = (t - 0.5) / 0.25
    r = s
    g = 1
    b = 0
  } else {
    const s = (t - 0.75) / 0.25
    r = 1
    g = 1 - s
    b = 0
  }

  return `rgb(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)})`
}

export const HapticMatrixAnimation: React.FC<HapticMatrixAnimationProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const sensorContainerRef = useRef<HTMLDivElement>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const meshRef = useRef<THREE.Mesh | null>(null)
  const materialRef = useRef<THREE.ShaderMaterial | null>(null)
  const frameRef = useRef<number>(0)
  const clockRef = useRef<THREE.Clock | null>(null)
  const sensorElementsRef = useRef<SensorData[]>([])
  const rippleCenterRef = useRef({ x: 0.5, y: 0.5 })
  const rippleTimeRef = useRef(0)
  const rippleActiveRef = useRef(false)

  const [isLoaded, setIsLoaded] = useState(false)

  const GRID_SIZE = 10

  // Calculate pressure value at a UV position
  const calculatePressure = useCallback((uvX: number, uvY: number, centerX: number, centerY: number, time: number) => {
    const dist = Math.sqrt((uvX - centerX) ** 2 + (uvY - centerY) ** 2)
    const rippleRadius = time * 0.45

    let pressure = 1.0 - smoothstep(0, rippleRadius + 0.25, dist)
    pressure *= 1.0 - smoothstep(0, 4.0, time)
    pressure *= 0.6 + 0.4 * Math.sin(time * 1.5)

    return pressure
  }, [])

  // Update sensor positions based on 3D projection
  const updateSensorPositions = useCallback(() => {
    if (!meshRef.current || !cameraRef.current || !materialRef.current || !containerRef.current) return

    const tempVec = new THREE.Vector3()
    const mesh = meshRef.current
    const camera = cameraRef.current
    const material = materialRef.current
    const container = containerRef.current
    const rect = container.getBoundingClientRect()

    sensorElementsRef.current.forEach(sensor => {
      const x = (sensor.uvX - 0.5) * 3.5
      const y = (sensor.uvY - 0.5) * 3.5

      const time = material.uniforms.uTime.value
      const wave1 = Math.sin(x * 2.0 + time * 0.8) * 0.12
      const wave2 = Math.sin(y * 2.5 + time * 0.6) * 0.1
      const wave3 = Math.cos(x * 1.5 + y * 1.5 + time * 0.5) * 0.06
      const z = wave1 + wave2 + wave3

      tempVec.set(x, y, z)
      tempVec.applyEuler(mesh.rotation)
      tempVec.add(mesh.position)
      tempVec.project(camera)

      const screenX = (tempVec.x * 0.5 + 0.5) * rect.width
      const screenY = (-tempVec.y * 0.5 + 0.5) * rect.height

      sensor.element.style.left = `${screenX}px`
      sensor.element.style.top = `${screenY}px`
    })
  }, [])

  // Update sensor values based on ripple
  const updateSensorValues = useCallback(() => {
    if (!rippleActiveRef.current) {
      sensorElementsRef.current.forEach(sensor => {
        sensor.element.classList.remove('active')
      })
      return
    }

    const rippleRadius = rippleTimeRef.current * 0.45

    sensorElementsRef.current.forEach(sensor => {
      const dist = Math.sqrt(
        (sensor.uvX - rippleCenterRef.current.x) ** 2 + (sensor.uvY - rippleCenterRef.current.y) ** 2
      )

      const shouldBeActive = dist < rippleRadius + 0.1 && rippleTimeRef.current < 4.5

      if (shouldBeActive) {
        const pressure = calculatePressure(
          sensor.uvX,
          sensor.uvY,
          rippleCenterRef.current.x,
          rippleCenterRef.current.y,
          rippleTimeRef.current
        )

        const kPa = pressure * 5.0
        const noise = (Math.random() - 0.5) * 0.3
        const displayValue = Math.max(0, kPa + noise)

        sensor.element.textContent = displayValue.toFixed(2)
        sensor.element.classList.add('active')
        sensor.element.style.color = getJetColor(displayValue / 5.0)
      } else if (rippleTimeRef.current > 4.0) {
        sensor.element.classList.remove('active')
      }
    })
  }, [calculatePressure])

  useEffect(() => {
    if (!containerRef.current || !sensorContainerRef.current) return

    const container = containerRef.current
    const sensorContainer = sensorContainerRef.current

    // Create sensor value DOM elements
    for (let row = 0; row < GRID_SIZE; row++) {
      for (let col = 0; col < GRID_SIZE; col++) {
        const el = document.createElement('div')
        el.className = 'sensor-value'
        el.textContent = '0.00'
        sensorContainer.appendChild(el)
        sensorElementsRef.current.push({
          element: el,
          row,
          col,
          uvX: (col + 0.5) / GRID_SIZE,
          uvY: (row + 0.5) / GRID_SIZE,
        })
      }
    }

    // Scene setup
    const scene = new THREE.Scene()
    sceneRef.current = scene

    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100)
    camera.position.set(0, 0, 6)
    cameraRef.current = camera

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    container.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Create haptic matrix mesh
    const geometry = new THREE.PlaneGeometry(3.5, 3.5, 64, 64)

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uRippleCenter: { value: new THREE.Vector2(0.5, 0.5) },
        uRippleTime: { value: 0 },
        uRippleStrength: { value: 0 },
      },
      transparent: true,
      side: THREE.DoubleSide,
    })
    materialRef.current = material

    const mesh = new THREE.Mesh(geometry, material)
    mesh.rotation.x = -0.3
    mesh.rotation.y = 0.2
    scene.add(mesh)
    meshRef.current = mesh

    // Raycaster for click detection
    const raycaster = new THREE.Raycaster()
    const mouse = new THREE.Vector2()

    const handleInteraction = (clientX: number, clientY: number) => {
      const rect = container.getBoundingClientRect()
      mouse.x = ((clientX - rect.left) / rect.width) * 2 - 1
      mouse.y = -((clientY - rect.top) / rect.height) * 2 + 1

      raycaster.setFromCamera(mouse, camera)
      const intersects = raycaster.intersectObject(mesh)

      if (intersects.length > 0 && intersects[0].uv) {
        const uv = intersects[0].uv
        material.uniforms.uRippleCenter.value.set(uv.x, uv.y)
        material.uniforms.uRippleTime.value = 0
        material.uniforms.uRippleStrength.value = 1

        rippleCenterRef.current = { x: uv.x, y: uv.y }
        rippleTimeRef.current = 0
        rippleActiveRef.current = true

        sensorElementsRef.current.forEach(sensor => {
          sensor.element.classList.remove('active')
        })
      }
    }

    const handleClick = (e: MouseEvent) => {
      handleInteraction(e.clientX, e.clientY)
    }

    const handleTouch = (e: TouchEvent) => {
      e.preventDefault()
      const touch = e.touches[0]
      handleInteraction(touch.clientX, touch.clientY)
    }

    container.addEventListener('click', handleClick)
    container.addEventListener('touchstart', handleTouch, { passive: false })

    // Animation loop
    const clock = new THREE.Clock()
    clockRef.current = clock

    const animate = () => {
      frameRef.current = requestAnimationFrame(animate)

      const elapsed = clock.getElapsedTime()
      material.uniforms.uTime.value = elapsed

      if (material.uniforms.uRippleStrength.value > 0) {
        material.uniforms.uRippleTime.value += 0.016
        rippleTimeRef.current += 0.016

        if (material.uniforms.uRippleTime.value > 5.0) {
          material.uniforms.uRippleStrength.value = 0
          rippleActiveRef.current = false
        }
      }

      // Gentle rotation
      mesh.rotation.y = 0.2 + Math.sin(elapsed * 0.3) * 0.1
      mesh.rotation.x = -0.3 + Math.cos(elapsed * 0.25) * 0.05

      updateSensorPositions()
      updateSensorValues()

      renderer.render(scene, camera)
    }

    animate()
    setIsLoaded(true)

    // Handle resize
    const handleResize = () => {
      if (!container) return
      const width = container.clientWidth
      const height = container.clientHeight
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }

    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      container.removeEventListener('click', handleClick)
      container.removeEventListener('touchstart', handleTouch)
      cancelAnimationFrame(frameRef.current)

      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }

      // Clear sensor elements
      sensorElementsRef.current.forEach(sensor => {
        if (sensorContainer.contains(sensor.element)) {
          sensorContainer.removeChild(sensor.element)
        }
      })
      sensorElementsRef.current = []

      geometry.dispose()
      material.dispose()
      renderer.dispose()
    }
  }, [updateSensorPositions, updateSensorValues])

  return (
    <div className={`relative w-full h-full ${className}`}>
      {/* Three.js canvas container */}
      <div ref={containerRef} className="absolute inset-0 cursor-pointer" style={{ touchAction: 'none' }} />

      {/* Sensor values overlay */}
      <div ref={sensorContainerRef} className="absolute inset-0 pointer-events-none" />

      {/* Loading state */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-hyve-accent border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Sensor value styles */}
      <style>{`
        .sensor-value {
          position: absolute;
          font-family: 'SF Mono', 'Consolas', 'Monaco', monospace;
          font-size: 9px;
          font-weight: 600;
          color: white;
          text-shadow: 0 0 4px rgba(0,0,0,0.8), 0 0 8px rgba(0,0,0,0.5);
          opacity: 0;
          transform: translate(-50%, -50%) scale(0.5);
          transition: opacity 0.15s ease-out, transform 0.15s ease-out;
          white-space: nowrap;
          pointer-events: none;
        }
        
        .sensor-value.active {
          opacity: 1;
          transform: translate(-50%, -50%) scale(1);
        }
        
        @media (min-width: 768px) {
          .sensor-value {
            font-size: 10px;
          }
        }
      `}</style>
    </div>
  )
}
