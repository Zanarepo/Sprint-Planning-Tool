import React, { useState } from "react";

const initialColumn = { name: "", type: "text" };

function DatabaseSimulator() {
  // Database setup state
  const [databaseName, setDatabaseName] = useState("");
  const [databaseType, setDatabaseType] = useState("SQL");

  // Table/Collection creation state
  const [tables, setTables] = useState([]);
  const [newTableName, setNewTableName] = useState("");
  const [columns, setColumns] = useState([{ ...initialColumn }]);

  // Functions to manage dynamic column inputs
  const addColumnInput = () => {
    setColumns([...columns, { ...initialColumn }]);
  };

  const handleColumnChange = (index, field, value) => {
    const updatedColumns = columns.map((col, i) =>
      i === index ? { ...col, [field]: value } : col
    );
    setColumns(updatedColumns);
  };

  const removeColumnInput = (index) => {
    setColumns(columns.filter((_, i) => i !== index));
  };

  // Add new table/collection to the database
  const addTable = () => {
    if (!newTableName.trim() || columns.some((col) => !col.name.trim())) {
      alert("Please enter a table/collection name and valid field names.");
      return;
    }
    const newTable = {
      id: Date.now(),
      name: newTableName,
      columns,
      records: [],
    };
    setTables([...tables, newTable]);
    setNewTableName("");
    setColumns([{ ...initialColumn }]);
  };

  // Delete table/collection
  const deleteTable = (tableId) => {
    setTables(tables.filter((table) => table.id !== tableId));
  };

  // CRUD functions for records
  const addRecordToTable = (tableId, record) => {
    setTables(
      tables.map((table) =>
        table.id === tableId
          ? { ...table, records: [...table.records, record] }
          : table
      )
    );
  };

  const updateRecordInTable = (tableId, recordId, updatedRecord) => {
    setTables(
      tables.map((table) => {
        if (table.id === tableId) {
          const updatedRecords = table.records.map((record) =>
            record.id === recordId ? updatedRecord : record
          );
          return { ...table, records: updatedRecords };
        }
        return table;
      })
    );
  };

  const deleteRecordFromTable = (tableId, recordId) => {
    setTables(
      tables.map((table) => {
        if (table.id === tableId) {
          const updatedRecords = table.records.filter(
            (record) => record.id !== recordId
          );
          return { ...table, records: updatedRecords };
        }
        return table;
      })
    );
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      {/* Title */}
      <h1 className="text-3xl font-bold text-center mb-6">
        Database Simulator
      </h1>

      {/* Database Setup Section */}
      <div className="mb-8 bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-semibold mb-4">Database Setup</h2>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Database Name:</label>
          <input
            type="text"
            value={databaseName}
            onChange={(e) => setDatabaseName(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:ring"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Database Type:</label>
          <select
            value={databaseType}
            onChange={(e) => setDatabaseType(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:ring"
          >
            <option value="SQL">SQL</option>
            <option value="NoSQL">NoSQL</option>
          </select>
        </div>
      </div>

      {/* Table/Collection Creation Section */}
      <div className="mb-8 bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-semibold mb-4">
          Create a New {databaseType} Table/Collection
        </h2>
        <div className="mb-4">
          <label className="block mb-1 font-medium">
            Table/Collection Name:
          </label>
          <input
            type="text"
            value={newTableName}
            onChange={(e) => setNewTableName(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:ring"
          />
        </div>

        {/* Dynamic Fields Definition */}
        <div className="mb-4">
          <h3 className="font-medium mb-2">Define Fields:</h3>
          {columns.map((col, index) => (
            <div key={index} className="flex items-center mb-2 space-x-2">
              <input
                type="text"
                placeholder="Field Name"
                value={col.name}
                onChange={(e) =>
                  handleColumnChange(index, "name", e.target.value)
                }
                className="p-2 border rounded focus:outline-none focus:ring flex-1"
              />
              <select
                value={col.type}
                onChange={(e) =>
                  handleColumnChange(index, "type", e.target.value)
                }
                className="p-2 border rounded focus:outline-none focus:ring"
              >
                <option value="text">Text</option>
                <option value="number">Number</option>
                <option value="date">Date</option>
              </select>
              {columns.length > 1 && (
                <button
                  onClick={() => removeColumnInput(index)}
                  className="px-3 py-1 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              )}
            </div>
          ))}
          <button
            onClick={addColumnInput}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Add Field
          </button>
        </div>
        <button
          onClick={addTable}
          className="px-6 py-2 bg-green-500 text-white rounded"
        >
          Create Table/Collection
        </button>
      </div>

      {/* Display Created Tables/Collections */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">
          Database: {databaseName || "Unnamed"} ({databaseType})
        </h2>
        {tables.length === 0 ? (
          <p className="text-gray-600">No tables/collections created yet.</p>
        ) : (
          tables.map((table) => (
            <TableSimulator
              key={table.id}
              table={table}
              databaseType={databaseType}
              deleteTable={deleteTable}
              addRecord={addRecordToTable}
              updateRecord={updateRecordInTable}
              deleteRecord={deleteRecordFromTable}
            />
          ))
        )}
      </div>
    </div>
  );
}

// Component to simulate each table's CRUD operations
function TableSimulator({
  table,
  databaseType,
  deleteTable,
  addRecord,
  updateRecord,
  deleteRecord,
}) {
  // State for new record inputs
  const [newRecord, setNewRecord] = useState(() => {
    const initial = {};
    table.columns.forEach((col) => {
      initial[col.name] = "";
    });
    return initial;
  });

  // State for editing a record
  const [editingRecordId, setEditingRecordId] = useState(null);
  const [editingRecordData, setEditingRecordData] = useState({});

  const handleRecordChange = (field, value) => {
    setNewRecord({ ...newRecord, [field]: value });
  };

  const handleAddRecord = () => {
    // Create a record with a unique id (simulate primary key)
    const record = { ...newRecord, id: Date.now() };
    addRecord(table.id, record);
    // Reset the form for new record
    const reset = {};
    table.columns.forEach((col) => {
      reset[col.name] = "";
    });
    setNewRecord(reset);
  };

  const startEditing = (record) => {
    setEditingRecordId(record.id);
    setEditingRecordData(record);
  };

  const handleEditChange = (field, value) => {
    setEditingRecordData({ ...editingRecordData, [field]: value });
  };

  const saveEdit = () => {
    updateRecord(table.id, editingRecordId, editingRecordData);
    setEditingRecordId(null);
    setEditingRecordData({});
  };

  return (
    <div className="mb-8 bg-white p-6 rounded shadow">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">
          {table.name} ({databaseType})
        </h3>
        <button
          onClick={() => deleteTable(table.id)}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Delete Table
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border">
          <thead className="bg-gray-200">
            <tr>
              {table.columns.map((col, index) => (
                <th key={index} className="px-4 py-2 border">
                  {col.name}
                </th>
              ))}
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {table.records.map((record) => (
              <tr key={record.id}>
                {table.columns.map((col, index) => (
                  <td key={index} className="px-4 py-2 border">
                    {editingRecordId === record.id ? (
                      <input
                        type="text"
                        value={editingRecordData[col.name]}
                        onChange={(e) =>
                          handleEditChange(col.name, e.target.value)
                        }
                        className="p-1 border rounded"
                      />
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
                        onClick={() => setEditingRecordId(null)}
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
                        onClick={() => deleteRecord(table.id, record.id)}
                        className="px-2 py-1 bg-red-500 text-white rounded"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
            {/* Form row to add a new record */}
            <tr>
              {table.columns.map((col, index) => (
                <td key={index} className="px-4 py-2 border">
                  <input
                    type="text"
                    placeholder={col.name}
                    value={newRecord[col.name]}
                    onChange={(e) =>
                      handleRecordChange(col.name, e.target.value)
                    }
                    className="p-1 border rounded"
                  />
                </td>
              ))}
              <td className="px-4 py-2 border">
                <button
                  onClick={handleAddRecord}
                  className="px-2 py-1 bg-green-500 text-white rounded"
                >
                  Add
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
