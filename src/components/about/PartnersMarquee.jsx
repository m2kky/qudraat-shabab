
import React from 'react';
import { partners } from '../../data/aboutData.jsx';

const PartnersMarquee = () => {
  return (
    <section className="partners-marquee">
      <h2>Our Partners</h2>
      <div className="marquee">
        <div className="marquee-content">
          {partners.map((partner, index) => (
            <div key={index} className="partner-logo">
              <img src={partner.logo} alt={partner.name} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersMarquee;
