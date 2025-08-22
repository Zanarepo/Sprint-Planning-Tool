// InventoryManagerResponsive.jsx
import React, { useState } from 'react';

export default function InventoryManagerResponsive() {
  // State for new entry fields
  const [item, setItem] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  
  // State for storing entries
  const [entries, setEntries] = useState([]);

  // State for editing
  const [editIndex, setEditIndex] = useState(-1);
  const [editItem, setEditItem] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [editQuantity, setEditQuantity] = useState("");

  // Add new entry
  const handleAddEntry = (e) => {
    e.preventDefault();
    const p = parseFloat(price);
    const q = parseInt(quantity, 10);
    if (isNaN(p) || isNaN(q)) {
      alert("Please enter valid numbers for price and quantity.");
      return;
    }
    const newEntry = {
      item,
      price: p.toFixed(2),
      quantity: q,
      amount: (p * q).toFixed(2),
      dateTime: new Date().toLocaleString()
    };
    setEntries([...entries, newEntry]);
    setItem(""); setPrice(""); setQuantity("");
  };

  // Delete an entry
  const handleDelete = (index) => {
    setEntries(entries.filter((_, i) => i !== index));
  };

  // Begin editing an entry
  const handleEdit = (index) => {
    setEditIndex(index);
    setEditItem(entries[index].item);
    setEditPrice(entries[index].price);
    setEditQuantity(entries[index].quantity);
  };

  // Save the updated entry
  const handleUpdate = (index) => {
    const p = parseFloat(editPrice);
    const q = parseInt(editQuantity, 10);
    if (isNaN(p) || isNaN(q)) {
      alert("Please enter valid numbers for price and quantity.");
      return;
    }
    const updatedEntry = {
      item: editItem,
      price: p.toFixed(2),
      quantity: q,
      amount: (p * q).toFixed(2),
      dateTime: entries[index].dateTime
    };
    setEntries(entries.map((entry, i) => (i === index ? updatedEntry : entry)));
    setEditIndex(-1);
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditIndex(-1);
  };

  // ------------------ Table View for Desktop (md and up) ------------------
  const renderTableView = () => (
    <div className="overflow-x-auto hidden md:block">
      <table className="min-w-[700px] bg-white">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-3 px-4 text-left border-r border-gray-300 whitespace-nowrap">Item</th>
            <th className="py-3 px-4 text-left border-r border-gray-300 whitespace-nowrap">Price</th>
            <th className="py-3 px-4 text-left border-r border-gray-300 whitespace-nowrap">Quantity</th>
            <th className="py-3 px-4 text-left border-r border-gray-300 whitespace-nowrap">Amount</th>
            <th className="py-3 px-4 text-left border-r border-gray-300 whitespace-nowrap">Date & Time</th>
            <th className="py-3 px-4 text-center whitespace-nowrap">Actions</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, index) => (
            <tr key={index} className="border-b border-gray-300">
              {editIndex === index ? (
                <>
                  <td className="py-2 px-4 border-r border-gray-300 whitespace-nowrap">
                    <input
                      type="text"
                      value={editItem}
                      onChange={(e) => setEditItem(e.target.value)}
                      className="w-full p-1 border rounded focus:outline-none"
                    />
                  </td>
                  <td className="py-2 px-4 border-r border-gray-300 whitespace-nowrap">
                    <input
                      type="number"
                      step="0.01"
                      value={editPrice}
                      onChange={(e) => setEditPrice(e.target.value)}
                      className="w-full p-1 border rounded focus:outline-none"
                    />
                  </td>
                  <td className="py-2 px-4 border-r border-gray-300 whitespace-nowrap">
                    <input
                      type="number"
                      value={editQuantity}
                      onChange={(e) => setEditQuantity(e.target.value)}
                      className="w-full p-1 border rounded focus:outline-none"
                    />
                  </td>
                  <td className="py-2 px-4 border-r border-gray-300 whitespace-nowrap">
                    ${(parseFloat(editPrice) * parseInt(editQuantity, 10) || 0).toFixed(2)}
                  </td>
                  <td className="py-2 px-4 border-r border-gray-300 whitespace-nowrap">
                    {entry.dateTime}
                  </td>
                  <td className="py-2 px-4 text-center whitespace-nowrap space-x-2">
                    <button
                      onClick={() => handleUpdate(index)}
                      className="px-2 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="px-2 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
                    >
                      Cancel
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td className="py-2 px-4 border-r border-gray-300 whitespace-nowrap">{entry.item}</td>
                  <td className="py-2 px-4 border-r border-gray-300 whitespace-nowrap">${entry.price}</td>
                  <td className="py-2 px-4 border-r border-gray-300 whitespace-nowrap">{entry.quantity}</td>
                  <td className="py-2 px-4 border-r border-gray-300 whitespace-nowrap">${entry.amount}</td>
                  <td className="py-2 px-4 border-r border-gray-300 whitespace-nowrap">{entry.dateTime}</td>
                  <td className="py-2 px-4 text-center whitespace-nowrap space-x-2">
                    <button
                      onClick={() => handleEdit(index)}
                      className="px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                    >
                      Delete
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  // ------------------ Card View for Mobile (smaller screens) ------------------
  const renderCardView = () => (
    <div className="block md:hidden space-y-4">
      {entries.map((entry, index) => (
        <div key={index} className="bg-white p-4 rounded shadow">
          {editIndex === index ? (
            <>
              <div className="mb-2">
                <label className="block text-gray-700 font-medium">Item:</label>
                <input
                  type="text"
                  value={editItem}
                  onChange={(e) => setEditItem(e.target.value)}
                  className="w-full p-2 border rounded focus:outline-none focus:ring"
                />
              </div>
              <div className="mb-2">
                <label className="block text-gray-700 font-medium">Price:</label>
                <input
                  type="number"
                  step="0.01"
                  value={editPrice}
                  onChange={(e) => setEditPrice(e.target.value)}
                  className="w-full p-2 border rounded focus:outline-none focus:ring"
                />
              </div>
              <div className="mb-2">
                <label className="block text-gray-700 font-medium">Quantity:</label>
                <input
                  type="number"
                  value={editQuantity}
                  onChange={(e) => setEditQuantity(e.target.value)}
                  className="w-full p-2 border rounded focus:outline-none focus:ring"
                />
              </div>
              <div className="mb-2">
                <p className="text-gray-700 font-medium">
                  Amount: ${ (parseFloat(editPrice) * parseInt(editQuantity, 10) || 0).toFixed(2) }
                </p>
              </div>
              <div className="mb-2">
                <p className="text-gray-700 font-medium">Date & Time: {entry.dateTime}</p>
              </div>
              <div className="flex flex-wrap justify-between">
                <button
                  onClick={() => handleUpdate(index)}
                  className="flex-1 m-1 px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                >
                  Save
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="flex-1 m-1 px-3 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="mb-2">
                <p className="text-gray-800">
                  <strong>Item:</strong> {entry.item}
                </p>
              </div>
              <div className="mb-2">
                <p className="text-gray-800">
                  <strong>Price:</strong> ${entry.price}
                </p>
              </div>
              <div className="mb-2">
                <p className="text-gray-800">
                  <strong>Quantity:</strong> {entry.quantity}
                </p>
              </div>
              <div className="mb-2">
                <p className="text-gray-800">
                  <strong>Amount:</strong> ${entry.amount}
                </p>
              </div>
              <div className="mb-2">
                <p className="text-gray-800">
                  <strong>Date & Time:</strong> {entry.dateTime}
                </p>
              </div>
              <div className="flex flex-wrap justify-between">
                <button
                  onClick={() => handleEdit(index)}
                  className="flex-1 m-1 px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className="flex-1 m-1 px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen w-full bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Inventory Manager</h1>
      
      {/* New Entry Form */}
      <form onSubmit={handleAddEntry} className="bg-white p-6 rounded shadow mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div>
            <label className="block text-gray-700 mb-1">Item</label>
            <input
              type="text"
              value={item}
              onChange={(e) => setItem(e.target.value)}
              placeholder="Item Name"
              className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Price</label>
            <input
              type="number"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price"
              className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Quantity</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="Quantity"
              className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>
          <div className="flex items-end">
            <button 
              type="submit" 
              className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition-colors"
            >
              Add Entry
            </button>
          </div>
        </div>
      </form>
      
      {/* Desktop Table View */}
      {renderTableView()}
      
      {/* Mobile Card View */}
      {renderCardView()}
    </div>
  );
}
