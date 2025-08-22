import React, { useState } from 'react';

const VisionBoard = () => {
  // State to hold the vision board items
  const [items, setItems] = useState([]);
  // State for new item creation
  const [newItem, setNewItem] = useState({ title: '', description: '', image: '' });
  // State for editing an existing item
  const [editItem, setEditItem] = useState(null);

  // Handle input changes for new item
  const handleChange = (e) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };

  // Handle input changes for editing item
  const handleEditChange = (e) => {
    setEditItem({ ...editItem, [e.target.name]: e.target.value });
  };

  // Add new item
  const addItem = (e) => {
    e.preventDefault();
    const itemToAdd = { ...newItem, id: Date.now() };
    setItems([...items, itemToAdd]);
    setNewItem({ title: '', description: '', image: '' });
  };

  // Delete item by id
  const deleteItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  // Update existing item
  const updateItem = (e) => {
    e.preventDefault();
    setItems(items.map(item => item.id === editItem.id ? editItem : item));
    setEditItem(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Intern Vision Board</h1>
        <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
          Create your vision board on the go! Fill in the necessary details, save your visions, and manage them as you progress.
        </p>
      </header>

      {/* Create New Vision Item Tile */}
      <div className="max-w-2xl mx-auto mb-8">
        <form onSubmit={addItem} className="bg-white shadow-md rounded px-8 py-6">
          <h2 className="text-2xl font-semibold mb-4">Add New Vision</h2>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={newItem.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              placeholder="Enter your vision title"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Description</label>
            <textarea
              name="description"
              value={newItem.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              placeholder="Describe your vision"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Image URL (optional)</label>
            <input
              type="text"
              name="image"
              value={newItem.image}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              placeholder="Paste an image URL"
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
            Add Vision
          </button>
        </form>
      </div>

      {/* Vision Board Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {items.map(item => (
          <div key={item.id} className="bg-white shadow-md rounded-lg p-6">
            {item.image && (
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-40 object-cover rounded mb-4"
              />
            )}
            <h3 className="text-xl font-bold mb-2">{item.title}</h3>
            <p className="text-gray-700 mb-4">{item.description}</p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setEditItem(item)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-3 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => deleteItem(item.id)}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editItem && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-4">Edit Vision Item</h2>
            <form onSubmit={updateItem}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  name="title"
                  value={editItem.title}
                  onChange={handleEditChange}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Description</label>
                <textarea
                  name="description"
                  value={editItem.description}
                  onChange={handleEditChange}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Image URL (optional)</label>
                <input
                  type="text"
                  name="image"
                  value={editItem.image}
                  onChange={handleEditChange}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setEditItem(null)}
                  className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                >
                  Cancel
                </button>
                <button type="submit" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
                  Update Vision
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default VisionBoard;
