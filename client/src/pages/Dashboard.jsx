import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  Calendar, Clock, CheckCircle, XCircle, Edit, Trash2, 
  Award, Bell, Car, LogOut, Gift, TrendingUp, Activity 
} from 'lucide-react';

const Dashboard = () => {
  const { user, logout, updatePoints } = useAuth();
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [maintenanceReminders, setMaintenanceReminders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchUserData();
  }, [user, navigate]);

  const fetchUserData = async () => {
    try {
      // Fetch appointments
      const apptResponse = await fetch(`/api/appointments?phone=${user.phone}`);
      if (apptResponse.ok) {
        const data = await apptResponse.json();
        setAppointments(data);
      }

      // Fetch notifications
      const notifResponse = await fetch(`/api/notifications?phone=${user.phone}`);
      if (notifResponse.ok) {
        const data = await notifResponse.json();
        setNotifications(data);
      }

      // Fetch maintenance reminders
      const maintResponse = await fetch(`/api/maintenance?phone=${user.phone}`);
      if (maintResponse.ok) {
        const data = await maintResponse.json();
        setMaintenanceReminders(data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelAppointment = async (id) => {
    if (!confirm('هل تريد إلغاء هذا الموعد؟')) return;

    try {
      const response = await fetch(`/api/appointments/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: user.phone })
      });

      if (response.ok) {
        setAppointments(appointments.filter(a => a.id !== id));
        alert('تم إلغاء الموعد بنجاح');
      }
    } catch (error) {
      console.error('Error canceling appointment:', error);
      alert('فشل إلغاء الموعد');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const redeemPoints = async (reward) => {
    if (user.points < reward.cost) {
      alert('نقاطك غير كافية لهذه المكافأة');
      return;
    }

    if (!confirm(`هل تريد استبدال ${reward.cost} نقطة بـ ${reward.name}؟`)) return;

    try {
      const response = await fetch('/api/rewards/redeem', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          phone: user.phone, 
          rewardId: reward.id,
          points: reward.cost
        })
      });

      if (response.ok) {
        updatePoints(-reward.cost);
        alert(`تم استبدال النقاط بنجاح! 🎉`);
      }
    } catch (error) {
      console.error('Error redeeming:', error);
      alert('فشل استبدال النقاط');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Activity className="w-12 h-12 animate-spin text-indigo-600 mx-auto mb-4" />
          <p className="text-gray-600">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  const upcomingAppointments = appointments.filter(a => 
    new Date(a.date) > new Date() && a.status !== 'cancelled'
  );
  const pastAppointments = appointments.filter(a => 
    new Date(a.date) <= new Date() || a.status === 'completed'
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">مرحباً، {user.name} 👋</h1>
              <p className="text-indigo-100 mt-1">{user.phone}</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition"
            >
              <LogOut className="w-5 h-5" />
              <span>تسجيل خروج</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-yellow-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">نقاط الولاء</p>
                <p className="text-3xl font-bold text-yellow-600">{user.points}</p>
              </div>
              <Award className="w-12 h-12 text-yellow-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">المواعيد القادمة</p>
                <p className="text-3xl font-bold text-blue-600">{upcomingAppointments.length}</p>
              </div>
              <Calendar className="w-12 h-12 text-blue-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">المواعيد المكتملة</p>
                <p className="text-3xl font-bold text-green-600">{pastAppointments.length}</p>
              </div>
              <CheckCircle className="w-12 h-12 text-green-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-red-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">تذكيرات الصيانة</p>
                <p className="text-3xl font-bold text-red-600">{maintenanceReminders.length}</p>
              </div>
              <Bell className="w-12 h-12 text-red-500" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Upcoming Appointments */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Calendar className="w-7 h-7 text-indigo-600" />
                المواعيد القادمة
              </h2>

              {upcomingAppointments.length === 0 ? (
                <p className="text-gray-500 text-center py-8">لا توجد مواعيد قادمة</p>
              ) : (
                <div className="space-y-4">
                  {upcomingAppointments.map(appointment => (
                    <div key={appointment.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-bold text-lg text-gray-800">{appointment.service}</h3>
                          <p className="text-gray-600 mt-1">{appointment.carModel}</p>
                        </div>
                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                          {appointment.status === 'confirmed' ? 'مؤكد' : 'قيد الانتظار'}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-4 text-gray-600 text-sm mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(appointment.date).toLocaleDateString('ar-SA')}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {appointment.time}
                        </span>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => navigate(`/booking/edit/${appointment.id}`)}
                          className="flex-1 bg-indigo-50 text-indigo-600 py-2 rounded-lg hover:bg-indigo-100 transition flex items-center justify-center gap-2"
                        >
                          <Edit className="w-4 h-4" />
                          تعديل
                        </button>
                        <button
                          onClick={() => handleCancelAppointment(appointment.id)}
                          className="flex-1 bg-red-50 text-red-600 py-2 rounded-lg hover:bg-red-100 transition flex items-center justify-center gap-2"
                        >
                          <Trash2 className="w-4 h-4" />
                          إلغاء
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Past Appointments */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Clock className="w-7 h-7 text-gray-600" />
                المواعيد السابقة
              </h2>

              {pastAppointments.length === 0 ? (
                <p className="text-gray-500 text-center py-8">لا توجد مواعيد سابقة</p>
              ) : (
                <div className="space-y-3">
                  {pastAppointments.slice(0, 5).map(appointment => (
                    <div key={appointment.id} className="border border-gray-100 rounded-lg p-4 bg-gray-50">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-semibold text-gray-800">{appointment.service}</h3>
                          <p className="text-sm text-gray-600 mt-1">
                            {new Date(appointment.date).toLocaleDateString('ar-SA')}
                          </p>
                        </div>
                        <CheckCircle className="w-6 h-6 text-green-500" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Loyalty Points */}
            <div className="bg-gradient-to-br from-yellow-400 to-amber-500 rounded-xl shadow-lg p-6 text-white">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Award className="w-6 h-6" />
                نقاط الولاء
              </h3>
              <div className="text-center mb-4">
                <p className="text-5xl font-bold mb-2">{user.points}</p>
                <p className="text-yellow-100">نقطة متاحة</p>
              </div>
              
              <div className="bg-white/20 rounded-lg p-4 mb-4">
                <p className="text-sm mb-2">احصل على نقاط مع كل حجز:</p>
                <ul className="text-sm space-y-1">
                  <li>• فحص أساسي: 20 نقطة</li>
                  <li>• فحص شامل: 50 نقطة</li>
                  <li>• فحص VIP: 100 نقطة</li>
                </ul>
              </div>

              <button
                onClick={() => navigate('/rewards')}
                className="w-full bg-white text-amber-600 font-bold py-3 rounded-lg hover:bg-yellow-50 transition flex items-center justify-center gap-2"
              >
                <Gift className="w-5 h-5" />
                استبدل نقاطك
              </button>
            </div>

            {/* Maintenance Reminders */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Car className="w-6 h-6 text-red-600" />
                تذكيرات الصيانة
              </h3>

              {maintenanceReminders.length === 0 ? (
                <p className="text-gray-500 text-center py-4 text-sm">لا توجد تذكيرات حالياً</p>
              ) : (
                <div className="space-y-3">
                  {maintenanceReminders.map(reminder => (
                    <div key={reminder.id} className="bg-red-50 border border-red-200 rounded-lg p-3">
                      <div className="flex items-start gap-2">
                        <Bell className="w-5 h-5 text-red-600 mt-1" />
                        <div>
                          <p className="font-semibold text-gray-800 text-sm">{reminder.title}</p>
                          <p className="text-xs text-gray-600 mt-1">{reminder.description}</p>
                          <p className="text-xs text-red-600 mt-2">
                            {reminder.dueDate ? `موعد: ${new Date(reminder.dueDate).toLocaleDateString('ar-SA')}` : 'قريباً'}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <button className="w-full mt-4 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition">
                احجز موعد صيانة
              </button>
            </div>

            {/* Notifications */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Bell className="w-6 h-6 text-indigo-600" />
                الإشعارات
              </h3>

              {notifications.length === 0 ? (
                <p className="text-gray-500 text-center py-4 text-sm">لا توجد إشعارات جديدة</p>
              ) : (
                <div className="space-y-2">
                  {notifications.slice(0, 5).map(notif => (
                    <div key={notif.id} className="bg-blue-50 border border-blue-100 rounded-lg p-3">
                      <p className="text-sm text-gray-800">{notif.message}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(notif.createdAt).toLocaleDateString('ar-SA')}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
