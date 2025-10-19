import { useState, useEffect, useRef } from 'react';

function BookingModal({ onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    event: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const modalRef = useRef(null);
  const firstInputRef = useRef(null);

  // Focus management and keyboard navigation
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const handleTabKey = (e) => {
      if (e.key === 'Tab') {
        const focusableElements = modalRef.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement?.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement?.focus();
            e.preventDefault();
          }
        }
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('keydown', handleTabKey);
    
    // Focus first input when modal opens
    setTimeout(() => {
      firstInputRef.current?.focus();
    }, 100);

    // Prevent body scroll
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('keydown', handleTabKey);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

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
    
    if (!formData.event) {
      newErrors.event = 'يرجى اختيار فعالية';
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
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Booking data:', formData);
      alert('تم إرسال طلب الحجز بنجاح! سنتواصل معك قريباً.');
      onClose();
    } catch (error) {
      console.error('Booking error:', error);
      alert('حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى.');
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

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      style={styles.overlay} 
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div style={styles.modal} ref={modalRef} onClick={(e) => e.stopPropagation()}>
        <button 
          style={styles.close} 
          onClick={onClose}
          aria-label="إغلاق نافذة الحجز"
          tabIndex="0"
        >
          <span aria-hidden="true">✕</span>
        </button>
        
        <div style={styles.header}>
          <h2 id="modal-title" style={styles.title}>احجز مقعدك</h2>
          <p id="modal-description" style={styles.description}>
            املأ البيانات التالية لحجز مقعدك في إحدى فعالياتنا التدريبية
          </p>
        </div>

        <form onSubmit={handleSubmit} style={styles.form} noValidate>
          <div style={styles.fieldGroup}>
            <label htmlFor="name" style={styles.label}>
              الاسم الكامل *
            </label>
            <input
              ref={firstInputRef}
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

          <div style={styles.fieldGroup}>
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

          <div style={styles.fieldGroup}>
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

          <div style={styles.fieldGroup}>
            <label htmlFor="event" style={styles.label}>
              الفعالية المطلوبة *
            </label>
            <select
              id="event"
              name="event"
              value={formData.event}
              onChange={handleChange}
              style={{
                ...styles.input,
                borderColor: errors.event ? 'var(--error)' : 'var(--gray-light)'
              }}
              required
              aria-describedby={errors.event ? 'event-error' : undefined}
              aria-invalid={!!errors.event}
            >
              <option value="">اختر الفعالية</option>
              <option value="web-dev">تطوير الويب - دورة شاملة</option>
              <option value="design">التصميم الإبداعي - UI/UX</option>
              <option value="marketing">التسويق الرقمي - استراتيجيات حديثة</option>
              <option value="data-science">علوم البيانات - تحليل البيانات</option>
              <option value="mobile-dev">تطوير التطبيقات المحمولة</option>
            </select>
            {errors.event && (
              <span id="event-error" style={styles.error} role="alert">
                {errors.event}
              </span>
            )}
          </div>

          <div style={styles.fieldGroup}>
            <label htmlFor="message" style={styles.label}>
              رسالة إضافية (اختياري)
            </label>
            <textarea
              id="message"
              name="message"
              placeholder="أخبرنا عن أهدافك من هذه الدورة..."
              value={formData.message}
              onChange={handleChange}
              style={styles.textarea}
              rows="3"
            />
          </div>

          <div style={styles.buttonGroup}>
            <button 
              type="button" 
              style={styles.cancelButton}
              onClick={onClose}
              disabled={isSubmitting}
            >
              إلغاء
            </button>
            <button 
              type="submit" 
              style={styles.submitButton}
              disabled={isSubmitting}
              aria-describedby="submit-help"
            >
              {isSubmitting ? 'جاري الإرسال...' : 'تأكيد الحجز'}
            </button>
          </div>
          
          <p id="submit-help" style={styles.helpText}>
            سيتم التواصل معك خلال 24 ساعة لتأكيد الحجز
          </p>
        </form>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0,0,0,0.6)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: 'var(--spacing-md)',
    backdropFilter: 'blur(4px)'
  },
  modal: {
    background: 'var(--white)',
    borderRadius: 'var(--radius-xl)',
    padding: 'var(--spacing-2xl)',
    maxWidth: '500px',
    width: '100%',
    maxHeight: '90vh',
    overflowY: 'auto',
    position: 'relative',
    boxShadow: 'var(--shadow-xl)',
    border: '1px solid var(--gray-light)'
  },
  close: {
    position: 'absolute',
    top: 'var(--spacing-lg)',
    left: 'var(--spacing-lg)',
    background: 'transparent',
    fontSize: '1.5rem',
    color: 'var(--gray)',
    padding: 'var(--spacing-sm)',
    borderRadius: 'var(--radius-md)',
    transition: 'all var(--transition-fast)',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '32px',
    height: '32px'
  },
  header: {
    marginBottom: 'var(--spacing-xl)',
    textAlign: 'center'
  },
  title: {
    fontSize: 'clamp(1.5rem, 4vw, 2rem)',
    fontWeight: '700',
    marginBottom: 'var(--spacing-sm)',
    color: 'var(--dark)'
  },
  description: {
    fontSize: '1rem',
    color: 'var(--gray)',
    lineHeight: '1.5',
    margin: 0
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--spacing-lg)'
  },
  fieldGroup: {
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
    minHeight: '80px'
  },
  error: {
    fontSize: '0.75rem',
    color: 'var(--error)',
    fontWeight: '500',
    marginTop: 'var(--spacing-xs)'
  },
  buttonGroup: {
    display: 'flex',
    gap: 'var(--spacing-md)',
    marginTop: 'var(--spacing-md)'
  },
  cancelButton: {
    background: 'transparent',
    color: 'var(--gray)',
    padding: 'var(--spacing-md) var(--spacing-lg)',
    fontSize: '1rem',
    fontWeight: '500',
    borderRadius: 'var(--radius-md)',
    border: '1px solid var(--gray-light)',
    cursor: 'pointer',
    transition: 'all var(--transition-fast)',
    flex: 1
  },
  submitButton: {
    background: 'var(--primary)',
    color: 'var(--white)',
    padding: 'var(--spacing-md) var(--spacing-lg)',
    fontSize: '1rem',
    fontWeight: '600',
    borderRadius: 'var(--radius-md)',
    border: 'none',
    cursor: 'pointer',
    transition: 'all var(--transition-fast)',
    flex: 2,
    position: 'relative'
  },
  helpText: {
    fontSize: '0.75rem',
    color: 'var(--gray)',
    textAlign: 'center',
    margin: 'var(--spacing-md) 0 0 0',
    lineHeight: '1.4'
  }
};

export default BookingModal;
