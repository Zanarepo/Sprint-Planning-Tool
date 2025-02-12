// UserResearchDashboard.jsx
import React, { useState } from 'react';
import { FaUser, FaEdit, FaTrash,FaPlus,  FaPrint } from 'react-icons/fa';
import UserResearchFeature from './UserResearchFeature'
// Sample initial entries (for demonstration purposes)
const initialEntries = [
  {
    id: 1,
    name: 'John Doe',
    age: '30',
    occupation: 'Software Engineer',
    location: 'San Francisco, CA',
    bio: 'Passionate about building user-centered applications.',
    personality: 'Introverted, Analytical',
    moreInfo: ['Enjoys hiking', 'Avid reader'],
    interests: ['Technology', 'Travel'],
    needs: ['Intuitive UI', 'Reliable performance'],
    goals: ['Career growth', 'Work-life balance'],
    motivations: ['Innovation', 'Problem solving'],
    painPoints: ['Poor documentation', 'Buggy software'],
    cardColor: '#E3F2FD',
  },
  {
    id: 2,
    name: 'Jane Smith',
    age: '27',
    occupation: 'Product Manager',
    location: 'New York, NY',
    bio: 'Focused on delivering delightful user experiences.',
    personality: 'Extroverted, Empathetic',
    moreInfo: ['Loves art', 'Food enthusiast'],
    interests: ['Design', 'Marketing'],
    needs: ['Clear communication', 'Efficient processes'],
    goals: ['Launch successful products', 'Team growth'],
    motivations: ['User feedback', 'Market trends'],
    painPoints: ['Misaligned priorities', 'Resource constraints'],
    cardColor: '#FFF3E0',
  },
];

// Default form data for a new entry
const defaultFormData = {
  name: '',
  age: '',
  occupation: '',
  location: '',
  bio: '',
  personality: '',
  moreInfo: [],
  interests: [],
  needs: [],
  goals: [],
  motivations: [],
  painPoints: [],
  cardColor: '#ffffff',
};

// Default temporary input values for list fields
const defaultListInputs = {
  moreInfo: '',
  interests: '',
  needs: '',
  goals: '',
  motivations: '',
  painPoints: '',
};

// Predefined color options for card backgrounds
const colorOptions = [
  { label: 'Blue', value: '#E3F2FD' },
  { label: 'Green', value: '#E8F5E9' },
  { label: 'Orange', value: '#FFF3E0' },
  { label: 'Gray', value: '#F5F5F5' },
  { label: 'White', value: '#ffffff' },
];

// Inline style objects
const containerStyle = {
  padding: '20px',
  fontFamily: 'Arial, sans-serif',
};

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '20px',
};

const buttonStyle = {
  cursor: 'pointer',
  border: 'none',
  background: 'none',
  fontSize: '1.2rem',
  marginRight: '10px',
};

const inputStyle = {
  width: '100%',
  padding: '8px',
  marginBottom: '10px',
  border: '1px solid #ccc',
  borderRadius: '4px',
};

const selectStyle = {
  ...inputStyle,
};

const addButtonStyle = {
  backgroundColor: 'green',
  color: 'white',
  border: 'none',
  padding: '5px 10px',
  borderRadius: '4px',
  margin: '5px 0',
  cursor: 'pointer',
};

const removeButtonStyle = {
  backgroundColor: 'red',
  color: 'white',
  border: 'none',
  padding: '5px 10px',
  borderRadius: '4px',
  margin: '5px 0',
  cursor: 'pointer',
};

const cardsContainerStyle = {
  display: 'flex',
  flexWrap: 'wrap',
};

const cardStyle = {
  width: '320px',
  borderRadius: '8px',
  padding: '15px',
  margin: '10px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
};

const modalOverlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0,0,0,0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,
};

const modalContentStyle = {
  background: '#fff',
  padding: '20px',
  borderRadius: '5px',
  width: '80%',
  maxHeight: '90%',
  overflowY: 'auto',
  border: '1px solid #ccc',
};

