import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

// Vertex shader - handles mesh deformation
const vertexShader = `
  uniform float uTime;
  uniform vec2 uRippleCenter;
  uniform float uRippleTime;
  uniform float uRippleStrength;
  
  varying vec2 vUv;
  varying float vElevation;
  varying float vRipple;
  
  void main() {
    vUv = uv;
    vec3 pos = position;
    
    // Ambient floating motion - gentle sine waves
    float wave1 = sin(pos.x * 2.0 + uTime * 0.8) * 0.15;
    float wave2 = sin(pos.y * 2.5 + uTime * 0.6) * 0.12;
    float wave3 = cos(pos.x * 1.5 + pos.y * 1.5 + uTime * 0.5) * 0.08;
    
    float ambientWave = wave1 + wave2 + wave3;
    
    // Ripple effect from click
    float dist = distance(uv, uRippleCenter);
    float rippleRadius = uRippleTime * 1.2;
    float rippleWidth = 0.15;
    float ripple = 0.0;
    
    if (uRippleStrength > 0.0) {
      ripple = smoothstep(rippleRadius - rippleWidth, rippleRadius, dist) 
             - smoothstep(rippleRadius, rippleRadius + rippleWidth, dist);
      ripple *= uRippleStrength * sin(dist * 30.0 - uRippleTime * 8.0) * 0.5;
      ripple *= 1.0 - smoothstep(0.0, 1.5, uRippleTime);
    }
    
    pos.z += ambientWave + ripple;
    
    vElevation = ambientWave;
    vRipple = ripple;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

// Fragment shader - handles colors and grid visualization
const fragmentShader = `
  uniform float uTime;
  uniform vec2 uRippleCenter;
  uniform float uRippleTime;
  uniform float uRippleStrength;
  uniform vec3 uBaseColor;
  uniform vec3 uHighlightColor;
  uniform vec3 uRippleColor;
  
  varying vec2 vUv;
  varying float vElevation;
  varying float vRipple;
  
  void main() {
    // Grid pattern - sensor nodes
    vec2 grid = fract(vUv * 10.0);
    float gridLine = smoothstep(0.02, 0.05, grid.x) * smoothstep(0.02, 0.05, grid.y);
    gridLine *= smoothstep(0.02, 0.05, 1.0 - grid.x) * smoothstep(0.02, 0.05, 1.0 - grid.y);
    
    // Node points at intersections
    vec2 nodePos = fract(vUv * 10.0) - 0.5;
    float nodeDist = length(nodePos);
    float node = 1.0 - smoothstep(0.08, 0.15, nodeDist);
    
    // Base membrane color with elevation shading
    vec3 baseCol = mix(uBaseColor * 0.7, uBaseColor, vElevation * 2.0 + 0.5);
    
    // Ripple color effect
    float dist = distance(vUv, uRippleCenter);
    float rippleRadius = uRippleTime * 1.2;
    float rippleIntensity = 0.0;
    
    if (uRippleStrength > 0.0) {
      rippleIntensity = 1.0 - smoothstep(0.0, rippleRadius + 0.1, dist);
      rippleIntensity *= uRippleStrength;
      rippleIntensity *= 1.0 - smoothstep(0.0, 2.0, uRippleTime);
    }
    
    // Combine colors
    vec3 color = baseCol;
    color = mix(color, uHighlightColor, node * 0.6);
    color = mix(color, uRippleColor, rippleIntensity * 0.8);
    color += vec3(abs(vRipple) * 2.0);
    
    // Add subtle grid lines
    color = mix(color * 0.85, color, gridLine);
    
    // Edge glow
    float edge = smoothstep(0.0, 0.1, vUv.x) * smoothstep(0.0, 0.1, vUv.y);
    edge *= smoothstep(0.0, 0.1, 1.0 - vUv.x) * smoothstep(0.0, 0.1, 1.0 - vUv.y);
    
    float alpha = 0.85 + node * 0.15;
    alpha *= edge * 0.3 + 0.7;
    
    gl_FragColor = vec4(color, alpha);
  }
