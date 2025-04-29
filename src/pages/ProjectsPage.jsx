import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ProjectsPage.css';

const ProjectsPage = ({ projects }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState('');

  // Filter projects based on search query and selected tags
  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesTag = selectedTags
      ? project.tags.toLowerCase().includes(selectedTags.toLowerCase())
      : true;

    return matchesSearch && matchesTag;
  });

  return (
    <div className="projects-page">
      <h1>Explore Projects</h1>

      {/* Search and Tag Filters */}
      <div className="search-filter">
        <input
          type="text"
          placeholder="Search by title or description..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <select
          value={selectedTags}
          onChange={(e) => setSelectedTags(e.target.value)}
        >
          <option value="">Filter by Tags</option>
          <option value="AI">AI</option>
          <option value="Web Development">Web Development</option>
          <option value="Machine Learning">Machine Learning</option>
          {/* Add more tag options as needed */}
        </select>
      </div>

      {/* Projects Grid */}
      <div className="project-grid">
        {filteredProjects.length === 0 ? (
          <p>No projects found based on your filters.</p>
        ) : (
          filteredProjects.map((project) => (
            <div key={project.id} className="project-card">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <p><strong>Tags:</strong> {project.tags}</p>
              <Link to={`/projects/${project.id}`} className="view-button">
                View Details
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProjectsPage;
