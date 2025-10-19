import { useState } from 'react';

function GallerySection() {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'جميع الصور', icon: '🖼️' },
    { id: 'events', name: 'الفعاليات', icon: '🎉' },
    { id: 'workshops', name: 'ورش العمل', icon: '🛠️' },
    { id: 'students', name: 'الطلاب', icon: '👥' },
    { id: 'awards', name: 'الجوائز', icon: '🏆' }
  ];

  const galleryItems = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop',
      title: 'ورشة تطوير الويب',
      category: 'workshops',
      date: '2024-01-15'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&h=300&fit=crop',
      title: 'مؤتمر القيادة الشبابية',
      category: 'events',
      date: '2024-01-20'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop',
      title: 'حفل تخرج الدفعة الأولى',
      category: 'students',
      date: '2024-01-25'
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop',
      title: 'ورشة التصميم الإبداعي',
      category: 'workshops',
      date: '2024-02-01'
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
      title: 'جائزة أفضل مشروع',
      category: 'awards',
      date: '2024-02-05'
    },
    {
      id: 6,
      image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400&h=300&fit=crop',
      title: 'ندوة ريادة الأعمال',
      category: 'events',
      date: '2024-02-10'
    },
    {
      id: 7,
      image: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=400&h=300&fit=crop',
      title: 'ورشة الذكاء الاصطناعي',
      category: 'workshops',
      date: '2024-02-15'
    },
    {
      id: 8,
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop',
      title: 'تكريم المتفوقين',
      category: 'awards',
      date: '2024-02-20'
    }
  ];

  const filteredItems = activeCategory === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeCategory);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <section id="gallery" style={styles.section} role="region" aria-labelledby="gallery-title">
      <div className="container" style={styles.container}>
        {/* Section Header */}
        <div style={styles.header}>
          <h2 id="gallery-title" style={styles.title}>
            معرض الصور
          </h2>
          <p style={styles.subtitle}>
            اكتشف لحظات من نجاحاتنا وفعالياتنا المميزة
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
                  ...(activeCategory === category.id ? styles.filterButtonActive : {})
                }}
                onClick={() => setActiveCategory(category.id)}
                aria-pressed={activeCategory === category.id}
              >
                <span style={styles.filterIcon}>{category.icon}</span>
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div style={styles.galleryGrid}>
          {filteredItems.map(item => (
            <div key={item.id} style={styles.galleryItem}>
              <div style={styles.imageContainer}>
                <img 
                  src={item.image} 
                  alt={item.title}
                  style={styles.image}
                  loading="lazy"
                />
                <div style={styles.overlay}>
                  <div style={styles.overlayContent}>
                    <h3 style={styles.itemTitle}>{item.title}</h3>
                    <p style={styles.itemDate}>📅 {formatDate(item.date)}</p>
                    <button style={styles.viewButton}>
                      عرض التفاصيل
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div style={styles.loadMoreContainer}>
          <button style={styles.loadMoreButton}>
            عرض المزيد من الصور
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
    marginBottom: 'var(--spacing-md)'
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
  galleryGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: 'var(--spacing-lg)',
    marginBottom: 'var(--spacing-2xl)'
  },
  galleryItem: {
    position: 'relative',
    borderRadius: 'var(--radius-xl)',
    overflow: 'hidden',
    boxShadow: 'var(--shadow-lg)',
    transition: 'transform var(--transition-normal)',
    background: 'var(--white)'
  },
  imageContainer: {
    position: 'relative',
    height: '250px',
    overflow: 'hidden'
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform var(--transition-normal)'
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(45deg, rgba(37, 99, 235, 0.9), rgba(16, 185, 129, 0.9))',
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
  itemTitle: {
    fontSize: '1.25rem',
    fontWeight: '700',
    marginBottom: 'var(--spacing-sm)',
    lineHeight: '1.3'
  },
  itemDate: {
    fontSize: '0.875rem',
    opacity: '0.9',
    marginBottom: 'var(--spacing-md)'
  },
  viewButton: {
    background: 'var(--white)',
    color: 'var(--primary)',
    padding: 'var(--spacing-sm) var(--spacing-lg)',
    borderRadius: 'var(--radius-full)',
    border: 'none',
    fontSize: '0.875rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all var(--transition-fast)'
  },
  loadMoreContainer: {
    textAlign: 'center'
  },
  loadMoreButton: {
    background: 'var(--primary)',
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
    .gallery-grid {
      grid-template-columns: repeat(2, 1fr) !important;
    }
    
    .filter-buttons {
      flex-wrap: nowrap !important;
    }
  }
  
  @media (min-width: 1024px) {
    .gallery-grid {
      grid-template-columns: repeat(3, 1fr) !important;
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
      background: var(--primary-dark) !important;
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

