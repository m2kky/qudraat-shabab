import React from 'react';

export default function EventCard({ event }) {
  const isEventEnded = new Date(event.date) < new Date();

  return (
    <article className="event-card" style={styles.card}>
      <div style={styles.mediaWrapper}>
        <img src={event.image || event.instructorImage} alt={event.title} style={styles.media} />
        <div style={styles.mediaOverlay} />

        <div style={styles.categoryPill}>{event.category}</div>

        {isEventEnded && (
          <div style={styles.endedTag}>انتهت</div>
        )}

        <div style={styles.titleArea}>
          <h3 style={styles.title}>{event.title}</h3>
          <p style={styles.subtitle}>{event.subtitle || event.category}</p>
        </div>
      </div>

      <div style={styles.body}>
        <p style={styles.description}>{event.description}</p>

        <div style={styles.metaRow}>
          <div style={styles.dateTime}>
            <div style={styles.date}>{new Date(event.date).toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
            <div style={styles.time}>{event.time || ''}</div>
          </div>
          <div style={styles.instructor}>
            <span style={styles.instructorName}>{event.instructor}</span>
            <img src={event.instructorImage || event.image} alt={event.instructor} style={styles.instructorAvatar} />
          </div>
        </div>

        <div style={styles.actions}>
          <button className="details-button" style={styles.secondaryBtn}>التفاصيل</button>
          <button className="register-button" style={styles.primaryBtn}>سجل الآن</button>
        </div>
      </div>
    </article>
  );
}

const styles = {
  card: {
    background: 'var(--white)',
    borderRadius: 'var(--radius-xl)',
    overflow: 'hidden',
    boxShadow: 'var(--shadow-md)'
  },
  mediaWrapper: {
    position: 'relative',
    height: 260,
    overflow: 'hidden'
  },
  media: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  mediaOverlay: {
    position: 'absolute',
    inset: 0,
    // blue fade for readability over image
    background: 'linear-gradient(180deg, rgba(5,23,162,0) 0%, rgba(5,23,162,0.25) 55%, rgba(5,23,162,0.55) 100%)'
  },
  categoryPill: {
    position: 'absolute',
    top: 12,
    left: 12,
    padding: '6px 10px',
    borderRadius: 999,
    background: 'var(--white)',
    color: 'var(--Primary, #0517A2)',
    fontWeight: 700,
    fontSize: 12,
    border: '1px solid var(--Primary, #0517A2)'
  },
  endedTag: {
    position: 'absolute',
    top: 12,
    right: 12,
    padding: '4px 10px',
    borderRadius: 999,
    background: 'rgba(0,0,0,0.6)',
    color: '#fff',
    fontWeight: 700,
    fontSize: 12
  },
  titleArea: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 12,
    color: '#fff'
  },
  title: {
    margin: 0,
    fontWeight: 900,
    fontSize: '1.125rem',
    color: '#fff'
  },
  subtitle: {
    margin: 0,
    opacity: 0.9,
    color: '#fff'
  },
  body: {
    padding: 'var(--spacing-md)'
  },
  description: {
    color: 'var(--gray)',
    margin: '0 0 var(--spacing-md) 0',
    lineHeight: 1.6
  },
  metaRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 'var(--spacing-md)'
  },
  dateTime: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    color: 'var(--dark)'
  },
  date: { fontWeight: 700 },
  time: { color: 'var(--gray)' },
  instructor: {
    display: 'flex',
    alignItems: 'center',
    gap: 8
  },
  instructorName: { fontWeight: 600 },
  instructorAvatar: {
    width: 36,
    height: 36,
    borderRadius: '50%',
    objectFit: 'cover',
    border: '2px solid var(--white)',
    boxShadow: 'var(--shadow-sm)'
  },
  actions: {
    display: 'flex',
    gap: 12
  },
  primaryBtn: {
    background: 'var(--Primary, #0517A2)',
    color: '#fff',
    border: 'none',
    borderRadius: 999,
    padding: '10px 16px',
    cursor: 'pointer',
    fontWeight: 700
  },
  secondaryBtn: {
    background: 'transparent',
    color: 'var(--Primary, #0517A2)',
    border: '2px solid var(--Primary, #0517A2)',
    borderRadius: 999,
    padding: '8px 14px',
    cursor: 'pointer',
    fontWeight: 600
  }
};


