import React, { useState, useEffect, useRef, useCallback } from 'react';
import { supabase } from '../supabaseClient';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';

const PRDdisplay = () => {
  // State for user ID and PRD documents
  const [userId, setUserId] = useState(null);
  const [prdList, setPrdList] = useState([]);
  // Track expanded/collapsed state per PRD ID
  const [expandedPRDs, setExpandedPRDs] = useState({});
  // Color palette states
  const [headerColor, setHeaderColor] = useState('#1D4ED8'); // Default blue
  const [backgroundColor, setBackgroundColor] = useState('#FFFFFF'); // Default white

  // Ref for the document container (used for downloads)
  const documentRef = useRef(null);

  // Fetch user id based on email stored in localStorage
  useEffect(() => {
    const email = localStorage.getItem('userEmail');
    if (email) {
      const fetchUserId = async () => {
        const { data, error } = await supabase
          .from('users')
          .select('id')
          .eq('email', email)
          .single();
        if (error) {
          console.error('Error fetching user id:', error);
        } else if (data) {
          setUserId(data.id);
        }
      };
      fetchUserId();
    } else {
      console.debug('No user email found in localStorage.');
    }
  }, []);

  // Wrap the fetch function in useCallback to avoid missing dependency warnings
  const fetchPRDs = useCallback(async () => {
    if (!userId) return;
    const { data, error } = await supabase
      .from('prd_documents')
      .select('*')
      .eq('user_id', userId);
    if (error) {
      console.error('Error fetching PRDs:', error);
    } else {
      setPrdList(data);
      // Initialize each PRD's toggle state to false
      const expandedObj = {};
      data.forEach(prd => {
        expandedObj[prd.id] = false;
      });
      setExpandedPRDs(expandedObj);
    }
  }, [userId]);

  // Fetch PRDs when the userId changes
  useEffect(() => {
    if (userId) {
      fetchPRDs();
    }
  }, [userId, fetchPRDs]);

  // Toggle the expanded state for a given PRD
  const toggleExpand = (id) => {
    setExpandedPRDs(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Download PDF using html2canvas and jsPDF (a valid PDF is generated)
  const downloadPDF = () => {
    if (documentRef.current) {
      html2canvas(documentRef.current, { scale: 2 })
        .then(canvas => {
          const imgData = canvas.toDataURL('image/png');
          const pdf = new jsPDF('p', 'mm', 'a4');
          const imgProps = pdf.getImageProperties(imgData);
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
          pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
          pdf.save('PRD_document.pdf');
        })
        .catch(err => {
          console.error('Error generating PDF:', err);
        });
    }
  };

  // Download DOC by saving the innerHTML as a Word document
  const downloadDOC = () => {
    if (documentRef.current) {
      const htmlContent = documentRef.current.innerHTML;
      const blob = new Blob([htmlContent], { type: 'application/msword' });
      saveAs(blob, 'PRD_document.doc');
    }
  };

  return (
    <div className="container mx-auto p-4">
      {/* Color Palette Controls */}
      <div className="mb-4 flex flex-col md:flex-row md:space-x-4">
        <div className="flex items-center mb-2 md:mb-0">
          <label className="mr-2 font-bold">Header Color:</label>
          <input
            type="color"
            value={headerColor}
            onChange={(e) => setHeaderColor(e.target.value)}
            className="w-10 h-10"
          />
        </div>
        <div className="flex items-center">
          <label className="mr-2 font-bold">Background Color:</label>
          <input
            type="color"
            value={backgroundColor}
            onChange={(e) => setBackgroundColor(e.target.value)}
            className="w-10 h-10"
          />
        </div>
      </div>

      {/* Download Buttons */}
      <div className="mb-4 flex space-x-4">
        <button
          onClick={downloadPDF}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Download PDF
        </button>
        <button
          onClick={downloadDOC}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Download DOC
        </button>
      </div>

      {/* Document Display */}
      <div
        ref={documentRef}
        className="p-4"
        style={{ backgroundColor: backgroundColor }}
      >
        {prdList.length === 0 ? (
          <p className="text-gray-600">No PRD documents found.</p>
        ) : (
          prdList.map((prd, index) => (
            <div
              key={prd.id}
              className="mb-8 border rounded shadow hover:shadow-lg transition-all duration-300 p-4"
            >
              {/* Card header with PRD name */}
              <div className="flex justify-between items-center mb-4">
                <h2
                  className="text-2xl font-bold"
                  style={{ color: headerColor }}
                > {`PRD ${index + 1}`}</h2>
                <button
                  onClick={() => toggleExpand(prd.id)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-2 rounded"
                >
                  {expandedPRDs[prd.id] ? 'Hide Details' : 'Show Details'}
                </button>
              </div>
              {expandedPRDs[prd.id] && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Left Column */}
                  <div>
                    {/* Overview */}
                    <div className="mb-4 card p-4 hover:bg-gray-100 rounded">
                      <h3
                        className="text-xl font-semibold mb-2"
                        style={{ color: headerColor }}
                      >
                        Overview
                      </h3>
                      <p>
                        <strong>Product Name:</strong> {prd.overview_productName}
                      </p>
                      <p>
                        <strong>Author:</strong> {prd.overview_author}
                      </p>
                      <p>
                        <strong>Date:</strong> {prd.overview_date}
                      </p>
                      <p>
                        <strong>Status:</strong> {prd.overview_status}
                      </p>
                      <p>
                        <strong>Version:</strong> {prd.overview_version}
                      </p>
                    </div>
                    {/* Executive Summary */}
                    <div className="mb-4 card p-4 hover:bg-gray-100 rounded">
                      <h3
                        className="text-xl font-semibold mb-2"
                        style={{ color: headerColor }}
                      >
                        Executive Summary
                      </h3>
                      <p>
                        <strong>Problem Statement:</strong>{' '}
                        {prd.executive_problemstatement}
                      </p>
                      <p>
                        <strong>Goals & Objectives:</strong>{' '}
                        {prd.executive_goals}
                      </p>
                      <p>
                        <strong>Scope:</strong> {prd.executive_scope}
                      </p>
                      
                    </div>
                    {/* Target Audience */}
                    <div className="mb-4 card p-4 hover:bg-gray-100 rounded">
                      <h3
                        className="text-xl font-semibold mb-2"
                        style={{ color: headerColor }}
                      >
                        Target Audience
                      </h3>
                      <p>
                        <strong>Primary Audience:</strong>{' '}
                        {prd.audience_primary}
                      </p>
                      <p>
                        <strong>Secondary Audience:</strong>{' '}
                        {prd.audience_secondary}
                      </p>
                      <p>
                        <strong>User Personas:</strong>{' '}
                        {prd.audience_personas}
                      </p>
                    </div>
                   
                   
                    {/* Use Cases */}
                    <div className="mb-4 card p-4 hover:bg-gray-100 rounded">
                      <h3
                        className="text-xl font-semibold mb-2"
                        style={{ color: headerColor }}
                      >
                        Use Cases
                      </h3>
                      <p>{prd.usecases}</p>
                    </div>
                  </div>
                 
             {/* Right Column */}
             
                  <div>
                    {/* Features & Requirements */}
                    <div className="mb-4 card p-4 hover:bg-gray-100 rounded">
                      <h3
                        className="text-xl font-semibold mb-2"
                        style={{ color: headerColor }}
                      >
                        Features & Requirements
                      </h3>
                      <p>
                        <strong>Core Features:</strong> {prd.features_core}
                      </p>
                      <p>
                        <strong>Prioritization:</strong>{' '}
                        {prd.features_prioritization}
                      </p>
                      <p>
                        <strong>Technical Requirements:</strong>{' '}
                        {prd.features_technical}
                      </p>
                      <p>
                        <strong>UI/UX Considerations:</strong>{' '}
                        {prd.features_uiux}
                      </p>
                    </div>
                    {/* Timeline & Milestones */}
                    <div className="mb-4 card p-4 hover:bg-gray-100 rounded">
                      <h3
                        className="text-xl font-semibold mb-2"
                        style={{ color: headerColor }}
                      >
                        Timeline & Milestones
                      </h3>
                      <p>
                        <strong>Launch Timeline:</strong> {prd.timeline_launch}
                      </p>
                      <p>
                        <strong>Phases:</strong> {prd.timeline_phases}
                      </p>
                      <p>
                        <strong>Milestones:</strong>{' '}
                        {prd.timeline_milestones}
                      </p>
                    </div>
                    {/* Metrics for Success */}
                    <div className="mb-4 card p-4 hover:bg-gray-100 rounded">
                      <h3
                        className="text-xl font-semibold mb-2"
                        style={{ color: headerColor }}
                      >
                        Metrics for Success
                      </h3>
                      <p>
                        <strong>KPIs:</strong> {prd.metrics_kpis}
                      </p>
                      <p>
                        <strong>Tracking:</strong> {prd.metrics_tracking}
                      </p>
                    </div>
                    {/* Dependencies */}
                    <div className="mb-4 card p-4 hover:bg-gray-100 rounded">
                      <h3
                        className="text-xl font-semibold mb-2"
                        style={{ color: headerColor }}
                      >
                        Dependencies
                      </h3>
                      <p>
                        <strong>Technical:</strong> {prd.dependencies_technical}
                      </p>
                      <p>
                        <strong>Business:</strong> {prd.dependencies_business}
                      </p>
                    </div>
                    {/* Risks & Mitigation */}
                    
                    <div className="mb-4 card p-4 hover:bg-gray-100 rounded">
                      <h3
                        className="text-xl font-semibold mb-2"
                        style={{ color: headerColor }}
                      >
                        Risks & Mitigation
                      </h3>
                      <p>
                        <strong>Risk Factors:</strong> {prd.risks_factors}
                      </p>
                      <p>
                        <strong>Mitigation Plans:</strong>{' '}
                        {prd.risks_mitigation}
                      </p>
                    </div>
                   



               
                    {/* Stakeholders */}
                    <div className="mb-4 card p-4 hover:bg-gray-100 rounded">
                      <h3
                        className="text-xl font-semibold mb-2"
                        style={{ color: headerColor }}
                      >
                        Stakeholders
                      </h3>
                      <p>
                        <strong>Internal:</strong> {prd.stakeholders_internal}
                      </p>
                      <p>
                        <strong>External:</strong> {prd.stakeholders_external}
                      </p>
                    </div>
                    {/* Budget & Resources */}
                    <div className="mb-4 card p-4 hover:bg-gray-100 rounded">
                      <h3
                        className="text-xl font-semibold mb-2"
                        style={{ color: headerColor }}
                      >
                        Budget & Resources
                      </h3>
                      <p>
                        <strong>Budget:</strong> {prd.budget}
                      </p>
                      <p>
                        <strong>Resources:</strong> {prd.resources}
                      </p>
                    </div>
                   
                  
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PRDdisplay;
