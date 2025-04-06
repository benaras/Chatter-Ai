// src/pages/Auth.tsx
import React, { useState } from 'react';
import { supabase } from '../supabaseClient.ts';
import { useNavigate } from 'react-router-dom';
import styles from './Auth.module.css';

const Auth: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [language, setLanguage] = useState<string>('');
  const [level, setLevel] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    if (isSignUp) {
      // SIGN UP
      const { error } = await supabase.auth.signUp({
        email,
        password
      });

      if (error) {
        setMessage(error.message);
        return;
      }

      setMessage('Sign up successful! Check your email to confirm your account.');
      // Profile creation will be handled after email confirmation

    } else {
      // LOGIN
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        setMessage(error.message);
        return;
      }

      if (data.user) {
        const userId = data.user.id;

        // Check if profile exists
        const { data: existingProfile } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', userId)
          .single();

        // If no profile exists, create one from the sign-up values
        if (!existingProfile) {
          const { error: insertError } = await supabase.from('profiles').insert([
            {
              user_id: userId,
              username,
              language,
              level,
              known_words: [],
              developing_words: [],
              streak: 0
            }
          ]);

          if (insertError) {
            console.error('Error creating profile:', insertError.message);
          }
        }

        setMessage(`Welcome back, ${username || 'user'}!`);
        navigate('/home');
      }
    }
  };

  return (
    <div className={styles.container}>
      <h2>{isSignUp ? 'Create Account' : 'Login'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className={styles.input}
        />

        {isSignUp && (
          <>
            <input
              type="text"
              placeholder="Your name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className={styles.input}
            />

            <label htmlFor="language-select" className={styles.label}>
              Select your preferred language:
            </label>
            <select
              id="language-select"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              required
              className={styles.input}
            >
              <option value="">Select a language</option>
              <option value="Spanish">Spanish</option>
              <option value="French">French</option>
              <option value="Italian">Italian</option>
              <option value="Portuguese">Portuguese</option>
            </select>

            <label htmlFor="level-select" className={styles.label}>
              Select your proficiency level:
            </label>
            <select
              id="level-select"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              required
              className={styles.input}
            >
              <option value="">Select a level</option>
              <option value="A1">Absolute Beginner: A1</option>
              <option value="A2">Seasoned Beginner: A2</option>
              <option value="B1">Low Intermediate: B1</option>
              <option value="B2">High Intermediate: B2</option>
              <option value="C1">Advanced: C1</option>
              <option value="C2">Native: C2</option>
            </select>
          </>
        )}

        <button type="submit" className={styles.button}>
          {isSignUp ? 'Sign Up' : 'Login'}
        </button>
      </form>

      <p className={styles.toggleText}>
        {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
        <button onClick={() => setIsSignUp(!isSignUp)} className={styles.toggleButton}>
          {isSignUp ? 'Login' : 'Sign Up'}
        </button>
      </p>

      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
};

export default Auth;
