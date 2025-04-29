import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import SubmitProject from "./pages/SubmitProject";
import ProjectDetails from "./pages/ProjectDetails";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProjectList from "./pages/ProjectList"; // Assuming you want to show the list of projects here
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import React, { useState } from "react"; // Add useState import
import "./App.css";

function App() {
  // State for storing user and project data
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([
    {
      id: 2,
      title: "AI Project",
      description: "A cool AI project that uses machine learning to predict data.",
      tags: "AI, Machine Learning",
      thumbnail: "https://via.placeholder.com/150",
    },
    {
      id: 1,
      title: "Web Development Project",
      description: "A website built with React to showcase projects.",
      tags: "React, JavaScript, Web Development",
      thumbnail: "https://via.placeholder.com/150",
    },
    // Add more projects as needed
  ]);

  return (
    <Router>
      <Navbar user={user} setUser={setUser} /> {/* Pass user and setUser as props */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/submit" element={<SubmitProject />} />
        <Route path="/projects" element={<ProjectList projects={projects} />} />
        <Route path="/project/:id" element={<ProjectDetails />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/admin-dashboard" element={user?.role === 'admin' ? <AdminDashboard /> : <Navigate to="/login" />} />
        <Route path="/user-dashboard" element={user?.role === 'user' ? <UserDashboard /> : <Navigate to="/login" />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
