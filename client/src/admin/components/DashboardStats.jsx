import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8']

export default function DashboardStats({ stats }) {
  if (!stats) return <div>جاري التحميل...</div>

  return (
    <div style={{ padding: '20px' }}>
      {/* Statistics Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        <StatCard
          title="فحوصات اليوم"
          value={stats.todayInspections}
          icon="📅"
          color="#0088FE"
        />
        <StatCard
          title="فحوصات الأسبوع"
          value={stats.weekInspections}
          icon="📊"
          color="#00C49F"
        />
        <StatCard
          title="فحوصات الشهر"
          value={stats.monthInspections}
          icon="📈"
          color="#FFBB28"
        />
        <StatCard
          title="إجمالي الدخل"
          value={`${stats.totalRevenue} ر.س`}
          icon="💰"
          color="#FF8042"
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        <StatCard
          title="العملاء الجدد"
          value={stats.newCustomers}
          icon="👥"
          color="#8884d8"
        />
        <StatCard
          title="أكثر نوع فحص طلبًا"
          value={stats.mostRequested}
          icon="⭐"
          color="#82ca9d"
          small
        />
      </div>

      {/* Revenue by Service Type */}
      <div style={{ background: 'white', borderRadius: '15px', padding: '20px', marginBottom: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <h3 style={{ marginBottom: '20px', color: '#0B1F3A' }}>أرباح كل نوع فحص</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={stats.revenueByType}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="revenue" fill="#0088FE" name="الدخل (ر.س)" />
            <Bar dataKey="count" fill="#00C49F" name="عدد الفحوصات" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Charts Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px' }}>
        {/* Revenue Trend */}
        <div style={{ background: 'white', borderRadius: '15px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <h3 style={{ marginBottom: '20px', color: '#0B1F3A' }}>اتجاه الدخل (آخر 7 أيام)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={stats.revenueTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#0088FE" strokeWidth={2} name="الدخل" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Service Distribution */}
        <div style={{ background: 'white', borderRadius: '15px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <h3 style={{ marginBottom: '20px', color: '#0B1F3A' }}>توزيع أنواع الفحص</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={stats.serviceDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {stats.serviceDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

function StatCard({ title, value, icon, color, small }) {
  return (
    <div style={{
      background: 'white',
      borderRadius: '15px',
      padding: '20px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      borderLeft: `4px solid ${color}`
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <p style={{ margin: '0 0 8px', color: '#64748b', fontSize: '14px' }}>{title}</p>
          <h2 style={{ margin: 0, color: '#0B1F3A', fontSize: small ? '18px' : '32px', fontWeight: 'bold' }}>
            {value}
          </h2>
        </div>
        <div style={{ fontSize: '40px' }}>{icon}</div>
      </div>
    </div>
  )
}
