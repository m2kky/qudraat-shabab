import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { generateAccessToken, createTokenWithMetadata, validateTokenStrength } from '../../utils/tokenGenerator';

export default function TokensManagement() {
  const [tokensList, setTokensList] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingToken, setEditingToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    permissions: ['read'],
    expiresIn: null, // null = لا ينتهي
    isActive: true
  });

  useEffect(() => {
    loadTokens();
  }, []);

  const loadTokens = async () => {
    try {
      setLoading(true);
      const tokensSnapshot = await getDocs(collection(db, 'accessTokens'));
      const tokensList = tokensSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setTokensList(tokensList);
      console.log('تم تحميل Tokens:', tokensList.length);
    } catch (error) {
      console.error('Error loading tokens:', error);
      if (error.code === 'permission-denied') {
        alert('خطأ في الأذونات: لا يمكن تحميل Tokens');
      }
      setTokensList([]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name === 'permissions') {
      const permission = value;
      setFormData(prev => ({
        ...prev,
        permissions: prev.permissions.includes(permission)
          ? prev.permissions.filter(p => p !== permission)
          : [...prev.permissions, permission]
      }));
    } else if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // إنشاء Token جديد
      const tokenData = createTokenWithMetadata(
        formData.permissions,
        formData.expiresIn ? parseInt(formData.expiresIn) * 24 * 60 * 60 * 1000 : null
      );

      const tokenDocument = {
        ...tokenData,
        name: formData.name,
        description: formData.description,
        isActive: formData.isActive,
        createdBy: 'master-user', // User Master
        createdAt: serverTimestamp()
      };

      if (editingToken) {
        // تحديث Token موجود
        await updateDoc(doc(db, 'accessTokens', editingToken.id), {
          name: formData.name,
          description: formData.description,
          permissions: formData.permissions,
          isActive: formData.isActive,
          updatedAt: serverTimestamp()
        });
        alert('تم تحديث الـ Token بنجاح!');
      } else {
        // إضافة Token جديد
        const docRef = await addDoc(collection(db, 'accessTokens'), tokenDocument);
        alert(`تم إنشاء الـ Token بنجاح!\n\nToken: ${tokenData.token}\n\nاحفظه في مكان آمن!`);
      }

      setShowForm(false);
      setEditingToken(null);
      resetForm();
      loadTokens();
    } catch (error) {
      console.error('Error saving token:', error);
      if (error.code === 'permission-denied') {
        alert('خطأ في الأذونات: تأكد من تحديث قواعد Firestore');
      } else {
        alert('حدث خطأ أثناء حفظ الـ Token: ' + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (token) => {
    setEditingToken(token);
    setFormData({
      name: token.name || '',
      description: token.description || '',
      permissions: token.permissions || ['read'],
      expiresIn: token.expiresIn ? Math.floor((new Date(token.expiresAt) - new Date()) / (24 * 60 * 60 * 1000)) : null,
      isActive: token.isActive
    });
    setShowForm(true);
  };

  const handleDelete = async (tokenId) => {
    if (window.confirm('هل أنت متأكد من حذف هذا الـ Token؟')) {
      try {
        await deleteDoc(doc(db, 'accessTokens', tokenId));
        loadTokens();
        alert('تم حذف الـ Token بنجاح!');
      } catch (error) {
        console.error('Error deleting token:', error);
        alert('حدث خطأ أثناء حذف الـ Token');
      }
    }
  };

  const toggleTokenStatus = async (token) => {
    try {
      await updateDoc(doc(db, 'accessTokens', token.id), {
        isActive: !token.isActive,
        updatedAt: serverTimestamp()
      });
      loadTokens();
    } catch (error) {
      console.error('Error updating token status:', error);
      alert('حدث خطأ أثناء تحديث حالة الـ Token');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      permissions: ['read'],
      expiresIn: null,
      isActive: true
    });
  };

  const availablePermissions = [
    { value: 'read', label: 'قراءة البيانات' },
    { value: 'write', label: 'كتابة البيانات' },
    { value: 'delete', label: 'حذف البيانات' },
    { value: 'admin', label: 'صلاحيات إدارية كاملة' }
  ];

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>إدارة Access Tokens</h1>
        <button
          onClick={() => setShowForm(true)}
          style={styles.addButton}
        >
          إنشاء Token جديد
        </button>
      </div>

      {showForm && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>
                {editingToken ? 'تعديل Token' : 'إنشاء Token جديد'}
              </h2>
              <button
                onClick={() => {
                  setShowForm(false);
                  setEditingToken(null);
                  resetForm();
                }}
                style={styles.closeButton}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} style={styles.form}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>اسم الـ Token *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  style={styles.input}
                  placeholder="مثال: Admin Token, Editor Token"
                  required
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>وصف الـ Token</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="3"
                  style={styles.textarea}
                  placeholder="وصف استخدام هذا الـ Token..."
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>الصلاحيات *</label>
                <div style={styles.permissionsGrid}>
                  {availablePermissions.map(permission => (
                    <label key={permission.value} style={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        name="permissions"
                        value={permission.value}
                        checked={formData.permissions.includes(permission.value)}
                        onChange={handleInputChange}
                        style={styles.checkbox}
                      />
                      {permission.label}
                    </label>
                  ))}
                </div>
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>مدة الصلاحية (أيام)</label>
                <input
                  type="number"
                  name="expiresIn"
                  value={formData.expiresIn || ''}
                  onChange={handleInputChange}
                  style={styles.input}
                  placeholder="اتركه فارغاً لعدم انتهاء الصلاحية"
                  min="1"
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleInputChange}
                    style={styles.checkbox}
                  />
                  Token نشط
                </label>
              </div>

              <div style={styles.formActions}>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingToken(null);
                    resetForm();
                  }}
                  style={styles.cancelButton}
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  style={styles.submitButton}
                >
                  {loading ? 'جاري الحفظ...' : (editingToken ? 'تحديث' : 'إنشاء')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div style={styles.tokensGrid}>
        {tokensList.map(token => (
          <div key={token.id} style={styles.tokenCard}>
            <div style={styles.cardHeader}>
              <h3 style={styles.tokenName}>{token.name}</h3>
              <div style={styles.tokenStatus}>
                <span style={{
                  ...styles.statusBadge,
                  background: token.isActive ? 'var(--success)' : 'var(--danger)'
                }}>
                  {token.isActive ? 'نشط' : 'معطل'}
                </span>
              </div>
            </div>
            
            <div style={styles.cardContent}>
              {token.description && (
                <p style={styles.tokenDescription}>{token.description}</p>
              )}
              
              <div style={styles.tokenInfo}>
                <p><strong>الصلاحيات:</strong> {token.permissions.join(', ')}</p>
                <p><strong>تاريخ الإنشاء:</strong> {new Date(token.createdAt?.toDate?.() || token.createdAt).toLocaleDateString('ar-EG')}</p>
                {token.expiresAt && (
                  <p><strong>ينتهي في:</strong> {new Date(token.expiresAt).toLocaleDateString('ar-EG')}</p>
                )}
                <p><strong>عدد الاستخدامات:</strong> {token.usageCount || 0}</p>
              </div>

              {!editingToken && (
                <div style={styles.tokenValue}>
                  <label style={styles.label}>Access Token:</label>
                  <div style={styles.tokenDisplay}>
                    <code style={styles.tokenCode}>{token.token}</code>
                    <button
                      onClick={() => navigator.clipboard.writeText(token.token)}
                      style={styles.copyButton}
                      title="نسخ الـ Token"
                    >
                      📋
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            <div style={styles.cardActions}>
              <button
                onClick={() => toggleTokenStatus(token)}
                style={{
                  ...styles.actionButton,
                  background: token.isActive ? 'var(--warning)' : 'var(--success)'
                }}
              >
                {token.isActive ? 'تعطيل' : 'تفعيل'}
              </button>
              <button
                onClick={() => handleEdit(token)}
                style={{...styles.actionButton, background: 'var(--primary)'}}
              >
                تعديل
              </button>
              <button
                onClick={() => handleDelete(token.id)}
                style={{...styles.actionButton, background: 'var(--danger)'}}
              >
                حذف
              </button>
            </div>
          </div>
        ))}
      </div>

      {tokensList.length === 0 && !loading && (
        <div style={styles.emptyState}>
          <p>لا يوجد Access Tokens</p>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: 'var(--spacing-xl)',
    maxWidth: '1200px',
    margin: '0 auto'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 'var(--spacing-xl)'
  },
  title: {
    fontSize: '2rem',
    fontWeight: '700',
    color: 'var(--primary)',
    margin: 0
  },
  addButton: {
    background: 'var(--primary)',
    color: 'white',
    padding: 'var(--spacing-md) var(--spacing-xl)',
    borderRadius: 'var(--radius-full)',
    border: 'none',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all var(--transition-fast)'
  },
  modal: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000
  },
  modalContent: {
    background: 'white',
    borderRadius: 'var(--radius-lg)',
    padding: 'var(--spacing-xl)',
    maxWidth: '600px',
    width: '90%',
    maxHeight: '90vh',
    overflowY: 'auto'
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 'var(--spacing-xl)'
  },
  modalTitle: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: 'var(--primary)',
    margin: 0
  },
  closeButton: {
    background: 'none',
    border: 'none',
    fontSize: '2rem',
    cursor: 'pointer',
    color: 'var(--gray)'
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
    border: '1px solid var(--gray)',
    borderRadius: 'var(--radius-md)',
    fontSize: '1rem',
    transition: 'border-color var(--transition-fast)'
  },
  textarea: {
    padding: 'var(--spacing-md)',
    border: '1px solid var(--gray)',
    borderRadius: 'var(--radius-md)',
    fontSize: '1rem',
    resize: 'vertical',
    fontFamily: 'inherit'
  },
  permissionsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: 'var(--spacing-sm)'
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-sm)',
    fontSize: '1rem',
    cursor: 'pointer'
  },
  checkbox: {
    width: '18px',
    height: '18px'
  },
  formActions: {
    display: 'flex',
    gap: 'var(--spacing-md)',
    justifyContent: 'flex-end',
    marginTop: 'var(--spacing-lg)'
  },
  cancelButton: {
    padding: 'var(--spacing-md) var(--spacing-xl)',
    border: '1px solid var(--gray)',
    borderRadius: 'var(--radius-md)',
    background: 'white',
    color: 'var(--dark)',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'all var(--transition-fast)'
  },
  submitButton: {
    padding: 'var(--spacing-md) var(--spacing-xl)',
    border: 'none',
    borderRadius: 'var(--radius-md)',
    background: 'var(--primary)',
    color: 'white',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all var(--transition-fast)'
  },
  tokensGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
    gap: 'var(--spacing-lg)'
  },
  tokenCard: {
    background: 'white',
    borderRadius: 'var(--radius-lg)',
    padding: 'var(--spacing-lg)',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    border: '1px solid var(--gray-light)'
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 'var(--spacing-md)'
  },
  tokenName: {
    fontSize: '1.2rem',
    fontWeight: '700',
    color: 'var(--primary)',
    margin: 0
  },
  tokenStatus: {
    display: 'flex',
    alignItems: 'center'
  },
  statusBadge: {
    padding: 'var(--spacing-xs) var(--spacing-sm)',
    borderRadius: 'var(--radius-full)',
    fontSize: '0.8rem',
    fontWeight: '600',
    color: 'white'
  },
  cardContent: {
    marginBottom: 'var(--spacing-lg)'
  },
  tokenDescription: {
    fontSize: '0.9rem',
    color: 'var(--gray)',
    margin: '0 0 var(--spacing-md) 0',
    lineHeight: 1.5
  },
  tokenInfo: {
    fontSize: '0.9rem',
    color: 'var(--dark)',
    marginBottom: 'var(--spacing-md)'
  },
  tokenValue: {
    marginTop: 'var(--spacing-md)'
  },
  tokenDisplay: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-sm)',
    background: 'var(--gray-light)',
    padding: 'var(--spacing-sm)',
    borderRadius: 'var(--radius-md)',
    marginTop: 'var(--spacing-xs)'
  },
  tokenCode: {
    flex: 1,
    fontSize: '0.8rem',
    fontFamily: 'monospace',
    background: 'none',
    border: 'none',
    color: 'var(--dark)',
    wordBreak: 'break-all'
  },
  copyButton: {
    background: 'var(--primary)',
    color: 'white',
    border: 'none',
    borderRadius: 'var(--radius-sm)',
    padding: 'var(--spacing-xs)',
    cursor: 'pointer',
    fontSize: '0.8rem'
  },
  cardActions: {
    display: 'flex',
    gap: 'var(--spacing-sm)',
    flexWrap: 'wrap'
  },
  actionButton: {
    flex: 1,
    padding: 'var(--spacing-sm)',
    border: 'none',
    borderRadius: 'var(--radius-md)',
    color: 'white',
    fontSize: '0.9rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all var(--transition-fast)',
    minWidth: '80px'
  },
  emptyState: {
    textAlign: 'center',
    padding: 'var(--spacing-2xl)',
    color: 'var(--gray)',
    fontSize: '1.1rem'
  }
};
