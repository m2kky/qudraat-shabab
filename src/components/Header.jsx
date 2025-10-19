import { Link } from 'react-router-dom';

function Header() {
  return (
    <header style={{ 
      background: 'var(--white)', 
      padding: '1rem 2rem', 
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <Link to="/" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary)' }}>
        قدرات شباب
      </Link>
      <nav style={{ display: 'flex', gap: '2rem' }}>
        <Link to="/">الرئيسية</Link>
        <a href="#events">الفعاليات</a>
        <a href="#about">من نحن</a>
        <a href="#contact">تواصل</a>
      </nav>
    </header>
  );
}

export default Header;
