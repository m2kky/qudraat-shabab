import React from 'react';
import { contactInfo } from '../../data/contact';

const CONTACT = contactInfo;

function Icon({ name }) {
  const common = { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' };
  switch (name) {
    case 'phone':
      return (
        <svg {...common} aria-hidden="true">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.1.97.35 1.92.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.89.35 1.84.6 2.81.7A2 2 0 0 1 22 16.92z"/>
        </svg>
      );
    case 'mobile':
      return (
        <svg {...common} aria-hidden="true">
          <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
          <line x1="12" y1="18" x2="12.01" y2="18"/>
        </svg>
      );
    case 'email':
      return (
        <svg {...common} aria-hidden="true">
          <rect x="3" y="5" width="18" height="14" rx="2"/>
          <polyline points="22,6 12,13 2,6"/>
        </svg>
      );
    case 'location':
      return (
        <svg {...common} aria-hidden="true">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
          <circle cx="12" cy="10" r="3"/>
        </svg>
      );
    default:
      return null;
  }
}

export default function ContactInfo() {
  return (
    <div style={styles.wrapper}>
      <div style={styles.grid}> 
        <div style={styles.item}><span style={styles.icon}><Icon name="phone"/></span>{CONTACT.phone}</div>
        <div style={styles.item}><span style={styles.icon}><Icon name="mobile"/></span>{CONTACT.mobile}</div>
        <div style={styles.item}><span style={styles.icon}><Icon name="email"/></span>{CONTACT.email}</div>
        <div style={styles.item}><span style={styles.icon}><Icon name="location"/></span>{CONTACT.address}</div>
      </div>
      <div style={styles.mapBox}>
        <iframe src={CONTACT.mapEmbed} width="100%" height="100%" style={{border:0}} loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="موقع قدرات شباب" />
      </div>
    </div>
  );
}

const styles = {
  wrapper: { display: 'flex', flexDirection: 'column', gap: 12 },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px,1fr))', gap: 8 },
  item: { background: 'var(--white)', border: '1px solid var(--gray-light)', borderRadius: 12, padding: 10, color: 'var(--dark)', display: 'flex', alignItems: 'center', gap: 8, boxShadow: 'var(--shadow-sm)' },
  icon: { display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'var(--Primary, #0517A2)' },
  mapBox: { height: 320, borderRadius: 16, overflow: 'hidden', border: '1px solid var(--gray-light)', boxShadow: 'var(--shadow-lg)' }
};


