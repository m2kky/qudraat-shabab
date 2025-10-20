import React from 'react';
import { Link } from 'react-router-dom';
import ContactForm from '../components/contact/ContactForm';
import ContactInfo from '../components/contact/ContactInfo';

export default function Contact() {
  return (
    <main dir="rtl">
      {/* Dark hero */}
      <section style={styles.heroSection}>
        <div className="container" style={styles.heroContainer}>
          <h1 style={styles.heroTitle}>تواصل معنا</h1>
          <p style={styles.heroBreadcrumbs}>الرئيسية / تواصل</p>
        </div>
      </section>

      {/* Main content */}
      <section style={styles.page}> 
        <div className="container" style={styles.container}>
          <div className="contact-split" style={styles.split}> 
            {/* Left: form card */}
            <div style={styles.formCard}> 
              <div style={styles.cardHeader}>تواصل معنا</div>
              <h3 style={styles.boxTitle}>خلينا على تواصل</h3>
              <ContactForm />
            </div>

            {/* Right: info + map */}
            <div style={styles.infoCol}> 
              <p style={styles.infoIntro}>يسعدنا الرد على استفساراتك واقتراحاتك في أقرب وقت.</p>
              <ContactInfo />
            </div>
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section style={styles.bannerSection}>
        <div className="container" style={styles.bannerContainer}>
          <div style={styles.bannerOverlay} />
          <h3 style={styles.bannerTitle}>جاهزين دايمًا نساعدك تحقق أفضل نتيجة</h3>
          <Link to="/events" style={styles.bannerBtn} aria-label="اذهب إلى صفحة الفعاليات">ابدأ الآن</Link>
        </div>
      </section>
    </main>
  );
}

const styles = {
  heroSection: { background: 'var(--Primary, #0517A2)', padding: '64px 0', position: 'relative' },
  heroContainer: { maxWidth: 1200, margin: '0 auto', padding: '0 var(--spacing-md)', textAlign: 'center' },
  heroTitle: { color: '#fff', fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 900, margin: 0 },
  heroBreadcrumbs: { color: 'rgba(255,255,255,.7)', marginTop: 8 },

  page: { padding: 'var(--spacing-3xl) 0', background: 'var(--light)' },
  container: { maxWidth: 1200, margin: '0 auto', padding: '0 var(--spacing-md)' },
  split: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, alignItems: 'start' },
  formCard: { background: 'var(--white)', border: '1px solid var(--gray-light)', borderRadius: 16, padding: 20, color: 'var(--dark)', boxShadow: 'var(--shadow-lg)' },
  cardHeader: { color: 'var(--Primary, #0517A2)', marginBottom: 6, fontWeight: 700 },
  boxTitle: { marginTop: 0, color: 'var(--Primary, #0517A2)', fontWeight: 900, fontSize: '1.5rem', marginBottom: 12 },
  infoCol: { background: 'var(--white)', border: '1px solid var(--gray-light)', borderRadius: 16, padding: 20, color: 'var(--dark)', boxShadow: 'var(--shadow-lg)' },

  bannerSection: { background: 'transparent', padding: '48px 0' },
  bannerContainer: { position: 'relative', maxWidth: 1200, margin: '0 auto', padding: '40px var(--spacing-md)', borderRadius: 16, overflow: 'hidden', background: 'var(--Primary, #0517A2)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 },
  bannerOverlay: { display: 'none' },
  bannerTitle: { position: 'relative', color: 'var(--white)', fontWeight: 900, fontSize: 'clamp(1.35rem, 3vw, 2rem)', margin: 0 },
  bannerBtn: { position: 'relative', background: 'var(--white)', color: 'var(--Primary, #0517A2)', border: '2px solid var(--white)', borderRadius: 999, padding: '10px 20px', fontWeight: 900, cursor: 'pointer', textDecoration: 'none', boxShadow: 'var(--shadow-md)' }
};

// Responsive styles injection
const mediaQueries = `
  @media (max-width: 767px) {
    .contact-split { grid-template-columns: 1fr !important; gap: 16px !important; }
    .banner-container { flex-direction: column !important; text-align: center !important; gap: 16px !important; }
  }
`;

if (typeof document !== 'undefined') {
  const styleId = 'contact-page-responsive';
  if (!document.getElementById(styleId)) {
    const styleSheet = document.createElement('style');
    styleSheet.id = styleId;
    styleSheet.textContent = mediaQueries;
    document.head.appendChild(styleSheet);
  }
}


