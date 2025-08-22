import React, { useState } from 'react';
import { 
  FaHome, FaClipboardList, FaShieldAlt, FaCogs, 
  FaCheckCircle, FaExclamationTriangle, FaClock, FaChartBar, 
  FaEye, FaBullseye, FaLightbulb, FaUsers, FaCalendarAlt, 
  FaChevronDown, FaChevronUp 
} from 'react-icons/fa';

// Product Strategy Component
const SellyticsPS = () => {
  const psSections = [
    {
      title: "Vision",
      icon: <FaEye className="text-blue-500" />,
      definition: "A high-level, aspirational statement that outlines Sellytics’ long-term goal.",
      detail: (
        <p>
          Our vision is to empower SME store owners in Lagos’ open markets—Alaba, Trade Fair, and Computer Village—with a seamless, affordable web-based platform that transforms retail management, driving efficiency and profitability.
        </p>
      )
    },
    {
      title: "Mission",
      icon: <FaBullseye className="text-green-500" />,
      definition: "A clear statement of what Sellytics does to achieve its vision, focusing on key processes and objectives.",
      detail: (
        <p>
          Sellytics’ mission is to deliver an intuitive web-based platform that simplifies inventory management, tracks sales and expenses in real-time, and enables multi-store oversight, helping Lagos traders save time and boost profits while staying competitive.
        </p>
      )
    },
    {
      title: "Strategic Goals",
      icon: <FaLightbulb className="text-yellow-500" />,
      definition: "Specific, measurable objectives to guide Sellytics’ product development and success.",
      detail: (
        <ul className="list-disc pl-5">
          <li><strong>Streamline Operations:</strong> Reduce inventory management time by 30% through barcode scanning and real-time updates.</li>
          <li><strong>Enhance Profitability:</strong> Enable dynamic pricing and expense tracking to improve profit margins for SME traders.</li>
          <li><strong>Scale Multi-Store Management:</strong> Support traders with multiple stalls via a unified dashboard, increasing efficiency by 25%.</li>
          <li><strong>Drive User Adoption:</strong> Achieve 1,000 active users in Lagos markets by month 12 with a 70% retention rate.</li>
        </ul>
      )
    },
    {
      title: "Target Audience",
      icon: <FaUsers className="text-purple-500" />,
      definition: "The specific group of users for whom Sellytics is designed.",
      detail: (
        <p>
          Sellytics targets SME store owners (1–20 employees) in Lagos’ Alaba, Trade Fair, and Computer Village markets, operating in electronics, fashion, and consumer goods, who need affordable, user-friendly tools to manage inventory and sales.
        </p>
      )
    },
    {
      title: "Market Opportunity & Competitive Analysis",
      icon: <FaChartBar className="text-red-500" />,
      definition: "An assessment of the market landscape and competitive positioning for Sellytics.",
      detail: (
        <>
          <p>
            <strong>Opportunity:</strong> Thousands of SMEs in Lagos’ key markets face inefficiencies from manual processes, with growing demand for affordable digital tools. Existing solutions cost ₦50,000–₦100,000/month, pricing out many traders.
          </p>
          <p>
            <strong>Competitive Edge:</strong> Sellytics offers a tailored, low-cost platform (₦15,000–₦25,000/month) optimized for low-bandwidth environments, with features like multi-store management and receipt generation that competitors lack.
          </p>
        </>
      )
    },
    {
      title: "Key Metrics",
      icon: <FaChartBar className="text-indigo-500" />,
      definition: "Quantifiable measures to track Sellytics’ performance and success.",
      detail: (
        <ul className="list-disc pl-5">
          <li>Number of active users (target: 1,000 by month 12)</li>
          <li>Monthly retention rate (target: 70%)</li>
          <li>User login frequency (target: 80% weekly logins)</li>
          <li>Net Promoter Score (target: 50+)</li>
        </ul>
      )
    },
    {
      title: "Risks & Considerations",
      icon: <FaExclamationTriangle className="text-orange-500" />,
      definition: "Potential challenges that could impact Sellytics’ success.",
      detail: (
        <ul className="list-disc pl-5">
          <li>Limited digital literacy among traders may slow adoption.</li>
          <li>Unstable internet connectivity in Lagos markets could disrupt app usage.</li>
          <li>Competition from established platforms like Zoho Inventory.</li>
          <li>User churn if platform value isn’t immediately clear.</li>
        </ul>
      )
    }
  ];

  const [openSectionIndex, setOpenSectionIndex] = useState(null);

  const toggleSection = (index) => {
    setOpenSectionIndex(openSectionIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">Sellytics Product Strategy</h1>
      <p className="text-center mb-10 text-lg text-gray-600">
        Discover the core elements of Sellytics’ product strategy. Click each section to explore its definition and details!
      </p>
      <div className="space-y-6">
        {psSections.map((section, index) => (
          <div key={index} className="border rounded shadow">
            <button 
              onClick={() => toggleSection(index)} 
              className="w-full flex items-center justify-between p-4 focus:outline-none bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <div className="flex items-center space-x-3">
                {section.icon}
                <span className="text-2xl font-semibold text-gray-800">{section.title}</span>
              </div>
              <span className="text-2xl">{openSectionIndex === index ? '-' : '+'}</span>
            </button>
            {openSectionIndex === index && (
              <div className="p-6 bg-white space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-800">Definition</h3>
                  <p className="text-gray-700">{section.definition}</p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">Details</h3>
                  {section.detail}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-10 p-6 bg-blue-50 border border-blue-200 rounded">
        <h2 className="text-3xl font-bold mb-3 text-gray-800">Example Scenario</h2>
        <p className="mb-3 text-gray-700">
          Imagine you’re a product manager for Sellytics, tasked with improving inventory management for traders in Alaba Market. You develop a barcode scanning feature that cuts stock update time by 30%. Traders like Chinedu can now track inventory and sales in real-time, boosting efficiency.
        </p>
        <p className="italic text-gray-600">
          Reflect: Which metrics would you use to measure the success of this feature?
        </p>
      </div>
    </div>
  );
};

// Product Roadmap Component
const SellyticsRM = () => {
  const roadmapPhases = [
    {
      title: "Phase 1: Research & Planning",
      period: "Q2 2025",
      definition: "The research and planning phase establishes the foundation for Sellytics, identifying user needs and designing the initial product experience.",
      details: (
        <ul className="list-disc pl-5">
          <li>Conduct user interviews with SME store owners in Alaba, Trade Fair, and Computer Village.</li>
          <li>Perform competitive analysis of existing inventory and sales tools.</li>
          <li>Create wireframes for the web-based dashboard, focusing on barcode scanning and multi-store management.</li>
        </ul>
      )
    },
    {
      title: "Phase 2: MVP Development",
      period: "Q3 2025",
      definition: "The MVP phase builds core features to deliver value to Lagos traders, turning requirements into a functional web platform.",
      details: (
        <ul className="list-disc pl-5">
          <li>Develop the web-based dashboard with inventory tracking and barcode scanning.</li>
          <li>Implement sales and expense tracking with real-time analytics.</li>
          <li>Build multi-store management and receipt generation features.</li>
        </ul>
      )
    },
    {
      title: "Phase 3: Beta Launch & Feedback",
      period: "Q4 2025",
      definition: "The beta launch phase tests the MVP with a small group of Lagos traders to gather feedback and refine the platform.",
      details: (
        <ul className="list-disc pl-5">
          <li>Roll out the MVP to 50 store owners in Alaba, Trade Fair, and Computer Village.</li>
          <li>Collect feedback on usability, feature effectiveness, and low-bandwidth performance.</li>
          <li>Monitor platform stability and address any technical issues.</li>
        </ul>
      )
    },
    {
      title: "Phase 4: Full Launch & Scale",
      period: "Q1 2026",
      definition: "The full launch phase refines the platform based on beta feedback and scales to all SME traders in Lagos’ key markets.",
      details: (
        <ul className="list-disc pl-5">
          <li>Incorporate beta feedback to enhance dashboard usability and features.</li>
          <li>Launch the platform to all traders in Alaba, Trade Fair, and Computer Village.</li>
          <li>Establish partnerships with market unions (e.g., Alaba Traders Association) for broader adoption.</li>
        </ul>
      )
    },
    {
      title: "Phase 5: Iteration & Expansion",
      period: "Q2 2026 Onward",
      definition: "This phase focuses on continuous improvement, adding advanced features and exploring expansion beyond Lagos.",
      details: (
        <ul className="list-disc pl-5">
          <li>Add offline mode and advanced analytics for sales trends.</li>
          <li>Enhance low-bandwidth optimization for broader accessibility.</li>
          <li>Explore expansion to other Nigerian markets like Port Harcourt and Aba.</li>
        </ul>
      )
    }
  ];

  const [expandedIndex, setExpandedIndex] = useState(null);

  const togglePhase = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">Sellytics Product Roadmap</h1>
      <p className="text-center mb-10 text-lg text-gray-600">
        Explore the phases of Sellytics’ roadmap, from research to expansion, and see how we’re transforming retail for Lagos’ SME traders.
      </p>
      <div className="space-y-6">
        {roadmapPhases.map((phase, index) => (
          <div
            key={index}
            className="border rounded-lg shadow bg-white hover:shadow-xl transition duration-200"
          >
            <button
              onClick={() => togglePhase(index)}
              className="w-full flex items-center justify-between p-4 focus:outline-none bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <FaCalendarAlt className="text-indigo-500" />
                <span className="text-2xl font-semibold text-gray-800">{phase.title}</span>
                <span className="text-lg text-gray-600">({phase.period})</span>
              </div>
              <div>
                {expandedIndex === index ? (
                  <FaChevronUp className="text-indigo-500 text-2xl" />
                ) : (
                  <FaChevronDown className="text-indigo-500 text-2xl" />
                )}
              </div>
            </button>
            {expandedIndex === index && (
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-800">Definition</h3>
                  <p className="mt-1 text-gray-700">{phase.definition}</p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">Details</h3>
                  <div className="mt-1 text-gray-700">{phase.details}</div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// Product Requirements Document Component
const SellyticsPRD = () => {
  const prdSections = [
    {
      id: "overview",
      title: "Overview",
      icon: <FaHome className="inline mr-2" />,
      content: (
        <div className="space-y-4">
          <p>
            <strong>Title:</strong> Sellytics Retail Management Platform
          </p>
          <p>
            <strong>Objective:</strong> Develop an intuitive, web-based platform for SME store owners in Lagos’ Alaba, Trade Fair, and Computer Village markets to manage inventory, track sales and expenses, and oversee multiple stores. The platform is optimized for low-bandwidth environments, ensuring accessibility and efficiency to boost profitability for traders.
          </p>
        </div>
      )
    },
    {
      id: "functional",
      title: "Functional Requirements",
      icon: <FaClipboardList className="inline mr-2" />,
      content: (
        <div className="space-y-4">
          <h3 className="font-bold">User Registration & Onboarding:</h3>
          <p>
            <strong>Registration Form:</strong> Fields include business name, owner name, contact information (phone, email), store location(s), and product categories (e.g., electronics, fashion).
          </p>
          <p>
            <strong>Guided Flow:</strong> Step-by-step onboarding with tooltips and progress indicators, adapting to single or multi-store setups.
          </p>
          <h3 className="font-bold">Inventory Management:</h3>
          <p>
            <strong>Barcode Scanning:</strong> Scan product barcodes via mobile or webcam for real-time stock updates, with manual entry fallback.
          </p>
          <p>
            <strong>Stock Alerts:</strong> Automated notifications for low stock (below 10% threshold) or overstock conditions.
          </p>
          <h3 className="font-bold">Sales & Expense Tracking:</h3>
          <p>
            Real-time dashboard displaying sales trends, revenue, and expense summaries, with exportable reports.
          </p>
          <p>
            <strong>Pricing Tools:</strong> Dynamic pricing adjustments and promotion tracking to optimize profit margins.
          </p>
          <h3 className="font-bold">Multi-Store Management:</h3>
          <p>
            Unified dashboard to manage inventory, sales, and expenses across multiple store locations, with store-specific analytics.
          </p>
          <h3 className="font-bold">Receipt & Returns:</h3>
          <p>
            Generate digital receipts for customers via email or QR code; track returned items for refunds and restocking.
          </p>
          <h3 className="font-bold">APIs:</h3>
          <p>
            <strong>Inventory Endpoint:</strong> POST <code>/inventory/add</code> – Accepts barcode data and updates stock levels.
          </p>
          <p>
            <strong>Sales Endpoint:</strong> POST <code>/sales/record</code> – Logs sales transactions and updates revenue.
          </p>
          <p>
            <strong>Store Endpoint:</strong> GET <code>/stores/{'{id}'}</code> – Retrieves data for single or multi-store dashboards.
          </p>
        </div>
      )
    },
    {
      id: "nonFunctional",
      title: "Non-Functional Requirements",
      icon: <FaShieldAlt className="inline mr-2" />,
      content: (
        <div className="space-y-4">
          <p>
            <strong>Performance:</strong> Page load times under 2 seconds in low-bandwidth environments (e.g., 2G/3G networks); support for 1,000 concurrent users.
          </p>
          <p>
            <strong>Scalability:</strong> System supports growth to 10,000 users with minimal latency, using cloud-based infrastructure.
          </p>
          <p>
            <strong>Security:</strong> End-to-end encryption for user data in transit and at rest; role-based access controls (RBAC) for admin features.
          </p>
          <p>
            <strong>Usability:</strong> Intuitive UI/UX tailored for users with limited digital literacy, validated through user testing with Lagos traders.
          </p>
          <p>
            <strong>Reliability:</strong> 99.9% uptime with offline caching and fallback mechanisms for unstable internet connections.
          </p>
        </div>
      )
    },
    {
      id: "technical",
      title: "Technical Specifications",
      icon: <FaCogs className="inline mr-2" />,
      content: (
        <div className="space-y-4">
          <h3 className="font-bold">APIs:</h3>
          <p>
            <strong>Inventory Endpoint:</strong> POST <code>/inventory/add</code> – Accepts barcode, product details, and store_id; returns updated stock level.
          </p>
          <p>
            <strong>Sales Endpoint:</strong> POST <code>/sales/record</code> – Logs sale data (product_id, amount, store_id); returns transaction ID.
          </p>
          <p>
            <strong>Store Endpoint:</strong> GET <code>/stores/{'{id}'}</code> – Returns inventory and sales data for specified store(s).
          </p>
          <h3 className="font-bold">Database Schema:</h3>
          <p>
            <strong>Users Table:</strong> Fields: user_id, business_name, owner_name, contact_info, store_locations, created_at, updated_at.
          </p>
          <p>
            <strong>Inventory Table:</strong> Fields: product_id, barcode, stock_level, store_id, last_updated.
          </p>
          <p>
            <strong>Sales Table:</strong> Fields: sale_id, product_id, store_id, amount, timestamp.
          </p>
          <h3 className="font-bold">UI/UX Components:</h3>
          <p>
            <strong>Responsive Dashboard:</strong> Built with React, compatible with desktop and mobile devices.
          </p>
          <p>
            <strong>Barcode Scanner:</strong> Web-based scanner using device camera (e.g., QuaggaJS), with manual entry fallback.
          </p>
          <p>
            <strong>Analytics Dashboard:</strong> Real-time charts for sales, expenses, and inventory trends, with export functionality.
          </p>
        </div>
      )
    },
    {
      id: "acceptance",
      title: "Acceptance Criteria",
      icon: <FaCheckCircle className="inline mr-2" />,
      content: (
        <div className="space-y-4">
          <h3 className="font-bold">User Onboarding:</h3>
          <p>Users can complete registration and onboard within 5 minutes without errors.</p>
          <p>Guided flow provides clear instructions for single or multi-store setups, validated by 80% user success rate.</p>
          <h3 className="font-bold">Inventory & Sales:</h3>
          <p>Barcode scanning updates inventory in real-time; sales are logged accurately within 1 second.</p>
          <p>Multi-store dashboard displays data for all locations with zero latency in 95% of cases.</p>
          <h3 className="font-bold">Performance & Usability:</h3>
          <p>Platform loads under 2 seconds on 2G/3G networks; 80% of beta users report ease of use in surveys.</p>
          <h3 className="font-bold">Beta Testing:</h3>
          <p>Achieve 50% success rate for beta phase with 50 users (up from 15 beta users, 2 paid subscribers).</p>
        </div>
      )
    },
    {
      id: "dependencies",
      title: "Dependencies & Risks",
      icon: <FaExclamationTriangle className="inline mr-2" />,
      content: (
        <div className="space-y-4">
          <h3 className="font-bold">Dependencies:</h3>
          <p>Stable web hosting and CDN (e.g., AWS CloudFront) for low-bandwidth performance.</p>
          <p>Integration with barcode scanning libraries (e.g., QuaggaJS).</p>
          <h3 className="font-bold">Risks:</h3>
          <p>Limited digital literacy among traders may require extensive in-app tutorials.</p>
          <p>Unstable internet in Lagos markets could disrupt real-time updates, mitigated by offline caching.</p>
          <p>Competition from platforms like Zoho Inventory may impact market share.</p>
        </div>
      )
    },
    {
      id: "timeline",
      title: "Timeline",
      icon: <FaClock className="inline mr-2" />,
      content: (
        <div className="space-y-4">
          <p>
            <strong>Research & Planning (Q2 2025):</strong> Conduct user interviews, create wireframes, and perform competitive analysis.
          </p>
          <p>
            <strong>MVP Development (Q3 2025):</strong> Build core features (barcode scanning, sales tracking, multi-store dashboard).
          </p>
          <p>
            <strong>Beta Testing (Q4 2025):</strong> Test with 50 traders, gather feedback, and iterate.
          </p>
          <p>
            <strong>Full Launch (Q1 2026):</strong> Roll out to all traders in Alaba, Trade Fair, and Computer Village.
          </p>
        </div>
      )
    },
    {
      id: "metrics",
      title: "Success Metrics",
      icon: <FaChartBar className="inline mr-2" />,
      content: (
        <div className="space-y-4">
          <p>
            <strong>30% reduction</strong> in inventory management time for traders.
          </p>
          <p>
            <strong>80% weekly login rate</strong> among active users.
          </p>
          <p>
            <strong>Net Promoter Score</strong> of 50+ by beta phase end.
          </p>
          <p>
            <strong>1,000 active users</strong> by month 12 post-launch (Q1 2027).
          </p>
        </div>
      )
    }
  ];

  const [activeSection, setActiveSection] = useState("overview");

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">Sellytics Retail Management Platform PRD</h1>
      <p className="text-center mb-10 text-lg text-gray-600">Interactive Product Requirements Document for Sellytics</p>
      <div className="flex">
        <aside className="w-1/4 bg-gray-100 p-4 border-r border-gray-200">
          <ul className="space-y-4">
            {prdSections.map(section => (
              <li key={section.id}>
                <button
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full text-left px-4 py-2 rounded transition-colors duration-200 ${
                    activeSection === section.id ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800 hover:bg-blue-300'
                  }`}
                >
                  {section.icon}
                  {section.title}
                </button>
              </li>
            ))}
          </ul>
        </aside>
        <main className="w-3/4 p-6">
          {prdSections.map(section => (
            <div key={section.id} className={activeSection === section.id ? 'block' : 'hidden'}>
              <h2 className="text-3xl font-semibold text-gray-800 mb-4">{section.title}</h2>
              <div className="text-gray-700 text-base leading-relaxed">
                {section.content}
              </div>
            </div>
          ))}
        </main>
      </div>
    </div>
  );
};

// Main Dashboard Component
const SellyticsDashboard = () => {
  const [activeComponent, setActiveComponent] = useState('ps');

  const renderComponent = () => {
    switch (activeComponent) {
      case 'ps':
        return <SellyticsPS />;
      case 'rm':
        return <SellyticsRM />;
      case 'prd':
        return <SellyticsPRD />;
      default:
        return <SellyticsPS />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-0">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-800">Sellytics Dashboard</h1>
        <p className="text-lg text-gray-600 mt-2">Explore Sellytics’ Product Strategy, Roadmap, and PRD</p>
      </header>
      <div className="flex justify-center space-x-4 mb-8">
        <button
          onClick={() => setActiveComponent('ps')}
          className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
            activeComponent === 'ps'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-200 text-gray-800 hover:bg-indigo-500 hover:text-white'
          }`}
        >
          Product Strategy
        </button>
        <button
          onClick={() => setActiveComponent('rm')}
          className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
            activeComponent === 'rm'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-200 text-gray-800 hover:bg-indigo-500 hover:text-white'
          }`}
        >
          Roadmap
        </button>
        <button
          onClick={() => setActiveComponent('prd')}
          className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
            activeComponent === 'prd'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-200 text-gray-800 hover:bg-indigo-500 hover:text-white'
          }`}
        >
          PRD
        </button>
      </div>
      <main className="w-full">
        {renderComponent()}
      </main>
    </div>
  );
};

export default SellyticsDashboard;