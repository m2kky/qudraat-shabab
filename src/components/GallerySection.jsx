import { useState } from 'react';
import { galleryItems, galleryCategories } from '../data/gallery';

function GallerySection() {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = galleryCategories;

  const filteredItems = activeCategory === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeCategory);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-EG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <section id="gallery" style={styles.section} role="region">
      <div className="container" style={styles.container}>
        {/* Gallery Grid - First Row */}
        <div className="gallery-grid gallery-row-1" style={styles.galleryGrid}>
          {[...galleryItems, ...galleryItems, ...galleryItems, ...galleryItems].map((item, index) => (
            <div key={`${item.id}-${index}`} className="gallery-item" style={styles.galleryItem}>
              <div className="image-container" style={styles.imageContainer}>
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="gallery-image"
                  style={styles.image}
                  loading="lazy"
                />
                <div style={styles.imageInfo}>
                  <h3 style={styles.itemTitle}>{item.title}</h3>
                  <p style={styles.itemDescription}>{item.description}</p>
                </div>
                <div className="gallery-overlay" style={styles.overlay}>
                  <div style={styles.overlayContent}>
                    <h3 style={styles.overlayTitle}>{item.title}</h3>
                    <p style={styles.overlayDescription}>{item.description}</p>
                    <p style={styles.overlayDate}>📅 {formatDate(item.date)}</p>
                    <button className="view-button" style={styles.viewButton}>
                      عرض التفاصيل
                      <svg style={styles.arrowIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Gallery Grid - Second Row (Reverse Direction) */}
        <div className="gallery-grid gallery-row-2" style={styles.galleryGrid}>
          {[...galleryItems.slice().reverse(), ...galleryItems.slice().reverse(), ...galleryItems.slice().reverse(), ...galleryItems.slice().reverse()].map((item, index) => (
            <div key={`${item.id}-reverse-${index}`} className="gallery-item" style={styles.galleryItem}>
              <div className="image-container" style={styles.imageContainer}>
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="gallery-image"
                  style={styles.image}
                  loading="lazy"
                />
                <div style={styles.imageInfo}>
                  <h3 style={styles.itemTitle}>{item.title}</h3>
                  <p style={styles.itemDescription}>{item.description}</p>
                </div>
                <div className="gallery-overlay" style={styles.overlay}>
                  <div style={styles.overlayContent}>
                    <h3 style={styles.overlayTitle}>{item.title}</h3>
                    <p style={styles.overlayDescription}>{item.description}</p>
                    <p style={styles.overlayDate}>📅 {formatDate(item.date)}</p>
                    <button className="view-button" style={styles.viewButton}>
                      عرض التفاصيل
                      <svg style={styles.arrowIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div style={styles.loadMoreContainer}>
          <button className="load-more-button" style={styles.loadMoreButton}>
            عرض المزيد من الصور
          </button>
        </div>
      </div>
    </section>
  );
}

const styles = {
  section: {
    padding: 'var(--spacing-3xl) var(--spacing-md)',
    background: 'var(--light)',
    position: 'relative'
  },
  container: {
    width: '100%',
    margin: '0 auto',
    padding: '0'
  },
  galleryGrid: {
    display: 'flex',
    gap: 'var(--spacing-lg)',
    marginBottom: 'var(--spacing-2xl)',
    overflow: 'hidden',
    padding: '0 var(--spacing-md)'
  },
  galleryItem: {
    position: 'relative',
    borderRadius: 'var(--radius-xl)',
    overflow: 'hidden',
    boxShadow: 'var(--shadow-lg)',
    transition: 'transform var(--transition-normal)',
    background: 'var(--white)',
    cursor: 'pointer',
    flexShrink: 0,
    width: '300px',
    height: '300px'
  },
  imageContainer: {
    position: 'relative',
    height: '100%',
    overflow: 'hidden'
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform var(--transition-normal)'
  },
  imageInfo: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    background: 'linear-gradient(transparent, rgba(0, 0, 0, 0.8))',
    padding: 'var(--spacing-lg)',
    color: 'white'
  },
  itemTitle: {
    fontSize: '1.1rem',
    fontWeight: '700',
    marginBottom: 'var(--spacing-xs)',
    lineHeight: '1.3'
  },
  itemDescription: {
    fontSize: '0.875rem',
    opacity: '0.9',
    margin: 0,
    lineHeight: '1.4'
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 23, 187, 0.95)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0,
    transition: 'opacity var(--transition-normal)'
  },
  overlayContent: {
    textAlign: 'center',
    color: 'var(--white)',
    padding: 'var(--spacing-lg)'
  },
  overlayTitle: {
    fontSize: '1.25rem',
    fontWeight: '700',
    marginBottom: 'var(--spacing-sm)',
    lineHeight: '1.3'
  },
  overlayDescription: {
    fontSize: '0.875rem',
    opacity: '0.9',
    marginBottom: 'var(--spacing-sm)',
    lineHeight: '1.4'
  },
  overlayDate: {
    fontSize: '0.75rem',
    opacity: '0.8',
    marginBottom: 'var(--spacing-md)'
  },
  viewButton: {
    background: 'var(--white)',
    color: 'var(--Primary, #0517A2)',
    padding: 'var(--spacing-sm) var(--spacing-lg)',
    borderRadius: 'var(--radius-full)',
    border: 'none',
    fontSize: '0.875rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all var(--transition-fast)',
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-xs)',
    margin: '0 auto'
  },
  arrowIcon: {
    width: '16px',
    height: '16px'
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
  .gallery-grid:hover {
    animation-play-state: paused !important;
  }
  
  .gallery-item:hover {
    animation-play-state: paused !important;
  }
  
  @keyframes scrollHorizontal {
    0% { transform: translateX(0); }
    100% { transform: translateX(-25%); }
  }
  
  @keyframes scrollHorizontalReverse {
    0% { transform: translateX(0); }
    100% { transform: translateX(25%); }
  }
  
  .gallery-row-1 {
    animation: scrollHorizontal 30s linear infinite !important;
  }
  
  .gallery-row-2 {
    animation: scrollHorizontalReverse 30s linear infinite !important;
  }
  
  @media (max-width: 767px) {
    .gallery-item {
      width: 250px !important;
      height: 250px !important;
    }
  }
  
  @media (min-width: 768px) {
    .gallery-item {
      width: 280px !important;
      height: 280px !important;
    }
  }
  
  @media (min-width: 1024px) {
    .gallery-item {
      width: 300px !important;
      height: 300px !important;
    }
    
    .gallery-item:hover {
      transform: translateY(-4px) !important;
    }
    
    .gallery-item:hover .gallery-overlay {
      opacity: 1 !important;
    }
    
    .gallery-item:hover .gallery-image {
      transform: scale(1.05) !important;
    }
    
    .view-button:hover {
      background: var(--light) !important;
      transform: translateY(-2px) !important;
    }
    
    .load-more-button:hover {
      background: #0517A2 !important;
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

export default GallerySection;

