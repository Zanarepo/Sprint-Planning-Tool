
import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '../../supabaseClient';

// Helper function to fetch user ID from email in localStorage
const fetchUserId = async (setUserId) => {
  const email = localStorage.getItem('userEmail');
  if (email) {
    const { data, error } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .single();
    if (data) setUserId(data.id);
    else console.error('User fetch error:', error);
  }
};

// Main Strategy Document Module Component
const StrategyDocumentModule = () => {
  const [userId, setUserId] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [mode, setMode] = useState('list');
  const [message, setMessage] = useState(null);

  const fetchDocuments = useCallback(async () => {
    const { data, error } = await supabase
      .from('product_strategy_documents')
      .select('*')
      .eq('user_id', userId);
    if (data) setDocuments(data);
    else {
      console.error('Fetch documents error:', error);
      setMessage({ type: 'error', text: `Error: ${error.message || 'Failed to fetch documents'}` });
    }
  }, [userId]);

  useEffect(() => {
    fetchUserId(setUserId);
  }, []);

  useEffect(() => {
    if (userId) {
      fetchDocuments();
    }
  }, [userId, fetchDocuments]);

  const createNewDocument = () => {
    setSelectedDoc({ product_name: '', version: 1, author: '' });
    setMode('create');
    setMessage(null);
  };

  const handleSaveDocument = async (docData, sections) => {
    try {
      let strategyId = docData.id;
      if (mode === 'create') {
        const { data, error } = await supabase
          .from('product_strategy_documents')
          .insert([{ ...docData, user_id: userId }])
          .select()
          .single();
        if (error) {
          throw error;
        }
        strategyId = data.id;
        setSelectedDoc({ ...data, sections: {} });
        setMode('edit');
        setMessage({ type: 'success', text: 'Document created successfully!' });
      } else if (mode === 'edit') {
        const { error } = await supabase
          .from('product_strategy_documents')
          .update(docData)
          .eq('id', strategyId);
        if (error) throw error;
        setMode('view');
        setMessage({ type: 'success', text: 'Document updated successfully!' });
      }
      await saveSections(strategyId, sections);
      await fetchDocuments();
    } catch (error) {
      console.error('Save error:', error);
      setMessage({ type: 'error', text: `Error: ${error.message || 'Failed to save document'}` });
    }
  };

  const handleDeleteDocument = async (docId) => {
    try {
      const { error } = await supabase
        .from('product_strategy_documents')
        .delete()
        .eq('id', docId);
      if (error) throw error;
      setMessage({ type: 'success', text: 'Document deleted successfully!' });
      await fetchDocuments();
    } catch (error) {
      console.error('Delete error:', error);
      setMessage({ type: 'error', text: `Error: ${error.message || 'Failed to delete document'}` });
    }
  };

  const saveSections = async (strategyId, sections) => {
    const sectionTables = {
      overview: 'product_overview',
      problems: 'problem_statements',
      solutions: 'solutions',
      visionMission: 'vision_mission',
      competitorComp: 'competitor_comparison',
      marketTrends: 'market_trends',
      marketOpp: 'market_opportunity',
      pestel: 'pestel_analysis',
      competitorAnalysis: 'competitoranalysis',
      customerSegments: 'customer_segments',
      customerPersonas: 'customer_personas',
      porters: 'porters_five_forces',
      swot: 'swot_analysis',
      gtm: 'go_to_market',
      campaigns: 'marketing_campaigns',
      financial: 'financial_projections',
      risks: 'risk_assessment',
      roadmap: 'roadmap',
      kpis: 'kpis',
      exit: 'exit_strategy',
    };

    for (const [sectionName, tableName] of Object.entries(sectionTables)) {
      for (const item of sections[sectionName]) {
        // Ensure numeric fields are parsed correctly
        const itemData = {
          ...item,
          strategy_id: strategyId,
          user_id: userId,
          ...(tableName === 'market_trends' && {
            projection_value: item.projection_value ? parseFloat(item.projection_value) : null,
            projection_year: item.projection_year ? parseInt(item.projection_year, 10) : null,
            growth_rate: item.growth_rate ? parseFloat(item.growth_rate) : null,
          }),
          ...(tableName === 'market_opportunity' && {
            estimated_value: item.estimated_value ? parseFloat(item.estimated_value) : null,
          }),
          ...(tableName === 'financial_projections' && {
            month_1_value: item.month_1_value ? parseFloat(item.month_1_value) : null,
            month_6_value: item.month_6_value ? parseFloat(item.month_6_value) : null,
            break_even_months: item.break_even_months ? parseInt(item.break_even_months, 10) : null,
          }),
        };
        if (item.id) {
          const { error } = await supabase.from(tableName).update(itemData).eq('id', item.id);
          if (error) {
            console.error(`Update error for ${tableName}:`, error);
            throw error;
          }
        } else {
          const { error } = await supabase.from(tableName).insert(itemData);
          if (error) {
            console.error(`Insert error for ${tableName}:`, error);
            throw error;
          }
        }
      }
    }
  };


  if (!userId) {
    return <div className="p-6 text-gray-700">Loading user...</div>;
  }

  if (mode === 'list') {
    return (
      <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
        <h1 className="text-2xl font-semibold text-yellow-800">Strategy Documents Dashboard</h1>
        {message && (
          <div
            className={`p-4 rounded-md ${
              message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}
          >
            {message.text}
          </div>
        )}
        <button
          onClick={createNewDocument}
          className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
        >
          Create New Document
        </button>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
          {documents.length === 0 ? (
            <p className="text-gray-600 text-center col-span-full">No documents yet.</p>
          ) : (
            documents.map((doc) => (
              <div
                key={doc.id}
                className="border rounded-lg bg-white shadow-sm p-4 flex flex-col justify-between h-full hover:shadow-lg transition-shadow duration-200"
              >
                <div className="mb-3">
                  <h3 className="text-lg font-semibold text-gray-800 truncate">
                    {doc.product_name} (v{doc.version})
                  </h3>
                  <p className="text-gray-600 text-sm">Author: {doc.author}</p>
                </div>
                <div className="flex flex-wrap gap-2 mt-auto">
                  <button
                    onClick={() => {
                      setSelectedDoc(doc);
                      setMode('view');
                      setMessage(null);
                    }}
                    className="flex-1 sm:flex-none px-3 py-1.5 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    View
                  </button>
                  <button
                    onClick={() => {
                      setSelectedDoc(doc);
                      setMode('edit');
                      setMessage(null);
                    }}
                    className="flex-1 sm:flex-none px-3 py-1.5 bg-yellow-600 text-white rounded-md text-sm font-medium hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  >
                    Edit
                  </button>
                
                  <button
                    onClick={() => handleDeleteDocument(doc.id)}
                    className="flex-1 sm:flex-none px-3 py-1.5 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    );
  }

  return (
    <StrategyDocumentForm
      doc={selectedDoc}
      mode={mode}
      onSave={handleSaveDocument}
      onCancel={() => {
        setMode('list');
        setMessage(null);
      }}
      userId={userId}
    />
  );
};

// Strategy Document Form Component
const StrategyDocumentForm = ({ doc, mode, onSave, onCancel }) => {
  const [formData, setFormData] = useState(doc);
  const [sections, setSections] = useState({
    overview: [],
    problems: [],
    solutions: [],
    visionMission: [],
    competitorComp: [],
    marketTrends: [],
    marketOpp: [],
    pestel: [],
    competitorAnalysis: [],
    customerSegments: [],
    customerPersonas: [],
    porters: [],
    swot: [],
    gtm: [],
    campaigns: [],
    financial: [],
    risks: [],
    roadmap: [],
    kpis: [],
    exit: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (mode === 'edit' || mode === 'view') {
      setIsLoading(true);
      fetchSections(doc.id).finally(() => setIsLoading(false));
    }
  }, [doc.id, mode]);

  const fetchSections = async (strategyId) => {
    const sectionQueries = {
      overview: supabase.from('product_overview').select('*').eq('strategy_id', strategyId),
      problems: supabase.from('problem_statements').select('*').eq('strategy_id', strategyId),
      solutions: supabase.from('solutions').select('*').eq('strategy_id', strategyId),
      visionMission: supabase.from('vision_mission').select('*').eq('strategy_id', strategyId),
      competitorComp: supabase.from('competitor_comparison').select('*').eq('strategy_id', strategyId),
      marketTrends: supabase.from('market_trends').select('*').eq('strategy_id', strategyId),
      marketOpp: supabase.from('market_opportunity').select('*').eq('strategy_id', strategyId),
      pestel: supabase.from('pestel_analysis').select('*').eq('strategy_id', strategyId),
      competitorAnalysis: supabase.from('competitoranalysis').select('*').eq('strategy_id', strategyId),
      customerSegments: supabase.from('customer_segments').select('*').eq('strategy_id', strategyId),
      customerPersonas: supabase.from('customer_personas').select('*').eq('strategy_id', strategyId),
      porters: supabase.from('porters_five_forces').select('*').eq('strategy_id', strategyId),
      swot: supabase.from('swot_analysis').select('*').eq('strategy_id', strategyId),
      gtm: supabase.from('go_to_market').select('*').eq('strategy_id', strategyId),
      campaigns: supabase.from('marketing_campaigns').select('*').eq('strategy_id', strategyId),
      financial: supabase.from('financial_projections').select('*').eq('strategy_id', strategyId),
      risks: supabase.from('risk_assessment').select('*').eq('strategy_id', strategyId),
      roadmap: supabase.from('roadmap').select('*').eq('strategy_id', strategyId),
      kpis: supabase.from('kpis').select('*').eq('strategy_id', strategyId),
      exit: supabase.from('exit_strategy').select('*').eq('strategy_id', strategyId),
    };

    const newSections = {};
    for (const [sectionName, query] of Object.entries(sectionQueries)) {
      const { data, error } = await query;
      if (error) {
        console.error(`Fetch error for ${sectionName}:`, error);
      }
      newSections[sectionName] = data || [];
    }
    setSections(newSections);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSectionChange = (sectionName, updatedData) => {
    setSections({ ...sections, [sectionName]: updatedData });
  };

  const handleSubmit = async () => {
    try {
      await onSave(formData, sections);
    } catch (error) {
      setMessage({ type: 'error', text: `Error: ${error.message || 'Failed to save document'}` });
    }
  };

  if (isLoading) {
    return <div className="p-6 text-gray-700">Loading sections...</div>;
  }

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-yellow-800">
          {mode === 'view' ? 'View' : mode === 'create' ? 'Create' : 'Edit'} Strategy Document
        </h1>
        <button
          onClick={onCancel}
          className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          Back to Dashboard
        </button>
      </div>
      {message && (
        <div
          className={`p-4 rounded-md ${
            message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Main Document Fields */}
      <div className="border rounded-lg bg-white shadow-md p-4">
        <h2 className="text-lg font-semibold text-yellow-800 mb-4">Document Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="product_name" className="block text-sm font-medium text-gray-700 mb-1">
              Product Name
            </label>
            <input
              id="product_name"
              name="product_name"
              value={formData.product_name}
              onChange={handleChange}
              placeholder="Enter the name of the product"
              disabled={mode === 'view'}
              className="w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 disabled:bg-gray-100"
            />
          </div>
          <div>
            <label htmlFor="version" className="block text-sm font-medium text-gray-700 mb-1">
              Version
            </label>
            <input
              id="version"
              name="version"
              type="number"
              value={formData.version}
              onChange={handleChange}
              placeholder="Enter version (e.g., 1)"
              disabled={mode === 'view'}
              className="w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 disabled:bg-gray-100"
            />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">
              Author
            </label>
            <input
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              placeholder="Enter the author's name"
              disabled={mode === 'view'}
              className="w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 disabled:bg-gray-100"
            />
          </div>
        </div>
      </div>

      {/* Sections */}
      <div className="space-y-6">
        <SectionForm
          title="Product Overview"
          explainer="Provide an overview of the product, its target users, and the core problem it addresses."
          data={sections.overview}
          fields={['product_name', 'overview', 'target_users', 'core_problem']}
          placeholders={{
            product_name: 'Enter product name for this overview',
            overview: 'Describe the product overview',
            target_users: 'Specify the target audience',
            core_problem: 'Define the core problem addressed',
          }}
          onChange={(data) => handleSectionChange('overview', data)}
          disabled={mode === 'view'}
        />
        <SectionForm
          title="Problem Statements"
          explainer="List key issues, their descriptions, data insights, and sources."
          data={sections.problems}
          fields={['issue', 'description', 'data_insight', 'source']}
          placeholders={{
            issue: 'Enter the key issue',
            description: 'Describe the issue in detail',
            data_insight: 'Provide data or evidence',
            source: 'Cite the source of the data',
          }}
          onChange={(data) => handleSectionChange('problems', data)}
          disabled={mode === 'view'}
        />
        <SectionForm
          title="Solutions"
          explainer="Describe the features and their descriptions for the proposed solutions."
          data={sections.solutions}
          fields={['feature', 'description']}
          placeholders={{
            feature: 'Enter the feature name',
            description: 'Describe the feature',
          }}
          onChange={(data) => handleSectionChange('solutions', data)}
          disabled={mode === 'view'}
        />
        <SectionForm
          title="Vision & Mission"
          explainer="Define the vision and mission statements for the product."
          data={sections.visionMission}
          fields={['vision', 'mission']}
          placeholders={{
            vision: 'Enter the vision statement',
            mission: 'Enter the mission statement',
          }}
          onChange={(data) => handleSectionChange('visionMission', data)}
          disabled={mode === 'view'}
        />
        <SectionForm
          title="Competitor Comparison"
          explainer="Compare competitors, their focus, and your advantages."
          data={sections.competitorComp}
          fields={['competitor', 'focus', 'justride_advantage']}
          placeholders={{
            competitor: 'Enter competitor name',
            focus: 'Describe their focus',
            justride_advantage: 'Specify your advantage',
          }}
          onChange={(data) => handleSectionChange('competitorComp', data)}
          disabled={mode === 'view'}
        />
        <SectionForm
          title="Market Trends"
          explainer="Describe market trends, projections, and growth rates."
          data={sections.marketTrends}
          fields={['trend', 'description', 'projection_value', 'projection_year', 'growth_rate']}
          placeholders={{
            trend: 'Enter the market trend',
            description: 'Describe the trend',
            projection_value: 'Enter projected value (e.g., 1000000)',
            projection_year: 'Enter projection year (e.g., 2026)',
            growth_rate: 'Enter growth rate (e.g., 5.5)',
          }}
          onChange={(data) => handleSectionChange('marketTrends', data)}
          disabled={mode === 'view'}
        />
        <SectionForm
          title="Market Opportunity"
          explainer="Outline Total Addressable Market (TAM), Serviceable Addressable Market (SAM), and Serviceable Obtainable Market (SOM)."
          data={sections.marketOpp}
          fields={['tier', 'description', 'estimated_value']}
          placeholders={{
            tier: 'Enter market tier (e.g., TAM, SAM, SOM)',
            description: 'Describe the market tier',
            estimated_value: 'Enter estimated value (e.g., 5000000)',
          }}
          onChange={(data) => handleSectionChange('marketOpp', data)}
          disabled={mode === 'view'}
        />
        <SectionForm
          title="PESTEL Analysis"
          explainer="Analyze Political, Economic, Social, Technological, Environmental, and Legal factors."
          data={sections.pestel}
          fields={['factor_type', 'description']}
          placeholders={{
            factor_type: 'Enter factor type (e.g., Political)',
            description: 'Describe the factor',
          }}
          onChange={(data) => handleSectionChange('pestel', data)}
          disabled={mode === 'view'}
        />
        <SectionForm
          title="Competitor Analysis"
          explainer="Detail competitors' strengths, weaknesses, and additional notes."
          data={sections.competitorAnalysis}
          fields={['competitor_name', 'strengths', 'weaknesses', 'notes']}
          placeholders={{
            competitor_name: 'Enter competitor name',
            strengths: 'List their strengths',
            weaknesses: 'List their weaknesses',
            notes: 'Add any additional notes',
          }}
          onChange={(data) => handleSectionChange('competitorAnalysis', data)}
          disabled={mode === 'view'}
        />
        <SectionForm
          title="Customer Segments"
          explainer="Define customer segments and their descriptions."
          data={sections.customerSegments}
          fields={['segment_name', 'description']}
          placeholders={{
            segment_name: 'Enter segment name',
            description: 'Describe the segment',
          }}
          onChange={(data) => handleSectionChange('customerSegments', data)}
          disabled={mode === 'view'}
        />
        <SectionForm
          title="Customer Personas"
          explainer="Create personas with name, age, occupation, needs, and preferences."
          data={sections.customerPersonas}
          fields={['name', 'age', 'occupation', 'needs', 'preferences']}
          placeholders={{
            name: 'Enter persona name',
            age: 'Enter age (e.g., 30)',
            occupation: 'Enter occupation',
            needs: 'List needs',
            preferences: 'List preferences',
          }}
          onChange={(data) => handleSectionChange('customerPersonas', data)}
          disabled={mode === 'view'}
        />
        <SectionForm
          title="Porter's Five Forces"
          explainer="Assess competitive forces with intensity levels."
          data={sections.porters}
          fields={['force_name', 'intensity']}
          placeholders={{
            force_name: 'Enter force (e.g., Threat of New Entrants)',
            intensity: 'Enter intensity (e.g., High, Low)',
          }}
          onChange={(data) => handleSectionChange('porters', data)}
          disabled={mode === 'view'}
        />
        <SectionForm
          title="SWOT Analysis"
          explainer="List Strengths, Weaknesses, Opportunities, and Threats."
          data={sections.swot}
          fields={['category', 'description']}
          placeholders={{
            category: 'Enter category (e.g., Strength)',
            description: 'Describe the item',
          }}
          onChange={(data) => handleSectionChange('swot', data)}
          disabled={mode === 'view'}
        />
        <SectionForm
          title="Go-To-Market Strategy"
          explainer="Outline strategy items and their descriptions."
          data={sections.gtm}
          fields={['strategy_item', 'description']}
          placeholders={{
            strategy_item: 'Enter strategy item',
            description: 'Describe the strategy',
          }}
          onChange={(data) => handleSectionChange('gtm', data)}
          disabled={mode === 'view'}
        />
        <SectionForm
          title="Marketing Campaigns"
          explainer="Define marketing campaigns with taglines and launch cities."
          data={sections.campaigns}
          fields={['campaign_name', 'tagline', 'launch_cities']}
          placeholders={{
            campaign_name: 'Enter campaign name',
            tagline: 'Enter campaign tagline',
            launch_cities: 'List launch cities',
          }}
          onChange={(data) => handleSectionChange('campaigns', data)}
          disabled={mode === 'view'}
        />
        <SectionForm
          title="Financial Projections"
          explainer="Project financial metrics with values and break-even points."
          data={sections.financial}
          fields={['metric', 'month_1_value', 'month_6_value', 'break_even_months']}
          placeholders={{
            metric: 'Enter financial metric',
            month_1_value: 'Enter Month 1 value (e.g., 10000)',
            month_6_value: 'Enter Month 6 value (e.g., 50000)',
            break_even_months: 'Enter break-even months (e.g., 12)',
          }}
          onChange={(data) => handleSectionChange('financial', data)}
          disabled={mode === 'view'}
        />
        <SectionForm
          title="Risk Assessment"
          explainer="Identify risks and their mitigation strategies."
          data={sections.risks}
          fields={['risk', 'mitigation_strategy']}
          placeholders={{
            risk: 'Enter potential risk',
            mitigation_strategy: 'Describe mitigation strategy',
          }}
          onChange={(data) => handleSectionChange('risks', data)}
          disabled={mode === 'view'}
        />
        <SectionForm
          title="Roadmap"
          explainer="Define phases, timelines, and focus areas for the product roadmap."
          data={sections.roadmap}
          fields={['phase', 'timeline', 'focus']}
          placeholders={{
            phase: 'Enter roadmap phase',
            timeline: 'Enter timeline (e.g., Q1 2026)',
            focus: 'Describe focus area',
          }}
          onChange={(data) => handleSectionChange('roadmap', data)}
          disabled={mode === 'view'}
        />
        <SectionForm
          title="KPIs"
          explainer="Set key performance indicators, targets, and measurement frequency."
          data={sections.kpis}
          fields={['metric_name', 'target_value', 'measurement_frequency']}
          placeholders={{
            metric_name: 'Enter KPI metric',
            target_value: 'Enter target value (e.g., 1000)',
            measurement_frequency: 'Enter frequency (e.g., Monthly)',
          }}
          onChange={(data) => handleSectionChange('kpis', data)}
          disabled={mode === 'view'}
        />
        <SectionForm
          title="Exit Strategy"
          explainer="Outline potential exit initiatives and their descriptions."
          data={sections.exit}
          fields={['initiative', 'description']}
          placeholders={{
            initiative: 'Enter exit initiative',
            description: 'Describe the initiative',
          }}
          onChange={(data) => handleSectionChange('exit', data)}
          disabled={mode === 'view'}
        />
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-4 mt-8">
        {mode !== 'view' && (
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            Save
          </button>
        )}
        <button
          onClick={onCancel}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

// Section Form Component
const SectionForm = ({ title, explainer, data = [], fields, placeholders, onChange, disabled }) => {
  const [newItem, setNewItem] = useState({});

  const handleItemChange = (index, field, value) => {
    const updated = [...data];
    // Parse numeric fields
    const parsedValue =
      ['projection_value', 'growth_rate', 'month_1_value', 'month_6_value', 'estimated_value', 'break_even_months'].includes(field)
        ? value ? (field === 'break_even_months' ? parseInt(value, 10) : parseFloat(value)) : null
        : value;
    updated[index] = { ...updated[index], [field]: parsedValue };
    onChange(updated);
  };

  const handleNewItemChange = (field, value) => {
    // Parse numeric fields for new items
    const parsedValue =
      ['projection_value', 'growth_rate', 'month_1_value', 'month_6_value', 'estimated_value', 'break_even_months'].includes(field)
        ? value ? (field === 'break_even_months' ? parseInt(value, 10) : parseFloat(value)) : null
        : value;
    setNewItem({ ...newItem, [field]: parsedValue });
  };

  const addItem = () => {
    if (Object.keys(newItem).length > 0) {
      onChange([...data, newItem]);
      setNewItem({});
    }
  };

  const removeItem = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  return (
    <div className="border rounded-lg bg-white shadow-md p-4">
      <h2 className="text-lg font-semibold text-yellow-800 mb-2">{title}</h2>
      <p className="text-gray-600 mb-4">{explainer}</p>

      {/* Input Form for Adding New Items */}
      {!disabled && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {fields.map((field) => (
            <div key={field}>
              <label
                htmlFor={`${title}-${field}`}
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {field.replace('_', ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
              </label>
              <input
                id={`${title}-${field}`}
                type={['projection_value', 'growth_rate', 'month_1_value', 'month_6_value', 'estimated_value', 'break_even_months'].includes(field) ? 'number' : 'text'}
                step={['projection_value', 'growth_rate', 'month_1_value', 'month_6_value', 'estimated_value'].includes(field) ? '0.01' : undefined}
                value={newItem[field] || ''}
                onChange={(e) => handleNewItemChange(field, e.target.value)}
                placeholder={placeholders[field] || `Enter ${field.replace('_', ' ')}`}
                className="w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
          ))}
          <div className="md:col-span-2">
            <button
              onClick={addItem}
              className="mt-2 px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
              Add {title}
            </button>
          </div>
        </div>
      )}

      {/* Table for Displaying Items */}
      {Array.isArray(data) && data.length > 0 ? (
        <table className="min-w-full border bg-white shadow-md rounded-lg">
          <thead className="bg-yellow-600 text-white">
            <tr>
              {fields.map((field) => (
                <th key={field} className="border p-3 text-left">
                  {field.replace('_', ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
                </th>
              ))}
              {!disabled && <th className="border p-3 text-left">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className="border-t">
                {fields.map((field) => (
                  <td key={field} className="border p-3">
                    {disabled ? (
                      item[field] || ''
                    ) : (
                      <input
                        type={['projection_value', 'growth_rate', 'month_1_value', 'month_6_value', 'estimated_value', 'break_even_months'].includes(field) ? 'number' : 'text'}
                        step={['projection_value', 'growth_rate', 'month_1_value', 'month_6_value', 'estimated_value'].includes(field) ? '0.01' : undefined}
                        value={item[field] || ''}
                        onChange={(e) => handleItemChange(index, field, e.target.value)}
                        placeholder={placeholders[field] || `Enter ${field.replace('_', ' ')}`}
                        className="w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      />
                    )}
                  </td>
                ))}
                {!disabled && (
                  <td className="border p-3">
                    <button
                      onClick={() => removeItem(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-600">No {title.toLowerCase()} yet.</p>
      )}
    </div>
  );
};

export default StrategyDocumentModule;