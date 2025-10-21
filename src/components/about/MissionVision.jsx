
import React from 'react';

const MissionVision = () => {
  return (
    <section style={styles.section} dir="rtl">
      <div className="container" style={styles.container}>
        <div style={styles.card}>
          <h2 style={styles.heading}>رسالتنا</h2>
          <p style={styles.text}>نساعد الشباب على فهم أنفسهم وسوق العمل من خلال ورش مجانية تفاعلية، يقدمها متخصصون، تُعرّفهم على المجالات المختلفة وتفتح أمامهم الأبواب للاختيار الواعي لمستقبلهم المهني.</p>
        </div>
        <div style={styles.card}>
          <h2 style={styles.heading}>رؤيتنا</h2>
          <p style={styles.text}>أن نصبح المنصة الشبابية الأولى في مصر والعالم العربي لاكتشاف القدرات وتوجيه الشباب نحو مسارات مهنية تناسبهم وتواكب تغيرات سوق العمل.</p>
        </div>
      </div>
    </section>
  );
};

export default MissionVision;

const styles = {
  section: { background: 'var(--white)', padding: 'var(--spacing-2xl) 0' },
  container: { maxWidth: 1200, margin: '0 auto', padding: '0 var(--spacing-md)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 },
  card: { background: 'var(--light)', padding: 20, borderRadius: 16, border: '1px solid var(--gray-light)' },
  heading: { color: 'var(--Primary, #0517A2)', fontWeight: 900, marginTop: 0 },
  text: { color: 'var(--dark)', lineHeight: 1.7 }
};
