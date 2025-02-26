
import { useState, useEffect } from "react";
import BrainstormingFeature from "./BrainstormingFeature";
import { supabase } from "../supabaseClient";

export default function ProductBrainstorming() {
  // Timer and brainstorming inputs
  const [timer, setTimer] = useState(5 * 60);
  const [problem, setProblem] = useState("");
  const [uvp, setUvp] = useState("");
  const [uvpList, setUvpList] = useState([]);
  const [currentFeature, setCurrentFeature] = useState("");
  const [currentChallenge, setCurrentChallenge] = useState("");
  const [currentSolution, setCurrentSolution] = useState("");
  const [features, setFeatures] = useState([]);
  const [editingFeatureIndex, setEditingFeatureIndex] = useState(null);
  const [editingUvpIndex, setEditingUvpIndex] = useState(null);

  // User and session states
  const [userId, setUserId] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [editingSessionId, setEditingSessionId] = useState(null);
  const [editingSessionData, setEditingSessionData] = useState(null);

  // Retrieve user id from localStorage email, then fetch sessions accordingly
  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (email) {
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
          fetchSessions(data.id);
        }
      };
      fetchUserId();
    } else {
      console.debug("No user email found in localStorage.");
    }
  }, []);

  // Timer countdown effect
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  // UVP & Problem handlers
  const handleAddUvp = () => {
    if (uvp && problem) {
      if (editingUvpIndex !== null) {
        const updated = [...uvpList];
        updated[editingUvpIndex] = { uvp, problem };
        setUvpList(updated);
        setEditingUvpIndex(null);
      } else {
        setUvpList([...uvpList, { uvp, problem }]);
      }
      setUvp("");
      setProblem("");
    }
  };

  const handleEditUvp = (index) => {
    const item = uvpList[index];
    setUvp(item.uvp);
    setProblem(item.problem);
    setEditingUvpIndex(index);
  };

  const handleDeleteUvp = (index) => {
    setUvpList(uvpList.filter((_, i) => i !== index));
  };

  // Feature handlers
  const handleAddFeature = () => {
    if (currentFeature && currentChallenge && currentSolution) {
      if (editingFeatureIndex !== null) {
        const updated = [...features];
        updated[editingFeatureIndex] = {
          feature: currentFeature,
          challenge: currentChallenge,
          solution: currentSolution,
        };
        setFeatures(updated);
        setEditingFeatureIndex(null);
      } else {
        setFeatures([
          ...features,
          { feature: currentFeature, challenge: currentChallenge, solution: currentSolution },
        ]);
      }
      setCurrentFeature("");
      setCurrentChallenge("");
      setCurrentSolution("");
    }
  };

  const handleEditFeature = (index) => {
    const item = features[index];
    setCurrentFeature(item.feature);
    setCurrentChallenge(item.challenge);
    setCurrentSolution(item.solution);
    setEditingFeatureIndex(index);
  };

  const handleDeleteFeature = (index) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  // Sessions CRUD
  const fetchSessions = async (uid) => {
    const { data, error } = await supabase
      .from("product_brainstorming")
      .select("*")
      .eq("user_id", uid)
      .order("created_at", { ascending: false });
    if (error) {
      console.error("Error fetching sessions:", error);
    } else {
      setSessions(data);
    }
  };

  // Create a new brainstorming session
  const saveSession = async () => {
    if (!userId) {
      console.error("User ID not found. Cannot save session.");
      return;
    }
    // Generate a friendly session name like "Session 1", "Session 2", etc.
    const sessionName = "Session " + (sessions.length + 1);
    const { data, error } = await supabase
      .from("product_brainstorming")
      .insert([
        {
          user_id: userId,
          session_name: sessionName,
          uvp_list: uvpList,
          features: features,
        },
      ]);
    if (error) {
      console.error("Error saving session:", error);
    } else {
      console.log("Session saved:", data);
      // Clear current inputs after saving
      setUvpList([]);
      setFeatures([]);
      fetchSessions(userId);
    }
  };

  // Update an existing session (entire table)
  const updateSession = async (sessionId) => {
    if (!editingSessionData) return;
    const { data, error } = await supabase
      .from("product_brainstorming")
      .update({
        session_name: editingSessionData.session_name,
        uvp_list: editingSessionData.uvp_list,
        features: editingSessionData.features,
      })
      .eq("id", sessionId);
    if (error) {
      console.error("Error updating session:", error);
    } else {
      console.log("Session updated:", data);
      setEditingSessionId(null);
      setEditingSessionData(null);
      fetchSessions(userId);
    }
  };

  // Delete a session
  const deleteSession = async (sessionId) => {
    const { error } = await supabase
      .from("product_brainstorming")
      .delete()
      .eq("id", sessionId);
    if (error) {
      console.error("Error deleting session:", error);
    } else {
      console.log("Session deleted");
      fetchSessions(userId);
    }
  };

  // Begin editing a session by pre-populating an edit form.
  const startEditingSession = (session) => {
    setEditingSessionId(session.id);
    // Convert uvp_list and features to newline-separated text for editing.
    setEditingSessionData({
      session_name: session.session_name,
      uvpText: session.uvp_list.map((item) => `${item.uvp}::${item.problem}`).join("\n"),
      featuresText: session.features.map((item) => `${item.feature}::${item.challenge}::${item.solution}`).join("\n"),
      // We will convert these texts back to arrays on update.
    });
  };

  // Handlers for converting edited text back to arrays.
  const handleUvpTextChange = (text) => {
    setEditingSessionData((prev) => ({ ...prev, uvpText: text }));
    const parsed = text.split("\n").map((line) => {
      const [uvp, problem] = line.split("::").map((s) => s.trim());
      return { uvp, problem };
    }).filter(item => item.uvp && item.problem);
    setEditingSessionData((prev) => ({ ...prev, uvp_list: parsed }));
  };

  const handleFeaturesTextChange = (text) => {
    setEditingSessionData((prev) => ({ ...prev, featuresText: text }));
    const parsed = text.split("\n").map((line) => {
      const [feature, challenge, solution] = line.split("::").map((s) => s.trim());
      return { feature, challenge, solution };
    }).filter(item => item.feature && item.challenge && item.solution);
    setEditingSessionData((prev) => ({ ...prev, features: parsed }));
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen mt-8">
      <BrainstormingFeature />

      {/* Timer */}
      <div className="mb-4 text-gray-700 font-semibold">
        Time Remaining: {Math.floor(timer / 60)}:{String(timer % 60).padStart(2, "0")}
      </div>

      {/* UVP & Problem Section */}
      <div>
        <h2 className="text-lg font-semibold text-yellow-800">Unique Value Proposition (UVP)</h2>
        <textarea
          value={uvp}
          onChange={(e) => setUvp(e.target.value)}
          placeholder="Describe the UVP"
          className="w-full p-3 border rounded-md shadow-sm"
        />
        <h2 className="text-lg font-semibold text-yellow-800 mt-4">Problem Statement (PS)</h2>
        <textarea
          value={problem}
          onChange={(e) => setProblem(e.target.value)}
          placeholder="What is the problem statement"
          className="w-full p-3 border rounded-md shadow-sm mt-2"
        />
        <button onClick={handleAddUvp} className="mt-4 p-3 bg-yellow-600 text-white rounded-md hover:bg-yellow-700">
          {editingUvpIndex !== null ? "Update" : "Add"} UVP & PS to Table
        </button>
      </div>

      {/* UVP Table */}
      <table className="min-w-full border bg-white shadow-md rounded-lg mt-4">
        <thead className="bg-yellow-600 text-white">
          <tr>
            <th className="border p-3">UVP</th>
            <th className="border p-3">Problem</th>
            <th className="border p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {uvpList.map((item, index) => (
            <tr key={index}>
              <td className="border p-3">{item.uvp}</td>
              <td className="border p-3">{item.problem}</td>
              <td className="border p-3">
                <button onClick={() => handleEditUvp(index)} className="mr-2 text-yellow-600">Edit</button>
                <button onClick={() => handleDeleteUvp(index)} className="text-red-600">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Features Section */}
      <h2 className="text-lg font-semibold text-yellow-600 mt-8">Features</h2>
      <input
        type="text"
        value={currentFeature}
        onChange={(e) => setCurrentFeature(e.target.value)}
        placeholder="Feature Name"
        className="p-3 border rounded-md w-full shadow-sm"
      />
      <input
        type="text"
        value={currentChallenge}
        onChange={(e) => setCurrentChallenge(e.target.value)}
        placeholder="Challenge"
        className="p-3 border rounded-md w-full shadow-sm mt-2"
      />
      <input
        type="text"
        value={currentSolution}
        onChange={(e) => setCurrentSolution(e.target.value)}
        placeholder="Possible Solution"
        className="p-3 border rounded-md w-full shadow-sm mt-2"
      />
      <button onClick={handleAddFeature} className="mt-4 p-3 bg-yellow-600 text-white rounded-md hover:bg-yellow-700">
        {editingFeatureIndex !== null ? "Update" : "Add"} Feature to Table
      </button>

      {/* Features Table */}
      <table className="min-w-full border bg-white shadow-md rounded-lg mt-4">
        <thead className="bg-yellow-600 text-white">
          <tr>
            <th className="border p-3">Feature</th>
            <th className="border p-3">Challenge</th>
            <th className="border p-3">Solution</th>
            <th className="border p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {features.map((item, index) => (
            <tr key={index}>
              <td className="border p-3">{item.feature}</td>
              <td className="border p-3">{item.challenge}</td>
              <td className="border p-3">{item.solution}</td>
              <td className="border p-3">
                <button onClick={() => handleEditFeature(index)} className="mr-2 text-blue-600">Edit</button>
                <button onClick={() => handleDeleteFeature(index)} className="text-red-600">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Save / Print Session */}
      <div className="flex items-center gap-4 mt-8">
        <button onClick={saveSession} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Save Brainstorming Session
        </button>
        <button onClick={() => window.print()} className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-900">
          Print Session
        </button>
      </div>

  {/* Saved Sessions - Grouped by Batch with CRUD Ops */}
