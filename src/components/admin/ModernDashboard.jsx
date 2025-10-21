import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';

export default function ModernDashboard() {
  const [stats, setStats] = useState({
    totalEvents: 0,
    totalRegistrations: 0,
    totalInstructors: 0,
    totalContactMessages: 0,
    totalSubscribers: 0
  });
  const [recentRegistrations, setRecentRegistrations] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // جلب الإحصائيات
      const [eventsSnapshot, registrationsSnapshot, instructorsSnapshot, contactSnapshot, subscribersSnapshot] = await Promise.all([
        getDocs(collection(db, 'events')),
        getDocs(collection(db, 'registrations')),
        getDocs(collection(db, 'instructors')),
        getDocs(collection(db, 'contactSubmissions')),
        getDocs(collection(db, 'newsletterSubscribers'))
      ]);

      setStats({
        totalEvents: eventsSnapshot.docs.length,
        totalRegistrations: registrationsSnapshot.docs.length,
        totalInstructors: instructorsSnapshot.docs.length,
        totalContactMessages: contactSnapshot.docs.length,
        totalSubscribers: subscribersSnapshot.docs.length
      });

      // جلب التسجيلات الحديثة
      const registrationsList = registrationsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })).sort((a, b) => new Date(b.registrationDate?.toDate?.() || b.registrationDate) - new Date(a.registrationDate?.toDate?.() || a.registrationDate))
      .slice(0, 5);
      setRecentRegistrations(registrationsList);

      // جلب الفعاليات القادمة
      const eventsList = eventsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })).filter(event => new Date(event.date) > new Date())
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(0, 3);
      setUpcomingEvents(eventsList);

      // إنشاء النشاط الحديث
      const activities = [
        ...registrationsList.slice(0, 3).map(reg => ({
          type: 'registration',
          title: `تسجيل جديد: ${reg.firstName} ${reg.lastName}`,
          description: `سجل في فعالية: ${reg.eventId}`,
          time: reg.registrationDate?.toDate?.() || reg.registrationDate,
          icon: '📝'
        })),
        ...contactSnapshot.docs.slice(0, 2).map(doc => ({
          type: 'contact',
          title: `رسالة تواصل جديدة`,
          description: `من: ${doc.data().name}`,
          time: doc.data().submittedAt?.toDate?.() || doc.data().submittedAt,
          icon: '📧'
        }))
      ].sort((a, b) => new Date(b.time) - new Date(a.time)).slice(0, 5);
      
      setRecentActivity(activities);

    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'غير محدد';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('ar-EG', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getEventTitle = (eventId) => {
    // يمكن تحسين هذا بجلب عنوان الفعالية من قاعدة البيانات
    return eventId || 'فعالية غير محددة';
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.loadingSpinner}></div>
        <p>جاري تحميل البيانات...</p>
      </div>
    );
  }

  return (
    <div style={styles.dashboard}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <h1 style={styles.dashboardTitle}>لوحة التحكم</h1>
          <p style={styles.dashboardSubtitle}>مرحباً بك في منصة قدرات شباب</p>
        </div>
        <div style={styles.headerRight}>
          <div style={styles.searchContainer}>
            <input 
              type="text" 
              placeholder="البحث..." 
              style={styles.searchInput}
            />
            <span style={styles.searchIcon}>🔍</span>
          </div>
          <div style={styles.headerActions}>
            <button style={styles.actionButton}>🔔</button>
            <button style={styles.actionButton}>⚙️</button>
            <div style={styles.userAvatar}>
              <span style={styles.avatarText}>أ</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <div style={styles.statIcon}>🎯</div>
          <div style={styles.statContent}>
            <div style={styles.statNumber}>{stats.totalEvents}</div>
            <div style={styles.statLabel}>فعالية</div>
          </div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statIcon}>📝</div>
          <div style={styles.statContent}>
            <div style={styles.statNumber}>{stats.totalRegistrations}</div>
            <div style={styles.statLabel}>تسجيل</div>
          </div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statIcon}>👨‍🏫</div>
          <div style={styles.statContent}>
            <div style={styles.statNumber}>{stats.totalInstructors}</div>
            <div style={styles.statLabel}>مدرب</div>
          </div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statIcon}>📧</div>
          <div style={styles.statContent}>
            <div style={styles.statNumber}>{stats.totalContactMessages}</div>
            <div style={styles.statLabel}>رسالة تواصل</div>
          </div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statIcon}>📬</div>
          <div style={styles.statContent}>
            <div style={styles.statNumber}>{stats.totalSubscribers}</div>
            <div style={styles.statLabel}>مشترك نشرة</div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        {/* Left Column */}
        <div style={styles.leftColumn}>
          {/* Recent Registrations */}
          <div style={styles.section}>
            <div style={styles.sectionHeader}>
              <h2 style={styles.sectionTitle}>التسجيلات الحديثة</h2>
              <button style={styles.viewAllButton}>عرض الكل</button>
            </div>
            <div style={styles.registrationsList}>
              {recentRegistrations.map(registration => (
                <div key={registration.id} style={styles.registrationCard}>
                  <div style={styles.registrationAvatar}>
                    <span style={styles.avatarText}>
                      {registration.firstName?.charAt(0) || 'م'}
                    </span>
                  </div>
                  <div style={styles.registrationInfo}>
                    <h3 style={styles.registrationName}>
                      {registration.firstName} {registration.lastName}
                    </h3>
                    <p style={styles.registrationDetails}>
                      {registration.job} • {registration.college}
                    </p>
                    <p style={styles.registrationEvent}>
                      {getEventTitle(registration.eventId)}
                    </p>
                    <p style={styles.registrationDate}>
                      {formatDate(registration.registrationDate)}
                    </p>
                  </div>
                  <div style={styles.registrationStatus}>
                    <span style={styles.statusBadge}>مؤكد</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Events */}
          <div style={styles.section}>
            <div style={styles.sectionHeader}>
              <h2 style={styles.sectionTitle}>الفعاليات القادمة</h2>
            </div>
            <div style={styles.eventsList}>
              {upcomingEvents.map(event => (
                <div key={event.id} style={styles.eventCard}>
                  <div style={styles.eventImage}>
                    <img src={event.image} alt={event.title} style={styles.eventImg} />
                  </div>
                  <div style={styles.eventInfo}>
                    <h3 style={styles.eventTitle}>{event.title}</h3>
                    <p style={styles.eventSubtitle}>{event.subtitle}</p>
                    <p style={styles.eventDate}>{formatDate(event.date)}</p>
                    <p style={styles.eventParticipants}>
                      {event.participants || 0} من {event.maxParticipants} مشارك
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div style={styles.rightColumn}>
          {/* Recent Activity */}
          <div style={styles.section}>
            <div style={styles.sectionHeader}>
              <h2 style={styles.sectionTitle}>النشاط الحديث</h2>
            </div>
            <div style={styles.activityList}>
              {recentActivity.map((activity, index) => (
                <div key={index} style={styles.activityItem}>
                  <div style={styles.activityIcon}>{activity.icon}</div>
                  <div style={styles.activityContent}>
                    <h4 style={styles.activityTitle}>{activity.title}</h4>
                    <p style={styles.activityDescription}>{activity.description}</p>
                    <p style={styles.activityTime}>{formatDate(activity.time)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div style={styles.section}>
            <div style={styles.sectionHeader}>
              <h2 style={styles.sectionTitle}>إجراءات سريعة</h2>
            </div>
            <div style={styles.quickActions}>
              <button style={styles.quickActionButton}>
                <span style={styles.actionIcon}>➕</span>
                <span>إضافة فعالية</span>
              </button>
              <button style={styles.quickActionButton}>
                <span style={styles.actionIcon}>👨‍🏫</span>
                <span>إضافة مدرب</span>
              </button>
              <button style={styles.quickActionButton}>
                <span style={styles.actionIcon}>📊</span>
                <span>عرض التقارير</span>
              </button>
              <button style={styles.quickActionButton}>
                <span style={styles.actionIcon}>⚙️</span>
                <span>الإعدادات</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  dashboard: {
    padding: 'var(--spacing-2xl)',
    fontFamily: 'Tajawal, sans-serif',
    direction: 'rtl',
    backgroundColor: 'var(--light)',
    minHeight: '100vh'
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '50vh',
    gap: 'var(--spacing-lg)'
  },
  loadingSpinner: {
    width: '40px',
    height: '40px',
    border: '4px solid var(--gray-light)',
    borderTop: '4px solid var(--primary)',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 'var(--spacing-2xl)',
    padding: 'var(--spacing-xl)',
    background: 'var(--white)',
    borderRadius: 'var(--radius-xl)',
    boxShadow: 'var(--shadow-md)',
    border: '1px solid var(--gray-light)'
  },
  headerLeft: {
    flex: 1
  },
  dashboardTitle: {
    fontSize: 'var(--font-size-3xl)',
    fontWeight: '900',
    color: 'var(--dark)',
    marginBottom: 'var(--spacing-xs)',
    margin: 0
  },
  dashboardSubtitle: {
    fontSize: '1rem',
    color: 'var(--gray)',
    margin: 0
  },
  headerRight: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-lg)'
  },
  searchContainer: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center'
  },
  searchInput: {
    padding: 'var(--spacing-md) var(--spacing-lg)',
    paddingLeft: '40px',
    border: '1px solid var(--gray-light)',
    borderRadius: 'var(--radius-full)',
    fontSize: '1rem',
    fontFamily: 'Tajawal, sans-serif',
    outline: 'none',
    width: '300px',
    background: 'var(--light)',
    '&:focus': {
      borderColor: 'var(--primary)'
    }
  },
  searchIcon: {
    position: 'absolute',
    left: 'var(--spacing-md)',
    fontSize: '1.2rem',
    color: 'var(--gray)'
  },
  headerActions: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-md)'
  },
  actionButton: {
    background: 'var(--light)',
    border: '1px solid var(--gray-light)',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    fontSize: '1.2rem',
    transition: 'all var(--transition-fast)',
    '&:hover': {
      background: 'var(--primary)',
      color: 'var(--white)'
    }
  },
  userAvatar: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    background: 'var(--primary)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--white)',
    fontWeight: '700'
  },
  avatarText: {
    fontSize: '1rem',
    fontWeight: '700'
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: 'var(--spacing-lg)',
    marginBottom: 'var(--spacing-2xl)'
  },
  statCard: {
    background: 'var(--white)',
    padding: 'var(--spacing-xl)',
    borderRadius: 'var(--radius-lg)',
    boxShadow: 'var(--shadow-md)',
    border: '1px solid var(--gray-light)',
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-lg)',
    transition: 'all var(--transition-fast)',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: 'var(--shadow-lg)'
    }
  },
  statIcon: {
    fontSize: '2.5rem',
    width: '60px',
    height: '60px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)',
    borderRadius: 'var(--radius-lg)',
    color: 'var(--white)'
  },
  statContent: {
    flex: 1
  },
  statNumber: {
    fontSize: '2rem',
    fontWeight: '900',
    color: 'var(--primary)',
    lineHeight: 1,
    marginBottom: 'var(--spacing-xs)'
  },
  statLabel: {
    fontSize: '0.875rem',
    color: 'var(--gray)',
    fontWeight: '600'
  },
  mainContent: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: 'var(--spacing-2xl)'
  },
  leftColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--spacing-2xl)'
  },
  rightColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--spacing-2xl)'
  },
  section: {
    background: 'var(--white)',
    borderRadius: 'var(--radius-lg)',
    boxShadow: 'var(--shadow-md)',
    border: '1px solid var(--gray-light)',
    overflow: 'hidden'
  },
  sectionHeader: {
    padding: 'var(--spacing-xl)',
    borderBottom: '1px solid var(--gray-light)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  sectionTitle: {
    fontSize: '1.25rem',
    fontWeight: '700',
    color: 'var(--dark)',
    margin: 0
  },
  viewAllButton: {
    background: 'transparent',
    border: 'none',
    color: 'var(--primary)',
    fontSize: '0.875rem',
    fontWeight: '600',
    cursor: 'pointer',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline'
    }
  },
  registrationsList: {
    padding: 'var(--spacing-lg)'
  },
  registrationCard: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-md)',
    padding: 'var(--spacing-md)',
    borderRadius: 'var(--radius-md)',
    border: '1px solid var(--gray-light)',
    marginBottom: 'var(--spacing-md)',
    transition: 'all var(--transition-fast)',
    '&:hover': {
      background: 'var(--light)',
      transform: 'translateX(-2px)'
    }
  },
  registrationAvatar: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    background: 'var(--primary)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--white)',
    fontWeight: '700',
    fontSize: '1.2rem'
  },
  registrationInfo: {
    flex: 1
  },
  registrationName: {
    fontSize: '1rem',
    fontWeight: '700',
    color: 'var(--dark)',
    marginBottom: 'var(--spacing-xs)',
    margin: 0
  },
  registrationDetails: {
    fontSize: '0.875rem',
    color: 'var(--gray)',
    marginBottom: 'var(--spacing-xs)',
    margin: 0
  },
  registrationEvent: {
    fontSize: '0.875rem',
    color: 'var(--primary)',
    fontWeight: '600',
    marginBottom: 'var(--spacing-xs)',
    margin: 0
  },
  registrationDate: {
    fontSize: '0.75rem',
    color: 'var(--gray)',
    margin: 0
  },
  registrationStatus: {
    display: 'flex',
    alignItems: 'center'
  },
  statusBadge: {
    background: 'var(--success)',
    color: 'var(--white)',
    padding: 'var(--spacing-xs) var(--spacing-sm)',
    borderRadius: 'var(--radius-full)',
    fontSize: '0.75rem',
    fontWeight: '600'
  },
  eventsList: {
    padding: 'var(--spacing-lg)'
  },
  eventCard: {
    display: 'flex',
    gap: 'var(--spacing-md)',
    padding: 'var(--spacing-md)',
    borderRadius: 'var(--radius-md)',
    border: '1px solid var(--gray-light)',
    marginBottom: 'var(--spacing-md)',
    transition: 'all var(--transition-fast)',
    '&:hover': {
      background: 'var(--light)',
      transform: 'translateX(-2px)'
    }
  },
  eventImage: {
    width: '60px',
    height: '60px',
    borderRadius: 'var(--radius-md)',
    overflow: 'hidden',
    flexShrink: 0
  },
  eventImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  eventInfo: {
    flex: 1
  },
  eventTitle: {
    fontSize: '1rem',
    fontWeight: '700',
    color: 'var(--dark)',
    marginBottom: 'var(--spacing-xs)',
    margin: 0
  },
  eventSubtitle: {
    fontSize: '0.875rem',
    color: 'var(--gray)',
    marginBottom: 'var(--spacing-xs)',
    margin: 0
  },
  eventDate: {
    fontSize: '0.875rem',
    color: 'var(--primary)',
    fontWeight: '600',
    marginBottom: 'var(--spacing-xs)',
    margin: 0
  },
  eventParticipants: {
    fontSize: '0.75rem',
    color: 'var(--gray)',
    margin: 0
  },
  activityList: {
    padding: 'var(--spacing-lg)'
  },
  activityItem: {
    display: 'flex',
    gap: 'var(--spacing-md)',
    padding: 'var(--spacing-md)',
    borderRadius: 'var(--radius-md)',
    marginBottom: 'var(--spacing-md)',
    transition: 'all var(--transition-fast)',
    '&:hover': {
      background: 'var(--light)'
    }
  },
  activityIcon: {
    fontSize: '1.5rem',
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'var(--light)',
    borderRadius: '50%',
    flexShrink: 0
  },
  activityContent: {
    flex: 1
  },
  activityTitle: {
    fontSize: '0.875rem',
    fontWeight: '700',
    color: 'var(--dark)',
    marginBottom: 'var(--spacing-xs)',
    margin: 0
  },
  activityDescription: {
    fontSize: '0.75rem',
    color: 'var(--gray)',
    marginBottom: 'var(--spacing-xs)',
    margin: 0
  },
  activityTime: {
    fontSize: '0.75rem',
    color: 'var(--gray)',
    margin: 0
  },
  quickActions: {
    padding: 'var(--spacing-lg)',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 'var(--spacing-md)'
  },
  quickActionButton: {
    background: 'var(--light)',
    border: '1px solid var(--gray-light)',
    borderRadius: 'var(--radius-md)',
    padding: 'var(--spacing-lg)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 'var(--spacing-sm)',
    cursor: 'pointer',
    transition: 'all var(--transition-fast)',
    fontSize: '0.875rem',
    fontWeight: '600',
    color: 'var(--dark)',
    '&:hover': {
      background: 'var(--primary)',
      color: 'var(--white)',
      transform: 'translateY(-2px)'
    }
  },
  actionIcon: {
    fontSize: '1.5rem'
  }
};
