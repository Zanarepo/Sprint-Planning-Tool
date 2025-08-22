import React, { useState } from "react";

const initialColumn = {
  name: "",
  type: "text",
  isPrimaryKey: false,
  isForeignKey: false,
  isNotNull: false,
  isUnique: false,
  // only applicable if isForeignKey true
  referenceTable: "",
  referenceColumn: "",
};

function PKFKSimulator() {
  const [tables, setTables] = useState([]);
  const [tableName, setTableName] = useState("");
  const [columns, setColumns] = useState([{ ...initialColumn }]);

  // Helper: Get list of possible PK options from already created tables
  const getPossibleReferences = () => {
    const refs = [];
    tables.forEach((tbl) => {
      tbl.columns.forEach((col) => {
        if (col.isPrimaryKey) {
          refs.push({ table: tbl.name, column: col.name });
        }
      });
    });
    return refs;
  };

  // Add new column input row
  const addColumnInput = () => {
    setColumns([...columns, { ...initialColumn }]);
  };

  // Remove a column input row by index
  const removeColumnInput = (index) => {
    setColumns(columns.filter((_, i) => i !== index));
  };

  // Update a column's property
  const handleColumnChange = (index, field, value) => {
    const updated = columns.map((col, i) =>
      i === index ? { ...col, [field]: value } : col
    );
    setColumns(updated);
  };

  // Toggle a checkbox field (like PK, FK, NotNull, Unique)
  const toggleColumnFlag = (index, flag) => {
    const updated = columns.map((col, i) => {
      if (i === index) {
        // If setting Primary Key, ensure that no other column is set to PK in this table form
        if (flag === "isPrimaryKey" && !col.isPrimaryKey) {
          // Clear other PKs
          return { ...col, isPrimaryKey: true };
        }
        return { ...col, [flag]: !col[flag] };
      }
      return col;
    });
    // If we turned on a PK for one column, reset all other PK flags in the same table form.
    if (flag === "isPrimaryKey") {
      const pkSet = updated.findIndex((c) => c.isPrimaryKey);
      setColumns(
        updated.map((c, i) => ({
          ...c,
          isPrimaryKey: i === pkSet,
        }))
      );
    } else {
      setColumns(updated);
    }
  };

  // When FK is toggled on, clear any previous reference info if toggled off.
  const handleFKToggle = (index) => {
    const updated = columns.map((col, i) => {
      if (i === index) {
        if (col.isForeignKey) {
          // turning off FK: clear reference
          return { ...col, isForeignKey: false, referenceTable: "", referenceColumn: "" };
        } else {
          // turning on FK: set flag true (reference must be chosen from possible PKs)
          return { ...col, isForeignKey: true };
        }
      }
      return col;
    });
    setColumns(updated);
  };

  // Save the new table and its columns
  const saveTable = () => {
    if (!tableName.trim()) {
      alert("Please enter a table name.");
      return;
    }
    // Ensure that all columns have a name if they're added.
    for (let col of columns) {
      if (!col.name.trim()) {
        alert("Please ensure all columns have names.");
        return;
      }
      // If FK is selected, require a reference table and column.
      if (col.isForeignKey && (!col.referenceTable || !col.referenceColumn)) {
        alert(`Foreign Key field "${col.name}" must have a referenced table and column.`);
        return;
      }
    }

    const newTable = {
      id: Date.now(),
      name: tableName,
      columns,
    };

    setTables([...tables, newTable]);
    setTableName("");
    setColumns([{ ...initialColumn }]);
  };

  // A simple function to show explanation details for each constraint
  const explanationText = () => (
    <div className="p-4 bg-blue-50 rounded mb-6">
      <h3 className="font-bold text-lg mb-2">Database Constraints Explanation</h3>
      <p>
        <strong>Primary Key (PK):</strong> A unique identifier for each record in a table.
        There should be only one primary key per table.
      </p>
      <p>
        <strong>Foreign Key (FK):</strong> A field in one table that links to the primary key in another table.
        It creates a relationship between two tables.
      </p>
      <p>
        <strong>Unique:</strong> This constraint ensures that all values in a column are different.
      </p>
      <p>
        <strong>Not Null:</strong> This constraint ensures that a column cannot have a NULL value.
      </p>
    </div>
  );

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">
        PK &amp; FK Relationship Simulator
      </h1>
      {explanationText()}
      <div className="bg-white p-6 rounded shadow mb-8">
        <h2 className="text-2xl font-semibold mb-4">Create a New Table</h2>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Table Name:</label>
          <input
            type="text"
            value={tableName}
            onChange={(e) => setTableName(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:ring"
            placeholder="e.g., Users, Orders"
          />
        </div>
        <div>
          <h3 className="font-medium mb-2">Define Columns:</h3>
          {columns.map((col, index) => (
            <div key={index} className="p-3 mb-3 border rounded">
              <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
                <div className="flex-1 mb-2 md:mb-0">
                  <label className="block text-sm font-medium">Column Name</label>
                  <input
                    type="text"
                    value={col.name}
                    onChange={(e) =>
                      handleColumnChange(index, "name", e.target.value)
                    }
                    className="w-full p-2 border rounded focus:outline-none focus:ring"
                    placeholder="e.g., id, username, order_date"
                  />
                </div>
                <div className="flex-1 mb-2 md:mb-0">
                  <label className="block text-sm font-medium">Data Type</label>
                  <select
                    value={col.type}
                    onChange={(e) =>
                      handleColumnChange(index, "type", e.target.value)
                    }
                    className="w-full p-2 border rounded focus:outline-none focus:ring"
                  >
                    <option value="text">Text</option>
                    <option value="number">Number</option>
                    <option value="date">Date</option>
                  </select>
                </div>
              </div>
              <div className="mt-2 flex flex-wrap items-center space-x-4">
                <label className="flex items-center space-x-1">
                  <input
                    type="checkbox"
                    checked={col.isPrimaryKey}
                    onChange={() => toggleColumnFlag(index, "isPrimaryKey")}
                    className="form-checkbox"
                  />
                  <span className="text-sm">Primary Key (PK)</span>
                </label>
                <label className="flex items-center space-x-1">
                  <input
                    type="checkbox"
                    checked={col.isForeignKey}
                    onChange={() => handleFKToggle(index)}
                    className="form-checkbox"
                  />
                  <span className="text-sm">Foreign Key (FK)</span>
                </label>
                <label className="flex items-center space-x-1">
                  <input
                    type="checkbox"
                    checked={col.isUnique}
                    onChange={() => toggleColumnFlag(index, "isUnique")}
                    className="form-checkbox"
                  />
                  <span className="text-sm">Unique</span>
                </label>
                <label className="flex items-center space-x-1">
                  <input
                    type="checkbox"
                    checked={col.isNotNull}
                    onChange={() => toggleColumnFlag(index, "isNotNull")}
                    className="form-checkbox"
                  />
                  <span className="text-sm">Not Null</span>
                </label>
                {columns.length > 1 && (
                  <button
                    onClick={() => removeColumnInput(index)}
                    className="px-2 py-1 bg-red-500 text-white rounded text-sm"
                  >
                    Remove
                  </button>
                )}
              </div>
              {col.isForeignKey && (
                <div className="mt-3 border-t pt-3">
                  <p className="text-sm font-medium mb-1">
                    Select Reference (must reference a PK from an existing table):
                  </p>
                  {getPossibleReferences().length > 0 ? (
                    <select
                      value={`${col.referenceTable}|${col.referenceColumn}`}
                      onChange={(e) => {
                        const [refTable, refColumn] = e.target.value.split("|");
                        handleColumnChange(index, "referenceTable", refTable);
                        handleColumnChange(index, "referenceColumn", refColumn);
                      }}
                      className="w-full p-2 border rounded focus:outline-none focus:ring"
                    >
                      <option value="">-- Select Reference --</option>
                      {getPossibleReferences().map((ref, idx) => (
                        <option key={idx} value={`${ref.table}|${ref.column}`}>
                          {ref.table}.{ref.column}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <p className="text-xs text-gray-500">
                      No available tables with a Primary Key to reference.
                    </p>
                  )}
                </div>
              )}
            </div>
          ))}
          <button
            onClick={addColumnInput}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Add Another Column
          </button>
        </div>
        <button
          onClick={saveTable}
          className="mt-4 px-6 py-2 bg-green-500 text-white rounded"
        >
          Save Table
        </button>
      </div>

      {/* Display Created Tables and their FK relationships */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-semibold mb-4">Created Tables</h2>
        {tables.length === 0 ? (
          <p className="text-gray-600">No tables created yet.</p>
        ) : (
          tables.map((tbl) => (
            <div key={tbl.id} className="mb-6 border-b pb-4">
              <h3 className="text-xl font-bold">{tbl.name}</h3>
              <table className="w-full mt-2 border">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="px-3 py-2 border">Column</th>
                    <th className="px-3 py-2 border">Type</th>
                    <th className="px-3 py-2 border">Constraints</th>
                  </tr>
                </thead>
                <tbody>
                  {tbl.columns.map((col, idx) => (
                    <tr key={idx}>
                      <td className="px-3 py-2 border">{col.name}</td>
                      <td className="px-3 py-2 border">{col.type}</td>
                      <td className="px-3 py-2 border">
                        {col.isPrimaryKey && <span className="text-green-700 font-medium">PK </span>}
                        {col.isForeignKey && (
                          <span className="text-blue-700 font-medium">
                            FK ({col.referenceTable}.{col.referenceColumn}){" "}
                          </span>
                        )}
                        {col.isUnique && <span className="text-purple-700 font-medium">Unique </span>}
                        {col.isNotNull && <span className="text-red-700 font-medium">Not Null </span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default PKFKSimulator;
