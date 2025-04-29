import React, { useState } from 'react';
import './AdminDashboard.css';

const AdminDashboard = () => {
  // Sample data (this will be dynamic in the future)
  const [projects, setProjects] = useState([
    {
      id: 2,
      title: 'AI Project',
      description: 'A cool AI project',
      tags: 'AI, Machine Learning',
      videoLink: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      status: 'pending', // 'approved' or 'rejected'
    },
    {
      id: 1,
      title: 'Web Development Project',
      description: 'A web app with React',
      tags: 'React, JavaScript, Web Development',
      videoLink: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      status: 'pending', // 'approved' or 'rejected'
    },
  ]);

  // Handle project approval
  const handleApproval = (id) => {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.id === id ? { ...project, status: 'approved' } : project
      )
    );
  };

  // Handle project rejection
  const handleRejection = (id) => {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.id === id ? { ...project, status: 'rejected' } : project
      )
    );
  };

  // Handle project removal (for inappropriate content)
  const handleRemove = (id) => {
    setProjects((prevProjects) => prevProjects.filter((project) => project.id !== id));
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <div className="project-list">
        <h2>Submitted Projects</h2>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Tags</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id}>
                <td>{project.title}</td>
                <td>{project.description}</td>
                <td>{project.tags}</td>
                <td>{project.status}</td>
                <td>
                  {project.status === 'pending' && (
                    <>
                      <button onClick={() => handleApproval(project.id)}>Approve</button>
                      <button onClick={() => handleRejection(project.id)}>Reject</button>
                    </>
                  )}
                  <button onClick={() => handleRemove(project.id)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
