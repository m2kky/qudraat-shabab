
import React from 'react';
import { team } from '../../data/aboutData';

const TeamGrid = () => {
  return (
    <section className="team-grid">
      <h2>Our Team</h2>
      <div className="grid">
        {team.map((member, index) => (
          <div key={index} className="team-card">
            <img src={member.image} alt={member.name} />
            <h3>{member.name}</h3>
            <p>{member.role}</p>
            <div className="socials">
              <a href={member.socials.twitter}>Twitter</a>
              <a href={member.socials.linkedin}>LinkedIn</a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TeamGrid;
