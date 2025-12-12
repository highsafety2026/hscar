import { useState, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { Upload, X, AlertCircle, CheckCircle, AlertTriangle } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'

const defectData = [
  {
    id: 1,
    position: { x: 2, y: 1.5, z: 0 },
    name: 'تلف في المصد الأمامي',
    nameEn: 'Front Bumper Damage',
    description: 'خدش وتشقق في المصد الأمامي',
    descriptionEn: 'Scratches and cracks in front bumper',
    severity: 'high',
    severityColor: '#EA4335',
    recommendations: 'استبدال المصد الأمامي أو إصلاح السطح',
    recommendationsEn: 'Replace front bumper or surface repair',
    estimatedCost: '500-1500'
  },
  {
    id: 2,
    position: { x: 0, y: 0.5, z: 1.5 },
    name: 'مشكلة في الإطارات',
    nameEn: 'Tire Issues',
    description: 'تآكل غير متساوٍ على الإطارات',
    descriptionEn: 'Uneven tire wear and low tread',
    severity: 'medium',
    severityColor: '#FFA500',
    recommendations: 'استبدال الإطارات وفحص التوازن',
    recommendationsEn: 'Replace tires and check wheel alignment',
    estimatedCost: '300-800'
  },
  {
    id: 3,
    position: { x: -1.5, y: 2, z: 0.5 },
    name: 'ضعف في نظام الإضاءة',
    nameEn: 'Lighting System Issue',
    description: 'إضاءة الرأس اليسرى خافتة أو معطلة',
    descriptionEn: 'Left headlight is dim or not working',
    severity: 'medium',
    severityColor: '#FFA500',
    recommendations: 'استبدال المصباح أو فحص الأسلاك',
    recommendationsEn: 'Replace bulb or check electrical wiring',
    estimatedCost: '100-300'
  }
]

function InteractiveReport() {
  const { language, t } = useLanguage()
  const isRTL = language === 'ar'
  const mountRef = useRef(null)
  const sceneRef = useRef(null)
  const rendererRef = useRef(null)
  const defectPointsRef = useRef([])
  const cameraRef = useRef(null)
  const raycasterRef = useRef(new THREE.Raycaster())
  const mouseRef = useRef(new THREE.Vector2())

  const [selectedDefect, setSelectedDefect] = useState(null)
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [webglError, setWebglError] = useState(false)

  const getSeverityLabel = (severity) => {
    if (language === 'ar') {
      return severity === 'high' ? 'خطير جداً' : severity === 'medium' ? 'متوسط' : 'منخفض'
    }
    return severity === 'high' ? 'High' : severity === 'medium' ? 'Medium' : 'Low'
  }

  useEffect(() => {
    if (!mountRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0xf5f7fa)
    sceneRef.current = scene

    // Camera setup
    const width = mountRef.current.clientWidth
    const height = mountRef.current.clientHeight
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
    camera.position.set(4, 2, 4)
    camera.lookAt(0, 0.5, 0)
    cameraRef.current = camera

    // Renderer setup
    let renderer
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true })
      renderer.setSize(width, height)
      renderer.setPixelRatio(window.devicePixelRatio)
      mountRef.current.appendChild(renderer.domElement)
      rendererRef.current = renderer
    } catch (err) {
      setWebglError(true)
      return
    }

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
    scene.add(ambientLight)
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
    directionalLight.position.set(5, 5, 5)
    scene.add(directionalLight)

    // Create simple car body using geometric shapes
    const bodyGroup = new THREE.Group()
    
    // Main body
    const bodyGeometry = new THREE.BoxGeometry(2, 1, 4)
    const bodyMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x1a3a52,
      metalness: 0.4,
      roughness: 0.4
    })
    const bodyMesh = new THREE.Mesh(bodyGeometry, bodyMaterial)
    bodyMesh.position.y = 0.5
    bodyGroup.add(bodyMesh)

    // Front bumper
    const bumperGeometry = new THREE.BoxGeometry(2.2, 0.3, 0.4)
    const bumperMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x333333,
      metalness: 0.3
    })
    const bumperMesh = new THREE.Mesh(bumperGeometry, bumperMaterial)
    bumperMesh.position.set(0, 0.3, 2)
    bodyGroup.add(bumperMesh)

    // Roof
    const roofGeometry = new THREE.BoxGeometry(1.8, 0.3, 2)
    const roofMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x1a3a52,
      metalness: 0.3
    })
    const roofMesh = new THREE.Mesh(roofGeometry, roofMaterial)
    roofMesh.position.set(0, 1.3, 0)
    bodyGroup.add(roofMesh)

    // Wheels
    const wheelGeometry = new THREE.CylinderGeometry(0.4, 0.4, 0.3, 32)
    const wheelMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x222222,
      metalness: 0.5
    })
    
    const wheelPositions = [
      [-0.8, 0.4, 1.2],
      [0.8, 0.4, 1.2],
      [-0.8, 0.4, -1.2],
      [0.8, 0.4, -1.2]
    ]
    
    wheelPositions.forEach(pos => {
      const wheel = new THREE.Mesh(wheelGeometry, wheelMaterial)
      wheel.rotation.z = Math.PI / 2
      wheel.position.set(...pos)
      bodyGroup.add(wheel)
    })

    scene.add(bodyGroup)

    // Create defect point markers
    const defectMarkerGroup = new THREE.Group()
    defectPointsRef.current = []

    defectData.forEach((defect) => {
      const markerGeometry = new THREE.SphereGeometry(0.25, 32, 32)
      const markerMaterial = new THREE.MeshStandardMaterial({
        color: defect.severityColor,
        emissive: defect.severityColor,
        emissiveIntensity: 0.5,
        metalness: 0.7
      })
      const marker = new THREE.Mesh(markerGeometry, markerMaterial)
      marker.position.set(defect.position.x, defect.position.y, defect.position.z)
      marker.userData = { defectId: defect.id, defect }
      marker.interactive = true
      defectMarkerGroup.add(marker)
      defectPointsRef.current.push(marker)
    })

    scene.add(defectMarkerGroup)

    // Mouse interaction
    const onMouseClick = (event) => {
      const rect = renderer.domElement.getBoundingClientRect()
      mouseRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
      mouseRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1

      raycasterRef.current.setFromCamera(mouseRef.current, camera)
      const intersects = raycasterRef.current.intersectObjects(defectPointsRef.current)

      if (intersects.length > 0) {
        const selectedMarker = intersects[0].object
        setSelectedDefect(selectedMarker.userData.defect)
      }
    }

    // Mouse drag for rotation
    const onMouseDown = (event) => {
      if (event.button === 0) {
        setIsDragging(true)
      }
    }

    const onMouseMove = (event) => {
      if (!isDragging) return

      const deltaMove = {
        x: event.movementX,
        y: event.movementY
      }

      setRotation((prev) => ({
        x: prev.x + deltaMove.y * 0.005,
        y: prev.y + deltaMove.x * 0.005
      }))
    }

    const onMouseUp = () => {
      setIsDragging(false)
    }

    renderer.domElement.addEventListener('click', onMouseClick)
    renderer.domElement.addEventListener('mousedown', onMouseDown)
    renderer.domElement.addEventListener('mousemove', onMouseMove)
    renderer.domElement.addEventListener('mouseup', onMouseUp)
    renderer.domElement.addEventListener('mouseleave', onMouseUp)

    // Animation loop
    if (renderer) {
      const animate = () => {
        requestAnimationFrame(animate)

        bodyGroup.rotation.x = rotation.x
        bodyGroup.rotation.y = rotation.y

        // Make defect markers face camera
        defectPointsRef.current.forEach((marker) => {
          marker.lookAt(camera.position)
        })

        renderer.render(scene, camera)
      }

      animate()
    }

    // Handle window resize
    const handleResize = () => {
      const newWidth = mountRef.current.clientWidth
      const newHeight = mountRef.current.clientHeight
      camera.aspect = newWidth / newHeight
      camera.updateProjectionMatrix()
      renderer.setSize(newWidth, newHeight)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      if (renderer) {
        renderer.domElement.removeEventListener('click', onMouseClick)
        renderer.domElement.removeEventListener('mousedown', onMouseDown)
        renderer.domElement.removeEventListener('mousemove', onMouseMove)
        renderer.domElement.removeEventListener('mouseup', onMouseUp)
        renderer.domElement.removeEventListener('mouseleave', onMouseUp)
        mountRef.current?.removeChild(renderer.domElement)
      }
    }
  }, [rotation, isDragging])

  return (
    <div className="interactive-report-page">
      <section className="interactive-hero">
        <div className="container">
          <div className="interactive-header">
            <h1>{language === 'ar' ? 'تقرير فحص ذكي تفاعلي' : 'Interactive Smart Inspection Report'}</h1>
            <p>{language === 'ar' ? 'اكتشف عيوب سيارتك بشكل تفاعلي وذكي' : 'Discover your car issues interactively and intelligently'}</p>
          </div>
        </div>
      </section>

      <section className="interactive-content">
        <div className="container">
          <div className="interactive-grid">
            {/* 3D Viewer */}
            <div className="viewer-section">
              <div className="viewer-header">
                <h2>{language === 'ar' ? 'نموذج السيارة ثلاثي الأبعاد' : '3D Car Model'}</h2>
                <p className="viewer-hint">
                  {language === 'ar' 
                    ? '🖱️ اسحب لتدوير السيارة • انقر على النقاط الملونة لمشاهدة التفاصيل'
                    : '🖱️ Drag to rotate • Click colored points for details'}
                </p>
              </div>
              <div className="viewer-container" ref={mountRef}>
                {webglError && (
                  <div className="webgl-fallback">
                    <AlertCircle size={40} />
                    <p>{language === 'ar' ? 'نموذج ثلاثي الأبعاد تفاعلي' : 'Interactive 3D Model'}</p>
                    <span>{language === 'ar' ? 'استخدم النقائمة اليسرى لاختيار العيوب' : 'Use the left panel to select defects'}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Defects List */}
            <div className="defects-panel">
              <div className="panel-header">
                <h2>{language === 'ar' ? 'النقاط المكتشفة' : 'Detected Issues'}</h2>
                <span className="defect-count">{defectData.length}</span>
              </div>

              <div className="defects-list">
                {defectData.map((defect) => (
                  <div
                    key={defect.id}
                    className={`defect-item ${selectedDefect?.id === defect.id ? 'active' : ''}`}
                    onClick={() => setSelectedDefect(defect)}
                  >
                    <div className="defect-item-header">
                      <div
                        className="severity-dot"
                        style={{ backgroundColor: defect.severityColor }}
                      />
                      <div className="defect-item-info">
                        <h3>{language === 'ar' ? defect.name : defect.nameEn}</h3>
                        <span className="severity-label">{getSeverityLabel(defect.severity)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="panel-footer">
                <button className="upload-btn">
                  <Upload size={18} />
                  {language === 'ar' ? 'رفع تقرير PDF' : 'Upload PDF Report'}
                </button>
                <p className="upload-hint">
                  {language === 'ar'
                    ? 'رفع ملف PDF الخاص بتقرير السيارة'
                    : 'Upload your car inspection PDF file'}
                </p>
              </div>
            </div>
          </div>

          {/* Detail Modal */}
          {selectedDefect && (
            <div className="defect-detail-modal">
              <div className="modal-content">
                <button className="close-btn" onClick={() => setSelectedDefect(null)}>
                  <X size={24} />
                </button>

                <div className="modal-header" style={{ borderLeftColor: selectedDefect.severityColor }}>
                  <h2>{language === 'ar' ? selectedDefect.name : selectedDefect.nameEn}</h2>
                  <div className="severity-badge" style={{ backgroundColor: selectedDefect.severityColor }}>
                    {getSeverityLabel(selectedDefect.severity)}
                  </div>
                </div>

                <div className="modal-body">
                  <div className="section">
                    <h3>{language === 'ar' ? 'الوصف' : 'Description'}</h3>
                    <p>{language === 'ar' ? selectedDefect.description : selectedDefect.descriptionEn}</p>
                  </div>

                  <div className="section">
                    <h3>{language === 'ar' ? 'التوصيات' : 'Recommendations'}</h3>
                    <div className="recommendation-box">
                      <CheckCircle size={20} />
                      <p>{language === 'ar' ? selectedDefect.recommendations : selectedDefect.recommendationsEn}</p>
                    </div>
                  </div>

                  <div className="section">
                    <h3>{language === 'ar' ? 'التكلفة المتوقعة' : 'Estimated Cost'}</h3>
                    <div className="cost-display">
                      <span className="cost-value">{selectedDefect.estimatedCost}</span>
                      <span className="cost-currency">{language === 'ar' ? 'درهم' : 'AED'}</span>
                    </div>
                  </div>

                  <div className="cta-section">
                    <a href="/booking" className="cta-btn primary">
                      {language === 'ar' ? 'احجز الآن' : 'Book Service'}
                    </a>
                    <a href="/report" className="cta-btn secondary">
                      {language === 'ar' ? 'تحميل التقرير الكامل' : 'Download Full Report'}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Info Section */}
      <section className="interactive-info">
        <div className="container">
          <div className="info-grid">
            <div className="info-card">
              <AlertTriangle size={32} />
              <h3>{language === 'ar' ? 'معايير الخطورة' : 'Severity Levels'}</h3>
              <div className="severity-list">
                <div className="severity-item">
                  <div className="dot" style={{ backgroundColor: '#EA4335' }} />
                  <span>{language === 'ar' ? 'خطير جداً - يحتاج إصلاح فوري' : 'High - Urgent repair needed'}</span>
                </div>
                <div className="severity-item">
                  <div className="dot" style={{ backgroundColor: '#FFA500' }} />
                  <span>{language === 'ar' ? 'متوسط - يحتاج متابعة' : 'Medium - Needs monitoring'}</span>
                </div>
              </div>
            </div>

            <div className="info-card">
              <CheckCircle size={32} />
              <h3>{language === 'ar' ? 'كيفية الاستخدام' : 'How It Works'}</h3>
              <ul className="usage-list">
                <li>{language === 'ar' ? 'اسحب على النموذج لتدويره' : 'Drag the model to rotate'}</li>
                <li>{language === 'ar' ? 'انقر على النقاط الملونة' : 'Click colored points'}</li>
                <li>{language === 'ar' ? 'اقرأ التفاصيل والتوصيات' : 'Read details & recommendations'}</li>
                <li>{language === 'ar' ? 'احجز خدمة إصلاح' : 'Book repair service'}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default InteractiveReport
