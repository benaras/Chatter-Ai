// src/pages/Auth.jsx
import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    
    if (isSignUp) {
      const { error } = await supabase.auth.signUp({ email, password });
      setMessage(error ? error.message : 'Check your email for a confirmation link!');
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      setMessage(error ? error.message : 'Logged in successfully!');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '2rem auto', textAlign: 'center' }}>
      <h2>{isSignUp ? 'Create Account' : 'Login'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ padding: '8px', width: '100%', marginBottom: '1rem' }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ padding: '8px', width: '100%', marginBottom: '1rem' }}
        />
        <button type="submit" style={{ padding: '10px 20px' }}>
          {isSignUp ? 'Sign Up' : 'Login'}
        </button>
      </form>
      <p style={{ marginTop: '1rem' }}>
        {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
        <button onClick={() => setIsSignUp(!isSignUp)} style={{ color: 'blue', background: 'none', border: 'none', cursor: 'pointer' }}>
          {isSignUp ? 'Login' : 'Sign Up'}
        </button>
      </p>
      {message && <p style={{ marginTop: '1rem', color: 'red' }}>{message}</p>}
    </div>
  );
};

export default Auth;
