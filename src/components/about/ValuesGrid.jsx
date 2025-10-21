
import React from 'react';
import { values } from '../../data/aboutData.jsx';

const ValuesGrid = () => {
  return (
    <section style={styles.section} dir="rtl">
      <div className="container" style={styles.container}>
        <h2 style={styles.title}>قيمنا</h2>
        <div className="wavy-line"></div>
        <div style={styles.grid}>
          {values.map((value, index) => (
            <div key={index} style={styles.card} className="value-card">
              <div style={styles.iconContainer} className="value-icon">
                <span style={styles.icon}>{value.icon}</span>
              </div>
              <h3 style={styles.cardTitle} className="value-title">{value.title}</h3>
              <p style={styles.cardText} className="value-text">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* CSS for wavy line and hover effects */}
      <style jsx>{`
        .wavy-line {
          width: 200px;
          height: 4px;
          background: var(--primary);
          margin: 0 auto var(--spacing-2xl);
          border-radius: 2px;
          position: relative;
        }
        
        .wavy-line::before {
          content: '';
          position: absolute;
          top: -2px;
          left: -10px;
          right: -10px;
          height: 8px;
          background: var(--primary);
          border-radius: 4px;
          transform: skewY(-2deg);
        }
        
        .wavy-line::after {
          content: '';
          position: absolute;
          top: 2px;
          left: -5px;
          right: -5px;
          height: 4px;
          background: var(--primary);
          border-radius: 2px;
          transform: skewY(1deg);
        }
        
        /* CSS for advanced hover effects */
        .value-card {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .value-card:hover {
          transform: scale(1.05) translateY(-8px) !important;
          box-shadow: 0 20px 40px rgba(5, 23, 162, 0.15), 0 8px 16px rgba(0, 0, 0, 0.1) !important;
          border-color: var(--primary) !important;
          background: var(--primary) !important;
        }
        
        .value-card:hover .value-icon {
          transform: scale(1.1) rotate(5deg) !important;
          background: white !important;
        }
        
        .value-card:hover .value-icon span {
          color: var(--primary) !important;
        }
        
        .value-card:hover .value-title {
          color: white !important;
          transform: translateY(-2px) !important;
        }
        
        .value-card:hover .value-text {
          color: white !important;
          transform: translateY(-1px) !important;
        }
        
        .value-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(5, 23, 162, 0.1);
          opacity: 0;
          transition: opacity 0.3s ease;
          border-radius: var(--radius-lg);
          pointer-events: none;
        }
        
        .value-card:hover::before {
          opacity: 1;
        }
        
        .value-card::after {
          content: '';
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          background: var(--primary);
          border-radius: var(--radius-lg);
          z-index: -1;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        .value-card:hover::after {
          opacity: 1;
        }
      `}</style>
    </section>
  );
};

export default ValuesGrid;

const styles = {
  section: { 
    background: 'var(--light)', 
    padding: 'var(--spacing-3xl) 0' 
  },
  container: { 
    maxWidth: 1200, 
    margin: '0 auto', 
    padding: '0 var(--spacing-md)' 
  },
  title: { 
    color: 'var(--Primary, #0517A2)', 
    fontWeight: 900, 
    fontSize: 'var(--font-size-3xl)',
    textAlign: 'center', 
    marginBottom: 'var(--spacing-md)',
    textShadow: 'none'
  },
  grid: { 
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 'var(--spacing-lg)',
    maxWidth: '1200px',
    margin: '0 auto'
  },
  card: { 
    background: 'white', 
    border: '1px solid var(--gray-light)', 
    borderRadius: 'var(--radius-lg)', 
    padding: 'var(--spacing-xl)', 
    boxShadow: 'var(--shadow-md)',
    textAlign: 'center',
    flex: '1 1 200px',
    minWidth: '200px',
    maxWidth: '220px',
    cursor: 'pointer',
    position: 'relative',
    overflow: 'hidden'
  },
  iconContainer: {
    width: '60px',
    height: '60px',
    background: 'var(--primary)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto var(--spacing-md)',
    boxShadow: '0 4px 15px rgba(5, 23, 162, 0.3)',
    position: 'relative'
  },
  icon: {
    width: '24px',
    height: '24px',
    color: 'white'
  },
  cardTitle: { 
    marginTop: 0, 
    marginBottom: 'var(--spacing-sm)',
    color: 'var(--primary)',
    fontSize: '1.1rem',
    fontWeight: '700',
    lineHeight: 1.3
  },
  cardText: { 
    color: 'var(--dark)',
    fontSize: '0.9rem',
    lineHeight: 1.5,
    margin: 0
  }
};
