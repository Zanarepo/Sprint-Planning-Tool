import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SprintSimulator from "./component/SprintSimulator";
import HomePage from "./component/HomePage";
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";

const App = () => {
  const [showSimulator, setShowSimulator] = useState(false);

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage setShowSimulator={setShowSimulator} />} />
            <Route path="/sprints" element={<SprintSimulator />} />
          </Routes>
          {showSimulator && <SprintSimulator />}
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
