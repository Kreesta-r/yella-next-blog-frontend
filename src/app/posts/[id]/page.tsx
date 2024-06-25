'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import styles from './post.module.css';
import Comments from '@/components/comments/Comments';
import Header from '@/components/header/Header';
import Sidebar from '@/components/sidebar/Sidebar';

interface Post {
  id: number;
  title: string;
  content: string;
  image_url: string;
  created_at: string;
  updated_at: string;
}

const PostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [similarPosts, setSimilarPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPost = async () => {
      if (id) {
        try {
          const res = await fetch(`http://localhost:8000/api/posts/${id}/`);
          const data = await res.json();
          setPost(data);
          setLoading(false);
          fetchSimilarPosts(data.tags); 
        } catch (error) {
          console.error('Error fetching post:', error);
          setLoading(false);
        }
      }
    };
    const fetchSimilarPosts = async (tags: string[]) => {
      try {
        const tagString = tags.join(',');
        const res = await fetch(`http://localhost:8000/api/posts/?tags=${tagString}&exclude=${id}`);
        const data = await res.json();
        setSimilarPosts(data);
      } catch (error) {
        console.error('Error fetching similar posts:', error);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!post) {
    return <p>Post not found</p>;
  }

  return (
    <>
    <Header />
    <div className={styles.container}>
      <div className={styles.col1}>
        <div className={styles.content}>
          <h1>{post.title}</h1>
          <img src={post.image_url} alt={post.title} className={styles.image} />
          <p>{post.content}</p>
          <div className={styles.meta}>
            <span>Posted on: {new Date(post.created_at).toLocaleDateString()}</span>
          </div>
        </div>
        <div className={styles.comments}>
          <Comments postId={post.id} />
        </div>
      </div>
      <div className={styles.col2}>
        <Sidebar similarPosts={similarPosts}/>
      </div>
    </div>
    </>
  );
};

export default PostPage;