`;

export default function HapticMatrixHero() {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const materialRef = useRef(null);
  const frameRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      45,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 5);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create the haptic matrix mesh
    const geometry = new THREE.PlaneGeometry(3.5, 3.5, 64, 64);
    
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uRippleCenter: { value: new THREE.Vector2(0.5, 0.5) },
        uRippleTime: { value: 0 },
        uRippleStrength: { value: 0 },
        uBaseColor: { value: new THREE.Color(0x0d4f4f) },
        uHighlightColor: { value: new THREE.Color(0x2dd4bf) },
        uRippleColor: { value: new THREE.Color(0x5eead4) }
      },
      transparent: true,
      side: THREE.DoubleSide
    });
    materialRef.current = material;

    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = -0.3;
    mesh.rotation.y = 0.2;
    scene.add(mesh);

    // Raycaster for click detection
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handleClick = (event) => {
      const rect = containerRef.current.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObject(mesh);

      if (intersects.length > 0) {
        const uv = intersects[0].uv;
        material.uniforms.uRippleCenter.value.set(uv.x, uv.y);
        material.uniforms.uRippleTime.value = 0;
        material.uniforms.uRippleStrength.value = 1;
      }
    };

    containerRef.current.addEventListener('click', handleClick);
    containerRef.current.addEventListener('touchstart', (e) => {
      e.preventDefault();
      const touch = e.touches[0];
      handleClick({ clientX: touch.clientX, clientY: touch.clientY });
    });

    // Animation loop
    const clock = new THREE.Clock();
    
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      
      const elapsed = clock.getElapsedTime();
      material.uniforms.uTime.value = elapsed;
      
      // Update ripple
      if (material.uniforms.uRippleStrength.value > 0) {
        material.uniforms.uRippleTime.value += 0.016;
        if (material.uniforms.uRippleTime.value > 2.5) {
          material.uniforms.uRippleStrength.value = 0;
        }
      }
      
      // Gentle rotation
      mesh.rotation.y = 0.2 + Math.sin(elapsed * 0.3) * 0.1;
      mesh.rotation.x = -0.3 + Math.cos(elapsed * 0.25) * 0.05;
      
      renderer.render(scene, camera);
    };
    
    animate();
    setIsLoaded(true);

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameRef.current);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-teal-900/20 via-transparent to-transparent" />
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl" />
      </div>
      
      {/* Three.js container */}
      <div 
        ref={containerRef} 
        className="absolute inset-0 cursor-pointer"
        style={{ touchAction: 'none' }}
      />
      
      {/* UI Overlay */}
      <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-8 md:p-12">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-lg flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-6 h-6 text-slate-950" fill="currentColor">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" fill="none"/>
            </svg>
          </div>
          <span className="text-white font-semibold tracking-wide">HYVE DYNAMICS</span>
        </div>
        
        {/* Main content */}
        <div className="max-w-xl">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
            Haptic
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400">
              Matrix
            </span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl mb-6 leading-relaxed">
            Ultra-thin flexible sensor arrays that feel pressure, strain, and temperature. 
            Click anywhere on the matrix to simulate touch input.
          </p>
          <div className="flex gap-4 pointer-events-auto">
            <button className="px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-950 font-semibold rounded-lg hover:from-teal-400 hover:to-cyan-400 transition-all duration-300 shadow-lg shadow-teal-500/25">
              Explore Technology
            </button>
            <button className="px-6 py-3 border border-slate-600 text-slate-300 rounded-lg hover:border-teal-500 hover:text-teal-400 transition-all duration-300">
              Contact Us
            </button>
          </div>
        </div>
        
        {/* Bottom info */}
        <div className="flex justify-between items-end">
          <div className="text-slate-500 text-sm">
            <span className="text-teal-400">10×10</span> Sensor Array · <span className="text-teal-400">0.33mm</span> Thickness
          </div>
          <div className={`text-slate-500 text-sm transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
            Interactive Demo
          </div>
        </div>
      </div>
      
      {/* Loading state */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-950">
          <div className="w-8 h-8 border-2 border-teal-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}
