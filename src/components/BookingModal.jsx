import { useState } from 'react';

function BookingModal({ onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    event: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Booking data:', formData);
    alert('تم إرسال طلب الحجز بنجاح!');
    onClose();
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button 
          style={styles.close} 
          onClick={onClose}
          aria-label="إغلاق النافذة"
        >
          ✕
        </button>
        <h2 style={styles.title}>احجز مقعدك</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            name="name"
            placeholder="الاسم الكامل"
            value={formData.name}
            onChange={handleChange}
            style={styles.input}
            required
            aria-label="الاسم الكامل"
          />
          <input
            type="email"
            name="email"
            placeholder="البريد الإلكتروني"
            value={formData.email}
            onChange={handleChange}
            style={styles.input}
            required
            aria-label="البريد الإلكتروني"
          />
          <input
            type="tel"
            name="phone"
            placeholder="رقم الجوال"
            value={formData.phone}
            onChange={handleChange}
            style={styles.input}
            required
            aria-label="رقم الجوال"
          />
          <select
            name="event"
            value={formData.event}
            onChange={handleChange}
            style={styles.input}
            required
            aria-label="اختر الفعالية"
          >
            <option value="">اختر الفعالية</option>
            <option value="web-dev">تطوير الويب</option>
            <option value="design">التصميم الإبداعي</option>
            <option value="marketing">التسويق الرقمي</option>
          </select>
          <button type="submit" style={styles.submit}>
            تأكيد الحجز
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0,0,0,0.6)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '1rem'
  },
  modal: {
    background: 'var(--white)',
    borderRadius: '12px',
    padding: '2rem',
    maxWidth: '500px',
    width: '100%',
    position: 'relative',
    boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
  },
  close: {
    position: 'absolute',
    top: '1rem',
    left: '1rem',
    background: 'transparent',
    fontSize: '1.5rem',
    color: 'var(--gray)',
    padding: '0.25rem 0.5rem'
  },
  title: {
    fontSize: '1.75rem',
    fontWeight: 'bold',
    marginBottom: '1.5rem',
    color: 'var(--dark)'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  input: {
    padding: '0.875rem',
    fontSize: '1rem',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    fontFamily: 'Tajawal, sans-serif',
    direction: 'rtl'
  },
  submit: {
    background: 'var(--primary)',
    color: 'var(--white)',
    padding: '1rem',
    fontSize: '1.125rem',
    fontWeight: 'bold',
    borderRadius: '8px',
    marginTop: '0.5rem'
  }
};

export default BookingModal;
