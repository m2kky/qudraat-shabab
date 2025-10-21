import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTokenAuth } from '../components/auth/TokenAuthProvider';

export default function TokenLogin() {
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { loginWithToken } = useTokenAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await loginWithToken(token.trim());
      
      if (result.success) {
        navigate('/dashboard');
      } else {
        setError(result.error || 'خطأ في تسجيل الدخول');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('حدث خطأ غير متوقع');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.loginCard}>
        <div style={styles.header}>
          <h1 style={styles.title}>تسجيل الدخول</h1>
          <p style={styles.subtitle}>أدخل Access Token للوصول إلى لوحة التحكم</p>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Access Token</label>
            <input
              type="text"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              style={styles.input}
              placeholder="أدخل الـ Token هنا..."
              required
              autoComplete="off"
            />
          </div>

          {error && (
            <div style={styles.errorMessage}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !token.trim()}
            style={{
              ...styles.submitButton,
              opacity: loading || !token.trim() ? 0.6 : 1
            }}
          >
            {loading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
          </button>
        </form>

        <div style={styles.footer}>
          <p style={styles.helpText}>
            إذا لم يكن لديك Access Token، تواصل مع المدير
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
    background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)',
    padding: 'var(--spacing-lg)'
  },
  loginCard: {
    background: 'white',
    borderRadius: 'var(--radius-xl)',
    padding: 'var(--spacing-2xl)',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px'
  },
  header: {
    textAlign: 'center',
    marginBottom: 'var(--spacing-2xl)'
  },
  title: {
    fontSize: '2rem',
    fontWeight: '700',
    color: 'var(--primary)',
    margin: '0 0 var(--spacing-sm) 0'
  },
  subtitle: {
    fontSize: '1rem',
    color: 'var(--gray)',
    margin: 0,
    lineHeight: 1.5
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--spacing-lg)'
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--spacing-sm)'
  },
  label: {
    fontSize: '1rem',
    fontWeight: '600',
    color: 'var(--dark)'
  },
  input: {
    padding: 'var(--spacing-md)',
    border: '2px solid var(--gray-light)',
    borderRadius: 'var(--radius-md)',
    fontSize: '1rem',
    transition: 'border-color var(--transition-fast)',
    fontFamily: 'monospace',
    letterSpacing: '0.5px'
  },
  errorMessage: {
    background: 'var(--danger-light)',
    color: 'var(--danger)',
    padding: 'var(--spacing-md)',
    borderRadius: 'var(--radius-md)',
    fontSize: '0.9rem',
    border: '1px solid var(--danger)'
  },
  submitButton: {
    background: 'var(--primary)',
    color: 'white',
    padding: 'var(--spacing-md)',
    borderRadius: 'var(--radius-md)',
    border: 'none',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all var(--transition-fast)'
  },
  footer: {
    marginTop: 'var(--spacing-xl)',
    textAlign: 'center'
  },
  helpText: {
    fontSize: '0.9rem',
    color: 'var(--gray)',
    margin: 0
  }
};
