import React, { useState } from 'react';
import { 
  FaHome, FaClipboardList, FaShieldAlt, FaCogs, 
  FaCheckCircle, FaExclamationTriangle, FaClock, FaChartBar 
} from 'react-icons/fa';

const sections = [
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
        <p>Guided flow provides clear instructions for single and multi-store setups, validated by 80% user success rate.</p>
        <h3 className="font-bold">Inventory & Sales:</h3>
        <p>Barcode scanning updates inventory in real-time; sales are logged accurately within 1 second.</p>
        <p>Multi-store dashboard displays data for all locations with zero latency in 95% of cases.</p>
        <h3 className="font-bold">Performance & Usability:</h3>
        <p>Platform loads under 2 seconds on 2G/3G networks; 80% of beta users report ease of use in surveys.</p>
        <h3 className="font-bold">Beta Testing:</h3>
        <p>Achieve 80% success rate for inventory and sales tracking during beta phase with 50 users (up from 15 beta users, 2 paid).</p>
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
        <p>Integration with barcode scanning libraries (e.g., QuaggaJS or ZXing).</p>
        <h3 className="font-bold">Risks:</h3>
        <p>Limited digital literacy among traders may require extensive in-app tutorials.</p>
        <p>Unstable internet in Lagos markets could disrupt real-time updates, mitigated by offline caching.</p>
        <p>Competition from platforms like Zoho Inventory (₦50,000–₦100,000/month) may challenge market share.</p>
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

function SellyticsPRD() {
  const [activeSection, setActiveSection] = useState("overview");

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-indigo-100 p-6">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-800">Sellytics Retail Management Platform PRD</h1>
        <p className="text-lg text-gray-600 mt-2">Interactive Product Requirements Document for Sellytics</p>
      </header>
      <div className="flex max-w-6xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Sidebar Navigation */}
        <aside className="w-1/4 bg-gray-100 p-4 border-r border-gray-200">
          <ul className="space-y-4">
            {sections.map(section => (
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
        {/* Main Content */}
        <main className="w-3/4 p-6">
          {sections.map(section => (
            <div key={section.id} className={activeSection === section.id ? 'block' : 'hidden'}>
              <h2 className="text-3xl font-semibold text-gray-800 mb-4">{section.title}</h2>
              <div className="text-gray-700 text-base leading-relaxed">
                {section.content}
              </div>
            </div>
          ))}
        </main>
      </div>
      <footer className="mt-8 text-center text-gray-500">
        <p>PRD created to outline Sellytics’ development requirements.</p>
      </footer>
    </div>
  );
}

export default SellyticsPRD;