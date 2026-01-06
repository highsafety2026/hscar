import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Phone, User, Award, LogIn } from 'lucide-react';

const Login = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!name.trim()) {
      setError('الرجاء إدخال الاسم');
      return;
    }

    if (!phone.trim() || phone.length < 10) {
      setError('الرجاء إدخال رقم هاتف صحيح');
      return;
    }

    setLoading(true);

    try {
      const result = await login(name, phone);
      
      if (result.success) {
        // Show success message
        alert(`مرحباً ${name}! تم منحك 10 نقاط للدخول 🎉`);
        navigate('/dashboard');
      } else {
        setError(result.error || 'فشل تسجيل الدخول');
      }
    } catch (err) {
      setError('حدث خطأ غير متوقع');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="inline-block p-4 bg-white/10 rounded-full mb-4">
            <LogIn className="w-16 h-16 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">HS Car Report</h1>
          <p className="text-indigo-200">سجل دخولك واجمع النقاط</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            تسجيل الدخول
          </h2>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Input */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                <User className="inline w-5 h-5 ml-2" />
                الاسم الكامل
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="أدخل اسمك"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                disabled={loading}
              />
            </div>

            {/* Phone Input */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                <Phone className="inline w-5 h-5 ml-2" />
                رقم الهاتف
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="05xxxxxxxx"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                disabled={loading}
                dir="ltr"
              />
            </div>

            {/* Rewards Info */}
            <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Award className="w-5 h-5 text-yellow-600" />
                <span className="font-semibold text-gray-800">مكافأة التسجيل</span>
              </div>
              <p className="text-sm text-gray-600">
                احصل على <strong className="text-yellow-600">10 نقاط</strong> فور تسجيل الدخول!
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-3 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              {loading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
            </button>
          </form>

          {/* Additional Info */}
          <div className="mt-6 text-center text-sm text-gray-600">
            <p>بتسجيل دخولك، أنت توافق على</p>
            <a href="#" className="text-indigo-600 hover:underline">شروط الخدمة</a>
            {' و '}
            <a href="#" className="text-indigo-600 hover:underline">سياسة الخصوصية</a>
          </div>
        </div>

        {/* Benefits */}
        <div className="mt-6 grid grid-cols-3 gap-4 text-center">
          <div className="bg-white/10 backdrop-blur rounded-lg p-4">
            <Award className="w-8 h-8 text-yellow-300 mx-auto mb-2" />
            <p className="text-white text-sm font-semibold">نقاط ولاء</p>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-lg p-4">
            <Phone className="w-8 h-8 text-green-300 mx-auto mb-2" />
            <p className="text-white text-sm font-semibold">إشعارات فورية</p>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-lg p-4">
            <User className="w-8 h-8 text-blue-300 mx-auto mb-2" />
            <p className="text-white text-sm font-semibold">متابعة سهلة</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
