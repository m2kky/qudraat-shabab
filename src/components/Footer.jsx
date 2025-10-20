import { Link } from 'react-router-dom';
import { contactInfo } from '../data/contact';

function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={styles.footer} role="contentinfo">
      <div className="container" style={styles.container}>
        {/* Main Footer Content */}
        <div style={styles.mainContent} className="footer-main-content">
          {/* Brand Section */}
          <div style={styles.brandSection}>
            <h3 style={styles.brandTitle}>قدرات شباب</h3>
            <p style={styles.brandDescription}>
              المساحة الأمنة لتطوير المهارات وبناء المستقبل المهني
            </p>
            <div style={styles.socialLinks}>
              {/* LinkedIn */}
              <a 
                href={contactInfo.social.linkedin}
                style={styles.socialLink}
                aria-label="تابعنا على لينكد إن"
                target="_blank"
                rel="noopener noreferrer"
                className="social-linkedin"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 1 0-4 0v7h-4v-14h4v2a4 4 0 0 1 2-1z"/>
                  <rect x="2" y="9" width="4" height="14"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
              {/* Facebook */}
              <a 
                href={contactInfo.social.facebook}
                style={styles.socialLink}
                aria-label="تابعنا على فيسبوك"
                target="_blank"
                rel="noopener noreferrer"
                className="social-facebook"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              {/* TikTok */}
              <a 
                href={contactInfo.social.tiktok}
                style={styles.socialLink}
                aria-label="تابعنا على تيك توك"
                target="_blank"
                rel="noopener noreferrer"
                className="social-tiktok"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 8.5a7.5 7.5 0 0 1-6-2.5v9.5a5 5 0 1 1-5-5 5 5 0 0 1 1 .11V13a2.5 2.5 0 1 0 2.5 2.5V2h3a7 7 0 0 0 4.5 4.5z"/>
                </svg>
              </a>
              {/* Instagram */}
              <a 
                href={contactInfo.social.instagram}
                style={styles.socialLink}
                aria-label="تابعنا على إنستغرام"
                target="_blank"
                rel="noopener noreferrer"
                className="social-instagram"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              {/* WhatsApp */}
              <a 
                href={contactInfo.social.whatsapp}
                style={styles.socialLink}
                aria-label="تواصل معنا على واتساب"
                target="_blank"
                rel="noopener noreferrer"
                className="social-whatsapp"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.52 3.48A11.94 11.94 0 0 0 12.05 0C5.4 0 .05 5.35.05 11.95c0 2.1.55 4.16 1.6 5.98L0 24l6.22-1.62a11.9 11.9 0 0 0 5.83 1.49h.01c6.6 0 11.95-5.35 11.95-11.95a11.9 11.9 0 0 0-3.49-8.44zM12.06 21.8a9.84 9.84 0 0 1-5.02-1.38l-.36-.21-3.69.96.99-3.6-.23-.37a9.77 9.77 0 0 1-1.5-5.16c0-5.4 4.4-9.8 9.81-9.8 2.62 0 5.08 1.02 6.93 2.87a9.77 9.77 0 0 1 2.88 6.94c-.01 5.4-4.41 9.8-9.81 9.8zm5.38-7.34c-.29-.15-1.71-.84-1.98-.94-.27-.1-.47-.15-.67.15-.2.29-.77.94-.94 1.13-.17.19-.35.21-.64.08-.29-.15-1.23-.45-2.35-1.43-.86-.77-1.44-1.72-1.61-2.01-.17-.29-.02-.45.13-.6.13-.13.29-.35.43-.52.14-.17.19-.29.29-.48.1-.19.05-.36-.03-.52-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.19 0-.5.07-.76.36s-1 1-1 2.42 1.02 2.8 1.16 2.99c.14.19 2.01 3.05 4.88 4.28.68.29 1.21.46 1.62.59.68.22 1.31.19 1.8.12.55-.08 1.71-.7 1.95-1.37.24-.67.24-1.25.17-1.37-.07-.12-.26-.19-.55-.34z"/>
                </svg>
              </a>
              {/* WhatsApp Community */}
              <a 
                href={contactInfo.social.whatsappCommunity}
                style={styles.socialLink}
                aria-label="مجتمع واتساب"
                target="_blank"
                rel="noopener noreferrer"
                className="social-whatsapp-community"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="7" cy="12" r="3"/>
                  <circle cx="17" cy="12" r="3"/>
                  <path d="M7 15c-3 0-5 2-5 4v2h10v-2c0-2-2-4-5-4z"/>
                  <path d="M17 15c-3 0-5 2-5 4v2h10v-2c0-2-2-4-5-4z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Links and Contact Column */}
          <div style={styles.linksContactColumn} className="footer-links-contact"> 
            {/* Quick Links */}
            <div style={styles.linksSection} className="footer-links-section">
              <h4 style={styles.sectionTitle}>روابط سريعة</h4>
              <nav style={styles.linksList} aria-label="روابط سريعة">
                <Link to="/" style={styles.footerLink}>الرئيسية</Link>
                <a href="#events" style={styles.footerLink}>الفعاليات</a>
                <a href="#about" style={styles.footerLink}>من نحن</a>
                <a href="#contact" style={styles.footerLink}>تواصل معنا</a>
              </nav>
            </div>

            {/* Contact Info */}
            <div style={styles.contactSection} className="footer-contact-section">
              <h4 style={styles.sectionTitle}>تواصل معنا</h4>
              <div style={styles.contactInfo}>
                <div style={styles.contactItem}>
                  <span style={styles.contactIcon}>📧</span>
                  <a href={`mailto:${contactInfo.email}`} style={styles.contactLink}>
                    {contactInfo.email}
                  </a>
                </div>
                <div style={styles.contactItem}>
                  <span style={styles.contactIcon}>📱</span>
                  <a href={`tel:${contactInfo.mobile}`} style={styles.contactLink}>
                    {contactInfo.mobile}
                  </a>
                </div>
                <div style={styles.contactItem}>
                  <span style={styles.contactIcon}>📍</span>
                  <span style={styles.contactText}>
                    {contactInfo.address}
                  </span>
                </div>
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
    background: 'var(--Primary, #0517A2)',
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
    color: 'var(--white)',
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
    width: '48px',
    height: '48px',
    background: 'rgba(255,255,255,0.08)',
    borderRadius: '12px',
    transition: 'all 0.3s ease',
    textDecoration: 'none',
    border: '1px solid rgba(255,255,255,0.1)',
    backdropFilter: 'blur(10px)',
    position: 'relative',
    overflow: 'hidden'
  },
  socialIcon: {
    fontSize: '1.25rem'
  },
  linksContactColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--spacing-2xl)'
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
    background: 'var(--white)',
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
    fontWeight: 'bold',
    color: 'var(--Primary, #0517A2)'
  }
};

