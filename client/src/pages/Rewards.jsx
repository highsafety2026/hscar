import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Gift, Award, Star, Zap, Crown, Sparkles, TrendingUp } from 'lucide-react';

const Rewards = () => {
  const { user, updatePoints } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null;
  }

  const rewards = [
    {
      id: 1,
      name: 'فحص أساسي مجاني',
      description: 'فحص أساسي شامل لسيارتك',
      cost: 100,
      icon: Star,
      color: 'from-blue-400 to-blue-600'
    },
    {
      id: 2,
      name: 'خصم 20% على الفحص الشامل',
      description: 'وفّر 20% على الفحص الشامل',
      cost: 150,
      icon: Zap,
      color: 'from-green-400 to-green-600'
    },
    {
      id: 3,
      name: 'فحص VIP مجاني',
      description: 'فحص VIP متكامل لسيارتك',
      cost: 300,
      icon: Crown,
      color: 'from-purple-400 to-purple-600'
    },
    {
      id: 4,
      name: 'خصم 50 ريال',
      description: 'قسيمة خصم 50 ريال على أي خدمة',
      cost: 200,
      icon: Gift,
      color: 'from-pink-400 to-pink-600'
    },
    {
      id: 5,
      name: 'فحص مجاني + غسيل',
      description: 'فحص أساسي + غسيل سيارة مجاني',
      cost: 250,
      icon: Sparkles,
      color: 'from-cyan-400 to-cyan-600'
    },
    {
      id: 6,
      name: 'عضوية VIP لمدة شهر',
      description: 'خصومات حصرية وأولوية في الحجز',
      cost: 500,
      icon: Crown,
      color: 'from-yellow-400 to-amber-600'
    }
  ];

  const handleRedeem = async (reward) => {
    if (user.points < reward.cost) {
      alert('❌ نقاطك غير كافية لهذه المكافأة');
      return;
    }

    if (!confirm(`هل تريد استبدال ${reward.cost} نقطة بـ ${reward.name}؟`)) {
      return;
    }

    try {
      const response = await fetch('/api/rewards/redeem', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          phone: user.phone, 
          rewardId: reward.id,
          rewardName: reward.name,
          points: reward.cost
        })
      });

      if (response.ok) {
        updatePoints(-reward.cost);
        alert(`🎉 تم استبدال ${reward.name} بنجاح!\nسيتم إرسال الكود عبر الإشعارات`);
      } else {
        alert('❌ فشل استبدال النقاط، حاول مرة أخرى');
      }
    } catch (error) {
      console.error('Error redeeming:', error);
      alert('❌ حدث خطأ، حاول مرة أخرى');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <button
            onClick={() => navigate('/dashboard')}
            className="text-white hover:underline mb-4"
          >
            ← العودة للوحة التحكم
          </button>
          
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold mb-2">متجر المكافآت 🎁</h1>
              <p className="text-yellow-100">استبدل نقاطك بمكافآت رائعة</p>
            </div>
            <div className="bg-white/20 backdrop-blur rounded-2xl p-6 text-center">
              <Award className="w-12 h-12 mx-auto mb-2" />
              <p className="text-sm text-yellow-100">نقاطك</p>
              <p className="text-4xl font-bold">{user.points}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* How to Earn Points */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-2xl shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <TrendingUp className="w-7 h-7" />
            كيف تجمع المزيد من النقاط؟
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white/20 backdrop-blur rounded-lg p-4">
              <p className="font-bold text-xl mb-1">+10</p>
              <p className="text-sm">تسجيل الدخول يومياً</p>
            </div>
            <div className="bg-white/20 backdrop-blur rounded-lg p-4">
              <p className="font-bold text-xl mb-1">+20</p>
              <p className="text-sm">فحص أساسي</p>
            </div>
            <div className="bg-white/20 backdrop-blur rounded-lg p-4">
              <p className="font-bold text-xl mb-1">+50</p>
              <p className="text-sm">فحص شامل</p>
            </div>
            <div className="bg-white/20 backdrop-blur rounded-lg p-4">
              <p className="font-bold text-xl mb-1">+100</p>
              <p className="text-sm">فحص VIP</p>
            </div>
          </div>
        </div>

        {/* Rewards Grid */}
        <h2 className="text-3xl font-bold text-gray-800 mb-8">المكافآت المتاحة</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rewards.map(reward => {
            const Icon = reward.icon;
            const canAfford = user.points >= reward.cost;

            return (
              <div 
                key={reward.id}
                className={`bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition transform hover:scale-[1.02] ${
                  !canAfford && 'opacity-60'
                }`}
              >
                <div className={`bg-gradient-to-r ${reward.color} p-6 text-white`}>
                  <Icon className="w-12 h-12 mb-3" />
                  <h3 className="text-xl font-bold mb-2">{reward.name}</h3>
                  <p className="text-sm opacity-90">{reward.description}</p>
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <p className="text-gray-600 text-sm">السعر</p>
                      <p className="text-2xl font-bold text-gray-800 flex items-center gap-1">
                        {reward.cost}
                        <Award className="w-5 h-5 text-yellow-500" />
                      </p>
                    </div>
                    <div className="text-left">
                      <p className="text-gray-600 text-sm">نقاطك</p>
                      <p className="text-2xl font-bold text-indigo-600">{user.points}</p>
                    </div>
                  </div>

                  {canAfford ? (
                    <button
                      onClick={() => handleRedeem(reward)}
                      className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-3 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition transform hover:scale-[1.02]"
                    >
                      استبدل الآن
                    </button>
                  ) : (
                    <div className="text-center">
                      <p className="text-red-600 font-semibold mb-2">
                        تحتاج {reward.cost - user.points} نقطة إضافية
                      </p>
                      <button
                        disabled
                        className="w-full bg-gray-300 text-gray-600 font-bold py-3 rounded-lg cursor-not-allowed"
                      >
                        نقاط غير كافية
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="mt-12 bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-2xl shadow-lg p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">احجز الآن واحصل على نقاط!</h3>
          <p className="mb-6 text-green-50">كل حجز يمنحك نقاط يمكنك استبدالها بمكافآت رائعة</p>
          <button
            onClick={() => navigate('/booking')}
            className="bg-white text-green-600 font-bold px-8 py-3 rounded-lg hover:bg-green-50 transition transform hover:scale-105"
          >
            احجز موعدك الآن
          </button>
        </div>
      </div>
    </div>
  );
};

export default Rewards;
