// src/App.js
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  // Set your API base URL (ensure it ends with /mentees)
  const API_URL = 'https://menteebe.onrender.com/mentees';

  // States for mentees list, form data, editing mode.
  const [mentees, setMentees] = useState([]);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    fullname: '',
    password: ''
  });
  const [editingId, setEditingId] = useState(null);

  // Fetch all mentees when component mounts.
  useEffect(() => {
    fetchMentees();
  }, []);

  // Fetch mentees from the API.
  const fetchMentees = async () => {
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error('Failed to fetch mentees.');
      const data = await res.json();
      setMentees(data);
    } catch (err) {
      toast.error('Error fetching mentees');
      console.error(err);
    }
  };

  // Handle input changes in the form.
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit for creating or updating a mentee.
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      // Update operation.
      try {
        const res = await fetch(`${API_URL}/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        if (!res.ok) throw new Error('Update failed');
        toast.success('Mentee updated successfully!');
        setEditingId(null);
        setFormData({ username: '', email: '', fullname: '', password: '' });
        fetchMentees();
      } catch (err) {
        toast.error('Error updating mentee');
        console.error(err);
      }
    } else {
      // Create operation.
      try {
        const res = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        if (!res.ok) throw new Error('Creation failed');
        toast.success('Mentee created successfully!');
        setFormData({ username: '', email: '', fullname: '', password: '' });
        fetchMentees();
      } catch (err) {
        toast.error('Error creating mentee');
        console.error(err);
      }
    }
  };

  // Fill the form with existing mentee data for editing.
  const handleEdit = (mentee) => {
    setEditingId(mentee.id);
    setFormData({
      username: mentee.username,
      email: mentee.email,
      fullname: mentee.fullname,
      password: mentee.password // Note: In a production app, handle passwords securely.
    });
  };

  // Delete a mentee by ID.
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this mentee?')) {
      try {
        const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        if (!res.ok) throw new Error('Deletion failed');
        toast.success('Mentee deleted successfully!');
        fetchMentees();
      } catch (err) {
        toast.error('Error deleting mentee');
        console.error(err);
      }
    }
  };

  return (
    <div className="App">
      <h1>CRUD Simulation</h1>
      {/* Toast Container for notifications */}
      <ToastContainer position="top-right" autoClose={3000} />



      <form onSubmit={handleSubmit}>
        <input 
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input 
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input 
          type="text"
          name="fullname"
          placeholder="Full Name"
          value={formData.fullname}
          onChange={handleChange}
          required
        />
        <input 
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">
          {editingId ? 'Update Mentee' : 'Create Mentee'}
        </button>


      </form>

      <div className="mentees-list">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Full Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {mentees.length > 0 ? (
              mentees.map((mentee) => (
                <tr key={mentee.id}>
                  <td>{mentee.id}</td>
                  <td>{mentee.username}</td>
                  <td>{mentee.email}</td>
                  <td>{mentee.fullname}</td>
                  <td>
                    <button onClick={() => handleEdit(mentee)}>Edit</button>
                    <button onClick={() => handleDelete(mentee.id)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center' }}>
                  No mentees found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
