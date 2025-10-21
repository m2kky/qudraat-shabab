/**
 * سكريبت لإنشاء Master Access Token
 * تشغيل: node create-master-token.js
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { generateAccessToken } from './src/utils/tokenGenerator.js';

// إعدادات Firebase - استخدم متغيرات البيئة
const firebaseConfig = {
  apiKey: process.env.VITE_API_KEY,
  authDomain: process.env.VITE_AUTH_DOMAIN,
  projectId: process.env.VITE_PROJECT_ID,
  storageBucket: process.env.VITE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_APP_ID,
};

// تهيئة Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function createMasterToken() {
  try {
    console.log('🚀 بدء إنشاء Master Access Token...');
    
    // إنشاء Master Token
    const masterToken = generateAccessToken();
    
    const masterTokenData = {
      token: masterToken,
      name: 'Master Admin Token',
      description: 'الـ Token الرئيسي للمدير - صلاحيات كاملة',
      permissions: ['admin', 'read', 'write', 'delete'],
      isActive: true,
      createdAt: serverTimestamp(),
      createdBy: 'system',
      expiresAt: null, // لا ينتهي
      usageCount: 0,
      lastUsed: null
    };

    // حفظ الـ Token في Firestore
    await setDoc(doc(db, 'accessTokens', masterToken), masterTokenData);
    
    console.log('✅ تم إنشاء Master Token بنجاح!');
    console.log('🔑 Master Token:', masterToken);
    console.log('');
    console.log('📋 معلومات مهمة:');
    console.log('- احفظ هذا الـ Token في مكان آمن');
    console.log('- استخدمه لتسجيل الدخول إلى لوحة التحكم');
    console.log('- يمكنك إنشاء tokens أخرى من لوحة التحكم');
    console.log('');
    console.log('🌐 رابط تسجيل الدخول: http://localhost:5173/token-login');
    
  } catch (error) {
    console.error('❌ خطأ في إنشاء Master Token:', error);
    
    if (error.code === 'permission-denied') {
      console.log('');
      console.log('🔧 الحل:');
      console.log('1. اذهب إلى Firebase Console');
      console.log('2. Firestore > Rules');
      console.log('3. استخدم القواعد المؤقتة من ملف firestore-rules-dev.txt');
      console.log('4. أعد تشغيل هذا السكريبت');
    }
  }
}

// تشغيل السكريبت
createMasterToken().then(() => {
  console.log('🎉 انتهى السكريبت');
  process.exit(0);
}).catch((error) => {
  console.error('💥 خطأ عام:', error);
  process.exit(1);
});
