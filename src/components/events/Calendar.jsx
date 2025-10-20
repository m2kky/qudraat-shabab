import React, { useMemo } from 'react';

const arabicWeekdays = ['س', 'أ', 'ث', 'ر', 'خ', 'ج', 'س'];
const monthFormatter = new Intl.DateTimeFormat('ar-EG', { month: 'long', year: 'numeric' });

function toKey(d) {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

export default function Calendar({ currentDate, onPrevMonth, onNextMonth, eventsByDate, selectedDate, onSelectDate }) {
  const { weeks, label, startDay } = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstOfMonth = new Date(year, month, 1);
    const startDay = (firstOfMonth.getDay() + 1) % 7; // اجعل السبت = 0
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const cells = [];
    for (let i = 0; i < startDay; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));
    while (cells.length % 7 !== 0) cells.push(null);

    const weeks = [];
    for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));

    return { weeks, label: monthFormatter.format(firstOfMonth), startDay };
  }, [currentDate]);

  return (
    <div style={styles.calendar} aria-label="التقويم" role="group" dir="rtl">
      <div style={styles.header}>
        <button onClick={onNextMonth} style={styles.navBtn} aria-label="الشهر التالي">‹</button>
        <div style={styles.label}>{label}</div>
        <button onClick={onPrevMonth} style={styles.navBtn} aria-label="الشهر السابق">›</button>
      </div>

      <div role="grid" aria-label="الشهر" style={styles.grid}>
        {arabicWeekdays.map((w) => (
          <div key={w} role="columnheader" style={styles.weekday}>{w}</div>
        ))}

        {weeks.flat().map((date, idx) => {
          if (!date) return <div key={`empty-${idx}`} style={styles.cellEmpty} aria-hidden="true" />;
          const key = toKey(date);
          const hasEvents = (eventsByDate[key]?.length || 0) > 0;
          const isSelected = selectedDate && toKey(selectedDate) === key;
          const isToday = toKey(new Date()) === key;

          return (
            <button
              key={key}
              role="gridcell"
              onClick={() => onSelectDate(date)}
              aria-pressed={isSelected}
              aria-label={`${date.toLocaleDateString('ar-EG')} ${hasEvents ? `، ${eventsByDate[key].length} فعالية` : ''}`}
              style={{
                ...styles.cellBtn,
                ...(hasEvents ? styles.cellHasEvents : {}),
                ...(isSelected ? styles.cellSelected : {}),
                ...(isToday ? styles.cellToday : {}),
              }}
            >
              <span>{date.getDate()}</span>
              {hasEvents && <span style={styles.dot} />}
            </button>
          );
        })}
      </div>
    </div>
  );
}

const styles = {
  calendar: { background: 'var(--white)', border: '1px solid var(--gray-light)', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-md)', padding: 'var(--spacing-md)', position: 'sticky', top: 88 },
  header: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--spacing-md)' },
  label: { fontWeight: 800, color: 'var(--Primary, #0517A2)' },
  navBtn: { background: 'transparent', border: '1px solid var(--gray-light)', borderRadius: 'var(--radius-full)', width: 32, height: 32, cursor: 'pointer' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 6 },
  weekday: { textAlign: 'center', color: 'var(--gray)', fontWeight: 600, padding: 6 },
  cellEmpty: { height: 44 },
  cellBtn: { position: 'relative', height: 44, borderRadius: 10, border: '1px solid transparent', background: 'transparent', cursor: 'pointer', fontWeight: 700, transition: 'transform .2s ease-out, box-shadow .2s ease-out, background .2s ease-out' },
  cellHasEvents: { background: 'rgba(5, 23, 162, 0.06)', borderColor: 'rgba(5, 23, 162, 0.15)' },
  cellSelected: { background: 'var(--Primary, #0517A2)', color: 'white', borderColor: 'var(--Primary, #0517A2)' },
  cellToday: { boxShadow: 'inset 0 0 0 2px rgba(5, 23, 162, 0.35)', borderColor: 'rgba(5, 23, 162, 0.25)' },
  dot: { position: 'absolute', bottom: 6, left: 6, width: 6, height: 6, borderRadius: '50%', background: 'var(--Primary, #0517A2)' },
};


