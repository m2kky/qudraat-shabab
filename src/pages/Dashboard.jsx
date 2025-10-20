import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');

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
    { id: 'courses', name: 'الدورات', icon: '📚' },
    { id: 'students', name: 'المتدربين', icon: '👥' },
    { id: 'analytics', name: 'التحليلات', icon: '📈' }
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
    <>
      <Header />
      <div style={styles.dashboard}>
        <div className="container" style={styles.container}>
          {/* Dashboard Header */}
          <div style={styles.header}>
            <h1 style={styles.title}>لوحة التحكم</h1>
            <p style={styles.subtitle}>مرحباً بك في لوحة تحكم منصة قدرات شباب</p>
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

              {activeTab === 'courses' && (
                <div style={styles.coursesContent}>
                  <h3 style={styles.sectionTitle}>إدارة الدورات</h3>
                  <p style={styles.placeholderText}>قريباً: إدارة الدورات التدريبية</p>
                </div>
              )}

              {activeTab === 'students' && (
                <div style={styles.studentsContent}>
                  <h3 style={styles.sectionTitle}>إدارة المتدربين</h3>
                  <p style={styles.placeholderText}>قريباً: إدارة المتدربين والتسجيلات</p>
                </div>
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
      <Footer />
    </>
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
    textAlign: 'center',
    marginBottom: 'var(--spacing-3xl)'
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
