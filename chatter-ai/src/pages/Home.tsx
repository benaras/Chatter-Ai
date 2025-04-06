// src/pages/Home.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';

const Home: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1>🏠 Welcome to Chatter AI</h1>
      <p>Select a page to get started:</p>
      <nav className={styles.nav}>
        <Link to="/chat">💬 Chat</Link>
        <Link to="/profile-setup">⚙️ Profile Settings</Link>
        <Link to="/progress">📊 Progress</Link>
        <Link to="/feedback">📝 Feedback</Link>
      </nav>
    </div>
  );
};

export default Home;
