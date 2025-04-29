import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ProjectDetails.css';

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    // Fetch project from your backend
    fetch(`https://your-backend-url.com/projects/${id}`) 
      .then(response => response.json())
      .then(data => setProject(data))
      .catch(error => console.error('Error fetching project:', error));
  }, [id]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      const commentObj = {
        id: Date.now(),
        text: newComment,
        author: 'StudentUser',
      };
      setComments([...comments, commentObj]);
      setNewComment('');
    }
  };

  if (!project) {
    return <div>Loading project details...</div>;
  }

  return (
    <div className="project-details-container">
      <h1>{project.title}</h1>
      <p><strong>Description:</strong> {project.description}</p>
      <p><strong>Tags:</strong> {project.tags}</p>

      {project.videoLink && (
        <div className="video-container">
          <iframe
            width="560"
            height="315"
            src={project.videoLink.replace("watch?v=", "embed/")}
            title="Project Video"
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}

      {/* Comments Section */}
      <div className="comments-section">
        <h3>Comments</h3>
        {comments.length === 0 ? (
          <p>No comments yet. Be the first to comment!</p>
        ) : (
          <ul className="comment-list">
            {comments.map((comment) => (
              <li key={comment.id}>
                <strong>{comment.author}:</strong> {comment.text}
              </li>
            ))}
          </ul>
        )}
        <form className="comment-form" onSubmit={handleCommentSubmit}>
          <textarea
            placeholder="Leave a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            required
          ></textarea>
          <button type="submit">Post Comment</button>
        </form>
      </div>
    </div>
  );
};

export default ProjectDetails;
