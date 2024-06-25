"use client"
import styles from './page.module.css'
import Header from '../components/header/Header'
import Hero from '../components/hero/Hero'
import Cardlist from '../components/cardlist/Cardlist'
import { useEffect, useState } from 'react'
import { Post } from '@/components/types'
import axios from 'axios'
export default function Home() {

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
      <div className={styles.header}>
        <Header/>
      </div>
      <div className={styles.hero}>
        <Hero posts={posts}/>
        <Cardlist/>
      </div>
    </div>
  )
}
