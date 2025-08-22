import React from 'react';

const SQLTutorial = () => {
  const containerStyle = {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    color: '#333',
  };

  const sectionStyle = {
    marginBottom: '30px',
    padding: '20px',
    background: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  };

  const headerStyle = {
    borderBottom: '2px solid #4CAF50',
    paddingBottom: '8px',
    marginBottom: '16px',
    color: '#4CAF50',
  };

  const codeBlockStyle = {
    background: '#f4f4f4',
    padding: '15px',
    borderRadius: '4px',
    overflowX: 'auto',
    fontFamily: 'monospace',
    fontSize: '14px',
    lineHeight: '1.5',
  };

  const olStyle = {
    marginLeft: '20px',
  };

  return (
    <div style={containerStyle}>
      <h1 style={{ textAlign: 'center', color: '#4CAF50' }}>PostgreSQL SQL Tutorial</h1>
      
      {/* Create Table Section */}
      <div style={sectionStyle}>
        <h2 style={headerStyle}>Create an "employees" Table</h2>
        <p>
          This command creates a table called <strong>employees</strong> with columns for employee details. Use this when setting up a new table to store your data.
        </p>
        <pre style={codeBlockStyle}>
          {`CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    department VARCHAR(50),
    salary DECIMAL(10,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`}
        </pre>
      </div>

      {/* Insert Data Section */}
      <div style={sectionStyle}>
        <h2 style={headerStyle}>Insert Data into the Table</h2>
        <p>
          The <strong>INSERT</strong> statement adds new records to the table. In this example, three employee records are inserted.
        </p>
        <pre style={codeBlockStyle}>
          {`INSERT INTO employees (name, department, salary)
VALUES 
('Chioma ', 'Engineering', 75000),
('Forstina', 'Marketing', 65000),
('Daniel', 'Sales', 70000);`}
        </pre>
      </div>

      {/* Update Data Section */}
      <div style={sectionStyle}>
        <h2 style={headerStyle}>Update Data in the Table</h2>
        <p>
          The <strong>UPDATE</strong> statement modifies existing records. Here, we update the salary for Alice Johnson.
        </p>
        <pre style={codeBlockStyle}>
          {`UPDATE employees
SET salary = 80000
WHERE name = 'Chioma';`}
        </pre>
      </div>

      {/* Delete Data Section */}
      <div style={sectionStyle}>
        <h2 style={headerStyle}>Delete Data from the Table</h2>
        <p>
          The <strong>DELETE</strong> statement removes records from the table. In this case, the record for Charlie Brown is deleted.
        </p>
        <pre style={codeBlockStyle}>
          {`DELETE FROM employees
WHERE name = 'Daniel';`}
        </pre>
      </div>

      {/* Classwork Task */}
      <div style={sectionStyle}>
        <h2 style={headerStyle}>Classwork Task</h2>
        <p>For your classwork, complete the following steps:</p>
        <ol style={olStyle}>
          
          <li>
            Create a table named <code>students</code> with these columns:
            <ul>
              <li><code>id</code> - serial Primary Key</li>
              <li><code>name</code> - Text, not null</li>
              <li><code>grade</code> - Numeric type (choose as per your preference)</li>
              <li><code>enrolled_at</code> - Timestamp, default to current timestamp</li>
            </ul>
          </li>
          <li>Insert at least three student records into the <code>students</code> table.</li>
          <li>Update one of the student records (for example, change a student's grade).</li>
          <li>Delete one student record.</li>
          <li>Write a brief explanation (2-3 sentences) for each SQL statement used, describing its purpose.</li>
        </ol>
        <p>Please submit your SQL script and explanations in a document.</p>
      </div>
    </div>
  );
};

export default SQLTutorial;
