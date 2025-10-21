
import React from 'react';

const AchievementsStats = () => {
  return (
    <section style={styles.section} dir="rtl">
      <div className="container" style={styles.container}>
        <h2 style={styles.title}>إنجازاتنا</h2>
        <div className="wavy-line"></div>
        <div style={styles.achievementsList}>
          <div className="achievement-card" style={styles.achievementCard}>
            <div className="achievement-icon" style={styles.achievementIcon}>
              <svg style={styles.iconSvg} viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
            <h3 className="achievement-number" style={styles.achievementNumber}>+50</h3>
            <h4 className="achievement-title" style={styles.achievementTitle}>ورش مجانية متنوعة</h4>
            <p className="achievement-text" style={styles.achievementText}>
              تقديم عشرات الورش المجانية في مجالات مثل التسويق، الذكاء الاصطناعي، البرمجة، التصميم، والمشروعات الصغيرة.
            </p>
          </div>
          
          <div className="achievement-card" style={styles.achievementCard}>
            <div className="achievement-icon" style={styles.achievementIcon}>
              <svg style={styles.iconSvg} viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            <h3 className="achievement-number" style={styles.achievementNumber}>+500</h3>
            <h4 className="achievement-title" style={styles.achievementTitle}>شاب مستفيد</h4>
            <p className="achievement-text" style={styles.achievementText}>
              مساعدة مئات الشباب في اكتشاف مجالاتهم المناسبة واتخاذ قرارات مهنية أو تعليمية واعية.
            </p>
          </div>
          
          <div className="achievement-card" style={styles.achievementCard}>
            <div className="achievement-icon" style={styles.achievementIcon}>
              <svg style={styles.iconSvg} viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.5 1.5 0 0 0 18.54 8H17c-.8 0-1.54.37-2.01.99L14 10.5c-.47-.62-1.21-.99-2.01-.99H9.46c-.8 0-1.54.37-2.01.99L6 10.5c-.47-.62-1.21-.99-2.01-.99H2.46c-.8 0-1.54.37-2.01.99L0 10.5v9.5h2v6h2v-6h2v6h2v-6h2v6h2v-6h2v6h2z"/>
              </svg>
            </div>
            <h3 className="achievement-number" style={styles.achievementNumber}>+25</h3>
            <h4 className="achievement-title" style={styles.achievementTitle}>مدرب ومتطوع</h4>
            <p className="achievement-text" style={styles.achievementText}>
              بناء مجتمع تفاعلي من متطوعين ومدربين شباب يشاركون خبراتهم مع الجيل القادم.
            </p>
          </div>
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
        
        /* CSS for advanced hover effects - same as ValuesGrid */
        .achievement-card {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .achievement-card:hover {
          transform: scale(1.05) translateY(-8px) !important;
          box-shadow: 0 20px 40px rgba(5, 23, 162, 0.15), 0 8px 16px rgba(0, 0, 0, 0.1) !important;
          border-color: var(--gray-light) !important;
          background: white !important;
        }
        
        .achievement-card:hover .achievement-icon {
          transform: scale(1.1) rotate(5deg) !important;
        }
        
        .achievement-card:hover .achievement-icon svg {
          color: var(--primary) !important;
        }
        
        .achievement-card:hover .achievement-number {
          color: var(--primary) !important;
          transform: scale(1.1) !important;
        }
        
        .achievement-card:hover .achievement-title {
          color: var(--dark) !important;
          transform: translateY(-2px) !important;
        }
        
        .achievement-card:hover .achievement-text {
          color: var(--gray) !important;
          transform: translateY(-1px) !important;
        }
        
        .achievement-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(255, 255, 255, 0.1);
          opacity: 0;
          transition: opacity 0.3s ease;
          border-radius: var(--radius-lg);
          pointer-events: none;
        }
        
        .achievement-card:hover::before {
          opacity: 1;
        }
        
        .achievement-card::after {
          content: '';
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          background: white;
          border-radius: var(--radius-lg);
          z-index: -1;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        .achievement-card:hover::after {
          opacity: 1;
        }
      `}</style>
    </section>
  );
};

export default AchievementsStats;

const styles = {
  section: { 
    background: 'var(--light)', 
    padding: 'var(--spacing-3xl) 0',
    position: 'relative'
  },
  container: { 
    maxWidth: 1200, 
    margin: '0 auto', 
    padding: '0 var(--spacing-md)' 
  },
  title: { 
    color: 'var(--primary)', 
    fontWeight: 900, 
    textAlign: 'center', 
    marginBottom: 'var(--spacing-md)',
    fontSize: 'var(--font-size-3xl)'
  },
  achievementsList: {
    display: 'flex',
    justifyContent: 'center',
    gap: 'var(--spacing-lg)',
    maxWidth: '1200px',
    margin: '0 auto',
    flexWrap: 'wrap'
  },
  achievementCard: {
    background: 'var(--primary)',
    border: '1px solid var(--primary)',
    borderRadius: 'var(--radius-lg)',
    padding: 'var(--spacing-xl)',
    textAlign: 'center',
    boxShadow: 'var(--shadow-md)',
    position: 'relative',
    overflow: 'hidden',
    flex: '1 1 300px',
    minWidth: '280px',
    maxWidth: '320px'
  },
  achievementIcon: {
    width: '60px',
    height: '60px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto var(--spacing-md)',
    position: 'relative'
  },
  achievementNumber: {
    color: 'white',
    fontWeight: 900,
    fontSize: '2.5rem',
    margin: '0 0 var(--spacing-sm) 0',
    lineHeight: 1,
    textAlign: 'center'
  },
  achievementTitle: {
    color: 'white',
    fontWeight: 700,
    fontSize: 'var(--font-size-lg)',
    marginBottom: 'var(--spacing-md)',
    lineHeight: 1.3,
    textAlign: 'center'
  },
  achievementText: {
    color: 'white',
    fontSize: 'var(--font-size-md)',
    lineHeight: 1.6,
    margin: 0,
    textAlign: 'right'
  },
  iconSvg: {
    width: '24px',
    height: '24px',
    color: 'white'
  }
};
