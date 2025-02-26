import React from 'react';
import { FaUserTie, FaCode, FaChalkboardTeacher } from 'react-icons/fa';

const useCases = [
  {
    id: 1,
    title: "Product Managers",
    header: "Product Managers",
    description:
      "Sprintify empowers product managers to lead effective product development by offering centralized dashboards that track key metrics, streamline stakeholder communication, and facilitate seamless collaboration across teams. The tool provides real-time sprint updates, integrated burndown charts, and project roadmaps that keep everyone aligned and informed.",
    uvp: "Command Your Sprint, Lead Your Success.",
    image: "images/PM.jpg",
    icon: <FaUserTie size={40} color="#FF5722" />,
    bgColor: "#FFEBEE", // light red
  },
  {
    id: 2,
    title: "Developers",
    header: "Developers",
    description:
      "For developers, Sprintify offers an intuitive platform to quickly estimate feature complexities and monitor progress on the go. With agile estimation tools, burn-down chart tracking, and clear visual metrics, developers can identify bottlenecks early, adjust workloads dynamically and reduce burnout, while ensuring timely delivery of high-quality code.",
    uvp: "Code with Precision, Sprint with Confidence.",
    image: "images/Developers.jpg",
    icon: <FaCode size={40} color="#4CAF50" />,
    bgColor: "#E8F5E9", // light green
  },
  {
    id: 3,
    title: "Educational Use – Students & Facilitators/Mentors",
    header: "Educational",
    description:
      "Sprintify is an ideal hands-on learning environment for students eager to understand agile processes and for facilitators/mentors who need a practical teaching tool. It simulates real-world agile product management with interactive sprint planning, live burndown charts, prioritization tools etc, making the learning curve engaging and directly applicable to industry practices in product development processes.",
    uvp: "Learn Agile by Living It.",
    image: "images/Education.jpg",
    icon: <FaChalkboardTeacher size={40} color="#2196F3" />,
    bgColor: "#E3F2FD", // light blue
  },
];

const UseCaseSections = () => {
  return (
    <>
      <style>{`
        .use-case-container {
          width: 90%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 40px 0;
        }
        .use-case-section {
          margin-bottom: 60px;
        }
        .card {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-radius: 8px;
          padding: 20px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          overflow: hidden;
        }
        .use-case-image,
        .use-case-text {
          flex: 1;
          padding: 20px;
        }
        .use-case-image img {
          width: 100%;
          border-radius: 8px;
        }
        .use-case-header {
          font-size: 2rem;
          margin-bottom: 10px;
        }
        .use-case-uvp {
          font-weight: bold;
          margin-top: 20px;
        }
        /* Alternate layout: reverse order for odd sections */
        .reverse {
          flex-direction: row-reverse;
        }
        /* Responsive Styles */
        @media (max-width: 768px) {
          .card {
            flex-direction: column;
            text-align: center;
          }
          .use-case-image,
          .use-case-text {
            padding: 10px;
          }
          .use-case-header {
            font-size: 1.5rem;
          }
        }
      `}</style>
      <div className="use-case-container">
        {useCases.map((item, index) => (
          <section key={item.id} className="use-case-section">
            <div
              className={`card ${index % 2 !== 0 ? 'reverse' : ''}`}
              style={{ backgroundColor: item.bgColor }}
            >
              <div className="use-case-image">
                <img src={item.image} alt={item.title} />
              </div>
              <div className="use-case-text">
                <div>{item.icon}</div>
                <h2 className="use-case-header">{`Sprintify for ${item.header}`}</h2>
                <p>{item.description}</p>
                <p className="use-case-uvp">{item.uvp}</p>
              </div>
            </div>
          </section>
        ))}
      </div>
    </>
  );
};

export default UseCaseSections;
