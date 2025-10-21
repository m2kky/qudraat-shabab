import React, { createContext, useContext, useEffect, useState } from 'react';
import { collection, getDocs, query, where, updateDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase/config';

const TokenAuthContext = createContext();

export function useTokenAuth() {
  return useContext(TokenAuthContext);
}

export function TokenAuthProvider({ children }) {
  const [currentToken, setCurrentToken] = useState(null);
  const [tokenData, setTokenData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // تحقق من وجود Token في localStorage
  useEffect(() => {
    const savedToken = localStorage.getItem('accessToken');
    if (savedToken) {
      validateToken(savedToken);
    } else {
      setLoading(false);
    }
  }, []);

  // دالة للتحقق من صحة الـ Token
  const validateToken = async (token) => {
    try {
      setLoading(true);
      
      // البحث عن الـ Token في Firestore
      const tokensRef = collection(db, 'accessTokens');
      const q = query(tokensRef, where('token', '==', token));
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        // Token غير موجود
        setCurrentToken(null);
        setTokenData(null);
        setIsAuthenticated(false);
        localStorage.removeItem('accessToken');
        return false;
      }

      const tokenDoc = querySnapshot.docs[0];
      const tokenInfo = { id: tokenDoc.id, ...tokenDoc.data() };

      // التحقق من حالة الـ Token
      if (!tokenInfo.isActive) {
        alert('هذا الـ Token معطل');
        logout();
        return false;
      }

      // التحقق من انتهاء الصلاحية
      if (tokenInfo.expiresAt) {
        const now = new Date();
        const expiresAt = new Date(tokenInfo.expiresAt);
        if (now > expiresAt) {
          alert('انتهت صلاحية هذا الـ Token');
          logout();
          return false;
        }
      }

      // تحديث آخر استخدام
      await updateDoc(doc(db, 'accessTokens', tokenDoc.id), {
        lastUsed: new Date().toISOString(),
        usageCount: (tokenInfo.usageCount || 0) + 1
      });

      // حفظ بيانات الـ Token
      setCurrentToken(token);
      setTokenData(tokenInfo);
      setIsAuthenticated(true);
      localStorage.setItem('accessToken', token);
      
      return true;
    } catch (error) {
      console.error('خطأ في التحقق من الـ Token:', error);
      setCurrentToken(null);
      setTokenData(null);
      setIsAuthenticated(false);
      localStorage.removeItem('accessToken');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // دالة تسجيل الدخول بـ Token
  const loginWithToken = async (token) => {
    const isValid = await validateToken(token);
    if (isValid) {
      return { success: true, tokenData };
    } else {
      return { success: false, error: 'Token غير صحيح أو منتهي الصلاحية' };
    }
  };

  // دالة تسجيل الخروج
  const logout = () => {
    setCurrentToken(null);
    setTokenData(null);
    setIsAuthenticated(false);
    localStorage.removeItem('accessToken');
  };

  // دالة للتحقق من الصلاحيات
  const hasPermission = (requiredPermission) => {
    if (!tokenData || !tokenData.permissions) return false;
    return tokenData.permissions.includes(requiredPermission) || 
           tokenData.permissions.includes('admin');
  };

  // دالة للتحقق من كون المستخدم admin
  const isAdmin = () => {
    return hasPermission('admin');
  };

  const value = {
    currentToken,
    tokenData,
    isAuthenticated,
    loading,
    loginWithToken,
    logout,
    hasPermission,
    isAdmin,
    validateToken
  };

  return (
    <TokenAuthContext.Provider value={value}>
      {children}
    </TokenAuthContext.Provider>
  );
}
