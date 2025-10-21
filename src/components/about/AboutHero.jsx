
import React from 'react';

const AboutHero = () => {
  return (
    <section style={styles.section} dir="rtl">
      <div className="container" style={styles.container}>
        <div style={styles.content}>
          <h1 style={styles.title}>من نحن</h1>
          <p style={styles.subtitle}>مبادرة قدرات شباب هي مبادرة شبابية مجانية هدفها الأول مساعدة الشباب على اكتشاف مجالات سوق العمل وفهم متطلباته الحقيقية.</p>
          <p style={styles.subtitle}>نحن مساحة مفتوحة للتجربة والتعلّم، نقدم ورش عملية وتفاعلية تعرّف المشاركين على أهم المجالات المطلوبة حاليًا في السوق، من التكنولوجيا وريادة الأعمال وحتى المهارات الشخصية، ليتمكن كل شاب من معرفة المجال الأنسب له قبل أن يبدأ رحلته المهنية.
          نؤمن أن الخطوة الأولى نحو النجاح هي الفهم، وأن المعرفة هي أقصر طريق لاكتشاف الذات.</p>
        </div>
        <div style={styles.media}>
          <img src="assets/aboutimage.jpg" alt="تعلم وتطوير" style={styles.image} />
        </div>
      </div>
    </section>
  );
};

export default AboutHero;

const styles = {
  section: { background: 'var(--light)', padding: 'var(--spacing-3xl) 0' },
  container: { maxWidth: 1200, margin: '0 auto', padding: '0 var(--spacing-md)', display: 'grid', gridTemplateColumns: '1fr', gap: 24, alignItems: 'center' },
  content: { textAlign: 'right' },
  title: { color: 'var(--Primary, #0517A2)', fontWeight: 900, fontSize: 'var(--font-size-3xl)', margin: 0 },
  subtitle: { color: 'var(--gray)', marginTop: 8 },
  media: { },
  image: { width: '100%', borderRadius: 16, boxShadow: 'var(--shadow-lg)' }
};
