import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';

export default function RegistrationsView() {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegistration, setSelectedRegistration] = useState(null);

  useEffect(() => {
    loadRegistrations();
  }, []);

  const loadRegistrations = async () => {
    try {
      setLoading(true);
      const registrationsSnapshot = await getDocs(collection(db, 'registrations'));
      const registrationsList = registrationsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setRegistrations(registrationsList);
    } catch (error) {
      console.error('Error loading registrations:', error);
      // في حالة الخطأ، استخدم بيانات وهمية
      const mockRegistrations = [
        {
          id: 'REG-social-media-workshop-1703123456789',
          eventId: 'social-media-workshop',
          eventTitle: 'إدارة الصفحات',
          firstName: 'أحمد',
          lastName: 'محمد',
          email: 'ahmed@example.com',
          dateOfBirth: '1995-01-01',
          whatsapp: '+966501234567',
          job: 'مطور ويب',
          college: 'جامعة الملك سعود',
          registrationDate: '2024-01-15T10:30:00Z',
          status: 'confirmed'
        },
        {
          id: 'REG-creative-design-workshop-1703123456790',
          eventId: 'creative-design-workshop',
          eventTitle: 'ورشة التصميم الإبداعي',
          firstName: 'فاطمة',
          lastName: 'أحمد',
          email: 'fatma@example.com',
          dateOfBirth: '1998-05-15',
          whatsapp: '+966501234568',
          job: 'مصممة جرافيك',
          college: 'جامعة الملك عبدالعزيز',
          registrationDate: '2024-01-16T14:20:00Z',
          status: 'pending'
        },
        {
          id: 'REG-3-1703123456791',
          eventId: '3',
          eventTitle: 'التسويق الرقمي',
          firstName: 'محمد',
          lastName: 'علي',
          email: 'mohamed@example.com',
          dateOfBirth: '1992-12-10',
          whatsapp: '+966501234569',
          job: 'مدير تسويق',
          college: 'جامعة البترول',
          registrationDate: '2024-01-17T09:15:00Z',
          status: 'confirmed'
        }
      ];
      setRegistrations(mockRegistrations);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (registrationId, newStatus) => {
    try {
      await updateDoc(doc(db, 'registrations', registrationId), {
        status: newStatus
      });
      
      setRegistrations(prev => 
        prev.map(reg => 
          reg.id === registrationId 
            ? { ...reg, status: newStatus }
            : reg
        )
      );
    } catch (error) {
      console.error('Error updating status:', error);
      alert('حدث خطأ أثناء تحديث الحالة');
    }
  };

  const filteredRegistrations = registrations.filter(reg => {
    const matchesFilter = filter === 'all' || reg.status === filter;
    const matchesSearch = 
      reg.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.eventTitle.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'var(--success)';
      case 'pending': return 'var(--warning)';
      case 'cancelled': return 'var(--error)';
      default: return 'var(--gray)';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'confirmed': return 'مؤكد';
      case 'pending': return 'معلق';
      case 'cancelled': return 'ملغي';
      default: return 'غير محدد';
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>إدارة التسجيلات</h2>
        <div style={styles.stats}>
          <div style={styles.statItem}>
            <span style={styles.statNumber}>{registrations.length}</span>
            <span style={styles.statLabel}>إجمالي التسجيلات</span>
          </div>
          <div style={styles.statItem}>
            <span style={styles.statNumber}>
              {registrations.filter(r => r.status === 'confirmed').length}
            </span>
            <span style={styles.statLabel}>مؤكدة</span>
          </div>
          <div style={styles.statItem}>
            <span style={styles.statNumber}>
              {registrations.filter(r => r.status === 'pending').length}
            </span>
            <span style={styles.statLabel}>معلقة</span>
          </div>
        </div>
      </div>

      <div style={styles.filters}>
        <div style={styles.searchBox}>
          <input
            type="text"
            placeholder="البحث في التسجيلات..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.searchInput}
            dir="rtl"
          />
        </div>
        <div style={styles.filterButtons}>
          <button
            onClick={() => setFilter('all')}
            style={{
              ...styles.filterButton,
              ...(filter === 'all' ? styles.filterButtonActive : {})
            }}
          >
            الكل
          </button>
          <button
            onClick={() => setFilter('confirmed')}
            style={{
              ...styles.filterButton,
              ...(filter === 'confirmed' ? styles.filterButtonActive : {})
            }}
          >
            مؤكدة
          </button>
          <button
            onClick={() => setFilter('pending')}
            style={{
              ...styles.filterButton,
              ...(filter === 'pending' ? styles.filterButtonActive : {})
            }}
          >
            معلقة
          </button>
          <button
            onClick={() => setFilter('cancelled')}
            style={{
              ...styles.filterButton,
              ...(filter === 'cancelled' ? styles.filterButtonActive : {})
            }}
          >
            ملغية
          </button>
        </div>
      </div>

      <div style={styles.tableContainer}>
        {loading ? (
          <div style={styles.loading}>جاري التحميل...</div>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHeader}>
                <th style={styles.th}>رقم التسجيل</th>
                <th style={styles.th}>الاسم</th>
                <th style={styles.th}>البريد الإلكتروني</th>
                <th style={styles.th}>الورشة</th>
                <th style={styles.th}>الوظيفة</th>
                <th style={styles.th}>تاريخ التسجيل</th>
                <th style={styles.th}>الحالة</th>
                <th style={styles.th}>الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {filteredRegistrations.map(registration => (
                <tr key={registration.id} style={styles.tableRow}>
                  <td style={styles.td}>
                    <span style={styles.registrationNumber}>
                      {registration.id}
                    </span>
                  </td>
                  <td style={styles.td}>
                    <div style={styles.nameCell}>
                      <span style={styles.name}>
                        {registration.firstName} {registration.lastName}
                      </span>
                      <span style={styles.whatsapp}>
                        {registration.whatsapp}
                      </span>
                    </div>
                  </td>
                  <td style={styles.td}>
                    <span style={styles.email}>{registration.email}</span>
                  </td>
                  <td style={styles.td}>
                    <span style={styles.eventTitle}>
                      {registration.eventTitle}
                    </span>
                  </td>
                  <td style={styles.td}>
                    <span style={styles.job}>{registration.job}</span>
                  </td>
                  <td style={styles.td}>
                    <span style={styles.date}>
                      {new Date(registration.registrationDate).toLocaleDateString('ar-EG')}
                    </span>
                  </td>
                  <td style={styles.td}>
                    <span 
                      style={{
                        ...styles.status,
                        background: getStatusColor(registration.status)
                      }}
                    >
                      {getStatusText(registration.status)}
                    </span>
                  </td>
                  <td style={styles.td}>
                    <div style={styles.actions}>
                      <button
                        onClick={() => setSelectedRegistration(registration)}
                        style={styles.viewButton}
                      >
                        عرض التفاصيل
                      </button>
                      {registration.status === 'pending' && (
                        <button
                          onClick={() => handleStatusChange(registration.id, 'confirmed')}
                          style={styles.confirmButton}
                        >
                          تأكيد
                        </button>
                      )}
                      {registration.status === 'confirmed' && (
                        <button
                          onClick={() => handleStatusChange(registration.id, 'pending')}
                          style={styles.pendingButton}
                        >
                          تعليق
                        </button>
                      )}
                      <button
                        onClick={() => handleStatusChange(registration.id, 'cancelled')}
                        style={styles.cancelButton}
                      >
                        إلغاء
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {filteredRegistrations.length === 0 && !loading && (
        <div style={styles.emptyState}>
          <p>لا توجد تسجيلات مطابقة للبحث</p>
        </div>
      )}

      {/* Registration Details Modal */}
      {selectedRegistration && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>تفاصيل التسجيل</h2>
              <button 
                onClick={() => setSelectedRegistration(null)}
                style={styles.closeButton}
              >
                ×
              </button>
            </div>
            
            <div style={styles.modalBody}>
              <div style={styles.detailsGrid}>
                <div style={styles.detailSection}>
                  <h3 style={styles.sectionTitle}>المعلومات الشخصية</h3>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>الاسم الكامل:</span>
                    <span style={styles.detailValue}>
                      {selectedRegistration.firstName} {selectedRegistration.lastName}
                    </span>
                  </div>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>البريد الإلكتروني:</span>
                    <span style={styles.detailValue}>{selectedRegistration.email}</span>
                  </div>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>تاريخ الميلاد:</span>
                    <span style={styles.detailValue}>{selectedRegistration.dateOfBirth}</span>
                  </div>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>رقم الواتساب:</span>
                    <span style={styles.detailValue}>{selectedRegistration.whatsapp}</span>
                  </div>
                </div>

                <div style={styles.detailSection}>
                  <h3 style={styles.sectionTitle}>المعلومات المهنية</h3>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>الوظيفة:</span>
                    <span style={styles.detailValue}>{selectedRegistration.job}</span>
                  </div>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>الجامعة/المؤسسة:</span>
                    <span style={styles.detailValue}>{selectedRegistration.college}</span>
                  </div>
                </div>

                <div style={styles.detailSection}>
                  <h3 style={styles.sectionTitle}>معلومات التسجيل</h3>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>رقم التسجيل:</span>
                    <span style={styles.detailValue}>{selectedRegistration.id}</span>
                  </div>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>الفعالية:</span>
                    <span style={styles.detailValue}>{selectedRegistration.eventTitle}</span>
                  </div>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>تاريخ التسجيل:</span>
                    <span style={styles.detailValue}>
                      {new Date(selectedRegistration.registrationDate).toLocaleDateString('ar-EG', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>الحالة:</span>
                    <span style={{
                      ...styles.statusBadge,
                      background: getStatusColor(selectedRegistration.status)
                    }}>
                      {getStatusText(selectedRegistration.status)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div style={styles.modalFooter}>
              <button 
                onClick={() => setSelectedRegistration(null)}
                style={styles.closeModalButton}
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}
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
  stats: {
    display: 'flex',
    gap: 'var(--spacing-lg)',
    flexWrap: 'wrap'
  },
  statItem: {
    textAlign: 'center',
    background: 'var(--white)',
    padding: 'var(--spacing-md)',
    borderRadius: 'var(--radius-md)',
    boxShadow: 'var(--shadow-sm)',
    minWidth: '100px'
  },
  statNumber: {
    display: 'block',
    fontSize: '1.5rem',
    fontWeight: 700,
    color: 'var(--Primary, #0517A2)',
    marginBottom: 'var(--spacing-xs)'
  },
  statLabel: {
    fontSize: '0.875rem',
    color: 'var(--gray)'
  },
  filters: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 'var(--spacing-lg)',
    flexWrap: 'wrap',
    gap: 'var(--spacing-md)'
  },
  searchBox: {
    flex: 1,
    minWidth: '300px'
  },
  searchInput: {
    width: '100%',
    padding: 'var(--spacing-sm) var(--spacing-md)',
    borderRadius: 'var(--radius-md)',
    border: '1px solid var(--gray-light)',
    background: 'var(--white)',
    fontSize: '1rem',
    color: 'var(--dark)',
    outline: 'none',
    fontFamily: 'Tajawal, sans-serif'
  },
  filterButtons: {
    display: 'flex',
    gap: 'var(--spacing-sm)',
    flexWrap: 'wrap'
  },
  filterButton: {
    padding: 'var(--spacing-sm) var(--spacing-md)',
    borderRadius: 'var(--radius-md)',
    border: '1px solid var(--gray-light)',
    background: 'var(--white)',
    color: 'var(--gray)',
    fontSize: '0.875rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all var(--transition-fast)'
  },
  filterButtonActive: {
    background: 'var(--Primary, #0517A2)',
    color: 'var(--white)',
    borderColor: 'var(--Primary, #0517A2)'
  },
  tableContainer: {
    background: 'var(--white)',
    borderRadius: 'var(--radius-lg)',
    boxShadow: 'var(--shadow-md)',
    overflow: 'hidden'
  },
  loading: {
    textAlign: 'center',
    padding: 'var(--spacing-2xl)',
    color: 'var(--gray)',
    fontSize: '1.125rem'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse'
  },
  tableHeader: {
    background: 'var(--light)'
  },
  th: {
    padding: 'var(--spacing-md)',
    textAlign: 'right',
    fontSize: '0.875rem',
    fontWeight: 700,
    color: 'var(--dark)',
    borderBottom: '1px solid var(--gray-light)'
  },
  tableRow: {
    borderBottom: '1px solid var(--gray-light)',
    transition: 'background-color var(--transition-fast)'
  },
  td: {
    padding: 'var(--spacing-md)',
    fontSize: '0.875rem',
    color: 'var(--dark)'
  },
  registrationNumber: {
    fontFamily: 'monospace',
    fontSize: '0.75rem',
    color: 'var(--Primary, #0517A2)',
    fontWeight: 600
  },
  nameCell: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--spacing-xs)'
  },
  name: {
    fontWeight: 600,
    color: 'var(--dark)'
  },
  whatsapp: {
    fontSize: '0.75rem',
    color: 'var(--gray)'
  },
  email: {
    color: 'var(--Primary, #0517A2)'
  },
  eventTitle: {
    fontWeight: 600,
    color: 'var(--dark)'
  },
  job: {
    color: 'var(--gray)',
    fontSize: '0.875rem'
  },
  viewButton: {
    background: 'var(--primary)',
    color: 'var(--white)',
    border: 'none',
    borderRadius: 'var(--radius-sm)',
    padding: 'var(--spacing-xs) var(--spacing-sm)',
    fontSize: '0.75rem',
    cursor: 'pointer',
    marginRight: 'var(--spacing-xs)',
    transition: 'all var(--transition-fast)',
    '&:hover': {
      background: 'var(--secondary)'
    }
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.6)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: 'var(--spacing-lg)'
  },
  modalContent: {
    background: 'var(--white)',
    borderRadius: 'var(--radius-lg)',
    boxShadow: 'var(--shadow-xl)',
    maxWidth: '800px',
    width: '100%',
    maxHeight: '90vh',
    overflow: 'auto'
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 'var(--spacing-xl)',
    borderBottom: '1px solid var(--gray-light)'
  },
  modalTitle: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: 'var(--dark)',
    margin: 0
  },
  closeButton: {
    background: 'transparent',
    border: 'none',
    fontSize: '2rem',
    color: 'var(--gray)',
    cursor: 'pointer',
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    transition: 'all var(--transition-fast)',
    '&:hover': {
      background: 'var(--gray-light)',
      color: 'var(--dark)'
    }
  },
  modalBody: {
    padding: 'var(--spacing-xl)'
  },
  detailsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: 'var(--spacing-xl)'
  },
  detailSection: {
    background: 'var(--light)',
    padding: 'var(--spacing-lg)',
    borderRadius: 'var(--radius-md)',
    border: '1px solid var(--gray-light)'
  },
  sectionTitle: {
    fontSize: '1.125rem',
    fontWeight: '700',
    color: 'var(--primary)',
    marginBottom: 'var(--spacing-lg)',
    paddingBottom: 'var(--spacing-sm)',
    borderBottom: '2px solid var(--primary)'
  },
  detailItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 'var(--spacing-sm) 0',
    borderBottom: '1px solid var(--gray-light)',
    '&:last-child': {
      borderBottom: 'none'
    }
  },
  detailLabel: {
    fontSize: '0.875rem',
    fontWeight: '600',
    color: 'var(--gray)',
    minWidth: '120px'
  },
  detailValue: {
    fontSize: '0.875rem',
    color: 'var(--dark)',
    fontWeight: '500',
    textAlign: 'left',
    flex: 1
  },
  statusBadge: {
    padding: 'var(--spacing-xs) var(--spacing-sm)',
    borderRadius: 'var(--radius-full)',
    fontSize: '0.75rem',
    fontWeight: '600',
    color: 'var(--white)'
  },
  modalFooter: {
    padding: 'var(--spacing-xl)',
    borderTop: '1px solid var(--gray-light)',
    display: 'flex',
    justifyContent: 'flex-end'
  },
  closeModalButton: {
    background: 'var(--primary)',
    color: 'var(--white)',
    border: 'none',
    borderRadius: 'var(--radius-md)',
    padding: 'var(--spacing-md) var(--spacing-xl)',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all var(--transition-fast)',
    '&:hover': {
      background: 'var(--secondary)'
    }
  },
  date: {
    fontSize: '0.75rem',
    color: 'var(--gray)'
  },
  status: {
    padding: 'var(--spacing-xs) var(--spacing-sm)',
    borderRadius: 'var(--radius-full)',
    color: 'var(--white)',
    fontSize: '0.75rem',
    fontWeight: 600
  },
  actions: {
    display: 'flex',
    gap: 'var(--spacing-xs)',
    flexWrap: 'wrap'
  },
  confirmButton: {
    background: 'var(--success)',
    color: 'var(--white)',
    padding: 'var(--spacing-xs) var(--spacing-sm)',
    borderRadius: 'var(--radius-md)',
    border: 'none',
    fontSize: '0.75rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all var(--transition-fast)'
  },
  pendingButton: {
    background: 'var(--warning)',
    color: 'var(--white)',
    padding: 'var(--spacing-xs) var(--spacing-sm)',
    borderRadius: 'var(--radius-md)',
    border: 'none',
    fontSize: '0.75rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all var(--transition-fast)'
  },
  cancelButton: {
    background: 'var(--error)',
    color: 'var(--white)',
    padding: 'var(--spacing-xs) var(--spacing-sm)',
    borderRadius: 'var(--radius-md)',
    border: 'none',
    fontSize: '0.75rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all var(--transition-fast)'
  },
  emptyState: {
    textAlign: 'center',
    padding: 'var(--spacing-3xl)',
    color: 'var(--gray)',
    fontSize: '1.125rem'
  }
};
