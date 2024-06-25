import React from 'react';
import Link from 'next/link';
import styles from './hero.module.css';
import { Post } from '../types';

interface HeroProps {
  posts: Post[];
}

const getRandomPosts = (posts: Post[], count: number): Post[] => {
  const shuffled = [...posts].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const Hero: React.FC<HeroProps> = ({ posts }) => {
  const randomPosts = getRandomPosts(posts, 3);

  return (
    <div className={styles.container}>
      <div className={styles.intro}>
        <h1>Kreestatek: Your daily dose of everything.</h1>
      </div>
      <div className={styles.content}>
        {randomPosts.length > 0 ? (
          <>
            <div className={styles.col1}>
              <Link href={`/posts/${randomPosts[0].id}`} passHref>
                <div className={styles.link}>
                  <div className={styles.featuredImg}>
                    <img src={randomPosts[0].image_url} alt={randomPosts[0].title} width='1000' height='1000' />
                  </div>
                  <div className={styles.textBox}>
                    <h2>{randomPosts[0].title}</h2>
                    <div className={styles.featuredTrunc}>
                      <p>{randomPosts[0].content}</p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
            <div className={styles.col2}>
              {randomPosts.slice(1, 3).map((post) => (
                <Link key={post.id} href={`/posts/${post.id}`} passHref>
                  <div className={styles.link}>
                    <div className={styles.sideContent}>
                      <div className={styles.imgContainer}>
                        <img src={post.image_url} alt={post.title} width='1000' height='1000' />
                      </div>
                      <div className={styles.textContainer}>
                        <h3>{post.title}</h3>
                        <div className={styles.truncatedText}>
                          <p>{post.content}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Hero;
