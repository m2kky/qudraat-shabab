import { useState } from 'react';
import { events } from '../data/mockData';

function EventsSection() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredEvents, setFilteredEvents] = useState(events);

  const categories = [
    { id: 'all', name: 'جميع الورش', icon: '🎯' },
    { id: 'ورشة', name: 'ورش عمل', icon: '🛠️' }
  ];

  const handleCategoryFilter = (categoryId) => {
    setSelectedCategory(categoryId);
    if (categoryId === 'all') {
      setFilteredEvents(events);
    } else {
      setFilteredEvents(events.filter(event => event.category === categoryId));
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <section id="events" style={styles.section} role="region" aria-labelledby="events-title">
      <div className="container" style={styles.container}>
        {/* Section Header */}
        <div style={styles.header}>
          <h2 id="events-title" style={styles.title}>
            ورشنا التدريبية
          </h2>
          <p style={styles.subtitle}>
            اكتشف مجموعة متنوعة من الورش التدريبية المصممة خصيصاً لتطوير مهاراتك
          </p>
        </div>

        {/* Category Filter */}
        <div style={styles.filterContainer}>
          <div className="filter-buttons" style={styles.filterButtons}>
            {categories.map(category => (
              <button
                key={category.id}
                className="filter-button"
                style={{
                  ...styles.filterButton,
                  ...(selectedCategory === category.id ? styles.filterButtonActive : {})
                }}
                onClick={() => handleCategoryFilter(category.id)}
                aria-pressed={selectedCategory === category.id}
              >
                <span style={styles.filterIcon}>{category.icon}</span>
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Events Grid */}
        <div className="events-grid" style={styles.eventsGrid}>
          {filteredEvents.map(event => {
            const isEventEnded = new Date(event.date) < new Date();
            return (
              <article key={event.id} className="event-card" style={styles.eventCard}>
                {/* Top Image Section */}
                <div style={styles.eventTopSection}>
                  {/* Background Image */}
                  <div style={styles.backgroundImageContainer}>
                    <img 
                      src={event.instructorImage || event.image} 
                      alt={event.instructor}
                      style={styles.backgroundImage}
                    />
                    <div style={styles.imageOverlay}></div>
                  </div>
                  
                  {/* Logo */}
                  <div style={styles.eventLogo}>
                    <span style={styles.logoText}>قدرات شباب</span>
                    <div style={styles.logoIcon}>ق</div>
                  </div>
                  
                  {/* Ended Tag */}
                  {isEventEnded && (
                    <div style={styles.endedTag}>
                      <span style={styles.endedText}>أنهيت الدورة</span>
                      <div style={styles.checkIcon}>✓</div>
                    </div>
                  )}
                  
                  {/* Participants Counter */}
                  <div style={styles.participantsCounter}>
                    <div style={styles.participantIcon}>👤</div>
                    <span style={styles.participantCount}>{event.participants || 13}</span>
                  </div>
                  
                  {/* Title Overlay with Fade */}
                  <div style={styles.titleOverlay}>
                    <div style={styles.fadeGradient}></div>
                    <div style={styles.eventTitleSection}>
                      <h3 style={styles.eventMainTitle}>{event.title}</h3>
                      <p style={styles.eventSubtitle}>{event.subtitle || event.category}</p>
                    </div>
                  </div>
                </div>
                
                {/* Bottom White Section */}
                <div style={styles.eventBottomSection}>
                  <p style={styles.eventDescription}>{event.description}</p>
                  
                  <div style={styles.eventInfo}>
                    <div style={styles.eventDateTime}>
                      <div style={styles.eventDate}>{formatDate(event.date)}</div>
                      <div style={styles.eventTime}>{event.time || '3 عصراً'}</div>
                    </div>
                    
                    <div style={styles.instructorInfo}>
                      <span style={styles.instructorNameBottom}>{event.instructor}</span>
                      <img 
                        src={event.instructorImage || event.image} 
                        alt={event.instructor}
                        style={styles.instructorThumbnail}
                      />
                    </div>
                  </div>
                  
                  <div style={styles.eventActions}>
                    <button className="details-button" style={styles.detailsButton}>
                      التفاصيل
                    </button>
                    <button className="register-button" style={styles.registerButton}>
                      سجل الآن
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Load More Button */}
        <div style={styles.loadMoreContainer}>
          <button className="load-more-button" style={styles.loadMoreButton}>
            عرض المزيد من الفعاليات
          </button>
        </div>
      </div>
    </section>
  );
}

const styles = {
  section: {
    padding: 'var(--spacing-3xl) 0',
    background: 'var(--light)',
    position: 'relative'
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
    marginBottom: 'var(--spacing-md)',
    position: 'relative'
  },
  subtitle: {
    fontSize: 'var(--font-size-lg)',
    color: 'var(--gray)',
    maxWidth: '600px',
    margin: '0 auto',
    lineHeight: '1.6'
  },
  filterContainer: {
    marginBottom: 'var(--spacing-2xl)',
    display: 'flex',
    justifyContent: 'center'
  },
  filterButtons: {
    display: 'flex',
    gap: 'var(--spacing-sm)',
    flexWrap: 'wrap',
    justifyContent: 'center',
    background: 'var(--white)',
    padding: 'var(--spacing-sm)',
    borderRadius: 'var(--radius-full)',
    boxShadow: 'var(--shadow-md)',
    border: '1px solid var(--gray-light)'
  },
  filterButton: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-xs)',
    padding: 'var(--spacing-sm) var(--spacing-md)',
    background: 'transparent',
    border: 'none',
    borderRadius: 'var(--radius-full)',
    fontSize: '0.875rem',
    fontWeight: '500',
    color: 'var(--gray)',
    cursor: 'pointer',
    transition: 'all var(--transition-fast)',
    whiteSpace: 'nowrap'
  },
  filterButtonActive: {
    background: 'var(--primary)',
    color: 'var(--white)',
    boxShadow: 'var(--shadow-sm)'
  },
  filterIcon: {
    fontSize: '1rem'
  },
  eventsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: 'var(--spacing-xl)',
    marginBottom: 'var(--spacing-2xl)'
  },
  eventCard: {
    background: 'var(--white)',
    borderRadius: 'var(--radius-xl)',
    overflow: 'hidden',
    boxShadow: 'var(--shadow-lg)',
    transition: 'all var(--transition-normal)',
    border: '1px solid var(--gray-light)',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    height: '500px'
  },
  // New Card Design Styles
  eventTopSection: {
    background: 'var(--Primary, #0017BB)',
    padding: 'var(--spacing-lg)',
    position: 'relative',
    flex: '2',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    overflow: 'hidden'
  },
  backgroundImageContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center'
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 23, 187, 0.3)',
    zIndex: 2
  },
  titleOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 3
  },
  fadeGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(transparent, rgba(0, 0, 0, 0.8))',
    zIndex: 1
  },
  eventBottomSection: {
    background: 'var(--white)',
    padding: 'var(--spacing-lg)',
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: 'var(--spacing-md)'
  },
  eventLogo: {
    position: 'absolute',
    top: 'var(--spacing-md)',
    right: 'var(--spacing-md)',
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-xs)',
    zIndex: 3
  },
  logoText: {
    fontSize: 'var(--font-size-sm)',
    fontWeight: '600',
    color: 'white'
  },
  logoIcon: {
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    background: 'white',
    color: 'var(--Primary, #0017BB)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 'var(--font-size-sm)',
    fontWeight: '700'
  },
  endedTag: {
    position: 'absolute',
    top: 'var(--spacing-md)',
    left: 'var(--spacing-md)',
    background: 'white',
    padding: 'var(--spacing-xs) var(--spacing-sm)',
    borderRadius: 'var(--radius-md)',
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-xs)',
    zIndex: 3
  },
  endedText: {
    fontSize: 'var(--font-size-xs)',
    color: 'var(--dark)',
    fontWeight: '600'
  },
  checkIcon: {
    width: '16px',
    height: '16px',
    borderRadius: '50%',
    background: 'var(--success)',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '10px'
  },
  instructorImageContainer: {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    overflow: 'hidden',
    marginBottom: 'var(--spacing-md)',
    border: '4px solid rgba(255, 255, 255, 0.3)'
  },
  instructorImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  eventTitleSection: {
    textAlign: 'center',
    padding: 'var(--spacing-lg)',
    position: 'relative',
    zIndex: 2
  },
  eventMainTitle: {
    fontSize: 'var(--font-size-xl)',
    fontWeight: '700',
    color: 'white',
    margin: '0 0 var(--spacing-xs) 0'
  },
  eventSubtitle: {
    fontSize: 'var(--font-size-sm)',
    color: 'rgba(255, 255, 255, 0.8)',
    margin: 0
  },
  instructorName: {
    fontSize: 'var(--font-size-sm)',
    color: 'white',
    marginBottom: 'var(--spacing-md)'
  },
  participantsCounter: {
    position: 'absolute',
    bottom: 'var(--spacing-md)',
    left: 'var(--spacing-md)',
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-xs)',
    zIndex: 3
  },
  participantIcon: {
    fontSize: 'var(--font-size-lg)',
    color: 'white'
  },
  participantCount: {
    fontSize: 'var(--font-size-lg)',
    fontWeight: '700',
    color: 'white'
  },
  eventBottomTitle: {
    fontSize: 'var(--font-size-lg)',
    fontWeight: '700',
    color: 'var(--Primary, #0017BB)',
    margin: '0 0 var(--spacing-sm) 0'
  },
  eventInfo: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 'var(--spacing-md)'
  },
  eventDateTime: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--spacing-xs)'
  },
  eventDate: {
    fontSize: 'var(--font-size-sm)',
    color: 'var(--dark)',
    fontWeight: '600'
  },
  eventTime: {
    fontSize: 'var(--font-size-sm)',
    color: 'var(--dark)',
    fontWeight: '600'
  },
  instructorInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-sm)',
    flexDirection: 'row-reverse'
  },
  instructorThumbnail: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '2px solid var(--Primary, #0017BB)'
  },
  instructorNameBottom: {
    fontSize: 'var(--font-size-sm)',
    color: 'var(--dark)',
    fontWeight: '600'
  },
  eventCategory: {
    position: 'absolute',
    top: 'var(--spacing-md)',
    right: 'var(--spacing-md)'
  },
  categoryBadge: {
    background: 'var(--primary)',
    color: 'var(--white)',
    padding: 'var(--spacing-xs) var(--spacing-sm)',
    borderRadius: 'var(--radius-full)',
    fontSize: '0.75rem',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },
  eventContent: {
    padding: 'var(--spacing-lg)'
  },
  eventMeta: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--spacing-xs)',
    marginBottom: 'var(--spacing-sm)'
  },
  eventDate: {
    fontSize: '0.875rem',
    color: 'var(--gray)',
    fontWeight: '500'
  },
  eventDuration: {
    fontSize: '0.875rem',
    color: 'var(--gray)',
    fontWeight: '500'
  },
  eventTitle: {
    fontSize: '1.25rem',
    fontWeight: '700',
    color: 'var(--dark)',
    marginBottom: 'var(--spacing-sm)',
    lineHeight: '1.3'
  },
  eventDescription: {
    fontSize: 'var(--font-size-base)',
    color: 'var(--gray)',
    lineHeight: '1.6',
    margin: 0,
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden'
  },
  eventDetails: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--spacing-xs)',
    marginBottom: 'var(--spacing-lg)',
    padding: 'var(--spacing-sm)',
    background: 'var(--light)',
    borderRadius: 'var(--radius-md)'
  },
  eventDetail: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '0.75rem'
  },
  detailLabel: {
    color: 'var(--gray)',
    fontWeight: '500'
  },
  detailValue: {
    color: 'var(--dark)',
    fontWeight: '600'
  },
  eventActions: {
    display: 'flex',
    gap: 'var(--spacing-sm)',
    justifyContent: 'space-between'
  },
  registerButton: {
    background: 'var(--Primary, #0017BB)',
    color: 'var(--white)',
    padding: 'var(--spacing-sm) var(--spacing-lg)',
    borderRadius: 'var(--radius-md)',
    border: 'none',
    fontSize: '0.875rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all var(--transition-fast)',
    flex: 1
  },
  detailsButton: {
    background: 'transparent',
    color: 'var(--Primary, #0017BB)',
    padding: 'var(--spacing-sm) var(--spacing-lg)',
    borderRadius: 'var(--radius-md)',
    border: '1px solid var(--Primary, #0017BB)',
    fontSize: '0.875rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all var(--transition-fast)',
    flex: 1
  },
  loadMoreContainer: {
    textAlign: 'center'
  },
  loadMoreButton: {
    background: 'var(--secondary)',
    color: 'var(--white)',
    padding: 'var(--spacing-md) var(--spacing-2xl)',
    borderRadius: 'var(--radius-full)',
    border: 'none',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all var(--transition-fast)',
    boxShadow: 'var(--shadow-md)'
  }
};

