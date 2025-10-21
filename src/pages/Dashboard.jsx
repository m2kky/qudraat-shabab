import { useState } from 'react';
import { useAuth } from '../components/auth/AuthProvider';
import { doc, setDoc, serverTimestamp, collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';
import { slugify } from '../utils/slugify';
// import Header from '../components/Header';
// import Footer from '../components/Footer';
import EventsManagement from '../components/admin/EventsManagement';
import InstructorsManagement from '../components/admin/InstructorsManagement';
// import TokensManagement from '../components/admin/TokensManagement'; // Removed
import GalleryManagement from '../components/admin/GalleryManagement';
import RegistrationsView from '../components/admin/RegistrationsView';
import StatsManagement from '../components/admin/StatsManagement';

function Dashboard() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  // دالة Seed مؤقتة لرفع حدث بالـ slug
  const seedSlugEvent = async () => {
    try {
      const eventId = "social-media-workshop"; // أو: slugify("إدارة الصفحات")
      const eventData = {
        id: eventId,
        title: "إدارة الصفحات",
        subtitle: "Social Media",
        description: "تعلم إدارة الصفحات على وسائل التواصل الاجتماعي وبناء استراتيجيات تسويقية فعالة",
        date: "2024-01-13",
        time: "3 عصراً",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
        instructor: "مجدي شعبان",
        instructorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
        instructorBio: "خبير في التسويق الرقمي مع أكثر من 5 سنوات من الخبرة في إدارة الحملات التسويقية للشركات الناشئة والكبيرة. حاصل على شهادة Google Ads و Facebook Marketing.",
        instructorExperience: ["5 سنوات خبرة في التسويق الرقمي", "100+ ورشة تدريبية", "شهادة Google Ads", "شهادة Facebook Marketing"],
        instructorSocial: { 
          linkedin: "https://linkedin.com/in/magdy-shaban", 
          twitter: "https://twitter.com/magdy_shaban",
          instagram: "https://instagram.com/magdy_shaban"
        },
        category: "تسويق",
        duration: "4 أسابيع",
        level: "مبتدئ",
        maxParticipants: 30,
        participants: 13,
        syllabus: [
          { title: "مقدمة عن إدارة الصفحات", duration: "2 ساعات", description: "تعلم أساسيات إدارة الصفحات على وسائل التواصل" },
          { title: "استراتيجيات المحتوى", duration: "3 ساعات", description: "كيفية إنشاء محتوى جذاب ومؤثر" },
          { title: "إدارة الحملات الإعلانية", duration: "4 ساعات", description: "تعلم إدارة الإعلانات المدفوعة" },
          { title: "تحليل النتائج والتحسين", duration: "2 ساعات", description: "كيفية قياس الأداء وتحسين النتائج" }
        ],
        createdAt: serverTimestamp()
      };

      await setDoc(doc(db, "events", eventId), eventData);
      alert("تم إنشاء الحدث بنجاح: " + eventId);
    } catch (error) {
      console.error('خطأ في إنشاء الحدث:', error);
      alert('حدث خطأ في إنشاء الحدث');
    }
  };

  // دالة لإنشاء حدث جديد بتاريخ مستقبلي
  const createFutureEvent = async () => {
    try {
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 30); // بعد 30 يوم
      const eventId = "future-workshop";
      
      const eventData = {
        id: eventId,
        title: "ورشة المستقبل",
        subtitle: "Future Workshop",
        description: "ورشة تجريبية بتاريخ مستقبلي لاختبار فورم التسجيل",
        date: futureDate.toISOString().split('T')[0], // YYYY-MM-DD
        time: "6 مساءً",
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop",
        instructor: "أحمد المستقبل",
        instructorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
        instructorBio: "خبير في التكنولوجيا المستقبلية مع خبرة واسعة في الابتكار والتطوير.",
        instructorExperience: ["10 سنوات خبرة", "50+ مشروع ناجح", "شهادة في التكنولوجيا المستقبلية"],
        instructorSocial: { 
          linkedin: "https://linkedin.com/in/ahmed-future", 
          twitter: "https://twitter.com/ahmed_future",
          instagram: "https://instagram.com/ahmed_future"
        },
        category: "تكنولوجيا",
        duration: "3 أسابيع",
        level: "متوسط",
        maxParticipants: 25,
        participants: 0,
        syllabus: [
          { title: "مقدمة عن المستقبل", duration: "2 ساعات", description: "نظرة عامة على التكنولوجيا المستقبلية" },
          { title: "الذكاء الاصطناعي", duration: "3 ساعات", description: "أساسيات الذكاء الاصطناعي" },
          { title: "الواقع الافتراضي", duration: "2 ساعات", description: "تطبيقات الواقع الافتراضي" }
        ],
        createdAt: serverTimestamp()
      };

      await setDoc(doc(db, "events", eventId), eventData);
      alert("تم إنشاء الحدث المستقبلي بنجاح: " + eventId);
    } catch (error) {
      console.error('خطأ في إنشاء الحدث المستقبلي:', error);
      alert('حدث خطأ في إنشاء الحدث المستقبلي');
    }
  };

  // دالة لاختبار الاتصال بـ Firestore
  const testFirestoreConnection = async () => {
    try {
      const testDoc = await getDocs(collection(db, 'instructors'));
      alert(`الاتصال يعمل! تم العثور على ${testDoc.docs.length} مدرب في قاعدة البيانات`);
    } catch (error) {
      if (error.code === 'permission-denied') {
        alert(`خطأ في الأذونات!\n\nالحل:\n1. اذهب لـ Firebase Console\n2. Firestore > Rules\n3. استبدل القواعد بالقواعد المؤقتة في ملف firestore-rules-temp.txt\n\nتحذير: هذه القواعد مؤقتة للتطوير فقط!`);
      } else {
        alert('خطأ في الاتصال: ' + error.message);
      }
    }
  };

  // دالة لإنشاء مدرب واحد للاختبار
  const createTestInstructor = async () => {
    try {
      const instructor = {
        name: "مدرب تجريبي",
        title: "خبير في التطوير",
        bio: "مدرب تجريبي لاختبار النظام",
        experience: "5 سنوات خبرة\n50+ مشروع ناجح",
        specializations: "التطوير، البرمجة، التصميم",
        socialMedia: {
          linkedin: "https://linkedin.com/in/test",
          twitter: "https://twitter.com/test",
          website: "https://test.com"
        }
      };

      const instructorId = slugify(instructor.name);
      const instructorData = {
        id: instructorId,
        ...instructor,
        slug: instructorId,
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
        createdAt: serverTimestamp()
      };

      await setDoc(doc(db, "instructors", instructorId), instructorData);
      alert("تم إنشاء المدرب التجريبي بنجاح!");
    } catch (error) {
      if (error.code === 'permission-denied') {
        alert('خطأ في الأذونات: تأكد من تحديث قواعد Firestore');
      } else {
        alert('خطأ في إنشاء المدرب: ' + error.message);
      }
    }
  };

  // دالة لإنشاء مدربين تجريبيين
  const seedInstructors = async () => {
    try {
      const instructors = [
        {
          name: "أحمد محمد",
          title: "خبير في التسويق الرقمي",
          bio: "خبير في التسويق الرقمي مع أكثر من 7 سنوات من الخبرة في إدارة الحملات التسويقية للشركات الناشئة والكبيرة. حاصل على شهادات Google Ads و Facebook Marketing و HubSpot.",
          experience: "7 سنوات خبرة في التسويق الرقمي\n200+ حملة تسويقية ناجحة\nشهادة Google Ads\nشهادة Facebook Marketing\nشهادة HubSpot Marketing",
          specializations: "التسويق الرقمي، إدارة الحملات الإعلانية، تحليل البيانات، بناء العلامات التجارية",
          socialMedia: {
            linkedin: "https://linkedin.com/in/ahmed-mohamed-marketing",
            twitter: "https://twitter.com/ahmed_marketing",
            instagram: "https://instagram.com/ahmed_marketing",
            website: "https://ahmedmarketing.com"
          }
        },
        {
          name: "فاطمة أحمد",
          title: "مصممة UI/UX محترفة",
          bio: "مصممة UI/UX محترفة مع خبرة واسعة في تصميم التطبيقات والمواقع الإلكترونية. عملت مع شركات تقنية رائدة وحصلت على جوائز في التصميم.",
          experience: "6 سنوات خبرة في التصميم\n50+ مشروع ناجح\nجائزة أفضل مصممة UI/UX 2023\nشهادة Adobe Creative Suite\nشهادة Figma Professional",
          specializations: "تصميم واجهات المستخدم، تجربة المستخدم، التصميم التفاعلي، تصميم التطبيقات",
          socialMedia: {
            linkedin: "https://linkedin.com/in/fatma-ahmed-design",
            instagram: "https://instagram.com/fatma_design",
            website: "https://fatmadesign.com"
          }
        },
        {
          name: "محمد علي",
          title: "مطور Full Stack",
          bio: "مطور Full Stack مع خبرة 8 سنوات في تطوير التطبيقات والمواقع الإلكترونية. متخصص في React, Node.js, Python و Django.",
          experience: "8 سنوات خبرة في التطوير\n100+ مشروع مكتمل\nشهادة AWS Solutions Architect\nشهادة React Professional\nخبير في DevOps",
          specializations: "تطوير الويب، تطوير التطبيقات، قواعد البيانات، DevOps، الذكاء الاصطناعي",
          socialMedia: {
            linkedin: "https://linkedin.com/in/mohamed-ali-dev",
            twitter: "https://twitter.com/mohamed_dev",
            website: "https://mohameddev.com"
          }
        }
      ];

      let successCount = 0;
      let errorCount = 0;

      for (const instructor of instructors) {
        try {
          const instructorId = slugify(instructor.name);
          const instructorData = {
            id: instructorId,
            ...instructor,
            slug: instructorId,
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
            createdAt: serverTimestamp()
          };

          await setDoc(doc(db, "instructors", instructorId), instructorData);
          successCount++;
          console.log(`تم إنشاء المدرب: ${instructor.name}`);
        } catch (error) {
          errorCount++;
          console.error(`خطأ في إنشاء المدرب ${instructor.name}:`, error);
        }
      }

      if (successCount > 0) {
        alert(`تم إنشاء ${successCount} مدرب بنجاح!${errorCount > 0 ? `\nفشل في إنشاء ${errorCount} مدرب` : ''}`);
      } else {
        alert('فشل في إنشاء جميع المدربين. تحقق من أذونات Firestore.');
      }
    } catch (error) {
      console.error('خطأ عام في إنشاء المدربين:', error);
      if (error.code === 'permission-denied') {
        alert('خطأ في الأذونات: تأكد من أنك مسجل دخول كإدمن');
      } else {
        alert('حدث خطأ في إنشاء المدربين: ' + error.message);
      }
    }
  };

  const stats = [
    { title: 'إجمالي المتدربين', value: '1,247', change: '+12%', icon: '👥', color: 'var(--primary)' },
    { title: 'الدورات المكتملة', value: '89', change: '+8%', icon: '📚', color: 'var(--secondary)' },
    { title: 'معدل الرضا', value: '94%', change: '+2%', icon: '⭐', color: 'var(--success)' },
    { title: 'الإيرادات', value: '245,000 ريال', change: '+15%', icon: '💰', color: 'var(--warning)' }
  ];

  const recentActivities = [
    { id: 1, type: 'registration', user: 'أحمد محمد', course: 'تطوير الويب', time: 'منذ ساعتين', status: 'completed' },
    { id: 2, type: 'completion', user: 'فاطمة أحمد', course: 'التصميم الإبداعي', time: 'منذ 4 ساعات', status: 'completed' },
    { id: 3, type: 'payment', user: 'محمد علي', course: 'علوم البيانات', time: 'منذ 6 ساعات', status: 'pending' },
    { id: 4, type: 'feedback', user: 'نورا السعيد', course: 'التسويق الرقمي', time: 'منذ يوم', status: 'completed' }
  ];

  const upcomingEvents = [
    { id: 1, title: 'ورشة React Advanced', date: '2024-02-20', participants: 25, maxParticipants: 30 },
    { id: 2, title: 'ندوة AI & Machine Learning', date: '2024-02-25', participants: 45, maxParticipants: 50 },
    { id: 3, title: 'دورة Node.js Backend', date: '2024-03-01', participants: 18, maxParticipants: 25 }
  ];

  const tabs = [
    { id: 'overview', name: 'نظرة عامة', icon: '📊' },
    { id: 'events', name: 'إدارة الفعاليات', icon: '🎯' },
    { id: 'instructors', name: 'إدارة المدربين', icon: '👨‍🏫' },
    { id: 'gallery', name: 'إدارة المعرض', icon: '🖼️' },
    { id: 'registrations', name: 'التسجيلات', icon: '📝' },
    { id: 'stats', name: 'إدارة الإحصائيات', icon: '📈' },
    { id: 'analytics', name: 'التحليلات', icon: '📊' }
  ];

  const getActivityIcon = (type) => {
    const icons = {
      registration: '📝',
      completion: '✅',
      payment: '💳',
      feedback: '💬'
    };
    return icons[type] || '📋';
  };

  const getActivityText = (type) => {
    const texts = {
      registration: 'سجل في',
      completion: 'أكمل',
      payment: 'دفع رسوم',
      feedback: 'قدم تقييم ل'
    };
    return texts[type] || 'نشاط';
  };

  return (
    <div style={styles.dashboard}>
        <div className="container" style={styles.container}>
              {/* Dashboard Header */}
              <div style={styles.header}>
                <div style={styles.headerContent}>
                  <div>
                    <h1 style={styles.title}>لوحة التحكم</h1>
                    <p style={styles.subtitle}>مرحباً بك في لوحة تحكم منصة قدرات شباب</p>
                  </div>
                  <div style={styles.userInfo}>
                    <span style={styles.userEmail}>{user?.email}</span>
                    <button onClick={logout} style={styles.logoutButton}>
                      تسجيل الخروج
                    </button>
                  </div>
                </div>
              </div>

          {/* Stats Cards */}
          <div style={styles.statsGrid}>
            {stats.map((stat, index) => (
              <div key={index} style={styles.statCard}>
                <div style={{...styles.statIcon, background: stat.color}}>
                  {stat.icon}
                </div>
                <div style={styles.statContent}>
                  <h3 style={styles.statValue}>{stat.value}</h3>
                  <p style={styles.statTitle}>{stat.title}</p>
                  <span style={styles.statChange}>{stat.change}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Tabs Navigation */}
          <div style={styles.tabsContainer}>
            <div style={styles.tabsHeader}>
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  style={{
                    ...styles.tabButton,
                    ...(activeTab === tab.id ? styles.tabButtonActive : {})
                  }}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <span style={styles.tabIcon}>{tab.icon}</span>
                  <span>{tab.name}</span>
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div style={styles.tabContent}>
              {activeTab === 'overview' && (
                <div style={styles.overviewContent}>
                  {/* Seed Buttons - مؤقت */}
                  <div style={styles.seedSection}>
                    <h3 style={styles.sectionTitle}>أدوات التطوير</h3>
                    <div style={styles.buttonGroup}>
                      <button 
                        onClick={testFirestoreConnection}
                        style={styles.testButton}
                      >
                        اختبار الاتصال بـ Firestore
                      </button>
                      <button 
                        onClick={seedSlugEvent}
                        style={styles.seedButton}
                      >
                        إنشاء حدث تجريبي (Seed Event)
                      </button>
                      <button 
                        onClick={createFutureEvent}
                        style={styles.seedButton}
                      >
                        إنشاء حدث مستقبلي (Future Event)
                      </button>
                      <button 
                        onClick={createTestInstructor}
                        style={styles.testButton}
                      >
                        إنشاء مدرب تجريبي واحد
                      </button>
                      <button 
                        onClick={seedInstructors}
                        style={styles.seedButton}
                      >
                        إنشاء مدربين تجريبيين (Seed Instructors)
                      </button>
                    </div>
                    <p style={styles.seedNote}>
                      ⚠️ هذه الأزرار مؤقتة - سيتم حذفها بعد إنشاء البيانات
                    </p>
                  </div>

                  {/* Recent Activities */}
                  <div style={styles.section}>
                    <h3 style={styles.sectionTitle}>الأنشطة الأخيرة</h3>
                    <div style={styles.activitiesList}>
                      {recentActivities.map(activity => (
                        <div key={activity.id} style={styles.activityItem}>
                          <div style={styles.activityIcon}>
                            {getActivityIcon(activity.type)}
                          </div>
                          <div style={styles.activityContent}>
                            <p style={styles.activityText}>
                              <strong>{activity.user}</strong> {getActivityText(activity.type)} <strong>{activity.course}</strong>
                            </p>
                            <span style={{...styles.activityTime, fontWeight: 700}}>{activity.time}</span>
                          </div>
                          <div style={{
                            ...styles.activityStatus,
                            background: activity.status === 'completed' ? 'var(--success)' : 'var(--warning)'
                          }}>
                            {activity.status === 'completed' ? 'مكتمل' : 'معلق'}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Upcoming Events */}
                  <div style={styles.section}>
                    <h3 style={styles.sectionTitle}>الفعاليات القادمة</h3>
                    <div style={styles.eventsList}>
                      {upcomingEvents.map(event => (
                        <div key={event.id} style={styles.eventItem}>
                          <div style={styles.eventInfo}>
                            <h4 style={{...styles.eventTitle, fontWeight: 800, fontSize: '1rem'}}>{event.title}</h4>
                            <p style={{...styles.eventDate, fontWeight: 700}}>📅 {new Date(event.date).toLocaleDateString('ar-EG')}</p>
                          </div>
                          <div style={styles.eventProgress}>
                            <div style={styles.progressBar}>
                              <div 
                                style={{
                                  ...styles.progressFill,
                                  width: `${(event.participants / event.maxParticipants) * 100}%`
                                }}
                              ></div>
                            </div>
                            <span style={styles.progressText}>
                              {event.participants}/{event.maxParticipants}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'events' && (
                <EventsManagement />
              )}

                    {activeTab === 'instructors' && (
                      <InstructorsManagement />
                    )}

                    {/* Removed Tokens Management */}

                    {activeTab === 'gallery' && (
                      <GalleryManagement />
                    )}

              {activeTab === 'registrations' && (
                <RegistrationsView />
              )}

              {activeTab === 'stats' && (
                <StatsManagement />
              )}

              {activeTab === 'analytics' && (
                <div style={styles.analyticsContent}>
                  <h3 style={styles.sectionTitle}>التحليلات والتقارير</h3>
                  <p style={styles.placeholderText}>قريباً: تقارير مفصلة وإحصائيات متقدمة</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
  );
}

const styles = {
  dashboard: {
    minHeight: '100vh',
    background: 'var(--light)',
    padding: 'var(--spacing-2xl) 0'
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 var(--spacing-md)'
  },
  header: {
    marginBottom: 'var(--spacing-3xl)'
  },
  headerContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 'var(--spacing-md)'
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-md)'
  },
  userEmail: {
    fontSize: '0.875rem',
    color: 'var(--gray)',
    background: 'var(--light)',
    padding: 'var(--spacing-sm) var(--spacing-md)',
    borderRadius: 'var(--radius-md)'
  },
  logoutButton: {
    background: 'var(--error)',
    color: 'var(--white)',
    padding: 'var(--spacing-sm) var(--spacing-md)',
    borderRadius: 'var(--radius-md)',
    border: 'none',
    fontSize: '0.875rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all var(--transition-fast)'
  },
  title: {
    fontSize: 'var(--font-size-3xl)',
    fontWeight: '900',
    color: 'var(--dark)',
    marginBottom: 'var(--spacing-sm)'
  },
  subtitle: {
    fontSize: 'var(--font-size-lg)',
    color: 'var(--gray)',
    maxWidth: '500px',
    margin: '0 auto'
  },
  tokenInfo: {
    fontSize: '0.9rem',
    color: 'var(--primary)',
    margin: 'var(--spacing-xs) 0 0 0',
    fontWeight: '500'
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: 'var(--spacing-lg)',
    marginBottom: 'var(--spacing-3xl)'
  },
  statCard: {
    background: 'var(--white)',
    padding: 'var(--spacing-xl)',
    borderRadius: 'var(--radius-xl)',
    boxShadow: 'var(--shadow-lg)',
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-lg)',
    transition: 'transform var(--transition-normal)'
  },
  statIcon: {
    width: '60px',
    height: '60px',
    borderRadius: 'var(--radius-full)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.5rem',
    color: 'var(--white)'
  },
  statContent: {
    flex: 1
  },
  statValue: {
    fontSize: '1.75rem',
    fontWeight: '900',
    color: 'var(--dark)',
    marginBottom: 'var(--spacing-xs)'
  },
  statTitle: {
    fontSize: '0.875rem',
    color: 'var(--gray)',
    marginBottom: 'var(--spacing-xs)'
  },
  statChange: {
    fontSize: '0.75rem',
    color: 'var(--success)',
    fontWeight: '600'
  },
  tabsContainer: {
    background: 'var(--white)',
    borderRadius: 'var(--radius-xl)',
    boxShadow: 'var(--shadow-lg)',
    overflow: 'hidden'
  },
  tabsHeader: {
    display: 'flex',
    background: 'var(--light)',
    borderBottom: '1px solid var(--gray-light)'
  },
  tabButton: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'var(--spacing-sm)',
    padding: 'var(--spacing-lg)',
    background: 'transparent',
    border: 'none',
    fontSize: '0.875rem',
    fontWeight: '500',
    color: 'var(--gray)',
    cursor: 'pointer',
    transition: 'all var(--transition-fast)'
  },
  tabButtonActive: {
    background: 'var(--white)',
    color: 'var(--primary)',
    borderBottom: '2px solid var(--primary)'
  },
  tabIcon: {
    fontSize: '1rem'
  },
  tabContent: {
    padding: 'var(--spacing-2xl)'
  },
  overviewContent: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: 'var(--spacing-2xl)'
  },
  section: {
    background: 'var(--light)',
    padding: 'var(--spacing-xl)',
    borderRadius: 'var(--radius-lg)'
  },
  sectionTitle: {
    fontSize: '1.25rem',
    fontWeight: '700',
    color: 'var(--dark)',
    marginBottom: 'var(--spacing-lg)'
  },
  activitiesList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--spacing-md)'
  },
  activityItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-md)',
    padding: 'var(--spacing-md)',
    background: 'var(--white)',
    borderRadius: 'var(--radius-md)',
    boxShadow: 'var(--shadow-sm)'
  },
  activityIcon: {
    width: '40px',
    height: '40px',
    borderRadius: 'var(--radius-full)',
    background: 'var(--primary)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1rem',
    color: 'var(--white)',
    flexShrink: 0
  },
  activityContent: {
    flex: 1
  },
  activityText: {
    fontSize: '0.875rem',
    color: 'var(--dark)',
    marginBottom: 'var(--spacing-xs)'
  },
  activityTime: {
    fontSize: '0.75rem',
    color: 'var(--gray)'
  },
  activityStatus: {
    padding: 'var(--spacing-xs) var(--spacing-sm)',
    borderRadius: 'var(--radius-full)',
    fontSize: '0.75rem',
    fontWeight: '600',
    color: 'var(--white)',
    flexShrink: 0
  },
  eventsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--spacing-md)'
  },
  eventItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 'var(--spacing-md)',
    background: 'var(--white)',
    borderRadius: 'var(--radius-md)',
    boxShadow: 'var(--shadow-sm)'
  },
  eventInfo: {
    flex: 1
  },
  eventTitle: {
    fontSize: '0.875rem',
    fontWeight: '600',
    color: 'var(--dark)',
    marginBottom: 'var(--spacing-xs)'
  },
  eventDate: {
    fontSize: '0.75rem',
    color: 'var(--gray)'
  },
  eventProgress: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-sm)',
    minWidth: '120px'
  },
  progressBar: {
    flex: 1,
    height: '6px',
    background: 'var(--gray-light)',
    borderRadius: 'var(--radius-full)',
    overflow: 'hidden'
  },
  progressFill: {
    height: '100%',
    background: 'var(--primary)',
    borderRadius: 'var(--radius-full)',
    transition: 'width var(--transition-normal)'
  },
  progressText: {
    fontSize: '0.75rem',
    color: 'var(--gray)',
    fontWeight: '500',
    minWidth: '40px',
    textAlign: 'center'
  },
  coursesContent: {
    textAlign: 'center',
    padding: 'var(--spacing-3xl) 0'
  },
  studentsContent: {
    textAlign: 'center',
    padding: 'var(--spacing-3xl) 0'
  },
  analyticsContent: {
    textAlign: 'center',
    padding: 'var(--spacing-3xl) 0'
  },
  placeholderText: {
    fontSize: '1rem',
    color: 'var(--gray)',
    fontStyle: 'italic'
  },
  seedSection: {
    background: 'var(--white)',
    borderRadius: 'var(--radius-lg)',
    padding: 'var(--spacing-xl)',
    marginBottom: 'var(--spacing-xl)',
    border: '2px dashed var(--warning)',
    textAlign: 'center'
  },
  buttonGroup: {
    display: 'flex',
    gap: 'var(--spacing-md)',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginBottom: 'var(--spacing-sm)'
  },
  testButton: {
    background: 'var(--success)',
    color: 'var(--white)',
    padding: 'var(--spacing-md) var(--spacing-xl)',
    borderRadius: 'var(--radius-full)',
    border: 'none',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all var(--transition-fast)',
    minWidth: '200px'
  },
  seedButton: {
    background: 'var(--warning)',
    color: 'var(--white)',
    padding: 'var(--spacing-md) var(--spacing-xl)',
    borderRadius: 'var(--radius-full)',
    border: 'none',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all var(--transition-fast)',
    minWidth: '200px'
  },
  seedNote: {
    fontSize: '0.875rem',
    color: 'var(--gray)',
    margin: 0,
    fontStyle: 'italic'
  }
};

// Media queries for responsive design
const mediaQueries = `
  @media (min-width: 768px) {
    .stats-grid {
      grid-template-columns: repeat(2, 1fr) !important;
    }
    
    .overview-content {
      grid-template-columns: 1fr 1fr !important;
    }
  }
  
  @media (min-width: 1024px) {
    .stats-grid {
      grid-template-columns: repeat(4, 1fr) !important;
    }
    
    .stat-card:hover {
      transform: translateY(-4px) !important;
    }
    
    .tab-button:hover:not(.tab-button-active) {
      background: var(--white) !important;
      color: var(--primary) !important;
    }
  }
`;

// Add styles to document head
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = mediaQueries;
  document.head.appendChild(styleSheet);
}

export default Dashboard;
