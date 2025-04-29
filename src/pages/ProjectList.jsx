import React, { useState } from "react";
import './ProjectList.css';

const ProjectList = ({ projects }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  // Filter only approved projects
  const approvedProjects = projects.filter((project) => project.approved);

  // Further filter by search, tags, year
  const filteredProjects = approvedProjects.filter((project) => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          project.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = selectedTags ? project.tags.toLowerCase().includes(selectedTags.toLowerCase()) : true;
    const matchesYear = selectedYear ? project.year === selectedYear : true;

    return matchesSearch && matchesTag && matchesYear;
  });

  return (
    <div className="project-list">
      <h2>Explore Projects</h2>

      {/* Search Bar and Filters */}
      <div className="search-filter">
        <input
          type="text"
          placeholder="Search by title or description..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {/* Tag Filter */}
        <select onChange={(e) => setSelectedTags(e.target.value)} value={selectedTags}>
          <option value="">All Tags</option>
          <option value="AI">AI</option>
          <option value="Web Development">Web Development</option>
          <option value="Machine Learning">Machine Learning</option>
          {/* Add more tag options */}
        </select>

        {/* Year Filter */}
        <select onChange={(e) => setSelectedYear(e.target.value)} value={selectedYear}>
          <option value="">All Years</option>
          <option value="2024">2024</option>
          <option value="2023">2023</option>
          {/* Add more year options */}
        </select>
      </div>

      {/* Project Cards */}
      {filteredProjects.length === 0 ? (
        <p>No projects found based on your filters.</p>
      ) : (
        filteredProjects.map((project, index) => (
          <div key={index} className="project-card">
            {project.file_url && <img src={project.file_url} alt={project.title} className="project-image" />}
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <p><strong>Tags:</strong> {project.tags}</p>
            <p><strong>Year:</strong> {project.year}</p>
            <p><strong>Video Link:</strong> <a href={project.videoLink} target="_blank" rel="noopener noreferrer">{project.videoLink}</a></p>

            {/* View More Button */}
            <button>View Details</button> 
          </div>
        ))
      )}
    </div>
  );
};

export default ProjectList;
