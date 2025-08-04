import React, { useState } from 'react';
import { motion } from 'framer-motion';
import OurValue from './OurValue'
import Enroll from './Enroll'
import LandingPageFeatures from './LandingPageFeatures';
import SprintCohort from './SprintCohort';
import CohortStarts from './CohortStarts'
import StudentsProjects from './StudentsProjects'

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
  const [openSections, setOpenSections] = useState({
    introduction: false,
    growth: false,
    technical: false,
  });

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className="w-full flex flex-col font-sans mt-10">
    
      {/* Hero Section */}
   <motion.section
   
  className="w-full min-h-screen flex flex-col md:flex-row items-center justify-between 
             bg-gradient-to-r from-amber-800/20 to-amber-600/20
             dark:from-[#1f1f1f] dark:via-[#2c2c2c] dark:to-[#1f1f1f]
             px-4 sm:px-6 md:px-8 py-20 gap-12"
  initial="hidden"
  animate="visible"
  variants={sectionVariants}
>
        
        <div className="w-full max-w-3xl">
          
   
            <CohortStarts/>
            
          <motion.h2
            className="text-4xl md:text-6xl font-extrabold text-amber-800 mb-6"
            variants={cardVariants}
          >
          Master Product Management with <span className="text-orange-700">TheSprintSchool</span>

          </motion.h2>
          <motion.p
            className="text-lg md:text-xl text-[var(--text-color)] mb-8"
            variants={cardVariants}
          >
            Unlock your potential with our comprehensive courses in Introduction to PM, Growth PM, and Technical PM. Learn the skills to build, grow, and scale products effectively.
          </motion.p>
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
  <motion.button
    className="bg-amber-800 text-white px-6 py-3 rounded-lg shadow-md hover:bg-amber-900 transition font-semibold w-full sm:w-auto"
    onClick={() => window.location.href = '/sprintify'}
    variants={cardVariants}
  >
    🛠 Hands-on Tools
  </motion.button>

  <motion.button
    className="bg-gray-100 text-amber-900 px-6 py-3 rounded-lg shadow-md hover:bg-amber-900 hover:text-white transition font-semibold w-full sm:w-auto"
    onClick={() => window.location.href = '/register'}
    variants={cardVariants}
  >
    🚀 Start Learning Now
  </motion.button>
</div>

        </div>

          
        <motion.div
          className="w-full md:w-[550px] h-[400px] relative"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-amber-800/20 to-amber-600/20 rounded-2xl"></div>
          <img
            src="/landingpage.png"
            alt="Product Management Learning"
            className="w-full h-full object-cover rounded-2xl shadow-xl relative z-10"
          />
        </motion.div>
      </motion.section>
        <StudentsProjects/>
 
         <SprintCohort/>
      <OurValue/>

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
          <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
            <div className="w-full md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold text-amber-800 mb-4">
                Introduction to Product Management
              </h2>
              <p className="text-lg text-[var(--text-color)]">
                Build a strong foundation in product management with this comprehensive course covering roles, processes, research, and strategy. Perfect for beginners and aspiring PMs.
              </p>
              <button
                className="mt-6 bg-amber-800 text-white px-6 py-3 rounded-lg hover:bg-amber-900 transition"
                onClick={() => toggleSection('introduction')}
              >
                {openSections.introduction ? 'Hide Syllabus' : 'View Syllabus'}
              </button>
            </div>
           <div className="w-full md:w-1/2 h-[300px]">
  <img
    src="Fundamental.png"
    alt="Fundamental PM"
    className="w-full h-full object-contain rounded-2xl shadow-lg"
  />
</div>

          </div>
          {openSections.introduction && (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
              initial="hidden"
              animate="visible"
              variants={sectionVariants}
            >
              {[
                {
                  lesson: 'Lesson 1: Introduction',
                  description: 'Overview of product management roles and responsibilities.',
                  objectives: ['Understand the role of a PM', 'Explore key skills required', 'Introduction to PM frameworks'],
                  takeaways: 'Grasp the fundamentals of product management and its impact on business.',
                  icon: <svg className="w-6 h-6 text-amber-800" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z" /></svg>,
                },
                {
                  lesson: 'Lesson 2: Product Development Process',
                  description: 'Learn the stages of developing a product from ideation to launch.',
                  objectives: ['Identify development stages', 'Understand cross-functional roles', 'Map the process flow'],
                  takeaways: 'Ability to outline a product development roadmap.',
                  icon: <svg className="w-6 h-6 text-amber-800" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z" /></svg>,
                },
                {
                  lesson: 'Lesson 3: Product Development Lifecycle (PDLC)',
                  description: 'Dive into the PDLC, from discovery to retirement.',
                  objectives: ['Learn PDLC phases', 'Analyze lifecycle management', 'Apply to real-world scenarios'],
                  takeaways: 'Comprehensive understanding of PDLC and its application.',
                  icon: <svg className="w-6 h-6 text-amber-800" fill="currentColor" viewBox="0 0 24 24"><path d="M12 6v6l4 2" /></svg>,
                },
                {
                  lesson: 'Lesson 4: Customer & Market Research',
                  description: 'Techniques for gathering customer insights and market trends.',
                  objectives: ['Conduct surveys and interviews', 'Analyze market data', 'Identify customer needs'],
                  takeaways: 'Skills to perform effective customer and market research.',
                  icon: <svg className="w-6 h-6 text-amber-800" fill="currentColor" viewBox="0 0 24 24"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" /></svg>,
                },
                {
                  lesson: 'Lesson 5: Product Lifecycle',
                  description: 'Understand the stages of a product’s life from launch to decline.',
                  objectives: ['Explore lifecycle stages', 'Learn lifecycle management strategies', 'Case studies'],
                  takeaways: 'Ability to manage products through their lifecycle.',
                  icon: <svg className="w-6 h-6 text-amber-800" fill="currentColor" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4" /></svg>,
                },
                {
                  lesson: 'Lesson 6: Prioritization Techniques',
                  description: 'Methods to prioritize features and tasks effectively.',
                  objectives: ['Learn frameworks like MoSCoW, RICE', 'Apply prioritization in scenarios', 'Balance trade-offs'],
                  takeaways: 'Practical skills in prioritizing product features.',
                  icon: <svg className="w-6 h-6 text-amber-800" fill="currentColor" viewBox="0 0 24 24"><path d="M5 13h14v-2H5v2zm-2 6h14v-2H3v2zM3 7v2h14V7H3z" /></svg>,
                },
                {
                  lesson: 'Lesson 7: Product Metrics Interactive',
                  description: 'Interactive session on defining and measuring product success metrics.',
                  objectives: ['Identify key metrics', 'Use analytics tools', 'Interpret data'],
                  takeaways: 'Ability to define and track product metrics.',
                  icon: <svg className="w-6 h-6 text-amber-800" fill="currentColor" viewBox="0 0 24 24"><path d="M4 4h16v16H4z" /></svg>,
                },
                {
                  lesson: 'Lesson 8: Framing Product Opportunity',
                  description: 'How to identify and articulate product opportunities.',
                  objectives: ['Learn opportunity frameworks', 'Craft opportunity statements', 'Validate opportunities'],
                  takeaways: 'Skills to frame and validate product opportunities.',
                  icon: <svg className="w-6 h-6 text-amber-800" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l10 20H2L12 2z" /></svg>,
                },
                {
                  lesson: 'Lesson 9: Market Research',
                  description: 'Advanced techniques for competitive and market analysis.',
                  objectives: ['Perform SWOT analysis', 'Analyze competitors', 'Use market research tools'],
                  takeaways: 'In-depth market research capabilities.',
                  icon: <svg className="w-6 h-6 text-amber-800" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z" /></svg>,
                },
                {
                  lesson: 'Lesson 10: User Research',
                  description: 'Methods to understand user needs and behaviors.',
                  objectives: ['Conduct user interviews', 'Create personas', 'Map user journeys'],
                  takeaways: 'Ability to conduct effective user research.',
                  icon: <svg className="w-6 h-6 text-amber-800" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm0 2c-4 0-8 2-8 4v2h16v-2c0-2-4-4-8-4z" /></svg>,
                },
                {
                  lesson: 'Lesson 11: Execution Strategy',
                  description: 'Strategies for executing product plans effectively.',
                  objectives: ['Develop execution plans', 'Align teams', 'Manage risks'],
                  takeaways: 'Practical execution strategies for product delivery.',
                  icon: <svg className="w-6 h-6 text-amber-800" fill="currentColor" viewBox="0 0 24 24"><path d="M10 9V5l-7 7 7 7v-4l7-7-7-7z" /></svg>,
                },
                {
                  lesson: 'Lesson 12: Agile',
                  description: 'Introduction to Agile methodologies for product management.',
                  objectives: ['Understand Agile principles', 'Learn Scrum and Kanban', 'Apply Agile in PM'],
                  takeaways: 'Ability to implement Agile in product workflows.',
                  icon: <svg className="w-6 h-6 text-amber-800" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2v20m10-10H2" /></svg>,
                },
                {
                  lesson: 'Lesson 13: PM Workflow',
                  description: 'End-to-end workflow for product managers.',
                  objectives: ['Map PM workflows', 'Integrate tools', 'Optimize processes'],
                  takeaways: 'Streamlined workflow for efficient PM tasks.',
                  icon: <svg className="w-6 h-6 text-amber-800" fill="currentColor" viewBox="0 0 24 24"><path d="M5 3l3 3h8l3-3H5z" /></svg>,
                },
                {
                  lesson: 'Lesson 14: Vision Board',
                  description: 'Creating a product vision to align teams and stakeholders.',
                  objectives: ['Craft a vision statement', 'Build a vision board', 'Communicate vision'],
                  takeaways: 'Skills to create and communicate a compelling product vision.',
                  icon: <svg className="w-6 h-6 text-amber-800" fill="currentColor" viewBox="0 0 24 24"><path d="M12 4.5C7 4.5 2.7 7.6 1 12c1.7 4.4 6 7.5 11 7.5s9.3-3.1 11-7.5C21.3 7.6 17 4.5 12 4.5z" /></svg>,
                },
                {
                  lesson: 'Lesson 15: Impact Effort Matrix',
                  description: 'Using the Impact-Effort Matrix for decision-making.',
                  objectives: ['Learn matrix construction', 'Evaluate tasks', 'Prioritize effectively'],
                  takeaways: 'Ability to use Impact-Effort Matrix for prioritization.',
                  icon: <svg className="w-6 h-6 text-amber-800" fill="currentColor" viewBox="0 0 24 24"><path d="M3 3h18v18H3z" /></svg>,
                },
                {
                  lesson: 'Lesson 16: North Star Metrics',
                  description: 'Defining and tracking North Star Metrics for product success.',
                  objectives: ['Identify North Star Metrics', 'Align metrics with goals', 'Track performance'],
                  takeaways: 'Skills to define and monitor critical product metrics.',
                  icon: <svg className="w-6 h-6 text-amber-800" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l2.4 7.2h7.6l-6 4.8 2.3 7.2-6.3-4.8-6.3 4.8 2.3-7.2-6-4.8h7.6z" /></svg>,
                },
                {
                  lesson: 'Lesson 17: Product Strategy, RM, PRD',
                  description: 'Crafting product strategy, roadmaps, and Product Requirements Documents.',
                  objectives: ['Develop a product strategy', 'Create roadmaps', 'Write PRDs'],
                  takeaways: 'Comprehensive skills in strategy and documentation.',
                  icon: <svg className="w-6 h-6 text-amber-800" fill="currentColor" viewBox="0 0 24 24"><path d="M6 2h12v6H6zM6 10h12v6H6z" /></svg>,
                },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  className="bg-[var(--card-bg)] p-6 rounded-2xl shadow-lg flex items-start gap-4"
                  variants={cardVariants}
                  custom={idx}
                >
                  <div className="flex-shrink-0">{item.icon}</div>
                  <div>
                    <h3 className="text-xl font-bold text-amber-800 mb-2">{item.lesson}</h3>
                    <p className="text-[var(--text-color)] mb-4">{item.description}</p>
                    <h4 className="text-lg font-semibold text-[var(--text-color)]">Objectives:</h4>
                    <ul className="list-disc pl-5 text-[var(--text-color)] mb-4">
                      {item.objectives.map((obj, i) => <li key={i}>{obj}</li>)}
                    </ul>
                    <p className="text-[var(--text-color)]"><strong>Key Takeaway:</strong> {item.takeaways}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </motion.section>

      {/* Growth PM Syllabus */}
      <motion.section
        id="growth"
        className="w-full py-16 px-4 sm:px-6 md:px-8 bg-amber-800/10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
            <div className="w-full md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold text-amber-800 mb-4">
                Growth Product Management
              </h2>
              <p className="text-lg text-[var(--text-color)]">
                Learn advanced strategies to drive product growth, from experimentation and virality to digital marketing and global expansion.
              </p>
              <button
                className="mt-6 bg-amber-800 text-white px-6 py-3 rounded-lg hover:bg-amber-900 transition"
                onClick={() => toggleSection('growth')}
              >
                {openSections.growth ? 'Hide Syllabus' : 'View Syllabus'}
              </button>
            </div>
           <div className="w-full md:w-1/2 h-[300px]">
  <img
    src="Growth.png"
    alt="Growth PM"
    className="w-full h-full object-contain rounded-2xl shadow-lg"
  />
</div>

          </div>
          {openSections.growth && (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
              initial="hidden"
              animate="visible"
              variants={sectionVariants}
            >
              {[
                {
                  topic: 'Dashboard',
                  description: 'Building and interpreting growth dashboards for data-driven decisions.',
                  objectives: ['Design effective dashboards', 'Track KPIs', 'Use analytics platforms'],
                  takeaways: 'Skills to create and utilize growth dashboards.',
                  icon: <svg className="w-6 h-6 text-amber-800" fill="currentColor" viewBox="0 0 24 24"><path d="M3 3h8v8H3zM3 13h8v8H3zM13 3h8v8h-8zM13 13h8v8h-8z" /></svg>,
                },
                {
                  topic: 'Growth PM',
                  description: 'Core principles of growth product management.',
                  objectives: ['Understand growth PM roles', 'Learn growth frameworks', 'Apply growth strategies'],
                  takeaways: 'Foundation in driving product growth.',
                  icon: <svg className="w-6 h-6 text-amber-800" fill="currentColor" viewBox="0 0 24 24"><path d="M3 13h8v8H3z" /></svg>,
                },
                {
                  topic: 'Experimentation for Growth',
                  description: 'Designing and running experiments to optimize product growth.',
                  objectives: ['Plan A/B tests', 'Analyze experiment results', 'Iterate based on data'],
                  takeaways: 'Ability to run effective growth experiments.',
                  icon: <svg className="w-6 h-6 text-amber-800" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2v20m10-10H2" /></svg>,
                },
                {
                  topic: 'Designing for Virality',
                  description: 'Strategies to create viral product features.',
                  objectives: ['Learn viral loop mechanics', 'Design shareable features', 'Measure virality'],
                  takeaways: 'Skills to build viral product features.',
                  icon: <svg className="w-6 h-6 text-amber-800" fill="currentColor" viewBox="0 0 24 24"><path d="M18 3v18M6 9h12M6 15h12" /></svg>,
                },
                {
                  topic: 'Scalability & Automation',
                  description: 'Scaling products and automating growth processes.',
                  objectives: ['Understand scalability challenges', 'Implement automation tools', 'Optimize workflows'],
                  takeaways: 'Ability to scale products efficiently.',
                  icon: <svg className="w-6 h-6 text-amber-800" fill="currentColor" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4" /></svg>,
                },
                {
                  topic: 'Cross-Functional Collaboration',
                  description: 'Collaborating with marketing, sales, and engineering for growth.',
                  objectives: ['Align cross-functional teams', 'Facilitate communication', 'Drive joint initiatives'],
                  takeaways: 'Effective collaboration skills for growth.',
                  icon: <svg className="w-6 h-6 text-amber-800" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm0 2c-4 0-8 2-8 4v2h16v-2c0-2-4-4-8-4z" /></svg>,
                },
                {
                  topic: 'Monetization & Alignment',
                  description: 'Aligning growth strategies with monetization goals.',
                  objectives: ['Explore monetization models', 'Align growth with revenue', 'Optimize pricing'],
                  takeaways: 'Skills to balance growth and monetization.',
                  icon: <svg className="w-6 h-6 text-amber-800" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z" /></svg>,
                },
                {
                  topic: 'Localization & Expansion',
                  description: 'Adapting products for global markets and expansion.',
                  objectives: ['Learn localization strategies', 'Plan market expansion', 'Adapt to cultural needs'],
                  takeaways: 'Ability to scale products globally.',
                  icon: <svg className="w-6 h-6 text-amber-800" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z" /></svg>,
                },
                {
                  topic: 'Marketing Exploration Process',
                  description: 'Exploring marketing channels for product growth.',
                  objectives: ['Identify growth channels', 'Test marketing strategies', 'Measure channel impact'],
                  takeaways: 'Skills to explore and leverage marketing channels.',
                  icon: <svg className="w-6 h-6 text-amber-800" fill="currentColor" viewBox="0 0 24 24"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" /></svg>,
                },
           
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  className="bg-[var(--card-bg)] p-6 rounded-2xl shadow-lg flex items-start gap-4"
                  variants={cardVariants}
                  custom={idx}
                >
                  <div className="flex-shrink-0">{item.icon}</div>
                  <div>
                    <h3 className="text-xl font-bold text-amber-800 mb-2">{item.topic}</h3>
                    <p className="text-[var(--text-color)] mb-4">{item.description}</p>
                    <h4 className="text-lg font-semibold text-[var(--text-color)]">Objectives:</h4>
                    <ul className="list-disc pl-5 text-[var(--text-color)] mb-4">
                      {item.objectives.map((obj, i) => <li key={i}>{obj}</li>)}
                    </ul>
                    <p className="text-[var(--text-color)]"><strong>Key Takeaway:</strong> {item.takeaways}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
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
          <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
            <div className="w-full md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold text-amber-800 mb-4">
                Technical Product Management
              </h2>
              <p className="text-lg text-[var(--text-color)]">
                Master the technical skills needed to work effectively with engineering teams, covering frontend, backend, APIs, and system architecture.
              </p>
              <button
                className="mt-6 bg-amber-800 text-white px-6 py-3 rounded-lg hover:bg-amber-900 transition"
                onClick={() => toggleSection('technical')}
              >
                {openSections.technical ? 'Hide Syllabus' : 'View Syllabus'}
              </button>
            </div>
            <div className="w-full md:w-1/2 h-[300px]">
  <img
    src="TPM.png"
    alt="TPM "
    className="w-full h-full object-contain rounded-2xl shadow-lg"
  />
</div>
          </div>
          {openSections.technical && (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
              initial="hidden"
              animate="visible"
              variants={sectionVariants}
            >
              {[
                {
                  topic: 'Frontend (FE)',
                  description: 'Understanding frontend technologies and their role in product development.',
                  objectives: ['Learn HTML, CSS, JavaScript basics', 'Understand frameworks like React', 'Collaborate with FE teams'],
                  takeaways: 'Ability to work with frontend teams effectively.',
                  icon: <svg className="w-6 h-6 text-amber-800" fill="currentColor" viewBox="0 0 24 24"><path d="M3 3h18v18H3z" /></svg>,
                },
                {
                  topic: 'Backend (BE)',
                  description: 'Overview of backend systems and their impact on products.',
                  objectives: ['Understand server-side architecture', 'Learn APIs and databases', 'Align BE with product goals'],
                  takeaways: 'Skills to collaborate with backend teams.',
                  icon: <svg className="w-6 h-6 text-amber-800" fill="currentColor" viewBox="0 0 24 24"><path d="M5 3h14v18H5z" /></svg>,
                },
                {
                  topic: 'APIs',
                  description: 'Designing and managing APIs for product integration.',
                  objectives: ['Learn API design principles', 'Understand REST and GraphQL', 'Test and document APIs'],
                  takeaways: 'Ability to manage API-driven products.',
                  icon: <svg className="w-6 h-6 text-amber-800" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2v20m10-10H2" /></svg>,
                },
                {
                  topic: 'Database',
                  description: 'Fundamentals of databases for product managers.',
                  objectives: ['Understand relational and non-relational DBs', 'Learn querying basics', 'Optimize data storage'],
                  takeaways: 'Skills to manage data-driven products.',
                  icon: <svg className="w-6 h-6 text-amber-800" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2a10 10 0 0 0-10 10v6a10 10 0 0 0 20 0v-6A10 10 0 0 0 12 2z" /></svg>,
                },
                {
                  topic: 'Business Requirements Document (BRD)',
                  description: 'Crafting effective BRDs to align stakeholders.',
                  objectives: ['Learn BRD structure', 'Document requirements', 'Communicate with stakeholders'],
                  takeaways: 'Ability to write clear BRDs.',
                  icon: <svg className="w-6 h-6 text-amber-800" fill="currentColor" viewBox="0 0 24 24"><path d="M6 2h12v20H6z" /></svg>,
                },
                {
                  topic: 'Porter’s 5 Forces Analysis for PMs',
                  description: 'Applying Porter’s 5 Forces to product strategy.',
                  objectives: ['Understand competitive forces', 'Apply to product decisions', 'Analyze market dynamics'],
                  takeaways: 'Skills to use Porter’s 5 Forces in PM.',
                  icon: <svg className="w-6 h-6 text-amber-800" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l10 20H2L12 2z" /></svg>,
                },
                {
                  topic: 'Brainstorming Techniques',
                  description: 'Effective brainstorming methods for product innovation.',
                  objectives: ['Learn brainstorming frameworks', 'Facilitate sessions', 'Generate ideas'],
                  takeaways: 'Ability to lead creative brainstorming.',
                  icon: <svg className="w-6 h-6 text-amber-800" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z" /></svg>,
                },
                {
                  topic: 'Trade-offs',
                  description: 'Making informed trade-off decisions as a PM.',
                  objectives: ['Evaluate technical trade-offs', 'Balance cost, time, quality', 'Prioritize features'],
                  takeaways: 'Skills to make strategic trade-off decisions.',
                  icon: <svg className="w-6 h-6 text-amber-800" fill="currentColor" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4" /></svg>,
                },
                {
                  topic: 'Understanding Trade-offs as a PM',
                  description: 'Deep dive into trade-off analysis for technical PMs.',
                  objectives: ['Analyze trade-off scenarios', 'Use decision matrices', 'Communicate trade-offs'],
                  takeaways: 'Advanced trade-off decision-making skills.',
                  icon: <svg className="w-6 h-6 text-amber-800" fill="currentColor" viewBox="0 0 24 24"><path d="M3 13h8v8H3z" /></svg>,
                },
                {
                  topic: 'System Architecture',
                  description: 'Understanding system architecture for product development.',
                  objectives: ['Learn system design basics', 'Understand scalability', 'Collaborate with architects'],
                  takeaways: 'Ability to contribute to system architecture discussions.',
                  icon: <svg className="w-6 h-6 text-amber-800" fill="currentColor" viewBox="0 0 24 24"><path d="M3 3h8v8H3zM13 3h8v8h-8zM3 13h8v8H3zM13 13h8v8h-8z" /></svg>,
                },
                {
                  topic: 'Github',
                  description: 'Using GitHub for version control and collaboration.',
                  objectives: ['Learn GitHub workflows', 'Manage repositories', 'Collaborate with developers'],
                  takeaways: 'Skills to use GitHub in product workflows.',
                  icon: <svg className="w-6 h-6 text-amber-800" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2a10 10 0 0 0-3.2 19.4c.5.1.7-.2.7-.5v-1.8c-2.8.6-3.4-1.4-3.4-1.4-.5-1.2-1.2-1.5-1.2-1.5-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 1.7 2.6 1.2 3.2.9.1-.7.4-1.2.7-1.5-2.5-.3-5.1-1.3-5.1-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2 1-.3 2-.4 3-.4s2 .1 3 .4c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.8.1 3.1.7.8 1.2 1.8 1.2 3.1 0 4.4-2.6 5.4-5.1 5.7.4.3.8.9.8 1.8v2.7c0 .3.2.6.7.5A10 10 0 0 0 12 2z" /></svg>,
                },
                {
                  topic: 'Microservices',
                  description: 'Introduction to microservices architecture.',
                  objectives: ['Understand microservices principles', 'Learn benefits and challenges', 'Apply to product design'],
                  takeaways: 'Knowledge of microservices for product development.',
                  icon: <svg className="w-6 h-6 text-amber-800" fill="currentColor" viewBox="0 0 24 24"><path d="M3 3h8v8H3zM13 3h8v8h-8zM3 13h8v8H3zM13 13h8v8h-8z" /></svg>,
                },
                {
                  topic: 'Microservices Architecture',
                  description: 'Advanced concepts in microservices for PMs.',
                  objectives: ['Dive into microservices design', 'Manage inter-service communication', 'Optimize performance'],
                  takeaways: 'Advanced skills in microservices management.',
                  icon: <svg className="w-6 h-6 text-amber-800" fill="currentColor" viewBox="0 0 24 24"><path d="M3 3h8v8H3zM13 3h8v8h-8z" /></svg>,
                },
                {
                  topic: 'Security',
                  description: 'Incorporating security into product management.',
                  objectives: ['Learn security best practices', 'Understand compliance', 'Mitigate risks'],
                  takeaways: 'Ability to prioritize security in products.',
                  icon: <svg className="w-6 h-6 text-amber-800" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L3 7v7c0 6 9 10 9 10s9-4 9-10V7l-9-5z" /></svg>,
                },
                {
                  topic: 'Load Balancing',
                  description: 'Managing load balancing for scalable products.',
                  objectives: ['Understand load balancing concepts', 'Learn implementation strategies', 'Optimize performance'],
                  takeaways: 'Skills to ensure scalable product performance.',
                  icon: <svg className="w-6 h-6 text-amber-800" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2v20m10-10H2" /></svg>,
                },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  className="bg-[var(--card-bg)] p-6 rounded-2xl shadow-lg flex items-start gap-4"
                  variants={cardVariants}
                  custom={idx}
                >
                  <div className="flex-shrink-0">{item.icon}</div>
                  <div>
                    <h3 className="text-xl font-bold text-amber-800 mb-2">{item.topic}</h3>
                    <p className="text-[var(--text-color)] mb-4">{item.description}</p>
                    <h4 className="text-lg font-semibold text-[var(--text-color)]">Objectives:</h4>
                    <ul className="list-disc pl-5 text-[var(--text-color)] mb-4">
                      {item.objectives.map((obj, i) => <li key={i}>{obj}</li>)}
                    </ul>
                    <p className="text-[var(--text-color)]"><strong>Key Takeaway:</strong> {item.takeaways}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
         
      </motion.section>
      <Enroll/>
      <LandingPageFeatures/>
    </div>
  );
}