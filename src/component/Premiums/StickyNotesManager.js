import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '../../supabaseClient';
import Draggable from 'react-draggable';

const StickyNotesManager = () => {
  // Retrieve user email from localStorage
  const [userEmail, setUserEmail] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const email = localStorage.getItem('userEmail');
    if (email) {
      setUserEmail(email);
    }
  }, []);

  // Retrieve the user ID from the "users" table using the email
  useEffect(() => {
    const fetchUserId = async () => {
      if (userEmail) {
        const { data, error } = await supabase
          .from('users')
          .select('id')
          .eq('email', userEmail)
          .single();
        if (error) {
          console.error('Error fetching user ID:', error);
        } else {
          setUserId(data.id);
        }
      }
    };
    fetchUserId();
  }, [userEmail]);

  // Modal & loading/error state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Sticky notes and editing state
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);

  // Form data for create/update (no color field)
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    position_x: 0,
    position_y: 0,
    width: 200,
    height: 200,
    z_index: 1,
  });

  // Memoized fetchNotes function (depends on userId)
  const fetchNotes = useCallback(async () => {
    if (!userId) {
      setErrorMsg('User is not authenticated.');
      return;
    }
    setLoading(true);
    const { data, error } = await supabase
      .from('sticky_notes')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching notes:', error);
      setErrorMsg('Error fetching notes.');
    } else {
      setNotes(data);
      setErrorMsg('');
    }
    setLoading(false);
  }, [userId]);

  // Fetch notes once the user ID is available
  useEffect(() => {
    if (userId) {
      fetchNotes();
    }
  }, [userId, fetchNotes]);

  // Open the modal
  const openModal = () => {
    setErrorMsg('');
    setIsModalOpen(true);
  };

  // Close the modal and reset form
  const closeModal = () => {
    setIsModalOpen(false);
    setEditingNote(null);
    setFormData({
      title: '',
      content: '',
      position_x: 0,
      position_y: 0,
      width: 200,
      height: 200,
      z_index: 1,
    });
    setErrorMsg('');
  };

  // Handle changes in form inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle form submit for both creating and updating notes
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      setErrorMsg('User is not authenticated.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    if (editingNote) {
      // Update an existing note
      const { data, error } = await supabase
        .from('sticky_notes')
        .update({
          title: formData.title,
          content: formData.content,
          position_x: formData.position_x,
          position_y: formData.position_y,
          width: formData.width,
          height: formData.height,
          z_index: formData.z_index,
        })
        .eq('id', editingNote.id);

      if (error) {
        console.error('Error updating note:', error);
        setErrorMsg('Error updating note.');
      } else {
        console.log('Note updated:', data);
        fetchNotes();
        closeModal();
      }
    } else {
      // Create a new note
      const { data, error } = await supabase
        .from('sticky_notes')
        .insert([
          {
            user_id: userId, // use the retrieved user ID
            title: formData.title,
            content: formData.content,
            position_x: formData.position_x,
            position_y: formData.position_y,
            width: formData.width,
            height: formData.height,
            z_index: formData.z_index,
          },
        ]);

      if (error) {
        console.error('Error creating note:', error);
        setErrorMsg('Error creating note.');
      } else {
        console.log('Note created:', data);
        fetchNotes();
        closeModal();
      }
    }
    setLoading(false);
  };

  // Update note position after dragging stops
  const handleDragStop = async (note, e, data) => {
    // data.x and data.y are the new positions
    const { error } = await supabase
      .from('sticky_notes')
      .update({
        position_x: data.x,
        position_y: data.y,
      })
      .eq('id', note.id);

    if (error) {
      console.error('Error updating note position:', error);
      setErrorMsg('Error updating note position.');
    } else {
      // Refresh notes to reflect new positions
      fetchNotes();
    }
  };

  // Start editing an existing note
  const handleEdit = (note) => {
    setEditingNote(note);
    setFormData({
      title: note.title,
      content: note.content,
      position_x: note.position_x,
      position_y: note.position_y,
      width: note.width,
      height: note.height,
      z_index: note.z_index,
    });
    setErrorMsg('');
    setIsModalOpen(true);
  };

  // Delete a note
  const handleDelete = async (id) => {
    setLoading(true);
    const { error } = await supabase
      .from('sticky_notes')
      .delete()
      .eq('id', id);
    if (error) {
      console.error('Error deleting note:', error);
      setErrorMsg('Error deleting note.');
    } else {
      setErrorMsg('');
      fetchNotes();
    }
    setLoading(false);
  };

  return (
    <>
      {/* Floating "think" icon on the right-hand side */}
      <div className="fixed right-0 top-1/2 transform -translate-y-1/2 m-4 z-30">
        <button
          onClick={openModal}
          className="flex flex-col items-center bg-gray-200 p-3 rounded-full shadow hover:bg-gray-300 focus:outline-none"
        >
          <span role="img" aria-label="sticky note" className="text-2xl">
            📝
          </span>
          <span className="mt-1 text-sm font-medium">jotty</span>
        </button>
      </div>

      {/* Modal for adding/editing sticky notes */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-40">
          <div className="bg-white p-6 rounded shadow-lg max-w-md w-full relative">
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-2xl leading-none"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4">
              {editingNote ? 'Edit Note' : 'Add Note'}
            </h2>
            {errorMsg && <p className="text-red-500 mb-2">{errorMsg}</p>}
            <form onSubmit={handleSubmit}>
              <div className="mb-2">
                <label htmlFor="title" className="block text-sm font-medium mb-1">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full border p-1 rounded focus:outline-none"
                  required
                />
              </div>
              <div className="mb-2">
                <label htmlFor="content" className="block text-sm font-medium mb-1">
                  Content
                </label>
                <textarea
                  name="content"
                  id="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  className="w-full border p-1 rounded focus:outline-none"
                  rows="3"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                disabled={loading}
              >
                {loading
                  ? 'Processing...'
                  : editingNote
                  ? 'Update Note'
                  : 'Add Note'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Display sticky notes list */}
      <div className="mt-4 p-4">
        {loading && <p>Loading notes...</p>}
        {!loading && notes.length === 0 && (
          <p className="text-gray-500 text-sm">No notes available.</p>
        )}
        <div className="space-y-3">
          {notes.map((note) => (
            // Wrap each note in a Draggable component
            <Draggable
              key={note.id}
              defaultPosition={{ x: note.position_x, y: note.position_y }}
              onStop={(e, data) => handleDragStop(note, e, data)}
            >
              <div
                className="p-3 rounded shadow cursor-move"
                style={{
                  backgroundColor: '#ffeb3b', // default display color
                  width: note.width,
                  height: note.height,
                }}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold">{note.title}</h4>
                    <p className="text-sm">{note.content}</p>
                  </div>
                  <div className="flex flex-col space-y-1 ml-2">
                    <button
                      onClick={() => handleEdit(note)}
                      className="text-blue-500 text-xs hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(note.id)}
                      className="text-red-500 text-xs hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </Draggable>
          ))}
        </div>
      </div>
    </>
  );
};

export default StickyNotesManager;
