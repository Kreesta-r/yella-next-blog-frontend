'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './comments.module.css';

interface Comment {
  id: number;
  post: number;
  author: string;
  content: string;
  created_at: string;
}

interface CommentsProps {
  postId: number;
}

const Comments: React.FC<CommentsProps> = ({ postId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get<Comment[]>('http://localhost:8000/api/comments/');
        const filteredComments = response.data.filter(comment => comment.post === postId);
        setComments(filteredComments);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching comments:', error);
        setLoading(false);
      }
    };

    fetchComments();
  }, [postId]);

  if (loading) {
    return <p>Loading comments...</p>;
  }

  if (comments.length === 0) {
    return <p>No comments yet.</p>;
  }

  return (
    <div className={styles.commentsContainer}>
      <h3>Comments</h3>
      {comments.map((comment) => (
        <div key={comment.id} className={styles.comment}>
          <div className={styles.commentMeta}>
            <span>{comment.author}</span>
            <span>{new Date(comment.created_at).toLocaleDateString()}</span>
          </div>
          <p>{comment.content}</p>
        </div>
      ))}
    </div>
  );
};

export default Comments;
