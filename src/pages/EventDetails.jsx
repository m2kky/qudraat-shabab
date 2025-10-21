import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import RegistrationForm from '../components/events/RegistrationForm';

export default function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('details');
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  // جلب الحدث من Firestore
  useEffect(() => {
    const fetchEvent = async () => {
      if (!id) return;
      
      try {
        const eventDoc = await getDoc(doc(db, 'events', id));
        if (eventDoc.exists()) {
          setEvent({ id: eventDoc.id, ...eventDoc.data() });
        } else {
          setEvent(null);
        }
      } catch (error) {
        console.error('خطأ في جلب الحدث:', error);
        setEvent(null);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  useEffect(() => {
    // Scroll to register section if hash is present
    if (window.location.hash === '#register') {
      setTimeout(() => {
        const element = document.getElementById('register');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, []);

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <p>جار تحميل تفاصيل الورشة...</p>
      </div>
    );
  }

  if (!event) {
    return (
      <div style={styles.notFound}>
        <h1>الورشة غير موجودة</h1>
        <p>عذراً، الورشة المطلوبة غير موجودة أو تم حذفها.</p>
        <Link to="/events" style={styles.backButton}>العودة للفعاليات</Link>
      </div>
    );
  }

  const availableSeats = event.maxParticipants - event.participants;
  const isEventEnded = new Date(event.date) < new Date();

  const tabs = [
    { id: 'details', name: 'تفاصيل الورشة' },
    { id: 'resources', name: 'Resources' },
    { id: 'instructor', name: 'عن المدرب' }
  ];

  return (
    <div style={styles.page} dir="rtl">
      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.heroBackground}>
          <img src={event.image} alt={event.title} style={styles.heroImage} />
          <div style={styles.heroOverlay} />
        </div>
        
        <div className="container" style={styles.heroContainer}>
          <div style={styles.breadcrumbs}>
            <Link to="/" style={styles.homeLink}>الرئيسية</Link> / 
            <Link to="/events" style={styles.eventsLink}>الفعاليات</Link> / 
            <span>{event.title}</span>
          </div>

          <div style={styles.heroContent}>
            <div style={styles.heroText}>
              <div style={styles.categoryBadge}>{event.category}</div>
              <h1 style={styles.heroTitle}>{event.title}</h1>
              <p style={styles.heroSubtitle}>{event.subtitle}</p>
              
              <div style={styles.heroMeta}>
                <div style={styles.metaItem}>
                  <span style={styles.metaIcon}>
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
                    </svg>
                  </span>
                  <span>{new Date(event.date).toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                <div style={styles.metaItem}>
                  <span style={styles.metaIcon}>
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
                      <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                    </svg>
                  </span>
                  <span>{event.time}</span>
                </div>
                <div style={styles.metaItem}>
                  <span style={styles.metaIcon}>
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </span>
                  <span>{event.duration}</span>
                </div>
                <div style={styles.metaItem}>
                  <span style={styles.metaIcon}>
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
                    </svg>
                  </span>
                  <span>{event.level}</span>
                </div>
              </div>

              <div style={styles.seatsInfo}>
                <span style={styles.seatsLabel}>المقاعد المتاحة:</span>
                <span style={styles.seatsCount}>{availableSeats} من {event.maxParticipants}</span>
              </div>
            </div>

            <div style={styles.instructorCard}>
              <div style={styles.instructorImageContainer}>
                <img src={event.instructorImage} alt={event.instructor} style={styles.instructorImage} />
              </div>
              <div style={styles.instructorInfo}>
                <h3 style={styles.instructorName}>{event.instructor}</h3>
                <p style={styles.instructorRole}>مدرب الورشة</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container" style={styles.mainContainer}>
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
                {tab.name}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div style={styles.tabContent}>
            {activeTab === 'details' && (
              <div style={styles.detailsContent}>
                <h3 style={styles.contentTitle}>وصف الورشة</h3>
                <div style={styles.description} dangerouslySetInnerHTML={{ __html: event.description }} />
                
                <div style={styles.detailsGrid}>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>الفئة:</span>
                    <span style={styles.detailValue}>{event.category}</span>
                  </div>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>المدة:</span>
                    <span style={styles.detailValue}>{event.duration}</span>
                  </div>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>المستوى:</span>
                    <span style={styles.detailValue}>{event.level}</span>
                  </div>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>عدد المشاركين:</span>
                    <span style={styles.detailValue}>{event.participants} من {event.maxParticipants}</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'resources' && (
              <div style={styles.resourcesContent}>
                <h3 style={styles.contentTitle}>موارد الورشة</h3>
                
                {/* محتوى الورشة من حقل content */}
                {event.content && (
                  <div style={styles.content} dangerouslySetInnerHTML={{ __html: event.content }} />
                )}
                
                {/* رسالة عدم وجود موارد */}
                {!event.content && (
                  <div style={styles.noResources}>
                    <div style={styles.noResourcesIcon}>📁</div>
                    <h4 style={styles.noResourcesTitle}>لا توجد موارد لهذه الورشة في الوقت الحالي</h4>
                    <p style={styles.noResourcesText}>
                      سيتم رفع العروض التقديمية والملفات الخاصة بالورشة هنا بعد انتهائها
                    </p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'instructor' && (
              <div style={styles.instructorContent}>
                <h3 style={styles.contentTitle}>عن المدرب</h3>
                <div style={styles.instructorDetails}>
                  <div style={styles.instructorImageContainer}>
                    <img src={event.instructorImage} alt={event.instructor} style={styles.instructorImageLarge} />
                  </div>
                  <div style={styles.instructorText}>
                    <h4 style={styles.instructorNameLarge}>{event.instructor}</h4>
                    <p style={styles.instructorBio}>{event.instructorBio}</p>
                    
                    <div style={styles.experienceList}>
                      <h5 style={styles.experienceTitle}>الخبرات والإنجازات:</h5>
                      <ul style={styles.experienceItems}>
                        {event.instructorExperience.map((exp, index) => (
                          <li key={index} style={styles.experienceItem}>{exp}</li>
                        ))}
                      </ul>
                    </div>

                    <div style={styles.socialLinks}>
                      <h5 style={styles.socialTitle}>تواصل مع المدرب:</h5>
                      <div style={styles.socialButtons}>
                        {event.instructorSocial.linkedin && (
                          <a href={event.instructorSocial.linkedin} target="_blank" rel="noopener noreferrer" style={styles.socialButton} title="LinkedIn">
                            <svg style={styles.socialIcon} viewBox="0 0 24 24" fill="currentColor">
                              <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"/>
                            </svg>
                          </a>
                        )}
                        {event.instructorSocial.twitter && (
                          <a href={event.instructorSocial.twitter} target="_blank" rel="noopener noreferrer" style={styles.socialButton} title="Twitter">
                            <svg style={styles.socialIcon} viewBox="0 0 24 24" fill="currentColor">
                              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                            </svg>
                          </a>
                        )}
                        {event.instructorSocial.facebook && (
                          <a href={event.instructorSocial.facebook} target="_blank" rel="noopener noreferrer" style={styles.socialButton} title="Facebook">
                            <svg style={styles.socialIcon} viewBox="0 0 24 24" fill="currentColor">
                              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                            </svg>
                          </a>
                        )}
                        {event.instructorSocial.instagram && (
                          <a href={event.instructorSocial.instagram} target="_blank" rel="noopener noreferrer" style={styles.socialButton} title="Instagram">
                            <svg style={styles.socialIcon} viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                            </svg>
                          </a>
                        )}
                        {event.instructorSocial.website && (
                          <a href={event.instructorSocial.website} target="_blank" rel="noopener noreferrer" style={styles.socialButton} title="الموقع الشخصي">
                            <svg style={styles.socialIcon} viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                            </svg>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Registration Section */}
        <section id="register" style={styles.registrationSection}>
          <div style={styles.registrationHeader}>
            <h2 style={styles.registrationTitle}>سجل في الورشة</h2>
            <p style={styles.registrationSubtitle}>
              {isEventEnded 
                ? 'عذراً، انتهت فترة التسجيل لهذه الورشة' 
                : `المقاعد المتاحة: ${availableSeats} من ${event.maxParticipants}`
              }
            </p>
          </div>
          
          {!isEventEnded && availableSeats > 0 ? (
            <RegistrationForm eventId={event.id} />
          ) : (
            <div style={styles.registrationClosed}>
              <p>التسجيل غير متاح حالياً</p>
              <Link to="/events" style={styles.browseEventsButton}>
                تصفح الورش الأخرى
              </Link>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    background: 'var(--light)'
  },
  notFound: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '50vh',
    textAlign: 'center',
    padding: 'var(--spacing-2xl)'
  },
  backButton: {
    background: 'var(--Primary, #0517A2)',
    color: 'var(--white)',
    padding: 'var(--spacing-md) var(--spacing-xl)',
    borderRadius: 'var(--radius-full)',
    textDecoration: 'none',
    fontWeight: 600,
    marginTop: 'var(--spacing-lg)'
  },
  hero: {
    position: 'relative',
    minHeight: '60vh',
    display: 'flex',
    alignItems: 'center',
    overflow: 'hidden'
  },
  heroBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1
  },
  heroImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  heroOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, rgba(5,23,162,0.8) 0%, rgba(5,23,162,0.6) 100%)'
  },
  heroContainer: {
    position: 'relative',
    zIndex: 2,
    maxWidth: 1200,
    margin: '0 auto',
    padding: '0 var(--spacing-md)',
    width: '100%'
  },
  breadcrumbs: {
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 'var(--spacing-lg)',
    fontSize: '0.875rem'
  },
  homeLink: {
    color: 'var(--white)',
    textDecoration: 'none'
  },
  eventsLink: {
    color: 'var(--white)',
    textDecoration: 'none'
  },
  heroContent: {
    display: 'grid',
    gridTemplateColumns: '1fr auto',
    gap: 'var(--spacing-2xl)',
    alignItems: 'end'
  },
  heroText: {
    color: 'var(--white)'
  },
  categoryBadge: {
    display: 'inline-block',
    background: 'rgba(255,255,255,0.2)',
    color: 'var(--white)',
    padding: 'var(--spacing-xs) var(--spacing-md)',
    borderRadius: 'var(--radius-full)',
    fontSize: '0.875rem',
    fontWeight: 600,
    marginBottom: 'var(--spacing-md)'
  },
  heroTitle: {
    fontSize: 'clamp(2rem, 5vw, 3.5rem)',
    fontWeight: 900,
    marginBottom: 'var(--spacing-sm)',
    lineHeight: 1.2
  },
  heroSubtitle: {
    fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
    opacity: 0.9,
    marginBottom: 'var(--spacing-lg)'
  },
  heroMeta: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 'var(--spacing-lg)',
    marginBottom: 'var(--spacing-lg)'
  },
  metaItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-xs)',
    fontSize: '0.875rem'
  },
  metaIcon: {
    width: '20px',
    height: '20px',
    fill: 'currentColor',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  seatsInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-sm)',
    fontSize: '0.875rem'
  },
  seatsLabel: {
    opacity: 0.8
  },
  seatsCount: {
    fontWeight: 600,
    background: 'rgba(255,255,255,0.2)',
    padding: 'var(--spacing-xs) var(--spacing-sm)',
    borderRadius: 'var(--radius-md)'
  },
  instructorCard: {
    background: 'rgba(255,255,255,0.95)',
    padding: 'var(--spacing-lg)',
    borderRadius: 'var(--radius-xl)',
    boxShadow: 'var(--shadow-lg)',
    textAlign: 'center',
    minWidth: '200px'
  },
  instructorImageContainer: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    overflow: 'hidden',
    margin: '0 auto var(--spacing-md)',
    border: '3px solid var(--white)',
    boxShadow: 'var(--shadow-md)'
  },
  instructorImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  instructorInfo: {
    color: 'var(--dark)'
  },
  instructorName: {
    fontSize: '1.125rem',
    fontWeight: 700,
    marginBottom: 'var(--spacing-xs)'
  },
  instructorRole: {
    fontSize: '0.875rem',
    color: 'var(--gray)'
  },
  mainContainer: {
    maxWidth: 1200,
    margin: '0 auto',
    padding: 'var(--spacing-2xl) var(--spacing-md)'
  },
  tabsContainer: {
    background: 'var(--white)',
    borderRadius: 'var(--radius-xl)',
    boxShadow: 'var(--shadow-lg)',
    overflow: 'hidden',
    marginBottom: 'var(--spacing-2xl)'
  },
  tabsHeader: {
    display: 'flex',
    borderBottom: '1px solid var(--gray-light)'
  },
  tabButton: {
    flex: 1,
    padding: 'var(--spacing-lg)',
    background: 'transparent',
    border: 'none',
    fontSize: '1rem',
    fontWeight: 600,
    color: 'var(--gray)',
    cursor: 'pointer',
    transition: 'all var(--transition-fast)'
  },
  tabButtonActive: {
    background: 'var(--Primary, #0517A2)',
    color: 'var(--white)'
  },
  tabContent: {
    padding: 'var(--spacing-2xl)'
  },
  contentTitle: {
    fontSize: '1.5rem',
    fontWeight: 700,
    color: 'var(--Primary, #0517A2)',
    marginBottom: 'var(--spacing-lg)'
  },
  description: {
    fontSize: '1rem',
    lineHeight: 1.6,
    color: 'var(--dark)',
    marginBottom: 'var(--spacing-xl)'
  },
  content: {
    fontSize: '1rem',
    lineHeight: 1.6,
    color: 'var(--dark)',
    marginBottom: 'var(--spacing-xl)',
    background: 'var(--gray-light)',
    padding: 'var(--spacing-lg)',
    borderRadius: 'var(--radius-md)',
    border: '1px solid var(--gray)'
  },
  detailsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: 'var(--spacing-md)'
  },
  detailItem: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: 'var(--spacing-md)',
    background: 'var(--light)',
    borderRadius: 'var(--radius-md)'
  },
  detailLabel: {
    fontWeight: 600,
    color: 'var(--gray)'
  },
  detailValue: {
    fontWeight: 700,
    color: 'var(--dark)'
  },
  syllabusList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--spacing-lg)'
  },
  syllabusItem: {
    display: 'flex',
    gap: 'var(--spacing-md)',
    padding: 'var(--spacing-lg)',
    background: 'var(--light)',
    borderRadius: 'var(--radius-lg)'
  },
  syllabusNumber: {
    width: '40px',
    height: '40px',
    background: 'var(--Primary, #0517A2)',
    color: 'var(--white)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 700,
    flexShrink: 0
  },
  syllabusContent: {
    flex: 1
  },
  syllabusTitle: {
    fontSize: '1.125rem',
    fontWeight: 700,
    marginBottom: 'var(--spacing-xs)',
    color: 'var(--dark)'
  },
  syllabusDescription: {
    fontSize: '0.875rem',
    color: 'var(--gray)',
    marginBottom: 'var(--spacing-sm)',
    lineHeight: 1.5
  },
  syllabusDuration: {
    fontSize: '0.75rem',
    color: 'var(--Primary, #0517A2)',
    fontWeight: 600,
    background: 'rgba(5,23,162,0.1)',
    padding: 'var(--spacing-xs) var(--spacing-sm)',
    borderRadius: 'var(--radius-md)',
    display: 'inline-block'
  },
  instructorDetails: {
    display: 'grid',
    gridTemplateColumns: '200px 1fr',
    gap: 'var(--spacing-2xl)',
    alignItems: 'start'
  },
  instructorImageContainer: {
    width: '200px',
    height: '200px',
    borderRadius: 'var(--radius-xl)',
    overflow: 'hidden',
    boxShadow: 'var(--shadow-lg)'
  },
  instructorImageLarge: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  instructorText: {
    color: 'var(--dark)'
  },
  instructorNameLarge: {
    fontSize: '1.5rem',
    fontWeight: 700,
    marginBottom: 'var(--spacing-md)',
    color: 'var(--Primary, #0517A2)'
  },
  instructorBio: {
    fontSize: '1rem',
    lineHeight: 1.6,
    marginBottom: 'var(--spacing-xl)'
  },
  experienceList: {
    marginBottom: 'var(--spacing-xl)'
  },
  experienceTitle: {
    fontSize: '1.125rem',
    fontWeight: 700,
    marginBottom: 'var(--spacing-md)',
    color: 'var(--dark)'
  },
  experienceItems: {
    listStyle: 'none',
    padding: 0,
    margin: 0
  },
  experienceItem: {
    padding: 'var(--spacing-sm) 0',
    borderBottom: '1px solid var(--gray-light)',
    position: 'relative',
    paddingRight: 'var(--spacing-lg)'
  },
  socialLinks: {
    marginTop: 'var(--spacing-xl)'
  },
  socialTitle: {
    fontSize: '1.125rem',
    fontWeight: 700,
    marginBottom: 'var(--spacing-md)',
    color: 'var(--dark)'
  },
  socialButtons: {
    display: 'flex',
    gap: 'var(--spacing-md)',
    flexWrap: 'wrap'
  },
  socialButton: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '50px',
    height: '50px',
    borderRadius: '12px',
    background: 'var(--primary)',
    color: 'var(--white)',
    textDecoration: 'none',
    fontSize: '1.2rem',
    transition: 'all 0.3s ease',
    margin: '0 var(--spacing-sm)',
    boxShadow: '0 4px 15px rgba(5, 23, 162, 0.3)',
    border: '2px solid rgba(255, 255, 255, 0.1)',
    '&:hover': {
      transform: 'translateY(-3px) scale(1.05)',
      boxShadow: '0 8px 25px rgba(5, 23, 162, 0.5)',
      background: 'var(--secondary)'
    }
  },
  socialIcon: {
    width: '20px',
    height: '20px',
    fill: 'currentColor'
  },
  registrationSection: {
    background: 'var(--white)',
    borderRadius: 'var(--radius-xl)',
    boxShadow: 'var(--shadow-lg)',
    padding: 'var(--spacing-2xl)'
  },
  registrationHeader: {
    textAlign: 'center',
    marginBottom: 'var(--spacing-2xl)'
  },
  registrationTitle: {
    fontSize: '1.75rem',
    fontWeight: 700,
    color: 'var(--Primary, #0517A2)',
    marginBottom: 'var(--spacing-sm)'
  },
  registrationSubtitle: {
    fontSize: '1rem',
    color: 'var(--gray)'
  },
  registrationClosed: {
    textAlign: 'center',
    padding: 'var(--spacing-2xl)',
    background: 'var(--light)',
    borderRadius: 'var(--radius-lg)'
  },
  browseEventsButton: {
    background: 'var(--Primary, #0517A2)',
    color: 'var(--white)',
    padding: 'var(--spacing-md) var(--spacing-xl)',
    borderRadius: 'var(--radius-full)',
    textDecoration: 'none',
    fontWeight: 600,
    marginTop: 'var(--spacing-lg)',
    display: 'inline-block'
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '50vh',
    fontSize: 'var(--font-size-lg)',
    color: 'var(--gray)'
  },
  resourcesContent: {
    padding: 'var(--spacing-xl)'
  },
  noResources: {
    textAlign: 'center',
    padding: 'var(--spacing-3xl)',
    background: 'var(--gray-light)',
    borderRadius: 'var(--radius-lg)',
    border: '2px dashed var(--gray)'
  },
  noResourcesIcon: {
    fontSize: '3rem',
    marginBottom: 'var(--spacing-lg)'
  },
  noResourcesTitle: {
    fontSize: '1.25rem',
    fontWeight: '600',
    color: 'var(--dark)',
    marginBottom: 'var(--spacing-md)'
  },
  noResourcesText: {
    fontSize: '1rem',
    color: 'var(--gray)',
    lineHeight: 1.6,
    margin: 0
  }
};
