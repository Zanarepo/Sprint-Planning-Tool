import { FaCloud, FaServer, FaDatabase, FaGlobe, FaMicrochip, FaBuilding } from 'react-icons/fa';


const platforms = [
  {
    name: 'Amazon Web Services (AWS)',
    marketShare: '~30–32%',
    whyPopular: [
      'First major cloud platform (launched in 2006).',
      'Offers 200+ services, most comprehensive range.',
      'Trusted by enterprises, startups, government, and education.'
    ],
    useCases: 'Web hosting, big data, AI/ML, serverless apps, e-commerce platforms.',
    services: 'EC2, S3, Lambda, RDS, DynamoDB, SageMaker',
    icon: <FaCloud className="w-10 h-10 text-blue-500" />
  },
  {
    name: 'Microsoft Azure',
    marketShare: '~23–25%',
    whyPopular: [
      'Deep integration with Microsoft tools (e.g., Windows Server, Office 365).',
      'Strong in hybrid cloud and enterprise sectors.',
      'Ideal for government and legacy systems.'
    ],
    useCases: 'Enterprise apps, cloud-hosted VMs, legacy-to-cloud migration, .NET apps.',
    services: 'Azure Virtual Machines, Azure Functions, Azure SQL Database, Azure DevOps, Power BI',
    icon: <FaServer className="w-10 h-10 text-blue-600" />
  },
  {
    name: 'Google Cloud Platform (GCP)',
    marketShare: '~10–12%',
    whyPopular: [
      'Leader in AI/ML, data analytics, and Kubernetes.',
      'Popular with developers and cloud-native startups.',
      'Strong for data scientists.'
    ],
    useCases: 'Machine learning, analytics, scalable web apps, container orchestration.',
    services: 'Compute Engine, BigQuery, Vertex AI, Cloud Run, GKE',
    icon: <FaMicrochip className="w-10 h-10 text-green-500" />
  },
  {
    name: 'Alibaba Cloud (Aliyun)',
    marketShare: '~4–6% globally, #1 in China/Asia',
    whyPopular: [
      'Dominant in China and Southeast Asia.',
      'Backed by Alibaba Group, handles large-scale commerce.',
      'Strong in mobile traffic and AI analytics.'
    ],
    useCases: 'eCommerce infrastructure, AI-powered analytics, regional enterprise cloud.',
    services: 'ECS, MaxCompute, Object Storage Service (OSS)',
    icon: <FaGlobe className="w-10 h-10 text-red-500" />
  },
  {
    name: 'IBM Cloud',
    marketShare: '<3%',
    whyPopular: [
      'Strong in legacy systems and hybrid cloud.',
      'Appeals to banks, insurance, and regulated industries.',
      'AI capabilities via Watson.'
    ],
    useCases: 'Hybrid cloud setups, AI insights, on-premise + cloud integration.',
    services: 'IBM Watson, Cloud Pak, Red Hat OpenShift',
    icon: <FaBuilding className="w-10 h-10 text-blue-700" />
  },
  {
    name: 'Oracle Cloud Infrastructure (OCI)',
    marketShare: '~2–3%',
    whyPopular: [
      'Focused on databases and enterprise apps.',
      'Favored by existing Oracle software customers.',
      'Strong in ERP/CRM hosting.'
    ],
    useCases: 'Oracle databases, ERP systems (e.g., Oracle Fusion), hybrid cloud.',
    services: 'Autonomous Database, OCI Compute, Oracle Analytics Cloud',
    icon: <FaDatabase className="w-10 h-10 text-orange-500" />
  },
  {
    name: 'Other Niche/Regional Players',
    marketShare: 'Varies',
    whyPopular: [
      'Tencent Cloud: China-focused, gaming and social media apps.',
      'DigitalOcean: Simple UI, affordable for startups and developers.',
      'Linode (Akamai): Cost-effective VPS for SMBs.',
      'OVHcloud: Europe-focused, GDPR-compliant.',
      'Hetzner Cloud: Affordable European hosting.'
    ],
    useCases: 'Region-specific apps, cost-effective hosting, compliance-driven solutions.',
    services: 'Varies by provider',
    icon: <FaGlobe className="w-10 h-10 text-gray-500" />
  }
];

const CloudPlatforms = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-6">
          Understanding Cloud Platforms for Product Managers
        </h1>
        <p className="text-lg text-gray-700 mb-8 text-center">
          As a Product Manager, knowing cloud platforms helps you make informed decisions about infrastructure, scalability, and costs. These platforms power modern apps, and understanding them ensures you align technical capabilities with business goals.
        </p>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {platforms.map((platform, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center mb-4">
                {platform.icon}
                <h2 className="text-xl font-semibold text-gray-900 ml-3">{platform.name}</h2>
              </div>
              <p className="text-sm text-gray-600 mb-2"><strong>Market Share:</strong> {platform.marketShare}</p>
              <div className="mb-4">
                <h3 className="text-md font-medium text-gray-800">Why It’s Popular:</h3>
                <ul className="list-disc pl-5 text-sm text-gray-600">
                  {platform.whyPopular.map((reason, i) => (
                    <li key={i}>{reason}</li>
                  ))}
                </ul>
              </div>
              <p className="text-sm text-gray-600 mb-2"><strong>Common Use Cases:</strong> {platform.useCases}</p>
              <p className="text-sm text-gray-600"><strong>Popular Services:</strong> {platform.services}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Why PMs Should Care</h3>
          <p className="text-gray-700 text-sm max-w-2xl mx-auto">
            Cloud platforms impact your product’s scalability, performance, and cost. By understanding their strengths, you can:
            <ul className="list-disc pl-5 text-left mt-2">
              <li>Choose the right platform for your product’s needs (e.g., AWS for startups, Azure for enterprises).</li>
              <li>Optimize costs by selecting cost-effective services (e.g., serverless with Lambda or Cloud Run).</li>
              <li>Ensure compliance for regulated industries (e.g., IBM Cloud for banking).</li>
              <li>Plan for scalability and reliability to meet user demand.</li>
              <li>Collaborate effectively with engineering teams on infrastructure decisions.</li>
            </ul>
          </p>
        </div>
      </div>
      
    </div>
  );
};

export default CloudPlatforms;