import { slugify } from '../utils/slugify.js';

export const events = [
  {
    id: 'social-media-workshop',
    title: 'إدارة الصفحات',
    subtitle: 'Social Media',
    description: 'تعلم إدارة الصفحات على وسائل التواصل الاجتماعي وبناء استراتيجيات تسويقية فعالة',
    date: '2024-01-13',
    time: '3 عصراً',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
    instructor: 'مجدي شعبان',
    instructorImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
    instructorBio: 'خبير في التسويق الرقمي مع أكثر من 5 سنوات من الخبرة في إدارة الحملات التسويقية للشركات الناشئة والكبيرة. حاصل على شهادة Google Ads و Facebook Marketing.',
    instructorExperience: ['5 سنوات خبرة في التسويق الرقمي', '100+ ورشة تدريبية', 'شهادة Google Ads', 'شهادة Facebook Marketing'],
    instructorSocial: { 
      linkedin: 'https://linkedin.com/in/magdy-shaban', 
      twitter: 'https://twitter.com/magdy_shaban',
      instagram: 'https://instagram.com/magdy_shaban'
    },
    category: 'تسويق',
    duration: '4 أسابيع',
    level: 'مبتدئ',
    maxParticipants: 30,
    participants: 13,
    syllabus: [
      { title: 'مقدمة عن إدارة الصفحات', duration: '2 ساعات', description: 'تعلم أساسيات إدارة الصفحات على وسائل التواصل' },
      { title: 'استراتيجيات المحتوى', duration: '3 ساعات', description: 'كيفية إنشاء محتوى جذاب ومؤثر' },
      { title: 'إدارة الحملات الإعلانية', duration: '4 ساعات', description: 'تعلم إدارة الإعلانات المدفوعة' },
      { title: 'تحليل النتائج والتحسين', duration: '2 ساعات', description: 'كيفية قياس الأداء وتحسين النتائج' }
    ]
  },
  {
    id: 'creative-design-workshop',
    title: 'ورشة التصميم الإبداعي',
    subtitle: 'UI/UX Design',
    description: 'تعلم أساسيات التصميم الرقمي وإنشاء تجارب مستخدم متميزة',
    date: '2024-02-28',
    time: '2 عصراً',
    image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=400&h=300&fit=crop',
    instructor: 'فاطمة أحمد',
    instructorImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=300&fit=crop',
    instructorBio: 'مصممة UI/UX محترفة مع خبرة واسعة في تصميم التطبيقات والمواقع الإلكترونية. عملت مع شركات تقنية رائدة وحصلت على جوائز في التصميم.',
    instructorExperience: ['6 سنوات خبرة في التصميم', '50+ مشروع ناجح', 'جائزة أفضل مصممة UI/UX 2023', 'شهادة Adobe Creative Suite'],
    instructorSocial: { 
      linkedin: 'https://linkedin.com/in/fatma-ahmed', 
      behance: 'https://behance.net/fatma-ahmed',
      dribbble: 'https://dribbble.com/fatma-ahmed'
    },
    category: 'تصميم',
    duration: '4 أسابيع',
    level: 'مبتدئ',
    maxParticipants: 25,
    participants: 18,
    syllabus: [
      { title: 'مبادئ التصميم الأساسية', duration: '3 ساعات', description: 'تعلم أساسيات التصميم والألوان والخطوط' },
      { title: 'تصميم واجهات المستخدم', duration: '4 ساعات', description: 'كيفية تصميم واجهات سهلة الاستخدام' },
      { title: 'تجربة المستخدم UX', duration: '3 ساعات', description: 'فهم احتياجات المستخدمين وتصميم التجربة' },
      { title: 'أدوات التصميم الحديثة', duration: '2 ساعات', description: 'تعلم استخدام Figma و Adobe XD' }
    ]
  },
  {
    id: 'digital-marketing-workshop',
    title: 'ورشة التسويق الرقمي',
    subtitle: 'Digital Marketing',
    description: 'استراتيجيات التسويق الرقمي الحديثة وبناء العلامة التجارية الشخصية',
    date: '2024-03-10',
    time: '4 عصراً',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
    instructor: 'محمد علي',
    instructorImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=300&fit=crop',
    instructorBio: 'خبير في التسويق الرقمي والعلامات التجارية مع خبرة 7 سنوات في إدارة الحملات التسويقية للشركات متعددة الجنسيات.',
    instructorExperience: ['7 سنوات خبرة في التسويق الرقمي', '200+ حملة تسويقية ناجحة', 'شهادة Google Analytics', 'شهادة HubSpot Marketing'],
    instructorSocial: { 
      linkedin: 'https://linkedin.com/in/mohamed-ali', 
      twitter: 'https://twitter.com/mohamed_ali_marketing',
      youtube: 'https://youtube.com/mohamed-ali-marketing'
    },
    category: 'تسويق',
    duration: '3 أسابيع',
    level: 'متوسط',
    maxParticipants: 35,
    participants: 22,
    syllabus: [
      { title: 'أساسيات التسويق الرقمي', duration: '3 ساعات', description: 'مقدمة شاملة عن التسويق الرقمي' },
      { title: 'إدارة وسائل التواصل الاجتماعي', duration: '4 ساعات', description: 'استراتيجيات إدارة الحسابات' },
      { title: 'تحسين محركات البحث SEO', duration: '3 ساعات', description: 'كيفية تحسين المواقع لمحركات البحث' },
      { title: 'الإعلانات المدفوعة', duration: '2 ساعات', description: 'إدارة الحملات الإعلانية على Google و Facebook' }
    ]
  }
];

export function getEventStatus(eventDate) {
  const now = new Date();
  const date = new Date(eventDate);
  return date < now ? 'انتهت' : 'قادمة';
}

export function getEventById(id) {
  return events.find(event => event.id === id);
}

export function getEventsByCategory(category) {
  if (category === 'all') return events;
  return events.filter(event => event.category === category);
}

export function getUpcomingEvents() {
  const now = new Date();
  return events.filter(event => new Date(event.date) > now);
}

export function getPastEvents() {
  const now = new Date();
  return events.filter(event => new Date(event.date) < now);
}