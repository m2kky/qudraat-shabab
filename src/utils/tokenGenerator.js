/**
 * مولد Access Tokens قوي وآمن
 */

// دالة لإنشاء Access Token قوي (24 حرف)
export const generateAccessToken = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
  let token = '';
  
  for (let i = 0; i < 24; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  
  return token;
};

// دالة للتحقق من قوة الـ Token
export const validateTokenStrength = (token) => {
  if (!token || token.length !== 24) return false;
  
  const hasUpperCase = /[A-Z]/.test(token);
  const hasLowerCase = /[a-z]/.test(token);
  const hasNumbers = /[0-9]/.test(token);
  const hasSpecialChars = /[!@#$%^&*]/.test(token);
  
  return hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChars;
};

// دالة لتشفير الـ Token (اختيارية)
export const hashToken = async (token) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(token);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};

// دالة لإنشاء Token مع معلومات إضافية
export const createTokenWithMetadata = (permissions = ['read'], expiresIn = null) => {
  const token = generateAccessToken();
  const createdAt = new Date().toISOString();
  const expiresAt = expiresIn ? new Date(Date.now() + expiresIn).toISOString() : null;
  
  return {
    token,
    permissions,
    createdAt,
    expiresAt,
    isActive: true,
    lastUsed: null,
    usageCount: 0
  };
};

// دالة للتحقق من انتهاء صلاحية الـ Token
export const isTokenExpired = (tokenData) => {
  if (!tokenData.expiresAt) return false;
  return new Date() > new Date(tokenData.expiresAt);
};

// دالة للتحقق من صلاحيات الـ Token
export const hasPermission = (tokenData, requiredPermission) => {
  if (!tokenData.isActive) return false;
  if (isTokenExpired(tokenData)) return false;
  
  return tokenData.permissions.includes(requiredPermission) || 
         tokenData.permissions.includes('admin');
};

// أمثلة على الـ Tokens
export const SAMPLE_TOKENS = {
  admin: createTokenWithMetadata(['admin', 'read', 'write', 'delete']),
  editor: createTokenWithMetadata(['read', 'write']),
  viewer: createTokenWithMetadata(['read']),
  temporary: createTokenWithMetadata(['read', 'write'], 7 * 24 * 60 * 60 * 1000) // 7 أيام
};
