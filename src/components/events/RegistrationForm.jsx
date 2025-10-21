import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase/config';

export default function RegistrationForm({ eventId }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    dateOfBirth: '',
    whatsapp: '',
    city: '',
    job: '',
    college: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [registrationNumber, setRegistrationNumber] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // حفظ التسجيل في Firestore
      const registrationData = {
        eventId: eventId, // eventId هو slug من الـ route
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        dateOfBirth: formData.dateOfBirth,
        whatsapp: formData.whatsapp,
        city: formData.city,
        job: formData.job,
        college: formData.college,
        registrationDate: serverTimestamp(),
        status: 'confirmed'
      };

      const docRef = await addDoc(collection(db, 'registrations'), registrationData);
      
      // Generate registration number: REG-{eventId}-{timestamp}
      const regNumber = `REG-${eventId}-${Date.now()}`;
      setRegistrationNumber(regNumber);
      setShowSuccess(true);
      
      // Redirect after 3 seconds
      setTimeout(() => {
        navigate('/events');
      }, 3000);
      
    } catch (error) {
      console.error('Registration error:', error);
      alert('حدث خطأ أثناء التسجيل. يرجى المحاولة مرة أخرى.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showSuccess) {
    return (
      <div style={styles.successModal}>
        <div style={styles.successContent}>
          <div style={styles.successIcon}>✅</div>
          <h3 style={styles.successTitle}>تم التسجيل بنجاح!</h3>
          <p style={styles.successMessage}>
            شكراً لك على التسجيل في الورشة. سنتواصل معك قريباً لتأكيد الحضور.
          </p>
          <div style={styles.registrationNumber}>
            <span style={styles.regLabel}>رقم التسجيل:</span>
            <span style={styles.regNumber}>{registrationNumber}</span>
          </div>
          <p style={styles.redirectMessage}>
            سيتم إعادة توجيهك لصفحة الفعاليات خلال 3 ثوانٍ...
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={styles.form} dir="rtl">
      <h3 style={styles.formTitle}>سجل في الورشة</h3>
      <p style={styles.formSubtitle}>املأ البيانات التالية لإكمال التسجيل</p>

      <div style={styles.formGrid}>
        <div style={styles.inputGroup}>
          <label htmlFor="firstName" style={styles.label}>الاسم الأول *</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="الاسم الأول"
            style={styles.input}
            required
          />
        </div>

        <div style={styles.inputGroup}>
          <label htmlFor="lastName" style={styles.label}>الاسم الأخير *</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="الاسم الأخير"
            style={styles.input}
            required
          />
        </div>

        <div style={styles.inputGroup}>
          <label htmlFor="email" style={styles.label}>البريد الإلكتروني *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="example@email.com"
            style={styles.input}
            required
          />
        </div>

        <div style={styles.inputGroup}>
          <label htmlFor="dateOfBirth" style={styles.label}>تاريخ الميلاد *</label>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>

        <div style={styles.inputGroup}>
          <label htmlFor="whatsapp" style={styles.label}>رقم الواتساب *</label>
          <input
            type="tel"
            id="whatsapp"
            name="whatsapp"
            value={formData.whatsapp}
            onChange={handleChange}
            placeholder="+966501234567"
            style={styles.input}
            required
          />
        </div>

        <div style={styles.inputGroup}>
          <label htmlFor="city" style={styles.label}>المدينة *</label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="المدينة"
            style={styles.input}
            required
          />
        </div>

        <div style={styles.inputGroup}>
          <label htmlFor="job" style={styles.label}>الوظيفة</label>
          <input
            type="text"
            id="job"
            name="job"
            value={formData.job}
            onChange={handleChange}
            placeholder="الوظيفة (اختياري)"
            style={styles.input}
          />
        </div>

        <div style={styles.inputGroup}>
          <label htmlFor="college" style={styles.label}>الكلية/الجامعة</label>
          <input
            type="text"
            id="college"
            name="college"
            value={formData.college}
            onChange={handleChange}
            placeholder="الكلية أو الجامعة (اختياري)"
            style={styles.input}
          />
        </div>
      </div>

      <button 
        type="submit" 
        style={styles.submitButton}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'جاري التسجيل...' : 'تسجيل في الورشة'}
      </button>
    </form>
  );
}

const styles = {
  form: {
    background: 'var(--white)',
    padding: 'var(--spacing-2xl)',
    borderRadius: 'var(--radius-xl)',
    boxShadow: 'var(--shadow-lg)',
    border: '1px solid var(--gray-light)',
    maxWidth: '600px',
    margin: '0 auto'
  },
  formTitle: {
    fontSize: '1.5rem',
    fontWeight: 900,
    color: 'var(--Primary, #0517A2)',
    marginBottom: 'var(--spacing-sm)',
    textAlign: 'center'
  },
  formSubtitle: {
    fontSize: '1rem',
    color: 'var(--gray)',
    marginBottom: 'var(--spacing-xl)',
    textAlign: 'center'
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: 'var(--spacing-md)',
    marginBottom: 'var(--spacing-xl)'
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--spacing-xs)'
  },
  label: {
    fontSize: '0.875rem',
    fontWeight: 600,
    color: 'var(--dark)'
  },
  input: {
    padding: 'var(--spacing-sm) var(--spacing-md)',
    borderRadius: 'var(--radius-md)',
    border: '1px solid var(--gray-light)',
    background: 'var(--white)',
    fontSize: '1rem',
    color: 'var(--dark)',
    outline: 'none',
    transition: 'border-color var(--transition-fast)',
    fontFamily: 'Tajawal, sans-serif'
  },
  submitButton: {
    background: 'var(--Primary, #0517A2)',
    color: 'var(--white)',
    padding: 'var(--spacing-md) var(--spacing-2xl)',
    borderRadius: 'var(--radius-full)',
    border: 'none',
    fontSize: '1rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all var(--transition-fast)',
    boxShadow: 'var(--shadow-md)',
    width: '100%'
  },
  successModal: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.8)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: 'var(--spacing-md)'
  },
  successContent: {
    background: 'var(--white)',
    padding: 'var(--spacing-3xl)',
    borderRadius: 'var(--radius-xl)',
    boxShadow: 'var(--shadow-xl)',
    textAlign: 'center',
    maxWidth: '500px',
    width: '100%'
  },
  successIcon: {
    fontSize: '4rem',
    marginBottom: 'var(--spacing-lg)'
  },
  successTitle: {
    fontSize: '1.75rem',
    fontWeight: 700,
    color: 'var(--success)',
    marginBottom: 'var(--spacing-md)'
  },
  successMessage: {
    fontSize: '1rem',
    color: 'var(--gray)',
    lineHeight: '1.6',
    marginBottom: 'var(--spacing-lg)'
  },
  registrationNumber: {
    background: 'var(--light)',
    padding: 'var(--spacing-md)',
    borderRadius: 'var(--radius-md)',
    marginBottom: 'var(--spacing-lg)',
    border: '2px solid var(--Primary, #0517A2)'
  },
  regLabel: {
    display: 'block',
    fontSize: '0.875rem',
    color: 'var(--gray)',
    marginBottom: 'var(--spacing-xs)'
  },
  regNumber: {
    fontSize: '1.25rem',
    fontWeight: 900,
    color: 'var(--Primary, #0517A2)',
    fontFamily: 'monospace'
  },
  redirectMessage: {
    fontSize: '0.875rem',
    color: 'var(--gray)',
    fontStyle: 'italic'
  }
};
