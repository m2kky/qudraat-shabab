
import React from 'react';

const MissionVision = () => {
  return (
    <section style={styles.section} dir="rtl">
      <div className="container" style={styles.container}>
        <div style={styles.card}>
          <h2 style={styles.heading}>رسالتنا</h2>
          <p style={styles.text}>تمكين الشباب من اكتشاف قدراتهم الحقيقية عبر برامج عملية، وفرص تطبيقية، وتوجيه مستمر.</p>
        </div>
        <div style={styles.card}>
          <h2 style={styles.heading}>رؤيتنا</h2>
          <p style={styles.text}>أن نكون المنصة العربية الأولى لتأهيل كوادر مهنية قادرة على المنافسة والابتكار.</p>
        </div>
      </div>
    </section>
  );
};

export default MissionVision;

const styles = {
  section: { background: 'var(--white)', padding: 'var(--spacing-2xl) 0' },
  container: { maxWidth: 1200, margin: '0 auto', padding: '0 var(--spacing-md)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 },
  card: { background: 'var(--light)', padding: 20, borderRadius: 16, border: '1px solid var(--gray-light)' },
  heading: { color: 'var(--Primary, #0517A2)', fontWeight: 900, marginTop: 0 },
  text: { color: 'var(--dark)', lineHeight: 1.7 }
};
