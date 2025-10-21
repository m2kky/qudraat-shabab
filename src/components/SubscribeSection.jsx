import { useState } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/config';

function SubscribeSection() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState('');

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setError('البريد الإلكتروني مطلوب');
      return;
    }

    if (!validateEmail(email)) {
      setError('البريد الإلكتروني غير صحيح');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const subscriptionData = {
        email: email.trim(),
        subscribedAt: serverTimestamp(),
        source: 'newsletter_section',
        status: 'active'
      };

      await addDoc(collection(db, 'newsletterSubscribers'), subscriptionData);
      
      setIsSubscribed(true);
      setEmail('');
    } catch (error) {
      console.error('Subscription error:', error);
      setError('حدث خطأ أثناء الاشتراك. يرجى المحاولة مرة أخرى.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (error) {
      setError('');
    }
  };

  if (isSubscribed) {
    return (
      <section style={styles.section} role="region" aria-labelledby="subscribe-title">
        <div className="container" style={styles.container}>
          <div style={styles.successContainer}>
            <div style={styles.successIcon}>✅</div>
            <h2 style={styles.successTitle}>تم الاشتراك بنجاح!</h2>
            <p style={styles.successMessage}>
              شكراً لك على الاشتراك في نشرتنا البريدية. ستتلقى آخر الأخبار والعروض الحصرية.
            </p>
            <button 
              style={styles.resetButton}
              onClick={() => setIsSubscribed(false)}
            >
              اشتراك جديد
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section style={styles.section} role="region" aria-labelledby="subscribe-title">
      <div className="container" style={styles.container}>
        <div style={styles.content}>
          <div style={styles.textContent}>
            <h2 id="subscribe-title" style={styles.title}>
              ابق على اطلاع
            </h2>
            <p style={styles.subtitle}>
              اشترك في نشرتنا البريدية لتكون أول من يعرف عن:
            </p>
            
            <div style={styles.benefits}>
              <div style={styles.benefit}>
                <span style={styles.benefitIcon}>🆕</span>
                <span>أحدث الدورات والورش</span>
              </div>
              <div style={styles.benefit}>
                <span style={styles.benefitIcon}>🎯</span>
                <span>عروض حصرية ومميزة</span>
              </div>
              <div style={styles.benefit}>
                <span style={styles.benefitIcon}>📚</span>
                <span>نصائح وتوجيهات مفيدة</span>
              </div>
              <div style={styles.benefit}>
                <span style={styles.benefitIcon}>🏆</span>
                <span>قصص نجاح الطلاب</span>
              </div>
            </div>
          </div>

          <div style={styles.formContent}>
            <form onSubmit={handleSubmit} style={styles.form}>
              <div style={styles.formHeader}>
                <h3 style={styles.formTitle}>اشترك الآن</h3>
                <p style={styles.formDescription}>
                  احصل على آخر الأخبار والعروض مباشرة في بريدك
                </p>
              </div>

              <div style={styles.inputGroup}>
                <div style={styles.emailContainer}>
                  <input
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="أدخل بريدك الإلكتروني"
                    style={{
                      ...styles.emailInput,
                      borderColor: error ? 'var(--error)' : 'var(--gray-light)'
                    }}
                    required
                    aria-describedby={error ? 'email-error' : undefined}
                    aria-invalid={!!error}
                  />
                  <button 
                    type="submit" 
                    style={styles.submitButton}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'جاري الإرسال...' : 'اشترك'}
                  </button>
                </div>
                
                {error && (
                  <span id="email-error" style={styles.errorMessage} role="alert">
                    {error}
                  </span>
                )}
              </div>

              <div style={styles.privacyNote}>
                <span style={styles.privacyIcon}>🔒</span>
                <span style={styles.privacyText}>
                  نحن نحترم خصوصيتك. لن نشارك بريدك مع أي طرف ثالث.
                </span>
              </div>
            </form>

            <div style={styles.socialProof}>
              <p style={styles.socialText}>انضم إلى أكثر من 5,000 مشترك</p>
              <div style={styles.subscriberCount}>
                <span style={styles.countNumber}>5,247</span>
                <span style={styles.countLabel}>مشترك نشط</span>
              </div>
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
    background: 'var(--Primary, #0517A2)',
    position: 'relative',
    overflow: 'hidden'
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 var(--spacing-md)'
  },
  content: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: 'var(--spacing-3xl)',
    alignItems: 'center'
  },
  textContent: {
    textAlign: 'center',
    color: 'var(--white)'
  },
  title: {
    fontSize: 'clamp(1.75rem, 5vw, 2.5rem)',
    fontWeight: '900',
    marginBottom: 'var(--spacing-md)',
    textShadow: 'none',
    color: 'var(--white)'
  },
  subtitle: {
    fontSize: 'clamp(1rem, 3vw, 1.25rem)',
    marginBottom: 'var(--spacing-xl)',
    opacity: '0.9',
    lineHeight: '1.6',
    color: 'rgba(255,255,255,0.9)'
  },
  benefits: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: 'var(--spacing-md)',
    maxWidth: '600px',
    margin: '0 auto'
  },
  benefit: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-sm)',
    fontSize: '0.875rem',
    opacity: '1',
    padding: 'var(--spacing-sm)',
    background: 'rgba(255,255,255,0.1)',
    borderRadius: 'var(--radius-md)',
    color: 'var(--white)'
  },
  benefitIcon: {
    fontSize: '1.25rem',
    color: 'var(--white)'
  },
  formContent: {
    background: 'var(--white)',
    padding: 'var(--spacing-2xl)',
    borderRadius: 'var(--radius-xl)',
    boxShadow: 'var(--shadow-xl)',
    maxWidth: '500px',
    margin: '0 auto',
    width: '100%'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--spacing-lg)'
  },
  formHeader: {
    textAlign: 'center'
  },
  formTitle: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: 'var(--Primary, #0517A2)',
    marginBottom: 'var(--spacing-sm)'
  },
  formDescription: {
    fontSize: '0.875rem',
    color: 'var(--gray)',
    lineHeight: '1.5',
    margin: 0
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--spacing-sm)'
  },
  emailContainer: {
    display: 'flex',
    gap: 'var(--spacing-sm)',
    background: 'var(--light)',
    borderRadius: 'var(--radius-full)',
    padding: '4px',
    border: '1px solid var(--gray-light)'
  },
  emailInput: {
    flex: 1,
    padding: 'var(--spacing-md)',
    border: 'none',
    background: 'transparent',
    fontSize: '1rem',
    fontFamily: 'Tajawal, sans-serif',
    direction: 'rtl',
    outline: 'none',
    color: 'var(--dark)'
  },
  submitButton: {
    background: 'var(--Primary, #0517A2)',
    color: 'var(--white)',
    padding: 'var(--spacing-md) var(--spacing-xl)',
    borderRadius: 'var(--radius-full)',
    border: 'none',
    fontSize: '1rem',
    fontWeight: '800',
    cursor: 'pointer',
    transition: 'all var(--transition-fast)',
    whiteSpace: 'nowrap'
  },
  errorMessage: {
    fontSize: '0.75rem',
    color: 'var(--error)',
    fontWeight: '500',
    textAlign: 'center'
  },
  privacyNote: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-sm)',
    fontSize: '0.75rem',
    color: 'var(--gray)',
    textAlign: 'center',
    justifyContent: 'center'
  },
  privacyIcon: {
    fontSize: '1rem',
    color: 'var(--gray)'
  },
  privacyText: {
    lineHeight: '1.4'
  },
  socialProof: {
    textAlign: 'center',
    padding: 'var(--spacing-lg)',
    background: 'var(--Primary, #0517A2)',
    borderRadius: 'var(--radius-lg)',
    marginTop: 'var(--spacing-lg)'
  },
  socialText: {
    fontSize: '0.875rem',
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 'var(--spacing-sm)'
  },
  subscriberCount: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'var(--spacing-sm)'
  },
  countNumber: {
    fontSize: '1.5rem',
    fontWeight: '900',
    color: 'var(--white)'
  },
  countLabel: {
    fontSize: '0.875rem',
    color: 'rgba(255,255,255,0.8)',
    fontWeight: '500'
  },
  successContainer: {
    textAlign: 'center',
    background: 'var(--white)',
    padding: 'var(--spacing-3xl)',
    borderRadius: 'var(--radius-xl)',
    boxShadow: 'var(--shadow-xl)',
    maxWidth: '500px',
    margin: '0 auto'
  },
  successIcon: {
    fontSize: '4rem',
    marginBottom: 'var(--spacing-lg)'
  },
  successTitle: {
    fontSize: '1.75rem',
    fontWeight: '700',
    color: 'var(--success)',
    marginBottom: 'var(--spacing-md)'
  },
  successMessage: {
    fontSize: '1rem',
    color: 'var(--gray)',
    lineHeight: '1.6',
    marginBottom: 'var(--spacing-xl)'
  },
  resetButton: {
    background: 'var(--Primary, #0517A2)',
    color: 'var(--white)',
    padding: 'var(--spacing-md) var(--spacing-xl)',
    borderRadius: 'var(--radius-full)',
    border: 'none',
    fontSize: '1rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all var(--transition-fast)'
  }
};

// Media queries for responsive design
const mediaQueries = `
  @media (min-width: 768px) {
    .content {
      grid-template-columns: 1fr 1fr !important;
    }
    
    .text-content {
      text-align: right !important;
    }
    
    .benefits {
      grid-template-columns: 1fr !important;
      text-align: right !important;
    }
  }
  
  @media (min-width: 1024px) {
    .submit-button:hover {
      background: var(--primary-dark) !important;
      transform: translateY(-2px) !important;
    }
    
    .reset-button:hover {
      background: var(--primary-dark) !important;
      transform: translateY(-2px) !important;
    }
  }
`;

// Add styles to document head
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = mediaQueries;
  document.head.appendChild(styleSheet);
}

export default SubscribeSection;

