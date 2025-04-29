import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);  // Clear the user state
    navigate("/login");  // Redirect to login page
  };

  return (
    <nav style={{ padding: "1rem", background: "#f2f2f2" }}>
      
      <Link to="/">Home</Link> |{" "}
      <Link to="/projects">View Submitted Projects</Link> |{" "}
      <Link to="/submit">Submit Project</Link> |{" "}
      {!user ? (
        <>
          <Link to="/login">Login</Link> |{" "}
          <Link to="/signup">Signup</Link>
        </>
      ) : (
        <>
          {user.role === "admin" && <Link to="/admin-dashboard">Admin Dashboard</Link>}
          {user.role === "user" && <Link to="/user-dashboard">User Dashboard</Link>}
          <button onClick={handleLogout} style={{ marginLeft: "10px" }}>Logout</button>
          <NavLink to="/" activeClassName="active">Home</NavLink>
        </>
      )}
    </nav>
  );
};

export default Navbar;
