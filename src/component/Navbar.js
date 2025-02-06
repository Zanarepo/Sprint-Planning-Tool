import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="w-full bg-blue-600 p-4 text-white flex justify-between">
      <h1 className="text-xl font-bold">Sprintify</h1>
      <Link to="/" className="hover:underline">Home</Link>
      <Link to="/sprints" className="hover:underline">Try Sprintify</Link>
    </nav>
  );
};

export default Navbar;
