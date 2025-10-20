
import React from 'react';

const AboutHero = () => {
  return (
    <section style={styles.section} dir="rtl">
      <div className="container" style={styles.container}>
        <div style={styles.content}>
          <h1 style={styles.title}>من نحن</h1>
          <p style={styles.subtitle}>ننمّي قدرات الشباب عبر ورش وبرامج تدريبية عملية يقودها خبراء.</p>
        </div>
        <div style={styles.media}>
          <img src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800" alt="تعلم وتطوير" style={styles.image} />
        </div>
      </div>
    </section>
  );
};

export default AboutHero;

const styles = {
  section: { background: 'var(--light)', padding: 'var(--spacing-3xl) 0' },
  container: { maxWidth: 1200, margin: '0 auto', padding: '0 var(--spacing-md)', display: 'grid', gridTemplateColumns: '1fr', gap: 24, alignItems: 'center' },
  content: { textAlign: 'right' },
  title: { color: 'var(--Primary, #0517A2)', fontWeight: 900, fontSize: 'var(--font-size-3xl)', margin: 0 },
  subtitle: { color: 'var(--gray)', marginTop: 8 },
  media: { },
  image: { width: '100%', borderRadius: 16, boxShadow: 'var(--shadow-lg)' }
};
