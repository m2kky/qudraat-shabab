import React, { useState, useEffect } from 'react';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { stats } from '../../data/stats';

export default function StatsManagement() {
  const [statsData, setStatsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingStat, setEditingStat] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    value: '',
    change: '',
    icon: '',
    color: ''
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      setLoading(true);
      // للبداية، استخدم البيانات المحلية
      setStatsData(stats);
    } catch (error) {
      console.error('Error loading stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const statsDoc = {
        ...formData,
        updatedAt: new Date().toISOString()
      };

      if (editingStat) {
        // تحديث إحصائية موجودة
        await updateDoc(doc(db, 'stats', editingStat.id), statsDoc);
      } else {
        // إضافة إحصائية جديدة
        await updateDoc(doc(db, 'stats', 'main'), {
          [formData.title]: statsDoc
        });
      }

      setShowForm(false);
      setEditingStat(null);
      resetForm();
      loadStats();
    } catch (error) {
      console.error('Error saving stats:', error);
      alert('حدث خطأ أثناء حفظ الإحصائية');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (stat) => {
    setEditingStat(stat);
    setFormData({
      title: stat.title,
      value: stat.value,
      change: stat.change,
      icon: stat.icon,
      color: stat.color
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      value: '',
      change: '',
      icon: '',
      color: ''
    });
  };

  const predefinedIcons = ['👥', '📚', '⭐', '💰', '🎯', '📊', '🚀', '💡', '🏆', '📈'];
  const predefinedColors = [
    'var(--primary)',
    'var(--secondary)',
    'var(--success)',
    'var(--warning)',
    'var(--error)',
    '#8b5cf6',
    '#06b6d4',
    '#f59e0b',
    '#ef4444',
    '#10b981'
  ];

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>إدارة الإحصائيات</h2>
        <button 
          onClick={() => setShowForm(true)}
          style={styles.addButton}
        >
          + إضافة إحصائية جديدة
        </button>
      </div>

      {showForm && (
        <div style={styles.formOverlay}>
          <div style={styles.formCard}>
            <div style={styles.formHeader}>
              <h3 style={styles.formTitle}>
                {editingStat ? 'تعديل الإحصائية' : 'إضافة إحصائية جديدة'}
              </h3>
              <button 
                onClick={() => {
                  setShowForm(false);
                  setEditingStat(null);
                  resetForm();
                }}
                style={styles.closeButton}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} style={styles.form} dir="rtl">
              <div style={styles.formGrid}>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>عنوان الإحصائية *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="مثال: إجمالي المتدربين"
                    style={styles.input}
                    required
                  />
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>القيمة *</label>
                  <input
                    type="text"
                    name="value"
                    value={formData.value}
                    onChange={handleInputChange}
                    placeholder="مثال: 1,247"
                    style={styles.input}
                    required
                  />
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>التغيير</label>
                  <input
                    type="text"
                    name="change"
                    value={formData.change}
                    onChange={handleInputChange}
                    placeholder="مثال: +12%"
                    style={styles.input}
                  />
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>الأيقونة</label>
                  <div style={styles.iconSelector}>
                    {predefinedIcons.map(icon => (
                      <button
                        key={icon}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, icon }))}
                        style={{
                          ...styles.iconButton,
                          ...(formData.icon === icon ? styles.iconButtonActive : {})
                        }}
                      >
                        {icon}
                      </button>
                    ))}
                  </div>
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>اللون</label>
                  <div style={styles.colorSelector}>
                    {predefinedColors.map(color => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, color }))}
                        style={{
                          ...styles.colorButton,
                          background: color,
                          ...(formData.color === color ? styles.colorButtonActive : {})
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div style={styles.preview}>
                <h4 style={styles.previewTitle}>معاينة الإحصائية:</h4>
                <div style={styles.statPreview}>
                  <div style={{...styles.statIcon, background: formData.color || 'var(--primary)'}}>
                    {formData.icon || '📊'}
                  </div>
                  <div style={styles.statContent}>
                    <h3 style={styles.statValue}>{formData.value || 'القيمة'}</h3>
                    <p style={styles.statTitle}>{formData.title || 'العنوان'}</p>
                    <span style={styles.statChange}>{formData.change || '+0%'}</span>
                  </div>
                </div>
              </div>

              <div style={styles.formActions}>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingStat(null);
                    resetForm();
                  }}
                  style={styles.cancelButton}
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  style={styles.saveButton}
                  disabled={loading}
                >
                  {loading ? 'جاري الحفظ...' : 'حفظ'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div style={styles.statsGrid}>
        {loading ? (
          <div style={styles.loading}>جاري التحميل...</div>
        ) : (
          statsData.map((stat, index) => (
            <div key={index} style={styles.statCard}>
              <div style={{...styles.statIcon, background: stat.color}}>
                {stat.icon}
              </div>
              <div style={styles.statContent}>
                <h3 style={styles.statValue}>{stat.value}</h3>
                <p style={styles.statTitle}>{stat.title}</p>
                <span style={styles.statChange}>{stat.change}</span>
              </div>
              <div style={styles.statActions}>
                <button
                  onClick={() => handleEdit(stat)}
                  style={styles.editButton}
                >
                  تعديل
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: 'var(--spacing-lg)'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 'var(--spacing-xl)',
    flexWrap: 'wrap',
    gap: 'var(--spacing-md)'
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: 700,
    color: 'var(--Primary, #0517A2)',
    margin: 0
  },
  addButton: {
    background: 'var(--Primary, #0517A2)',
    color: 'var(--white)',
    padding: 'var(--spacing-md) var(--spacing-lg)',
    borderRadius: 'var(--radius-md)',
    border: 'none',
    fontSize: '1rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all var(--transition-fast)'
  },
  formOverlay: {
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
  formCard: {
    background: 'var(--white)',
    borderRadius: 'var(--radius-xl)',
    boxShadow: 'var(--shadow-xl)',
    maxWidth: '600px',
    width: '100%',
    maxHeight: '90vh',
    overflow: 'auto'
  },
  formHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 'var(--spacing-xl)',
    borderBottom: '1px solid var(--gray-light)'
  },
  formTitle: {
    fontSize: '1.25rem',
    fontWeight: 700,
    color: 'var(--Primary, #0517A2)',
    margin: 0
  },
  closeButton: {
    background: 'none',
    border: 'none',
    fontSize: '1.5rem',
    cursor: 'pointer',
    color: 'var(--gray)'
  },
  form: {
    padding: 'var(--spacing-xl)'
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: 'var(--spacing-lg)',
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
  iconSelector: {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gap: 'var(--spacing-sm)'
  },
  iconButton: {
    padding: 'var(--spacing-md)',
    borderRadius: 'var(--radius-md)',
    border: '1px solid var(--gray-light)',
    background: 'var(--white)',
    fontSize: '1.5rem',
    cursor: 'pointer',
    transition: 'all var(--transition-fast)'
  },
  iconButtonActive: {
    borderColor: 'var(--Primary, #0517A2)',
    background: 'var(--light)'
  },
  colorSelector: {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gap: 'var(--spacing-sm)'
  },
  colorButton: {
    width: '40px',
    height: '40px',
    borderRadius: 'var(--radius-md)',
    border: '2px solid transparent',
    cursor: 'pointer',
    transition: 'all var(--transition-fast)'
  },
  colorButtonActive: {
    borderColor: 'var(--dark)',
    transform: 'scale(1.1)'
  },
  preview: {
    background: 'var(--light)',
    padding: 'var(--spacing-lg)',
    borderRadius: 'var(--radius-lg)',
    marginBottom: 'var(--spacing-xl)'
  },
  previewTitle: {
    fontSize: '1rem',
    fontWeight: 600,
    color: 'var(--dark)',
    marginBottom: 'var(--spacing-md)'
  },
  statPreview: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-lg)',
    background: 'var(--white)',
    padding: 'var(--spacing-lg)',
    borderRadius: 'var(--radius-lg)',
    boxShadow: 'var(--shadow-sm)'
  },
  statIcon: {
    width: '60px',
    height: '60px',
    borderRadius: 'var(--radius-full)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.5rem',
    color: 'var(--white)'
  },
  statContent: {
    flex: 1
  },
  statValue: {
    fontSize: '1.75rem',
    fontWeight: 900,
    color: 'var(--dark)',
    marginBottom: 'var(--spacing-xs)'
  },
  statTitle: {
    fontSize: '0.875rem',
    color: 'var(--gray)',
    marginBottom: 'var(--spacing-xs)'
  },
  statChange: {
    fontSize: '0.75rem',
    color: 'var(--success)',
    fontWeight: 600
  },
  formActions: {
    display: 'flex',
    gap: 'var(--spacing-md)',
    justifyContent: 'flex-end'
  },
  cancelButton: {
    background: 'var(--gray-light)',
    color: 'var(--dark)',
    padding: 'var(--spacing-md) var(--spacing-lg)',
    borderRadius: 'var(--radius-md)',
    border: 'none',
    fontSize: '1rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all var(--transition-fast)'
  },
  saveButton: {
    background: 'var(--Primary, #0517A2)',
    color: 'var(--white)',
    padding: 'var(--spacing-md) var(--spacing-lg)',
    borderRadius: 'var(--radius-md)',
    border: 'none',
    fontSize: '1rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all var(--transition-fast)'
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: 'var(--spacing-lg)'
  },
  loading: {
    textAlign: 'center',
    padding: 'var(--spacing-2xl)',
    color: 'var(--gray)',
    fontSize: '1.125rem'
  },
  statCard: {
    background: 'var(--white)',
    padding: 'var(--spacing-xl)',
    borderRadius: 'var(--radius-xl)',
    boxShadow: 'var(--shadow-lg)',
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-lg)',
    transition: 'transform var(--transition-normal)',
    position: 'relative'
  },
  statActions: {
    position: 'absolute',
    top: 'var(--spacing-md)',
    left: 'var(--spacing-md)'
  },
  editButton: {
    background: 'var(--Primary, #0517A2)',
    color: 'var(--white)',
    padding: 'var(--spacing-xs) var(--spacing-sm)',
    borderRadius: 'var(--radius-md)',
    border: 'none',
    fontSize: '0.75rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all var(--transition-fast)'
  }
};
