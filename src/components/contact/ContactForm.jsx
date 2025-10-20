import React, { useState } from 'react';

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const onSubmit = (e) => { e.preventDefault(); };

  return (
    <form onSubmit={onSubmit} style={styles.form} dir="rtl" aria-label="نموذج تواصل">
      <div style={styles.field}> 
        <label htmlFor="name" style={styles.label}>الاسم</label>
        <input id="name" name="name" value={form.name} onChange={onChange} style={styles.input} placeholder="اسمك" />
      </div>
      <div style={styles.field}> 
        <label htmlFor="email" style={styles.label}>البريد الإلكتروني</label>
        <input id="email" name="email" type="email" value={form.email} onChange={onChange} style={styles.input} placeholder="example@email.com" />
      </div>
      <div style={styles.field}> 
        <label htmlFor="subject" style={styles.label}>الموضوع</label>
        <input id="subject" name="subject" value={form.subject} onChange={onChange} style={styles.input} placeholder="عنوان الرسالة" />
      </div>
      <div style={styles.field}> 
        <label htmlFor="message" style={styles.label}>الرسالة</label>
        <textarea id="message" name="message" value={form.message} onChange={onChange} style={{...styles.input, height: 120, resize: 'vertical'}} placeholder="اكتب رسالتك هنا" />
      </div>
      <button type="submit" style={styles.submit}>إرسال</button>
    </form>
  );
}

const styles = {
  form: { display: 'flex', flexDirection: 'column', gap: '12px', background: 'transparent', padding: '16px 0', borderRadius: '16px' },
  field: { display: 'flex', flexDirection: 'column', gap: 6 },
  label: { color: 'var(--dark)', fontWeight: 800, fontSize: '0.95rem' },
  input: { padding: '12px 14px', borderRadius: 12, border: '1px solid var(--gray-light)', outline: 'none', background: 'var(--white)' },
  submit: { background: 'var(--Primary, #0517A2)', color: '#fff', border: 'none', borderRadius: 999, padding: '12px 16px', fontWeight: 900, cursor: 'pointer', boxShadow: 'var(--shadow-md)' }
};


