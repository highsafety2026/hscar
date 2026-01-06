import { useState, useEffect } from 'react'
import { adminApi } from '../api'

export default function PointsSystem({ token }) {
  const [customers, setCustomers] = useState([])
  const [pointsConfig, setPointsConfig] = useState({
    basic: 10,
    premium: 20,
    luxury: 30,
    pointsForDiscount: 100,
    discountAmount: 50,
    pointsForFreeInspection: 200
  })
  const [selectedCustomer, setSelectedCustomer] = useState(null)
  const [action, setAction] = useState({ type: '', points: 0 })

  useEffect(() => {
    loadCustomers()
    loadPointsConfig()
  }, [])

  const loadCustomers = async () => {
    try {
      const data = await adminApi.getCustomers(token)
      setCustomers(data)
    } catch (error) {
      console.error('Error loading customers:', error)
    }
  }

  const loadPointsConfig = async () => {
    try {
      const config = await adminApi.getPointsConfig(token)
      if (config) setPointsConfig(config)
    } catch (error) {
      console.error('Error loading points config:', error)
    }
  }

  const updatePointsConfig = async () => {
    try {
      await adminApi.updatePointsConfig(pointsConfig, token)
      alert('✅ تم تحديث إعدادات النقاط')
    } catch (error) {
      alert('❌ فشل تحديث الإعدادات')
    }
  }

  const redeemPoints = async () => {
    if (!selectedCustomer || !action.type) return
    
    try {
      await adminApi.redeemPoints({
        customerId: selectedCustomer.id,
        type: action.type,
        points: action.points
      }, token)
      alert('✅ تم استخدام النقاط بنجاح')
      loadCustomers()
      setSelectedCustomer(null)
      setAction({ type: '', points: 0 })
    } catch (error) {
      alert('❌ فشل استخدام النقاط')
    }
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ color: '#0B1F3A', marginBottom: '20px' }}>🎁 نظام النقاط</h2>

      {/* Points Configuration */}
      <div style={{ background: 'white', borderRadius: '15px', padding: '20px', marginBottom: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <h3 style={{ marginBottom: '15px' }}>⚙️ إعدادات النقاط</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>نقاط الفحص الأساسي</label>
            <input
              type="number"
              value={pointsConfig.basic}
              onChange={(e) => setPointsConfig({...pointsConfig, basic: parseInt(e.target.value)})}
              style={inputStyle}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>نقاط الفحص المتميز</label>
            <input
              type="number"
              value={pointsConfig.premium}
              onChange={(e) => setPointsConfig({...pointsConfig, premium: parseInt(e.target.value)})}
              style={inputStyle}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>نقاط الفحص الفاخر</label>
            <input
              type="number"
              value={pointsConfig.luxury}
              onChange={(e) => setPointsConfig({...pointsConfig, luxury: parseInt(e.target.value)})}
              style={inputStyle}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>نقاط للحصول على خصم</label>
            <input
              type="number"
              value={pointsConfig.pointsForDiscount}
              onChange={(e) => setPointsConfig({...pointsConfig, pointsForDiscount: parseInt(e.target.value)})}
              style={inputStyle}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>قيمة الخصم (درهم)</label>
            <input
              type="number"
              value={pointsConfig.discountAmount}
              onChange={(e) => setPointsConfig({...pointsConfig, discountAmount: parseInt(e.target.value)})}
              style={inputStyle}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>نقاط للفحص المجاني</label>
            <input
              type="number"
              value={pointsConfig.pointsForFreeInspection}
              onChange={(e) => setPointsConfig({...pointsConfig, pointsForFreeInspection: parseInt(e.target.value)})}
              style={inputStyle}
            />
          </div>
        </div>
        <button onClick={updatePointsConfig} style={{...buttonStyle, marginTop: '15px'}}>
          حفظ الإعدادات
        </button>
      </div>

      {/* Customers Points */}
      <div style={{ background: 'white', borderRadius: '15px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <h3 style={{ marginBottom: '15px' }}>👥 نقاط العملاء</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                <th style={thStyle}>اسم العميل</th>
                <th style={thStyle}>الهاتف</th>
                <th style={thStyle}>النقاط الحالية</th>
                <th style={thStyle}>إجمالي النقاط المكتسبة</th>
                <th style={thStyle}>النقاط المستخدمة</th>
                <th style={thStyle}>الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={tdStyle}>{customer.name}</td>
                  <td style={tdStyle}>{customer.phone}</td>
                  <td style={{...tdStyle, fontWeight: 'bold', color: '#0088FE'}}>{customer.points || 0}</td>
                  <td style={tdStyle}>{customer.totalPointsEarned || 0}</td>
                  <td style={tdStyle}>{customer.pointsUsed || 0}</td>
                  <td style={tdStyle}>
                    <button
                      onClick={() => setSelectedCustomer(customer)}
                      style={{...buttonStyle, padding: '5px 15px', fontSize: '14px'}}
                    >
                      استخدام النقاط
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Redeem Points Modal */}
      {selectedCustomer && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: 'white',
            borderRadius: '15px',
            padding: '30px',
            maxWidth: '500px',
            width: '90%'
          }}>
            <h3 style={{ marginBottom: '20px' }}>استخدام نقاط - {selectedCustomer.name}</h3>
            <p style={{ marginBottom: '15px' }}>النقاط المتاحة: <strong>{selectedCustomer.points}</strong></p>
            
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600' }}>نوع الاستخدام</label>
              <select
                value={action.type}
                onChange={(e) => {
                  const type = e.target.value
                  let points = 0
                  if (type === 'discount') points = pointsConfig.pointsForDiscount
                  if (type === 'free_inspection') points = pointsConfig.pointsForFreeInspection
                  setAction({ type, points })
                }}
                style={inputStyle}
              >
                <option value="">اختار...</option>
                <option value="discount">خصم {pointsConfig.discountAmount} ر.س ({pointsConfig.pointsForDiscount} نقطة)</option>
                <option value="free_inspection">فحص مجاني ({pointsConfig.pointsForFreeInspection} نقطة)</option>
              </select>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={redeemPoints}
                disabled={!action.type || selectedCustomer.points < action.points}
                style={{
                  ...buttonStyle,
                  flex: 1,
                  opacity: (!action.type || selectedCustomer.points < action.points) ? 0.5 : 1
                }}
              >
                تأكيد
              </button>
              <button
                onClick={() => {
                  setSelectedCustomer(null)
                  setAction({ type: '', points: 0 })
                }}
                style={{
                  ...buttonStyle,
                  flex: 1,
                  background: '#64748b'
                }}
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

const inputStyle = {
  width: '100%',
  padding: '10px',
  border: '1px solid #e2e8f0',
  borderRadius: '8px',
  fontSize: '14px'
}

const buttonStyle = {
  background: 'linear-gradient(135deg, #0B1F3A, #1565C0)',
  color: 'white',
  padding: '12px 24px',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  fontWeight: '600',
  fontSize: '16px'
}

const thStyle = {
  padding: '12px',
  textAlign: 'right',
  fontWeight: '600',
  color: '#0B1F3A'
}

const tdStyle = {
  padding: '12px',
  textAlign: 'right'
}
