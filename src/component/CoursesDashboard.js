import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

const courses = [
  {
    title: "Introduction to Product Management",
    description: "Learn the basics of product management, the role of a product manager, and the product lifecycle.",
    outcome: "Build a strong foundation in product management principles.",
    route: "/introduction",
    icon: "📚",
    iconColor: "text-blue-600",
  },
  {
    title: "Intermediate Product Management",
    description: "Dive deeper into prioritization, stakeholder management, agile methodologies, and roadmap creation.",
    outcome: "Develop practical skills to manage product development effectively.",
    route: "/intermediate",
    icon: "📈",
    iconColor: "text-green-600",
  },
  {
    title: "Growth Product Management",
    description: "Understand metrics, growth loops, A/B testing, and data-driven decision-making to scale products.",
    outcome: "Drive sustainable product growth and scalability.",
    route: "/alldashboard",
    icon: "🚀",
    iconColor: "text-yellow-600",
  },
  {
    title: "Technical Product Management",
    description: "Bridge the gap between technical and non-technical teams. Learn APIs, system design, and technical decision-making.",
    outcome: "Collaborate effectively with engineering teams on technical products.",
    route: "/technical",
    icon: "🛠️",
    iconColor: "text-purple-600",
  },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [openOverview, setOpenOverview] = useState(true);
  

  useEffect(() => {
    toast.info('Explore key PM concepts!', {
      toastId: 'welcome-dashboard',
      theme: 'light',
      style: { background: '#fef3c7', color: '#1f2937' },
    });

    }, []);
  const toggleOverview = () => {
    setOpenOverview((prev) => !prev);
  };

  const handleNavigate = (route) => {
  
    navigate(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };



  return (
    <div className="min-h-screen bg-gray-50 font-sans flex flex-col">
      <header className="mb-8 border-b border-yellow-200 flex-1">
        <div className="flex justify-between items-center m-4 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg p-3">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold flex items-center text-gray-800">
            <span className="mr-2 text-2xl">🌟</span>
            Product Management Mastery
          </h1>
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleOverview}
              className="text-yellow-600 hover:text-yellow-700 text-sm sm:text-base"
              aria-expanded={openOverview}
              aria-controls="overview-section"
            >
              {openOverview ? 'Hide' : 'Show'}
            </button>
            
          </div>
        </div>
        <div className={`transition-all duration-500 overflow-hidden ${openOverview ? 'max-h-max' : 'max-h-0'}`}>
          <div className="m-4 bg-yellow-50 p-4 sm:p-6 rounded-lg shadow-lg border border-yellow-300 text-center">
            <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
              Discover a comprehensive set of product management courses, from foundational principles to advanced technical and growth strategies, to elevate your PM skills.
            </p>
          </div>
        </div>
      </header>
      <section className="m-4 max-w-5xl mx-auto flex-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {courses.map((course, idx) => (
            <div
              key={idx}
              className="p-4 sm:p-6 bg-yellow-50 rounded-xl shadow-md border border-yellow-300 hover:scale-105 transition-transform duration-300"
              title={course.outcome}
            >
              <div className="flex items-center mb-4">
                <span className={`text-4xl ${course.iconColor} mr-3`}>{course.icon}</span>
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800">{course.title}</h2>
              </div>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed">{course.description}</p>
              <button
                onClick={() => handleNavigate(course.route)}
                className="mt-4 px-4 py-2 text-sm sm:text-base font-medium bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 text-white rounded-lg transition duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-600"
                aria-label={`Go to ${course.title}`}
              >
                Go to Lesson
              </button>
            </div>
          ))}
        </div>
        <div className="mt-6 text-center">
        
        </div>
      </section>
    </div>
  );
}