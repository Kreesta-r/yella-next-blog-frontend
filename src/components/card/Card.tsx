import React from 'react';
import styles from './card.module.css';
import { Post } from '../types';

interface Props {
  posts: Post[];
}

const Card: React.FC<Props> = ({ posts }) => {
  return (
    <div className={styles.container}>
      {posts.map((post) => (
        <div key={post.id} className={styles.postCard}>
          <div className={styles.imgContainer}>
            <img
              src={post.image_url} // Assuming your API returns image URLs
              alt={post.title}
              className={styles.image}
            />
          </div>
          <div className={styles.textContainer}>
            <h2>{post.title}</h2>
            <div className={styles.postTrunc}>
              <p>{post.content}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;
