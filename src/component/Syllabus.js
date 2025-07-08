import React, { useState } from 'react';
import { motion } from 'framer-motion';

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
};

export default function LandingPage() {
  const [theme, setTheme] = useState('light');
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <div className="w-full flex flex-col min-h-screen font-sans">
      {/* Header */}
      <header className="w-full bg-[var(--card-bg)] shadow-lg sticky top-0 z-50 px-4 sm:px-6 md:px-8 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-[var(--primary-color)]">Product School</h1>
        <button
          className="md:hidden text-[var(--text-color)] text-2xl"
          onClick={toggleNav}
          aria-label="Toggle navigation"
        >
          ☰
        </button>
        <nav className={`flex items-center gap-4 ${isNavOpen ? 'flex flex-col absolute top-16 left-0 right-0 bg-[var(--card-bg)] p-4' : 'hidden md:flex'}`}>
          <a href="#introduction" className="text-[var(--text-color)] hover:text-[var(--primary-color)]">Introduction to PM</a>
          <a href="#growth" className="text-[var(--text-color)] hover:text-[var(--primary-color)]">Growth PM</a>
          <a href="#technical" className="text-[var(--text-color)] hover:text-[var(--primary-color)]">Technical PM</a>
          <button
            className="bg-[var(--primary-color)] text-[var(--card-bg)] px-4 py-2 rounded-lg hover:bg-opacity-80 transition"
            onClick={() => window.location.href = '/register'}
          >
            Register
          </button>
          <button
            className="text-[var(--text-color)] text-xl"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </nav>
      </header>

      {/* Hero Section */}
      <motion.section
        className="w-full min-h-screen flex flex-col md:flex-row items-center justify-between bg-gradient-to-b from-[var(--secondary-color)] to-[var(--bg-color)] px-4 sm:px-6 md:px-8 py-20 gap-12"
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
      >
        <div className="w-full max-w-3xl">
          <motion.h2
            className="text-4xl md:text-6xl font-extrabold text-[var(--primary-color)] mb-6"
            variants={cardVariants}
          >
            Master Product Management with Product School
          </motion.h2>
          <motion.p
            className="text-lg md:text-xl text-[var(--text-color)] mb-8"
            variants={cardVariants}
          >
            Unlock your potential with our comprehensive courses in Introduction to PM, Growth PM, and Technical PM. Learn the skills to build, grow, and scale products effectively.
          </motion.p>
          <motion.button
            className="bg-[var(--primary-color)] text-[var(--card-bg)] px-8 py-4 rounded-xl shadow-md hover:bg-opacity-80 transition"
            onClick={() => window.location.href = '/register'}
            variants={cardVariants}
          >
            Start Learning Now
          </motion.button>
        </div>
        <motion.div
          className="w-full md:w-[550px] h-[400px] relative"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--secondary-color)]/30 to-[var(--primary-color)]/30 rounded-2xl"></div>
          <img
            src="/images/product-management.jpg"
            alt="Product Management Learning"
            className="w-full h-full object-cover rounded-2xl shadow-xl relative z-10"
          />
        </motion.div>
      </motion.section>

      {/* Introduction to PM Syllabus */}
      <motion.section
        id="introduction"
        className="w-full py-16 px-4 sm:px-6 md:px-8 bg-[var(--bg-color)]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--primary-color)] text-center mb-12">
            Introduction to Product Management Syllabus
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                lesson: 'Lesson 1: Introduction',
                description: 'Overview of product management roles and responsibilities.',
                objectives: ['Understand the role of a PM', 'Explore key skills required', 'Introduction to PM frameworks'],
                takeaways: 'Grasp the fundamentals of product management and its impact on business.'
              },
              {
                lesson: 'Lesson 2: Product Development Process',
                description: 'Learn the stages of developing a product from ideation to launch.',
                objectives: ['Identify development stages', 'Understand cross-functional roles', 'Map the process flow'],
                takeaways: 'Ability to outline a product development roadmap.'
              },
              {
                lesson: 'Lesson 3: Product Development Lifecycle (PDLC)',
                description: 'Dive into the PDLC, from discovery to retirement.',
                objectives: ['Learn PDLC phases', 'Analyze lifecycle management', 'Apply to real-world scenarios'],
                takeaways: 'Comprehensive understanding of PDLC and its application.'
              },
              {
                lesson: 'Lesson 4: Customer & Market Research',
                description: 'Techniques for gathering customer insights and market trends.',
                objectives: ['Conduct surveys and interviews', 'Analyze market data', 'Identify customer needs'],
                takeaways: 'Skills to perform effective customer and market research.'
              },
              {
                lesson: 'Lesson 5: Product Lifecycle',
                description: 'Understand the stages of a product’s life from launch to decline.',
                objectives: ['Explore lifecycle stages', 'Learn lifecycle management strategies', 'Case studies'],
                takeaways: 'Ability to manage products through their lifecycle.'
              },
              {
                lesson: 'Lesson 6: Prioritization Techniques',
                description: 'Methods to prioritize features and tasks effectively.',
                objectives: ['Learn frameworks like MoSCoW, RICE', 'Apply prioritization in scenarios', 'Balance trade-offs'],
                takeaways: 'Practical skills in prioritizing product features.'
              },
              {
                lesson: 'Lesson 7: Product Metrics Interactive',
                description: 'Interactive session on defining and measuring product success metrics.',
                objectives: ['Identify key metrics', 'Use analytics tools', 'Interpret data'],
                takeaways: 'Ability to define and track product metrics.'
              },
              {
                lesson: 'Lesson 8: Framing Product Opportunity',
                description: 'How to identify and articulate product opportunities.',
                objectives: ['Learn opportunity frameworks', 'Craft opportunity statements', 'Validate opportunities'],
                takeaways: 'Skills to frame and validate product opportunities.'
              },
              {
                lesson: 'Lesson 9: Market Research',
                description: 'Advanced techniques for competitive and market analysis.',
                objectives: ['Perform SWOT analysis', 'Analyze competitors', 'Use market research tools'],
                takeaways: 'In-depth market research capabilities.'
              },
              {
                lesson: 'Lesson 10: User Research',
                description: 'Methods to understand user needs and behaviors.',
                objectives: ['Conduct user interviews', 'Create personas', 'Map user journeys'],
                takeaways: 'Ability to conduct effective user research.'
              },
              {
                lesson: 'Lesson 11: Execution Strategy',
                description: 'Strategies for executing product plans effectively.',
                objectives: ['Develop execution plans', 'Align teams', 'Manage risks'],
                takeaways: 'Practical execution strategies for product delivery.'
              },
              {
                lesson: 'Lesson 12: Agile',
                description: 'Introduction to Agile methodologies for product management.',
                objectives: ['Understand Agile principles', 'Learn Scrum and Kanban', 'Apply Agile in PM'],
                takeaways: 'Ability to implement Agile in product workflows.'
              },
              {
                lesson: 'Lesson 13: PM Workflow',
                description: 'End-to-end workflow for product managers.',
                objectives: ['Map PM workflows', 'Integrate tools', 'Optimize processes'],
                takeaways: 'Streamlined workflow for efficient PM tasks.'
              },
              {
                lesson: 'Lesson 14: Vision Board',
                description: 'Creating a product vision to align teams and stakeholders.',
                objectives: ['Craft a vision statement', 'Build a vision board', 'Communicate vision'],
                takeaways: 'Skills to create and communicate a compelling product vision.'
              },
              {
                lesson: 'Lesson 15: Impact Effort Matrix',
                description: 'Using the Impact-Effort Matrix for decision-making.',
                objectives: ['Learn matrix construction', 'Evaluate tasks', 'Prioritize effectively'],
                takeaways: 'Ability to use Impact-Effort Matrix for prioritization.'
              },
              {
                lesson: 'Lesson 16: North Star Metrics',
                description: 'Defining and tracking North Star Metrics for product success.',
                objectives: ['Identify North Star Metrics', 'Align metrics with goals', 'Track performance'],
                takeaways: 'Skills to define and monitor critical product metrics.'
              },
              {
                lesson: 'Lesson 17: Product Strategy, RM, PRD',
                description: 'Crafting product strategy, roadmaps, and Product Requirements Documents.',
                objectives: ['Develop a product strategy', 'Create roadmaps', 'Write PRDs'],
                takeaways: 'Comprehensive skills in strategy and documentation.'
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                className="bg-[var(--card-bg)] p-6 rounded-2xl shadow-lg"
                variants={cardVariants}
                custom={idx}
              >
                <h3 className="text-xl font-bold text-[var(--primary-color)] mb-2">{item.lesson}</h3>
                <p className="text-[var(--text-color)] mb-4">{item.description}</p>
                <h4 className="text-lg font-semibold text-[var(--text-color)]">Objectives:</h4>
                <ul className="list-disc pl-5 text-[var(--text-color)] mb-4">
                  {item.objectives.map((obj, i) => <li key={i}>{obj}</li>)}
                </ul>
                <p className="text-[var(--text-color)]"><strong>Key Takeaway:</strong> {item.takeaways}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Growth PM Syllabus */}
      <motion.section
        id="growth"
        className="w-full py-16 px-4 sm:px-6 md:px-8 bg-[var(--secondary-color)]/20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--primary-color)] text-center mb-12">
            Growth Product Management Syllabus
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                topic: 'Dashboard',
                description: 'Building and interpreting growth dashboards for data-driven decisions.',
                objectives: ['Design effective dashboards', 'Track KPIs', 'Use analytics platforms'],
                takeaways: 'Skills to create and utilize growth dashboards.'
              },
              {
                topic: 'Growth PM',
                description: 'Core principles of growth product management.',
                objectives: ['Understand growth PM roles', 'Learn growth frameworks', 'Apply growth strategies'],
                takeaways: 'Foundation in driving product growth.'
              },
              {
                topic: 'Experimentation for Growth',
                description: 'Designing and running experiments to optimize product growth.',
                objectives: ['Plan A/B tests', 'Analyze experiment results', 'Iterate based on data'],
                takeaways: 'Ability to run effective growth experiments.'
              },
              {
                topic: 'Designing for Virality',
                description: 'Strategies to create viral product features.',
                objectives: ['Learn viral loop mechanics', 'Design shareable features', 'Measure virality'],
                takeaways: 'Skills to build viral product features.'
              },
              {
                topic: 'Scalability & Automation',
                description: 'Scaling products and automating growth processes.',
                objectives: ['Understand scalability challenges', 'Implement automation tools', 'Optimize workflows'],
                takeaways: 'Ability to scale products efficiently.'
              },
              {
                topic: 'Cross-Functional Collaboration',
                description: 'Collaborating with marketing, sales, and engineering for growth.',
                objectives: ['Align cross-functional teams', 'Facilitate communication', 'Drive joint initiatives'],
                takeaways: 'Effective collaboration skills for growth.'
              },
              {
                topic: 'Monetization & Alignment',
                description: 'Aligning growth strategies with monetization goals.',
                objectives: ['Explore monetization models', 'Align growth with revenue', 'Optimize pricing'],
                takeaways: 'Skills to balance growth and monetization.'
              },
              {
                topic: 'Localization & Expansion',
                description: 'Adapting products for global markets and expansion.',
                objectives: ['Learn localization strategies', 'Plan market expansion', 'Adapt to cultural needs'],
                takeaways: 'Ability to scale products globally.'
              },
              {
                topic: 'Marketing Exploration Process',
                description: 'Exploring marketing channels for product growth.',
                objectives: ['Identify growth channels', 'Test marketing strategies', 'Measure channel impact'],
                takeaways: 'Skills to explore and leverage marketing channels.'
              },
              {
                topic: 'Digital Marketing for Growth',
                description: 'Using digital marketing to drive product adoption.',
                objectives: ['Learn SEO, SEM, and social media strategies', 'Optimize campaigns', 'Measure ROI'],
                takeaways: 'Comprehensive digital marketing skills for growth.'
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                className="bg-[var(--card-bg)] p-6 rounded-2xl shadow-lg"
                variants={cardVariants}
                custom={idx}
              >
                <h3 className="text-xl font-bold text-[var(--primary-color)] mb-2">{item.topic}</h3>
                <p className="text-[var(--text-color)] mb-4">{item.description}</p>
                <h4 className="text-lg font-semibold text-[var(--text-color)]">Objectives:</h4>
                <ul className="list-disc pl-5 text-[var(--text-color)] mb-4">
                  {item.objectives.map((obj, i) => <li key={i}>{obj}</li>)}
                </ul>
                <p className="text-[var(--text-color)]"><strong>Key Takeaway:</strong> {item.takeaways}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Technical PM Syllabus */}
      <motion.section
        id="technical"
        className="w-full py-16 px-4 sm:px-6 md:px-8 bg-[var(--bg-color)]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--primary-color)] text-center mb-12">
            Technical Product Management Syllabus
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                topic: 'Frontend (FE)',
                description: 'Understanding frontend technologies and their role in product development.',
                objectives: ['Learn HTML, CSS, JavaScript basics', 'Understand frameworks like React', 'Collaborate with FE teams'],
                takeaways: 'Ability to work with frontend teams effectively.'
              },
              {
                topic: 'Backend (BE)',
                description: 'Overview of backend systems and their impact on products.',
                objectives: ['Understand server-side architecture', 'Learn APIs and databases', 'Align BE with product goals'],
                takeaways: 'Skills to collaborate with backend teams.'
              },
              {
                topic: 'APIs',
                description: 'Designing and managing APIs for product integration.',
                objectives: ['Learn API design principles', 'Understand REST and GraphQL', 'Test and document APIs'],
                takeaways: 'Ability to manage API-driven products.'
              },
              {
                topic: 'Database',
                description: 'Fundamentals of databases for product managers.',
                objectives: ['Understand relational and non-relational DBs', 'Learn querying basics', 'Optimize data storage'],
                takeaways: 'Skills to manage data-driven products.'
              },
              {
                topic: 'Business Requirements Document (BRD)',
                description: 'Crafting effective BRDs to align stakeholders.',
                objectives: ['Learn BRD structure', 'Document requirements', 'Communicate with stakeholders'],
                takeaways: 'Ability to write clear BRDs.'
              },
              {
                topic: 'Porter’s 5 Forces Analysis for PMs',
                description: 'Applying Porter’s 5 Forces to product strategy.',
                objectives: ['Understand competitive forces', 'Apply to product decisions', 'Analyze market dynamics'],
                takeaways: 'Skills to use Porter’s 5 Forces in PM.'
              },
              {
                topic: 'Brainstorming Techniques',
                description: 'Effective brainstorming methods for product innovation.',
                objectives: ['Learn brainstorming frameworks', 'Facilitate sessions', 'Generate ideas'],
                takeaways: 'Ability to lead creative brainstorming.'
              },
              {
                topic: 'Trade-offs',
                description: 'Making informed trade-off decisions as a PM.',
                objectives: ['Evaluate technical trade-offs', 'Balance cost, time, quality', 'Prioritize features'],
                takeaways: 'Skills to make strategic trade-off decisions.'
              },
              {
                topic: 'Understanding Trade-offs as a PM',
                description: 'Deep dive into trade-off analysis for technical PMs.',
                objectives: ['Analyze trade-off scenarios', 'Use decision matrices', 'Communicate trade-offs'],
                takeaways: 'Advanced trade-off decision-making skills.'
              },
              {
                topic: 'System Architecture',
                description: 'Understanding system architecture for product development.',
                objectives: ['Learn system design basics', 'Understand scalability', 'Collaborate with architects'],
                takeaways: 'Ability to contribute to system architecture discussions.'
              },
              {
                topic: 'Github',
                description: 'Using GitHub for version control and collaboration.',
                objectives: ['Learn GitHub workflows', 'Manage repositories', 'Collaborate with developers'],
                takeaways: 'Skills to use GitHub in product workflows.'
              },
              {
                topic: 'Microservices',
                description: 'Introduction to microservices architecture.',
                objectives: ['Understand microservices principles', 'Learn benefits and challenges', 'Apply to product design'],
                takeaways: 'Knowledge of microservices for product development.'
              },
              {
                topic: 'Microservices Architecture',
                description: 'Advanced concepts in microservices for PMs.',
                objectives: ['Dive into microservices design', 'Manage inter-service communication', 'Optimize performance'],
                takeaways: 'Advanced skills in microservices management.'
              },
              {
                topic: 'Security',
                description: 'Incorporating security into product management.',
                objectives: ['Learn security best practices', 'Understand compliance', 'Mitigate risks'],
                takeaways: 'Ability to prioritize security in products.'
              },
              {
                topic: 'Load Balancing',
                description: 'Managing load balancing for scalable products.',
                objectives: ['Understand load balancing concepts', 'Learn implementation strategies', 'Optimize performance'],
                takeaways: 'Skills to ensure scalable product performance.'
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                className="bg-[var(--card-bg)] p-6 rounded-2xl shadow-lg"
                variants={cardVariants}
                custom={idx}
              >
                <h3 className="text-xl font-bold text-[var(--primary-color)] mb-2">{item.topic}</h3>
                <p className="text-[var(--text-color)] mb-4">{item.description}</p>
                <h4 className="text-lg font-semibold text-[var(--text-color)]">Objectives:</h4>
                <ul className="list-disc pl-5 text-[var(--text-color)] mb-4">
                  {item.objectives.map((obj, i) => <li key={i}>{obj}</li>)}
                </ul>
                <p className="text-[var(--text-color)]"><strong>Key Takeaway:</strong> {item.takeaways}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
}