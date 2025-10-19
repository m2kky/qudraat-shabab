import { useState } from 'react';

function AboutSection() {
  const [activeTab, setActiveTab] = useState('mission');

  const tabs = [
    { id: 'mission', name: 'رؤيتنا', icon: '🎯' },
    { id: 'vision', name: 'مهمتنا', icon: '🚀' },
    { id: 'values', name: 'قيمنا', icon: '💎' },
    { id: 'team', name: 'فريقنا', icon: '👥' }
  ];

  const content = {
    mission: {
      title: 'رؤيتنا',
      description: 'أن نكون المنصة الرائدة في تطوير قدرات الشباب السعودي وتمكينهم من بناء مستقبل مهني مشرق',
      details: [
        'تطوير مهارات الشباب في المجالات التقنية الحديثة',
        'بناء جيل من القادة والمبدعين في مختلف القطاعات',
        'ربط الشباب بفرص العمل والاستثمار المناسبة',
        'تعزيز ثقافة التعلم المستمر والابتكار'
      ]
    },
    vision: {
      title: 'مهمتنا',
      description: 'نحن ملتزمون بتقديم برامج تدريبية عالية الجودة تواكب متطلبات سوق العمل الحديث',
      details: [
        'توفير بيئة تعليمية تفاعلية ومحفزة للإبداع',
        'استخدام أحدث التقنيات والمناهج التعليمية',
        'تطوير شراكات استراتيجية مع الشركات الرائدة',
        'تقديم الدعم المستمر للمتدربين حتى بعد انتهاء البرامج'
      ]
    },
    values: {
      title: 'قيمنا',
      description: 'نؤمن بقيم أساسية توجه عملنا وتفاعلنا مع مجتمعنا',
      details: [
        'التميز: نسعى دائماً لتقديم أفضل ما لدينا',
        'الشفافية: نؤمن بالوضوح والصدق في جميع تعاملاتنا',
        'الابتكار: نتبنى الأفكار الجديدة والحلول الإبداعية',
        'التعاون: نعمل كفريق واحد لتحقيق الأهداف المشتركة',
        'المسؤولية المجتمعية: نساهم في بناء مجتمع أفضل'
      ]
    },
    team: {
      title: 'فريقنا',
      description: 'فريق من الخبراء والمتخصصين في مختلف المجالات التقنية والإدارية',
      details: [
        'خبراء في التطوير والبرمجة',
        'مصممين ومطوري تجربة المستخدم',
        'مدربين معتمدين في المجالات التقنية',
        'استشاريين في ريادة الأعمال والتسويق الرقمي',
        'فريق دعم فني متخصص'
      ]
    }
  };

  const stats = [
    { number: '500+', label: 'متدرب', icon: '👨‍🎓' },
    { number: '50+', label: 'دورة تدريبية', icon: '📚' },
    { number: '95%', label: 'معدل الرضا', icon: '⭐' },
    { number: '80%', label: 'معدل التوظيف', icon: '💼' }
  ];

  return (
    <section id="about" style={styles.section} role="region" aria-labelledby="about-title">
      <div className="container" style={styles.container}>
        {/* Section Header */}
        <div style={styles.header}>
          <h2 id="about-title" style={styles.title}>
            من نحن
          </h2>
          <p style={styles.subtitle}>
            منصة قدرات شباب هي رؤية طموحة لتمكين الشباب السعودي من خلال التدريب والتطوير المهني
          </p>
        </div>

        {/* Stats Section */}
        <div style={styles.statsContainer}>
          {stats.map((stat, index) => (
            <div key={index} style={styles.statCard}>
              <div style={styles.statIcon}>{stat.icon}</div>
              <div style={styles.statNumber}>{stat.number}</div>
              <div style={styles.statLabel}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs Section */}
        <div style={styles.tabsContainer}>
          <div style={styles.tabsHeader}>
            {tabs.map(tab => (
              <button
                key={tab.id}
                style={{
                  ...styles.tabButton,
                  ...(activeTab === tab.id ? styles.tabButtonActive : {})
                }}
                onClick={() => setActiveTab(tab.id)}
                aria-pressed={activeTab === tab.id}
              >
                <span style={styles.tabIcon}>{tab.icon}</span>
                <span>{tab.name}</span>
              </button>
            ))}
          </div>

          <div style={styles.tabContent}>
            <div style={styles.contentHeader}>
              <h3 style={styles.contentTitle}>{content[activeTab].title}</h3>
              <p style={styles.contentDescription}>{content[activeTab].description}</p>
            </div>
            
            <div style={styles.detailsList}>
              {content[activeTab].details.map((detail, index) => (
                <div key={index} style={styles.detailItem}>
                  <span style={styles.detailIcon}>✓</span>
                  <span style={styles.detailText}>{detail}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div style={styles.ctaContainer}>
          <div style={styles.ctaContent}>
            <h3 style={styles.ctaTitle}>انضم إلى رحلة التطوير</h3>
            <p style={styles.ctaDescription}>
              ابدأ رحلتك نحو التميز المهني مع برامجنا التدريبية المتخصصة
            </p>
            <div style={styles.ctaButtons}>
              <button style={styles.primaryCta}>
                ابدأ الآن
              </button>
              <button style={styles.secondaryCta}>
                تعرف على البرامج
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const styles = {
  section: {
    padding: 'var(--spacing-3xl) 0',
    background: 'var(--white)',
    position: 'relative'
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 var(--spacing-md)'
  },
  header: {
    textAlign: 'center',
    marginBottom: 'var(--spacing-3xl)'
  },
  title: {
    fontSize: 'clamp(1.75rem, 5vw, 2.5rem)',
    fontWeight: '900',
    color: 'var(--dark)',
    marginBottom: 'var(--spacing-md)'
  },
  subtitle: {
    fontSize: 'clamp(1rem, 3vw, 1.25rem)',
    color: 'var(--gray)',
    maxWidth: '600px',
    margin: '0 auto',
    lineHeight: '1.6'
  },
  statsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: 'var(--spacing-lg)',
    marginBottom: 'var(--spacing-3xl)'
  },
  statCard: {
    background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)',
    color: 'var(--white)',
    padding: 'var(--spacing-xl)',
    borderRadius: 'var(--radius-xl)',
    textAlign: 'center',
    boxShadow: 'var(--shadow-lg)',
    transition: 'transform var(--transition-normal)'
  },
  statIcon: {
    fontSize: '2rem',
    marginBottom: 'var(--spacing-sm)'
  },
  statNumber: {
    fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
    fontWeight: '900',
    marginBottom: 'var(--spacing-xs)'
  },
  statLabel: {
    fontSize: '0.875rem',
    opacity: '0.9',
    fontWeight: '500'
  },
  tabsContainer: {
    background: 'var(--light)',
    borderRadius: 'var(--radius-xl)',
    padding: 'var(--spacing-2xl)',
    marginBottom: 'var(--spacing-3xl)',
    boxShadow: 'var(--shadow-md)'
  },
  tabsHeader: {
    display: 'flex',
    gap: 'var(--spacing-sm)',
    marginBottom: 'var(--spacing-2xl)',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  tabButton: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-sm)',
    padding: 'var(--spacing-md) var(--spacing-lg)',
    background: 'var(--white)',
    border: '1px solid var(--gray-light)',
    borderRadius: 'var(--radius-full)',
    fontSize: '0.875rem',
    fontWeight: '500',
    color: 'var(--gray)',
    cursor: 'pointer',
    transition: 'all var(--transition-fast)',
    whiteSpace: 'nowrap'
  },
  tabButtonActive: {
    background: 'var(--primary)',
    color: 'var(--white)',
    borderColor: 'var(--primary)',
    boxShadow: 'var(--shadow-sm)'
  },
  tabIcon: {
    fontSize: '1rem'
  },
  tabContent: {
    animation: 'fadeIn 0.3s ease-in-out'
  },
  contentHeader: {
    textAlign: 'center',
    marginBottom: 'var(--spacing-xl)'
  },
  contentTitle: {
    fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
    fontWeight: '700',
    color: 'var(--dark)',
    marginBottom: 'var(--spacing-sm)'
  },
  contentDescription: {
    fontSize: '1rem',
    color: 'var(--gray)',
    lineHeight: '1.6',
    maxWidth: '500px',
    margin: '0 auto'
  },
  detailsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--spacing-md)',
    maxWidth: '600px',
    margin: '0 auto'
  },
  detailItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 'var(--spacing-sm)',
    padding: 'var(--spacing-sm)',
    background: 'var(--white)',
    borderRadius: 'var(--radius-md)',
    boxShadow: 'var(--shadow-sm)'
  },
  detailIcon: {
    color: 'var(--success)',
    fontSize: '1.125rem',
    fontWeight: 'bold',
    marginTop: '2px'
  },
  detailText: {
    fontSize: '0.875rem',
    color: 'var(--dark)',
    lineHeight: '1.5'
  },
  ctaContainer: {
    background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)',
    borderRadius: 'var(--radius-xl)',
    padding: 'var(--spacing-3xl)',
    textAlign: 'center',
    color: 'var(--white)',
    boxShadow: 'var(--shadow-xl)'
  },
  ctaContent: {
    maxWidth: '600px',
    margin: '0 auto'
  },
  ctaTitle: {
    fontSize: 'clamp(1.5rem, 4vw, 2rem)',
    fontWeight: '700',
    marginBottom: 'var(--spacing-md)'
  },
  ctaDescription: {
    fontSize: '1.125rem',
    opacity: '0.9',
    marginBottom: 'var(--spacing-xl)',
    lineHeight: '1.6'
  },
  ctaButtons: {
    display: 'flex',
    gap: 'var(--spacing-md)',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  primaryCta: {
    background: 'var(--white)',
    color: 'var(--primary)',
    padding: 'var(--spacing-md) var(--spacing-2xl)',
    borderRadius: 'var(--radius-full)',
    border: 'none',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all var(--transition-fast)',
    boxShadow: 'var(--shadow-md)'
  },
  secondaryCta: {
    background: 'transparent',
    color: 'var(--white)',
    padding: 'var(--spacing-md) var(--spacing-2xl)',
    borderRadius: 'var(--radius-full)',
    border: '2px solid rgba(255,255,255,0.3)',
    fontSize: '1rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all var(--transition-fast)'
  }
};

// Media queries for responsive design
const mediaQueries = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @media (min-width: 768px) {
    .stats-container {
      grid-template-columns: repeat(4, 1fr) !important;
    }
    
    .tabs-header {
      flex-wrap: nowrap !important;
    }
    
    .cta-buttons {
      flex-wrap: nowrap !important;
    }
  }
  
  @media (min-width: 1024px) {
    .stat-card:hover {
      transform: translateY(-4px) !important;
    }
    
    .tab-button:hover:not(.tab-button-active) {
      background: var(--light) !important;
      border-color: var(--primary) !important;
    }
    
    .primary-cta:hover {
      transform: translateY(-2px) !important;
      box-shadow: var(--shadow-lg) !important;
    }
    
    .secondary-cta:hover {
      background: rgba(255,255,255,0.1) !important;
      border-color: var(--white) !important;
    }
  }
`;

// Add styles to document head
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = mediaQueries;
  document.head.appendChild(styleSheet);
}

export default AboutSection;
