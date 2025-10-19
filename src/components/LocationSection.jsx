function LocationSection() {
  const locations = [
    {
      id: 1,
      name: 'الفرع الرئيسي - الرياض',
      address: 'شارع الملك فهد، حي العليا، الرياض 12211',
      phone: '+966 11 123 4567',
      email: 'riyadh@qudraat-shabab.com',
      hours: 'الأحد - الخميس: 8:00 ص - 10:00 م',
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&h=400&fit=crop',
      coordinates: { lat: 24.7136, lng: 46.6753 }
    },
    {
      id: 2,
      name: 'فرع جدة',
      address: 'شارع التحلية، حي الزهراء، جدة 21432',
      phone: '+966 12 123 4567',
      email: 'jeddah@qudraat-shabab.com',
      hours: 'الأحد - الخميس: 8:00 ص - 10:00 م',
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&h=400&fit=crop',
      coordinates: { lat: 21.4858, lng: 39.1925 }
    },
    {
      id: 3,
      name: 'فرع الدمام',
      address: 'شارع الملك عبدالعزيز، حي الفيصلية، الدمام 32245',
      phone: '+966 13 123 4567',
      email: 'dammam@qudraat-shabab.com',
      hours: 'الأحد - الخميس: 8:00 ص - 10:00 م',
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&h=400&fit=crop',
      coordinates: { lat: 26.4207, lng: 50.0888 }
    }
  ];

  const handleGetDirections = (location) => {
    const { lat, lng } = location.coordinates;
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    window.open(url, '_blank');
  };

  const handleCall = (phone) => {
    window.open(`tel:${phone}`, '_self');
  };

  const handleEmail = (email) => {
    window.open(`mailto:${email}`, '_self');
  };

  return (
    <section id="location" style={styles.section} role="region" aria-labelledby="location-title">
      <div className="container" style={styles.container}>
        {/* Section Header */}
        <div style={styles.header}>
          <h2 id="location-title" style={styles.title}>
            مواقعنا
          </h2>
          <p style={styles.subtitle}>
            نحن موجودون في جميع أنحاء المملكة لخدمتك في أقرب موقع
          </p>
        </div>

        {/* Locations Grid */}
        <div style={styles.locationsGrid}>
          {locations.map(location => (
            <div key={location.id} style={styles.locationCard}>
              <div style={styles.imageContainer}>
                <img 
                  src={location.image} 
                  alt={location.name}
                  style={styles.locationImage}
                />
                <div style={styles.imageOverlay}>
                  <button 
                    style={styles.directionsButton}
                    onClick={() => handleGetDirections(location)}
                  >
                    📍 احصل على الاتجاهات
                  </button>
                </div>
              </div>

              <div style={styles.locationContent}>
                <h3 style={styles.locationName}>{location.name}</h3>
                
                <div style={styles.locationInfo}>
                  <div style={styles.infoItem}>
                    <span style={styles.infoIcon}>📍</span>
                    <span style={styles.infoText}>{location.address}</span>
                  </div>
                  
                  <div style={styles.infoItem}>
                    <span style={styles.infoIcon}>📞</span>
                    <button 
                      style={styles.infoButton}
                      onClick={() => handleCall(location.phone)}
                    >
                      {location.phone}
                    </button>
                  </div>
                  
                  <div style={styles.infoItem}>
                    <span style={styles.infoIcon}>📧</span>
                    <button 
                      style={styles.infoButton}
                      onClick={() => handleEmail(location.email)}
                    >
                      {location.email}
                    </button>
                  </div>
                  
                  <div style={styles.infoItem}>
                    <span style={styles.infoIcon}>🕒</span>
                    <span style={styles.infoText}>{location.hours}</span>
                  </div>
                </div>

                <div style={styles.locationActions}>
                  <button 
                    style={styles.actionButton}
                    onClick={() => handleGetDirections(location)}
                  >
                    🗺️ الاتجاهات
                  </button>
                  <button 
                    style={styles.actionButton}
                    onClick={() => handleCall(location.phone)}
                  >
                    📞 اتصل بنا
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Map Section */}
        <div style={styles.mapSection}>
          <h3 style={styles.mapTitle}>خريطة المواقع</h3>
          <div style={styles.mapContainer}>
            <div style={styles.mapPlaceholder}>
              <div style={styles.mapContent}>
                <span style={styles.mapIcon}>🗺️</span>
                <h4 style={styles.mapText}>خريطة تفاعلية</h4>
                <p style={styles.mapDescription}>
                  اضغط على أي موقع أعلاه للحصول على الاتجاهات
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div style={styles.contactInfo}>
          <div style={styles.contactCard}>
            <h4 style={styles.contactTitle}>معلومات التواصل العامة</h4>
            <div style={styles.contactDetails}>
              <div style={styles.contactItem}>
                <span style={styles.contactIcon}>📞</span>
                <span style={styles.contactText}>+966 50 123 4567</span>
              </div>
              <div style={styles.contactItem}>
                <span style={styles.contactIcon}>📧</span>
                <span style={styles.contactText}>info@qudraat-shabab.com</span>
              </div>
              <div style={styles.contactItem}>
                <span style={styles.contactIcon}>🌐</span>
                <span style={styles.contactText}>www.qudraat-shabab.com</span>
              </div>
            </div>
          </div>
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
  locationsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: 'var(--spacing-xl)',
    marginBottom: 'var(--spacing-3xl)'
  },
  locationCard: {
    background: 'var(--white)',
    borderRadius: 'var(--radius-xl)',
    overflow: 'hidden',
    boxShadow: 'var(--shadow-lg)',
    transition: 'transform var(--transition-normal)',
    border: '1px solid var(--gray-light)'
  },
  imageContainer: {
    position: 'relative',
    height: '200px',
    overflow: 'hidden'
  },
  locationImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform var(--transition-normal)'
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0,
    transition: 'opacity var(--transition-normal)'
  },
  directionsButton: {
    background: 'var(--primary)',
    color: 'var(--white)',
    padding: 'var(--spacing-sm) var(--spacing-lg)',
    borderRadius: 'var(--radius-full)',
    border: 'none',
    fontSize: '0.875rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all var(--transition-fast)'
  },
  locationContent: {
    padding: 'var(--spacing-xl)'
  },
  locationName: {
    fontSize: '1.25rem',
    fontWeight: '700',
    color: 'var(--dark)',
    marginBottom: 'var(--spacing-lg)',
    textAlign: 'center'
  },
  locationInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--spacing-md)',
    marginBottom: 'var(--spacing-xl)'
  },
  infoItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-sm)',
    fontSize: '0.875rem'
  },
  infoIcon: {
    fontSize: '1rem',
    width: '20px',
    textAlign: 'center'
  },
  infoText: {
    color: 'var(--gray)',
    flex: 1
  },
  infoButton: {
    background: 'none',
    border: 'none',
    color: 'var(--primary)',
    cursor: 'pointer',
    textDecoration: 'underline',
    fontSize: '0.875rem',
    padding: 0
  },
  locationActions: {
    display: 'flex',
    gap: 'var(--spacing-sm)',
    justifyContent: 'center'
  },
  actionButton: {
    background: 'var(--primary)',
    color: 'var(--white)',
    padding: 'var(--spacing-sm) var(--spacing-md)',
    borderRadius: 'var(--radius-md)',
    border: 'none',
    fontSize: '0.875rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all var(--transition-fast)',
    flex: 1
  },
  mapSection: {
    marginBottom: 'var(--spacing-3xl)'
  },
  mapTitle: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: 'var(--dark)',
    textAlign: 'center',
    marginBottom: 'var(--spacing-xl)'
  },
  mapContainer: {
    background: 'var(--white)',
    borderRadius: 'var(--radius-xl)',
    overflow: 'hidden',
    boxShadow: 'var(--shadow-lg)',
    border: '1px solid var(--gray-light)'
  },
  mapPlaceholder: {
    height: '400px',
    background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  mapContent: {
    textAlign: 'center',
    color: 'var(--white)'
  },
  mapIcon: {
    fontSize: '4rem',
    marginBottom: 'var(--spacing-md)',
    display: 'block'
  },
  mapText: {
    fontSize: '1.5rem',
    fontWeight: '700',
    marginBottom: 'var(--spacing-sm)'
  },
  mapDescription: {
    fontSize: '1rem',
    opacity: '0.9'
  },
  contactInfo: {
    display: 'flex',
    justifyContent: 'center'
  },
  contactCard: {
    background: 'var(--white)',
    padding: 'var(--spacing-2xl)',
    borderRadius: 'var(--radius-xl)',
    boxShadow: 'var(--shadow-lg)',
    border: '1px solid var(--gray-light)',
    textAlign: 'center',
    maxWidth: '500px',
    width: '100%'
  },
  contactTitle: {
    fontSize: '1.25rem',
    fontWeight: '700',
    color: 'var(--dark)',
    marginBottom: 'var(--spacing-lg)'
  },
  contactDetails: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--spacing-md)'
  },
  contactItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'var(--spacing-sm)',
    fontSize: '1rem'
  },
  contactIcon: {
    fontSize: '1.25rem'
  },
  contactText: {
    color: 'var(--gray)',
    fontWeight: '500'
  }
};

// Media queries for responsive design
const mediaQueries = `
  @media (min-width: 768px) {
    .locations-grid {
      grid-template-columns: repeat(2, 1fr) !important;
    }
  }
  
  @media (min-width: 1024px) {
    .locations-grid {
      grid-template-columns: repeat(3, 1fr) !important;
    }
    
    .location-card:hover {
      transform: translateY(-4px) !important;
    }
    
    .location-card:hover .image-overlay {
      opacity: 1 !important;
    }
    
    .location-card:hover .location-image {
      transform: scale(1.05) !important;
    }
    
    .action-button:hover {
      background: var(--primary-dark) !important;
      transform: translateY(-2px) !important;
    }
    
    .directions-button:hover {
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

export default LocationSection;

