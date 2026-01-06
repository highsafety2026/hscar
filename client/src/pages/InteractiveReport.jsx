import { useState, useEffect, useRef } from 'react'
import { Upload, AlertCircle, CheckCircle, AlertTriangle, FileText, Car, Eye, Loader, Brain, Sparkles } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import { api } from '../api/config'
import Car3DViewer from '../components/Car3DViewer'

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
  const [analysisResult, setAnalysisResult] = useState(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisStep, setAnalysisStep] = useState(0)
  const [pdfError, setPdfError] = useState(null)
  const fileInputRef = useRef(null)

  const analysisSteps = language === 'ar' 
    ? ['جاري رفع الملف...', 'قراءة محتوى التقرير...', 'تحليل بالذكاء الاصطناعي...', 'إنشاء التقرير...']
    : ['Uploading file...', 'Reading report content...', 'AI Analysis in progress...', 'Generating report...']

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
    
    if (!file.type.includes('pdf')) {
      setPdfError(language === 'ar' ? 'يرجى رفع ملف PDF فقط' : 'Please upload PDF files only')
      return
    }

    setPdfError(null)
    setIsAnalyzing(true)
    setAnalysisStep(0)
    setAnalysisResult(null)

    const formData = new FormData()
    formData.append('pdf', file)

    let stepInterval = null

    try {
      stepInterval = setInterval(() => {
        setAnalysisStep(prev => {
          if (prev < analysisSteps.length - 1) return prev + 1
          return prev
        })
      }, 2000)

      const response = await fetch('/api/chat/analyze-pdf', {
        method: 'POST',
        body: formData
      })

      if (!response.ok) throw new Error('Analysis failed')

      const data = await response.json()
      setAnalysisStep(analysisSteps.length)
      setAnalysisResult(data.reply)
    } catch (error) {
      console.error('Analysis error:', error)
      setPdfError(language === 'ar' ? 'حدث خطأ في التحليل. يرجى المحاولة مرة أخرى.' : 'Analysis failed. Please try again.')
    } finally {
      if (stepInterval) clearInterval(stepInterval)
      setIsAnalyzing(false)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  return (
    <div className="interactive-report-page" dir={isRTL ? 'rtl' : 'ltr'}>
      <section className="report-hero">
        <div className="container">
          <div className="hero-content">
            <div className="demo-tag">
              <Sparkles size={16} />
              {language === 'ar' ? 'تقرير ذكي' : 'Smart Report'}
            </div>
            <h1>{language === 'ar' ? 'تحليل التقارير بالذكاء الاصطناعي' : 'AI-Powered Report Analysis'}</h1>
            <p className="hero-subtitle">
              {language === 'ar' 
                ? 'ارفع تقرير الفحص واحصل على تحليل شامل ودقيق بالذكاء الاصطناعي'
                : 'Upload your inspection report for comprehensive AI analysis'}
            </p>
          </div>
        </div>
      </section>

      <section className="upload-analysis-section">
        <div className="container">
          <div className="upload-card">
            <div className="upload-icon-wrapper">
              <FileText size={48} />
            </div>
            <h3>{language === 'ar' ? 'رفع تقرير للتحليل' : 'Upload Report for Analysis'}</h3>
            <p>{language === 'ar' ? 'ارفع ملف PDF للحصول على تحليل ذكي شامل' : 'Upload a PDF file for comprehensive AI analysis'}</p>
            
            <input 
              ref={fileInputRef} 
              type="file" 
              accept=".pdf" 
              onChange={handleFileUpload} 
              style={{ display: 'none' }} 
            />
            
            <button 
              className="upload-btn-main" 
              onClick={handleUploadClick}
              disabled={isAnalyzing}
            >
              {isAnalyzing ? (
                <>
                  <Loader className="spin" size={20} />
                  {language === 'ar' ? 'جاري التحليل...' : 'Analyzing...'}
                </>
              ) : (
                <>
                  <Upload size={20} />
                  {language === 'ar' ? 'اختر ملف PDF' : 'Choose PDF File'}
                </>
              )}
            </button>

            {pdfError && (
              <div className="error-message">
                <AlertCircle size={16} />
                <span>{pdfError}</span>
              </div>
            )}
          </div>

          {isAnalyzing && (
            <div className="analysis-progress">
              <h4>{language === 'ar' ? 'جاري تحليل التقرير' : 'Analyzing Report'}</h4>
              <div className="progress-steps">
                {analysisSteps.map((step, index) => (
                  <div 
                    key={index} 
                    className={`progress-step ${index <= analysisStep ? 'active' : ''} ${index === analysisStep ? 'current' : ''}`}
                  >
                    <div className="step-icon">
                      {index < analysisStep ? (
                        <CheckCircle size={20} />
                      ) : index === analysisStep ? (
                        <Loader className="spin" size={20} />
                      ) : (
                        <div className="step-number">{index + 1}</div>
                      )}
                    </div>
                    <span className="step-text">{step}</span>
                  </div>
                ))}
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${((analysisStep + 1) / analysisSteps.length) * 100}%` }}
                />
              </div>
            </div>
          )}

          {analysisResult && (
            <div className="analysis-result">
              <div className="result-header">
                <Brain size={24} />
                <h3>{language === 'ar' ? 'نتيجة التحليل الذكي' : 'AI Analysis Result'}</h3>
              </div>
              <div className="result-content">
                <pre>{analysisResult}</pre>
              </div>
              <button className="close-result-btn" onClick={() => setAnalysisResult(null)}>
                {language === 'ar' ? 'إغلاق' : 'Close'}
              </button>
            </div>
          )}
        </div>
      </section>

      <section className="car-visual-section">
        <div className="container">
          <div className="section-header-center">
            <h2>{language === 'ar' ? 'نموذج السيارة ثلاثي الأبعاد' : '3D Vehicle Model'}</h2>
            <p className="section-subtitle">
              {language === 'ar' 
                ? 'اسحب للتدوير وشاهد السيارة من جميع الزوايا بما فيها الشاصي'
                : 'Drag to rotate and view the car from all angles including chassis'}
            </p>
          </div>
          <div className="car-display-card">
            <Car3DViewer language={language} />
            {carInfo && (
              <div className="car-info-badge">
                <Car size={18} />
                <span>{carInfo.brand} {carInfo.model}</span>
                <span className="year-badge">{carInfo.year}</span>
              </div>
            )}
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
