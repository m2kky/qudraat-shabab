import { useState } from 'react';
import { Link } from 'react-router-dom';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header style={styles.header}>
      <div className="container" style={styles.container}>
        {/* Logo */}
        <Link 
          to="/" 
          style={styles.logo}
          onClick={closeMenu}
          aria-label="العودة للصفحة الرئيسية"
        >
          قدرات شباب
        </Link>

        {/* Desktop Navigation */}
        <nav style={styles.desktopNav} aria-label="التنقل الرئيسي">
          <Link to="/" style={styles.navLink}>الرئيسية</Link>
          <a href="#events" style={styles.navLink}>الفعاليات</a>
          <a href="#about" style={styles.navLink}>من نحن</a>
          <a href="#contact" style={styles.navLink}>تواصل</a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          style={styles.menuButton}
          onClick={toggleMenu}
          aria-label={isMenuOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
        >
          <span style={styles.hamburger}>
            <span style={{...styles.hamburgerLine, transform: isMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none'}}></span>
            <span style={{...styles.hamburgerLine, opacity: isMenuOpen ? 0 : 1}}></span>
            <span style={{...styles.hamburgerLine, transform: isMenuOpen ? 'rotate(-45deg) translate(7px, -6px)' : 'none'}}></span>
          </span>
        </button>
      </div>

      {/* Mobile Navigation */}
      <nav 
        id="mobile-menu"
        style={{
          ...styles.mobileNav,
          display: isMenuOpen ? 'flex' : 'none'
        }}
        aria-label="التنقل المحمول"
      >
        <Link to="/" style={styles.mobileNavLink} onClick={closeMenu}>الرئيسية</Link>
        <a href="#events" style={styles.mobileNavLink} onClick={closeMenu}>الفعاليات</a>
        <a href="#about" style={styles.mobileNavLink} onClick={closeMenu}>من نحن</a>
        <a href="#contact" style={styles.mobileNavLink} onClick={closeMenu}>تواصل</a>
      </nav>
    </header>
  );
}

const styles = {
  header: {
    background: 'var(--white)',
    boxShadow: 'var(--shadow-md)',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    borderBottom: '1px solid var(--gray-light)'
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 'var(--spacing-md) 0',
    minHeight: '70px'
  },
  logo: {
    fontSize: 'clamp(1.25rem, 4vw, 1.75rem)',
    fontWeight: '900',
    color: 'var(--primary)',
    textDecoration: 'none',
    transition: 'color var(--transition-fast)',
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-sm)'
  },
  desktopNav: {
    display: 'none',
    gap: 'var(--spacing-xl)',
    alignItems: 'center'
  },
  navLink: {
    color: 'var(--dark)',
    textDecoration: 'none',
    fontWeight: '500',
    padding: 'var(--spacing-sm) var(--spacing-md)',
    borderRadius: 'var(--radius-md)',
    transition: 'all var(--transition-fast)',
    position: 'relative'
  },
  mobileNav: {
    flexDirection: 'column',
    background: 'var(--white)',
    borderTop: '1px solid var(--gray-light)',
    padding: 'var(--spacing-md) 0',
    gap: 'var(--spacing-sm)',
    boxShadow: 'var(--shadow-lg)'
  },
  mobileNavLink: {
    color: 'var(--dark)',
    textDecoration: 'none',
    fontWeight: '500',
    padding: 'var(--spacing-md) var(--spacing-lg)',
    borderRadius: 'var(--radius-md)',
    transition: 'all var(--transition-fast)',
    display: 'block',
    textAlign: 'right'
  },
  menuButton: {
    background: 'transparent',
    border: 'none',
    padding: 'var(--spacing-sm)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 'var(--radius-md)',
    transition: 'background-color var(--transition-fast)'
  },
  hamburger: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    width: '24px',
    height: '18px'
  },
  hamburgerLine: {
    width: '100%',
    height: '2px',
    background: 'var(--dark)',
    borderRadius: '1px',
    transition: 'all var(--transition-normal)',
    transformOrigin: 'center'
  }
};

// Media queries for responsive design
const mediaQueries = `
  @media (min-width: 768px) {
    .desktop-nav {
      display: flex !important;
    }
    
    .menu-button {
      display: none !important;
    }
    
    .mobile-nav {
      display: none !important;
    }
  }
  
  @media (max-width: 767px) {
    .desktop-nav {
      display: none !important;
    }
    
    .menu-button {
      display: flex !important;
    }
  }
`;

// Add styles to document head
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = mediaQueries;
  document.head.appendChild(styleSheet);
}

export default Header;
