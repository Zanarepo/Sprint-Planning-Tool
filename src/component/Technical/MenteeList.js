import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const MenteeList = ({ fetchMentees }) => {
  const [filter, setFilter] = useState({ fullname: '', email: '' });
  const [mentees, setMentees] = useState([]);
  const [editingMentee, setEditingMentee] = useState(null);
  const [updatedMentee, setUpdatedMentee] = useState({ fullname: '', email: '' });
  const [newMentee, setNewMentee] = useState({ username: '', fullname: '', email: '', password: '' });
  const [showAddMenteeModal, setShowAddMenteeModal] = useState(false);
  const [showEditMenteeModal, setShowEditMenteeModal] = useState(false);

  // Fetch mentees based on the filter
  const fetchFilteredMentees = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/mentees", {
        params: filter, // Send the filter as query params
      });
      setMentees(response.data.mentees);
    } catch (error) {
      console.error("Error fetching mentees:", error);
    }
  }, [filter]); // Only recreate when `filter` changes

  // Handle filter input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilter((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle delete mentee
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/mentees/${id}`);
      toast.success("Mentee deleted successfully!");
      fetchFilteredMentees(); // Refresh the filtered list
    } catch (error) {
      toast.error("Error deleting mentee!");
      console.error("Error deleting mentee:", error);
    }
  };

  // Handle filter submit
  const handleFilterSubmit = (e) => {
    e.preventDefault();
    fetchFilteredMentees();
  };

  // Handle edit mentee button click
  const handleEdit = (mentee) => {
    setEditingMentee(mentee);
    setUpdatedMentee({ fullname: mentee.fullname, email: mentee.email });
    setShowEditMenteeModal(true); // Show edit modal
  };

  // Handle update mentee
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/mentees/${editingMentee.id}`, updatedMentee);
      toast.success("Mentee updated successfully!");
      setShowEditMenteeModal(false); // Close the edit modal
      fetchFilteredMentees(); // Refresh the list
    } catch (error) {
      toast.error("Error updating mentee!");
      console.error("Error updating mentee:", error);
    }
  };

  // Handle add mentee button click
  const handleAddMentee = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/mentees', newMentee);
      toast.success("Mentee added successfully!");
      setShowAddMenteeModal(false); // Close the add modal
      fetchFilteredMentees(); // Refresh the list
      setNewMentee({ username: '', fullname: '', email: '', password: '' }); // Reset form
    } catch (error) {
      toast.error("Error adding mentee!");
      console.error("Error adding mentee:", error);
    }
  };

  
  useEffect(() => {
    fetchFilteredMentees();
  }, [fetchFilteredMentees]);  // Now it's a stable dependency










  
  return (
    <div className="p-6 bg-white shadow-lg rounded-lg max-w-4xl mx-auto mt-8">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Filter Mentees</h2>

      {/* Filter Form */}
      <form onSubmit={handleFilterSubmit} className="mb-6">
        <div className="flex space-x-4">
          <input
            type="text"
            name="fullname"
            value={filter.fullname}
            onChange={handleInputChange}
            placeholder="Search by Full Name"
            className="px-4 py-2 border rounded-md w-full"
          />
          <input
            type="email"
            name="email"
            value={filter.email}
            onChange={handleInputChange}
            placeholder="Search by Email"
            className="px-4 py-2 border rounded-md w-full"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Search
          </button>
        </div>
      </form>

      {/* Add Mentee Button */}
      <div className="mb-6">
        <button
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          onClick={() => setShowAddMenteeModal(true)} // Open Add Mentee Modal
        >
          Add New Mentee
        </button>
      </div>

      {/* Mentee List */}
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">All Mentees</h2>
      <ul className="space-y-6">
        {mentees.map((mentee) => (
          <li key={mentee.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg shadow-sm hover:bg-gray-100 transition duration-200 ease-in-out">
            <div>
              <p className="text-lg font-medium text-gray-800">{mentee.fullname}</p>
              <p className="text-sm text-gray-600">{mentee.username}</p>
              <p className="text-sm text-gray-500">{mentee.email}</p>
            </div>
            <div className="space-x-4">
              <button
                onClick={() => handleEdit(mentee)}
                className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition duration-200 ease-in-out"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(mentee.id)}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-200 ease-in-out"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Add Mentee Modal */}
      {showAddMenteeModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-xl w-full">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Add Mentee</h2>
            <form onSubmit={handleAddMentee}>
              <div className="flex flex-col space-y-4">
                <input
                  type="text"
                  name="username"
                  value={newMentee.username}
                  onChange={(e) => setNewMentee({ ...newMentee, username: e.target.value })}
                  className="px-4 py-2 border rounded-md"
                  placeholder="Username"
                  required
                />
                <input
                  type="text"
                  name="fullname"
                  value={newMentee.fullname}
                  onChange={(e) => setNewMentee({ ...newMentee, fullname: e.target.value })}
                  className="px-4 py-2 border rounded-md"
                  placeholder="Full Name"
                  required
                />
                <input
                  type="email"
                  name="email"
                  value={newMentee.email}
                  onChange={(e) => setNewMentee({ ...newMentee, email: e.target.value })}
                  className="px-4 py-2 border rounded-md"
                  placeholder="Email"
                  required
                />
                <input
                  type="password"
                  name="password"
                  value={newMentee.password}
                  onChange={(e) => setNewMentee({ ...newMentee, password: e.target.value })}
                  className="px-4 py-2 border rounded-md"
                  placeholder="Password"
                  required
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Add Mentee
                </button>
              </div>
            </form>
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowAddMenteeModal(false)}
            >
              &times;
            </button>
          </div>
        </div>
      )}

      {/* Edit Mentee Modal */}
      {showEditMenteeModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-xl w-full">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Edit Mentee</h2>
            <form onSubmit={handleUpdate}>
              <div className="flex flex-col space-y-4">
                <input
                  type="text"
                  name="fullname"
                  value={updatedMentee.fullname}
                  onChange={(e) => setUpdatedMentee({ ...updatedMentee, fullname: e.target.value })}
                  className="px-4 py-2 border rounded-md"
                  placeholder="Full Name"
                  required
                />
                <input
                  type="email"
                  name="email"
                  value={updatedMentee.email}
                  onChange={(e) => setUpdatedMentee({ ...updatedMentee, email: e.target.value })}
                  className="px-4 py-2 border rounded-md"
                  placeholder="Email"
                  required
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Update
                </button>
              </div>
            </form>
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowEditMenteeModal(false)}
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenteeList;
