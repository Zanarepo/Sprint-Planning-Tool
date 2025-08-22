import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import ScopeCreep from './ScopeCreep';

const ProductManagerDocuments = () => {
  const [openSections, setOpenSections] = useState({});

  const toggleSection = (id) => {
    setOpenSections((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const documents = [
    {
      id: 'product-vision',
      title: 'Product Vision Document',
      purpose: 'Defines the overarching goal and purpose of the product, answering "What problem does it solve?" and "Who is it for?" It aligns stakeholders and teams on the long-term vision.',
      use: 'Guides decision-making, inspires teams, and communicates the product’s value to stakeholders.',
      example: [
        'For a fitness app: Define vision as "Empower users to achieve sustainable health through personalized, AI-driven workout plans for busy professionals aged 25-45."',
        'Use case: Reference during team meetings to prioritize AI personalization over social sharing, aligning with core vision.',
        'Use case: Present to investors to articulate the product’s market fit and long-term potential.'
      ],
      questionsToAsk: [
        'To engineering: How can we ensure AI personalization is scalable for millions of users?',
        'To UX: What user pain points can we validate to refine the target audience definition?',
        'To marketing: How can we craft messaging that resonates with busy professionals?'
      ],
      questionsToExpect: [
        'From engineering: What technical constraints might limit the AI-driven features in the vision?',
        'From stakeholders: How does this vision differentiate us from competitors like Fitbit or Peloton?',
        'From UX: How will we validate the target audience’s needs through user research?'
      ]
    },
    {
      id: 'product-roadmap',
      title: 'Product Roadmap',
      purpose: 'Outlines the strategic plan for product development, including timelines, key features, and milestones. It prioritizes tasks and communicates progression.',
      use: 'Helps teams allocate resources, track progress, and adapt to changes while maintaining focus on long-term goals.',
      example: [
        'For an e-commerce platform: Q1: Mobile app launch; Q2: Payment integration; Q3: Advanced search filters.',
        'Use case: Sequence features in agile sprints, prioritizing user authentication before analytics.',
        'Use case: Share with leadership to secure budget for critical Q2 milestones.'
      ],
      questionsToAsk: [
        'To engineering: What dependencies might delay payment integration?',
        'To product team: Which features can be deferred to Q3 without impacting user adoption?',
        'To sales: What customer feedback should influence roadmap prioritization?'
      ],
      questionsToExpect: [
        'From engineering: Are there enough resources to meet the Q1 mobile app deadline?',
        'From stakeholders: What’s the ROI justification for prioritizing payment integration?',
        'From UX: How will roadmap changes affect user onboarding timelines?'
      ]
    },
    {
      id: 'prd',
      title: 'Product Requirements Document (PRD)',
      purpose: 'Details functional and non-functional requirements, acceptance criteria, dependencies, and constraints. Specifies what to build and how it should function.',
      use: 'Serves as a blueprint for developers and designers, ensuring the product meets user and business needs.',
      example: [
        'For a chat feature: "Users can send real-time messages with end-to-end encryption; must load in <2 seconds."',
        'Use case: Engineers implement encryption per PRD, avoiding scope creep like video calls.',
        'Use case: QA uses acceptance criteria to validate message delivery speed.'
      ],
      questionsToAsk: [
        'To engineering: Can we achieve <2-second message load with current infrastructure?',
        'To UX: How can we design the UI to make encryption transparent to users?',
        'To QA: What edge cases should we test to ensure PRD criteria are met?'
      ],
      questionsToExpect: [
        'From engineering: Are there specific libraries we should use for encryption?',
        'From UX: What happens if the 2-second load time isn’t met for some users?',
        'From stakeholders: How does this feature align with our revenue goals?'
      ]
    },
    {
      id: 'mrd',
      title: 'Market Requirements Document (MRD)',
      purpose: 'Captures market research, customer needs, trends, and competitor analysis. Identifies market opportunity and validates product fit.',
      use: 'Informs product strategy and ensures the product addresses real-world demands, reducing failure risk.',
      example: [
        'For consumer goods: Analysis shows demand for eco-friendly packaging; competitors lack biodegradable options.',
        'Use case: Justify targeting environmentally conscious millennials for a sustainable product line.',
        'Use case: Use MRD data to pitch to retailers emphasizing market gap.'
      ],
      questionsToAsk: [
        'To marketing: What customer segments show the strongest demand for eco-friendly products?',
        'To research: Can we quantify the market size for biodegradable packaging?',
        'To sales: Which retailers prioritize sustainability in their product lines?'
      ],
      questionsToExpect: [
        'From marketing: How will we position this against competitors’ greenwashing claims?',
        'From stakeholders: What’s the projected market share for this segment?',
        'From product team: How will MRD findings impact feature prioritization?'
      ]
    },
    {
      id: 'user-stories',
      title: 'User Stories and Use Cases',
      purpose: 'Translates customer needs into actionable requirements. User stories describe goals; use cases detail interactions.',
      use: 'Guides development and testing to build features aligning with user expectations.',
      example: [
        'User story: "As a shopper, I want to filter products by price so I can find affordable options."',
        'Use case: User selects price filter; system updates list in <1s with accurate results.',
        'Use case: Prioritize price filter development based on user behavior analytics.'
      ],
      questionsToAsk: [
        'To UX: How can we make the filter UI intuitive for first-time users?',
        'To engineering: Can the backend support real-time filtering for large datasets?',
        'To analytics: What are the most common filter preferences among users?'
      ],
      questionsToExpect: [
        'From engineering: What’s the acceptable latency for filter updates?',
        'From UX: Should we include additional filter options like color or brand?',
        'From QA: How do we test edge cases, like empty filter results?'
      ]
    },
    {
      id: 'customer-journey-map',
      title: 'Customer Journey Map',
      purpose: 'Visualizes user interactions from initial engagement to advanced usage, highlighting pain points and opportunities.',
      use: 'Helps teams create user-friendly experiences and explains functionality to stakeholders.',
      example: [
        'For a banking app: Awareness (ad) → Onboarding (signup) → Usage (transactions) → Loyalty (rewards).',
        'Use case: Identify signup drop-off and optimize by adding social login options.',
        'Use case: Share with marketing to align ad campaigns with journey touchpoints.'
      ],
      questionsToAsk: [
        'To UX: Where are the biggest user drop-offs in the onboarding process?',
        'To marketing: How can we tailor ads to address specific journey pain points?',
        'To engineering: Can we streamline transaction flows to reduce user effort?'
      ],
      questionsToExpect: [
        'From UX: What user research supports the identified pain points?',
        'From stakeholders: How will journey improvements impact retention metrics?',
        'From marketing: Can we target specific journey stages with personalized campaigns?'
      ]
    },
    {
      id: 'competitive-analysis',
      title: 'Competitive Analysis Document',
      purpose: 'Analyzes competitors’ products, strengths, weaknesses, and market share. Identifies differentiation opportunities.',
      use: 'Informs positioning and marketing, helping build a competitive product.',
      example: [
        'For ride-sharing apps: Uber excels in coverage; Lyft in user experience.',
        'Use case: Differentiate with eco-friendly rides, like carbon offset credits.',
        'Use case: Use analysis to pitch unique features to investors.'
      ],
      questionsToAsk: [
        'To marketing: How can we highlight our eco-friendly features in campaigns?',
        'To product team: What competitor features are users requesting most?',
        'To research: Can we quantify competitors’ market share in our target region?'
      ],
      questionsToExpect: [
        'From stakeholders: How sustainable is the eco-friendly feature financially?',
        'From marketing: What’s our unique selling proposition compared to Lyft’s UX?',
        'From engineering: Are there technical barriers to implementing carbon offsets?'
      ]
    },
    {
      id: 'okrs-kpis',
      title: 'OKRs/KPIs and Success Metrics',
      purpose: 'Defines objectives and measurable results, like revenue growth or user engagement.',
      use: 'Tracks progress, aligns teams with business goals, and provides feedback.',
      example: [
        'Objective: Increase user retention; KPI: 30% monthly active users.',
        'Use case: Monitor dashboard metrics post-launch; iterate on notifications if retention drops.',
        'Use case: Align cross-functional teams on a single retention goal.'
      ],
      questionsToAsk: [
        'To analytics: How accurately can we track monthly active users in real-time?',
        'To product team: What features can drive the 30% retention target?',
        'To stakeholders: Are there additional KPIs we should prioritize, like revenue per user?'
      ],
      questionsToExpect: [
        'From stakeholders: How will we measure the ROI of retention-focused features?',
        'From engineering: What data pipelines are needed for KPI tracking?',
        'From marketing: Can we tie KPIs to specific campaign outcomes?'
      ]
    },
    {
      id: 'design-specs',
      title: 'Design Specifications and Prototypes',
      purpose: 'Documents wireframes, prototypes, and style guides for consistent UX.',
      use: 'Bridges design and development, reducing misinterpretation.',
      example: [
        'Figma prototype for a dashboard with color schemes and interaction flows.',
        'Use case: Developers implement pixel-perfect UI per specs, meeting accessibility standards.',
        'Use case: Share with QA to validate UI consistency across devices.'
      ],
      questionsToAsk: [
        'To UX: Are all accessibility requirements (e.g., WCAG 2.1) included in the specs?',
        'To engineering: Can we implement the proposed interaction flows with current frameworks?',
        'To QA: How will we test prototype fidelity across different screen sizes?'
      ],
      questionsToExpect: [
        'From engineering: Are there specific CSS frameworks we should use for the UI?',
        'From UX: How flexible are the specs if we need to adjust for performance?',
        'From stakeholders: How do the designs align with our brand identity?'
      ]
    },
    {
      id: 'release-notes',
      title: 'Release Notes and User Manuals',
      purpose: 'Release notes detail updates; manuals explain usage.',
      use: 'Communicates changes and supports adoption, reducing support needs.',
      example: [
        'Release v2.0: Added dark mode, fixed login bugs.',
        'Manual: Step-by-step guide for app setup and feature usage.',
        'Use case: Post-update, users reference notes for new features, minimizing support tickets.'
      ],
      questionsToAsk: [
        'To support: What common user issues should the manual address?',
        'To marketing: How can we highlight new features in release notes for campaigns?',
        'To engineering: Are there technical details users need to know about updates?'
      ],
      questionsToExpect: [
        'From support: Will the manual cover edge cases like account recovery?',
        'From marketing: Can we use release notes to upsell premium features?',
        'From users: What changes in v2.0 might affect existing workflows?'
      ]
    },
    {
      id: 'gtm-strategy',
      title: 'Go-To-Market (GTM) Strategy Document',
      purpose: 'Outlines launch plan, including market segmentation, positioning, messaging, sales enablement, and channels.',
      use: 'Ensures successful product launch and market penetration by coordinating marketing, sales, and product teams.',
      example: [
        'For a SaaS tool: Target SMBs in tech; position as "affordable AI analytics"; channels: email, webinars.',
        'Use case: Align sales scripts with messaging to convert leads during beta testing.',
        'Use case: Use segmentation data to prioritize enterprise outreach post-launch.'
      ],
      questionsToAsk: [
        'To marketing: Which channels yield the highest conversion for SMBs?',
        'To sales: What training is needed to align with GTM messaging?',
        'To product team: Can we deliver a beta version to support early webinars?'
      ],
      questionsToExpect: [
        'From marketing: What budget is allocated for webinar campaigns?',
        'From sales: How will we handle objections about pricing compared to competitors?',
        'From stakeholders: What’s the timeline for achieving market penetration goals?'
      ]
    },
    {
      id: 'uat-plan',
      title: 'User Acceptance Testing (UAT) Plan',
      purpose: 'Outlines the process for testing the product with end-users to ensure it meets requirements and is ready for release.',
      use: 'Validates product functionality, usability, and performance from the user’s perspective, reducing post-launch issues.',
      example: [
        'For a CRM tool: Test scenarios for lead management, user onboarding, and reporting features.',
        'Use case: Conduct UAT with beta users to confirm lead import works as expected.',
        'Use case: Use feedback to fix UI bugs before final release.'
      ],
      questionsToAsk: [
        'To QA: What test scenarios cover the most critical user workflows?',
        'To users: Are there specific pain points we should test during UAT?',
        'To engineering: Can we simulate high user loads during UAT?'
      ],
      questionsToExpect: [
        'From users: How will feedback from UAT be incorporated before launch?',
        'From QA: What’s the timeline for resolving UAT-identified issues?',
        'From stakeholders: How will UAT results impact the release schedule?'
      ]
    },
    {
      id: 'technical-specs',
      title: 'Technical Specification Document',
      purpose: 'Details the technical architecture, APIs, data models, and system requirements for building the product.',
      use: 'Guides developers in implementation and ensures scalability, security, and maintainability.',
      example: [
        'For a payment system: Specify REST API endpoints, database schema for transactions, and security protocols.',
        'Use case: Developers use specs to implement PCI-compliant payment processing.',
        'Use case: Reference during code reviews to ensure adherence to architecture.'
      ],
      questionsToAsk: [
        'To engineering: Are the proposed APIs scalable for future features?',
        'To security: Do the specs meet all compliance requirements (e.g., PCI DSS)?',
        'To DevOps: Can our infrastructure support the specified load?'
      ],
      questionsToExpect: [
        'From engineering: What trade-offs are acceptable if we hit performance bottlenecks?',
        'From stakeholders: How do the specs align with our cost constraints?',
        'From QA: How will we test the APIs for edge cases?'
      ]
    },
    {
      id: 'business-case',
      title: 'Business Case Document',
      purpose: 'Justifies the product’s development by outlining costs, benefits, risks, and ROI.',
      use: 'Secures stakeholder buy-in and aligns product goals with business objectives.',
      example: [
        'For a new feature: Estimate $50K development cost, $200K revenue in Year 1.',
        'Use case: Present to executives to secure funding for a mobile app.',
        'Use case: Use ROI projections to prioritize features with highest impact.'
      ],
      questionsToAsk: [
        'To finance: Can we validate the revenue projections with market data?',
        'To stakeholders: What risk tolerance is acceptable for this investment?',
        'To product team: How can we minimize costs without compromising quality?'
      ],
      questionsToExpect: [
        'From stakeholders: What’s the break-even timeline for this investment?',
        'From finance: Are there hidden costs not accounted for in the case?',
        'From marketing: How will the business case impact pricing strategy?'
      ]
    },
    {
      id: 'risk-management',
      title: 'Risk Management Plan',
      purpose: 'Identifies potential risks (technical, market, operational) and mitigation strategies.',
      use: 'Minimizes project delays and failures by proactively addressing uncertainties.',
      example: [
        'Risk: Server downtime during launch; Mitigation: Implement redundant cloud infrastructure.',
        'Use case: Use plan to allocate budget for backup systems.',
        'Use case: Review risks in sprint planning to avoid delays.'
      ],
      questionsToAsk: [
        'To engineering: What technical risks are most likely to impact launch?',
        'To operations: How can we ensure supply chain stability for hardware products?',
        'To stakeholders: What’s the contingency plan for market adoption risks?'
      ],
      questionsToExpect: [
        'From engineering: How much budget is allocated for risk mitigation?',
        'From stakeholders: What’s the worst-case scenario for launch delays?',
        'From marketing: How do risks affect our go-to-market timeline?'
      ]
    }
  ];

  return (
    <div className="p-4 sm:p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8 text-indigo-700">Product Manager Documents</h1>
      <div className="space-y-6">
        {documents.map((doc) => (
          <div key={doc.id} className="bg-white p-4 rounded-xl shadow-md">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-semibold text-gray-800">{doc.title}</h2>
              <button
                onClick={() => toggleSection(doc.id)}
                className="bg-indigo-600 text-white px-3 py-1 rounded-lg hover:bg-indigo-700 flex items-center gap-2 focus:ring-2 focus:ring-indigo-500 transition transform hover:scale-105"
                aria-label={openSections[doc.id] ? `Hide ${doc.title}` : `Show ${doc.title}`}
              >
                {openSections[doc.id] ? <FaEyeSlash /> : <FaEye />}
                {openSections[doc.id] ? "Hide" : "Show"}
              </button>
            </div>
            {openSections[doc.id] && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-700">Purpose</h3>
                  <p className="text-gray-600">{doc.purpose}</p>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-700">Use</h3>
                  <p className="text-gray-600">{doc.use}</p>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-700">Example Use Cases</h3>
                  <ul className="list-disc pl-5 text-gray-600">
                    {doc.example.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-700">Questions to Ask Team Members</h3>
                  <ul className="list-disc pl-5 text-gray-600">
                    {doc.questionsToAsk.map((question, index) => (
                      <li key={index}>{question}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-700">Questions to Expect from Cross-Functional Teams</h3>
                  <ul className="list-disc pl-5 text-gray-600">
                    {doc.questionsToExpect.map((question, index) => (
                      <li key={index}>{question}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <ScopeCreep/>
    </div>
  );
};

export default ProductManagerDocuments;