// Media queries for responsive design
const mediaQueries = `
  @media (max-width: 767px) {
    .events-grid {
      grid-template-columns: 1fr !important;
      gap: var(--spacing-lg) !important;
    }
    
    .filter-buttons {
      flex-wrap: wrap !important;
      gap: var(--spacing-sm) !important;
    }
    
    .filter-button {
      font-size: var(--font-size-sm) !important;
      padding: var(--spacing-sm) var(--spacing-md) !important;
    }
    
    .event-card {
      margin: 0 !important;
    }
    
    .event-title {
      font-size: var(--font-size-xl) !important;
    }
    
    .event-description {
      font-size: var(--font-size-sm) !important;
    }
  }
  
  @media (min-width: 768px) {
    .events-grid {
      grid-template-columns: repeat(2, 1fr) !important;
    }
    
    .filter-buttons {
      flex-wrap: nowrap !important;
    }
  }
  
  @media (min-width: 1024px) {
    .events-grid {
      grid-template-columns: repeat(3, 1fr) !important;
    }
    
    .event-card:hover {
      transform: translateY(-4px) !important;
      box-shadow: var(--shadow-xl) !important;
    }
    
    .event-card:hover .event-image img {
      transform: scale(1.05) !important;
    }
    
    .register-button:hover {
      background: var(--primary-dark) !important;
    }
    
    .details-button:hover {
      background: var(--primary) !important;
      color: var(--white) !important;
    }
    
    .load-more-button:hover {
      background: var(--secondary-dark) !important;
      transform: translateY(-2px) !important;
    }
  }
`;

// Add styles to document head
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = mediaQueries;
  document.head.appendChild(styleSheet);
}

export default EventsSection;
