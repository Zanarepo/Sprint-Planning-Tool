import React, { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";
import StickyNotesManager from "./StickyNotesManager";
import StickyNoteFeature from "./StickyNoteFeature";
const defaultDivisions = 1;
const defaultColors = ["#ffffff"];

const StickyDashboard = () => {
  // State for user identification
  const [userEmail, setUserEmail] = useState(null);
  const [userId, setUserId] = useState(null);
  // Board settings state
  const [boardDivisions, setBoardDivisions] = useState(defaultDivisions);
  const [boardColors, setBoardColors] = useState(defaultColors);
  // Flag to ensure settings are loaded before upsert operations
  const [settingsLoaded, setSettingsLoaded] = useState(false);

  // Retrieve userEmail from localStorage
  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (email) {
      setUserEmail(email);
      console.debug("User email found in localStorage:", email);
    } else {
      console.debug("No user email found in localStorage.");
    }
  }, []);

  // Use the userEmail to fetch the user_id from the users table
  useEffect(() => {
    if (userEmail) {
      const fetchUserId = async () => {
        console.debug("Fetching user_id for email:", userEmail);
        const { data, error } = await supabase
          .from("users")
          .select("id")
          .eq("email", userEmail)
          .single();
        if (error) {
          console.error("Error fetching user_id:", error);
        } else if (data) {
          setUserId(data.id);
          console.debug("User id fetched:", data.id);
        }
      };
      fetchUserId();
    }
  }, [userEmail]);

  // Fetch board settings from Supabase when userId is available.
  // We order by updated_at descending and limit the result to 1 row.
  useEffect(() => {
    if (userId) {
      const fetchSettings = async () => {
        console.debug("Fetching board settings for user_id:", userId);
        const { data, error } = await supabase
          .from("sticky_board_settings")
          .select("*")
          .eq("user_id", userId)
          .order("updated_at", { ascending: false })
          .limit(1)
          .single();

        if (error) {
          // If no record exists, insert default settings.
          if (error.message && error.message.includes("No rows")) {
            console.debug(
              "No board settings found for user_id:",
              userId,
              "Inserting default settings."
            );
            const { data: insertData, error: insertError } = await supabase
              .from("sticky_board_settings")
              .insert({
                user_id: userId,
                board_divisions: defaultDivisions,
                board_colors: defaultColors,
              })
              .single();
            if (insertError) {
              console.error("Error inserting board settings:", insertError);
            } else {
              console.debug("Inserted board settings:", insertData);
              setSettingsLoaded(true);
            }
          } else {
            console.error("Error fetching board settings:", error);
          }
        } else if (data) {
          console.debug("Board settings fetched:", data);
          setBoardDivisions(data.board_divisions);
          setBoardColors(data.board_colors);
          setSettingsLoaded(true);
        }
      };
      fetchSettings();
    }
  }, [userId]);

  // Upsert board settings when boardDivisions or boardColors change (after initial load)
  useEffect(() => {
    if (userId && settingsLoaded) {
      const updateSettings = async () => {
        console.debug("Upserting board settings for user_id:", userId, {
          board_divisions: boardDivisions,
          board_colors: boardColors,
        });
        const { error } = await supabase
          .from("sticky_board_settings")
          .upsert({
            user_id: userId,
            board_divisions: boardDivisions,
            board_colors: boardColors,
            updated_at: new Date().toISOString(),
          });
        if (error) {
          console.error("Error upserting board settings:", error);
        } else {
          console.debug("Board settings updated successfully.");
        }
      };
      updateSettings();
    }
  }, [boardDivisions, boardColors, userId, settingsLoaded]);

  // Handle changes to board divisions
  const handleDivisionChange = (e) => {
    const newDivisions = parseInt(e.target.value, 10);
    console.debug("Changing board divisions to:", newDivisions);
    setBoardDivisions(newDivisions);
    setBoardColors((prevColors) => {
      let newColors = [...prevColors];
      if (newDivisions > newColors.length) {
        newColors = newColors.concat(
          Array(newDivisions - newColors.length).fill("#ffffff")
        );
      } else if (newDivisions < newColors.length) {
        newColors = newColors.slice(0, newDivisions);
      }
      console.debug("New board colors:", newColors);
      return newColors;
    });
  };

  // Handle changes to an individual board's color
  const handleColorChange = (e, idx) => {
    const newColor = e.target.value;
    console.debug(`Changing color of board ${idx} to:`, newColor);
    setBoardColors((prevColors) => {
      const newColors = [...prevColors];
      newColors[idx] = newColor;
      return newColors;
    });
  };

  // Determine grid class for the background layer (vertical columns)
  let gridClass = "";
  if (boardDivisions > 1) {
    switch (boardDivisions) {
      case 2:
        gridClass = "grid grid-cols-2 gap-0";
        break;
      case 3:
        gridClass = "grid grid-cols-3 gap-0";
        break;
      case 4:
        gridClass = "grid grid-cols-4 gap-0";
        break;
      case 6:
        gridClass = "grid grid-cols-6 gap-0";
        break;
      default:
        gridClass = "";
    }
  }

  // Handler for printing the document
  const handlePrint = () => window.print();

  return (
    <div className="flex flex-col items-center p-4 justify-center min-h-screen bg-gray-200 mt-16">
      {/* Header with Print Button */}
      <StickyNoteFeature />
      <div className="flex items-center gap-4 mb-4">
      
       
        
      </div>
     

      {/* Board Settings Controls */}
      <div className="flex flex-wrap gap-4 mb-4">
        <div>
          <label htmlFor="boardDivisions" className="mr-2">
            Divide Boards:
          </label>
          <select
            id="boardDivisions"
            value={boardDivisions}
            onChange={handleDivisionChange}
            className="p-1 rounded"
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={6}>6</option>
          </select>
        </div>
        {boardDivisions > 1 ? (
          Array.from({ length: boardDivisions }).map((_, idx) => (
            <div key={idx}>
              <label htmlFor={`color-${idx}`} className="mr-2">
                Board {idx + 1} Color:
              </label>
              <input
                id={`color-${idx}`}
                type="color"
                value={boardColors[idx]}
                onChange={(e) => handleColorChange(e, idx)}
              />
            </div>
          ))
        ) : (
          <div>
            <label htmlFor="color-0" className="mr-2">
              Board Color:
            </label>
            <input
              id="color-0"
              type="color"
              value={boardColors[0]}
              onChange={(e) => handleColorChange(e, 0)}
            />
          </div>
        )}
      </div>
      <div className="w-full flex justify-start mb-4">
  
</div>

      {/* Whiteboard Frame */}
      <div className="relative shadow-lg border-8 border-gray-400 rounded-lg w-11/12 h-5/6 max-w-5xl">
        {/* Background layer: divided boards */}
        <div className="absolute inset-0">
          {boardDivisions === 1 ? (
            <div
              className="w-full h-full"
              style={{ backgroundColor: boardColors[0] }}
            />
          ) : (
            <div className={`${gridClass} w-full h-full`}>
              {Array.from({ length: boardDivisions }).map((_, idx) => (
                <div
                  key={idx}
                  className="w-full h-full"
                  style={{ backgroundColor: boardColors[idx] }}
                />
              ))}
            </div>
          )}
        </div>
        <button
    onClick={handlePrint}
    className="bg-blue-500 text-white px-4 py-2 rounded shadow"
  >
    Print
  </button>
        {/* Sticky notes layer: rendered once over the entire board */}
        <div
          className="relative z-10 w-full h-full p-4"
          style={{ overflow: "visible" }}
        >
          <StickyNotesManager />

       
        </div>
        
      </div>
    </div>
  );
};

export default StickyDashboard;
