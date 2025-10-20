# إعداد Firebase للمشروع

## 1. إنشاء مستخدم في Firebase Authentication

### في Firebase Console:
1. اذهب إلى **Authentication** > **Users**
2. اضغط **Add user**
3. أدخل:
   - **Email**: `admin@qudraat-shabab.com`
   - **Password**: اختر كلمة مرور قوية
4. اضغط **Add user**

## 2. إعداد Firestore Database

### إنشاء قاعدة البيانات:
1. اذهب إلى **Firestore Database**
2. اضغط **Create database**
3. اختر **Start in test mode** (للبداية)
4. اختر موقع قاعدة البيانات (الأقرب لمنطقتك)

### إنشاء المجموعات (Collections):

#### مجموعة الفعاليات (`events`):
```javascript
// مثال على وثيقة في مجموعة events
{
  id: "1",
  title: "إدارة الصفحات",
  subtitle: "Social Media",
  description: "تعلم إدارة الصفحات على وسائل التواصل الاجتماعي",
  date: "2024-01-13",
  time: "3 عصراً",
  image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
  instructor: "مجدي شعبان",
  instructorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
  instructorBio: "خبير في التسويق الرقمي مع أكثر من 5 سنوات من الخبرة",
  instructorExperience: ["5 سنوات خبرة في التسويق الرقمي", "100+ ورشة تدريبية"],
  instructorSocial: {
    linkedin: "https://linkedin.com/in/magdy-shaban",
    twitter: "https://twitter.com/magdy_shaban"
  },
  category: "تسويق",
  duration: "4 أسابيع",
  level: "مبتدئ",
  maxParticipants: 30,
  participants: 13,
  syllabus: [
    {
      title: "مقدمة عن إدارة الصفحات",
      duration: "2 ساعات",
      description: "تعلم أساسيات إدارة الصفحات على وسائل التواصل"
    }
  ]
}
```

#### مجموعة التسجيلات (`registrations`):
```javascript
{
  id: "REG-1-1703123456789",
  eventId: "1",
  firstName: "أحمد",
  lastName: "محمد",
  email: "ahmed@example.com",
  dateOfBirth: "1995-01-01",
  whatsapp: "+966501234567",
  city: "الرياض",
  job: "مطور ويب",
  college: "جامعة الملك سعود",
  registrationDate: "2024-01-15T10:30:00Z",
  status: "confirmed"
}
```

#### مجموعة المستخدمين (`users`):
```javascript
{
  uid: "firebase-user-id",
  email: "admin@qudraat-shabab.com",
  role: "admin",
  createdAt: "2024-01-01T00:00:00Z",
  lastLogin: "2024-01-15T10:30:00Z"
}
```

## 3. إعداد Firebase Storage

### إنشاء مجلدات:
1. اذهب إلى **Storage**
2. اضغط **Get started**
3. اختر **Start in test mode**
4. أنشئ المجلدات التالية:
   - `events/` - لصور الفعاليات
   - `instructors/` - لصور المدربين
   - `gallery/` - لصور المعرض
   - `uploads/` - للملفات العامة

## 4. إعداد قواعد الأمان (Security Rules)

### Firestore Rules:
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

### Storage Rules:
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

## 5. اختبار النظام

### تسجيل الدخول:
1. اذهب إلى `/dashboard`
2. استخدم بيانات المستخدم الذي أنشأته:
   - **Email**: `admin@qudraat-shabab.com`
   - **Password**: كلمة المرور التي اخترتها

### الميزات المتاحة:
- ✅ تسجيل دخول آمن
- ✅ لوحة تحكم محمية
- ✅ تسجيل خروج
- ✅ عرض بيانات المستخدم
- 🔄 ربط قاعدة البيانات (قريباً)
- 🔄 رفع الصور (قريباً)
- 🔄 إدارة الفعاليات (قريباً)

## 6. الخطوات التالية

1. **ربط قاعدة البيانات**: استبدال البيانات الثابتة بـ Firestore
2. **رفع الصور**: ربط Firebase Storage لرفع الصور
3. **إدارة المحتوى**: إنشاء واجهات لإدارة الفعاليات والمحتوى
4. **التسجيلات**: حفظ تسجيلات المستخدمين في قاعدة البيانات
5. **الإحصائيات**: عرض إحصائيات حقيقية من قاعدة البيانات

## ملاحظات مهمة:

- تأكد من تحديث قواعد الأمان قبل النشر
- استخدم HTTPS في الإنتاج
- احتفظ بنسخة احتياطية من قاعدة البيانات
- راقب استخدام Firebase لتجنب تجاوز الحدود المجانية
