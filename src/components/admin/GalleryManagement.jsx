import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from '../../firebase/config';
import { galleryItems, galleryCategories } from '../../data/gallery';

export default function GalleryManagement() {
  const [galleryList, setGalleryList] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    image: null
  });

  useEffect(() => {
    loadGallery();
  }, []);

  const loadGallery = async () => {
    try {
      setLoading(true);
      // للبداية، استخدم البيانات المحلية
      setGalleryList(galleryItems);
    } catch (error) {
      console.error('Error loading gallery:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files[0]) {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = '';

      // رفع الصورة إذا كانت موجودة
      if (formData.image) {
        const imageRef = ref(storage, `gallery/${Date.now()}_${formData.image.name}`);
        await uploadBytes(imageRef, formData.image);
        imageUrl = await getDownloadURL(imageRef);
      }

      const galleryData = {
        ...formData,
        image: imageUrl || formData.image,
        date: new Date().toISOString().split('T')[0]
      };

      if (editingItem) {
        // تحديث عنصر موجود
        await updateDoc(doc(db, 'gallery', editingItem.id), galleryData);
      } else {
        // إضافة عنصر جديد
        await addDoc(collection(db, 'gallery'), galleryData);
      }

      setShowForm(false);
      setEditingItem(null);
      resetForm();
      loadGallery();
    } catch (error) {
      console.error('Error saving gallery item:', error);
      alert('حدث خطأ أثناء حفظ العنصر');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      description: item.description,
      category: item.category,
      image: item.image
    });
    setShowForm(true);
  };

  const handleDelete = async (itemId) => {
    if (window.confirm('هل أنت متأكد من حذف هذا العنصر؟')) {
      try {
        await deleteDoc(doc(db, 'gallery', itemId));
        loadGallery();
      } catch (error) {
        console.error('Error deleting gallery item:', error);
        alert('حدث خطأ أثناء حذف العنصر');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category: '',
      image: null
    });
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>إدارة المعرض</h2>
        <button 
          onClick={() => setShowForm(true)}
          style={styles.addButton}
        >
          + إضافة صورة جديدة
        </button>
      </div>

      {showForm && (
        <div style={styles.formOverlay}>
          <div style={styles.formCard}>
            <div style={styles.formHeader}>
              <h3 style={styles.formTitle}>
                {editingItem ? 'تعديل العنصر' : 'إضافة عنصر جديد'}
              </h3>
              <button 
                onClick={() => {
                  setShowForm(false);
                  setEditingItem(null);
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
                  <label style={styles.label}>عنوان الصورة *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    style={styles.input}
                    required
                  />
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>الفئة *</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    style={styles.input}
                    required
                  >
                    <option value="">اختر الفئة</option>
                    {galleryCategories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>وصف الصورة</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="3"
                    style={styles.textarea}
                  />
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>الصورة *</label>
                  <input
                    type="file"
                    name="image"
                    onChange={handleInputChange}
                    accept="image/*"
                    style={styles.fileInput}
                    required={!editingItem}
                  />
                </div>
              </div>

              <div style={styles.formActions}>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingItem(null);
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

      <div style={styles.galleryGrid}>
        {loading ? (
          <div style={styles.loading}>جاري التحميل...</div>
        ) : (
          galleryList.map(item => (
            <div key={item.id} style={styles.galleryItem}>
              <div style={styles.imageContainer}>
                <img src={item.image} alt={item.title} style={styles.image} />
                <div style={styles.overlay}>
                  <button
                    onClick={() => handleEdit(item)}
                    style={styles.editButton}
                  >
                    تعديل
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    style={styles.deleteButton}
                  >
                    حذف
                  </button>
                </div>
              </div>
              <div style={styles.itemInfo}>
                <h3 style={styles.itemTitle}>{item.title}</h3>
                <p style={styles.itemCategory}>{item.category}</p>
                {item.description && (
                  <p style={styles.itemDescription}>{item.description}</p>
                )}
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
  textarea: {
    padding: 'var(--spacing-sm) var(--spacing-md)',
    borderRadius: 'var(--radius-md)',
    border: '1px solid var(--gray-light)',
    background: 'var(--white)',
    fontSize: '1rem',
    color: 'var(--dark)',
    outline: 'none',
    transition: 'border-color var(--transition-fast)',
    fontFamily: 'Tajawal, sans-serif',
    resize: 'vertical'
  },
  fileInput: {
    padding: 'var(--spacing-sm)',
    borderRadius: 'var(--radius-md)',
    border: '1px solid var(--gray-light)',
    background: 'var(--white)',
    fontSize: '1rem',
    color: 'var(--dark)',
    outline: 'none'
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
  galleryGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: 'var(--spacing-lg)'
  },
  loading: {
    textAlign: 'center',
    padding: 'var(--spacing-2xl)',
    color: 'var(--gray)',
    fontSize: '1.125rem'
  },
  galleryItem: {
    background: 'var(--white)',
    borderRadius: 'var(--radius-lg)',
    boxShadow: 'var(--shadow-md)',
    overflow: 'hidden',
    transition: 'transform var(--transition-fast)'
  },
  imageContainer: {
    position: 'relative',
    height: '200px',
    overflow: 'hidden'
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'var(--spacing-sm)',
    opacity: 0,
    transition: 'opacity var(--transition-fast)'
  },
  editButton: {
    background: 'var(--Primary, #0517A2)',
    color: 'var(--white)',
    padding: 'var(--spacing-sm) var(--spacing-md)',
    borderRadius: 'var(--radius-md)',
    border: 'none',
    fontSize: '0.875rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all var(--transition-fast)'
  },
  deleteButton: {
    background: 'var(--error)',
    color: 'var(--white)',
    padding: 'var(--spacing-sm) var(--spacing-md)',
    borderRadius: 'var(--radius-md)',
    border: 'none',
    fontSize: '0.875rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all var(--transition-fast)'
  },
  itemInfo: {
    padding: 'var(--spacing-lg)'
  },
  itemTitle: {
    fontSize: '1rem',
    fontWeight: 700,
    color: 'var(--dark)',
    marginBottom: 'var(--spacing-xs)'
  },
  itemCategory: {
    fontSize: '0.875rem',
    color: 'var(--Primary, #0517A2)',
    fontWeight: 600,
    marginBottom: 'var(--spacing-sm)'
  },
  itemDescription: {
    fontSize: '0.875rem',
    color: 'var(--gray)',
    lineHeight: 1.5
  }
};
