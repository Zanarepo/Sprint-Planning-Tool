// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import SprintSimulator from './component/SprintSimulator'
import Simulate from './component/Simulate'
import HomePage from './component/HomePage';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Route to HomePage */}
        <Route path="/" element={<HomePage />} />

      
        <Route path="/sprints" element={<  SprintSimulator/>} />
     
        <Route path="/simulate" element={<Simulate/>} />
       
        
        

        
      </Routes>
    </Router>
  );
};

export default App;
