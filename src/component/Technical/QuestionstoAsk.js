import { useState } from 'react';
import {  FaServer, FaNetworkWired, FaShieldAlt, FaRocket, FaCogs, FaCode, FaDatabase, FaBars, FaTimes, FaLightbulb } from 'react-icons/fa';

const dashboardItems = [
  {
    key: 'virtual-machines',
    title: 'Virtual Machines (VMs)',
    icon: <FaServer className="mr-2 w-5 h-5" />,
    content: (
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Virtual Machines (VMs)</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Key Questions</h3>
            <ul className="list-disc pl-5 text-gray-600">
              <li><strong>What kind of VM are we using? (CPU, RAM, OS)</strong></li>
              <li><strong>Is it over/under-provisioned for our current usage?</strong></li>
              <li><strong>Can we switch to a more cost-efficient type (e.g., spot instances, autoscaling)?</strong></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Explanations</h3>
            <ul className="list-disc pl-5 text-gray-600">
              <li><strong>VM Specs (CPU, RAM, OS):</strong> Understanding the VM’s resources helps PMs estimate costs and performance needs. CPU affects processing speed (e.g., for AI tasks), RAM handles data volume (e.g., caching), and OS ensures software compatibility (e.g., Linux for Node.js).</li>
              <li><strong>Provisioning:</strong> Over-provisioning wastes money (e.g., paying for unused RAM), while under-provisioning causes crashes or slowdowns (e.g., insufficient CPU during peak traffic).</li>
              <li><strong>Cost Efficiency:</strong> Different VM types (e.g., spot instances, serverless) offer cost savings for specific workloads, like testing or variable traffic.</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Answers for PMs</h3>
            <ul className="list-disc pl-5 text-gray-600">
              <li><strong>VM Specs:</strong> Ask your DevOps team for a report on current VM configurations (e.g., “We’re using AWS t3.medium with 2 CPU cores, 4GB RAM, Ubuntu 20.04”). Ensure specs match your app’s needs (e.g., GPU VMs for video processing).</li>
              <li><strong>Provisioning:</strong> Review usage metrics (e.g., via AWS CloudWatch) to check if CPU/RAM is consistently under 70% (over-provisioned) or above 90% (under-provisioned). Work with engineers to adjust sizes.</li>
              <li><strong>Cost Efficiency:</strong> Discuss with DevOps if spot instances can be used for non-critical tasks (e.g., testing) or if autoscaling can handle traffic spikes to reduce costs.</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Use When</h3>
            <ul className="list-disc pl-5 text-gray-600">
              <li>Your app or API needs dedicated compute resources.</li>
              <li>You need to run custom software or OS environments.</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Example</h3>
            <p className="text-gray-600">For a video streaming app, you might need a GPU-enabled VM (e.g., AWS g4dn) with 8 cores and 32GB RAM to handle transcoding, but switch to spot instances for dev testing to save costs.</p>
          </div>
        </div>
      </div>
    )
  },
  {
    key: 'networking',
    title: 'Networking',
    icon: <FaNetworkWired className="mr-2 w-5 h-5" />,
    content: (
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Networking</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Key Questions</h3>
            <ul className="list-disc pl-5 text-gray-600">
              <li><strong>Is our app using a Virtual Private Cloud (VPC)? Are environments (dev, staging, prod) separated?</strong></li>
              <li><strong>Are we routing traffic efficiently across regions or zones?</strong></li>
              <li><strong>Is latency affecting user experience in certain regions?</strong></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Explanations</h3>
            <ul className="list-disc pl-5 text-gray-600">
              <li><strong>VPC and Separation:</strong> A VPC isolates your app’s resources for security and organization. Separating environments prevents dev/staging changes from affecting prod.</li>
              <li><strong>Traffic Routing:</strong> Efficient routing reduces latency and costs, especially for global apps with users in multiple regions.</li>
              <li><strong>Latency:</strong> High latency can frustrate users (e.g., slow page loads in Asia if servers are in the US).</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Answers for PMs</h3>
            <ul className="list-disc pl-5 text-gray-600">
              <li><strong>VPC and Separation:</strong> Confirm with DevOps that each environment (dev, staging, prod) has its own VPC or subnets (e.g., “We use separate VPCs for prod and non-prod”). This ensures isolation and compliance.</li>
              <li><strong>Traffic Routing:</strong> Check if you’re using a Content Delivery Network (CDN) like Cloudflare or AWS Route 53 to route traffic to the nearest region. Ask, “Are we using multi-region availability zones?”</li>
              <li><strong>Latency:</strong> Review user feedback or analytics (e.g., New Relic) for latency issues. If present, discuss adding servers in affected regions or optimizing API calls.</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Use When</h3>
            <ul className="list-disc pl-5 text-gray-600">
              <li>You're serving users globally.</li>
              <li>Your app has internal microservices communicating over a private network.</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Example</h3>
            <p className="text-gray-600">For a global e-commerce app, use a VPC to isolate prod data and a CDN to serve images from servers closer to users in Europe, reducing latency.</p>
          </div>
        </div>
      </div>
    )
  },
  {
    key: 'firewalls',
    title: 'Firewalls / Security Groups',
    icon: <FaShieldAlt className="mr-2 w-5 h-5" />,
    content: (
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Firewalls / Security Groups</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Key Questions</h3>
            <ul className="list-disc pl-5 text-gray-600">
              <li><strong>What firewall rules are in place?</strong></li>
              <li><strong>Are only required ports open (e.g., HTTP 80, HTTPS 443)?</strong></li>
              <li><strong>Is our database or backend exposed to the public when it shouldn’t be?</strong></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Explanations</h3>
            <ul className="list-disc pl-5 text-gray-600">
              <li><strong>Firewall Rules:</strong> Rules define what traffic is allowed (e.g., specific IPs, ports). Incorrect rules can block users or expose sensitive systems.</li>
              <li><strong>Port Access:</strong> Open ports (e.g., 80 for HTTP) allow traffic but increase attack risk if unnecessary ports are open (e.g., database ports).</li>
              <li><strong>Public Exposure:</strong> Databases or internal services should be private to prevent unauthorized access or data breaches.</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Answers for PMs</h3>
            <ul className="list-disc pl-5 text-gray-600">
              <li><strong>Firewall Rules:</strong> Request a list of security group rules from DevOps (e.g., “We allow inbound HTTP/HTTPS from all IPs”). Ensure they align with app needs.</li>
              <li><strong>Port Access:</strong> Verify only essential ports are open (e.g., “Port 80/443 for web, 5432 for PostgreSQL only within VPC”). Ask DevOps to close unused ports.</li>
              <li><strong>Public Exposure:</strong> Confirm with DevOps that databases are in private subnets (e.g., “Our RDS instance is not publicly accessible”). Use tools like AWS Trusted Advisor to check.</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Use When</h3>
            <ul className="list-disc pl-5 text-gray-600">
              <li>You handle sensitive data (auth, payments, health info).</li>
              <li>You want to reduce surface area for potential attacks.</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Example</h3>
            <p className="text-gray-600">For a payment processing app, ensure firewall rules allow only HTTPS (port 443) and block public access to the database, using private subnets for security.</p>
          </div>
        </div>
      </div>
    )
  },
  {
    key: 'custom-environments',
    title: 'Custom Environments (Dev/Staging/Prod)',
    icon: <FaCogs className="mr-2 w-5 h-5" />,
    content: (
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Custom Environments (Dev/Staging/Prod)</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Key Questions</h3>
            <ul className="list-disc pl-5 text-gray-600">
              <li><strong>Are dev and prod environments aligned (same software versions, OS)?</strong></li>
              <li><strong>Can QA environments easily simulate real production behavior?</strong></li>
              <li><strong>Is any third-party service hardcoded to a specific environment?</strong></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Explanations</h3>
            <ul className="list-disc pl-5 text-gray-600">
              <li><strong>Environment Alignment:</strong> Mismatched OS or software versions (e.g., Python 3.10 in dev, 3.8 in prod) can cause bugs that only appear in production.</li>
              <li><strong>QA Simulation:</strong> Staging must mimic prod’s setup (e.g., database size, user permissions) to catch real-world issues during testing.</li>
              <li><strong>Hardcoded Services:</strong> Hardcoding API keys or URLs (e.g., prod Stripe key in staging) risks affecting real users or data.</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Answers for PMs</h3>
            <ul className="list-disc pl-5 text-gray-600">
              <li><strong>Alignment:</strong> Ask DevOps for a checklist comparing dev/staging/prod (e.g., “Both use Ubuntu 20.04, Python 3.8”). Use infrastructure-as-code (e.g., Terraform) to enforce consistency.</li>
              <li><strong>QA Simulation:</strong> Ensure staging uses sanitized, realistic data (e.g., “Staging has 10,000 mock users to mimic prod load”). Test edge cases in staging.</li>
              <li><strong>Hardcoded Services:</strong> Verify environment variables are used (e.g., `.env` files for API keys). Ask, “Does staging use test credentials for Stripe?”</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Use When</h3>
            <ul className="list-disc pl-5 text-gray-600">
              <li>You're deploying new features.</li>
              <li>Testing bugs that only appear “in production.”</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Example</h3>
            <p className="text-gray-600">Before launching a new checkout feature, test it in a staging environment with the same Node.js version and database schema as prod, using test API keys.</p>
          </div>
        </div>
      </div>
    )
  },
  {
    key: 'autoscaling',
    title: 'Autoscaling',
    icon: <FaCode className="mr-2 w-5 h-5" />,
    content: (
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Autoscaling</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Key Questions</h3>
            <ul className="list-disc pl-5 text-gray-600">
              <li><strong>Do we use autoscaling for handling traffic spikes?</strong></li>
              <li><strong>What triggers autoscaling (CPU, memory, request volume)?</strong></li>
              <li><strong>Are we paying for idle servers during low usage?</strong></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Explanations</h3>
            <ul className="list-disc pl-5 text-gray-600">
              <li><strong>Autoscaling Usage:</strong> Autoscaling adds/removes servers dynamically to handle traffic, ensuring performance during peaks and cost savings during lows.</li>
              <li><strong>Triggers:</strong> Autoscaling relies on metrics like CPU usage or request volume to decide when to scale. Incorrect triggers can lead to over- or under-scaling.</li>
              <li><strong>Idle Servers:</strong> Running servers during low traffic wastes money, which autoscaling can prevent by scaling down.</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Answers for PMs</h3>
            <ul className="list-disc pl-5 text-gray-600">
              <li><strong>Autoscaling Usage:</strong> Confirm with DevOps if autoscaling is enabled (e.g., “We use AWS Auto Scaling for our web servers”). If not, evaluate if it’s needed for traffic spikes.</li>
              <li><strong>Triggers:</strong> Ask for scaling policies (e.g., “Scale up at 70% CPU, scale down at 30%”). Ensure triggers align with user patterns (e.g., request volume for e-commerce sales).</li>
              <li><strong>Idle Servers:</strong> Check cost reports (e.g., AWS Cost Explorer) for idle resources. If present, push for autoscaling or serverless options like AWS Lambda.</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Use When</h3>
            <ul className="list-disc pl-5 text-gray-600">
              <li>You expect uneven or high user traffic.</li>
              <li>You want to reduce costs without sacrificing performance.</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Example</h3>
            <p className="text-gray-600">For a social media app, enable autoscaling to add servers during viral campaigns (triggered by 80% CPU) and scale down at night to save costs.</p>
          </div>
        </div>
      </div>
    )
  },
  {
    key: 'load-balancers',
    title: 'Load Balancers',
    icon: <FaDatabase className="mr-2 w-5 h-5" />,
    content: (
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Load Balancers</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Key Questions</h3>
            <ul className="list-disc pl-5 text-gray-600">
              <li><strong>Do we use a load balancer between servers?</strong></li>
              <li><strong>How does it handle failed or slow servers?</strong></li>
              <li><strong>Are we using sticky sessions (same user hits same server)?</strong></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Explanations</h3>
            <ul className="list-disc pl-5 text-gray-600">
              <li><strong>Load Balancer Usage:</strong> Load balancers distribute traffic across multiple servers to improve performance and reliability.</li>
              <li><strong>Handling Failures:</strong> They reroute traffic from failed or slow servers to healthy ones to maintain uptime.</li>
              <li><strong>Sticky Sessions:</strong> Ensures a user stays on the same server for session consistency (e.g., for shopping carts), but may limit scalability.</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Answers for PMs</h3>
            <ul className="list-disc pl-5 text-gray-600">
              <li><strong>Load Balancer Usage:</strong> Verify with DevOps if a load balancer is in place (e.g., “We use AWS ELB for our app servers”). If not, assess if multiple instances need it for reliability.</li>
              <li><strong>Handling Failures:</strong> Ask about health checks (e.g., “ELB checks server health every 30 seconds and reroutes if a server fails”). Ensure failover is seamless.</li>
              <li><strong>Sticky Sessions:</strong> Confirm if sticky sessions are needed (e.g., “We use them for logged-in users”). If not, disable to improve load distribution.</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Use When</h3>
            <ul className="list-disc pl-5 text-gray-600">
              <li>Your app is deployed on multiple instances.</li>
              <li>You want high availability and resilience.</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Example</h3>
            <p className="text-gray-600">For a high-traffic news site, use an AWS Application Load Balancer to distribute traffic across three servers, with health checks to reroute from failed servers.</p>
          </div>
        </div>
      </div>
    )
  },
  {
    key: 'deployment-cicd',
    title: 'Deployment & CI/CD Pipelines',
    icon: <FaRocket className="mr-2 w-5 h-5" />,
    content: (
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Deployment & CI/CD Pipelines</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Key Questions</h3>
            <ul className="list-disc pl-5 text-gray-600">
              <li><strong>Do we have automated deployments or is it manual?</strong></li>
              <li><strong>How do we roll back a failed deployment?</strong></li>
              <li><strong>Are tests automated before deployment?</strong></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Explanations</h3>
            <ul className="list-disc pl-5 text-gray-600">
              <li><strong>Automated Deployments:</strong> Automation (e.g., CI/CD pipelines) speeds up releases and reduces errors compared to manual processes.</li>
              <li><strong>Rollback:</strong> A rollback plan ensures you can revert to a stable version if a deployment fails, minimizing downtime.</li>
              <li><strong>Automated Tests:</strong> Tests (unit, integration) catch bugs before deployment, ensuring quality.</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Answers for PMs</h3>
            <ul className="list-disc pl-5 text-gray-600">
              <li><strong>Automated Deployments:</strong> Ask DevOps if you use tools like Jenkins or GitHub Actions (e.g., “We deploy via GitHub Actions on code push”). Push for automation if manual.</li>
              <li><strong>Rollback:</strong> Confirm the rollback process (e.g., “We use blue-green deployment to switch back to the previous version”). Test rollback in staging.</li>
              <li><strong>Automated Tests:</strong> Verify that tests run automatically (e.g., “Unit tests run in CI before deployment”). Ensure test coverage includes critical features.</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Use When</h3>
            <ul className="list-disc pl-5 text-gray-600">
              <li>You want frequent, reliable releases.</li>
              <li>You want to reduce human errors in deployment.</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Example</h3>
            <p className="text-gray-600">For a SaaS app, use a CI/CD pipeline with GitLab to automate deployments, run unit tests, and enable one-click rollback if a new feature fails.</p>
          </div>
        </div>
      </div>
    )
  },
  {
    key: 'pm-pro-tips',
    title: 'Bonus: PM-Pro Tips',
    icon: <FaLightbulb className="mr-2 w-5 h-5" />,
    content: (
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Bonus: PM-Pro Tips</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Tips for Common Situations</h3>
            <table className="w-full text-sm text-left text-gray-600 bg-white rounded-lg shadow-md">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 py-2 font-medium">Situation</th>
                  <th className="px-4 py-2 font-medium">Ask This…</th>
                  <th className="px-4 py-2 font-medium">Explanation</th>
                  <th className="px-4 py-2 font-medium">Answer for PMs</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="px-4 py-2">Launching new feature</td>
                  <td className="px-4 py-2">Have we tested this in a prod-like environment?</td>
                  <td className="px-4 py-2">Ensures the feature works under real-world conditions (e.g., same OS, data scale).</td>
                  <td className="px-4 py-2">Confirm staging mirrors prod (e.g., “Staging uses the same database schema”). Test with realistic data before launch.</td>
                </tr>
                <tr className="border-t">
                  <td className="px-4 py-2">Handling sensitive data</td>
                  <td className="px-4 py-2">What firewall and encryption protections are in place?</td>
                  <td className="px-4 py-2">Protects user data from breaches and ensures compliance (e.g., GDPR, HIPAA).</td>
                  <td className="px-4 py-2">Verify firewalls block unauthorized access and data is encrypted (e.g., “We use AES-256 encryption and private subnets”).</td>
                </tr>
                <tr className="border-t">
                  <td className="px-4 py-2">Scaling to new regions</td>
                  <td className="px-4 py-2">Do we have availability zones in that region?</td>
                  <td className="px-4 py-2">Ensures low latency and high availability for users in new regions.</td>
                  <td className="px-4 py-2">Ask DevOps to deploy servers in the new region (e.g., “We added an availability zone in Asia”). Use a CDN for static content.</td>
                </tr>
                <tr className="border-t">
                  <td className="px-4 py-2">Reviewing costs</td>
                  <td className="px-4 py-2">Can we optimize instance size, storage, or bandwidth?</td>
                  <td className="px-4 py-2">Reduces cloud costs without impacting performance.</td>
                  <td className="px-4 py-2">Analyze cost reports (e.g., AWS Cost Explorer) and discuss downsizing over-provisioned VMs or using spot instances.</td>
                </tr>
                <tr className="border-t">
                  <td className="px-4 py-2">Dealing with a critical bug</td>
                  <td className="px-4 py-2">Is this reproducible in staging? Are logs centralized?</td>
                  <td className="px-4 py-2">Helps identify and fix bugs quickly by replicating in staging and reviewing logs.</td>
                  <td className="px-4 py-2">Reproduce the bug in staging (e.g., “We replicated it with prod-like data”). Use centralized logging (e.g., ELK Stack) to trace issues.</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Example</h3>
            <p className="text-gray-600">When launching a new payment feature, ask, “Is this tested in a prod-like staging environment with real-scale data?” and confirm encryption and firewall rules are in place to protect user data.</p>
          </div>
        </div>
      </div>
    )
  }
];

