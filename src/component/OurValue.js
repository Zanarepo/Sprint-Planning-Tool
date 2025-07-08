import React from 'react';
import { Link } from 'react-router-dom';
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

export default function UniqueValueProposition() {
  return (
    <motion.section
      className="w-full py-8 px-4 sm:px-6 md:px-8 bg-[var(--bg-color)]"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={sectionVariants}
    >
      <div className="max-w-7xl mx-auto text-center">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-amber-800 mb-6"
          variants={cardVariants}
        >
          Why TheSprintSchool Stands Out
        </motion.h2>

        <motion.p
          className="text-lg md:text-xl text-[var(--text-color)] mb-6 max-w-3xl mx-auto"
          variants={cardVariants}
        >
          At TheSprintSchool, we don’t just teach—we immerse you in a real-world learning experience.
          Our approach is built on practical execution, where learners master skills by doing.
          We’ve carefully curated and built hands-on <Link to="/sprintify" className="text-amber-800 font-semibold underline hover:text-amber-600">Tools</Link> that simulate real product challenges,
          enabling you to learn by practicing on the go—anytime, anywhere.
        </motion.p>

        <motion.p
          className="text-lg md:text-xl text-[var(--text-color)] mb-12 max-w-3xl mx-auto"
          variants={cardVariants}
        >
          From mastering top industry platforms to developing the confidence to lead in global teams,
          we give you a competitive edge that goes far beyond the classroom.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: 'Hands-On Learning',
              description:
                'Experience project-based training that mirrors real product management workflows, giving you immediate practical value.',
              icon: (
                <svg
                  className="w-12 h-12 text-amber-800 mb-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z" />
                </svg>
              ),
            },
            {
              title: 'Industry-Standard Tools',
              description:
                'Train with platforms and software used by top product teams worldwide—so you’re ready to hit the ground running.',
              icon: (
                <svg
                  className="w-12 h-12 text-amber-800 mb-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z" />
                </svg>
              ),
            },
            {
              title: 'Global Expertise',
              description:
                'Build confidence and skills that meet international product management standards—ready for any market, any team.',
              icon: (
                <svg
                  className="w-12 h-12 text-amber-800 mb-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l10 20H2L12 2z" />
                </svg>
              ),
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              className="bg-[var(--card-bg)] p-6 rounded-2xl shadow-lg flex flex-col items-center"
              variants={cardVariants}
              custom={idx}
            >
              {item.icon}
              <h3 className="text-xl font-bold text-amber-800 mb-2">{item.title}</h3>
              <p className="text-[var(--text-color)]">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
