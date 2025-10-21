import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from '../../firebase/config';
import { slugify } from '../../utils/slugify';
import { events } from '../../data/events';

export default function EventsManagement() {
  const [eventsList, setEventsList] = useState([]);
  const [instructorsList, setInstructorsList] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

  // جلب الأحداث من Firestore
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsSnapshot = await getDocs(collection(db, 'events'));
        const eventsList = eventsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setEventsList(eventsList);
      } catch (error) {
        console.error('خطأ في جلب الأحداث:', error);
        setEventsList([]);
      }
    };

    fetchEvents();
  }, []);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    shortDescription: '', // وصف مختصر للكارت
    description: '', // وصف كامل مع تنسيق
    content: '', // محتوى الورشة
    date: '',
    time: '',
    category: '',
    duration: '',
    level: '',
    maxParticipants: '',
    instructorId: '', // ID المدرب المختار
    image: null
  });

  useEffect(() => {
    loadEvents();
    loadInstructors();
  }, []);

  const loadInstructors = async () => {
    try {
      const instructorsSnapshot = await getDocs(collection(db, 'instructors'));
      const instructorsList = instructorsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setInstructorsList(instructorsList);
    } catch (error) {
      console.error('Error loading instructors:', error);
      setInstructorsList([]);
    }
  };

  const loadEvents = async () => {
    try {
      setLoading(true);
      const eventsSnapshot = await getDocs(collection(db, 'events'));
      const eventsList = eventsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setEventsList(eventsList);
    } catch (error) {
      console.error('Error loading events:', error);
      // في حالة الخطأ، استخدم البيانات المحلية
      setEventsList(events);
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

      // معالجة صورة الفعالية
      if (formData.image && formData.image instanceof File) {
        try {
          const imageRef = ref(storage, `events/${Date.now()}_${formData.image.name}`);
          await uploadBytes(imageRef, formData.image);
          imageUrl = await getDownloadURL(imageRef);
          console.log('تم رفع صورة الفعالية:', imageUrl);
        } catch (error) {
          console.error('خطأ في رفع صورة الفعالية:', error);
          alert('خطأ في رفع صورة الفعالية، سيتم استخدام صورة افتراضية');
          imageUrl = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop';
        }
      } else if (typeof formData.image === 'string' && formData.image) {
        imageUrl = formData.image;
      } else {
        imageUrl = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop';
      }

      // الحصول على بيانات المدرب المختار
      const selectedInstructor = instructorsList.find(inst => inst.id === formData.instructorId);
      
      const eventData = {
        ...formData,
        image: imageUrl,
        // بيانات المدرب من المدرب المختار
        instructor: selectedInstructor?.name || '',
        instructorBio: selectedInstructor?.bio || '',
        instructorImage: selectedInstructor?.image || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=300&fit=crop',
        instructorExperience: selectedInstructor?.experience ? selectedInstructor.experience.split('\n') : ["خبرة في المجال"],
        instructorSocial: selectedInstructor?.socialMedia || {
          linkedin: "",
          twitter: "",
          instagram: ""
        },
        participants: editingEvent ? editingEvent.participants : 0,
        syllabus: formData.syllabus || [
          {
            title: "مقدمة",
            duration: "1 ساعة",
            description: "مقدمة عن الورشة"
          }
        ]
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
    // البحث عن المدرب المطابق
    const matchingInstructor = instructorsList.find(inst => inst.name === event.instructor);
    
    setFormData({
      title: event.title,
      subtitle: event.subtitle,
      shortDescription: event.shortDescription || '',
      description: event.description,
      content: event.content || '',
      date: event.date,
      time: event.time,
      category: event.category,
      duration: event.duration,
      level: event.level,
      maxParticipants: event.maxParticipants,
      instructorId: matchingInstructor?.id || '',
      image: event.image
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
      shortDescription: '',
      description: '',
      content: '',
      date: '',
      time: '',
      category: '',
      duration: '',
      level: '',
      maxParticipants: '',
      instructorId: '',
      image: null
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
                  <label style={styles.label}>اختيار المدرب *</label>
                  <select
                    name="instructorId"
                    value={formData.instructorId}
                    onChange={handleInputChange}
                    style={styles.select}
                    required
                  >
                    <option value="">اختر المدرب...</option>
                    {instructorsList.map(instructor => (
                      <option key={instructor.id} value={instructor.id}>
                        {instructor.name} - {instructor.title}
                      </option>
                    ))}
                  </select>
                  {instructorsList.length === 0 && (
                    <p style={styles.helpText}>
                      لا يوجد مدربين مسجلين. 
                      <a href="#instructors" style={styles.link}>أضف مدرب جديد</a>
                    </p>
                  )}
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>الوصف المختصر (للكارت) *</label>
                  <textarea
                    name="shortDescription"
                    value={formData.shortDescription}
                    onChange={handleInputChange}
                    rows="2"
                    style={styles.textarea}
                    placeholder="وصف مختصر يظهر في كارت الفعالية..."
                    required
                  />
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>الوصف الكامل *</label>
                  <div style={styles.htmlHelper}>
                    <p style={styles.helperText}>
                      💡 يمكنك استخدام HTML للتنسيق: &lt;strong&gt;نص عريض&lt;/strong&gt;, &lt;em&gt;نص مائل&lt;/em&gt;, &lt;br&gt; للسطر الجديد
                    </p>
                  </div>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="8"
                    style={styles.textarea}
                    placeholder="وصف مفصل للفعالية مع إمكانية التنسيق...&#10;&#10;مثال:&#10;&lt;h3&gt;عنوان فرعي&lt;/h3&gt;&#10;&lt;p&gt;فقرة عادية &lt;strong&gt;مع نص عريض&lt;/strong&gt;&lt;/p&gt;&#10;&lt;ul&gt;&#10;&lt;li&gt;نقطة أولى&lt;/li&gt;&#10;&lt;li&gt;نقطة ثانية&lt;/li&gt;&#10;&lt;/ul&gt;"
                    required
                  />
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>محتوى الورشة</label>
                  <div style={styles.htmlHelper}>
                    <p style={styles.helperText}>
                      💡 يمكنك استخدام HTML للتنسيق: &lt;h3&gt;عناوين&lt;/h3&gt;, &lt;ul&gt;&lt;li&gt;قوائم&lt;/li&gt;&lt;/ul&gt;, &lt;strong&gt;نص عريض&lt;/strong&gt;
                    </p>
                  </div>
                  <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    rows="10"
                    style={styles.textarea}
                    placeholder="تفاصيل محتوى الورشة، المنهج، الأهداف...&#10;&#10;مثال:&#10;&lt;h3&gt;المنهج الدراسي&lt;/h3&gt;&#10;&lt;ul&gt;&#10;&lt;li&gt;&lt;strong&gt;الأسبوع الأول:&lt;/strong&gt; مقدمة في البرمجة&lt;/li&gt;&#10;&lt;li&gt;&lt;strong&gt;الأسبوع الثاني:&lt;/strong&gt; أساسيات JavaScript&lt;/li&gt;&#10;&lt;/ul&gt;&#10;&lt;h3&gt;الأهداف&lt;/h3&gt;&#10;&lt;p&gt;تعلم &lt;em&gt;البرمجة&lt;/em&gt; من الصفر&lt;/p&gt;"
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
  select: {
    padding: 'var(--spacing-sm) var(--spacing-md)',
    borderRadius: 'var(--radius-md)',
    border: '1px solid var(--gray-light)',
    background: 'var(--white)',
    fontSize: '1rem',
    color: 'var(--dark)',
    outline: 'none',
    transition: 'border-color var(--transition-fast)',
    fontFamily: 'Tajawal, sans-serif',
    cursor: 'pointer'
  },
  helpText: {
    fontSize: '0.875rem',
    color: 'var(--gray)',
    margin: 'var(--spacing-sm) 0 0 0'
  },
  link: {
    color: 'var(--primary)',
    textDecoration: 'none',
    marginRight: 'var(--spacing-sm)'
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
  },
  htmlHelper: {
    background: 'var(--gray-light)',
    padding: 'var(--spacing-sm)',
    borderRadius: 'var(--radius-sm)',
    marginBottom: 'var(--spacing-sm)',
    border: '1px solid var(--gray)'
  },
  helperText: {
    fontSize: '0.8rem',
    color: 'var(--primary)',
    margin: 0,
    lineHeight: 1.4
  }
};
