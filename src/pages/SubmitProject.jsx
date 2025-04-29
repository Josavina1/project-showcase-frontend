import React, { useState } from 'react';
import './SubmitProject.css';

const SubmitProject = () => {
  // State for form fields
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [file, setFile] = useState(null);
  const [videoLink, setVideoLink] = useState('');

  // State to store projects
  const [projects, setProjects] = useState([]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('tags', tags);
    formData.append('video_link', videoLink);
    if (file) {
      formData.append('file', file);
    }
  
    // Log FormData contents to debug
    for (let pair of formData.entries()) {
      console.log(pair[0] + ': ' + pair[1]);
    }
    
    try {
      const API_URL = import.meta.env.VITE_API_URL;
    
      const response = await fetch(`${API_URL}/projects`, {
        method: 'POST',
        body: formData,
      });
    
      const data = await response.json();
      console.log('Project submitted successfully:', data);
      alert('Project submitted!');
    } catch (error) {
      console.error('Error submitting project:', error);
      alert('Failed to submit project.');
    }
    

  // Validate YouTube video link
  const isValidYouTubeLink = (videoLink) => {
    const regex = /^https:\/\/(www\.)?youtube\.com\/watch\?v=[\w-]+$/;
    return regex.test(videoLink);
  };

  return (
    <div className="submit-container">
      <h2>Submit Your Project</h2>
      <form className="submit-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Project Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Project Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Tags (e.g. AI, Web, Robotics)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />
        {file && file.type.startsWith('image') && (
          <div>
            <h4>Preview:</h4>
            <img src={URL.createObjectURL(file)} alt="Project file preview" style={{ maxWidth: '100%', height: 'auto' }} />
          </div>
        )}
        <input
          type="text"
          placeholder="Video Link (YouTube)"
          value={videoLink}
          onChange={(e) => setVideoLink(e.target.value)}
        />
        {videoLink && !isValidYouTubeLink(videoLink) && (
          <p style={{ color: 'red' }}>Please enter a valid YouTube video link.</p>
        )}
        <button type="submit">Submit Project</button>
      </form>

      {/* Displaying submitted projects */}
      <div className="submitted-projects">
        <h3>Submitted Projects</h3>
        {projects.length === 0 ? (
          <p>No projects submitted yet.</p>
        ) : (
          projects.map((project, index) => (
            <div key={index} className="project-card">
              <h4>{project.title}</h4>
              <p>{project.description}</p>
              <p><strong>Tags:</strong> {project.tags}</p>
              {project.video_link && (
                <p><strong>Video Link:</strong> <a href={project.video_link} target="_blank" rel="noopener noreferrer">{project.video_link}</a></p>
              )}
              {project.file_url && (
                <img src={project.file_url} alt="Project file" style={{ maxWidth: '100px', height: 'auto' }} />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SubmitProject;
