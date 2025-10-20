
import React from 'react';
import { Link } from 'react-router-dom';

const AboutCTA = () => {
  return (
    <section style={styles.section} dir="rtl">
      <div className="container" style={styles.container}>
        <h2 style={styles.title}>مستعد تبدأ رحلتك؟</h2>
        <p style={styles.text}>انضم لورش وقدرات شباب وابدأ في بناء مستقبل مهني أقوى.</p>
        <Link to="/events" style={styles.btn}>استعرض الفعاليات</Link>
      </div>
    </section>
  );
};

export default AboutCTA;

const styles = {
  section: { background: 'var(--Primary, #0517A2)', padding: 'var(--spacing-2xl) 0' },
  container: { maxWidth: 1200, margin: '0 auto', padding: '0 var(--spacing-md)', textAlign: 'center', color: 'var(--white)' },
  title: { margin: 0, fontWeight: 900 },
  text: { opacity: .9 },
  btn: { display: 'inline-block', marginTop: 8, background: 'var(--white)', color: 'var(--Primary, #0517A2)', padding: '10px 16px', borderRadius: 999, textDecoration: 'none', fontWeight: 800 }
};
