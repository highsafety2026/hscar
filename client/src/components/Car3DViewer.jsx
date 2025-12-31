import { useRef, useEffect, useState } from 'react'
import * as THREE from 'three'

const FallbackCarIcon = ({ type, color, size }) => {
  const scale = size / 100
  const icons = {
    sedan: (
      <svg viewBox="0 0 100 50" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 80 * scale, height: 40 * scale }}>
        <path d="M15 35 L25 35 L30 25 L45 18 L70 18 L80 25 L85 35 L15 35" fill={color} stroke="#0B1F3A" strokeWidth="2"/>
        <path d="M35 18 L40 10 L60 10 L65 18" fill={color} stroke="#0B1F3A" strokeWidth="2"/>
        <circle cx="25" cy="38" r="7" fill="#333" stroke="#0B1F3A" strokeWidth="2"/>
        <circle cx="75" cy="38" r="7" fill="#333" stroke="#0B1F3A" strokeWidth="2"/>
        <rect x="38" y="12" width="12" height="6" rx="1" fill="#87CEEB" opacity="0.7"/>
        <rect x="52" y="12" width="10" height="6" rx="1" fill="#87CEEB" opacity="0.7"/>
      </svg>
    ),
    suv: (
      <svg viewBox="0 0 100 55" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 80 * scale, height: 44 * scale }}>
        <path d="M12 40 L20 40 L25 28 L35 15 L75 15 L85 28 L90 40 L12 40" fill={color} stroke="#0B1F3A" strokeWidth="2"/>
        <path d="M38 15 L38 8 L72 8 L72 15" fill={color} stroke="#0B1F3A" strokeWidth="2"/>
        <circle cx="25" cy="44" r="9" fill="#333" stroke="#0B1F3A" strokeWidth="2"/>
        <circle cx="77" cy="44" r="9" fill="#333" stroke="#0B1F3A" strokeWidth="2"/>
        <rect x="40" y="10" width="10" height="5" rx="1" fill="#87CEEB" opacity="0.7"/>
        <rect x="52" y="10" width="18" height="5" rx="1" fill="#87CEEB" opacity="0.7"/>
      </svg>
    ),
    classic: (
      <svg viewBox="0 0 100 50" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 80 * scale, height: 40 * scale }}>
        <path d="M10 35 L18 35 L22 28 L30 18 L70 18 L78 28 L82 35 L90 35 L90 38 L10 38 L10 35" fill={color} stroke="#0B1F3A" strokeWidth="2"/>
        <path d="M32 18 L35 8 L65 8 L68 18" fill={color} stroke="#0B1F3A" strokeWidth="2"/>
        <circle cx="22" cy="40" r="8" fill="#333" stroke="#0B1F3A" strokeWidth="2"/>
        <circle cx="78" cy="40" r="8" fill="#333" stroke="#0B1F3A" strokeWidth="2"/>
        <rect x="38" y="10" width="10" height="8" rx="2" fill="#87CEEB" opacity="0.7"/>
        <rect x="52" y="10" width="13" height="8" rx="2" fill="#87CEEB" opacity="0.7"/>
        <circle cx="12" cy="32" r="3" fill="#FFD700"/>
        <circle cx="88" cy="32" r="3" fill="#FF4444"/>
      </svg>
    ),
    luxury: (
      <svg viewBox="0 0 100 50" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 80 * scale, height: 40 * scale }}>
        <path d="M8 35 L18 35 L22 25 L35 15 L75 15 L88 25 L92 35 L8 35" fill={color} stroke="#0B1F3A" strokeWidth="2"/>
        <path d="M38 15 L42 6 L68 6 L72 15" fill={color} stroke="#0B1F3A" strokeWidth="2"/>
        <circle cx="22" cy="38" r="7" fill="#222" stroke="#C89D2A" strokeWidth="2"/>
        <circle cx="78" cy="38" r="7" fill="#222" stroke="#C89D2A" strokeWidth="2"/>
        <rect x="44" y="8" width="8" height="7" rx="1" fill="#1a1a2e" opacity="0.8"/>
        <rect x="54" y="8" width="15" height="7" rx="1" fill="#1a1a2e" opacity="0.8"/>
        <path d="M50 2 L53 6 L50 5 L47 6 Z" fill="#C89D2A"/>
      </svg>
    ),
    vip: (
      <svg viewBox="0 0 100 50" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 80 * scale, height: 40 * scale }}>
        <path d="M5 32 L15 32 L20 22 L40 12 L80 12 L92 22 L95 32 L5 32" fill={color} stroke="#0B1F3A" strokeWidth="2"/>
        <path d="M42 12 L45 5 L75 5 L78 12" fill={color} stroke="#0B1F3A" strokeWidth="2"/>
        <circle cx="20" cy="36" r="8" fill="#111" stroke="#C89D2A" strokeWidth="3"/>
        <circle cx="80" cy="36" r="8" fill="#111" stroke="#C89D2A" strokeWidth="3"/>
        <rect x="48" y="7" width="6" height="5" rx="1" fill="#111" opacity="0.9"/>
        <rect x="56" y="7" width="18" height="5" rx="1" fill="#111" opacity="0.9"/>
        <path d="M50 0 L54 5 L50 3 L46 5 Z" fill="#C89D2A"/>
        <path d="M7 28 L12 28" stroke="#C89D2A" strokeWidth="2"/>
        <path d="M88 28 L93 28" stroke="#FF4444" strokeWidth="2"/>
      </svg>
    )
  }
  return (
    <div style={{ width: size, height: size, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {icons[type] || icons.sedan}
    </div>
  )
}

function Car3DViewer({ type = 'sedan', color = '#4285F4', size = 100, isSelected = false }) {
  const containerRef = useRef(null)
  const rendererRef = useRef(null)
  const sceneRef = useRef(null)
  const cameraRef = useRef(null)
  const carRef = useRef(null)
  const frameRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false)
  const [webglSupported, setWebglSupported] = useState(true)
  const rotationRef = useRef(0)

  useEffect(() => {
    if (!containerRef.current) return

    try {
      const canvas = document.createElement('canvas')
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
      if (!gl) {
        setWebglSupported(false)
        return
      }
    } catch (e) {
      setWebglSupported(false)
      return
    }

    let renderer
    try {
      const scene = new THREE.Scene()
      sceneRef.current = scene
      scene.background = null

      const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000)
      cameraRef.current = camera

      renderer = new THREE.WebGLRenderer({ 
        antialias: true, 
        alpha: true,
        powerPreference: 'low-power'
      })
      renderer.setSize(size, size)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.setClearColor(0x000000, 0)
      rendererRef.current = renderer
      containerRef.current.appendChild(renderer.domElement)

      const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
      scene.add(ambientLight)

      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
      directionalLight.position.set(5, 10, 7)
      scene.add(directionalLight)

      const fillLight = new THREE.DirectionalLight(0xffffff, 0.3)
      fillLight.position.set(-5, 5, -5)
      scene.add(fillLight)

      const car = createCar(type, color)
      carRef.current = car
      scene.add(car)

      camera.position.set(4, 2.5, 4)
      camera.lookAt(0, 0, 0)

      const animate = () => {
        frameRef.current = requestAnimationFrame(animate)
        
        if (isHovered || isSelected) {
          rotationRef.current += 0.02
        } else {
          rotationRef.current += 0.005
        }
        
        if (carRef.current) {
          carRef.current.rotation.y = rotationRef.current
        }
        
        renderer.render(scene, camera)
      }
      animate()
    } catch (e) {
      // WebGL not supported, using fallback
      setWebglSupported(false)
      return
    }

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current)
      }
      if (rendererRef.current && containerRef.current) {
        try {
          containerRef.current.removeChild(rendererRef.current.domElement)
        } catch (e) {}
      }
      if (carRef.current) {
        carRef.current.traverse((child) => {
          if (child.geometry) child.geometry.dispose()
          if (child.material) {
            if (Array.isArray(child.material)) {
              child.material.forEach(m => m.dispose())
            } else {
              child.material.dispose()
            }
          }
        })
      }
      if (rendererRef.current) {
        rendererRef.current.dispose()
      }
    }
  }, [type, color, size])

  useEffect(() => {
    if (carRef.current) {
      updateCarColor(carRef.current, color)
    }
  }, [color, isSelected])

  const createCar = (carType, carColor) => {
    const group = new THREE.Group()
    const mainColor = new THREE.Color(carColor)
    const darkColor = new THREE.Color(0x1a1a1a)
    const glassColor = new THREE.Color(0x87ceeb)
    const metalColor = new THREE.Color(0x888888)

    const bodyMaterial = new THREE.MeshPhongMaterial({ 
      color: mainColor, 
      shininess: 100,
      specular: 0x444444
    })
    const wheelMaterial = new THREE.MeshPhongMaterial({ color: darkColor, shininess: 30 })
    const glassMaterial = new THREE.MeshPhongMaterial({ 
      color: glassColor, 
      transparent: true, 
      opacity: 0.6,
      shininess: 100
    })
    const chromeMaterial = new THREE.MeshPhongMaterial({ 
      color: 0xcccccc, 
      shininess: 150,
      specular: 0xffffff
    })

    switch (carType) {
      case 'sedan':
        createSedan(group, bodyMaterial, wheelMaterial, glassMaterial, chromeMaterial)
        break
      case 'suv':
        createSUV(group, bodyMaterial, wheelMaterial, glassMaterial, chromeMaterial)
        break
      case 'classic':
        createClassic(group, bodyMaterial, wheelMaterial, glassMaterial, chromeMaterial)
        break
      case 'luxury':
        createLuxury(group, bodyMaterial, wheelMaterial, glassMaterial, chromeMaterial)
        break
      case 'vip':
        createVIP(group, bodyMaterial, wheelMaterial, glassMaterial, chromeMaterial)
        break
      default:
        createSedan(group, bodyMaterial, wheelMaterial, glassMaterial, chromeMaterial)
    }

    return group
  }

  const createWheel = (x, y, z, wheelMaterial, scale = 1) => {
    const wheelGroup = new THREE.Group()
    const wheelGeometry = new THREE.CylinderGeometry(0.25 * scale, 0.25 * scale, 0.15, 16)
    const wheel = new THREE.Mesh(wheelGeometry, wheelMaterial)
    wheel.rotation.z = Math.PI / 2
    wheelGroup.add(wheel)

    const hubGeometry = new THREE.CylinderGeometry(0.12 * scale, 0.12 * scale, 0.16, 8)
    const hubMaterial = new THREE.MeshPhongMaterial({ color: 0xaaaaaa, shininess: 100 })
    const hub = new THREE.Mesh(hubGeometry, hubMaterial)
    hub.rotation.z = Math.PI / 2
    wheelGroup.add(hub)

    wheelGroup.position.set(x, y, z)
    return wheelGroup
  }

  const createSedan = (group, bodyMaterial, wheelMaterial, glassMaterial, chromeMaterial) => {
    const bodyGeometry = new THREE.BoxGeometry(2.2, 0.4, 0.9)
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial)
    body.position.y = 0.35
    group.add(body)

    const cabinGeometry = new THREE.BoxGeometry(1.2, 0.4, 0.8)
    const cabin = new THREE.Mesh(cabinGeometry, bodyMaterial)
    cabin.position.set(-0.1, 0.7, 0)
    group.add(cabin)

    const windshieldGeometry = new THREE.BoxGeometry(0.05, 0.35, 0.75)
    const windshield = new THREE.Mesh(windshieldGeometry, glassMaterial)
    windshield.position.set(0.5, 0.7, 0)
    windshield.rotation.z = 0.3
    group.add(windshield)

    const rearWindowGeometry = new THREE.BoxGeometry(0.05, 0.35, 0.75)
    const rearWindow = new THREE.Mesh(rearWindowGeometry, glassMaterial)
    rearWindow.position.set(-0.7, 0.7, 0)
    rearWindow.rotation.z = -0.3
    group.add(rearWindow)

    group.add(createWheel(0.7, 0.15, 0.45, wheelMaterial))
    group.add(createWheel(0.7, 0.15, -0.45, wheelMaterial))
    group.add(createWheel(-0.7, 0.15, 0.45, wheelMaterial))
    group.add(createWheel(-0.7, 0.15, -0.45, wheelMaterial))

    const headlightGeometry = new THREE.BoxGeometry(0.05, 0.1, 0.2)
    const headlightMaterial = new THREE.MeshPhongMaterial({ color: 0xffffcc, emissive: 0xffff00, emissiveIntensity: 0.3 })
    const headlightL = new THREE.Mesh(headlightGeometry, headlightMaterial)
    headlightL.position.set(1.12, 0.4, 0.3)
    group.add(headlightL)
    const headlightR = new THREE.Mesh(headlightGeometry, headlightMaterial)
    headlightR.position.set(1.12, 0.4, -0.3)
    group.add(headlightR)
  }

  const createSUV = (group, bodyMaterial, wheelMaterial, glassMaterial, chromeMaterial) => {
    const bodyGeometry = new THREE.BoxGeometry(2.4, 0.5, 1.1)
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial)
    body.position.y = 0.5
    group.add(body)

    const cabinGeometry = new THREE.BoxGeometry(1.6, 0.6, 1.0)
    const cabin = new THREE.Mesh(cabinGeometry, bodyMaterial)
    cabin.position.set(-0.2, 1.0, 0)
    group.add(cabin)

    const roofGeometry = new THREE.BoxGeometry(1.4, 0.08, 0.9)
    const roofMaterial = new THREE.MeshPhongMaterial({ color: 0x333333, shininess: 50 })
    const roof = new THREE.Mesh(roofGeometry, roofMaterial)
    roof.position.set(-0.2, 1.35, 0)
    group.add(roof)

    const windshieldGeometry = new THREE.BoxGeometry(0.05, 0.5, 0.9)
    const windshield = new THREE.Mesh(windshieldGeometry, glassMaterial)
    windshield.position.set(0.55, 1.0, 0)
    windshield.rotation.z = 0.25
    group.add(windshield)

    group.add(createWheel(0.8, 0.25, 0.55, wheelMaterial, 1.3))
    group.add(createWheel(0.8, 0.25, -0.55, wheelMaterial, 1.3))
    group.add(createWheel(-0.8, 0.25, 0.55, wheelMaterial, 1.3))
    group.add(createWheel(-0.8, 0.25, -0.55, wheelMaterial, 1.3))

    const grillGeometry = new THREE.BoxGeometry(0.05, 0.25, 0.6)
    const grill = new THREE.Mesh(grillGeometry, chromeMaterial)
    grill.position.set(1.22, 0.55, 0)
    group.add(grill)
  }

  const createClassic = (group, bodyMaterial, wheelMaterial, glassMaterial, chromeMaterial) => {
    const bodyGeometry = new THREE.BoxGeometry(2.5, 0.35, 0.85)
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial)
    body.position.y = 0.4
    group.add(body)

    const hoodGeometry = new THREE.BoxGeometry(0.8, 0.25, 0.7)
    const hood = new THREE.Mesh(hoodGeometry, bodyMaterial)
    hood.position.set(0.9, 0.55, 0)
    group.add(hood)

    const cabinGeometry = new THREE.BoxGeometry(0.9, 0.45, 0.75)
    const cabin = new THREE.Mesh(cabinGeometry, bodyMaterial)
    cabin.position.set(-0.3, 0.75, 0)
    group.add(cabin)

    const roofGeometry = new THREE.BoxGeometry(0.7, 0.1, 0.65)
    const roof = new THREE.Mesh(roofGeometry, bodyMaterial)
    roof.position.set(-0.3, 1.0, 0)
    group.add(roof)

    group.add(createWheel(0.85, 0.2, 0.45, wheelMaterial, 1.1))
    group.add(createWheel(0.85, 0.2, -0.45, wheelMaterial, 1.1))
    group.add(createWheel(-0.85, 0.2, 0.45, wheelMaterial, 1.1))
    group.add(createWheel(-0.85, 0.2, -0.45, wheelMaterial, 1.1))

    const bumperGeometry = new THREE.BoxGeometry(0.08, 0.12, 0.9)
    const bumper = new THREE.Mesh(bumperGeometry, chromeMaterial)
    bumper.position.set(1.28, 0.35, 0)
    group.add(bumper)

    const roundLightGeometry = new THREE.SphereGeometry(0.1, 16, 16)
    const lightMaterial = new THREE.MeshPhongMaterial({ color: 0xffffcc, emissive: 0xffff00, emissiveIntensity: 0.5 })
    const lightL = new THREE.Mesh(roundLightGeometry, lightMaterial)
    lightL.position.set(1.25, 0.5, 0.25)
    group.add(lightL)
    const lightR = new THREE.Mesh(roundLightGeometry, lightMaterial)
    lightR.position.set(1.25, 0.5, -0.25)
    group.add(lightR)
  }

  const createLuxury = (group, bodyMaterial, wheelMaterial, glassMaterial, chromeMaterial) => {
    const bodyGeometry = new THREE.BoxGeometry(2.6, 0.38, 0.95)
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial)
    body.position.y = 0.35
    group.add(body)

    const cabinGeometry = new THREE.BoxGeometry(1.4, 0.42, 0.85)
    const cabin = new THREE.Mesh(cabinGeometry, bodyMaterial)
    cabin.position.set(-0.15, 0.72, 0)
    group.add(cabin)

    const grillGeometry = new THREE.BoxGeometry(0.06, 0.2, 0.4)
    const grill = new THREE.Mesh(grillGeometry, chromeMaterial)
    grill.position.set(1.32, 0.4, 0)
    group.add(grill)

    const windshieldGeometry = new THREE.BoxGeometry(0.05, 0.38, 0.8)
    const windshield = new THREE.Mesh(windshieldGeometry, glassMaterial)
    windshield.position.set(0.55, 0.72, 0)
    windshield.rotation.z = 0.35
    group.add(windshield)

    group.add(createWheel(0.85, 0.15, 0.48, wheelMaterial, 1.1))
    group.add(createWheel(0.85, 0.15, -0.48, wheelMaterial, 1.1))
    group.add(createWheel(-0.85, 0.15, 0.48, wheelMaterial, 1.1))
    group.add(createWheel(-0.85, 0.15, -0.48, wheelMaterial, 1.1))

    const ornamentGeometry = new THREE.ConeGeometry(0.05, 0.12, 4)
    const ornament = new THREE.Mesh(ornamentGeometry, chromeMaterial)
    ornament.position.set(1.35, 0.55, 0)
    ornament.rotation.z = -Math.PI / 2
    group.add(ornament)

    const trimGeometry = new THREE.BoxGeometry(2.5, 0.02, 0.02)
    const trimL = new THREE.Mesh(trimGeometry, chromeMaterial)
    trimL.position.set(0, 0.35, 0.48)
    group.add(trimL)
    const trimR = new THREE.Mesh(trimGeometry, chromeMaterial)
    trimR.position.set(0, 0.35, -0.48)
    group.add(trimR)
  }

  const createVIP = (group, bodyMaterial, wheelMaterial, glassMaterial, chromeMaterial) => {
    const bodyGeometry = new THREE.BoxGeometry(3.2, 0.4, 1.0)
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial)
    body.position.y = 0.38
    group.add(body)

    const cabinGeometry = new THREE.BoxGeometry(2.0, 0.45, 0.9)
    const cabin = new THREE.Mesh(cabinGeometry, bodyMaterial)
    cabin.position.set(-0.3, 0.78, 0)
    group.add(cabin)

    const windshieldGeometry = new THREE.BoxGeometry(0.05, 0.4, 0.85)
    const windshield = new THREE.Mesh(windshieldGeometry, glassMaterial)
    windshield.position.set(0.65, 0.78, 0)
    windshield.rotation.z = 0.3
    group.add(windshield)

    const dividerGeometry = new THREE.BoxGeometry(0.02, 0.35, 0.8)
    const dividerMaterial = new THREE.MeshPhongMaterial({ color: 0x222222, transparent: true, opacity: 0.8 })
    const divider = new THREE.Mesh(dividerGeometry, dividerMaterial)
    divider.position.set(-0.1, 0.75, 0)
    group.add(divider)

    group.add(createWheel(1.1, 0.15, 0.5, wheelMaterial, 1.15))
    group.add(createWheel(1.1, 0.15, -0.5, wheelMaterial, 1.15))
    group.add(createWheel(-1.1, 0.15, 0.5, wheelMaterial, 1.15))
    group.add(createWheel(-1.1, 0.15, -0.5, wheelMaterial, 1.15))

    const grillGeometry = new THREE.BoxGeometry(0.06, 0.25, 0.5)
    const grill = new THREE.Mesh(grillGeometry, chromeMaterial)
    grill.position.set(1.62, 0.42, 0)
    group.add(grill)

    const trimGeometry = new THREE.BoxGeometry(3.1, 0.025, 0.025)
    const goldMaterial = new THREE.MeshPhongMaterial({ color: 0xC89D2A, shininess: 150 })
    const trimL = new THREE.Mesh(trimGeometry, goldMaterial)
    trimL.position.set(0, 0.38, 0.51)
    group.add(trimL)
    const trimR = new THREE.Mesh(trimGeometry, goldMaterial)
    trimR.position.set(0, 0.38, -0.51)
    group.add(trimR)

    const flagGeometry = new THREE.BoxGeometry(0.15, 0.1, 0.02)
    const flagMaterial = new THREE.MeshPhongMaterial({ color: 0xC89D2A })
    const flagL = new THREE.Mesh(flagGeometry, flagMaterial)
    flagL.position.set(0.9, 1.05, 0.35)
    group.add(flagL)
    const flagR = new THREE.Mesh(flagGeometry, flagMaterial)
    flagR.position.set(0.9, 1.05, -0.35)
    group.add(flagR)
  }

  const updateCarColor = (car, newColor) => {
    const mainColor = new THREE.Color(newColor)
    car.traverse((child) => {
      if (child.isMesh && child.material && child.material.color) {
        if (child.material.shininess === 100 && child.material.specular) {
          child.material.color.set(mainColor)
        }
      }
    })
  }

  if (!webglSupported) {
    return <FallbackCarIcon type={type} color={color} size={size} />
  }

  return (
    <div 
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ 
        width: size, 
        height: size, 
        cursor: 'pointer',
        transition: 'transform 0.3s ease',
        transform: isHovered ? 'scale(1.1)' : 'scale(1)'
      }}
    />
  )
}

export default Car3DViewer
