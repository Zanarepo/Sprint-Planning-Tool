import React, { useState } from 'react';
import { FaBrain, FaSearch, FaLightbulb, FaCommentAlt, FaChartBar, FaRegChartBar, FaUserAlt } from 'react-icons/fa';

const InteractiveBrainstorming = () => {
  const [mindMap, setMindMap] = useState('');
  const [swot, setSwot] = useState({ strengths: '', weaknesses: '', opportunities: '', threats: '' });
  const [scamper, setScamper] = useState({ substitute: '', combine: '', adapt: '', modify: '', putToUse: '', eliminate: '', reverse: '' });
  const [fiveWhys, setFiveWhys] = useState('');
  const [surveyFeedback, setSurveyFeedback] = useState('');
  const [competitorAnalysis, setCompetitorAnalysis] = useState('');
  const [brainwritingIdeas, setBrainwritingIdeas] = useState('');
  const [reviewResult, setReviewResult] = useState('');

  const handleMindMapChange = (e) => setMindMap(e.target.value);
  const handleSWOTChange = (e) => setSwot({ ...swot, [e.target.name]: e.target.value });
  const handleSCAMPERChange = (e) => setScamper({ ...scamper, [e.target.name]: e.target.value });
  const handleFiveWhysChange = (e) => setFiveWhys(e.target.value);
  const handleSurveyChange = (e) => setSurveyFeedback(e.target.value);
  const handleCompetitorAnalysisChange = (e) => setCompetitorAnalysis(e.target.value);
  const handleBrainwritingChange = (e) => setBrainwritingIdeas(e.target.value);

  const handleReview = () => {
    let feedback = '';
    
    // Mind Mapping Feedback
    if (mindMap) {
      feedback += `<b>Mind Mapping Feedback:</b> You have successfully mapped out your ideas. Consider expanding further on related concepts. <br />`;
    }
    
    // SWOT Analysis Feedback
    if (swot.strengths || swot.weaknesses || swot.opportunities || swot.threats) {
      feedback += `<b>SWOT Analysis Feedback:</b><br/>`;
      if (swot.strengths) feedback += `Strengths: ${swot.strengths}.<br/>`;
      if (swot.weaknesses) feedback += `Weaknesses: ${swot.weaknesses}.<br/>`;
      if (swot.opportunities) feedback += `Opportunities: ${swot.opportunities}.<br/>`;
      if (swot.threats) feedback += `Threats: ${swot.threats}.<br/>`;
    }

    // SCAMPER Feedback
    if (Object.values(scamper).some(val => val)) {
      feedback += `<b>SCAMPER Feedback:</b><br/>`;
      Object.entries(scamper).forEach(([key, value]) => {
        if (value) feedback += `${key}: ${value}.<br/>`;
      });
    }

    // 5 Whys Feedback
    if (fiveWhys) {
      feedback += `<b>5 Whys Feedback:</b> Your inquiry into the problem: ${fiveWhys}. This helps in identifying root causes and potential solutions.<br />`;
    }

    // Survey Feedback
    if (surveyFeedback) {
      feedback += `<b>Survey Feedback:</b> Survey result: ${surveyFeedback}. This feedback can help shape the product's features.<br />`;
    }

    // Competitor Analysis Feedback
    if (competitorAnalysis) {
      feedback += `<b>Competitor Analysis Feedback:</b> Competitor insights: ${competitorAnalysis}. Look for differentiation opportunities.<br />`;
    }

    // Brainwriting Feedback
    if (brainwritingIdeas) {
      feedback += `<b>Brainwriting Feedback:</b> Idea submitted: ${brainwritingIdeas}. Consider having others build on this idea.<br />`;
    }

    setReviewResult(feedback);
  };

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-3xl font-bold text-center mb-8">Interactive Exercises for Brainstorming Techniques</h2>

      {/* Mind Mapping */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold flex items-center gap-2 mb-4">
          <FaBrain /> Mind Mapping
        </h3>
        <textarea
          className="w-full p-4 border border-gray-300 rounded-md"
          rows="5"
          placeholder="Enter your ideas here and connect them to explore relationships..."
          value={mindMap}
          onChange={handleMindMapChange}
        />
        <p className="mt-2 text-sm text-gray-500">Example: Create a mind map for a new mobile app to explore features, target users, and design.</p>
      </div>

      {/* SWOT Analysis */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold flex items-center gap-2 mb-4">
          <FaSearch /> SWOT Analysis
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="strengths"
            className="p-4 border border-gray-300 rounded-md"
            placeholder="Strengths"
            value={swot.strengths}
            onChange={handleSWOTChange}
          />
          <input
            type="text"
            name="weaknesses"
            className="p-4 border border-gray-300 rounded-md"
            placeholder="Weaknesses"
            value={swot.weaknesses}
            onChange={handleSWOTChange}
          />
          <input
            type="text"
            name="opportunities"
            className="p-4 border border-gray-300 rounded-md"
            placeholder="Opportunities"
            value={swot.opportunities}
            onChange={handleSWOTChange}
          />
          <input
            type="text"
            name="threats"
            className="p-4 border border-gray-300 rounded-md"
            placeholder="Threats"
            value={swot.threats}
            onChange={handleSWOTChange}
          />
        </div>
        <p className="mt-2 text-sm text-gray-500">Example: Evaluate a new e-commerce website against competitors.</p>
      </div>

      {/* SCAMPER */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold flex items-center gap-2 mb-4">
          <FaLightbulb /> SCAMPER
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="substitute"
            className="p-4 border border-gray-300 rounded-md"
            placeholder="Substitute"
            value={scamper.substitute}
            onChange={handleSCAMPERChange}
          />
          <input
            type="text"
            name="combine"
            className="p-4 border border-gray-300 rounded-md"
            placeholder="Combine"
            value={scamper.combine}
            onChange={handleSCAMPERChange}
          />
          <input
            type="text"
            name="adapt"
            className="p-4 border border-gray-300 rounded-md"
            placeholder="Adapt"
            value={scamper.adapt}
            onChange={handleSCAMPERChange}
          />
          <input
            type="text"
            name="modify"
            className="p-4 border border-gray-300 rounded-md"
            placeholder="Modify"
            value={scamper.modify}
            onChange={handleSCAMPERChange}
          />
          <input
            type="text"
            name="putToUse"
            className="p-4 border border-gray-300 rounded-md"
            placeholder="Put to Use"
            value={scamper.putToUse}
            onChange={handleSCAMPERChange}
          />
          <input
            type="text"
            name="eliminate"
            className="p-4 border border-gray-300 rounded-md"
            placeholder="Eliminate"
            value={scamper.eliminate}
            onChange={handleSCAMPERChange}
          />
          <input
            type="text"
            name="reverse"
            className="p-4 border border-gray-300 rounded-md"
            placeholder="Reverse"
            value={scamper.reverse}
            onChange={handleSCAMPERChange}
          />
        </div>
        <p className="mt-2 text-sm text-gray-500">Example: SCAMPER applied to a smartphone app could include adding new features or modifying the user interface.</p>
      </div>

      {/* 5 Whys */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold flex items-center gap-2 mb-4">
          <FaCommentAlt /> 5 Whys
        </h3>
        <textarea
          className="w-full p-4 border border-gray-300 rounded-md"
          rows="5"
          placeholder="Ask why five times to explore the root cause of an issue..."
          value={fiveWhys}
          onChange={handleFiveWhysChange}
        />
        <p className="mt-2 text-sm text-gray-500">Example: Asking "Why is our app crashing?" and following up to discover a memory leak as the root cause.</p>
      </div>

      {/* Customer Feedback */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold flex items-center gap-2 mb-4">
          <FaUserAlt /> Customer Feedback & Surveys
        </h3>
        <textarea
          className="w-full p-4 border border-gray-300 rounded-md"
          rows="5"
          placeholder="Enter feedback or survey responses from customers..."
          value={surveyFeedback}
          onChange={handleSurveyChange}
        />
        <p className="mt-2 text-sm text-gray-500">Example: Using surveys to understand customer preferences for a new food delivery app.</p>
      </div>

      {/* Competitor Analysis */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold flex items-center gap-2 mb-4">
          <FaChartBar /> Competitor Analysis
        </h3>
        <textarea
          className="w-full p-4 border border-gray-300 rounded-md"
          rows="5"
          placeholder="Analyze competitors and their features..."
          value={competitorAnalysis}
          onChange={handleCompetitorAnalysisChange}
        />
        <p className="mt-2 text-sm text-gray-500">Example: Compare features, pricing, and user experience of different online course platforms.</p>
      </div>

      {/* Brainwriting */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold flex items-center gap-2 mb-4">
          <FaRegChartBar /> Brainwriting
        </h3>
        <textarea
          className="w-full p-4 border border-gray-300 rounded-md"
          rows="5"
          placeholder="Write your idea and allow others to build upon it..."
          value={brainwritingIdeas}
          onChange={handleBrainwritingChange}
        />
        <p className="mt-2 text-sm text-gray-500">Example: Write down an idea for improving an online marketplace, and have others suggest additional features or modifications.</p>
      </div>

      {/* Conclusion */}
      <button
        className="w-full py-3 bg-blue-600 text-white rounded-lg mt-8"
        onClick={handleReview}
      >
        Submit & Review
      </button>

      {/* Review Result */}
      {reviewResult && (
        <div className="mt-8 p-4 bg-gray-100 border border-gray-300 rounded-lg">
          <h4 className="text-xl font-semibold mb-4">Review Feedback</h4>
          <div dangerouslySetInnerHTML={{ __html: reviewResult }} />
        </div>
      )}
    </div>
  );
};

export default InteractiveBrainstorming;
