import { useState } from 'react';

const ProductManagementSimulator = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedRole, setSelectedRole] = useState(null);

  const steps = [
    {
      title: "Summary",
      content: `Product Management combines strategy, business, technology, and UX to create successful products. 
               It's about solving real problems while aligning with business goals.`
    },
    {
      title: "What is Product Management?",
      content: `The process of identifying, developing, and delivering products that:
               - Solve user problems through research
               - Align with business objectives
               - Balance feasibility and usability
               - Measure success with metrics`,
      example: {
        title: "Spotify Example",
        content: "PMs decide on features like AI playlists, ensuring they meet user needs and technical feasibility."
      }
    },
    {
      title: "Key Responsibilities",
      checklist: [
        "Define product vision/strategy",
        "Prioritize features based on impact",
        "Collaborate cross-functionally",
        "Analyze market & user research",
        "Manage product lifecycle"
      ]
    },
    {
      title: "Role Comparison",
      roles: [
        {
          role: "Product Manager",
          focus: "What to build & why",
          responsibility: "Define vision/strategy",
          example: "Decide if Uber should launch subscriptions"
        },
        {
          role: "Project Manager",
          focus: "Execution & delivery",
          responsibility: "Manage timelines/resources",
          example: "Ensure engineering delivers features on time"
        },
        {
          role: "Program Manager",
          focus: "Coordination",
          responsibility: "Manage dependencies",
          example: "Oversee all driver experience projects"
        }
      ]
    },
    {
      title: "House Building Analogy",
      analogy: [
        { role: "Product Manager", description: "Architect deciding house design", emoji: "🏠" },
        { role: "Project Manager", description: "Construction manager", emoji: "👷♂️" },
        { role: "Program Manager", description: "City planner", emoji: "🗺️" }
      ]
    }
  ];

  return (
    <div className="w-full min-h-screen p-4 xs:p-6 sm:p-8 bg-gradient-to-b from-gray-100 to-gray-200 flex flex-col space-y-4 xs:space-y-6 overflow-x-hidden">
      {/* Progress Indicator */}
      <div className="flex mb-6 gap-2">
        {steps.map((_, index) => (
          <div 
            key={index}
            className={`h-2 flex-1 rounded ${index <= currentStep ? 'bg-blue-600' : 'bg-gray-300'}`}
          />
        ))}
      </div>

      {/* Content Area */}
      <div className="space-y-6">
        {/* Step 1-2 Content */}
        {currentStep <= 1 && (
          <div className="p-6 bg-white rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold mb-4">{steps[currentStep].title}</h2>
            <p className="text-gray-700 mb-4">{steps[currentStep].content}</p>
            {steps[currentStep].example && (
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">
                  {steps[currentStep].example.title}
                </h3>
                <p className="text-blue-700">{steps[currentStep].example.content}</p>
              </div>
            )}
          </div>
        )}

        {/* Step 3: Responsibilities */}
        {currentStep === 2 && (
          <div className="p-6 bg-white rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold mb-4">{steps[currentStep].title}</h2>
            <div className="grid gap-3">
              {steps[currentStep].checklist.map((item, index) => (
                <div key={index} className="flex items-center p-3 bg-gray-50 rounded">
                  <div className="h-4 w-4 bg-blue-600 mr-3 rounded-sm" />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Role Comparison */}
        {currentStep === 3 && (
          <div className="p-6 bg-white rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold mb-4">{steps[currentStep].title}</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-3 text-left">Role</th>
                    <th className="p-3 text-left">Focus</th>
                    <th className="p-3 text-left">Responsibility</th>
                    <th className="p-3 text-left">Example</th>
                  </tr>
                </thead>
                <tbody>
                  {steps[currentStep].roles.map((role, index) => (
                    <tr 
                      key={index}
                      className={`border-b cursor-pointer hover:bg-blue-50 ${
                        selectedRole === index ? 'bg-blue-100' : ''
                      }`}
                      onClick={() => setSelectedRole(index)}
                    >
                      <td className="p-3 font-medium">{role.role}</td>
                      <td className="p-3">{role.focus}</td>
                      <td className="p-3">{role.responsibility}</td>
                      <td className="p-3 text-blue-600">{role.example}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Step 5: Analogy */}
        {currentStep === 4 && (
          <div className="p-6 bg-white rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold mb-4">{steps[currentStep].title}</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {steps[currentStep].analogy.map((item, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg text-center">
                  <div className="text-4xl mb-2">{item.emoji}</div>
                  <h3 className="font-semibold mb-2">{item.role}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        <button
          onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
          className={`px-6 py-2 rounded ${
            currentStep > 0 
              ? 'bg-gray-200 hover:bg-gray-300' 
              : 'bg-gray-100 cursor-not-allowed'
          }`}
          disabled={currentStep === 0}
        >
          Previous
        </button>
        
        {currentStep < steps.length - 1 ? (
          <button
            onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Next
          </button>
        ) : (
          <button
            onClick={() => setCurrentStep(0)}
            className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Restart Simulation
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductManagementSimulator;