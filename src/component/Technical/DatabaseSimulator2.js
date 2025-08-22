import React, { useState } from "react";

// An initial structure for a new column definition
const initialColumn = {
  name: "",
  type: "text",
  isPrimaryKey: false,
  isForeignKey: false,
  isNotNull: false,
  isUnique: false,
  // For FK columns, the reference details:
  referenceTable: "",
  referenceColumn: "",
};

function DatabaseSimulator() {
  // Global state for created tables
  const [tables, setTables] = useState([]);
  // State for table creation form
  const [tableName, setTableName] = useState("");
  const [columns, setColumns] = useState([{ ...initialColumn }]);
  // State to manage which FK column (if any) is currently selecting its reference
  const [activeFKColumnIndex, setActiveFKColumnIndex] = useState(null);

  // Helper: Get list of available PK references from already created tables.
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

  // Handlers for column input list management
  const addColumnInput = () => {
    setColumns([...columns, { ...initialColumn }]);
  };

  const removeColumnInput = (index) => {
    setColumns(columns.filter((_, i) => i !== index));
  };

  const handleColumnChange = (index, field, value) => {
    const updated = columns.map((col, i) =>
      i === index ? { ...col, [field]: value } : col
    );
    setColumns(updated);
  };

  // Toggle a checkbox flag (PK, Unique, NotNull)
  const toggleColumnFlag = (index, flag) => {
    const updated = columns.map((col, i) => {
      if (i === index) {
        // For PK, enforce only one per table
        if (flag === "isPrimaryKey" && !col.isPrimaryKey) {
          return { ...col, isPrimaryKey: true };
        }
        return { ...col, [flag]: !col[flag] };
      }
      return col;
    });
    if (flag === "isPrimaryKey") {
      const pkIndex = updated.findIndex((c) => c.isPrimaryKey);
      setColumns(
        updated.map((c, i) => ({
          ...c,
          isPrimaryKey: i === pkIndex,
        }))
      );
    } else {
      setColumns(updated);
    }
  };

  // Toggle FK flag; when turned off, clear reference info.
  const handleFKToggle = (index) => {
    const updated = columns.map((col, i) => {
      if (i === index) {
        if (col.isForeignKey) {
          return { ...col, isForeignKey: false, referenceTable: "", referenceColumn: "" };
        } else {
          return { ...col, isForeignKey: true };
        }
      }
      return col;
    });
    setColumns(updated);
  };

  // When the FK modal reference is selected, update the column and close modal.
  const selectFKReference = (refTable, refColumn) => {
    if (activeFKColumnIndex !== null) {
      handleColumnChange(activeFKColumnIndex, "referenceTable", refTable);
      handleColumnChange(activeFKColumnIndex, "referenceColumn", refColumn);
      setActiveFKColumnIndex(null);
    }
  };

  // Save the new table. Validate table and column details.
  const saveTable = () => {
    if (!tableName.trim()) {
      alert("Please enter a table name.");
      return;
    }
    for (let col of columns) {
      if (!col.name.trim()) {
        alert("Please ensure all columns have names.");
        return;
      }
      if (col.isForeignKey && (!col.referenceTable || !col.referenceColumn)) {
        alert(
          `Foreign Key field "${col.name}" must reference a primary key from an existing table.`
        );
        return;
      }
    }

    const newTable = {
      id: Date.now(),
      name: tableName,
      columns,
      records: [],
    };

    setTables([...tables, newTable]);
    setTableName("");
    setColumns([{ ...initialColumn }]);
  };

  // Update table in global state (for record-level operations)
  const updateTable = (updatedTable) => {
    setTables(tables.map((tbl) => (tbl.id === updatedTable.id ? updatedTable : tbl)));
  };

  // Delete a table from global state.
  const deleteTable = (tableId) => {
    setTables(tables.filter((tbl) => tbl.id !== tableId));
  };

  // Simple explanation component for constraints
  const explanationText = () => (
    <div className="p-4 bg-blue-50 rounded mb-6">
      <h3 className="font-bold text-lg mb-2">Database Constraints Explanation</h3>
      <p>
        <strong>Primary Key (PK):</strong> A unique identifier for each record. Only one per table.
      </p>
      <p>
        <strong>Foreign Key (FK):</strong> A field that links to a primary key in another table, creating a relationship.
      </p>
      <p>
        <strong>Unique:</strong> Ensures all values in a column are distinct.
      </p>
      <p>
        <strong>Not Null:</strong> Ensures a column cannot have a NULL value.
      </p>
    </div>
  );

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">
        Database Simulator with PK &amp; FK
      </h1>
      {explanationText()}

      {/* Table Creation Form */}
      <div className="bg-white p-6 rounded shadow mb-8">
        <h2 className="text-2xl font-semibold mb-4">Create a New Table</h2>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Table Name:</label>
          <input
            type="text"
            value={tableName}
            onChange={(e) => setTableName(e.target.value)}
            placeholder="e.g., Users, Orders"
            className="w-full p-2 border rounded focus:outline-none focus:ring"
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
                    placeholder="e.g., id, username, order_date"
                    className="w-full p-2 border rounded focus:outline-none focus:ring"
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
                    FK Reference:
                  </p>
                  {col.referenceTable && col.referenceColumn ? (
                    <p className="text-sm">
                      Linked to: {col.referenceTable}.{col.referenceColumn}
                    </p>
                  ) : (
                    <p className="text-sm text-gray-500">No reference selected.</p>
                  )}
                  <button
                    onClick={() => setActiveFKColumnIndex(index)}
                    className="mt-2 px-3 py-1 bg-blue-500 text-white rounded text-sm"
                  >
                    Link Reference
                  </button>
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

      {/* FK Modal */}
      {activeFKColumnIndex !== null && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded p-6 w-80">
            <h3 className="text-xl font-bold mb-4">
              Select a PK Reference
            </h3>
            {getPossibleReferences().length > 0 ? (
              <ul>
                {getPossibleReferences().map((ref, idx) => (
                  <li key={idx}>
                    <button
                      onClick={() =>
                        selectFKReference(ref.table, ref.column)
                      }
                      className="w-full text-left px-3 py-2 hover:bg-blue-100 rounded"
                    >
                      {ref.table}.{ref.column}
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">
                No available PK references.
              </p>
            )}
            <button
              onClick={() => setActiveFKColumnIndex(null)}
              className="mt-4 px-4 py-2 bg-gray-500 text-white rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Display Created Tables with CRUD Operations */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Database Tables</h2>
        {tables.length === 0 ? (
          <p className="text-gray-600">No tables created yet.</p>
        ) : (
          tables.map((tbl) => (
            <TableSimulator
              key={tbl.id}
              table={tbl}
              globalTables={tables}
              updateTable={updateTable}
              deleteTable={deleteTable}
            />
          ))
        )}
      </div>
    </div>
  );
}

// Component to simulate CRUD operations for each table
function TableSimulator({ table, globalTables, updateTable, deleteTable }) {
  // State for adding a new record
  const initialRecordState = table.columns.reduce((acc, col) => {
    acc[col.name] = "";
    return acc;
  }, {});
  const [newRecord, setNewRecord] = useState({ ...initialRecordState });
  // State for editing an existing record (by id)
  const [editingRecordId, setEditingRecordId] = useState(null);
  const [editingRecordData, setEditingRecordData] = useState({});

  const handleAddRecord = () => {
    // Validate Not Null fields
    for (let col of table.columns) {
      if (col.isNotNull && !newRecord[col.name].toString().trim()) {
        alert(`Column "${col.name}" is Not Null and requires a value.`);
        return;
      }
    }
    const record = { ...newRecord, id: Date.now() };
    const updatedTable = { ...table, records: [...table.records, record] };
    updateTable(updatedTable);
    setNewRecord({ ...initialRecordState });
  };

  const startEditing = (record) => {
    setEditingRecordId(record.id);
    setEditingRecordData(record);
  };

  const handleEditChange = (field, value) => {
    setEditingRecordData({ ...editingRecordData, [field]: value });
  };

  const saveEdit = () => {
    for (let col of table.columns) {
      if (col.isNotNull && !editingRecordData[col.name].toString().trim()) {
        alert(`Column "${col.name}" is Not Null and requires a value.`);
        return;
      }
    }
    const updatedRecords = table.records.map((record) =>
      record.id === editingRecordId ? editingRecordData : record
    );
    updateTable({ ...table, records: updatedRecords });
    setEditingRecordId(null);
    setEditingRecordData({});
  };

  const cancelEdit = () => {
    setEditingRecordId(null);
    setEditingRecordData({});
  };

  const deleteRecord = (recordId) => {
    const updatedRecords = table.records.filter((r) => r.id !== recordId);
    updateTable({ ...table, records: updatedRecords });
  };

  // Helper: For FK columns, get available primary key options from the referenced table.
  const getFKOptions = (col) => {
    const refTable = globalTables.find((t) => t.name === col.referenceTable);
    if (refTable) {
      const pkColumn = refTable.columns.find((c) => c.isPrimaryKey);
      if (pkColumn) {
        return refTable.records.map((record) => record[pkColumn.name]);
      }
    }
    return [];
  };

  return (
    <div className="mb-8 bg-white p-6 rounded shadow">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold">{table.name}</h3>
        <button
          onClick={() => deleteTable(table.id)}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Delete Table
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border mb-4">
          <thead className="bg-gray-200">
            <tr>
              {table.columns.map((col, idx) => (
                <th key={idx} className="px-4 py-2 border">{col.name}</th>
              ))}
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {table.records.map((record) => (
              <tr key={record.id}>
                {table.columns.map((col, idx) => (
                  <td key={idx} className="px-4 py-2 border">
                    {editingRecordId === record.id ? (
                      col.isForeignKey ? (
                        <select
                          value={editingRecordData[col.name] || ""}
                          onChange={(e) =>
                            handleEditChange(col.name, e.target.value)
                          }
                          className="p-1 border rounded"
                        >
                          <option value="">-- Select --</option>
                          {getFKOptions(col).map((option, i) => (
                            <option key={i} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type="text"
                          value={editingRecordData[col.name] || ""}
                          onChange={(e) =>
                            handleEditChange(col.name, e.target.value)
                          }
                          className="p-1 border rounded"
                        />
                      )
                    ) : (
                      record[col.name]
                    )}
                  </td>
                ))}
                <td className="px-4 py-2 border">
                  {editingRecordId === record.id ? (
                    <>
                      <button
                        onClick={saveEdit}
                        className="px-2 py-1 bg-green-500 text-white rounded mr-2"
                      >
                        Save
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="px-2 py-1 bg-gray-500 text-white rounded"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => startEditing(record)}
                        className="px-2 py-1 bg-blue-500 text-white rounded mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteRecord(record.id)}
                        className="px-2 py-1 bg-red-500 text-white rounded"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
            {/* Row for adding a new record */}
            <tr>
              {table.columns.map((col, idx) => (
                <td key={idx} className="px-4 py-2 border">
                  {col.isForeignKey ? (
                    <select
                      value={newRecord[col.name] || ""}
                      onChange={(e) =>
                        setNewRecord({
                          ...newRecord,
                          [col.name]: e.target.value,
                        })
                      }
                      className="p-1 border rounded"
                    >
                      <option value="">-- Select --</option>
                      {getFKOptions(col).map((option, i) => (
                        <option key={i} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type="text"
                      placeholder={col.name}
                      value={newRecord[col.name] || ""}
                      onChange={(e) =>
                        setNewRecord({ ...newRecord, [col.name]: e.target.value })
                      }
                      className="p-1 border rounded"
                    />
                  )}
                </td>
              ))}
              <td className="px-4 py-2 border">
                <button
                  onClick={handleAddRecord}
                  className="px-2 py-1 bg-green-500 text-white rounded"
                >
                  Add Record
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DatabaseSimulator;
