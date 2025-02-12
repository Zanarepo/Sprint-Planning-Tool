import React from "react";
import { Link } from "react-router-dom";
import AppLauncher from "./AppLauncher";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-yellow-800 p-4 text-white flex justify-between items-center z-50 shadow-md">
      <h1 className="text-xl font-bold">Sprintify</h1>
      <div className="flex gap-6 items-center">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/allapps" className="hover:underline">All-in-one</Link>
        <Link to="/register" className="hover:underline">Register</Link>
        <Link to="/login" className="hover:underline">Login</Link>
      </div>
      <AppLauncher />
    </nav>
  );
};

export default Navbar;
