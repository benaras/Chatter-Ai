import React from 'react';
import { Routes, Route, Navigate, Link } from 'react-router-dom';
import Auth from './pages/Auth';
import Home from './pages/Home';
import Chat from './pages/Chat';
import ProfileSetup from './pages/ProfileSetup';
import styles from './App.module.css';
import Logo from './assets/Chatter AI.svg';

const App: React.FC = () => {
  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <Link to="/home">
          <img src={Logo} alt="Chatter AI" className={styles.logo} />
        </Link>
      </header>

      <div className={styles.mainContent}>
        <Routes>
          <Route path="/" element={<Navigate to="/auth" replace />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/home" element={<Home />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/profile-setup" element={<ProfileSetup />} />
          <Route path="*" element={<div><h1>Not Found</h1></div>} />
        </Routes>
      </div>
    </div>
  );
};

export default App;



// ORIGINAL DEFAULT CODE


// import { useState } from 'react'
// import './App.css'

// function ChatterAI() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <img src="https://images.unsplash.com/photo-1612838320302-3b3b3b3b3b3b" alt="Chatter Ai" />
//       <h1>Chatter Ai</h1>
//       <div className="card">
//         <p>
//           Language-Learning App with AI Chatbot
//           <p>This project is created by Shachi, Devansh, Nikhila, and Arman</p>
//         </p>
//       </div>
//     </>
//   )
// }

// export default ChatterAI

// src/App.tsx