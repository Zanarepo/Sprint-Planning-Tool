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

export default function Pricing() {
  const [openPayments, setOpenPayments] = useState({
    fundamental: false,
    growth: false,
    technical: false,
  });

  const togglePayment = (track) => {
    setOpenPayments((prev) => ({
      ...prev,
      [track]: !prev[track],
    }));
  };

  const tracks = [
    {
      name: 'Fundamental/Intermediate PM',
      price: '₦15,000.000',
      description: 'Build a strong foundation in product management with hands-on skills.',
      icon: (
        <svg
          className="w-12 h-12 text-amber-800 mb-4"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z" />
        </svg>
      ),
      trackKey: 'fundamental',
    },
    {
      name: 'Growth PM',
      price: '₦25,000.000',
      description: 'Master strategies to drive product growth and scalability.',
      icon: (
        <svg
          className="w-12 h-12 text-amber-800 mb-4"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M3 13h8v8H3z" />
        </svg>
      ),
      trackKey: 'growth',
    },
    {
      name: 'Technical PM',
      price: '₦25,000.000',
      description: 'Learn technical skills to collaborate with engineering teams.',
      icon: (
        <svg
          className="w-12 h-12 text-amber-800 mb-4"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M3 3h8v8H3zM13 3h8v8h-8zM3 13h8v8H3zM13 13h8v8h-8z" />
        </svg>
      ),
      trackKey: 'technical',
    },
  ];

  return (
    <motion.section
      className="w-full py-10 px-4 sm:px-16 md:px-8 bg-gradient-to-r from-amber-800/20 to-amber-600/20] "
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
          Pricing & Enrollment
        </motion.h2>
        <motion.p
          className="text-lg md:text-xl text-[var(--text-color)] mb-12 max-w-3xl mx-auto"
          variants={cardVariants}
        >
          Choose a learning track that fits your goals. Each track offers hands-on training with flexible payment options to get you started.
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tracks.map((track, idx) => (
            <motion.div
              key={idx}
              className="relative bg-[var(--card-bg)] p-6 rounded-2xl shadow-xl border-2 border-transparent bg-gradient-to-r from-amber-800/20 to-amber-600/20"
              variants={cardVariants}
              custom={idx}
            >
              <div className="absolute inset-0 rounded-2xl bg-white/95 z-0"></div>
              <div className="relative z-10 flex flex-col items-center">
                {track.icon}
                <h3 className="text-xl font-bold text-amber-800 mb-2">{track.name}</h3>
                <p className="text-2xl font-semibold text-amber-800 mb-4">{track.price}</p>
                <p className="text-[var(--text-color)] mb-4">{track.description}</p>
                <p className="text-[var(--text-color)] mb-4">
                  <strong>Schedule:</strong> Online classes twice a week (times to be communicated).
                </p>
                <p className="text-[var(--text-color)] mb-6">
                  <strong>Flexible Payment:</strong> Pay 40% upfront, balance later.
                </p>
                <button
                  className="bg-amber-800 text-white px-6 py-3 rounded-lg hover:bg-amber-900 transition"
                  onClick={() => togglePayment(track.trackKey)}
                >
                  {openPayments[track.trackKey] ? 'Hide Payment Details' : 'Enroll Now'}
                </button>
                {openPayments[track.trackKey] && (
                  <motion.div
                    className="mt-4 p-4 bg-amber-50 rounded-lg text-left w-full"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3 }}
                  >
                    <h4 className="text-lg font-semibold text-amber-800 mb-2">Payment Details</h4>
                    <p className="text-[var(--text-color)]">
                      <strong>Account Name:</strong> Prince Ekpenyong
                    </p>
                    <p className="text-[var(--text-color)]">
                      <strong>Account Number:</strong> 0290089923
                    </p>
                    <p className="text-[var(--text-color)] mb-2">
                      <strong>Bank Name:</strong> Wema Bank
                    </p>
                    <p className="text-[var(--text-color)]">
                      <strong>Instructions:</strong> After making a payment, send your proof of payment, full name, and chosen track (Fundamental/Intermediate PM, Growth PM, or Technical PM) to our WhatsApp number (+234-9167690043) for enrollment confirmation.
                    </p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Personal 1-on-1 Learning Section */}
        <motion.div
          className="mt-10 max-w-4xl mx-auto mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
        >
          <div className="flex flex-col md:flex-row items-center gap-8 bg-[var(--card-bg)] p-8 rounded-2xl shadow-xl border-2 border-transparent bg-gradient-to-r from-amber-800/20 to-amber-600/20">
            <div className="w-full md:w-1/2">
              <h3 className="text-2xl font-bold text-amber-800 mb-4">Personal 1-on-1 Learning</h3>
              <p className="text-[var(--text-color)] mb-6">
                Elevate your skills with tailored 1-on-1 coaching. Get personalized guidance to master product management at your own pace. Contact us for pricing and scheduling details.
              </p>
              <a
                href="https://wa.me/+2349167690043?text=I'm%20interested%20in%20Personal%201-on-1%20Learning.%20Please%20provide%20more%20details."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-amber-800 text-white px-6 py-3 rounded-lg hover:bg-amber-900 transition"
              >
                Contact Us
              </a>
            </div>
            <div className="w-full md:w-1/2 h-[200px]">
              
              <img
                src="/1-on-1.png"
                alt="Personal 1-on-1 Learning"
                className="w-full h-full object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}