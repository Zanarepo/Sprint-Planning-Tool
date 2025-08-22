import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Introduction from './Introduction';
import PDLC from './PDLC';
import ProductDevProcess from './ProductDevProcess';
import CustomerMarketResearch from './CustomerMarketResearch';
import ProductLifecycle from './ProductLifecycle';
import PrioritizationTechniques from './PrioritizationTechniques';
import ProductMetricsInteractive from './ProductMetricsInteractive';
import FramingProductOpportunity from './FramingProductOpportunity';
import MarketResearch from './MarketResearch';
import UserResearch from './UserResearch';
import SimulationModule from './SimulationModule';

const lessons = [
  {
    id: 1,
    title: 'Introduction',
    description: 'Learn the fundamentals of product management and its key concepts.',
    icon: '🏠',
    iconColor: 'text-indigo-500',
    component: <Introduction />,
  },
  {
    id: 2,
    title: 'Product Development Process',
    description: 'Understand the steps involved in developing a product from ideation to launch.',
    icon: '📋',
    iconColor: 'text-orange-500',
    component: <ProductDevProcess />,
  },
  {
    id: 3,
    title: 'Product Development Lifecycle (PDLC)',
    description: 'Explore the stages of the product development lifecycle and their importance.',
    icon: '📖',
    iconColor: 'text-green-500',
    component: <PDLC />,
  },
  {
    id: 4,
    title: 'Customer & Market Research',
    description: 'Master techniques for conducting customer and market research to inform product decisions.',
    icon: '🔍',
    iconColor: 'text-purple-500',
    component: <CustomerMarketResearch />,
  },
  {
    id: 5,
    title: 'Product Lifecycle',
    description: 'Learn how to manage a product through its lifecycle stages for sustained success.',
    icon: '📈',
    iconColor: 'text-red-500',
    component: <ProductLifecycle />,
  },
  {
    id: 6,
    title: 'Prioritization Techniques',
    description: 'Discover methods to prioritize product features and tasks effectively.',
    icon: '💡',
    iconColor: 'text-yellow-500',
    component: <PrioritizationTechniques />,
  },
  {
    id: 7,
    title: 'Product Metrics Interactive',
    description: 'Understand and track key product metrics to measure performance.',
    icon: '⚙️',
    iconColor: 'text-pink-500',
    component: <ProductMetricsInteractive />,
  },
  {
    id: 8,
    title: 'Framing Product Opportunity',
    description: 'Learn how to identify and frame product opportunities for maximum impact.',
    icon: '🚀',
    iconColor: 'text-blue-500',
    component: <FramingProductOpportunity />,
  },
  {
    id: 9,
    title: 'Market Research',
    description: 'Dive into market research techniques to understand market dynamics.',
    icon: '✅',
    iconColor: 'text-teal-500',
    component: <MarketResearch />,
  },
  {
    id: 10,
    title: 'User Research',
    description: 'Explore user research methods to build user-centric products.',
    icon: '👤',
    iconColor: 'text-green-500',
    component: <UserResearch />,
  },


   {
    id: 10,
    title: 'Practical Simulations',
    description: 'See how to apply PM concepts in real-world scenarios through interactive simulations.',
    icon: '',
    iconColor: 'text-green-500',
    component: <SimulationModule />,
  },
];

const DashboardBasic = () => {
  const [activeLesson, setActiveLesson] = useState(null);
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    toast.info('Explore key PM concepts!', {
      toastId: 'welcome-dashboard',
      theme: 'light',
      style: { background: '#fef3c7', color: '#1f2937' },
    });
  }, []);

  const handleLessonClick = (lesson) => {
    setActiveLesson(lesson);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToOverview = () => {
    setActiveLesson(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleIntro = () => {
    setShowIntro(!showIntro);
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 font-sans flex flex-col mt-16">
      {activeLesson && (
        <button
          onClick={handleBackToOverview}
          className="fixed mt-6 left-4 z-50 bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 text-white px-3 py-1 rounded-lg transition duration-300 text-sm hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-600"
          aria-label="Back to dashboard"
        >
          ⬅️ Back
        </button>
      )}
      {/* Header and Overview */}
      {!activeLesson && (
        <header className="mb-8 border-b border-yellow-200 flex-1">
          <div className="flex justify-between items-center m-4 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg p-3">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold flex items-center text-gray-800">
              <span className="mr-2 text-2xl">🌟</span>
              Product Management Lessons Dashboard
            </h1>
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleIntro}
                className="text-yellow-600 hover:text-yellow-700 text-sm sm:text-base"
                aria-expanded={showIntro}
                aria-controls="overview-section"
              >
                {showIntro ? 'Hide' : 'Show'}
              </button>
             
            </div>
          </div>
          <div className={`transition-all duration-500 overflow-hidden ${showIntro ? 'max-h-max' : 'max-h-0'}`}>
            <div className="m-4 bg-yellow-50 p-4 sm:p-6 rounded-lg shadow-lg border border-yellow-300 text-center">
              <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
                Explore key product management concepts, including the product development lifecycle, customer research, prioritization techniques, and more to enhance your PM skills.
              </p>
            </div>
            <div className="m-4 max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {lessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    className="p-4 sm:p-6 bg-yellow-50 rounded-lg shadow-md border border-yellow-300 hover:scale-105 transition-transform duration-300"
                    title={lesson.description}
                  >
                    <div className="flex items-center mb-4">
                      <span className={`text-3xl sm:text-4xl ${lesson.iconColor} mr-3`}>{lesson.icon}</span>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
                        Lesson {lesson.id}: {lesson.title}
                      </h3>
                    </div>
                    <p className="text-gray-700 text-sm sm:text-base leading-relaxed">{lesson.description}</p>
                    <button
                      onClick={() => handleLessonClick(lesson)}
                      className="mt-4 bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 text-white px-4 py-2 rounded-lg transition duration-300 text-sm sm:text-base hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-600"
                      aria-label={`Explore ${lesson.title}`}
                    >
                      Explore Now
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </header>
      )}

      {/* Content Display */}
      {activeLesson && (
        <section className="m-4 max-w-7xl mx-auto flex-1">
          <div className="bg-yellow-50 p-4 sm:p-6 rounded-lg shadow-md border border-yellow-300">
            <div className="flex items-center mb-4">
              <span className={`text-3xl sm:text-4xl ${activeLesson.iconColor} mr-3`}>{activeLesson.icon}</span>
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800">{activeLesson.title}</h2>
            </div>
            <p className="text-sm sm:text-base text-gray-700 mb-4 leading-relaxed">{activeLesson.description}</p>
            {activeLesson.component}
          </div>
        </section>
      )}
    </div>
  );
};

export default DashboardBasic;