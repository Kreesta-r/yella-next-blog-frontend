// components/sidebar/Sidebar.tsx

import React from 'react';
import Link from 'next/link';
import styles from './sidebar.module.css';
import { Post } from '../../components/types';

interface SidebarProps {
  similarPosts: Post[];
}

const Sidebar: React.FC<SidebarProps> = ({ similarPosts }) => {
  return (
    <div className={styles.sidebar}>
      <h3>Similar Posts</h3>
      <ul className={styles.postList}>
        {similarPosts.map((post) => (
          <li key={post.id} className={styles.list}>
            <Link href={`/posts/${post.id}`}>
              <p>{post.title}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
