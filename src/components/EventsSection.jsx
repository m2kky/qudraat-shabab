import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { events } from '../data/events';
import EventCard from './events/EventCard';

function EventsSection() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredEvents, setFilteredEvents] = useState(events.slice(0, 9));

  const categories = [
    { id: 'all', name: 'كل الورش' },
    { id: 'برمجة', name: 'برمجة' },
    { id: 'تسويق', name: 'تسويق' },
    { id: 'تصميم', name: 'تصميم', },
    { id: 'أعمال', name: 'أعمال', },
    { id: 'صناعة محتوى', name: 'صناعة محتوى' }
  ];

  const handleCategoryFilter = (categoryId) => {
    setSelectedCategory(categoryId);
    if (categoryId === 'all') {
      setFilteredEvents(events.slice(0, 9));
    } else {
      setFilteredEvents(
        events
          .filter(event => event.category === categoryId)
          .slice(0, 9)
      );
    }
  };

  // Return an inline SVG icon per category. Icons inherit currentColor.
  const getCategoryIcon = (categoryId) => {
    const common = { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' };
    switch (categoryId) {
      case 'all':
        return (
          <svg {...common}>
            <rect x="3" y="3" width="7" height="7" rx="1"/>
            <rect x="14" y="3" width="7" height="7" rx="1"/>
            <rect x="3" y="14" width="7" height="7" rx="1"/>
            <rect x="14" y="14" width="7" height="7" rx="1"/>
          </svg>
        );
      case 'برمجة':
        return (
          <svg {...common}>
            <polyline points="7 8 3 12 7 16" />
            <polyline points="17 8 21 12 17 16" />
            <line x1="10" y1="19" x2="14" y2="5" />
          </svg>
        );
      case 'تسويق':
        return (
          <svg {...common}>
            <path d="M3 3v18h18" />
            <polyline points="7 15 11 11 14 14 20 8" />
            <circle cx="7" cy="15" r="1" fill="currentColor" stroke="none" />
            <circle cx="11" cy="11" r="1" fill="currentColor" stroke="none" />
            <circle cx="14" cy="14" r="1" fill="currentColor" stroke="none" />
            <circle cx="20" cy="8" r="1" fill="currentColor" stroke="none" />
          </svg>
        );
      case 'تصميم':
        return (
          <svg {...common}>
            <path d="M14 3l7 7-7 7-7-7 7-7z" />
            <circle cx="14" cy="10" r="2" />
          </svg>
        );
      case 'أعمال':
        return (
          <svg {...common}>
            <rect x="3" y="7" width="18" height="13" rx="2" />
            <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
          </svg>
        );
      case 'صناعة محتوى':
        return (
          <svg {...common}>
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <polygon points="10 9 16 12 10 15 10 9" fill="currentColor" stroke="none" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <section id="events" style={styles.section} role="region" aria-labelledby="events-title">
      <div className="container" style={styles.container}>
        {/* Section Header */}
        <div style={styles.header}>
          <h2 id="events-title" style={styles.title}>
            الورش و الفعــاليات
            <svg style={styles.wavyLine} viewBox="0 0 200 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M0,10 Q50,0 100,10 T200,10" stroke="var(--Primary, #0517A2)" strokeWidth="3" fill="none"/>
            </svg>
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
                <span style={styles.filterIcon} aria-hidden="true">{getCategoryIcon(category.id)}</span>
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Events Grid */}
        <div className="events-grid" style={styles.eventsGrid}>
          {filteredEvents.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>

        {/* Load More Button */}
        <div style={styles.loadMoreContainer}>
          <button className="load-more-button" style={styles.loadMoreButton} onClick={() => navigate('/events')}>
            عرض الــكل
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
    color: 'var(--Primary, #0517A2)',
    marginBottom: 'var(--spacing-md)',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 'var(--spacing-sm)'
  },
  wavyLine: {
    width: '200px',
    height: '20px',
    marginTop: 'var(--spacing-xs)'
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
    background: 'transparent',
    padding: '0',
    borderRadius: '0',
    boxShadow: 'none',
    border: 'none',
    overflowX: 'auto',
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
    WebkitOverflowScrolling: 'touch'
  },
  filterButton: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-xs)',
    padding: 'var(--spacing-sm) var(--spacing-md)',
    background: 'var(--white)',
    border: '1px solid var(--Primary, #0517A2)',
    borderRadius: 'var(--radius-full)',
    fontSize: '0.875rem',
    fontWeight: '500',
    color: 'var(--Primary, #0517A2)',
    cursor: 'pointer',
    transition: 'all var(--transition-fast)',
    whiteSpace: 'nowrap'
  },
  filterButtonActive: {
    background: 'var(--Primary, #0517A2)',
    color: 'var(--white)',
    boxShadow: 'var(--shadow-sm)',
    border: '1px solid var(--Primary, #0517A2)'
  },
  filterIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '18px',
    height: '18px'
  },
  eventsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: 'var(--spacing-xl)',
    marginBottom: 'var(--spacing-2xl)'
  },
  loadMoreContainer: {
    textAlign: 'center'
  },
  loadMoreButton: {
    background: 'var(--Primary, #0517A2)',
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
  .filter-buttons::-webkit-scrollbar {
    display: none;
  }
  
  @media (max-width: 767px) {
    .events-grid {
      grid-template-columns: 1fr !important;
      gap: var(--spacing-lg) !important;
    }
    
    .filter-buttons {
      flex-wrap: nowrap !important;
      gap: var(--spacing-sm) !important;
      justify-content: flex-start !important;
      padding: 0 var(--spacing-md) !important;
      overflow-x: auto !important;
      scroll-snap-type: x mandatory;
    }
    
    .filter-button {
      font-size: var(--font-size-sm) !important;
      padding: var(--spacing-sm) var(--spacing-md) !important;
      flex-shrink: 0 !important;
      scroll-snap-align: start;
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
      justify-content: center !important;
      overflow-x: visible !important;
    }
  }
  
  @media (min-width: 1024px) {
    .events-grid {
      grid-template-columns: repeat(3, 1fr) !important;
    }
    
    .register-button:hover {
      background: var(--primary-dark) !important;
    }
    
    .details-button:hover {
      background: var(--primary) !important;
      color: var(--white) !important;
    }
    
    .load-more-button:hover {
      background: #0517A2 !important; /* darker brand blue */
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
