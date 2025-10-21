import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from '../../firebase/config';
import { slugify } from '../../utils/slugify';

export default function InstructorsManagement() {
  const [instructorsList, setInstructorsList] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingInstructor, setEditingInstructor] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    bio: '',
    experience: '',
    specializations: '',
    socialMedia: {
      linkedin: '',
      twitter: '',
      facebook: '',
      instagram: '',
      website: ''
    },
    image: null
  });

  useEffect(() => {
    loadInstructors();
  }, []);

  const loadInstructors = async () => {
    try {
      setLoading(true);
      const instructorsSnapshot = await getDocs(collection(db, 'instructors'));
      const instructorsList = instructorsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setInstructorsList(instructorsList);
      console.log('تم تحميل المدربين:', instructorsList.length);
    } catch (error) {
      console.error('Error loading instructors:', error);
      if (error.code === 'permission-denied') {
        alert('خطأ في الأذونات: لا يمكن تحميل المدربين');
      }
      setInstructorsList([]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files[0]) {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
    } else if (name.startsWith('socialMedia.')) {
      const socialKey = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        socialMedia: {
          ...prev.socialMedia,
          [socialKey]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = '';

      // معالجة الصورة
      if (formData.image && formData.image instanceof File) {
        try {
          const imageRef = ref(storage, `instructors/${Date.now()}_${formData.image.name}`);
          await uploadBytes(imageRef, formData.image);
          imageUrl = await getDownloadURL(imageRef);
          console.log('تم رفع صورة المدرب:', imageUrl);
        } catch (error) {
          console.error('خطأ في رفع صورة المدرب:', error);
          alert('خطأ في رفع صورة المدرب، سيتم استخدام صورة افتراضية');
          imageUrl = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=300&fit=crop';
        }
      } else if (typeof formData.image === 'string' && formData.image) {
        imageUrl = formData.image;
      } else {
        imageUrl = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=300&fit=crop';
      }

      const instructorData = {
        ...formData,
        image: imageUrl,
        slug: slugify(formData.name),
        createdAt: new Date().toISOString()
      };

      if (editingInstructor) {
        // تحديث مدرب موجود
        await updateDoc(doc(db, 'instructors', editingInstructor.id), instructorData);
        alert('تم تحديث المدرب بنجاح!');
      } else {
        // إضافة مدرب جديد
        const instructorId = slugify(formData.name);
        await setDoc(doc(db, 'instructors', instructorId), {
          ...instructorData,
          id: instructorId
        });
        alert('تم إضافة المدرب بنجاح!');
      }

      setShowForm(false);
      setEditingInstructor(null);
      resetForm();
      loadInstructors();
    } catch (error) {
      console.error('Error saving instructor:', error);
      if (error.code === 'permission-denied') {
        alert('خطأ في الأذونات: تأكد من أنك مسجل دخول كإدمن');
      } else {
        alert('حدث خطأ أثناء حفظ المدرب: ' + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (instructor) => {
    setEditingInstructor(instructor);
    setFormData({
      name: instructor.name,
      title: instructor.title,
      bio: instructor.bio,
      experience: instructor.experience,
      specializations: instructor.specializations,
      socialMedia: instructor.socialMedia || {
        linkedin: '',
        twitter: '',
        facebook: '',
        instagram: '',
        website: ''
      },
      image: instructor.image
    });
    setShowForm(true);
  };

  const handleDelete = async (instructorId) => {
    if (window.confirm('هل أنت متأكد من حذف هذا المدرب؟')) {
      try {
        await deleteDoc(doc(db, 'instructors', instructorId));
        loadInstructors();
      } catch (error) {
        console.error('Error deleting instructor:', error);
        alert('حدث خطأ أثناء حذف المدرب');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      title: '',
      bio: '',
      experience: '',
      specializations: '',
      socialMedia: {
        linkedin: '',
        twitter: '',
        facebook: '',
        instagram: '',
        website: ''
      },
      image: null
    });
  };

  const testConnection = async () => {
    try {
      const testDoc = await getDocs(collection(db, 'instructors'));
      alert(`الاتصال يعمل! تم العثور على ${testDoc.docs.length} مدرب`);
    } catch (error) {
      alert('خطأ في الاتصال: ' + error.message);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>إدارة المدربين</h1>
        <div style={styles.headerButtons}>
          <button
            onClick={testConnection}
            style={styles.testButton}
          >
            اختبار الاتصال
          </button>
          <button
            onClick={() => setShowForm(true)}
            style={styles.addButton}
          >
            إضافة مدرب جديد
          </button>
        </div>
      </div>

      {showForm && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>
                {editingInstructor ? 'تعديل المدرب' : 'إضافة مدرب جديد'}
              </h2>
              <button
                onClick={() => {
                  setShowForm(false);
                  setEditingInstructor(null);
                  resetForm();
                }}
                style={styles.closeButton}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} style={styles.form}>
              <div style={styles.formGrid}>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>اسم المدرب *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    style={styles.input}
                    required
                  />
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>المنصب/التخصص *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    style={styles.input}
                    placeholder="مثال: خبير في التسويق الرقمي"
                    required
                  />
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>نبذة عن المدرب *</label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    rows="4"
                    style={styles.textarea}
                    placeholder="نبذة مختصرة عن المدرب وخبراته..."
                    required
                  />
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>الخبرات</label>
                  <textarea
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    rows="3"
                    style={styles.textarea}
                    placeholder="قائمة بالخبرات والإنجازات..."
                  />
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>التخصصات</label>
                  <input
                    type="text"
                    name="specializations"
                    value={formData.specializations}
                    onChange={handleInputChange}
                    style={styles.input}
                    placeholder="مثال: التسويق الرقمي، إدارة المشاريع، البرمجة"
                  />
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>صورة المدرب</label>
                  <input
                    type="file"
                    name="image"
                    onChange={handleInputChange}
                    accept="image/*"
                    style={styles.fileInput}
                  />
                </div>
              </div>

              <div style={styles.socialMediaSection}>
                <h3 style={styles.sectionTitle}>وسائل التواصل الاجتماعي</h3>
                <div style={styles.socialGrid}>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>LinkedIn</label>
                    <input
                      type="url"
                      name="socialMedia.linkedin"
                      value={formData.socialMedia.linkedin}
                      onChange={handleInputChange}
                      style={styles.input}
                      placeholder="https://linkedin.com/in/username"
                    />
                  </div>

                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Twitter</label>
                    <input
                      type="url"
                      name="socialMedia.twitter"
                      value={formData.socialMedia.twitter}
                      onChange={handleInputChange}
                      style={styles.input}
                      placeholder="https://twitter.com/username"
                    />
                  </div>

                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Facebook</label>
                    <input
                      type="url"
                      name="socialMedia.facebook"
                      value={formData.socialMedia.facebook}
                      onChange={handleInputChange}
                      style={styles.input}
                      placeholder="https://facebook.com/username"
                    />
                  </div>

                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Instagram</label>
                    <input
                      type="url"
                      name="socialMedia.instagram"
                      value={formData.socialMedia.instagram}
                      onChange={handleInputChange}
                      style={styles.input}
                      placeholder="https://instagram.com/username"
                    />
                  </div>

                  <div style={styles.inputGroup}>
                    <label style={styles.label}>الموقع الشخصي</label>
                    <input
                      type="url"
                      name="socialMedia.website"
                      value={formData.socialMedia.website}
                      onChange={handleInputChange}
                      style={styles.input}
                      placeholder="https://example.com"
                    />
                  </div>
                </div>
              </div>

              <div style={styles.formActions}>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingInstructor(null);
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
                  {loading ? 'جاري الحفظ...' : (editingInstructor ? 'تحديث' : 'حفظ')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div style={styles.instructorsGrid}>
        {instructorsList.map(instructor => (
          <div key={instructor.id} style={styles.instructorCard}>
            <div style={styles.cardImage}>
              <img
                src={instructor.image}
                alt={instructor.name}
                style={styles.instructorImage}
              />
            </div>
            <div style={styles.cardContent}>
              <h3 style={styles.instructorName}>{instructor.name}</h3>
              <p style={styles.instructorTitle}>{instructor.title}</p>
              <p style={styles.instructorBio}>{instructor.bio}</p>
              {instructor.specializations && (
                <p style={styles.specializations}>
                  <strong>التخصصات:</strong> {instructor.specializations}
                </p>
              )}
              
              {/* روابط السوشيال ميديا - إظهار المملوءة فقط */}
              {(instructor.socialMedia?.linkedin || instructor.socialMedia?.twitter || instructor.socialMedia?.facebook || instructor.socialMedia?.instagram || instructor.socialMedia?.website) && (
                <div style={styles.socialLinks}>
                  {instructor.socialMedia?.linkedin && (
                    <a href={instructor.socialMedia.linkedin} target="_blank" rel="noopener noreferrer" style={styles.socialLink} title="LinkedIn">
                      <svg style={styles.socialIcon} viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"/>
                      </svg>
                    </a>
                  )}
                  {instructor.socialMedia?.twitter && (
                    <a href={instructor.socialMedia.twitter} target="_blank" rel="noopener noreferrer" style={styles.socialLink} title="Twitter">
                      <svg style={styles.socialIcon} viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                    </a>
                  )}
                  {instructor.socialMedia?.facebook && (
                    <a href={instructor.socialMedia.facebook} target="_blank" rel="noopener noreferrer" style={styles.socialLink} title="Facebook">
                      <svg style={styles.socialIcon} viewBox="0 0 24 24" fill="currentColor">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </a>
                  )}
                  {instructor.socialMedia?.instagram && (
                    <a href={instructor.socialMedia.instagram} target="_blank" rel="noopener noreferrer" style={styles.socialLink} title="Instagram">
                      <svg style={styles.socialIcon} viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </a>
                  )}
                  {instructor.socialMedia?.website && (
                    <a href={instructor.socialMedia.website} target="_blank" rel="noopener noreferrer" style={styles.socialLink} title="الموقع الشخصي">
                      <svg style={styles.socialIcon} viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                      </svg>
                    </a>
                  )}
                </div>
              )}
            </div>
            <div style={styles.cardActions}>
              <button
                onClick={() => handleEdit(instructor)}
                style={styles.editButton}
              >
                تعديل
              </button>
              <button
                onClick={() => handleDelete(instructor.id)}
                style={styles.deleteButton}
              >
                حذف
              </button>
            </div>
          </div>
        ))}
      </div>

      {instructorsList.length === 0 && !loading && (
        <div style={styles.emptyState}>
          <p>لا يوجد مدربين مسجلين</p>
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
  headerButtons: {
    display: 'flex',
    gap: 'var(--spacing-md)',
    alignItems: 'center'
  },
  title: {
    fontSize: '2rem',
    fontWeight: '700',
    color: 'var(--primary)',
    margin: 0
  },
  testButton: {
    background: 'var(--secondary)',
    color: 'white',
    padding: 'var(--spacing-md) var(--spacing-xl)',
    borderRadius: 'var(--radius-full)',
    border: 'none',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all var(--transition-fast)'
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
    maxWidth: '800px',
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
  formGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
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
  fileInput: {
    padding: 'var(--spacing-sm)',
    border: '1px solid var(--gray)',
    borderRadius: 'var(--radius-md)',
    fontSize: '1rem'
  },
  socialMediaSection: {
    borderTop: '1px solid var(--gray-light)',
    paddingTop: 'var(--spacing-lg)'
  },
  sectionTitle: {
    fontSize: '1.2rem',
    fontWeight: '600',
    color: 'var(--primary)',
    marginBottom: 'var(--spacing-md)'
  },
  socialGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: 'var(--spacing-md)'
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
  instructorsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
    gap: 'var(--spacing-lg)'
  },
  instructorCard: {
    background: 'white',
    borderRadius: 'var(--radius-lg)',
    overflow: 'hidden',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    transition: 'transform var(--transition-fast)'
  },
  cardImage: {
    height: '200px',
    overflow: 'hidden'
  },
  instructorImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  cardContent: {
    padding: 'var(--spacing-lg)'
  },
  instructorName: {
    fontSize: '1.2rem',
    fontWeight: '700',
    color: 'var(--primary)',
    margin: '0 0 var(--spacing-sm) 0'
  },
  instructorTitle: {
    fontSize: '1rem',
    color: 'var(--secondary)',
    margin: '0 0 var(--spacing-sm) 0'
  },
  instructorBio: {
    fontSize: '0.9rem',
    color: 'var(--dark)',
    lineHeight: 1.5,
    margin: '0 0 var(--spacing-sm) 0'
  },
  specializations: {
    fontSize: '0.9rem',
    color: 'var(--gray)',
    margin: 0
  },
  socialLinks: {
    display: 'flex',
    gap: 'var(--spacing-sm)',
    marginTop: 'var(--spacing-sm)',
    flexWrap: 'wrap'
  },
  socialLink: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '36px',
    height: '36px',
    borderRadius: '8px',
    background: 'var(--primary)',
    color: 'white',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
    fontSize: '1rem',
    boxShadow: '0 2px 8px rgba(5, 23, 162, 0.3)',
    '&:hover': {
      transform: 'translateY(-2px) scale(1.05)',
      boxShadow: '0 4px 12px rgba(5, 23, 162, 0.4)',
      background: 'var(--secondary)'
    }
  },
  socialIcon: {
    width: '16px',
    height: '16px',
    fill: 'currentColor'
  },
  cardActions: {
    padding: 'var(--spacing-md) var(--spacing-lg)',
    display: 'flex',
    gap: 'var(--spacing-sm)',
    borderTop: '1px solid var(--gray-light)'
  },
  editButton: {
    flex: 1,
    padding: 'var(--spacing-sm)',
    border: '1px solid var(--primary)',
    borderRadius: 'var(--radius-md)',
    background: 'white',
    color: 'var(--primary)',
    fontSize: '0.9rem',
    cursor: 'pointer',
    transition: 'all var(--transition-fast)'
  },
  deleteButton: {
    flex: 1,
    padding: 'var(--spacing-sm)',
    border: '1px solid var(--danger)',
    borderRadius: 'var(--radius-md)',
    background: 'white',
    color: 'var(--danger)',
    fontSize: '0.9rem',
    cursor: 'pointer',
    transition: 'all var(--transition-fast)'
  },
  emptyState: {
    textAlign: 'center',
    padding: 'var(--spacing-2xl)',
    color: 'var(--gray)',
    fontSize: '1.1rem'
  }
};
