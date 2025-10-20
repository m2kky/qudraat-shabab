import { useState } from 'react';
import { Link } from 'react-router-dom';
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
      <section className="hero-section" style={styles.hero} role="banner">
        <div className="container hero-container" style={styles.container}>
          <div className="hero-content" style={styles.content}>
            <h1 className="hero-title" style={styles.title}>
              قدراتك الحقيقية
            </h1>
            <h2 className="hero-subtitle" style={styles.subtitle}>
              أكبــــر مـمـا تتخيل
            </h2>
            <p className="hero-description" style={styles.description}>
              هتتعلم خطوة بخطوة، ومع الوقت هتكتشف
            </p>
            <p className="hero-description" style={{...styles.description, marginBottom: 'var(--spacing-2xl)'}}>
             إن قدراتــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــك أكبر مما تتخيل
            </p>
            <div className="hero-social-proof" style={styles.socialProof}>
              <p style={styles.socialText}>انضم إلى آلاف الطلاب</p>
              <div style={styles.avatars}>
                <img 
                  src="/assets/Qudraat Shabab/Ellipse 4.png" 
                  alt="طالب" 
                  style={styles.avatar}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    const fallback = document.createElement('div');
                    fallback.style.cssText = `
                      width: 32px;
                      height: 32px;
                      border-radius: 50%;
                      background: var(--primary);
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      font-size: 1rem;
                      color: var(--white);
                      box-shadow: var(--shadow-sm);
                      border: 2px solid var(--white);
                      margin-left: -8px;
                    `;
                    fallback.textContent = '👨';
                    e.target.parentNode.appendChild(fallback);
                  }}
                />
                <img 
                  src="/assets/Qudraat Shabab/Ellipse 5.png" 
                  alt="طالبة" 
                  style={styles.avatar}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    const fallback = document.createElement('div');
                    fallback.style.cssText = `
                      width: 32px;
                      height: 32px;
                      border-radius: 50%;
                      background: var(--primary);
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      font-size: 1rem;
                      color: var(--white);
                      box-shadow: var(--shadow-sm);
                      border: 2px solid var(--white);
                      margin-left: -8px;
                    `;
                    fallback.textContent = '👩';
                    e.target.parentNode.appendChild(fallback);
                  }}
                />
                <img 
                  src="/assets/Qudraat Shabab/Ellipse 6.png" 
                  alt="طالب" 
                  style={styles.avatar}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    const fallback = document.createElement('div');
                    fallback.style.cssText = `
                      width: 32px;
                      height: 32px;
                      border-radius: 50%;
                      background: var(--primary);
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      font-size: 1rem;
                      color: var(--white);
                      box-shadow: var(--shadow-sm);
                      border: 2px solid var(--white);
                      margin-left: -8px;
                    `;
                    fallback.textContent = '👨‍💼';
                    e.target.parentNode.appendChild(fallback);
                  }}
                />
                <img 
                  src="/assets/Qudraat Shabab/Ellipse 7.png" 
                  alt="طالبة" 
                  style={styles.avatar}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    const fallback = document.createElement('div');
                    fallback.style.cssText = `
                      width: 32px;
                      height: 32px;
                      border-radius: 50%;
                      background: var(--primary);
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      font-size: 1rem;
                      color: var(--white);
                      box-shadow: var(--shadow-sm);
                      border: 2px solid var(--white);
                      margin-left: -8px;
                    `;
                    fallback.textContent = '👩‍💻';
                    e.target.parentNode.appendChild(fallback);
                  }}
                />
                <img 
                  src="/assets/Qudraat Shabab/Ellipse 8.png" 
                  alt="طالب" 
                  style={styles.avatar}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    const fallback = document.createElement('div');
                    fallback.style.cssText = `
                      width: 32px;
                      height: 32px;
                      border-radius: 50%;
                      background: var(--primary);
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      font-size: 1rem;
                      color: var(--white);
                      box-shadow: var(--shadow-sm);
                      border: 2px solid var(--white);
                      margin-left: -8px;
                    `;
                    fallback.textContent = '👨‍🎓';
                    e.target.parentNode.appendChild(fallback);
                  }}
                />
                <div style={styles.moreAvatars}>+2K</div>
              </div>
            </div>
            <div className="hero-cta-container" style={styles.ctaContainer}>
              <Link 
                to="/events"
                style={styles.secondaryCta}
                aria-label="استكشف الفعاليات المتاحة"
              >
                الفعاليات
              </Link>
              <button 
                style={styles.cta}
                onClick={handleBookingClick}
                aria-label="احجز مقعدك في إحدى دوراتنا التدريبية"
              >
                من نحن؟
              </button>
            </div>
          </div>
          <div className="hero-visual" style={styles.visual}>
            <div className="hero-image" style={styles.heroImage}>
              <img 
                src="/assets/heroboy.png" 
                alt="شاب مبتسم مع هالة زرقاء"
                className="hero-image-content"
                style={styles.heroImageContent}
                onError={(e) => {
                  console.log('Error loading hero image:', e.target.src);
                  e.target.style.display = 'none';
                  // Show fallback emoji
                  const fallback = document.createElement('div');
                  fallback.style.cssText = `
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 8rem;
                    background: var(--light);
                    border-radius: var(--radius-xl);
                  `;
                  fallback.textContent = '👨‍💻';
                  e.target.parentNode.appendChild(fallback);
                }}
                onLoad={() => console.log('Hero image loaded successfully')}
              />
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
    minHeight: '35vh',
    display: 'flex',
    alignItems: 'center',
    background: 'var(--white)',
    position: 'relative',
    overflow: 'visible',
    padding: '0'
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 'var(--spacing-xl)',
    padding: 'var(--spacing-xl) 0',
    minHeight: '30vh',
    justifyContent: 'center'
  },
  content: {
    textAlign: 'right',
    color: 'var(--dark)',
    maxWidth: '500px',
    zIndex: 2,
    flex: 1
  },
  title: {
    fontSize: 'var(--font-size-5xl)',
    fontWeight: '900',
    marginBottom: 'var(--spacing-lg)',
    lineHeight: '1.2',
    color: 'var(--Primary, #0517A2)',
    textAlign: 'center',
    fontFamily: 'Zain, Inter, Tajawal, sans-serif',
    fontStyle: 'normal'
  },
  subtitle: {
    fontSize: 'var(--font-size-5xl)',
    marginBottom: 'var(--spacing-lg)',
    color: 'var(--Primary, #0517A2)',
    lineHeight: '1.2',
    fontWeight: '900',
    textAlign: 'center',
    fontFamily: 'Zain, Inter, Tajawal, sans-serif',
    fontStyle: 'normal'
  },
  description: {
    fontSize: 'var(--font-size-lg)',
    marginBottom: 'var(--spacing-sm)',
    color: 'var(--gray)',
    lineHeight: '1.6',
    fontWeight: 'bold'
  },
  ctaContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 'var(--spacing-md)',
    alignItems: 'center',
    marginBottom: 'var(--spacing-2xl)'
  },
  cta: {
    background: 'var(--primary)',
    color: 'var(--white)',
    padding: 'var(--spacing-md) var(--spacing-2xl)',
    fontSize: 'clamp(1rem, 2.5vw, 1.125rem)',
    fontWeight: '600',
    borderRadius: 'var(--radius-full)',
    transition: 'all var(--transition-normal)',
    boxShadow: 'var(--shadow-md)',
    border: 'none',
    cursor: 'pointer',
    minWidth: '150px'
  },
  secondaryCta: {
    background: 'transparent',
    color: 'var(--primary)',
    padding: 'var(--spacing-md) var(--spacing-2xl)',
    fontSize: 'clamp(1rem, 2.5vw, 1.125rem)',
    fontWeight: '500',
    borderRadius: 'var(--radius-full)',
    transition: 'all var(--transition-normal)',
    border: '2px solid var(--primary)',
    cursor: 'pointer',
    minWidth: '150px'
  },
  socialProof: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-md)',
    marginBottom: 'var(--spacing-lg)'
  },
  socialText: {
    fontSize: 'clamp(0.875rem, 2vw, 1rem)',
    color: 'var(--gray)',
    fontWeight: '500',
    margin: 0
  },
  avatars: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-xs)'
  },
  avatar: {
    width: '32px',
    height: '32px',
    borderRadius: 'var(--radius-full)',
    objectFit: 'cover',
    boxShadow: 'var(--shadow-sm)',
    border: '2px solid var(--white)',
    marginLeft: '-8px'
  },
  moreAvatars: {
    width: '32px',
    height: '32px',
    borderRadius: 'var(--radius-full)',
    background: 'var(--secondary)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.75rem',
    fontWeight: '700',
    color: 'var(--white)',
    boxShadow: 'var(--shadow-sm)',
    border: '2px solid var(--white)',
    marginLeft: '-8px'
  },
  visual: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    width: '100%',
    maxWidth: '600px',
    flex: 1,
    position: 'relative'
  },
  heroImage: {
    width: '100%',
    height: 'auto',
    borderRadius: '0',
    overflow: 'visible',
    boxShadow: 'none',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
    position: 'relative',
    background: 'transparent'
  },
  heroImageContent: {
    width: '100%',
    height: 'auto',
    objectFit: 'contain',
    objectPosition: 'bottom center',
    transform: 'translateY(50px)'
  }
};

