import React, { useRef } from "react";
import { TrendingUp, Activity, BarChart3, Database, AlertTriangle } from "lucide-react";


const Section = ({ title, icon: Icon, content, listItems, imageSrc, altText }) => (
  <div className="mb-8 space-y-4">
    <div className="flex items-center space-x-3">
      <Icon className="w-6 h-6 text-blue-600" />
      <h3 className="text-xl font-semibold text-blue-600">{title}</h3>
    </div>
    <p className="text-lg text-gray-700">{content}</p>
    {listItems && (
      <ul className="list-disc list-inside space-y-2 text-gray-700">
        {listItems.map((item, index) => (
          <li key={index} className="text-lg">
            {item}
          </li>
        ))}
      </ul>
    )}
    {imageSrc && (
      <img
        src={imageSrc}
        alt={altText}
        className="w-full rounded-md shadow-lg"
      />
    )}
  </div>
);

const MonitoringMetrics = () => {
  const contentRef = useRef();

 
  return (
    <div className="p-6 bg-gray-50" ref={contentRef}>
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">
        Monitoring & Metrics: An Overview for TPMs
      </h1>

      <Section
        title="What It Means"
        icon={Activity}
        content="Monitoring and metrics help you understand how your product is performing in real-time. They provide insights into the health, usage, and success of the product or system, ensuring you can quickly identify and fix issues."
      />

      <Section
        title="Key Performance Indicators (KPIs)"
        icon={TrendingUp}
        content="KPIs are measurable values that show how effectively your product or system is achieving specific goals."
        listItems={["Active Users: Number of users watching videos daily.", "Buffering Rate: Percentage of videos interrupted by buffering.", "Average Watch Time: How long users stay on the app."]}
      />

      <Section
        title="System Monitoring Tools"
        icon={BarChart3}
        content="Monitoring tools provide detailed metrics about your product’s performance and infrastructure, ensuring everything runs smoothly. Popular tools include Prometheus, Grafana, and Datadog."
      />

      <Section
        title="Illustrative Example"
        icon={Database}
        content="You manage a food delivery app. A new promotion causes a sudden spike in orders, but some customers report delays. Monitoring tools like Prometheus, Grafana, and Datadog help you identify bottlenecks and resolve them."
      />

      <Section
        title="Why Monitoring & Metrics Are Crucial for TPMs"
        icon={AlertTriangle}
        content="Monitoring tools can alert you to performance issues before users are affected. By tracking KPIs, you ensure your product meets user expectations and make data-driven decisions."
        listItems={["Early Problem Detection: Spot performance issues early.", "Improved User Experience: Maintain fast load times and minimal crashes.", "Data-Driven Decisions: Justify investments like infrastructure upgrades.", "Stakeholder Communication: Explain product health and trade-offs clearly."]}
      />

      
    </div>
  );
};

export default MonitoringMetrics;
