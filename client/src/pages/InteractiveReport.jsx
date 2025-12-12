import { useState, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { Upload, X, AlertCircle, CheckCircle, AlertTriangle, RotateCw, Car } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'

const getSeverityColor = (severity) => {
  const colorMap = {
    high: '#EA4335',
    medium: '#FFA500',
    low: '#4285F4'
  }
  return colorMap[severity] || '#999'
}

const transformDefects = (defectList) => {
  return defectList.map(d => ({
    id: d.id,
    position: d.position,
    name: d.locationAr,
    nameEn: d.location,
    description: d.shortDescAr,
    descriptionEn: d.shortDesc,
    detailedDescription: d.detailedDescAr,
    detailedDescriptionEn: d.detailedDesc,
    severity: d.severity,
    severityColor: getSeverityColor(d.severity),
    recommendations: d.recommendationsAr,
    recommendationsEn: d.recommendations,
    estimatedCost: `${d.estimatedCostMin}-${d.estimatedCostMax}`,
    type: d.typeAr,
    typeEn: d.type,
    fullData: d
  }))
}

function createRealisticCar(scene) {
  const carGroup = new THREE.Group()

  // Main body - sleek sedan shape
  const bodyShape = new THREE.Shape()
  bodyShape.moveTo(-2.2, 0.3)
  bodyShape.lineTo(-2.2, 0.6)
  bodyShape.lineTo(-1.8, 0.6)
  bodyShape.lineTo(-1.5, 1.1)
  bodyShape.lineTo(-0.3, 1.3)
  bodyShape.lineTo(0.8, 1.3)
  bodyShape.lineTo(1.5, 1.0)
  bodyShape.lineTo(2.0, 0.6)
  bodyShape.lineTo(2.2, 0.6)
  bodyShape.lineTo(2.2, 0.3)
  bodyShape.lineTo(-2.2, 0.3)

  const extrudeSettings = {
    steps: 1,
    depth: 1.6,
    bevelEnabled: true,
    bevelThickness: 0.1,
    bevelSize: 0.1,
    bevelSegments: 3
  }

  const bodyGeometry = new THREE.ExtrudeGeometry(bodyShape, extrudeSettings)
  bodyGeometry.center()
  const bodyMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x1a3a5c,
    metalness: 0.9,
    roughness: 0.2,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1
  })
  const body = new THREE.Mesh(bodyGeometry, bodyMaterial)
  body.rotation.y = Math.PI / 2
  body.position.y = 0.1
  carGroup.add(body)

  // Hood
  const hoodGeometry = new THREE.BoxGeometry(1.4, 0.15, 1.5)
  const hoodMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x1a3a5c,
    metalness: 0.9,
    roughness: 0.2,
    clearcoat: 1.0
  })
  const hood = new THREE.Mesh(hoodGeometry, hoodMaterial)
  hood.position.set(1.3, 0.72, 0)
  carGroup.add(hood)

  // Trunk
  const trunkGeometry = new THREE.BoxGeometry(0.8, 0.15, 1.4)
  const trunk = new THREE.Mesh(trunkGeometry, hoodMaterial)
  trunk.position.set(-1.5, 0.72, 0)
  carGroup.add(trunk)

  // Windows - glass material
  const glassMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x88ccff,
    metalness: 0.1,
    roughness: 0.1,
    transparent: true,
    opacity: 0.7,
    transmission: 0.9
  })

  // Front windshield
  const windshieldGeometry = new THREE.PlaneGeometry(1.4, 0.5)
  const windshield = new THREE.Mesh(windshieldGeometry, glassMaterial)
  windshield.position.set(0.9, 1.05, 0)
  windshield.rotation.y = 0
  windshield.rotation.x = -0.3
  carGroup.add(windshield)

  // Rear windshield
  const rearWindshield = new THREE.Mesh(windshieldGeometry, glassMaterial)
  rearWindshield.position.set(-0.9, 1.0, 0)
  rearWindshield.rotation.x = 0.3
  carGroup.add(rearWindshield)

  // Side windows
  const sideWindowGeometry = new THREE.PlaneGeometry(1.2, 0.4)
  const leftWindow = new THREE.Mesh(sideWindowGeometry, glassMaterial)
  leftWindow.position.set(0, 1.05, 0.81)
  leftWindow.rotation.y = 0
  carGroup.add(leftWindow)

  const rightWindow = new THREE.Mesh(sideWindowGeometry, glassMaterial)
  rightWindow.position.set(0, 1.05, -0.81)
  rightWindow.rotation.y = Math.PI
  carGroup.add(rightWindow)

  // Wheels with realistic detail
  const wheelGeometry = new THREE.CylinderGeometry(0.35, 0.35, 0.25, 32)
  const tireMaterial = new THREE.MeshStandardMaterial({
    color: 0x1a1a1a,
    metalness: 0.1,
    roughness: 0.9
  })

  // Rim
  const rimGeometry = new THREE.CylinderGeometry(0.25, 0.25, 0.26, 16)
  const rimMaterial = new THREE.MeshStandardMaterial({
    color: 0xcccccc,
    metalness: 0.9,
    roughness: 0.3
  })

  const wheelPositions = [
    [1.3, 0.35, 0.9],
    [1.3, 0.35, -0.9],
    [-1.3, 0.35, 0.9],
    [-1.3, 0.35, -0.9]
  ]

  wheelPositions.forEach(pos => {
    const wheelGroup = new THREE.Group()
    
    const tire = new THREE.Mesh(wheelGeometry, tireMaterial)
    tire.rotation.x = Math.PI / 2
    wheelGroup.add(tire)

    const rim = new THREE.Mesh(rimGeometry, rimMaterial)
    rim.rotation.x = Math.PI / 2
    wheelGroup.add(rim)

    // Wheel spokes
    for (let i = 0; i < 5; i++) {
      const spokeGeometry = new THREE.BoxGeometry(0.04, 0.2, 0.02)
      const spoke = new THREE.Mesh(spokeGeometry, rimMaterial)
      spoke.rotation.z = (i * Math.PI * 2) / 5
      spoke.position.z = 0.13
      wheelGroup.add(spoke)
    }

    wheelGroup.position.set(...pos)
    carGroup.add(wheelGroup)
  })

  // Headlights
  const headlightGeometry = new THREE.BoxGeometry(0.15, 0.15, 0.5)
  const headlightMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffee,
    emissive: 0xffffee,
    emissiveIntensity: 0.5
  })

  const leftHeadlight = new THREE.Mesh(headlightGeometry, headlightMaterial)
  leftHeadlight.position.set(2.1, 0.55, 0.55)
  carGroup.add(leftHeadlight)

  const rightHeadlight = new THREE.Mesh(headlightGeometry, headlightMaterial)
  rightHeadlight.position.set(2.1, 0.55, -0.55)
  carGroup.add(rightHeadlight)

  // Taillights
  const taillightMaterial = new THREE.MeshStandardMaterial({
    color: 0xff3333,
    emissive: 0xff0000,
    emissiveIntensity: 0.3
  })

  const leftTaillight = new THREE.Mesh(headlightGeometry, taillightMaterial)
  leftTaillight.position.set(-2.1, 0.55, 0.55)
  carGroup.add(leftTaillight)

  const rightTaillight = new THREE.Mesh(headlightGeometry, taillightMaterial)
  rightTaillight.position.set(-2.1, 0.55, -0.55)
  carGroup.add(rightTaillight)

  // Grille
  const grilleGeometry = new THREE.BoxGeometry(0.05, 0.25, 1.0)
  const grilleMaterial = new THREE.MeshStandardMaterial({
    color: 0x222222,
    metalness: 0.8
  })
  const grille = new THREE.Mesh(grilleGeometry, grilleMaterial)
  grille.position.set(2.15, 0.45, 0)
  carGroup.add(grille)

  // Front bumper
  const bumperGeometry = new THREE.BoxGeometry(0.2, 0.2, 1.7)
  const bumperMaterial = new THREE.MeshStandardMaterial({
    color: 0x333333,
    metalness: 0.3,
    roughness: 0.6
  })
  const frontBumper = new THREE.Mesh(bumperGeometry, bumperMaterial)
  frontBumper.position.set(2.2, 0.3, 0)
  carGroup.add(frontBumper)

  // Rear bumper
  const rearBumper = new THREE.Mesh(bumperGeometry, bumperMaterial)
  rearBumper.position.set(-2.2, 0.3, 0)
  carGroup.add(rearBumper)

  // Side mirrors
  const mirrorGeometry = new THREE.BoxGeometry(0.1, 0.08, 0.15)
  const mirrorMaterial = new THREE.MeshStandardMaterial({
    color: 0x1a3a5c,
    metalness: 0.9
  })

  const leftMirror = new THREE.Mesh(mirrorGeometry, mirrorMaterial)
  leftMirror.position.set(0.7, 0.95, 0.95)
  carGroup.add(leftMirror)

  const rightMirror = new THREE.Mesh(mirrorGeometry, mirrorMaterial)
  rightMirror.position.set(0.7, 0.95, -0.95)
  carGroup.add(rightMirror)

  // Ground shadow plane
  const shadowGeometry = new THREE.PlaneGeometry(5, 3)
  const shadowMaterial = new THREE.MeshBasicMaterial({
    color: 0x000000,
    transparent: true,
    opacity: 0.15
  })
  const shadow = new THREE.Mesh(shadowGeometry, shadowMaterial)
  shadow.rotation.x = -Math.PI / 2
  shadow.position.y = 0.01
  carGroup.add(shadow)

  scene.add(carGroup)
  return carGroup
}

