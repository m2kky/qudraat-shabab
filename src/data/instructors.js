import { slugify } from '../utils/slugify.js';

export const instructors = [
  {
    id: 'ahmed-mohamed',
    name: 'أحمد محمد',
    title: 'خبير في التسويق الرقمي',
    bio: 'خبير في التسويق الرقمي مع أكثر من 7 سنوات من الخبرة في إدارة الحملات التسويقية للشركات الناشئة والكبيرة. حاصل على شهادات Google Ads و Facebook Marketing و HubSpot.',
    experience: '7 سنوات خبرة في التسويق الرقمي\n200+ حملة تسويقية ناجحة\nشهادة Google Ads\nشهادة Facebook Marketing\nشهادة HubSpot Marketing',
    specializations: 'التسويق الرقمي، إدارة الحملات الإعلانية، تحليل البيانات، بناء العلامات التجارية',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
    socialMedia: {
      linkedin: 'https://linkedin.com/in/ahmed-mohamed-marketing',
      twitter: 'https://twitter.com/ahmed_marketing',
      facebook: 'https://facebook.com/ahmed_marketing',
      instagram: 'https://instagram.com/ahmed_marketing',
      website: 'https://ahmedmarketing.com'
    },
    slug: 'ahmed-mohamed',
    createdAt: '2024-01-20T10:00:00Z'
  },
  {
    id: 'fatma-ahmed',
    name: 'فاطمة أحمد',
    title: 'مصممة UI/UX محترفة',
    bio: 'مصممة UI/UX محترفة مع خبرة واسعة في تصميم التطبيقات والمواقع الإلكترونية. عملت مع شركات تقنية رائدة وحصلت على جوائز في التصميم.',
    experience: '6 سنوات خبرة في التصميم\n50+ مشروع ناجح\nجائزة أفضل مصممة UI/UX 2023\nشهادة Adobe Creative Suite\nشهادة Figma Professional',
    specializations: 'تصميم واجهات المستخدم، تجربة المستخدم، التصميم التفاعلي، تصميم التطبيقات',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
    socialMedia: {
      linkedin: 'https://linkedin.com/in/fatma-ahmed-design',
      instagram: 'https://instagram.com/fatma_design',
      website: 'https://fatmadesign.com'
    },
    slug: 'fatma-ahmed',
    createdAt: '2024-01-20T10:00:00Z'
  },
  {
    id: 'mohamed-ali',
    name: 'محمد علي',
    title: 'مطور Full Stack',
    bio: 'مطور Full Stack مع خبرة 8 سنوات في تطوير التطبيقات والمواقع الإلكترونية. متخصص في React, Node.js, Python و Django.',
    experience: '8 سنوات خبرة في التطوير\n100+ مشروع مكتمل\nشهادة AWS Solutions Architect\nشهادة React Professional\nخبير في DevOps',
    specializations: 'تطوير الويب، تطوير التطبيقات، قواعد البيانات، DevOps، الذكاء الاصطناعي',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    socialMedia: {
      linkedin: 'https://linkedin.com/in/mohamed-ali-dev',
      twitter: 'https://twitter.com/mohamed_dev',
      website: 'https://mohameddev.com'
    },
    slug: 'mohamed-ali',
    createdAt: '2024-01-20T10:00:00Z'
  },
  {
    id: 'nora-saeed',
    name: 'نورا السعيد',
    title: 'خبيرة في إدارة المشاريع',
    bio: 'خبيرة في إدارة المشاريع مع خبرة 10 سنوات في إدارة المشاريع التقنية والاستراتيجية. حاصلة على شهادة PMP و Agile Certified Practitioner.',
    experience: '10 سنوات خبرة في إدارة المشاريع\n150+ مشروع مكتمل\nشهادة PMP\nشهادة Agile Certified Practitioner\nشهادة Scrum Master',
    specializations: 'إدارة المشاريع، Agile Methodology، إدارة الفرق، التخطيط الاستراتيجي، إدارة المخاطر',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
    socialMedia: {
      linkedin: 'https://linkedin.com/in/nora-saeed-pm',
      twitter: 'https://twitter.com/nora_pm'
    },
    slug: 'nora-saeed',
    createdAt: '2024-01-20T10:00:00Z'
  },
  {
    id: 'khaled-hassan',
    name: 'خالد حسن',
    title: 'خبير في الأمن السيبراني',
    bio: 'خبير في الأمن السيبراني مع خبرة 9 سنوات في حماية الأنظمة والشبكات. حاصل على شهادات CISSP و CEH و Security+.',
    experience: '9 سنوات خبرة في الأمن السيبراني\n500+ تقييم أمني\nشهادة CISSP\nشهادة CEH\nشهادة Security+\nخبير في اختبار الاختراق',
    specializations: 'الأمن السيبراني، اختبار الاختراق، إدارة المخاطر الأمنية، التحقيق الجنائي الرقمي',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face',
    socialMedia: {
      linkedin: 'https://linkedin.com/in/khaled-hassan-cyber',
      website: 'https://khaledcyber.com'
    },
    slug: 'khaled-hassan',
    createdAt: '2024-01-20T10:00:00Z'
  },
  {
    id: 'sara-mahmoud',
    name: 'سارة محمود',
    title: 'خبيرة في تحليل البيانات',
    bio: 'خبيرة في تحليل البيانات والذكاء الاصطناعي مع خبرة 6 سنوات في تحليل البيانات الضخمة وبناء نماذج التعلم الآلي.',
    experience: '6 سنوات خبرة في تحليل البيانات\n200+ مشروع تحليلي\nشهادة Google Data Analytics\nشهادة Microsoft Azure AI\nخبيرة في Python و R',
    specializations: 'تحليل البيانات، التعلم الآلي، الذكاء الاصطناعي، Python، R، SQL',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face',
    socialMedia: {
      linkedin: 'https://linkedin.com/in/sara-mahmoud-data',
      twitter: 'https://twitter.com/sara_data',
      instagram: 'https://instagram.com/sara_data_analyst'
    },
    slug: 'sara-mahmoud',
    createdAt: '2024-01-20T10:00:00Z'
  }
];

// دوال مساعدة للتعامل مع المدربين
export function getInstructorById(id) {
  return instructors.find(instructor => instructor.id === id);
}

export function getInstructorBySlug(slug) {
  return instructors.find(instructor => instructor.slug === slug);
}

export function getInstructorsBySpecialization(specialization) {
  return instructors.filter(instructor => 
    instructor.specializations.toLowerCase().includes(specialization.toLowerCase())
  );
}

export function getAllInstructors() {
  return instructors;
}

export function getInstructorsWithSocialMedia() {
  return instructors.filter(instructor => 
    instructor.socialMedia && (
      instructor.socialMedia.linkedin || 
      instructor.socialMedia.twitter || 
      instructor.socialMedia.instagram || 
      instructor.socialMedia.website
    )
  );
}

// دالة لإنشاء slug من الاسم
export function createInstructorSlug(name) {
  return slugify(name);
}

// دالة للتحقق من وجود روابط سوشيال ميديا
export function hasSocialMedia(instructor, platform) {
  if (!instructor.socialMedia) return false;
  return !!instructor.socialMedia[platform];
}

// دالة للحصول على روابط السوشيال ميديا المملوءة فقط
export function getActiveSocialMedia(instructor) {
  if (!instructor.socialMedia) return {};
  
  const active = {};
  const platforms = ['linkedin', 'twitter', 'facebook', 'instagram', 'website'];
  
  platforms.forEach(platform => {
    if (instructor.socialMedia[platform]) {
      active[platform] = instructor.socialMedia[platform];
    }
  });
  
  return active;
}
