import { useState, useEffect, useRef } from 'react'
import { Upload, AlertCircle, CheckCircle, AlertTriangle, Download, FileText, Car, Eye } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import jsPDF from 'jspdf'
import 'jspdf-autotable'

const getSeverityColor = (severity) => {
  const colorMap = { high: '#EA4335', medium: '#FFA500', low: '#4285F4' }
  return colorMap[severity] || '#999'
}

const getSeverityLabel = (severity, lang) => {
  if (lang === 'ar') {
    return severity === 'high' ? 'خطير' : severity === 'medium' ? 'متوسط' : 'منخفض'
  }
  return severity === 'high' ? 'High' : severity === 'medium' ? 'Medium' : 'Low'
}

function InteractiveReport() {
  const { language } = useLanguage()
  const isRTL = language === 'ar'
  const [selectedDefect, setSelectedDefect] = useState(null)
  const [defectData, setDefectData] = useState([])
  const [carInfo, setCarInfo] = useState(null)
  const [uploadStatus, setUploadStatus] = useState(null)
  const fileInputRef = useRef(null)

  useEffect(() => {
    fetch('/data/defects.json')
      .then(res => res.json())
      .then(data => {
        setCarInfo(data.carInfo)
        setDefectData(data.defects || [])
      })
      .catch(err => {
        console.error('Error loading defect data:', err)
        setDefectData([])
      })
  }, [])

  const handleUploadClick = () => fileInputRef.current?.click()

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploadStatus({ status: 'uploading', message: language === 'ar' ? 'جاري الرفع...' : 'Uploading...' })
    setTimeout(() => {
      setUploadStatus({
        status: 'success',
        message: language === 'ar' ? 'تم الرفع بنجاح! التحليل قريباً' : 'Upload successful! Analysis coming soon'
      })
      setTimeout(() => setUploadStatus(null), 3000)
    }, 1000)
  }

  const generatePDF = () => {
    const doc = new jsPDF()
    
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(20)
    doc.setTextColor(11, 31, 58)
    doc.text('High Safety International', 105, 20, { align: 'center' })
    
    doc.setFontSize(14)
    doc.setTextColor(100)
    doc.text('Vehicle Inspection Report', 105, 30, { align: 'center' })
    
    if (carInfo) {
      doc.setFontSize(12)
      doc.setTextColor(0)
      doc.text(`Vehicle: ${carInfo.brand} ${carInfo.model} (${carInfo.year})`, 20, 45)
      doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 52)
      doc.text(`Report ID: HSI-${Date.now().toString().slice(-6)}`, 20, 59)
    }
    
    doc.setDrawColor(200, 157, 42)
    doc.setLineWidth(1)
    doc.line(20, 65, 190, 65)
    
    doc.setFontSize(14)
    doc.setTextColor(11, 31, 58)
    doc.text('Inspection Results', 20, 75)
    
    const tableData = defectData.map((d, i) => [
      i + 1,
      d.location,
      d.type,
      d.severity === 'high' ? 'High' : d.severity === 'medium' ? 'Medium' : 'Low',
      d.shortDesc,
      `${d.estimatedCostMin}-${d.estimatedCostMax} AED`
    ])
    
    doc.autoTable({
      startY: 80,
      head: [['#', 'Location', 'Type', 'Severity', 'Description', 'Est. Cost']],
      body: tableData,
      theme: 'striped',
      headStyles: {
        fillColor: [11, 31, 58],
        textColor: 255,
        fontStyle: 'bold'
      },
      columnStyles: {
        0: { cellWidth: 10 },
        1: { cellWidth: 30 },
        2: { cellWidth: 25 },
        3: { cellWidth: 20 },
        4: { cellWidth: 55 },
        5: { cellWidth: 30 }
      },
      alternateRowStyles: { fillColor: [245, 245, 245] }
    })
    
    const finalY = doc.lastAutoTable.finalY + 15
    
    doc.setFontSize(12)
    doc.setTextColor(11, 31, 58)
    doc.text('Detailed Findings:', 20, finalY)
    
    let yPos = finalY + 10
    defectData.forEach((d, i) => {
      if (yPos > 260) {
        doc.addPage()
        yPos = 20
      }
      
      const severityColor = d.severity === 'high' ? [234, 67, 53] : d.severity === 'medium' ? [255, 165, 0] : [66, 133, 244]
      doc.setFillColor(...severityColor)
      doc.circle(25, yPos + 2, 3, 'F')
      
      doc.setFontSize(11)
      doc.setTextColor(0)
      doc.setFont('helvetica', 'bold')
      doc.text(`${i + 1}. ${d.location} - ${d.type}`, 32, yPos + 4)
      
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(10)
      doc.setTextColor(80)
      
      const descLines = doc.splitTextToSize(d.detailedDesc, 150)
      doc.text(descLines, 32, yPos + 12)
      yPos += 12 + (descLines.length * 5)
      
      doc.text(`Recommendation: ${d.recommendations}`, 32, yPos)
      yPos += 10
      
      doc.setTextColor(200, 157, 42)
      doc.text(`Estimated Cost: ${d.estimatedCostMin}-${d.estimatedCostMax} AED`, 32, yPos)
      yPos += 15
    })
    
    const pageCount = doc.internal.getNumberOfPages()
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i)
      doc.setFontSize(8)
      doc.setTextColor(150)
      doc.text(`Page ${i} of ${pageCount}`, 105, 290, { align: 'center' })
      doc.text('High Safety International - www.highsafety.ae', 105, 295, { align: 'center' })
    }
    
    doc.save(`inspection-report-${carInfo?.model || 'vehicle'}-${Date.now()}.pdf`)
  }

  return (
    <div className="interactive-report-page" dir={isRTL ? 'rtl' : 'ltr'}>
      <section className="report-hero">
        <div className="container">
          <div className="hero-content">
            <div className="demo-tag">
              <Car size={16} />
              {language === 'ar' ? 'تقرير الفحص' : 'Inspection Report'}
            </div>
            <h1>{language === 'ar' ? 'تقرير الفحص التفاعلي' : 'Interactive Inspection Report'}</h1>
            {carInfo && (
              <div className="car-badge">
                <span className="car-name">{carInfo.brand} {carInfo.model}</span>
                <span className="car-year">{carInfo.year}</span>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="car-visual-section">
        <div className="container">
          <div className="car-display-card">
            <div className="car-image-container">
              <svg viewBox="0 0 400 180" className="car-svg">
                <defs>
                  <linearGradient id="carBody" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#1a3a5c"/>
                    <stop offset="100%" stopColor="#0d1f30"/>
                  </linearGradient>
                  <linearGradient id="glass" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#88ccff"/>
                    <stop offset="100%" stopColor="#5599cc"/>
                  </linearGradient>
                </defs>
                
                <ellipse cx="200" cy="160" rx="170" ry="15" fill="rgba(0,0,0,0.1)"/>
                
                <path d="M40 110 L60 110 L80 70 L160 55 L260 55 L320 70 L360 110 L380 110 L380 130 L360 140 L40 140 L20 130 Z" fill="url(#carBody)" stroke="#0d1f30" strokeWidth="2"/>
                
                <path d="M95 70 L155 58 L155 100 L80 100 Z" fill="url(#glass)" opacity="0.8"/>
                <path d="M165 58 L255 58 L255 100 L165 100 Z" fill="url(#glass)" opacity="0.8"/>
                <path d="M265 58 L305 70 L305 100 L265 100 Z" fill="url(#glass)" opacity="0.8"/>
                
                <circle cx="95" cy="140" r="28" fill="#222"/>
                <circle cx="95" cy="140" r="20" fill="#444"/>
                <circle cx="95" cy="140" r="8" fill="#666"/>
                
                <circle cx="305" cy="140" r="28" fill="#222"/>
                <circle cx="305" cy="140" r="20" fill="#444"/>
                <circle cx="305" cy="140" r="8" fill="#666"/>
                
                <rect x="25" y="100" width="25" height="12" rx="3" fill="#ffee88"/>
                <rect x="350" y="100" width="25" height="12" rx="3" fill="#ff6666"/>
                
                <rect x="140" y="120" width="120" height="8" rx="2" fill="#333"/>
                
                {defectData.map((d, i) => {
                  const positions = [
                    { x: 50, y: 105 },
                    { x: 95, y: 140 },
                    { x: 365, y: 105 }
                  ]
                  const pos = positions[i] || { x: 200, y: 100 }
                  return (
                    <g key={d.id} onClick={() => setSelectedDefect(d)} style={{ cursor: 'pointer' }}>
                      <circle cx={pos.x} cy={pos.y} r="12" fill={getSeverityColor(d.severity)} opacity="0.3">
                        <animate attributeName="r" values="12;16;12" dur="1.5s" repeatCount="indefinite"/>
                      </circle>
                      <circle cx={pos.x} cy={pos.y} r="8" fill={getSeverityColor(d.severity)}/>
                      <text x={pos.x} y={pos.y + 4} textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">{i + 1}</text>
                    </g>
                  )
                })}
              </svg>
            </div>
            <p className="car-instructions">
              {language === 'ar' ? 'اضغط على النقاط المرقمة لعرض التفاصيل' : 'Click numbered points to view details'}
            </p>
          </div>
        </div>
      </section>

      <section className="defects-table-section">
        <div className="container">
          <div className="section-header-row">
            <div className="section-title">
              <AlertTriangle size={24} />
              <h2>{language === 'ar' ? 'نتائج الفحص' : 'Inspection Results'}</h2>
              <span className="count-badge">{defectData.length}</span>
            </div>
            <button className="download-pdf-btn" onClick={generatePDF}>
              <Download size={18} />
              {language === 'ar' ? 'تحميل PDF' : 'Download PDF'}
            </button>
          </div>

          <div className="defects-table-wrapper">
            <table className="defects-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>{language === 'ar' ? 'الموقع' : 'Location'}</th>
                  <th>{language === 'ar' ? 'النوع' : 'Type'}</th>
                  <th>{language === 'ar' ? 'الخطورة' : 'Severity'}</th>
                  <th>{language === 'ar' ? 'الوصف' : 'Description'}</th>
                  <th>{language === 'ar' ? 'التكلفة المقدرة' : 'Est. Cost'}</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {defectData.map((d, i) => (
                  <tr key={d.id} className={selectedDefect?.id === d.id ? 'selected' : ''}>
                    <td>{i + 1}</td>
                    <td>
                      <strong>{language === 'ar' ? d.locationAr : d.location}</strong>
                    </td>
                    <td>{language === 'ar' ? d.typeAr : d.type}</td>
                    <td>
                      <span className="severity-badge" style={{ backgroundColor: getSeverityColor(d.severity) }}>
                        {getSeverityLabel(d.severity, language)}
                      </span>
                    </td>
                    <td className="desc-cell">{language === 'ar' ? d.shortDescAr : d.shortDesc}</td>
                    <td className="cost-cell">{d.estimatedCostMin}-{d.estimatedCostMax} {language === 'ar' ? 'درهم' : 'AED'}</td>
                    <td>
                      <button className="view-btn" onClick={() => setSelectedDefect(d)}>
                        <Eye size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {defectData.length === 0 && (
            <div className="no-defects">
              <CheckCircle size={48} />
              <p>{language === 'ar' ? 'لم يتم اكتشاف مشاكل' : 'No issues detected'}</p>
            </div>
          )}

          <div className="upload-section">
            <input ref={fileInputRef} type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={handleFileUpload} style={{ display: 'none' }} />
            <button className="upload-btn" onClick={handleUploadClick}>
              <Upload size={20} />
              {language === 'ar' ? 'رفع تقرير للتحليل' : 'Upload Report for Analysis'}
            </button>
            {uploadStatus && (
              <div className={`upload-msg ${uploadStatus.status}`}>
                {uploadStatus.status === 'success' && <CheckCircle size={16} />}
                {uploadStatus.status === 'error' && <AlertCircle size={16} />}
                <span>{uploadStatus.message}</span>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="legend-section">
        <div className="container">
          <div className="legend-grid">
            <div className="legend-item"><div className="legend-dot high"/><span>{language === 'ar' ? 'خطير - إصلاح فوري' : 'High - Urgent'}</span></div>
            <div className="legend-item"><div className="legend-dot medium"/><span>{language === 'ar' ? 'متوسط - متابعة' : 'Medium - Monitor'}</span></div>
            <div className="legend-item"><div className="legend-dot low"/><span>{language === 'ar' ? 'منخفض - بسيط' : 'Low - Minor'}</span></div>
          </div>
        </div>
      </section>

      {selectedDefect && (
        <div className="defect-modal-overlay" onClick={() => setSelectedDefect(null)}>
          <div className="defect-modal" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedDefect(null)}>&times;</button>
            <div className="modal-header" style={{ borderColor: getSeverityColor(selectedDefect.severity) }}>
              <div className="severity-dot" style={{ backgroundColor: getSeverityColor(selectedDefect.severity) }}/>
              <div>
                <h3>{language === 'ar' ? selectedDefect.locationAr : selectedDefect.location}</h3>
                <span className="modal-type">{language === 'ar' ? selectedDefect.typeAr : selectedDefect.type}</span>
              </div>
              <span className="modal-severity" style={{ backgroundColor: getSeverityColor(selectedDefect.severity) }}>
                {getSeverityLabel(selectedDefect.severity, language)}
              </span>
            </div>
            <div className="modal-body">
              <div className="modal-section">
                <h4>{language === 'ar' ? 'الوصف' : 'Description'}</h4>
                <p>{language === 'ar' ? selectedDefect.detailedDescAr : selectedDefect.detailedDesc}</p>
              </div>
              <div className="modal-section">
                <h4>{language === 'ar' ? 'التوصيات' : 'Recommendations'}</h4>
                <p>{language === 'ar' ? selectedDefect.recommendationsAr : selectedDefect.recommendations}</p>
              </div>
              <div className="modal-footer">
                <div className="cost-display">
                  <span className="cost-label">{language === 'ar' ? 'التكلفة المقدرة' : 'Estimated Cost'}</span>
                  <span className="cost-value">{selectedDefect.estimatedCostMin} - {selectedDefect.estimatedCostMax} {language === 'ar' ? 'درهم' : 'AED'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default InteractiveReport
