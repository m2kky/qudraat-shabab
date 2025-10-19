function StatsSection() {
  const stats = [
    {
      number: '2,000+',
      label: 'طالب',
      icon: '/assets/icons/student.svg'
    },
    {
      number: '50+',
      label: 'ورشة عملية',
      icon: '/assets/icons/workshop.svg'
    },
    {
      number: '100%',
      label: 'مجاني',
      icon: '/assets/icons/free.svg'
    }
  ];

  return (
    <section style={styles.section} role="region">
      <div className="container" style={styles.container}>
        <div className="stats-grid" style={styles.statsGrid}>
          {stats.map((stat, index) => (
            <div key={index} style={styles.statItem}>
              <div className="stat-icon" style={styles.statIcon}>
                <img src={stat.icon} alt={stat.label} style={styles.iconImage} />
              </div>
              <h3 className="stat-number" style={styles.statNumber}>{stat.number}</h3>
              <p className="stat-label" style={styles.statLabel}>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const styles = {
  section: {
    padding: 'var(--spacing-xl) 0',
    background: 'transparent',
    position: 'relative',
    marginTop: '-100px',
    zIndex: 10
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 var(--spacing-md)'
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 'var(--spacing-xl)',
    background: 'var(--white)',
    padding: 'var(--spacing-2xl)',
    borderRadius: 'var(--radius-xl)',
    boxShadow: 'var(--shadow-xl)',
    border: '1px solid var(--gray-light)'
  },
  statItem: {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 'var(--spacing-sm)'
  },
  statIcon: {
    width: '2rem',
    height: '2rem',
    marginBottom: 'var(--spacing-xs)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  iconImage: {
    width: '100%',
    height: '100%',
    objectFit: 'contain'
  },
  statNumber: {
    fontSize: 'var(--font-size-3xl)',
    fontWeight: '900',
    color: 'var(--primary)',
    margin: 0,
    lineHeight: '1',
    marginBottom: 'var(--spacing-sm)'
  },
  statLabel: {
    fontSize: 'var(--font-size-lg)',
    color: 'var(--gray)',
    margin: 0,
    fontWeight: '700'
  }
};

// Media queries for responsive design
const mediaQueries = `
  @media (max-width: 768px) {
    .stats-grid {
      grid-template-columns: repeat(3, 1fr) !important;
      gap: var(--spacing-sm) !important;
      padding: var(--spacing-md) !important;
      margin: 0 20px !important;
    }
    
    .stat-icon {
      width: 1.5rem !important;
      height: 1.5rem !important;
    }
    
    .stat-number {
      font-size: var(--font-size-lg) !important;
    }
    
    .stat-label {
      font-size: var(--font-size-sm) !important;
    }
  }
  
  @media (max-width: 480px) {
    .stats-grid {
      grid-template-columns: repeat(3, 1fr) !important;
      gap: var(--spacing-xs) !important;
      padding: var(--spacing-sm) !important;
      margin: 0 10px !important;
    }
    
    .stat-icon {
      width: 1.25rem !important;
      height: 1.25rem !important;
    }
    
    .stat-number {
      font-size: var(--font-size-base) !important;
    }
    
    .stat-label {
      font-size: var(--font-size-sm) !important;
    }
  }
`;

// Add styles to document head
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = mediaQueries;
  document.head.appendChild(styleSheet);
}

export default StatsSection;
