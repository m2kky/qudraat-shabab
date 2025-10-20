import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/config';

export default function LoginForm({ onLoginSuccess }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      onLoginSuccess();
    } catch (error) {
      console.error('Login error:', error);
      setError('البريد الإلكتروني أو كلمة المرور غير صحيحة');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formCard}>
        <div style={styles.header}>
          <h1 style={styles.title}>تسجيل الدخول</h1>
          <p style={styles.subtitle}>لوحة تحكم قدرات شباب</p>
        </div>

        <form onSubmit={handleSubmit} style={styles.form} dir="rtl">
          <div style={styles.inputGroup}>
            <label htmlFor="email" style={styles.label}>البريد الإلكتروني</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="admin@qudraat-shabab.com"
              style={styles.input}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label htmlFor="password" style={styles.label}>كلمة المرور</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="كلمة المرور"
              style={styles.input}
              required
            />
          </div>

          {error && (
            <div style={styles.errorMessage}>
              {error}
            </div>
          )}

          <button 
            type="submit" 
            style={styles.submitButton}
            disabled={isLoading}
          >
            {isLoading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
          </button>
        </form>

        <div style={styles.footer}>
          <p style={styles.footerText}>
            للوصول إلى لوحة التحكم، يرجى استخدام بيانات المدير
          </p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, var(--Primary, #0517A2) 0%, #1e3a8a 100%)',
    padding: 'var(--spacing-md)'
  },
  formCard: {
    background: 'var(--white)',
    padding: 'var(--spacing-3xl)',
    borderRadius: 'var(--radius-xl)',
    boxShadow: 'var(--shadow-xl)',
    width: '100%',
    maxWidth: '400px'
  },
  header: {
    textAlign: 'center',
    marginBottom: 'var(--spacing-2xl)'
  },
  title: {
    fontSize: '1.75rem',
    fontWeight: 900,
    color: 'var(--Primary, #0517A2)',
    marginBottom: 'var(--spacing-sm)'
  },
  subtitle: {
    fontSize: '1rem',
    color: 'var(--gray)',
    margin: 0
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--spacing-lg)'
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
    padding: 'var(--spacing-md)',
    borderRadius: 'var(--radius-md)',
    border: '1px solid var(--gray-light)',
    background: 'var(--white)',
    fontSize: '1rem',
    color: 'var(--dark)',
    outline: 'none',
    transition: 'border-color var(--transition-fast)',
    fontFamily: 'Tajawal, sans-serif'
  },
  errorMessage: {
    background: '#fee2e2',
    color: '#dc2626',
    padding: 'var(--spacing-sm)',
    borderRadius: 'var(--radius-md)',
    fontSize: '0.875rem',
    textAlign: 'center',
    border: '1px solid #fecaca'
  },
  submitButton: {
    background: 'var(--Primary, #0517A2)',
    color: 'var(--white)',
    padding: 'var(--spacing-md)',
    borderRadius: 'var(--radius-md)',
    border: 'none',
    fontSize: '1rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all var(--transition-fast)',
    boxShadow: 'var(--shadow-md)'
  },
  footer: {
    marginTop: 'var(--spacing-xl)',
    textAlign: 'center'
  },
  footerText: {
    fontSize: '0.75rem',
    color: 'var(--gray)',
    margin: 0
  }
};
