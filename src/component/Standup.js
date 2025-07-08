
import React, { useState, useEffect } from "react";
import DailystandupFeature from "./DailystandupFeature";
import { supabase } from "../supabaseClient";

export default function CollaborativeStandup() {
  // State for current (unsaved) session entries
  const [standups, setStandups] = useState([]);
  const [newStandup, setNewStandup] = useState({
    person: "",
    update: "",
    successes: "",
    challenges: "",
    blockers: "",
  });
  // Object to store inline edits: { [entryId]: { ...editedValues } }
  const [editEntries, setEditEntries] = useState({});

  // User and session states
  const [, setUserEmail] = useState("");
  const [userId, setUserId] = useState(null);
  const [sessionName, setSessionName] = useState("");
  const [sessions, setSessions] = useState([]); // list of saved sessions

  // Retrieve user email from localStorage and fetch user id from Supabase
  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (email) {
      setUserEmail(email);
      console.debug("User email found in localStorage:", email);
      const fetchUserId = async () => {
        const { data, error } = await supabase
          .from("users")
          .select("id")
          .eq("email", email)
          .single();
        if (error) {
          console.error("Error fetching user id:", error);
        } else if (data) {
          setUserId(data.id);
        }
      };
      fetchUserId();
    } else {
      console.debug("No user email found in localStorage.");
    }
  }, []);

  // Fetch saved sessions for the logged-in user
  useEffect(() => {
    const fetchSessions = async () => {
      if (userId) {
        const { data, error } = await supabase
          .from("daily_standup_sessions")
          .select("*")
          .eq("user_id", userId);
        if (error) {
          console.error("Error fetching sessions:", error);
        } else {
          setSessions(data);
        }
      }
    };
    fetchSessions();
  }, [userId]);

  // Handle changes for the new entry form
  const handleNewChange = (field, value) => {
    setNewStandup((prev) => ({ ...prev, [field]: value }));
  };

  // Add a new standup entry to the current session (local state)
  const handleAddNewEntry = (e) => {
    e.preventDefault();
    if (!newStandup.person.trim() || !newStandup.update.trim()) {
      alert("Please fill in the required fields.");
      return;
    }
    const entry = {
      ...newStandup,
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
    };
    setStandups((prev) => [...prev, entry]);
    setNewStandup({
      person: "",
      update: "",
      successes: "",
      challenges: "",
      blockers: "",
    });
  };

  // Begin inline editing for an entry by saving its data in editEntries
  const startEditing = (entry) => {
    setEditEntries((prev) => ({
      ...prev,
      [entry.id]: { ...entry },
    }));
  };

  // Handle changes in the inline edit fields
  const handleEditChange = (id, field, value) => {
    setEditEntries((prev) => ({
      ...prev,
      [id]: { ...prev[id], [field]: value },
    }));
  };

  // Cancel inline editing for an entry
  const cancelEditing = (id) => {
    setEditEntries((prev) => {
      const newEditEntries = { ...prev };
      delete newEditEntries[id];
      return newEditEntries;
    });
  };

  // Save the edited entry and update its timestamp
  const saveEditing = (id) => {
    setStandups((prev) =>
      prev.map((entry) =>
        entry.id === id
          ? { ...editEntries[id], timestamp: new Date().toISOString() }
          : entry
      )
    );
    cancelEditing(id);
  };

  // Delete an entry from the current session
  const handleDelete = (id) => {
    setStandups((prev) => prev.filter((entry) => entry.id !== id));
    cancelEditing(id);
  };

  // Dashboard counts based on current session entries
  const successCount = standups.filter(
    (entry) => entry.successes && entry.successes.trim() !== ""
  ).length;
  const challengeCount = standups.filter(
    (entry) => entry.challenges && entry.challenges.trim() !== ""
  ).length;
  const blockerCount = standups.filter(
    (entry) => entry.blockers && entry.blockers.trim() !== ""
  ).length;

  // Save the current session (all current entries) as a unique session in the database
  // Map "update" (UI) to DB field "today_focus"
  const handleSaveSession = async () => {
    if (!sessionName.trim()) {
      alert("Please provide a session name.");
      return;
    }
    if (!userId) {
      alert("User not identified.");
      return;
    }
    const dbEntries = standups.map((entry) => ({
      person: entry.person,
      today_focus: entry.update,
      successes: entry.successes,
      challenges: entry.challenges,
      blockers: entry.blockers,
      timestamp: entry.timestamp,
    }));
    const sessionData = {
      user_id: userId,
      session_name: sessionName,
      entries: dbEntries,
    };
    const { error } = await supabase
      .from("daily_standup_sessions")
      .insert([sessionData]);
    if (error) {
      console.error("Error saving session:", error);
      alert("Error saving session. Please try again.");
    } else {
      alert("Session saved successfully!");
      setStandups([]);
      setSessionName("");
      // Refresh the sessions list
      const { data: sessionsData, error: sessionsError } = await supabase
        .from("daily_standup_sessions")
        .select("*")
        .eq("user_id", userId);
      if (sessionsError) {
        console.error("Error fetching sessions:", sessionsError);
      } else {
        setSessions(sessionsData);
      }
    }
  };

  // Delete an entire saved session from the database
  const handleDeleteSession = async (id) => {
    if (window.confirm("Are you sure you want to delete this session?")) {
      const { error } = await supabase
        .from("daily_standup_sessions")
        .delete()
        .eq("id", id);
      if (error) {
        console.error("Error deleting session:", error);
        alert("Error deleting session. Please try again.");
      } else {
        // Refresh sessions list
        const { data: sessionsData, error: sessionsError } = await supabase
          .from("daily_standup_sessions")
          .select("*")
          .eq("user_id", userId);
        if (sessionsError) {
          console.error("Error fetching sessions:", sessionsError);
        } else {
          setSessions(sessionsData);
        }
      }
    }
  };

  // Print current session
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8 mt-16">
      {/* Header */}
      <DailystandupFeature />
      <header className="bg-blue-50 p-4 rounded-lg text-center">
        <h1 className="text-2xl font-bold">Daily Standup Dashboard</h1>
      </header>

      {/* New Entry Form */}
      <form
        onSubmit={handleAddNewEntry}
        className="bg-white p-6 rounded-lg shadow-md space-y-6"
      >
        <h2 className="text-xl font-semibold">Add New Entry</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Team Member
            </label>
            <input
              type="text"
              value={newStandup.person}
              onChange={(e) => handleNewChange("person", e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Name"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Today's Focus
            </label>
            <input
              type="text"
              value={newStandup.update}
              onChange={(e) => handleNewChange("update", e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="What are you working on?"
              required
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Successes 🎉
            </label>
            <textarea
              value={newStandup.successes}
              onChange={(e) => handleNewChange("successes", e.target.value)}
              className="w-full p-2 border rounded h-20"
              placeholder="Wins or accomplishments"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Challenges ⚠️
            </label>
            <textarea
              value={newStandup.challenges}
              onChange={(e) => handleNewChange("challenges", e.target.value)}
              className="w-full p-2 border rounded h-20"
              placeholder="Issues or challenges"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Blockers 🚧
            </label>
            <textarea
              value={newStandup.blockers}
              onChange={(e) => handleNewChange("blockers", e.target.value)}
              className="w-full p-2 border rounded h-20"
              placeholder="Any blockers?"
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Add Entry
        </button>
      </form>

      {/* Save Session Form */}
      <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
        <h2 className="text-xl font-semibold">Save Current Session</h2>
        <input
          type="text"
          value={sessionName}
          onChange={(e) => setSessionName(e.target.value)}
          placeholder="Session Name"
          className="border p-2 rounded w-full"
          required
        />
        <div className="flex gap-4">
          <button
            onClick={handleSaveSession}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Save Session
          </button>
          <button
            onClick={handlePrint}
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
          >
            Print Session
          </button>
        </div>
      </div>

      {/* Dashboard Display Board for current session */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-green-200 p-4 rounded-lg text-center">
          <h2 className="text-xl font-bold text-green-800">Successes</h2>
          <p className="text-3xl">{successCount}</p>
        </div>
        <div className="bg-yellow-200 p-4 rounded-lg text-center">
          <h2 className="text-xl font-bold text-yellow-800">Challenges</h2>
          <p className="text-3xl">{challengeCount}</p>
        </div>
        <div className="bg-red-200 p-4 rounded-lg text-center">
          <h2 className="text-xl font-bold text-red-800">Blockers</h2>
          <p className="text-3xl">{blockerCount}</p>
        </div>
      </div>

      {/* Standup Entries Table for current session */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 border">Team Member</th>
              <th className="px-4 py-2 border">Focus</th>
              <th className="px-4 py-2 border">Successes</th>
              <th className="px-4 py-2 border">Challenges</th>
              <th className="px-4 py-2 border">Blockers</th>
              <th className="px-4 py-2 border">Timestamp</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {standups.map((entry) => {
              const isEditing = editEntries[entry.id] !== undefined;
              return (
                <tr key={entry.id} className="hover:bg-gray-100">
                  <td className="px-4 py-2 border">
                    {isEditing ? (
                      <input
                        type="text"
                        value={editEntries[entry.id].person}
                        onChange={(e) =>
                          handleEditChange(entry.id, "person", e.target.value)
                        }
                        className="w-full p-1 border rounded"
                      />
                    ) : (
                      entry.person
                    )}
                  </td>
                  <td className="px-4 py-2 border">
                    {isEditing ? (
                      <input
                        type="text"
                        value={editEntries[entry.id].update}
                        onChange={(e) =>
                          handleEditChange(entry.id, "update", e.target.value)
                        }
                        className="w-full p-1 border rounded"
                      />
                    ) : (
                      entry.update
                    )}
                  </td>
                  <td className="px-4 py-2 border">
                    {isEditing ? (
                      <textarea
                        value={editEntries[entry.id].successes}
                        onChange={(e) =>
                          handleEditChange(entry.id, "successes", e.target.value)
                        }
                        className="w-full p-1 border rounded"
                      />
                    ) : (
                      entry.successes
                    )}
                  </td>
                  <td className="px-4 py-2 border">
                    {isEditing ? (
                      <textarea
                        value={editEntries[entry.id].challenges}
                        onChange={(e) =>
                          handleEditChange(entry.id, "challenges", e.target.value)
                        }
                        className="w-full p-1 border rounded"
                      />
                    ) : (
                      entry.challenges
                    )}
                  </td>
                  <td className="px-4 py-2 border">
                    {isEditing ? (
                      <textarea
                        value={editEntries[entry.id].blockers}
                        onChange={(e) =>
                          handleEditChange(entry.id, "blockers", e.target.value)
                        }
                        className="w-full p-1 border rounded"
                      />
                    ) : (
                      entry.blockers
                    )}
                  </td>
                  <td className="px-4 py-2 border text-sm">
                    {new Date(entry.timestamp).toLocaleTimeString()}
                  </td>
                  <td className="px-4 py-2 border">
                    {isEditing ? (
                      <>
                        <button
                          onClick={() => saveEditing(entry.id)}
                          className="text-green-600 hover:text-green-800 mr-2"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => cancelEditing(entry.id)}
                          className="text-gray-600 hover:text-gray-800"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => startEditing(entry)}
                          className="text-blue-600 hover:text-blue-800 mr-2"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(entry.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Saved Sessions List */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Saved Sessions</h2>
        {sessions.length === 0 ? (
          <p>No saved sessions found.</p>
        ) : (
          <ul className="space-y-4">
            {sessions.map((session) => (
              <li key={session.id} className="border p-4 rounded">
                <h3 className="font-bold text-lg">{session.session_name}</h3>
                <p className="text-sm text-gray-600">
                  Created: {new Date(session.created_at).toLocaleString()}
                </p>
                {/* Display the table content of the session */}
                {session.entries && session.entries.length > 0 && (
                  <div className="overflow-x-auto mt-2">
                    <table className="min-w-full table-auto border-collapse text-sm">
                      <thead>
                        <tr className="bg-gray-200">
                          <th className="px-4 py-2 border">Team Member</th>
                          <th className="px-4 py-2 border">Focus</th>
                          <th className="px-4 py-2 border">Successes</th>
                          <th className="px-4 py-2 border">Challenges</th>
                          <th className="px-4 py-2 border">Blockers</th>
                          <th className="px-4 py-2 border">Timestamp</th>
                        </tr>
                      </thead>
                      <tbody>
                        {session.entries.map((entry) => (
                          <tr key={entry.id} className="hover:bg-gray-100">
                            <td className="px-4 py-2 border">{entry.person}</td>
                            <td className="px-4 py-2 border">{entry.today_focus}</td>
                            <td className="px-4 py-2 border">{entry.successes}</td>
                            <td className="px-4 py-2 border">{entry.challenges}</td>
                            <td className="px-4 py-2 border">{entry.blockers}</td>
                            <td className="px-4 py-2 border text-xs">
                              {new Date(entry.timestamp).toLocaleTimeString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => {
                      // Load session entries into the current editor for editing.
                      // Map DB field "today_focus" to "update" for the UI.
                      const mappedEntries = session.entries.map((entry) => ({
                        ...entry,
                        update: entry.today_focus,
                      }));
                      setStandups(mappedEntries);
                      setSessionName(session.session_name);
                    }}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteSession(session.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
