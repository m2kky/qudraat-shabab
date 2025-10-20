import { useState } from 'react';

function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const contactInfo = [
    {
      icon: '📧',
      title: 'البريد الإلكتروني',
      value: 'info@qudraatteam.com',
      link: 'mailto:@qudraatteam@gmail.com.com'
    },
    {
      icon: '📱',
      title: 'رقم الجوال',
      value: '+201098620547',
      link: 'tel:+201098620547'
    },
    {
      icon: '📍',
      title: 'العنوان',
      value: '16ش دكتور السبكي - الدقي -امام الاكاديمية البحرية',
      link: null
    },
    {
      icon: '🕒',
      title: 'ساعات العمل',
      value: 'الأحد - الخميس: 8:00 ص - 6:00 م',
      link: null
    }
  ];

  const socialLinks = [
    { name: 'تويتر', icon: '🐦', url: 'https://twitter.com' },
    { name: 'لينكد إن', icon: '💼', url: 'https://linkedin.com' },
    { name: 'إنستغرام', icon: '📷', url: 'https://instagram.com' },
    { name: 'يوتيوب', icon: '📺', url: 'https://youtube.com' }
  ];

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'الاسم مطلوب';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'البريد الإلكتروني مطلوب';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'البريد الإلكتروني غير صحيح';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'رقم الجوال مطلوب';
    } else if (!/^(\+966|0)?[5-9][0-9]{8}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'رقم الجوال غير صحيح';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'الموضوع مطلوب';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'الرسالة مطلوبة';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'الرسالة يجب أن تكون أكثر من 10 أحرف';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Contact form data:', formData);
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('Contact form error:', error);
      alert('حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  if (isSubmitted) {
    return (
      <section id="contact" style={styles.section} role="region" aria-labelledby="contact-title">
        <div className="container" style={styles.container}>
          <div style={styles.successContainer}>
            <div style={styles.successIcon}>✅</div>
            <h2 style={styles.successTitle}>تم إرسال رسالتك بنجاح!</h2>
            <p style={styles.successMessage}>
              شكراً لك على تواصلك معنا. سنقوم بالرد على رسالتك خلال 24 ساعة.
            </p>
            <button 
              style={styles.resetButton}
              onClick={() => setIsSubmitted(false)}
            >
              إرسال رسالة أخرى
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" style={styles.section} role="region" aria-labelledby="contact-title">
      <div className="container" style={styles.container}>
        {/* Section Header */}
        <div style={styles.header}>
          <h2 id="contact-title" style={styles.title}>
            تواصل معنا
          </h2>
          <p style={styles.subtitle}>
            نحن هنا للإجابة على استفساراتك ومساعدتك في رحلة التطوير المهني
          </p>
        </div>

        <div style={styles.content}>
          {/* Contact Information */}
          <div style={styles.contactInfo}>
            <h3 style={styles.contactTitle}>معلومات التواصل</h3>
            <div style={styles.contactList}>
              {contactInfo.map((info, index) => (
                <div key={index} style={styles.contactItem}>
                  <div style={styles.contactIcon}>{info.icon}</div>
                  <div style={styles.contactDetails}>
                    <h4 style={styles.contactItemTitle}>{info.title}</h4>
                    {info.link ? (
                      <a href={info.link} style={styles.contactLink}>
                        {info.value}
                      </a>
                    ) : (
                      <span style={styles.contactText}>{info.value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div style={styles.socialSection}>
              <h4 style={styles.socialTitle}>تابعنا على</h4>
              <div style={styles.socialLinks}>
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    style={styles.socialLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`تابعنا على ${social.name}`}
                  >
                    <span style={styles.socialIcon}>{social.icon}</span>
                    <span style={styles.socialName}>{social.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div style={styles.formContainer}>
            <form onSubmit={handleSubmit} style={styles.form} noValidate>
              <h3 style={styles.formTitle}>أرسل لنا رسالة</h3>
              
              <div style={styles.formRow}>
                <div style={styles.formGroup}>
                  <label htmlFor="name" style={styles.label}>
                    الاسم الكامل *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="أدخل اسمك الكامل"
                    value={formData.name}
                    onChange={handleChange}
                    style={{
                      ...styles.input,
                      borderColor: errors.name ? 'var(--error)' : 'var(--gray-light)'
                    }}
                    required
                    aria-describedby={errors.name ? 'name-error' : undefined}
                    aria-invalid={!!errors.name}
                  />
                  {errors.name && (
                    <span id="name-error" style={styles.error} role="alert">
                      {errors.name}
                    </span>
                  )}
                </div>

                <div style={styles.formGroup}>
                  <label htmlFor="email" style={styles.label}>
                    البريد الإلكتروني *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="example@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    style={{
                      ...styles.input,
                      borderColor: errors.email ? 'var(--error)' : 'var(--gray-light)'
                    }}
                    required
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    aria-invalid={!!errors.email}
                  />
                  {errors.email && (
                    <span id="email-error" style={styles.error} role="alert">
                      {errors.email}
                    </span>
                  )}
                </div>
              </div>

              <div style={styles.formRow}>
                <div style={styles.formGroup}>
                  <label htmlFor="phone" style={styles.label}>
                    رقم الجوال *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="05xxxxxxxx"
                    value={formData.phone}
                    onChange={handleChange}
                    style={{
                      ...styles.input,
                      borderColor: errors.phone ? 'var(--error)' : 'var(--gray-light)'
                    }}
                    required
                    aria-describedby={errors.phone ? 'phone-error' : undefined}
                    aria-invalid={!!errors.phone}
                  />
                  {errors.phone && (
                    <span id="phone-error" style={styles.error} role="alert">
                      {errors.phone}
                    </span>
                  )}
                </div>

                <div style={styles.formGroup}>
                  <label htmlFor="subject" style={styles.label}>
                    الموضوع *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    style={{
                      ...styles.input,
                      borderColor: errors.subject ? 'var(--error)' : 'var(--gray-light)'
                    }}
                    required
                    aria-describedby={errors.subject ? 'subject-error' : undefined}
                    aria-invalid={!!errors.subject}
                  >
                    <option value="">اختر الموضوع</option>
                    <option value="general">استفسار عام</option>
                    <option value="courses">البرامج التدريبية</option>
                    <option value="partnership">شراكة</option>
                    <option value="support">دعم فني</option>
                    <option value="feedback">ملاحظات</option>
                  </select>
                  {errors.subject && (
                    <span id="subject-error" style={styles.error} role="alert">
                      {errors.subject}
                    </span>
                  )}
                </div>
              </div>

              <div style={styles.formGroup}>
                <label htmlFor="message" style={styles.label}>
                  الرسالة *
                </label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="اكتب رسالتك هنا..."
                  value={formData.message}
                  onChange={handleChange}
                  style={{
                    ...styles.textarea,
                    borderColor: errors.message ? 'var(--error)' : 'var(--gray-light)'
                  }}
                  rows="5"
                  required
                  aria-describedby={errors.message ? 'message-error' : undefined}
                  aria-invalid={!!errors.message}
                />
                {errors.message && (
                  <span id="message-error" style={styles.error} role="alert">
                    {errors.message}
                  </span>
                )}
              </div>

              <button 
                type="submit" 
                style={styles.submitButton}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'جاري الإرسال...' : 'إرسال الرسالة'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

const styles = {
  section: {
    padding: 'var(--spacing-3xl) 0',
    background: 'var(--light)',
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
  content: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: 'var(--spacing-3xl)'
  },
  contactInfo: {
    background: 'var(--white)',
    padding: 'var(--spacing-2xl)',
    borderRadius: 'var(--radius-xl)',
    boxShadow: 'var(--shadow-lg)'
  },
  contactTitle: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: 'var(--dark)',
    marginBottom: 'var(--spacing-xl)',
    textAlign: 'center'
  },
  contactList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--spacing-lg)',
    marginBottom: 'var(--spacing-2xl)'
  },
  contactItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-md)',
    padding: 'var(--spacing-md)',
    background: 'var(--light)',
    borderRadius: 'var(--radius-lg)',
    transition: 'all var(--transition-fast)'
  },
  contactIcon: {
    fontSize: '1.5rem',
    width: '48px',
    height: '48px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'var(--primary)',
    color: 'var(--white)',
    borderRadius: 'var(--radius-full)',
    flexShrink: 0
  },
  contactDetails: {
    flex: 1
  },
  contactItemTitle: {
    fontSize: '0.875rem',
    fontWeight: '600',
    color: 'var(--gray)',
    marginBottom: 'var(--spacing-xs)'
  },
  contactLink: {
    fontSize: '1rem',
    color: 'var(--primary)',
    textDecoration: 'none',
    fontWeight: '500',
    transition: 'color var(--transition-fast)'
  },
  contactText: {
    fontSize: '1rem',
    color: 'var(--dark)',
    fontWeight: '500'
  },
  socialSection: {
    textAlign: 'center'
  },
  socialTitle: {
    fontSize: '1.125rem',
    fontWeight: '600',
    color: 'var(--dark)',
    marginBottom: 'var(--spacing-md)'
  },
  socialLinks: {
    display: 'flex',
    gap: 'var(--spacing-md)',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  socialLink: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-sm)',
    padding: 'var(--spacing-sm) var(--spacing-md)',
    background: 'var(--light)',
    borderRadius: 'var(--radius-full)',
    textDecoration: 'none',
    color: 'var(--dark)',
    transition: 'all var(--transition-fast)',
    border: '1px solid var(--gray-light)'
  },
  socialIcon: {
    fontSize: '1.125rem'
  },
  socialName: {
    fontSize: '0.875rem',
    fontWeight: '500'
  },
  formContainer: {
    background: 'var(--white)',
    padding: 'var(--spacing-2xl)',
    borderRadius: 'var(--radius-xl)',
    boxShadow: 'var(--shadow-lg)'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--spacing-lg)'
  },
  formTitle: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: 'var(--dark)',
    marginBottom: 'var(--spacing-lg)',
    textAlign: 'center'
  },
  formRow: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: 'var(--spacing-md)'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--spacing-xs)'
  },
  label: {
    fontSize: '0.875rem',
    fontWeight: '600',
    color: 'var(--dark)',
    marginBottom: 'var(--spacing-xs)'
  },
  input: {
    padding: 'var(--spacing-md)',
    fontSize: '1rem',
    border: '1px solid var(--gray-light)',
    borderRadius: 'var(--radius-md)',
    fontFamily: 'Tajawal, sans-serif',
    direction: 'rtl',
    transition: 'border-color var(--transition-fast), box-shadow var(--transition-fast)',
    background: 'var(--white)'
  },
  textarea: {
    padding: 'var(--spacing-md)',
    fontSize: '1rem',
    border: '1px solid var(--gray-light)',
    borderRadius: 'var(--radius-md)',
    fontFamily: 'Tajawal, sans-serif',
    direction: 'rtl',
    transition: 'border-color var(--transition-fast), box-shadow var(--transition-fast)',
    background: 'var(--white)',
    resize: 'vertical',
    minHeight: '120px'
  },
  error: {
    fontSize: '0.75rem',
    color: 'var(--error)',
    fontWeight: '500',
    marginTop: 'var(--spacing-xs)'
  },
  submitButton: {
    background: 'var(--primary)',
    color: 'var(--white)',
    padding: 'var(--spacing-md) var(--spacing-2xl)',
    fontSize: '1rem',
    fontWeight: '600',
    borderRadius: 'var(--radius-full)',
    border: 'none',
    cursor: 'pointer',
    transition: 'all var(--transition-fast)',
    boxShadow: 'var(--shadow-md)',
    marginTop: 'var(--spacing-md)'
  },
  successContainer: {
    textAlign: 'center',
    background: 'var(--white)',
    padding: 'var(--spacing-3xl)',
    borderRadius: 'var(--radius-xl)',
    boxShadow: 'var(--shadow-lg)',
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
    background: 'var(--primary)',
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
    
    .form-row {
      grid-template-columns: 1fr 1fr !important;
    }
  }
  
  @media (min-width: 1024px) {
    .contact-item:hover {
      transform: translateX(-4px) !important;
      box-shadow: var(--shadow-md) !important;
    }
    
    .contact-link:hover {
      color: var(--primary-dark) !important;
    }
    
    .social-link:hover {
      background: var(--primary) !important;
      color: var(--white) !important;
      border-color: var(--primary) !important;
    }
    
    .submit-button:hover {
      background: var(--primary-dark) !important;
      transform: translateY(-2px) !important;
      box-shadow: var(--shadow-lg) !important;
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

export default ContactSection;