// Media queries for responsive design
const mediaQueries = `
  @media (max-width: 768px) {
    .hero-section {
      min-height: 40vh !important;
      padding: 60px 0 20px 0 !important;
    }
    
    .hero-container {
      flex-direction: column !important;
      text-align: center !important;
      gap: var(--spacing-2xl) !important;
      min-height: 30vh !important;
      padding: 0 !important;
      margin: 0 !important;
    }
    
    .hero-content {
      text-align: center !important;
      max-width: 100% !important;
      width: 100% !important;
      padding: 0 var(--spacing-md) !important;
    }
    
    .hero-cta-container {
      flex-direction: row !important;
      justify-content: center !important;
      gap: var(--spacing-md) !important;
    }
    
    .hero-social-proof {
      justify-content: center !important;
    }
    
    .hero-visual {
      max-width: 100% !important;
    }
    
    .hero-image {
      height: auto !important;
    }
    
    .hero-image-content {
      transform: translateY(30px) !important;
    }
    
    .hero-title {
      font-size: 3rem !important;
      line-height: 3.6rem !important;
    }
    
    .hero-subtitle {
      font-size: 3rem !important;
      line-height: 3.6rem !important;
    }
    
    .hero-description {
      font-size: 20px !important;
    }
    
    .hero-content {
      order: 1 !important;
    }
    
    .hero-visual {
      order: 2 !important;
    }
    
    .hero-title {
      order: 1 !important;
    }
    
    .hero-subtitle {
      order: 2 !important;
    }
    
    .hero-description {
      order: 3 !important;
    }
    
    .hero-social-proof {
      order: 4 !important;
      margin-bottom: var(--spacing-lg) !important;
    }
    
    .hero-cta-container {
      order: 5 !important;
    }
  }
  
  @media (max-width: 480px) {
    .hero-section {
      padding: 50px 0 20px 0 !important;
    }
    
    .hero-container {
      padding: 0 !important;
      margin: 0 !important;
    }
    
    .hero-content {
      padding: 0 var(--spacing-sm) !important;
    }
    
    .hero-title {
      font-size: 2.5rem !important;
      line-height: 3rem !important;
    }
    
    .hero-subtitle {
      font-size: 2.5rem !important;
      line-height: 3rem !important;
    }
    
    .hero-description {
      font-size: 18px !important;
    }
    
    .hero-content {
      order: 1 !important;
    }
    
    .hero-visual {
      order: 2 !important;
    }
    
    .hero-title {
      order: 1 !important;
    }
    
    .hero-subtitle {
      order: 2 !important;
    }
    
    .hero-description {
      order: 3 !important;
    }
    
    .hero-social-proof {
      order: 4 !important;
      margin-bottom: var(--spacing-lg) !important;
    }
    
    .hero-cta-container {
      order: 5 !important;
    }
  }
  
  @media (min-width: 1024px) {
    .hero-section {
      min-height: 40vh !important;
    }
    
    .hero-container {
      gap: var(--spacing-2xl) !important;
      min-height: 35vh !important;
      flex-direction: row !important;
      align-items: center !important;
      justify-content: space-between !important;
    }
    
    .hero-content {
      order: 1 !important;
      text-align: right !important;
      max-width: 50% !important;
      flex: 1 !important;
    }
    
    .hero-visual {
      order: 2 !important;
      max-width: 50% !important;
      flex: 1 !important;
    }
    
    .hero-image {
      height: auto !important;
    }
    
    .hero-image-content {
      transform: translateY(40px) !important;
    }
    
    .hero-title {
      font-size: var(--font-size-4xl) !important;
      line-height: 1.2 !important;
      text-align: right !important;
    }
    
    .hero-subtitle {
      font-size: var(--font-size-4xl) !important;
      line-height: 1.2 !important;
      text-align: right !important;
    }
    
    .hero-cta-container {
      justify-content: flex-start !important;
    }
    
    .hero-social-proof {
      justify-content: flex-start !important;
    }
  }
  
  @media (min-width: 1280px) {
    .hero-section {
      min-height: 35vh !important;
    }
    
    .hero-container {
      min-height: 30vh !important;
      flex-direction: row !important;
    }
    
    .hero-content {
      order: 1 !important;
    }
    
    .hero-visual {
      order: 2 !important;
    }
    
    .hero-image {
      height: auto !important;
    }
    
    .hero-image-content {
      transform: translateY(60px) !important;
    }
    
    .hero-title {
      font-size: var(--font-size-5xl) !important;
      line-height: 1.2 !important;
    }
    
    .hero-subtitle {
      font-size: var(--font-size-5xl) !important;
      line-height: 1.2 !important;
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
