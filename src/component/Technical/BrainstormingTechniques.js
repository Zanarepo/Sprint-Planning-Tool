import React, { useState } from 'react';
import { FaBrain, FaSearch, FaLightbulb, FaCommentAlt, FaUserAlt, FaChartBar, FaRegChartBar } from 'react-icons/fa';

// TechniqueCard Component
const TechniqueCard = ({ technique, onTryIt }) => (
  <div className="bg-white p-6 border rounded-lg shadow-lg hover:shadow-xl transition-shadow">
    <div className="flex justify-center mb-4">{technique.icon}</div>
    <h3 className="text-xl font-semibold text-center mb-2">{technique.name}</h3>
    <p className="text-gray-700 text-sm mb-4">{technique.description}</p>
    <p className="text-gray-500 text-xs italic mb-4">{technique.example}</p>
    <div className="mb-4">
      <strong>Best used when:</strong> {technique.bestUse}
    </div>
    <button
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      onClick={onTryIt}
    >
      Try it
    </button>
  </div>
);

// MindMappingSimulation Component
const MindMappingSimulation = () => {
  const [nodes, setNodes] = useState([{ id: 1, title: 'Central Idea', children: [] }]);

  const addChild = (parentId) => {
    const newNode = { id: Date.now(), title: 'New Idea', children: [] };
    const updatedNodes = addNodeToTree(nodes, parentId, newNode);
    setNodes(updatedNodes);
  };

  const addNodeToTree = (tree, parentId, newNode) => {
    return tree.map(node => {
      if (node.id === parentId) {
        return { ...node, children: [...node.children, newNode] };
      } else if (node.children.length > 0) {
        return { ...node, children: addNodeToTree(node.children, parentId, newNode) };
      }
      return node;
    });
  };

  const renderTree = (tree) => (
    <ul className="list-disc pl-5">
      {tree.map(node => (
        <li key={node.id}>
          {node.title}
          <button
            className="ml-2 text-blue-500 hover:underline"
            onClick={() => addChild(node.id)}
          >
            Add Child
          </button>
          {node.children.length > 0 && renderTree(node.children)}
        </li>
      ))}
    </ul>
  );

  return <div>{renderTree(nodes)}</div>;
};

// SWOTSimulation Component
const SWOTSimulation = () => {
  const [strengths, setStrengths] = useState([]);
  const [weaknesses, setWeaknesses] = useState([]);
  const [opportunities, setOpportunities] = useState([]);
  const [threats, setThreats] = useState([]);

  const addItem = (category, item) => {
    if (item.trim() === '') return;
    switch (category) {
      case 'strengths':
        setStrengths([...strengths, item]);
        break;
      case 'weaknesses':
        setWeaknesses([...weaknesses, item]);
        break;
      case 'opportunities':
        setOpportunities([...opportunities, item]);
        break;
      case 'threats':
        setThreats([...threats, item]);
        break;
      default:
        break;
    }
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      {['Strengths', 'Weaknesses', 'Opportunities', 'Threats'].map((category, idx) => (
        <div key={idx}>
          <h3 className="font-bold">{category}</h3>
          <ul className="list-disc pl-5">
            {(category === 'Strengths' ? strengths : category === 'Weaknesses' ? weaknesses : category === 'Opportunities' ? opportunities : threats).map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          <input
            type="text"
            className="border p-2 w-full"
            placeholder={`Add a ${category.toLowerCase().slice(0, -1)}`}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                addItem(category.toLowerCase(), e.target.value);
                e.target.value = '';
              }
            }}
          />
        </div>
      ))}
    </div>
  );
};

// SCAMPERSimulation Component
const SCAMPERSimulation = () => {
  const [responses, setResponses] = useState({
    substitute: '', combine: '', adapt: '', modify: '', put: '', eliminate: '', reverse: ''
  });

  const handleChange = (key, value) => {
    setResponses({ ...responses, [key]: value });
  };

  return (
    <div>
      {['Substitute', 'Combine', 'Adapt', 'Modify', 'Put to another use', 'Eliminate', 'Reverse'].map((step, index) => (
        <div key={index} className="mb-2">
          <label className="font-bold">{step}:</label>
          <input
            type="text"
            className="border p-2 w-full"
            placeholder={`What could you ${step.toLowerCase()}?`}
            value={responses[step.toLowerCase().replace(' to another use', '')]}
            onChange={(e) => handleChange(step.toLowerCase().replace(' to another use', ''), e.target.value)}
          />
        </div>
      ))}
    </div>
  );
};

