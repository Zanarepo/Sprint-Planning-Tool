import React, { useState } from "react";
import { Link } from "react-router-dom";
import { User, BookOpen } from "lucide-react";

const projects = [
  {
    title: "Direct Rent",
    description: "Rent Directly from Property Owners — No Agents, No Hassle.",
    studentName: "Vivian Onwuka",
    route: "https://directrentapp.netlify.app/",
  },
  {
    title: "Feplug-NG",
    description: "A web-based platform for direct flight booking with no middle-men",
    studentName: "Reuben Edosa",
    route: "https://feplug-ng.vercel.app/",
  },
  {
    title: "EduAlat",
    description: "An Anonymous Platform to Report School-Related Issues & Drive Accountability",
    studentName: "Nsisong Uko",
    route: "https://edualat.netlify.app/",
  },
  {
    title: "SkinDoc",
    description: "Connect with certified dermatologists for personalized product recommendations to address your skin concerns.",
    studentName: "Esther Adebayor",
    route: "https://skindoc.netlify.app/",
  },
  {
    title: "AutoCorp",
    description: "Auto-generate invoices, track payments in real-time, and automate follow-ups—all in one simple, mobile-first dashboard.",
    studentName: "Daniel Akindunni",
    route: "https://danopapa.netlify.app/",
  },
  {
    title: "PulseFit",
    description: "PulseFit combines cutting-edge AI technology with community motivation to transform your workouts. Get personalized training, compete with friends, and access top trainers - all in one platform.",
    studentName: "Oluwayemi Afolabi",
    route: "https://pulsefitapp.netlify.app/",
  },
];

const StudentProjects = () => {
  const [expanded, setExpanded] = useState({});

  const toggleDescription = (index) => {
    setExpanded((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <>
      {/* Carousel for larger screens (lg and up) */}
      <div className="hidden lg:block max-w-7xl mx-auto mt-12 mb-10 px-4">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-amber-800 mb-8">
          Alumna's Projects at TheSprintSchools
        </h2>
        <div className="relative w-full overflow-hidden">
          <style>{`
            @keyframes slide {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .project-carousel {
              animation: slide 20s linear infinite;
            }
            .project-card:hover {
              animation-play-state: paused;
            }
          `}</style>
          <div className="flex project-carousel">
            {[...projects, ...projects].map((project, index) => (
              <div
                key={index}
                className="project-card flex-shrink-0 w-80 mx-3 p-5 rounded-2xl shadow-md bg-amber-50 text-center"
              >
                <div className="flex justify-center mb-4">
                  <BookOpen size={48} className="text-amber-800" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-amber-800">
                  {project.title}
                </h3>
                <p className="text-gray-600 mt-2 text-sm md:text-base">
                  {project.description}
                </p>
                <div className="flex items-center justify-center mt-4">
                  <User size={24} className="text-amber-800 mr-2" />
                  <span className="text-sm text-gray-600">
                    {project.studentName}
                  </span>
                </div>
                <Link
                  to={project.route}
                  className="mt-4 inline-block bg-amber-600 text-white py-2 px-4 rounded-lg shadow hover:brightness-110 transition text-sm md:text-base"
                >
                  View Project
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2x3 Matrix for smaller screens (below lg) */}
      <div className="block lg:hidden max-w-7xl mx-auto mt-8 mb-10 px-2 sm:px-4">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-center text-amber-800 mb-6">
          Alumna's Projects at TheSprintSchools
        </h2>
        <div className="grid grid-cols-3 grid-rows-2 gap-2 sm:gap-3">
          {projects.map((project, index) => (
            <div
              key={index}
              className="p-2 sm:p-3 rounded-xl shadow-md bg-amber-50 text-center flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-center mb-2">
                  <BookOpen size={24} className="text-amber-800" />
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-amber-800 line-clamp-2">
                  {project.title}
                </h3>
                <p className="text-gray-600 mt-1 text-xs">
                  {expanded[index] ? (
                    project.description
                  ) : (
                    <span className="line-clamp-1">{project.description}</span>
                  )}
                </p>
                {project.description.split(" ").length > 5 && (
                  <button
                    onClick={() => toggleDescription(index)}
                    className="text-xs text-amber-800 underline mt-1 focus:outline-none"
                  >
                    {expanded[index] ? "Less" : "More"}
                  </button>
                )}
                <div className="flex items-center justify-center mt-2">
                  <User size={14} className="text-amber-800 mr-1" />
                  <span className="text-xs text-gray-600 line-clamp-1">
                    {project.studentName}
                  </span>
                </div>
              </div>
              <Link
                to={project.route}
                className="mt-2 inline-block bg-amber-600 text-white py-1 px-2 rounded-lg shadow hover:brightness-110 transition text-xs"
              >
                View Project
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default StudentProjects;