// Media queries for responsive design
const mediaQueries = `
  /* Social Media Icons Hover Effects */
  .social-linkedin:hover {
    background: linear-gradient(135deg, #0077b5, #005885) !important;
    transform: translateY(-2px) !important;
    box-shadow: 0 8px 25px rgba(0, 119, 181, 0.3) !important;
  }
  
  .social-facebook:hover {
    background: linear-gradient(135deg, #1877f2, #0d5bb8) !important;
    transform: translateY(-2px) !important;
    box-shadow: 0 8px 25px rgba(24, 119, 242, 0.3) !important;
  }
  
  .social-tiktok:hover {
    background: linear-gradient(135deg, #000000, #333333) !important;
    transform: translateY(-2px) !important;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4) !important;
  }
  
  .social-instagram:hover {
    background: linear-gradient(135deg, #e4405f, #c13584, #833ab4) !important;
    transform: translateY(-2px) !important;
    box-shadow: 0 8px 25px rgba(228, 64, 95, 0.3) !important;
  }
  
  .social-whatsapp:hover {
    background: linear-gradient(135deg, #25d366, #128c7e) !important;
    transform: translateY(-2px) !important;
    box-shadow: 0 8px 25px rgba(37, 211, 102, 0.3) !important;
  }
  
  .social-whatsapp-community:hover {
    background: linear-gradient(135deg, #25d366, #128c7e) !important;
    transform: translateY(-2px) !important;
    box-shadow: 0 8px 25px rgba(37, 211, 102, 0.3) !important;
  }
  
  /* General hover effect for all social icons */
  .social-linkedin:hover svg,
  .social-facebook:hover svg,
  .social-tiktok:hover svg,
  .social-instagram:hover svg,
  .social-whatsapp:hover svg,
  .social-whatsapp-community:hover svg {
    color: white !important;
    transform: scale(1.1) !important;
  }

  @media (min-width: 768px) {
    .footer-main-content {
      grid-template-columns: 1fr 1fr !important;
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
    .footer-links-contact {
      display: grid !important;
      grid-template-columns: 1fr 1fr !important;
      gap: var(--spacing-2xl) !important;
      align-items: start !important;
    }
    .footer-links-section { order: 1 !important; }
    .footer-contact-section { order: 2 !important; }
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
