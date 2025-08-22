import React from 'react';
import { 
  FaCloud, 
  FaExpandArrowsAlt, 
  FaDollarSign, 
  FaRocket, 
  FaLock, 
  FaUserTie 
} from 'react-icons/fa';
import './CloudComputingInfo.css';

const CloudComputingInfo = () => {
  return (
    <div className="cloud-info-container">
      {/* Header Section */}
      <div className="header">
        <FaCloud className="cloud-icon" />
        <h1>What is Cloud Computing?</h1>
      </div>
      
      {/* Cloud Computing Definition */}
      <p className="description">
        Cloud computing is the on-demand delivery of computing resources (like servers, databases, storage, networking, AI, and analytics) over the internet.
        Instead of buying and maintaining physical servers, businesses can rent computing power from cloud providers and scale as needed.
      </p>
      
      {/* Benefits Section */}
      <h2>Why is Cloud Computing Important?</h2>
      <div className="benefits">
        <div className="benefit-card">
          <FaExpandArrowsAlt className="benefit-icon" />
          <h3>Scalability</h3>
          <p>Easily scale up or down based on demand.</p>
        </div>
        <div className="benefit-card">
          <FaDollarSign className="benefit-icon" />
          <h3>Cost Efficiency</h3>
          <p>Pay for what you use instead of maintaining expensive infrastructure.</p>
        </div>
        <div className="benefit-card">
          <FaRocket className="benefit-icon" />
          <h3>Flexibility & Speed</h3>
          <p>Deploy applications faster without worrying about hardware.</p>
        </div>
        <div className="benefit-card">
          <FaLock className="benefit-icon" />
          <h3>Security & Reliability</h3>
          <p>Cloud providers handle security, backups, and disaster recovery.</p>
        </div>
      </div>
      
      {/* Product Manager Benefits Section */}
      <h2>Why This Matters for Product Managers</h2>
      <div className="pm-benefits">
        <div className="pm-benefit-card">
          <FaUserTie className="pm-icon" />
          <h3>Better Decision Making</h3>
          <p>
            Understanding cloud concepts allows PMs to make informed choices about technology, pricing models, and scalability.
          </p>
        </div>
        <div className="pm-benefit-card">
          <FaUserTie className="pm-icon" />
          <h3>Improved Communication</h3>
          <p>
            PMs can effectively bridge the gap between technical teams and stakeholders by speaking the language of technology.
          </p>
        </div>
        <div className="pm-benefit-card">
          <FaUserTie className="pm-icon" />
          <h3>Strategic Planning</h3>
          <p>
            With cloud knowledge, PMs can plan product roadmaps that leverage scalability, flexibility, and cost-efficiency.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CloudComputingInfo;
