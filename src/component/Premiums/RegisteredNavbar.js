import React from "react";
import { Link } from "react-router-dom";
import RegisteredUsersAppLauncher from "./RegisteredUsersAppLauncher";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full font-bold bg-gray-100 p-0 text-yellow-800 flex justify-between items-center z-50 shadow-md">  <h1 className="text-xl font-bold">Sprintify</h1>
      <div className="flex gap-6 items-center">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/allapps" className="hover:underline">All-in-one</Link>
        <Link to="/logout" className="hover:underline">Logout</Link>
       
      </div>
      <RegisteredUsersAppLauncher />
    </nav>
  );
};

export default Navbar;
