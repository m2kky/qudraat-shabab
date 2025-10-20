
import React from 'react';
import { contactInfo } from '../../data/contact';

const ContactStrip = () => {
  return (
    <section style={styles.section} dir="rtl">
      <div className="container" style={styles.container}>
        <p style={styles.text}>أسئلة؟ راسلنا على <a href={`mailto:${contactInfo.email}`} style={styles.link}>{contactInfo.email}</a> أو تواصل واتساب <a href={contactInfo.social.whatsapp} style={styles.link}>هنا</a>.</p>
      </div>
    </section>
  );
};

export default ContactStrip;

const styles = {
  section: { background: 'var(--light)', padding: 'var(--spacing-lg) 0' },
  container: { maxWidth: 1200, margin: '0 auto', padding: '0 var(--spacing-md)', textAlign: 'center' },
  text: { margin: 0, color: 'var(--dark)' },
  link: { color: 'var(--Primary, #0517A2)', textDecoration: 'underline' }
};
