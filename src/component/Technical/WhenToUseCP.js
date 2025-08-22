import { FaCloud, FaServer, FaDatabase, FaFire, FaGlobe, FaMicrochip, FaBuilding, FaCode, FaRocket, FaLock, FaCogs } from 'react-icons/fa';

const whenToUse = [
  {
    title: 'Full Control Over Infrastructure',
    description: 'You need to configure virtual machines, networks, firewalls, or custom environments.',
    useCases: [
      'Hosting your own databases or backend systems',
      'Custom server setups (e.g., using NGINX, Docker, or specialized compute)'
    ],
    example: 'A fintech app requiring a specific OS and strict network segmentation for compliance.',
    platforms: 'AWS, Azure, GCP',
    icon: <FaServer className="w-8 h-8 text-blue-500" />
  },
  {
    title: 'Need to Scale Rapidly',
    description: 'Top cloud providers offer global availability zones, autoscaling, and load balancers.',
    useCases: [
      'High-traffic apps',
      'Global user bases',
      'Seasonal or sudden traffic spikes'
    ],
    example: 'An e-commerce site running big campaigns (e.g., Black Friday) needs to scale instantly.',
    platforms: 'AWS, Azure, GCP',
    icon: <FaRocket className="w-8 h-8 text-green-500" />
  },
  {
    title: 'Advanced Services',
    description: 'AI/ML, big data processing, video/image analysis, or DevOps automation.',
    useCases: [
      'AI/ML (e.g., AWS SageMaker, Google Vertex AI)',
      'Big Data processing (e.g., GCP BigQuery, AWS Redshift)',
      'Video/image analysis',
      'DevOps automation (CI/CD, Infrastructure-as-Code)'
    ],
    example: 'A healthcare AI company processing thousands of medical images using machine learning.',
    platforms: 'GCP (AI), AWS (general)',
    icon: <FaMicrochip className="w-8 h-8 text-purple-500" />
  },
  {
    title: 'Enterprise or Compliance-Ready Infrastructure',
    description: 'SOC 2, ISO, GDPR, HIPAA, PCI compliance, IAM, audit logs, and data residency options.',
    useCases: [
      'Secure infrastructure for regulated industries',
      'Identity & Access Management (IAM)',
      'Audit logs and compliance certifications'
    ],
    example: 'A government platform or bank needing secure and certified infrastructure.',
    platforms: 'AWS, Azure',
    icon: <FaLock className="w-8 h-8 text-red-500" />
  },
  {
    title: 'Flexibility with Tools & Integrations',
    description: 'Integrates with DevOps tools, monitoring platforms, data lakes, IoT devices, etc.',
    useCases: [
      'Combining cloud storage, AI models, and global CDN',
      'Supporting diverse tech stacks and third-party tools'
    ],
    example: 'A media streaming startup combining cloud storage, custom AI models, and global CDN delivery.',
    platforms: 'AWS, Azure, GCP',
    icon: <FaCogs className="w-8 h-8 text-blue-600" />
  }
];

const whenNotToUse = {
  title: 'When You Might NOT Need AWS/GCP/Azure',
  description: 'For MVPs or small apps with minimal infrastructure needs, simpler platforms may be better.',
  scenarios: [
    'Building an MVP or small app',
    'Avoiding infrastructure or DevOps management',
    'Preferring simplicity, speed, and lower operational overhead'
  ],
  alternatives: [
    'Netlify, Vercel (for frontend)',
    'Supabase, Firebase (for backend)',
    'Render, Railway (for full-stack apps)'
  ],
  icon: <FaCode className="w-8 h-8 text-gray-500" />
};

const summaryTable = [
  { useCase: 'Full control over servers & infra', platforms: 'AWS, Azure, GCP' },
  { useCase: 'Need to scale globally', platforms: 'AWS, Azure, GCP' },
  { useCase: 'Compliance-heavy environment', platforms: 'AWS, Azure' },
  { useCase: 'Big data / ML / video processing', platforms: 'GCP (AI), AWS (general)' },
  { useCase: 'Enterprise app integration', platforms: 'Azure (MS tools), AWS' },
  { useCase: 'MVP or simple SaaS app', platforms: 'Firebase, Supabase, Render' },
  { useCase: 'Static frontend or Jamstack site', platforms: 'Netlify, Vercel' },
  { useCase: 'No DevOps team or infra experience', platforms: 'Supabase, Firebase, Render' }
];