function UserResearchDashboard() {
  const [entries, setEntries] = useState(initialEntries);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState(null);
  const [formData, setFormData] = useState(defaultFormData);
  const [listInputs, setListInputs] = useState(defaultListInputs);

  // Open modal: load data if editing; otherwise, use default values
  const openModal = (entry = null) => {
    if (entry) {
      setEditingEntry(entry);
      setFormData(entry);
    } else {
      setEditingEntry(null);
      setFormData(defaultFormData);
    }
    setListInputs(defaultListInputs);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingEntry(null);
    setFormData(defaultFormData);
    setListInputs(defaultListInputs);
  };

  // Handle change for singular fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle change for dynamic list input fields
  const handleListInputChange = (key, value) => {
    setListInputs((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // Add a new item to a dynamic list field
  const addListItem = (key) => {
    if (listInputs[key].trim() !== '') {
      setFormData((prev) => ({
        ...prev,
        [key]: [...prev[key], listInputs[key].trim()],
      }));
      setListInputs((prev) => ({
        ...prev,
        [key]: '',
      }));
    }
  };

  // Remove an item from a dynamic list field
  const removeListItem = (key, index) => {
    setFormData((prev) => {
      const newArray = [...prev[key]];
      newArray.splice(index, 1);
      return { ...prev, [key]: newArray };
    });
  };

  // Before saving, add any leftover text in dynamic list inputs to their arrays.
  const handleSave = () => {
    let updatedFormData = { ...formData };
    Object.keys(listInputs).forEach((key) => {
      if (listInputs[key].trim() !== '') {
        updatedFormData[key] = [...updatedFormData[key], listInputs[key].trim()];
      }
    });

    if (editingEntry) {
      setEntries(
        entries.map((entry) =>
          entry.id === editingEntry.id ? { ...updatedFormData, id: editingEntry.id } : entry
        )
      );
    } else {
      setEntries([...entries, { ...updatedFormData, id: Date.now() }]);
    }
    closeModal();
  };

  // Delete an entry
  const handleDelete = (id) => {
    setEntries(entries.filter((entry) => entry.id !== id));
  };

  // Trigger the browser's print functionality
  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={containerStyle}>
      {/* Header */}
      <UserResearchFeature/>
      <div style={headerStyle}>
       
        {/* Header  <h2>User Persona Dashboard</h2>*/} 
        <div style={{ 
  display: 'flex', 
  justifyContent: 'space-between', 
  alignItems: 'center', 

  padding: '10px',
  width: '100%' 
}}>
  <button
    onClick={() => openModal()}
    title="Add New Persona"
    style={{
      backgroundColor: '#4caf50', // green for Add Persona
      color: '#fff',
      border: 'none',
      padding: '10px 10px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center'
    }}
  >
    <FaPlus  style={{ marginRight: '3px' }} /><FaUser  style={{ marginRight: '8px' }} />
    
  </button>
  <button
    onClick={handlePrint}
    title="Print Dashboard"
    style={{
      backgroundColor: '#2196f3', // blue for Print
      color: '#fff',
      border: 'none',
      padding: '10px 20px',
      cursor: 'pointer'
    }}
  >
    <FaPrint />
  </button>
</div>

      </div>

      {/* Cards Display */}
      <div style={cardsContainerStyle}>
        {entries.map((entry) => (
          <div key={entry.id} style={{ ...cardStyle, backgroundColor: entry.cardColor }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <FaUser size={24} style={{ marginRight: '10px' }} />
              <h3>{entry.name || 'No Name Provided'}</h3>
            </div>
            <p>
              <strong>Age:</strong> {entry.age}
            </p>
            <p>
              <strong>Occupation:</strong> {entry.occupation}
            </p>
            <p>
              <strong>Location:</strong> {entry.location}
            </p>
            <p>
              <strong>Bio:</strong> {entry.bio}
            </p>
            <p>
              <strong>Personality:</strong> {entry.personality}
            </p>
            {entry.moreInfo.length > 0 && (
              <div>
                <strong>More Info:</strong>
                <ul>
                  {entry.moreInfo.map((info, index) => (
                    <li key={index}>{info}</li>
                  ))}
                </ul>
              </div>
            )}
            {entry.interests.length > 0 && (
              <div>
                <strong>Interests:</strong>
                <ul>
                  {entry.interests.map((interest, index) => (
                    <li key={index}>{interest}</li>
                  ))}
                </ul>
              </div>
            )}
            {entry.needs.length > 0 && (
              <div>
                <strong>Needs &amp; Expectations:</strong>
                <ul>
                  {entry.needs.map((need, index) => (
                    <li key={index}>{need}</li>
                  ))}
                </ul>
              </div>
            )}
            {entry.goals.length > 0 && (
              <div>
                <strong>Goals:</strong>
                <ul>
                  {entry.goals.map((goal, index) => (
                    <li key={index}>{goal}</li>
                  ))}
                </ul>
              </div>
            )}
            {entry.motivations.length > 0 && (
              <div>
                <strong>Motivations:</strong>
                <ul>
                  {entry.motivations.map((motivation, index) => (
                    <li key={index}>{motivation}</li>
                  ))}
                </ul>
              </div>
            )}
            {entry.painPoints.length > 0 && (
              <div>
                <strong>Pain Points:</strong>
                <ul>
                  {entry.painPoints.map((pain, index) => (
                    <li key={index}>{pain}</li>
                  ))}
                </ul>
              </div>
            )}
            <div style={{ textAlign: 'right' }}>
              <button onClick={() => openModal(entry)} title="Edit Persona" style={buttonStyle}>
                <FaEdit />
              </button>
              <button onClick={() => handleDelete(entry.id)} title="Delete Persona" style={buttonStyle}>
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Adding/Editing an Entry */}
      {isModalOpen && (
        <div style={modalOverlayStyle}>
          <div style={modalContentStyle}>
            <h2>{editingEntry ? 'Edit Persona' : 'Add New Persona'}</h2>

            {/* Singular Fields */}
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              style={inputStyle}
               placeholder="E.g., Prince Zana"
            />

            <label>Age:</label>
            <input
              type="text"
              name="age"
              value={formData.age}
              onChange={handleChange}
              style={inputStyle}
               placeholder="E.g., 30"
            />

            <label>Occupation:</label>
            <input
              type="text"
              name="occupation"
              value={formData.occupation}
              onChange={handleChange}
              style={inputStyle}
               placeholder="E.g., Product Manager"
             
            />

            <label>Location:</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              style={inputStyle}
               placeholder="E.g., Calabar, Cross River State"
            />

            <label>Bio:</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              style={inputStyle}
               placeholder="E.g., A brief biography about yourself"
              rows="3"
            ></textarea>

            <label>Personality:</label>
            <input
              type="text"
              name="personality"
              value={formData.personality}
              onChange={handleChange}
              style={inputStyle}
              placeholder="E.g., Outgoing, analytical, detail-oriented"
            />

            {/* Dynamic List Fields */}

            {/* More Info */}
           
           
           


            {/* Interests */}
            <label>Interests:</label>
            <ul>
              {formData.interests.map((interest, index) => (
                <li key={index}>
                  {interest}{' '}
                  <button onClick={() => removeListItem('interests', index)} style={removeButtonStyle}>
                    Remove
                  </button>
                </li>
              ))}
            </ul>
            <input
              type="text"
              value={listInputs.interests}
              onChange={(e) => handleListInputChange('interests', e.target.value)}
              style={inputStyle}
               placeholder="E.g., traveling, music, photography"
            />
            <button onClick={() => addListItem('interests')} style={addButtonStyle}>
              + Interest
            </button><br></br> <br></br> 


            {/* Needs & Expectations */}
            <label>Needs &amp; Expectations:</label>
            <ul>
              {formData.needs.map((need, index) => (
                <li key={index}>
                  {need}{' '}
                  <button onClick={() => removeListItem('needs', index)} style={removeButtonStyle}>
                    Remove
                  </button>
                </li>
              ))}
            </ul>
            <input
              type="text"
              value={listInputs.needs}
              onChange={(e) => handleListInputChange('needs', e.target.value)}
              style={inputStyle}
              placeholder=" Fast response times, user-friendly interface" 
            />
            <button onClick={() => addListItem('needs')} style={addButtonStyle}>
              + Need
            </button><br></br> <br></br> 


            {/* Goals */}
            <label>Goals:</label>
            <ul>
              {formData.goals.map((goal, index) => (
                <li key={index}>
                  {goal}{' '}
                  <button onClick={() => removeListItem('goals', index)} style={removeButtonStyle}>
                    Remove
                  </button>
                </li>
              ))}
            </ul>
            <input
              type="text"
              value={listInputs.goals}
              onChange={(e) => handleListInputChange('goals', e.target.value)}
              style={inputStyle}
              placeholder="E.g: To  be able to simulate sprints on the go" 
            />
            <button onClick={() => addListItem('goals')} style={addButtonStyle}>
              + Goal
            </button><br></br> <br></br> 

            {/* Motivations */}
            <label>Motivations:</label>
            <ul>
              {formData.motivations.map((motivation, index) => (
                <li key={index}>
                  {motivation}{' '}
                  <button onClick={() => removeListItem('motivations', index)} style={removeButtonStyle}>
                    Remove
                  </button>
                </li>
              ))}
            </ul>
            <input
              type="text"
              value={listInputs.motivations}
              onChange={(e) => handleListInputChange('motivations', e.target.value)}
              style={inputStyle}
              placeholder="E.g. Passion for innovation, desire to learn new technologies"
            />
            <button onClick={() => addListItem('motivations')} style={addButtonStyle}>
              + Motivation
            </button><br></br> <br></br> 


            {/* Pain Points */}
            <label>Pain Points:</label>
            <ul>
              {formData.painPoints.map((pain, index) => (
                <li key={index}>
                  {pain}{' '}
                  <button onClick={() => removeListItem('painPoints', index)} style={removeButtonStyle}>
                    Remove
                  </button>
                </li>
              ))}
            </ul>
            <input
              type="text"
              value={listInputs.painPoints}
              onChange={(e) => handleListInputChange('painPoints', e.target.value)}
              style={inputStyle}
               placeholder="E.g., Difficulty navigating the interface, slow load times"
            />
            <button onClick={() => addListItem('painPoints')} style={addButtonStyle}>
              + Pain Point
            </button><br></br> <br></br> 


            {/* Card Background Color */}
            <label>Card Background Color:</label>
            <select
              name="cardColor"
              value={formData.cardColor}
              onChange={handleChange}
              style={selectStyle}
            >
              {colorOptions.map((color) => (
                <option key={color.value} value={color.value}>
                  {color.label}
                </option>
              ))}
            </select>

                    {/* Action Buttons */}
            <div style={{ textAlign: 'right', marginTop: '10px' }}>
            <button
            onClick={closeModal}
            style={{
                marginRight: '10px',
                backgroundColor: '#f44336', // red color for Cancel
                color: '#fff',
                border: 'none',
                padding: '10px 20px',
                cursor: 'pointer'
            }}
            >
            Cancel
            </button>
            <button
            onClick={handleSave}
            style={{
                backgroundColor: '#4caf50', // green color for Save
                color: '#fff',
                border: 'none',
                padding: '10px 20px',
                cursor: 'pointer'
            }}
            >
            Save
            </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

export default UserResearchDashboard;
