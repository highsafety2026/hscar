import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { Car } from 'lucide-react'

function Car3DViewer({ language = 'ar' }) {
  const containerRef = useRef(null)
  const [isLoading, setIsLoading] = useState(true)
  const [autoRotate, setAutoRotate] = useState(true)
  const [webGLError, setWebGLError] = useState(false)
  const sceneRef = useRef(null)
  const rendererRef = useRef(null)
  const controlsRef = useRef(null)
  const animationIdRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
    if (!gl) {
      setWebGLError(true)
      setIsLoading(false)
      return
    }

    const container = containerRef.current
    const width = container.clientWidth
    const height = container.clientHeight || 450

    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0xf0f4f8)
    sceneRef.current = scene

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000)
    camera.position.set(6, 4, 8)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    container.appendChild(renderer.domElement)
    rendererRef.current = renderer

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.minDistance = 3
    controls.maxDistance = 18
    controls.maxPolarAngle = Math.PI * 0.95
    controls.minPolarAngle = Math.PI * 0.05
    controls.autoRotate = autoRotate
    controls.autoRotateSpeed = 1.5
    controlsRef.current = controls

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
    directionalLight.position.set(10, 15, 10)
    directionalLight.castShadow = true
    directionalLight.shadow.mapSize.width = 2048
    directionalLight.shadow.mapSize.height = 2048
    scene.add(directionalLight)

    const fillLight = new THREE.DirectionalLight(0xffffff, 0.4)
    fillLight.position.set(-10, 5, -10)
    scene.add(fillLight)

    const groundGeometry = new THREE.CircleGeometry(12, 64)
    const groundMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xe8eef5,
      roughness: 0.8
    })
    const ground = new THREE.Mesh(groundGeometry, groundMaterial)
    ground.rotation.x = -Math.PI / 2
    ground.position.y = -0.01
    ground.receiveShadow = true
    scene.add(ground)

    const carGroup = new THREE.Group()

    const bodyMaterial = new THREE.MeshStandardMaterial({
      color: 0x1a365d,
      metalness: 0.8,
      roughness: 0.2
    })

    const chassisMaterial = new THREE.MeshStandardMaterial({
      color: 0x2d3748,
      metalness: 0.6,
      roughness: 0.4
    })

    const glassMaterial = new THREE.MeshStandardMaterial({
      color: 0x87ceeb,
      metalness: 0.9,
      roughness: 0.1,
      transparent: true,
      opacity: 0.7
    })

    const wheelMaterial = new THREE.MeshStandardMaterial({
      color: 0x1a1a1a,
      roughness: 0.6
    })

    const rimMaterial = new THREE.MeshStandardMaterial({
      color: 0xc0c0c0,
      metalness: 0.9,
      roughness: 0.2
    })

    const lightMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0xffffcc,
      emissiveIntensity: 0.3
    })

    const tailLightMaterial = new THREE.MeshStandardMaterial({
      color: 0xff0000,
      emissive: 0xff0000,
      emissiveIntensity: 0.2
    })

    const mainBodyGeometry = new THREE.BoxGeometry(4.5, 0.6, 1.8)
    const mainBody = new THREE.Mesh(mainBodyGeometry, bodyMaterial)
    mainBody.position.set(0, 0.5, 0)
    mainBody.castShadow = true
    carGroup.add(mainBody)

    const cabinShape = new THREE.Shape()
    cabinShape.moveTo(-1.2, 0)
    cabinShape.lineTo(-1.5, 0.8)
    cabinShape.lineTo(0.8, 0.8)
    cabinShape.lineTo(1.2, 0)
    cabinShape.closePath()

    const cabinExtrudeSettings = { steps: 1, depth: 1.6, bevelEnabled: false }
    const cabinGeometry = new THREE.ExtrudeGeometry(cabinShape, cabinExtrudeSettings)
    const cabin = new THREE.Mesh(cabinGeometry, bodyMaterial)
    cabin.position.set(0, 0.8, -0.8)
    cabin.castShadow = true
    carGroup.add(cabin)

    const windshieldGeometry = new THREE.PlaneGeometry(1.5, 0.75)
    const windshield = new THREE.Mesh(windshieldGeometry, glassMaterial)
    windshield.position.set(-1.25, 1.2, 0)
    windshield.rotation.y = Math.PI / 2
    windshield.rotation.x = -0.3
    carGroup.add(windshield)

    const rearWindowGeometry = new THREE.PlaneGeometry(1.5, 0.6)
    const rearWindow = new THREE.Mesh(rearWindowGeometry, glassMaterial)
    rearWindow.position.set(1.05, 1.15, 0)
    rearWindow.rotation.y = Math.PI / 2
    rearWindow.rotation.x = 0.2
    carGroup.add(rearWindow)

    const sideWindowGeometry = new THREE.PlaneGeometry(1.2, 0.5)
    const leftWindow = new THREE.Mesh(sideWindowGeometry, glassMaterial)
    leftWindow.position.set(-0.2, 1.25, 0.91)
    carGroup.add(leftWindow)

    const rightWindow = new THREE.Mesh(sideWindowGeometry, glassMaterial)
    rightWindow.position.set(-0.2, 1.25, -0.91)
    carGroup.add(rightWindow)

    const chassisGeometry = new THREE.BoxGeometry(4.2, 0.15, 1.6)
    const chassis = new THREE.Mesh(chassisGeometry, chassisMaterial)
    chassis.position.set(0, 0.1, 0)
    carGroup.add(chassis)

    const exhaustGeometry = new THREE.CylinderGeometry(0.06, 0.08, 0.4, 16)
    const exhaustMaterial = new THREE.MeshStandardMaterial({ color: 0x444444, metalness: 0.8 })
    const exhaust1 = new THREE.Mesh(exhaustGeometry, exhaustMaterial)
    exhaust1.rotation.z = Math.PI / 2
    exhaust1.position.set(2.4, 0.15, 0.4)
    carGroup.add(exhaust1)
    const exhaust2 = new THREE.Mesh(exhaustGeometry, exhaustMaterial)
    exhaust2.rotation.z = Math.PI / 2
    exhaust2.position.set(2.4, 0.15, -0.4)
    carGroup.add(exhaust2)

    const axleGeometry = new THREE.CylinderGeometry(0.05, 0.05, 1.6, 16)
    const axleMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 })
    const frontAxle = new THREE.Mesh(axleGeometry, axleMaterial)
    frontAxle.rotation.x = Math.PI / 2
    frontAxle.position.set(-1.5, 0.2, 0)
    carGroup.add(frontAxle)
    const rearAxle = new THREE.Mesh(axleGeometry, axleMaterial)
    rearAxle.rotation.x = Math.PI / 2
    rearAxle.position.set(1.5, 0.2, 0)
    carGroup.add(rearAxle)

    const brakeGeometry = new THREE.CylinderGeometry(0.2, 0.2, 0.08, 32)
    const brakeMaterial = new THREE.MeshStandardMaterial({ color: 0x8b4513, metalness: 0.5 })

    const createWheel = (x, z) => {
      const wheelGroup = new THREE.Group()
      
      const tireGeometry = new THREE.TorusGeometry(0.35, 0.15, 16, 32)
      const tire = new THREE.Mesh(tireGeometry, wheelMaterial)
      tire.rotation.x = Math.PI / 2
      wheelGroup.add(tire)
      
      const rimGeometry = new THREE.CylinderGeometry(0.28, 0.28, 0.12, 32)
      const rim = new THREE.Mesh(rimGeometry, rimMaterial)
      rim.rotation.x = Math.PI / 2
      wheelGroup.add(rim)

      const hubGeometry = new THREE.CylinderGeometry(0.08, 0.08, 0.14, 16)
      const hub = new THREE.Mesh(hubGeometry, chassisMaterial)
      hub.rotation.x = Math.PI / 2
      wheelGroup.add(hub)

      for (let i = 0; i < 5; i++) {
        const spokeGeometry = new THREE.BoxGeometry(0.04, 0.2, 0.02)
        const spoke = new THREE.Mesh(spokeGeometry, rimMaterial)
        spoke.position.y = 0.1
        spoke.position.z = 0.01
        spoke.rotation.z = (i * Math.PI * 2) / 5
        wheelGroup.add(spoke)
      }

      const brake = new THREE.Mesh(brakeGeometry, brakeMaterial)
      brake.rotation.x = Math.PI / 2
      brake.position.z = z > 0 ? -0.1 : 0.1
      wheelGroup.add(brake)
      
      wheelGroup.position.set(x, 0.35, z)
      wheelGroup.castShadow = true
      return wheelGroup
    }

    carGroup.add(createWheel(-1.5, 0.95))
    carGroup.add(createWheel(-1.5, -0.95))
    carGroup.add(createWheel(1.5, 0.95))
    carGroup.add(createWheel(1.5, -0.95))

    const headlightGeometry = new THREE.SphereGeometry(0.15, 16, 16)
    const leftHeadlight = new THREE.Mesh(headlightGeometry, lightMaterial)
    leftHeadlight.position.set(-2.25, 0.5, 0.6)
    leftHeadlight.scale.set(1, 0.7, 1)
    carGroup.add(leftHeadlight)
    const rightHeadlight = new THREE.Mesh(headlightGeometry, lightMaterial)
    rightHeadlight.position.set(-2.25, 0.5, -0.6)
    rightHeadlight.scale.set(1, 0.7, 1)
    carGroup.add(rightHeadlight)

    const taillightGeometry = new THREE.BoxGeometry(0.08, 0.15, 0.3)
    const leftTaillight = new THREE.Mesh(taillightGeometry, tailLightMaterial)
    leftTaillight.position.set(2.26, 0.55, 0.6)
    carGroup.add(leftTaillight)
    const rightTaillight = new THREE.Mesh(taillightGeometry, tailLightMaterial)
    rightTaillight.position.set(2.26, 0.55, -0.6)
    carGroup.add(rightTaillight)

    const mirrorGeometry = new THREE.BoxGeometry(0.1, 0.12, 0.2)
    const leftMirror = new THREE.Mesh(mirrorGeometry, bodyMaterial)
    leftMirror.position.set(-0.8, 1, 1.05)
    carGroup.add(leftMirror)
    const rightMirror = new THREE.Mesh(mirrorGeometry, bodyMaterial)
    rightMirror.position.set(-0.8, 1, -1.05)
    carGroup.add(rightMirror)

    const grillGeometry = new THREE.BoxGeometry(0.05, 0.25, 1.2)
    const grillMaterial = new THREE.MeshStandardMaterial({ color: 0x222222 })
    const grill = new THREE.Mesh(grillGeometry, grillMaterial)
    grill.position.set(-2.28, 0.45, 0)
    carGroup.add(grill)

    const frontBumperGeometry = new THREE.BoxGeometry(0.15, 0.2, 1.9)
    const bumperMaterial = new THREE.MeshStandardMaterial({ color: 0x1a365d, metalness: 0.5 })
    const frontBumper = new THREE.Mesh(frontBumperGeometry, bumperMaterial)
    frontBumper.position.set(-2.35, 0.25, 0)
    carGroup.add(frontBumper)

    const rearBumperGeometry = new THREE.BoxGeometry(0.15, 0.2, 1.9)
    const rearBumper = new THREE.Mesh(rearBumperGeometry, bumperMaterial)
    rearBumper.position.set(2.35, 0.25, 0)
    carGroup.add(rearBumper)

    scene.add(carGroup)

    setIsLoading(false)

    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate)
      controls.update()
      renderer.render(scene, camera)
    }
    animate()

    const handleResize = () => {
      const newWidth = container.clientWidth
      const newHeight = container.clientHeight || 450
      camera.aspect = newWidth / newHeight
      camera.updateProjectionMatrix()
      renderer.setSize(newWidth, newHeight)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current)
      }
      scene.traverse((object) => {
        if (object.geometry) object.geometry.dispose()
        if (object.material) {
          if (Array.isArray(object.material)) {
            object.material.forEach(m => m.dispose())
          } else {
            object.material.dispose()
          }
        }
      })
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement)
      }
      renderer.dispose()
      controls.dispose()
    }
  }, [])

  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.autoRotate = autoRotate
    }
  }, [autoRotate])

  if (webGLError) {
    return (
      <div className="car-3d-viewer">
        <div className="viewer-controls">
          <div className="viewer-hint" style={{ width: '100%', textAlign: 'center' }}>
            {language === 'ar' 
              ? '⚠️ المتصفح لا يدعم العرض ثلاثي الأبعاد - يرجى استخدام متصفح حديث'
              : '⚠️ Your browser does not support 3D view - Please use a modern browser'
            }
          </div>
        </div>
        <div 
          className="threejs-container webgl-fallback"
          style={{ 
            width: '100%', 
            height: '450px',
            borderRadius: '12px',
            overflow: 'hidden',
            background: 'linear-gradient(180deg, #e8eef5 0%, #f0f4f8 100%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '20px'
          }}
        >
          <Car size={80} style={{ color: '#0B1F3A', opacity: 0.5 }} />
          <p style={{ color: '#666', fontSize: '1rem', margin: 0 }}>
            {language === 'ar' 
              ? 'النموذج ثلاثي الأبعاد متاح على الأجهزة الحديثة'
              : '3D model available on modern devices'
            }
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="car-3d-viewer">
      <div className="viewer-controls">
        <button 
          className={`control-btn ${autoRotate ? 'active' : ''}`}
          onClick={() => setAutoRotate(!autoRotate)}
        >
          {autoRotate 
            ? (language === 'ar' ? '⏸ إيقاف الدوران' : '⏸ Stop Rotation')
            : (language === 'ar' ? '▶ تشغيل الدوران' : '▶ Start Rotation')
          }
        </button>
        <div className="viewer-hint">
          {language === 'ar' 
            ? '🖱️ اسحب للتدوير • اضغط مع Shift للتحريك • عجلة الماوس للتقريب'
            : '🖱️ Drag to rotate • Shift+drag to pan • Scroll to zoom'
          }
        </div>
      </div>
      <div 
        ref={containerRef} 
        className="threejs-container"
        style={{ 
          width: '100%', 
          height: '450px',
          borderRadius: '12px',
          overflow: 'hidden',
          background: 'linear-gradient(180deg, #e8eef5 0%, #f0f4f8 100%)'
        }}
      >
        {isLoading && (
          <div className="loading-3d">
            <div className="spinner"></div>
            <p>{language === 'ar' ? 'جاري تحميل النموذج ثلاثي الأبعاد...' : 'Loading 3D model...'}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Car3DViewer
