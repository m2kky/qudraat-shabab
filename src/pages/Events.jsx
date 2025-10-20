import React, { useMemo, useState } from 'react';
import { events } from '../data/events';
import EventCard from '../components/events/EventCard';
import Calendar from '../components/events/Calendar';

const categories = [
  { id: 'all', name: 'كل الورش' },
  { id: 'برمجة', name: 'برمجة' },
  { id: 'تسويق', name: 'تسويق' },
  { id: 'تصميم', name: 'تصميم' },
  { id: 'أعمال', name: 'أعمال' },
  { id: 'صناعة محتوى', name: 'صناعة محتوى' },
];

function toKey(d) {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

export default function Events() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const eventsByDate = useMemo(() => {
    const map = {};
    for (const ev of events) {
      const key = toKey(new Date(ev.date));
      (map[key] ||= []).push(ev);
    }
    return map;
  }, []);

  const filtered = useMemo(() => {
    let list = [...events];
    if (selectedCategory !== 'all') {
      list = list.filter(e => e.category === selectedCategory);
    }
    if (selectedDate) {
      const key = toKey(selectedDate);
      list = list.filter(e => toKey(new Date(e.date)) === key);
    }
    return list.sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [selectedCategory, selectedDate]);

  const onPrevMonth = () => setCurrentDate(d => new Date(d.getFullYear(), d.getMonth() - 1, 1));
  const onNextMonth = () => setCurrentDate(d => new Date(d.getFullYear(), d.getMonth() + 1, 1));
  const onSelectDate = (d) => setSelectedDate(d);

  const resetFilters = () => { setSelectedCategory('all'); setSelectedDate(null); };

  return (
    <section className="events-page" style={styles.page} dir="rtl">
      <div className="container" style={styles.container}>
        <div style={styles.heroBar}>
          <div style={styles.breadcrumbs}><a href="/" style={styles.homeLink}>الرئيسية</a> / <span>الفعاليات</span></div>
          <h1 style={styles.title}>الفعاليات</h1>
          <p style={styles.subtitle}>استكشف كل ورشنا وفعالياتنا</p>
        </div>

        <div className="events-filters" style={styles.filtersRow}>
          <div className="events-categories" style={styles.categories}>
            {categories.map(c => (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.id)}
                aria-pressed={selectedCategory === c.id}
                style={{ ...styles.chip, ...(selectedCategory === c.id ? styles.chipActive : {}) }}
              >
                {c.name}
              </button>
            ))}
          </div>
          {(selectedDate || selectedCategory !== 'all') && (
            <button onClick={resetFilters} style={styles.resetBtn}>إعادة التعيين</button>
          )}
        </div>

        <div className="events-split" style={styles.split}>
          <aside className="events-sidebar" style={styles.sidebar}>
            <Calendar
              currentDate={currentDate}
              onPrevMonth={onPrevMonth}
              onNextMonth={onNextMonth}
              eventsByDate={eventsByDate}
              selectedDate={selectedDate}
              onSelectDate={onSelectDate}
            />
          </aside>

          <main className="events-main" style={styles.main}>
            {filtered.length === 0 ? (
              <div style={styles.empty}>
                <div>لا توجد نتائج مطابقة</div>
                <button onClick={resetFilters} style={styles.resetBtn}>مسح الفلاتر</button>
              </div>
            ) : (
              <div className="events-grid" style={styles.grid}>
                {filtered.map(ev => <EventCard key={ev.id} event={ev} />)}
              </div>
            )}
          </main>
        </div>
      </div>
    </section>
  );
}

const styles = {
  page: { padding: 'var(--spacing-2xl) 0', background: 'var(--light)' },
  container: { maxWidth: 1200, margin: '0 auto', padding: '0 var(--spacing-md)' },
  heroBar: { marginBottom: 'var(--spacing-xl)' },
  breadcrumbs: { color: 'var(--gray)', marginBottom: 8 },
  homeLink: { color: 'var(--primary)', textDecoration: 'none' },
  title: { color: 'var(--Primary, #0517A2)', fontWeight: 900, fontSize: 'var(--font-size-3xl)', margin: 0 },
  subtitle: { color: 'var(--gray)', margin: 'var(--spacing-xs) 0 0' },
  filtersRow: { position: 'sticky', top: 70, zIndex: 2, background: 'transparent', display: 'flex', gap: 12, alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--spacing-lg)' },
  categories: { display: 'flex', gap: 8, flexWrap: 'wrap' },
  chip: { padding: '8px 14px', borderRadius: 999, background: 'white', border: '1px solid var(--Primary, #0517A2)', color: 'var(--Primary, #0517A2)', cursor: 'pointer' },
  chipActive: { background: 'var(--Primary, #0517A2)', color: 'white' },
  resetBtn: { background: 'transparent', border: '1px solid var(--gray-light)', borderRadius: 10, padding: '6px 10px', cursor: 'pointer' },
  split: { display: 'grid', gridTemplateColumns: '360px 1fr', gap: 24, alignItems: 'start' },
  sidebar: { position: 'relative' },
  main: { minHeight: 200 },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: 'var(--spacing-xl)' },
  empty: { background: 'white', border: '1px solid var(--gray-light)', borderRadius: 16, padding: 24, textAlign: 'center' },
};

// Media queries for responsive design
const mediaQueries = `
  @media (max-width: 767px) {
    .events-page {
      padding: var(--spacing-xl) 0 !important;
    }
    .events-split {
      display: grid !important;
      grid-template-columns: 1fr !important;
      gap: var(--spacing-lg) !important;
    }
    .events-sidebar {
      position: static !important;
    }
    .events-filters {
      position: static !important;
      gap: var(--spacing-sm) !important;
      flex-direction: column !important;
      align-items: stretch !important;
    }
    .events-categories {
      overflow-x: auto !important;
      white-space: nowrap !important;
      padding-bottom: 4px !important;
      -webkit-overflow-scrolling: touch !important;
      scrollbar-width: none;
    }
    .events-categories::-webkit-scrollbar { display: none; }
    .events-grid {
      grid-template-columns: 1fr !important;
      gap: var(--spacing-lg) !important;
    }
  }

  @media (min-width: 768px) and (max-width: 1023px) {
    .events-split {
      grid-template-columns: 300px 1fr !important;
      gap: var(--spacing-xl) !important;
    }
  }

  @media (min-width: 1024px) {
    .events-grid {
      grid-template-columns: repeat(2, 1fr) !important;
    }
  }

  @media (min-width: 1280px) {
    .events-grid {
      grid-template-columns: repeat(2, 1fr) !important;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .events-grid > * { animation: none !important; transition: none !important; }
  }
`;

// Inject responsive styles once in the document head
if (typeof document !== 'undefined') {
  const styleId = 'events-page-responsive-styles';
  if (!document.getElementById(styleId)) {
    const styleSheet = document.createElement('style');
    styleSheet.id = styleId;
    styleSheet.textContent = mediaQueries;
    document.head.appendChild(styleSheet);
  }
}


