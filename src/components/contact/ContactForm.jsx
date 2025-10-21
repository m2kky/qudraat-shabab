import React, { useState } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase/config';

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  
  const onSubmit = async (e) => {
    e.preventDefault();
    
    if (!form.name.trim() || !form.email.trim() || !form.subject.trim() || !form.message.trim()) {
      setError('جميع الحقول مطلوبة');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const contactData = {
        name: form.name.trim(),
        email: form.email.trim(),
        subject: form.subject.trim(),
        message: form.message.trim(),
        submittedAt: serverTimestamp(),
        status: 'new'
      };

      await addDoc(collection(db, 'contactSubmissions'), contactData);
      
      setIsSubmitted(true);
      setForm({ name: '', email: '', subject: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
      
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setError('حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div style={styles.successContainer}>
        <div style={styles.successIcon}>✅</div>
        <h3 style={styles.successTitle}>تم إرسال رسالتك بنجاح!</h3>
        <p style={styles.successMessage}>
          شكراً لك على تواصلك معنا. سنقوم بالرد عليك في أقرب وقت ممكن.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} style={styles.form} dir="rtl" aria-label="نموذج تواصل">
      {error && (
        <div style={styles.errorContainer}>
          <span style={styles.errorIcon}>⚠️</span>
          <span style={styles.errorText}>{error}</span>
        </div>
      )}
      
      <div style={styles.field}> 
        <label htmlFor="name" style={styles.label}>الاسم *</label>
        <input 
          id="name" 
          name="name" 
          value={form.name} 
          onChange={onChange} 
          style={styles.input} 
          placeholder="اسمك" 
          required 
          disabled={isSubmitting}
        />
      </div>
      <div style={styles.field}> 
        <label htmlFor="email" style={styles.label}>البريد الإلكتروني *</label>
        <input 
          id="email" 
          name="email" 
          type="email" 
          value={form.email} 
          onChange={onChange} 
          style={styles.input} 
          placeholder="example@email.com" 
          required 
          disabled={isSubmitting}
        />
      </div>
      <div style={styles.field}> 
        <label htmlFor="subject" style={styles.label}>الموضوع *</label>
        <input 
          id="subject" 
          name="subject" 
          value={form.subject} 
          onChange={onChange} 
          style={styles.input} 
          placeholder="عنوان الرسالة" 
          required 
          disabled={isSubmitting}
        />
      </div>
      <div style={styles.field}> 
        <label htmlFor="message" style={styles.label}>الرسالة *</label>
        <textarea 
          id="message" 
          name="message" 
          value={form.message} 
          onChange={onChange} 
          style={{...styles.input, height: 120, resize: 'vertical'}} 
          placeholder="اكتب رسالتك هنا" 
          required 
          disabled={isSubmitting}
        />
      </div>
      <button 
        type="submit" 
        style={{
          ...styles.submit,
          opacity: isSubmitting ? 0.7 : 1,
          cursor: isSubmitting ? 'not-allowed' : 'pointer'
        }}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'جاري الإرسال...' : 'إرسال'}
      </button>
    </form>
  );
}

const styles = {
  form: { 
    display: 'flex', 
    flexDirection: 'column', 
    gap: '12px', 
    background: 'transparent', 
    padding: '16px 0', 
    borderRadius: '16px' 
  },
  field: { 
    display: 'flex', 
    flexDirection: 'column', 
    gap: 6 
  },
  label: { 
    color: 'var(--dark)', 
    fontWeight: 800, 
    fontSize: '0.95rem' 
  },
  input: { 
    padding: '12px 14px', 
    borderRadius: 12, 
    border: '1px solid var(--gray-light)', 
    outline: 'none', 
    background: 'var(--white)',
    fontFamily: 'Tajawal, sans-serif',
    fontSize: '1rem',
    transition: 'border-color var(--transition-fast)',
    '&:focus': {
      borderColor: 'var(--primary)'
    },
    '&:disabled': {
      opacity: 0.6,
      cursor: 'not-allowed'
    }
  },
  submit: { 
    background: 'var(--Primary, #0517A2)', 
    color: '#fff', 
    border: 'none', 
    borderRadius: 999, 
    padding: '12px 16px', 
    fontWeight: 900, 
    cursor: 'pointer', 
    boxShadow: 'var(--shadow-md)',
    transition: 'all var(--transition-fast)',
    '&:hover': {
      background: 'var(--secondary)',
      transform: 'translateY(-2px)'
    }
  },
  errorContainer: {
    background: '#fef2f2',
    border: '1px solid #fecaca',
    borderRadius: 'var(--radius-md)',
    padding: 'var(--spacing-md)',
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-sm)',
    marginBottom: 'var(--spacing-md)'
  },
  errorIcon: {
    fontSize: '1.2rem'
  },
  errorText: {
    color: 'var(--error)',
    fontSize: '0.875rem',
    fontWeight: '600'
  },
  successContainer: {
    background: 'var(--white)',
    padding: 'var(--spacing-2xl)',
    borderRadius: 'var(--radius-lg)',
    boxShadow: 'var(--shadow-md)',
    textAlign: 'center',
    border: '1px solid var(--gray-light)'
  },
  successIcon: {
    fontSize: '3rem',
    marginBottom: 'var(--spacing-md)'
  },
  successTitle: {
    fontSize: '1.25rem',
    fontWeight: '700',
    color: 'var(--success)',
    marginBottom: 'var(--spacing-sm)'
  },
  successMessage: {
    fontSize: '1rem',
    color: 'var(--gray)',
    lineHeight: 1.6,
    margin: 0
  }
};