const classifications = [
  {
    name: 'IaaS (Infrastructure-as-a-Service)',
    description: 'Low-level cloud services like virtual machines, networking, and storage.',
    example: 'AWS EC2, Azure VMs',
    icon: <FaServer className="w-6 h-6 text-blue-500" />
  },
  {
    name: 'PaaS (Platform-as-a-Service)',
    description: 'Abstracts infrastructure, offering tools to deploy and manage apps without managing servers.',
    example: 'Render, Heroku',
    icon: <FaCloud className="w-6 h-6 text-green-500" />
  },
  {
    name: 'BaaS (Backend-as-a-Service)',
    description: 'Ready-to-use backend features like auth, databases, storage, and APIs.',
    example: 'Firebase, Supabase',
    icon: <FaDatabase className="w-6 h-6 text-purple-500" />
  },
  {
    name: 'SaaS (Software-as-a-Service)',
    description: 'Fully built software apps delivered over the internet.',
    example: 'Google Docs, Slack',
    icon: <FaGlobe className="w-6 h-6 text-blue-600" />
  }
];

const tools = [
  {
    name: 'Netlify',
    type: 'PaaS',
    focus: 'Frontend-focused deployment (especially for Jamstack apps)',
    features: ['Git-based deployment', 'Serverless functions', 'Static site hosting', 'Built-in CDN'],
    bestFor: 'Static sites, frontend apps, JAMstack projects',
    icon: <FaRocket className="w-6 h-6 text-teal-500" />
  },
  {
    name: 'Render',
    type: 'PaaS',
    focus: 'Full-stack deployments (frontend + backend)',
    features: ['Simple deploy of web services and static sites', 'Background workers, cron jobs', 'Managed PostgreSQL', 'HTTPS, autoscaling'],
    bestFor: 'Full-stack apps without managing infrastructure',
    icon: <FaCogs className="w-6 h-6 text-blue-500" />
  },
  {
    name: 'Supabase',
    type: 'BaaS',
    focus: 'Open-source Firebase alternative built on PostgreSQL',
    features: ['Realtime database (PostgreSQL)', 'Auth & user management', 'Edge functions (serverless)', 'Storage (for files, images)', 'REST & GraphQL APIs'],
    bestFor: 'Projects needing a robust backend quickly with full data control',
    icon: <FaDatabase className="w-6 h-6 text-green-600" />
  },
  {
    name: 'Firebase',
    type: 'BaaS',
    focus: 'Realtime, mobile-first apps and rapid prototyping',
    features: ['Realtime NoSQL database (Firestore)', 'Authentication', 'Cloud functions (serverless)', 'Hosting', 'Push notifications'],
    bestFor: 'Mobile apps, MVPs, and realtime features',
    icon: <FaFire className="w-6 h-6 text-orange-500" />
  }
];

const comparisonTable = [
  { platform: 'Netlify', type: 'PaaS', bestUseCase: 'Static sites, JAMstack apps', techStack: 'Frontend/JavaScript' },
  { platform: 'Render', type: 'PaaS', bestUseCase: 'Full-stack deployments', techStack: 'Node, Python, etc.' },
  { platform: 'Supabase', type: 'BaaS', bestUseCase: 'Postgres-powered apps with auth, APIs', techStack: 'JS/TS, SQL, open source' },
  { platform: 'Firebase', type: 'BaaS', bestUseCase: 'Mobile-first apps with realtime data', techStack: 'JavaScript, Flutter' }
];

