import React from "react";
import "./AboutUs.css";

interface SectionProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

interface TeamMemberProps {
  name: string;
  role: string;
}

const Section = ({ title, children, className = "" }: SectionProps) => (
  <section className={`section ${className}`}>
    {title && <h2 className="section-title">{title}</h2>}
    {children}
  </section>
);

const TeamMember = ({ name, role }: TeamMemberProps) => (
  <div className="team-member">
    <h3 className="team-member-name">{name}</h3>
    <p className="team-member-role">{role}</p>
  </div>
);

function AboutUs() {
  const teamMembers: TeamMemberProps[] = [
    { name: 'Deepthi Girija thampi', role: 'Developer' },
    { name: 'Trevor Bell', role: 'Developer' },
    { name: 'Ian Stocker', role: 'Developer' },
    { name: 'Jermaine Strand', role: 'Developer' }
  ];

  return (
    <div className="page-background">
      <div className="about-us-container">
        <Section className="header-section">
          <h1 className="main-title">About Us</h1>
          <p className="subtitle">
            Learn more about the team behind Flavor Quest.
          </p>
        </Section>

        <Section title="Our Mission">
          <p className="mission-text">
            At Flavor Quest, our mission is to help people discover new, exciting recipes 
            based on the ingredients they have at home. We aim to reduce food waste 
            while making meal planning fun and easy.
          </p>
        </Section>

        <Section title="Meet the Team">
          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <TeamMember key={index} {...member} />
            ))}
          </div>
        </Section>

        <Section title="Our Journey">
          <p className="journey-text">
            Flavor Quest was started in 2024 by a group of food lovers and tech experts 
            who wanted to make it easier for people to cook delicious meals with what 
            they have on hand.
          </p>
        </Section>
      </div>
    </div>
  );
}

export default AboutUs;