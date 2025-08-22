import React from 'react';

const SQLForeignKeyTutorial = () => {
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
      <h1 style={{ textAlign: 'center', color: '#4CAF50' }}>
        PostgreSQL: Linking Tables with Foreign Keys
      </h1>

      {/* Explanation Section */}
      <div style={sectionStyle}>
        <h2 style={headerStyle}>What are Foreign Keys?</h2>
        <p>
          Foreign keys (FK) are used to link two tables together. They ensure data integrity by enforcing a relationship
          between the records in different tables. For example, an employee's record may include a <code>department_id</code> 
          that references a specific department in the <code>departments</code> table.
        </p>
      </div>

      {/* Code Example Section */}
      <div style={sectionStyle}>
        <h2 style={headerStyle}>Example: Creating Linked Tables</h2>
        <p>
          Below is an example of how to create a <code>departments</code> table and an <code>employees</code> table. The 
          <code>employees</code> table includes a foreign key that links <code>department_id</code> to the <code>id</code> 
          column of the <code>departments</code> table.
        </p>
        <pre style={codeBlockStyle}>
          {`-- Create departments table
CREATE TABLE departments (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);

-- Create employees table with a foreign key linking to departments
CREATE TABLE employees (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  department_id INTEGER,
  CONSTRAINT fk_department
    FOREIGN KEY (department_id)
    REFERENCES departments(id)
);`}
        </pre>
      </div>

      {/* Explanation of Use Cases Section */}
      <div style={sectionStyle}>
        <h2 style={headerStyle}>When to Use Foreign Keys</h2>
        <p>
          Use foreign keys when you need to maintain a relationship between two sets of data. For instance:
        </p>
        <ul>
          <li>
            <strong>Employees and Departments:</strong> Ensures that each employee is assigned to an existing department.
          </li>
          <li>
            <strong>Orders and Customers:</strong> Guarantees that each order is linked to a valid customer.
          </li>
          <li>
            <strong>Products and Categories:</strong> Associates each product with its category.
          </li>
        </ul>
      </div>

      {/* Classwork Task */}
      <div style={sectionStyle}>
        <h2 style={headerStyle}>Classwork Task</h2>
        <p>For your classwork, please complete the following steps:</p>
        <ol style={olStyle}>
          <li>Create a new PostgreSQL database called <code>company_db</code> (if not already created).</li>
          <li>
            Create a table named <code>projects</code> with these columns:
            <ul>
              <li>
                <code>id</code> -Serial Primary Key, .
              </li>
              <li>
                <code>title</code> - Text, not null.
              </li>
              <li>
                <code>description</code> - Text.
              </li>
            </ul>
          </li>
          <li>
            Create another table named <code>tasks</code> with these columns:
            <ul>
              <li>
                <code>id</code> - Primary Key, auto-increment.
              </li>
              <li>
                <code>task_name</code> - Text, not null.
              </li>
              <li>
                <code>project_id</code> - Integer, which will be a foreign key.
              </li>
            </ul>
          </li>
          <li>
            Add a foreign key constraint on <code>project_id</code> in the <code>tasks</code> table referencing the <code>id</code> column in the <code>projects</code> table.
          </li>
          <li>
            Insert sample records into both tables and ensure that the foreign key relationship is maintained.
          </li>
          <li>
            Write a brief explanation (2-3 sentences) for each SQL statement used.
          </li>
        </ol>
        <p>
          Submit your SQL script and explanations in a document.
        </p>
      </div>
    </div>
  );
};

export default SQLForeignKeyTutorial;