const WhenToUseCloudPlatforms = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-6">
          When to Use Top Cloud Platforms
        </h1>
        <p className="text-lg text-gray-700 mb-8 text-center">
          As a Product Manager, understanding when to use cloud platforms like AWS, Azure, or GCP versus simpler tools like Netlify or Firebase helps you make strategic decisions about scalability, cost, and development speed.
        </p>

        {/* When to Use Section */}
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">When to Use AWS, Azure, or GCP</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
          {whenToUse.map((item, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center mb-4">
                {item.icon}
                <h3 className="text-xl font-semibold text-gray-900 ml-3">{item.title}</h3>
              </div>
              <p className="text-sm text-gray-600 mb-2">{item.description}</p>
              <h4 className="text-md font-medium text-gray-800">Use Cases:</h4>
              <ul className="list-disc pl-5 text-sm text-gray-600 mb-2">
                {item.useCases.map((useCase, i) => (
                  <li key={i}>{useCase}</li>
                ))}
              </ul>
              <p className="text-sm text-gray-600 mb-2"><strong>Example:</strong> {item.example}</p>
              <p className="text-sm text-gray-600"><strong>Platforms:</strong> {item.platforms}</p>
            </div>
          ))}
        </div>

        {/* When Not to Use Section */}
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">When You Might NOT Need AWS/GCP/Azure</h2>
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center mb-4">
            {whenNotToUse.icon}
            <h3 className="text-xl font-semibold text-gray-900 ml-3">{whenNotToUse.title}</h3>
          </div>
          <p className="text-sm text-gray-600 mb-2">{whenNotToUse.description}</p>
          <h4 className="text-md font-medium text-gray-800">Scenarios:</h4>
          <ul className="list-disc pl-5 text-sm text-gray-600 mb-2">
            {whenNotToUse.scenarios.map((scenario, i) => (
              <li key={i}>{scenario}</li>
            ))}
          </ul>
          <h4 className="text-md font-medium text-gray-800">Alternatives:</h4>
          <ul className="list-disc pl-5 text-sm text-gray-600">
            {whenNotToUse.alternatives.map((alt, i) => (
              <li key={i}>{alt}</li>
            ))}
          </ul>
        </div>

        {/* Summary Table */}
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Summary Table</h2>
        <div className="overflow-x-auto mb-8">
          <table className="w-full text-sm text-left text-gray-600 bg-white rounded-lg shadow-md">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 font-medium">Use Case</th>
                <th className="px-4 py-2 font-medium">Go With...</th>
              </tr>
            </thead>
            <tbody>
              {summaryTable.map((row, index) => (
                <tr key={index} className="border-t">
                  <td className="px-4 py-2">{row.useCase}</td>
                  <td className="px-4 py-2">{row.platforms}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Cloud Platform Classifications */}
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Cloud Platform Classifications</h2>
        <div className="grid gap-6 md:grid-cols-2 mb-8">
          {classifications.map((classification, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                {classification.icon}
                <h3 className="text-xl font-semibold text-gray-900 ml-3">{classification.name}</h3>
              </div>
              <p className="text-sm text-gray-600 mb-2">{classification.description}</p>
              <p className="text-sm text-gray-600"><strong>Example:</strong> {classification.example}</p>
            </div>
          ))}
        </div>

        {/* Tool Classifications */}
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Classification of Each Tool</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
          {tools.map((tool, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center mb-4">
                {tool.icon}
                <h3 className="text-xl font-semibold text-gray-900 ml-3">{tool.name}</h3>
              </div>
              <p className="text-sm text-gray-600 mb-2"><strong>Type:</strong> {tool.type}</p>
              <p className="text-sm text-gray-600 mb-2"><strong>Focus:</strong> {tool.focus}</p>
              <h4 className="text-md font-medium text-gray-800">Key Features:</h4>
              <ul className="list-disc pl-5 text-sm text-gray-600 mb-2">
                {tool.features.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
              <p className="text-sm text-gray-600"><strong>Best For:</strong> {tool.bestFor}</p>
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Quick Comparison Table</h2>
        <div className="overflow-x-auto mb-8">
          <table className="w-full text-sm text-left text-gray-600 bg-white rounded-lg shadow-md">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 font-medium">Platform</th>
                <th className="px-4 py-2 font-medium">Type</th>
                <th className="px-4 py-2 font-medium">Best Use Case</th>
                <th className="px-4 py-2 font-medium">Tech Stack Focus</th>
              </tr>
            </thead>
            <tbody>
              {comparisonTable.map((row, index) => (
                <tr key={index} className="border-t">
                  <td className="px-4 py-2">{row.platform}</td>
                  <td className="px-4 py-2">{row.type}</td>
                  <td className="px-4 py-2">{row.bestUseCase}</td>
                  <td className="px-4 py-2">{row.techStack}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Final Guidance */}
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Final Guidance for PMs</h2>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <FaBuilding className="w-8 h-8 text-blue-700" />
            <h3 className="text-xl font-semibold text-gray-900 ml-3">Why PMs Should Care</h3>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Choosing the right cloud platform impacts your product’s scalability, cost, and development speed. As a PM, understanding these options helps you:
          </p>
          <ul className="list-disc pl-5 text-sm text-gray-600 mb-4">
            <li>Align infrastructure with business goals (e.g., AWS/GCP for scalability, Firebase for MVPs).</li>
            <li>Balance cost and performance by selecting the right tools (e.g., Netlify for static sites).</li>
            <li>Ensure compliance and security for regulated industries (e.g., AWS/Azure for HIPAA).</li>
            <li>Enable faster time-to-market with PaaS/BaaS for rapid prototyping.</li>
            <li>Collaborate with engineering teams to make informed infrastructure decisions.</li>
          </ul>
          <p className="text-sm text-gray-600">
            <strong>Use AWS, Azure, or GCP</strong> for complex, scalable, or regulated systems requiring power and flexibility. <br />
            <strong>Use Netlify, Render, Supabase, or Firebase</strong> for quick launches, MVPs, or when you want to focus on the product, not infrastructure.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WhenToUseCloudPlatforms;