import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from '../../firebase/config';
import { slugify } from '../../utils/slugify';
import { events } from '../../data/events';

export default function EventsManagement() {
  const [eventsList, setEventsList] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    date: '',
    time: '',
    category: '',
    duration: '',
    level: '',
    maxParticipants: '',
    instructor: '',
    instructorBio: '',
    image: null,
    instructorImage: null
  });

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      setLoading(true);
      // للبداية، استخدم البيانات المحلية
      setEventsList(events);
    } catch (error) {
      console.error('Error loading events:', error);
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
      let instructorImageUrl = '';

      // رفع الصور إذا كانت موجودة
      if (formData.image) {
        const imageRef = ref(storage, `events/${Date.now()}_${formData.image.name}`);
        await uploadBytes(imageRef, formData.image);
        imageUrl = await getDownloadURL(imageRef);
      }

      if (formData.instructorImage) {
        const instructorImageRef = ref(storage, `instructors/${Date.now()}_${formData.instructorImage.name}`);
        await uploadBytes(instructorImageRef, formData.instructorImage);
        instructorImageUrl = await getDownloadURL(instructorImageRef);
      }

      const eventData = {
        ...formData,
        image: imageUrl || formData.image,
        instructorImage: instructorImageUrl || formData.instructorImage,
        participants: 0,
        syllabus: [
          {
            title: "مقدمة",
            duration: "1 ساعة",
            description: "مقدمة عن الورشة"
          }
        ],
        instructorExperience: ["خبرة في المجال"],
        instructorSocial: {
          linkedin: "",
          twitter: "",
          instagram: ""
        }
      };

      if (editingEvent) {
        // تحديث فعالية موجودة
        await updateDoc(doc(db, 'events', editingEvent.id), eventData);
      } else {
        // إضافة فعالية جديدة مع slug
        const eventId = slugify(formData.title);
        await setDoc(doc(db, 'events', eventId), {
          ...eventData,
          id: eventId
        });
      }

      setShowForm(false);
      setEditingEvent(null);
      resetForm();
      loadEvents();
    } catch (error) {
      console.error('Error saving event:', error);
      alert('حدث خطأ أثناء حفظ الفعالية');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (event) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      subtitle: event.subtitle,
      description: event.description,
      date: event.date,
      time: event.time,
      category: event.category,
      duration: event.duration,
      level: event.level,
      maxParticipants: event.maxParticipants,
      instructor: event.instructor,
      instructorBio: event.instructorBio,
      image: event.image,
      instructorImage: event.instructorImage
    });
    setShowForm(true);
  };

  const handleDelete = async (eventId) => {
    if (window.confirm('هل أنت متأكد من حذف هذه الفعالية؟')) {
      try {
        await deleteDoc(doc(db, 'events', eventId));
        loadEvents();
      } catch (error) {
        console.error('Error deleting event:', error);
        alert('حدث خطأ أثناء حذف الفعالية');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      subtitle: '',
      description: '',
      date: '',
      time: '',
      category: '',
      duration: '',
      level: '',
      maxParticipants: '',
      instructor: '',
      instructorBio: '',
      image: null,
      instructorImage: null
    });
  };

  const categories = ['برمجة', 'تسويق', 'تصميم', 'أعمال', 'صناعة محتوى'];

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>إدارة الفعاليات</h2>
        <button 
          onClick={() => setShowForm(true)}
          style={styles.addButton}
        >
          + إضافة فعالية جديدة
        </button>
      </div>

      {showForm && (
        <div style={styles.formOverlay}>
          <div style={styles.formCard}>
            <div style={styles.formHeader}>
              <h3 style={styles.formTitle}>
                {editingEvent ? 'تعديل الفعالية' : 'إضافة فعالية جديدة'}
              </h3>
              <button 
                onClick={() => {
                  setShowForm(false);
                  setEditingEvent(null);
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
                  <label style={styles.label}>عنوان الفعالية *</label>
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
                  <label style={styles.label}>العنوان الفرعي</label>
                  <input
                    type="text"
                    name="subtitle"
                    value={formData.subtitle}
                    onChange={handleInputChange}
                    style={styles.input}
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
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>التاريخ *</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    style={styles.input}
                    required
                  />
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>الوقت</label>
                  <input
                    type="text"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    placeholder="مثال: 3 عصراً"
                    style={styles.input}
                  />
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>المدة</label>
                  <input
                    type="text"
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    placeholder="مثال: 4 أسابيع"
                    style={styles.input}
                  />
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>المستوى</label>
                  <select
                    name="level"
                    value={formData.level}
                    onChange={handleInputChange}
                    style={styles.input}
                  >
                    <option value="">اختر المستوى</option>
                    <option value="مبتدئ">مبتدئ</option>
                    <option value="متوسط">متوسط</option>
                    <option value="متقدم">متقدم</option>
                  </select>
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>العدد الأقصى للمشاركين</label>
                  <input
                    type="number"
                    name="maxParticipants"
                    value={formData.maxParticipants}
                    onChange={handleInputChange}
                    style={styles.input}
                  />
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>اسم المدرب *</label>
                  <input
                    type="text"
                    name="instructor"
                    value={formData.instructor}
                    onChange={handleInputChange}
                    style={styles.input}
                    required
                  />
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>نبذة عن المدرب</label>
                  <textarea
                    name="instructorBio"
                    value={formData.instructorBio}
                    onChange={handleInputChange}
                    rows="3"
                    style={styles.textarea}
                  />
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>وصف الفعالية *</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="4"
                    style={styles.textarea}
                    required
                  />
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>صورة الفعالية</label>
                  <input
                    type="file"
                    name="image"
                    onChange={handleInputChange}
                    accept="image/*"
                    style={styles.fileInput}
                  />
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>صورة المدرب</label>
                  <input
                    type="file"
                    name="instructorImage"
                    onChange={handleInputChange}
                    accept="image/*"
                    style={styles.fileInput}
                  />
                </div>
              </div>

              <div style={styles.formActions}>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingEvent(null);
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

      <div style={styles.eventsList}>
        {loading ? (
          <div style={styles.loading}>جاري التحميل...</div>
        ) : (
          eventsList.map(event => (
            <div key={event.id} style={styles.eventCard}>
              <div style={styles.eventImage}>
                <img src={event.image} alt={event.title} style={styles.image} />
              </div>
              <div style={styles.eventInfo}>
                <h3 style={styles.eventTitle}>{event.title}</h3>
                <p style={styles.eventSubtitle}>{event.subtitle}</p>
                <div style={styles.eventMeta}>
                  <span style={styles.metaItem}>📅 {new Date(event.date).toLocaleDateString('ar-EG')}</span>
                  <span style={styles.metaItem}>👨‍🏫 {event.instructor}</span>
                  <span style={styles.metaItem}>👥 {event.participants}/{event.maxParticipants}</span>
                </div>
                <div style={styles.eventActions}>
                  <button
                    onClick={() => handleEdit(event)}
                    style={styles.editButton}
                  >
                    تعديل
                  </button>
                  <button
                    onClick={() => handleDelete(event.id)}
                    style={styles.deleteButton}
                  >
                    حذف
                  </button>
                </div>
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
    maxWidth: '800px',
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
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
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
  eventsList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
    gap: 'var(--spacing-lg)'
  },
  loading: {
    textAlign: 'center',
    padding: 'var(--spacing-2xl)',
    color: 'var(--gray)',
    fontSize: '1.125rem'
  },
  eventCard: {
    background: 'var(--white)',
    borderRadius: 'var(--radius-lg)',
    boxShadow: 'var(--shadow-md)',
    overflow: 'hidden',
    transition: 'transform var(--transition-fast)'
  },
  eventImage: {
    height: '200px',
    overflow: 'hidden'
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  eventInfo: {
    padding: 'var(--spacing-lg)'
  },
  eventTitle: {
    fontSize: '1.125rem',
    fontWeight: 700,
    color: 'var(--dark)',
    marginBottom: 'var(--spacing-xs)'
  },
  eventSubtitle: {
    fontSize: '0.875rem',
    color: 'var(--gray)',
    marginBottom: 'var(--spacing-md)'
  },
  eventMeta: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--spacing-xs)',
    marginBottom: 'var(--spacing-md)'
  },
  metaItem: {
    fontSize: '0.75rem',
    color: 'var(--gray)'
  },
  eventActions: {
    display: 'flex',
    gap: 'var(--spacing-sm)'
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
  }
};
