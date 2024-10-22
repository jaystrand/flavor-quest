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
  <section className={`mb-12 ${className}`}>
    {title && <h2 className="text-2xl font-bold mb-4">{title}</h2>}
    {children}
  </section>
);

const TeamMember = ({ name, role }: TeamMemberProps) => (
  <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
    <h3 className="text-xl font-semibold mb-2">{name}</h3>
    <p className="text-gray-600">{role}</p>
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
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Section className="text-center">
        <h1 className="text-4xl font-bold mb-4">About Us</h1>
        <p className="text-lg text-gray-600">
          Learn more about the team behind Flavor Quest.
        </p>
      </Section>

      <Section title="Our Mission">
        <p className="text-gray-700 leading-relaxed">
          At Flavor Quest, our mission is to help people discover new, exciting recipes 
          based on the ingredients they have at home. We aim to reduce food waste 
          while making meal planning fun and easy.
        </p>
      </Section>

      <Section title="Meet the Team">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {teamMembers.map((member, index) => (
            <TeamMember key={index} {...member} />
          ))}
        </div>
      </Section>

      <Section title="Our Journey">
        <p className="text-gray-700 leading-relaxed">
          Flavor Quest was started in 2024 by a group of food lovers and tech experts 
          who wanted to make it easier for people to cook delicious meals with what 
          they have on hand.
        </p>
      </Section>
    </div>
  );
}

export default AboutUs;