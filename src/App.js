import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SprintSimulator from "./component/SprintSimulator";
import HomePage from "./component/HomePage";
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
import SprintEstimator from "./component/SprintEstimator";
import Simulate from "./component/Simulate";
import AllinOne from './component/AllinOne'

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/sprints" element={<SprintSimulator />} />
            <Route path="/estimator" element={<SprintEstimator />} />
            <Route path="/brainstorm" element={<Simulate />} />
            <Route path="/allapps" element={<AllinOne />} />
            
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;