<div className="container mx-auto px-0 mt-8">
  <h2 className="text-lg font-semibold mb-4 text-yellow-800">Saved Brainstorming Sessions</h2>
  {sessions.length === 0 ? (
    <p>No sessions saved yet.</p>
  ) : (
    sessions.map((session) => (
      <div key={session.id} className="border p-4 rounded-lg shadow-md mt-4">
        {editingSessionId === session.id ? (
          // Edit mode: form to update the session (all table content)
          <div className="space-y-4">
            <div>
              <label className="font-medium">Session Name:</label>
              <input
                type="text"
                value={editingSessionData.session_name}
                onChange={(e) =>
                  setEditingSessionData((prev) => ({ ...prev, session_name: e.target.value }))
                }
                className="p-1 border rounded w-full"
              />
            </div>
            <div>
              <label className="font-medium">UVP & Problem (one per line, format: uvp::problem):</label>
              <textarea
                value={editingSessionData.uvpText}
                onChange={(e) => handleUvpTextChange(e.target.value)}
                className="p-1 border rounded w-full"
                rows={4}
              />
            </div>
            <div>
              <label className="font-medium">Features (one per line, format: feature::challenge::solution):</label>
              <textarea
                value={editingSessionData.featuresText}
                onChange={(e) => handleFeaturesTextChange(e.target.value)}
                className="p-1 border rounded w-full"
                rows={4}
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => updateSession(session.id)}
                className="px-2 py-1 bg-green-500 text-white rounded"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setEditingSessionId(null);
                  setEditingSessionData(null);
                }}
                className="px-2 py-1 bg-gray-500 text-white rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          // Display mode: show session details
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold">{session.session_name}</h3>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => startEditingSession(session)}
                className="px-2 py-1 bg-yellow-500 text-white rounded"
              >
                Edit Session
              </button>
              <button
                onClick={() => deleteSession(session.id)}
                className="px-2 py-1 bg-red-600 text-white rounded"
              >
                Delete Session
              </button>
              <button
                onClick={() => window.print()}
                className="px-2 py-1 bg-gray-800 text-white rounded"
              >
                Print Session
              </button>
            </div>
          </div>
        )}

        {/* Display the UVP & Problem data in a table */}
        <div className="mt-4">
          <h4 className="font-semibold mb-2">UVP & Problem</h4>
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-yellow-600 text-white">
                <th className="border p-2">UVP</th>
                <th className="border p-2">Problem</th>
              </tr>
            </thead>
            <tbody>
              {session.uvp_list.map((item, idx) => (
                <tr key={idx} className="border-t">
                  <td className="border p-2">{item.uvp}</td>
                  <td className="border p-2">{item.problem}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Display the Features data in a table */}
        <div className="mt-4">
          <h4 className="font-semibold mb-2">Features</h4>
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-yellow-600 text-white">
                <th className="border p-2">Feature</th>
                <th className="border p-2">Challenge</th>
                <th className="border p-2">Solution</th>
              </tr>
            </thead>
            <tbody>
              {session.features.map((item, idx) => (
                <tr key={idx} className="border-t">
                  <td className="border p-2">{item.feature}</td>
                  <td className="border p-2">{item.challenge}</td>
                  <td className="border p-2">{item.solution}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    ))
  )}
</div>

    </div>
  );
}
