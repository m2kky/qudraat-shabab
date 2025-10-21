import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase/config';

export default function ContactManagement() {
  const [contactSubmissions, setContactSubmissions] = useState([]);
  const [newsletterSubscribers, setNewsletterSubscribers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('contact');

  useEffect(() => {
    loadContactSubmissions();
    loadNewsletterSubscribers();
  }, []);

  const loadContactSubmissions = async () => {
    try {
      setLoading(true);
      const submissionsSnapshot = await getDocs(collection(db, 'contactSubmissions'));
      const submissionsList = submissionsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setContactSubmissions(submissionsList);
    } catch (error) {
      console.error('Error loading contact submissions:', error);
      setContactSubmissions([]);
    } finally {
      setLoading(false);
    }
  };

  const loadNewsletterSubscribers = async () => {
    try {
      const subscribersSnapshot = await getDocs(collection(db, 'newsletterSubscribers'));
      const subscribersList = subscribersSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setNewsletterSubscribers(subscribersList);
    } catch (error) {
      console.error('Error loading newsletter subscribers:', error);
      setNewsletterSubscribers([]);
    }
  };

  const handleDeleteContact = async (submissionId) => {
    if (window.confirm('هل أنت متأكد من حذف هذه الرسالة؟')) {
      try {
        await deleteDoc(doc(db, 'contactSubmissions', submissionId));
        alert('تم حذف الرسالة بنجاح!');
        loadContactSubmissions();
      } catch (error) {
        console.error('Error deleting contact submission:', error);
        alert('حدث خطأ أثناء حذف الرسالة');
      }
    }
  };

  const handleDeleteSubscriber = async (subscriberId) => {
    if (window.confirm('هل أنت متأكد من حذف هذا المشترك؟')) {
      try {
        await deleteDoc(doc(db, 'newsletterSubscribers', subscriberId));
        alert('تم حذف المشترك بنجاح!');
        loadNewsletterSubscribers();
      } catch (error) {
        console.error('Error deleting subscriber:', error);
        alert('حدث خطأ أثناء حذف المشترك');
      }
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'غير محدد';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('ar-EG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const tabs = [
    { id: 'contact', name: 'رسائل التواصل', icon: '📧', count: contactSubmissions.length },
    { id: 'newsletter', name: 'مشتركي النشرة', icon: '📬', count: newsletterSubscribers.length }
  ];

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>إدارة التواصل والاشتراك</h1>
        <div style={styles.stats}>
          <div style={styles.statCard}>
            <div style={styles.statIcon}>📧</div>
            <div style={styles.statContent}>
              <div style={styles.statNumber}>{contactSubmissions.length}</div>
              <div style={styles.statLabel}>رسالة تواصل</div>
            </div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statIcon}>📬</div>
            <div style={styles.statContent}>
              <div style={styles.statNumber}>{newsletterSubscribers.length}</div>
              <div style={styles.statLabel}>مشترك نشرة</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div style={styles.tabsContainer}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={activeTab === tab.id ? styles.activeTab : styles.tabButton}
          >
            <span style={styles.tabIcon}>{tab.icon}</span>
            <span>{tab.name}</span>
            <span style={styles.tabCount}>({tab.count})</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div style={styles.tabContent}>
        {activeTab === 'contact' && (
          <div style={styles.contactContent}>
            <div style={styles.sectionHeader}>
              <h2 style={styles.sectionTitle}>رسائل التواصل</h2>
              <p style={styles.sectionDescription}>
                جميع الرسائل المرسلة من نموذج التواصل
              </p>
            </div>

            {loading && (
              <div style={styles.loadingContainer}>
                <p>جاري تحميل الرسائل...</p>
              </div>
            )}

            {!loading && contactSubmissions.length === 0 && (
              <div style={styles.emptyState}>
                <div style={styles.emptyIcon}>📭</div>
                <h3 style={styles.emptyTitle}>لا توجد رسائل</h3>
                <p style={styles.emptyDescription}>
                  لم يتم إرسال أي رسائل من نموذج التواصل بعد
                </p>
              </div>
            )}

            {!loading && contactSubmissions.length > 0 && (
              <div style={styles.submissionsGrid}>
                {contactSubmissions.map(submission => (
                  <div key={submission.id} style={styles.submissionCard}>
                    <div style={styles.submissionHeader}>
                      <div style={styles.submissionMeta}>
                        <h3 style={styles.submissionName}>{submission.name}</h3>
                        <p style={styles.submissionEmail}>{submission.email}</p>
                        <p style={styles.submissionDate}>
                          {formatDate(submission.submittedAt)}
                        </p>
                      </div>
                      <button
                        onClick={() => handleDeleteContact(submission.id)}
                        style={styles.deleteButton}
                        title="حذف الرسالة"
                      >
                        🗑️
                      </button>
                    </div>
                    
                    <div style={styles.submissionContent}>
                      <div style={styles.subjectSection}>
                        <h4 style={styles.subjectLabel}>الموضوع:</h4>
                        <p style={styles.subjectText}>{submission.subject}</p>
                      </div>
                      
                      <div style={styles.messageSection}>
                        <h4 style={styles.messageLabel}>الرسالة:</h4>
                        <p style={styles.messageText}>{submission.message}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'newsletter' && (
          <div style={styles.newsletterContent}>
            <div style={styles.sectionHeader}>
              <h2 style={styles.sectionTitle}>مشتركي النشرة البريدية</h2>
              <p style={styles.sectionDescription}>
                جميع المشتركين في النشرة البريدية
              </p>
            </div>

            {loading && (
              <div style={styles.loadingContainer}>
                <p>جاري تحميل المشتركين...</p>
              </div>
            )}

            {!loading && newsletterSubscribers.length === 0 && (
              <div style={styles.emptyState}>
                <div style={styles.emptyIcon}>📬</div>
                <h3 style={styles.emptyTitle}>لا يوجد مشتركين</h3>
                <p style={styles.emptyDescription}>
                  لم يتم الاشتراك في النشرة البريدية بعد
                </p>
              </div>
            )}

            {!loading && newsletterSubscribers.length > 0 && (
              <div style={styles.subscribersGrid}>
                {newsletterSubscribers.map(subscriber => (
                  <div key={subscriber.id} style={styles.subscriberCard}>
                    <div style={styles.subscriberHeader}>
                      <div style={styles.subscriberInfo}>
                        <h3 style={styles.subscriberEmail}>{subscriber.email}</h3>
                        <p style={styles.subscriberDate}>
                          اشترك في: {formatDate(subscriber.subscribedAt)}
                        </p>
                        {subscriber.source && (
                          <p style={styles.subscriberSource}>
                            المصدر: {subscriber.source}
                          </p>
                        )}
                      </div>
                      <button
                        onClick={() => handleDeleteSubscriber(subscriber.id)}
                        style={styles.deleteButton}
                        title="حذف المشترك"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: 'var(--spacing-3xl)',
    fontFamily: 'Tajawal, sans-serif',
    direction: 'rtl',
    backgroundColor: 'var(--light)',
    minHeight: '100vh'
  },
  header: {
    marginBottom: 'var(--spacing-2xl)',
    paddingBottom: 'var(--spacing-lg)',
    borderBottom: '1px solid var(--gray-light)'
  },
  title: {
    fontSize: 'var(--font-size-3xl)',
    fontWeight: '900',
    color: 'var(--dark)',
    marginBottom: 'var(--spacing-lg)',
    textAlign: 'center'
  },
  stats: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: 'var(--spacing-lg)',
    maxWidth: '600px',
    margin: '0 auto'
  },
  statCard: {
    background: 'var(--white)',
    padding: 'var(--spacing-lg)',
    borderRadius: 'var(--radius-lg)',
    boxShadow: 'var(--shadow-md)',
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-md)',
    border: '1px solid var(--gray-light)'
  },
  statIcon: {
    fontSize: '2rem',
    width: '50px',
    height: '50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'var(--primary)',
    borderRadius: '50%',
    color: 'var(--white)'
  },
  statContent: {
    flex: 1
  },
  statNumber: {
    fontSize: '1.5rem',
    fontWeight: '900',
    color: 'var(--primary)',
    lineHeight: 1
  },
  statLabel: {
    fontSize: '0.875rem',
    color: 'var(--gray)',
    marginTop: 'var(--spacing-xs)'
  },
  tabsContainer: {
    display: 'flex',
    background: 'var(--white)',
    borderRadius: 'var(--radius-lg)',
    boxShadow: 'var(--shadow-md)',
    marginBottom: 'var(--spacing-2xl)',
    overflow: 'hidden',
    border: '1px solid var(--gray-light)'
  },
  tabButton: {
    flex: 1,
    padding: 'var(--spacing-lg) var(--spacing-xl)',
    background: 'transparent',
    border: 'none',
    fontSize: '1rem',
    fontWeight: '600',
    color: 'var(--gray)',
    cursor: 'pointer',
    transition: 'all var(--transition-fast)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'var(--spacing-sm)'
  },
  activeTab: {
    flex: 1,
    padding: 'var(--spacing-lg) var(--spacing-xl)',
    background: 'var(--primary)',
    border: 'none',
    fontSize: '1rem',
    fontWeight: '600',
    color: 'var(--white)',
    cursor: 'pointer',
    transition: 'all var(--transition-fast)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'var(--spacing-sm)',
    boxShadow: 'inset 0 3px 0 var(--secondary)'
  },
  tabIcon: {
    fontSize: '1.2rem'
  },
  tabCount: {
    fontSize: '0.875rem',
    opacity: 0.8
  },
  tabContent: {
    background: 'var(--white)',
    borderRadius: 'var(--radius-lg)',
    boxShadow: 'var(--shadow-md)',
    padding: 'var(--spacing-2xl)',
    border: '1px solid var(--gray-light)'
  },
  sectionHeader: {
    textAlign: 'center',
    marginBottom: 'var(--spacing-2xl)',
    paddingBottom: 'var(--spacing-lg)',
    borderBottom: '1px solid var(--gray-light)'
  },
  sectionTitle: {
    fontSize: 'var(--font-size-2xl)',
    fontWeight: '700',
    color: 'var(--dark)',
    marginBottom: 'var(--spacing-sm)'
  },
  sectionDescription: {
    fontSize: '1rem',
    color: 'var(--gray)',
    margin: 0
  },
  loadingContainer: {
    textAlign: 'center',
    padding: 'var(--spacing-3xl)',
    fontSize: '1.2rem',
    color: 'var(--gray)'
  },
  emptyState: {
    textAlign: 'center',
    padding: 'var(--spacing-3xl)',
    background: 'var(--gray-light)',
    borderRadius: 'var(--radius-lg)',
    border: '2px dashed var(--gray)'
  },
  emptyIcon: {
    fontSize: '3rem',
    marginBottom: 'var(--spacing-lg)'
  },
  emptyTitle: {
    fontSize: '1.25rem',
    fontWeight: '600',
    color: 'var(--dark)',
    marginBottom: 'var(--spacing-md)'
  },
  emptyDescription: {
    fontSize: '1rem',
    color: 'var(--gray)',
    lineHeight: 1.6,
    margin: 0
  },
  submissionsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
    gap: 'var(--spacing-xl)'
  },
  submissionCard: {
    background: 'var(--light)',
    borderRadius: 'var(--radius-lg)',
    padding: 'var(--spacing-xl)',
    border: '1px solid var(--gray-light)',
    transition: 'all var(--transition-fast)',
    '&:hover': {
      boxShadow: 'var(--shadow-lg)',
      transform: 'translateY(-2px)'
    }
  },
  submissionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 'var(--spacing-lg)',
    paddingBottom: 'var(--spacing-md)',
    borderBottom: '1px solid var(--gray-light)'
  },
  submissionMeta: {
    flex: 1
  },
  submissionName: {
    fontSize: '1.125rem',
    fontWeight: '700',
    color: 'var(--dark)',
    marginBottom: 'var(--spacing-xs)'
  },
  submissionEmail: {
    fontSize: '0.875rem',
    color: 'var(--primary)',
    marginBottom: 'var(--spacing-xs)'
  },
  submissionDate: {
    fontSize: '0.75rem',
    color: 'var(--gray)',
    margin: 0
  },
  submissionContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--spacing-md)'
  },
  subjectSection: {
    background: 'var(--white)',
    padding: 'var(--spacing-md)',
    borderRadius: 'var(--radius-md)',
    border: '1px solid var(--gray-light)'
  },
  subjectLabel: {
    fontSize: '0.875rem',
    fontWeight: '600',
    color: 'var(--dark)',
    marginBottom: 'var(--spacing-xs)'
  },
  subjectText: {
    fontSize: '1rem',
    color: 'var(--dark)',
    margin: 0,
    lineHeight: 1.5
  },
  messageSection: {
    background: 'var(--white)',
    padding: 'var(--spacing-md)',
    borderRadius: 'var(--radius-md)',
    border: '1px solid var(--gray-light)'
  },
  messageLabel: {
    fontSize: '0.875rem',
    fontWeight: '600',
    color: 'var(--dark)',
    marginBottom: 'var(--spacing-xs)'
  },
  messageText: {
    fontSize: '1rem',
    color: 'var(--dark)',
    margin: 0,
    lineHeight: 1.6,
    whiteSpace: 'pre-wrap'
  },
  subscribersGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: 'var(--spacing-lg)'
  },
  subscriberCard: {
    background: 'var(--light)',
    borderRadius: 'var(--radius-lg)',
    padding: 'var(--spacing-lg)',
    border: '1px solid var(--gray-light)',
    transition: 'all var(--transition-fast)',
    '&:hover': {
      boxShadow: 'var(--shadow-lg)',
      transform: 'translateY(-2px)'
    }
  },
  subscriberHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  subscriberInfo: {
    flex: 1
  },
  subscriberEmail: {
    fontSize: '1.125rem',
    fontWeight: '700',
    color: 'var(--primary)',
    marginBottom: 'var(--spacing-xs)'
  },
  subscriberDate: {
    fontSize: '0.875rem',
    color: 'var(--gray)',
    marginBottom: 'var(--spacing-xs)'
  },
  subscriberSource: {
    fontSize: '0.75rem',
    color: 'var(--gray)',
    margin: 0
  },
  deleteButton: {
    background: 'var(--error)',
    color: 'var(--white)',
    border: 'none',
    borderRadius: 'var(--radius-md)',
    padding: 'var(--spacing-sm)',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'all var(--transition-fast)',
    '&:hover': {
      background: 'var(--error-dark)',
      transform: 'scale(1.1)'
    }
  }
};
