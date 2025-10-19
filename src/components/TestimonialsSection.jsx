import { useState, useEffect } from 'react';

function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: 'أحمد محمد',
      role: 'مطور ويب',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      content: 'منصة قدرات شباب غيرت حياتي المهنية تماماً. الدورات التدريبية كانت شاملة ومفيدة جداً، والمدربين على أعلى مستوى من الاحترافية.',
      rating: 5,
      course: 'تطوير الويب الشامل'
    },
    {
      id: 2,
      name: 'فاطمة أحمد',
      role: 'مصممة UI/UX',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
      content: 'أفضل منصة تدريبية في السعودية! المحتوى مجاني ومتاح للجميع، والجودة عالية جداً. أنصح كل شاب وفتاة بالانضمام.',
      rating: 5,
      course: 'التصميم الإبداعي'
    },
    {
      id: 3,
      name: 'محمد علي',
      role: 'محلل بيانات',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      content: 'دورة علوم البيانات كانت رائعة! تعلمت من الصفر وحصلت على وظيفة أحلامي. شكراً لكم على هذا المجهود الرائع.',
      rating: 5,
      course: 'علوم البيانات'
    },
    {
      id: 4,
      name: 'نورا السعيد',
      role: 'مسوقة رقمية',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      content: 'المحتوى المقدم في منصة قدرات شباب ممتاز ومتنوع. ساعدني في تطوير مهاراتي في التسويق الرقمي بشكل كبير.',
      rating: 5,
      course: 'التسويق الرقمي'
    },
    {
      id: 5,
      name: 'خالد العتيبي',
      role: 'مطور تطبيقات',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
      content: 'ورشة تطوير التطبيقات المحمولة كانت مفيدة جداً. تعلمت تقنيات حديثة وحصلت على شهادة معتمدة. أنصح الجميع!',
      rating: 5,
      course: 'تطوير التطبيقات'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span 
        key={index} 
        style={{
          ...styles.star,
          color: index < rating ? '#fbbf24' : '#e5e7eb'
        }}
      >
        ⭐
      </span>
    ));
  };

  return (
    <section id="testimonials" style={styles.section} role="region" aria-labelledby="testimonials-title">
      <div className="container" style={styles.container}>
        {/* Section Header */}
        <div style={styles.header}>
          <h2 id="testimonials-title" style={styles.title}>
            آراء طلابنا
          </h2>
          <p style={styles.subtitle}>
            اكتشف تجارب طلابنا وكيف ساعدتهم منصة قدرات شباب في تحقيق أهدافهم
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div style={styles.carouselContainer}>
          <div style={styles.carousel}>
            <div style={styles.testimonialCard}>
              <div style={styles.quoteIcon}>💬</div>
              
              <div style={styles.testimonialContent}>
                <p style={styles.testimonialText}>
                  "{testimonials[currentIndex].content}"
                </p>
              </div>

              <div style={styles.rating}>
                {renderStars(testimonials[currentIndex].rating)}
              </div>

              <div style={styles.authorInfo}>
                <div style={styles.authorImage}>
                  <img 
                    src={testimonials[currentIndex].image} 
                    alt={testimonials[currentIndex].name}
                    style={styles.avatar}
                  />
                </div>
                <div style={styles.authorDetails}>
                  <h4 style={styles.authorName}>{testimonials[currentIndex].name}</h4>
                  <p style={styles.authorRole}>{testimonials[currentIndex].role}</p>
                  <p style={styles.courseName}>دورة: {testimonials[currentIndex].course}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div style={styles.navigation}>
            <button 
              style={styles.navButton}
              onClick={prevTestimonial}
              aria-label="الشهادة السابقة"
            >
              ←
            </button>
            <button 
              style={styles.navButton}
              onClick={nextTestimonial}
              aria-label="الشهادة التالية"
            >
              →
            </button>
          </div>

          {/* Dots Indicator */}
          <div style={styles.dotsContainer}>
            {testimonials.map((_, index) => (
              <button
                key={index}
                style={{
                  ...styles.dot,
                  ...(index === currentIndex ? styles.activeDot : {})
                }}
                onClick={() => setCurrentIndex(index)}
                aria-label={`انتقل إلى الشهادة ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Stats */}
        <div style={styles.statsContainer}>
          <div style={styles.statItem}>
            <h3 style={styles.statNumber}>4.9/5</h3>
            <p style={styles.statLabel}>تقييم الطلاب</p>
          </div>
          <div style={styles.statItem}>
            <h3 style={styles.statNumber}>98%</h3>
            <p style={styles.statLabel}>معدل الرضا</p>
          </div>
          <div style={styles.statItem}>
            <h3 style={styles.statNumber}>2,000+</h3>
            <p style={styles.statLabel}>تقييم إيجابي</p>
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
  carouselContainer: {
    position: 'relative',
    marginBottom: 'var(--spacing-3xl)'
  },
  carousel: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '400px'
  },
  testimonialCard: {
    background: 'var(--light)',
    padding: 'var(--spacing-3xl)',
    borderRadius: 'var(--radius-xl)',
    boxShadow: 'var(--shadow-xl)',
    textAlign: 'center',
    maxWidth: '800px',
    width: '100%',
    position: 'relative',
    border: '1px solid var(--gray-light)'
  },
  quoteIcon: {
    fontSize: '3rem',
    marginBottom: 'var(--spacing-lg)',
    opacity: '0.3'
  },
  testimonialContent: {
    marginBottom: 'var(--spacing-xl)'
  },
  testimonialText: {
    fontSize: 'clamp(1rem, 3vw, 1.25rem)',
    lineHeight: '1.8',
    color: 'var(--dark)',
    fontStyle: 'italic',
    margin: 0
  },
  rating: {
    display: 'flex',
    justifyContent: 'center',
    gap: 'var(--spacing-xs)',
    marginBottom: 'var(--spacing-xl)'
  },
  star: {
    fontSize: '1.5rem'
  },
  authorInfo: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'var(--spacing-lg)'
  },
  authorImage: {
    flexShrink: 0
  },
  avatar: {
    width: '80px',
    height: '80px',
    borderRadius: 'var(--radius-full)',
    objectFit: 'cover',
    border: '4px solid var(--white)',
    boxShadow: 'var(--shadow-md)'
  },
  authorDetails: {
    textAlign: 'right'
  },
  authorName: {
    fontSize: '1.25rem',
    fontWeight: '700',
    color: 'var(--dark)',
    marginBottom: 'var(--spacing-xs)'
  },
  authorRole: {
    fontSize: '1rem',
    color: 'var(--primary)',
    fontWeight: '500',
    marginBottom: 'var(--spacing-xs)'
  },
  courseName: {
    fontSize: '0.875rem',
    color: 'var(--gray)',
    margin: 0
  },
  navigation: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'space-between',
    pointerEvents: 'none',
    transform: 'translateY(-50%)'
  },
  navButton: {
    background: 'var(--primary)',
    color: 'var(--white)',
    border: 'none',
    borderRadius: 'var(--radius-full)',
    width: '50px',
    height: '50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.25rem',
    cursor: 'pointer',
    transition: 'all var(--transition-fast)',
    boxShadow: 'var(--shadow-md)',
    pointerEvents: 'auto'
  },
  dotsContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: 'var(--spacing-sm)',
    marginTop: 'var(--spacing-xl)'
  },
  dot: {
    width: '12px',
    height: '12px',
    borderRadius: 'var(--radius-full)',
    border: 'none',
    background: 'var(--gray-light)',
    cursor: 'pointer',
    transition: 'all var(--transition-fast)'
  },
  activeDot: {
    background: 'var(--primary)',
    transform: 'scale(1.2)'
  },
  statsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: 'var(--spacing-xl)',
    background: 'var(--light)',
    padding: 'var(--spacing-2xl)',
    borderRadius: 'var(--radius-xl)',
    boxShadow: 'var(--shadow-md)'
  },
  statItem: {
    textAlign: 'center'
  },
  statNumber: {
    fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
    fontWeight: '900',
    color: 'var(--primary)',
    marginBottom: 'var(--spacing-sm)'
  },
  statLabel: {
    fontSize: '1rem',
    color: 'var(--gray)',
    fontWeight: '500',
    margin: 0
  }
};

// Media queries for responsive design
const mediaQueries = `
  @media (max-width: 768px) {
    .author-info {
      flex-direction: column !important;
      text-align: center !important;
    }
    
    .author-details {
      text-align: center !important;
    }
    
    .navigation {
      position: static !important;
      transform: none !important;
      margin-top: var(--spacing-xl) !important;
      justify-content: center !important;
      gap: var(--spacing-lg) !important;
    }
  }
  
  @media (min-width: 1024px) {
    .nav-button:hover {
      background: var(--primary-dark) !important;
      transform: scale(1.1) !important;
    }
    
    .dot:hover {
      background: var(--primary) !important;
    }
  }
`;

// Add styles to document head
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = mediaQueries;
  document.head.appendChild(styleSheet);
}

export default TestimonialsSection;

