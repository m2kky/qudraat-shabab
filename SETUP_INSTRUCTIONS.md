# تعليمات الإعداد - نظام Access Token

## 🚀 الخطوات المطلوبة

### 1. إعداد متغيرات البيئة

أنشئ ملف `.env` في مجلد المشروع وأضف:

```env
# Firebase Configuration
VITE_API_KEY=your_api_key_here
VITE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_PROJECT_ID=your_project_id
VITE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_MESSAGING_SENDER_ID=your_sender_id
VITE_APP_ID=your_app_id
```

### 2. تحديث قواعد Firestore

1. اذهب إلى [Firebase Console](https://console.firebase.google.com)
2. اختر مشروعك
3. اذهب إلى **Firestore > Rules**
4. استبدل القواعد الحالية بمحتوى ملف `firestore-rules-token.txt`

### 3. إنشاء Master Token

```bash
# تشغيل السكريبت
npm run create-master-token
```

أو:

```bash
node create-master-token.js
```

### 4. تشغيل المشروع

```bash
npm run dev
```

### 5. تسجيل الدخول

1. اذهب إلى: `http://localhost:5173/token-login`
2. أدخل الـ Master Token
3. اضغط "تسجيل الدخول"

## 🔧 استكشاف الأخطاء

### خطأ "Permission Denied"

**الحل**: تأكد من تحديث قواعد Firestore

### خطأ "Token غير صحيح"

**الحل**: تأكد من كتابة الـ Token بشكل صحيح

### خطأ "غير مصرح لك بالوصول"

**الحل**: تحقق من صلاحيات الـ Token

## 📞 الدعم

راجع ملف `ACCESS_TOKEN_SYSTEM.md` للمزيد من التفاصيل.
