
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { team } from '../../data/aboutData.jsx';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const TeamGrid = () => {
  return (
    <section style={styles.section} dir="rtl">
      <div className="container" style={styles.container}>
        <h2 style={styles.title}>فريقنا</h2>
        <div className="wavy-line"></div>
        
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 30,
            },
          }}
          style={styles.swiper}
        >
          {team.map((member, index) => (
            <SwiperSlide key={index}>
              <div className="team-card" style={styles.teamCard}>
                <div className="team-image-container" style={styles.imageContainer}>
                  <img src={member.image} alt={member.name} className="member-image" style={styles.memberImage} />
                  <div className="team-overlay" style={styles.overlay}>
                    <div className="social-links" style={styles.socialLinks}>
                      {member.socials.twitter && (
                        <a href={member.socials.twitter} target="_blank" rel="noopener noreferrer" style={styles.socialLink}>
                          <svg style={styles.socialIcon} viewBox="0 0 24 24" fill="currentColor">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                          </svg>
                        </a>
                      )}
                      {member.socials.linkedin && (
                        <a href={member.socials.linkedin} target="_blank" rel="noopener noreferrer" style={styles.socialLink}>
                          <svg style={styles.socialIcon} viewBox="0 0 24 24" fill="currentColor">
                            <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"/>
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
                <div className="team-info" style={styles.teamInfo}>
                  <h3 style={styles.memberName}>{member.name}</h3>
                  <p style={styles.memberRole}>{member.role}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      
      {/* CSS for wavy line and team styles */}
      <style jsx>{`
        .wavy-line {
          width: 200px;
          height: 4px;
          background: var(--primary);
          margin: 0 auto var(--spacing-2xl);
          border-radius: 2px;
          position: relative;
        }
        
        .wavy-line::before {
          content: '';
          position: absolute;
          top: -2px;
          left: -10px;
          right: -10px;
          height: 8px;
          background: var(--primary);
          border-radius: 4px;
          transform: skewY(-2deg);
        }
        
        .wavy-line::after {
          content: '';
          position: absolute;
          top: 2px;
          left: -5px;
          right: -5px;
          height: 4px;
          background: var(--primary);
          border-radius: 2px;
          transform: skewY(1deg);
        }
        
        .team-card {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .team-card:hover {
          transform: translateY(-12px) scale(1.03);
          box-shadow: 0 25px 50px rgba(5, 23, 162, 0.2);
          border-color: var(--primary);
        }
        
        .team-card:hover .member-image {
          transform: scale(1.1);
        }
        
        .team-image-container:hover .team-overlay {
          opacity: 1;
        }
        
        .team-overlay {
          transition: opacity 0.4s ease;
        }
        
        .social-link {
          transition: all 0.3s ease;
        }
        
        .social-link:hover {
          transform: scale(1.15) translateY(-2px);
          background: rgba(255, 255, 255, 0.25);
          border-color: rgba(255, 255, 255, 0.5);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
        }
        
        /* Swiper custom styles */
        .swiper-button-next,
        .swiper-button-prev {
          color: var(--primary);
          background: white;
          border-radius: 50%;
          width: 55px;
          height: 55px;
          box-shadow: 0 8px 25px rgba(5, 23, 162, 0.15);
          border: 2px solid rgba(5, 23, 162, 0.1);
          transition: all 0.3s ease;
        }
        
        .swiper-button-next:hover,
        .swiper-button-prev:hover {
          background: var(--primary);
          color: white;
          transform: scale(1.1);
          box-shadow: 0 12px 35px rgba(5, 23, 162, 0.25);
        }
        
        .swiper-button-next:after,
        .swiper-button-prev:after {
          font-size: 22px;
          font-weight: bold;
        }
        
        .swiper-pagination-bullet {
          background: var(--primary);
          opacity: 0.3;
          width: 12px;
          height: 12px;
          transition: all 0.3s ease;
        }
        
        .swiper-pagination-bullet-active {
          opacity: 1;
          background: var(--primary);
          transform: scale(1.2);
        }
      `}</style>
    </section>
  );
};

export default TeamGrid;

const styles = {
  section: {
    background: 'var(--light)',
    padding: 'var(--spacing-3xl) 0',
    position: 'relative'
  },
  container: {
    maxWidth: 1200,
    margin: '0 auto',
    padding: '0 var(--spacing-md)'
  },
  title: {
    color: 'var(--primary)',
    fontWeight: 900,
    textAlign: 'center',
    marginBottom: 'var(--spacing-md)',
    fontSize: 'var(--font-size-3xl)'
  },
  swiper: {
    padding: 'var(--spacing-xl) 0',
    margin: '0 auto'
  },
  teamCard: {
    background: 'var(--white)',
    borderRadius: '20px',
    boxShadow: '0 10px 30px rgba(5, 23, 162, 0.1)',
    overflow: 'hidden',
    textAlign: 'center',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid rgba(5, 23, 162, 0.1)',
    position: 'relative'
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: '280px',
    overflow: 'hidden',
    borderRadius: '20px 20px 0 0'
  },
  memberImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.4s ease',
    filter: 'brightness(1.05) contrast(1.1)'
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, rgba(5, 23, 162, 0.9) 0%, rgba(5, 23, 162, 0.7) 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0,
    transition: 'opacity 0.4s ease',
    backdropFilter: 'blur(5px)'
  },
  socialLinks: {
    display: 'flex',
    gap: 'var(--spacing-lg)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  socialLink: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    background: 'rgba(255, 255, 255, 0.15)',
    color: 'white',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
    backdropFilter: 'blur(10px)',
    border: '2px solid rgba(255, 255, 255, 0.3)',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)'
  },
  socialIcon: {
    width: '20px',
    height: '20px',
    fill: 'currentColor'
  },
  teamInfo: {
    padding: 'var(--spacing-xl) var(--spacing-lg)',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #f8f9ff 0%, #ffffff 100%)',
    position: 'relative'
  },
  memberName: {
    color: 'var(--dark)',
    fontSize: '1.25rem',
    fontWeight: 800,
    margin: '0 0 var(--spacing-sm) 0',
    lineHeight: 1.3,
    textAlign: 'center'
  },
  memberRole: {
    color: 'var(--primary)',
    fontSize: '1rem',
    fontWeight: 600,
    margin: 0,
    lineHeight: 1.4,
    textAlign: 'center',
    background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text'
  }
};
