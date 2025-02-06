import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-blue-600 p-4 text-white flex justify-between items-center z-50 shadow-md">
      <h1 className="text-xl font-bold">Sprintify</h1>
      <div className="flex gap-6 justify-end">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/sprints" className="hover:underline">Try Sprintify</Link>
      </div>
    </nav>
  );
};

export default Navbar;
