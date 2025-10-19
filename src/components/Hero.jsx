import { useState } from 'react';
import BookingModal from './BookingModal';

function Hero() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <section style={styles.hero}>
        <div style={styles.content}>
          <h1 style={styles.title}>اكتشف قدراتك وطوّر مهاراتك</h1>
          <p style={styles.subtitle}>
            منصة تدريبية متكاملة للشباب السعودي لتطوير المهارات وبناء المستقبل
          </p>
          <button 
            style={styles.cta}
            onClick={() => setShowModal(true)}
            aria-label="احجز مقعدك الآن"
          >
            احجز مقعدك الآن
          </button>
        </div>
      </section>
      {showModal && <BookingModal onClose={() => setShowModal(false)} />}
    </>
  );
}

const styles = {
  hero: {
    minHeight: '80vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)',
    padding: '2rem 1rem',
    textAlign: 'center'
  },
  content: {
    maxWidth: '600px',
    color: 'var(--white)'
  },
  title: {
    fontSize: 'clamp(1.75rem, 5vw, 3rem)',
    fontWeight: '900',
    marginBottom: '1rem',
    lineHeight: '1.2'
  },
  subtitle: {
    fontSize: 'clamp(1rem, 3vw, 1.25rem)',
    marginBottom: '2rem',
    opacity: '0.95'
  },
  cta: {
    background: 'var(--white)',
    color: 'var(--primary)',
    padding: '1rem 2.5rem',
    fontSize: '1.125rem',
    fontWeight: 'bold',
    borderRadius: '50px',
    transition: 'transform 0.2s',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
  }
};

export default Hero;
