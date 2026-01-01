import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load user from localStorage
    const storedUser = localStorage.getItem('hs_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (name, phone) => {
    try {
      // Create user data locally first
      const userWithPoints = {
        name,
        phone,
        points: 10, // Initial login bonus
        loginDate: new Date().toISOString()
      };

      // Try to send to backend, but don't fail if it's not available
      try {
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, phone }),
          signal: AbortSignal.timeout(10000) // 10 second timeout
        });

        if (response.ok) {
          const userData = await response.json();
          userWithPoints.points = (userData.points || 0) + 10;
          
          // Update points on server
          await fetch('/api/users/points', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
              phone, 
              points: userWithPoints.points,
              action: 'login'
            }),
            signal: AbortSignal.timeout(10000)
          }).catch(err => console.log('Points update skipped'));
        }
      } catch (fetchError) {
        console.log('Backend not available, using local storage only');
      }

      localStorage.setItem('hs_user', JSON.stringify(userWithPoints));
      setUser(userWithPoints);

      return { success: true, user: userWithPoints };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'حدث خطأ في الاتصال' };
    }
  };

  const logout = () => {
    localStorage.removeItem('hs_user');
    setUser(null);
  };

  const updatePoints = (points) => {
    if (user) {
      const updatedUser = { ...user, points: user.points + points };
      localStorage.setItem('hs_user', JSON.stringify(updatedUser));
      setUser(updatedUser);

      // Update on server
      fetch('/api/users/points', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          phone: user.phone, 
          points: updatedUser.points,
          action: 'update'
        }),
        signal: AbortSignal.timeout(10000)
      }).catch(console.error);
    }
  };

  const value = {
    user,
    loading,
    login,
    logout,
    updatePoints,
    isAuthenticated: !!user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
