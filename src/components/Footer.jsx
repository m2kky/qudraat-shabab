import { Link } from 'react-router-dom';

function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={styles.footer} role="contentinfo">
      <div className="container" style={styles.container}>
        {/* Main Footer Content */}
        <div style={styles.mainContent}>
          {/* Brand Section */}
          <div style={styles.brandSection}>
            <h3 style={styles.brandTitle}>قدرات شباب</h3>
            <p style={styles.brandDescription}>
              منصة تدريبية متكاملة للشباب السعودي لتطوير المهارات وبناء المستقبل المهني
            </p>
            <div style={styles.socialLinks}>
              <a 
                href="https://twitter.com" 
                style={styles.socialLink}
                aria-label="تابعنا على تويتر"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span style={styles.socialIcon}>🐦</span>
              </a>
              <a 
                href="https://linkedin.com" 
                style={styles.socialLink}
                aria-label="تابعنا على لينكد إن"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span style={styles.socialIcon}>💼</span>
              </a>
              <a 
                href="https://instagram.com" 
                style={styles.socialLink}
                aria-label="تابعنا على إنستغرام"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span style={styles.socialIcon}>📷</span>
              </a>
              <a 
                href="https://youtube.com" 
                style={styles.socialLink}
                aria-label="اشترك في قناتنا على يوتيوب"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span style={styles.socialIcon}>📺</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div style={styles.linksSection}>
            <h4 style={styles.sectionTitle}>روابط سريعة</h4>
            <nav style={styles.linksList} aria-label="روابط سريعة">
              <Link to="/" style={styles.footerLink}>الرئيسية</Link>
              <a href="#events" style={styles.footerLink}>الفعاليات</a>
              <a href="#about" style={styles.footerLink}>من نحن</a>
              <a href="#contact" style={styles.footerLink}>تواصل معنا</a>
              <Link to="/dashboard" style={styles.footerLink}>لوحة التحكم</Link>
            </nav>
          </div>

          {/* Services */}
          <div style={styles.linksSection}>
            <h4 style={styles.sectionTitle}>خدماتنا</h4>
            <nav style={styles.linksList} aria-label="خدماتنا">
              <a href="#web-dev" style={styles.footerLink}>تطوير الويب</a>
              <a href="#design" style={styles.footerLink}>التصميم الإبداعي</a>
              <a href="#marketing" style={styles.footerLink}>التسويق الرقمي</a>
              <a href="#data-science" style={styles.footerLink}>علوم البيانات</a>
              <a href="#mobile-dev" style={styles.footerLink}>تطوير التطبيقات</a>
            </nav>
          </div>

          {/* Contact Info */}
          <div style={styles.contactSection}>
            <h4 style={styles.sectionTitle}>تواصل معنا</h4>
            <div style={styles.contactInfo}>
              <div style={styles.contactItem}>
                <span style={styles.contactIcon}>📧</span>
                <a href="mailto:info@qudraat-shabab.com" style={styles.contactLink}>
                  info@qudraat-shabab.com
                </a>
              </div>
              <div style={styles.contactItem}>
                <span style={styles.contactIcon}>📱</span>
                <a href="tel:+966501234567" style={styles.contactLink}>
                  +966 50 123 4567
                </a>
              </div>
              <div style={styles.contactItem}>
                <span style={styles.contactIcon}>📍</span>
                <span style={styles.contactText}>
                  الرياض، المملكة العربية السعودية
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={styles.bottomBar}>
          <div style={styles.bottomContent}>
            <p style={styles.copyright}>
              © {currentYear} قدرات شباب - جميع الحقوق محفوظة
            </p>
            <div style={styles.bottomLinks}>
              <a href="#privacy" style={styles.bottomLink}>سياسة الخصوصية</a>
              <a href="#terms" style={styles.bottomLink}>شروط الاستخدام</a>
              <a href="#cookies" style={styles.bottomLink}>ملفات تعريف الارتباط</a>
            </div>
          </div>
          <button 
            style={styles.backToTop}
            onClick={scrollToTop}
            aria-label="العودة إلى أعلى الصفحة"
          >
            <span style={styles.backToTopIcon}>↑</span>
          </button>
        </div>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    background: 'var(--dark)',
    color: 'var(--white)',
    marginTop: 'var(--spacing-3xl)',
    position: 'relative'
  },
  container: {
    padding: 'var(--spacing-3xl) 0 var(--spacing-xl) 0'
  },
  mainContent: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: 'var(--spacing-2xl)',
    marginBottom: 'var(--spacing-2xl)'
  },
  brandSection: {
    textAlign: 'center'
  },
  brandTitle: {
    fontSize: 'var(--font-size-2xl)',
    fontWeight: '900',
    color: 'var(--primary)',
    marginBottom: 'var(--spacing-md)'
  },
  brandDescription: {
    fontSize: 'var(--font-size-base)',
    lineHeight: '1.6',
    opacity: '0.9',
    marginBottom: 'var(--spacing-lg)',
    maxWidth: '400px',
    margin: '0 auto var(--spacing-lg) auto'
  },
  socialLinks: {
    display: 'flex',
    justifyContent: 'center',
    gap: 'var(--spacing-md)'
  },
  socialLink: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '44px',
    height: '44px',
    background: 'rgba(255,255,255,0.1)',
    borderRadius: 'var(--radius-full)',
    transition: 'all var(--transition-fast)',
    textDecoration: 'none'
  },
  socialIcon: {
    fontSize: '1.25rem'
  },
  linksSection: {
    textAlign: 'center'
  },
  sectionTitle: {
    fontSize: '1.125rem',
    fontWeight: '700',
    marginBottom: 'var(--spacing-md)',
    color: 'var(--white)'
  },
  linksList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--spacing-sm)'
  },
  footerLink: {
    color: 'rgba(255,255,255,0.8)',
    textDecoration: 'none',
    fontSize: '0.875rem',
    transition: 'color var(--transition-fast)',
    padding: 'var(--spacing-xs) 0'
  },
  contactSection: {
    textAlign: 'center'
  },
  contactInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--spacing-md)'
  },
  contactItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'var(--spacing-sm)',
    fontSize: '0.875rem'
  },
  contactIcon: {
    fontSize: '1rem'
  },
  contactLink: {
    color: 'rgba(255,255,255,0.8)',
    textDecoration: 'none',
    transition: 'color var(--transition-fast)'
  },
  contactText: {
    color: 'rgba(255,255,255,0.8)'
  },
  bottomBar: {
    borderTop: '1px solid rgba(255,255,255,0.1)',
    paddingTop: 'var(--spacing-lg)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 'var(--spacing-md)'
  },
  bottomContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--spacing-sm)',
    alignItems: 'center',
    flex: 1
  },
  copyright: {
    fontSize: '0.875rem',
    color: 'rgba(255,255,255,0.7)',
    margin: 0
  },
  bottomLinks: {
    display: 'flex',
    gap: 'var(--spacing-lg)',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  bottomLink: {
    color: 'rgba(255,255,255,0.6)',
    textDecoration: 'none',
    fontSize: '0.75rem',
    transition: 'color var(--transition-fast)'
  },
  backToTop: {
    background: 'var(--primary)',
    color: 'var(--white)',
    border: 'none',
    borderRadius: 'var(--radius-full)',
    width: '48px',
    height: '48px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all var(--transition-fast)',
    boxShadow: 'var(--shadow-md)'
  },
  backToTopIcon: {
    fontSize: '1.25rem',
    fontWeight: 'bold'
  }
};

// Media queries for responsive design
const mediaQueries = `
  @media (min-width: 768px) {
    .footer-main-content {
      grid-template-columns: 2fr 1fr 1fr 1fr !important;
      text-align: left !important;
    }
    
    .footer-brand-section {
      text-align: left !important;
    }
    
    .footer-social-links {
      justify-content: flex-start !important;
    }
    
    .footer-links-section {
      text-align: left !important;
    }
    
    .footer-links-list {
      align-items: flex-start !important;
    }
    
    .footer-contact-section {
      text-align: left !important;
    }
    
    .footer-contact-info {
      align-items: flex-start !important;
    }
    
    .footer-bottom-content {
      flex-direction: row !important;
      justify-content: space-between !important;
      align-items: center !important;
    }
  }
  
  @media (min-width: 1024px) {
    .footer-container {
      padding: var(--spacing-3xl) 0 var(--spacing-2xl) 0 !important;
    }
  }
`;

// Add styles to document head
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = mediaQueries;
  document.head.appendChild(styleSheet);
}

export default Footer;