// FiveWhysSimulation Component
const FiveWhysSimulation = () => {
  const [questions, setQuestions] = useState(['Why?']);

  const addWhy = () => {
    if (questions.length < 5) {
      setQuestions([...questions, 'Why?']);
    }
  };

  return (
    <div>
      {questions.map((q, index) => (
        <div key={index} className="mb-2">
          <input
            type="text"
            className="border p-2 w-full"
            placeholder={`Question ${index + 1}: Why?`}
          />
        </div>
      ))}
      {questions.length < 5 && (
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={addWhy}
        >
          Add Another Why
        </button>
      )}
    </div>
  );
};

// CustomerFeedbackSimulation Component
const CustomerFeedbackSimulation = () => {
  const [questions, setQuestions] = useState(['What do you like about our product?']);

  const addQuestion = () => {
    setQuestions([...questions, '']);
  };

  return (
    <div>
      {questions.map((q, index) => (
        <div key={index} className="mb-2">
          <input
            type="text"
            className="border p-2 w-full"
            placeholder={`Question ${index + 1}`}
            value={q}
            onChange={(e) => {
              const newQuestions = [...questions];
              newQuestions[index] = e.target.value;
              setQuestions(newQuestions);
            }}
          />
        </div>
      ))}
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={addQuestion}
      >
        Add Question
      </button>
    </div>
  );
};

