import React from "react";
import { Link } from "react-router-dom";
import { Brain, LineChart, Rocket, Users, Activity, Map } from "lucide-react";

const features = [
  {
    title: "Brainstorming Hub",
    description:
      "Collaborate, generate innovative ideas, and refine concepts in an interactive, real-time space—perfect for teams and individuals.",
    icon: <Brain size={32} className="text-yellow-600" />,
    bgColor: "bg-yellow-50",
    textColor: "text-yellow-700",
    btnBg: "bg-yellow-600",
    route: "/brainstorm",
  },
  {
    title: "Feature Estimator",
    description:
      "Quickly assess feature complexity, effort, and impact to make data-driven decisions—ideal for Agile teams, product managers, and developers.",
    icon: <LineChart size={32} className="text-green-600" />,
    bgColor: "bg-green-50",
    textColor: "text-green-700",
    btnBg: "bg-green-600",
    route: "/estimator",
  },
  {
    title: "Agile Sprint Simulation",
    description:
      "Take your Agile sprints to the next level! Simulate an Agile environment, collaborate effectively, and optimize workflow.",
    icon: <Rocket size={32} className="text-blue-600" />,
    bgColor: "bg-blue-50",
    textColor: "text-blue-700",
    btnBg: "bg-blue-600",
    route: "/sprints",
  },
  {
    title: "Daily Standup",
    description:
      "Document and gather feedback on the go using our easy-to-use standup tool.",
    icon: <Users size={32} className="text-orange-600" />,
    bgColor: "bg-orange-50",
    textColor: "text-orange-700",
    btnBg: "bg-orange-600",
    route: "/standup",
  },
  {
    title: "Burndown",
    description:
      "Document progress and gather feedback effortlessly using our intuitive Burndown tool.",
    icon: <Activity size={32} className="text-red-600" />,
    bgColor: "bg-red-50",
    textColor: "text-red-700",
    btnBg: "bg-red-600",
    route: "/burndown",
  },
  {
    title: "Roadmap",
    description:
      "Stay focused on what matters—build with alignment using our intuitive Roadmap tool to track progress.",
    icon: <Map size={32} className="text-blue-600" />,
    bgColor: "bg-blue-50",
    textColor: "text-blue-700",
    btnBg: "bg-blue-600",
    route: "/roadmap",
  },
];

const LandingPageFeatures = () => {
  return (
    <>
      {/* Desktop Carousel (visible on md and up) */}
      <div className="hidden md:block max-w-5xl mx-auto mt-12">
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-8">
          Explore Our Features
        </h2>
        <div className="relative w-full overflow-hidden">
          <style>{`
            @keyframes slide {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .desktop-carousel {
              animation: slide 15s linear infinite;
            }
          `}</style>
          <div className="flex desktop-carousel">
            {[...features, ...features].map((feature, index) => (
              <div
                key={index}
                className={`flex-shrink-0 w-72 mx-4 p-6 rounded-2xl shadow-md ${feature.bgColor} text-center`}
              >
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <h3 className={`text-2xl font-bold ${feature.textColor}`}>
                  {feature.title}
                </h3>
                <p className="text-gray-700 mt-3">{feature.description}</p>
                <Link
                  to={feature.route}
                  className={`mt-4 inline-block ${feature.btnBg} text-white py-2 px-4 rounded-lg shadow hover:brightness-110 transition`}
                >
                  Explore
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Vertical Grid (visible on mobile) */}
      <div className="block md:hidden max-w-5xl mx-auto mt-12">
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-8">
          Explore Our Features
        </h2>
        <div className="grid grid-cols-1 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`p-6 rounded-2xl shadow-md ${feature.bgColor} text-center`}
            >
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className={`text-2xl font-bold ${feature.textColor}`}>
                {feature.title}
              </h3>
              <p className="text-gray-700 mt-3">{feature.description}</p>
              <Link
                to={feature.route}
                className={`mt-4 inline-block ${feature.btnBg} text-white py-2 px-4 rounded-lg shadow hover:brightness-110 transition`}
              >
                Explore
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default LandingPageFeatures;
