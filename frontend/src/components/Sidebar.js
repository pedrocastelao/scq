// components/Sidebar.js
import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <Link to="/" className="btn btn-light w-100 mb-2">
          Home
        </Link>
        <Link to="/login" className="btn btn-light w-100">
          Login
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
