"use client"

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './cardlist.module.css';
import Card from '../card/Card';
import { Post } from '../types';

const Cardlist: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get<Post[]>('http://127.0.0.1:8000/api/posts/');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className={styles.container}>
      <Card posts={posts} />
    </div>
  );
};

export default Cardlist;
