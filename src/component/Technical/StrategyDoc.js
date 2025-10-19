import React, { useState } from "react";
import SprintPRD from "./SprintPRD";
import {

  FileText,
  AlertTriangle,
  Lightbulb,
  Rocket,
  Gem,
  Globe,
  BarChart3,
  Brain,
  Shield,
  Users,
  Puzzle,
  Target,
  DollarSign,
  TriangleAlert,
  Map,
  LineChart,
  Leaf,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const Section = ({ title, icon: Icon, children }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border rounded-2xl p-4 bg-white shadow-sm mb-3 transition-all">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full"
      >
        <div className="flex items-center gap-3 text-left">
          <Icon className="text-blue-600" />
          <h2 className="font-semibold text-lg text-gray-800">{title}</h2>
        </div>
        {open ? <ChevronUp /> : <ChevronDown />}
      </button>
      {open && <div className="mt-3 text-gray-700 space-y-2">{children}</div>}
    </div>
  );
};

export default function ProductStrategy() {
  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg p-3min-h-screen">
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-6 flex justify-center items-center gap-2">
        🧭 RIDE-HAILING PLATFORM — PRODUCT STRATEGY DOCUMENT
      </h1>

      <Section title="1. Executive Summary" icon={FileText}>
        <p>
          <strong>Product Name:</strong> JustRide (placeholder name — can be
          changed later)
        </p>
        <p>
          <strong>Overview:</strong> JustRide is a digital ride-hailing platform
          connecting drivers with riders through a seamless, affordable, and
          safe experience. It enables users to book rides instantly, track
          drivers in real-time, and pay securely via digital wallets or cards.
        </p>
        <p>
          <strong>Who it serves:</strong> Urban commuters, corporate employees,
          students, freelance and gig drivers.
        </p>
        <p>
          <strong>Core Problem Solved:</strong> Millions of commuters face
          unreliable, unsafe, and overpriced transport options. JustRide bridges
          this gap with transparent pricing, verified drivers, and optimized
          routes powered by smart algorithms.
        </p>
      </Section>

      <Section title="2. Problem Statement" icon={AlertTriangle}>
        <ul className="list-disc pl-5 space-y-1">
          <li>🚗 Unreliable Access: Long wait times during peak hours.</li>
          <li>💸 Unpredictable Pricing: Surge pricing without transparency.</li>
          <li>😟 Safety Concerns: Lack of verified drivers and tracking.</li>
          <li>📱 Fragmented Experience: No unified app for rides and payments.</li>
        </ul>
        <p>
          <strong>Data Insight:</strong> According to Statista (2024), over 70%
          of commuters in major African cities report dissatisfaction with
          transport consistency and safety.
        </p>
      </Section>

      <Section title="3. Solution" icon={Lightbulb}>
        <ul className="list-disc pl-5">
          <li>Instant booking with ETA prediction and optimized routing.</li>
          <li>Driver verification, SOS button, and live tracking.</li>
          <li>Transparent pricing — no hidden fees.</li>
          <li>Digital wallet and payment integration.</li>
          <li>Incentives for loyal riders and drivers.</li>
        </ul>
      </Section>

      <Section title="4. Vision & Mission" icon={Rocket}>
        <p>
          <strong>Vision:</strong> “To make urban mobility seamless, safe, and
          affordable for everyone.”
        </p>
        <p>
          <strong>Mission:</strong> “To connect riders and drivers through a
          secure, tech-driven platform that delivers comfort, convenience, and
          reliability.”
        </p>
      </Section>

      <Section title="5. Unique Value Proposition (UVP)" icon={Gem}>
        <table className="w-full text-sm border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Competitor</th>
              <th className="p-2 border">Focus</th>
              <th className="p-2 border">JustRide Advantage</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border p-2">Uber</td>
              <td className="border p-2">Global reach</td>
              <td className="border p-2">
                Local-first, tailored to regional needs
              </td>
            </tr>
            <tr>
              <td className="border p-2">Bolt</td>
              <td className="border p-2">Affordability</td>
              <td className="border p-2">
                Better driver incentives & transparent pricing
              </td>
            </tr>
            <tr>
              <td className="border p-2">Local Taxis</td>
              <td className="border p-2">Accessibility</td>
              <td className="border p-2">App-based safety & reliability</td>
            </tr>
          </tbody>
        </table>
        <p className="mt-2 italic">
          “Safe, affordable, and transparent rides — built for your city.”
        </p>
      </Section>

      <Section title="6. Market Overview & Trends" icon={Globe}>
        <ul className="list-disc pl-5">
          <li>Urbanization: 50% of Africa’s population in cities by 2030.</li>
          <li>Smartphone penetration {">"}70% among young adults.</li>
          <li>Digital payments rising through fintech growth.</li>
          <li>Shift toward sustainable mobility (EVs, hybrids).</li>
        </ul>
        <p>
          The African ride-hailing market is projected to exceed{" "}
          <strong>$12B</strong> by 2030, growing at <strong>12% CAGR</strong>.
        </p>
      </Section>

      <Section title="7. Market Opportunity — TAM, SAM, SOM" icon={BarChart3}>
        <table className="w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Market Tier</th>
              <th className="border p-2">Description</th>
              <th className="border p-2">Estimated Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border p-2">TAM</td>
              <td className="border p-2">Global ride-hailing market</td>
              <td className="border p-2">$400B</td>
            </tr>
            <tr>
              <td className="border p-2">SAM</td>
              <td className="border p-2">African ride-hailing market</td>
              <td className="border p-2">$12B</td>
            </tr>
            <tr>
              <td className="border p-2">SOM</td>
              <td className="border p-2">Initial cities (Lagos, Nairobi, Accra)</td>
              <td className="border p-2">$500M</td>
            </tr>
          </tbody>
        </table>
      </Section>

      <Section title="8. PESTEL Analysis" icon={Brain}>
        <ul className="list-disc pl-5">
          <li>Political: Government licensing and transport rules.</li>
          <li>Economic: Fuel price volatility affects fares.</li>
          <li>Social: Rising safety and convenience expectations.</li>
          <li>Technological: GPS reliability, mobile adoption.</li>
          <li>Environmental: Push for EVs and sustainability.</li>
          <li>Legal: GDPR and NDPR compliance.</li>
        </ul>
      </Section>

      <Section title="9. Competitor Analysis" icon={Shield}>
        <p>
          <strong>Uber:</strong> Trusted brand, high prices, low localization.
        </p>
        <p>
          <strong>Bolt:</strong> Affordable but weak safety measures.
        </p>
        <p>
          <strong>Local taxis:</strong> Familiar, but no tracking or consistent fares.
        </p>
        <p>
          <strong>JustRide Strengths:</strong> Local pricing, strong incentives,
          safety-first, real-time tracking.
        </p>
      </Section>

      <Section title="10. Customer Segmentation" icon={Users}>
        <ul className="list-disc pl-5">
          <li>Daily Commuters – office workers, students</li>
          <li>Drivers – full-time, part-time, gig economy workers</li>
          <li>Corporate Clients – companies offering rides</li>
        </ul>
        <p>
          <strong>Persona 1:</strong> Ada (25, Student) — needs affordable,
          safe rides, prefers discounts and digital pay.
        </p>
        <p>
          <strong>Persona 2:</strong> Tunde (32, Driver) — seeks fair pay and
          fuel support for reliability.
        </p>
      </Section>

      <Section title="11. Strategic Frameworks" icon={Puzzle}>
        <p className="font-semibold">Porter’s Five Forces</p>
        <ul className="list-disc pl-5">
          <li>New Entrants — Medium</li>
          <li>Supplier Power — High</li>
          <li>Buyer Power — High</li>
          <li>Substitutes — Medium</li>
          <li>Rivalry — High</li>
        </ul>
        <p className="font-semibold mt-2">SWOT Summary</p>
        <ul className="list-disc pl-5">
          <li>Strengths: Safety, local adaptation</li>
          <li>Weakness: Low initial awareness</li>
          <li>Opportunities: EV growth</li>
          <li>Threats: Regulation, competition</li>
        </ul>
      </Section>

      <Section title="12. Go-to-Market Strategy" icon={Target}>
        <ul className="list-disc pl-5">
          <li>Launch in Lagos → Nairobi → Accra</li>
          <li>Use influencers, referrals, and corporate deals</li>
          <li>Student ambassador programs</li>
        </ul>
        <p>
          Campaign Example: <strong>#RideSmartWithJustRide — your city, your ride</strong>
        </p>
      </Section>

      <Section title="13. Financial Projections" icon={DollarSign}>
        <table className="w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Metric</th>
              <th className="border p-2">Month 1</th>
              <th className="border p-2">Month 6</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border p-2">Registered Drivers</td>
              <td className="border p-2">500</td>
              <td className="border p-2">3,000</td>
            </tr>
            <tr>
              <td className="border p-2">Active Riders</td>
              <td className="border p-2">1,000</td>
              <td className="border p-2">10,000</td>
            </tr>
            <tr>
              <td className="border p-2">Revenue</td>
              <td className="border p-2">$5,000</td>
              <td className="border p-2">$50,000</td>
            </tr>
          </tbody>
        </table>
        <p>Break-even: Month 8–10</p>
      </Section>

      <Section title="14. Risk Assessment" icon={TriangleAlert}>
        <ul className="list-disc pl-5">
          <li>Low driver onboarding → Offer incentives</li>
          <li>User safety → In-app SOS + verification</li>
          <li>Regulatory shifts → Compliance partnerships</li>
          <li>Tech downtime → Cloud redundancy</li>
        </ul>
      </Section>

      <Section title="15. Roadmap" icon={Map}>
        <table className="w-full text-sm border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Phase</th>
              <th className="p-2 border">Timeline</th>
              <th className="p-2 border">Focus</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border p-2">MVP</td>
              <td className="border p-2">Month 1–2</td>
              <td className="border p-2">Core booking & payments</td>
            </tr>
            <tr>
              <td className="border p-2">Beta</td>
              <td className="border p-2">Month 3–4</td>
              <td className="border p-2">Feedback loop</td>
            </tr>
            <tr>
              <td className="border p-2">Launch</td>
              <td className="border p-2">Month 5–6</td>
              <td className="border p-2">Marketing & city rollout</td>
            </tr>
          </tbody>
        </table>
      </Section>

      <Section title="16. KPIs & Success Metrics" icon={LineChart}>
        <ul className="list-disc pl-5">
          <li>User Growth: +20% MoM</li>
          <li>Driver Retention: 70%</li>
          <li>Avg. Revenue per Ride: $3–$5</li>
          <li>App Rating: 4.5+</li>
          <li>Repeat Ride Ratio: 60% within 2 weeks</li>
        </ul>
      </Section>

      <Section title="17. Exit Strategy & Scalability" icon={Leaf}>
        <ul className="list-disc pl-5">
          <li>Expand across African cities</li>
          <li>Add corporate ride subscriptions</li>
          <li>Introduce bikes & EV scooters</li>
          <li>Potential acquisition by Uber/Bolt or IPO (5–7 years)</li>
        </ul>
      </Section>
        <div className="mt-8">
        <SprintPRD />
      </div>
    </div>
  );
}
