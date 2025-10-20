import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getEventById } from '../data/events';
import RegistrationForm from '../components/events/RegistrationForm';

export default function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('details');
  const event = getEventById(id);

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
    { id: 'syllabus', name: 'محتوى الورشة' },
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
                  <span style={styles.metaIcon}>📅</span>
                  <span>{new Date(event.date).toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                <div style={styles.metaItem}>
                  <span style={styles.metaIcon}>⏰</span>
                  <span>{event.time}</span>
                </div>
                <div style={styles.metaItem}>
                  <span style={styles.metaIcon}>⏱️</span>
                  <span>{event.duration}</span>
                </div>
                <div style={styles.metaItem}>
                  <span style={styles.metaIcon}>📊</span>
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
                <p style={styles.description}>{event.description}</p>
                
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

            {activeTab === 'syllabus' && (
              <div style={styles.syllabusContent}>
                <h3 style={styles.contentTitle}>محتوى الورشة</h3>
                <div style={styles.syllabusList}>
                  {event.syllabus.map((item, index) => (
                    <div key={index} style={styles.syllabusItem}>
                      <div style={styles.syllabusNumber}>{index + 1}</div>
                      <div style={styles.syllabusContent}>
                        <h4 style={styles.syllabusTitle}>{item.title}</h4>
                        <p style={styles.syllabusDescription}>{item.description}</p>
                        <span style={styles.syllabusDuration}>{item.duration}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'instructor' && (
              <div style={styles.instructorContent}>
                <h3 style={styles.contentTitle}>عن المدرب</h3>
                <div style={styles.instructorDetails}>
                  <div style={styles.instructorImageLarge}>
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
                          <a href={event.instructorSocial.linkedin} target="_blank" rel="noopener noreferrer" style={styles.socialButton}>
                            LinkedIn
                          </a>
                        )}
                        {event.instructorSocial.twitter && (
                          <a href={event.instructorSocial.twitter} target="_blank" rel="noopener noreferrer" style={styles.socialButton}>
                            Twitter
                          </a>
                        )}
                        {event.instructorSocial.instagram && (
                          <a href={event.instructorSocial.instagram} target="_blank" rel="noopener noreferrer" style={styles.socialButton}>
                            Instagram
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
    fontSize: '1rem'
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
  instructorImageLarge: {
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
    background: 'var(--Primary, #0517A2)',
    color: 'var(--white)',
    padding: 'var(--spacing-sm) var(--spacing-lg)',
    borderRadius: 'var(--radius-full)',
    textDecoration: 'none',
    fontSize: '0.875rem',
    fontWeight: 600,
    transition: 'all var(--transition-fast)'
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
  }
};
