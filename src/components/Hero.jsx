import { useState } from 'react';
import BookingModal from './BookingModal';

function Hero() {
  const [showModal, setShowModal] = useState(false);

  const handleBookingClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <section style={styles.hero} role="banner">
        <div className="container" style={styles.container}>
          <div style={styles.content}>
            <h1 style={styles.title}>
              اكتشف قدراتك وطوّر مهاراتك
            </h1>
            <p style={styles.subtitle}>
              منصة تدريبية متكاملة للشباب السعودي لتطوير المهارات وبناء المستقبل المهني
            </p>
            <div style={styles.features}>
              <div style={styles.feature}>
                <span style={styles.featureIcon}>🎯</span>
                <span>تدريب متخصص</span>
              </div>
              <div style={styles.feature}>
                <span style={styles.featureIcon}>👥</span>
                <span>مجتمع تفاعلي</span>
              </div>
              <div style={styles.feature}>
                <span style={styles.featureIcon}>📈</span>
                <span>تطوير مستمر</span>
              </div>
            </div>
            <div style={styles.ctaContainer}>
              <button 
                style={styles.cta}
                onClick={handleBookingClick}
                aria-label="احجز مقعدك في إحدى دوراتنا التدريبية"
              >
                احجز مقعدك الآن
              </button>
              <button 
                style={styles.secondaryCta}
                onClick={() => document.getElementById('events')?.scrollIntoView({ behavior: 'smooth' })}
                aria-label="استكشف الفعاليات المتاحة"
              >
                استكشف الفعاليات
              </button>
            </div>
          </div>
          <div style={styles.visual}>
            <div style={styles.heroImage}>
              <div style={styles.imagePlaceholder}>
                <span style={styles.placeholderText}>صورة توضيحية</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      {showModal && <BookingModal onClose={handleCloseModal} />}
    </>
  );
}

const styles = {
  hero: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)',
    position: 'relative',
    overflow: 'hidden'
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 'var(--spacing-2xl)',
    padding: 'var(--spacing-2xl) 0',
    minHeight: '100vh',
    justifyContent: 'center'
  },
  content: {
    textAlign: 'center',
    color: 'var(--white)',
    maxWidth: '600px',
    zIndex: 2
  },
  title: {
    fontSize: 'clamp(1.75rem, 6vw, 3.5rem)',
    fontWeight: '900',
    marginBottom: 'var(--spacing-lg)',
    lineHeight: '1.1',
    textShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  subtitle: {
    fontSize: 'clamp(1rem, 3vw, 1.375rem)',
    marginBottom: 'var(--spacing-2xl)',
    opacity: '0.95',
    lineHeight: '1.6',
    fontWeight: '400'
  },
  features: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--spacing-md)',
    marginBottom: 'var(--spacing-2xl)',
    alignItems: 'center'
  },
  feature: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-sm)',
    fontSize: 'clamp(0.875rem, 2.5vw, 1.125rem)',
    fontWeight: '500',
    opacity: '0.9'
  },
  featureIcon: {
    fontSize: '1.5rem',
    filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.1))'
  },
  ctaContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--spacing-md)',
    alignItems: 'center'
  },
  cta: {
    background: 'var(--white)',
    color: 'var(--primary)',
    padding: 'var(--spacing-md) var(--spacing-2xl)',
    fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
    fontWeight: '700',
    borderRadius: 'var(--radius-full)',
    transition: 'all var(--transition-normal)',
    boxShadow: 'var(--shadow-xl)',
    border: 'none',
    cursor: 'pointer',
    minWidth: '200px',
    position: 'relative',
    overflow: 'hidden'
  },
  secondaryCta: {
    background: 'transparent',
    color: 'var(--white)',
    padding: 'var(--spacing-sm) var(--spacing-xl)',
    fontSize: 'clamp(0.875rem, 2vw, 1.125rem)',
    fontWeight: '500',
    borderRadius: 'var(--radius-full)',
    transition: 'all var(--transition-normal)',
    border: '2px solid rgba(255,255,255,0.3)',
    cursor: 'pointer',
    minWidth: '180px'
  },
  visual: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    maxWidth: '500px'
  },
  heroImage: {
    width: '100%',
    height: '300px',
    borderRadius: 'var(--radius-xl)',
    overflow: 'hidden',
    boxShadow: 'var(--shadow-xl)',
    background: 'rgba(255,255,255,0.1)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255,255,255,0.2)'
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(45deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))'
  },
  placeholderText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: '1.125rem',
    fontWeight: '500'
  }
};

// Media queries for responsive design
const mediaQueries = `
  @media (min-width: 768px) {
    .hero-container {
      flex-direction: row !important;
      text-align: left !important;
      gap: var(--spacing-3xl) !important;
    }
    
    .hero-content {
      text-align: left !important;
      max-width: 50% !important;
    }
    
    .hero-features {
      flex-direction: row !important;
      justify-content: flex-start !important;
      flex-wrap: wrap !important;
    }
    
    .hero-cta-container {
      flex-direction: row !important;
      justify-content: flex-start !important;
    }
    
    .hero-visual {
      max-width: 45% !important;
    }
  }
  
  @media (min-width: 1024px) {
    .hero-container {
      gap: var(--spacing-3xl) !important;
    }
    
    .hero-image {
      height: 400px !important;
    }
  }
  
  @media (min-width: 1280px) {
    .hero-image {
      height: 450px !important;
    }
  }
`;

// Add styles to document head
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = mediaQueries;
  document.head.appendChild(styleSheet);
}

export default Hero;