const CloudCheatSheetDashboard = () => {
  const [activeComponent, setActiveComponent] = useState('virtual-machines');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleNavClick = (key) => {
    setActiveComponent(key);
    if (isSidebarOpen) {
      setIsSidebarOpen(false); // Close sidebar on mobile after selecting an item
    }
  };

  const renderComponent = () => {
    const selectedItem = dashboardItems.find((item) => item.key === activeComponent);
    if (!selectedItem) return dashboardItems[0].content;
    return (
      <div>
        <div className="flex items-center mb-4">
          {selectedItem.icon}
          <h2 className="ml-2 text-2xl font-bold text-gray-900">{selectedItem.title}</h2>
        </div>
        {selectedItem.content}
      </div>
    );
  };

  return (
    <div className="min-h-screen flex relative">
      {/* Sidebar Navigation */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-blue-600 text-white p-6 transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } sm:static sm:translate-x-0 sm:flex-shrink-0`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Cloud Cheat Sheet</h2>
          <button className="sm:hidden text-white" onClick={toggleSidebar}>
            <FaTimes className="w-6 h-6" />
          </button>
        </div>
        <ul className="space-y-4">
          {dashboardItems.map((item) => (
            <li key={item.key}>
              <button
                onClick={() => handleNavClick(item.key)}
                className={`flex items-center w-full px-4 py-3 rounded transition-colors duration-200 ${
                  activeComponent === item.key ? 'bg-blue-800' : 'hover:bg-blue-700'
                }`}
              >
                {item.icon}
                {item.title}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* Backdrop for mobile when sidebar is open */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 sm:hidden"
          onClick={closeSidebar}
        ></div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-8 bg-gray-50 overflow-auto">
        <div className="flex justify-between items-center mb-4 sm:mb-0">
          <h1 className="text-xl font-semibold text-gray-900 sm:hidden">Cloud Cheat Sheet</h1>
          <button className="sm:hidden text-gray-900" onClick={toggleSidebar}>
            <FaBars className="w-6 h-6" />
          </button>
        </div>
        <div className="bg-white rounded-lg shadow p-4 sm:p-6">
          {renderComponent()}
        </div>
      </main>
    </div>
  );
};

export default CloudCheatSheetDashboard;