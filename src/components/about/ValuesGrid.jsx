
import React from 'react';
import { values } from '../../data/aboutData';

const ValuesGrid = () => {
  return (
    <section style={styles.section} dir="rtl">
      <div className="container" style={styles.container}>
        <h2 style={styles.title}>قيمنا</h2>
        <div style={styles.grid}>
          {values.map((value, index) => (
            <div key={index} style={styles.card}>
              <h3 style={styles.cardTitle}>{value.title}</h3>
              <p style={styles.cardText}>{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValuesGrid;

const styles = {
  section: { background: 'var(--light)', padding: 'var(--spacing-2xl) 0' },
  container: { maxWidth: 1200, margin: '0 auto', padding: '0 var(--spacing-md)' },
  title: { color: 'var(--Primary, #0517A2)', fontWeight: 900, textAlign: 'center', marginBottom: 16 },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 },
  card: { background: 'var(--white)', border: '1px solid var(--gray-light)', borderRadius: 12, padding: 16, boxShadow: 'var(--shadow-sm)' },
  cardTitle: { marginTop: 0, color: 'var(--dark)' },
  cardText: { color: 'var(--gray)' }
};
