import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>🏠 Welcome to Chatter AI</h1>
      <p>Select a page to get started:</p>
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '2rem' }}>
        <Link to="/chat">💬 Chat</Link>
        <Link to="/profile-setup">⚙️ Profile Settings</Link>
        <Link to="/progress">📊 Progress</Link>
        <Link to="/feedback">📝 Feedback</Link>
      </nav>
    </div>
  );
};

export default Home;