function InteractiveReport() {
  const { language } = useLanguage()
  const isRTL = language === 'ar'
  const mountRef = useRef(null)
  const controlsRef = useRef(null)
  const carGroupRef = useRef(null)

  const [selectedDefect, setSelectedDefect] = useState(null)
  const [webglError, setWebglError] = useState(false)
  const [defectData, setDefectData] = useState([])
  const [carInfo, setCarInfo] = useState(null)
  const [autoRotate, setAutoRotate] = useState(true)
  const [uploadStatus, setUploadStatus] = useState(null)
  const fileInputRef = useRef(null)

  useEffect(() => {
    fetch('/data/defects.json')
      .then(res => res.json())
      .then(data => {
        setCarInfo(data.carInfo)
        setDefectData(transformDefects(data.defects))
      })
      .catch(err => {
        console.error('Error loading defect data:', err)
        setDefectData([])
      })
  }, [])

  const getSeverityLabel = (severity) => {
    if (language === 'ar') {
      return severity === 'high' ? 'خطير' : severity === 'medium' ? 'متوسط' : 'منخفض'
    }
    return severity === 'high' ? 'High' : severity === 'medium' ? 'Medium' : 'Low'
  }

  useEffect(() => {
    if (!mountRef.current || defectData.length === 0) return

    const container = mountRef.current
    const width = container.clientWidth
    const height = container.clientHeight || 450

    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0xf0f4f8)

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000)
    camera.position.set(5, 3, 5)
    camera.lookAt(0, 0.5, 0)

    let renderer
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
      renderer.setSize(width, height)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.shadowMap.enabled = true
      renderer.shadowMap.type = THREE.PCFSoftShadowMap
      renderer.toneMapping = THREE.ACESFilmicToneMapping
      renderer.toneMappingExposure = 1.2
      container.appendChild(renderer.domElement)
    } catch (err) {
      setWebglError(true)
      return
    }

    // Lighting setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
    scene.add(ambientLight)

    const mainLight = new THREE.DirectionalLight(0xffffff, 1.0)
    mainLight.position.set(5, 10, 7)
    mainLight.castShadow = true
    scene.add(mainLight)

    const fillLight = new THREE.DirectionalLight(0xffffff, 0.4)
    fillLight.position.set(-5, 5, -5)
    scene.add(fillLight)

    const rimLight = new THREE.DirectionalLight(0xaaddff, 0.3)
    rimLight.position.set(0, 5, -10)
    scene.add(rimLight)

    // Ground plane
    const groundGeometry = new THREE.PlaneGeometry(20, 20)
    const groundMaterial = new THREE.MeshStandardMaterial({
      color: 0xe8eef5,
      metalness: 0.1,
      roughness: 0.8
    })
    const ground = new THREE.Mesh(groundGeometry, groundMaterial)
    ground.rotation.x = -Math.PI / 2
    ground.position.y = 0
    ground.receiveShadow = true
    scene.add(ground)

    // Create car
    const carGroup = createRealisticCar(scene)
    carGroupRef.current = carGroup

    // Add defect markers
    const defectMarkers = []
    if (defectData && defectData.length > 0) {
      defectData.forEach((defect) => {
        const markerGroup = new THREE.Group()

        // Outer glow ring
        const ringGeometry = new THREE.RingGeometry(0.12, 0.18, 32)
        const ringMaterial = new THREE.MeshBasicMaterial({
          color: defect.severityColor,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.6
        })
        const ring = new THREE.Mesh(ringGeometry, ringMaterial)
        markerGroup.add(ring)

        // Center sphere
        const sphereGeometry = new THREE.SphereGeometry(0.1, 16, 16)
        const sphereMaterial = new THREE.MeshStandardMaterial({
          color: defect.severityColor,
          emissive: defect.severityColor,
          emissiveIntensity: 0.8,
          metalness: 0.5,
          roughness: 0.3
        })
        const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
        markerGroup.add(sphere)

        markerGroup.position.set(defect.position.x, defect.position.y, defect.position.z)
        markerGroup.userData = { defectId: defect.id, defect }
        carGroup.add(markerGroup)
        defectMarkers.push(markerGroup)
      })
    }

    // OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.enablePan = false
    controls.minDistance = 4
    controls.maxDistance = 12
    controls.maxPolarAngle = Math.PI / 2.1
    controls.autoRotate = true
    controls.autoRotateSpeed = 1.0
    controlsRef.current = controls

    // Raycaster for click detection
    const raycaster = new THREE.Raycaster()
    const mouse = new THREE.Vector2()

    const onClick = (event) => {
      const rect = renderer.domElement.getBoundingClientRect()
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1

      raycaster.setFromCamera(mouse, camera)
      const intersects = raycaster.intersectObjects(defectMarkers, true)

      if (intersects.length > 0) {
        let target = intersects[0].object
        while (target && !target.userData.defect) {
          target = target.parent
        }
        if (target?.userData?.defect) {
          setSelectedDefect(target.userData.defect)
        }
      }
    }

    renderer.domElement.addEventListener('click', onClick)

    // Animation loop
    let animationId
    const animate = () => {
      animationId = requestAnimationFrame(animate)
      controls.update()

      // Make markers face camera
      defectMarkers.forEach(marker => {
        marker.lookAt(camera.position)
      })

      renderer.render(scene, camera)
    }
    animate()

    // Resize handler
    const handleResize = () => {
      if (!mountRef.current) return
      const newWidth = mountRef.current.clientWidth
      const newHeight = mountRef.current.clientHeight || 450
      camera.aspect = newWidth / newHeight
      camera.updateProjectionMatrix()
      renderer.setSize(newWidth, newHeight)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', handleResize)
      renderer.domElement.removeEventListener('click', onClick)
      controls.dispose()
      renderer.dispose()
      if (container?.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [defectData])

  // Separate effect for auto-rotate toggle
  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.autoRotate = autoRotate
    }
  }, [autoRotate])

  const toggleAutoRotate = () => {
    setAutoRotate(prev => !prev)
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadStatus({ status: 'uploading', message: language === 'ar' ? 'جاري الرفع...' : 'Uploading...' })

    try {
      setTimeout(() => {
        setUploadStatus({
          status: 'success',
          message: language === 'ar'
            ? 'تم الرفع بنجاح! التحليل قريباً'
            : 'Upload successful! Analysis coming soon'
        })
        setTimeout(() => setUploadStatus(null), 3000)
      }, 1000)
    } catch (error) {
      setUploadStatus({
        status: 'error',
        message: language === 'ar' ? 'فشل الرفع' : 'Upload failed'
      })
      setTimeout(() => setUploadStatus(null), 3000)
    }
  }

  return (
    <div className="interactive-report-page" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Hero Section */}
      <section className="report-hero">
        <div className="container">
          <div className="hero-content">
            <div className="demo-tag">
              <Car size={16} />
              {language === 'ar' ? 'نسخة تجريبية' : 'Demo Version'}
            </div>
            <h1>{language === 'ar' ? 'تقرير الفحص التفاعلي' : 'Interactive Inspection Report'}</h1>
            <p>{language === 'ar' ? 'استكشف سيارتك بزاوية 360 درجة وتعرف على جميع النقاط' : 'Explore your car in 360° and discover all inspection points'}</p>
            {carInfo && (
              <div className="car-badge">
                <span className="car-name">{carInfo.brand} {carInfo.model}</span>
                <span className="car-year">{carInfo.year}</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 3D Viewer Section */}
      <section className="viewer-section-full">
        <div className="container">
          <div className="viewer-card">
            <div className="viewer-toolbar">
              <h2>
                <Car size={24} />
                {language === 'ar' ? 'النموذج ثلاثي الأبعاد' : '3D Model Viewer'}
              </h2>
              <div className="toolbar-actions">
                <button 
                  className={`rotate-btn ${autoRotate ? 'active' : ''}`} 
                  onClick={toggleAutoRotate}
                  title={language === 'ar' ? 'تدوير تلقائي' : 'Auto Rotate'}
                >
                  <RotateCw size={18} />
                  {language === 'ar' ? 'تدوير تلقائي' : 'Auto Rotate'}
                </button>
              </div>
            </div>
            <p className="viewer-instructions">
              {language === 'ar' 
                ? '🖱️ اسحب للتدوير • تكبير/تصغير بالسكرول • انقر على النقاط الملونة'
                : '🖱️ Drag to rotate • Scroll to zoom • Click colored markers'}
            </p>
            <div className="viewer-canvas" ref={mountRef}>
              {webglError && (
                <div className="webgl-error">
                  <AlertCircle size={48} />
                  <h3>{language === 'ar' ? 'غير متاح' : 'Not Available'}</h3>
                  <p>{language === 'ar' ? 'المتصفح لا يدعم WebGL' : 'Your browser does not support WebGL'}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Defects Section */}
      <section className="defects-section">
        <div className="container">
          <div className="section-header">
            <h2>
              <AlertTriangle size={24} />
              {language === 'ar' ? 'نتائج الفحص' : 'Inspection Results'}
            </h2>
            <span className="defect-badge">{defectData?.length || 0} {language === 'ar' ? 'نقاط' : 'Issues'}</span>
          </div>

          <div className="defects-grid">
            {defectData && defectData.length > 0 ? defectData.map((defect) => (
              <div
                key={defect.id}
                className={`defect-card ${selectedDefect?.id === defect.id ? 'selected' : ''}`}
                onClick={() => setSelectedDefect(defect)}
              >
                <div className="defect-header">
                  <div className="severity-indicator" style={{ backgroundColor: defect.severityColor }} />
                  <div className="defect-title">
                    <h3>{language === 'ar' ? defect.name : defect.nameEn}</h3>
                    <span className="defect-type">{language === 'ar' ? defect.type : defect.typeEn}</span>
                  </div>
                  <div className="severity-tag" style={{ backgroundColor: defect.severityColor }}>
                    {getSeverityLabel(defect.severity)}
                  </div>
                </div>
                <p className="defect-desc">{language === 'ar' ? defect.description : defect.descriptionEn}</p>
                <div className="defect-footer">
                  <span className="cost-estimate">
                    {defect.estimatedCost} {language === 'ar' ? 'درهم' : 'AED'}
                  </span>
                  <button className="view-details-btn">
                    {language === 'ar' ? 'عرض التفاصيل' : 'View Details'}
                  </button>
                </div>
              </div>
            )) : (
              <div className="no-defects-msg">
                <CheckCircle size={48} />
                <p>{language === 'ar' ? 'لم يتم اكتشاف مشاكل' : 'No issues detected'}</p>
              </div>
            )}
          </div>

          {/* Upload Section */}
          <div className="upload-section">
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileUpload}
              style={{ display: 'none' }}
            />
            <button className="upload-report-btn" onClick={handleUploadClick}>
              <Upload size={20} />
              {language === 'ar' ? 'رفع تقرير للتحليل' : 'Upload Report for Analysis'}
            </button>
            {uploadStatus && (
              <div className={`upload-msg ${uploadStatus.status}`}>
                {uploadStatus.status === 'uploading' && <div className="loading-spinner" />}
                {uploadStatus.status === 'success' && <CheckCircle size={16} />}
                {uploadStatus.status === 'error' && <AlertCircle size={16} />}
                <span>{uploadStatus.message}</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Severity Legend */}
      <section className="legend-section">
        <div className="container">
          <div className="legend-grid">
            <div className="legend-item">
              <div className="legend-dot high" />
              <span>{language === 'ar' ? 'خطير - يحتاج إصلاح فوري' : 'High - Urgent repair needed'}</span>
            </div>
            <div className="legend-item">
              <div className="legend-dot medium" />
              <span>{language === 'ar' ? 'متوسط - يحتاج متابعة' : 'Medium - Monitoring needed'}</span>
            </div>
            <div className="legend-item">
              <div className="legend-dot low" />
              <span>{language === 'ar' ? 'منخفض - ملاحظة بسيطة' : 'Low - Minor observation'}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Detail Modal */}
      {selectedDefect && (
        <div className="detail-modal-overlay" onClick={() => setSelectedDefect(null)}>
          <div className="detail-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedDefect(null)}>
              <X size={24} />
            </button>

            <div className="modal-header-bar" style={{ backgroundColor: selectedDefect.severityColor }}>
              <h2>{language === 'ar' ? selectedDefect.name : selectedDefect.nameEn}</h2>
              <span className="modal-severity">{getSeverityLabel(selectedDefect.severity)}</span>
            </div>

            <div className="modal-body-content">
              <div className="info-block">
                <h4>{language === 'ar' ? 'نوع المشكلة' : 'Issue Type'}</h4>
                <p>{language === 'ar' ? selectedDefect.type : selectedDefect.typeEn}</p>
              </div>

              <div className="info-block">
                <h4>{language === 'ar' ? 'الوصف التفصيلي' : 'Detailed Description'}</h4>
                <p>{language === 'ar' ? (selectedDefect.detailedDescription || selectedDefect.description) : (selectedDefect.detailedDescriptionEn || selectedDefect.descriptionEn)}</p>
              </div>

              <div className="info-block recommendation">
                <h4>{language === 'ar' ? 'التوصيات' : 'Recommendations'}</h4>
                <div className="recommendation-content">
                  <CheckCircle size={20} />
                  <p>{language === 'ar' ? selectedDefect.recommendations : selectedDefect.recommendationsEn}</p>
                </div>
              </div>

              <div className="cost-block">
                <h4>{language === 'ar' ? 'التكلفة المتوقعة' : 'Estimated Cost'}</h4>
                <div className="cost-amount">
                  <span className="amount">{selectedDefect.estimatedCost}</span>
                  <span className="currency">{language === 'ar' ? 'درهم' : 'AED'}</span>
                </div>
              </div>

              <div className="modal-actions">
                <a href="/booking" className="action-btn primary">
                  {language === 'ar' ? 'احجز خدمة الإصلاح' : 'Book Repair Service'}
                </a>
                <a href="/report" className="action-btn secondary">
                  {language === 'ar' ? 'تحميل التقرير' : 'Download Report'}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default InteractiveReport
