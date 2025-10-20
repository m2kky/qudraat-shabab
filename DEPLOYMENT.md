# دليل النشر - قدرات شباب

هذا الدليل يوضح كيفية نشر مشروع قدرات شباب على منصات مختلفة.

## 🚀 خيارات النشر

### 1. Vercel (مُوصى به)

#### الخطوات:
1. **تسجيل الدخول إلى Vercel**
   - اذهب إلى [vercel.com](https://vercel.com)
   - سجل دخول بحساب GitHub

2. **ربط المشروع**
   - اضغط "New Project"
   - اختر repository `qudraat-shabab/platform`
   - اضغط "Import"

3. **إعداد متغيرات البيئة**
   ```
   VITE_FIREBASE_API_KEY=your-api-key
   VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
   VITE_FIREBASE_APP_ID=your-app-id
   ```

4. **النشر**
   - اضغط "Deploy"
   - انتظر حتى يكتمل النشر

#### المميزات:
- ✅ نشر تلقائي عند push
- ✅ HTTPS مجاني
- ✅ CDN عالمي
- ✅ دعم React/Vite

### 2. Netlify

#### الخطوات:
1. **تسجيل الدخول إلى Netlify**
   - اذهب إلى [netlify.com](https://netlify.com)
   - سجل دخول بحساب GitHub

2. **ربط المشروع**
   - اضغط "New site from Git"
   - اختر GitHub و repository
   - اضغط "Deploy site"

3. **إعداد Build Settings**
   ```
   Build command: npm run build
   Publish directory: dist
   ```

4. **إضافة متغيرات البيئة**
   - اذهب إلى Site settings > Environment variables
   - أضف متغيرات Firebase

#### المميزات:
- ✅ نشر تلقائي
- ✅ HTTPS مجاني
- ✅ Forms handling
- ✅ Branch previews

### 3. Firebase Hosting

#### الخطوات:
1. **تثبيت Firebase CLI**
   ```bash
   npm install -g firebase-tools
   ```

2. **تسجيل الدخول**
   ```bash
   firebase login
   ```

3. **تهيئة المشروع**
   ```bash
   firebase init hosting
   ```

4. **إعداد firebase.json**
   ```json
   {
     "hosting": {
       "public": "dist",
       "ignore": [
         "firebase.json",
         "**/.*",
         "**/node_modules/**"
       ],
       "rewrites": [
         {
           "source": "**",
           "destination": "/index.html"
         }
       ]
     }
   }
   ```

5. **النشر**
   ```bash
   npm run build
   firebase deploy
   ```

#### المميزات:
- ✅ تكامل مع Firebase
- ✅ HTTPS مجاني
- ✅ CDN عالمي
- ✅ إحصائيات مفصلة

### 4. GitHub Pages

#### الخطوات:
1. **تثبيت gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **إضافة scripts في package.json**
   ```json
   {
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. **النشر**
   ```bash
   npm run deploy
   ```

4. **إعداد GitHub Pages**
   - اذهب إلى Settings > Pages
   - اختر Source: Deploy from a branch
   - اختر Branch: gh-pages

#### المميزات:
- ✅ مجاني
- ✅ تكامل مع GitHub
- ✅ HTTPS مجاني

## 🔧 إعدادات ما قبل النشر

### 1. تحديث Firebase Config

```javascript
// src/firebase/config.js
const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
  measurementId: process.env.VITE_FIREBASE_MEASUREMENT_ID
};
```

### 2. تحديث قواعد Firebase

#### Firestore Rules:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // قراءة عامة للفعاليات والمعرض
    match /events/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    match /gallery/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // التسجيلات - قراءة وكتابة للمصادقين فقط
    match /registrations/{document} {
      allow read, write: if request.auth != null;
    }
    
    // المستخدمين - قراءة وكتابة للمصادقين فقط
    match /users/{document} {
      allow read, write: if request.auth != null;
    }
  }
}
```

#### Storage Rules:
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

### 3. إعداد Authentication

1. **تفعيل Authentication**
   - اذهب إلى Firebase Console > Authentication
   - فعّل Email/Password provider

2. **إضافة مستخدم Admin**
   - اذهب إلى Users tab
   - اضغط "Add user"
   - أضف: `admin@qudraat-shabab.com`

3. **إعداد Authorized Domains**
   - اذهب إلى Settings > Authorized domains
   - أضف domain الموقع

## 📊 مراقبة الأداء

### 1. Firebase Analytics
```javascript
// تتبع الأحداث المهمة
import { getAnalytics, logEvent } from "firebase/analytics";

const analytics = getAnalytics();

// تتبع تسجيل الدخول
logEvent(analytics, 'login', {
  method: 'email'
});

// تتبع التسجيل في الفعالية
logEvent(analytics, 'event_registration', {
  event_id: eventId,
  event_name: eventTitle
});
```

### 2. Error Monitoring
```javascript
// تتبع الأخطاء
import { getFunctions, httpsCallable } from 'firebase/functions';

const logError = (error, context) => {
  console.error('Error:', error, 'Context:', context);
  // إرسال الخطأ لخدمة مراقبة الأخطاء
};
```

## 🔒 الأمان

### 1. متغيرات البيئة
- لا تضع API keys في الكود
- استخدم متغيرات البيئة
- لا ترفع ملف .env

### 2. قواعد Firebase
- راجع قواعد الأمان بانتظام
- اختبر القواعد قبل النشر
- استخدم Firebase Emulator للاختبار

### 3. HTTPS
- تأكد من استخدام HTTPS
- فعّل HSTS headers
- استخدم SSL certificates صالحة

## 📱 اختبار ما بعد النشر

### 1. اختبار الوظائف الأساسية
- [ ] تحميل الصفحة الرئيسية
- [ ] التنقل بين الصفحات
- [ ] تسجيل الدخول للداشبورد
- [ ] إضافة فعالية جديدة
- [ ] رفع صورة
- [ ] تسجيل في فعالية

### 2. اختبار الاستجابة
- [ ] اختبار على الهاتف
- [ ] اختبار على التابلت
- [ ] اختبار على سطح المكتب
- [ ] اختبار سرعة التحميل

### 3. اختبار الأمان
- [ ] محاولة الوصول للداشبورد بدون تسجيل دخول
- [ ] اختبار قواعد Firebase
- [ ] اختبار HTTPS

## 🚨 استكشاف الأخطاء

### مشاكل شائعة:

#### 1. خطأ في Firebase Config
```
Error: Firebase config is not defined
```
**الحل**: تأكد من إضافة متغيرات البيئة

#### 2. خطأ في Authentication
```
Error: Firebase Auth domain not authorized
```
**الحل**: أضف domain إلى Authorized domains

#### 3. خطأ في Storage
```
Error: Storage rules denied the request
```
**الحل**: راجع قواعد Storage

#### 4. خطأ في Build
```
Error: Build failed
```
**الحل**: 
```bash
npm install
npm run build
```

## 📈 تحسين الأداء

### 1. تحسين الصور
- استخدم WebP format
- ضغط الصور قبل الرفع
- استخدم lazy loading

### 2. تحسين الكود
- استخدم code splitting
- حذف الكود غير المستخدم
- تحسين bundle size

### 3. تحسين Firebase
- استخدم indexes للاستعلامات
- حدد الحقول المطلوبة فقط
- استخدم pagination للقوائم الطويلة

---

**ملاحظة**: تأكد من اختبار الموقع على بيئة الإنتاج قبل الإعلان عنه للجمهور!
