import { useState, useEffect } from 'react';
import {
  FaCloud,
  FaServer,
  FaNetworkWired,
  FaShieldAlt,
  FaRocket,
  FaCogs,
  FaCode,
  FaDatabase
} from 'react-icons/fa';
import { toast } from 'react-toastify';
import CloudPlatforms from './CloudPlatforms';
import KeyInfrastructure from './KeyInfrastructure';
import VMs from './VMs';
import Networking from './Networking';
import Firewalls from './Firewalls';
import Deployment from './Deployment';
import Autoscaling from './Autoscaling';
import DevStagProd from './DevStagProd';
import WhenToUseCP from './WhenToUseCP';
import QuestionstoAsk from './QuestionstoAsk';

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('cloud-platforms');

  useEffect(() => {
    toast.info('Welcome to the Cloud Dashboard! Click a section to explore.');
  }, []);

  const dashboardItems = [
    {
      icon: <FaCloud className="text-4xl text-blue-600" />,
      title: 'Cloud Platforms',
      description: 'Explore AWS, Azure, GCP and other popular platforms.',
      sectionName: 'cloud-platforms',
      component: <CloudPlatforms />
    },


    
 {
      icon: <FaCloud className="text-4xl text-indigo-600" />,
      title: 'When to Use Cloud Platforms',
      description: 'Understand when to use cloud platforms vs. custom environments.',
      sectionName: 'cp',
      component: <WhenToUseCP />
    },


    {
      icon: <FaCogs className="text-4xl text-indigo-600" />,
      title: 'Key Infrastructure',
      description: 'Understand compute, storage, and orchestration layers.',
      sectionName: 'key-infrastructure',
      component: <KeyInfrastructure />
    },


    
    {
      icon: <FaServer className="text-4xl text-green-600" />,
      title: 'Virtual Machines (VMs)',
      description: 'Learn about virtual machines and instance configuration.',
      sectionName: 'vms',
      component: <VMs />
    },
    {
      icon: <FaNetworkWired className="text-4xl text-purple-600" />,
      title: 'Networking',
      description: 'Explore VPCs, IPs, subnets, and routing basics.',
      sectionName: 'networking',
      component: <Networking />
    },
    {
      icon: <FaShieldAlt className="text-4xl text-red-600" />,
      title: 'Firewalls',
      description: 'Understand network security rules and firewall configurations.',
      sectionName: 'firewalls',
      component: <Firewalls />
    },
    {
      icon: <FaRocket className="text-4xl text-orange-500" />,
      title: 'Deployment',
      description: 'Overview of CI/CD and deployment strategies.',
      sectionName: 'deployment',
      component: <Deployment />
    },
    {
      icon: <FaCode className="text-4xl text-teal-600" />,
      title: 'Autoscaling',
      description: 'Dive into autoscaling rules, triggers, and efficiency.',
      sectionName: 'autoscaling',
      component: <Autoscaling />
    },
    {
      icon: <FaDatabase className="text-4xl text-yellow-600" />,
      title: 'Dev, Staging, Prod',
      description: 'Understand multi-environment cloud setups.',
      sectionName: 'dev-stag-prod',
      component: <DevStagProd />
    },
{
      icon: <FaDatabase className="text-4xl text-yellow-600" />,
      title: 'Asking the Right Question',
      description: 'Ask the right Questions about your product infrastructure.',
      sectionName: 'questions-to-ask',
      component: <QuestionstoAsk />
    }

    
  ];

  const toggleSection = (sectionName) => {
    setActiveSection(sectionName);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold bg-blue-100 items-center mb-4 text-center">
        Masterclass: Cloud Infrastructure Concepts
      </h1>

      {/* Toggle Buttons */}
      <div className="mb-6 flex flex-wrap gap-4 justify-center">
        {dashboardItems.map((item, index) => (
          <button
            key={index}
            onClick={() => toggleSection(item.sectionName)}
            className={`px-6 py-2 rounded-full transition-colors duration-200 shadow text-sm font-medium ${
              activeSection === item.sectionName ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800'
            }`}
          >
            {item.title}
          </button>
        ))}
      </div>

      {/* Card Content */}
      <div>
        {dashboardItems.map((item) => (
          activeSection === item.sectionName && (
            <div key={item.sectionName} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center mb-4">
                {item.icon}
                <h2 className="ml-3 text-xl font-semibold text-blue-800">{item.title}</h2>
              </div>
              <p className="text-gray-700 mb-4">{item.description}</p>
              {item.component}
            </div>
          )
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
