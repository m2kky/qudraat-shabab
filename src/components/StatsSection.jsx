import { stats } from '../data/stats';

function StatsSection() {

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
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 'var(--spacing-md)',
    background: 'var(--white)',
    padding: 'var(--spacing-xl) var(--spacing-lg)',
    borderRadius: 'var(--radius-xl)',
    boxShadow: 'var(--shadow-xl)',
    border: '1px solid var(--gray-light)',
    maxWidth: '600px',
    margin: '0 auto'
  },
  statItem: {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'var(--spacing-xs)',
    padding: 'var(--spacing-xs)',
    flex: 1
  },
  statIcon: {
    width: '1.75rem',
    height: '1.75rem',
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
    fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
    fontWeight: '900',
    color: 'var(--primary)',
    margin: 0,
    lineHeight: '1',
    marginBottom: 'var(--spacing-xs)',
    textAlign: 'center',
    display: 'block',
    width: '100%'
  },
  statLabel: {
    fontSize: 'clamp(0.875rem, 1.5vw, 1rem)',
    color: 'var(--dark)',
    margin: 0,
    fontWeight: '600',
    textAlign: 'center',
    display: 'block',
    width: '100%'
  }
};

// Media queries for responsive design
const mediaQueries = `
  @media (min-width: 1024px) {
    .stats-grid {
      max-width: 700px !important;
      padding: var(--spacing-xl) var(--spacing-2xl) !important;
      gap: var(--spacing-lg) !important;
      display: flex !important;
      justify-content: space-between !important;
    }
    
    .stat-item {
      flex: 1 !important;
    }
    
    .stat-icon {
      width: 2.5rem !important;
      height: 2.5rem !important;
      margin-bottom: var(--spacing-sm) !important;
    }
    
    .stat-number {
      font-size: 2.5rem !important;
      margin-bottom: var(--spacing-sm) !important;
    }
    
    .stat-label {
      font-size: 1.125rem !important;
      font-weight: 600 !important;
    }
  }
  
  @media (max-width: 768px) {
    .stats-grid {
      display: flex !important;
      justify-content: space-between !important;
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
      display: flex !important;
      justify-content: space-between !important;
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
