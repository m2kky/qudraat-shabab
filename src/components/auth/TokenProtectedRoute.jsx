import React from 'react';
import { Navigate } from 'react-router-dom';
import { useTokenAuth } from './TokenAuthProvider';

export default function TokenProtectedRoute({ children, requiredPermission = null }) {
  const { isAuthenticated, loading, hasPermission, tokenData } = useTokenAuth();

  // عرض loading أثناء التحقق من الـ Token
  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.loadingSpinner}></div>
        <p style={styles.loadingText}>جار التحقق من الصلاحيات...</p>
      </div>
    );
  }

  // إذا لم يكن مسجل دخول، توجيه لصفحة تسجيل الدخول
  if (!isAuthenticated) {
    return <Navigate to="/token-login" replace />;
  }

  // إذا كان مطلوب صلاحية معينة والـ Token لا يملكها
  if (requiredPermission && !hasPermission(requiredPermission)) {
    return (
      <div style={styles.errorContainer}>
        <div style={styles.errorCard}>
          <h2 style={styles.errorTitle}>غير مصرح لك بالوصول</h2>
          <p style={styles.errorMessage}>
            لا تملك الصلاحية المطلوبة للوصول إلى هذه الصفحة.
          </p>
          <p style={styles.tokenInfo}>
            الـ Token الحالي: <code style={styles.tokenCode}>{tokenData?.name}</code>
          </p>
          <p style={styles.permissionsInfo}>
            الصلاحيات المتاحة: {tokenData?.permissions?.join(', ')}
          </p>
          <button
            onClick={() => window.history.back()}
            style={styles.backButton}
          >
            العودة
          </button>
        </div>
      </div>
    );
  }

  // إذا كان كل شيء صحيح، عرض المحتوى
  return children;
}

const styles = {
  loadingContainer: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'var(--gray-light)'
  },
  loadingSpinner: {
    width: '40px',
    height: '40px',
    border: '4px solid var(--gray)',
    borderTop: '4px solid var(--primary)',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    marginBottom: 'var(--spacing-lg)'
  },
  loadingText: {
    fontSize: '1.1rem',
    color: 'var(--gray)',
    margin: 0
  },
  errorContainer: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'var(--gray-light)',
    padding: 'var(--spacing-lg)'
  },
  errorCard: {
    background: 'white',
    borderRadius: 'var(--radius-lg)',
    padding: 'var(--spacing-2xl)',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    maxWidth: '500px',
    width: '100%'
  },
  errorTitle: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: 'var(--danger)',
    margin: '0 0 var(--spacing-lg) 0'
  },
  errorMessage: {
    fontSize: '1rem',
    color: 'var(--dark)',
    margin: '0 0 var(--spacing-lg) 0',
    lineHeight: 1.5
  },
  tokenInfo: {
    fontSize: '0.9rem',
    color: 'var(--gray)',
    margin: '0 0 var(--spacing-sm) 0'
  },
  tokenCode: {
    background: 'var(--gray-light)',
    padding: 'var(--spacing-xs) var(--spacing-sm)',
    borderRadius: 'var(--radius-sm)',
    fontFamily: 'monospace',
    fontSize: '0.8rem'
  },
  permissionsInfo: {
    fontSize: '0.9rem',
    color: 'var(--gray)',
    margin: '0 0 var(--spacing-xl) 0'
  },
  backButton: {
    background: 'var(--primary)',
    color: 'white',
    padding: 'var(--spacing-md) var(--spacing-xl)',
    borderRadius: 'var(--radius-md)',
    border: 'none',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all var(--transition-fast)'
  }
};
