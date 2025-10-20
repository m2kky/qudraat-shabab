import { contactInfo } from '../data/contact';

function LocationSection() {
  const location = {
    id: 1,
    name: 'مقر قدرات شباب',
    address: contactInfo.address,
    mobile: contactInfo.mobile,
    email: contactInfo.email,
    phone: contactInfo.phone,
    mapUrl: contactInfo.mapUrl,
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&h=400&fit=crop'
  };

  const handleGetDirections = () => {
    window.open(location.mapUrl, '_blank');
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
            موقعنا
          </h2>
          <p style={styles.subtitle}>
            نحن موجودون في الدقي لخدمتك في أقرب وقت
          </p>
        </div>

        {/* Location Card */}
        <div style={styles.locationContainer}>
          <div style={styles.locationCard}>
            <div style={styles.imageContainer}>
              <iframe
                src={contactInfo.mapEmbed}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="موقع قدرات شباب"
              ></iframe>
            </div>

            <div style={styles.locationContent}>
              <h3 style={styles.locationName}>{location.name}</h3>
              
              <div style={styles.locationInfo}>
                <div style={styles.infoItem}>
                  <div style={styles.infoIcon}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                  </div>
                  <span style={styles.infoText}>{location.address}</span>
                </div>
                
                <div style={styles.infoItem}>
                  <div style={styles.infoIcon}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
                      <line x1="12" y1="18" x2="12.01" y2="18"/>
                    </svg>
                  </div>
                  <button 
                    style={styles.infoButton}
                    onClick={() => handleCall(location.mobile)}
                  >
                    {location.mobile}
                  </button>
                </div>
                
                <div style={styles.infoItem}>
                  <div style={styles.infoIcon}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                  </div>
                  <button 
                    style={styles.infoButton}
                    onClick={() => handleCall(location.phone)}
                  >
                    {location.phone}
                  </button>
                </div>
                
                <div style={styles.infoItem}>
                  <div style={styles.infoIcon}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                  </div>
                  <button 
                    style={styles.infoButton}
                    onClick={() => handleEmail(location.email)}
                  >
                    {location.email}
                  </button>
                </div>
              </div>

              <div style={styles.locationActions}>
                <button 
                  style={styles.actionButton}
                  onClick={handleGetDirections}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{marginLeft: '8px'}}>
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                  عرض على الخريطة
                </button>
                <button 
                  style={styles.actionButton}
                  onClick={() => handleCall(location.mobile)}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{marginLeft: '8px'}}>
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                  اتصل بنا
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section removed per request */}
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
  locationContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 'var(--spacing-3xl)'
  },
  locationCard: {
    background: 'var(--white)',
    borderRadius: 'var(--radius-xl)',
    overflow: 'hidden',
    boxShadow: 'var(--shadow-lg)',
    transition: 'transform var(--transition-normal)',
    border: '1px solid var(--gray-light)',
    maxWidth: '600px',
    width: '100%'
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
    width: '20px',
    height: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--primary)',
    flexShrink: 0
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
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'var(--spacing-xs)'
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
    border: '1px solid var(--gray-light)',
    position: 'relative'
  },
  mapOverlay: {
    position: 'absolute',
    top: 'var(--spacing-md)',
    right: 'var(--spacing-md)',
    zIndex: 10
  },
  mapButton: {
    background: 'var(--primary)',
    color: 'var(--white)',
    padding: 'var(--spacing-sm) var(--spacing-md)',
    borderRadius: 'var(--radius-md)',
    border: 'none',
    fontSize: '0.875rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all var(--transition-fast)',
    boxShadow: 'var(--shadow-md)'
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
  },
  contactInfoUnderMap: {
    marginTop: 'var(--spacing-xl)',
    textAlign: 'center'
  },
  contactTitleUnderMap: {
    fontSize: '1.25rem',
    fontWeight: '700',
    color: 'var(--dark)',
    marginBottom: 'var(--spacing-lg)'
  },
  contactDetailsUnderMap: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: 'var(--spacing-md)',
    maxWidth: '800px',
    margin: '0 auto'
  },
  contactItemUnderMap: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'var(--spacing-sm)',
    fontSize: '1rem',
    padding: 'var(--spacing-sm)',
    background: 'var(--white)',
    borderRadius: 'var(--radius-md)',
    boxShadow: 'var(--shadow-sm)',
    border: '1px solid var(--gray-light)'
  },
  contactIconUnderMap: {
    fontSize: '1.25rem'
  },
  contactTextUnderMap: {
    color: 'var(--gray)',
    fontWeight: '500'
  },
  contactButtonUnderMap: {
    background: 'none',
    border: 'none',
    color: 'var(--primary)',
    cursor: 'pointer',
    textDecoration: 'underline',
    fontSize: '1rem',
    padding: 0,
    fontWeight: '500'
  }
};

// Media queries for responsive design
const mediaQueries = `
  @media (min-width: 1024px) {
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
    
    .map-button:hover {
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

