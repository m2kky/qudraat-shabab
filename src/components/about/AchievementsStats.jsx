
import React from 'react';

const AchievementsStats = () => {
  return (
    <section style={styles.section} dir="rtl">
      <div className="container" style={styles.container}>
        <h2 style={styles.title}>إنجازاتنا</h2>
        <div style={styles.grid}>
          <div style={styles.card}><h3 style={styles.num}>+100</h3><p style={styles.label}>ورشة وبرنامج</p></div>
          <div style={styles.card}><h3 style={styles.num}>+50</h3><p style={styles.label}>شريك نجاح</p></div>
          <div style={styles.card}><h3 style={styles.num}>+10</h3><p style={styles.label}>مدرب معتمد</p></div>
          <div style={styles.card}><h3 style={styles.num}>+2000</h3><p style={styles.label}>متدرب</p></div>
        </div>
      </div>
    </section>
  );
};

export default AchievementsStats;

const styles = {
  section: { background: 'var(--white)', padding: 'var(--spacing-2xl) 0' },
  container: { maxWidth: 1200, margin: '0 auto', padding: '0 var(--spacing-md)' },
  title: { color: 'var(--Primary, #0517A2)', fontWeight: 900, textAlign: 'center', marginBottom: 16 },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 },
  card: { background: 'var(--light)', border: '1px solid var(--gray-light)', borderRadius: 12, padding: 16, textAlign: 'center' },
  num: { margin: 0, fontWeight: 900, color: 'var(--Primary, #0517A2)', fontSize: '1.5rem' },
  label: { margin: 0, color: 'var(--dark)' }
};
