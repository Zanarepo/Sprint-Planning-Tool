import React, { useEffect, useState, useCallback} from "react";
import { supabase } from "../../supabaseClient"; // Your Supabase client initialization
import {  Bar } from "react-chartjs-2";
import PollingVotingFeature from "../PollingVotingFeature";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function VotingApp() {
  // --- User Authentication States ---
  const [userEmail, setUserEmail] = useState(null);
  const [userId, setUserId] = useState(null);

  // --- Poll Creation States (only for logged-in users) ---
  const [newVotingTitle, setNewVotingTitle] = useState("");
  const [currentVotingTitle, setCurrentVotingTitle] = useState("");
  const [newFeature, setNewFeature] = useState("");
  const [newFeatures, setNewFeatures] = useState([]);

  // --- Poll Voting States ---
  const [allFeatures, setAllFeatures] = useState([]); // All poll options (rows) fetched
  const [selectedVotes, setSelectedVotes] = useState({}); // { pollTitle: selectedOptionId }

  // --- For Editing Options ---
  const [editingFeature, setEditingFeature] = useState({});

  // --- Refresh Trigger ---
  const [refresh, setRefresh] = useState(false);

  // --- Determine Which Poll to Fetch ---
  // If URL contains ?creatorId=, use that; otherwise, if logged in, use logged-in userId.
  const getPollCreatorId = useCallback(() => {
    const params = new URLSearchParams(window.location.search);
    const creatorIdParam = params.get("creatorId");
    if (creatorIdParam) {
      return parseInt(creatorIdParam, 10);
    }
    return userId; // userId from state
  }, [userId]);
  

  // --- Retrieve User Email and ID (for poll creation) ---
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

  // --- Ensure a Unique Voter Identifier Exists (for public voting) ---
  useEffect(() => {
    let voterId = localStorage.getItem("voter_identifier");
    if (!voterId) {
      voterId = Math.random().toString(36).substring(2);
      localStorage.setItem("voter_identifier", voterId);
    }
  }, []);

  // --- Fetch Polls ---
  const fetchVotingSystems = useCallback(async () => {
    // Use refresh so that ESLint knows it's being used.
    console.debug("Refresh value:", refresh);
  
    const pollCreatorId = getPollCreatorId();
    if (!pollCreatorId) {
      setAllFeatures([]);
      return;
    }
    const { data, error } = await supabase
      .from("vote")
      .select("*")
      .eq("user_id", pollCreatorId)
      .order("created_at", { ascending: false });
    if (error) {
      console.error("Error fetching polls:", error);
    } else {
      setAllFeatures(data);
    }
  }, [getPollCreatorId, refresh]);
  
  useEffect(() => {
    fetchVotingSystems();
  }, [fetchVotingSystems]);
  
  // --- Poll Creation Handlers (only for logged-in users) ---
  const handleCreateVotingTitle = () => {
    if (!newVotingTitle.trim()) {
      alert("Please enter a poll title.");
      return;
    }
    setCurrentVotingTitle(newVotingTitle.trim());
    setNewVotingTitle("");
    setNewFeatures([]);
  };

  const handleAddFeature = () => {
    if (!newFeature.trim()) {
      alert("Please enter an option name.");
      return;
    }
    setNewFeatures([...newFeatures, newFeature.trim()]);
    setNewFeature("");
  };

  const handleSubmitVotingSystem = async () => {
    if (!currentVotingTitle) {
      alert("Please create a poll title first.");
      return;
    }
    if (newFeatures.length === 0) {
      alert("Please add at least one option.");
      return;
    }
    if (!userId) {
      alert("You must be logged in to create a poll.");
      return;
    }
    const payload = newFeatures.map((feat) => ({
      voting_system_title: currentVotingTitle,
      feature_title: feat,
      vote_count: 0,
      user_id: userId,
    }));
    const { error } = await supabase.from("vote").insert(payload);
    if (error) {
      console.error("Error creating poll:", error);
    } else {
      // After creation, clear the creation state.
      // Optionally, display the unique link for sharing:
      alert(
        `Poll created! Share this link to vote: ${window.location.origin}/vote?creatorId=${userId}`
      );
      setCurrentVotingTitle("");
      setNewFeatures([]);
      setRefresh((prev) => !prev);
    }
  };

  // --- Voting Handler (available to everyone) ---
  const handleVote = async (votingSystemTitle) => {
    const voterId = localStorage.getItem("voter_identifier");
    const systemFeatures = allFeatures.filter(
      (feat) => feat.voting_system_title === votingSystemTitle
    );
    // Check if this voter already voted in this poll
    const alreadyVoted = systemFeatures.some((feat) =>
      feat.voter_identifiers.includes(voterId)
    );
    if (alreadyVoted) {
      alert("You have already voted in this poll.");
      return;
    }
    const selectedFeatureId = selectedVotes[votingSystemTitle];
    if (!selectedFeatureId) {
      alert("Please select an option to vote for.");
      return;
    }
    const chosenFeature = systemFeatures.find((feat) => feat.id === selectedFeatureId);
    if (!chosenFeature) return;
    const newVoteCount = chosenFeature.vote_count + 1;
    const newVoterIdentifiers = [...chosenFeature.voter_identifiers, voterId];
    const { error } = await supabase
      .from("vote")
      .update({ vote_count: newVoteCount, voter_identifiers: newVoterIdentifiers })
      .eq("id", chosenFeature.id);
    if (error) {
      console.error("Error casting vote:", error);
    } else {
      setRefresh((prev) => !prev);
    }
  };

  // --- Editing & Deletion Handlers ---
  const startEditingFeature = (featureId, currentTitle) => {
    setEditingFeature((prev) => ({ ...prev, [featureId]: currentTitle }));
  };

  const handleEditFeatureChange = (featureId, value) => {
    setEditingFeature((prev) => ({ ...prev, [featureId]: value }));
  };

  const saveEditedFeature = async (featureId) => {
    const updatedTitle = editingFeature[featureId].trim();
    if (!updatedTitle) {
      alert("Option name cannot be empty.");
      return;
    }
    const { error } = await supabase
      .from("vote")
      .update({ feature_title: updatedTitle })
      .eq("id", featureId);
    if (error) {
      console.error("Error updating option:", error);
    } else {
      setEditingFeature((prev) => {
        const newEditing = { ...prev };
        delete newEditing[featureId];
        return newEditing;
      });
      setRefresh((prev) => !prev);
    }
  };

  const handleDeleteFeature = async (featureId) => {
    if (window.confirm("Are you sure you want to delete this option?")) {
      const { error } = await supabase.from("vote").delete().eq("id", featureId);
      if (error) {
        console.error("Error deleting option:", error);
      } else {
        setRefresh((prev) => !prev);
      }
    }
  };

  const handleDeleteVotingSystem = async (votingSystemTitle) => {
    if (window.confirm("Are you sure you want to delete this entire poll?")) {
      const { error } = await supabase
        .from("vote")
        .delete()
        .eq("voting_system_title", votingSystemTitle);
      if (error) {
        console.error("Error deleting poll:", error);
      } else {
        setRefresh((prev) => !prev);
      }
    }
  };

  // --- Summary Calculation ---
  const computeSummary = (systemFeatures) => {
    const totalVotes = systemFeatures.reduce((sum, feat) => sum + feat.vote_count, 0);
    if (totalVotes === 0) return { winningFeature: "No votes yet", percentage: 0 };
    const winningFeature = systemFeatures.reduce((prev, current) =>
      prev.vote_count >= current.vote_count ? prev : current
    );
    const percentage = ((winningFeature.vote_count / totalVotes) * 100).toFixed(1);
    return { winningFeature: winningFeature.feature_title, percentage };
  };

  // --- Group Polls by Voting System Title ---
  const groupedVotingSystems = allFeatures.reduce((acc, feature) => {
    const key = feature.voting_system_title;
    if (!acc[key]) acc[key] = [];
    acc[key].push(feature);
    return acc;
  }, {});

  // --- Inline Styles for Full‑Width & Responsive Layout ---
  const containerStyle = {
    width: "100%",
    padding: "1rem",
    boxSizing: "border-box",
  };


  const sectionStyle = {
    marginBottom: "2rem",
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "1rem",
    backgroundColor: "#f9f9f9",
  };

  const formStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
    marginBottom: "1rem",
  };

  const inputStyle = {
    padding: "0.75rem",
    fontSize: "1rem",
    border: "1px solid #ccc",
    borderRadius: "4px",
  };

  const buttonStyle = {
    padding: "0.75rem 1rem",
    backgroundColor: "#0070f3",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    fontSize: "1rem",
    cursor: "pointer",
  };

  const disabledButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#ccc",
    cursor: "not-allowed",
  };

  const flexRowStyle = {
    display: "flex",
    flexWrap: "wrap",
    width: "100%",
    gap: "1rem",
  };

  const listContainerStyle = {
    flex: "1 1 400px",
    minWidth: "300px",
  };

  const chartContainerStyle = {
    flex: "1 1 400px",
    minWidth: "300px",
  };

  return (
    <div style={containerStyle}>
        <PollingVotingFeature/>
         <div className="container mx-auto p-4 mt-0"></div>
      
      {/* Poll Creation Area (only visible to logged‑in users) */}
      {userEmail ? (
        <section className="bg-blue-200 p-6 rounded-lg">
          <h2>Create New Poll</h2>
          {!currentVotingTitle ? (
            <div style={formStyle}>
              <input
                type="text"
                placeholder="Poll Title"
                value={newVotingTitle}
                onChange={(e) => setNewVotingTitle(e.target.value)}
                style={inputStyle}
              />
              <button
        type="button"
        onClick={handleCreateVotingTitle}
        className="bg-white text-blue-500 font-bold py-2 px-4 rounded hover:bg-blue-100"
      >
        Create Poll
      </button>
            </div>
          ) : (
            <>
              <p>
                <strong>Poll:</strong> {currentVotingTitle}
              </p>
              <div style={formStyle}>
                <input
                  type="text"
                  placeholder="Option Name"
                  value={newFeature}
                  onChange={(e) => setNewFeature(e.target.value)}
                  style={inputStyle}
                />
                <div style={{ display: "flex", gap: "1rem" }}>
                  <button type="button" onClick={handleAddFeature} style={buttonStyle}>
                    Add Option
                  </button>
                  <button type="button" onClick={handleSubmitVotingSystem} style={buttonStyle}>
                    Submit Poll
                  </button>
                </div>
              </div>
              {newFeatures.length > 0 && (
                <div>
                  <strong>Options to be created:</strong>
                  <ul>
                    {newFeatures.map((feat, idx) => (
                      <li key={idx}>{feat}</li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}
        </section>
      ) : (
        <p style={{ textAlign: "center", marginBottom: "1rem" }}>
          (Log in to create a poll. Voting is open to everyone.)
        </p>
      )}

      {/* Voting UI: Display Polls (filtered by the unique link's creatorId or logged-in user's id) */}
      {Object.keys(groupedVotingSystems).length > 0 ? (
        Object.keys(groupedVotingSystems).map((systemTitle) => {
          const systemFeatures = groupedVotingSystems[systemTitle];
          const chartData = {
            labels: systemFeatures.map((f) => f.feature_title),
            datasets: [
              {
                label: "Vote Count",
                data: systemFeatures.map((f) => f.vote_count),
                backgroundColor: "rgba(75,192,192,0.6)",
              },
            ],
          };
          const { winningFeature, percentage } = computeSummary(systemFeatures);
          const voterId = localStorage.getItem("voter_identifier");
          const hasVoted = systemFeatures.some((f) =>
            f.voter_identifiers.includes(voterId)
          );
          return (
            <section key={systemTitle} style={sectionStyle}>
              <h2>{systemTitle}</h2>
              {/* Display the unique shareable link if the viewer is the poll creator */}
              {userId && userId === getPollCreatorId() && (
                <p style={{ fontStyle: "italic" }}>
                  Share this poll: {window.location.origin}/vote?creatorId={userId}
                </p>
              )}
              <div style={flexRowStyle}>
                {/* Left Side: Options List with Radio Buttons, Edit, and Delete */}
                <div style={listContainerStyle}>
                  <form>
                    {systemFeatures.map((feat) => (
                      <div
                        key={feat.id}
                        style={{
                          marginBottom: "0.5rem",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <input
                          type="radio"
                          name={`vote-${systemTitle}`}
                          value={feat.id}
                          onChange={() =>
                            setSelectedVotes((prev) => ({
                              ...prev,
                              [systemTitle]: feat.id,
                            }))
                          }
                          disabled={hasVoted}
                          style={{ marginRight: "0.5rem" }}
                        />
                        {editingFeature[feat.id] !== undefined ? (
                          <>
                            <input
                              type="text"
                              value={editingFeature[feat.id]}
                              onChange={(e) =>
                                handleEditFeatureChange(feat.id, e.target.value)
                              }
                              style={{ ...inputStyle, flex: "1" }}
                            />
                            <button
                              type="button"
                              onClick={() => saveEditedFeature(feat.id)}
                              style={buttonStyle}
                            >
                              Save
                            </button>
                          </>
                        ) : (
                          <>
                            <label style={{ flex: "1" }}>
                              <strong>{feat.feature_title}</strong> - {feat.vote_count} votes
                            </label>
                            {/* Only allow editing/deletion if the viewer is the poll creator */}
                            {userId && userId === feat.user_id && (
                              <>
                                <button
                                  type="button"
                                  onClick={() => startEditingFeature(feat.id, feat.feature_title)}
                                  title="Edit Option"
                                  style={{ ...buttonStyle, padding: "0.5rem", marginRight: "0.5rem" }}
                                >
                                  ✏️
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleDeleteFeature(feat.id)}
                                  title="Delete Option"
                                  style={{
                                    ...buttonStyle,
                                    padding: "0.5rem",
                                    backgroundColor: "#d9534f",
                                  }}
                                >
                                  🗑️
                                </button>
                              </>
                            )}
                          </>
                        )}
                      </div>
                    ))}
                  </form>
                  <div style={{ marginTop: "1rem" }}>
                    <button
                      type="button"
                      onClick={() => handleVote(systemTitle)}
                      style={hasVoted ? disabledButtonStyle : buttonStyle}
                      disabled={hasVoted}
                    >
                      {hasVoted ? "You Voted" : "Vote"}
                    </button>
                  </div>
                  {/* Only the poll creator sees the delete poll button */}
                  {userId && userId === getPollCreatorId() && (
                    <div style={{ marginTop: "1rem" }}>
                      <button
                        type="button"
                        onClick={() => handleDeleteVotingSystem(systemTitle)}
                        style={{ ...buttonStyle, backgroundColor: "#d9534f" }}
                      >
                        Delete Poll
                      </button>
                    </div>
                  )}
                </div>
                {/* Right Side: Chart and Summary */}
                <div style={chartContainerStyle}>
                  <Bar
                    data={chartData}
                    options={{
                      responsive: true,
                      plugins: {
                        legend: { position: "top" },
                        title: { display: true, text: "Vote Counts" },
                      },
                    }}
                  />
                  <div style={{ marginTop: "1rem", textAlign: "center" }}>
                    <h3>Summary</h3>
                    {systemFeatures.reduce((sum, f) => sum + f.vote_count, 0) > 0 ? (
                      <>
                        <p>
                          Winning Option: <strong>{winningFeature}</strong>
                        </p>
                        <p>
                          Win Percentage: <strong>{percentage}%</strong>
                        </p>
                      </>
                    ) : (
                      <p>No votes yet.</p>
                    )}
                  </div>
                </div>
              </div>
            </section>
          );
        })
      ) : (
        <p style={{ textAlign: "center" }}>No polls available.</p>
      )}
    </div>
  );
}

export default VotingApp;
