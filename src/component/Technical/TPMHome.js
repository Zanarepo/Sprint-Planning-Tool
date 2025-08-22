import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CourseOutlines from './CourseOutlines';

const Homepage = () => {
  const [openSections, setOpenSections] = useState({
    header: true,
    overview: true,
    lessons: true,
    outlines: true,
  });

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const lessons = [
    {
      id: 'lesson1',
      to: '/tpm',
      icon: '🛠️',
      iconColor: 'text-blue-500',
      title: 'Lesson 1',
      subtitle: 'Masterclass: Understanding Databases, Frontend, Backend, and APIs as a Product Manager',
      outcome: 'Learn how databases, frontend, backend, and APIs work together to build robust products.',
    },
    {
      id: 'lesson2',
      to: '/dashboard2',
      icon: '📈',
      iconColor: 'text-green-500',
      title: 'Lesson 2',
      subtitle: 'Understanding Agile, Cost Management, Databases, and More as a Product Manager',
      outcome: 'Master agile methodologies, cost management, and database integration for effective PM.',
    },
    {
      id: 'lesson3',
      to: '/dashboard',
      icon: '⚡',
      iconColor: 'text-purple-500',
      title: 'Lesson 3',
      subtitle: 'Understanding Various Technologies as a Product Manager',
      outcome: 'Explore key technologies that drive modern product development.',
    },
    {
      id: 'lesson4',
      to: '/Dashboard3',
      icon: '👥',
      iconColor: 'text-red-500',
      title: 'Lesson 4',
      subtitle: 'Understanding Product Analytics',
      outcome: 'Gain insights into product analytics to drive data-informed decisions.',
    },
    {
      id: 'lesson5',
      to: '/Dashboard4',
      icon: '👥',
      iconColor: 'text-red-500',
      title: 'Lesson 5',
      subtitle: 'Syllabus: PM Distilled',
      outcome: 'Dive into a comprehensive overview of product management essentials.',
    },
  ];

  return (
    <div className="w-full min-h-screen bg-gray-50 font-sans">
      {/* Welcome Header */}
      <header className="mb-8 border-b border-yellow-200">
        <div className="flex justify-between items-center m-4 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg p-3">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold flex items-center text-gray-800">
            <span className="mr-2 text-2xl">🌟</span>
            Welcome to the TPM Hub
          </h1>
          <button
            onClick={() => toggleSection('header')}
            className="text-yellow-600 hover:text-yellow-700 text-sm sm:text-base"
            aria-expanded={openSections.header}
            aria-controls="header-section"
          >
            {openSections.header ? 'Hide' : 'Show'}
          </button>
        </div>
        <div className={`transition-all duration-500 overflow-hidden ${openSections.header ? 'max-h-max' : 'max-h-0'}`}>
          <div className="m-4 bg-yellow-50 p-4 sm:p-6 rounded-lg shadow-lg border border-yellow-300 text-center">
            <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
              Explore a series of lessons designed to enhance your product management skills. In these lessons, you'll learn about databases, agile methodologies, cost management, and product analytics—all critical topics for any Product Manager.
            </p>
          </div>
        </div>
      </header>

      {/* Course Overview */}
      <section className="mb-8 border-b border-yellow-200">
        <div className="flex justify-between items-center m-4 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg p-3">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold flex items-center text-gray-800">
            <span className="mr-2 text-2xl">📚</span>
            Course Overview
          </h2>
          <button
            onClick={() => toggleSection('overview')}
            className="text-yellow-600 hover:text-yellow-700 text-sm sm:text-base"
            aria-expanded={openSections.overview}
            aria-controls="overview-section"
          >
            {openSections.overview ? 'Hide' : 'Show'}
          </button>
        </div>
        <div className={`transition-all duration-500 overflow-hidden ${openSections.overview ? 'max-h-max' : 'max-h-0'}`}>
          <div className="m-4 bg-yellow-50 p-4 sm:p-6 rounded-lg shadow-lg border border-yellow-300">
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">Learning Objectives</h3>
            <ul className="list-disc pl-6 text-gray-700 text-sm sm:text-base space-y-2">
              <li>Understand the technical foundations of product management, including databases, APIs, and frontend/backend systems.</li>
              <li>Master agile methodologies and cost management to drive efficient product development.</li>
              <li>Explore various technologies to enhance your technical acumen as a PM.</li>
              <li>Leverage product analytics to make data-driven decisions.</li>
              <li>Gain a comprehensive understanding of product management essentials.</li>
            </ul>
            <div className="mt-4 text-center">
              <Link
                to="Lessons"
                className="inline-block bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 text-white px-6 py-3 rounded-lg transition duration-300 text-sm sm:text-base hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-600"
                aria-label="Start the first lesson"
              >
                🚀 Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Lesson Tiles */}
      <section className="mb-8 border-b border-yellow-200">
        <div className="flex justify-between items-center m-4 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg p-3">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold flex items-center text-gray-800">
            <span className="mr-2 text-2xl">📖</span>
            Lessons
          </h2>
          <button
            onClick={() => toggleSection('lessons')}
            className="text-yellow-600 hover:text-yellow-700 text-sm sm:text-base"
            aria-expanded={openSections.lessons}
            aria-controls="lessons-section"
          >
            {openSections.lessons ? 'Hide' : 'Show'}
          </button>
        </div>
        <div className={`transition-all duration-500 overflow-hidden ${openSections.lessons ? 'max-h-max' : 'max-h-0'}`}>
          <div className="m-4 max-w-6xl mx-auto">
            <div className="flex flex-col sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {lessons.map((lesson, index) => (
                <Link
                  key={lesson.id}
                  to={lesson.to}
                  className="flex flex-col items-center p-6 bg-yellow-50 rounded-lg shadow-md border border-yellow-300 hover:scale-105 transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-600"
                  aria-label={`Go to ${lesson.title}`}
                  title={lesson.outcome}
                >
                  <span className={`text-4xl mb-4 ${lesson.iconColor}`}>{lesson.icon}</span>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
                    {lesson.title} <span className="text-sm text-gray-500">({index + 1} of 5)</span>
                  </h3>
                  <h4 className="text-center text-gray-700 text-sm sm:text-base">{lesson.subtitle}</h4>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Course Outlines */}
      <section className="mb-8">
        <div className="flex justify-between items-center m-4 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg p-3">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold flex items-center text-gray-800">
            <span className="mr-2 text-2xl">📋</span>
            Course Outlines
          </h2>
          <button
            onClick={() => toggleSection('outlines')}
            className="text-yellow-600 hover:text-yellow-700 text-sm sm:text-base"
            aria-expanded={openSections.outlines}
            aria-controls="outlines-section"
          >
            {openSections.outlines ? 'Hide' : 'Show'}
          </button>
        </div>
        <div className={`transition-all duration-500 overflow-hidden ${openSections.outlines ? 'max-h-max' : 'max-h-0'}`}>
          <div className="m-4 bg-yellow-50 p-4 sm:p-6 rounded-lg shadow-lg border border-yellow-300">
            <CourseOutlines />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;