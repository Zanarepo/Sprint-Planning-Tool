import React from 'react';
import { FaChartLine, FaUserPlus, FaCogs, FaToolbox } from 'react-icons/fa';

const AnalyticsDashboard = () => {
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>
          <FaChartLine style={styles.icon} /> Product Analytics Dashboard
        </h1>
      </header>
      
      <section style={styles.section}>
        <h2>
          <FaChartLine style={styles.icon} /> Importance of Analytics
        </h2>
        <p>
          Analytics are crucial for understanding user behavior, measuring engagement, and optimizing product performance. They help you identify what features work best, spot friction points, and guide data-driven improvements.
        </p>
      </section>

      <section style={styles.section}>
        <h2>
          <FaUserPlus style={styles.icon} /> Setting Up Your Mixpanel Account
        </h2>
        <ol>
          <li>Visit <a href="https://mixpanel.com" target="_blank" rel="noopener noreferrer">Mixpanel</a> and sign up for an account.</li>
          <li>Create a new project and copy your project token.</li>
          <li>Integrate the Mixpanel SDK into your product (e.g., using JavaScript, iOS, or Android).</li>
          <li>Identify users and start tracking key events.</li>
        </ol>
      </section>

      <section style={styles.section}>
        <h2>
          <FaCogs style={styles.icon} /> Key Events to Track with Mixpanel
        </h2>
        <ul>
          <li>Page Views and Navigation</li>
          <li>User Sign-ups and Logins</li>
          <li>Feature Usage</li>
          <li>Purchases and Transactions</li>
          <li>User Engagement (clicks, interactions, etc.)</li>
        </ul>
      </section>

      <section style={styles.section}>
        <h2>
          <FaToolbox style={styles.icon} /> Other Analytics Tools
        </h2>
        <p>
          In addition to Mixpanel, consider exploring:
        </p>
        <ul>
          <li>Google Analytics</li>
          <li>Amplitude</li>
          <li>Heap Analytics</li>
          <li>Segment</li>
          <li>Kissmetrics</li>
        </ul>
      </section>

      <footer style={styles.footer}>
        <p>Designed for effective product analytics management</p>
      </footer>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    lineHeight: '1.6',
  },
  header: {
    textAlign: 'center',
    borderBottom: '2px solid #ccc',
    paddingBottom: '10px',
    marginBottom: '20px',
  },
  section: {
    marginBottom: '20px',
  },
  icon: {
    marginRight: '8px',
    verticalAlign: 'middle',
  },
  footer: {
    textAlign: 'center',
    fontSize: '0.9em',
    color: '#777',
    borderTop: '1px solid #ccc',
    paddingTop: '10px',
    marginTop: '20px',
  },
};

export default AnalyticsDashboard;