// CompetitorAnalysisSimulation Component
const CompetitorAnalysisSimulation = () => {
  const [competitors, setCompetitors] = useState([{ name: '', features: '', pricing: '' }]);

  const addCompetitor = () => {
    setCompetitors([...competitors, { name: '', features: '', pricing: '' }]);
  };

  return (
    <div>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border p-2">Competitor Name</th>
            <th className="border p-2">Key Features</th>
            <th className="border p-2">Pricing</th>
          </tr>
        </thead>
        <tbody>
          {competitors.map((comp, index) => (
            <tr key={index}>
              <td className="border p-2">
                <input
                  type="text"
                  className="w-full"
                  value={comp.name}
                  onChange={(e) => {
                    const newCompetitors = [...competitors];
                    newCompetitors[index].name = e.target.value;
                    setCompetitors(newCompetitors);
                  }}
                />
              </td>
              <td className="border p-2">
                <input
                  type="text"
                  className="w-full"
                  value={comp.features}
                  onChange={(e) => {
                    const newCompetitors = [...competitors];
                    newCompetitors[index].features = e.target.value;
                    setCompetitors(newCompetitors);
                  }}
                />
              </td>
              <td className="border p-2">
                <input
                  type="text"
                  className="w-full"
                  value={comp.pricing}
                  onChange={(e) => {
                    const newCompetitors = [...competitors];
                    newCompetitors[index].pricing = e.target.value;
                    setCompetitors(newCompetitors);
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={addCompetitor}
      >
        Add Competitor
      </button>
    </div>
  );
};

// RoleStormingSimulation Component
const RoleStormingSimulation = () => {
  const roles = ['Customer', 'Investor', 'Competitor', 'Team Member'];
  const [selectedRole, setSelectedRole] = useState(roles[0]);
  const [ideas, setIdeas] = useState('');

  return (
    <div>
      <select
        className="border p-2 mb-4"
        value={selectedRole}
        onChange={(e) => setSelectedRole(e.target.value)}
      >
        {roles.map((role) => (
          <option key={role} value={role}>
            {role}
          </option>
        ))}
      </select>
      <textarea
        className="border p-2 w-full"
        rows="4"
        placeholder={`Brainstorm ideas from the perspective of a ${selectedRole}`}
        value={ideas}
        onChange={(e) => setIdeas(e.target.value)}
      />
    </div>
  );
};

// BrainwritingSimulation Component
const BrainwritingSimulation = () => {
  const [ideas, setIdeas] = useState([]);
  const [newIdea, setNewIdea] = useState('');

  const addIdea = () => {
    if (newIdea.trim() === '') return;
    setIdeas([...ideas, newIdea]);
    setNewIdea('');
  };

  return (
    <div>
      <div className="mb-4">
        <input
          type="text"
          className="border p-2 w-full"
          placeholder="Write your idea"
          value={newIdea}
          onChange={(e) => setNewIdea(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') addIdea();
          }}
        />
        <button
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={addIdea}
        >
          Add Idea
        </button>
      </div>
      <ul className="list-disc pl-5">
        {ideas.map((idea, index) => (
          <li key={index}>{idea}</li>
        ))}
      </ul>
    </div>
  );
};

// SimulationModal Component
const SimulationModal = ({ isOpen, onClose, technique }) => {
  if (!isOpen) return null;

  const simulations = {
    'Mind Mapping': <MindMappingSimulation />,
    'SWOT Analysis': <SWOTSimulation />,
    'SCAMPER': <SCAMPERSimulation />,
    '5 Whys': <FiveWhysSimulation />,
    'Customer Feedback & Surveys': <CustomerFeedbackSimulation />,
    'Competitor Analysis': <CompetitorAnalysisSimulation />,
    'Role Storming': <RoleStormingSimulation />,
    'Brainwriting': <BrainwritingSimulation />,
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full">
        <h2 className="text-2xl font-bold mb-4">{technique}</h2>
        {simulations[technique]}
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

// Main BrainstormingTechniques Component
const BrainstormingTechniques = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTechnique, setSelectedTechnique] = useState(null);

  const openModal = (technique) => {
    setSelectedTechnique(technique);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedTechnique(null);
  };

  const techniques = [
    {
      name: 'Mind Mapping',
      icon: <FaBrain className="text-4xl text-blue-500" />,
      description:
        'Mind Mapping is a visual technique that helps organize ideas and see relationships between concepts. It allows product teams to brainstorm and explore ideas more creatively.',
      example:
        'Example: Creating a mind map for a new mobile app to explore features, target users, and design.',
      bestUse:
        'You need to explore and organize a large number of ideas or concepts, especially in the early stages of product ideation.',
    },
    {
      name: 'SWOT Analysis',
      icon: <FaSearch className="text-4xl text-green-500" />,
      description:
        'SWOT Analysis is a structured approach for identifying the Strengths, Weaknesses, Opportunities, and Threats of your product or market. This helps you evaluate potential opportunities and challenges.',
      example:
        'Example: Using SWOT to evaluate a new e-commerce website against competitors.',
      bestUse:
        'You’re evaluating a product idea or market opportunity, especially before making strategic decisions.',
    },
    {
      name: 'SCAMPER',
      icon: <FaLightbulb className="text-4xl text-yellow-500" />,
      description:
        'SCAMPER is a creative thinking method that helps to enhance or adapt existing products. It encourages you to Substitute, Combine, Adapt, Modify, Put to another use, Eliminate, and Reverse.',
      example:
        'Example: SCAMPER applied to a smartphone app could include adding new features or modifying the user interface.',
      bestUse:
        'You want to improve or innovate on an existing product by systematically altering its aspects.',
    },
    {
      name: '5 Whys',
      icon: <FaCommentAlt className="text-4xl text-red-500" />,
      description:
        'The 5 Whys technique involves asking "Why?" five times to explore the root cause of a problem. This helps uncover underlying issues that need to be addressed in product development.',
      example:
        'Example: Asking "Why is our app crashing?" and following up to discover a memory leak as the root cause.',
      bestUse:
        'You’re trying to solve a specific problem or understand the root cause of an issue.',
    },
    {
      name: 'Customer Feedback & Surveys',
      icon: <FaUserAlt className="text-4xl text-purple-500" />,
      description:
        'Gathering feedback directly from customers helps identify pain points and needs, leading to product improvements and ensuring the product meets the market demand.',
      example:
        'Example: Using surveys to understand customer preferences for a new food delivery app.',
      bestUse:
        'You need to validate assumptions about user needs or preferences during product development.',
    },
    {
      name: 'Competitor Analysis',
      icon: <FaChartBar className="text-4xl text-teal-500" />,
      description:
        'Competitor Analysis involves studying existing products in the market to identify gaps and opportunities. Understanding what competitors are offering helps you create a unique value proposition.',
      example:
        'Example: Analyzing existing fitness apps to find a gap in offering personalized workout plans.',
      bestUse:
        'You’re entering a new market or launching a new product to understand the competitive landscape.',
    },
    {
      name: 'Role Storming',
      icon: <FaRegChartBar className="text-4xl text-orange-500" />,
      description:
        'Role Storming encourages you to assume different roles, such as a customer, investor, or competitor, to think creatively and come up with ideas from diverse perspectives.',
      example:
        'Example: A product manager assuming the role of a customer to explore pain points when using their product.',
      bestUse:
        'You want to generate ideas from diverse perspectives or when the team is stuck in a particular way of thinking.',
    },
    {
      name: 'Brainwriting',
      icon: <FaUserAlt className="text-4xl text-indigo-500" />,
      description:
        'Brainwriting is a technique where team members write down ideas instead of speaking them out. This ensures everyone gets to contribute equally, making it great for quiet or remote teams.',
      example:
        'Example: A product team uses brainwriting to come up with new features for a website redesign.',
      bestUse:
        'You have a diverse team or when some team members might be hesitant to speak up in a group setting.',
    },
  ];

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-2xl font-bold text-center mb-6">Effective Brainstorming Techniques for Product Identification</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {techniques.map((technique, index) => (
          <TechniqueCard
            key={index}
            technique={technique}
            onTryIt={() => openModal(technique.name)}
          />
        ))}
      </div>
      <SimulationModal
        isOpen={modalOpen}
        onClose={closeModal}
        technique={selectedTechnique}
      />
    </div>
  );
};

export default BrainstormingTechniques;