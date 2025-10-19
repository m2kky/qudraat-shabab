import { useState } from 'react';
import { events } from '../data/mockData';

function EventsSection() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredEvents, setFilteredEvents] = useState(events);

  const categories = [
    { id: 'all', name: 'جميع الفعاليات', icon: '🎯' },
    { id: 'تدريب', name: 'دورات تدريبية', icon: '📚' },
    { id: 'مؤتمر', name: 'مؤتمرات', icon: '🎤' },
    { id: 'ورشة', name: 'ورش عمل', icon: '🛠️' },
    { id: 'ندوة', name: 'ندوات', icon: '💡' }
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
            فعالياتنا التدريبية
          </h2>
          <p style={styles.subtitle}>
            اكتشف مجموعة متنوعة من الفعاليات والدورات التدريبية المصممة خصيصاً لتطوير مهاراتك
          </p>
        </div>

        {/* Category Filter */}
        <div style={styles.filterContainer}>
          <div style={styles.filterButtons}>
            {categories.map(category => (
              <button
                key={category.id}
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
        <div style={styles.eventsGrid}>
          {filteredEvents.map(event => (
            <article key={event.id} style={styles.eventCard}>
              <div style={styles.eventImage}>
                <img 
                  src={event.image} 
                  alt={event.title}
                  style={styles.image}
                  loading="lazy"
                />
                <div style={styles.eventCategory}>
                  <span style={styles.categoryBadge}>{event.category}</span>
                </div>
              </div>
              
              <div style={styles.eventContent}>
                <div style={styles.eventMeta}>
                  <span style={styles.eventDate}>
                    📅 {formatDate(event.date)}
                  </span>
                  <span style={styles.eventDuration}>
                    ⏱️ {event.duration}
                  </span>
                </div>
                
                <h3 style={styles.eventTitle}>{event.title}</h3>
                <p style={styles.eventDescription}>{event.description}</p>
                
                <div style={styles.eventDetails}>
                  <div style={styles.eventDetail}>
                    <span style={styles.detailLabel}>المستوى:</span>
                    <span style={styles.detailValue}>{event.level}</span>
                  </div>
                  <div style={styles.eventDetail}>
                    <span style={styles.detailLabel}>السعر:</span>
                    <span style={styles.detailValue}>{event.price}</span>
                  </div>
                </div>
                
                <div style={styles.eventActions}>
                  <button style={styles.registerButton}>
                    سجل الآن
                  </button>
                  <button style={styles.detailsButton}>
                    التفاصيل
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Load More Button */}
        <div style={styles.loadMoreContainer}>
          <button style={styles.loadMoreButton}>
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
    fontSize: 'clamp(1.75rem, 5vw, 2.5rem)',
    fontWeight: '900',
    color: 'var(--dark)',
    marginBottom: 'var(--spacing-md)',
    position: 'relative'
  },
  subtitle: {
    fontSize: 'clamp(1rem, 3vw, 1.25rem)',
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
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
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
    position: 'relative'
  },
  eventImage: {
    position: 'relative',
    height: '200px',
    overflow: 'hidden'
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform var(--transition-normal)'
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
    fontSize: '0.875rem',
    color: 'var(--gray)',
    lineHeight: '1.5',
    marginBottom: 'var(--spacing-md)',
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
    gap: 'var(--spacing-sm)'
  },
  registerButton: {
    background: 'var(--primary)',
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
    color: 'var(--primary)',
    padding: 'var(--spacing-sm) var(--spacing-lg)',
    borderRadius: 'var(--radius-md)',
    border: '1px solid var(--primary)',
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
